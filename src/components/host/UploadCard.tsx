import React, { useRef } from "react";

export default function UploadCard({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      console.log(file);
    }
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={handleClick}
        className="group h-40 w-full rounded-xl border border-dashed border-border bg-bg hover:border-primary hover:bg-bg transition-all flex flex-col items-center justify-center text-center px-6"
      >
        <div className="mb-4 text-primary">{icon}</div>

        <h3 className="text-[12px] sm:text-[16px] font-semibold text-text-primary">{title}</h3>

        <p className="mt-1 text-[12px] sm:text-[14px] text-text-primary">{subtitle}</p>
      </button>
    </>
  );
}
