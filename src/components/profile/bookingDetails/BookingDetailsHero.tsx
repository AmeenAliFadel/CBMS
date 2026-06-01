import { MdEmail, MdPerson } from "react-icons/md";

interface BookingDetailsHeroProps {
    imageSrc: string;
    imageAlt: string;
    loading?: boolean;
    title: string;
    brand: string;
    model: string;
    statusLabel: string;
    statusClassName: string;
    rentalPeriod: string;
    durationLabel: string;
    pricePerDay: string;
    total: string;
    customerName: string;
    customerEmail: string;
}

export default function BookingDetailsHero({
    imageSrc,
    imageAlt,
    loading = false,
    title,
    brand,
    model,
    statusLabel,
    statusClassName,
    rentalPeriod,
    durationLabel,
    pricePerDay,
    total,
    customerName,
    customerEmail,
}: BookingDetailsHeroProps) {
    return (
        <section className="grid gap-4 overflow-hidden rounded-3xl border border-border bg-surface p-4 sm:gap-6 sm:p-5 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:p-6">
            <div className="relative h-56 overflow-hidden rounded-2xl border border-border bg-background sm:h-72 lg:h-full lg:min-h-105">
                <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="h-full w-full object-cover"
                />

                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <span className="rounded-full border border-border bg-surface/95 px-4 py-2 text-xs font-semibold text-text-primary shadow-sm">
                            Loading car data...
                        </span>
                    </div>
                ) : null}
            </div>

            <div className="flex min-w-0 flex-col gap-4 sm:gap-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-text-secondary">
                            Booking overview
                        </p>
                        <h1 className="mt-2 wrap-break-word text-xl font-bold text-text-primary sm:text-2xl lg:text-3xl">
                            {title}
                        </h1>
                        <p className="mt-2 wrap-break-word text-sm leading-6 text-text-secondary">
                            {brand}
                            {model ? ` • ${model}` : ""}
                        </p>
                    </div>

                    <span
                        className={`inline-flex w-fit shrink-0 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusClassName}`}
                    >
                        {statusLabel}
                    </span>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                            Rental Period
                        </p>
                        <p className="mt-2 wrap-break-word text-sm font-semibold leading-6 text-text-primary">
                            {rentalPeriod}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                            Duration
                        </p>
                        <p className="mt-2 wrap-break-word text-sm font-semibold leading-6 text-text-primary">
                            {durationLabel}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                            Price Per Day
                        </p>
                        <p className="mt-2 wrap-break-word text-sm font-semibold leading-6 text-text-primary">
                            {pricePerDay}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-background px-4 py-3">
                        <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                            Total
                        </p>
                        <p className="mt-2 wrap-break-word text-sm font-semibold leading-6 text-primary">
                            {total}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                        <MdPerson className="mt-0.5 shrink-0 text-lg text-primary" />
                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                                Customer
                            </p>
                            <p className="mt-1 wrap-break-word text-sm font-semibold leading-6 text-text-primary">
                                {customerName}
                            </p>
                        </div>
                    </div>

                    <div className="flex min-w-0 items-start gap-3 rounded-2xl border border-border bg-background px-4 py-3">
                        <MdEmail className="mt-0.5 shrink-0 text-lg text-primary" />
                        <div className="min-w-0">
                            <p className="text-[11px] uppercase tracking-[0.2em] text-text-secondary">
                                Email
                            </p>
                            <p className="mt-1 break-all text-sm font-semibold leading-6 text-text-primary">
                                {customerEmail}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}