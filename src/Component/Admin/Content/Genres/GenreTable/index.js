import {Button, Card, Drawer, Pagination, Space, Table} from "antd";
import Search from "antd/es/input/Search";
import FormAdd from "./FormAdd";
import React, {useEffect, useState} from "react";
import {genresColumn, genresData} from "../../../../../component-default/columns";
import {deleteUserById} from "../../../../../services/api/user";


export const GenresTable = () => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [current, setCurrent] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [total, setTotal] = useState(10);
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
    const handleAdd = (genre) => {
        setData([
            ...data,
            {
                ...genre,
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
                /* const data1 = await searchAllUser(search, current - 1, pageSize);
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
                     */
                setData(genresData)
                setTotal(10)
                setCurrent(1)
                setPageSize(5)
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
                title="Danh sách thể loai bài hát"
                extra={
                    <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
                        <Space direction="vertical">
                            <Search
                                placeholder="Search tên thể loai"
                                onSearch={handleSearch}
                                style={{
                                    width: 200,
                                }}
                                value={search}
                                onChange={handleChange}
                            />
                        </Space>
                        <Button type="primary" onClick={showDrawer}>
                            Thêm mới
                        </Button>
                        <Button type="primary">Xuất excel</Button>
                        <Drawer
                            title="Thêm thể loại"
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
                    columns={genresColumn}
                    dataSource={data}
                    pagination={false}
                    size={"small"}
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

