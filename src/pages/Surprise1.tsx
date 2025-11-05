import { Link } from "react-router-dom";
import { ArrowLeft, Volume2, VolumeX, Heart, MessageCircle, Share2, MoreVertical, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Surprise1 = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [muted, setMuted] = useState(false);
  const [viewedReels, setViewedReels] = useState<Set<number>>(new Set([0]));
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const reels = [
    {
      id: 1,
      videoSrc: "", // User will provide
      title: "Greeting 1",
      description: "A special hello from us! 👋"
    },
    {
      id: 2,
      videoSrc: "", // User will provide
      title: "Greeting 2",
      description: "Saying hi with love 💕"
    },
    {
      id: 3,
      videoSrc: "", // User will provide
      title: "Greeting 3",
      description: "Hello from our hearts 🌟"
    },
    {
      id: 4,
      videoSrc: "", // User will provide
      title: "Greeting 4",
      description: "A warm welcome 🎉"
    },
    {
      id: 5,
      videoSrc: "", // User will provide
      title: "Greeting 5",
      description: "Hi there! 💖"
    },
    {
      id: 6,
      videoSrc: "", // User will provide
      title: "Greeting 6",
      description: "Sending you greetings 🌈"
    },
    {
      id: 7,
      videoSrc: "", // User will provide
      title: "Greeting 7",
      description: "Hello from us 💫"
    },
    {
      id: 8,
      videoSrc: "", // User will provide
      title: "Greeting 8",
      description: "Final hello! 🎊"
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
        setViewedReels(prev => new Set(prev).add(index));
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

  useEffect(() => {
    if (viewedReels.size === reels.length && !showCompletionMessage) {
      setShowCompletionMessage(true);
      toast({
        title: "🎉 You're all done!",
        description: "You've watched all the greetings! ❤️",
        duration: 5000,
      });
    }
  }, [viewedReels, reels.length, showCompletionMessage, toast]);

  const handleLike = (index: number) => {
    setLiked(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(index)) {
        newLiked.delete(index);
      } else {
        newLiked.add(index);
      }
      return newLiked;
    });
  };

  const handleComment = () => {
    toast({
      title: "💬 Comments",
      description: "Share your thoughts about this memory!",
    });
  };

  const handleShare = () => {
    toast({
      title: "📤 Share",
      description: "Sharing this special moment!",
    });
  };

  const handleDownload = (index: number) => {
    const video = videoRefs.current[index];
    if (video && video.src) {
      const link = document.createElement('a');
      link.href = video.src;
      link.download = `memory-${index + 1}.mp4`;
      link.click();
      toast({
        title: "⬇️ Download started",
        description: "Your video is being downloaded!",
      });
    } else {
      toast({
        title: "No video available",
        description: "Please add a video first",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-background">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-b from-background/90 to-transparent safe-top">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <Link 
            to="/" 
            className="inline-flex items-center gap-1.5 sm:gap-2 font-comfortaa text-sm sm:text-base text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Back</span>
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm h-9 w-9 sm:h-10 sm:w-10"
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="px-1 sm:px-2">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
            <div className="flex-1 h-1 bg-background/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(viewedReels.size / reels.length) * 100}%` }}
              />
            </div>
            <span className="font-comfortaa text-xs sm:text-sm font-semibold text-foreground whitespace-nowrap">
              {viewedReels.size}/{reels.length}
            </span>
          </div>
          {showCompletionMessage && (
            <p className="text-center font-patrick text-xs sm:text-sm text-primary animate-fade-in">
              ✨ All greetings watched! ✨
            </p>
          )}
        </div>
      </div>

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
                <div className="text-center p-4 sm:p-8">
                  <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎥</div>
                  <p className="font-comfortaa text-xl sm:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                    Video {index + 1}
                  </p>
                  <p className="font-patrick text-base sm:text-lg text-muted-foreground">
                    Add your video here
                  </p>
                </div>
              </div>
            )}

            {/* Instagram-style Actions */}
            <div className="absolute right-2 sm:right-4 bottom-24 sm:bottom-32 flex flex-col gap-4 sm:gap-6 z-40">
              <button
                onClick={() => handleLike(index)}
                className="flex flex-col items-center gap-0.5 sm:gap-1 transition-transform active:scale-95 min-w-[44px] min-h-[44px] justify-center"
              >
                <Heart 
                  className={`w-7 h-7 sm:w-8 sm:h-8 ${liked.has(index) ? 'fill-red-500 text-red-500' : 'text-white drop-shadow-lg'}`}
                />
                <span className="text-xs font-semibold text-white drop-shadow-lg">
                  {liked.has(index) ? '1' : ''}
                </span>
              </button>
              
              <button
                onClick={handleComment}
                className="flex flex-col items-center gap-0.5 sm:gap-1 transition-transform active:scale-95 min-w-[44px] min-h-[44px] justify-center"
              >
                <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
              </button>
              
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-0.5 sm:gap-1 transition-transform active:scale-95 min-w-[44px] min-h-[44px] justify-center"
              >
                <Share2 className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
              </button>
            </div>

            {/* Bottom Info and Menu */}
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 pb-4 sm:pb-6 bg-gradient-to-t from-background/90 to-transparent safe-bottom">
              <div className="flex items-end justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h2 className="font-comfortaa text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1 drop-shadow-lg truncate">
                    {reel.title}
                  </h2>
                  <p className="font-patrick text-sm sm:text-lg text-white/90 drop-shadow-lg line-clamp-2">
                    {reel.description}
                  </p>
                </div>
                
                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0"
                    >
                      <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background/95 backdrop-blur-sm">
                    <DropdownMenuItem
                      onClick={() => handleDownload(index)}
                      className="gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      Download Video
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Scroll Indicator */}
            {index === 0 && (
              <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="text-white/60 text-xs sm:text-sm font-comfortaa drop-shadow-lg">Scroll down</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Surprise1;
