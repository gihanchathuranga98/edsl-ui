import { Button, Col, Divider, Flex, Form, Input, InputNumber, Row, Select, Table, Tooltip } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useContext, useEffect, useState } from 'react'
import Sidenav from '../components/sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingCircleArrowRight, faEdit, faEraser, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Permissions from '../components/permissions';
import AssignStation from '../components/assignStation';
import { UserService } from '../services/user.service';
import { StationService } from '../services/station.service';
import { AuthContext } from '../contexts/auth.context';

const ManageOfficers = () => {

    const [form] = useForm();
    const { showAlert } = useContext(AuthContext);

    const [openAssignStation, setOpenAssignStation] = useState(false);
    const [designations, setDesignations] = useState<any[]>([]);
    const [stations, setStations] = useState<any[]>([]);
    const [officers, setOfficers] = useState<any[]>([]);
    const [selectedOfficer, setSelectedOfficer] = useState<string>();

    const userService = new UserService();
    const stationService = new StationService();

    const fetchDesignations = () => {
        userService.fetchAllDesignations()
            .then(data => {
                setDesignations(data);
            })
            .catch(error => { });
    }

    const fetchStations = () => {
        stationService.getAllStations()
            .then(data => {
                setStations(data);
            })
            .catch(error => { })
    }

    useEffect(() => {
        Promise.all([fetchDesignations(), fetchStations()])
    }, [])

    const columns = [
        {
            title: 'Officer Number',
            dataIndex: 'officerNumber',
            key: 'officerNumber',
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
            title: 'Basic Salary (LKR)',
            dataIndex: 'basicSalary',
            key: 'basicSalary',
            align: 'right' as const,
            render: (value: number | string) => Number(value).toLocaleString('en-LK', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }),
        },
        {
            title: 'Action',
            key: 'action',
            render: (val, record) => {
                console.log('record ===>', record);
                
                return (
                    <Flex gap={10}>
                        {/* <Tooltip title="Edit">
                            <Button size='small' shape='circle' type='text'><FontAwesomeIcon icon={faPen} /></Button>
                        </Tooltip> */}
                        <Tooltip title="Delete">
                            <Button size='small' shape='circle' type='text' danger><FontAwesomeIcon icon={faTrash} /></Button>
                        </Tooltip>
                        <Tooltip title="Assign Station">
                            <Button onClick={() => { setSelectedOfficer(record?.id); setOpenAssignStation(true) }} size='small' shape='circle' type='text' style={{ color: 'blue' }}><FontAwesomeIcon icon={faBuildingCircleArrowRight} /></Button>
                        </Tooltip>
                    </Flex>
                )
            },
        }

    ]

    const fetchAllOfficers = () => {
        userService.fetchAllOfficers()
            .then(data => {
                setOfficers(data);
            })
            .catch(error => { })
    }

    useEffect(() => {
        fetchAllOfficers();
    }, [])

    const handleFormSubmit = (data: any) => {
        userService.createOfficer({ code: data.officerNumber, name: data.officerName, stationId: data?.station, designationId: data.designation, basicSalary: data.basicSalary })
            .then(data => {
                form.resetFields();
                showAlert.success('New officer has been created successfully')
            })
            .finally(() => {
                fetchAllOfficers();
            })
    }

    return (
        <>
            <AssignStation onStationChange={() => {showAlert.success('Station has been changed successfully'); fetchAllOfficers();}} selectedOfficer={selectedOfficer} onClose={() => { setOpenAssignStation(false) }} open={openAssignStation} />
            <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
                <Row gutter={[15, 15]}>
                    <Col span={6}>
                        <Form.Item label="Officer Number" name="officerNumber" rules={[{ required: true, message: 'Officer number is required' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Officer Full Name" name="officerName" rules={[{ required: true, message: 'Officer full name is required' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Designation" name="designation" rules={[{ required: true, message: 'Designation is required' }]}>
                            <Select options={designations.map(d => ({ value: d.id, label: d.designation }))} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Station" name="station" rules={[{ required: true, message: 'Station is required' }]}>
                            <Select options={stations.map(s => ({ value: s.id, label: `${s.code} - ${s.name}` }))} />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="Basic Salary (LKR)" name="basicSalary" rules={[{ required: true, message: 'Basic salary is required' }]}>
                            <InputNumber min={0} precision={2} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Flex justify='flex-end' gap={10}>
                    <Button><FontAwesomeIcon icon={faEraser} /> Clear</Button>
                    <Button htmlType='submit' type='primary'><FontAwesomeIcon icon={faPlus} />Add Officer</Button>
                </Flex>
            </Form>
            <Divider />
            <Table columns={columns} dataSource={officers.map(o => ({ id: o?.id, officerName: o?.name, officerNumber: o?.code, designation: o?.designation?.designation, station: `${o?.stations[0].station?.code} - ${o?.stations[0]?.station?.name}`, basicSalary: o?.basicSalary }))} />
        </>
    )
}

export default ManageOfficers
