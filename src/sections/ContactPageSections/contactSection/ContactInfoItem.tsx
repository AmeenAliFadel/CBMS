import type { ReactNode } from "react";

interface ContactInfoItemProps {
    icon: ReactNode;
    label: string;
    value: string;
}

export default function ContactInfoItem({
    icon,
    label,
    value,
}: ContactInfoItemProps) {
    return (
        <div className="flex items-center gap-3.5">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20">
                {icon}
            </div>

            <div>
                <span className="mb-0.5 block text-[10px] font-semibold tracking-widest text-white/60">
                    {label}
                </span>

                <p className="m-0 text-sm font-semibold">
                    {value}
                </p>
            </div>
        </div>
    );
}