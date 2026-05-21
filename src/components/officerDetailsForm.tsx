import { faArrowLeft, faCheck, faClipboardList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Divider, Flex, Form, Input, Row, Table } from 'antd'
import React from 'react'
import { TcrStep } from '../pages/createTCR'

const OfficerDetailsForm = ({setStep}) => {

    const detectingOfficersColumns = [
        {
            title: 'Officer Number',
            dataIndex: 'officerNumber',
            key: 'officerNumber',
            render: (text: string, record: any) => {
                if (record.isEditable) {
                    return <Form.Item name={`officerNumber`} rules={[{ required: true, message: 'Officer Number is required' }]}>
                        <Input suffix={<Button type='primary' size='small'><FontAwesomeIcon icon={faCheck} /></Button>} placeholder='Enter Officer Number' />
                    </Form.Item>
                }
                return text;
            }
        },
        {
            title: 'Officer Full Name',
            dataIndex: 'officerName',
            key: 'officerName',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Station',
            dataIndex: 'station',
            key: 'station',
        },
        {
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
        }
    ]

    const dummyData = [
        {
            key: '1',
            officerNumber: '12345',
            officerName: 'John Doe',
            designation: 'Sergeant',
            station: 'Central Police Station',
            reward: '₹50,000',
            isEditable: false,
        },
        {
            key: '2',
            officerNumber: '67890',
            officerName: 'Jane Smith',
            designation: 'Inspector',
            station: 'North Police Station',
            reward: '₹75,000',
            isEditable: false,
        },
        {
            key: '3',
            officerNumber: '54321',
            officerName: 'Michael Johnson',
            designation: 'Constable',
            station: 'East Police Station',
            reward: '₹25,000',
            isEditable: false,
        },
        {
            key: Date.now().toString(),
            officerNumber: '',
            officerName: '',
            designation: '',
            station: '',
            reward: '',
            isEditable: true,
        }
    ]

    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col offset={1} span={22}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <h3 style={{ marginTop: 0 }}>Detecting Officers Details</h3>
                        <Table bordered columns={detectingOfficersColumns} dataSource={dummyData} pagination={false} />
                        <Divider />
                        <h3>Informant Details</h3>
                        <Table bordered columns={detectingOfficersColumns} dataSource={dummyData} pagination={false} />
                        <Divider />
                        <h3>Other Officers</h3>
                        <Table bordered columns={detectingOfficersColumns} dataSource={dummyData} pagination={false} />
                        <Divider />
                        <h3>Other Officers</h3>
                        <Table bordered columns={detectingOfficersColumns} dataSource={dummyData} pagination={false} />
                        <Divider />
                        <h3>Other Officers</h3>
                        <Table bordered columns={detectingOfficersColumns} dataSource={dummyData} pagination={false} />
                        <Flex justify='flex-end' gap={10} style={{ marginTop: 20 }}>
                            <Button><FontAwesomeIcon icon={faArrowLeft} /> Back</Button>
                            <Button onClick={() => {setStep(TcrStep.REVIEW)}} type='primary'><FontAwesomeIcon icon={faClipboardList} /> Review</Button>
                        </Flex>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default OfficerDetailsForm