import type { HamburgerProps } from "../../types/ui/ui";

export default function HamburgerIcon({ open, onClick }: HamburgerProps) {
  const line =
    "absolute w-6 h-[2px] bg-current transition-all duration-300 ease-in-out text-primary";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      className="relative w-10 h-10 flex items-center justify-center text-primary lg:hidden"
    >
      <span className={`${line} ${open ? "rotate-45" : "-translate-y-2"}`} />
      <span className={`${line} ${open ? "opacity-0" : "opacity-100"}`} />
      <span className={`${line} ${open ? "-rotate-45" : "translate-y-2"}`} />
    </button>
  );
}