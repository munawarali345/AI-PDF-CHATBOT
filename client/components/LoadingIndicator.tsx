/**
 * LoadingIndicator.tsx - Loading animation component
 * 
 * Yeh component tab use hota hai jab assistant response bhej raha ho.
 * Teen dots ka animation dikhata hai jo indicate karta hai ke AI thinking mein hai.
 */

// React import karta hai
import * as React from 'react';

/**
 * LoadingIndicator Component
 * 
 * Yeh component ek animated loading spinner display karta hai
 * Jo chat interface mein assistant ke message ke jagah dikhega
 * jab tak AI response na aa jaye
 * 
 * @returns JSX Element - Loading animation with 3 dots
 * 
 * Working:
 * 1. Ek container div jo loading ko wrap karta hai
 * 2. Teen small dots jo animate honge
 * 3. Har dot ki alag animation timing hogi (delay) taake 
 *    wave/jumping effect ban sake
 * 4. Animation infinite chalega (loading state ke liye)
 */
const LoadingIndicator: React.FC = () => {
    return (
        // Flex container - items ko center mein lane ke liye
        // gap-2: dots ke beech 0.5rem (8px) ka gap
        <div className="flex gap-2 items-center justify-center py-4">
            {/* Dot 1 - Pehla dot */}
            <div 
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                style={{ animationDelay: '0ms' }}
            />
            
            {/* Dot 2 - Dusra dot */}
            <div 
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                style={{ animationDelay: '150ms' }}
            />
            
            {/* Dot 3 - Teesra dot */}
            <div 
                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" 
                style={{ animationDelay: '300ms' }}
            />
        </div>
    );
};

// Component export karta hai
export default LoadingIndicator;
