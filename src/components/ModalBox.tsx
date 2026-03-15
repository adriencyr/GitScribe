const ModalBox = ({message}:{message:string}) => {
  return (
    <div className="modal-box-container">
        <div className="modal-box">
            <p className="modal-box__text">{message}</p>
        </div>
    </div>
  );
};

export default ModalBox;
