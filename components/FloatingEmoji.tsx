import React, { useState } from 'react';

const EMOJI_POOL = [
    'https://em-content.zobj.net/source/microsoft-teams/363/rocket_1f680.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/fire_1f525.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/party-popper_1f389.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/star_2b50.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/smiling-face-with-sunglasses_1f60e.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/musical-note_1f3b5.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/laptop_1f4bb.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/sparkles_2728.png',
    'https://em-content.zobj.net/source/microsoft-teams/363/victory-hand_270c.png',
];

interface FloatingEmojiProps {
    className?: string; // For positioning
    initialDelay?: number;
}

export const FloatingEmoji: React.FC<FloatingEmojiProps> = ({ className = '', initialDelay = 0 }) => {
    const [currentEmoji, setCurrentEmoji] = useState(() => EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]);
    const [isAnimating, setIsAnimating] = useState(false);

    // Random float animation duration between 3s and 6s
    const floatDuration = 3 + Math.random() * 3;

    const handleClick = () => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Switch emoji halfway through the pop animation
        setTimeout(() => {
            let newEmoji = currentEmoji;
            while (newEmoji === currentEmoji) {
                newEmoji = EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
            }
            setCurrentEmoji(newEmoji);
        }, 200);

        // Reset animation state
        setTimeout(() => {
            setIsAnimating(false);
        }, 600);
    };

    return (
        <div
            className={`absolute cursor-pointer transition-transform select-none z-20 ${className}`}
            onMouseEnter={handleClick}
            onClick={handleClick}
            style={{
                animation: `float ${floatDuration}s ease-in-out infinite`,
                animationDelay: `${initialDelay}s`
            }}
        >
            <div
                className={`w-16 h-16 transition-all duration-500 ease-spring ${isAnimating ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100 opacity-90 hover:opacity-100 hover:scale-110'
                    }`}
            >
                <img
                    src={currentEmoji}
                    alt="3D Emoji"
                    className="w-full h-full object-contain filter drop-shadow-xl"
                    draggable={false}
                />
            </div>
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        .ease-spring {
          transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
        </div>
    );
};
