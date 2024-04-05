import React from 'react';
import './assets/footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container text-center">
                <div className="row align-items-end">
                    <div className="col">
                        <h3>DỊCH VỤ</h3>
                        <ul>
                            <li><a href="#">Điều khoản sử dụng</a></li>
                            <li><a href="#">Chính sách bảo mật thông tin cá nhân</a></li>
                            <li><a href="#">Chính sách bảo mật thanh toán</a></li>
                            <li><a href="#">Giới thiệu Fahasa</a></li>
                            <li><a href="#">Hệ thống trung tâm - nhà sách</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>HỖ TRỢ</h3>
                        <ul>
                            <li><a href="#">Chính sách đổi - trả - hoàn tiền</a></li>
                            <li><a href="#">Chính sách bảo hành - bồi hoàn</a></li>
                            <li><a href="#">Chính sách vận chuyển</a></li>
                            <li><a href="#">Chính sách khách sỉ</a></li>
                            <li><a href="#">Phương thức thanh toán và xuất HĐ</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>TÀI KHOẢN CỦA TÔI</h3>
                        <ul>
                            <li><a href="#">Đăng nhập/Tạo mới tài khoản</a></li>
                            <li><a href="#">Thay đổi địa chỉ khách hàng</a></li>
                            <li><a href="#">Chi tiết tài khoản</a></li>
                            <li><a href="#">Lịch sử mua hàng</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Theo dõi fanpage</h3>
                        <ul>
                            <li><a href="#" target="_blank"><i className="fab fa-facebook"></i> Facebook</a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-youtube"></i> YouTube</a></li>
                            <li><a href="#" target="_blank"><i className="fab fa-google"></i> Google</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
