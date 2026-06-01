interface CarSpec {
    icon: string;
    value: string;
    label: string;
}

interface CarSpecsProps {
    specs: CarSpec[];
}

function SpecsCard({ specs }: CarSpecsProps) {
    return (
        <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
            data-aos="fade-up"
        >
            {specs.map((spec) => (
                <div
                    key={spec.label}
                    className="flex min-w-0 w-full flex-col items-start gap-0.5 rounded-xl border border-[#EAEDFF] bg-[#F2F3FF] px-4 py-3 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md"
                >
                    <img src={spec.icon} alt={spec.label} className="h-6 w-6 shrink-0 sm:h-7 sm:w-7" />
                    <span className="text-xs leading-tight text-gray-500">{spec.label}</span>
                    <span className="mt-3 wrap-break-word text-lg font-SemiBold leading-tight text-gray-900 sm:text-[20px]">
                        {spec.value}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default SpecsCard;