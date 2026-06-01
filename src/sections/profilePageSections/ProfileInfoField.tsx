interface Props {
  label: string;
  value?: string | null;
}

export default function ProfileInfoField({
  label,
  value,
}: Props) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-text-secondary">
        {label}
      </span>

      <span className="font-medium text-text-primary">
        {value?.trim() || "Not provided"}
      </span>
    </div>
  );
}