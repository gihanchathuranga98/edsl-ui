import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { UserService } from '../services/user.service'

const ResetUserPasswords = () => {

    const [resetReq, setResetReq] = useState<any[]>([]);

    const userService = new UserService();

    const columns: any[] = [
        {
            title: 'Full Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'Requested At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (value: Date) => {
                return `${new Date(value).toLocaleDateString()} ${new Date(value).toLocaleTimeString()}`
            }
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            key: 'actions',
            width: 150,
            render: () => {
                return (
                    <Button onClick={handleReset} type='primary'><FontAwesomeIcon icon={faArrowRotateLeft} />Reset</Button>
                )
            }
        }
    ];

    const fetchAllPwRecoveryReq = () => {
        userService.getAllPasswordRecoveryRequests()
            .then(data => {
                setResetReq(data);
            })
            .catch(error => { })
    }

    useEffect(() => {
        fetchAllPwRecoveryReq();
    }, [])

    const handleReset = () => {
        Modal.confirm({
            title: 'Confirm Password Reset',
            content: 'Are you sure you want to reset the password for this user? This action cannot be undone.',
            okText: 'Yes, Reset',
            cancelText: 'No, Cancel',
            onOk: () => {
                // Handle password reset logic here
            }
        })
    }

    return (
        <>
            <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: '0 20px', borderColor: 'lightgray' }}>
                <h4>Reset User Passwords</h4>
                <Table columns={columns} dataSource={resetReq} />
            </div>
        </>
    )
}

export default ResetUserPasswords;