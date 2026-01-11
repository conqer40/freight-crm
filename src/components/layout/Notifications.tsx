'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Check } from 'lucide-react';
import { getNotifications, getUnreadCount, markRead, markAllRead } from '@/app/actions/notification';
import { format } from 'date-fns';

export default function Notifications() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const fetchData = async () => {
        const [notes, count] = await Promise.all([
            getNotifications(),
            getUnreadCount()
        ]);
        setNotifications(notes);
        setUnreadCount(count);
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [containerRef]);

    const handleMarkAllRead = async () => {
        await markAllRead();
        await fetchData();
    };

    const handleRead = async (id: string, isRead: boolean) => {
        if (isRead) return;
        await markRead(id);
        await fetchData(); // Refresh to update badge
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full relative transition"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                )}
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 origin-top-right">
                    <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <button onClick={handleMarkAllRead} className="text-xs text-blue-600 hover:underline">
                                Mark all read
                            </button>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-8 text-center text-gray-400 text-sm">
                                No notifications
                            </div>
                        ) : (
                            <div className="divide-y">
                                {notifications.map(note => (
                                    <div
                                        key={note.id}
                                        onClick={() => handleRead(note.id, note.isRead)}
                                        className={`p-4 hover:bg-gray-50 transition cursor-pointer ${note.isRead ? 'opacity-60' : 'bg-blue-50/30'}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className={`text-sm ${note.isRead ? 'font-medium' : 'font-bold'} text-gray-900`}>{note.title}</h4>
                                            {!note.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>}
                                        </div>
                                        <p className="text-sm text-gray-500 line-clamp-2">{note.message}</p>
                                        <p className="text-xs text-gray-400 mt-2">{format(new Date(note.createdAt), 'MMM d, h:mm a')}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
