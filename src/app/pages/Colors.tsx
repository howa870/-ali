import { motion } from "motion/react";
import { MessageCircle, ArrowRight, Palette, X, Upload, RotateCcw } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

interface ColorItem {
  id: number;
  name: string;
  image: string;
}

const fadeInAnimation = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function Colors() {
  const whatsappNumber = "9647881457896";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const defaultColors: ColorItem[] = [
    {
      id: 1,
      name: "ذهبي فاخر",
      image: "https://images.unsplash.com/photo-1725677356693-cdd8b255250a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2ZWx2ZXQlMjBmYWJyaWMlMjB0ZXh0dXJlJTIwZ29sZHxlbnwxfHx8fDE3NzQxNjY5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 2,
      name: "بيج كلاسيكي",
      image: "https://images.unsplash.com/photo-1629908888659-cb04501cb4a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwYmVpZ2UlMjBzb2ZhJTIwZmFicmljfGVufDF8fHx8MTc3NDE2NjkwMXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      name: "أزرق غامق",
      image: "https://images.unsplash.com/photo-1686212164366-b25166623992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwYmx1ZSUyMHZlbHZldCUyMHRleHR1cmV8ZW58MXx8fHwxNzc0MTY2OTAxfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      name: "أحمر نبيذي",
      image: "https://images.unsplash.com/photo-1761682719895-0705fec8df69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJndW5keSUyMHJlZCUyMGZhYnJpYyUyMG1hdGVyaWFsfGVufDF8fHx8MTc3NDE2NjkwMnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 5,
      name: "أخضر زمردي",
      image: "https://images.unsplash.com/photo-1767713421795-ca09a9d05c38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyYWxkJTIwZ3JlZW4lMjB2ZWx2ZXQlMjBmYWJyaWN8ZW58MXx8fHwxNzc0MTY2OTAyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 6,
      name: "أزرق ملكي",
      image: "https://images.unsplash.com/photo-1686212164366-b25166623992?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXZ5JTIwYmx1ZSUyMGx1eHVyeSUyMGZhYnJpY3xlbnwxfHx8fDE3NzQxNjY5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 7,
      name: "كريمي أبيض",
      image: "https://images.unsplash.com/photo-1693592398532-cb18d3b01d07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbSUyMHdoaXRlJTIwc29mYSUyMHRleHR1cmV8ZW58MXx8fHwxNzc0MTY2OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 8,
      name: "رمادي فحمي",
      image: "https://images.unsplash.com/photo-1603886559923-14ce936aa9d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyY29hbCUyMGdyYXklMjB2ZWx2ZXR8ZW58MXx8fHwxNzc0MTY2OTAzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 9,
      name: "بني جلدي",
      image: "https://images.unsplash.com/photo-1571829604981-ea159f94e5ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGxlYXRoZXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc3NDA4NTQwOHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 10,
      name: "رمادي فضي",
      image: "https://images.unsplash.com/photo-1736923400764-23e1ab1fe4a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBncmF5JTIwZmFicmljfGVufDF8fHx8MTc3NDE2NjkwNHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 11,
      name: "أزرق فيروزي",
      image: "https://images.unsplash.com/photo-1659469378400-eb508bdb2c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJxdW9pc2UlMjBibHVlJTIwZmFicmljfGVufDF8fHx8MTc3NDE2NjkwNXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 12,
      name: "أصفر خردلي",
      image: "https://images.unsplash.com/photo-1570667614127-a90605da8f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXN0YXJkJTIweYVsbG93JTIwdmVsdmV0fGVufDF8fHx8MTc3NDE2NjkwNXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 13,
      name: "أخضر زيتوني",
      image: "https://images.unsplash.com/photo-1762803841187-519b5fdf2109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbGl2ZSUyMGdyZWVuJTIwZmFicmljfGVufDF8fHx8MTc3NDE2NjkwNXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 14,
      name: "وردي ناعم",
      image: "https://images.unsplash.com/photo-1620736214028-b3bab8e20aab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVzaCUyMHBpbmslMjB2ZWx2ZXR8ZW58MXx8fHwxNzc0MTY2OTA2fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 15,
      name: "برتقالي ترابي",
      image: "https://images.unsplash.com/photo-1611242890479-faa05a2cd2d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJyYWNvdHRhJTIwb3JhbmdlJTIwZmFicmljfGVufDF8fHx8MTc3NDE2NjkwNnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 16,
      name: "عاجي أنيق",
      image: "https://images.unsplash.com/photo-1731504799594-d396af7e9920?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdm9yeSUyMHdoaXRlJTIwZmFicmlcJTIwdGV4dHVyZXxlbnwxfHx8fDE3NzQxNjY5MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 17,
      name: "أخضر مريمي",
      image: "https://images.unsplash.com/photo-1763734313272-f06e0d4c1239?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWdlJTIwZ3JlZW4lMjBmYWJyaWN8ZW58MXx8fHwxNzc0MTY2OTA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 18,
      name: "بني فاتح",
      image: "https://images.unsplash.com/photo-1635368384835-e4588aaf7252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YXVwZSUyMGJyb3duJTIwZmFicmljfGVufDF8fHx8MTc3NDE2NjkwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 19,
      name: "أحمر قرمزي",
      image: "https://images.unsplash.com/photo-1761078739411-2ccb6e956c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmltc29uJTIwcmVkJTIwdmVsdmV0fGVufDF8fHx8MTc3NDE2NjkwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 20,
      name: "رمادي داكن",
      image: "https://images.unsplash.com/photo-1604690078253-f73b6fbfcbd1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGF0ZSUyMGdyYXklMjBmYWJyaWN8ZW58MXx8fHwxNzc0MTY2OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 21,
      name: "أزرق طاووسي",
      image: "https://images.unsplash.com/photo-1720439001663-f89032c782c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjb2NrJTIwYmx1ZSUyMGZhYnJpY3xlbnwxfHx8fDE3NzQxNjY5MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 22,
      name: "ذهبي وردي",
      image: "https://images.unsplash.com/photo-1587947330297-bbc8b86f00ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb3NlJTIwZ29sZCUyMGZhYnJpY3xlbnwxfHx8fDE3NzQxNjY5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 23,
      name: "بني شوكولاته",
      image: "https://images.unsplash.com/photo-1718115690443-cd8b7f6c112b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBicm93biUyMHZlbHZldHxlbnwxfHx8fDE3NzQxNjY5MDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 24,
      name: "بني فاتح",
      image: "https://images.unsplash.com/photo-1772912139533-8e47f434406a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW4lMjBicm93biUyMGZhYnJpYyUyMHRleHR1cmV8ZW58MXx8fHwxNzc0MTY2OTEyfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 25,
      name: "ذهبي كلاسيكي",
      image: "https://images.unsplash.com/photo-1725677356693-cdd8b255250a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2ZWx2ZXQlMjBmYWJyaWMlMjB0ZXh0dXJlJTIwZ29sZHxlbnwxfHx8fDE3NzQxNjY5MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  // All useState hooks must be declared before any conditional logic or useEffect
  const [colors, setColors] = useState<ColorItem[]>(() => {
    const savedColors = localStorage.getItem('customColors');
    return savedColors ? JSON.parse(savedColors) : defaultColors;
  });
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Save colors to localStorage whenever they change
  const saveColors = (newColors: ColorItem[]) => {
    setColors(newColors);
    localStorage.setItem('customColors', JSON.stringify(newColors));
  };

  const handleImageUpload = (colorId: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newColors = colors.map(color => 
          color.id === colorId 
            ? { ...color, image: reader.result as string }
            : color
        );
        saveColors(newColors);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (colorId: number, newName: string) => {
    const newColors = colors.map(color =>
      color.id === colorId
        ? { ...color, name: newName }
        : color
    );
    saveColors(newColors);
  };

  const resetToDefaults = () => {
    if (confirm('هل أنت متأكد من إعادة تعيين جميع الألوان للافتراضية؟')) {
      saveColors(defaultColors);
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
    setSelectedColor(null);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Cairo', sans-serif" }} dir="rtl">
      {/* Floating WhatsApp Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#d4af37]/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-[#d4af37] transition-colors duration-300">
              <ArrowRight className="w-5 h-5" />
              <span>الرجوع للرئيسية</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#d4af37]">
              قنفات ودواوين الأسدي الفاخرة ✨
            </h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Palette className="w-12 h-12 text-[#d4af37]" />
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                معرض <span className="text-[#d4af37]">الألوان</span>
              </h2>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              اختر من بين 25 لون فاخر لقنفاتك ودواوينك<br />
              جميع الأل��ان متوفرة بأقمشة عالية الجودة
            </p>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mb-8"></div>
            
            {/* زر تحديث الألوان */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => setShowUploadModal(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-xl"
              >
                <Upload className="w-6 h-6" />
                <span>تحديث الألوان</span>
              </motion.button>
              
              <motion.button
                onClick={resetToDefaults}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-transparent border-2 border-[#d4af37] hover:bg-[#d4af37] text-[#d4af37] hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300"
              >
                <RotateCcw className="w-6 h-6" />
                <span>إعادة تعيين</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Colors Grid */}
      <section className="py-16 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {colors.map((color, index) => (
              <motion.div
                key={color.id}
                {...fadeInAnimation}
                transition={{ delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedColor(color)}
              >
                <div className="relative overflow-hidden rounded-xl aspect-square border-2 border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300">
                  <img
                    src={color.image}
                    alt={color.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-center text-sm md:text-base">
                      {color.name}
                    </h3>
                  </div>
                  {/* Number Badge */}
                  <div className="absolute top-3 right-3 bg-[#d4af37] text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {color.id}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal للتكبير */}
      {selectedColor && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
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
              <h3 className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-4">
                {selectedColor.name}
              </h3>
              <div 
                className="relative max-w-4xl mx-auto touch-none"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onWheel={handleWheel}
              >
                <img
                  src={selectedColor.image}
                  alt={selectedColor.name}
                  className="max-w-full max-h-[70vh] object-contain mx-auto rounded-lg transition-transform duration-200"
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeInAnimation}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              اختر لونك المفضل<br />
              <span className="text-[#d4af37]">واطلب الآن</span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              تواصل معنا عبر واتساب لطلب لونك المفضل
            </p>
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-10 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl"
            >
              <MessageCircle className="w-6 h-6" />
              <span>اطلب عبر واتساب</span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#d4af37]/20 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2026 قنفات ودواوين الأسدي الفاخرة - جودة عالية وألوان متنوعة
          </p>
        </div>
      </footer>

      {/* Modal لتحديث الألوان */}
      {showUploadModal && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1a1a1a] border-2 border-[#d4af37]/30 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-[#d4af37]/20 p-6 flex items-center justify-between">
              <h3 className="text-2xl md:text-3xl font-bold text-[#d4af37]">
                تحديث الألوان
              </h3>
              <button
                onClick={() => setShowUploadModal(false)}
                className="bg-[#d4af37] hover:bg-[#c9a02e] text-black p-2 rounded-full transition-all duration-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-300 mb-6 text-center">
                اضغط على أي لون لتغيير الصورة أو تعديل الاسم
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {colors.map((color) => (
                  <div key={color.id} className="bg-[#0a0a0a] border border-[#d4af37]/20 rounded-lg p-4">
                    <div className="relative aspect-square mb-3 rounded-lg overflow-hidden border-2 border-[#d4af37]/30">
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-full h-full object-cover"
                      />
                      <label className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-[#d4af37] mx-auto mb-2" />
                          <span className="text-white font-bold text-sm">تغيير الصورة</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(color.id, e)}
                          className="hidden"
                        />
                      </label>
                      <div className="absolute top-2 right-2 bg-[#d4af37] text-black w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm">
                        {color.id}
                      </div>
                    </div>

                    <input
                      type="text"
                      value={color.name}
                      onChange={(e) => handleNameChange(color.id, e.target.value)}
                      className="w-full bg-[#1a1a1a] border border-[#d4af37]/30 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-[#d4af37] transition-colors duration-300"
                      placeholder="اسم اللون"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="bg-[#d4af37] hover:bg-[#c9a02e] text-black px-8 py-3 rounded-lg font-bold transition-all duration-300"
                >
                  حفظ وإغلاق
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
      }
