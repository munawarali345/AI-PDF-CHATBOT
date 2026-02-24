/**
 * ChatComponent.tsx - Main chat component
 * 
 * Yeh component puri chat interface ko manage karta hai.
 * Isme messages display hote hain, input field hai, aur loading state bhi hai.
 * Saare sub-components yahan import kiye gaye hain.
 */
'use client'
// React import karta hai
import * as React from 'react';

// UI components import karta hai
import { Input } from './ui/input';
import { Button } from "@/components/ui/button"

// Custom components import karta hai
import Avatar from './Avatar';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';

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
 * Message interface - Chat message ka structure
 */
interface Imessage {
    /** Role - 'user' ya 'assistant' */
    role: 'assistant' | 'user';
    /** Message content - text jo display karna hai */
    content?: string;
    /** Documents - PDF references (assistant ke liye) */
    documents?: doc[];
}

/**
 * ChatComponent - Main Functional Component
 * 
 * Yeh component puri chat functionality handle karta hai:
 * 1. User se message input leta hai
 * 2. Server ko request bhejta hai
 * 3. Loading state dikhata hai jab AI response de raha ho
 * 4. Messages ko display karta hai
 * 5. Auto-scroll karta hai latest message par
 */
const ChatComponent: React.FC = () => {
    // useState - message input ke liye
    // empty string se initialize hota hai
    const [message, setMessage] = React.useState<string>('');
    
    // useState - messages array ke liye
    // purani messages store karta hai/ histroy he messages ki 
    const [messages, setMessages] = React.useState<Imessage[]>([]);
    
    // useState - loading state ke liye
    // jab AI response aa raha hota hai tab true hota hai
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    
    // useRef - scroll ke liye
    // latest message par automatically scroll karne ke liye
    const messagesEndRef = React.useRef<HTMLDivElement>(null);

    /**
     * scrollToBottom - Function
     * Messages ke end mein scroll karta hai
     * Jab naya message aaye to use automatically show karta hai
     */
    const scrollToBottom = () => {
        // scrollIntoView - element ko viewport mein lane ke liye
        // behavior: 'smooth' - smooth animation ke saath
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    // useEffect - messages change hone par scroll karne ke liye
    // Jab messages array update hoti hai tab ye chalega
    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    /**
     * handleSendChatMessage - Async Function
     * User ka message send karta hai aur AI se response leta hai
     * 
     * Steps:
     * 1. Check karta hai message empty to nahi hai
     * 2. User message ko state mein add karta hai
     * 3. Loading state set karta hai (true)
     * 4. Server ko request bhejta hai
     * 5. Response ko state mein add karta hai
     * 6. Loading state reset karta hai (false)
     */
    const handleSendChatMessage = async () => {
        // Guard clause - agar message empty hai to kuch mat kar
        if (!message.trim()) return;
        
        // User ka message store karta hai
        const userMessage = message;
        
        // Input field clear karta hai
        setMessage('');

        // User message ko messages array mein add karta hai
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

        // Loading start karta hai
        setIsLoading(true);

        try {
            // Server se chat request karta hai
            // encodeURIComponent - special characters ke liye
            const res = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(userMessage)}`);
            
            // Response ko JSON mein convert karta hai
            const data = await res.json();

            // Assistant response ko messages mein add karta hai
            setMessages(prev => [...prev, {
                role: 'assistant', 
                content: data?.message,
                documents: data?.docs 
            }]);
        } catch (error) {
            // Error handling
            console.error('Chat error:', error);
            
            // Error message add karta hai
            setMessages(prev => [...prev, {
                role: 'assistant', 
                content: 'Sorry, something went wrong. Please try again.'
            }]);
        } finally {
            // Loading end karta hai - hamesha chalega
            setIsLoading(false);
        }
    };

    /**
     * handleKeyDown - Event Handler
     * Enter key press par message send karta hai
     * Shift+Enter naye line ke liye hai
     */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Check karta hai Enter key hai aur Shift nahi pressed
        if (e.key === 'Enter' && !e.shiftKey) {
            // Default behavior prevent karta hai (form submit etc)
            e.preventDefault();
            // Message send karta hai
            handleSendChatMessage();
        }
    };

    /**
     * Render - JSX Return
     * Purani chat interface ko render karta hai
     */
    return (
        <div className="flex flex-col h-full w-full bg-white rounded-none shadow-lg border border-gray-200 overflow-hidden">
            
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h1 className="text-white font-semibold text-lg">PDF Chat Assistant</h1>
                <p className="text-white/80 text-xs">Ask questions about your documents</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                
                {/* Welcome Screen - Jab koi message nahi hai */}
                {messages.length === 0 && !isLoading && (
                    // Center aligned container
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        {/* Large icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                fill="white" 
                                className="w-8 h-8"
                            >
                                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                            </svg>
                        </div>
                        {/* Heading */}
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Welcome to PDF Chat</h2>
                        {/* Description */}
                        <p className="text-gray-500 text-sm max-w-xs">
                            Upload a PDF document and ask questions about its content
                        </p>
                    </div>
                )}
                
                {/* Messages List */}
                {messages.map((msg, index) => (
                    // Har message ke liye MessageBubble component
                    <MessageBubble key={index} message={msg} />
                ))}
                
                {/* Loading Indicator - Jab loading ho */}
                {isLoading && (
                    <div className="flex gap-3 mb-4">
                        {/* Assistant avatar */}
                        <Avatar role="assistant" />
                        {/* Loading dots */}
                        <LoadingIndicator />
                    </div>
                )}
                
                {/* Scroll anchor - Reference point for auto-scroll */}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                {/* Flex container for input and button */}
                <div className="flex gap-3">
                    {/* Message Input */}
                    <Input 
                        // Value binding
                        value={message}
                        // OnChange handler
                        onChange={(e) => setMessage(e.target.value)}
                        // KeyDown handler for Enter
                        onKeyDown={handleKeyDown}
                        // Placeholder text
                        placeholder='Ask something about your PDF...'
                        // Full width
                        className="flex-1"
                    />
                    
                    {/* Send Button */}
                    <Button 
                        // Click handler
                        onClick={handleSendChatMessage}
                        // Disable when empty or loading
                        disabled={!message.trim() || isLoading}
                        // Blue background
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {/* Send icon */}
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            className="w-5 h-5"
                        >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </Button>
                </div>
            </div>
        </div>
    );
};

// Component export karta hai
export default ChatComponent;
