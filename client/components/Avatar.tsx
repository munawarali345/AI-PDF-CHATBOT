/**
 * Avatar.tsx - User aur Assistant ke liye avatar component
 * 
 * Yeh component chat mein user aur assistant ke icons display karta hai.
 * User ke liye gray color aur assistant ke liye purple-blue gradient use hota hai.
 */

// React import karta hai
import * as React from 'react';

// Props ka interface - component ko role (user ya assistant) chahiye hota hai
interface AvatarProps {
    /** 
     * role: Chat mein message ka role - 'user' ya 'assistant'
     * Agar user hai to gray avatar dikhega, agar assistant hai to gradient avatar dikhega
     */
    role: 'assistant' | 'user';
}

/**
 * AI Icon - Assistant ke liye SVG icon
 * Ye bot/AI ko represent karta hai
 */
const AIIcon = () => (
    <svg 
        // XML namespace - SVG ke liye required
        xmlns="http://www.w3.org/2000/svg" 
        // Viewbox defines the coordinate system - 24x24 grid
        viewBox="0 0 24 24" 
        // Icon ka color white
        fill="white" 
        // Size classes - Tailwind CSS
        className="w-5 h-5"
    >
        {/* Bot icon path - AI/Bot ko represent karta hai */}
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>
);

/**
 * User Icon - User ke liye SVG icon
 * Ye human/user ko represent karta hai
 */
const UserIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="white" 
        className="w-5 h-5"
    >
        {/* User/Person icon path */}
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
);

/**
 * Avatar Component - Main export
 * 
 * Yeh component user ya assistant ke avatar ko render karta hai
 * 
 * @param props.role - Message ka role ('user' ya 'assistant')
 * @returns JSX Element - Avatar div with icon
 * 
 * Logic:
 * 1. Check karta hai role 'assistant' hai ya 'user'
 * 2. Agar assistant hai to purple-blue gradient avatar dikhata hai
 * 3. Agar user hai to gray color ka avatar dikhata hai
 */
const Avatar: React.FC<AvatarProps> = ({ role }) => {
    // Agar role 'assistant' hai to yeh block chalega
    if (role === 'assistant') {
        return (
            // Div with gradient background
            // w-8: width 8 (32px)
            // h-8: height 8 (32px)  
            // rounded-full: poore corner round honge
            // bg-gradient-to-br: gradient bottom-right se shuru hogi
            // from-purple-600 to-blue-600: purple se blue tak gradient
            // flex items-center justify-center: center mein align karega
            // flex-shrink-0: container shrink na hoga
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center flex-shrink-0">
                {/* AI Icon Component */}
                <AIIcon />
            </div>
        );
    }
    
    // User ke liye gray avatar
    // bg-gray-600: dark gray background
    return (
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
            {/* User Icon Component */}
            <UserIcon />
        </div>
    );
};

// Component ko export karta hai taake baar pan component import kar sakein
export default Avatar;
