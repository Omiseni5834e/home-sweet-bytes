import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, Star } from "lucide-react";

const Poem = () => {
  return (
    <div className="min-h-screen p-6 md:p-9 animate-page-enter relative overflow-hidden">
      {/* Cute floating decorations */}
      <div className="fixed top-20 left-10 animate-[float_3s_ease-in-out_infinite] opacity-60">
        <Heart className="w-12 h-12 text-primary fill-primary" />
      </div>
      <div className="fixed top-40 right-20 animate-[float_4s_ease-in-out_infinite] opacity-50" style={{ animationDelay: '0.5s' }}>
        <Sparkles className="w-10 h-10 text-accent" />
      </div>
      <div className="fixed bottom-32 left-20 animate-[float_3.5s_ease-in-out_infinite] opacity-50" style={{ animationDelay: '1s' }}>
        <Star className="w-8 h-8 text-primary fill-primary" />
      </div>
      <div className="fixed bottom-40 right-16 animate-[float_4.5s_ease-in-out_infinite] opacity-60" style={{ animationDelay: '1.5s' }}>
        <Heart className="w-10 h-10 text-accent fill-accent" />
      </div>
      
      {/* Cute characters - Hello Kitty style bows */}
      <div className="fixed top-12 right-12 text-6xl animate-[float_3s_ease-in-out_infinite]" style={{ animationDelay: '0.3s' }}>
        🎀
      </div>
      <div className="fixed bottom-20 left-12 text-5xl animate-[float_3.5s_ease-in-out_infinite]" style={{ animationDelay: '1.2s' }}>
        🎀
      </div>
      <div className="fixed top-1/2 left-8 text-4xl animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: '2s' }}>
        ✨
      </div>
      <div className="fixed top-1/3 right-10 text-4xl animate-[float_3.8s_ease-in-out_infinite]" style={{ animationDelay: '0.8s' }}>
        💝
      </div>

      <div className="max-w-[900px] mx-auto relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 font-comfortaa text-sm sm:text-base text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline">Back to Home</span>
        </Link>
        
        <header className="text-center mb-6 sm:mb-8 px-2">
          <h1 className="font-comfortaa text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
            A Love Letter 💌
          </h1>
          <p className="font-patrick text-base sm:text-lg md:text-xl text-muted-foreground">
            Words from my heart to yours
          </p>
        </header>

        {/* Letter paper */}
        <div className="relative mx-auto max-w-[700px] px-2">
          {/* Paper with cute styling */}
          <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl sm:rounded-3xl shadow-[var(--shadow-strong)] p-5 sm:p-8 md:p-12 border-2 sm:border-4 border-pink-100 relative">
            {/* Cute corner decorations */}
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-xl sm:text-3xl">🌸</div>
            <div className="absolute top-2 sm:top-4 right-2 sm:right-4 text-xl sm:text-3xl">🌸</div>
            <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 text-xl sm:text-3xl">💕</div>
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 text-xl sm:text-3xl">💕</div>
            
            {/* Poem content - EDIT THIS SECTION LOCALLY */}
            <div className="poem-content font-patrick text-base sm:text-lg md:text-xl leading-relaxed text-foreground space-y-4 sm:space-y-6">
              <p className="text-center font-bold text-xl sm:text-2xl mb-4 sm:mb-6 text-primary">
                To My Dearest Love
              </p>
              
              <p>
                In every moment, in every breath,<br />
                You're the melody that fills my chest.<br />
                Like puzzle pieces finding their place,<br />
                You complete my world with gentle grace.
              </p>
              
              <p>
                Through seasons changing, through sun and rain,<br />
                Your laughter soothes away my pain.<br />
                In your eyes I see my home,<br />
                With you, I'll never be alone.
              </p>
              
              <p>
                Every memory we create together,<br />
                Is a treasure I'll hold forever.<br />
                From small moments to grand adventures too,<br />
                My heart will always belong to you.
              </p>
              
              <p className="text-center mt-6 sm:mt-8 font-bold text-lg sm:text-xl">
                Forever yours,<br />
                With all my love 💝
              </p>
            </div>
          </div>
          
          {/* Washi tape effect on corners */}
          <div className="hidden sm:block absolute -top-3 left-12 w-24 h-6 bg-pink-200/80 -rotate-12 rounded-sm shadow-md border-t-2 border-pink-300" />
          <div className="hidden sm:block absolute -top-3 right-12 w-24 h-6 bg-purple-200/80 rotate-12 rounded-sm shadow-md border-t-2 border-purple-300" />
        </div>
      </div>
      
      {/* CSS for poem styling */}
      <style>{`
        .poem-content p {
          text-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        
        /* Make it easy to edit - clear structure */
        .poem-content {
          /* 
            TO EDIT THE POEM:
            1. Find the poem-content div above
            2. Edit the text inside each <p> tag
            3. Add more <p> tags for more stanzas
            4. Use <br /> for line breaks within a stanza
          */
        }
      `}</style>
    </div>
  );
};

export default Poem;
