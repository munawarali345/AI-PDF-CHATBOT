'use client'
import * as React from 'react';
import { Upload } from 'lucide-react'

/**
 * FileUploads.tsx - PDF Upload Component
 * 
 * Yeh component PDF file upload karne ke liye use hota hai.
 * Chat component ke style ko match karne ke liye design kiya gaya hai.
 */

// ============================================
// FILE UPLOAD COMPONENT - MAIN EXPORT
// ============================================
const FileUpload: React.FC = () => {
    // useState - loading state ke liye
    const [isUploading, setIsUploading] = React.useState(false);
    /**
     * Upload handler - Loading state ke sath
     * Button click par call hota hai
     */
    const handleFileUploadButtonOnClick = async () => {
        setIsUploading(true);
        
    // STEP 1: Input element create karta hai
    const el = document.createElement('input')
    
    // STEP 2: Type set karta hai - file
    el.setAttribute('type', 'file');
    
    // STEP 3: Sirf PDF files accept karne ke liye
    el.setAttribute('accept', 'application/pdf');
    
    // STEP 4: File select hone par yeh chalay ga
    el.addEventListener('change', async (ev) => {
        // CHECK: Kya file select hui hai?
        if (el.files && el.files.length > 0) {
            // Pehli file get karta hai
            const file = el.files.item(0);
            
            // Agar file exist karti hai to proceed karo
            if (file) {
                // FILE TYPE VALIDATION
                // Sirf PDF allow hai
                if (file.type !== 'application/pdf') {
                    alert('Only PDF Files.');
                    return;
                }
                
                // FORM DATA CREATE
                // API call ke liye
                const formData = new FormData()
                formData.append('pdf', file);
                
                // API CALL - SERVER KO FILE BHEJNA
                try {
                    console.log('File uploading...');
                    
                    const response = await fetch('http://localhost:8000/upload/pdf', {
                        method: 'POST',
                        body: formData
                    });
                    
                    // Response check
                    if (!response.ok) {
                        throw new Error('Server ne error bheja: ' + response.statusText);
                    }
                    
                    const data = await response.json();
                    console.log('File successfully uploaded!', data);
                    alert('File successfully uploaded!');
                    
                } catch (error) {
                    console.error('problem in file upload:', error);
                    alert('problem in file upload. try again.');
                } finally {
                    // Loading state reset karna - hamesha chalega
                    setIsUploading(false);
                }
            }
        }
    })
    
    // STEP 5: Input ko click karwa deta hai (file dialog open hoti hai)
    el.click();
};

    return (
        <div className="flex flex-col h-full w-full bg-white rounded-none shadow-lg border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
                <h1 className="text-white font-semibold text-lg">Upload PDF</h1>
                <p className="text-white/80 text-xs">Upload your document to chat</p>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                {/* Upload Card */}
                <div 
                    onClick={handleFileUploadButtonOnClick}
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-colors w-full max-w-sm"
                >
                    {/* Icon Container */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                        {isUploading ? (
                            <Upload className="w-8 h-8 text-white animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8 text-white" />
                        )}
                    </div>
                    
                    {/* Text */}
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                        {isUploading ? 'Uploading...' : 'Upload PDF'}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-gray-500 text-sm text-center">
                        {isUploading ? 'Please wait...' : 'Click to select a PDF file'}
                    </p>
                    
                    {/* File type hint */}
                    <p className="text-gray-400 text-xs mt-2 text-center">
                        Only .pdf files are supported
                    </p>
                </div>
                
                {/* Info Text */}
                <p className="mt-8 text-sm text-gray-500 text-center max-w-xs">
                    Upload a PDF document and then ask questions about its content in the chat.
                </p>
            </div>
        </div>
    );
};

export default FileUpload;
