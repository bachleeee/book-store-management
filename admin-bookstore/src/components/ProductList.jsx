import React from 'react';
import ProductService from '../service/product.service';

const ProductList = ({ products, activeIndex, setActiveIndex }) => {
    const updateActiveIndex = (index) => {
        setActiveIndex(index);
    };

    const deleteProduct = async (index, productId) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
            if (!confirmDelete) {
                return;
            }
            await ProductService.delete(productId);
            products.splice(index, 1);
            setActiveIndex(-1);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const modifyProduct = (index, productId) => {
        // Redirect to 'product.edit' route with id parameter
        // You need to implement the routing logic using react-router-dom
    };

    const formatCategory = (category) => {
        switch (category) {
            case 'van-hoc':
                return 'Văn học';
            case 'tam-ly-hoc':
                return 'Tâm lý học';
            case 'kinh-te':
                return 'Kinh tế';
            case 'ngoai-ngu':
                return 'Ngoại ngữ';
            default:
                return category;
        }
    };

    const formatCurrency = (price) => {
        const formattedPrice = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);

        return `${formattedPrice}`;
    };

    return (
        <ul className="list-group">
            {products.map((product, index) => (
                <li key={product._id} className={`list-group-item ${index === activeIndex ? 'active' : ''}`} onClick={() => updateActiveIndex(index)}>
                    <div className="col-5 product-name">{product.name}</div>
                    <div className="col-2 product-category">{formatCategory(product.category)}</div>
                    <div className="col-2 product-price">{formatCurrency(product.price)}</div>
                    <div className="col-1 product-quantity">{product.quantity}</div>
                    <div className="col-1">
                        <i className="fa-solid fa-trash delete-icon mr-3" onClick={() => deleteProduct(index, product._id)}></i>
                        <i className="fa-solid fa-pen modify-icon" onClick={() => modifyProduct(index, product._id)}></i>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;
