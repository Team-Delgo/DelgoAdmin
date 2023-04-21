import React, { useState } from "react";
import "./SignIn.scss";

function SignIn() {
  return (
    <div className="login">
      <div>
        <label className="login-label-id">아이디</label>
        <input
          className="login-input-id"
          type="id"
          id="id"
          placeholder="placeholder"
        />
      </div>
      <div>
        <label className="login-label-password">비밀번호</label>
        <input
          className="login-input-password"
          type="password"
          id="password"
          placeholder="placeholder"
        />
      </div>

      <button type="button" className="login-button">
        로그인
      </button>
      <div className="login-title1">이 곳은 Delgo 관리자 페이지에요.</div>
      <div className="login-title2">앱을 다운받아 델고를 사용해보세요</div>
    </div>
  );
}

export default SignIn;
