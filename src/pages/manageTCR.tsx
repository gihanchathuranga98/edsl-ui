import { icon } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faCircleCheck, faCircleXmark, faHourglass, faHourglassHalf } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Tabs } from 'antd'
import React from 'react'
import PendingTcr from './pendingTcr'
import ApprovedTcr from './approvedTcr'
import RejectedTcr from './rejectedTcr'

const ManageTCR = () => {

    const items = [
        {
            label: 'Pending TCR',
            key: '1',
            children: <PendingTcr />,
            icon: <FontAwesomeIcon icon={faHourglassHalf} />
        },
        {
            label: 'Approved TCR',
            key: '2',
            children: <ApprovedTcr />,
            icon: <FontAwesomeIcon icon={faCircleCheck} />
        },
        {
            label: 'Rejected TCR',
            key: '3',
            children: <RejectedTcr/>,
            icon: <FontAwesomeIcon icon={faCircleXmark} />
        },
    ]

    return (
        <>
            <Tabs type='card' items={items} />
        </>
    )
}

export default ManageTCR