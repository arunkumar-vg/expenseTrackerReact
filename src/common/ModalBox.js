import React from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ModalBox = (props) => {
  const {
    heading,
    buttonName,
    closeModal,
    onSave
  } = props;
  return (

    <div class="back-drop">
      <div class="modal">
        <div class="d-flex text-semibold">
          {heading}
          <span class="d-flex align-items-center cursor-pointer ml-auto" onClick={closeModal}>
            <IoMdCloseCircleOutline fontSize={20} />
          </span>
        </div>
        <p class="mb-3">
          message
        </p>
        <div>
          <div class="d-flex justify-content-end">
            <span class="btn-common" onClick={closeModal}>
              Cancel
            </span>
            <span class="btn-common" onClick={onSave}>
              {buttonName}
            </span>
          </div>
        </div >
      </div >
    </div >
  );
};

export default ModalBox;
