import { faArrowAltCircleRight, faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, DatePicker, Flex, Form, Input, InputNumber, Row, Select } from 'antd'
import React from 'react'
import { TcrStep } from '../pages/createTCR'

const CaseDetailsForm = ({setStep}) => {
    return (
        <>
            <Row style={{ marginTop: 20 }}>
                <Col offset={4} span={16}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <Form layout='vertical'>
                            <Row gutter={[15, 0]}>
                                <Col span={12}>
                                    <Form.Item
                                        label="Case No"
                                        name="caseNo"
                                        rules={[{ required: true, message: 'Please input the case number!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Leading Station"
                                        name="leadingStation"
                                        rules={[{ required: true, message: 'Please input the leading station!' }]}
                                    >
                                        <Select />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Leading Station"
                                        name="leadingStation"
                                        rules={[{ required: true, message: 'Please input the leading station!' }]}
                                    >
                                        <DatePicker style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="Total Case Amount"
                                        name="totalCaseAmount"
                                        rules={[{ required: true, message: 'Please input the total case amount!' }]}
                                    >
                                        <InputNumber style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Flex justify='end' gap={10}>
                                {/* <Button><FontAwesomeIcon icon={faFloppyDisk} />Save Draft</Button> */}
                                <Button onClick={() => {setStep(TcrStep.OFFICER_DETAILS)}} type='primary'>Next <FontAwesomeIcon icon={faArrowAltCircleRight} /></Button>
                            </Flex>
                        </Form>
                    </div>

                </Col>
            </Row>
        </>
    )
}

export default CaseDetailsForm