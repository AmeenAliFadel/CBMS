import { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { MdDirectionsCar } from "react-icons/md";
import toast from "react-hot-toast";

import carImageSrc from "../../assets/dashboardImages/carImage.webp";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    cancelBooking,
    fetchBookingById,
} from "../../app/features/bookings/bookingSlice";
import {
    fetchCarDetails,
    resetCarDetails,
} from "../../app/features/carDetails/carDetailsSlice";
import Loader from "../../components/ui/loader/Loader";
import BookingDetailsState from "../../components/profile/bookingDetails/BookingDetailsState";
import BookingDetailsHero from "../../components/profile/bookingDetails/BookingDetailsHero";
import BookingDetailsSection from "../../components/profile/bookingDetails/BookingDetailsSection";
import BookingDetailsItem from "../../components/profile/bookingDetails/BookingDetailsItem";
import BookingDetailsActionBar from "../../components/profile/bookingDetails/BookingDetailsActionBar";
import {
    calculateBookingTotal,
    formatBookingDateRange,
    formatBookingDateTime,
    formatBookingTotal,
    getBookingDurationDays,
    getBookingStatusClassName,
    getBookingStatusLabel,
    isBookingCancelable,
} from "../../utils/bookingDisplay";
import { readImageField, readStringField } from "../../utils/bookingDetails";

