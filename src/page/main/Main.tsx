import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import Header from "../../components/Header";
import leftArrow from "../../common/icons/leftArrow.svg";
import rightArrow from "../../common/icons/rightArrow.svg";
import "./Main.scss";
import moment from "moment";
import { place, placeOne } from "../../common/api/place";
import Modal from "../../components/Modal";

export interface Place {}

function MainPage() {
  const [placeData, setplaceData] = useState<Place[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageButtons, setPageButtons] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalAlert, setModalAlert] = useState("");
  const [checkedList, setCheckedList] = useState<Array<string>>([]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    const res = await place(currentPage);
    const { data, code } = res;
    setplaceData(data.content);
    const buttons = [];
    for (let i = 0; i <= data.totalPages - 1; i++) {
      buttons.push(i);
    }
    setPageButtons(buttons);
  };

  const searchData = async () => {
    if (search != "") {
      const res = await placeOne(search);
      const { data, code } = res;

      if (data) {
        setplaceData([data]);
        console.log(data);
        const buttons = [];
        for (let i = 0; i <= data.totalPages - 1; i++) {
          buttons.push(i);
        }
        setPageButtons(buttons);
      } else {
        setplaceData([]);
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
  const deleteButtonHandler = () => {
    console.log("delete");
    setModalAlert("선택한 멍플을 삭제하시겠습니까?");
    setShowModal(true);
  };

  const saveButtonHandler = () => {};

  const closeModal = () => {
    setShowModal(false);
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
    <div className="place">
      {showModal && <Modal alert={modalAlert} no={closeModal} />}
      <Header />
      <div className="placeTitle-Wrapper">
        <div className="placeTitle">멍플관리</div>
      </div>
      <div className="place-admin">
        <input
          className="place-input"
          value={search}
          placeholder="업체/지역 이름검색"
          onKeyDown={enterKeyDown}
          onChange={inputChange}
        />
        <button className="place-admin-item save" onClick={saveButtonHandler}>
          변경 저장
        </button>
        <button
          className="place-admin-item delete"
          onClick={deleteButtonHandler}
        >
          선택삭제
        </button>
      </div>
      <div className="place-label">
        <label className="place-label-item number">No.</label>
        <label className="place-label-item category">카테고리</label>
        <label className="place-label-item name">업체이름</label>
        <label className="place-label-item address">주소</label>
        <label className="place-label-item photo">업체사진 썸네일</label>
        <label className="place-label-item detail">상세수정</label>
      </div>
      <div className="place-info">
        {/* <div className="place-info-wrapper">
          {placeData?.map((place: Place, index: number) => (
            <div className="place-info" key={place.placeId}>
              <input
                className="place-checkbox"
                id={String(place.placeId)}
                type="checkbox"
                onChange={(e) => {
                  onCheckedItem(e.target.checked, e.target.id);
                }}
              />
              <label htmlFor={String(place.placeId)}></label>
              <div className="place-info-item number">{index + 1}</div>
              <div className="place-info-item category">{place.category}</div>
              <div className="place-info-item name">{place.name}</div>
              <div className="place-info-item address">{place.adress}</div>
              <div className="place-info-item profilePhoto">
                <img src={place.photo} alt="프로필 사진" id="profile" />
              </div>
              <div className="place-info-item placeState">수정</div>
            </div>
          ))}
        </div> */}
      </div>
      <div className="pagination">
        {pageButtons.length > 10 && currentPage > 1 && (
          <img src={leftArrow} alt="logo" className="arrow-left" />
        )}
        {pageButtons.map((pageNumber) => (
          <button
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber + 1}
          </button>
        ))}
        {pageButtons.length > 10 && (
          <img src={rightArrow} alt="logo" className="arrow-right" />
        )}
      </div>
    </div>
  );
}
export default MainPage;
