import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="font-title text-4xl md:text-6xl cr-title mb-4">
            <span className="text-foreground">Arena</span>{" "}
            <span className="text-primary">Gallery</span>
          </h2>
          <div className="section-divider w-48 mx-auto" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {galleryImages.map((image) => (
            <button
              key={image.id}
              onClick={() => openLightbox(image.id)}
              className="cr-card aspect-square overflow-hidden group relative"
            >
              {/* Placeholder with emoji */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-navy flex items-center justify-center">
                <span className="text-6xl md:text-8xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  {image.emoji}
                </span>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="font-title text-foreground text-lg">{image.title}</p>
                <p className="text-muted-foreground text-sm font-body">{image.category}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-navy-dark/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={() => navigate("prev")}
            className="absolute left-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-foreground" />
          </button>

          <button
            onClick={() => navigate("next")}
            className="absolute right-4 w-12 h-12 rounded-full bg-secondary flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-foreground" />
          </button>

          <div className="max-w-4xl w-full">
            {galleryImages
              .filter((img) => img.id === selectedImage)
              .map((image) => (
                <div key={image.id} className="cr-card aspect-video flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-9xl block mb-4">{image.emoji}</span>
                    <h3 className="font-title text-2xl text-foreground">{image.title}</h3>
                    <p className="text-muted-foreground font-body">{image.category}</p>
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
