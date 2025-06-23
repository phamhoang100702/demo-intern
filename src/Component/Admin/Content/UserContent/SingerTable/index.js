import React, {useEffect, useLayoutEffect, useState} from "react";
import {Button, Card, Space, Table, Drawer, Pagination} from "antd";
import Search from "antd/es/input/Search";
import FormAdd from "./FormAdd";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {singerColumns} from "../../../../../component-default/columns";
import {deleteSingerById, searchSinger} from "../../../../../services/api/singer";
import {getLocalStorage} from "../../../../../services/localstorage";
import {getUserInformation} from "../../../../../services/api/user";
import {setAuth} from "../../../../../redux/actions/auth";
// const handleDelete = () => {};


export const SingerTable = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let authData = useSelector((state) => state.authReducer.authData);
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
    const onChange = (values) => {
        setCurrent(values);
    }
    const onChangePageSize = (values) => {
        console.log(values)
        setPageSize(values);
    }
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
            await deleteSingerById(id);
            fetch();
        })();
    };

    // console.log(data)
    function fetch() {
        (async () => {
            const data1 = await searchSinger(search,current - 1,pageSize);
            const singers = data1.content;
            // console.log(singers);
            const arr = singers.map((singer, index) => {
                return {
                    ...singer,
                    key: index + 1,
                    onDelete: handleDelete,
                    onEdit: handleEdit,
                };
            });
            setTotal(data1.count);
            // console.log("chay vao day");
            // console.log(arr)
            setData([...arr]);
        })();
    }

    useEffect(() => {
        fetch();
    }, [search, pageSize, current]);
    useLayoutEffect(() => {
        if (getLocalStorage("user-token") != "") {
            if (authData == null) {
                (async () => {
                    try {
                        const data = await getUserInformation(getLocalStorage());
                        if (data.status != "ok") {
                            window.location.replace("http://localhost:9100/");
                            return;
                        } else dispatch(setAuth(data.content));
                    } catch (e) {
                    }
                })();
            }
            fetch();
        } else {
            navigate("/");
            window.location.reload();
            return;
        }
    }, []);
    return (
        <>
            <Card
                className="custom-card"
                bordered={true}
                type="inner"
                title="Quản lý ca sĩ"
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
                        <Button type="primary">
                            Export
                        </Button>
                        <Drawer
                            title="NEW SINGER"
                            placement="right"
                            onClose={onClose}
                            open={open}
                            // width={""}
                            width={"500px"}
                        >
                            <FormAdd handleAdd={handleAdd} onClose={onClose}/>
                        </Drawer>
                    </div>
                }
            >
                <Table
                    columns={singerColumns}
                    dataSource={data}
                    pagination={false}
                />
            </Card>
            <Pagination
                className="pagination"
                size="big"
                align="end"
                total={total}
                current={current}
                pageSize={pageSize}
                onChange={onChange}
                onShowSizeChange={onChangePageSize}
            />
        </>
    );
};
