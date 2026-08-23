import { Button, Flex, Form, Input, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react'

const EditStationContent = ({ onFinish, selectedStation }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        console.log('selectedStation ===>', selectedStation);
        form.setFieldsValue(selectedStation);

    }, [])

    return (
        <Form layout='vertical' form={form} onFinish={onFinish}>
            <Form.Item name={'code'} rules={[{ required: true, message: 'This field is required.' }]} label="Station Code">
                <Input />
            </Form.Item>
            <Form.Item name={'name'} rules={[{ required: true, message: 'This field is required.' }]} label="Station Name">
                <Input />
            </Form.Item>
            <Form.Item name={'address'} label="Station Address">
                <TextArea />
            </Form.Item>
            <Flex gap={10} justify='flex-end'>
                <Button onClick={() => {Modal.destroyAll()}}>Cancel</Button>
                <Button htmlType='submit' type='primary'>Update</Button>
            </Flex>
        </Form>
    )
}

export default EditStationContent