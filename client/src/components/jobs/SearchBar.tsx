type Props = {
  value: string;
  onChange: (value: string) => void;
};

const SearchBar = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="🔍 Search company or position..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full md:w-96 bg-slate-900 border border-slate-700 rounded-xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
    />
  );
};

export default SearchBar;