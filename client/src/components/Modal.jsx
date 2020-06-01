import React, { useState, useEffect } from "react";
import "./Modal.css";
import { Button, CloseButton } from "./";

const Modal = ({ className, type, isActive, isOpaque, children, title, body, submitButtonText, noClose, onClickYes, onClickNo, onClickSubmit }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const open = () => setActive(true);

  const close = () => setActive(false);

  const classes = `modal__screen
  ${className ? className : ""}
  ${active ? "modal__screen--active" : ""}
  ${isOpaque ? "modal__screen--opaque" : ""}`

  return (
    <div
      className={classes}
      onClick={close}
    >
      <div className="modal__panel">
        <div className="modal__header">
          <p className="modal__header-text text__heading">{title}</p>
          {!noClose && (
            <CloseButton onClick={close} />
          )}
        </div>
        <div className="modal__body text__body">{body || children}</div>
        <div className={`modal__buttons ${type === 'confirm' ? ' modal__buttons--confirm' : ''}`}>
          {type === "confirm" && (
            <>
              <Button
                type="primary"
                variant="no"
                onClick={onClickYes}
              >Nope...</Button>
              <Button
                type="primary"
                variant="yes"
                onClick={onClickYes}
              >Yep!</Button>
            </>
          )}
          {type === "alert" && (
            <Button
              type="primary"
              onClick={onClickSubmit}
            >{submitButtonText || 'Ok'}</Button>
          )}
        </div>
      </div>
    </div>
  ); 
};

export default Modal;
