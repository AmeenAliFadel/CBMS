import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  clearBookingError,
  clearDraftBooking,
  createBooking,
  setDraftBooking,
} from "./bookingSlice";
import {
  selectBookingCreateLoading,
  selectBookingDraft,
  selectBookingDraftTripDays,
  selectBookingError,
} from "./bookingSelectors";
import {
  selectCarDetailsError,
  selectCarDetailsItem,
  selectCarDetailsLoading,
} from "../carDetails/carDetailsSelectors";
import { fetchCarDetails } from "../carDetails/carDetailsSlice";
import type {
  Booking,
  BookingFormValues,
  BookingSummaryPricing,
  DraftBooking,
} from "./bookingTypes";
import {
  bookingFormSchema,
  createBookingRequestSchema,
} from "../../../schemas/bookingSchemas";
import { mapBookingFormToCreateRequest } from "./bookingMapper";
import { calculateBookingSummaryPricing } from "./bookingPricing";
import { formatInputDate } from "../../../utils/date";
import { clearConflictPeriods } from "./bookingSlice";
import toast from "react-hot-toast";

interface UseBookingPageOptions {
  onSuccess?: (booking: Booking) => void;
}

interface UseBookingPageResult {
  form: BookingFormValues;
  handleChange: (key: keyof BookingFormValues, value: string) => void;
  handleSubmit: (values: BookingFormValues) => Promise<void>;
  loading: boolean;
  error: string | null;
  dailyRate: number;
  pricing: BookingSummaryPricing;
  isCarLoading: boolean;
}

function buildFallbackDraft(
  carId: number,
  startDate: string,
  endDate: string,
): DraftBooking {
  return {
    carId,
    startDate,
    endDate,
    pickupLocation: "Direct pickup",
  };
}

export function useBookingPage(
  carId: number,
  options?: UseBookingPageOptions,
): UseBookingPageResult {
  const dispatch = useAppDispatch();

  const draftBooking = useAppSelector(selectBookingDraft);
  const bookingDays = useAppSelector(selectBookingDraftTripDays);
  const bookingError = useAppSelector(selectBookingError);
  const createLoading = useAppSelector(selectBookingCreateLoading);

  const car = useAppSelector(selectCarDetailsItem);
  const carError = useAppSelector(selectCarDetailsError);
  const isCarLoading = useAppSelector(selectCarDetailsLoading);

  const today = useMemo(() => new Date(), []);
  const initialStartDate = useMemo(() => formatInputDate(today), [today]);
  const initialEndDate = useMemo(() => {
    const end = new Date(today);
    end.setDate(end.getDate() + 3);
    return formatInputDate(end);
  }, [today]);

  const [form, setForm] = useState<BookingFormValues>({
    startDate: initialStartDate,
    endDate: initialEndDate,
    bookingPlanId: 1,
  });

  useEffect(() => {
    dispatch(clearConflictPeriods());
  }, [carId, dispatch]);

  useEffect(() => {
    if (!Number.isFinite(carId) || carId <= 0) {
      return;
    }

    if ((!car || car.id !== carId) && !isCarLoading) {
      dispatch(fetchCarDetails(carId));
    }
  }, [car, carId, dispatch, isCarLoading]);

  useEffect(() => {
    if (!Number.isFinite(carId) || carId <= 0) {
      return;
    }

    const activeDraft = draftBooking?.carId === carId ? draftBooking : null;

    if (activeDraft) {
      setForm({
        startDate: activeDraft.startDate,
        endDate: activeDraft.endDate,
        bookingPlanId: 1,
      });
      return;
    }

    const fallbackDraft = buildFallbackDraft(
      carId,
      initialStartDate,
      initialEndDate,
    );

    dispatch(setDraftBooking(fallbackDraft));
    setForm({
      startDate: fallbackDraft.startDate,
      endDate: fallbackDraft.endDate,
      bookingPlanId: 1,
    });
  }, [carId, draftBooking?.carId, dispatch, initialStartDate, initialEndDate]);

  useEffect(() => {
    dispatch(clearBookingError());
  }, [dispatch]);

  const handleChange = useCallback(
    (key: keyof BookingFormValues, value: string) => {
      dispatch(clearBookingError());

      const nextForm = {
        ...form,
        [key]: value,
      };

      setForm(nextForm);

      const pickupLocation =
        draftBooking?.carId === carId
          ? draftBooking.pickupLocation
          : "Direct pickup";

      dispatch(
        setDraftBooking({
          carId,
          startDate: nextForm.startDate,
          endDate: nextForm.endDate,
          pickupLocation,
        }),
      );
    },
    [carId, dispatch, draftBooking?.carId, draftBooking?.pickupLocation, form],
  );

  const pricing = useMemo(
    () =>
      calculateBookingSummaryPricing(
        Number(car?.price_per_day ?? 0),
        bookingDays,
      ),
    [bookingDays, car?.price_per_day],
  );

  const dailyRate = Number(car?.price_per_day ?? 0);

  const handleSubmit = useCallback(
    async (values: BookingFormValues) => {
      dispatch(clearBookingError());

      if (!Number.isFinite(carId) || carId <= 0) {
        toast.error("Invalid car selected.");
        return;
      }

      const formValidation = bookingFormSchema.safeParse(values);

      if (!formValidation.success) {
        toast.error(
          formValidation.error.issues[0]?.message ??
            "Please check the booking dates.",
        );
        return;
      }

      const requestPayload = mapBookingFormToCreateRequest(
        carId,
        formValidation.data,
      );

      const requestValidation =
        createBookingRequestSchema.safeParse(requestPayload);

      if (!requestValidation.success) {
        toast.error(
          requestValidation.error.issues[0]?.message ??
            "Please check the booking data.",
        );
        return;
      }

      const pickupLocation =
        draftBooking?.carId === carId
          ? draftBooking.pickupLocation
          : "Direct pickup";

      dispatch(
        setDraftBooking({
          carId,
          startDate: values.startDate,
          endDate: values.endDate,
          pickupLocation,
        }),
      );

      try {
        const createdBooking = await dispatch(
          createBooking(requestValidation.data),
        ).unwrap();

        dispatch(clearDraftBooking());

        toast.success("Booking request submitted successfully.");

        options?.onSuccess?.(createdBooking);
      } catch (error: any) {
        const message =
          error?.message ||
          error?.data?.message ||
          "Failed to create booking. Please try again.";

        toast.error(message);
      }
    },
    [
      carId,
      dispatch,
      draftBooking?.carId,
      draftBooking?.pickupLocation,
      options,
    ],
  );

  const error = bookingError ?? carError;

  return {
    form,
    handleChange,
    handleSubmit,
    loading: createLoading,
    error,
    dailyRate,
    pricing,
    isCarLoading,
  };
}
