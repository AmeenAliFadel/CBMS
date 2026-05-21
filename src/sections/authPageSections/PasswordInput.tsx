import { useState } from "react";
import type { ChangeEvent } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

interface PasswordInputProps {
    label: string;
    id: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function PasswordInput({
    label,
    id,
    placeholder = "••••••••",
    value,
    onChange,
}: PasswordInputProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor={id}
                className="text-sm font-semibold text-text-primary"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    id={id}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className="w-full rounded-xl border border-border bg-background px-4 py-4 pr-12 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-text-secondary transition-colors hover:text-text-primary"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
            </div>
        </div>
    );
}