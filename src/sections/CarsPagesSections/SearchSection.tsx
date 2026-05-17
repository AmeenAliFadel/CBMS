import { IoIosSearch } from "react-icons/io";

function SearshSection() {
    return (
        <div className="px-10  lg:px-25 py-6 lg:py-10">

            <h2 className="mb-4 lg:mb-6 text-xl md:text-3xl lg:text-[40px] font-sans font-extrabold"> Find Your Perfect Drive </h2>
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 lg:gap-0">

                {/* Search */}
                <div className="flex gap-3 items-center px-4 py-3 lg:py-4.5 w-full   lg:w-143 border border-border-search rounded-xl focus-within:border-black focus-within:border-2">
                    <IoIosSearch className="text-xl lg:text-2xl" />
                    <input type="text"  placeholder="Search by brand, model, or location..." className="text-xs lg:text-xl w-full outline-0 border-0"
                    />
                </div>

                {/* Right Section */}
                <div className="flex  lg:items-center justify-between gap-3 lg:gap-6">

                    <p className="text-sm lg:text-base"> Showing 48 Luxury Cars</p>
                    <div className=" w-0.5 h-10 lg:h-4 bg-border-search"></div>

                    <div className="flex flex-col lg:flex-row lg:items-start whitespace-nowrap">
                        <p className="font-bold text-[#4648D4] text-sm lg:text-base"> Sort By :</p>

                        <select className="border-0 outline-0 font-bold text-[#4648D4] text-sm md:text-base">
                            <option value="Featured">Featured</option>
                            <option value="Low-to-High">Price: Low to High</option>
                            <option value="High-to-Low">Price: High to Low</option>
                        </select>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearshSection
