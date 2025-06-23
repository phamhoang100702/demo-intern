import React, {useEffect, useState} from "react";
import {Avatar, List} from "antd";
import {countClickAll, countClickByDay, countClickByMonth, countClickByWeek,} from "../../../../services/api/click";

const SongList = ({time}) => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        (async () => {
            let data;
            if (time.includes("All")) {
                // console.log(time);
                data = await countClickAll();
            } else if (time.includes("Month")) {
                // console.log(time);

                data = await countClickByMonth();
            } else if (time.includes("Week")) {
                // console.log(time);
                data = await countClickByWeek();
            } else {
                // console.log(time);
                data = await countClickByDay();
            }
            if (data.content) {
                console.log("data", data.content)
                setDataSource(data.content);
            }
        })();
    }, [time]);
    return (
        <List
            itemLayout="horizontal"
            dataSource={dataSource}
            renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={
                            <>
                                {item.thumbnail ? (
                                    <Avatar src={item.thumbnail} size={"large"}/>
                                ) : (
                                    <Avatar
                                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=2`}
                                    />
                                )}
                            </>
                        }
                        title={<a>{item.title}</a>}
                    />
                </List.Item>
            )}
        />
    );
};
export default SongList;
