import React from 'react';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const ModalBox = ({
  heading,
  children,
  buttonName,
  closeButton = false,
  closeModal,
  onSave
}) => {
  return (
    <div className="back-drop">
      <div className="modal-container">
        <div className="modal-header">
          <h6>{heading}</h6>
          <span className="cursor-pointer ms-auto mb-2" onClick={closeModal}>
            <IoMdCloseCircleOutline fontSize={18} color="#7c7c7c" />
          </span>
        </div>
        <div className='modal-body'>
          {children}
        </div>
        <div className="modal-footer">
          <div className="d-flex justify-content-end">
            <span
              className="btn-common me-4"
              onClick={closeModal}
              type="submit"
            >
              {closeButton ? "No" : "Cancel"}
            </span>
            <span
              className="btn-common"
              onClick={() => { onSave() }}
              type="submit"
            >
              {buttonName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBox;
