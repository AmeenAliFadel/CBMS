import { HiOutlineShieldCheck } from "react-icons/hi2";

export function SecureBox() {
  return (
    <div className="rounded-3xl border border-border bg-linear-to-br from-indigo-50 to-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-indigo-600/10 p-2 text-primary">
          <HiOutlineShieldCheck className="h-5 w-5" />
        </div>

        <div>
          <h4 className="font-semibold text-slate-900">Secure Booking</h4>
          <p className="mt-1 text-xs text-slate-500">
            Your reservation is protected with our system guarantee and can be
            modified anytime before confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}