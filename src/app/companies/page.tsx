"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchCompaniesQuery } from "@/store/api/companiesApi";
import { ListSkeleton } from "@/components/shared/ListSkeleton";

export default function CompaniesIndexPage() {
  const [q, setQ] = useState("");
  const { data, isFetching, isLoading } = useSearchCompaniesQuery(q);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Companies</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Search SBIR-backed performers in the mock dataset.
        </p>
      </div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by company name…"
        className="w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      />
      {isLoading || isFetching ? (
        <ListSkeleton rows={4} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {data?.map((c) => (
            <Link
              key={c.company_id}
              href={`/companies/${c.company_id}`}
              className="rounded-xl border border-gray-200 bg-white p-4 text-sm shadow-sm transition hover:border-blue-400 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
            >
              <div className="font-semibold text-gray-900 dark:text-white">{c.company_name}</div>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {c.state} · {c.employee_count} employees
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
