import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import guideMonkey from "@/assets/guide-monkey.jpg";

interface TourStep {
  route: string;
  message: string;
  targetSelector?: string;
  action?: "click" | "navigate";
  position?: "left" | "right" | "center";
}

const tourSteps: TourStep[] = [
  {
    route: "/",
    message: "Hi there! I'm Mimi, your guide! 🎉 Welcome to this special anniversary celebration. Let me show you all the amazing surprises waiting for you!",
    position: "center",
  },
  {
    route: "/",
    message: "See these colorful cards? Each one has a special surprise inside! Try clicking on the Scrapbook card to see your memories together! 💕",
    targetSelector: "[data-card='scrapbook']",
    position: "left",
  },
  {
    route: "/scrapbook",
    message: "Look at all these beautiful memories! Swipe through the months to relive your journey together. Each month has special photos! 📸",
    position: "center",
  },
  {
    route: "/",
    message: "Now let's try something fun! Click on the Puzzle card - it's a special game just for you! 🧩",
    targetSelector: "[data-card='puzzle']",
    action: "click",
    position: "left",
  },
  {
    route: "/",
    message: "That's all for now! Feel free to explore all the other surprises. Have a wonderful anniversary! 🎊",
    position: "center",
  },
];

export const GuidedTour = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const tourCompleted = localStorage.getItem("tourCompleted");
    if (!tourCompleted && location.pathname === "/") {
      setTimeout(() => {
        setIsActive(true);
        setIsVisible(true);
      }, 1000);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (isActive) {
      const step = tourSteps[currentStep];
      if (step.route !== location.pathname) {
        navigate(step.route);
      }

      if (step.targetSelector) {
        const element = document.querySelector(step.targetSelector);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          element.classList.add("tour-highlight");
        }
      }
    }

    return () => {
      const elements = document.querySelectorAll(".tour-highlight");
      elements.forEach((el) => el.classList.remove("tour-highlight"));
    };
  }, [currentStep, isActive, navigate, location.pathname]);

  const handleNext = () => {
    const step = tourSteps[currentStep];
    
    if (step.action === "click" && step.targetSelector) {
      const element = document.querySelector(step.targetSelector) as HTMLElement;
      if (element) {
        element.click();
        completeTour();
      }
    } else if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  const completeTour = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsActive(false);
      localStorage.setItem("tourCompleted", "true");
    }, 300);
  };

  const skipTour = () => {
    completeTour();
  };

  if (!isActive) return null;

  const step = tourSteps[currentStep];

  const getCharacterPosition = () => {
    const position = step.position || "center";
    if (position === "left") {
      return "left-4 sm:left-8";
    } else if (position === "right") {
      return "right-4 sm:right-8";
    }
    return "left-1/2 -translate-x-1/2";
  };

  const getChatBubblePosition = () => {
    const position = step.position || "center";
    if (position === "left") {
      return "left-20 sm:left-32";
    } else if (position === "right") {
      return "right-20 sm:right-32";
    }
    return "left-1/2 -translate-x-1/2";
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={skipTour}
      />

      {/* Character Guide */}
      <div
        className={`fixed bottom-4 ${getCharacterPosition()} z-50 transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-0 opacity-0 translate-y-10"
        }`}
      >
        <div className="relative animate-bounce">
          <img 
            src={guideMonkey} 
            alt="Mimi the Guide" 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-primary shadow-lg"
          />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-pulse" />
        </div>
      </div>

      {/* Chat Bubble */}
      <div
        className={`fixed bottom-24 ${getChatBubblePosition()} z-50 w-[85%] sm:w-[400px] max-w-md transform transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-5"
        }`}
      >
        <div className="bg-card rounded-3xl shadow-2xl p-4 sm:p-5 border-2 border-primary/30 relative">
          {/* Speech bubble tail */}
          <div className={`absolute -bottom-3 ${step.position === "right" ? "right-8" : "left-8"} w-6 h-6 bg-card border-r-2 border-b-2 border-primary/30 transform rotate-45`} />
          
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2">
              <span className="font-comfortaa text-sm font-bold text-primary">Mimi</span>
              <div className="flex gap-1">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? "w-6 bg-primary"
                        : index < currentStep
                        ? "w-3 bg-primary/60"
                        : "w-3 bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={skipTour}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1"
              aria-label="Skip tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="font-patrick text-base sm:text-lg text-foreground/90 mb-4 leading-relaxed">
            {step.message}
          </p>

          <div className="flex gap-2">
            <Button
              onClick={skipTour}
              variant="outline"
              size="sm"
              className="text-xs sm:text-sm"
            >
              Skip
            </Button>
            <Button
              onClick={handleNext}
              size="sm"
              className="flex-1 bg-primary hover:bg-primary/90 text-xs sm:text-sm"
            >
              {step.action === "click" ? "Got it! 👍" : currentStep === tourSteps.length - 1 ? "Thanks Mimi! 🎉" : "Next →"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
