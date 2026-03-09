import { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product, onOrder }) {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300 group flex flex-col h-full">
            <div className="relative aspect-w-4 aspect-h-3 overflow-hidden bg-slate-100 flex-shrink-0">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-48 flex items-center justify-center text-slate-400">
                        No Image
                    </div>
                )}
                <div className="absolute top-2 right-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-indigo-600 shadow-sm">
                    {product.category || 'General'}
                </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1">{product.name}</h3>
                    <span className="text-lg font-black text-indigo-600">${product.price.toFixed(2)}</span>
                </div>

                <p className="text-sm text-slate-500 mb-4 line-clamp-2 md:h-10">{product.description}</p>

                <div className="flex items-center mb-4 text-amber-400">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium text-slate-700">{product.rating ? product.rating.toFixed(1) : 'New'}</span>
                    <span className="mx-2 text-slate-300">|</span>
                    <span className="text-sm font-medium text-slate-600">Stock: {product.stockQuantity}</span>
                </div>

                {/* This pushes the button to the bottom if container is larger */}
                <div className="mt-auto"></div>

                <div className="flex items-center space-x-3 mt-4">
                    <input
                        type="number"
                        min="1"
                        max={product.stockQuantity}
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="block w-20 rounded-xl border-slate-200 focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 text-center text-sm shadow-sm"
                    />
                    <button
                        onClick={() => onOrder(product, quantity)}
                        disabled={product.stockQuantity === 0}
                        className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors"
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Order Now
                    </button>
                </div>
            </div>
        </div>
    );
}
