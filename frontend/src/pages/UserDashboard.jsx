import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

export default function UserDashboard() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchOrders();
        }
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await api.get(`/orders/user/${user.id}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">My Purchase History</h1>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-10 text-center shadow-sm">
                        <p className="text-slate-500 text-lg">You haven't placed any orders yet.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">Order #{order.id}</h3>
                                    <p className="text-sm text-slate-500">{new Date(order.orderDate).toLocaleString()}</p>
                                    <p className="mt-2 text-sm font-medium text-indigo-600">Status: {order.status}</p>
                                </div>
                                <div className="mt-4 md:mt-0 md:text-right">
                                    <p className="text-2xl font-black text-slate-900">${order.totalAmount.toFixed(2)}</p>
                                    <p className="text-sm text-slate-500">{order.items.length} items</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
