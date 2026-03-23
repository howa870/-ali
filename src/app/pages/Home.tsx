import { motion } from "motion/react";
import { MessageCircle, Award, Settings, Truck, Sofa, Wrench, Palette, Star, Facebook, Instagram, Phone, X, Upload, Trash2, Plus, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import { ScrollToTop } from "../components/ScrollToTop";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface Testimonial {
  id: number;
  rating: number;
  comment: string;
  image: string;
}

export default function Home() {
  const [showPanel, setShowPanel] = useState(false);

const [settings, setSettings] = useState({
  title: "قنفات ودواوين فخمة",
  subtitle: "تفصيل وبيع بأعلى جودة",
  button: "اطلب الآن"
});
  const whatsappNumber = "9647881457896";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneNumber = "+9647881457896";
  const phoneLink = `tel:${phoneNumber}`;
  
  // Social media links
  const socialLinks = {
    tiktok: "https://www.tiktok.com/@alasde92?_r=1&_t=ZS-94tR6bkzgjg",
    facebook: "https://www.facebook.com/share/18KUs2QP3f/",
    instagram: "https://www.instagram.com/allasde9?igsh=cTk1OXl4OXRtejdo"
  };

  const defaultGalleryImages = [
    "https://images.unsplash.com/photo-1762803842055-de1e5fb14477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBzb2ZhJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzc0MTYzNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1683793837504-318275ff665d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdmVsdmV0JTIwY291Y2glMjBnb2xkfGVufDF8fHx8MTc3NDE2MzQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGl2aW5nJTIwcm9vbSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NzQxMjkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const defaultTestimonials: Testimonial[] = [
    {
      id: 1,
      rating: 5,
      comment: "شغلهم نظيف والتفصيل دقيق جداً 👌",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      id: 2,
      rating: 5,
      comment: "أفضل مكان طلبت منه قنفات ودواوين بصراحة",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    },
    {
      id: 3,
      rating: 5,
      comment: "سعر مناسب وجودة عالية",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200&h=200"
    }
  ];

  const [galleryImages, setGalleryImages] = useState<string[]>(defaultGalleryImages);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultTestimonials);
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ rating: 5, comment: "", image: "" });
  const [isLoading, setIsLoading] = useState(false);
useEffect(() => {
  localStorage.setItem("settings", JSON.stringify(settings));
}, [settings]);
  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('homeGalleryImages');
    if (savedImages) {
      setGalleryImages(JSON.parse(savedImages));
    }
    
    const savedTestimonials = localStorage.getItem('testimonials');
    if (savedTestimonials) {
      setTestimonials(JSON.parse(savedTestimonials));
    }
  }, []);

  // Save images to localStorage
  const saveImages = (newImages: string[]) => {
    setGalleryImages(newImages);
    localStorage.setItem('homeGalleryImages', JSON.stringify(newImages));
  };
