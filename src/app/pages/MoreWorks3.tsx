import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Image as ImageIcon, Video, X, Plus, Upload } from "lucide-react";
import { Link } from "react-router";
import { useState, useEffect } from "react";

interface MediaItem {
  id: number;
  type: "image" | "video";
  url: string;
  title: string;
  description?: string;
}

export default function MoreWorks3() {
  const whatsappNumber = "9647881457896";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const phoneNumber = "+9647881457896";
  const phoneLink = `tel:${phoneNumber}`;

  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mediaType, setMediaType] = useState<"image" | "video">("image");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  // Default media items
  const defaultMediaItems: MediaItem[] = [
    {
      id: 1,
      type: "image",
      url: "https://images.unsplash.com/photo-1687180498602-5a1046defaa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHNjYWxlJTIwZnVybml0dXJlJTIwc2hvd3Jvb218ZW58MXx8fHwxNzc0MTY1NTQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "معرض أثاث راقي",
      description: "تصاميم فاخرة"
    },
    {
      id: 2,
      type: "image",
      url: "https://images.unsplash.com/photo-1759722665623-c4c1075c0a6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY291Y2glMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzQxNjU1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "قنفة داخلية أنيقة",
      description: "ديكور راقي"
    },
    {
      id: 3,
      type: "image",
      url: "https://images.unsplash.com/photo-1707299231603-6c0a93e0f7fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3BoaXN0aWNhdGVkJTIwbGl2aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzQxNjU1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "صالة راقية",
      description: "تصميم عصري"
    },
    {
      id: 4,
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "فيديو المعرض",
      description: "جولة شاملة"
    },
    {
      id: 5,
      type: "image",
      url: "https://images.unsplash.com/photo-1758448755778-90ebf4d0f1e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMHNvZmElMjBsdXh0cnl8ZW58MXx8fHwxNzc0MTY1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "قنفة ديزاين فخمة",
      description: "جودة عالية"
    },
    {
      id: 6,
      type: "image",
      url: "https://images.unsplash.com/photo-1738748444662-7fddb55f58dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBmdXJuaXR1cmUlMjBzZXR1cHxlbnwxfHx8fDE3NzQxNjU1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "طقم أثاث مودرن",
      description: "تنسيق متكامل"
    },
    {
      id: 7,
      type: "image",
      url: "https://images.unsplash.com/photo-1707376519357-b53e370384fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwaG9tZSUyMGRlY29yfGVufDF8fHx8MTc3NDE2NTU0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "ديكور منزلي بريميوم",
      description: "لمسات فاخرة"
    },
    {
      id: 8,
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "عرض الأعمال",
      description: "تصاميمنا المميزة"
    },
    {
      id: 9,
      type: "image",
      url: "https://images.unsplash.com/photo-1762803841422-5b8cf8767cd9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGljJTIwc29mYSUyMGRlc2lnbnxlbnwxfHx8fDE3NzQxNjU1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "تصميم قنفة شيك",
      description: "أناقة عصرية"
    },
    {
      id: 10,
      type: "image",
      url: "https://images.unsplash.com/photo-1758194090785-8e09b7288199?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cmlvdXMlMjBzZWF0aW5nJTIwYXJlYXxlbnwxfHx8fDE3NzQxNjU1NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "منطقة جلوس فخمة",
      description: "راحة ورقي"
    },
    {
      id: 11,
      type: "image",
      url: "https://images.unsplash.com/photo-1762803841325-a46175e1fc50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBjb3VjaCUyMHN0eWxlfGVufDF8fHx8MTc3NDE2NTU0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "قنفة معاصرة",
      description: "ستايل حديث"
    },
    {
      id: 12,
      type: "image",
      url: "https://images.unsplash.com/photo-1771926343760-c39c17d6a200?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwZnVybml0dXJlJTIwY29sbGVjdGlvbnxlbnwxfHx8fDE3NzQxNjU1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "مجموعة أثاث أنيقة",
      description: "تشكيلة مميزة"
    },
    {
      id: 13,
      type: "video",
      url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "جولة المصنع",
      description: "كيف نصنع الجودة"
    },
    {
      id: 14,
      type: "image",
      url: "https://images.unsplash.com/photo-1767050321604-a2654be8fad0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwbGl2aW5nJTIwc3BhY2V8ZW58MXx8fHwxNzc0MTY1NTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "مساحة معيشة راقية",
      description: "تصميم فاخر"
    },
    {
      id: 15,
      type: "image",
      url: "https://images.unsplash.com/photo-1768946131549-f03cafef7bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwYXJyYW5nZW1lbnR8ZW58MXx8fHwxNzc0MTY1NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "ترتيب قنفات مودرن",
      description: "تنسيق جميل"
    },
    {
      id: 16,
      type: "image",
      url: "https://images.unsplash.com/photo-1601002257790-ebe0966a85ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3VjaCUyMGRpc3BsYXl8ZW58MXx8fHwxNzc0MTY1NTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "عرض قنف��ت فخمة",
      description: "فخامة ورقي"
    },
    {
      id: 17,
      type: "image",
      url: "https://images.unsplash.com/photo-1684261556324-a09b2cdf68b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwc29mYSUyMGludGVyaW9yfGVufDF8fHx8MTc3NDE2NTU0NXww&ixlib=rb-4.1.0&q=80&w=1080",
      title: "قنفة بريميوم",
      description: "ديكور داخلي"
    },
    {
      id: 18,
      type: "image",
      url: "https://images.unsplash.com/photo-1609081144289-eacc3108cd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ25lciUyMGZ1cm5pdHVyZSUyMHJvb218ZW58MXx8fHwxNzc0MTY1NTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      title: "غرفة أثاث ديزاين",
      description: "إبداع وتميز"
    },
  ];

  // Load from localStorage or use default
  const getInitialMedia = () => {
    const savedMedia = localStorage.getItem('moreWorks3Media');
    if (savedMedia) {
      try {
        return JSON.parse(savedMedia);
      } catch (e) {
        console.error('Failed to load media from localStorage', e);
        return defaultMediaItems;
      }
    }
    return defaultMediaItems;
  };

  const [mediaItems, setMediaItems] = useState<MediaItem[]>(getInitialMedia);

  // Save media to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('moreWorks3Media', JSON.stringify(mediaItems));
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
            <Link to="/more-works-2" className="flex items-center gap-3 text-[#d4af37] hover:text-[#c9a02e] transition-colors">
              <ArrowRight className="w-6 h-6" />
              <span className="font-bold text-lg">العودة</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-[#d4af37]">المزيد من الأعمال 3</h1>
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
              إبداعات <span className="text-[#d4af37]">حصرية</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              أحدث تصاميمنا وأعمالنا الفنية المميزة
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
                <div onClick={() => setSelectedMedia(item)} className="cursor-pointer">
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

          <motion.div {...fadeIn} className="text-center mt-16">
            <Link
              to="/"
              className="inline-block bg-[#d4af37] hover:bg-[#c9a02e] text-black px-12 py-5 rounded-lg font-bold text-xl transition-all duration-300 shadow-2xl hover:scale-105"
            >
              العودة للرئيسية
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              هل أنت مستعد؟
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              اطلب تصميمك الآن واحصل على <span className="text-[#d4af37] font-bold">خصم حصري</span>
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
            <div className="border-t border-[#d4af37]/20 pt-6">
              <p className="text-gray-500">© 2026 قنفات ودواوين الأسدي الفاخرة - كل الحقوق محفوظة</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Media Modal */}
      {selectedMedia && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 left-6 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-3 rounded-full transition-all duration-300 z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full overflow-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {selectedMedia.type === "image" ? (
              <motion.img
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                src={selectedMedia.url}
                alt={selectedMedia.title}
                className="w-full rounded-xl"
              />
            ) : (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="aspect-video"
              >
                <iframe
                  src={selectedMedia.url}
                  title={selectedMedia.title}
                  className="w-full h-full rounded-xl"
                  allowFullScreen
                ></iframe>
              </motion.div>
            )}
            
            <div className="mt-6 text-center bg-[#1a1a1a] rounded-xl p-6">
              <h3 className="text-2xl font-bold text-[#d4af37] mb-2">{selectedMedia.title}</h3>
              {selectedMedia.description && (
                <p className="text-gray-400">{selectedMedia.description}</p>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Media Modal */}
      {showAddForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowAddForm(false)}
        >
          <div className="max-w-2xl w-full bg-[#1a1a1a] rounded-xl p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#d4af37]">إضافة وسائط جديدة</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Media Type Selector */}
            <div className="flex items-center gap-4 mb-6">
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  mediaType === "image" 
                    ? "bg-[#d4af37] text-black" 
                    : "bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                }`}
                onClick={() => setMediaType("image")}
              >
                <ImageIcon className="w-5 h-5" />
                صورة
              </button>
              <button
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                  mediaType === "video" 
                    ? "bg-[#d4af37] text-black" 
                    : "bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37] hover:text-black"
                }`}
                onClick={() => setMediaType("video")}
              >
                <Video className="w-5 h-5" />
                فيديو
              </button>
            </div>

            {/* File Upload */}
            {mediaType === "image" && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  اختر صورة من جهازك
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="w-full px-4 py-8 rounded-lg bg-[#0a0a0a] border-2 border-dashed border-[#d4af37]/40 text-gray-300 hover:border-[#d4af37] transition-all cursor-pointer flex flex-col items-center gap-3"
                >
                  <Upload className="w-12 h-12 text-[#d4af37]" />
                  <span className="font-bold text-[#d4af37]">اضغط لاختيار صورة</span>
                </label>
              </div>
            )}

            {/* Manual URL Input */}
            {mediaType === "video" && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-400 mb-2">
                  رابط الفيديو (YouTube)
                </label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://www.youtube.com/embed/..."
                  className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#d4af37]/20 text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none transition-all"
                />
              </div>
            )}

            {/* Title Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-400 mb-2">
                العنوان *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="أدخل عنوان العمل"
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#d4af37]/20 text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none transition-all"
              />
            </div>

            {/* Description Input */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-400 mb-2">
                الوصف (اختياري)
              </label>
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="أدخل وصف العمل"
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-[#0a0a0a] border border-[#d4af37]/20 text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none transition-all resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                className="bg-[#d4af37] hover:bg-[#c9a02e] text-black px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={mediaType === "image" ? () => {} : handleAddMedia}
                disabled={!newTitle || (mediaType === "video" && !newUrl)}
              >
                إضافة
              </button>
              <button
                className="bg-[#1a1a1a] border border-[#d4af37]/20 text-[#d4af37] px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-[#d4af37] hover:text-black"
                onClick={() => setShowAddForm(false)}
              >
                إلغاء
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Add Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-[#d4af37] hover:bg-[#c9a02e] text-black p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110"
        onClick={() => setShowAddForm(true)}
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}
