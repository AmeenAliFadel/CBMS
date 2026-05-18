import { HiOutlineBell } from "react-icons/hi2";

export default function NotesPage() {
  return (
    <section className="min-h-screen bg-background relative flex items-center justify-center overflow-hidden px-4">

      {/* Background Big Icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <HiOutlineBell
          className="text-primary/6 w-[420px] h-[420px] md:w-[600px] md:h-[600px] animate-float"
        />
      </div>

      {/* Soft Glow Circles */}
      <div className="absolute w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl -top-40 -left-40" />
      <div className="absolute w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl bottom-[-120px] right-[-120px]" />

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary/50  mb-3">
          No Notifications Yet
        </h1>

        <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
          You’re all caught up. We’ll notify you when something new arrives.
        </p>
      </div>

    </section>
  );
}