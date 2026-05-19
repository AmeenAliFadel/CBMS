import type { ReactNode } from "react";

interface SocialButtonProps {
    icon: ReactNode;
    text: string;
}

export default function SocialButton({
    icon,
    text,
}: SocialButtonProps) {
    return (
        <a
            href="#"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition-colors hover:border-indigo-600 hover:text-indigo-600"
        >
            {icon}
            {text}
        </a>
    );
}