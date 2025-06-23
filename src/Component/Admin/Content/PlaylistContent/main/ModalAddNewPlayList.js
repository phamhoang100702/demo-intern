import React from "react";
import {Modal} from "antd";
import FormAddPlaylist from "./FormAddPlaylist";
import {useDispatch, useSelector} from "react-redux";
import {closeModalAddNewPlaylist} from "../../../../../redux/actions/admin/playlist";

const ModalAddNewPlaylist = (props) => {
    const {reload, setReload} = props;
    const open = useSelector((state) => state.openModal.open);
    console.log("xxxx", open);
    const dispatch = useDispatch();
    const handleOk = () => {
    };
    const handleCancel = () => {
        dispatch(closeModalAddNewPlaylist());
    };
    return (
        <>
            <Modal
                title="Tạo mới Playlist"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
                cancelButtonProps={{
                    style: {
                        display: "none",
                    },
                }}
            >
                <FormAddPlaylist reload={reload} setReload={setReload}/>
            </Modal>
        </>
    );
};
export default ModalAddNewPlaylist;
