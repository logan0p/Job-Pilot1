import {
  Building2,
  MapPin,
  Briefcase,
} from "lucide-react";

type Job = {
  id: string;
  company: string;
  position: string;
  location: string;
  status: string;
};

type Props = {
  jobs: Job[];
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Applied":
      return "bg-blue-500/20 text-blue-400";

    case "Interview":
      return "bg-yellow-500/20 text-yellow-400";

    case "Offer":
      return "bg-green-500/20 text-green-400";

    case "Rejected":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-slate-500/20 text-slate-300";
  }
};

const RecentApplications = ({
  jobs,
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

      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          🕒 Recent Applications
        </h2>

        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400">
          {jobs.length} Recent
        </span>
      </div>

      {/* Empty State */}

      {jobs.length === 0 ? (
        <div
          className="
            flex
            min-h-[220px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-700
            bg-slate-800/30
            text-center
          "
        >
          <Building2
            size={42}
            className="mb-4 text-slate-600"
          />

          <h3 className="text-lg font-semibold text-slate-300">
            No applications yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Add your first job application to see it here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.slice(0, 5).map((job) => (
            <div
              key={job.id}
              className="
                flex
                flex-col
                gap-4
                rounded-2xl
                bg-slate-800/60
                p-4
                transition
                hover:bg-slate-800
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >
              {/* Company */}

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-cyan-500/15
                  "
                >
                  <Building2
                    className="text-cyan-400"
                    size={26}
                  />
                </div>

                <div className="min-w-0">

                  <h3 className="truncate text-lg font-semibold">
                    {job.company}
                  </h3>

                  <div
                    className="
                      mt-1
                      flex
                      flex-col
                      gap-1
                      text-sm
                      text-slate-400
                      sm:flex-row
                      sm:items-center
                      sm:gap-4
                    "
                  >

                    <div className="flex items-center gap-1">
                      <Briefcase size={15} />

                      <span className="truncate">
                        {job.position}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <MapPin size={15} />

                      <span>
                        {job.location || "Not specified"}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              {/* Status */}

              <span
                className={`
                  w-fit
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  ${getStatusColor(job.status)}
                `}
              >
                {job.status}
              </span>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentApplications;