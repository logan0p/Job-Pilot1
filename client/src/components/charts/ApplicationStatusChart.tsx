
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";
import {
  PieChart as PieChartIcon,
} from "lucide-react";

type Props = {
  data: {
    Applied: number;
    Interview: number;
    Offer: number;
    Rejected: number;
  };
};

const COLORS = [
  "#3B82F6",
  "#FACC15",
  "#22C55E",
  "#EF4444",
];

const ApplicationStatusChart = ({
  data,
}: Props) => {
  const chartData = [
    {
      name: "Applied",
      value: data.Applied,
    },
    {
      name: "Interview",
      value: data.Interview,
    },
    {
      name: "Offer",
      value: data.Offer,
    },
    {
      name: "Rejected",
      value: data.Rejected,
    },
  ];

  const total =
    data.Applied +
    data.Interview +
    data.Offer +
    data.Rejected;

  const activeStatuses = chartData.filter(
    (item) => item.value > 0
  );

  const bestStatus =
    activeStatuses.length > 0
      ? activeStatuses.reduce((best, current) =>
          current.value > best.value
            ? current
            : best
        )
      : null;

  const getPercentage = (value: number) => {
    if (total === 0) return 0;

    return Math.round(
      (value / total) * 100
    );
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
        delay: 0.1,
      }}
      className="
        group
        relative
        h-[450px]
        overflow-hidden
        rounded-3xl
        border
        border-purple-500/10
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
          bg-purple-500/10
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
          bg-cyan-500/5
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
          from-purple-400
          via-pink-500
          to-cyan-400
          opacity-70
        "
      />

      <div className="relative z-10 flex h-full flex-col">

        {/* Header */}

        <div className="flex items-start justify-between">
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
                border-purple-500/20
                bg-purple-500/10
                text-purple-400
              "
            >
              <PieChartIcon size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">
                Application Status
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Current application pipeline
              </p>
            </div>

          </div>

          {/* Total */}

          <div className="text-right">

            <p className="text-xs uppercase tracking-wider text-slate-500">
              Total
            </p>

            <p className="mt-1 text-2xl font-black text-purple-400">
              {total}
            </p>

          </div>
        </div>

        {/* Chart */}

        <div className="relative min-h-0 flex-1">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={105}
                innerRadius={68}
                paddingAngle={5}
                stroke="none"
                animationBegin={200}
                animationDuration={1000}
                animationEasing="ease-out"
              >

                {chartData.map(
                  (item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index]}
                    />
                  )
                )}

              </Pie>

              <Tooltip
                contentStyle={{
                  backgroundColor:
                    "#0F172A",
                  border:
                    "1px solid rgba(168, 85, 247, 0.3)",
                  borderRadius: "16px",
                  boxShadow:
                    "0 20px 40px rgba(0,0,0,0.4)",
                  padding:
                    "12px 16px",
                }}
                labelStyle={{
                  color: "#94A3B8",
                }}
                itemStyle={{
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
                formatter={(
                  value,
                  name
                ) => [
                  `${value} applications`,
                  name,
                ]}
              />

            </PieChart>
          </ResponsiveContainer>

          {/* Center value */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              flex
              -translate-x-1/2
              -translate-y-1/2
              flex-col
              items-center
              justify-center
            "
          >

            <span className="text-3xl font-black text-white">
              {total}
            </span>

            <span className="mt-1 text-xs text-slate-500">
              Applications
            </span>

          </div>

        </div>

        {/* Status legend */}

        <div className="grid grid-cols-2 gap-3">

          {chartData.map(
            (item, index) => {
              const percentage =
                getPercentage(
                  item.value
                );

              return (
                <motion.div
                  key={item.name}
                  whileHover={{
                    scale: 1.02,
                  }}
                  className="
                    rounded-2xl
                    border
                    border-slate-800
                    bg-slate-800/40
                    px-3
                    py-2.5
                    transition
                    hover:bg-slate-800/70
                  "
                >

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index],
                          boxShadow: `0 0 10px ${COLORS[index]}`,
                        }}
                      />

                      <span className="text-xs font-medium text-slate-300">
                        {item.name}
                      </span>

                    </div>

                    <span className="text-xs font-bold text-white">
                      {item.value}
                    </span>

                  </div>

                  <div className="mt-2 flex items-center justify-between">

                    <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-700">

                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: `${percentage}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3,
                        }}
                        className="h-full rounded-full"
                        style={{
                          backgroundColor:
                            COLORS[index],
                        }}
                      />

                    </div>

                    <span className="ml-2 text-[10px] text-slate-500">
                      {percentage}%
                    </span>

                  </div>

                </motion.div>
              );
            }
          )}

        </div>

        {/* Footer */}

        <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">

          <span className="text-xs text-slate-500">
            Strongest pipeline
          </span>

          <span className="text-xs font-semibold text-white">
            {bestStatus
              ? bestStatus.name
              : "No applications"}
          </span>

        </div>

      </div>
    </motion.div>
  );
};

export default ApplicationStatusChart;

