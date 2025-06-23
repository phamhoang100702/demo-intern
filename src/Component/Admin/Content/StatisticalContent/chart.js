import React, {useEffect, useState} from "react";
import {Bar} from "@ant-design/plots";
import {getDataChartForListen, getDataChartForSong, getDataChartForUser} from "../../../../services/api/chart";
import {NewSongTable} from "./NewSongs";

export const Chart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        asyncFetch();
    }, []);

    const asyncFetch = () => {
        (async () => {
            try {
                const responseSong = await getDataChartForSong();
                const responseListen = await getDataChartForListen();
                const responseUser = await getDataChartForUser();
                const transformData = (response, type) => {
                    return response?.map(item => ({
                        date: item.date,
                        times: item.count, // hoặc item.times tuỳ backend bạn trả về
                        type: type
                    })) || [];
                };

                const songData = transformData(responseSong.content, 'SONG');
                const listenData = transformData(responseListen.content, 'LISTENS');
                const userData = transformData(responseUser.content, 'USER');
                const combinedData = [...songData, ...listenData, ...userData];
                combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
                setData(combinedData);

                //
                // setData([...data.content]);
            } catch (e) {

            }

        })();
    };
    const config = {
        data,
        xField: "date",
        yField: "times",
        seriesField: "type",
        isGroup: true,
        height: 600, // 👈 Thêm dòng này
        color: ['#E24617', '#7A7EAF', '#CD2562', '#DFF51A'],
        colorField: ({type}) => {
            if (type === 'SONG') return 'Bài hát mới';
            else if (type === 'USER') return 'Người dùng mới';
            else if (type === 'LISTENS') return 'Lượt nghe';
        },
        columnStyle: {
            radius: [60, 100, 0, 0]
        },
        size: "large",
    };


    return (<div style={{width: '100%', height: '600px'}}>
        <Bar {...config} />
        <NewSongTable/>
    </div>)
};
