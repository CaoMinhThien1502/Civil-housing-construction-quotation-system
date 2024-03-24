import React from 'react';
import logo from '../../img/homepage/logoSystem.jpg'
import './bill.css'
import { FaBlackTie } from 'react-icons/fa';
const Invoice = ({items}) => {
    return (
        <div className='invoice-container'>
        <div className="bg-white rounded-lg shadow-lg px-1 py-1 mt-4 max-w-md mx-auto my-custom-form-size">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <img className="h-12 w-12 mr-2" src={logo} alt="Logo" />
                    <div className="text-gray-700 font-semibold text-lg">CHCQS</div>
                </div>
                <div className="text-gray-700 mt-2">
                    <div className="font-bold text-xl mb-2">INVOICE</div>
                    <div className="text-sm">Date: 01/05/2023</div>
                    <div className="text-sm">Invoice #: INV12345</div>
                </div>
            </div>
            <table className="w-full text-left mb-2">
                <thead>
                    <tr>
                        <th className="text-gray-700 font-bold uppercase py-2">Name</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Quantity</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Price</th>
                        <th className="text-gray-700 font-bold uppercase py-2">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item)=>
                    <tr key={item.id}>
                        <td className="py-2 text-gray-700">{item.name}</td>
                        <td className="py-2 text-gray-700">{item.quantity}</td>
                        <td className="py-2 text-gray-700">$100.00</td>
                        <td className="py-2 text-gray-700">$100.00</td>
                    </tr>
                    )}
                </tbody>
            </table>
            {/* <div className="flex justify-end mb-2">
                <div className="text-gray-700 mr-2">Subtotal:</div>
                <div className="text-gray-700">$425.00</div>
            </div>
            <div className="flex justify-end mb-2">
                <div className="text-gray-700 mr-3">Tax:</div>
                <div className="text-gray-700 mr-0">$25.50</div>
            </div> */}
            <div className="flex justify-end mb-2 mr-10">
                <div className="text-gray-700 mr-2">Total:</div>
                <div className="text-gray-700 font-bold text-xl">$450.50</div>
            </div>
            <div className="flex justify-center">
                    <input 
                    type="button" 
                    className="btn-checkout" 
                    value='Deposit'
                    /> 
                </div>
            <div className="border-t-2 border-gray-300 pt-2 mb-2">
                {/* <div className="text-gray-700 mb-2">1.Bill chỉ mang tính tham khảo</div> */}
                <div className="text-gray-700 mb-2">1.Giá có thể lệch so với thực tế 5-10%</div>
                <div className="text-gray-700 mb-2">2.Giá trên chưa bao gồm VAT(GTGT)</div>
                <div className="text-gray-700 mb-2">3.Bạn cần đặt cọc 200.000đ nếu muốn có 1 cuộc hẹn</div>
                {/* <div className="text-gray-700">123 Main St., Anytown, USA 12345</div> */}
            </div>
        </div>
        </div>
    );
};

export default Invoice;
