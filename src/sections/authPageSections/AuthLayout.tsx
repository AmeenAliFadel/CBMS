import type { ReactNode } from "react";
import carImageSrc from "../../assets/HostPageImages/hostimage.webp";

interface AuthLayoutProps {
    children: ReactNode;
    heading: string;
    description: string;
}

export default function AuthLayout({
    children,
    heading,
    description,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen flex-col md:flex-row">

                {/* LEFT PANEL */}
                <div className="relative hidden md:flex md:w-1/2">
                    <img
                        src={carImageSrc}
                        alt="Luxury car"
                        className="absolute inset-0 h-full w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-slate-900/75" />

                    <div className="relative z-10 flex flex-col p-12">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white">
                            LuxeDrive
                        </h2>

                        <div className="flex grow flex-col justify-center">
                            <h1 className="text-5xl font-extrabold leading-tight text-white">
                                {heading}
                            </h1>

                            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/70">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="flex w-full items-center justify-center px-6 py-10 md:w-1/2">
                    <div className="w-full max-w-md rounded-3xl border border-border bg-surface p-8 shadow-xl">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}