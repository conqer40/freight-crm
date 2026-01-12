'use client';

import { useState } from 'react';
import { Save, User, Shield, Anchor, Database, Bell, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('general');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">الإعدادات</h2>

            <div className="flex flex-col md:flex-row gap-6">
                {/* Settings Sidebar */}
                <div className="w-full md:w-64 space-y-2">
                    <NavButton active={activeTab === 'general'} onClick={() => setActiveTab('general')} icon={Database}>عام</NavButton>
                    <NavButton active={activeTab === 'users'} onClick={() => setActiveTab('users')} icon={User}>المستخدمين</NavButton>
                    <NavButton active={activeTab === 'ports'} onClick={() => setActiveTab('ports')} icon={Anchor}>الموانئ والمسارات</NavButton>
                    <NavButton active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={Bell}>التنبيهات والواتساب</NavButton>
                    <NavButton active={activeTab === 'backup'} onClick={() => setActiveTab('backup')} icon={Database}>النسخ الاحتياطي</NavButton>
                    <NavButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={Shield}>الأمان</NavButton>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white p-6 rounded-xl border shadow-sm min-h-[500px]">
                    {activeTab === 'general' && (
                        <div className="space-y-6">
                            {/* Business Partners Management Shortcut */}
                            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">Business Partners (تكويد الشركاء)</h3>
                                        <p className="text-sm text-slate-400">Manage Factories, Suppliers, and Importers</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <Link href="/companies/create?type=SUPPLIER" className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition">
                                        <span className="text-slate-200">Add New Supplier (مورد)</span>
                                        <ArrowRight size={16} className="text-slate-400" />
                                    </Link>
                                    <Link href="/companies/create?type=FACTORY" className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition">
                                        <span className="text-slate-200">Add New Factory (مصنع)</span>
                                        <ArrowRight size={16} className="text-slate-400" />
                                    </Link>
                                    <Link href="/companies/create?type=IMPORTER" className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition">
                                        <span className="text-slate-200">Add New Importer (مستورد)</span>
                                        <ArrowRight size={16} className="text-slate-400" />
                                    </Link>
                                </div>
                            </div>
                            <GeneralSettings />
                        </div>
                    )}
                    {activeTab === 'users' && <UsersSettings />}
                    {activeTab === 'ports' && <PortsSettings />}
                    {activeTab === 'notifications' && <NotificationsSettings />}
                    {activeTab === 'backup' && <BackupSettings />}
                    {activeTab === 'security' && <div className="text-gray-500 text-center mt-20">إعدادات الأمان وقوائم المراجعة (Audit Log)</div>}
                </div>
            </div>
        </div>
    );
}

function NavButton({ children, active, onClick, icon: Icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
        >
            <Icon size={18} />
            {children}
        </button>
    );
}

function GeneralSettings() {
    const [days, setDays] = useState(21);

    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">الإعدادات العامة</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Default Required Free Days</label>
                <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                    className="border p-2 rounded-lg w-full max-w-xs"
                />
                <p className="text-xs text-gray-400 mt-1">القيمة الافتراضية لأيام السماح عند إنشاء طلب جديد.</p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">العملات المتاحة</label>
                <div className="flex gap-2">
                    {['USD', 'EGP', 'EUR', 'SAR'].map(c => (
                        <span key={c} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{c}</span>
                    ))}
                    <button className="text-blue-600 text-sm hover:underline">+ إضافة</button>
                </div>
            </div>

            <div className="pt-4">
                <button onClick={() => toast.success('تم حفظ الإعدادات')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                    <Save size={18} /> حفظ التغييرات
                </button>
            </div>
        </div>
    )
}

function UsersSettings() {
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">إدارة المستخدمين</h3>
            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-right text-sm">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="p-3">المستخدم</th>
                            <th className="p-3">الدور</th>
                            <th className="p-3">الحالة</th>
                            <th className="p-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        <tr>
                            <td className="p-3 font-medium">admin</td>
                            <td className="p-3"><span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded text-xs">Admin</span></td>
                            <td className="p-3"><span className="text-green-600 text-xs">Active</span></td>
                            <td className="p-3 text-blue-600 cursor-pointer">تعديل</td>
                        </tr>
                        <tr>
                            <td className="p-3">staff_ahmed</td>
                            <td className="p-3">Staff</td>
                            <td className="p-3"><span className="text-green-600 text-xs">Active</span></td>
                            <td className="p-3 text-blue-600 cursor-pointer">تعديل</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button className="text-sm bg-gray-100 px-3 py-2 rounded hover:bg-gray-200">إضافة مستخدم جديد</button>
        </div>
    )
}

