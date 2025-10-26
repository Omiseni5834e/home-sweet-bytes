import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import puzzleImage from "@/assets/puzzle-image.jpg";

const ROWS = 4;
const COLS = 6;
const TOTAL_PIECES = ROWS * COLS;

interface PuzzleState {
  placed: boolean[];
  completed: boolean;
  showCamera: boolean;
  showPhoto: boolean;
  photoPlaced: boolean;
}

const Puzzle = () => {
  const [state, setState] = useState<PuzzleState>({
    placed: Array(TOTAL_PIECES).fill(false),
    completed: false,
    showCamera: false,
    showPhoto: false,
    photoPlaced: false,
  });
  const puzzleRef = useRef<HTMLDivElement>(null);

  const placePiece = (index: number) => {
    if (state.placed[index] || state.completed) return;
    
    const newPlaced = [...state.placed];
    newPlaced[index] = true;
    
    // Check if puzzle is complete (all except last piece)
    const placedCount = newPlaced.filter(p => p).length;
    const isComplete = placedCount === TOTAL_PIECES - 1;
    
    setState(prev => ({
      ...prev,
      placed: newPlaced,
      completed: isComplete,
    }));

    if (isComplete) {
      // Show camera animation
      setTimeout(() => {
        setState(prev => ({ ...prev, showCamera: true }));
      }, 1000);
      
      // Photo comes out
      setTimeout(() => {
        setState(prev => ({ ...prev, showPhoto: true }));
      }, 3000);
      
      // Photo goes to last slot
      setTimeout(() => {
        setState(prev => ({ ...prev, photoPlaced: true }));
        const newPlaced = [...state.placed];
        newPlaced[TOTAL_PIECES - 1] = true;
        setState(prev => ({ ...prev, placed: newPlaced }));
      }, 4500);
    }
  };

  const downloadPuzzle = () => {
    if (puzzleRef.current) {
      import('html2canvas').then((html2canvas) => {
        html2canvas.default(puzzleRef.current!).then((canvas) => {
          const link = document.createElement('a');
          link.download = 'our-puzzle-complete.png';
          link.href = canvas.toDataURL();
          link.click();
        });
      });
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-9 animate-page-enter relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 mb-6 font-comfortaa text-secondary hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
        
        <header className="text-center mb-8">
          <h1 className="font-comfortaa text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Collage Puzzle Page
          </h1>
          <p className="font-patrick text-lg md:text-xl text-muted-foreground">
            Click the pieces to complete the puzzle 🧩
          </p>
        </header>

        <div className="flex justify-center items-center relative">
          <div 
            ref={puzzleRef}
            className="relative inline-grid gap-1 bg-muted/30 p-4 rounded-2xl shadow-lg"
            style={{
              gridTemplateColumns: `repeat(${COLS}, 1fr)`,
              gridTemplateRows: `repeat(${ROWS}, 1fr)`,
            }}
          >
            {Array.from({ length: TOTAL_PIECES }).map((_, index) => {
              const row = Math.floor(index / COLS);
              const col = index % COLS;
              const isLastPiece = index === TOTAL_PIECES - 1;
              
              return (
                <div
                  key={index}
                  onClick={() => placePiece(index)}
                  className={`
                    relative w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden
                    ${state.placed[index] ? 'opacity-100' : 'opacity-20 cursor-pointer hover:opacity-40'}
                    ${isLastPiece && state.showPhoto && !state.placed[index] ? 'animate-[float_2s_ease-in-out_infinite]' : ''}
                    transition-all duration-500
                  `}
                  style={{
                    backgroundImage: state.placed[index] ? `url(${puzzleImage})` : 'none',
                    backgroundPosition: `-${col * (100 / (COLS - 1))}% -${row * (100 / (ROWS - 1))}%`,
                    backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                    backgroundColor: state.placed[index] ? 'transparent' : 'rgba(0,0,0,0.1)',
                    border: '2px solid rgba(255,255,255,0.3)',
                    boxShadow: state.placed[index] ? '0 2px 8px rgba(0,0,0,0.1)' : 'inset 0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  {!state.placed[index] && (
                    <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-xs font-comfortaa">
                      {index + 1}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Camera animation */}
        {state.showCamera && (
          <div className="fixed inset-0 pointer-events-none z-40 flex items-center justify-center">
            <div className="animate-[cameraFloat_2s_ease-in-out]">
              <div className="relative">
                {/* Camera body */}
                <div className="w-32 h-24 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg shadow-2xl border-4 border-gray-700">
                  {/* Lens */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full border-4 border-gray-500 flex items-center justify-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full animate-pulse" />
                  </div>
                  {/* Flash */}
                  <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-300 rounded-sm animate-[flash_0.5s_ease-in-out_2]" />
                </div>
                
                {/* Polaroid photo coming out */}
                {state.showPhoto && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 animate-[photoSlide_1.5s_ease-out]">
                    <div className="bg-white p-3 pb-8 rounded-lg shadow-xl w-28">
                      <div className="bg-gradient-to-br from-pink-100 to-purple-100 aspect-square rounded" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Final message overlay */}
        {state.completed && state.photoPlaced && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="text-center space-y-8 px-6">
              <h2 className="font-comfortaa text-3xl md:text-5xl font-bold text-white animate-scale-in drop-shadow-lg">
                You always are the last piece<br />of my every puzzle
              </h2>
              
              <button
                onClick={downloadPuzzle}
                className="px-6 py-3 bg-white text-primary font-comfortaa font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                Download Our Puzzle 💝
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Puzzle;
