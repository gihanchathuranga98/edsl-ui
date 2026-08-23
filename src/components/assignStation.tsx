import { Button, Drawer, Flex, Form, Select, Timeline } from 'antd'
import React, { useEffect, useState } from 'react'
import { StationService } from '../services/station.service';
import { UserService } from '../services/user.service';

const AssignStation = ({ open, onClose, selectedOfficer, onStationChange }) => {

    console.log('selected officer ==> ', selectedOfficer);
    

    const [stations, setStations] = useState<any[]>([]);

    const stationsService = new StationService();
    const userService = new UserService();

    useEffect(() => {
        stationsService.getAllStations()
        .then(data => {
            setStations(data);
        })
    }, [])

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

        const handleStationAssignment = ({station}) => {
            userService.assignStation(selectedOfficer, station)
            .then(data => {
                onStationChange();
            })
            .catch(error => {

            })
        }

    return (
        <>
            <Drawer onClose={onClose} footer={<><Form onFinish={handleStationAssignment} layout='vertical'>
                <Form.Item rules={[{required: true, message: 'Please select a station'}]} label={'Select New Station'} name={'station'}>
                    <Select options={stations.map(s => ({label: `${s.code} - ${s.name}`, value: s.id}))} />
                </Form.Item>
                <Flex gap={10} justify={'end'} style={{ marginBottom: 20 }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button htmlType='submit' type='primary'>Assign Station</Button>
                </Flex>
            </Form></>} title={'Assigned Stations'} open={open}>
                <Timeline items={items}></Timeline>
            </Drawer>
        </>
    )
}

export default AssignStation