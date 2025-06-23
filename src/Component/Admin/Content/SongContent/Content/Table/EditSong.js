import { Button, Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useRef, useState } from "react";
import { Form, Input, Row, Col, Select, Space } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAllCategory } from "../../../../../../services/api/category";
import {
  updateSong, updateSongWithFormData,
  uploadFileSound,
} from "../../../../../../services/api/song";
import { editSong } from "../../../../../../redux/actions/admin/song";
import {searchSinger} from "../../../../../../services/api/singer";
import {moods} from "../../../../../../constants/moods";
import {genres} from "../../../../../../constants/genres";

const validateMessages = {};

const handleSinger = (singers) => {
  const arr = singers.map((singer) => {
    let arr1 = [];
    if (singer.value) {
      arr1 = singer.value.split(";");
    } else {
      arr1 = singer.split(";");
    }
    return arr1[1];
  });
  return arr;
};

const handleCategory = (categories) => {
  return categories.join(',');
};

const handleMoods = (moods) => {
  return moods.join(',');
};

const EditSong = ({ record }) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState(null);
  // api
  const [optionSingers, setOptionSingers] = useState([]);
  const [optionCategory, setOptionCategory] = useState([]);
  const [files, setFiles] = useState({});
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const song_edit = record;
  const audioRef = useRef();
  const [form] = Form.useForm();
  // console.log( "di vao day ",record);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    // setSource(null);
    // audioRef.current.audio.current = null;
    setOpen(false);
  };

  const onFinish = (values) => {
    // console.log("edit");
    // console.log(values);
    console.log(values)
    const updateSongData = async () => {
      try{
        let songUpdate;
        let formData = new FormData();
        if(checked){
          if (values.sound || values.lyric || values.thumbnail) {
            if (files["sound"]) formData.append("sound", files["sound"]);
            if (values.lyric) formData.append("lyric", values.lyric.file);
            if (values.thumbnail) formData.append("thumbnail", values.thumbnail[0].originFileObj);
          }
        }
        const singers = handleSinger(values.song.singers);
        songUpdate = {
          ...values.song,
          singers: singers,
          genres: handleCategory(values.song.genres),
          id: song_edit.id,
          moods: handleMoods(values.song.moods),
          visible: values.visible,
        };
        console.log('songUpdate',songUpdate)
        formData.append("song", new Blob([JSON.stringify(songUpdate)], {type: "application/json"}));

        const nData = await updateSongWithFormData(formData);
        if (nData.status == "ok") {
          dispatch(editSong(nData.content));
          setOpen(false);
        } else {
          alert(nData.message);
        }
      }catch (e){
        console.log(e);
      }

    };
    updateSongData();
  };

  const onChangeMp3 = (e) => {
    const file = e.target.files[0];
    // console.log("change ");
    if (file && file.name.endsWith(".mp3")) {
      // Assuming setSource is a function to set the source of your audio element
      let file1 = URL.createObjectURL(file);

      setFiles((pre) => {
        return {
          ...pre,
          sound: file,
        };
      });
      setSource(file1);
      setChecked(true);
    }
  };



  useEffect(() => {
    setSource(song_edit.sound);
    const fetchApi = async () => {
      const optSinger = await searchSinger();
      const optionCategory = genres;
      let dt = optSinger.content;
      let dt1 = optionCategory;
      const opt1 = dt.map((singer) => {
        return {
          value: singer.name + ";" + singer.id,
          label: singer.name,
          key: singer.id,
          desc: singer.name,
        };
      });
      const opt2 = dt1.map((category) => {
        return {
          value: category.value,
          label: category.label,
        };
      });

      setOptionCategory(opt2);
      setOptionSingers(opt1);
    };
    fetchApi();
    form.setFieldsValue({
      song: {
        title: song_edit.title,
        visible: song_edit.visible,
        singers: song_edit.singers.map((singer) => {
          return {
            value: singer.name + ";" + singer.id,
            label: singer.name,
            key: singer.id,
            desc: singer.name,
          };
        }),
        genres: song_edit.genres.split(',').map((category) => {
          return {
            value: category,
            label: category
          };
        }),
        moods: song_edit.moods.split(',').map((mood) => {
          return {
            value: mood,
            label: mood,
          };
        }),
      },
    });

  }, [record]);
  return (
    <>
      <Button type="primary" onClick={showDrawer}>
        More
      </Button>
      <Drawer
        title="Song Info"
        placement="right"
        onClose={onClose}
        open={open}
        width={"500px"}
        // destroyOnClose={true}
      >
        <Form
          form={form}
          name="song"
          onFinish={onFinish}
          validateMessages={validateMessages}
          layout="vertical"
          initialValues={{
            song: {
              title: song_edit.title,
              visible: song_edit.visible,
              singers: song_edit.singers.map((singer) => ({
                value: `${singer.name};${singer.id}`,
                label: singer.name,
                key: singer.id,
                desc: singer.name, // Đã bỏ đoạn comment + "(" + singer.name + ")"
              })),
              genres: song_edit.genres.split(',').map((genre) => ({
                value: genre,
                label: genre,
                key: genre,
              })),
              moods: song_edit.moods.split(',').map((mood) => ({
                value: mood,
                label: mood,
                key: mood,
              })),
            },
          }}

        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={["song", "title"]}
                label="Tên bài hát"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input width="100%" disabled={false} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["song", "visible"]} label="Trạng thái">
                <Select
                  width="100%"
                  options={[
                    {
                      label: "Công khai",
                      value: true,
                    },
                    {
                      label: "Riêng tư",
                      value: false,
                    }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name={["song", "singers"]}
                label="Ca sĩ"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <Select
                  disabled={true}
                  mode="multiple"
                  placeholder="select singer"
                  optionLabelProp="label"
                  options={optionSingers}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        {option.data.label}
                      </span>
                    </Space>
                  )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={["song", "genres"]} label="Thể loại">
                <Select
                  disabled={false}
                  mode="multiple"
                  style={{
                    width: "100%",
                  }}
                  placeholder="Chọn thể loại bài hát"
                  optionLabelProp="label"
                  options={optionCategory}
                  optionRender={(option) => (
                    <Space>
                      <span role="img" aria-label={option.data.label}>
                        {option.data.label}
                      </span>
                    </Space>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["song", "moods"]} label="Tags">
                <Select
                    disabled={false}
                    mode="multiple"
                    style={{
                      width: "100%",
                    }}
                    placeholder="Chọn tags cho bài hát"
                    optionLabelProp="label"
                    options={moods}
                    optionRender={(option) => (
                        <Space>
                          <span role="img" aria-label={option.data.label}>
                            {option.data.label}
                          </span>
                        </Space>
                    )}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item>
                <AudioPlayer src={source} autoPlay={true} volume={0.5} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={18}>
              <Form.Item name={["song", "fileSound"]} label="Sửa file mp3">
                <Input
                    type="file"
                    title="Sửa file mp3 "
                    onChange={onChangeMp3}
                    ref={audioRef}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};
export default EditSong;
