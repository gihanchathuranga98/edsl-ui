import { faFileCircleCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Flex, Table, Tag } from 'antd';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/auth.context';

const PendingTcr = ({ pendingItems, handleTcrDelete }) => {

    const navigate = useNavigate();
    const { permissions } = useContext(AuthContext);

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
            render: (value) => {
                return new Date(value).toLocaleDateString();
            }
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
                    <Tag variant='solid' color='orange'>PENDING</Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (value, record) => {
                return (
                    <Flex gap={5}>
                        <Button disabled={!permissions.includes('tcr:view') } type='primary' onClick={() => { navigate(`/review/${record.id}`) }}>Review TCR <FontAwesomeIcon icon={faFileCircleCheck} /></Button>
                        <Button onClick={() => {handleTcrDelete(record.id)}} danger type='primary'><FontAwesomeIcon icon={faTrash}/>Delete TCR</Button>
                    </Flex>
                )
            }
        }
    ]

    return (
        <>
            <Table columns={columns} dataSource={pendingItems} />
        </>
    )
}

export default PendingTcr;