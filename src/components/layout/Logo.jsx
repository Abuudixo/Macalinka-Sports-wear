import React from 'react';

const Logo = ({ className = "w-8 h-8", classNameText = "text-xl", showText = true }) => {
    return (
        <div className="flex items-center gap-3">
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={className}
            >
                {/* 
                   Geometric M Construction:
                   - Thick bold lines
                   - Central V drop
                   - Sharp edges
                */}
                <path
                    d="M10 20 L30 20 L50 50 L70 20 L90 20 V80 H70 V50 L50 80 L30 50 V80 H10 V20Z"
                    fill="currentColor"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
            {showText && (
                <div className="flex flex-col leading-none">
                    <span className={`font-black uppercase tracking-tighter ${classNameText} text-white`}>
                        Macaalinka
                    </span>
                    <span className="text-[0.6em] font-bold uppercase tracking-[0.2em] text-primary">
                        Sportswear
                    </span>
                </div>
            )}
        </div>
    );
};

export default Logo;
