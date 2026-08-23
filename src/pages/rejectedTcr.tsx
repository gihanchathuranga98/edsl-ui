import { faEye, faPencil } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, Table, Tag } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router';

const RejectedTcr = ({ rejectedItems }) => {

    console.log('rejected items', rejectedItems);


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
                    <Tag variant='solid' color='red'>REJECTED</Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (val, record) => {
                return (
                    <Flex gap={5}>
                        <Button type='primary' onClick={() => { navigate(`/review/${record?.id}`) }}>View Details <FontAwesomeIcon icon={faEye} /></Button>
                        <Button type='primary' onClick={() => { navigate(`/update-tcr/${record?.id}`) }}>Update TCR <FontAwesomeIcon icon={faPencil} /></Button>
                    </Flex>
                )
            }
        }
    ];

    return (
        <>
            <Table columns={columns} dataSource={rejectedItems} />
        </>
    )
}

export default RejectedTcr