import {Button, Popconfirm, Space, Tag} from "antd";
import FormEdit from "../Component/Admin/Content/UserContent/UserTable/EditUser";
import React from "react";
import SingerEditForm from "../Component/Admin/Content/UserContent/SingerTable/Edit";

export const userColumns = [
    {
        title: "#",
        key: "key",
        dataIndex: "key",
    },
    {
        title: "Tên người dùng",
        dataIndex: "name",
        key: "name",
        // filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: "30%",
    },
    {
        title: "Tên đăng nhập",
        dataIndex: "username",
        key: "username",
        // sorter: (a, b) => a.age - b.age,
    },
    {
        title: "Ngày tham gia",
        dataIndex: "createdDate",
        key: "createdDate",
        render: (_, {createdDate}) => {
            const arr = createdDate.split("T");
            return <>{arr[0]}</>;
        },
    },
    {
        title: "Hành động",
        key: "action",
        render: (_, record) => {
            return (
                <Space size="middle">
                    <FormEdit record={record}/>
                    <Button
                        danger
                        type="primary"
                        onClick={() => {
                            record.onDelete(record.id);
                        }}
                    >
                        Delete
                    </Button>
                </Space>
            );
        },
        width: "10%",
    },
    // {
    //   title : "Action",
    //   key: "action",
    //   render:(_,record)=>{
    //     return (
    //       <Space size="middle">
    //         < record={record} />
    //         <Button record={record} />
    //       </Space>
    //     );
    //   }
    // }
];


export const singerColumns = [
    {
        title: "#",
        key: "key",
        dataIndex: "key",
        width: "3%",
    },
    {
        title: "Nghê danh",
        dataIndex: "name",
        key: "name",
        // filterMode: "tree",
        width: "15%",
    },
    {
        title: "Tên đăng nhập",
        dataIndex: "username",
        key: "username",
        // filterMode: "tree",
        width: "15%",
    },
    {
        title: "Ngày thàm gia",
        dataIndex: "createdDate",
        key: "createdDate",
        render: (_, {createdDate}) => {
            const arr = createdDate.split("T");
            return <>{arr[0]}</>;
        },
        width: "10%",
    },
    {
        title: "Hành động",
        key: "action",
        render: (_, record) => {
            return (
                <Space size="middle">
                    <SingerEditForm record={record}/>
                    <Popconfirm
                        title="Delete "
                        description="Are you sure to delete?"
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            type="primary"
                            onClick={() => {
                                record.onDelete(record.id);
                            }}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            );
        },
        width: "10%",
    },
];


export const topSingerBySongsColumn = [
    {
        title: "#",
        key: "key",
        dataIndex: "key",
    },
    {
        title: "Nghê danh",
        dataIndex: "name",
        key: "name",
        // filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: "30%",
    },
    {
        title: "Số lượng bài hát đã tạo ",
        dataIndex: "numberOfSongs",
        key: "numberOfSongs",
    },
    {
        title: "Bài hát mới nhất",
        dataIndex: "latestSong",
        key: "latestSong",
    }
]

export const newUserColumns = [
    {
        title: "#",
        key: "key",
        dataIndex: "key",
        width: "1%",
    },
    {
        title: "Tên tài khoản",
        dataIndex: "username",
        key: "username",
        // filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.name.startsWith(value),
        width: "20%",
    },
    {
        title: "Vai trò",
        key: "roles",
        dataIndex: "roles",
        width: "10%",
        render: (_, {roles}) => {
            const arr = roles.split(",");
            return <>{arr[0]}</>;
        }
    },
    {
        title: "Ngày tạo tài khoản",
        dataIndex: "createdDate",
        key: "createdDate",
        onFilter: (createdDate) => createdDate.split("T")[0],
        width: "20%",
    }
]


export const genresColumn = [
    {
        title: "#",
        key: "key",
        dataIndex: "key",
        width: "3%",
    },
    {
        title: "Tên thể loại",
        dataIndex: "name",
        key: "name",
        // filterMode: "tree",
        width: "30%",
    },
    {
        title: "Mô tả",
        dataIndex: "description",
        key: "description",
        // filterMode: "tree",
        width: "15%",
    },
    {
        title: "Số lượng bài hát",
        dataIndex: "numberOfSong",
        key: "numberOfSong",
        // filterMode: "tree",
        width: "15%",
    }
]
export const genresData = [
    {
        key: 1,
        name: "Pop",
        description: "Nhạc phổ biến, giai điệu dễ nghe, phù hợp đại chúng.",
        numberOfSong: 50,
    },
    {
        key: 2,
        name: "Rock",
        description: "Nhạc mạnh mẽ với guitar điện và trống nổi bật.",
        numberOfSong: 0,

    },
    {
        key: 3,
        name: "Hip Hop",
        description: "Nhạc mang đậm chất đường phố với rap và beat sôi động.",
        numberOfSong: 50,

    },
    {
        key: 4,
        name: "Jazz",
        description: "Nhạc ngẫu hứng với saxophone và piano đặc trưng.",
        numberOfSong: 0,

    },
    {
        key: 5,
        name: "Classical",
        description: "Nhạc cổ điển mang tính học thuật và nghệ thuật cao.",
        numberOfSong: 10,

    },
    {
        key: 6,
        name: "R&B",
        description: "Nhạc nhẹ nhàng với giai điệu quyến rũ và lời ca tình cảm.",
        numberOfSong: 50,

    },
    {
        key: 7,
        name: "Electronic",
        description: "Nhạc điện tử hiện đại với âm thanh tổng hợp.",
        numberOfSong: 40,

    },
    {
        key: 8,
        name: "Country",
        description: "Nhạc đồng quê với giai điệu mộc mạc, kể chuyện.",
        numberOfSong: 5,

    },
    {
        key: 9,
        name: "Reggae",
        description: "Nhạc Jamaica với tiết tấu chậm, thư giãn.",
        numberOfSong: 20,
    },
    {
        key: 10,
        name: "K-Pop",
        description: "Nhạc Hàn Quốc sôi động, kết hợp vũ đạo và thời trang.",
        numberOfSong: 30,
    },
];
export const newSongsColumn = [
    {
        title: "Ảnh",
        dataIndex: "thumbnail",
        key: "thumbnail",
        render: (_, {thumbnail}) => (
            <img
                src={thumbnail}
                alt="thumbnail"
                style={{width: 60, height: 60, borderRadius: 6, objectFit: "cover"}}
            />
        ),
        width: "20%",
    },
    {
        title: "Tiêu đề",
        dataIndex: "title",
        key: "title",
        width: "20%",
    },
    {
        title: "Ca sĩ ",
        dataIndex: "singers",
        key: "singers",
        render: (_, {singers}) => {
            return singers ? singers.map((singer, index) => {
                return <Tag key={index}>{singer.name}</Tag>;
            }) : "";
        },
        width: '40%'
    },
    {
        title: "Ngày phát hành",
        key: "releasedDate",
        render: (_, {releasedDate}) => {
            if (!releasedDate) return <></>;
            const d = releasedDate.includes("T") ? releasedDate.split("T") : releasedDate;
            console.log(d);
            return <>{d[0]}</>;
        },
    },
]
