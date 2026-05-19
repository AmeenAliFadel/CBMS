export default function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article data-aos="fade-up"
      className={`relative overflow-hidden rounded-[1.15rem] border border-slate-200/90 bg-white/70 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.04)] backdrop-blur-sm ${className}`}
    >
      {children}
    </article>
  );
}