import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import ProductForm from '@/components/ProductForm';
import ProductService from '@/services/product.service';

const EditProduct = () => {
    const { id } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [message, setMessage] = useState('');

    const getProduct = async (id) => {
        try {
            const fetchedProduct = await ProductService.get(id);
            setProduct(fetchedProduct);
        } catch (error) {
            console.log(error);
            // Chuyển sang trang NotFound đồng thời giữ cho URL không đổi
            history.push(`/notfound${history.location.pathname}`);
        }
    };

    const updateProduct = async (data) => {
        try {
            await ProductService.update(product._id, data);
            window.alert("Sản phẩm được cập nhật thành công.");
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async () => {
        if (window.confirm("Bạn muốn xóa sản phẩm này?")) {
            try {
                await ProductService.delete(product._id);
                history.push('/product');
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        getProduct(id);
        setMessage('');
    }, [id]);

    return (
        <div className="container mt-4 d-flex flex-column align-items-center">
            {product && (
                <>
                    <h4>Hiệu chỉnh sản phẩm</h4>
                    <ProductForm product={product} onSubmit={updateProduct} onDelete={deleteProduct} />
                    <p>{message}</p>
                </>
            )}
        </div>
    );
};

export default EditProduct;
