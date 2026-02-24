/**
 * ReferenceItem.tsx - Single PDF reference item component
 * 
 * Yeh component ek single PDF reference ko display karta hai.
 * Isme PDF ka naam, page number, aur download button hota hai.
 * Click karne par yeh expand hota hai aur content dikhata hai.
 */

// React import karta hai
import * as React from 'react';

// Icons import karta hai
import PDFIcon from './PDFIcon';
import DownloadIcon from './DownloadIcon';
import ChevronIcon from './ChevronIcon';

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
 * Props interface for ReferenceItem
 */
interface ReferenceItemProps {
    /** 
     * doc: PDF document ka object
     * Isme pageContent aur metadata hota hai
     */
    doc: doc;
    /** Unique index for key prop */
    index: number;
}

/**
 * ReferenceItem Component
 * 
 * Ek single PDF reference ko display karta hai
 * Click karne par expand hota hai aur content dikhata hai
 * 
 * @param props.doc - PDF document ka data
 * @param props.index - Array mein index
 * @returns JSX Element - Expandable reference card
 */
const ReferenceItem: React.FC<ReferenceItemProps> = ({ doc, index }) => {
    // useState - expansion state track karne ke liye
    // isExpanded: boolean - kya item expanded hai ya nahi
    const [isExpanded, setIsExpanded] = React.useState(false);
    
    // Source path extract karta hai - metadata se
    // Agar source nahi milta to 'Unknown PDF' show karega
    const source = doc.metadata?.source || 'Unknown PDF';
    
    // Page number extract karta hai
    // Agar page number nahi milta to 'N/A' show karega
    const pageNumber = doc.metadata?.loc?.pageNumber || 'N/A';
    
    // Filename extract karta hai from path
    // Path se last part nikalta hai (after last / or \)
    const fileName = source.split('/').pop() || source.split('\\').pop() || 'document.pdf';

    // Download URL - proper URL construct karta hai
    // Server static file serving ke liye
    const downloadUrl = source.startsWith('http') ? source : `http://localhost:8000/${source}`;

    return (
        // Main container
        // border: gray border
        // rounded-lg: rounded corners
        // overflow-hidden: content bounded rahega
        // mb-2: bottom margin
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-2">
            {/* Header button - clickable */}
            <button
                // Toggle expansion state on click
                onClick={() => setIsExpanded(!isExpanded)}
                // Full width button
                // flex items-center justify-between: icon left, arrow right
                // p-3: padding
                // bg-gray-50: light gray background
                // hover:bg-gray-100: hover par thoda dark
                // transition-colors: smooth color change
                className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                {/* Left side - PDF icon aur text */}
                <div className="flex items-center gap-3">
                    {/* PDF Icon Component */}
                    <PDFIcon />
                    
                    {/* Text info */}
                    <div className="text-left">
                        {/* Filename - truncate if too long */}
                        <p className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                            {fileName}
                        </p>
                        {/* Page number */}
                        <p className="text-xs text-gray-500">Page {pageNumber}</p>
                    </div>
                </div>
                
                {/* Right side - Chevron arrow */}
                <ChevronIcon isOpen={isExpanded} />
            </button>
            
            {/* Expanded content - tab dikhega jab isExpanded true ho */}
            {isExpanded && (
                // Content container
                // p-3: padding
                // bg-white: white background
                // border-t: top border
                <div className="p-3 bg-white border-t border-gray-100">
                    {/* Page content preview - line clamp for truncation */}
                    <p className="text-xs text-gray-600 mb-3 line-clamp-4">
                        {doc.pageContent}
                    </p>
                    
                    {/* Download button */}
                    <a
                        // Download URL - server se files serve hona chahiye
                        href={downloadUrl}
                        // download attribute - browser download karega
                        download
                        // Button styling
                        // inline-flex: button aur icon ek line mein
                        // gap-2: spacing between icon aur text
                        // px-3 py-1.5: padding
                        // bg-blue-600: blue background
                        // text-white: white text
                        // text-xs: small text
                        // rounded-md: rounded corners
                        // hover:bg-blue-700: hover effect
                        // transition-colors: smooth transition
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {/* Download Icon */}
                        <DownloadIcon />
                        {/* Button text */}
                        Download PDF
                    </a>
                </div>
            )}
        </div>
    );
};

export default ReferenceItem;
