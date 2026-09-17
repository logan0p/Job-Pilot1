
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
  data: {
    totalJobs: number;
    Applied: number;
    Interview: number;
    Offer: number;
    Rejected: number;
  };
};

type CardConfig = {
  title: string;
  value: number;
  color: string;
  icon: React.ReactNode;
  description: string;
};

const DashboardCards = ({ data }: Props) => {
  const cards: CardConfig[] = [
    {
      title: "Total",
      value: data.totalJobs,
      color: "cyan",
      icon: <BriefcaseBusiness size={28} />,
      description: "Total applications",
    },
    {
      title: "Applied",
      value: data.Applied,
      color: "blue",
      icon: <Send size={28} />,
      description: "Applications sent",
    },
    {
      title: "Interview",
      value: data.Interview,
      color: "yellow",
      icon: <Users size={28} />,
      description: "Interview invitations",
    },
    {
      title: "Offer",
      value: data.Offer,
      color: "green",
      icon: <Trophy size={28} />,
      description: "Offers received",
    },
    {
      title: "Rejected",
      value: data.Rejected,
      color: "red",
      icon: <XCircle size={28} />,
      description: "Applications closed",
    },
  ];

  const getStyles = (color: string) => {
    switch (color) {
      case "cyan":
        return {
          border: "border-cyan-500/20",
          glow: "bg-cyan-500/10",
          icon: "text-cyan-400",
          iconBg: "bg-cyan-500/10",
          accent: "from-cyan-400 to-cyan-600",
        };

      case "blue":
        return {
          border: "border-blue-500/20",
          glow: "bg-blue-500/10",
          icon: "text-blue-400",
          iconBg: "bg-blue-500/10",
          accent: "from-blue-400 to-blue-600",
        };

      case "yellow":
        return {
          border: "border-yellow-500/20",
          glow: "bg-yellow-500/10",
          icon: "text-yellow-400",
          iconBg: "bg-yellow-500/10",
          accent: "from-yellow-400 to-yellow-600",
        };

      case "green":
        return {
          border: "border-green-500/20",
          glow: "bg-green-500/10",
          icon: "text-green-400",
          iconBg: "bg-green-500/10",
          accent: "from-green-400 to-green-600",
        };

      case "red":
        return {
          border: "border-red-500/20",
          glow: "bg-red-500/10",
          icon: "text-red-400",
          iconBg: "bg-red-500/10",
          accent: "from-red-400 to-red-600",
        };

      default:
        return {
          border: "border-slate-700",
          glow: "bg-slate-500/10",
          icon: "text-slate-400",
          iconBg: "bg-slate-500/10",
          accent: "from-slate-400 to-slate-600",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
      {cards.map((card, index) => {
        const styles = getStyles(card.color);

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -6,
              scale: 1.015,
            }}
            className={`
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              ${styles.border}
              bg-slate-900/70
              p-6
              shadow-xl
              backdrop-blur-xl
              transition-all
              duration-300
            `}
          >
            {/* Background glow */}
            <div
              className={`
                absolute
                -right-16
                -top-16
                h-40
                w-40
                rounded-full
                ${styles.glow}
                blur-3xl
                transition-all
                duration-500
                group-hover:scale-150
              `}
            />

            {/* Top accent */}
            <div
              className={`
                absolute
                left-0
                top-0
                h-1
                w-full
                bg-gradient-to-r
                ${styles.accent}
                opacity-70
              `}
            />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {card.title}
                  </p>

                  <p className="mt-2 text-sm text-slate-400">
                    {card.description}
                  </p>
                </div>

                <div
                  className={`
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-2xl
                    ${styles.iconBg}
                    ${styles.icon}
                    border
                    ${styles.border}
                    transition-transform
                    duration-300
                    group-hover:rotate-6
                  `}
                >
                  {card.icon}
                </div>
              </div>

              {/* Number */}
              <div className="mt-7 flex items-end justify-between">
                <motion.h2
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08 + 0.15,
                  }}
                  className="text-5xl font-black tracking-tight text-white"
                >
                  {card.value}
                </motion.h2>

                <div
                  className={`
                    mb-1
                    flex
                    items-center
                    gap-1
                    text-xs
                    font-semibold
                    ${styles.icon}
                  `}
                >
                  <TrendingUp size={14} />
                  Live
                </div>
              </div>

              {/* Bottom line */}
              <div className="mt-6 h-px w-full bg-slate-800" />

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  JobPilot tracking
                </span>

                <span className="text-xs font-medium text-slate-400">
                  Updated now
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default DashboardCards;

