type Props = {
  value: string;
  onChange: (value: string) => void;
};

const StatusFilter = ({
  value,
  onChange,
}: Props) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white"
    >
      <option value="">All Status</option>
      <option value="Applied">Applied</option>
      <option value="Interview">Interview</option>
      <option value="Offer">Offer</option>
      <option value="Rejected">Rejected</option>
    </select>
  );
};

export default StatusFilter;