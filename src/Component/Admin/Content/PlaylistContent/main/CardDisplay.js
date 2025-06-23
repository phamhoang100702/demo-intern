import {Card} from "antd";
import Meta from "antd/es/card/Meta";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {openListSongOfPlaylist} from "../../../../../redux/actions/admin/playlist";

export const CardDisplay = (props) => {
    const {reload, setReload, selected} = props;
    const [imgsrc, setImgsrc] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenPlaylist = () => {
        navigate(`/detail-playlist/${selected.id}`);
        console.log("selected", selected);
        dispatch(openListSongOfPlaylist(selected));
    };

    useEffect(() => {
        (async () => {
            setImgsrc(selected.thumbnail);
        })();
    }, []);

    return (
        <>
            <Card
                hoverable
                style={{width: "70%"}}
                cover={
                    <>
                        {imgsrc ? (
                            <img
                                alt="example"
                                src={imgsrc}
                                style={{
                                    aspectRatio: "1/1",
                                    objectFit: "cover",
                                    width: "100%",
                                }}
                            />
                        ) : (
                            <img
                                style={{
                                    aspectRatio: "1/1",
                                    objectFit: "cover",
                                    width: "100%",
                                }}
                                alt="example"
                                src="https://e1.pngegg.com/pngimages/1001/845/png-clipart-somacro-45-300dpi-social-media-icons-soundcloud-soundcloud-logo.png"
                            />
                        )}
                    </>
                }
                onClick={handleOpenPlaylist}
            >
                <Meta
                    title={<span style={{fontSize: 18}}>{selected.name}</span>}
                    description=""
                />
            </Card>
        </>
    );
};
