import { faEraser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Flex, Form, Input, Row, Select, Table } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React, { useContext, useEffect, useState } from 'react'
import { UserService } from '../services/user.service';
import { AuthContext } from '../contexts/auth.context';

const ManageDesignations = () => {

    const [form] = useForm();
    const { showAlert } = useContext(AuthContext);

    const [designations, setDesignations] = useState<any[]>([]);

    const userService = new UserService();

    const handleFormSubmit = (data) => {
        userService.createNewDesignation(data)
            .then(res => {
                showAlert.success('New Designation Created Successfully');
                form.resetFields();
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => { fetchAllDesignations() })
    }

    const fetchAllDesignations = () => {
        userService.fetchAllDesignations()
            .then(res => {
                setDesignations(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchAllDesignations();
    }, [])

    const columns = [
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
        },
        {
            title: 'Fund Share (%)',
            key: 'fundShare',
            dataIndex: 'fundShare',
        }
    ]

    return (
        <>
            <Row gutter={[15, 15]}>
                <Col span={8}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <Form onFinish={handleFormSubmit} form={form} layout='vertical'>
                            <Form.Item label={'Designation Name'} name={'designation'}>
                                <Input />
                            </Form.Item>
                            <Form.Item label={'Fund Share'} name={'fundShare'}>
                                <Input suffix="%" />
                            </Form.Item>
                            <Flex gap={10} justify='flex-end'>
                                <Button><FontAwesomeIcon icon={faEraser} />Clear</Button>
                                <Button htmlType='submit' type='primary'><FontAwesomeIcon icon={faPlus} />Create</Button>
                            </Flex>
                        </Form>
                    </div>
                </Col>
                <Col span={16}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <Table columns={columns} dataSource={designations} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ManageDesignations