# Hackathon MVP

## One-Line Pitch

We use AI to connect current `SAM.gov` opportunities to past `SBIR` innovation and surface the small businesses most likely to be relevant, with explainable evidence from topics, awards, and company history.

## Short Pitch

Federal need signals are fragmented. `SAM.gov` shows what agencies are asking for now, while `SBIR` topics, awards, and company profiles show what small businesses have already explored and delivered. Our system precomputes those links so an analyst can open any opportunity, topic, or company and immediately see the most relevant matches, strength of fit, and capability gaps.

## Demo Story

The strongest demo flow is:

1. Open a fresh `SAM.gov` opportunity.
2. Show the top matching capability themes.
3. Show the top matching `SBIR` companies with evidence.
4. Explain why each company is a match.
5. Show where the opportunity has weak supplier coverage or low historical maturity.

This gives you both wow factor and a clear reason the product matters.

## Core Product Questions

The product should answer these questions directly and repeatedly.

### Opportunity-to-Company

- Which small companies are the best fit for this opportunity?
- Why does the system think company `A` is a fit?
- Which awards make that judgment credible?
- Which `SBIR` topics are most similar to this opportunity?
- Is the match based on topic similarity, awards, company profile, or all three?
- Is this company proven in this area or only adjacent?
- How concentrated is this capability in a few vendors versus many?
- Which companies are emerging players rather than incumbents?

### Company Capability

- What is this company actually good at?
- What capability themes show up repeatedly in its history?
- Is this company specialized or broad?
- Does this company mostly work with one agency or across many?
- Is this company stronger in research topics or in funded awards?
- Which technologies, mission areas, or keywords define the company?
- How strong is the evidence for each claimed capability?
- Has the company moved from topic relevance to actual award relevance?

### Topic-to-Market Transition

- Which `SBIR` topics appear to be showing up in current procurement demand?
- Which funded `SBIR` efforts seem to map into live `SAM.gov` needs?
- Which topic areas look like they have high government interest but weak current vendor depth?
- Which topic areas were funded heavily but show little current demand?
- Which opportunities look like downstream acquisition for previously funded R&D?

### Gap Analysis

- Where is there visible demand but few credible small-business matches?
- Which agencies appear to want capabilities that the `SBIR` base is not supplying well?
- Which opportunity clusters are overserved versus underserved?
- Which capability areas show weak continuity from topic to award to opportunity?
- Where should a buyer look for non-obvious vendors?

## MVP Features

These are the features worth building for the hackathon.

### 1. Opportunity Match View

Input: one `SAM.gov` opportunity.

Output:

- top matching capability themes
- top matching `SBIR` topics
- top matching `SBIR` awards
- top matching companies
- explanation of why each company is relevant

### 2. Company Capability Card

Input: one company.

Output:

- top capability themes
- strength score for each capability
- supporting awards and topics
- top agencies
- award phases and counts
- short AI summary: "This company is strongest in `X`, `Y`, and `Z` because..."

### 3. Topic Transition View

Input: one `SBIR` topic or topic cluster.

Output:

- similar awards
- similar live opportunities
- companies active in the space
- maturity signal: topic only, award-backed, or opportunity-backed

### 4. Gap / White Space View

Input: all clustered data.

Output:

- capability areas with many opportunities and weak company coverage
- capability areas with many awards but little current opportunity activity
- agencies with repeated demand and low supplier depth

## What Makes the Demo Feel Smart

Avoid vague chat. The product should feel intelligent because it produces:

- ranked matches
- evidence-backed explanations
- company capability strength scores
- precomputed aggregates that load instantly

The AI layer should explain results, not invent them.

## Recommended Build Strategy

Use an offline ingestion and precompute pipeline, then serve a very light app on top of prebuilt tables.

### Ingestion Goals

- clean all source data
- normalize shared fields
- derive text fields for matching
- compute embeddings or proxy text features
- precompute similarity links
- precompute company capability aggregates
- write final wide tables for fast reads

## Normalized Entities

These are the core entity types to model first.

### `topic`

- `topic_id`
- agency
- branch
- year
- title
- description
- combined text

### `award`

- `award_id`
- company_id
- company_name
- agency
- branch
- phase
- award_year
- award_amount
- title
- abstract
- combined text

### `company`

- `company_id`
- company_name
- profile text
- website
- state
- employee_count
- ownership flags

### `opportunity`

- `opportunity_id`
- notice_id
- agency
- office
- posted_date
- response_date
- title
- description
- combined text

## Precompute Pipeline

The simplest useful pipeline is:

1. Load CSVs into normalized base tables.
2. Standardize names, dates, agencies, and text fields.
3. Build `combined_text` per record.
4. Generate embeddings for `topic`, `award`, `company`, and `opportunity`.
5. Compute nearest-neighbor links:
   - opportunity -> topics
   - opportunity -> awards
   - opportunity -> companies
   - topic -> awards
   - topic -> opportunities
   - company -> opportunities
6. Aggregate company capability signals.
7. Write denormalized wide tables for fast demo queries.

## Final Wide Tables

If you only build a few final analytic tables, build these.

### 1. `company_capability_profile`

This is the most important table.

One row per `company x capability_cluster`.

Purpose: answer "What is this company good at?"

Suggested columns:

