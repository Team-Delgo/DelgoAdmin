import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { MAIN_PATH } from "./common/constants/path.const";

import SignIn from "./page/sign/SignIn";
import Main from "./page/main/Main";
import PostPage from "./page/main/PostPage";
import UserPage from "./page/main/UserPage";

function App() {
  // 1. react-router-dom 으로 페이지 연결, path는 common/constants폴더에서 상수로 관리
  // 2. scss(sass)로 css 하기
  // 3. redux-toolkit으로 전역 상태관리
  // 4. axios로 api 호출, api파일은 다른 repository보고 참조
  // 5. app.scss에 전역 font 정의
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path={MAIN_PATH.MAIN} element={<Main />} />
        <Route path={MAIN_PATH.POST} element={<PostPage />} />
        <Route path={MAIN_PATH.USER} element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
