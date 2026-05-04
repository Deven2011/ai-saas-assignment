"use client";

import { useEffect, useState } from "react";
import IntegrationsCard from "@/components/admin/IntegrationsCard";
import StatsCard from "@/components/admin/StatsCard";

type DashboardSection = {
  _id: string;
  title: string;
  type: string;
};

type DashboardConfig = {
  sections: DashboardSection[];
};

const PROJECT_ID = "69f4d13d1d87edb5dd3f05da";

export default function AdminPage() {
  const [data, setData] = useState<DashboardConfig | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchConfig() {
    const res = await fetch(`/api/admin/dashboard?projectId=${PROJECT_ID}`);
    const data = await res.json();
    setData(data);
  }

  useEffect(() => {
    fetchConfig();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <button 
        onClick={fetchConfig}
        className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Refresh Dashboard
      </button>
      {data?.sections.map((section, index) => {
        const sectionKey = section._id || index;

        if (section.type === "stats") {
          return (
            <div
              key={sectionKey}
              className="rounded-lg border bg-white p-4 text-black shadow-sm"
            >
              <StatsCard title={section.title} index={index} />
            </div>
          );
        }

        if (section.type === "integrations") {
          return (
            <div
              key={sectionKey}
              className="rounded-lg border bg-white p-4 text-black shadow-sm"
            >
              <IntegrationsCard title={section.title} index={index} />
            </div>
          );
        }

        return (
          <div
            key={sectionKey}
            className="rounded-lg border bg-white p-4 text-black shadow-sm"
          >
            Unknown section type
          </div>
        );
      })}
    </div>
  );
}
