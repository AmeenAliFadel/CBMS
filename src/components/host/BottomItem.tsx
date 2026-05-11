export default function BottomItem({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="text-primary">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
