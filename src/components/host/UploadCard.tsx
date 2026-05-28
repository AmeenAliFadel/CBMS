import { forwardRef, useImperativeHandle, useRef } from "react";

interface UploadCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  error?: string;
  fileName?: string;
  disabled?: boolean;
  onFileChange: (file: File | undefined) => void;
}

const UploadCard = forwardRef<HTMLInputElement, UploadCardProps>(
  ({ icon, title, subtitle, error, fileName, disabled, onFileChange }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    const handleClick = () => {
      if (disabled) return;
      inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      onFileChange(file);
    };

    return (
      <div className="w-full">
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          className="hidden"
          onChange={handleChange}
          disabled={disabled}
        />

        <button
          type="button"
          onClick={handleClick}
          disabled={disabled}
          className="group flex h-40 w-full flex-col items-center justify-center rounded-xl border border-dashed border-border bg-bg px-6 text-center transition-all hover:border-primary hover:bg-bg disabled:cursor-not-allowed disabled:opacity-60"
        >
          <div className="mb-4 text-primary">{icon}</div>

          <h3 className="text-[12px] font-semibold text-text-primary sm:text-[16px]">
            {title}
          </h3>

          <p className="mt-1 text-[12px] text-text-primary sm:text-[14px]">
            {subtitle}
          </p>

          {fileName ? (
            <p className="mt-3 max-w-full truncate text-[12px] font-medium text-primary">
              {fileName}
            </p>
          ) : null}
        </button>

        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
      </div>
    );
  }
);

UploadCard.displayName = "UploadCard";

export default UploadCard;