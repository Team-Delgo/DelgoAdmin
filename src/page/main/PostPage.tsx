import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  ChangeEvent,
} from "react";
import Header from "../../components/Header";
import "./PostPage.scss";
import moment from "moment";
import Modal from "../../components/Modal";
import { post, postOne, postDelete } from "../../common/api/post";

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
  isChecked: boolean;
}

function PostPage() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [postData, setPostData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [lastPage, setLastPage] = useState(false);
  const pageEnd = useRef<any>(null);

  const fetchData = async () => {
    setLoading(true);
    const res = await post(currentPage);
    const { data, code } = res;
    //console.log(data);
    setLastPage(data.last);
    setPostData((prevData) => [...prevData, ...data.content]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        console.log(search);
        if (!lastPage && !loading && search === "") {
          setCurrentPage((prev) => prev + 1);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastPage, search]);

  const searchData = async () => {
    if (search != "") {
      const res = await postOne(parseInt(search));
      const { data, code } = res;
      if (data) {
        setPostData(data.content);
      } else {
        setPostData([]);
      }
    } else {
      setPostData([]);
      fetchData();
      console.log("reset");
    }
  };

  const enterKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // console.log(search);
      await searchData();
    }
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const onCheckedItem = useCallback(
    (checked: boolean, item: string) => {
      if (checked) {
        setCheckedList((prev) => [...prev, item]);
        console.log(checkedList);
      } else if (!checked) {
        setCheckedList(checkedList.filter((el) => el !== item));
      }
    },
    [checkedList]
  );

  return (
    <div className="post">
      <Header />
      <div className="postAdmin">
        <div className="postAdmin-Title">인증글 관리</div>
        <input
          className="postAdmin-input"
          value={search}
          placeholder="유저아이디 검색"
          onKeyDown={enterKeyDown}
          onChange={inputChange}
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
                <input
                  className="post-info checkbox"
                  id={String(post.userId)}
                  type="checkbox"
                  checked={post.isChecked}
                  onChange={(e) => {
                    onCheckedItem(e.target.checked, e.target.id);
                  }}
                />
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
