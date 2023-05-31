import React, { PropsWithChildren } from "react";
import "./Modal.scss";

type Props = {
  alert?: string;
  onYes?: React.MouseEventHandler<HTMLButtonElement>;
  no?: React.MouseEventHandler<HTMLButtonElement>;
};
const Modal = ({ alert, onYes, no }: Props) => {
  const handleYesClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onYes) {
      onYes(event); // 부모 컴포넌트에 이벤트 전달
    }
  };

  return (
    <div className="modal">
      <div className="modal-wrapper">
        <div className="modal-container">{alert}</div>
        {onYes && no && (
          <div className="button-box">
            <button className="button-yes" onClick={handleYesClick}>
              예
            </button>
            <button className="button-no" onClick={no}>
              아니오
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