function PortsSettings() {
    return (
        <div className="space-y-4">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">الموانئ والمسارات المفضلة</h3>
            <p className="text-sm text-gray-500">إدارة قائمة الموانئ لتظهر في القوائم المنسدلة (Autocomplete).</p>
            <textarea className="w-full border p-3 rounded-lg h-96 text-sm font-mono" defaultValue={`Sokhna Port, EG (ميناء السخنة)
Alexandria Port, EG (ميناء الإسكندرية)
Damietta Port, EG (ميناء دمياط)
Port Said, EG (ميناء بورسعيد)
Shanghai Port, CN (ميناء شانغهاي)
Ningbo-Zhoushan Port, CN (ميناء نينغبو-تشوشان)
Shenzhen Port, CN (ميناء شنتشن)
Guangzhou Port, CN (ميناء قوانغتشو)
Qingdao Port, CN (ميناء تشينغداو)
Tianjin Port, CN (ميناء تيانجين)
Xiamen Port, CN (ميناء شيامن)
Dalian Port, CN (ميناء داليان)
Hong Kong Port, HK (ميناء هونغ كونغ)
Yingkou Port, CN (ميناء ينغكو)
Lianyungang Port, CN (ميناء ليانيونقانغ)
Rizhao Port, CN (ميناء ريتشاو)
Yantai Port, CN (ميناء يانتاي)
Fuzhou Port, CN (ميناء فوتشو)
Nanjing Port, CN (ميناء نانجينغ)
Fangcheng Port, CN (ميناء فانغتشينغ)
Zhanjiang Port, CN (ميناء تشانجيانغ)
Shantou Port, CN (ميناء شانتو)
Jebel Ali, UAE (جبل علي)`}></textarea>
            <button onClick={() => toast.success('تم تحديث القائمة')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <Save size={18} /> حفظ القائمة
            </button>
        </div>
    )
}

function NotificationsSettings() {
    return (
        <div className="space-y-6">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">قوالب الواتساب</h3>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">قالب رسالة طلب السعر (RFQ)</label>
                <textarea className="w-full border p-3 rounded-lg h-40 text-sm font-sans" defaultValue={`السلام عليكم،
محتاج عرض سعر للشحنة التالية:
• النوع: {mode}
• المسار: {pol} → {pod}
• المنتج: {commodity}
• الحاوية: {container_details}
• Free Days: {free_days} يوم
...`} />
                <p className="text-xs text-gray-400 mt-1">يمكنك استخدام المتغيرات بين أقواس { }</p>
            </div>

            <button onClick={() => toast.success('تم حفظ القالب')} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
                <Save size={18} /> حفظ القالب
            </button>
        </div>
    )
}

function BackupSettings() {
    const [isRestoring, setIsRestoring] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [resetPassword, setResetPassword] = useState('');

    const handleDownload = async () => {
        try {
            const res = await fetch('/api/backup');
            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `freight-crm-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            toast.success('تم تحميل النسخة الاحتياطية بنجاح');
        } catch (e) {
            toast.error('حدث خطأ أثناء التحميل');
        }
    };

    const handleRestore = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!confirm('تحذير: استعادة النسخة الاحتياطية سيقوم بمسح جميع البيانات الحالية واستبدالها بالنسخة. هل أنت متأكد؟')) {
            e.target.value = '';
            return;
        }

        setIsRestoring(true);
        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const json = JSON.parse(event.target?.result as string);

                const res = await fetch('/api/backup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(json)
                });

                const data = await res.json();
                if (data.success) {
                    toast.success('تمت الاستعادة بنجاح! سيتم إعادة تحميل الصفحة...');
                    setTimeout(() => window.location.reload(), 2000);
                } else {
                    toast.error('فشل الاستعادة: ' + data.error);
                }
            } catch (err) {
                toast.error('ملف غير صالح');
            } finally {
                setIsRestoring(false);
            }
        };
        reader.readAsText(file);
    };

    const handleConfirmReset = async () => {
        const toastId = toast.loading('جاري مسح النظام...');
        try {
            const res = await fetch('/api/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: resetPassword })
            });
            const data = await res.json();

            if (data.success) {
                toast.success('تم إعادة ضبط النظام بنجاح', { id: toastId });
                setTimeout(() => window.location.reload(), 1500);
            } else {
                toast.error('فشل: ' + data.error, { id: toastId });
            }
        } catch (e) {
            toast.error('فشل الاتصال', { id: toastId });
        } finally {
            setIsResetModalOpen(false);
        }
    };

    return (
        <div className="space-y-8">
            <h3 className="font-bold text-lg border-b pb-2 mb-4">النسخ الاحتياطي والاستعادة</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Export Card */}
                <div className="border border-blue-100 bg-blue-50/50 rounded-xl p-6 flex flex-col items-center text-center hover:bg-blue-50 transition">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                        <Database size={32} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">تصدير قاعدة البيانات</h4>
                    <p className="text-sm text-gray-500 mb-6">قم بتحميل ملف JSON يحتوي على جميع بيانات النظام (العملاء، الشحنات، العروض، المستخدمين).</p>
                    <button onClick={handleDownload} className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                        <Save size={18} /> تحميل نسخة احتياطية
                    </button>
                </div>

                {/* Import Card */}
                <div className="border border-red-100 bg-red-50/30 rounded-xl p-6 flex flex-col items-center text-center hover:bg-red-50/50 transition">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
                        <Shield size={32} />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">استعادة نسخة سابقة</h4>
                    <p className="text-sm text-gray-500 mb-6">احذر: سيتم مسح البيانات الحالية واستبدالها بالنسخة المختارة.</p>

                    <label className={`mt-auto w-full bg-white border border-red-200 text-red-600 py-2 rounded-lg hover:bg-red-50 flex items-center justify-center gap-2 cursor-pointer ${isRestoring ? 'opacity-50 pointer-events-none' : ''}`}>
                        {isRestoring ? (
                            <span>جاري الاستعادة...</span>
                        ) : (
                            <>
                                <Anchor size={18} className="rotate-90" /> اختيار ملف للاستعادة
                            </>
                        )}
                        <input type="file" accept=".json" onChange={handleRestore} className="hidden" disabled={isRestoring} />
                    </label>
                </div>

                {/* Reset System Card */}
                <div className="col-span-1 md:col-span-2 border border-red-200 bg-red-50 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mt-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 shrink-0">
                            <span className="text-xl">⚠️</span>
                        </div>
                        <div className="text-right">
                            <h4 className="font-bold text-red-900">إعادة ضبط المصنع (System Reset)</h4>
                            <p className="text-sm text-red-700 mt-1">
                                هذا الإجراء سيقوم بمسح جميع البيانات (الشركات، الشحنات، العروض، السجلات) ويعيد النظام لحالته الأولية.
                                <br />
                                <span className="font-bold underline">لن يتم مسح المستخدمين (Users).</span>
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsResetModalOpen(true)}
                        className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-500/20 whitespace-nowrap"
                    >
                        حذف كل البيانات
                    </button>
                </div>
            </div>

            {/* Reset Confirmation Modal */}
            {isResetModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95">
                        <h3 className="text-xl font-bold text-red-600">تأكيد إعادة الضبط</h3>
                        <p className="text-gray-600 text-sm">
                            لتأكيد عملية الحذف، يرجى إدخال كلمة مرور المسؤول (Admin Password).
                            <br />
                            <span className="font-bold text-red-500">لا يمكن التراجع عن هذه الخطوة!</span>
                        </p>

                        <input
                            type="password"
                            placeholder="Admin Password"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                            value={resetPassword}
                            onChange={(e) => setResetPassword(e.target.value)}
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => { setIsResetModalOpen(false); setResetPassword(''); }}
                                className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                            >
                                إلغاء
                            </button>
                            <button
                                onClick={handleConfirmReset}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                                disabled={!resetPassword}
                            >
                                تأكيد الحذف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
