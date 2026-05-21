import { faEraser, faKey, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Flex, Form, Input, Modal, Row, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import Permissions from '../components/permissions'
import { UserService } from '../services/user.service'
import { useForm } from 'antd/es/form/Form'

const ManageSystemUsers = () => {

    const [isPermissionsOpen, setIsPermissionsOpen] = React.useState(false);
    const [systemUsers, setSystemUsers] = useState<any[]>([]);

    const userServie = new UserService();

    const [form] = useForm();

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            render: (value: any, record: any) => {
                return (
                    <Flex gap={10} justify='center'>
                        {/* <Button size='small' shape='circle' type='text'><FontAwesomeIcon icon={faPen} /></Button> */}
                        <Button size='small' shape='circle' type='text' style={{ color: 'blue' }}><FontAwesomeIcon icon={faKey} /></Button>
                        <Button size='small' shape='circle' type='text' danger onClick={() => { handleSystemUserDelete(record?.id) }}><FontAwesomeIcon icon={faTrash} /></Button>
                    </Flex>
                )
            }
        }
    ]

    const handleSystemUserDelete = (userId: string) => {
        Modal.confirm({
            title: 'Confirm Deletion',
            content: 'Are you sure you want to delete this user?',
            okText: 'Delete',
            onOk: () => {
                userServie.removeSystemUser(userId)
                    .then(data => {
                        fetchAllSystemUsers();
                    })
            }
        })

    }

    const fetchAllSystemUsers = () => {
        userServie.fetchAllSystemUsers()
            .then((res) => {
                setSystemUsers(res);
            })
            .catch(() => {
                // alert('error')
            })

    }

    const createNewUser = (data: any) => {
        userServie.createNewSystemUser(data)
        .then((data) => {
            form.resetFields();
        })
        .finally(() => {
            fetchAllSystemUsers();
        });
    }

    useEffect(() => {
        fetchAllSystemUsers();
    }, [])

    return (
        <>
            <Form form={form} onFinish={createNewUser} layout='vertical'>
                <Row gutter={[15, 15]}>
                    <Col span={8}>
                        <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                            <Form.Item label="Full Name" name="name">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Email" name="email">
                                <Input />
                            </Form.Item>
                            <Form.Item label="Password" name="password">
                                <Input type='password' />
                            </Form.Item>
                            <Flex justify='space-between' align='center' style={{ border: '0.5px solid lightgray', borderRadius: 10, padding: 10 }}>
                                <span>Setup Permissions</span>
                                <Button onClick={() => { setIsPermissionsOpen(true) }}>Set Permissions</Button>
                            </Flex>
                            <Flex justify='flex-end' gap={10} style={{ marginTop: 20 }}>
                                <Button><FontAwesomeIcon icon={faEraser} />Clear</Button>
                                <Button type='primary'><FontAwesomeIcon icon={faPlus} />Add User</Button>
                            </Flex>
                        </div>
                    </Col>
                    <Col span={16}>
                        <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                            <Table dataSource={systemUsers} columns={columns} />
                        </div>
                    </Col>
                </Row>
            </Form>
            <Permissions onClose={() => { setIsPermissionsOpen(false) }} open={isPermissionsOpen} />
        </>
    )
}

export default ManageSystemUsers