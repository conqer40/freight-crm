'use client';

import { updateShipment } from '@/app/actions/shipment';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ShipmentEditForm({ shipment, companies }: { shipment: any, companies: any[] }) {
    const [state, action, isPending] = useActionState(updateShipment, null);

    return (
        <form action={action} className="space-y-6">
            <input type="hidden" name="id" value={shipment.id} />

            {state?.message && !state.success && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm border border-red-100">
                    {state.message}
                </div>
            )}

            {state?.success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg text-sm border border-green-100 mb-4">
                    تم حفظ التغييرات بنجاح!
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Operational Info */}
                <div className="glass-card p-6 space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">بيانات التشغيل</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Company (شركة الشحن)</label>
                        <select name="companyId" defaultValue={shipment.companyId || ''} className="w-full input-primary bg-slate-800 focus:bg-slate-700">
                            <option value="">-- اختر شركة الشحن --</option>
                            {companies.map(c => (
                                <option key={c.id} value={c.id}>{c.name} ({c.type})</option>
                            ))}
                        </select>
                        <p className="text-xs text-blue-500 mt-1">⚠️ تغيير الشركة لا يؤثر على سجل عروض الأسعار القديم.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status (الحالة)</label>
                        <select name="status" defaultValue={shipment.status} className="w-full input-primary bg-slate-800 focus:bg-slate-700">
                            <option value="BOOKED">BOOKED (تم الحجز)</option>
                            <option value="AT_SEA">AT SEA (في البحر / الجو)</option>
                            <option value="ARRIVED">ARRIVED (وصلت)</option>
                            <option value="CLEARED">CLEARED (تم التخليص)</option>
                            <option value="DELIVERED">DELIVERED (تم التسليم)</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Booking No.</label>
                        <input name="bookingNo" type="text" defaultValue={shipment.bookingNo || ''} className="w-full border p-2.5 rounded-lg" />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">MBL / HBL No.</label>
                        <input name="blNo" type="text" defaultValue={shipment.blNo || ''} className="w-full border p-2.5 rounded-lg" placeholder="رقم البوليصة" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ACID Number</label>
                        <input name="acidNumber" type="text" defaultValue={shipment.acidNumber || ''} className="w-full border p-2.5 rounded-lg border-green-500/30 bg-green-500/5 focus:ring-green-500" placeholder="رقم ACID الاجباري" />
                        <p className="text-[10px] text-green-600 mt-1">خاص بمنظومة الجمارك المصرية (ACI)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Vessel / Flight</label>
                        <input name="vessel" type="text" defaultValue={shipment.vessel || ''} className="w-full border p-2.5 rounded-lg" placeholder="اسم السفينة أو رقم الرحلة" />
                    </div>
                </div>

                {/* Dates & Notes */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                    <h3 className="font-semibold text-gray-900 border-b pb-2">التواريخ والملاحظات</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ETD (تاريخ المغادرة)</label>
                        <input name="etd" type="date" defaultValue={shipment.etd ? new Date(shipment.etd).toISOString().split('T')[0] : ''} className="w-full border p-2.5 rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ETA (تاريخ الوصول)</label>
                        <input name="eta" type="date" defaultValue={shipment.eta ? new Date(shipment.eta).toISOString().split('T')[0] : ''} className="w-full border p-2.5 rounded-lg" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (ملاحظات)</label>
                        <textarea name="notes" rows={4} defaultValue={shipment.notes || ''} className="w-full border p-2.5 rounded-lg"></textarea>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                >
                    {isPending ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    <span>حفظ التعديلات</span>
                </button>
            </div>
        </form>
    )
}