export default function BookingDetailsPage() {
    const { bookingId } = useParams<{ bookingId: string }>();
    const dispatch = useAppDispatch();

    const bookings = useAppSelector((state) => state.bookings.items);
    const selectedBooking = useAppSelector((state) => state.bookings.selectedBooking);
    const bookingLoading = useAppSelector((state) => state.bookings.loading);
    const bookingError = useAppSelector((state) => state.bookings.error);
    const cancelLoading = useAppSelector((state) => state.bookings.cancelLoading);

    const carDetails = useAppSelector((state) => state.carDetails.item);
    const carDetailsLoading = useAppSelector((state) => state.carDetails.loading);

    const bookingIdValue = Number(bookingId);
    const isValidBookingId = Number.isInteger(bookingIdValue) && bookingIdValue > 0;

    const bookingFromList = useMemo(
        () => bookings.find((item) => item.id === bookingIdValue) ?? null,
        [bookings, bookingIdValue]
    );

    const booking =
        selectedBooking?.id === bookingIdValue
            ? selectedBooking
            : bookingFromList;

    useEffect(() => {
        if (!isValidBookingId) {
            return;
        }

        dispatch(fetchBookingById(bookingIdValue));
    }, [dispatch, bookingIdValue, isValidBookingId]);

    useEffect(() => {
        if (!booking?.car?.id) {
            return;
        }

        dispatch(fetchCarDetails(booking.car.id));
    }, [dispatch, booking?.car?.id]);

    useEffect(() => {
        return () => {
            dispatch(resetCarDetails());
        };
    }, [dispatch]);

    const resolvedCarImage = readImageField(carDetails) ?? carImageSrc;
    const resolvedCarTitle =
        readStringField(carDetails, ["title", "name"]) ??
        booking?.car.title ??
        "Booking details";
    const resolvedCarBrand =
        readStringField(carDetails, ["brand"]) ?? booking?.car.brand ?? "";
    const resolvedCarModel =
        readStringField(carDetails, ["model"]) ?? booking?.car.model ?? "";
    const resolvedPricePerDay =
        readStringField(carDetails, ["price_per_day", "pricePerDay"]) ??
        booking?.car.price_per_day ??
        "";
    const carDescription =
        readStringField(carDetails, ["description", "details", "summary"]) ?? null;

    const extraSpecs = [
        {
            label: "Transmission",
            value: readStringField(carDetails, ["transmission"]),
        },
        {
            label: "Fuel Type",
            value: readStringField(carDetails, ["fuel_type", "fuelType"]),
        },
        {
            label: "Seats",
            value: readStringField(carDetails, ["seats"]),
        },
        {
            label: "Color",
            value: readStringField(carDetails, ["color"]),
        },
    ].filter((item) => Boolean(item.value)) as Array<{ label: string; value: string }>;

    const canCancel = booking ? isBookingCancelable(booking) : false;
    const statusLabel = booking ? getBookingStatusLabel(booking.status) : "";
    const statusClassName = booking ? getBookingStatusClassName(booking.status) : "";

    const handleCancelBooking = async () => {
        if (!booking) {
            return;
        }

        try {
            await dispatch(cancelBooking(booking.id)).unwrap();
            toast.success("Booking canceled successfully");
        } catch (caughtError) {
            const message =
                typeof caughtError === "string"
                    ? caughtError
                    : "Failed to cancel booking. Please try again.";

            toast.error(message);
        }
    };

    if (!isValidBookingId) {
        return (
            <BookingDetailsState
                title="Invalid booking link"
                description="The booking identifier is missing or invalid."
                actionLabel="Return to profile"
                actionTo="/profile"
                icon={<MdDirectionsCar className="text-3xl text-primary" />}
            />
        );
    }

    if (!booking && bookingLoading) {
        return (
            <div className="min-h-screen bg-background px-3 py-4 sm:px-4 sm:py-6">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
                    <Link
                        to="/profile"
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
                    >
                        Back to profile
                    </Link>

                    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
                        <Loader />
                    </div>
                </div>
            </div>
        );
    }

    if (!booking && bookingError) {
        return (
            <BookingDetailsState
                title="Booking not found"
                description={bookingError}
                actionLabel="Return to profile"
                actionTo="/profile"
                icon={<MdDirectionsCar className="text-3xl text-primary" />}
            />
        );
    }

    if (!booking) {
        return (
            <BookingDetailsState
                title="Booking not available"
                description="We could not load this booking right now."
                actionLabel="Return to profile"
                actionTo="/profile"
                icon={<MdDirectionsCar className="text-3xl text-primary" />}
            />
        );
    }

    const durationDays = getBookingDurationDays(booking.start_date, booking.end_date);
    const total = formatBookingTotal(booking);

    return (
        <div className="min-h-screen bg-background px-3 py-4 sm:px-4 sm:py-6">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 sm:gap-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link
                        to="/profile"
                        className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
                    >
                        Back to profile
                    </Link>

                    <span className="inline-flex w-fit items-center rounded-full border border-border px-3 py-1 text-xs font-bold uppercase tracking-wide text-text-secondary">
                        Booking #{booking.id}
                    </span>
                </div>

                <BookingDetailsHero
                    imageSrc={resolvedCarImage}
                    imageAlt={resolvedCarTitle}
                    loading={carDetailsLoading}
                    title={resolvedCarTitle}
                    brand={resolvedCarBrand}
                    model={resolvedCarModel}
                    statusLabel={statusLabel}
                    statusClassName={statusClassName}
                    rentalPeriod={formatBookingDateRange(
                        booking.start_date,
                        booking.end_date
                    )}
                    durationLabel={`${durationDays} day${durationDays > 1 ? "s" : ""}`}
                    pricePerDay={resolvedPricePerDay}
                    total={total}
                    customerName={booking.customer.name}
                    customerEmail={booking.customer.email}
                />

                <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    <BookingDetailsSection
                        title="Booking details"
                        description="Core information about this booking."
                        className="h-full"
                    >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <BookingDetailsItem
                                label="Booking ID"
                                value={`#${booking.id}`}
                            />
                            <BookingDetailsItem label="Status" value={statusLabel} />
                            <BookingDetailsItem
                                label="Start Date"
                                value={formatBookingDateTime(booking.start_date)}
                            />
                            <BookingDetailsItem
                                label="End Date"
                                value={formatBookingDateTime(booking.end_date)}
                            />
                            <BookingDetailsItem
                                label="Duration"
                                value={`${durationDays} day(s)`}
                            />
                            <BookingDetailsItem label="Total" value={total} />
                        </div>
                    </BookingDetailsSection>

                    <BookingDetailsSection
                        title="Vehicle details"
                        description="Vehicle data resolved from the car details endpoint."
                        className="h-full"
                    >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <BookingDetailsItem
                                label="Car ID"
                                value={`#${booking.car.id}`}
                            />
                            <BookingDetailsItem label="Title" value={resolvedCarTitle} />
                            <BookingDetailsItem
                                label="Brand"
                                value={resolvedCarBrand || "—"}
                            />
                            <BookingDetailsItem
                                label="Model"
                                value={resolvedCarModel || "—"}
                            />
                            <BookingDetailsItem
                                label="Price Per Day"
                                value={resolvedPricePerDay || "—"}
                            />
                            {extraSpecs.length > 0
                                ? extraSpecs.map((spec) => (
                                    <BookingDetailsItem
                                        key={spec.label}
                                        label={spec.label}
                                        value={spec.value}
                                    />
                                ))
                                : null}
                        </div>

                        {carDescription ? (
                            <div className="mt-4 rounded-2xl border border-border bg-background px-4 py-3">
                                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                                    Description
                                </p>
                                <p className="mt-2 wrap-break-word text-sm leading-6 text-text-primary">
                                    {carDescription}
                                </p>
                            </div>
                        ) : null}
                    </BookingDetailsSection>

                    <BookingDetailsSection
                        title="Customer information"
                        description="Who made this booking."
                        className="h-full"
                    >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <BookingDetailsItem
                                label="Name"
                                value={booking.customer.name}
                            />
                            <BookingDetailsItem
                                label="Email"
                                value={booking.customer.email}
                                valueClassName="break-all"
                            />
                        </div>
                    </BookingDetailsSection>

                    <BookingDetailsSection
                        title="Assignment and notes"
                        description="Employee assignment and any notes from the booking flow."
                        className="h-full"
                    >
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <BookingDetailsItem
                                label="Employee"
                                value={booking.employee?.name ?? "Unassigned"}
                            />
                            <BookingDetailsItem
                                label="Notes"
                                value={booking.notes?.trim() ? booking.notes : "No notes provided"}
                            />
                            <BookingDetailsItem
                                label="Rejection Reason"
                                value={
                                    booking.rejection_reason?.trim()
                                        ? booking.rejection_reason
                                        : "—"
                                }
                            />
                            <BookingDetailsItem
                                label="Runtime Total"
                                value={calculateBookingTotal(booking)}
                            />
                        </div>
                    </BookingDetailsSection>
                </section>

                <BookingDetailsActionBar
                    canCancel={canCancel}
                    cancelLoading={cancelLoading}
                    onCancel={handleCancelBooking}
                    statusLabel={statusLabel}
                />
            </div>
        </div>
    );
}