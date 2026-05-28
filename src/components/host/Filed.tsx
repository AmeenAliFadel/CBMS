import { forwardRef } from "react";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Field = forwardRef<HTMLInputElement, FieldProps>(
  ({ label, error, className = "", disabled, ...props }, ref) => {
    return (
      <div>
        <label className="mb-2 block text-[13px] font-semibold text-text-primary">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          disabled={disabled}
          className={`h-14 w-full rounded-xl border bg-bg px-4 text-[15px] text-text-primary outline-none transition-all placeholder:text-[#b0b5c5] focus:border-primary focus:ring-4 focus:ring-primary/10 ${error ? "border-red-500" : "border-border"
            } ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className}`}
        />

        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      </div>
    );
  }
);

Field.displayName = "Field";

export default Field;