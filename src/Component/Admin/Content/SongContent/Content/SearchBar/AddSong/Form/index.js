import React, { useEffect, useState } from "react";
import { Button, Form, Input, Row, Col, Select, Space } from "antd";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { getAllCategory } from "../../../../../../../../services/api/category";
import {getAllSinger, searchSinger} from "../../../../../../../../services/api/singer";
import {uploadFileSound, saveSong, getSongById, saveSongWithFormData} from "../../../../../../../../services/api/song";
import { useDispatch } from "react-redux";
import { addSong } from "../../../../../../../../redux/actions/admin/song";
import {moods} from "../../../../../../../../constants/moods";
/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};
/* eslint-enable no-template-curly-in-string */

const handleSinger = (singers)=>{
  // console.log(singers)
  const arr = singers.map((singer)=>{
    const arr1 = singer.split(";");
    return  arr1[1];
  })
  return arr;
}

const handleGenres = (genres)=>{
  console.log(genres);
  return genres.join(',');
}

const handleMoods = (moods)=>{
  return moods.join(',');
}

const AddForm = ({ onSubmit }) => {
  const [disabled, setDisabled] = useState(true);
  const [source, setSource] = useState(null);
  const [files, setFiles] = useState({});
  // api
  const [options, setOptions] = useState([]);
  const [listSinger, setListSinger] = useState([]);
  const [optionCategory, setOptionCategory] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    // let songSubmi
    try{
      let form1 = new FormData();
      if(!files["sound"]) {
        alert("Bạn phải thêm file âm thanh");
        return;
      }
      form1.append("sound", files["sound"]);
      if(files["lyric"]) form1.append("lyric", files["lyric"]);
      if(files["avatar"]) form1.append("thumbnail", files["avatar"]);
      const saveSongData = async () => {
        const singers = handleSinger( values.song.singers);
        console.log(values);
        const newSong = {
          title: values.song.title,
          singers : singers,
          visible: values.song.visible,
          genres: handleGenres(values.song.genres),
          moods : handleMoods(values.song.moods)
        }
        console.log('newsong', newSong)
        form1.append("song", new Blob([JSON.stringify(newSong)], {type: "application/json"}));
        console.log('new song', newSong)
        console.log('form', form1)
        const obj = await saveSongWithFormData(form1);

        dispatch(addSong(obj.content))
      };

      saveSongData();

      onSubmit();

      form.setFieldsValue({
        song: {
          title: "",
          genres: [],
          singers: [],
          lyric: "",
          sound: "",
          thumbnail: "",
          moods: [],
          visible: false,
        },
      });
      setSource("");
    }catch ( e){

    }

  };
  // api

  const onChangeMp3 = (e) => {
    let file = document.querySelector("#fileMp3");
    file = file.files[0];
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
      setDisabled(false);
    }
  };

  const onChangeLyric = (e) => {
    let file = document.querySelector("#fileLyric");
    file = file.files[0];
    if (file && file.name.endsWith(".lrc")) {
      // Assuming setSource is a function to set the source of your audio element
      setFiles((pre) => {
        return {
          ...pre,
          lyric: file,
        };
      });
      // setDisabled(!disabled);
    } else {
      setDisabled(true);
    }
  };

  const onChangeImg = (e) => {
    let filePath = document.querySelector("#fileAvatar");
    filePath = filePath.files[0];
    if (
      filePath &&
      (filePath.name.endsWith(".jpg") ||
        filePath.name.endsWith(".png") ||
        filePath.name.endsWith(".jpeg"))
    ) {
      // setDisabled(!disabled);
      setFiles((pre) => {
        return {
          ...pre,
          avatar: filePath,
        };
      });
    }
  };

  useEffect(() => {
    async function fetch_category() {
      setListCategory(['rap','pop','hip-hop']);
      const object1 = await searchSinger();
      const arr2 = object1.content;
      setListSinger(arr2);
    }
    fetch_category();
  }, []);

  useEffect(() => {
    // console.log(listSinger);
    const data = listSinger.map((singer) => {
      return {
        value: singer.name + ";" + singer.id,
        label: singer.name,
        key: singer.id,
        desc: singer.name ,
      };
    });
    // console.log(data);
    setOptions([...data]);
  }, [listSinger]);

  useEffect(() => {
    const data = listCategory.map((category) => {
      return {
        value: category,
        label: category
      };
    });
    // console.log(data);
    setOptionCategory([...data]);
  }, [listCategory]);

  return (
    <Form
      form={form}
      name="song"
      onFinish={onFinish}
      validateMessages={validateMessages}
      layout="vertical"
      initialValues={{
        song: {
          title: "",
          genres: [],
          singers: [],
          moods: [],
          lyric: "",
          sound: "",
          thumbnail: "",
          visible: false,
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
            <Input width="100%" />
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
        <Col span={12}>
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
              mode="multiple"
              placeholder="select singer"
              optionLabelProp="label"
              options={options}
              optionRender={(option) => (
                <Space>
                  <span role="img" aria-label={option.data.label}>
                    {option.data.emoji}
                  </span>
                  {option.data.desc}
                </Space>
              )}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["song", "moods"]} label="Tags">
            <Select
                mode="multiple"
                style={{
                  width: "100%",
                }}
                placeholder="Chọn tags"
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
        <Col span={12}>
          <Form.Item name={["song", "thumbnail"]} label={"Ảnh"}>
            <Input type="file" onChange={onChangeImg} id="fileAvatar"></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["song", "genres"]} label="Thể loại">
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Chọn thể loại"
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
      </Row>

      <Row gutter={16} content="center">
        <Col span={12}>
          <Form.Item name={["song", "sound"]} label={"File âm thanh"}>
            <Input
              type="file"
              accept=".mp3"
              id="fileMp3"
              onChange={onChangeMp3}
            ></Input>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["song", "lyric"]} label={"Lời nhạc"}>
            <Input
              type="file"
              accept=".lrc"
              id="fileLyric"
              onChange={onChangeLyric}
            ></Input>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item>
            <AudioPlayer src={source} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={disabled}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddForm;
