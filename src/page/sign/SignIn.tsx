import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.scss";
import signin from "../../common/api/signin";
import axios, { AxiosResponse } from "axios";
import { MAIN_PATH } from "../../common/constants/path.const";
import titlelogo from "../../common/icons/titleLogo.svg";
import footprint from "../../common/icons/footprint.svg";

function SignIn() {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState({ email: "", password: "" });

  const onEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const loginFetch = () => {
    signin({ email, password }, (response: AxiosResponse) => {
      const { code, data } = response.data;
      if (code === 200) {
        navigation(MAIN_PATH.MAIN, { replace: true });
      }
      if (code === 304) {
        setFeedback((prev) => {
          return { ...prev, password: "아이디/비밀번호를 확인해주세요." };
        });
      }
    });
  };

  const onButtonHandler = () => {
    loginFetch();
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="logo">
          <img src={footprint} alt="logo" id="footprint" />
          <img src={titlelogo} alt="logo" id="titlelogo" />
        </div>
        <div className="login-title">강아지 델고 동네생활</div>
        <div className="login-input">
          <label className="login-label-email">아이디</label>
          <input
            className="login-input-email"
            type="email"
            id="email"
            value={email}
            onChange={onEmailHandler}
            placeholder="이메일"
          />
        </div>
        <div className="login-input">
          <label className="login-label-password">비밀번호</label>
          <input
            className="login-input-password"
            type="password"
            id="password"
            value={password}
            onChange={onPasswordHandler}
            placeholder="패스워드"
          />
        </div>
        <p className="login-feedback">{feedback.password}</p>
        <button
          type="button"
          className="login-button"
          onClick={onButtonHandler}
        >
          로그인
        </button>
        <div className="login-title1">이 곳은 Delgo 관리자 페이지에요.</div>
        <div className="login-title2">앱을 다운받아 델고를 사용해보세요</div>
      </div>
    </div>
  );
}

export default SignIn;
