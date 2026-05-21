import { Button, Drawer, Flex, Form, Select, Timeline } from 'antd'
import React from 'react'

const AssignStation = ({ open, onClose }) => {

    const items: any[] =
        [
            {
                content: <>
                    Central Police Station<br />
                    2015-09-01
                </>,
            },
            {
                content: <>
                    North Police Station<br />
                    2019-09-01
                </>,
            },
            {
                content: <>
                    East Police Station<br />
                    2024-09-01
                </>,
            },
        ]

    return (
        <>
            <Drawer onClose={onClose} footer={<><Form layout='vertical'>
                <Form.Item label={'Select New Station'} name={'stationNamess'}>
                    <Select />
                </Form.Item>
                <Flex gap={10} justify={'end'} style={{ marginBottom: 20 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type='primary'>Assign Station</Button>
                </Flex>
            </Form></>} title={'Assigned Stations'} open={open}>
                <Timeline items={items}></Timeline>
            </Drawer>
        </>
    )
}

export default AssignStation