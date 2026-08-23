import { faArrowLeft, faCheck, faClipboardList, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Divider, Flex, Form, Input, message, Row, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TcrStep } from '../pages/createTCR'
import { AuthContext } from '../contexts/auth.context'

const OfficerDetailsForm = ({ setStep, officers, fundShares, totalCaseAmount, detectingOfficers, setDetectingOfficers, detectingOfficeFund, setDetectingOfficerFund, informantFund, setInformantFund, informantOfficers, setInformantOfficers, prosecutingOfficerFund, setProsecutingOfficerFund, prosecutingOfficers, setProsecutingOfficers, otherOfficers, setOtherOfficers, otherOfficerFund, setOtherOfficerFund, nonParticipationOfficers, setNonParticipationOfficers, nonParticipantOfficerFund, setNonParticipantOfficerFund }) => {

    const detectingOfficerRef = useRef(null);
    const informantOfficerRef = useRef(null);
    const prosecutingOfficerRef = useRef(null);
    const otherOfficerRef = useRef(null);
    const nonParticipantOfficerFundRef = useRef(null);
    const { showAlert } = useContext(AuthContext);

    useEffect(() => {
        const rewardPercentage = fundShares.find(share => share.fundType === 'DETECTING_OFFICER').fundShare;
        setDetectingOfficerFund(rewardPercentage);
        const informantShare = fundShares.find(share => share.fundType === 'INFORMANT_OFFICER').fundShare;
        setInformantFund(informantShare);
        const prosecutingShare = fundShares.find(share => share.fundType === 'PROSECUTING_OFFICER').fundShare;
        setProsecutingOfficerFund(prosecutingShare);
        const otherShare = fundShares.find(share => share.fundType === 'PARTICIPATION_OFFICERS').fundShare;
        setOtherOfficerFund(otherShare);
        const nonParticipationOfficers = fundShares.find(share => share.fundType === 'NON_PARTICIPATION_OFFICERS').fundShare;
        setNonParticipantOfficerFund(nonParticipationOfficers);

    }, [])

    // funds should share accoridng to the designation of each officer in the selected category

    /**
     * add the officer to the respented useState
     * check whether the required fields are there when setting the officer up
     */


    const [form] = Form.useForm();

    const handleDetectingOfficer = () => {
        const val = detectingOfficerRef.current;
        if (val?.input?.value) {
            const selectedOfficer = officers.find(officer => Number(officer.code) === Number(val?.input?.value))
            if (detectingOfficers.some(officer => officer.officerId === selectedOfficer.id)) {
                showAlert.error('Officer already exists in the Detecting Officers list');
            } else if (otherOfficers.some(officer => officer.officerId === selectedOfficer.id)) {
                showAlert.error('Officer already exists participation officer list');
            } else {
                const rewardPercentage = fundShares.find(share => share.fundType === 'DETECTING_OFFICER').fundShare;
                setDetectingOfficers([{ officerId: selectedOfficer.id, fund: selectedOfficer?.designation?.fundShare, officerNumber: selectedOfficer.code, officerName: selectedOfficer.name, designation: selectedOfficer.designation.designation, station: `${selectedOfficer.stations[0]?.station?.code} - ${selectedOfficer.stations[0]?.station?.name}`, reward: totalCaseAmount * rewardPercentage / 100, isEditable: false }, ...detectingOfficers])
                form.resetFields();
            }
        }
    }

    const handleInformantOfficer = () => {
        const val = informantOfficerRef.current;
        if (val?.input?.value) {
            const selectedOfficer = officers.find(officer => Number(officer.code) === Number(val?.input?.value))
            if (informantOfficers.some(officer => officer.officerId === selectedOfficer.id)) {
                message.error('Officer already exists in the Informat officer\'s list')
            } else {
                if (otherOfficers.some(officer => officer.officerId === selectedOfficer.id)) {
                    showAlert.error('Officer already exists participation officer list');
                } else {
                    const rewardPercentage = fundShares.find(share => share.fundType === 'INFORMANT_OFFICER').fundShare;
                    setInformantOfficers([{ officerId: selectedOfficer.id, fund: selectedOfficer?.designation?.fundShare, officerNumber: selectedOfficer.code, officerName: selectedOfficer.name, designation: selectedOfficer.designation.designation, station: `${selectedOfficer.stations[0]?.station?.code} - ${selectedOfficer.stations[0]?.station?.name}`, reward: totalCaseAmount * rewardPercentage / 100, isEditable: false }, ...informantOfficers])
                    form.resetFields();
                }
            }
        }
    }

    const handleProsecutingOfficer = () => {
        const val = prosecutingOfficerRef.current;
        if (val?.input?.value) {
            const selectedOfficer = officers.find(officer => Number(officer.code) === Number(val?.input?.value))
            if (prosecutingOfficers.some(officer => officer.officerId === selectedOfficer.id)) {
                showAlert.error('Officer already exists in the Prosecuting Officers list');
            } else {
                const rewardPercentage = fundShares.find(share => share.fundType === 'PROSECUTING_OFFICER').fundShare;
                setProsecutingOfficers([{ officerId: selectedOfficer.id, fund: selectedOfficer?.designation?.fundShare, officerNumber: selectedOfficer.code, officerName: selectedOfficer.name, designation: selectedOfficer.designation.designation, station: `${selectedOfficer.stations[0]?.station?.code} - ${selectedOfficer.stations[0]?.station?.name}`, reward: totalCaseAmount * rewardPercentage / 100, isEditable: false }, ...prosecutingOfficers])
                form.resetFields();
            }
        }
    }

    const handleOtherOfficer = () => {
        const val = otherOfficerRef.current;
        if (val?.input?.value) {
            const selectedOfficer = officers.find(officer => Number(officer.code) === Number(val?.input?.value))
            // selected officer id should not be in either detecting officers list or the informant officers list
            if (detectingOfficers.some(officer => officer.officerId === selectedOfficer.id) || informantOfficers.some(officer => officer.officerId === selectedOfficer.id)) {
                showAlert.error('Officer already exists in Detecting Officers or Informant Officers list')
            } else {
                const rewardPercentage = fundShares.find(share => share.fundType === 'PARTICIPATION_OFFICERS').fundShare;
                setOtherOfficers([{ officerId: selectedOfficer.id, officerNumber: selectedOfficer.code, fund: selectedOfficer?.designation?.fundShare, officerName: selectedOfficer.name, designation: selectedOfficer.designation.designation, station: `${selectedOfficer.stations[0]?.station?.code} - ${selectedOfficer.stations[0]?.station?.name}`, reward: totalCaseAmount * rewardPercentage / 100, isEditable: false }, ...otherOfficers])
                form.resetFields();
            }
        }
    }

    const handleNonParticipantOfficer = () => {
        const val = nonParticipantOfficerFundRef.current;
        if (val?.input?.value) {
            const selectedOfficer = officers.find(officer => Number(officer.code) === Number(val?.input?.value))
            const rewardPercentage = fundShares.find(share => share.fundType === 'NON_PARTICIPATION_OFFICERS').fundShare;
            setNonParticipationOfficers([{ officerId: selectedOfficer.id, officerNumber: selectedOfficer.code, officerName: selectedOfficer.name, fund: selectedOfficer?.designation?.fundShare, designation: selectedOfficer.designation.designation, station: `${selectedOfficer.stations[0]?.station?.code} - ${selectedOfficer.stations[0]?.station?.name}`, reward: totalCaseAmount * rewardPercentage / 100, isEditable: false }, ...nonParticipationOfficers])
            form.resetFields();
        }
    }


    const detectingOfficersColumns = [
        {
            title: 'Officer Number',
            dataIndex: 'officerNumber',
            key: 'officerNumber',
            render: (text: string, record: any) => {
                if (record.isEditable) {
                    return <Form form={form}>
                        <Form.Item name={`officerNumber`} rules={[{ required: true, message: 'Officer Number is required' }]}>
                            <Input name='detectingOfficerId' ref={detectingOfficerRef} suffix={<Button onClick={handleDetectingOfficer} type='primary' size='small'><FontAwesomeIcon icon={faCheck} /></Button>} placeholder='Enter Officer Number' />
                        </Form.Item>
                    </Form>
                }
                return text;
            }
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
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
            render: (value: any, record: any) => {
                if (detectingOfficers.length > 0 && !record.isEditable) {
                    return (totalCaseAmount * detectingOfficeFund / 100 / (detectingOfficers.length - 1)).toFixed(2);
                } else {
                    return Number(totalCaseAmount * detectingOfficeFund / 100).toFixed(2);
                }
            }
        },
        {
            title: 'Action',
            key: 'isEditable',
            render: (value: boolean, record: any) => {
                if (!record.isEditable) {
                    return <Button onClick={() => { handleDetectionOfficerRemove(record.officerNumber) }} shape='circle' size='small' danger><FontAwesomeIcon icon={faXmark} /></Button>
                }

                return null;
            }
        }
    ]

    const informantOfficerColumns = [
        {
            title: 'Officer Number',
            dataIndex: 'officerNumber',
            key: 'officerNumber',
            render: (text: string, record: any) => {
                if (record.isEditable) {
                    return <Form form={form}>
                        <Form.Item name={'informantOfficer'} rules={[{ required: true, message: 'Officer Number is required' }]}>
                            <Input name='informantOfficerId' ref={informantOfficerRef} suffix={<Button onClick={handleInformantOfficer} type='primary' size='small'><FontAwesomeIcon icon={faCheck} /></Button>} placeholder='Enter Officer Number' />
                        </Form.Item>
                    </Form>
                }
                return text;
            }
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
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
            render: (value: any, record: any) => {
                if (informantOfficers.length > 0 && !record.isEditable) {
                    const totalDesignationFunds = informantOfficers?.filter(officer => { return !officer.isEditable }).map((o) => Number(o?.fund)).reduce((a: number, b: number) => a + b, 0)

                    return `${(Number(totalCaseAmount * informantFund / 100) * record.fund / totalDesignationFunds).toFixed(2)}`;
                } else {
                    return Number(totalCaseAmount * informantFund / 100).toFixed(2);
                }
            }
        },
        {
            title: 'Action',
            key: 'isEditable',
            render: (value: boolean, record: any) => {
                if (!record.isEditable) {
                    return <Button onClick={() => { handleInformantOfficerRemove(record.officerNumber) }} shape='circle' size='small' danger><FontAwesomeIcon icon={faXmark} /></Button>
                }

                return null;
            }
        }
    ]

    const prosecutingOfficerColumns = [
        {
            title: 'Officer Number',
            dataIndex: 'officerNumber',
            key: 'officerNumber',
            render: (text: string, record: any) => {
                if (record.isEditable) {
                    return <Form form={form}>
                        <Form.Item name={'prosecutingOfficer'} rules={[{ required: true, message: 'Officer Number is required' }]}>
                            <Input name='prosecutingOfficer' ref={prosecutingOfficerRef} suffix={<Button onClick={handleProsecutingOfficer} type='primary' size='small'><FontAwesomeIcon icon={faCheck} /></Button>} placeholder='Enter Officer Number' />
                        </Form.Item>
                    </Form>
                }
                return text;
            }
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
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
            render: (value: any, record: any) => {
                if (prosecutingOfficers.length > 0 && !record.isEditable) {
                    const totalDesignationFunds = prosecutingOfficers?.filter(officer => { return !officer.isEditable }).map((o) => Number(o?.fund)).reduce((a: number, b: number) => a + b, 0)

                    return `${(Number(totalCaseAmount * prosecutingOfficerFund / 100) * record.fund / totalDesignationFunds).toFixed(2)}`;
                } else {
                    return Number(totalCaseAmount * prosecutingOfficerFund / 100).toFixed(2);
                }
            }
        },
        {
            title: 'Action',
            key: 'isEditable',
            render: (value: boolean, record: any) => {
                if (!record.isEditable) {
                    return <Button onClick={() => { handleProsecutingOfficerRemove(record.officerNumber) }} shape='circle' size='small' danger><FontAwesomeIcon icon={faXmark} /></Button>
                }

                return null;
            }
        }
    ]

    const otherOfficerColumns = [
        {
            title: 'Officer Number',
            dataIndex: 'officerNumber',
            key: 'officerNumber',
            render: (text: string, record: any) => {
                if (record.isEditable) {
                    return <Form form={form}>
                        <Form.Item name={'otherOfficer'} rules={[{ required: true, message: 'Officer Number is required' }]}>
                            <Input name='otherOfficer' ref={otherOfficerRef} suffix={<Button onClick={handleOtherOfficer} type='primary' size='small'><FontAwesomeIcon icon={faCheck} /></Button>} placeholder='Enter Officer Number' />
                        </Form.Item>
                    </Form>
                }
                return text;
            }
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
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
            render: (value: any, record: any) => {
                // if (prosecutingOfficers.length > 0 && !record.isEditable) {
                //     return (totalCaseAmount * otherOfficerFund / 100 / (otherOfficers.length - 1)).toFixed(2);
                // } else {
                //     return Number(totalCaseAmount * otherOfficerFund / 100).toFixed(2);
                // }
                if (otherOfficers.length > 0 && !record.isEditable) {
                    const totalDesignationFunds = otherOfficers?.filter(officer => { return !officer.isEditable }).map((o) => Number(o?.fund)).reduce((a: number, b: number) => a + b, 0)

                    return `${(Number(totalCaseAmount * otherOfficerFund / 100) * record.fund / totalDesignationFunds).toFixed(2)}`;
                } else {
                    console.log('fund ==', otherOfficerFund);
                    return Number(totalCaseAmount * otherOfficerFund / 100).toFixed(2);
                }
            }
        },
        {
            title: 'Action',
            key: 'isEditable',
            render: (value: boolean, record: any) => {
                if (!record.isEditable) {
                    return <Button onClick={() => { handleOtherOfficerRemove(record.officerNumber) }} shape='circle' size='small' danger><FontAwesomeIcon icon={faXmark} /></Button>
                }

                return null;
            }
        }
    ]

    const nonParticipantOfficerColumns = [
        {
            title: 'Officer Number',
            dataIndex: 'officerNumber',
            key: 'officerNumber',
            render: (text: string, record: any) => {
                if (record.isEditable) {
                    return <Form form={form}>
                        <Form.Item name={'nonParticipantOfficer'} rules={[{ required: true, message: 'Officer Number is required' }]}>
                            <Input name='nonParticipantOfficer' ref={nonParticipantOfficerFundRef} suffix={<Button onClick={handleNonParticipantOfficer} type='primary' size='small'><FontAwesomeIcon icon={faCheck} /></Button>} placeholder='Enter Officer Number' />
                        </Form.Item>
                    </Form>
                }
                return text;
            }
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
            title: 'Reward',
            dataIndex: 'reward',
            key: 'reward',
            render: (value: any, record: any) => {
                if (nonParticipationOfficers.length > 0 && !record.isEditable) {
                    const totalDesignationFunds = nonParticipationOfficers?.filter(officer => { return !officer.isEditable }).map((o) => Number(o?.fund)).reduce((a: number, b: number) => a + b, 0)
                    return `${(Number(totalCaseAmount * nonParticipantOfficerFund / 100) * record.fund / totalDesignationFunds).toFixed(2)}`;
                } else {
                    return Number(totalCaseAmount * nonParticipantOfficerFund / 100).toFixed(2);
                }
            }
        },
        {
            title: 'Action',
            key: 'isEditable',
            render: (value: boolean, record: any) => {
                if (!record.isEditable) {
                    return <Button onClick={() => { handleNonParticipantOfficerRemove(record.officerNumber) }} shape='circle' size='small' danger><FontAwesomeIcon icon={faXmark} /></Button>
                }

                return null;
            }
        }
    ]

    const handleProsecutingOfficerRemove = (code: number) => {
        setProsecutingOfficers(prosecutingOfficers.filter(item => item.officerNumber !== code));
    }

    const handleDetectionOfficerRemove = (code: number) => {
        setDetectingOfficers(detectingOfficers.filter(item => item.officerNumber !== code));
    }

    const handleNonParticipantOfficerRemove = (code: number) => {
        setNonParticipationOfficers(nonParticipationOfficers.filter(item => item.officerNumber !== code));
    }

    const handleOtherOfficerRemove = (code: number) => {
        setOtherOfficers(otherOfficers.filter(item => item.officerNumber !== code));
    }

    const handleInformantOfficerRemove = (code: number) => {
        setInformantOfficers(informantOfficers.filter(item => item.officerNumber !== code))
    }



    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col offset={1} span={22}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <h3 style={{ marginTop: 0 }}>Detecting Officers Details</h3>
                        <Table bordered columns={detectingOfficersColumns} dataSource={detectingOfficers} pagination={false} />
                        <Divider />
                        <h3>Informant Details</h3>
                        <Table bordered columns={informantOfficerColumns} dataSource={informantOfficers} pagination={false} />
                        <Divider />
                        <h3>Prosecuting Officers</h3>
                        <Table bordered columns={prosecutingOfficerColumns} dataSource={prosecutingOfficers} pagination={false} />
                        <Divider />
                        <h3>Others Taking Part in Detection</h3>
                        <Table bordered columns={otherOfficerColumns} dataSource={otherOfficers} pagination={false} />
                        <h3>Other Officers</h3>
                        <Table bordered columns={nonParticipantOfficerColumns} dataSource={nonParticipationOfficers} pagination={false} />
                        <Divider />
                        <Flex justify='flex-end' gap={10} style={{ marginTop: 20 }}>
                            <Button onClick={() => { setStep(TcrStep.TCR_DETAILS) }}><FontAwesomeIcon icon={faArrowLeft} /> Back</Button>
                            <Button onClick={() => {
                                if (detectingOfficers.length > 1) {
                                    setStep(TcrStep.REVIEW)
                                } else {
                                    showAlert.error('Please add at least one detecting officer')
                                }
                            }} type='primary'><FontAwesomeIcon icon={faClipboardList} /> Review</Button>
                        </Flex>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default OfficerDetailsForm