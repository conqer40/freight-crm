'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'en';

const dictionaries = {
    ar: {
        dashboard: 'لوحة التحكم',
        companies: 'شركات الشحن',
        rfqs: 'طلبات الأسعار',
        quotes: 'العروض',
        shipments: 'الشحنات',
        reports: 'التقارير',
        settings: 'الإعدادات',
        users: 'المستخدمين',
        partners: 'الشركاء',
        cargo_planner: 'مخطط الشحنات',
        logout: 'تسجيل خروج',
        welcome: 'مرحباً بك',
        overview: 'نظرة عامة على نشاط الشحن اليوم.',
        active_rfqs: 'طلبات الأسعار النشطة',
        pending_quotes: 'عروض الأسعار الواردة',
        active_shipments: 'شحنات في الطريق',
        no_data: 'لا توجد بيانات للعرض',
        recent_activity: 'أحدث النشاطات',
        upcoming_shipments: 'الشحنات القادمة',
        search: 'بحث...',
        add_company: 'إضافة شركة',
        create_rfq: 'إنشاء طلب جديد',
        company_name: 'اسم الشركة',
        type: 'النوع',
        services: 'الخدمات',
        contact: 'جهة الاتصال',
        actions: 'إجراءات',
        save: 'حفظ',
        cancel: 'إلغاء',
        delete: 'حذف',
        edit: 'تعديل',
        view: 'عرض',
        status: 'الحالة',
        pol: 'ميناء القيام',
        pod: 'ميناء الوصول',
        mode: 'طريقة الشحن',
        ocean: 'بحري',
        air: 'جوي',
        commodity: 'البضاعة',
        weight: 'الوزن',
        container: 'الحاوية',
        target_date: 'تاريخ الشحن المتوقع',
        submit: 'تأكيد',
        loading: 'جاري التحميل...',
        success: 'تمت العملية بنجاح',
        error: 'حدث خطأ',
        language: 'English',
    },
    en: {
        dashboard: 'Dashboard',
        companies: 'Companies',
        rfqs: 'RFQs',
        quotes: 'Quotes',
        shipments: 'Shipments',
        reports: 'Reports',
        settings: 'Settings',
        users: 'Users',
        partners: 'Partners',
        cargo_planner: 'Cargo Planner',
        logout: 'Logout',
        welcome: 'Welcome back',
        overview: 'Overview of today\'s shipping activity.',
        active_rfqs: 'Active RFQs',
        pending_quotes: 'Pending Quotes',
        active_shipments: 'Active Shipments',
        no_data: 'No data to display',
        recent_activity: 'Recent Activity',
        upcoming_shipments: 'Upcoming Shipments',
        search: 'Search...',
        add_company: 'Add Company',
        create_rfq: 'New RFQ',
        company_name: 'Company Name',
        type: 'Type',
        services: 'Services',
        contact: 'Contact',
        actions: 'Actions',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        view: 'View',
        status: 'Status',
        pol: 'POL',
        pod: 'POD',
        mode: 'Mode',
        ocean: 'Ocean',
        air: 'Air',
        commodity: 'Commodity',
        weight: 'Weight',
        container: 'Container',
        target_date: 'Target Date',
        submit: 'Submit',
        loading: 'Loading...',
        success: 'Success',
        error: 'Error',
        language: 'عربي',
    }
};

type Translations = typeof dictionaries.ar;

interface LanguageContextType {
    language: Language;
    t: Translations;
    toggleLanguage: () => void;
    dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('ar');

    useEffect(() => {
        const saved = localStorage.getItem('lang') as Language;
        if (saved) setLanguage(saved);
    }, []);

    const toggleLanguage = () => {
        const newLang = language === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
        localStorage.setItem('lang', newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    return (
        <LanguageContext.Provider
            value={{
                language,
                t: dictionaries[language],
                toggleLanguage,
                dir: language === 'ar' ? 'rtl' : 'ltr'
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
