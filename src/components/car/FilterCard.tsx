import { useState } from "react";
const carTypes = [
    "Sportscar",
    "Luxury SUV",
    "Convertible",
    "Electric",
]
const transmissionTypes = [
    "Automatic",
    "Manual",
]

export default function FilterCard() {
    const [automatic, setAutomatic] = useState(true);
    const [selectedType, setSelectedType] = useState("");

    return (
        <aside className="mx-auto mt-6 lg:mx-0 lg:mt-0 w-full lg:w-[280px]  bg-white border rounded-[12px] border-[#E2E7FF] p-5 flex flex-col gap-6 ">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-[18px]  text-[#131B2E] "> Filters</h2>
                <button className=" text-[16px] text-[#4648D4] " > Reset</button>
            </div>

            {/* Price */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-[16px] font-medium text-[#131B2E]">Price per day</h3>
                </div>
                <input type="range" min={150} max={2500} className=" w-full accent-indigo-500 cursor-pointer " />

                <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>$150</span>
                    <span>$2,500+</span>
                </div>
            </div>

            {/* Car Type */}
            <div className="mb-6">
                <h3 className="text-[16px] font-medium text-[#131B2E] mb-3">Car Type</h3>
                <div className="space-y-3">
                    {carTypes.map((type) => (
                        <label key={type} className="flex items-center gap-3 text-[14px] text-[#464554]">
                            <input type="radio" name="carType" checked={selectedType === type} onChange={() => setSelectedType(type)} />
                            {type}
                        </label>
                    ))}
                </div>
            </div>

            {/* Transmission */}
            <div>
                <h3 className="text-[16px] font-medium text-[#131B2E] mb-3"> Transmission </h3>

                <div className="flex gap-2 lg:gap-0.5">
                    {transmissionTypes.map((type) => {
                        const isActive = automatic === (type === "Automatic");
                        return (
                            <button key={type} onClick={() => setAutomatic(type === "Automatic") }
                                    className={` flex-1  py-2 rounded-full text-sm transition ${isActive ? "bg-[#4648D4] text-white shadow": "bg-gray-200  text-black" } `} >
                                    {type}
                            </button>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}

