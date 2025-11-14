import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ScrapbookCarousel } from "@/components/ScrapbookCarousel";

const Scrapbook = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 animate-page-enter">
      <div className="max-w-[1400px] mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-4 font-comfortaa text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <header className="text-center mb-6 md:mb-8">
          <h1 className="font-comfortaa text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Monthly Record of Memories
          </h1>
          <p className="font-comfortaa text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Let's look at the moments and memories we created together each month 💕
          </p>
        </header>

        <ScrapbookCarousel />
      </div>
    </div>
  );
};

export default Scrapbook;
