import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Table, Tag } from 'antd'
import React from 'react'

const ApprovedTcr = () => {

    const dummyData = [
        {
            key: '1',
            tcrNo: 'TCR-001',
            incidentDate: '2024-06-01',
            stationName: 'Central Police Station',
            status: 'Approved'
        },
        {
            key: '2',
            tcrNo: 'TCR-002',
            incidentDate: '2024-06-02',
            stationName: 'North Police Station',
            status: 'Approved'
        },
        {
            key: '3',
            tcrNo: 'TCR-003',
            incidentDate: '2024-06-03',
            stationName: 'East Police Station',
            status: 'Approved'
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
                    <Tag variant='solid' color='green'>{value}</Tag>
                )
             }
        },
        {
            title: 'Action',
            key: 'action',
             render: () => {
                return (
                    <Button type='primary'>View Details <FontAwesomeIcon icon={faEye}/></Button>
                )
             }
        }
    ]; 

  return (
    <>
        <Table columns={columns} dataSource={dummyData}/>
    </>
  )
}

export default ApprovedTcr