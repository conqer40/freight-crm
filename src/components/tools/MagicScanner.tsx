'use client';

import { useState } from 'react';
import { UploadCloud, FileText, CheckCircle2, Sparkles, Loader2 } from 'lucide-react';

interface MagicScannerProps {
    onScanComplete: (data: any) => void;
}

export default function MagicScanner({ onScanComplete }: MagicScannerProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [isScanning, setIsScanning] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            startScan(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            startScan(e.target.files[0]);
        }
    };

    const startScan = (file: File) => {
        setIsScanning(true);

        // Simulation of AI Processing
        setTimeout(() => {
            setIsScanning(false);
            setCompleted(true);

            // Mocked Extracted Data
            const mockData = {
                title: file.name.replace('.pdf', '') + ' (AI Scanner)',
                pol: 'Shanghai, China',
                pod: 'Sokhna, Egypt',
                commodity: 'Electronics & Computer Parts',
                weight: '15400',
                type: 'FCL',
                containerCount: '2'
            };

            onScanComplete(mockData);

            // Reset after a while
            setTimeout(() => setCompleted(false), 3000);
        }, 2500);
    };

    return (
        <div
            className={`
                relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-8 text-center cursor-pointer group
                ${isDragging ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/50'}
                ${isScanning ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : ''}
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('magic-upload')?.click()}
        >
            <input
                type="file"
                id="magic-upload"
                className="hidden"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
            />

            {/* Scanning Laser Effect */}
            {isScanning && (
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_#3b82f6] animate-[scan_2s_ease-in-out_infinite]"></div>
            )}

            <div className="flex flex-col items-center justify-center gap-4 relative z-10">
                {isScanning ? (
                    <>
                        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 animate-pulse">
                            <Loader2 size={32} className="animate-spin" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Analyzing Document...</h3>
                            <p className="text-sm text-blue-400">Extracting Logistics Data...</p>
                        </div>
                    </>
                ) : completed ? (
                    <>
                        <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 scale-110 transition-transform">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white mb-1">Extraction Complete!</h3>
                            <p className="text-sm text-green-400">Form has been filled automagically ✨</p>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors mb-2 ${isDragging ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400 group-hover:text-blue-400 group-hover:bg-slate-700'}`}>
                            <Sparkles size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                                Magic Scanner AI
                                <span className="text-[10px] bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">Beta</span>
                            </h3>
                            <p className="text-slate-400 max-w-sm mx-auto text-sm leading-relaxed">
                                Drop your <span className="text-slate-200 font-bold">Invoice</span> or <span className="text-slate-200 font-bold">B/L</span> here.
                                <br />
                                The AI will analyze and fill the form for you instantly.
                            </p>
                        </div>
                    </>
                )}
            </div>

            {/* Background Decor */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-colors"></div>
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
        </div>
    );
}
