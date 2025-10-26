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
  showFinal: boolean;
  capturedImage: string | null;
}

const Puzzle = () => {
  const [state, setState] = useState<PuzzleState>({
    placed: Array(TOTAL_PIECES).fill(false),
    completed: false,
    showFinal: false,
    capturedImage: null,
  });
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const placePiece = (index: number) => {
    if (state.placed[index] || state.completed) return;
    
    const newPlaced = [...state.placed];
    newPlaced[index] = true;
    
    // Check if puzzle is complete (all except last piece)
    const placedCount = newPlaced.filter(p => p).length;
    const isComplete = placedCount === TOTAL_PIECES - 1;
    
    setState({
      ...state,
      placed: newPlaced,
      completed: isComplete,
    });

    if (isComplete) {
      setTimeout(() => startCamera(), 1000);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setTimeout(() => capturePhoto(stream), 2000);
      }
    } catch (err) {
      console.error("Camera error:", err);
      // Continue without camera
      setTimeout(() => completeWithoutCamera(), 1000);
    }
  };

  const capturePhoto = (stream: MediaStream) => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/png');
        
        setState(prev => ({
          ...prev,
          capturedImage: imageData,
          showFinal: true,
        }));
        
        // Stop camera
        stream.getTracks().forEach(track => track.stop());
        
        // Place final piece
        setTimeout(() => {
          setState(prev => {
            const newPlaced = [...prev.placed];
            newPlaced[TOTAL_PIECES - 1] = true;
            return { ...prev, placed: newPlaced };
          });
        }, 1500);
      }
    }
  };

  const completeWithoutCamera = () => {
    setState(prev => ({
      ...prev,
      showFinal: true,
    }));
    
    setTimeout(() => {
      setState(prev => {
        const newPlaced = [...prev.placed];
        newPlaced[TOTAL_PIECES - 1] = true;
        return { ...prev, placed: newPlaced };
      });
    }, 1500);
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

        <div className="flex justify-center items-center">
          <div 
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
                    ${isLastPiece && state.showFinal && !state.placed[index] ? 'animate-[float_2s_ease-in-out_infinite]' : ''}
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

        {/* Final message overlay */}
        {state.completed && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <div className="text-center space-y-8 px-6">
              <h2 className="font-comfortaa text-3xl md:text-5xl font-bold text-white animate-scale-in drop-shadow-lg">
                You always are the last piece<br />of my every puzzle
              </h2>
              
              {/* Polaroid camera effect */}
              {state.showFinal && (
                <div className="animate-[slideUp_1s_ease-out] mx-auto">
                  <div className="bg-white p-4 pb-12 rounded-lg shadow-2xl max-w-sm mx-auto transform hover:rotate-2 transition-transform">
                    <div className="bg-gray-200 aspect-square rounded overflow-hidden">
                      {state.capturedImage ? (
                        <img 
                          src={state.capturedImage} 
                          alt="Captured" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video 
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                        />
                      )}
                    </div>
                    <p className="font-patrick text-xl text-gray-700 mt-4 text-center">
                      The missing piece 💝
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default Puzzle;
