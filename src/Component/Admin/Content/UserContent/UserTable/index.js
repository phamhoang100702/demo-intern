import {Button, Card, Drawer, Pagination, Space, Table} from "antd";
import Search from "antd/es/input/Search";
import FormAdd from "./FormAdd";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {userColumns} from "../../../../../component-default/columns";
import {deleteUserById, searchAllUser} from "../../../../../services/api/user";


export const UserTable = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const dispatch = useDispatch();
    let authData = useSelector((state) => state.authReducer.authData);
    const navigate = useNavigate();
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const handleSearch = () => {
        fetch();
    };
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleAdd = (user) => {
        setData([
            ...data,
            {
                ...user,
                key: data.length + 1,
                onDelete: handleDelete,
                onEdit: handleEdit,
            },
        ]);
    };
    const handleEdit = () => {
        fetch();
    };
    const handleDelete = (id) => {
        let dataSrc;
        (async () => {
            await deleteUserById(id);
            fetch();
        })();
    };

    const onChange = (values) => {
        setCurrent(values);
    }
    const onChangePageSize = (values) => {
        setPageSize(values);
    }
    const fetch = () => {
        (async () => {
            try {
                const data1 = await searchAllUser(search, current - 1, pageSize);
                console.log(data1);
                const users = data1.content;
                const arr = users.map((user, index) => {
                    return {
                        ...user,
                        key: index + 1,
                        onDelete: handleDelete,
                        onEdit: handleEdit,
                    };
                });
                setTotal(data1.count);
                setData([...arr]);
            } catch (e) {
                console.log(e)
            }
        })();
    }

    useEffect(() => {
        fetch();
    }, [search, pageSize, current]);
    return (
        <>
            <Card
                type="inner"
                title="Quản lý người dùng"
                extra={
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Space direction="vertical">
                            <Search
                                placeholder="search name user"
                                onSearch={handleSearch}
                                style={{
                                    width: 200,
                                }}
                                value={search}
                                onChange={handleChange}
                            />
                        </Space>
                        <Button type="primary" onClick={showDrawer}>
                            Add new
                        </Button>
                        <Button type="primary">Export</Button>
                        <Drawer
                            title="Thêm người dùng"
                            placement="right"
                            onClose={onClose}
                            open={open}
                            // width={""}
                            size="medium"
                        >
                            <FormAdd handleAdd={handleAdd} onClose={onClose}/>
                        </Drawer>
                    </div>
                }
            >
                <Table
                    columns={userColumns}
                    dataSource={data}
                    pagination={false}
                />
            </Card>

            <Pagination
                className="pagination"
                size="big"
                align="end"
                total={total}
                showSizeChanger
                current={current}
                pageSize={pageSize}
                onChange={onChange}
                onShowSizeChange={onChangePageSize}
            />
        </>
    )
}

