import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Image as ImageIcon, Video, Plus, X, Upload, Facebook, Instagram, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useState, useRef, useEffect } from "react";
import { ScrollToTop } from "../components/ScrollToTop";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Breadcrumbs } from "../components/Breadcrumbs";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
  title: string;
  description?: string;
}

export default function Gallery() {
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

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState<number>(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  // مجموعة من الصور والفيديوهات
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1762803842055-de1e5fb14477?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBtb2Rlcm4lMjBzb2ZhJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzc0MTYzNDc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "قنفات فخمة بتصميم عصري",
      description: "تفصيل خاص بأفضل الخامات"
    },
    {
      id: 2,
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "فيديو عرض دواوين مودرن",
      description: "شاهد التفاصيل الكاملة"
    },
    {
      id: 3,
      type: "image",
      url: "https://images.unsplash.com/photo-1683793837504-318275ff665d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwdmVsdmV0JTIwY291Y2glMjBnb2xkfGVufDF8fHx8MTc3NDE2MzQ3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "قنفات مخمل ذهبي",
      description: "لمسة من الفخامة والرقي"
    },
    {
      id: 4,
      type: "image",
      url: "https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGl2aW5nJTIwcm9vbSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NzQxMjkwNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "صالة عصرية متكاملة",
      description: "تنسيق كامل لصالة الاستقبال"
    },
    {
      id: 5,
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "جولة في معرضنا",
      description: "تعرف على أعمالنا الحديثة"
    },
    {
      id: 6,
      type: "image",
      url: "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBpbnRlcmlvciUyMGRlc2lnbiUyMHNvZmF8ZW58MXx8fHwxNzc0MTYzNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "دواوين كلاسيكية فاخرة",
      description: "تصميم أنيق يناسب جميع الأذواق"
    },
    {
      id: 7,
      type: "image",
      url: "https://images.unsplash.com/photo-1748619549647-354a2a72af1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcmFiaWMlMjBmdXJuaXR1cmUlMjBjb3VjaHxlbnwxfHx8fDE3NzQxNjM0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "قنفات بتصميم مميز",
      description: "راحة وفخامة في آن واحد"
    },
    {
      id: 8,
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "عملية التفصيل",
      description: "شاهد كيف نصنع الجودة"
    },
    {
      id: 9,
      type: "image",
      url: "https://images.unsplash.com/photo-1680503146476-abb8c752e1f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnVybml0dXJlJTIwc2hvd3Jvb218ZW58MXx8fHwxNzc0MTYzNDgwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "معرض القنفات والدواوين",
      description: "أحدث التصاميم في معرضنا"
    },
  ]);

  // Load media from localStorage on mount
  useEffect(() => {
    const savedMedia = localStorage.getItem('galleryMedia');
    if (savedMedia) {
      try {
        setMediaItems(JSON.parse(savedMedia));
      } catch (e) {
        console.error('Failed to load media from localStorage', e);
      }
    }
  }, []);

  // Save media to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('galleryMedia', JSON.stringify(mediaItems));
  }, [mediaItems]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItem: MediaItem = {
          id: Date.now(),
          type: "image",
          url: reader.result as string,
          title: newTitle || file.name,
          description: newDescription || undefined,
        };
        setMediaItems([newItem, ...mediaItems]);
        setNewTitle("");
        setNewDescription("");
        setShowAddForm(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMedia = () => {
    if (newTitle && newUrl) {
      const newItem: MediaItem = {
        id: Date.now(),
        type: mediaType,
        url: newUrl,
        title: newTitle,
        description: newDescription || undefined,
      };
      setMediaItems([newItem, ...mediaItems]);
      setNewTitle("");
      setNewDescription("");
      setNewUrl("");
      setShowAddForm(false);
    }
  };

  const handleDeleteMedia = (id: number) => {
    if (confirm('هل تريد حذف هذا العنصر؟')) {
      setMediaItems(mediaItems.filter(item => item.id !== id));
    }
  };

  const handleEditMedia = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaItems(mediaItems.map(item => 
          item.id === id 
            ? { ...item, url: reader.result as string }
            : item
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredMedia = mediaItems.filter(item => 
    filter === "all" ? true : item.type === filter
  );

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
      <header className="bg-[#1a1a1a] border-b border-[#d4af37]/20 sticky top-0 z-40 backdrop-blur-md bg-[#1a1a1a]/95">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 text-[#d4af37] hover:text-[#c9a02e] transition-colors">
              <ArrowRight className="w-6 h-6" />
              <span className="font-bold text-lg">العودة للرئيسية</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#d4af37]">معرض الأعمال</h1>
          </div>
          
          {/* Breadcrumbs */}
          <div className="mt-4">
            <Breadcrumbs items={[{ label: "معرض الأعمال" }]} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              استكشف <span className="text-[#d4af37]">إبداعاتنا</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              شاهد مجموعة من أفضل أعمالنا في تفصيل وتصميم القنفات والدواوين الفاخرة
            </p>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-8"></div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          {/* Filter Tabs */}
          <motion.div {...fadeIn} className="flex justify-center gap-4 mb-12 flex-wrap">
            <button 
              onClick={() => setFilter("all")}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                filter === "all" 
                  ? "bg-[#d4af37] text-black" 
                  : "bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              }`}
            >
              الكل
            </button>
            <button 
              onClick={() => setFilter("image")}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                filter === "image" 
                  ? "bg-[#d4af37] text-black" 
                  : "bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              الصور
            </button>
            <button 
              onClick={() => setFilter("video")}
              className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                filter === "video" 
                  ? "bg-[#d4af37] text-black" 
                  : "bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
              }`}
            >
              <Video className="w-5 h-5" />
              الفيديوهات
            </button>
          </motion.div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.map((item, index) => (
              <motion.div
                key={item.id}
                {...fadeIn}
                transition={{ delay: index * 0.1 }}
                className="relative overflow-hidden rounded-xl group bg-[#1a1a1a] border border-[#d4af37]/20 hover:border-[#d4af37] transition-all duration-300"
              >
                <div onClick={() => {
                  setSelectedMedia(item);
                  setSelectedMediaIndex(index);
                }} className="cursor-pointer">
                  {item.type === "image" ? (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] bg-[#1a1a1a] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/20 to-transparent"></div>
                      <Video className="w-20 h-20 text-[#d4af37] relative z-10" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 rounded-full bg-[#d4af37] flex items-center justify-center">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-r-0 border-b-8 border-b-transparent border-l-12 border-l-black mr-1"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Media Type Badge */}
                  <div className="absolute top-4 left-4 bg-[#d4af37] text-black px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                    {item.type === "image" ? (
                      <>
                        <ImageIcon className="w-4 h-4" />
                        صورة
                      </>
                    ) : (
                      <>
                        <Video className="w-4 h-4" />
                        فيديو
                      </>
                    )}
                  </div>

                  {/* Info Overlay */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-[#d4af37]">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-400 text-sm">{item.description}</p>
                    )}
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[#d4af37] font-bold text-xl">عرض</span>
                  </div>
                </div>

                {/* Edit and Delete Buttons */}
                <div className="absolute bottom-4 right-4 left-4 flex gap-2 z-20">
                  <label className="flex-1 bg-[#d4af37] hover:bg-[#c9a02e] text-black px-4 py-2 rounded-lg font-bold text-sm text-center transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" />
                    <span>تحديث</span>
                    <input
                      type="file"
                      accept={item.type === "image" ? "image/*" : "video/*"}
                      onChange={(e) => handleEditMedia(item.id, e)}
                      className="hidden"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </label>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteMedia(item.id);
                    }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    <span>حذف</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div {...fadeIn} className="text-center mt-16">
            <Link
              to="/more-works"
              className="inline-block bg-[#d4af37] hover:bg-[#c9a02e] text-black px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl hover:scale-105"
            >
              تحميل المزيد من الأعمال
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              أعجبك ما رأيت؟
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              اطلب تصميمك الخاص الآن واحصل على <span className="text-[#d4af37] font-bold">خصم خاص</span>
            </p>
            <motion.a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-[#d4af37] hover:bg-[#c9a02e] text-black px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl"
            >
              تواصل معنا الآن
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] border-t border-[#d4af37]/20 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-[#d4af37] mb-4">قنفات ودواوين الأسدي الفاخرة ✨</h3>
            <p className="text-gray-400 mb-8">جودة عالية، تصميم فريد، خدمة متميزة</p>
            
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
                © 2026 قنفات ودواوين الأسدي الفاخرة - كل الحقوق محفوظة
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for viewing media */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center"
        >
          <button
            onClick={() => {
              setSelectedMedia(null);
              setZoom(1);
              setPosition({ x: 0, y: 0 });
            }}
            className="absolute top-6 left-6 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-4 rounded-full transition-all duration-300 z-[70] shadow-2xl"
          >
            <X className="w-7 h-7" />
          </button>

          <div className="w-full h-full overflow-hidden touch-none">
            {selectedMedia.type === "image" ? (
              <div
                className="w-full h-full flex items-center justify-center"
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY * -0.001;
                  const newZoom = Math.min(Math.max(0.5, zoom + delta), 4);
                  setZoom(newZoom);
                }}
                onTouchStart={(e) => {
                  if (e.touches.length === 2) {
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    const distance = Math.hypot(
                      touch2.clientX - touch1.clientX,
                      touch2.clientY - touch1.clientY
                    );
                    setDragStart({ x: distance, y: zoom });
                  } else if (e.touches.length === 1 && zoom > 1) {
                    setIsDragging(true);
                    setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
                  }
                }}
                onTouchMove={(e) => {
                  if (e.touches.length === 2) {
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    const distance = Math.hypot(
                      touch2.clientX - touch1.clientX,
                      touch2.clientY - touch1.clientY
                    );
                    const newZoom = Math.min(Math.max(0.5, dragStart.y * (distance / dragStart.x)), 4);
                    setZoom(newZoom);
                  } else if (isDragging && e.touches.length === 1) {
                    setPosition({
                      x: e.touches[0].clientX - dragStart.x,
                      y: e.touches[0].clientY - dragStart.y,
                    });
                  }
                }}
                onTouchEnd={() => {
                  setIsDragging(false);
                }}
                onMouseDown={(e) => {
                  if (zoom > 1) {
                    setIsDragging(true);
                    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
                  }
                }}
                onMouseMove={(e) => {
                  if (isDragging) {
                    setPosition({
                      x: e.clientX - dragStart.x,
                      y: e.clientY - dragStart.y,
                    });
                  }
                }}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
              >
                <img
                  ref={imageRef}
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-200 select-none"
                  style={{
                    transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                    cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                  }}
                  draggable={false}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center p-4">
                <div className="w-full max-w-6xl aspect-video">
                  <iframe
                    src={selectedMedia.url}
                    title={selectedMedia.title}
                    className="w-full h-full rounded-xl"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
          </div>

          <div className="absolute bottom-6 left-0 right-0 text-center bg-black/80 backdrop-blur-md p-6 mx-6 rounded-xl z-[70]">
            <h3 className="text-2xl font-bold text-[#d4af37] mb-2">{selectedMedia.title}</h3>
            {selectedMedia.description && (
              <p className="text-gray-300">{selectedMedia.description}</p>
            )}
            {selectedMedia.type === "image" && (
              <p className="text-gray-400 text-sm mt-2">استخدم إصبعين للتكبير أو عجلة الماوس</p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-6 right-6 left-6 flex justify-between z-[70]">
            <button
              onClick={() => {
                const newIndex = (selectedMediaIndex - 1 + filteredMedia.length) % filteredMedia.length;
                setSelectedMedia(filteredMedia[newIndex]);
                setSelectedMediaIndex(newIndex);
              }}
              className="bg-[#d4af37] hover:bg-[#c9a02e] text-black p-4 rounded-full transition-all duration-300 shadow-2xl"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
            <button
              onClick={() => {
                const newIndex = (selectedMediaIndex + 1) % filteredMedia.length;
                setSelectedMedia(filteredMedia[newIndex]);
                setSelectedMediaIndex(newIndex);
              }}
              className="bg-[#d4af37] hover:bg-[#c9a02e] text-black p-4 rounded-full transition-all duration-300 shadow-2xl"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Add Media Form */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddForm(false)}
        >
          <div className="max-w-3xl w-full bg-[#1a1a1a] rounded-xl p-8" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-2xl font-bold text-[#d4af37] mb-6">إضافة وسائط جديدة</h2>
            <div className="flex items-center gap-4 mb-4">
              <button
                className={`bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] px-6 py-3 rounded-lg font-bold transition-all duration-300 ${mediaType === "image" ? "bg-[#d4af37] text-black" : ""}`}
                onClick={() => setMediaType("image")}
              >
                <ImageIcon className="w-5 h-5" />
                صورة
              </button>
              <button
                className={`bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] px-6 py-3 rounded-lg font-bold transition-all duration-300 ${mediaType === "video" ? "bg-[#d4af37] text-black" : ""}`}
                onClick={() => setMediaType("video")}
              >
                <Video className="w-5 h-5" />
                فيديو
              </button>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-400 mb-2">عنوان الوسائط</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#d4af37]/20 text-gray-300 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-400 mb-2">وصف الوسائط</label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#d4af37]/20 text-gray-300 focus:outline-none focus:border-[#d4af37]"
                rows={3}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-400 mb-2">رابط الوسائط</label>
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border border-[#d4af37]/20 text-gray-300 focus:outline-none focus:border-[#d4af37]"
              />
            </div>
            <div className="text-center">
              <button
                className="bg-[#d4af37] hover:bg-[#c9a02e] text-black px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl"
                onClick={handleAddMedia}
              >
                إضافة الوسائط
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Media Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Loading Spinner */}
      {isLoading && <LoadingSpinner />}
    </div>
  );
          }
