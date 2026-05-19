interface ContactTextareaProps {
    label: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => void;
}

export default function ContactTextarea({
    label,
    name,
    value,
    placeholder,
    onChange,
}: ContactTextareaProps) {
    return (
        <div className="flex flex-col gap-1.5">

            <label className="text-xs font-medium text-gray-700">
                {label}
            </label>

            <textarea
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="min-h-32 resize-y rounded-lg border border-gray-200 px-3.5 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-indigo-600"
            />
        </div>
    );
}