import { Button, Col, Divider, Flex, Form, Input, Modal, Row } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward } from '@fortawesome/free-solid-svg-icons'
import Password from 'antd/es/input/Password'
import { useForm } from 'antd/es/form/Form'
import { UserService } from '../services/user.service'
import { useContext } from 'react'
import { AuthContext } from '../contexts/auth.context'
import { useNavigate } from 'react-router'

const Login = () => {

    const [form] = useForm();
    const [emailForm] = useForm();
    const navigate = useNavigate();
    const { setUser, setPermissions, showAlert } = useContext(AuthContext);

    const userServie = new UserService();

    const handleLogin = (data: { username: string, password: string }) => {
        userServie.login(data.username, data.password)
            .then((data: any) => {
                setUser({
                    name: data.name,
                    email: data.email,
                    permissions: data.permissions
                });
                setPermissions(data.permissions);
                navigate('/manage-officers');
            })
            .catch(() => {
                alert('error')
            });
    }

    const handlePasswordRecovery = ({ email }: { email: string }) => {
        // validate the email pattern
        if (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            userServie.recoverPassword(email)
                .then(() => {
                    showAlert.success('Password recovery request created successfully.');
                    emailForm.resetFields();
                    Modal.destroyAll()
                })
                .catch((error) => {
                    showAlert.error(error.message)
                    
                });
        } else {
            showAlert.error('Invalid Email Address')
        }
    }

    const handlePwRecoverReq = () => {
        Modal.confirm({
            title: 'Request to recover password',
            footer: null,
            content: <>
                <Form form={emailForm} onFinish={handlePasswordRecovery} layout='vertical'>
                    <Form.Item rules={[{ required: true, message: 'Email is required' }]} name="email" label="Enter your email address to create password recover request.">
                        <Input placeholder='Enter your email here' />
                    </Form.Item>
                    <Flex gap={10} justify='flex-end'>
                        <Button onClick={() => { emailForm.resetFields(); Modal.destroyAll(); }}>Cancel</Button>
                        <Button htmlType='submit' type='primary'>Send Request</Button>
                    </Flex>
                </Form>
            </>,
        })
    }

    return (
        <>
            <Row>
                <Col style={{ height: '100vh' }} offset={6} span={12}>
                    <Flex vertical justify='center'>
                        <div style={{ borderRadius: 10, boxShadow: '0 4px 10px rgba(0,0,0,0.2)', marginTop: '20vh' }}>
                            <Row>
                                <Col style={{ backgroundColor: '#57caf7', borderRadius: '10px 0 0 10px' }} span={12}>
                                    <Flex style={{ marginTop: 40, marginBottom: 40 }} vertical align='center' justify='center'>
                                        <FontAwesomeIcon size='8x' icon={faAward} />
                                        <h2 style={{ textAlign: 'center' }}>Technical Crime Reward Reporting System</h2>
                                    </Flex>
                                </Col>
                                <Col span={12} style={{ padding: 30 }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <h3>System User Login</h3>
                                        <p>Please enter your username and password</p>
                                    </div>
                                    <Form onFinish={handleLogin} form={form} layout='vertical'>
                                        <Form.Item name={'username'} rules={[{ required: true, message: 'Username is required' }]}>
                                            <Input placeholder='Username' />
                                        </Form.Item>
                                        <Form.Item name={'password'} rules={[{ required: true, message: 'Password is required' }]} style={{ marginTop: -10 }}>
                                            <Password placeholder='Password' />
                                        </Form.Item>
                                        <Flex justify='center'>
                                            <Button htmlType='submit' style={{ width: 150 }} type='primary'>Login</Button>
                                        </Flex>
                                    </Form>
                                    <Divider />
                                    <p onClick={handlePwRecoverReq} style={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}>Forgot Password</p>
                                </Col>
                            </Row>
                        </div>
                    </Flex>
                </Col>
            </Row>
        </>
    )
}

export default Login