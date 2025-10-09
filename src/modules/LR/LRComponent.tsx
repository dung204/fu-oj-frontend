import globalStore from '@/base/components/global/globalStore';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Modal } from 'antd';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import authentication from './authentication';
import './lr-component.scss';

const flexSliderItems = [
    {
        id: 0,
        imgUrl: '/sources/image.jpeg'
    },
    {
        id: 1,
        imgUrl: '/sources/image.jpeg'
    },
    {
        id: 2,
        imgUrl: '/sources/image.jpeg'
    },
    {
        id: 3,
        imgUrl: '/sources/image.jpeg'
    }
];

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const LRComponent = observer(() => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 4);
        }, 3000); // 2 giây

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="lr-component">
            <Modal
                className="lr-modal"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={globalStore.isLROpen}
                onOk={() => {}}
                onCancel={() => globalStore.setLROpen(false)}
                footer={false}
            >
                <div className="left">
                    <LoginComponent />
                </div>
                <div className="split"></div>
                <div className="right">
                    <img className="logo" src="/favicon.svg" alt="" />
                    <div className="content">
                        <div className="title">
                            NỀN TẢNG <span>HỖ TRỢ LUYỆN LẬP TRÌNH</span>
                        </div>
                        <div className="flex-slider">
                            {flexSliderItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`flex-slider-item ${activeIndex === item.id ? 'active' : ''}`}
                                >
                                    <img src={item.imgUrl} alt="" />
                                </div>
                            ))}
                        </div>
                        <div className="title-2">
                            LUYỆN TẬP <span>NHANH CHÓNG</span>
                        </div>
                        {activeIndex == 0 && <MoveFromRightComponent />}
                        {activeIndex == 1 && <MoveFromRightComponent />}
                        {activeIndex == 2 && <MoveFromRightComponent />}
                        {activeIndex == 3 && <MoveFromRightComponent />}
                    </div>
                </div>
            </Modal>
        </div>
    );
});

const LoginComponent = () => {
    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        authentication.login(values.username || '', values.password || '', false);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="content">
            <div className="header">ĐĂNG NHẬP</div>
            <Form
                name="basic"
                // labelCol={{ span: 8 }}
                // wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                    className="custom-input-username"
                >
                    <Input style={{ height: 50, paddingTop: 24 }} placeholder="Nhập tài khoản | Email" />
                </Form.Item>

                <Form.Item<FieldType>
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                    className="custom-input-password"
                >
                    <Input.Password style={{ height: 50, paddingTop: 24 }} placeholder="Nhập mật khẩu" />
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null} className="remember">
                    <Checkbox>Ghi nhớ đăng nhập</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button className="login-btn" block type="primary" htmlType="submit">
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <div className="split-content">Hoặc</div>
            <div className="group-btn">
                <Button>
                    <GoogleOutlined style={{ fontSize: 20 }} />
                    Google
                </Button>
                <Button>
                    <FacebookOutlined style={{ fontSize: 20 }} />
                    Facebook
                </Button>
            </div>
            <div className="register">
                Bạn chưa có tài khoản? <a>ĐĂNG KÝ</a>
            </div>
        </div>
    );
};

const MoveFromRightComponent = () => {
    return (
        <>
            <div className="move-from-right mfr-1">--------------------------------------------------------------</div>
            <div className="move-from-right mfr-2">--------------------------------------------------------------</div>
            <div className="move-from-right mfr-3">--------------------------------------------------------------</div>
            <div className="move-from-right mfr-4">--------------------------------------------------------------</div>
        </>
    );
};

export default LRComponent;
