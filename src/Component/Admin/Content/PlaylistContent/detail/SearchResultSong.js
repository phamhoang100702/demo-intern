import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Avatar, Button, Divider, List} from "antd";

const SearchResultSong = (props) => {
    const {listChoosed, setListChoosed} = props;
    console.log("choose", listChoosed)

    return (
        <div
            id="scrollableDiv"
            style={{
                height: 250,
                overflow: "auto",
                padding: "0 16px",
                border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
        >
            <InfiniteScroll
                dataLength={listChoosed.length}
                hasMore={listChoosed.length < 10}
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
                                }}
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
export default SearchResultSong;
