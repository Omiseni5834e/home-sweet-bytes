import { Link } from "react-router-dom";
import { useState } from "react";

interface AnniversaryCardProps {
  title: string;
  href: string;
  variant?: "pink" | "blue" | "purple" | "green" | "orange" | "yellow";
  "data-tour"?: string;
}

const gradientMap = {
  pink: "from-[hsl(var(--gradient-pink-from))] to-[hsl(var(--gradient-pink-to))]",
  blue: "from-[hsl(var(--gradient-blue-from))] to-[hsl(var(--gradient-blue-to))]",
  purple: "from-[hsl(var(--gradient-purple-from))] to-[hsl(var(--gradient-purple-to))]",
  green: "from-[hsl(var(--gradient-green-from))] to-[hsl(var(--gradient-green-to))]",
  orange: "from-[hsl(var(--gradient-orange-from))] to-[hsl(var(--gradient-orange-to))]",
  yellow: "from-[hsl(var(--gradient-yellow-from))] to-[hsl(var(--gradient-yellow-to))]",
};

export const AnniversaryCard = ({ title, href, variant = "pink", "data-tour": dataTour }: AnniversaryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link to={href} data-tour={dataTour}>
      <div
        className={`
          w-[220px] h-[160px] 
          bg-gradient-to-b ${gradientMap[variant]}
          rounded-[20px] 
          flex items-center justify-center text-center
          p-3.5 cursor-pointer
          font-patrick text-lg
          text-[hsl(var(--text-dark))]
          relative overflow-hidden
          card-hover-lift
          group
        `}
        style={{
          boxShadow: "var(--shadow-strong)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Heart that appears on hover */}
        <div 
          className={`
            absolute w-10 h-10 
            transition-all duration-500 ease-out
            ${isHovered ? 'top-2.5 opacity-100 scale-100' : '-top-12 opacity-0 scale-50'}
          `}
          style={{
            left: 'calc(50% - 20px)',
          }}
        >
          <span className="text-4xl">💖</span>
        </div>
        
        <span className="relative z-10">{title}</span>
        
        {/* Arrow */}
        <span 
          className={`
            absolute right-3 bottom-3 
            font-bold text-xl
            transition-transform duration-300
            ${isHovered ? 'translate-x-1.5' : ''}
          `}
        >
          →
        </span>
      </div>
    </Link>
  );
};
