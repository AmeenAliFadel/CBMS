interface ContactInputProps {
    label: string;
    name: string;
    type?: string;
    value: string;
    placeholder: string;
    onChange: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

export default function ContactInput({
    label,
    name,
    type = "text",
    value,
    placeholder,
    onChange,
}: ContactInputProps) {
    return (
        <div className="flex flex-1 flex-col gap-1.5">

            <label className="text-xs font-medium text-gray-700">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600"
            />
        </div>
    );
}