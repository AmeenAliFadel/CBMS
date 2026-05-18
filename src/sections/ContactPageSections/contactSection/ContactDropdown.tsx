import { FiChevronDown } from "react-icons/fi";

interface ContactDropdownProps {
    value: string;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    onSelect: (value: string) => void;
}

export default function ContactDropdown({
    value,
    options,
    isOpen,
    onToggle,
    onSelect,
}: ContactDropdownProps) {
    return (
        <div className="flex flex-col gap-1.5">

            <label className="text-xs font-medium text-gray-700">
                Subject
            </label>

            <div className="relative">

                <button
                    type="button"
                    onClick={onToggle}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 transition-colors hover:border-indigo-600"
                >
                    <span>{value}</span>

                    <FiChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                </button>

                {isOpen && (
                    <ul className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 m-0 list-none rounded-lg border border-gray-200 bg-white p-1 shadow-lg">

                        {options.map((option) => (
                            <li
                                key={option}
                                onClick={() => onSelect(option)}
                                className={`cursor-pointer rounded-md px-3 py-2 text-sm transition-colors ${value === option
                                        ? "bg-indigo-50 font-medium text-indigo-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}