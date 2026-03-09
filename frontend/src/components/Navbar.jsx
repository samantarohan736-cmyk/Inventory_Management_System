import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';

export default function Navbar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 glass">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        InventoryPro
                    </Link>

                    <div className="flex items-center space-x-6">
                        {!user ? (
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                            >
                                Login
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                                    className="flex items-center text-slate-600 hover:text-indigo-600 transition-colors font-medium"
                                >
                                    <User className="h-5 w-5 mr-1" />
                                    Account
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-slate-600 hover:text-red-600 transition-colors font-medium"
                                >
                                    <LogOut className="h-5 w-5 mr-1" />
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
