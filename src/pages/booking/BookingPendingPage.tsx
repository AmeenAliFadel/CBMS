import { useLocation, Link } from "react-router-dom";
import { HiOutlineClock } from "react-icons/hi2";
import JourneyStep from "../../components/host/JourneyStep";

type BookingPendingLocationState = {
    bookingId?: number;
};

export default function BookingPendingPage() {
    const location = useLocation();
    const state = location.state as BookingPendingLocationState | null;
    const bookingId = state?.bookingId;

    return (

        <div className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
            <div
                data-aos="fade-up"
                className="mb-6 rounded-3xl bg-white px-4 py-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-slate-200/70 sm:px-6"
            >
                <div className="flex items-center">
                    <JourneyStep label="Details"  />
                    <div className="mx-2 h-px flex-1 bg-slate-200" />
                    <JourneyStep label="Pending" active/>
                    <div className="mx-2 h-px flex-1 bg-slate-200" />
                    <JourneyStep label="Success" />
                </div>
            </div>
            <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center">
                <div className="w-full rounded-3xl bg-white p-6 text-center shadow-[0_14px_40px_rgba(99,102,241,0.1)] ring-1 ring-slate-200/70 sm:p-10">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/10 text-primary">
                        <HiOutlineClock className="h-8 w-8" />
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-text-primary">
                        Booking request sent
                    </h1>

                    <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
                        Your booking request has been submitted successfully.
                        The request is now pending review.
                    </p>

                    <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                        {bookingId ? (
                            <span>Booking ID: #{bookingId}</span>
                        ) : (
                            <span>Status: Pending Approval</span>
                        )}
                    </div>

                    <Link
                        to="/"
                        className="mt-8 inline-flex items-center justify-center rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                    >
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}