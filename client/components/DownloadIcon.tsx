/**
 * DownloadIcon.tsx - Download button icon component
 * 
 * Yeh component download button ke liye icon display karta hai.
 * PDF download karne ke liye use hota hai.
 */

// React import karta hai
import * as React from 'react';

/**
 * DownloadIcon Component
 * 
 * Download arrow icon jo PDF download ke liye button mein use hota hai
 * 
 * @returns JSX Element - Download arrow icon
 */
const DownloadIcon: React.FC = () => {
    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="w-4 h-4"
        >
            {/* Downward arrow - file download ko represent karta hai */}
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            
            {/* Downward diagonal lines - download motion */}
            <polyline points="7 10 12 15 17 10"/>
            
            {/* Vertical line from top to bottom */}
            <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
    );
};

export default DownloadIcon;
