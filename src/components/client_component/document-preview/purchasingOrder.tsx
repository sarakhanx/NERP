'use client'

import React, { useEffect, useState } from 'react';
import './purchasingOrder.css'; // Assuming you have a CSS file for styling

const fakeData = {
    status: 'confirmed', // Change this to test different statuses
    archived: false,
    companyData: 'Fake Company Inc.',
    customerData: 'John Doe',
    documentIdentify: 'PO123456',
    date: '2023-10-01',
    saleOrder: 'SO123456',
    detail: 'This is a fake sale order detail.'
};

const PurchasingOrder = () => {
    const [status, setStatus] = useState('');
    const [archived, setArchived] = useState(false);
    const [companyData, setCompanyData] = useState('');
    const [customerData, setCustomerData] = useState('');
    const [documentIdentify, setDocumentIdentify] = useState('');
    const [date, setDate] = useState('');
    const [saleOrder, setSaleOrder] = useState('');
    const [detail, setDetail] = useState('');

    useEffect(() => {
        // Simulate fetching data from API
        setStatus(fakeData.status);
        setArchived(fakeData.archived);
        setCompanyData(fakeData.companyData);
        setCustomerData(fakeData.customerData);
        setDocumentIdentify(fakeData.documentIdentify);
        setDate(fakeData.date);
        setSaleOrder(fakeData.saleOrder);
        setDetail(fakeData.detail);
    }, []);

    return (
        <div className="purchasing-order">
            {/* Status Bar */}
            <div className="status-bar">
                {status === 'pending' && <span>Pending</span>}
                {status === 'waiting' && <span>Waiting</span>}
                {status === 'confirmed' && <span>Confirmed</span>}
                {status === 'success' && <span>Success</span>}
                {archived && <span>Archived</span>}
            </div>

            {/* A4 Layout */}
            <div className="a4-layout">
                {/* Header */}
                <div className="header">
                    <div>{companyData}</div>
                    <div>{customerData}</div>
                    <div>{documentIdentify}</div>
                    <div>{date}</div>
                </div>

                {/* Body */}
                <div className="body">
                    <div>{saleOrder}</div>
                    <div>{detail}</div>
                </div>

                {/* Footer */}
                <div className="footer">
                    <div className="signature-box">Signature 1</div>
                    <div className="signature-box">Signature 2</div>
                    <div className="signature-box">Signature 3</div>
                    <div>Note for the doc</div>
                </div>
            </div>
        </div>
    );
};

export default PurchasingOrder;
