import React, { useState, useEffect } from 'react';

export const EMOJI_POOL = [
    'https://em-content.zobj.net/source/microsoft-teams/363/rocket_1f680.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/fire_1f525.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/party-popper_1f389.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/star_2b50.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/smiling-face-with-sunglasses_1f60e.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/musical-note_1f3b5.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/laptop_1f4bb.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/sparkles_2728.png',
];

// Preload images to prevent flickering/white gaps
const preloadImages = () => {
    if (typeof window !== 'undefined') {
        EMOJI_POOL.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }
};

preloadImages();

interface FloatingEmojiProps {
    className?: string; // For positioning
    initialDelay?: number;
    emoji?: string; // Controlled emoji URL
    onChange?: () => void; // Trigger for parent to change emoji
}

export const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ className = '', initialDelay = 0, emoji, onChange }) => {
    // Internal state for uncontrolled usage
    const [internalEmoji, setInternalEmoji] = useState(() => EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]);
    const [isChanging, setIsChanging] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    // Use passed emoji if available, otherwise internal state
    const currentEmoji = emoji || internalEmoji;

    // Random float animation duration between 3s and 6s
    const floatDuration = 3 + Math.random() * 3;

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isChanging) return;

        setIsChanging(true);

        // Switch emoji halfway through the pop animation
        setTimeout(() => {
            if (onChange) {
                onChange();
            } else {
                let newEmoji = internalEmoji;
                while (newEmoji === internalEmoji) {
                    newEmoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
                }
                setInternalEmoji(newEmoji);
            }
        }, 200);

        // Reset animation state
        setTimeout(() => {
            setIsChanging(false);
        }, 500);
    };

    return (
        <div
            className={`absolute cursor-pointer select-none z-20 ${className}`}
            onClick={handleClick}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
                animation: `float ${floatDuration}s ease-in-out infinite`,
                animationDelay: `${initialDelay}s`
            }}
        >
            <div
                className={`w-16 h-16 transition-all duration-300 ease-spring filter drop-shadow-xl ${isChanging
                    ? 'scale-0 rotate-180 opacity-0' // Changing state (Click): shrink & rotate
                    : isHovering
                        ? 'scale-125 -rotate-12' // Hover state: scale up & tilt
                        : 'scale-100 rotate-0 opacity-90' // Normal state
                    }`}
            >
                <img
                    src={currentEmoji}
                    alt="3D Emoji"
                    className="w-full h-full object-contain"
                    draggable={false}
                />
            </div>
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .ease-spring {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
        </div>
    );
};
