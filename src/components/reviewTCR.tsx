import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Flex, Row } from 'antd'
import React from 'react'

const ReviewTCR = () => {
    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col offset={1} span={22}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <h3>TCR Details</h3>
                        <div style={{ marginBottom: 5 }}>TCR No: 12345</div>
                        <div style={{ marginBottom: 5 }}>Case No: 54321</div>
                        <div style={{ marginBottom: 5 }}>Leading Station: Central Police Station</div>
                        <div style={{ marginBottom: 5 }}>Date of Incident: 2024-01-01</div>
                        <div>Total Case Amount: LKR 1,000,000.00</div>
                        <h3>Informant Details</h3>
                        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Officer No</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Officer Full Name</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Designation</th>
                                    <th style={{ border: '1px solid #ddd', padding: 8, textAlign: 'left' }}>Reward</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>OF-001</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>John Doe</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Police Officer</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>LKR 50,000.00</td>
                                </tr>   
                                <tr>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>OF-002</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Jane Smith</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Sergeant</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>LKR 30,000.00</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>OF-003</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Kamal Perera</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Inspector</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>LKR 75,000.00</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>OF-004</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Nadeesha Fernando</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Constable</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>LKR 10,000.00</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>OF-005</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Ruwan Silva</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Detective</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>LKR 120,000.00</td>
                                </tr>
                                <tr>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>OF-006</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Maya Jayasinghe</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>Inspector</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>LKR 40,000.00</td>
                                </tr>
                            </tbody>
                        </table>
                        <Flex gap={10} justify='end' style={{ marginTop: 20 }}>
                            <Button><FontAwesomeIcon icon={faArrowLeft}/>Back</Button>
                            <Button type='primary'><FontAwesomeIcon icon={faCheck}/>Submit TCR</Button>
                        </Flex>
                    </div>
                </Col>
            </Row >
        </>
    )
}

export default ReviewTCR