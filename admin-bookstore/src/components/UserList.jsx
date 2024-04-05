import React from 'react';
import UserService from '../service/user.service';

const UserList = ({ users, activeIndex, setActiveIndex }) => {
    const updateActiveIndex = (index) => {
        setActiveIndex(index);
    };

    const deleteUser = async (index, userId) => {
        try {
            const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
            if (!confirmDelete) {
                return;
            }
            await UserService.delete(userId);
            users.splice(index, 1);
            setActiveIndex(-1);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const modifyUser = (index, userId) => {
        // Redirect to 'user.edit' route with id parameter
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
            {users.map((user, index) => (
                <li key={user._id} className={`list-group-item ${index === activeIndex ? 'active' : ''}`} onClick={() => updateActiveIndex(index)}>
                    <div className="col-5 user-name">{user.name}</div>
                    <div className="col-2 user-category">{user.email}</div>

                    <div className="col-1">
                        <i className="fa-solid fa-trash delete-icon mr-3" onClick={() => deleteUser(index, user._id)}></i>
                        <i className="fa-solid fa-pen modify-icon" onClick={() => modifyUser(index, user._id)}></i>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
