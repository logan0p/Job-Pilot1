import { useEffect, useState } from "react";
import { updateJob } from "../../services/job.service";
import toast from "react-hot-toast";

type Job = {
  id: string;
  company: string;
  position: string;
  location?: string;
  salary?: string;
  status: string;
  notes?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onUpdated: () => void;
  job: Job | null;
};

const EditJobModal = ({
  open,
  onClose,
  onUpdated,
  job,
}: Props) => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (job) {
      setCompany(job.company);
      setPosition(job.position);
      setLocation(job.location || "");
      setSalary(job.salary || "");
      setStatus(job.status);
      setNotes(job.notes || "");
    }
  }, [job]);

  if (!open || !job) return null;

  const handleUpdate = async () => {
    if (!company.trim()) {
      alert("Company is required");
      return;
    }

    if (!position.trim()) {
      alert("Position is required");
      return;
    }

    try {
      setLoading(true);

      await updateJob(job.id, {
        
        company,
        position,
        location,
        salary,
        status,
        notes,
      });

      await onUpdated();
      toast.success("Job updated successfully");

      onClose();
    } catch (err) {
      console.log(err);
      toast.error("Failed to update job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-3xl border border-slate-700 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            ✏️ Edit Job
          </h2>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ✕
          </button>

        </div>

        <div className="space-y-5">

          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="text"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />
            <input
            type="text"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <textarea
            rows={5}
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-xl bg-slate-800 p-4 outline-none resize-none focus:ring-2 focus:ring-cyan-500"
          />

        </div>

        <div className="mt-8 flex justify-end gap-4">

          <button
            type="button"
            onClick={onClose}
            className="
            rounded-xl
            border
            border-slate-700
            bg-slate-800
            px-6
            py-3
            font-medium
            hover:bg-slate-700
            transition
            "
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={loading}
            onClick={handleUpdate}
            className="
            rounded-xl
            bg-cyan-600
            px-6
            py-3
            font-semibold
            hover:bg-cyan-700
            disabled:opacity-50
            transition
            "
          >
            {loading ? "Updating..." : "💾 Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default EditJobModal;