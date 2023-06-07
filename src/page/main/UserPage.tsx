import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import Header from "../../components/Header";
import leftArrow from "../../common/icons/leftArrow.svg";
import rightArrow from "../../common/icons/rightArrow.svg";
import green from "../../common/icons/green.svg";
import red from "../../common/icons/red.svg";
import "./UserPage.scss";
import { user, userOne, userDelete } from "../../common/api/user";
import moment from "moment";
import Modal from "../../components/Modal";
import Popup from "../../components/Popup";

export interface User {
  userId: number;
  email: string;
  userName: string;
  phoneNo: string;
  address: string;
  profile: string;
  userSocial: string;
  isNotify: boolean;
  petId: number;
  petName: string;
  breedName: string;
  birthday: string;
  registDt: string;
  isChecked: boolean;
}

function UserPage() {
  const [userData, setUserData] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageButtons, setPageButtons] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalAlert, setModalAlert] = useState("");
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const startPage = Math.floor(currentPage / 10) * 10; // 현재 페이지가 속한 그룹의 시작 페이지
  const endPage = Math.min(startPage + 9, pageButtons.length - 1);

  useEffect(() => {
    fetchData();
  }, [currentPage, checkedList]);

  const fetchData = async () => {
    const res = await user(currentPage);
    const { data, code } = res;
    setUserData(data.content);
    //체크박스 checked로 화면에 보여주기 만약 checkedlist에 userId 들어있을시
    const updatedData: User[] = data.content.map((user: User) => {
      const isChecked = checkedList.includes(user.userId.toString());
      return {
        ...user,
        isChecked,
      };
    });

    setUserData(updatedData);

    const buttons = [];
    for (let i = 0; i <= data.totalPages - 1; i++) {
      buttons.push(i);
    }
    setPageButtons(buttons);
  };

  const searchData = async () => {
    if (search != "") {
      const res = await userOne(search);
      const { data, code } = res;

      if (data) {
        setUserData([data]);

        const buttons = [];
        for (let i = 0; i <= data.totalPages - 1; i++) {
          buttons.push(i);
        }
        setPageButtons(buttons);
      } else {
        setUserData([]);
        setPageButtons([]);
      }
    } else {
      fetchData();
    }
  };

  const enterKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await searchData();
    }
  };

  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const totalButtonHandler = () => {
    setIsDisabled(false);
  };

  const deleteButtonHandler = () => {
    setModalAlert("선택한 유저를 삭제하시겠습니까?");
    setShowModal(true);
  };

  const stopButtonHandler = () => {
    console.log("stop");
    setModalAlert("선택한 유저를 정지하시겠습니까?");
    setShowModal(true);
  };

  const closeModalHandler = () => {
    setShowModal(false);
  };

  const YesClickHandler = async () => {
    setShowModal(false);
    if (checkedList.length === 0) {
      console.log("없음");
    } else {
      console.log(checkedList);
      for (const userId of checkedList) {
        const response = await userDelete(userId);
        setCheckedList([]);
        console.log("데이터 삭제 완료:", response);
      }
      fetchData();
    }
    setIsDisabled(true);
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

  const profileImageClickHandler = (userId: number) => {
    setSelectedUserId(userId);
    document.body.style.overflow = "hidden";
    setShowPopup(true);
    console.log(userId);
  };

  const PopupCloseHandler = () => {
    document.body.style.overflow = "unset";
    setShowPopup(false);
  };

  return (
    <div className="user">
      {showModal && (
        <Modal
          alert={modalAlert}
          no={closeModalHandler}
          onYes={YesClickHandler}
        />
      )}
      {showPopup && (
        <Popup onClose={PopupCloseHandler} userId={selectedUserId} />
      )}

      <Header />
      <div className="userTitle-Wrapper">
        <div className="userTitle">유저관리</div>
      </div>
      <div className="user-admin">
        <input
          className="user-input"
          value={search}
          placeholder="유저아이디 검색"
          onKeyDown={enterKeyDown}
          onChange={inputChange}
        />
        <button className="user-admin-item fix" onClick={totalButtonHandler}>
          정보수정
        </button>
        <button
          className="user-admin-item delete"
          onClick={deleteButtonHandler}
          disabled={isDisabled}
        >
          선택유저삭제
        </button>
        <button
          className="user-admin-item stop"
          onClick={stopButtonHandler}
          disabled={isDisabled}
        >
          계정 정지
        </button>
      </div>
      <div className="user-label">
        <label className="user-label-item number">No.</label>
        <label className="user-label-item id">고유번호</label>
        <label className="user-label-item name">닉네임</label>
        <label className="user-label-item joinDate">가입일</label>
        <label className="user-label-item profilePhoto">프로필 사진</label>
        <label className="user-label-item email">이메일(아이디)</label>
        <label className="user-label-item phoneNumber">전화번호</label>
        <label className="user-label-item userState">계정상태</label>
      </div>
      <div className="user-info">
        <div className="user-info-wrapper">
          {userData?.map((user: User, index: number) => (
            <div className="user-info" key={user.userId}>
              <input
                className="user-checkbox"
                id={String(user.userId)}
                type="checkbox"
                disabled={isDisabled}
                checked={user.isChecked}
                onChange={(e) => {
                  onCheckedItem(e.target.checked, e.target.id);
                }}
              />
              <label htmlFor={String(user.userId)}></label>
              <div className="user-info-item number">{index + 1}</div>
              <div className="user-info-item id">{user.userId}</div>
              <div className="user-info-item name">{user.userName}</div>
              <div className="user-info-item joinDate">
                {moment(user.registDt, "YYYY.MM.DD/HH:mm/dddd").format(
                  "YYYY-MM-DD"
                )}
              </div>
              <div className="user-info-item profilePhoto">
                <img
                  src={user.profile}
                  alt="프로필 사진"
                  id="profile"
                  onClick={() => profileImageClickHandler(user.userId)}
                />
              </div>
              <div className="user-info-item email">{user.email}</div>
              <div className="user-info-item phoneNumber">{user.phoneNo}</div>
              <div className="user-info-item userState"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="pagination">
        {startPage > 0 && (
          <img
            src={leftArrow}
            alt="logo"
            className="arrow-left"
            onClick={() => setCurrentPage(startPage - 1)}
          />
        )}
        {pageButtons.slice(startPage, endPage + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        ))}
        {endPage < pageButtons.length - 1 && (
          <img
            src={rightArrow}
            alt="logo"
            className="arrow-right"
            onClick={() => setCurrentPage(endPage + 1)}
          />
        )}
      </div>
    </div>
  );
}
export default UserPage;
