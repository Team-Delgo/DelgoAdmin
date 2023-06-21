import React, { useState } from "react";
import "./DropDown.scss";

interface Props {
  onClick: (selectedValue: string) => void;
}

const dropDownList = [
  { code: "CA0000", name: "전체" },
  { code: "CA0002", name: "카페" },
  { code: "CA0003", name: "식당" },
  { code: "CA0005", name: "미용/목욕" },
  { code: "CA0006", name: "병원" },
  { code: "CA0007", name: "유치원/호텔" },
];

function DropDown({ onClick }: Props) {
  const [selectedValue, setSelectedValue] = useState("");

  const clickEventHandler = (e: React.MouseEvent<HTMLElement>) => {
    const value = e.currentTarget.getAttribute("value");
    if (value) {
      setSelectedValue(value);
      onClick(value); // 부모 컴포넌트로 선택된 값을 전달
    }
  };

  return (
    <div className="dropDown">
      {dropDownList.map((data) => (
        <li key={data.code} onClick={clickEventHandler} value={data.code}>
          {data.name} {data.code}
          <hr />
        </li>
      ))}
    </div>
  );
}
export default DropDown;
