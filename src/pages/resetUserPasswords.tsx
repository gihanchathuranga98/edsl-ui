import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Input, Modal, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserService } from '../services/user.service'
import { AuthContext } from '../contexts/auth.context'

const ResetUserPasswords = () => {

    const [resetReq, setResetReq] = useState<any[]>([]);
    const [newPwd, setNewPwd] = useState();

    const userService = new UserService();

    const { showAlert } = useContext(AuthContext);

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
            render: (val, rec) => {
                return (
                    <Button onClick={() => { handleReset(rec?.requestId) }} type='primary'><FontAwesomeIcon icon={faArrowRotateLeft} />Reset</Button>
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

    const handleReset = (reqId: string) => {
        Modal.confirm({
            title: 'Confirm Password Reset',
            content: (<>
                Are you sure you want to reset the password for this user? This action cannot be undone.
                <Input style={{ width: '100%', marginTop: 5 }} onChange={(e) => { setNewPwd(e.target.value) }} placeholder='Enter new password' type='password' />
            </>),
            okText: 'Yes, Reset',
            cancelText: 'No, Cancel',
            onOk: () => {
                if (newPwd === null || newPwd === '') {
                    showAlert('New password is required')
                    return;
                }
                userService.resetOtherUserPwd(reqId, newPwd)
                    .then(data => {
                        fetchAllPwRecoveryReq();
                    })
                    .catch(error => {
                        console.log(error);
                    })
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