import {Button, Card, Popconfirm} from "antd";
import ModalSearch from "./ModalSearch";
import {useDispatch} from "react-redux";
import SongOfPlaylist from "./SongOfPlaylist";
import {deletePlaylist, getDetailPlaylist} from "../../../../../services/api/playlist";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {openModalSearch} from "../../../../../redux/actions/admin/playlist";

export const DetailPlaylist = () => {
    const {id} = useParams();
    const [reload, setReload] = useState(false);
    const [data, setData] = useState({});
    const dispatch = useDispatch();
    console.log("id", id)

    useEffect(() => {
        (async () => {
            try {
                const response = await getDetailPlaylist(id);
                console.log(response)
                setData(response.content);
            } catch (e) {

            }
        })();
    }, []);

    const showModalSearch = () => {
        dispatch(openModalSearch());
    };

    const navigate = useNavigate();


    const confirm = (e) => {
        console.log(e);
    };
    const cancel = (e) => {
        console.log(e);
    };

    const checkPlaylist = () => {
        console.log("sss", data.role === "FAVORITE")
        return data.role === "FAVORITE";
    }

    return (
        <>
            <Card
                title={`Chi tiết playlist : ${data.name} của ${data.ownerId}`}
                extra={
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 10,
                            alignItems: "center",
                        }}
                    >
                        <Button type="primary" onClick={showModalSearch} disabled={checkPlaylist()}>
                            Edit this playlist
                        </Button>

                        <Popconfirm
                            disabled={checkPlaylist()}
                            title="Delete playlist"
                            description="Are you sure to delete this playlist?"
                            onConfirm={confirm}
                            onCancel={cancel}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                disabled={checkPlaylist()}
                                danger
                                onClick={async () => {
                                    await deletePlaylist(data.id);
                                    navigate(-1);
                                }}
                            >
                                Delete this playlist
                            </Button>
                        </Popconfirm>
                    </div>
                }
            >
                <SongOfPlaylist data={data} reload={reload} setReload={setReload}/>
            </Card>

            <ModalSearch
                data={data}
                reload={reload}
                setReload={setReload}
                name={data.name}
            />
        </>
    );
};
