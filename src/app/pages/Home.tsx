import { motion } from "motion/react";
import { MessageCircle, Award, Settings, Truck, Sofa, Wrench, Palette, Star, Facebook, Instagram, Phone, X, Upload, Trash2, Plus } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { ScrollToTop } from "../components/ScrollToTop";
import { LoadingSpinner } from "../components/LoadingSpinner";

export default function Home() {

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const whatsappNumber = "9647881457896";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneNumber = "+9647881457896";
  const phoneLink = `tel:${phoneNumber}`;

  const [isLoading, setIsLoading] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] text-white"
      style={{ fontFamily: "'Cairo', sans-serif" }}
      dir="rtl"
    >

      {isLoading && <LoadingSpinner />}
      <ScrollToTop />

      {/* زر واتساب */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1687180498602-5a1046defaa4"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative text-center px-4">
          <h1 className="text-5xl font-bold mb-6">
            قنفات ودواوين فخمة
          </h1>
          <p className="text-gray-300 mb-8">
            تفصيل حسب الطلب وبأفضل جودة
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            className="bg-[#d4af37] text-black px-8 py-4 rounded-lg font-bold"
          >
            اطلب الآن
          </a>
        </div>
      </section>

      {/* خدمات */}
      <section className="py-20 px-4">
        <div className="grid md:grid-cols-3 gap-6">

          <motion.div {...fadeIn} className="bg-[#1a1a1a] p-6 rounded-xl text-center">
            <Award className="mx-auto mb-4 text-[#d4af37]" />
            <h3 className="text-xl mb-2">جودة عالية</h3>
          </motion.div>

          <motion.div {...fadeIn} className="bg-[#1a1a1a] p-6 rounded-xl text-center">
            <Settings className="mx-auto mb-4 text-[#d4af37]" />
            <h3 className="text-xl mb-2">تفصيل حسب الطلب</h3>
          </motion.div>

          <motion.div {...fadeIn} className="bg-[#1a1a1a] p-6 rounded-xl text-center">
            <Truck className="mx-auto mb-4 text-[#d4af37]" />
            <h3 className="text-xl mb-2">توصيل سريع</h3>
          </motion.div>

        </div>
      </section>

      {/* تواصل */}
      <section className="py-20 px-4">
        <div className="text-center">
          <h2 className="text-3xl mb-6">تواصل معنا</h2>

          <a href={phoneLink} className="block mb-4">
            <Phone className="inline mr-2" />
            +964 788 145 7896
          </a>

          <a href={whatsappLink} target="_blank">
            <MessageCircle className="inline mr-2" />
            واتساب
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-gray-400">
        © 2026 جميع الحقوق محفوظة
      </footer>

    </div>
  );
}