- `company_id`
- `company_name`
- `capability_cluster_id`
- `capability_label`
- `capability_strength_score`
- `capability_confidence`
- `award_count_in_cluster`
- `topic_match_count_in_cluster`
- `opportunity_match_count_in_cluster`
- `total_award_amount_in_cluster`
- `first_activity_date`
- `last_activity_date`
- `active_years`
- `primary_agencies`
- `top_keywords`
- `supporting_award_ids`
- `supporting_topic_ids`
- `supporting_opportunity_ids`
- `evidence_summary`

How to think about `capability_strength_score`:

- score should reflect repeated evidence, not just one semantic match
- combine:
  - number of relevant awards
  - total dollars
  - recency
  - phase maturity
  - topic similarity
  - opportunity similarity

A simple first formula:

```text
capability_strength_score =
  0.35 * normalized_award_count +
  0.20 * normalized_award_amount +
  0.20 * normalized_recency +
  0.15 * normalized_phase_maturity +
  0.10 * normalized_similarity_support
```

### 2. `opportunity_company_match`

One row per `opportunity x company`.

Purpose: power the main demo ranking.

Suggested columns:

- `opportunity_id`
- `company_id`
- `company_name`
- `match_score`
- `match_confidence`
- `capability_cluster_id`
- `capability_label`
- `topic_similarity_score`
- `award_similarity_score`
- `company_profile_similarity_score`
- `historical_relevance_score`
- `delivery_maturity_score`
- `recent_activity_score`
- `supporting_topic_ids`
- `supporting_award_ids`
- `explanation_facts`

### 3. `topic_transition_signal`

One row per `topic x capability_cluster` or `topic x opportunity`.

Purpose: answer whether a topic appears to be moving toward procurement demand.

Suggested columns:

- `topic_id`
- `capability_cluster_id`
- `capability_label`
- `award_count`
- `company_count`
- `matched_opportunity_count`
- `avg_opportunity_similarity`
- `last_seen_opportunity_date`
- `transition_stage`
- `transition_score`

Useful `transition_stage` values:

- `research_only`
- `award_backed`
- `procurement_emerging`
- `procurement_active`

### 4. `capability_gap_signal`

One row per `agency x capability_cluster` or `capability_cluster`.

Purpose: show white space.

Suggested columns:

- `agency`
- `capability_cluster_id`
- `capability_label`
- `opportunity_count`
- `topic_count`
- `award_count`
- `company_count`
- `demand_score`
- `supply_score`
- `gap_score`
- `gap_label`
- `top_related_opportunity_ids`
- `top_related_company_ids`

Simple first idea:

```text
gap_score = normalized_demand_score - normalized_supply_score
```

Where:

- `demand_score` comes from recent opportunity volume and similarity density
- `supply_score` comes from number of credible companies and award depth

## How To Assign Company Strength In A Capability

This needs to be crisp because it will show up in the demo.

A company should be considered strong in capability `C` when multiple independent signals align:

- the company has multiple awards similar to `C`
- those awards are recent enough to matter
- the company has meaningful total dollars in `C`
- the company appears across more than one record, not a single outlier
- the company profile text also aligns with `C`
- the company matches current opportunities in `C`

You do not need a perfect model. You need a defensible score.

### Minimal Evidence Model

For each company and capability cluster, compute:

- `award_count_in_cluster`
- `award_amount_in_cluster`
- `recent_award_count_in_cluster`
- `topic_similarity_support`
- `opportunity_similarity_support`
- `profile_similarity_support`
- `phase2_plus_ratio`

Then map those to labels:

- `very_strong`
- `strong`
- `moderate`
- `adjacent`
- `weak`

### Example Explanation Template

`Company A is strong in edge sensing and autonomous monitoring because it has 4 related awards, $3.2M in funding, recent activity with DOE and DoD, and repeated similarity to current sensing opportunities.`

That is the kind of sentence the system should generate automatically.

## Questions The Build Must Answer Before Coding The UI

These are the implementation questions that matter most.

### Data Questions

- What is the unique identifier for each dataset?
- How will company names be normalized across awards and profiles?
- Which date fields are trustworthy enough to use for recency?
- Which text fields should be concatenated for matching?
- Which records are empty or too low-quality to embed?

### Matching Questions

- Are you using embeddings, TF-IDF, or both?
- How many nearest neighbors do you keep per entity pair?
- What threshold counts as a "real" match?
- Do you cluster first and then score, or score first and cluster later?

### Company Strength Questions

- What signals count as evidence of capability?
- How much should recency matter?
- How much should award dollars matter relative to count?
- How should `Phase II` or later affect capability maturity?
- Should one giant award outweigh many small awards?

### Product Questions

- Who is the primary user for the demo: buyer, analyst, or founder?
- Is the main screen opportunity-centric or company-centric?
- What one action should wow the judges in under 30 seconds?
- Which explanation format is easiest to trust at a glance?

## Recommended MVP Decision

If time is short, optimize for one killer flow:

`SAM opportunity -> top companies -> why they match`

Everything else should support that flow.

## Suggested Deliverables

For the hackathon, a strong package is:

- one ingestion script
- one precompute script
- one SQLite database
- one app page for opportunity matching
- one app page for company capability cards
- one short LLM explanation per result

## Naming

Good product names:

- `Capability Radar`
- `SBIR-to-SAM Match Engine`
- `Federal Innovation Match`
- `Capability Intelligence Engine`

The safest and strongest is still:

`Capability Intelligence Engine`
