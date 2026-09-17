import {
  Rocket,
  Target,
  Flame,
  Trophy,
  ChevronRight,
} from "lucide-react";

type Props = {
  applications: number;
  interviews: number;
  offers: number;
};

const CareerMission = ({
  applications,
  interviews,
  offers,
}: Props) => {

  const interviewRate =
    applications > 0
      ? Math.round(
          (interviews / applications) * 100
        )
      : 0;

  const missionProgress =
    Math.min(
      100,
      offers * 20 +
        interviews * 5 +
        applications
    );

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-[2rem]
        border
        border-cyan-500/20
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-cyan-950/30
        p-7
        shadow-2xl
        shadow-cyan-950/20
      "
    >

      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-64
          w-64
          rounded-full
          bg-cyan-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          left-1/3
          h-52
          w-52
          rounded-full
          bg-violet-500/10
          blur-3xl
        "
      />


      {/* Header */}

      <div
        className="
          relative
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
              mb-3
              flex
              items-center
              gap-2
              text-xs
              font-bold
              uppercase
              tracking-[0.2em]
              text-cyan-400
            "
          >

            <Rocket size={16} />

            Active Mission

          </div>


          <h2
            className="
              font-display
              text-2xl
              font-bold
              text-white
            "
          >
            Land Your Next Opportunity
          </h2>


          <p
            className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-slate-400
            "
          >
            Keep your pipeline moving.
            Every application increases your
            probability of reaching the next stage.
          </p>

        </div>


        {/* Mission level */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-violet-500/20
            bg-violet-500/5
            px-5
            py-4
          "
        >

          <Trophy
            size={24}
            className="text-violet-400"
          />

          <div>

            <p className="text-xs text-slate-500">
              Current Level
            </p>

            <p className="font-bold text-white">
              Career Explorer
            </p>

          </div>

        </div>

      </div>


      {/* Progress */}

      <div className="relative mt-8">

        <div
          className="
            mb-3
            flex
            items-center
            justify-between
          "
        >

          <span
            className="
              text-sm
              font-medium
              text-slate-300
            "
          >
            Mission Progress
          </span>

          <span
            className="
              font-display
              text-sm
              font-bold
              text-cyan-400
            "
          >
            {missionProgress}%
          </span>

        </div>


        <div
          className="
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
              shadow-cyan-500/30
              transition-all
              duration-1000
            "
            style={{
              width: `${missionProgress}%`,
            }}
          />

        </div>

      </div>


      {/* Metrics */}

      <div
        className="
          relative
          mt-8
          grid
          grid-cols-1
          gap-4
          md:grid-cols-3
        "
      >

        <Metric
          icon={<Target size={18} />}
          label="Applications"
          value={applications}
          description="Opportunities pursued"
        />


        <Metric
          icon={<Flame size={18} />}
          label="Interview Rate"
          value={`${interviewRate}%`}
          description="Application → interview"
        />


        <Metric
          icon={<Trophy size={18} />}
          label="Offers"
          value={offers}
          description="Wins secured"
        />

      </div>


      {/* Footer */}

      <div
        className="
          relative
          mt-7
          flex
          items-center
          justify-between
          border-t
          border-slate-800
          pt-5
        "
      >

        <p className="text-xs text-slate-500">
          🚀 Keep the momentum going.
        </p>

        <button
          className="
            flex
            items-center
            gap-1
            text-sm
            font-semibold
            text-cyan-400
            transition
            hover:text-cyan-300
          "
        >
          View strategy

          <ChevronRight size={16} />

        </button>

      </div>

    </section>
  );
};


const Metric = ({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  description: string;
}) => {

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-800
        bg-slate-950/50
        p-5
        transition
        hover:border-slate-700
        hover:bg-slate-950
      "
    >

      <div
        className="
          mb-4
          flex
          items-center
          gap-2
          text-cyan-400
        "
      >
        {icon}

        <span className="text-sm text-slate-400">
          {label}
        </span>
      </div>


      <p
        className="
          font-display
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </p>


      <p
        className="
          mt-1
          text-xs
          text-slate-600
        "
      >
        {description}
      </p>

    </div>
  );
};


export default CareerMission;