import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Button,
    Checkbox,
    Divider,
    Drawer,
    Flex,
    Form,
} from 'antd';
import React, { useEffect } from 'react';

import { Permission as PermissionEnum } from '../common/constants/permissions';

interface PermissionsProps {
    open?: boolean;
    onClose: (permissions?: PermissionEnum[]) => void;
    selectedPermissions: PermissionEnum[];
}

const formatPermissionLabel = (key: string) => {
    return key
        .split('_')
        .map(
            (word) =>
                word.charAt(0).toUpperCase() +
                word.slice(1).toLowerCase(),
        )
        .join(' ');
};

const groupPermissions = () => {
    const groups: Record<string, string[]> = {};

    Object.entries(PermissionEnum).forEach(([key, value]) => {
        const category = value.split(':')[0];

        if (!groups[category]) {
            groups[category] = [];
        }

        groups[category].push(key);
    });

    return groups;
};

const Permissions = ({
    open,
    onClose,
    selectedPermissions = [],
}: {
    open?: boolean;
    onClose: (permissions: PermissionEnum[]) => void;
    selectedPermissions: PermissionEnum[];
}) => {
    const [form] = Form.useForm();

    const permissionGroups = groupPermissions();

    useEffect(() => {
        if (!open) return;

        const initialValues: Record<string, boolean> = {};

        selectedPermissions.forEach((permission) => {
            initialValues[permission] = true;
        });

        form.setFieldsValue(initialValues);
    }, [selectedPermissions, form, open]);

    const handleClose = () => {
        form.resetFields();
        onClose([]);
    };

    const handleFinish = (values: Record<string, boolean>) => {
        const selected = Object.entries(values)
            .filter(([_, checked]) => checked)
            .map(([permission]) => permission);
        onClose(selected.map(p => p as PermissionEnum))
    };

    return (
        <Drawer
            open={open}
            closable={false}
            mask
            title="Select Permissions"
            onClose={handleClose}
            footer={
                <Flex gap={10} justify="flex-end">
                    <Button onClick={handleClose}>
                        <FontAwesomeIcon icon={faXmark} />
                        Close
                    </Button>

                    <Button
                        type="primary"
                        onClick={() => form.submit()}
                    >
                        <FontAwesomeIcon icon={faCheck} />
                        Submit
                    </Button>
                </Flex>
            }
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                {Object.entries(permissionGroups).map(
                    ([category, permissions]) => (
                        <React.Fragment key={category}>
                            <Divider>
                                {category.charAt(0).toUpperCase() +
                                    category.slice(1)}
                            </Divider>

                            {permissions.map((permKey) => (
                                <Form.Item
                                    key={permKey}
                                    name={permKey}
                                    valuePropName="checked"
                                    style={{
                                        marginTop: 0,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Checkbox
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <div
                                            style={{
                                                // display: 'flex',
                                                // justifyContent:'space-between',
                                                // alignItems: 'center',
                                                border: '1px solid #ddd',
                                                padding: 12,
                                                borderRadius: 8,
                                                width: '100%',
                                            }}
                                        >
                                            <div>
                                                <div
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {formatPermissionLabel(
                                                        permKey,
                                                    )}
                                                </div>

                                                <div
                                                    style={{
                                                        fontSize: 12,
                                                        color: '#666',
                                                        marginTop: 4,
                                                    }}
                                                >
                                                    {/* {permKey} */}
                                                </div>
                                            </div>
                                        </div>
                                    </Checkbox>
                                </Form.Item>
                            ))}
                        </React.Fragment>
                    ),
                )}
            </Form>
        </Drawer>
    );
};

export default Permissions;