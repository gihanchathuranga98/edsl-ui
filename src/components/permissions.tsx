import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Checkbox, Divider, Drawer, Flex, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import { Permission as PermissionEnum } from '../common/constants/permissions'

const formatPermissionLabel = (key: string) => {
    return key.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
};

const groupPermissions = () => {
    const groups: Record<string, string[]> = {};
    Object.entries(PermissionEnum).forEach(([key, value]) => {
        const category = value.split(':')[0];
        if (!groups[category]) groups[category] = [];
        groups[category].push(key);
    });
    return groups;
};

const Permissions = ({ open, onClose, selectedPermissions }: { children?: React.ReactNode, open?: boolean, onClose: () => void, selectedPermissions?: PermissionEnum[] }) => {
    const permissionGroups = groupPermissions();
    const [checkedPermissions, setCheckedPermissions] = useState<PermissionEnum[]>([]);
    const [form] = Form.useForm();

    // if there are any already selected permissions in the "selectedPermissions" array, I need them to be selected in the checkbox as well
    React.useEffect(() => {
        if (selectedPermissions && selectedPermissions.length > 0) {
            const initialValues: Record<string, boolean> = {};
            selectedPermissions.forEach(perm => {
                initialValues[perm] = true;
            });
            form.setFieldsValue(initialValues);
        }
    }, [selectedPermissions, form]);

    const handleCheck = (isChecked: boolean, permKey: string) => {
        // const currentValues = form.getFieldsValue();
        // const isChecked = currentValues[permKey];
        // alert(JSON.stringify(value))
        if (isChecked) {
            setCheckedPermissions(prev => [...prev, permKey as PermissionEnum]);
        } else {
            setCheckedPermissions(prev => prev.filter(p => p !== permKey));
        }
    };

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        alert(JSON.stringify(checkedPermissions));
    }, [checkedPermissions])

    const handleFinish = (data) => {
        alert(JSON.stringify(data));
    }

    return (
        <Drawer closable={false} mask={true} open={open} footer={<Flex gap={10} justify='flex-end'>
            <Button onClick={() => { onClose(); form.resetFields(); setCheckedPermissions([]); }}><FontAwesomeIcon icon={faXmark} />Close</Button>
            <Button type='primary' onClick={() => { form.submit(); }}><FontAwesomeIcon icon={faCheck} />Submit</Button>
        </Flex>} title='Select Permissions'>
            <Form form={form} onFinish={handleFinish} style={{ margin: 0 }}>
                {Object.entries(permissionGroups).map(([category, permissions]) => (
                    <React.Fragment key={category}>
                        <Divider>{category.charAt(0).toUpperCase() + category.slice(1)}</Divider>
                        {permissions.map((permKey) => (
                            <Form.Item key={permKey} name={permKey} valuePropName="checked" style={{ marginTop: 0, marginBottom: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #ddd', padding: 10, borderRadius: 8 }}>
                                    <div style={{ maxWidth: '80%' }}>
                                        <div style={{ fontWeight: 600 }}>{formatPermissionLabel(permKey)}</div>
                                    </div>
                                    <Checkbox onChange={(e) => { handleCheck(e.target.checked, permKey) }} value={permKey} style={{ transform: 'scale(1.3)', transformOrigin: 'center', marginLeft: 12 }} />
                                </div>
                            </Form.Item>
                        ))}
                    </React.Fragment>
                ))}
            </Form>
        </Drawer>
    )
}

export default Permissions