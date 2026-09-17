import JobRow from "./JobRow";
import type { Job } from "../../types/job";

type Props = {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
};

const JobTable = ({
  jobs,
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 py-5 text-left">
              Company
            </th>

            <th className="px-6 py-5 text-left">
              Position
            </th>

            <th className="px-6 py-5 text-left">
              Location
            </th>

            <th className="px-6 py-5 text-left">
              Salary
            </th>

            <th className="px-6 py-5 text-left">
              Status
            </th>

            <th className="px-6 py-5 text-center">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-16 text-center text-slate-400"
              >
                No Jobs Found
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <JobRow
                key={job.id}
                job={job}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobTable;