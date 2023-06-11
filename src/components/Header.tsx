import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.scss";
import headerlogo from "../common/icons/titleLogo.svg";
import person from "../common/icons/person.svg";
function Header() {
  let tab = (useLocation().state as any) || "main";
  const [selected, setSeleceted] = useState({
    userPage: false,
    postPage: false,
    main: true,
  });

  const navigation = useNavigate();
  const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget;

    if (tab === id) return;
    setSeleceted((prev) => {
      const temp = {
        userPage: false,
        postPage: true,
        main: false,
      };
      return { ...temp, [id]: true };
    });
    navigation(`/${id}`, { state: id });
  };

  return (
    <div className="header">
      <div className="header-wrapper">
        <div className="header-logo">
          <img src={headerlogo} alt="logo" id="headerlogo" />
        </div>
        <div className="header-button">
          {/* <img src={headerfootprint} alt="logo" id="headerfootprint" /> */}
          <div className="mainbutton" id="main" onClick={clickHandler}>
            멍플
          </div>
          <div className="postbutton" id="post" onClick={clickHandler}>
            인증글
          </div>
          <div className="userbutton" id="user" onClick={clickHandler}>
            유저
          </div>
          <img src={person} alt="logo" id="person" />
        </div>
      </div>
    </div>
  );
}
export default Header;
