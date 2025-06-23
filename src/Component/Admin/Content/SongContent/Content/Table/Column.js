import { Tag, Space, Button, Row, Col } from "antd";
import EditSong from "./EditSong";
import { deleteSongById } from "../../../../../../services/api/song";
import { useDispatch } from "react-redux";
import { deleteSong } from "../../../../../../redux/actions/admin/song";

const ButtonHandleDelete = ({ record }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    const del = async () => {
      const dt = await deleteSongById(record.id);
    };
    del();

    dispatch(deleteSong(record.id));
  };
  return (
    <Button type="primary" danger onClick={handleDelete}>
      Delete
    </Button>
  );
};

const columns = [
  {
    title: "#",
    dataIndex: "key",
    key: "key",
  },
  {
    title: "Tên bài hát",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Ca sĩ ",
    dataIndex: "singers",
    key: "singers",
    render: (_, { singers }) => {
      return singers.map((singer, index) => {
        return <Tag key={index}>{singer.name}</Tag>;
      });
    },
    width : '20%'
  },
  {
    title: "Trạng thái",
    dataIndex: "visible",
    key: "visible",
    render: (_, { visible }) => {
      let color,value;
      if(visible){
        color = "blue"
        value ="CÔNG KHAI"
      }
      else {
        color = "gray"
        value = "RIÊNG TƯ"
      }

      return (
        <>
          <Tag color={color}>{value}</Tag>
        </>
      );
    },
  },
  {
    title: "Thể loại",
    dataIndex: "genres",
    key: "genres",
    render: (_, { genres }) => {
      return genres.split(',').map((genre, index) => {
        return <Tag key={index}>{genre}</Tag>;
      });
    },
  },
  {
    title: "Tags",
    dataIndex: "moods",
    key: "moods",
    render: (_, { moods }) => {
      return moods.split(',').map((moods, index) => {
        return <Tag key={index}>{moods}</Tag>;
      });
    },
  },
  {
    title: "Ngày phát hành",
    key: "releasedDate",
    render: (_, { releasedDate }) => {
      if(!releasedDate) return <></>;
      const d = releasedDate.includes("@") ? releasedDate.split("@") : releasedDate;
      return <>{d[0]}</>;
    },
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {

      return (
        <Space size="middle">
          <EditSong record={record} />

          <ButtonHandleDelete record={record} />
        </Space>
      );
    },
    width: "10%",
  },
];

export default columns;
