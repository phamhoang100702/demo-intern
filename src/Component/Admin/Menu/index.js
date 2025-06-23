import {
    CustomerServiceOutlined,
    FundOutlined,
    PlayCircleOutlined,
    UnorderedListOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Link} from "react-router-dom";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const MenuSiderbar = [
    getItem(
        <Link to="/admin-statistical">Thống kê</Link>,
        "statistical",
        <FundOutlined/> // Thay vì AreaChart, Fund thể hiện biểu đồ/tài chính tốt hơn
    ),
    getItem(
        <Link to="/admin-manage-users">Người dùng</Link>,
        "users",
        <UserOutlined/>
    ),
    getItem(
        <Link to="/admin-manage-songs">Bài hát</Link>,
        "songs",
        <PlayCircleOutlined/> // Hợp với bài hát
    ),
    getItem(
        <Link to="/admin-manage-playlists">Playlist</Link>,
        "playlists",
        <UnorderedListOutlined/> // Biểu tượng danh sách
    ),
    getItem(
        <Link to="/admin-genres">Thể loại</Link>,
        "genres",
        <CustomerServiceOutlined/> // Giữ nguyên vì phù hợp với chủ đề âm nhạc
    )
];

export default MenuSiderbar;
