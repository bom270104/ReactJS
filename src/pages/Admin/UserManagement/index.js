import NavbarAdmin from '~/components/Layout/DefaultLayout/navbar-admin';
import SidebarAdmin from '~/components/Layout/DefaultLayout/Sidebar-admin';
import './UserManagement.scss';
function UserManagement() {
    return (
        <div className="user-management">
            <NavbarAdmin />
            <div className="user-content">
                <SidebarAdmin />
                <div className="user-table">
                    <h2>quan ly nguoi dung</h2>
                </div>
            </div>
        </div>
    );
}

export default UserManagement;
