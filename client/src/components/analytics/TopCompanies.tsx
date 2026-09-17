type Company = {
  company: string;
  count: number;
};

type Props = {
  data: Company[];
};

const TopCompanies = ({ data }: Props) => {
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
        🏆 Top Companies
      </h2>

      {/* Empty State */}

      {data.length === 0 ? (
        <div className="flex min-h-[200px] items-center justify-center">
          <p className="text-slate-500">
            No company data available yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={item.company}
              className="
                flex
                items-center
                justify-between
                rounded-2xl
                bg-slate-800/60
                p-4
                transition
                hover:bg-slate-800
              "
            >
              <div className="flex items-center gap-4">

                {/* Rank */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-500/10
                    font-bold
                    text-cyan-400
                  "
                >
                  #{index + 1}
                </div>

                {/* Company */}

                <div>
                  <p className="font-semibold text-white">
                    {item.company}
                  </p>

                  <p className="text-sm text-slate-400">
                    {item.count} application
                    {item.count !== 1 ? "s" : ""}
                  </p>
                </div>

              </div>

              {/* Count */}

              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-400">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopCompanies;