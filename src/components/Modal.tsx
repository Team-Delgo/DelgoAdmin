import React, { PropsWithChildren } from "react";
import "./Modal.scss";

type Props = {
  alert?: string;
};
const Modal = ({ alert }: Props) => {
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-container">{alert}</div>
        <div className="button-box">
          <button className="button-yes">예</button>
          <button className="button-no">아니오</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
