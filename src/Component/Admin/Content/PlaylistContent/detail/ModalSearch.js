import React, {useEffect, useRef, useState} from "react";
import {Avatar, Button, Divider, Form, Input, List, Modal, Select,} from "antd";
import {useDispatch, useSelector} from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import {getDetailPlaylist, updatePlaylist,} from "../../../../../services/api/playlist";
import {getSongPage} from "../../../../../services/api/song";
import {closeModalSearch} from "../../../../../redux/actions/admin/playlist";

const ModalSearch = (props) => {
    const {data, reload, setReload} = props;
    const [listChoosed, setListChoosed] = useState([]);
    const [listSongExistted, setListSongExisted] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [page, setPage] = useState(0);
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const inputNameRef = useRef(null);
    const open = useSelector((state) => state.openModal.open);
    const dispatch = useDispatch();
    const [form] = Form.useForm();


    const handleOk = async () => {
        await updatePlaylist(
            {
                ...data,
                name: inputNameRef.current.input.value,
                songs: [...listChoosed.map((i) => i.id)]
            });
        window.location.reload();
        setListSongExisted([...listChoosed]);
        setListChoosed([]);
        setReload(!reload);
        dispatch(closeModalSearch());
    };
    const handleCancel = () => {
        dispatch(closeModalSearch());
    };

    const onSearch = async (value) => {
        if (value === "") setResultSearch([]);
        else {
            setResultSearch(
                (await getSongPage(value)).content.content.filter((i) => i.status === 2)
            );
        }
    };
    const fetchData = async (search = "", pageNum = 1, append = false) => {
        setLoading(true);
        const res = await getSongPage(search, pageNum);
        const newData = res.content.filter(i => i.visible);

        if (newData.length === 0) {
            setHasMore(false);
        }


        setResultSearch(prev =>
            append ? [...prev, ...newData] : newData
        );
        setLoading(false);
    };

    // Search khi người dùng nhập
    const handleSearch = (value) => {
        setSearchText(value);
        setPage(1);
        setHasMore(true);
        fetchData(value, 1, false);
    };

    // Cuộn xuống gọi thêm trang tiếp theo
    const handlePopupScroll = (e) => {
        const {scrollTop, scrollHeight, clientHeight} = e.target;
        if (scrollTop + clientHeight >= scrollHeight - 5 && !loading && hasMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(searchText, nextPage, true);
        }
    };


    const onChange = async (value) => {
        const target = resultSearch.find((item) => item.id === value);
        console.log('vao day', target)
        if (listChoosed.findIndex((i) => i.id === target.id) === -1) {
            const arr = [...listChoosed, target];
            setListChoosed(arr);
            form.resetFields();
            setResultSearch([]);
        }
    };

    const filterOption = (input, option) => {
        for (let o of listSongExistted) {
            if (option.value === o.id) return false;
        }
        return true;
    };

    useEffect(() => {
        (async () => {
            try {
                const response = await getDetailPlaylist(data.id);
                console.log('response', response)
                setListSongExisted(response.content.songSet);
                setListChoosed(response.content.songSet);
            } catch (e) {

            }
        })();
    }, [reload, data]);
    return (
        <>
            <Modal
                open={open}
                title="Sửa playlist"
                onOk={handleOk}
                onCancel={handleCancel}
                width={"50%"}
                cancelButtonProps={{style: {display: "none"}}}
            >
                <Input
                    placeholder="Tên playlist"
                    style={{marginBottom: 16}}
                    defaultValue={data.name}
                    ref={inputNameRef}
                />

                <Form form={form}>
                    <Form.Item>
                        <Select
                            style={{width: "100%"}}
                            showSearch
                            placeholder="Chọn bài hát"
                            optionFilterProp="children"
                            onSelect={onChange}
                            onSearch={handleSearch}
                            onPopupScroll={handlePopupScroll}
                            filterOption={filterOption}
                            options={resultSearch.map((i) => ({
                                label: i.title,
                                value: i.id, // Gán value theo id hoặc gì tùy bạn
                            }))}
                            loading={loading}
                            notFoundContent={loading ? "Loading..." : "No results"}
                        />
                    </Form.Item>
                </Form>
                <Divider>Result</Divider>
                <InfiniteScroll
                    dataLength={listChoosed ? listChoosed.length : 0}
                    hasMore={listChoosed ? listChoosed.length < 10 : false}
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={listChoosed}
                        renderItem={(item) => (
                            <List.Item key={item.id}>
                                <List.Item.Meta
                                    avatar={
                                        <>
                                            {item.thumbnail ? (
                                                <Avatar src={item.thumbnail}/>
                                            ) : (
                                                <Avatar
                                                    src={
                                                        "https://e1.pngegg.com/pngimages/1001/845/png-clipart-somacro-45-300dpi-social-media-icons-soundcloud-soundcloud-logo.png"
                                                    }
                                                />
                                            )}
                                        </>
                                    }
                                    title={<a href="">{item.title}</a>}
                                    description={`Singer: ${item.singers
                                        .map((s) => s.name)
                                        .join(", ")}`}
                                />
                                <Button
                                    danger
                                    onClick={() => {
                                        setListChoosed(listChoosed.filter((i) => i.id !== item.id));
                                        console.log("id item>>>>>>>>>>>", item.id);
                                    }}
                                >
                                    Remove
                                </Button>
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </Modal>
        </>
    );
};
export default ModalSearch;
