import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";



const galleryImages = [
  {
    id: 1,
    title: "Arena Finals 2024",
    category: "Tournament",
    emoji: "🏆",
  },
  {
    id: 2,
    title: "Clan War Victory",
    category: "Clan Wars",
    emoji: "⚔️",
  },
  {
    id: 3,
    title: "2v2 Champions",
    category: "Team Battle",
    emoji: "👥",
  },
  {
    id: 4,
    title: "Draft Night Special",
    category: "Events",
    emoji: "🎲",
  },
  {
    id: 5,
    title: "Legend League Finals",
    category: "Championship",
    emoji: "👑",
  },
  {
    id: 6,
    title: "Community Meetup",
    category: "Social",
    emoji: "🎉",
  },
];

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (id: number) => setSelectedImage(id);
  const closeLightbox = () => setSelectedImage(null);

  const navigate = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const currentIndex = galleryImages.findIndex((img) => img.id === selectedImage);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % galleryImages.length
        : (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    setSelectedImage(galleryImages[newIndex].id);
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-outfit font-extrabold text-5xl md:text-6xl text-foreground mb-4 drop-shadow-[2px_2px_0px_white]">
            Arena <span className="text-quaternary">Gallery</span>
          </h2>
          <div className="w-32 h-4 bg-quaternary mx-auto rounded-full border-2 border-foreground shadow-hard mt-4" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              onClick={() => openLightbox(image.id)}
              className="bg-card border-4 border-foreground rounded-[2rem] shadow-hard aspect-square overflow-hidden group relative transform hover:-rotate-2 hover:-translate-y-2 hover:shadow-hard-hover transition-all"
            >
              {/* Placeholder with emoji */}
              <div className="absolute inset-0 bg-muted flex items-center justify-center border-b-4 border-foreground group-hover:bg-quaternary transition-colors">
                <span className="text-6xl md:text-8xl transform group-hover:scale-125 transition-transform duration-300 drop-shadow-md">
                  {image.emoji}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4">
                <p className="font-outfit font-extrabold text-foreground text-2xl text-center mb-2">{image.title}</p>
                <p className="text-white bg-foreground font-jakarta font-bold text-sm px-3 py-1 rounded-full uppercase tracking-widest border-2 border-transparent">{image.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white border-2 border-foreground shadow-hard flex items-center justify-center hover:bg-destructive hover:text-white transition-colors"
          >
            <span className="inline-flex items-center justify-center text-inherit">❌</span>
          </button>

          <button
            onClick={() => navigate("prev")}
            className="absolute left-4 md:left-10 w-14 h-14 rounded-full bg-white border-2 border-foreground shadow-hard flex items-center justify-center hover:bg-tertiary hover:-translate-y-1 hover:shadow-hard-hover transition-all"
          >
            <span className="inline-flex items-center justify-center text-inherit">◀</span>
          </button>

          <button
            onClick={() => navigate("next")}
            className="absolute right-4 md:right-10 w-14 h-14 rounded-full bg-white border-2 border-foreground shadow-hard flex items-center justify-center hover:bg-tertiary hover:-translate-y-1 hover:shadow-hard-hover transition-all"
          >
            <span className="inline-flex items-center justify-center text-inherit">▶</span>
          </button>

          <div className="max-w-4xl w-full">
            {galleryImages
              .filter((img) => img.id === selectedImage)
              .map((image) => (
                <div key={image.id} className="bg-white border-4 border-foreground rounded-[3rem] shadow-hard aspect-video flex items-center justify-center p-10 transform scale-95 animate-in zoom-in-95 duration-200">
                  <div className="text-center">
                    <span className="text-[12rem] block mb-8 drop-shadow-xl hover:scale-110 transition-transform duration-500 cursor-default">{image.emoji}</span>
                    <h3 className="font-outfit font-extrabold text-4xl text-foreground mb-4">{image.title}</h3>
                    <p className="text-foreground font-jakarta font-bold text-lg bg-muted px-6 py-2 rounded-full inline-block border-2 border-slate-200">{image.category}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
