import { Col, Row } from 'antd'
import React, { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'
import { UserService } from '../services/user.service';
import { useNavigate } from 'react-router';

const ChangePassword = () => {

    const { showAlert } = useContext(AuthContext);
    const userService = new UserService();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const oldPass = event.target.oldPass.value;
        const newPass = event.target.newPass.value;
        const confirmPass = event.target.confirmPass.value;

        if (newPass !== confirmPass) {
            showAlert.error('New passwords do not match!')
        } else {
            userService.changePassword({ oldPassword: oldPass, newPassword: newPass })
                .then(data => {
                    showAlert.success('Password changed successfully!')
                    navigate('/manage-tcr');
                })
                .catch(error => {
                    showAlert.error('Failed to change password!');
                });
        }
    }

    return (
        <>
            <Row>
                <Col offset={8} span={8}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray', marginTop: 50 }}>
                        <h2 style={{ textAlign: 'center' }}>Change Password</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
                            <input name="oldPass" type="password" placeholder='Current Password' style={{ padding: 10, borderRadius: 5, borderColor: 'lightgray', borderWidth: 0.5 }} />
                            <input name="newPass" type="password" placeholder='New Password' style={{ padding: 10, borderRadius: 5, borderColor: 'lightgray', borderWidth: 0.5 }} />
                            <input name="confirmPass" type="password" placeholder='Confirm New Password' style={{ padding: 10, borderRadius: 5, borderColor: 'lightgray', borderWidth: 0.5 }} />
                            <button type='submit' style={{ padding: 10, borderRadius: 5, backgroundColor: '#1890ff', color: 'white', border: 'none' }}>Change Password</button>
                        </form>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ChangePassword