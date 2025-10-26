import { AnniversaryCard } from "@/components/AnniversaryCard";
import { FloatingSparkle } from "@/components/FloatingSparkle";

const Index = () => {
  return (
    <>
      {/* Floating sparkles */}
      <FloatingSparkle delay={0} top="30px" left="50px" />
      <FloatingSparkle delay={1} top="120px" right="80px" />
      <FloatingSparkle delay={2} bottom="60px" left="200px" />
      
      <div className="min-h-screen p-9 animate-page-enter">
        <div className="max-w-[1200px] mx-auto">
          <header className="text-center mb-6">
            <h1 className="font-comfortaa text-[32px] font-bold mb-1 text-foreground">
              Our Anniversary Celebration
            </h1>
            <p className="font-comfortaa text-base text-muted-foreground m-0">
              Click on a card to enter each surprise page 💖
            </p>
          </header>

          <section className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-7 p-4.5 justify-items-center">
            <AnniversaryCard 
              title="Scrapbook — Our Memories" 
              href="/scrapbook" 
              variant="pink"
            />
            <AnniversaryCard 
              title="Collage Puzzle Page" 
              href="/puzzle" 
              variant="blue"
              data-tour="puzzle-card"
            />
            <AnniversaryCard 
              title="Final Video" 
              href="/video" 
              variant="purple"
            />
            <AnniversaryCard 
              title="Unlock Poem" 
              href="/poem" 
              variant="green"
            />
            <AnniversaryCard 
              title="Special Surprise 1" 
              href="/surprise1" 
              variant="orange"
            />
            <AnniversaryCard 
              title="Special Surprise 2" 
              href="/surprise2" 
              variant="yellow"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default Index;
