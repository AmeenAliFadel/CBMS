import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface ContactInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const ContactInput = forwardRef<HTMLInputElement, ContactInputProps>(
    ({ label, error, className = "", disabled, ...props }, ref) => {
        return (
            <div className="flex flex-1 flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">
                    {label}
                </label>

                <input
                    ref={ref}
                    disabled={disabled}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 ${error
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-indigo-600"
                        } ${className}`}
                    {...props}
                />

                {error ? (
                    <p className="text-xs font-medium text-red-500">
                        {error}
                    </p>
                ) : null}
            </div>
        );
    }
);

ContactInput.displayName = "ContactInput";

export default ContactInput;