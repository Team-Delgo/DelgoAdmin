import React, { useState, useEffect, useCallback } from "react";
import Header from "../../components/Header";
import axios, { AxiosResponse } from "axios";
import "./UserPage.scss";
import user from "../../common/api/user";
import moment from "moment";
import Modal from "../../components/Modal";

function UserPage() {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageButtons, setPageButtons] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchData() {
      const res = await user(currentPage);
      const { data, code } = res;
      setUserData(data.content);
      const buttons = [];
      for (let i = 1; i <= data.totalPages; i++) {
        buttons.push(i);
      }
      setPageButtons(buttons);
    }
    fetchData();
  }, [currentPage]);

  const enterKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log(search);
    }
  };
  const inputChange = (event: any) => {
    setSearch(event.target.value);
  };
  const totalButtonHandler = (event: any) => [];
  return (
    <div className="user">
      <Header />
      <div className="userTitle-Wrapper">
        <div className="userTitle">유저관리</div>
      </div>
      <div className="user-admin">
        <input
          className="user-input"
          value={search}
          placeholder="이메일 검색"
          onKeyDown={enterKeyDown}
          onChange={inputChange}
        />
        <div className="user-admin-item fix" onClick={totalButtonHandler}>
          정보수정
        </div>
        <div className="user-admin-item delete">선택유저삭제</div>
        <div className="user-admin-item stop">계정 정지</div>
        <div className="user-admin-item save">변경 저장</div>
      </div>
      <div className="user-label">
        <label className="user-label-item number">No.</label>
        <label className="user-label-item name">닉네임</label>
        <label className="user-label-item joinDate">가입일</label>
        <label className="user-label-item profilePhoto">프로필 사진</label>
        <label className="user-label-item email">이메일</label>
        <label className="user-label-item phoneNumber">전화번호</label>
        <label className="user-label-item userState">계정상태</label>
      </div>
      <div className="user-info">
        <div className="user-info-wrapper">
          {userData?.map((user: any, index: number) => (
            <div className="user-info" key={user.userId}>
              <input className="user-checkbox" type="checkbox" />
              <div className="user-info-item number">{index + 1}</div>
              <div className="user-info-item name">{user.name}</div>
              <div className="user-info-item joinDate">
                {moment(user.registDt).format("YYYY-MM-DD")}
              </div>

              <div className="user-info-item profilePhoto">
                <img src={user.profile} alt="프로필 사진" id="profile" />
              </div>
              <div className="user-info-item email">{user.email}</div>
              <div className="user-info-item phoneNumber">{user.phoneNo}</div>
              <div className="user-info-item userState"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {pageButtons.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
export default UserPage;

{
  /* <Modal
alert={`
삭제 시 되돌릴 수 없습니다.
정말로 삭제하시겠습니까?
`}
/> */
}
