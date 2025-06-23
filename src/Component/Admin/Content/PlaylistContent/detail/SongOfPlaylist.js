import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Avatar, Button, Divider, List, Skeleton} from "antd";
import {removeSongFromPlaylist,} from "../../../../../services/api/playlist";

const SongOfPlaylist = (props) => {
    const {data, reload, setReload} = props;
    const [datasrc, setDataSrc] = useState([]);
    useEffect(() => {

        if (data.songSet && data.songSet.length > 0) {
            setDataSrc(data.songSet)
        }
    }, [data]);
    const checkPlaylist = () => {
        return data.role === 'FAVORITE';
    }

    return (
        <div
            id="scrollableDiv"
            style={{
                height: 500,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
        >
            <InfiniteScroll
                dataLength={datasrc.length}
                //next={loadMoreData}
                hasMore={datasrc.length < 0}
                loader={
                    <Skeleton
                        avatar
                        paragraph={{
                            rows: 1,
                        }}
                        active
                    />
                }
                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                scrollableTarget="scrollableDiv"
            >
                <List
                    dataSource={datasrc}
                    renderItem={(item) => (
                        <List.Item key={item.id}>
                            <List.Item.Meta
                                avatar={
                                    <>
                                        {item.thumbnail ? (
                                            <Avatar src={item.thumbnail}/>
                                        ) : (
                                            <Avatar
                                                src="https://e1.pngegg.com/pngimages/1001/845/png-clipart-somacro-45-300dpi-social-media-icons-soundcloud-soundcloud-logo.png"/>
                                        )}
                                    </>
                                }
                                title={<a>{item.title}</a>}
                                description={""}
                            />
                            <Button
                                danger
                                onClick={() => {
                                    removeSongFromPlaylist(data.id, item.id);
                                    setDataSrc(datasrc.filter((i) => i.id !== item.id));
                                    setReload(!reload);
                                }}
                                disabled={checkPlaylist()}
                            >
                                Remove
                            </Button>
                        </List.Item>
                    )}
                />
            </InfiniteScroll>
        </div>
    );
};
export default SongOfPlaylist;
