import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Col, DatePicker, Flex, Form, Row } from 'antd'
import { handlePrint } from './../common/handlePrint';

const Reports = () => {
    return (
        <>
            <Row>
                <Col span={8}>
                    <Card size='small' title={<div style={{ textAlign: 'center' }}>Officer Handling Report</div>}>
                        <Form layout='vertical'>
                            <Form.Item label={'Select Date Range'}>
                                <DatePicker.RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Flex justify='flex-end'>
                                <Button onClick={handlePrint} type={'primary'}>Download <FontAwesomeIcon icon={faDownload} /></Button>
                            </Flex>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size='small' title={<div style={{ textAlign: 'center' }}>Officer Handling Report</div>}>
                        <Form layout='vertical'>
                            <Form.Item label={'Select Date Range'}>
                                <DatePicker.RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Flex justify='flex-end'>
                                <Button onClick={handlePrint} type={'primary'}>Download <FontAwesomeIcon icon={faDownload} /></Button>
                            </Flex>
                        </Form>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card size='small' title={<div style={{ textAlign: 'center' }}>Officer Handling Report</div>}>
                        <Form layout='vertical'>
                            <Form.Item label={'Select Date Range'}>
                                <DatePicker.RangePicker style={{ width: '100%' }} />
                            </Form.Item>
                            <Flex justify='flex-end'>
                                <Button onClick={handlePrint} type={'primary'}>Download <FontAwesomeIcon icon={faDownload} /></Button>
                            </Flex>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Reports