import React, {useEffect, useState} from "react";
import {Col, Divider, Row} from "antd";
import {CardDisplay} from "./CardDisplay";
import {searchPlaylist} from "../../../../../services/api/playlist";

const count = 10;

const ListMain = (props) => {
    const [data, setData] = useState([]);
    const {reload, setReload, search, page, pageSize, setTotal} = props;
    useEffect(() => {
        (async () => {
            const datasrc = await searchPlaylist(search, page, pageSize);
            setData(datasrc.content);
            setTotal(datasrc.count)
        })();
    }, [reload, search, page, pageSize]);

    return (
        <>
            <Divider orientation="left">Danh sách playlist</Divider>
            <Row gutter={[16, 16]}>
                {data &&
                    data.map((item) => (
                        <Col className="gutter-row" span={4} key={item.id}>
                            <CardDisplay selected={item}/>
                        </Col>
                    ))}
            </Row>
        </>
    );
};
export default ListMain;
