import { Link } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Building2,
} from "lucide-react";

import type { Job } from "../../types/job";

type Props = {
  job: Job;
  onEdit: (job: Job) => void;
  onDelete: (job: Job) => void;
};

const JobRow = ({
  job,
  onEdit,
  onDelete,
}: Props) => {

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Applied":
        return "border-blue-500/30 bg-blue-500/10 text-blue-400";

      case "Interview":
        return "border-yellow-500/30 bg-yellow-500/10 text-yellow-400";

      case "Offer":
        return "border-green-500/30 bg-green-500/10 text-green-400";

      case "Rejected":
        return "border-red-500/30 bg-red-500/10 text-red-400";

      default:
        return "border-slate-700 bg-slate-800 text-slate-300";
    }
  };

  return (
    <tr
      className="
        border-t
        border-slate-800
        transition
        hover:bg-slate-800/40
      "
    >

      {/* =========================
          COMPANY
      ========================== */}

      <td className="px-6 py-5">

        <Link
          to={`/jobs/${job.id}`}
          className="
            group
            flex
            items-center
            gap-3
            w-fit
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-cyan-500/10
              text-cyan-400
              transition
              group-hover:bg-cyan-500/20
            "
          >
            <Building2 size={18} />
          </div>

          <div>

            <p
              className="
                font-semibold
                text-white
                transition
                group-hover:text-cyan-400
              "
            >
              {job.company}
            </p>

            <p
              className="
                text-xs
                text-slate-500
              "
            >
              View application
            </p>

          </div>

        </Link>

      </td>


      {/* =========================
          POSITION
      ========================== */}

      <td className="px-6 py-5">

        <Link
          to={`/jobs/${job.id}`}
          className="
            text-slate-300
            transition
            hover:text-cyan-400
          "
        >
          {job.position}
        </Link>

      </td>


      {/* =========================
          LOCATION
      ========================== */}

      <td className="px-6 py-5 text-slate-400">

        {job.location || "Not specified"}

      </td>


      {/* =========================
          SALARY
      ========================== */}

      <td className="px-6 py-5 text-slate-400">

        {job.salary || "Not specified"}

      </td>


      {/* =========================
          STATUS
      ========================== */}

      <td className="px-6 py-5">

        <span
          className={`
            inline-flex
            rounded-full
            border
            px-3
            py-1
            text-xs
            font-semibold
            ${getStatusStyle(job.status)}
          `}
        >
          {job.status}
        </span>

      </td>


      {/* =========================
          ACTIONS
      ========================== */}

      <td className="px-6 py-5">

        <div
          className="
            flex
            items-center
            justify-center
            gap-2
          "
        >

          {/* EDIT */}

          <button
            type="button"
            onClick={() => onEdit(job)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-slate-800
              text-slate-400
              transition
              hover:bg-cyan-500/10
              hover:text-cyan-400
            "
            title="Edit job"
          >
            <Pencil size={16} />
          </button>


          {/* DELETE */}

          <button
            type="button"
            onClick={() => onDelete(job)}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-slate-800
              text-slate-400
              transition
              hover:bg-red-500/10
              hover:text-red-400
            "
            title="Delete job"
          >
            <Trash2 size={16} />
          </button>

        </div>

      </td>

    </tr>
  );
};

export default JobRow;