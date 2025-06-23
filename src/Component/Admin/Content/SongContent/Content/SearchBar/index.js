import AddSong from "./AddSong";
import SearchBar from "./Search";
import {Col, Row} from "antd";

const TopSider = () => {
    return (
        <Row gutter={5}>
            <Col span={6}>
                <AddSong/>
            </Col>
            <Col span={12}>
                <SearchBar/>
            </Col>

        </Row>
    );
};

export default TopSider;
