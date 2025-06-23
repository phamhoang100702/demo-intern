import {Card, Table} from "antd";
import React, {useEffect, useState} from "react";
import {newSongsColumn} from "../../../../component-default/columns";
import {getLatestSong} from "../../../../services/api/song";


export const NewSongTable = () => {
    const [data, setData] = useState([]);
    const fetch = () => {
        (async () => {
            try {
                const response = await getLatestSong();
                if (response.content) {
                    setData(response.content);
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }

    useEffect(() => {
        fetch();
    }, []);
    return (
        <>
            <Card
                type="inner"
                title="Bài hát mới nhất"
            >
                <Table
                    columns={newSongsColumn}
                    dataSource={data}
                    pagination={false}
                    size="small"
                    scroll={{x: 1000, y: 400}} // 👈 Kéo ngang nếu tổng width > 1000, kéo dọc nếu > 400px
                    style={{maxWidth: "100%", overflowX: "auto"}}
                />
            </Card>
        </>
    )
}
