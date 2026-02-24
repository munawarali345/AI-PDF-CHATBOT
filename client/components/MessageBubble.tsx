/**
 * MessageBubble.tsx - Chat message bubble component
 * 
 * Yeh component chat messages ko display karta hai.
 * User ke messages right side par aur assistant ke left side par dikhte hain.
 * Assistant ke messages ke neeche references bhi show hote hain.
 */

// React import karta hai
import * as React from 'react';

// Components import karta hai
import Avatar from './Avatar';
import ReferencesAccordion from './ReferencesAccordion';

/**
 * Document interface - PDF document ka structure
 * Ye server se aata hai documents array mein
 */
interface doc {
    pageContent?: string;
    metadata?: {
        loc?: {
            pageNumber?: number;
        };
        source?: string;
    }
};

/**
 * Message interface - Chat message ka structure
 */
interface Imessage {
    role: 'assistant' | 'user';
    content?: string;
    documents?: doc[];
}

/**
 * Props interface for MessageBubble
 */
interface MessageBubbleProps {
    message: Imessage;
}

/**
 * MessageBubble Component
 * Ek single chat message ko display karta hai
 * User aur assistant ke liye alag styling hoti hai
 */
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    // Check karta hai message user ka hai ya assistant
    const isUser = message.role === 'user';
    
    return (
        // Main container - flex with gap
        // Agar user hai to row reverse (right side)
        <div className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : ''}`}>
            {/* Avatar Component */}
            <Avatar role={message.role} />
            
            {/* Message content container */}
            <div className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}>
                {/* Message bubble */}
                <div 
                    className={`p-4 rounded-2xl ${
                        isUser 
                            ? 'bg-blue-600 text-white rounded-tr-md'  
                            : 'bg-gray-100 text-gray-900 rounded-tl-md' 
                    }`}
                >
                    {/* Message text */}
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">
                        {message.content}
                    </p>
                </div>
                
                {/* References - sirf assistant ke liye aur agar documents hain */}
                {!isUser && message.documents && message.documents.length > 0 && (
                    <ReferencesAccordion documents={message.documents} />
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
