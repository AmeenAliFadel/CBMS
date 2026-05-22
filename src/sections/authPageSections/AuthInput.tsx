import {
    forwardRef,
    type InputHTMLAttributes,
    type ReactNode,
} from "react";

interface AuthInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    rightIcon?: ReactNode;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, rightIcon, className = "", ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                <label
                    htmlFor={props.id}
                    className="text-sm font-semibold text-text-primary"
                >
                    {label}
                </label>

                <div className="relative">
                    <input
                        ref={ref}
                        {...props}
                        className={`w-full rounded-xl border bg-background px-4 py-4 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary ${error
                                ? "border-red-500"
                                : "border-border"
                            } ${className}`}
                    />

                    {rightIcon ? (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {rightIcon}
                        </div>
                    ) : null}
                </div>

                {error ? (
                    <p className="text-sm text-red-500">{error}</p>
                ) : null}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;