import React, { useEffect, useState } from 'react';
import NavbarAdmin from '~/components/Layout/DefaultLayout/navbar-admin';
import SidebarAdmin from '~/components/Layout/DefaultLayout/Sidebar-admin';
import { getUsers, deleteUser } from '~/api/api'; // Import API deleteUser
import './UserManagement.scss';

function UserManagement() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    // Fetch danh sách người dùng
    useEffect(() => {
        const fetchUsers = async () => {
            const result = await getUsers();
            if (result.success) {
                setUsers(result.users);
            } else {
                setError(result.message || 'Failed to fetch users.');
            }
        };

        fetchUsers();
    }, []);

    // Xóa người dùng
    const handleDelete = async (userId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            const result = await deleteUser(userId);
            if (result.success) {
                setUsers(users.filter((user) => user.id !== userId)); // Cập nhật danh sách người dùng
            } else {
                alert(result.message || 'Không thể xóa người dùng.');
            }
        }
    };

    // Sửa người dùng
    const handleEdit = (userId) => {
        // Chuyển hướng đến trang chỉnh sửa người dùng
        console.log(`Chỉnh sửa người dùng có ID: ${userId}`);
    };

    return (
        <div className="user-management">
            <NavbarAdmin />
            <div className="user-content">
                <SidebarAdmin />
                <div className="user-table">
                    <h2>Quản lý người dùng</h2>
                    {error && <p className="error">{error}</p>}
                    <table>
                        <thead>
                            <tr className="user-tr">
                                <th>ID</th>
                                <th>Tên đăng nhập</th>
                                <th>Email</th>
                                <th>Password (Mã hóa)</th>
                                <th>Hành động</th> {/* Thêm cột Hành động */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                        <button className="btn-edit" onClick={() => handleEdit(user.id)}>
                                            Sửa
                                        </button>
                                        <button className="btn-delete" onClick={() => handleDelete(user.id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;
