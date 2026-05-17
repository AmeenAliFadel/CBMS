import { useState } from 'react';
import SpecsCard from '../../components/details/SpecsCard'
import { specs } from '../../data/CarDetails/CarSpec'
import starr from "../../assets/DetailsImgs/starr.svg"
import { ReserveCard} from '../../components/details/ReserveCard';
import { bookingData } from '../../data/CarDetails/bookingg';


const hostInfo = {
    name: "Julian Harrison",
    joined: "Joined January 2021",
    responseTime: "Response time: 1 day",
    avatar: "",
};

function ContentCarSection() {
    const [expanded, setExpanded] = useState(false);
    const description = `Experience the pinnacle of German engineering. This 2021 Porsche 911 Carrera S delivers an exhilarating driving experience with a 3.0L twin-turbo flat-six engine. Perfect for a weekend getaway in the canyons or a stylish arrival at a gala. Every detail, from the GT Sport steering wheel to the Bose Surround Sound system, has been curated for the discerning driver.`;
    const shortDescription = description.slice(0, 180) + "...";

    return (
        <div className="px-10 lg:px-25 py-6 lg:py-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1 flex flex-col gap-8">

                    <div>
                        <h1 className="text-3xl lg:text-[50px] font-extrabold text-gray-900 tracking-tight">Porsche 911 Carrera S</h1>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                                <img src={starr} />
                                <span className="text-[16px] font-semibold text-[#131B2E] ml-1"> 4.87</span>
                            </div>
                            <span className="text-gray-300">·</span>
                            <span className="text-[16px] text-[#464554]">304+ trips</span>
                        </div>
                    </div>

                    <SpecsCard specs={specs} />
                    {/* ABOUT */}
                    <div>
                        <h2 className="text-lg lg:text-3xl font-bold text-[#131B2E] mb-2">About this vehicle </h2>
                        <p className="text-[16px] text-gray-600 leading-relaxed">{expanded ? description : shortDescription}</p>
                        <button onClick={() => setExpanded(!expanded)}
                            className="mt-4 text-sm font-semibold text-[#4648D4]"> {expanded ? "Show less ↑" : "Read more ↓"}
                        </button>
                    </div>
                    {/* HOST */}
                    <div className="w-fit flex items-center justify-between gap-10 p-5 bg-white border border-gray-200 rounded-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-[#4648D4] font-bold">
                                {hostInfo.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-xs text-[#4648D4]">Hosted by</p>
                                <p className="text-lg font-bold text-[#131B2E]">{hostInfo.name} </p>
                                <p className="text-xs text-[#464554]">{hostInfo.joined} · {hostInfo.responseTime}</p>
                            </div>
                        </div>
                        <button className="text-sm font-semibold bg-gray-100 hover:bg-gray-300 border border-gray-200 rounded-xl px-4 py-2">Contact </button>
                    </div>
                </div>
                {/* RIGHT SIDE */}
                <aside className="w-full lg:w-90 shrink-0">
                    <ReserveCard booking={bookingData} />
                </aside>
            </div>
        </div>
    );
}

export default ContentCarSection
