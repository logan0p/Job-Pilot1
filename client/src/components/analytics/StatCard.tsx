import {
  BriefcaseBusiness,
  Send,
  Users,
  Trophy,
  XCircle,
  TrendingUp,
} from "lucide-react";

import { motion } from "framer-motion";

type ColorType =
  | "cyan"
  | "blue"
  | "yellow"
  | "green"
  | "red";

type Props = {
  title: string;
  value: number;
  subtitle?: string;
  color: ColorType;
};

const StatCard = ({
  title,
  value,
  subtitle,
  color,
}: Props) => {
  // ==========================================
  // COLOR CONFIGURATION
  // ==========================================

  const getColor = () => {
    switch (color) {
      case "cyan":
        return {
          bg: "from-cyan-500/20 to-cyan-400/10",
          border: "border-cyan-500/30",
          text: "text-cyan-400",
          iconBg: "bg-cyan-500/10",
        };

      case "blue":
        return {
          bg: "from-blue-500/20 to-blue-400/10",
          border: "border-blue-500/30",
          text: "text-blue-400",
          iconBg: "bg-blue-500/10",
        };

      case "yellow":
        return {
          bg: "from-yellow-500/20 to-yellow-400/10",
          border: "border-yellow-500/30",
          text: "text-yellow-400",
          iconBg: "bg-yellow-500/10",
        };

      case "green":
        return {
          bg: "from-green-500/20 to-green-400/10",
          border: "border-green-500/30",
          text: "text-green-400",
          iconBg: "bg-green-500/10",
        };

      case "red":
        return {
          bg: "from-red-500/20 to-red-400/10",
          border: "border-red-500/30",
          text: "text-red-400",
          iconBg: "bg-red-500/10",
        };

      default:
        return {
          bg: "from-slate-500/20 to-slate-400/10",
          border: "border-slate-500/30",
          text: "text-white",
          iconBg: "bg-slate-500/10",
        };
    }
  };

  // ==========================================
  // ICON
  // ==========================================

  const getIcon = () => {
    switch (title) {
      case "Applications":
        return <BriefcaseBusiness size={30} />;

      case "Applied":
        return <Send size={30} />;

      case "Interviews":
        return <Users size={30} />;

      case "Offers":
        return <Trophy size={30} />;

      case "Rejected":
        return <XCircle size={30} />;

      default:
        return <TrendingUp size={30} />;
    }
  };

  const style = getColor();

  // ==========================================
  // UI
  // ==========================================

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

      {/* TOP */}

      <div className="relative flex items-start justify-between">
        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            {title}
          </p>

          <h2
            className={`
              mt-4
              text-5xl
              font-black
              ${style.text}
            `}
          >
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {/* ICON */}

        <div
          className={`
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            ${style.iconBg}
            ${style.text}
          `}
        >
          {getIcon()}
        </div>
      </div>

      {/* BOTTOM */}

      <div className="relative mt-8 flex items-center justify-between">
        <span className="text-sm text-slate-500">
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