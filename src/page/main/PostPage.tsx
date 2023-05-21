import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import Header from "../../components/Header";
import "./PostPage.scss";
import moment from "moment";
import Modal from "../../components/Modal";
import dog from "../../common/image/dog.jpeg";
import post from "../../common/api/post";

export interface Post {
  certificationId: number;
  placeName: string;
  description: string;
  address: string;
  photoUrl: string;
  commentCount: number;
  userId: number;
  userName: string;
  userProfile: string;
  likeCount: number;
  registDt: string;
}

function PostPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [postData, setpostData] = useState<Post[]>([]);

  const fetchData = async () => {
    const res = await post(currentPage);
    const { data, code } = res;
    setpostData(data.content);
    console.log(data);
    const buttons = [];
    for (let i = 0; i <= data.totalPages - 1; i++) {
      buttons.push(i);
    }
    // setPageButtons(buttons);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(search);
    }
  };
  const handleChange = (event: any) => {
    setSearch(event.target.value);
  };
  return (
    <div className="post">
      <Header />
      <div className="postAdmin">
        <div className="postAdmin-Title">인증글 관리</div>
        <input
          className="postAdmin-input"
          value={search}
          placeholder="유저아이디 검색"
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
        {postData?.map((post: Post, index: number) => (
          <div className="post-info-wrapper">
            <div className="post-info-upper" key={post.userId}>
              <input className="post-info checkbox" type="checkbox" />
              <div className="post-info userId">{post.userId}</div>
              <div className="post-info date">
                {moment(post.registDt, "YYYY.MM.DD/HH:mm/dddd").format(
                  "YYYY-MM-DD"
                )}
              </div>
            </div>
            <div className="post-info photo">
              <img src={post.photoUrl} alt="게시물 사진" />
            </div>
            <div className="post-info title">{post.placeName}</div>
            <div className="post-info contents">{post.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default PostPage;
