import ListMain from "./main/ListMain";
import {Button, Pagination} from "antd";
import {useDispatch} from "react-redux";
import ModalAddNewPlaylist from "./main/ModalAddNewPlayList";
import React, {useState} from "react";
import {openModalAddNewPlaylist} from "../../../../redux/actions/admin/playlist";
import Search from "antd/es/input/Search";

export const ManagePlaylists = () => {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(10);
    const [reload, setReload] = useState(false);
    const dispatch = useDispatch();
    const handleOpenDrawerAddNewPlaylist = () => {
        dispatch(openModalAddNewPlaylist());
    };
    const onChangePageSize = (current, size) => {
        setPageSize(size);
        setPage(1); // hoặc 0 tùy logic backend (1-based hoặc 0-based)
    }
    const onChange = (e) => {
        setPage(e);
    }

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Quản lý danh sách playlist</h1>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10, // khoảng cách giữa các phần tử
                    }}
                >
                    <Search
                        placeholder="Tìm kiếm playlist"
                        onSearch={handleSearch}
                        style={{
                            width: 200,
                        }}
                        value={search}
                        onChange={handleSearch}
                    />
                    <Button type="primary" onClick={handleOpenDrawerAddNewPlaylist}>
                        Add new playlist
                    </Button>
                </div>
            </div>
            <ListMain
                reload={reload}
                setReload={setReload}
                search={search}
                page={page}
                pageSize={pageSize}
                setTotal={setTotal}
            />
            <ModalAddNewPlaylist reload={reload} setReload={setReload}/>
            <Pagination
                className="pagination"
                size="big"
                align="end"
                total={total}
                showSizeChanger
                current={page}
                pageSize={pageSize}
                onChange={onChange} // cập nhật lại state 0-based
                onShowSizeChange={onChangePageSize}
            />

        </>
    );
};
