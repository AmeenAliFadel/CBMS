import type { ChangeEvent } from "react";

interface AuthInputProps {
    label: string;
    type?: string;
    placeholder: string;
    id: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function AuthInput({
    label,
    type = "text",
    placeholder,
    id,
    value,
    onChange,
}: AuthInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="text-sm font-semibold text-text-primary"
            >
                {label}
            </label>

            <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full rounded-xl border border-border bg-background px-4 py-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
            />
        </div>
    );
}