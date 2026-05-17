export default function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-primary shadow-sm">
      {children}
    </div>
  );
}
