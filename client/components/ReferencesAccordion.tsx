/**
 * ReferencesAccordion.tsx - PDF references accordion component
 * 
 * Yeh component saare PDF references ko ek accordion mein display karta hai.
 * Ye assistant message ke neeche show hota hai.
 * Isme collapsible list hoti hai jisme har PDF reference hota hai.
 */

// React import karta hai
import * as React from 'react';

// Icons aur components import karta hai
import ChevronIcon from './ChevronIcon';
import ReferenceItem from './ReferenceItem';

/**
 * Document interface - PDF document ka structure
 * Ye server se aata hai documents array mein
 */
interface doc {
    /** Page ka content - text jo us page par hai */
    pageContent?: string;
    /** Document metadata */
    metadata?: {
        /** Location info */
        loc?: {
            /** Page number - PDF ka konsa page */
            pageNumber?: number;
        };
        /** Source - PDF file ka path */
        source?: string;
    }
};

/**
 * Props interface for ReferencesAccordion
 */
interface ReferencesAccordionProps {
    /** 
     * documents: Array of PDF documents
     * Server se response mein docs naam se aata hai
     */
    documents: doc[];
}

/**
 * ReferencesAccordion Component
 * 
 * Saare PDF references ko collapsible accordion mein dikhata hai
 * 
 * @param props.documents - Array of PDF document objects
 * @returns JSX Element - Accordion with references
 * 
 * Logic:
 * 1. Check karta hai documents array exist karta hai aur khali nahi hai
 * 2. Agar documents nahi hain to null return karta hai (kuch nahi dikhata)
 * 3. Agar documents hain to accordion render karta hai
 */
const ReferencesAccordion: React.FC<ReferencesAccordionProps> = ({ documents }) => {
    // useState - accordion ki expansion state
    // By default open hota hai (true)
    const [isOpen, setIsOpen] = React.useState(true);

    // Guard clause - agar documents nahi hain to kuch return na kare
    if (!documents || documents.length === 0) return null;

    return (
        // Main container
        // mt-3: top margin
        // border-t: top border (message se separate karne ke liye)
        // pt-3: top padding
        <div className="mt-3 border-t border-gray-200 pt-3">
            {/* Accordion header - clickable to toggle */}
            <button
                // Toggle open/close state on click
                onClick={() => setIsOpen(!isOpen)}
                // flex container with gap
                // text-sm: small text
                // font-medium: medium bold
                // text-gray-700: dark gray color
                // hover:text-gray-900: hover par black
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
                {/* Chevron icon - rotation based on isOpen */}
                <ChevronIcon isOpen={isOpen} />
                
                {/* Title with count */}
                <span>References ({documents.length})</span>
            </button>
            
            {/* Content - tab dikhega jab isOpen true ho */}
            {isOpen && (
                // Container for all reference items
                // mt-2: top margin
                // space-y-2: vertical gap between items
                <div className="mt-2 space-y-2">
                    {/* Map through all documents */}
                    {documents.map((doc, index) => (
                        // Render each reference item
                        // Key ke liye index use karta hai
                        <ReferenceItem 
                            key={index} 
                            doc={doc} 
                            index={index} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReferencesAccordion;
