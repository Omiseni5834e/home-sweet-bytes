import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TourStep {
  route: string;
  title: string;
  message: string;
  targetSelector?: string;
  action?: "click" | "navigate";
}

const tourSteps: TourStep[] = [
  {
    route: "/",
    title: "Welcome Home! 🏠",
    message: "This is your home page where our journey begins. Let me show you around!",
  },
  {
    route: "/scrapbook",
    title: "Our Memories 💕",
    message: "Let's relive our memories together! Click through each month to see our beautiful moments.",
  },
  {
    route: "/",
    title: "Time for Fun! 🎮",
    message: "Now I have a fun game for you! Let's go to the puzzle page.",
  },
  {
    route: "/",
    title: "Click the Puzzle! 🧩",
    message: "Click on the puzzle card to start our special game together!",
    targetSelector: "[data-tour='puzzle-card']",
    action: "click",
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

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Tour Card */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <div className="bg-gradient-to-br from-card to-accent/20 rounded-2xl shadow-2xl p-6 border-2 border-primary/20">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="font-comfortaa text-2xl font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <div className="flex gap-1 mb-3">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? "w-8 bg-primary"
                        : index < currentStep
                        ? "w-4 bg-primary/60"
                        : "w-4 bg-muted"
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={skipTour}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Skip tour"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="font-patrick text-lg text-foreground/90 mb-6 leading-relaxed">
            {step.message}
          </p>

          <div className="flex gap-3">
            <Button
              onClick={skipTour}
              variant="outline"
              className="flex-1"
            >
              Skip Tour
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {step.action === "click" ? "Click It!" : currentStep === tourSteps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
