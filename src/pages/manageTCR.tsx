import { icon } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faCircleCheck, faCircleXmark, faHourglass, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Empty, Flex, Modal, Spin, Tabs } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import PendingTcr from './pendingTcr'
import ApprovedTcr from './approvedTcr'
import RejectedTcr from './rejectedTcr'
import { TcrService } from '../services/tcr.service'
import { AuthContext } from '../contexts/auth.context'

const ManageTCR = () => {

    const [tcr, setTcr] = useState<unknown[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const tcrService = new TcrService();

    const { showAlert } = useContext(AuthContext);

    const loadTcr = () => {
        setIsLoading(true);
        return tcrService.fetchAllTcr()
            .then(data => {
                setTcr(data);
            })
            .catch(error => {
                showAlert.error('Unable to fetch TCR data');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleTcrDelete = (tcrId: string) => {
        Modal.confirm({
            title: 'Confirm',
            content: 'Are you sure you want to delete this TCR?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: () => {
                tcrService.deleteTcr(tcrId)
                    .then(data => {
                        showAlert.success('TCR has been deleted successfully');
                        loadTcr()
                    })
                    .catch(error => {
                        showAlert.error('Unable to delete TCR');
                    })
            }
        })

    }

    const items = [
        {
            label: 'Pending TCR',
            key: '1',
            children: <PendingTcr handleTcrDelete={handleTcrDelete} pendingItems={tcr.filter((tcr: any) => (tcr.status === 'PENDING'))} />,
            icon: <FontAwesomeIcon icon={faHourglassHalf} />
        },
        {
            label: 'Approved TCR',
            key: '2',
            children: <ApprovedTcr approvedItems={tcr.filter((tcr: any) => (tcr.status === 'APPROVED'))} />,
            icon: <FontAwesomeIcon icon={faCircleCheck} />
        },
        {
            label: 'Rejected TCR',
            key: '3',
            children: <RejectedTcr rejectedItems={tcr.filter((tcr: any) => (tcr.status === 'REJECTED'))} />,
            icon: <FontAwesomeIcon icon={faCircleXmark} />
        },
    ]


    useEffect(() => {
        loadTcr();
    }, [])

    return (
        <>
            {
                isLoading
                    ? <Flex justify='center' style={{ marginTop: 40 }}><Spin description="Loading TCR Data" size='large' /></Flex>
                    : tcr.length > 0
                        ? <Tabs type='card' items={items} />
                        : <Empty description="No TCR records to display" style={{ marginTop: 40 }} />
            }
        </>
    )
}

export default ManageTCR