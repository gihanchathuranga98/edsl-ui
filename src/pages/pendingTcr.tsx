import { faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, Tag } from 'antd';
import React from 'react'

const PendingTcr = () => {

    const dummyData = [
        {
            key: '1',
            tcrNo: 'TCR-001',
            incidentDate: '2024-06-01',
            stationName: 'Central Police Station',
            status: 'Pending Approval'
        },
        {
            key: '2',
            tcrNo: 'TCR-002',
            incidentDate: '2024-06-02',
            stationName: 'North Police Station',
            status: 'Pending Approval'
        },
        {
            key: '3',
            tcrNo: 'TCR-003',
            incidentDate: '2024-06-03',
            stationName: 'East Police Station',
            status: 'Pending Approval'
        },
    ];

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
                    <Tag variant='solid' color='orange'>{value}</Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
             render: () => {
                return (
                    <Button type='primary'>Review TCR <FontAwesomeIcon icon={faFileCircleCheck}/></Button>
                )
             }
        }
    ]

  return (
    <>
        <Table columns={columns} dataSource={dummyData} />
    </>
  )
}

export default PendingTcr;