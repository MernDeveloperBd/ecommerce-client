import { useState } from 'react';
import ProductItem from '../ProductItem/ProductItem';

const CategoryProductsSlider = ({ categoryName, products = [] }) => {
    // ✅ শুধু popular products filter
    const popularProducts = products.filter(p => p.isFeatured === true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // প্রতি page ৪টি product

    const totalPages = Math.ceil(popularProducts.length / itemsPerPage);

    const currentProducts = popularProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="categoryProducts container mx-auto py-6">

            {/* Products Grid or Empty Message */}
            {popularProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {currentProducts.map((product) => (
                        <ProductItem key={product._id || product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-40 bg-gray-100 rounded-md text-gray-500 font-medium">
                    No Popular Products in this category
                </div>
            )}

            {/* Pagination */}
            {popularProducts.length > itemsPerPage && (
                <div className="flex justify-center mt-6 gap-2 flex-wrap">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded ${
                                currentPage === i + 1
                                    ? 'bg-violet-500 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryProductsSlider;
