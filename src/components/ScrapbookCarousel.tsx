import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthMemory {
  month: string;
  image: string;
  text: string;
  colorClass: string;
}

const monthsData: MonthMemory[] = [
  {
    month: "December 2025",
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=1000&h=700&fit=crop",
    text: "December — The first moment I noticed you. That day the world felt softer.",
    colorClass: "from-[#fff4f7] to-[#ffcfe0]",
  },
  {
    month: "January 2026",
    image: "https://images.unsplash.com/photo-1511405946472-a37e3b5ccd47?w=1000&h=700&fit=crop",
    text: "January — Warm talks, small walks, and the beginning of a routine I never want to break.",
    colorClass: "from-[#f3fbff] to-[#bfeaff]",
  },
  {
    month: "February 2026",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1000&h=700&fit=crop",
    text: "February — Tiny surprises and the nervous joy of knowing I mattered to you.",
    colorClass: "from-[#fbf3ff] to-[#ddc9ff]",
  },
  {
    month: "March 2026",
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1000&h=700&fit=crop",
    text: "March — We wandered, laughed, and found a cafe that now smells like our story.",
    colorClass: "from-[#f4fff7] to-[#cff6d7]",
  },
  {
    month: "April 2026",
    image: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1000&h=700&fit=crop",
    text: "April — Promises exchanged in whispers and silly plans for future picnics.",
    colorClass: "from-[#fff7f0] to-[#ffdcc1]",
  },
  {
    month: "May 2026",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1000&h=700&fit=crop",
    text: "May — You taught me to notice tiny joys: a perfect cup of tea, a shared song.",
    colorClass: "from-[#fffdf3] to-[#fff8b8]",
  },
  {
    month: "June 2026",
    image: "https://images.unsplash.com/photo-1464746133101-a2c3f88e0dd9?w=1000&h=700&fit=crop",
    text: "June — Sunlit afternoons and hands held like promises.",
    colorClass: "from-[#fbf3ff] to-[#e6cffb]",
  },
  {
    month: "July 2026",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1000&h=700&fit=crop",
    text: "July — We danced badly in the kitchen and laughed until late.",
    colorClass: "from-[#fff6f5] to-[#ffcbc2]",
  },
  {
    month: "August 2026",
    image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=1000&h=700&fit=crop",
    text: "August — Slow mornings, shared books, sticky notes on the fridge.",
    colorClass: "from-[#f2fbff] to-[#bde8ff]",
  },
  {
    month: "September 2026",
    image: "https://images.unsplash.com/photo-1472746739044-34f5d1b31e3d?w=1000&h=700&fit=crop",
    text: "September — A small trip where time forgot us.",
    colorClass: "from-[#f6fff8] to-[#c8f4c8]",
  },
  {
    month: "October 2026",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&h=700&fit=crop",
    text: "October — You heard something unsaid and held me anyway.",
    colorClass: "from-[#fff8f1] to-[#ffd9b8]",
  },
  {
    month: "November 2026",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1000&h=700&fit=crop",
    text: "November — Quiet evenings wrapped in blankets and shared dreams.",
    colorClass: "from-[#fff2f6] to-[#ffc6dc]",
  },
];

export const ScrapbookCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {monthsData.map((memory, index) => (
            <div
              key={memory.month}
              className="flex-[0_0_100%] min-w-0 px-4 md:px-8"
            >
              <div
                className={`
                  max-w-[1100px] mx-auto
                  bg-gradient-to-b ${memory.colorClass}
                  rounded-[18px] p-4 md:p-6
                  transition-all duration-500
                  ${
                    index === selectedIndex
                      ? "scale-100 opacity-100"
                      : "scale-95 opacity-60"
                  }
                `}
                style={{ boxShadow: "var(--shadow-strong)" }}
              >
                {/* Month Label */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-3 py-1.5 rounded-lg text-sm font-bold text-[#6b2f42] bg-gradient-to-r from-[#fff0f4] to-[#ffe8f0] font-comfortaa">
                    {memory.month}
                  </div>
                  <div className="text-xs text-muted-foreground font-comfortaa">
                    {index + 1} of 12
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-[52%_48%] gap-4 items-start">
                  {/* Photo Section */}
                  <div className="relative bg-gradient-to-b from-[#fffaff] to-[#fff2f6] rounded-xl p-3 min-h-[280px] flex items-center justify-center">
                    {/* Tape effect */}
                    <div className="absolute left-3.5 top-2 w-[60px] h-[18px] bg-gradient-to-r from-white/95 to-white/85 rounded shadow-sm transform -rotate-[8deg]" />
                    <div className="absolute right-3.5 top-2 w-[60px] h-[18px] bg-gradient-to-r from-white/95 to-white/85 rounded shadow-sm transform rotate-[8deg]" />

                    <img
                      src={memory.image}
                      alt={`${memory.month} memory`}
                      className="w-full max-h-[45vh] rounded-lg object-cover border-[6px] border-white/60"
                      style={{
                        boxShadow: "0 12px 30px rgba(12,12,20,0.06)",
                      }}
                    />
                  </div>

                  {/* Note Section */}
                  <div className="bg-gradient-to-b from-[#fffdfb] to-[#fff6f9] rounded-xl p-3 min-h-[280px] font-patrick text-[#4a3337] leading-relaxed text-sm shadow-[inset_0_2px_8px_rgba(0,0,0,0.03)]">
                    <div className="text-base font-bold mb-1.5 text-[#5b3440]">
                      {memory.month} — Little Memory
                    </div>
                    <div className="whitespace-pre-wrap">{memory.text}</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-2 text-right text-[#6b4a52] text-xs font-comfortaa">
                  — With all my love
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-white z-10"
        style={{ boxShadow: "var(--shadow-soft)" }}
        aria-label="Previous month"
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110 hover:bg-white z-10"
        style={{ boxShadow: "var(--shadow-soft)" }}
        aria-label="Next month"
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7 text-secondary" />
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center gap-2 mt-6">
        {monthsData.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === selectedIndex
                ? "bg-primary w-6"
                : "bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to ${monthsData[index].month}`}
          />
        ))}
      </div>
    </div>
  );
};
