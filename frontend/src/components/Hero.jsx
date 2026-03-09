import { Search } from 'lucide-react';

export default function Hero({ searchTerm, setSearchTerm, category, setCategory }) {
    return (
        <div className="relative bg-slate-900 overflow-hidden">
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover opacity-30"
                    src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2000"
                    alt="Abstract background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40" />
            </div>

            <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-center">
                    Discover Premium Products
                </h1>
                <p className="mt-6 text-xl text-slate-300 max-w-3xl mx-auto text-center">
                    Find exactly what you need with our advanced inventory search. Fast sorting, accurate stock availability, and instant shipping.
                </p>

                <div className="mt-10 max-w-2xl mx-auto sm:flex sm:space-x-4">
                    <div className="flex-1 min-w-0 flex items-center bg-white rounded-full px-4 py-2 shadow-xl focus-within:ring-2 focus-within:ring-indigo-500">
                        <Search className="h-5 w-5 text-slate-400 mr-2" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="flex-1 block w-full bg-transparent border-0 focus:ring-0 text-slate-900 placeholder-slate-400 sm:text-sm"
                            placeholder="Search by product name..."
                        />
                    </div>
                    <div className="mt-4 sm:mt-0 sm:w-1/3">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="block w-full h-full pl-4 pr-10 py-3 bg-white border-0 rounded-full shadow-xl focus:ring-2 focus:ring-indigo-500 text-slate-900 sm:text-sm"
                        >
                            <option value="">All Categories</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Audio">Audio</option>
                            <option value="Footwear">Footwear</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}
