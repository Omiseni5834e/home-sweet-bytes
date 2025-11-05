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
    },
    {
      id: 6,
      videoSrc: "", // User will provide
      title: "Memory 6",
      description: "Our beautiful journey 🌈"
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
        description: "You've watched all our special memories together ❤️",
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
      <div className="absolute top-0 left-0 right-0 z-50 p-4 bg-gradient-to-b from-background/90 to-transparent">
        <div className="flex items-center justify-between mb-3">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 font-comfortaa text-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-background/80 backdrop-blur-sm"
            onClick={() => setMuted(!muted)}
          >
            {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="px-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-1 bg-background/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${(viewedReels.size / reels.length) * 100}%` }}
              />
            </div>
            <span className="font-comfortaa text-sm font-semibold text-foreground">
              {viewedReels.size}/{reels.length}
            </span>
          </div>
          {showCompletionMessage && (
            <p className="text-center font-patrick text-sm text-primary animate-fade-in">
              ✨ All memories watched! ✨
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

            {/* Instagram-style Actions */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 z-40">
              <button
                onClick={() => handleLike(index)}
                className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
              >
                <Heart 
                  className={`w-7 h-7 ${liked.has(index) ? 'fill-red-500 text-red-500' : 'text-white'}`}
                />
                <span className="text-xs font-semibold text-white">
                  {liked.has(index) ? '1' : ''}
                </span>
              </button>
              
              <button
                onClick={handleComment}
                className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
              >
                <MessageCircle className="w-7 h-7 text-white" />
              </button>
              
              <button
                onClick={handleShare}
                className="flex flex-col items-center gap-1 transition-transform hover:scale-110"
              >
                <Share2 className="w-7 h-7 text-white" />
              </button>
            </div>

            {/* Bottom Info and Menu */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <h2 className="font-comfortaa text-2xl font-bold text-white mb-1">
                    {reel.title}
                  </h2>
                  <p className="font-patrick text-lg text-white/90">
                    {reel.description}
                  </p>
                </div>
                
                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20 rounded-full"
                    >
                      <MoreVertical className="w-5 h-5" />
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
