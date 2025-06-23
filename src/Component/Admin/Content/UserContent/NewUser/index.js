import {Card, Table} from "antd";
import React, {useEffect, useState} from "react";

import {newUserColumns} from "../../../../../component-default/columns";
import {getNewUser} from "../../../../../services/api/user";


export const NewUserTable = () => {
    const [data, setData] = useState([]);
    const fetch = () => {
        (async () => {
            try {
                const response = await getNewUser();
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
                title="Người dùng mới nhất"
            >
                <Table
                    columns={newUserColumns}
                    dataSource={data}
                    pagination={false}
                    rowClassName={(record) => {
                        if (record.roles.includes("SINGER")) {
                            return "row-singer";
                        }
                        if (!record.roles.includes("SINGER")) {
                            return "row-user";
                        }
                        return "";
                    }}
                />
            </Card>
        </>
    )
}
