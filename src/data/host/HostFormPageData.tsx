import type { CardItemHostPage } from "../../types/host/hostPagesTypes";
import { RxEnvelopeClosed } from "react-icons/rx";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaCar } from "react-icons/fa";



export const cards: CardItemHostPage[] = [
  {
    icon: <AiOutlineClockCircle  className="sm:h-6 sm:w-6 h-4 w-4" />,
    title: "Review Pending",
    description: (
      <>
        Our concierge team typically reviews applications within{" "}
        <span className="font-medium text-indigo-500">24-48 hours</span>.
      </>
    ),
    iconBg: "bg-cyan-200/90",
    iconColor: "text-cyan-700",
  },
  {
    icon: <FaCar  className="sm:h-6 sm:w-6 h-4 w-4" />,
    title: "Prepare Your Fleet",
    description: (
      <>
        Gather high-resolution photos and maintenance records to speed up your
        listing process.
      </>
    ),
    iconBg: "bg-fuchsia-200/90",
    iconColor: "text-fuchsia-700",
  },
  {
    icon: <RxEnvelopeClosed  className="sm:h-6 sm:w-6 h-4 w-4" />,
    title: "Check Your Inbox",
    description: (
      <>
        We&apos;ll send you an email the moment your status is updated. Keep an
        eye on your messages.
      </>
    ),
    iconBg: "bg-indigo-200/90",
    iconColor: "text-primary",
  },
];
