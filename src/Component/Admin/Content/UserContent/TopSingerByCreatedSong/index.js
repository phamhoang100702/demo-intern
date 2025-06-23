import React, {useEffect, useState} from "react";
import {Pie} from '@ant-design/plots';
import {Card} from "antd";
import {getUserCount} from "../../../../../services/api/user";

export const TopSingerByCreatedSong = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const response = await getUserCount();
                if (response.content) {
                    setData(response.content);
                }
            } catch (e) {
                console.log(e);
            }
        })();
    }, []);

    const numberOfUsers = data?.numberOfUsers ?? 1;
    const numberOfSingers = data?.numberOfSingers ?? 1;
    const total = numberOfUsers + numberOfSingers;

    const config = {
        data: [
            {type: 'Ca sĩ', value: numberOfSingers / total},
            {type: 'Người dùng', value: numberOfUsers / total},
        ],
        angleField: 'value',
        colorField: 'type',
        label: {
            text: ({value}) => `${(value * 100).toFixed(1)}%`, // Hiển thị dạng phần trăm
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    };

    return (
        <Card
            type="inner"
            title="Biểu đồ số lượng người dùng và số lượng ca sĩ"
        >
            <Pie {...config} />
        </Card>
    );
};
