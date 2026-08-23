import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router';

const ApprovedTcr = ({ approvedItems }) => {

    const navigate = useNavigate();

    const columns = [
        {
            title: 'TCR No',
            dataIndex: 'tcrNo',
            key: 'tcrNo',
        },
        {
            title: 'Date',
            dataIndex: 'incidentDate',
            key: 'incidentDate',
            render: (val => {
                return new Date(val).toLocaleDateString();
            })
        },
        {
            title: 'Station Name',
            dataIndex: 'stationName',
            key: 'stationName',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (value) => {
                return (
                    <Tag variant='solid' color='green'>APPROVED</Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (val, record) => {
                return (
                    <Button type='primary' onClick={() => {navigate(`/review/${record?.id}`)}}>View Details <FontAwesomeIcon icon={faEye} /></Button>
                )
            }
        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={approvedItems} />
        </>
    )
}

export default ApprovedTcr