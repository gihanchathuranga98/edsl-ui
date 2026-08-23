import React, { useContext, useState } from 'react';
import {
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Layout, Menu, theme } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBuildingColumns, faCrosshairs, faDashboard, faDatabase, faFilePdf, faGavel, faKey, faLock, faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons';
import { faCashApp } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router';
import { AuthContext } from '../contexts/auth.context';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    // getItem("Dashboard", '1', <FontAwesomeIcon icon={faDashboard} />),
    getItem("Manage TCR", 'manage-tcr', <FontAwesomeIcon icon={faGavel} />),
    getItem("Create TCR", 'create-tcr', <FontAwesomeIcon icon={faTrophy} />),
    getItem("Reports", 'reports', <FontAwesomeIcon icon={faFilePdf} />),
    getItem("Reset User Passwords", 'reset-passwords', <FontAwesomeIcon icon={faKey} />),
    getItem("Change Password", 'change-password', <FontAwesomeIcon icon={faLock} />),
    getItem('Master Data', 'sub1', <FontAwesomeIcon icon={faDatabase} />, [
        getItem("Manage System Users", 'manage-system-users', <FontAwesomeIcon icon={faCashApp} />),
        getItem("Manage Officers", 'manage-officers', <FontAwesomeIcon icon={faUsers} />),
        getItem("Manage Stations", 'manage-stations', <FontAwesomeIcon icon={faBuildingColumns} />),
        getItem("Manage Designations", 'manage-designations', <FontAwesomeIcon icon={faCrosshairs} />),
        getItem("Fund Breakdown", 'fund-breakdown', <FontAwesomeIcon icon={faCashApp} />),
    ]),
    getItem("Logout", 'logout', <FontAwesomeIcon icon={faArrowRightFromBracket} />),
];

const Sidenav = ({ children }: { children?: React.ReactNode }) => {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const {user} = useContext(AuthContext);
    // sider width defaults in antd: width = 200, collapsedWidth = 80
    const siderWidth = collapsed ? 80 : 250;
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleNavClick = (args) => {
        navigate(`/${args.key}`);
    };

    const getCurrentPath = () => {
        const path = window.location.pathname;
        // remove leading slash and return as array
        return [path.slice(1)];
    }

    const showFirstTwoInitials = (name: string) => {
        const names = name.split(' ');
        return names[0].charAt(0) + names[1].charAt(0);
    }

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsed={collapsed}
                width={250}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <div
                    className="demo-logo-vertical"
                    style={{
                        marginTop: '10px',
                        marginBottom: '10px',
                        height: 150,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        gap: 6,
                        paddingLeft: 8,
                        paddingRight: 8,
                    }}
                >
                    <Avatar style={{ border: 'solid 3px #fff', backgroundColor: 'grey'}} size={100}>{showFirstTwoInitials(user.name)}</Avatar>
                    {/* <img
                        style={{
                            borderRadius: 100,
                            border: 'solid 3px #fff',
                            maxWidth: '100px',
                            height: 'auto',
                            display: 'block',
                        }}
                        src="https://www.loremfaces.net/96/id/1.jpg"
                        alt="Logo"
                    /> */}
                    <h5 style={{ color: '#fff', margin: 0 }}>{user.name}</h5>
                </div>
                <Menu theme="dark" defaultSelectedKeys={getCurrentPath()} onClick={handleNavClick} mode="inline" items={items} />
            </Sider>
            <Layout style={{ marginLeft: siderWidth, minHeight: '100vh', transition: 'margin-left 0.2s' }}>
                {/* <Header style={{ padding: 0, background: colorBgContainer }}>
                </Header> */}
                <div style={{ paddingTop: 0, paddingLeft: 20 }}>
                    <h2>Technical Crime Report Reward System</h2>
                </div>
                <Content style={{ margin: '0 16px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'User' }, { title: 'Bill' }]} /> */}
                    <div
                        style={{
                            marginTop: 16,
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    EDSL ©2026 Created by Protius
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Sidenav;