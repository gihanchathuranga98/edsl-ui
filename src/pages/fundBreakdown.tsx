import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Col, Flex, Form, Input, Row, Select, Table } from 'antd'
import React, { useEffect } from 'react'
import { FUND_TYPES, FundTypesEnum } from '../common/constants/fundTypes.const'
import { useForm } from 'antd/es/form/Form'
import { FundService } from '../services/fund.service'

const FundBreakdown = () => {

    const [form] = useForm();

    const [funds, setFunds] = React.useState([]);

    const fundService = new FundService();

    const columns = [
        {
            title: 'Fund Type',
            dataIndex: 'fundType',
            key: 'type',
            render: (value: string) => {
                return FUND_TYPES.find(f => f.key === value)?.value
            }
        },
        {
            title: 'Amount',
            dataIndex: 'fundShare',
            key: 'amount',
            render: (value: string) => {
                return `${value} %`
            }
        }
    ]

    const fetchAllFunds = () => {
        fundService.getAllFunds()
            .then(data => {
                setFunds(data);
            })
    }

    useEffect(() => {
        fetchAllFunds();
    }, [])

    const handleFormFinish = (data) => {
        fundService.createFund(data)
            .then()
            .finally(() => { form.resetFields(); fetchAllFunds() })
    }


    return (
        <>
            <Row gutter={[15, 15]}>
                <Col span={8}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <Form onFinish={handleFormFinish} form={form} layout='vertical'>
                            <Form.Item name="fundType" label="Fund Type">
                                <Select options={FUND_TYPES.map(ft => ({ value: ft.key, label: ft.value }))} />
                            </Form.Item>
                            <Form.Item name="fundShare" label="Percentage">
                                <Input suffix="%" />
                            </Form.Item>
                            <Flex justify='end' gap={10}>
                                <Button type='primary' htmlType='submit'><FontAwesomeIcon icon={faCheck} />Set Fund</Button>
                            </Flex>
                        </Form>
                    </div>
                </Col>
                <Col span={16}>
                    <div style={{ border: 'solid', borderWidth: 0.5, borderRadius: 10, padding: 20, borderColor: 'lightgray' }}>
                        <Table dataSource={funds} columns={columns} showHeader={false} footer={null} pagination={false} />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default FundBreakdown