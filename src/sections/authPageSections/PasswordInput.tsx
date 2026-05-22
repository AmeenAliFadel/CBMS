import { forwardRef, useState, type InputHTMLAttributes } from "react";
import {
    IoEyeOffOutline,
    IoEyeOutline,
} from "react-icons/io5";

interface PasswordInputProps
    extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const PasswordInput = forwardRef<
    HTMLInputElement,
    PasswordInputProps
>(({ label, error, className = "", ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

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
                    type={showPassword ? "text" : "password"}
                    {...props}
                    className={`w-full rounded-xl border bg-background px-4 py-4 pr-12 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary focus:border-primary ${error
                            ? "border-red-500"
                            : "border-border"
                        } ${className}`}
                />

                <button
                    type="button"
                    onClick={() =>
                        setShowPassword((prev) => !prev)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-text-secondary transition-colors hover:text-text-primary"
                    aria-label={
                        showPassword
                            ? "Hide password"
                            : "Show password"
                    }
                >
                    {showPassword ? (
                        <IoEyeOffOutline />
                    ) : (
                        <IoEyeOutline />
                    )}
                </button>
            </div>

            {error ? (
                <p className="text-sm text-red-500">{error}</p>
            ) : null}
        </div>
    );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;