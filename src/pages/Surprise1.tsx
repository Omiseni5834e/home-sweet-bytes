import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

const Surprise1 = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [muted, setMuted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const reels = [
    {
      id: 1,
      videoSrc: "", // User will provide
      title: "Memory 1",
      description: "Our special moment ❤️"
    },
    {
      id: 2,
      videoSrc: "", // User will provide
      title: "Memory 2",
      description: "Forever together 💕"
    },
    {
      id: 3,
      videoSrc: "", // User will provide
      title: "Memory 3",
      description: "Love and laughter 🌟"
    },
    {
      id: 4,
      videoSrc: "", // User will provide
      title: "Memory 4",
      description: "Our adventure 🎉"
    },
    {
      id: 5,
      videoSrc: "", // User will provide
      title: "Memory 5",
      description: "Always and forever 💖"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = containerRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollTop / windowHeight);
      
      if (index !== currentReel && index >= 0 && index < reels.length) {
        setCurrentReel(index);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentReel, reels.length]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === currentReel) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentReel]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = muted;
      }
    });
  }, [muted]);

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 bg-gradient-to-b from-background/80 to-transparent">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 font-comfortaa text-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Mute Button */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-6 right-6 z-50 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={() => setMuted(!muted)}
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </Button>

      {/* Reels Container */}
      <div 
        ref={containerRef}
        className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {reels.map((reel, index) => (
          <div
            key={reel.id}
            className="h-screen w-full snap-start snap-always flex items-center justify-center relative"
          >
            {reel.videoSrc ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={reel.videoSrc}
                className="w-full h-full object-cover"
                loop
                playsInline
                muted={muted}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
                <div className="text-center p-8">
                  <div className="text-6xl mb-4">🎥</div>
                  <p className="font-comfortaa text-2xl font-bold text-foreground mb-2">
                    Video {index + 1}
                  </p>
                  <p className="font-patrick text-lg text-muted-foreground">
                    Add your video here
                  </p>
                </div>
              </div>
            )}

            {/* Overlay Info */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-background/90 to-transparent">
              <h2 className="font-comfortaa text-3xl font-bold text-foreground mb-2">
                {reel.title}
              </h2>
              <p className="font-patrick text-xl text-muted-foreground">
                {reel.description}
              </p>
            </div>

            {/* Scroll Indicator */}
            {index === 0 && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="text-foreground/60 text-sm font-comfortaa">Scroll down</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surprise1;
