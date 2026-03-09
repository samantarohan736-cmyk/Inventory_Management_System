import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user || user.role !== 'ADMIN') {
            navigate('/login');
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const [ordersRes, productsRes] = await Promise.all([
                api.get('/orders'),
                api.get('/products')
            ]);
            setOrders(ordersRes.data);
            setProducts(productsRes.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Orders Section */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Orders</h2>
                        {orders.length === 0 ? (
                            <p className="text-slate-500">No orders placed yet.</p>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order) => (
                                    <div key={order.id} className="flex justify-between items-center p-4 rounded-xl bg-slate-50">
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">Order #{order.id} <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full ml-2">User {order.userId}</span></p>
                                            <p className="text-xs text-slate-500">{new Date(order.orderDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-slate-900">${order.totalAmount.toFixed(2)}</p>
                                            <p className="text-xs text-green-600 font-medium">{order.status}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Stock Section */}
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-6">Stock Details</h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                            {products.map((product) => (
                                <div key={product.id} className="flex justify-between items-center p-4 rounded-xl border border-slate-100 hover:border-indigo-100 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-bold text-sm text-slate-900">{product.name}</p>
                                            <p className="text-xs text-slate-500">{product.category}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-black text-lg ${product.stockQuantity < 10 ? 'text-red-600' : 'text-slate-900'}`}>{product.stockQuantity}</p>
                                        <p className="text-xs text-slate-500">In Stock</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
