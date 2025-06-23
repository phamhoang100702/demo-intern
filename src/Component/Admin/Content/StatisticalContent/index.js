import React, {useLayoutEffect, useState} from "react";
import {StatisticalDetails} from "./StatisticalDetails";
import "./styles/styles.css";
import TopSinger from "./TopSinger";
import TopSong from "./TopSong";
import {Chart} from "./chart";
import {useDispatch, useSelector} from "react-redux";
import {getLocalStorage} from "../../../../services/localstorage";
import {setAuth} from "../../../../redux/actions/auth";
import {useNavigate} from "react-router-dom";
import {getUserInformation} from "../../../../services/api/user";

export const StatisticalMain = () => {
    const [check, setCheck] = useState(true);
    const dispatch = useDispatch();
    let authData = useSelector((state) => state.authReducer.authData);
    const navigate = useNavigate();
    useLayoutEffect(() => {
        setCheck(!check);
        console.log("vao day ")
        if (getLocalStorage("user-token") != "") {
            if (authData == null) {
                (async () => {
                    const data = await getUserInformation(getLocalStorage("user-token"));
                    console.log(data)
                    if (data.status != "ok") {
                        window.location.replace("http://localhost:9100")

                    } else dispatch(setAuth(data.content));
                })()
            }
        } else {
            navigate("/");
            window.location.reload();

        }
    }, [])


    return (
        <div className="wrapper">
            <StatisticalDetails/>
            <div className="list-area">
                <div className="left-list">
                    <h2>Dữ liệu được cập nhật trong 1 tuần gần nhất </h2>
                    <Chart/>
                </div>
                <div className="singer-list">
                    <h2>Ca sĩ có nhiều lượt theo dõi nhất trên nền tảng</h2>
                    <TopSinger/>
                </div>
                <div className="song-list">
                    <h2>Bảng xếp hạng bài hát yêu thích</h2>
                    <TopSong/>
                </div>
            </div>
        </div>
    );
};
