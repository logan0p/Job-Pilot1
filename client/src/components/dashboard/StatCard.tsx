import {
  BriefcaseBusiness,
  Send,
  Users,
  Trophy,
  XCircle,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

type Props = {
  title: string;
  value: number;
  color: string;
};

const StatCard = ({
  title,
  value,
  color,
}: Props) => {
  const getColor = () => {
    switch (color) {
      case "cyan":
        return {
          bg: "from-cyan-500/20 to-cyan-400/10",
          border: "border-cyan-500/30",
          text: "text-cyan-400",
        };

      case "blue":
        return {
          bg: "from-blue-500/20 to-blue-400/10",
          border: "border-blue-500/30",
          text: "text-blue-400",
        };

      case "yellow":
        return {
          bg: "from-yellow-500/20 to-yellow-400/10",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
        };

      case "green":
        return {
          bg: "from-green-500/20 to-green-400/10",
          border: "border-green-500/30",
          text: "text-green-400",
        };

      case "red":
        return {
          bg: "from-red-500/20 to-red-400/10",
          border: "border-red-500/30",
          text: "text-red-400",
        };

      default:
        return {
          bg: "from-slate-500/20 to-slate-400/10",
          border: "border-slate-500/30",
          text: "text-white",
        };
    }
  };

  const getIcon = () => {
    switch (title) {
      case "Total":
        return <BriefcaseBusiness size={34} />;

      case "Applied":
        return <Send size={34} />;

      case "Interview":
        return <Users size={34} />;

      case "Offer":
        return <Trophy size={34} />;

      case "Rejected":
        return <XCircle size={34} />;

      default:
        return <TrendingUp size={34} />;
    }
  };

  const style = getColor();

  return (
    <motion.div
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        ${style.border}
        bg-gradient-to-br
        ${style.bg}
        backdrop-blur-xl
        p-6
        shadow-xl
      `}
    >
      {/* Glow */}
      <div
        className="
          absolute
          -right-12
          -top-12
          h-40
          w-40
          rounded-full
          bg-white/5
          blur-3xl
        "
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2
            className={`
              mt-5
              text-5xl
              font-black
              ${style.text}
            `}
          >
            {value}
          </h2>
        </div>

        <div
          className={`
            rounded-2xl
            bg-slate-900/70
            p-4
            ${style.text}
          `}
        >
          {getIcon()}
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-between">
        <span className="text-sm text-slate-400">
          Updated just now
        </span>

        <span
          className={`
            text-sm
            font-semibold
            ${style.text}
          `}
        >
          Live
        </span>
      </div>
    </motion.div>
  );
};

export default StatCard;