import React, { useState, useEffect, useCallback, ChangeEvent } from "react";
import Header from "../../components/Header";
import leftArrow from "../../common/icons/leftArrow.svg";
import rightArrow from "../../common/icons/rightArrow.svg";
import downArrow from "../../common/icons/downArrow.svg";
import close from "../../common/icons/close.svg";
import "./Main.scss";
import DropDown from "../../components/DropDown";
import {
  place,
  placeOne,
  placeDelete,
  placePhoto,
} from "../../common/api/place";
import Modal from "../../components/Modal";

export interface Place {
  mungpleId: number;
  categoryCode: string;
  placeName: string;
  jibunAddress: string;
  photoUrl: string | undefined;
}

function MainPage() {
  const [placeData, setPlaceData] = useState<Place[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageButtons, setPageButtons] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [modalAlert, setModalAlert] = useState("");
  const [checkedList, setCheckedList] = useState<Array<string>>([]);
  const [category, setCategory] = useState<string>("CA0000");
  const [selectedImage, setSelectedImage] = useState([]);
  const startPage = Math.floor(currentPage / 10) * 10; // 현재 페이지가 속한 그룹의 시작 페이지
  const endPage = Math.min(startPage + 9, pageButtons.length - 1);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    fetchData();
  }, [currentPage, category]);

  const fetchData = async () => {
    const res = await place(currentPage, category);
    const { data, code } = res;
    //console.log(res.data);
    setPlaceData(data.content);
    const updatedData: Place[] = data.content.map((place: Place) => {
      const isChecked = checkedList.includes(place.mungpleId.toString());
      return {
        ...place,
        isChecked,
      };
    });
    setPlaceData(updatedData);
    const buttons = [];
    for (let i = 0; i <= data.totalPages - 1; i++) {
      buttons.push(i);
    }
    setPageButtons(buttons);
  };

  const searchData = async () => {
    if (search != "") {
      const res = await placeOne(search, currentPage);
      console.log(search);
      const { data, code } = res;

      if (data) {
        setPlaceData(data.content);
        console.log(data);
        const buttons = [];
        for (let i = 0; i <= data.totalPages - 1; i++) {
          buttons.push(i);
        }
        setPageButtons(buttons);
      } else {
        setPlaceData([]);
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
    if (checkedList.length != 0) {
      setModalAlert("삭제시 되돌릴 수 없습니다.\n정말로 삭제하시겠습니까?");
      setShowModal(true);
    }
  };

  const totalButtonHandler = () => {
    if (isDisabled === true) setIsDisabled(false);
    else setIsDisabled(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  const YesClickHandler = async () => {
    setShowModal(false);
    if (checkedList.length === 0) {
      console.log("없음");
    } else {
      console.log(checkedList);
      for (const mungpleId of checkedList) {
        const response = await placeDelete(mungpleId);
        setCheckedList([]);
        console.log("데이터 삭제 완료:", response);
      }
      fetchData();
    }
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

  const dropDownHandler = (selectedValue: string) => {
    console.log("Selected value:", selectedValue);
    setCategory(selectedValue);
    setShowDropDown(false);
    fetchData();
    setCurrentPage(0);
  };
  const detailButtonHandler = () => {
    console.log("click");
  };
  const photoUploadHandler = (mungpleId: string) => {
    const fileInput = document.getElementById("file") as HTMLInputElement;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const formData = new FormData();
      formData.append("photo", file);

      placePhoto(mungpleId, formData);
      console.log("Thumbnail upload success");
      // 썸네일 업로드 성공 처리
    } else {
      console.log("No file selected");
      // 파일 선택되지 않은 경우 처리
    }
  };
  return (
    <div className="place">
      {showModal && (
        <Modal alert={modalAlert} onYes={YesClickHandler} no={closeModal} />
      )}
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
        {/* <button className="place-admin-item save" onClick={saveButtonHandler}>
          변경 저장
        </button> */}
        <button className="user-admin-item fix" onClick={totalButtonHandler}>
          정보수정
        </button>
        <button
          className="place-admin-item delete"
          onClick={deleteButtonHandler}
          disabled={isDisabled}
        >
          선택삭제
        </button>
      </div>
      <div className="place-label">
        <label className="place-label-item number">No.</label>
        <label className="place-label-item category">
          카테고리
          <img
            src={downArrow}
            className="arrow-down"
            onClick={() => {
              setShowDropDown((prevState) => !prevState);
            }}
          />
          <div className="dropdown-wrapper">
            {showDropDown && <DropDown onClick={dropDownHandler} />}
          </div>
        </label>
        <label className="place-label-item name">업체이름</label>
        <label className="place-label-item address">주소</label>
        <label className="place-label-item photo">업체사진 썸네일</label>
        <label className="place-label-item detail">활성화</label>
      </div>
      <div className="place-info">
        <div className="place-info-wrapper">
          {placeData?.map((place: Place, index: number) => (
            <div className="place-info" key={place.mungpleId}>
              <input
                className={`place-checkbox${isDisabled ? "-isDisabled" : ""}`}
                id={String(place.mungpleId)}
                type="checkbox"
                onChange={(e) => {
                  onCheckedItem(e.target.checked, e.target.id);
                }}
                disabled={isDisabled}
              />
              <label htmlFor={String(place.mungpleId)}></label>
              <div className="place-info-item number">{index + 1}</div>
              <div className="place-info-item category">
                {place.categoryCode}
              </div>
              <div className="place-info-item name">{place.placeName}</div>
              <div className="place-info-item address">
                {place.jibunAddress}
              </div>
              <div className="place-info-item profilePhoto">
                {place.photoUrl ? (
                  <div className="photoBox\">
                    <img src={place.photoUrl} alt="프로필 사진" id="profile" />
                    <img src={close} id="close" />
                  </div>
                ) : (
                  <div className="fileBox">
                    <label htmlFor="file">업로드</label>
                    <input
                      type="file"
                      id="file"
                      onChange={(event) =>
                        photoUploadHandler(String(place.mungpleId))
                      }
                      accept=".png, .jpg/*"
                    />
                  </div>
                )}
              </div>
              <div
                className="place-info-item detail"
                onClick={detailButtonHandler}
              >
                수정
              </div>
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
export default MainPage;
