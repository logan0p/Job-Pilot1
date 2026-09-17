import Layout from "../components/layout/Layout";

import ApplicationStatusChart from "../components/charts/ApplicationStatusChart";

import { useEffect, useState } from "react";

import { getAnalytics } from "../services/analytics.service";

import StatsCards from "../components/analytics/StatsCards";
import MonthlyChart from "../components/analytics/MonthlyChart";
import TopCompanies from "../components/analytics/TopCompanies";
import PerformanceCard from "../components/analytics/PerformanceCard";

type AnalyticsData = {
  overview: {
    totalJobs: number;
    Applied: number;
    Interview: number;
    Offer: number;
    Rejected: number;
  };

  monthlyApplications: {
    month: string;
    jobs: number;
  }[];

  topCompanies: {
    company: string;
    count: number;
  }[];

  performance: {
    interviewRate: number;
    offerRate: number;
    rejectionRate: number;
  };
};

const Analytics = () => {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getAnalytics();

      console.log(
        "ANALYTICS DATA:",
        response
      );

      setAnalytics(response.data);
    } catch (error) {
      console.error(
        "Failed to load analytics:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <Layout>

      <div className="space-y-8">

        {/* ================================= */}
        {/* HEADER */}
        {/* ================================= */}

        <div>
          <h1 className="text-5xl font-bold">
            📊 Analytics
          </h1>

          <p className="mt-2 text-lg text-slate-400">
            Insights into your complete job
            search journey.
          </p>
        </div>

        {/* ================================= */}
        {/* LOADING */}
        {/* ================================= */}

        {loading ? (

          <div
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-10
              text-center
            "
          >
            <p className="text-slate-400">
              Loading analytics...
            </p>
          </div>

        ) : analytics ? (

          <>

            {/* ================================= */}
            {/* STATS */}
            {/* ================================= */}

            <StatsCards
              data={analytics.overview}
            />

            {/* ================================= */}
            {/* CHARTS */}
            {/* ================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-8
                xl:grid-cols-2
              "
            >

              {/* MONTHLY */}

              <MonthlyChart
                data={
                  analytics.monthlyApplications
                }
              />

              {/* STATUS */}

              <ApplicationStatusChart
                data={{
                  Applied:
                    analytics.overview.Applied,

                  Interview:
                    analytics.overview.Interview,

                  Offer:
                    analytics.overview.Offer,

                  Rejected:
                    analytics.overview.Rejected,
                }}
              />

            </div>

            {/* ================================= */}
            {/* BOTTOM SECTION */}
            {/* ================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-8
                xl:grid-cols-2
              "
            >

              {/* TOP COMPANIES */}

              <TopCompanies
                data={
                  analytics.topCompanies
                }
              />

              {/* PERFORMANCE */}

              <PerformanceCard
                data={
                  analytics.performance
                }
              />

            </div>

          </>

        ) : (

          /* ================================= */
          /* ERROR / EMPTY STATE */
          /* ================================= */

          <div
            className="
              rounded-3xl
              border
              border-red-500/20
              bg-red-500/10
              p-10
              text-center
            "
          >
            <p className="text-red-400">
              Failed to load analytics.
            </p>
          </div>

        )}

      </div>

    </Layout>
  );
};

export default Analytics;