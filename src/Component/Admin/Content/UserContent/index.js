import React from "react";
import {Col, Row} from "antd";

import "./index.css"
import {UserTable} from "./UserTable";
import {SingerTable} from "./SingerTable";
import {TopSingerByCreatedSong} from "./TopSingerByCreatedSong";
import {NewUserTable} from "./NewUser";


export const OverviewUser = () => {

    return (
        <>
            <h2> Quản lý người dùng</h2>
            <Row className='row-table'>
                <Col span={11} className='table-user'>
                    <NewUserTable/>
                </Col>
                <Col span={11} className='table-user'>
                    <TopSingerByCreatedSong/>
                </Col>
            </Row>

            <Row className='row-table'>
                <Col span={11} className='table-user'>
                    <UserTable/>
                </Col>
                <Col span={11} className='table-user'>
                    <SingerTable/>
                </Col>
            </Row>
        </>
    );
};
