import React from "react";
import { useParams } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './detail.css';
import betong from '../../img/detail1/bê tông.jpg'; 
import catda from '../../img/detail1/cát đá.jpg'; 
import daydien from '../../img/detail1/dây điện âm.jpg'; 
import gachxay from '../../img/detail1/gạch xây.jpg'; 
import maiton from '../../img/detail1/mái tôn.jpg'; 
import satthep from '../../img/detail1/sat-thep.jpg'; 
import ximang from '../../img/detail1/xi măng.jpg'; 
import cotpha from '../../img/detail1/cốt pha.jpg';
import chongtham from '../../img/detail1/chất chống thấm.jpg';
import ongnuoc from '../../img/detail1/ống nước.jpg';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const Detail = () => {
    if (id === '0') {
    return (
        <> 
            <div className="detail-container">
                <div className="detail-title">
                    <h2> Nguyên Vật Liệu Sử Dụng Trong Thi Công Thô</h2>
                </div>
                <div className="detail-img">
                    <span className="img-container">
                        <img src={ximang} alt="Xi măng" />
                        <span className="img-text">Xi măng</span>
                    </span>
                    <span className="img-container">
                        <img src={satthep} alt="Sắt Thép" />
                        <span className="img-text">Sắt thép</span>
                    </span>
                    <span className="img-container">
                        <img src={maiton} alt="Mái tôn" />
                        <span className="img-text">Mái tôn</span>
                    </span>
                    <span className="img-container">
                        <img src={gachxay} alt="Gạch Xây" />
                        <span className="img-text">Gạch Xây</span>
                    </span>
                    <span className="img-container">
                        <img src={daydien} alt="Dây điên" />
                        <span className="img-text">Dây điện</span>
                    </span>
                    <span className="img-container">
                        <img src={catda} alt="Cát đá" />
                        <span className="img-text">Cát đá</span>
                    </span>
                    <span className="img-container">
                        <img src={betong} alt="Bê tông" />
                        <span className="img-text">Bê tông</span>
                    </span>
                    <span className="img-container">
                        <img src={cotpha} alt="Cốt pha" />
                        <span className="img-text">Cốt pha</span>
                    </span>
                    <span className="img-container">
                        <img src={chongtham} alt="Chống thấm" />
                        <span className="img-text">Chất chống thấm</span>
                    </span>
                    <span className="img-container">
                        <img src={ongnuoc} alt="Ông nước" />
                        <span className="img-text">Ống nước</span>
                    </span>
                    
                    {/* Thêm các ảnh khác tương tự */}
                </div>
                <div className="back">
                <a href="/price?id=0" style={{marginTop: "10px"}}><i class="bi bi-arrow-bar-left"></i>Quay lại</a> 
                </div>
            </div>
        </>
    );
    }
    if (id === '1') {
    return (
        <>
              <> 
            <div className="detail-container">
                <div className="detail-title">
                    <h2> Nguyên Vật Liệu Sử Dụng Trong Thi Công Hoàn Thiện</h2>
                </div>
                <div className="detail-img">
                    <span className="img-container">
                        <img src={ximang} alt="Xi măng" />
                        <span className="img-text">Xi măng</span>
                    </span>
                    <span className="img-container">
                        <img src={satthep} alt="Sắt Thép" />
                        <span className="img-text">Sắt thép</span>
                    </span>
                    <span className="img-container">
                        <img src={maiton} alt="Mái tôn" />
                        <span className="img-text">Mái tôn</span>
                    </span>
                    <span className="img-container">
                        <img src={gachxay} alt="Gạch Xây" />
                        <span className="img-text">Gạch Xây</span>
                    </span>
                    <span className="img-container">
                        <img src={daydien} alt="Dây điên" />
                        <span className="img-text">Dây điện</span>
                    </span>
                    <span className="img-container">
                        <img src={catda} alt="Cát đá" />
                        <span className="img-text">Cát đá</span>
                    </span>
                    <span className="img-container">
                        <img src={betong} alt="Bê tông" />
                        <span className="img-text">Bê tông</span>
                    </span>
                    <span className="img-container">
                        <img src={cotpha} alt="Cốt pha" />
                        <span className="img-text">Cốt pha</span>
                    </span>
                    <span className="img-container">
                        <img src={chongtham} alt="Chống thấm" />
                        <span className="img-text">Chất chống thấm</span>
                    </span>
                    <span className="img-container">
                        <img src={ongnuoc} alt="Ông nước" />
                        <span className="img-text">Ống nước</span>
                    </span>
                    
                </div>
                <div className="back">
                <a href="/price?id=1" style={{marginTop: "10px"}}><i class="bi bi-arrow-bar-left"></i>Quay lại</a> 
                </div>
            </div>
        </>
        </>
        );
    }
    if (id === '2') {
        return (
            <>
                  <> 
                <div className="detail-container">
                    <div className="detail-title">
                        <h2> Nguyên Vật Liệu Sử Dụng Trong Thi Công Trọn Gói</h2>
                    </div>
                    <div className="detail-img">
                        <span className="img-container">
                            <img src={ximang} alt="Xi măng" />
                            <span className="img-text">Xi măng</span>
                        </span>
                        <span className="img-container">
                            <img src={satthep} alt="Sắt Thép" />
                            <span className="img-text">Sắt thép</span>
                        </span>
                        <span className="img-container">
                            <img src={maiton} alt="Mái tôn" />
                            <span className="img-text">Mái tôn</span>
                        </span>
                        <span className="img-container">
                            <img src={gachxay} alt="Gạch Xây" />
                            <span className="img-text">Gạch Xây</span>
                        </span>
                        <span className="img-container">
                            <img src={daydien} alt="Dây điên" />
                            <span className="img-text">Dây điện</span>
                        </span>
                        <span className="img-container">
                            <img src={catda} alt="Cát đá" />
                            <span className="img-text">Cát đá</span>
                        </span>
                        <span className="img-container">
                            <img src={betong} alt="Bê tông" />
                            <span className="img-text">Bê tông</span>
                        </span>
                        <span className="img-container">
                            <img src={cotpha} alt="Cốt pha" />
                            <span className="img-text">Cốt pha</span>
                        </span>
                        <span className="img-container">
                            <img src={chongtham} alt="Chống thấm" />
                            <span className="img-text">Chất chống thấm</span>
                        </span>
                        <span className="img-container">
                            <img src={ongnuoc} alt="Ông nước" />
                            <span className="img-text">Ống nước</span>
                        </span>
                        
                    </div>
                    <div className="back">
                    <a href="/price?id=2" style={{marginTop: "10px"}}><i class="bi bi-arrow-bar-left"></i>Quay lại</a> 
                    </div>
                </div>
            </>
            </>
            );
        }
};
export default Detail;
