import React from "react";
import {Col, Row} from "antd";

import {GenresTable} from "./GenreTable";
import {PieGenre} from "./PieChart/Chart";


export const OverviewGenre = () => {

    return (
        <>
            <h2> Quản lý thể loại bài hát</h2>
            <Row>
                <Col span={11}>
                    <h3> Thống kê số lượng bài hát theo thể loại nhạc</h3>
                    <PieGenre/>
                </Col>
                <Col span={11}>
                    <GenresTable/>
                </Col>
            </Row>
        </>
    )
}
