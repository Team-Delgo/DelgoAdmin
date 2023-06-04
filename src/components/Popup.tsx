import React, { useState, useEffect } from "react";
import "./Popup.scss";
import moment from "moment";
import close from "../common/icons/close.svg";
import { Post } from "../page/main/PostPage";
import { postOne } from "../common/api/post";

interface Props {
  userId: number;
  onClose: () => void; // 팝업 창 닫기 함수를 Props에 추가
}

function Popup({ onClose, userId }: Props) {
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    searchData(); // Execute searchData when the popup is opened
  }, [userId]);
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        console.log(userId);
        if (!lastPage && !loading && userId === 0) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastPage, userId]);

  const searchData = async () => {
    const res = await postOne(userId);
    console.log(userId);
    const { data, code } = res;
    setPostData(data.content);
  };

  return (
    <div className="Popup">
      <div className="Popup-wrapper">
        <img src={close} alt="logo" className="close" onClick={onClose} />
        <div className="Popup-content">
          {postData?.map((post: Post, index: number) => (
            <div className="post-info-wrapper">
              <div className="post-info-upper" key={post.userId}>
                <input className="post-info checkbox" type="checkbox" />
                <div className="post-info userId">{post.userId}</div>
                <div className="post-info date">
                  {moment(post.registDt, "YYYY.MM.DD/HH:mm/dddd").format(
                    "YYYY.MM.DD"
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
    </div>
  );
}
export default Popup;