useEffect(() => {
  const savedSettings = localStorage.getItem("settings");
  if (savedSettings) {
    setSettings(JSON.parse(savedSettings));
  }
}, []);
  // Save testimonials to localStorage
  const saveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    localStorage.setItem('testimonials', JSON.stringify(newTestimonials));
  };

  const handleImageUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...galleryImages];
        newImages[index] = reader.result as string;
        saveImages(newImages);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = (index: number) => {
    if (confirm('هل تريد حذف هذه الصورة وإرجاعها للافتراضية؟')) {
      const newImages = [...galleryImages];
      newImages[index] = defaultGalleryImages[index];
      saveImages(newImages);
    }
  };

  const resetToDefaults = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع الصور للافتراضية؟')) {
      saveImages(defaultGalleryImages);
      setShowUploadModal(false);
    }
  };

  const getTouchDistance = (touches: React.TouchList) => {
    const touch1 = touches[0];
    const touch2 = touches[1];
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      const delta = distance - lastTouchDistance;
      const newScale = Math.max(1, Math.min(scale + delta * 0.01, 3));
      setScale(newScale);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && scale > 1) {
      const touch = e.touches[0];
      setPosition(prev => ({
        x: prev.x + touch.clientX * 0.01,
        y: prev.y + touch.clientY * 0.01
      }));
    }
  };

  const handleTouchEnd = () => {
    setLastTouchDistance(0);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newScale = Math.max(1, Math.min(scale + delta, 3));
    setScale(newScale);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Cairo', sans-serif" }} dir="rtl">
      <button
  onClick={() => setShowPanel(true)}
  className="fixed top-6 left-6 z-50 bg-[#d4af37] text-black p-3 rounded-full shadow-xl"
>
  ⚙️
</button>
      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Floating WhatsApp Button with Pulse Animation */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbiUyMHNvZmF8ZW58MXx8fHwxNzc0MTYzNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Luxury {settings.title}"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <span className="text-[#d4af37] text-xl md:text-2xl font-semibold tracking-wide"> {settings.subtitle}  </span>
            </div>
<h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
  {settings.title}
</h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d4af37] hover:bg-[#c9a02e] text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl"
              >{settings.subtitle}
              </motion.a>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/gallery"
                  className="inline-block bg-transparent border-2 border-[#d4af37] hover:bg-[#d4af37] hover:text-black text-[#d4af37] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
                >
                  شاهد أعمالنا
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              {...fadeIn}
              className="bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-xl text-center hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 group"
            >
              <div className="bg-[#d4af37]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37]/20 transition-all duration-300">
                <Award className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#d4af37]"> {settings.subtitle}</h3>
              <p className="text-gray-300 leading-relaxed">{settings.subtitle}</p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-xl text-center hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 group"
            >
              <div className="bg-[#d4af37]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37]/20 transition-all duration-300">
                <Settings className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#d4af37]"> {settings.subtitle}</h3>
              <p className="text-gray-300 leading-relaxed">{settings.subtitle}</p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.4 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-xl text-center hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 group"
            >
              <div className="bg-[#d4af37]/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37]/20 transition-all duration-300">
                <Truck className="w-10 h-10 text-[#d4af37]" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-[#d4af37]">{settings.subtitle}</h3>
              <p className="text-gray-300 leading-relaxed">{settings.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section id="gallery" className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              أعمالنا <span className="text-[#d4af37]">المميزة</span>
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              اضغط على الصورة لتكبيرها، أو اضغط على زر التحديث لتغييرها
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl aspect-[4/3] border-2 border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300"
              >
                <img
                  src={image}
                  alt={`عمل مميز ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image);
                    setSelectedImageIndex(index);
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* زر تحديث الصورة */}
                <div className="absolute bottom-4 right-4 z-10">
                  <label className="cursor-pointer bg-[#d4af37] hover:bg-[#c9a02e] text-black px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl transition-all duration-300 hover:scale-105">
                    <Upload className="w-4 h-4" />
                    <span>تحديث</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(index, e)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* زر حذف الصورة */}
                <div className="absolute bottom-4 left-4 z-10">
                  <button
                    className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => deleteImage(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>حذف</span>
                  </button>
                </div>

                {/* رقم الصورة */}
                <div className="absolute top-4 right-4 bg-[#d4af37] text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center mt-12">
            <motion.button
              onClick={resetToDefaults}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-[#d4af37] hover:bg-[#d4af37] text-[#d4af37] hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              <Trash2 className="w-5 h-5" />
              <span>إعادة تعيين جميع الصور</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Colors Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Palette className="w-12 h-12 text-[#d4af37]" />
              <h2 className="text-4xl md:text-5xl font-bold">
                تشكيلة <span className="text-[#d4af37]">الألوان</span>
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6 leading-relaxed">
              اكتشف أكثر من 25 لون فاخر متوفر بأقمشة عالية الجودة<br />
              اختر اللون المثالي الذي يناسب ذوقك وديكور منزلك
            </p>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-10"></div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/colors"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#d4af37] to-[#c9a02e] hover:from-[#c9a02e] hover:to-[#d4af37] text-black px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl"
              >
                <Palette className="w-6 h-6" />
                <span>لعرض الألوان اضغط هنا</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-[#d4af37]">خدماتنا</span> المتمزة
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              {...fadeIn}
              className="bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-xl text-center hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-[#d4af37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37] transition-all duration-300">
                <Sofa className="w-8 h-8 text-[#d4af37] group-hover:text-black transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#d4af37]">  {settings.subtitle}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">  {settings.subtitle}</p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.1 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-xl text-center hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-[#d4af37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37] transition-all duration-300">
                <Award className="w-8 h-8 text-[#d4af37] group-hover:text-black transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#d4af37]">{settings.subtitle}   </h3>
              <p className="text-gray-400 text-sm leading-relaxed"> {settings.subtitle}</p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-xl text-center hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-[#d4af37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37] transition-all duration-300">
                <Wrench className="w-8 h-8 text-[#d4af37] group-hover:text-black transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#d4af37]"> </h3>
              <p className="text-gray-400 text-sm leading-relaxed">  {settings.subtitle} </p>
            </motion.div>

            <motion.div
              {...fadeIn}
              transition={{ delay: 0.3 }}
              className="bg-[#1a1a1a] border border-[#d4af37]/20 p-8 rounded-xl text-center hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="bg-[#d4af37]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#d4af37] transition-all duration-300">
                <Palette className="w-8 h-8 text-[#d4af37] group-hover:text-black transition-all duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#d4af37]"> {settings.subtitle} </h3>
              <p className="text-gray-400 text-sm leading-relaxed">   {settings.subtitle}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              آراء <span className="text-[#d4af37]">عملائنا</span>
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/20 p-8 rounded-xl hover:border-[#d4af37] transition-all duration-300 hover:shadow-2xl hover:shadow-[#d4af37]/10 pb-20"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#d4af37] text-[#d4af37]" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  "{testimonial.comment}"
                </p>

                {/* Delete Button */}
                <div className="absolute bottom-4 right-4 left-4 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('هل تريد حذف هذا التعليق؟')) {
                        const updatedTestimonials = testimonials.filter(t => t.id !== testimonial.id);
                        saveTestimonials(updatedTestimonials);
                      }
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>حذف</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeIn} className="text-center mt-12">
            <motion.button
              onClick={() => setShowTestimonialForm(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-[#d4af37] hover:bg-[#d4af37] text-[#d4af37] hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>أضف آراءك</span>
            </motion.button>
          </motion.div>

          {/* Testimonial Form */}
          {showTestimonialForm && (
            <div
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
              onClick={() => setShowTestimonialForm(false)}
            >
              <div
                className="relative max-w-4xl mx-auto bg-[#0a0a0a] p-8 rounded-xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowTestimonialForm(false)}
                  className="absolute top-4 right-4 z-50 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-3 rounded-full transition-all duration-300"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-bold text-[#d4af37] mb-6">أضف آراءك</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#d4af37]/10 p-3 rounded-lg">
                      <Star className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-2">التقييم</p>
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 cursor-pointer ${i < newTestimonial.rating ? 'fill-[#d4af37] text-[#d4af37]' : 'text-gray-600'}`}
                            onClick={() => setNewTestimonial({ ...newTestimonial, rating: i + 1 })}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="bg-[#d4af37]/10 p-3 rounded-lg w-fit">
                      <MessageCircle className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-400 text-sm mb-2">التعليق</p>
                      <textarea
                        value={newTestimonial.comment}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, comment: e.target.value })}
                        className="w-full h-32 bg-[#1a1a1a] border border-[#d4af37]/20 p-4 rounded-lg text-white leading-relaxed resize-none"
                        placeholder="أكتب تعليقك هنا..."
                      ></textarea>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={() => {
                    if (newTestimonial.comment.trim() === "") {
                      alert("يرجى كتابة تعليقك قبل إرساله.");
                      return;
                    }
                    const newId = testimonials.length > 0 ? testimonials[testimonials.length - 1].id + 1 : 1;
                    const newTestimonialWithId = { ...newTestimonial, id: newId };
                    const updatedTestimonials = [...testimonials, newTestimonialWithId];
                    saveTestimonials(updatedTestimonials);
                    setNewTestimonial({ rating: 5, comment: "", image: "" });
                    setShowTestimonialForm(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 inline-flex items-center gap-3 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl"
                >
                  <Plus className="w-6 h-6" />
                  <span>أضف آراءك</span>
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-3xl"></div>
        </div>
        
        <motion.div
          {...fadeIn}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            احصل على تصميمك الخاص الآن<br />
            <span className="text-[#d4af37]">بأسعار مميزة</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10">عروض حصرية لترة محدودة</p>
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-[#d4af37] hover:bg-[#c9a02e] text-black px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl"
          >
            احجز الآن
          </motion.a>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeIn} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-[#d4af37]">تواصل</span> معنا
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              نحن في خدمتكم للإجابة على استفساراتكم وتلبية طلباتكم
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn} className="space-y-6">
              <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] p-8 rounded-xl border border-[#d4af37]/20">
                <h3 className="text-2xl font-bold text-[#d4af37] mb-6">معلومات التواصل</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#d4af37]/10 p-3 rounded-lg">
                      <Phone className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">رقم الهاتف</p>
                      <a href={phoneLink} className="text-white text-lg font-semibold hover:text-[#d4af37] transition-colors block">
                        +964 788 145 7896
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#d4af37]/10 p-3 rounded-lg">
                      <MessageCircle className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">واتساب</p>
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-white text-lg font-semibold hover:text-[#d4af37] transition-colors block">
                        تواصل مباشر
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-[#d4af37]/10 p-3 rounded-lg">
                      <Sofa className="w-6 h-6 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">الموقع</p>
                      <p className="text-white text-lg font-semibold">
                        كركوك - حي العسكري<br />
                        <span className="text-base text-gray-300">قرب جامع خديجة الكبرى</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* أزرار التواصل السريع */}
                <div className="mt-8 pt-6 border-t border-[#d4af37]/20 flex flex-col sm:flex-row gap-4">
                  <a
                    href={phoneLink}
                    className="flex-1 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-6 py-3 rounded-lg font-bold text-center transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    اتصال مباشر
                  </a>
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] hover:bg-[#20ba5a] text-white px-6 py-3 rounded-lg font-bold text-center transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    واتساب
                  </a>
                </div>
              </div>
            </motion.div>

            {/* صورة جانبية */}
            <motion.div
              {...fadeIn}
              transition={{ delay: 0.2 }}
              className="relative rounded-xl overflow-hidden border-2 border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300"
            >
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzb2ZhJTIwc2hvd3Jvb218ZW58MXx8fHwxNzQyNTg0MDAwfDA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="قنفات ودواوين فاخرة"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 right-6 left-6">
                <h4 className="text-2xl font-bold text-white mb-2">تفضل بزيارتنا</h4>
                <p className="text-gray-200">كركوك - حي العسكري قرب جامع خديجة الكبرى</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#d4af37]/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#d4af37] mb-4">  {settings.subtitle}</h3>
            <p className="text-gray-400 mb-8">{settings.subtitle} </p>
            
            {/* Social Media Links */}
            <div className="flex justify-center gap-4 mb-8">
              <motion.a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d4af37]/10 hover:bg-[#d4af37] border border-[#d4af37]/20 hover:border-[#d4af37] p-4 rounded-full transition-all duration-300 group"
                aria-label="TikTok"
              >
                <svg className="w-6 h-6 text-[#d4af37] group-hover:text-black transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </motion.a>
              
              <motion.a
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d4af37]/10 hover:bg-[#d4af37] border border-[#d4af37]/20 hover:border-[#d4af37] p-4 rounded-full transition-all duration-300 group"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6 text-[#d4af37] group-hover:text-black transition-colors duration-300" />
              </motion.a>
              
              <motion.a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#d4af37]/10 hover:bg-[#d4af37] border border-[#d4af37]/20 hover:border-[#d4af37] p-4 rounded-full transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6 text-[#d4af37] group-hover:text-black transition-colors duration-300" />
              </motion.a>
            </div>
            
            <div className="border-t border-[#d4af37]/20 pt-6">
              <p className="text-gray-500">
                {settings.subtitle}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal للتكبير */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-50 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-3 rounded-full transition-all duration-300"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <div className="text-center">
              <div 
                className="relative max-w-4xl mx-auto touch-none"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
              >
                <img
                  src={selectedImage}
                  alt="عمل مميز"
                  className="max-w-full max-h-[80vh] object-contain mx-auto rounded-lg transition-transform duration-200"
                  style={{
                    transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                    cursor: scale > 1 ? 'move' : 'zoom-in'
                  }}
                />
              </div>
              <p className="text-gray-400 mt-4 text-sm">
                استخدم أصابعك للتكبير والتصغير • اسحب للتحريك
              </p>
            </div>
          </div>
        </div>
      )}
      {showPanel && (
  <div className="fixed top-0 right-0 w-80 h-full bg-[#1a1a1a] z-50 p-5 shadow-2xl">
    <h2 className="text-xl mb-4">لوحة التحكم</h2>

    <label className="block mb-2">العنوان:</label>
    <input
      value={settings.title}
      onChange={(e) =>
        setSettings({ ...settings, title: e.target.value })
      }
      className="w-full p-2 bg-black text-white mb-4 rounded"
    />

    <button
      onClick={() => setShowPanel(false)}
      className="bg-red-500 px-4 py-2 rounded"
    >
      اغلاق
    </button>
  </div>
)}
    </div>
  );
          }
