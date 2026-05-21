import { faLock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Flex } from 'antd'
import React from 'react'

const Restricted = () => {
  return (
    <>
        <Flex justify='center'>
            <Flex justify='center' vertical>
                <FontAwesomeIcon icon={faLock}/>
                <h1>Access Denied</h1>
                <p>You are not authorized to access this page</p>
            </Flex>
        </Flex>
    </>
  )
}

export default Restricted