import StatCard from "./StatCard";

type Props = {
  data: {
    totalJobs: number;
    Applied: number;
    Interview: number;
    Offer: number;
    Rejected: number;
  };
};

const StatsCards = ({ data }: Props) => {
  return (
    <div
      className="
        grid
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-5
      "
    >
      {/* TOTAL APPLICATIONS */}

      <StatCard
        title="Applications"
        value={data.totalJobs}
        subtitle="Total Applications"
        color="cyan"
      />

      {/* APPLIED */}

      <StatCard
        title="Applied"
        value={data.Applied}
        subtitle="Applications Sent"
        color="blue"
      />

      {/* INTERVIEWS */}

      <StatCard
        title="Interviews"
        value={data.Interview}
        subtitle="Interview Invitations"
        color="yellow"
      />

      {/* OFFERS */}

      <StatCard
        title="Offers"
        value={data.Offer}
        subtitle="Offers Received"
        color="green"
      />

      {/* REJECTED */}

      <StatCard
        title="Rejected"
        value={data.Rejected}
        subtitle="Applications Closed"
        color="red"
      />
    </div>
  );
};

export default StatsCards;