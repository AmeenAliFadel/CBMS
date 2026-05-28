import { forwardRef } from "react";

interface TextareaFieldProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: string;
}

const TextareaField = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
    ({ label, error, className = "", disabled, ...props }, ref) => {
        return (
            <div>
                <label className="mb-2 block text-[13px] font-semibold text-text-primary">
                    {label}
                </label>

                <textarea
                    ref={ref}
                    {...props}
                    disabled={disabled}
                    className={`min-h-32 w-full rounded-xl border bg-bg px-4 py-3 text-[15px] text-text-primary outline-none transition-all placeholder:text-[#b0b5c5] focus:border-primary focus:ring-4 focus:ring-primary/10 ${error ? "border-red-500" : "border-border"
                        } ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`}
                />

                {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
            </div>
        );
    }
);

TextareaField.displayName = "TextareaField";

export default TextareaField;