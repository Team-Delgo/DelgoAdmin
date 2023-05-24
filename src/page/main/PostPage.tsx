import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import "./PostPage.scss";
import moment from "moment";
import Modal from "../../components/Modal";
import { post, postOne } from "../../common/api/post";

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
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);
  const pageEnd = useRef<any>();

  const fetchData = async () => {
    setLoading(true);
    const res = await post(currentPage);
    const { data, code } = res;
    console.log(data.last);
    setLastPage(data.last);
    setPostData((prevData) => [...prevData, ...data.content]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const loadMore = () => {
    if (!lastPage && !loading) setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver( // IntersectionObserver를 생성하여 새로운 observer 변수에 할당합니다.
      (entries: any) => {
        if (entries[0].isIntersecting) {
          // entries는 관찰 대상 요소의 배열입니다. 배열의 첫 번째 요소를 사용합니다.
          loadMore(); // 첫 번째 요소가 화면에 진입한 경우 loadMore 함수를 호출합니다.
        }
      },
      { threshold: 0.8 } // 옵션 객체를 전달하여 관찰자를 설정합니다.
    );
    if (pageEnd.current) {
      observer.observe(pageEnd.current); // 페이지의 하단 요소를 관찰 대상으로 등록합니다.
    }
  }, []);

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
        <div className="post-info-wrapper-container" ref={pageEnd}>
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
export default PostPage;
