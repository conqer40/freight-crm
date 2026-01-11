'use client';

import { useState } from 'react';
import { createUser, deleteUser, updateUser } from '@/app/actions/user';
import { useActionState } from 'react';
import { toast } from 'sonner';
import { Trash2, Edit, Plus, User, Shield } from 'lucide-react';

export default function UsersList({ users }: { users: any[] }) {
    const [showAdd, setShowAdd] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);

    // Delete Action
    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            const res = await deleteUser(id);
            if (res.success) toast.success(res.message);
            else toast.error(res.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Users List</h2>
                <button
                    onClick={() => { setEditingUser(null); setShowAdd(true); }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
                >
                    <Plus size={18} /> Add User
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500">
                        <tr>
                            <th className="p-4">Username</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Created At</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {users.map(user => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="p-4 flex items-center gap-3">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                        <User size={16} />
                                    </div>
                                    <span className="font-medium text-gray-900">{user.username}</span>
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="p-4 text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => { setEditingUser(user); setShowAdd(true); }} className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:bg-red-50 p-1 rounded">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showAdd && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in-95">
                        <button onClick={() => setShowAdd(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">✕</button>
                        <h3 className="text-xl font-bold mb-4">{editingUser ? 'Edit User' : 'New User'}</h3>

                        <UserForm
                            user={editingUser}
                            onClose={() => setShowAdd(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

function UserForm({ user, onClose }: any) {
    const actionFn = user ? updateUser : createUser;
    const [state, action, isPending] = useActionState(actionFn, null);

    return (
        <form action={async (formData) => {
            await action(formData);
            // We can't easily check success inside the form action wrapper without more complex logic, 
            // but relying on revalidatePath and manual close for now.
            onClose();
        }} className="space-y-4">
            {user && <input type="hidden" name="id" value={user.id} />}

            <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                    name="username"
                    type="text"
                    defaultValue={user?.username}
                    disabled={!!user} // Username usually immutable or harder to change due to uniqueness
                    className="w-full border p-2 rounded-lg disabled:bg-gray-100 disabled:text-gray-500"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Password {user && '(Leave blank to keep current)'}</label>
                <input name="password" type="password" className="w-full border p-2 rounded-lg" required={!user} />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select name="role" defaultValue={user?.role || 'STAFF'} className="w-full border p-2 rounded-lg bg-white">
                    <option value="STAFF">Staff</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={onClose} className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button type="submit" disabled={isPending} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                    {isPending ? 'Saving...' : 'Save User'}
                </button>
            </div>
        </form>
    )
}
