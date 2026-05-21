import { Col, Row } from 'antd'
import React from 'react'

const ChangePassword = () => {
  return (
    <>
        <Row>
            <Col offset={8} span={8}>
                <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray', marginTop: 50 }}>
                    <h2 style={{ textAlign: 'center' }}>Change Password</h2>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
                        <input type="password" placeholder='Current Password' style={{ padding: 10, borderRadius: 5, borderColor: 'lightgray', borderWidth: 0.5 }} />
                        <input type="password" placeholder='New Password' style={{ padding: 10, borderRadius: 5, borderColor: 'lightgray', borderWidth: 0.5 }} />
                        <input type="password" placeholder='Confirm New Password' style={{ padding: 10, borderRadius: 5, borderColor: 'lightgray', borderWidth: 0.5 }} />
                        <button type='submit' style={{ padding: 10, borderRadius: 5, backgroundColor: '#1890ff', color: 'white', border: 'none' }}>Change Password</button>
                    </form>
                </div>
            </Col>
        </Row>
    </>
  )
}

export default ChangePassword