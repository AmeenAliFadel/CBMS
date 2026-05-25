import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface ContactTextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

const ContactTextarea = forwardRef<HTMLTextAreaElement, ContactTextareaProps>(
    ({ label, error, className = "", disabled, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-700">
                    {label}
                </label>

                <textarea
                    ref={ref}
                    disabled={disabled}
                    className={`min-h-32 resize-y rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 ${error
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

ContactTextarea.displayName = "ContactTextarea";

export default ContactTextarea;