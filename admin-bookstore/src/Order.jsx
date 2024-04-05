import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import OrderCard from '@/components/OrderCard';
import OrderList from './components/OrderList';
import OrderService from './service/order.service';

const OrderPage = () => {
    const [orders, setOrders] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveOrders();
    }, []);

    useEffect(() => {
        setActiveIndex(-1);
    }, [searchText]);

    const soluong = orders.reduce((total, order) => total + order.quantity, 0);

    const orderStrings = orders.map((order) => {
        const { name, category, description, price, quantity, img } = order;
        return [name, category, description, price, quantity, img].join("");
    });

    const filteredOrders = !searchText ? orders : orders.filter((_order, index) =>
        orderStrings[index].includes(searchText)
    );

    const activeOrder = activeIndex < 0 ? null : filteredOrders[activeIndex];
    const filteredOrdersCount = filteredOrders.length;

    const retrieveOrders = async () => {
        try {
            const fetchedOrders = await OrderService.getAll();
            setOrders(fetchedOrders);
            console.log(orders)
        } catch (error) {
            console.log(error);
        }
    };

    const refreshList = () => {
        retrieveOrders();
        setActiveIndex(-1);
    };

    const removeAllOrders = async () => {
        if (window.confirm("Bạn muốn xóa tất cả hóa đơn?")) {
            try {
                await OrderService.deleteAll();
                refreshList();
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container">
            <div className="page row my-3">
                <div className="col-md-12">
                    <h4 className="d-flex justify-content-center">
                        Danh sách hóa đơn
                        <i className="fa-solid fa-book"></i>
                    </h4>

                    <div className="d-flex justify-content-center mb-3">
                        <div className="col-5"><strong>Tên khách hàng</strong></div>
                        <div className="col-2 mr-4"><strong>Tổng</strong></div>
                        <div className="col-2"><strong>Tình trạng</strong></div>
                        <div className="col-1"><strong>SL</strong></div>
                     
                    </div>

                    <OrderList orders={filteredOrders} activeIndex={activeIndex} />

                    <p>{filteredOrdersCount > 0 ? 'Không có hóa đơn.' : null}</p>

                    <div className="m-3 d-flex justify-content-around">
                        <button className="btn btn-sm btn-primary" onClick={refreshList}>
                            <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
                        </button>
                        <div>
                            <h3>{filteredOrdersCount} /10</h3>
                        </div>
                        <button className="btn btn-sm btn-primary">
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                    <div className="mt-3 row justify-content-around align-items-center">
                        <button className="btn btn-sm btn-primary" onClick={refreshList}>
                            <i className="fas fa-redo"></i> Làm mới
                        </button>

                        <button className="btn btn-sm btn-danger" onClick={removeAllOrders}>
                            <i className="fas fa-trash"></i> Xóa tất cả
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OrderPage;
