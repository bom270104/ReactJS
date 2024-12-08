// src/App.js
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Layout/DefaultLayout/Header';
import Footer from './components/Layout/DefaultLayout/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Introduce from './pages/Introduce';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Cartpage from './pages/Cartpage';
import SearchPage from './pages/SearchPage';
import Payment from './pages/Payment';
import PaymentHistory from './pages/Historypayment';
import OrderConfirmation from './components/OrderConfirmation';
import { CartProvider } from './components/Cartcontext';
import { AuthProvider } from './components/AuthContext'; // Nhập AuthProvider
import ProductDetail from './pages/ProductDetail';
// Admin
import AdminDashboard from './pages/Admin/AdminDashboard';
import OrderManagement from './pages/Admin/OrderManagement';
import UserManagement from './pages/Admin/UserManagement';
import ProductManagement from './pages/Admin/ProductManagement';
function App() {
    const location = useLocation(); // Lấy đường dẫn hiện tại

    // Kiểm tra xem đường dẫn có phải là trang admin không
    const isAdminRoute = location.pathname.startsWith('/admin');
    return (
        <AuthProvider>
            {/* Bao bọc toàn bộ ứng dụng bằng AuthProvider */}
            <CartProvider>
                {/* Bao bọc toàn bộ ứng dụng bằng CartProvider */}
                <div className="App">
                    {!isAdminRoute && <Header />}
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/introduce" element={<Introduce />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/cartpage" element={<Cartpage />} />
                        <Route path="/payment" element={<Payment />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/history-payment" element={<PaymentHistory />} />
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/odermanagement" element={<OrderManagement />} />
                        <Route path="/admin/usermanagement" element={<UserManagement />} />
                        <Route path="/admin/productmanagement" element={<ProductManagement />} />
                    </Routes>
                    {!isAdminRoute && <Footer />}
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
