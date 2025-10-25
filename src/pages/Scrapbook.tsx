import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ScrapbookCarousel } from "@/components/ScrapbookCarousel";

const Scrapbook = () => {
  return (
    <div className="min-h-screen p-6 md:p-9 animate-page-enter">
      <div className="max-w-[1400px] mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-6 font-comfortaa text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <header className="text-center mb-8 md:mb-12">
          <h1 className="font-comfortaa text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Monthly Record of Memories
          </h1>
          <p className="font-comfortaa text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Let's look at the moments and memories we created together each month 💕
          </p>
        </header>

        <ScrapbookCarousel />
      </div>
    </div>
  );
};

export default Scrapbook;
