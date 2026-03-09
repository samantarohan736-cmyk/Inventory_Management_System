import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const handleOrder = async (product, quantity) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            alert('Please login to place an order.');
            navigate('/login');
            return;
        }

        try {
            await api.post('/orders', {
                userId: user.id,
                items: [{ productId: product.id, quantity }]
            });
            alert('Order placed successfully!');
            fetchProducts(); // Refresh stock
        } catch (error) {
            alert('Failed to place order.');
        }
    };

    const filteredProducts = products.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = category ? p.category === category : true;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <Hero
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                category={category}
                setCategory={setCategory}
            />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Featured Products
                    </h2>
                    <span className="text-slate-500 font-medium">{filteredProducts.length} items</span>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-slate-100">
                        <p className="text-slate-500 text-lg">No products found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} onOrder={handleOrder} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
