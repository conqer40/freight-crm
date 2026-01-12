import CargoPlanner from '@/components/tools/CargoPlanner';
import { BoxSelect } from 'lucide-react';

export default function CargoPlannerPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-amber-300 text-glow inline-block">تخطيط الحاويات (3D Load)</h2>
                    <p className="text-slate-400 mt-1">محاكاة ذكية لرص البضائع داخل الحاوية لتقليل الهدر.</p>
                </div>
            </div>

            <div className="glass-card p-6">
                <CargoPlanner />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-2">Space Utilization</h4>
                        <div className="text-3xl font-bold text-emerald-400">88.5%</div>
                        <p className="text-xs text-slate-400 mt-1">Excellent packing density</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-2">Total Volume</h4>
                        <div className="text-3xl font-bold text-blue-400">28.4 CBM</div>
                        <p className="text-xs text-slate-400 mt-1">Out of 33.2 CBM (20ft)</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                        <h4 className="text-white font-bold mb-2">Warnings</h4>
                        <div className="flex items-center gap-2 text-amber-400 mt-1">
                            <BoxSelect size={20} />
                            <span className="font-bold">1 Gap Found</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Row 3 needs stabilization</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
