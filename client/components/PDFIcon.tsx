/**
 * PDFIcon.tsx - PDF file icon component
 * 
 * Yeh component PDF files ke liye icon display karta hai.
 * Har reference ke sath PDF ka icon dikhane ke liye use hota hai.
 */

// React import karta hai
import * as React from 'react';

/**
 * PDFIcon Component
 * 
 * Red color ka PDF icon jo PDF files ko represent karta hai
 * 
 * @returns JSX Element - PDF file icon
 */
const PDFIcon: React.FC = () => {
    return (
        // SVG element
        // xmlns: XML namespace required for SVG
        // viewBox: coordinate system 0 0 24 24
        // fill: currentColor - parent se color inherit karega
        // text-red-500: red color (yeh parent div se set hoga)
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5 text-red-500"
        >
            {/* PDF file path - yeh icon ka shape banata hai */}
            {/* M9 3.5V19: Start point se vertical line
               H15 V3.5: Top horizontal line
               H9: Close path */}
            <path d="M9 3.5V19H15V3.5H9ZM14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2ZM13.5 9.5V13H10.5V9.5H13.5ZM13.5 15.5V17.5H10.5V15.5H13.5ZM17.5 16H15.5V18H17.5V16ZM17.5 13H15.5V15H17.5V13Z"/>
        </svg>
    );
};

export default PDFIcon;
