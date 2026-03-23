import { motion } from "motion/react";
import { Home, AlertCircle } from "lucide-react";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4" style={{ fontFamily: "'Cairo', sans-serif" }} dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* رقم 404 كبير */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-[#d4af37] leading-none">404</h1>
        </motion.div>

        {/* أيقونة */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-6"
        >
          <div className="bg-[#d4af37]/10 p-6 rounded-full border-2 border-[#d4af37]/20">
            <AlertCircle className="w-16 h-16 text-[#d4af37]" />
          </div>
        </motion.div>

        {/* الرسالة */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            عذراً، الصفحة <span className="text-[#d4af37]">غير موجودة</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            الصفحة التي تبحث عنها قد تكون محذوفة أو غير متوفرة.<br />
            يمكنك العودة للصفحة الرئيسية لاستكشاف منتجاتنا الفاخرة.
          </p>
        </motion.div>

        {/* زر العودة */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl hover:scale-105"
          >
            <Home className="w-6 h-6" />
            <span>العودة للصفحة الرئيسية</span>
          </Link>
        </motion.div>

        {/* خط زخرفي */}
        <div className="mt-12 pt-8 border-t border-[#d4af37]/20">
          <p className="text-gray-500">
            قنفات ودواوين الأسدي الفاخرة ✨
          </p>
        </div>
      </motion.div>
    </div>
  );
}
