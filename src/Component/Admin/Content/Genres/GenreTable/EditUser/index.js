import React, {useEffect, useState} from "react";
import {Button, Drawer, Form, Input} from "antd";
import "react-h5-audio-player/lib/styles.css";
import {updateUser} from "../../../../../../services/api/user";

/* eslint-disable no-template-curly-in-string */
/* eslint-enable no-template-curly-in-string */

const FormEditGenre = ({record}) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState();
    const [form] = Form.useForm();

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const onFinish = (values) => {
        // let songSubmi
        (async () => {
            const temp = values.genre;
            const genre = {
                ...temp,
                id: record.id,
            };
            const genre1 = await updateUser(genre);
            const content = genre1.content;
            // console.log(content)
            // record.handleEdit
            record = {
                ...record,
                ...content
            }
            record.onEdit();
        })();
        onClose();

    };
    // api
    useEffect(() => {
        form.setFieldsValue({
            user: {
                name: record.name,
                email: record.email,
                password: record.password,
            },
        });
    }, [record])

    return (
        <>
            <Button type="primary" onClick={showDrawer}>
                More
            </Button>
            <Drawer
                title="User Info"
                placement="right"
                onClose={onClose}
                open={open}
                // width={""}
                size="medium"
            >
                <Form
                    form={form}
                    name="user"
                    onFinish={onFinish}
                    validateMessages={validateMessages}
                    layout="vertical"
                    initialValues={{
                        genre: {
                            name: record.name,
                            description: record.description
                        },
                    }}
                >
                    <Form.Item name={["genre", "name"]} label="Name">
                        <Input disabled={true}/>
                    </Form.Item>
                    <Form.Item
                        name={["genre", "description"]}
                        label="description"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input disabled={true}/>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
};
export default FormEditGenre;
