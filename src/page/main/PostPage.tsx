import React, { useState } from "react";
import Header from "../../components/Header";
import "./PostPage.scss";
import moment from "moment";
import Modal from "../../components/Modal";
import dog from "../../common/image/dog.jpeg";
function PostPage() {
  const [search, setSearch] = useState("");
  const [postData, setpostData] = useState([]);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(search);
    }
  };
  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };
  const post = {
    userId: "User_id",
    Date: "2022.12.25",
    photo: dog,
    title: "글제목이 여기에 들어옵니다오...",
    content:
      "글 내용을 여기레오호호호호호호여기레오호호호호호호여기레오호호호호호...",
  };
  return (
    <div className="post">
      <Header />
      <div className="postAdmin">
        <div className="postAdmin-Title">인증글 관리</div>
        <input
          className="postAdmin-input"
          value={search}
          placeholder="검색"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
        />
        <div className="postAdmin-button">
          <div className="postAdmin-button showA">전체글 보기</div>
          <div className="postAdmin-button showR">신고글만 보기</div>
          <div className="postAdmin-button delete">선택글 삭제</div>
        </div>
      </div>
      <div className="post-info">
        <div className="post-info-wrapper" key={post.userId}>
          <input className="post-info checkbox" type="checkbox" />
          <div className="post-info userId">{post.userId}</div>
          <div className="post-info date">
            {moment(post.Date).format("YYYY.MM.DD")}
          </div>
        </div>
        <div className="post-info photo">
          <img src={post.photo} alt="게시물 사진" />
        </div>
        <div className="post-info title">{post.title}</div>
        <div className="post-info contents">{post.content}</div>
      </div>
    </div>
  );
}
export default PostPage;
