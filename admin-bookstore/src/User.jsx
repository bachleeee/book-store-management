import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import UserCard from '@/components/UserCard';
import UserList from './components/UserList';
import UserService from './service/user.service';

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        retrieveUsers();
    }, []);

    useEffect(() => {
        setActiveIndex(-1);
    }, [searchText]);

    const soluong = users.reduce((total, user) => total + user.quantity, 0);

    const userStrings = users.map((user) => {
        const { name, category, description, price, quantity, img } = user;
        return [name, category, description, price, quantity, img].join("");
    });

    const filteredUsers = !searchText ? users : users.filter((_user, index) =>
        userStrings[index].includes(searchText)
    );

    const activeUser = activeIndex < 0 ? null : filteredUsers[activeIndex];
    const filteredUsersCount = filteredUsers.length;

    const retrieveUsers = async () => {
        try {
            const fetchedUsers = await UserService.getAll();
            setUsers(fetchedUsers);
            console.log(users)
        } catch (error) {
            console.log(error);
        }
    };

    const refreshList = () => {
        retrieveUsers();
        setActiveIndex(-1);
    };

    const removeAllUsers = async () => {
        if (window.confirm("Bạn muốn xóa tất cả sản phẩm?")) {
            try {
                await UserService.deleteAll();
                refreshList();
            } catch (error) {
                console.log(error);
            }
        }
    };

    const goToAddUser = () => {
        // Redirect to add user page
    };

    return (
        <div className="container">
            <div className="page row my-3">
                <div className="col-md-12">
                    <h4 className="d-flex justify-content-center">
                        Danh sách người dùng
                        <i className="fa-solid fa-book"></i>
                    </h4>

                    <div className="d-flex justify-content-center mb-3">
                        <div className="col-5"><strong>Tên </strong></div>
                        <div className="col-2 mr-4"><strong>Email</strong></div>
                        <div className="col-1">
                            <button className="btn btn-sm btn-success" onClick={goToAddUser}>
                                <i className="fas fa-plus"></i> Thêm
                            </button>
                        </div>
                    </div>

                    <UserList users={filteredUsers} activeIndex={activeIndex} />

                    <p>{filteredUsersCount > 0 ? 'Không có sản phẩm.' : null}</p>

                    <div className="m-3 d-flex justify-content-around">
                        <button className="btn btn-sm btn-primary" onClick={refreshList}>
                            <i className="fa-solid fa-arrow-right fa-rotate-180"></i>
                        </button>
                        <div>
                            <h3>{filteredUsersCount} /10</h3>
                        </div>
                        <button className="btn btn-sm btn-primary">
                            <i className="fa-solid fa-arrow-right"></i>
                        </button>
                    </div>

                    <div className="mt-3 row justify-content-around align-items-center">
                        <button className="btn btn-sm btn-primary" onClick={refreshList}>
                            <i className="fas fa-redo"></i> Làm mới
                        </button>

                        <button className="btn btn-sm btn-danger" onClick={removeAllUsers}>
                            <i className="fas fa-trash"></i> Xóa tất cả
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserPage;
