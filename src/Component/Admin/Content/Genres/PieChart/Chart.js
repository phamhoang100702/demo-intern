import React from 'react';
import {Pie} from "@ant-design/plots";

export const PieGenre = () => {
    const config = {
        data: [
            {type: 'Pop', value: 50 / 260},
            {type: 'R&B', value: 50 / 260},
            {type: 'Hip-hop', value: 50 / 260},
            {type: 'Electronic', value: 40 / 260},
            {type: 'K-Pop', value: 30 / 260},
            {type: 'Thể loại khác', value: 40 / 260},
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
        tooltip: ({type, value}) => {
            // Extra fields
            return {type, value};
        },
        interaction: {
            tooltip: {
                render: (e, {items}) => {
                    return (
                        <React.Fragment>
                            {items.map((item) => {
                                const {type, value, color} = item;
                                return (
                                    <div key={type}
                                         style={{margin: 0, display: 'flex', justifyContent: 'space-between'}}>
                                        <div>
                      <span
                          style={{
                              display: 'inline-block',
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              backgroundColor: color,
                              marginRight: 6,
                          }}
                      ></span>
                                            <span>{type}</span>
                                        </div>
                                        <b>{value}</b>
                                    </div>
                                );
                            })}
                        </React.Fragment>
                    );
                },
            },
        },
    };
    return <Pie {...config} />;
};

