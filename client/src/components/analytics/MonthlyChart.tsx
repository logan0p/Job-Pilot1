import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  data: {
    month: string;
    jobs: number;
  }[];
};

const MonthlyChart = ({ data }: Props) => {
  return (
    <div
      className="
      rounded-3xl
      border
      border-slate-800
      bg-slate-900
      p-6
      h-full
      "
    >
      <div className="mb-8">

        <h2 className="text-2xl font-bold">

          📈 Monthly Applications

        </h2>

        <p className="text-slate-400">

          Applications submitted over time

        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="#1e293b"
          />

          <XAxis
            dataKey="month"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="jobs"
            stroke="#06b6d4"
            strokeWidth={4}
            dot={{
              r: 6,
              fill: "#06b6d4",
            }}
            activeDot={{
              r: 9,
            }}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
};

export default MonthlyChart;