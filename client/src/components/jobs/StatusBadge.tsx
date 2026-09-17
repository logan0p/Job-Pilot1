import { CheckCircle2, Clock3, Trophy, XCircle } from "lucide-react";
import type { JSX } from "react/jsx-runtime";

type Props = {
  status: string;
};

const StatusBadge = ({ status }: Props) => {
  const styles: Record<
    string,
    {
      className: string;
      icon: JSX.Element;
    }
  > = {
    Applied: {
      className:
        "bg-blue-500/15 text-blue-400 border-blue-500/30",
      icon: <Clock3 size={15} />,
    },

    Interview: {
      className:
        "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
      icon: <CheckCircle2 size={15} />,
    },

    Offer: {
      className:
        "bg-green-500/15 text-green-400 border-green-500/30",
      icon: <Trophy size={15} />,
    },

    Rejected: {
      className:
        "bg-red-500/15 text-red-400 border-red-500/30",
      icon: <XCircle size={15} />,
    },
  };

  const style =
    styles[status] ||
    styles["Applied"];

  return (
    <span
      className={`
      inline-flex
      items-center
      gap-2
      px-4
      py-2
      rounded-full
      border
      text-sm
      font-semibold
      ${style.className}
      `}
    >
      {style.icon}
      {status}
    </span>
  );
};

export default StatusBadge;