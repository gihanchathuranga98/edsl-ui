import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Flex, Row, Spin } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { TcrService } from '../services/tcr.service'
import { AuthContext } from '../contexts/auth.context'
import { useNavigate, useParams } from 'react-router'

const ReviewTcr = () => {

    const [tcrDetails, setTcrDetails] = useState<unknown>();
    const [isTcrLoading, setIsTcrLoading] = useState<boolean>(true);

    const { showAlert, permissions } = useContext(AuthContext);
    const params = useParams();
    const navigate = useNavigate();

    const tcrService = new TcrService();

    useEffect(() => {
        if (params.tcr === undefined) {
            showAlert.error('TCR ID is required')
            return;
        }
        tcrService.fetchTcrById(params.tcr)
            .then(data => {
                setTcrDetails(data);
            })
            .catch(error => {
                showAlert.error('Unable to fetch TCR details')
            })
            .finally(() => {
                setIsTcrLoading(false);
            })
    }, [])

    const approveTcr = (type: 'APPROVED' | 'REJECTED') => {
        tcrService.approveTcr(tcrDetails?.id, type)
            .then(data => {
                showAlert.success('TCR Approved Successfully');
                navigate('/manage-tcr');
            })
            .catch(error => {
                showAlert.error('Unable to approve the TCR')
            });
    }

    return (
        <>
            <Flex justify='space-between'>
                <Button variant='outlined' onClick={() => { navigate('/manage-tcr') }}><FontAwesomeIcon icon={faArrowLeft} />Go Back</Button>
                {
                    tcrDetails?.status === 'PENDING' && permissions.includes('tcr:approve') && (
                        <Flex gap={15}>
                            <Button style={{ width: 100 }} type='primary' onClick={() => { approveTcr('APPROVED'); }}>Approve</Button>
                            <Button style={{ width: 100 }} type='primary' onClick={() => { approveTcr('REJECTED'); }} danger>Reject</Button>
                        </Flex>
                    )
                }
            </Flex>
            {
                isTcrLoading && <Flex justify='center' style={{ marginTop: 40 }}><Spin description="Loading TCR Data" size='large' /></Flex>
            }
            
            {
                !isTcrLoading && (
                    <Row style={{ marginTop: 20 }}>
                        <Col offset={1} span={22}>
                            <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                                <h3>TCR Details</h3>
                                <div style={{ marginBottom: 5 }}><span style={{ fontWeight: 'bold' }}>Case No:</span> {tcrDetails?.tcrNo}</div>
                                <div style={{ marginBottom: 5 }}><span style={{ fontWeight: 'bold' }}>Leading Station:</span> {tcrDetails?.stationName}</div>
                                <div style={{ marginBottom: 5 }}><span style={{ fontWeight: 'bold' }}>Date of Incident:</span> {new Date(tcrDetails?.incidentDate).toLocaleDateString()}</div>
                                <div><span style={{ fontWeight: 'bold' }}>Total Case Amount:</span> LKR {Number(tcrDetails?.totalCaseAmount).toFixed(2)}</div>
                                <h3>Detecting Officer Details</h3>
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
                                        {
                                            tcrDetails?.detectingOfficers?.map((officer, index) => {
                                                console.log('detecting officer =', officer);

                                                return (
                                                    <tr key={index}>
                                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.code}</td>
                                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.name}</td>
                                                        <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation.designation}</td>
                                                        <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {(Number(tcrDetails?.detectingOfficerFund) / tcrDetails.detectingOfficers?.length).toFixed(2)}</td>
                                                    </tr>
                                                )

                                            })
                                        }
                                        <tr>
                                            <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                            <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {(Number(tcrDetails?.detectingOfficerFund)).toFixed(2)}</td>
                                        </tr>

                                    </tbody>
                                </table>
                                {
                                    tcrDetails?.informant?.length > 0 && (<>
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
                                                {
                                                    tcrDetails?.informant?.map((officer, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.code}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.name}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {(Number(tcrDetails?.informantFund) / tcrDetails.informant?.length).toFixed(2)}</td>
                                                            </tr>
                                                        )

                                                    })
                                                }
                                                <tr>
                                                    <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {(Number(tcrDetails?.informantFund)).toFixed(2)}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </>)
                                }
                                {
                                    tcrDetails?.prosecutingOfficers?.length > 0 && (<>
                                        <h3>Prosecuting Officer Details</h3>
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
                                                {
                                                    tcrDetails?.prosecutingOfficers?.map((officer, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.code}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.name}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {(Number(tcrDetails?.prosecutingOfficerFund) / tcrDetails.prosecutingOfficers?.length).toFixed(2)}</td>
                                                            </tr>
                                                        )

                                                    })
                                                }
                                                <tr>
                                                    <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {(Number(tcrDetails?.prosecutingOfficerFund)).toFixed(2)}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </>)
                                }
                                {
                                    tcrDetails?.participationOfficers?.length > 0 && (<>
                                        <h3>Participation Officer Details</h3>
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
                                                {
                                                    tcrDetails?.participationOfficers?.map((officer, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.code}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.name}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {(Number(tcrDetails?.participationOfficerFund) / tcrDetails.participationOfficers?.length).toFixed(2)}</td>
                                                            </tr>
                                                        )

                                                    })
                                                }
                                                <tr>
                                                    <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {(Number(tcrDetails?.participationOfficerFund)).toFixed(2)}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </>)
                                }
                                {
                                    tcrDetails?.others?.length > 0 && (<>
                                        <h3>Other Officer Details</h3>
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
                                                {
                                                    tcrDetails?.others?.map((officer, index) => {
                                                        const totalDesignationFunds = tcrDetails?.others?.map(o => o.designation?.fundShare).reduce((a: number, b: number) => a + b, 0);
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.code}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.name}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {(Number(tcrDetails?.nonParticipationOfficerFund) * officer?.designation?.fundShare / totalDesignationFunds).toFixed(2)}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                <tr>
                                                    <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {(Number(tcrDetails?.nonParticipationOfficerFund)).toFixed(2)}</td>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </>)
                                }
                            </div>
                        </Col>
                    </Row >
                )
            }
        </>
    )
}

export default ReviewTcr