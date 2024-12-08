// src/pages/PaymentHistory/index.js
import React, { useEffect, useState } from 'react';
import './Historypayment.scss';

function PaymentHistory() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const savedPayments = JSON.parse(localStorage.getItem('payments')) || [];
            setPayments(savedPayments);
        } catch (err) {
            setError('Lỗi khi tải dữ liệu thanh toán.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Tính toán số lượng thanh toán và số lượng đã duyệt
    const totalPayments = payments.length;
    const approvedPayments = payments.filter((payment) => payment.approvalTime).length;

    const formatDate = (date) => {
        return new Date(date).toLocaleString('vi-VN', {
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="payment-history">
            <h2>Lịch sử thanh toán</h2>
            <div className="payment-summary">
                <p>Tổng số đơn hàng: {totalPayments}</p>
                <p>Số đơn hàng đã duyệt: {approvedPayments}</p>
            </div>
            {payments.length === 0 ? (
                <p>Chưa có thông tin đơn hàng nào.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Trạng thái đơn</th>
                            <th>Tên người nhận</th>
                            <th>Tổng số tiền</th>
                            <th>Thời gian thanh toán</th>
                            <th>Thời gian duyệt đơn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={index}>
                                <td>{payment.orderId}</td>
                                <td>{payment.recipientName}</td>
                                <td>{payment.totalAmount}</td>
                                <td>{formatDate(payment.paymentTime)}</td>
                                <td>{payment.approvalTime ? formatDate(payment.approvalTime) : 'Chưa duyệt'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default PaymentHistory;
