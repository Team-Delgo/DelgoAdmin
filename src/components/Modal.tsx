import React, { PropsWithChildren } from "react";
import "./Modal.scss";

type Props = {
  alert?: string;
  yes?: React.MouseEventHandler<HTMLButtonElement>;
  no?: React.MouseEventHandler<HTMLButtonElement>;
};
const Modal = ({ alert, yes, no }: Props) => {
  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-container">{alert}</div>
        <div className="button-box">
          <button className="button-yes" onClick={yes}>
            예
          </button>
          <button className="button-no" onClick={no}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
