import { Pencil, Trash2 } from "lucide-react";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

const ActionButtons = ({
  onEdit,
  onDelete,
}: Props) => {
  return (
    <div className="flex items-center justify-center gap-3">

      <button
        onClick={onEdit}
        className="
          flex
          items-center
          justify-center
          h-10
          w-10
          rounded-xl
          bg-cyan-500/20
          text-cyan-400
          hover:bg-cyan-500
          hover:text-white
          transition-all
          duration-300
        "
        title="Edit Job"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="
          flex
          items-center
          justify-center
          h-10
          w-10
          rounded-xl
          bg-red-500/20
          text-red-400
          hover:bg-red-500
          hover:text-white
          transition-all
          duration-300
        "
        title="Delete Job"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
};

export default ActionButtons;
