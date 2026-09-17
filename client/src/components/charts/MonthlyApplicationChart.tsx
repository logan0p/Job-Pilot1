
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

type Props = {
  data: {
    month: string;
    applications: number;
  }[];
};

const MonthlyApplicationChart = ({ data }: Props) => {
  const totalApplications = data.reduce(
    (total, item) => total + item.applications,
    0
  );

  const peak = data.reduce(
    (max, item) =>
      item.applications > max.applications
        ? item
        : max,
    {
      month: "-",
      applications: 0,
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        group
        relative
        h-[450px]
        overflow-hidden
        rounded-3xl
        border
        border-cyan-500/10
        bg-slate-900/70
        p-6
        shadow-2xl
        backdrop-blur-xl
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-3xl
          transition-transform
          duration-700
          group-hover:scale-125
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-20
          h-56
          w-56
          rounded-full
          bg-blue-500/5
          blur-3xl
        "
      />

      {/* Top accent */}
      <div
        className="
          absolute
          left-0
          top-0
          h-1
          w-full
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-cyan-400
          opacity-70
        "
      />

      <div className="relative z-10 flex h-full flex-col">
        {/* Header */}
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-cyan-500/10
                  text-cyan-400
                "
              >
                <TrendingUp size={22} />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">
                  Monthly Applications
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Application activity throughout the year
                </p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Total
            </p>

            <p className="mt-1 text-2xl font-black text-cyan-400">
              {totalApplications}
            </p>
          </div>
        </div>

        {/* Chart */}
        <div className="min-h-0 flex-1">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                stroke="#1E293B"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                stroke="#64748B"
                tick={{
                  fill: "#64748B",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                stroke="#64748B"
                allowDecimals={false}
                tick={{
                  fill: "#64748B",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                cursor={{
                  stroke: "#0891B2",
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  backgroundColor: "#0F172A",
                  border: "1px solid rgba(6, 182, 212, 0.25)",
                  borderRadius: "16px",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.4)",
                  padding: "12px 16px",
                }}
                labelStyle={{
                  color: "#94A3B8",
                  fontSize: "12px",
                  marginBottom: "4px",
                }}
                itemStyle={{
                  color: "#22D3EE",
                  fontWeight: 700,
                }}
                formatter={(value) => [
                  `${value} applications`,
                  "Applications",
                ]}
              />

              <Line
                type="monotone"
                dataKey="applications"
                stroke="#06B6D4"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#0F172A",
                  stroke: "#22D3EE",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 7,
                  fill: "#22D3EE",
                  stroke: "#0F172A",
                  strokeWidth: 3,
                }}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-4">
          <div>
            <p className="text-xs text-slate-500">
              Peak month
            </p>

            <p className="mt-1 text-sm font-semibold text-white">
              {peak.month}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-500">
              Applications
            </p>

            <p className="mt-1 text-sm font-semibold text-cyan-400">
              {peak.applications}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MonthlyApplicationChart;

