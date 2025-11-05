import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Surprise2 = () => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-9 animate-page-enter">
      <div className="max-w-[1200px] mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 font-comfortaa text-sm sm:text-base text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Back to Home</span>
        </Link>
        
        <header className="text-center mb-8 sm:mb-12 px-2">
          <h1 className="font-comfortaa text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            Special Surprise 2
          </h1>
          <p className="font-patrick text-base sm:text-lg md:text-xl text-muted-foreground">
            Another wonderful surprise... 🎉
          </p>
        </header>

        <div className="text-center py-12 sm:py-20 px-4">
          <p className="font-comfortaa text-base sm:text-lg text-muted-foreground">
            Your surprise will go here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Surprise2;
