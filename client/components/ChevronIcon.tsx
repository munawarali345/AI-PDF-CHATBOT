/**
 * ChevronIcon.tsx - Arrow/Dropdown icon component
 * 
 * Yeh component accordion ke liye arrow icon display karta hai.
 * Arrow up/down hota hai based on isOpen prop ke basis par.
 */

// React import karta hai
import * as React from 'react';

/**
 * Props interface for ChevronIcon
 */
interface ChevronIconProps {
    /** 
     * isOpen: Boolean jo batata hai ke accordion open hai ya closed
     * Agar true hai to arrow up dikhega
     * Agar false hai to arrow down dikhega
     */
    isOpen: boolean;
}

/**
 * ChevronIcon Component
 * 
 * Arrow icon jo rotate hota hai jab accordion open/close hota hai
 * 
 * @param props.isOpen - Accordion ki current state
 * @returns JSX Element - Rotatable arrow icon
 */
const ChevronIcon: React.FC<ChevronIconProps> = ({ isOpen }) => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            // Conditional class - agar open hai to rotate-180
            // transition-transform: smooth rotation ke liye
            // duration-200: 200ms animation time
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
            {/* Chevron arrow path - neeche ki taraf arrow */}
            <polyline points="6 9 12 15 18 9"/>
        </svg>
    );
};

export default ChevronIcon;
