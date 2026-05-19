import React from "react";
import { journeySteps } from "../../data/journeySteps/journeySteps";

export default function StepsJourneySection() {
    return (
        <section className="w-full bg-[#f5f5ff] py-24 px-6">
            <div className="max-w-6xl mx-auto text-center">

                <h2 className="text-4xl font-bold text-[#1E1B39]">
                    Your Journey Starts Here
                </h2>

                <p className="text-gray-500 mt-3">
                    Experience the future of car sharing in three simple steps.
                </p>

                <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-8 ">

                    {journeySteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <React.Fragment key={step.id}>

                                {/* Step */}
                                <div className="flex flex-col items-center text-center max-w-65  transition-all duration-300 hover:-translate-y-1">

                                    <div className="w-16 h-16 rounded-2xl bg-[#ECE9FF] flex items-center justify-center text-[#6C63FF]">
                                        <Icon size={22} />
                                    </div>

                                    <h3 className="mt-6 text-2xl font-semibold text-[#1E1B39]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-gray-500 text-sm leading-7">
                                        {step.desc}
                                    </p>
                                </div>

                                {/* Line */}
                                {index !== journeySteps.length - 1 && (
                                    <div className="hidden lg:block w-full max-w-35 border-t-2 border-dashed border-[#4648D433] -translate-y-16" />
                                )}

                            </React.Fragment>
                        );
                    })}

                </div>
            </div>
        </section>
    );
}