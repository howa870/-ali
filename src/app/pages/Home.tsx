import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router";

export default function Home() {
  const whatsappNumber = "9647881457896";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" dir="rtl">

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <motion.img
            src="https://images.unsplash.com/photo-1687180498602-5a1046defaa4"
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/80 to-black"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.2 } }
            }}
          >

            {/* Small Title */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="mb-6"
            >
              <span className="text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.7)] text-xl md:text-2xl font-semibold">
                قنفات ودواوين الأسدي الفاخرة ✨
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              مو بس قنفات…<br />
              <span className="relative text-[#d4af37] drop-shadow-[0_0_12px_rgba(212,175,55,0.9)]">
                إحنا نصنع تجربة فخامة متكاملة
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 animate-[shimmer_2s_infinite]"></span>
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-lg md:text-xl text-gray-300 mb-8"
            >
              من أول تفصيلة إلى آخر لمسة، نقدم لك قنفات ودواوين بخامات فاخرة وتصاميم راقية
              تعكس شخصيتك وتخلي منزلك يبرز بأناقة لا تُضاهى.
            </motion.p>

            {/* Extra Line */}
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              className="text-[#d4af37] mb-12 font-semibold"
            >
              تفصيل حسب الطلب • جودة مضمونة • توصيل سريع
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 }
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href={whatsappLink}
                target="_blank"
                whileHover={{ scale: 1.05 }}
                className="bg-[#d4af37] text-black px-8 py-4 rounded-lg font-bold hover:shadow-[0_0_25px_rgba(212,175,55,0.7)]"
              >
                ابدأ تصميمك الآن
              </motion.a>

              <Link
                to="/gallery"
                className="border-2 border-[#d4af37] text-[#d4af37] px-8 py-4 rounded-lg font-bold hover:bg-[#d4af37] hover:text-black text-center"
              >
                شاهد أعمالنا
              </Link>
            </motion.div>

          </motion.div>
        </div>

        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          className="fixed bottom-6 left-6 bg-[#25D366] p-4 rounded-full shadow-xl animate-pulse"
        >
          <MessageCircle />
        </a>

      </section>
    </div>
  );
}
