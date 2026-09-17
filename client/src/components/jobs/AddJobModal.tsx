import { useState } from "react";
import { createJob } from "../../services/job.service";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  onJobAdded: () => void;
};

const AddJobModal = ({open,onClose,onJobAdded,}: Props) => {

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [status, setStatus] = useState("Applied");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const resetForm = () => {
    setCompany("");
    setPosition("");
    setLocation("");
    setSalary("");
    setStatus("Applied");
    setNotes("");
  };

  const handleSave = async () => {
    alert("1️⃣ Save button clicked");

    console.log("Company:", company);
    console.log("Position:", position);
    console.log("Location:", location);

    if (!company.trim()) {
      alert("❌ Company is required");
      return;
    }

    if (!position.trim()) {
      alert("❌ Position is required");
      return;
    }

    if (!location.trim()) {
      alert("❌ Location is required");
      return;
    }

    alert("2️⃣ Validation Passed");

    try {
      setLoading(true);

      alert("3️⃣ Sending request to backend...");

      const response = await createJob({
        company,
        position,
        location,
        salary,
        status,
        notes,
      });

      console.log("SUCCESS:", response);

      toast.success("Job added successfully");

resetForm();

onClose();

onJobAdded();

    } catch (error: any) {
      console.error("========== ERROR ==========");
      console.error(error);

      if (error.response) {
        console.log("STATUS:", error.response.status);
        console.log("DATA:", error.response.data);

        alert(
          `Status: ${error.response.status}\n\n${JSON.stringify(
            error.response.data,
            null,
            2
          )}`
        );
      } else {
        alert("❌ Cannot connect to backend.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">

      <div className="bg-slate-900 w-[550px] rounded-2xl border border-slate-700 p-8 shadow-2xl">

        <h2 className="text-3xl font-bold text-white mb-6">
          🚀 Add New Job
        </h2>

        <div className="space-y-4">

          <input
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            placeholder="Position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            placeholder="Salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />

          <select
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>

          <textarea
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            rows={4}
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={() => {
              resetForm();
              onClose();
            }}
            className="px-6 py-3 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "🚀 Save Job"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default AddJobModal;