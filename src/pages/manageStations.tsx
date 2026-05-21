import { faEraser, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Flex, Form, Input, Modal, Row, Table, Tooltip } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { StationService } from '../services/station.service'
import { useForm } from 'antd/es/form/Form'
import { AuthContext } from '../contexts/auth.context'

const ManageStations = () => {

    const [form] = useForm();
    const { showAlert } = useContext(AuthContext)
    const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const [stations, setStations] = useState<any[]>([]);

    const stationService = new StationService();

    const dummyData = [
        {
            key: '1',
            stationNo: '001',
            stationName: 'Central Police Station',
            stationAddress: '123 Main St, Cityville',
        },
        {
            key: '2',
            stationNo: '002',
            stationName: 'North Police Station',
            stationAddress: '456 North Ave, Cityville',
        },
        {
            key: '3',
            stationNo: '003',
            stationName: 'East Police Station',
            stationAddress: '789 East Blvd, Cityville',
        },
    ]

    const columns = [
        {
            title: 'Station Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Station Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Station Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Action',
            key: 'action',
            render: (value: any, record: any) => (
                <Flex gap={10} justify='center'>
                    <Tooltip title="Edit">
                        <Button size='small' shape='circle' type='text'><FontAwesomeIcon icon={faPen} /></Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <Button onClick={() => handleStationDelete(record?.id)} size='small' shape='circle' type='text' danger><FontAwesomeIcon icon={faTrash} /></Button>
                    </Tooltip>
                </Flex>
            ),
        }
    ];

    const handleStationDelete = (stationId: string) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this station?',
            okText: 'Delete',
            onOk: () => {
                stationService.removeStation(stationId)
                    .then(data => {
                        showAlert.success('Station Has Been Removed Successfully')
                        fetchAllStations();
                    })
                    .catch();
            }
        })
    }


    const fetchAllStations = () => {
        stationService.getAllStations()
            .then((data) => {
                setStations(data);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchAllStations()
    }, [])

    const handleStationCreate = (data: { code: string; name: string; address: string }) => {
        setIsFormSubmitting(true);
        stationService.createNewStation(data)
            .then((data) => {
                showAlert.success("Station Created Successfully");
                form.resetFields();
            })
            .catch()
            .finally(() => {
                fetchAllStations();
                setIsFormSubmitting(false)
            })
    }



    return (
        <>
            <Row gutter={[15, 15]}>
                <Col span={6}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>

                        <Form onFinish={handleStationCreate} form={form} layout='vertical'>
                            <Form.Item rules={[{ required: true, message: 'This field is required' }]} label="Station Code" name="code">
                                <Input />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'This field is required' }]} label="Station Name" name="name">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Station Address" name="address">
                                <Input.TextArea rows={3} />
                            </Form.Item>
                            <Flex justify='end' gap={10}>
                                <Button><FontAwesomeIcon icon={faEraser} />Clear</Button>
                                <Button loading={isFormSubmitting} htmlType='submit' type='primary'><FontAwesomeIcon icon={faPlus} />Add Station</Button>
                            </Flex>
                        </Form>
                    </div>
                </Col>
                <Col span={18}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <Table columns={columns} dataSource={stations} />
                    </div>
                </Col>

            </Row>
        </>
    )
}

export default ManageStations