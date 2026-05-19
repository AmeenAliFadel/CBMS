import { FaApple, FaGoogle } from "react-icons/fa";

export default function SocialAuthButtons() {
    return (
        <div className="flex gap-3">

            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-medium text-text-primary transition hover:bg-background">
                <FaGoogle />
                Google
            </button>

            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border py-3.5 text-sm font-medium text-text-primary transition hover:bg-background">
                <FaApple />
                Apple
            </button>
        </div>
    );
}