import React, {useEffect, useState} from "react";
import {Card, Col, Row, Statistic} from "antd";
import {AudioOutlined, CustomerServiceFilled, SketchOutlined, UserOutlined,} from "@ant-design/icons";
import {getMusicCount} from "../../../../services/api/song";
import {getUserCount} from "../../../../services/api/user";
import {getTotalClick} from "../../../../services/api/click";

const shadow = "0 4px 8px rgba(0, 0, 0, 0.4)";
export const StatisticalDetails = () => {
    const [data, setData] = useState(pre => {
        return {
            ...pre,
            totalCensor: 0,
            totalSinger: 0,
            totalPlaylist: 0,
            totalUser: 0,
            totalSong: 0
        }
    })


    useEffect(() => {
        (async () => {
            const userCount = await getUserCount();
            const musicCount = await getMusicCount();
            const totalListen = await getTotalClick();
            if (!userCount.content || !musicCount.content) return;
            setData((pre) => {
                return {
                    ...pre,
                    totalSinger: userCount.content.numberOfSingers,
                    totalPlaylist: musicCount.content.numberOfPlaylists,
                    totalUser: userCount.content.numberOfUsers,
                    totalSong: musicCount.content.numberOfSongs,
                    totalListen: totalListen.content,
                };
            });
        })();
    }, []);
    return (
        <Row gutter={[12, 12]} justify="space-around">
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                    bordered={false}
                    style={{
                        background: "#28a745",
                        boxShadow: shadow,
                    }}
                >
                    <Statistic
                        title={
                            <span style={{color: "#fff", fontSize: "1rem"}}>Người dùng</span>
                        }
                        value={data.totalUser}
                        valueStyle={{color: "#fff", fontWeight: "800"}}
                        prefix={<UserOutlined/>}
                        suffix={<span style={{fontSize: "0.9rem"}}>Người dùng</span>}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                    bordered={false}
                    style={{background: "#17a2b8", boxShadow: shadow}}
                >
                    <Statistic
                        title={
                            <span style={{color: "#fff", fontSize: "1rem"}}>Ca sĩ</span>
                        }
                        value={data.totalSinger}
                        valueStyle={{color: "#fff", fontWeight: "800"}}
                        prefix={<AudioOutlined/>}
                        suffix={<span style={{fontSize: "0.9rem"}}>Ca sĩ</span>}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                    bordered={false}
                    style={{background: "#440382", boxShadow: shadow}}
                >
                    <Statistic
                        title={
                            <span style={{color: "#fff", fontSize: "1rem"}}>Bài hát</span>
                        }
                        value={data.totalSong}
                        valueStyle={{color: "#fff", fontWeight: "800"}}
                        prefix={<CustomerServiceFilled/>}
                        suffix={<span style={{fontSize: "0.9rem"}}>Bài hát</span>}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                    bordered={false}
                    style={{
                        background: "#28a745",
                        boxShadow: shadow,
                    }}
                >
                    <Statistic
                        title={
                            <span style={{color: "#fff", fontSize: "1rem"}}>Playlist</span>
                        }
                        value={data.totalPlaylist}
                        valueStyle={{color: "#fff", fontWeight: "800"}}
                        prefix={<UserOutlined/>}
                        suffix={<span style={{fontSize: "0.9rem"}}>PLaylist</span>}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <Card
                    bordered={false}
                    style={{background: "#ebd517", boxShadow: shadow}}
                >
                    <Statistic
                        title={
                            <span style={{color: "#000", fontSize: "1rem"}}>
                Lượt nghe
              </span>
                        }
                        value={data.totalListen}
                        valueStyle={{color: "#000", fontWeight: "800"}}
                        prefix={<SketchOutlined/>}
                        suffix={<span style={{fontSize: "0.9rem"}}>Lượt nghe </span>}
                    />
                </Card>
            </Col>
        </Row>
    );
};
