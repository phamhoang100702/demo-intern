import Search from "antd/es/input/Search"
import {useDispatch} from "react-redux"
import React, {useState} from "react"
import {searchSong} from "../../../../../../../redux/actions/admin/song"
import {Button, Space} from "antd";
import {exportSongExcel} from "../../../../../../../services/api/song";

const SearchBar = () => {
    const [searchText, setSearchText] = useState("")
    const dispatch = useDispatch();
    const onChange = (e) => {
        setSearchText(e.target.value)
        dispatch(searchSong(e.target.value))
    }
    const onSearch = () => {
        dispatch(searchSong(searchText))
        setSearchText("")
    }
    const handleExportExcel = () => {
        exportSongExcel(searchText)
    }
    return (
        <>
            <Space direction="horizontal" size="middle">
                <Button
                    type="primary"
                    onClick={handleExportExcel}
                    style={{backgroundColor: "#23ba9f"}}
                >
                    Xuất Excel
                </Button>
                <Search
                    style={{width: 300}}
                    enterButton="Search"
                    placeholder="input search text"
                    color="green"
                    value={searchText}
                    onChange={onChange}
                    onSearch={onSearch}
                />
            </Space>
        </>

    )
}

export default SearchBar
