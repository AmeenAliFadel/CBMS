import { BsThreeDots } from "react-icons/bs";
import { MdDone } from "react-icons/md";

export default function JourneyStep({
  label,
  active,
  done,
}: {
  label: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div className="relative flex flex-1 flex-col items-center text-center">
      <div
        className={`z-10 flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-semibold shadow-sm transition-all duration-300 sm:h-7 sm:w-7 sm:text-[11px] ${
          done
            ? "border-primary bg-primary text-white"
            : active
              ? "border-primary bg-white text-primary ring-4 ring-primary/15"
              : "border-slate-200 bg-white text-slate-300"
        }`}
      >
        {done ? <MdDone  className="h-4 w-4" /> : active ? <BsThreeDots /> : ""}
      </div>
      <span
        className={`mt-2 text-[11px] font-medium sm:text-xs ${
          active || done ? "text-primary" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
