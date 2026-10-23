import { Button, Drawer, Empty, Flex, Form, Select, Spin, Timeline } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { StationService } from '../services/station.service';
import { UserService } from '../services/user.service';
import { AuthContext } from '../contexts/auth.context';

const AssignStation = ({ open, onClose, selectedOfficer, onStationChange }) => {

    const [form] = Form.useForm();
    const [stations, setStations] = useState<any[]>([]);
    const [stationHistory, setStationHistory] = useState<any[]>([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [isAssigning, setIsAssigning] = useState(false);
    const { showAlert } = useContext(AuthContext);

    const stationsService = new StationService();
    const userService = new UserService();

    useEffect(() => {
        if (!open) return;

        stationsService.getAllStations()
        .then(data => {
            setStations(data);
        })
        .catch(() => {
            showAlert.error('Unable to load stations');
        })
    }, [open])

    useEffect(() => {
        if (!open || !selectedOfficer) return;

        setIsHistoryLoading(true);
        userService.getOfficerStationHistory(selectedOfficer)
            .then(data => {
                setStationHistory(data);
            })
            .catch(() => {
                showAlert.error('Unable to load station history');
            })
            .finally(() => {
                setIsHistoryLoading(false);
            });
    }, [open, selectedOfficer])

        const handleStationAssignment = ({station}) => {
            if (!selectedOfficer) {
                showAlert.error('Please select an officer first');
                return;
            }

            setIsAssigning(true);
            userService.assignStation(selectedOfficer, station)
            .then(data => {
                form.resetFields();
                onStationChange();
                onClose();
            })
            .catch(() => {
                showAlert.error('Unable to assign the station');
            })
            .finally(() => {
                setIsAssigning(false);
            })
        }

    return (
        <>
            <Drawer onClose={() => { form.resetFields(); onClose(); }} footer={<><Form form={form} onFinish={handleStationAssignment} layout='vertical'>
                <Form.Item rules={[{required: true, message: 'Please select a station'}]} label={'Select New Station'} name={'station'}>
                    <Select showSearch={{ optionFilterProp: 'label' }} options={stations.map(s => ({label: `${s.code} - ${s.name}`, value: s.id}))} />
                </Form.Item>
                <Flex gap={10} justify={'end'} style={{ marginBottom: 20 }}>
                    <Button onClick={() => { form.resetFields(); onClose(); }}>Cancel</Button>
                    <Button loading={isAssigning} htmlType='submit' type='primary'>Assign Station</Button>
                </Flex>
            </Form></>} title={'Assign Station'} open={open}>
                <h4>Station History</h4>
                {isHistoryLoading
                    ? <Flex justify='center'><Spin /></Flex>
                    : stationHistory.length > 0
                        ? <Timeline items={stationHistory.map((assignment) => ({
                            color: assignment.isCurrent ? 'green' : 'blue',
                            children: <>
                                <strong>{assignment.station.code} - {assignment.station.name}</strong>
                                {assignment.isCurrent && ' (Current)'}
                                <br />
                                Assigned: {new Date(assignment.assignedAt).toLocaleDateString()}
                            </>,
                        }))} />
                        : <Empty description='No station history available' image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            </Drawer>
        </>
    )
}

export default AssignStation
