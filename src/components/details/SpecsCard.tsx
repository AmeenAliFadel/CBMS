import type { CarSpec } from "../../data/CarDetails/CarSpec"
interface CarSpecsProps {
    specs: CarSpec[];
}
function SpecsCard({ specs }: CarSpecsProps) {
    return (
        <div className="flex flex-wrap lg:gap-4 gap-2 ">
            {specs.map((spec, index) => (
                <div key={index}
                    className="w-full lg:w-45 flex flex-col items-start gap-0.5 border border-[#EAEDFF] rounded-xl px-4 py-3 min-w-22.5 bg-[#F2F3FF] shadow-sm hover:shadow-md hover:border-indigo-200 transition-all duration-200" >
                    <img src={spec.icon} alt={spec.label} />
                    <span className="text-xs text-gray-500 leading-tight">{spec.label}</span>
                    <span className="text-[20px] font-SemiBold text-gray-900 leading-tight mt-4">{spec.value}</span>
                </div>
            ))}
        </div>
    )
}

export default SpecsCard


