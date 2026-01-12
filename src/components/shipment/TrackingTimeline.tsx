'use client';

import { CheckCircle2, Circle, Truck, Ship, Anchor, PackageCheck } from 'lucide-react';

export default function TrackingTimeline({ status, shippingLine }: { status: string, shippingLine?: string | null }) {
    // If no shipping line, show a placeholder
    if (!shippingLine) {
        return (
            <div className="glass-card p-6 mb-6 border-l-4 border-slate-600 bg-slate-800/50">
                <div className="flex items-center gap-3 opacity-50">
                    <div className="p-2 bg-slate-700 rounded-full"><Anchor size={20} /></div>
                    <div>
                        <h3 className="font-bold text-white">Tracking Unavailable</h3>
                        <p className="text-xs text-slate-400">Please select a Shipping Line to enable Auto-Tracking.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Simulate tracking steps based on shipment status
    const steps = [
        { id: 1, title: 'Booking Confirmed', date: '2025-01-10 09:00', status: 'completed', icon: CheckCircle2 },
        { id: 2, title: 'Container Gated In', date: '2025-01-12 14:30', status: 'completed', icon: Truck },
        { id: 3, title: 'Vessel Departed (POL)', date: '2025-01-13 18:00', status: status === 'AT_SEA' || status === 'ARRIVED' || status === 'CLEARED' || status === 'DELIVERED' ? 'completed' : 'current', icon: Ship },
        { id: 4, title: 'Vessel Arrived (POD)', date: 'Estimated: 2025-02-05', status: status === 'ARRIVED' || status === 'CLEARED' || status === 'DELIVERED' ? 'completed' : 'upcoming', icon: Anchor },
        { id: 5, title: 'Customs Clearance', date: '---', status: status === 'CLEARED' || status === 'DELIVERED' ? 'completed' : 'upcoming', icon: PackageCheck },
    ];

    return (
        <div className="glass-card p-6 animate-in fade-in slide-in-from-bottom duration-700">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded flex items-center justify-center p-1">
                        {/* Placeholder Logo Logic */}
                        <span className="text-xs font-bold text-blue-900">{shippingLine}</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-lg">Live Tracking: {shippingLine}</h3>
                        <p className="text-slate-400 text-xs flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Connected to Carrier API
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-mono text-emerald-400 font-bold">ON TIME</div>
                </div>
            </div>

            <div className="relative border-l-2 border-slate-700 ml-4 space-y-8 py-2">
                {steps.map((step, index) => (
                    <div key={step.id} className="relative pl-8">
                        {/* Dot */}
                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 transition-all duration-500 ${step.status === 'completed' ? 'bg-emerald-500 border-emerald-500' :
                            step.status === 'current' ? 'bg-blue-500 border-blue-500 animate-ping' :
                                'bg-slate-900 border-slate-600'
                            }`}></div>

                        <div className={`transition-all duration-500 ${step.status === 'upcoming' ? 'opacity-50' : 'opacity-100'}`}>
                            <h4 className={`font-bold ${step.status === 'current' ? 'text-blue-400' : 'text-slate-200'}`}>
                                {step.title}
                            </h4>
                            <p className="text-xs text-slate-500 font-mono mt-1">{step.date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
