type Props = {
  open: boolean;
  company: string;
  loading: boolean;
  onClose: () => void;
  onDelete: () => void;
};

const DeleteJobModal = ({
  open,
  company,
  loading,
  onClose,
  onDelete,
}: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-3xl border border-red-500/30 bg-slate-900 p-8 shadow-2xl">

        <div className="text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/20 text-5xl">
            🗑️
          </div>

          <h2 className="text-3xl font-bold text-white">
            Delete Job
          </h2>

          <p className="mt-4 text-slate-400">
            Are you sure you want to delete
          </p>

          <p className="mt-2 text-xl font-bold text-red-400">
            {company}
          </p>

          <p className="mt-5 text-sm text-slate-500">
            This action cannot be undone.
          </p>

        </div>

        <div className="mt-8 flex gap-4">

          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-700 py-3 hover:bg-slate-800 transition"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={onDelete}
            className="flex-1 rounded-xl bg-red-600 py-3 font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteJobModal;