import React, {useEffect, useState} from "react";
import {Alert, Button, Form, Input, Select, Space} from "antd";
import {savePlaylistForMainPage,} from "../../../../../services/api/playlist";
import SearchResultSong from "../detail/SearchResultSong";
import {getSongPage} from "../../../../../services/api/song";
import {useDispatch} from "react-redux";
import {closeModalAddNewPlaylist} from "../../../../../redux/actions/admin/playlist";

const {Option} = Select;

const FormAddPlaylist = (props) => {
    const {reload, setReload} = props;
    const [page, setPage] = useState(0);
    const [listChoosed, setListChoosed] = useState([]);
    const [resultSearch, setResultSearch] = useState([]);
    const [msg, setMsg] = useState("");
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const onChange = async (value) => {
        const target = resultSearch.find((item) => item.id === value);
        if (listChoosed.findIndex((i) => i.id === target.id) === -1) {
            const arr = [...listChoosed, target];
            setListChoosed(arr);
            form.resetFields();
            setResultSearch([]);
        }
    };
    useEffect(() => {
        (async () => {
            try {
                fetchData();
            } catch (e) {

            }
        })();
    }, [reload, searchText]);
    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) => {
        // console.log(option.value + " vs " + input.toLowerCase());
        return true;
    };

    const onStatusChange = (value) => {
    };

    const fetchData = async (search = "", pageNum = 0, append = false) => {
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
        setPage(0);
        setHasMore(true);
        fetchData(value, 0, false);
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


    const onFinish = async (values) => {
        if (listChoosed?.length <= 1) {
            setMsg("Playlist must have more than 2 songs !");

        } else {
            setMsg("");
            const playlistCreated = await savePlaylistForMainPage({
                name: values.name,
                status: true,
                role: 'NORMAL',
                songs: listChoosed.map((i) => i.id)
            });

            dispatch(closeModalAddNewPlaylist());
            setListChoosed([]);
            form.resetFields();
            setReload(!reload);
        }
    };

    //console.log("list choosed", listChoosed);

    return (
        <Form
            name="control-hooks"
            onFinish={onFinish}
            style={{
                maxWidth: 600,
            }}
            form={form}
        >
            <Form.Item
                name="name"
                label="Name"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input placeholder="Enter name of playlist"/>
            </Form.Item>
            <Form.Item
                name="song"
                label="Song"
                rules={[
                    {
                        required: false,
                    },
                ]}
            >
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
                        value: i.id,
                        key: i.id// Gán value theo id hoặc gì tùy bạn
                    }))}
                    loading={loading}
                    notFoundContent={loading ? "Loading..." : "No results"}
                />
            </Form.Item>

            <Form.Item>
                <SearchResultSong
                    listChoosed={listChoosed}
                    setListChoosed={setListChoosed}
                />
            </Form.Item>

            {msg !== "" && (
                <Alert
                    style={{margin: "20px 0px"}}
                    message="Error"
                    description={msg}
                    type="error"
                    showIcon
                />
            )}

            <Form.Item>
                <Space style={{display: "flex", justifyContent: "end"}}>
                    <Button type="primary" htmlType="submit">
                        Add new playlist
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};
export default FormAddPlaylist;
