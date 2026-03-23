import { motion } from "motion/react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center">
      <div className="text-center">
        <motion.div
          className="w-16 h-16 border-4 border-[#d4af37]/30 border-t-[#d4af37] rounded-full mx-auto mb-4"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-[#d4af37] font-bold text-lg">جاري التحميل...</p>
      </div>
    </div>
  );
}
