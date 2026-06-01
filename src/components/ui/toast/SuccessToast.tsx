import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

interface SuccessToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function SuccessToast({
  message,
  show,
  onClose,
}: SuccessToastProps) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);

    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed top-6 right-6 z-9999 animate-toast-in">
      <div className="bg-surface border border-white/10 shadow-lg rounded-2xl px-4 py-3 flex items-center gap-3 min-w-[260px]">
        {/* Animated Icon */}
        <div className="text-green-500 text-xl animate-pop">
          <FaCheckCircle />
        </div>

        {/* Message */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-text-primary">Success</p>
          <p className="text-xs text-text-secondary">{message}</p>
        </div>
      </div>
    </div>
  );
}
