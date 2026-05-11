export default function Field({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-[13px] font-semibold text-text-primary mb-2">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-14 rounded-xl border border-border bg-bg px-4 text-[15px] text-text-primary placeholder:text-[#b0b5c5] outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all"
      />
    </div>
  );
}
