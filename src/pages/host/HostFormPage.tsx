import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FiUpload,
  FiShield,
  FiLock,
  FiHeadphones,
  FiArrowLeft,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { steps } from "../../types/host/hostPagesTypes";
import TextareaField from "../../components/host/TextareaField";
import UploadCard from "../../components/host/UploadCard";
import BottomItem from "../../components/host/BottomItem";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  resetLessorRequestState,
  submitLessorRequestThunk,
} from "../../app/features/lessorRequest/lessorRequestSlice";
import {
  lessorRequestSchema,
  type LessorRequestSchemaValues,
} from "../../schemas/lessorRequestSchema";
import Field from "../../components/host/Filed";

export default function HostFormPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, successMessage, errorMessage } = useAppSelector(
    (state) => state.lessorRequest
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LessorRequestSchemaValues>({
    resolver: zodResolver(lessorRequestSchema),
    defaultValues: {
      business_name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: LessorRequestSchemaValues) => {
    const result = await dispatch(submitLessorRequestThunk(values));

    if (submitLessorRequestThunk.fulfilled.match(result)) {
      reset({
        business_name: "",
        phone: "",
        message: "",
      });
      navigate("/become-host/success");
    }
  };

  useEffect(() => {
    return () => {
      dispatch(resetLessorRequestState());
    };
  }, [dispatch]);

  return (
    <div className="mt-8 flex min-h-screen w-full flex-col items-center bg-background px-4 py-6 font-sans text-text-primary">
      <div
        data-aos="fade-up"
        className="relative mb-8 flex w-full max-w-230 items-start justify-between"
      >
        <div className="absolute left-16 right-16 top-3.5 h-0.5 bg-[#d9d8ef]" />
        <div className="absolute left-16 top-3.5 h-0.5 w-[18%] bg-primary" />

        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-[12px] font-semibold transition-all sm:h-10 sm:w-10 ${step.active
                ? "border-primary bg-primary text-white shadow-[0_4px_10px_rgba(91,92,233,0.28)]"
                : "border-border bg-white text-[#7c8193]"
                }`}
            >
              {step.id}
            </div>

            <span
              className={`text-[10px] font-medium sm:text-[12px] ${step.active ? "text-primary" : "text-gray-400"
                }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      <div
        data-aos="fade-up"
        className="w-full max-w-230 rounded-2xl border border-border bg-white px-4 py-8 shadow-[0_10px_30px_rgba(34,35,58,0.05)] md:py-12 lg:px-12 lg:py-16 md:lg:px-8"
      >
        <div className="mx-auto max-w-190">
          <div className="mb-10">
            <h1 className="text-2xl font-bold tracking-[-0.03em] text-primary sm:text-[32px] lg:text-[42px] lg:leading-12">
              Become a Host
            </h1>

            <p className="mt-3 max-w-155 text-[14px] leading-7 text-gray-400 lg:text-[16px]">
              Tell us a bit about yourself. This information helps us review
              your request to become a host on the platform and ensure a trusted
              experience for all users.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
              <Field
                label="Bussiness Name"
                placeholder="John cars"
                {...register("business_name")}
                error={errors.business_name?.message}
                disabled={loading}
              />

              <Field
                label="Phone Number"
                placeholder="+1 (555) 000-0000"
                {...register("phone")}
                error={errors.phone?.message}
                disabled={loading}
              />

              <div className="md:col-span-2">
                <TextareaField
                  label="Message"
                  placeholder="Tell us why you want to become a host..."
                  {...register("message")}
                  error={errors.message?.message}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="my-10 h-px w-full bg-bg" />

            <div>
              <h2 className="mb-6 text-center text-2xl font-semibold tracking-[-0.02em] text-text-primary md:text-[30px]">
                Identity Verification
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Controller
                  control={control}
                  name="identity_front_image"
                  render={({ field }) => (
                    <UploadCard
                      icon={<FiUpload size={28} />}
                      title="Upload front ID"
                      subtitle="Front side, JPG or PNG"
                      fileName={field.value?.name}
                      error={errors.identity_front_image?.message}
                      disabled={loading}
                      onFileChange={(file) => field.onChange(file)}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="identity_back_image"
                  render={({ field }) => (
                    <UploadCard
                      icon={<FiUpload size={28} />}
                      title="Upload back ID"
                      subtitle="Back side, JPG or PNG"
                      fileName={field.value?.name}
                      error={errors.identity_back_image?.message}
                      disabled={loading}
                      onFileChange={(file) => field.onChange(file)}
                    />
                  )}
                />
              </div>
            </div>

            {successMessage ? (
              <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {successMessage}
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <div className="mt-14 flex flex-col items-center justify-between gap-6 md:flex-row">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[15px] font-medium text-text-primary backdrop-blur-sm transition-all duration-300"
              >
                <FiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
                <span className="transition-colors duration-300">
                  Back to website
                </span>
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="h-13.5 min-w-62.5 rounded-xl bg-primary text-[15px] font-semibold text-white shadow-[0_12px_24px_rgba(91,92,233,0.28)] transition-all duration-200 hover:bg-[#4f50df] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-7 flex w-full max-w-230 flex-wrap items-center justify-center gap-10 text-[12px] font-medium uppercase tracking-[0.04em] text-text-primary">
        <BottomItem icon={<FiShield size={15} />} text="Secure Verification" />
        <BottomItem icon={<FiLock size={15} />} text="Privacy Guaranteed" />
        <BottomItem icon={<FiHeadphones size={15} />} text="24/7 Host Support" />
      </div>
    </div>
  );
}