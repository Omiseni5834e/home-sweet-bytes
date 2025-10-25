import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Puzzle = () => {
  return (
    <div className="min-h-screen p-9 animate-page-enter">
      <div className="max-w-[1200px] mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-6 font-comfortaa text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <header className="text-center mb-12">
          <h1 className="font-comfortaa text-4xl font-bold mb-4 text-foreground">
            Collage Puzzle Page
          </h1>
          <p className="font-patrick text-xl text-muted-foreground">
            Put the pieces together to reveal something special 🧩
          </p>
        </header>

        <div className="text-center py-20">
          <p className="font-comfortaa text-lg text-muted-foreground">
            Your puzzle will go here...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Puzzle;
