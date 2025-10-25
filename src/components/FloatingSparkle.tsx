interface FloatingSparkleProps {
  delay?: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export const FloatingSparkle = ({ 
  delay = 0, 
  top, 
  left, 
  right, 
  bottom 
}: FloatingSparkleProps) => {
  const style: React.CSSProperties = {
    animationDelay: `${delay}s`,
    top,
    left,
    right,
    bottom,
  };
  
  return (
    <div 
      className="fixed w-8 h-8 pointer-events-none z-50 animate-sparkle-float"
      style={style}
    >
      <span className="text-3xl">✨</span>
    </div>
  );
};
