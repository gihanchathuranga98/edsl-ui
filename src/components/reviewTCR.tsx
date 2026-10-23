import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Flex, Row } from 'antd'
import React from 'react'
import { TcrStep } from '../pages/createTCR'
import { useNavigate } from 'react-router'

const ReviewTCR = ({ caseDetails, setStep, stations, detectingOfficers, informantOfficers, detectingOfficeFund, informantFund, totalCaseAmount, prosecutingOfficers, prosecutingOfficerFund, otherOfficers, otherOfficerFund, nonParticipationOfficers, nonParticipantOfficerFund, handleTcrCreate }) => {
    const navigate = useNavigate();

    const calculateOfficerReward = (
        officer: { fund?: number | string },
        categoryOfficers: { fund?: number | string; isEditable?: boolean }[],
        categoryPercentage: number,
    ) => {
        const totalDesignationFunds = categoryOfficers
            .filter(item => !item.isEditable)
            .reduce((total, item) => total + Number(item.fund), 0);
        const categoryFund = totalCaseAmount * categoryPercentage / 100;

        return (categoryFund * Number(officer.fund) / totalDesignationFunds).toFixed(2);
    }

    const submitTcr = async () => {
        try {
            await handleTcrCreate();
            navigate('/manage-tcr');
        } catch {
            // The create page displays the request error.
        }
    }
    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col offset={1} span={22}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <h3>TCR Details</h3>
                        <div style={{ marginBottom: 5 }}>Case No: {caseDetails?.caseNo}</div>
                        <div style={{ marginBottom: 5 }}>Leading Station: {stations.find(s => s.id === caseDetails?.leadingStation)?.name}</div>
                        <div style={{ marginBottom: 5 }}>Date of Incident: {new Date(caseDetails?.date).toLocaleDateString()}</div>
                        <div>Total Case Amount: LKR {Number(caseDetails?.totalCaseAmount).toFixed(2)}</div>
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
                                    detectingOfficers.map((officer, index) => {
                                        if (officer.officerNumber) {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerNumber}</td>
                                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerName}</td>
                                                    <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation}</td>
                                                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {calculateOfficerReward(officer, detectingOfficers, detectingOfficeFund)}</td>
                                                </tr>
                                            )
                                        } else {
                                            return null
                                        }
                                    })
                                }
                                <tr>
                                    <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                    <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {Number(totalCaseAmount * detectingOfficeFund / 100).toFixed(2)}</td>
                                </tr>

                            </tbody>
                        </table>
                        {
                            informantOfficers.length > 1 && (
                                <>
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
                                                informantOfficers.map((officer, index) => {
                                                    if (officer.officerNumber) {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerNumber}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerName}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {calculateOfficerReward(officer, informantOfficers, informantFund)}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })
                                            }
                                            <tr>
                                                <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {Number(totalCaseAmount * informantFund / 100).toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </>
                            )
                        }
                        {
                            prosecutingOfficers.length > 1 && (
                                <>
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
                                                prosecutingOfficers.map((officer, index) => {
                                                    if (officer.officerNumber) {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerNumber}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerName}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {calculateOfficerReward(officer, prosecutingOfficers, prosecutingOfficerFund)}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })
                                            }
                                            <tr>
                                                <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {Number(totalCaseAmount * prosecutingOfficerFund / 100).toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </>
                            )
                        }
                        {
                            otherOfficers.length > 1 && (
                                <>
                                    <h3>Other Participant Officer Details</h3>
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
                                                otherOfficers.map((officer, index) => {
                                                    if (officer.officerNumber) {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerNumber}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerName}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {calculateOfficerReward(officer, otherOfficers, otherOfficerFund)}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })
                                            }
                                            <tr>
                                                <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {Number(totalCaseAmount * otherOfficerFund / 100).toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </>
                            )
                        }
                        {
                            nonParticipationOfficers.length > 1 && (
                                <>
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
                                                nonParticipationOfficers.map((officer, index) => {
                                                    if (officer.officerNumber) {
                                                        return (
                                                            <tr key={index}>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerNumber}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.officerName}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8 }}>{officer.designation}</td>
                                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right' }}>LKR {calculateOfficerReward(officer, nonParticipationOfficers, nonParticipantOfficerFund)}</td>
                                                            </tr>
                                                        )
                                                    } else {
                                                        return null
                                                    }
                                                })
                                            }
                                            <tr>
                                                <td colSpan={3} style={{ border: '1px solid #ddd', padding: 8, fontWeight: 'bold' }}>Total Reward</td>
                                                <td style={{ border: '1px solid #ddd', padding: 8, textAlign: 'right', fontWeight: 'bold' }}>LKR {Number(totalCaseAmount * nonParticipantOfficerFund / 100).toFixed(2)}</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </>
                            )
                        }
                        <Flex gap={10} justify='end' style={{ marginTop: 20 }}>
                            <Button onClick={() => { setStep(TcrStep.OFFICER_DETAILS) }}><FontAwesomeIcon icon={faArrowLeft} />Back</Button>
                            <Button type='primary' onClick={submitTcr}><FontAwesomeIcon icon={faCheck} />Submit TCR</Button>
                        </Flex>
                    </div>
                </Col>
            </Row >
        </>
    )
}

export default ReviewTCR