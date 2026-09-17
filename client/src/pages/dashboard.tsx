import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Flame,
  Rocket,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";

import Layout from "../components/layout/Layout";
import DashboardCards from "../components/dashboard/DashboardCards";

import ApplicationStatusChart from "../components/charts/ApplicationStatusChart";
import MonthlyApplicationChart from "../components/charts/MonthlyApplicationChart";
import RecentApplications from "../components/charts/RecentApplications";
import CareerMission from "../components/dashboard/CareerMission";
import { getDashboardData } from "../services/dashboard.service";

type Job = {
  id: string;
  company: string;
  position: string;
  location: string | null;
  status: string;
};

type MonthlyApplication = {
  month: string;
  applications: number;
};

type DashboardStats = {
  totalJobs: number;
  Applied: number;
  Interview: number;
  Offer: number;
  Rejected: number;
};

const Dashboard = () => {

  const [stats, setStats] =
    useState<DashboardStats>({
      totalJobs: 0,
      Applied: 0,
      Interview: 0,
      Offer: 0,
      Rejected: 0,
    });

  const [recentJobs, setRecentJobs] =
    useState<Job[]>([]);

  const [monthlyApplications, setMonthlyApplications] =
    useState<MonthlyApplication[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        setLoading(true);

        const result =
          await getDashboardData();

        setStats({
          totalJobs:
            result.data.totalJobs,

          Applied:
            result.data.Applied,

          Interview:
            result.data.Interview,

          Offer:
            result.data.Offer,

          Rejected:
            result.data.Rejected,
        });

        setRecentJobs(
          result.data.recentJobs
        );

        setMonthlyApplications(
          result.data.monthlyApplications
        );

      } catch (error) {

        console.error(
          "Failed to load dashboard:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    loadDashboard();

  }, []);


  const successRate =
    stats.totalJobs > 0
      ? Math.round(
          ((stats.Interview +
            stats.Offer) /
            stats.totalJobs) *
            100
        )
      : 0;


  const progress =
    stats.totalJobs > 0
      ? Math.min(
          100,
          Math.round(
            ((stats.Applied +
              stats.Interview +
              stats.Offer) /
              stats.totalJobs) *
              100
          )
        )
      : 0;


  return (

    <Layout>

      <div className="relative space-y-8 overflow-hidden">

        {/* =====================================================
            AMBIENT BACKGROUND
        ====================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            -top-40
            h-96
            w-96
            rounded-full
            bg-cyan-500/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-40
            h-80
            w-80
            rounded-full
            bg-violet-500/10
            blur-3xl
          "
        />


        {/* =====================================================
            HERO
        ====================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[2rem]
            border
            border-cyan-500/10
            bg-gradient-to-br
            from-slate-900
            via-slate-900
            to-cyan-950/30
            p-8
            shadow-2xl
            shadow-cyan-950/20
          "
        >

          {/* Decorative grid */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.035]
              [background-image:linear-gradient(#22d3ee_1px,transparent_1px),linear-gradient(90deg,#22d3ee_1px,transparent_1px)]
              [background-size:40px_40px]
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              gap-8
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div>

              {/* eyebrow */}

              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-500/20
                  bg-cyan-500/5
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-cyan-400
                "
              >

                <span
                  className="
                    h-2
                    w-2
                    rounded-full
                    bg-cyan-400
                    shadow-lg
                    shadow-cyan-400
                  "
                />

                System Online

              </div>


              <h1
                className="
                  font-display
                  text-4xl
                  font-bold
                  tracking-tight
                  text-white
                  md:text-6xl
                "
              >

                Mission
                <span className="text-cyan-400">
                  {" "}Control
                </span>

              </h1>


              <p
                className="
                  mt-4
                  max-w-2xl
                  text-base
                  leading-7
                  text-slate-400
                  md:text-lg
                "
              >
                Your career command center.
                Track applications, monitor progress,
                and stay locked on your next opportunity.
              </p>


              <div
                className="
                  mt-7
                  flex
                  flex-wrap
                  gap-3
                "
              >

                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-950/50
                    px-4
                    py-2.5
                    text-sm
                    text-slate-300
                  "
                >

                  <Rocket
                    size={16}
                    className="text-cyan-400"
                  />

                  Career mission active

                </div>


                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-950/50
                    px-4
                    py-2.5
                    text-sm
                    text-slate-300
                  "
                >

                  <Zap
                    size={16}
                    className="text-violet-400"
                  />

                  Keep applying

                </div>

              </div>

            </div>


            {/* HERO METRIC */}

            <div
              className="
                animate-float
                relative
                hidden
                min-w-[230px]
                rounded-3xl
                border
                border-cyan-500/20
                bg-slate-950/60
                p-6
                backdrop-blur-xl
                lg:block
              "
            >

              <div
                className="
                  absolute
                  -right-3
                  -top-3
                  h-16
                  w-16
                  rounded-full
                  bg-cyan-500/20
                  blur-2xl
                "
              />

              <div className="relative">

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-between
                  "
                >

                  <span className="text-sm text-slate-400">
                    Success rate
                  </span>

                  <TrendingUp
                    size={18}
                    className="text-emerald-400"
                  />

                </div>


                <div
                  className="
                    font-display
                    text-5xl
                    font-bold
                    text-white
                  "
                >
                  {successRate}%
                </div>


                <div
                  className="
                    mt-4
                    h-2
                    overflow-hidden
                    rounded-full
                    bg-slate-800
                  "
                >

                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      to-violet-500
                      transition-all
                      duration-1000
                    "
                    style={{
                      width: `${successRate}%`,
                    }}
                  />

                </div>


                <p
                  className="
                    mt-3
                    text-xs
                    text-slate-500
                  "
                >
                  Interviews + offers
                  against applications
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            QUICK INTELLIGENCE
        ====================================================== */}

        <section
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          {[
            {
              label: "Applications",
              value: stats.totalJobs,
              icon: BriefcaseBusiness,
              color: "cyan",
            },
            {
              label: "Interviews",
              value: stats.Interview,
              icon: Target,
              color: "violet",
            },
            {
              label: "Offers",
              value: stats.Offer,
              icon: CheckCircle2,
              color: "emerald",
            },
            {
              label: "Rejected",
              value: stats.Rejected,
              icon: Clock3,
              color: "rose",
            },
          ].map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-slate-900/80
                  p-5
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-slate-700
                  hover:bg-slate-900
                "
              >

                <div
                  className="
                    absolute
                    -right-8
                    -top-8
                    h-24
                    w-24
                    rounded-full
                    bg-cyan-500/5
                    blur-2xl
                    transition
                    group-hover:bg-cyan-500/10
                  "
                />

                <div
                  className="
                    relative
                    flex
                    items-center
                    justify-between
                  "
                >

                  <div>

                    <p
                      className="
                        text-sm
                        text-slate-500
                      "
                    >
                      {item.label}
                    </p>

                    <p
                      className="
                        mt-2
                        font-display
                        text-3xl
                        font-bold
                        text-white
                      "
                    >
                      {item.value}
                    </p>

                  </div>


                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-500/10
                      text-cyan-400
                      transition
                      group-hover:scale-110
                    "
                  >

                    <Icon size={20} />

                  </div>

                </div>

              </div>
            );

          })}

        </section>


        {/* =====================================================
            ORIGINAL DASHBOARD CARDS
        ====================================================== */}

        {loading ? (

          <div
            className="
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
              p-16
              text-center
            "
          >

            <div
              className="
                mx-auto
                mb-5
                h-10
                w-10
                animate-spin
                rounded-full
                border-2
                border-slate-700
                border-t-cyan-400
              "
            />

            <p className="text-slate-400">
              Synchronizing mission data...
            </p>

          </div>

        ) : (

          <>

            <DashboardCards data={stats} />


            {/* =================================================
                PROGRESS MISSION
            ================================================= */}

            <section
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-violet-500/10
                bg-gradient-to-r
                from-slate-900
                to-violet-950/20
                p-7
              "
            >

              <div className="relative">

                <div
                  className="
                    flex
                    flex-col
                    gap-5
                    md:flex-row
                    md:items-center
                    md:justify-between
                  "
                >

                  <div>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <Flame
                        size={20}
                        className="text-orange-400"
                      />

                      <h2
                        className="
                          font-display
                          text-xl
                          font-bold
                        "
                      >
                        Career Momentum
                      </h2>

                    </div>

                    <p
                      className="
                        mt-2
                        text-sm
                        text-slate-500
                      "
                    >
                      Keep the application pipeline moving.
                    </p>

                  </div>


                  <div className="text-right">

                    <span
                      className="
                        font-display
                        text-3xl
                        font-bold
                        text-white
                      "
                    >
                      {progress}%
                    </span>

                    <p
                      className="
                        text-xs
                        text-slate-500
                      "
                    >
                      pipeline progress
                    </p>

                  </div>

                </div>


                <div
                  className="
                    mt-6
                    h-3
                    overflow-hidden
                    rounded-full
                    bg-slate-800
                  "
                >

                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-500
                      to-violet-500
                      shadow-lg
                      shadow-cyan-500/20
                      transition-all
                      duration-1000
                    "
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

            </section>


            {/* =================================================
                CHARTS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-6
                xl:grid-cols-2
              "
            >

              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-800
                  bg-slate-900/80
                  transition
                  hover:border-cyan-500/20
                "
              >

                <MonthlyApplicationChart
                  data={monthlyApplications}
                />

              </div>


              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-800
                  bg-slate-900/80
                  transition
                  hover:border-violet-500/20
                "
              >

                <ApplicationStatusChart
                  data={stats}
                />

              </div>

            </div>


            {/* =================================================
                RECENT APPLICATIONS
            ================================================= */}

            <section
              className="
                overflow-hidden
                rounded-3xl
                border
                border-slate-800
                bg-slate-900/80
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-slate-800
                  px-6
                  py-5
                "
              >

                <div>

                  <h2
                    className="
                      font-display
                      text-xl
                      font-bold
                    "
                  >
                    Recent Applications
                  </h2>

                  <p
                    className="
                      mt-1
                      text-sm
                      text-slate-500
                    "
                  >
                    Your latest career activity
                  </p>

                </div>


                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-cyan-500/10
                    text-cyan-400
                  "
                >

                  <ArrowUpRight size={18} />

                </div>

              </div>
              <CareerMission
  applications={stats.totalJobs}
  interviews={stats.Interview}
  offers={stats.Offer}
/>


              <RecentApplications
                jobs={recentJobs.map((job) => ({
                  id: job.id,
                  company: job.company,
                  position: job.position,
                  location:
                    job.location ||
                    "Not specified",
                  status: job.status,
                }))}
              />

            </section>

          </>

        )}

      </div>

    </Layout>
  );
};

export default Dashboard;