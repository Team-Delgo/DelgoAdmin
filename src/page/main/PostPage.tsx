import React from "react";
import Header from "../../components/Header";
import "./PostPage.scss";
import Modal from "../../components/Modal";
function PostPage() {
  return (
    <div>
      <Header />
      <Modal
        alert={`
        삭제 시 되돌릴 수 없습니다.
        정말로 삭제하시겠습니까?
      `}
      />
      인증글관리
    </div>
  );
}
export default PostPage;
