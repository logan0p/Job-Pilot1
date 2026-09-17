type PerformanceData = {
  interviewRate: number;
  offerRate: number;
  rejectionRate: number;
};

type Props = {
  data: PerformanceData;
};

const PerformanceCard = ({
  data,
}: Props) => {
  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-800
        bg-slate-900
        p-6
      "
    >
      {/* Header */}

      <h2 className="mb-6 text-2xl font-bold">
        🎯 Performance
      </h2>

      <div className="space-y-6">

        {/* Interview Rate */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-slate-300">
              Interview Rate
            </span>

            <span className="font-bold text-yellow-400">
              {data.interviewRate}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all duration-500"
              style={{
                width: `${Math.min(
                  data.interviewRate,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Offer Rate */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-slate-300">
              Offer Rate
            </span>

            <span className="font-bold text-green-400">
              {data.offerRate}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  data.offerRate,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

        {/* Rejection Rate */}

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-slate-300">
              Rejection Rate
            </span>

            <span className="font-bold text-red-400">
              {data.rejectionRate}%
            </span>
          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-red-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  data.rejectionRate,
                  100
                )}%`,
              }}
            />
          </div>
        </div>

      </div>

      {/* Summary */}

      <div className="mt-8 rounded-2xl bg-slate-800/60 p-4">
        <p className="text-sm text-slate-400">
          Your current job-search performance
          based on your applications.
        </p>
      </div>
    </div>
  );
};

export default PerformanceCard;