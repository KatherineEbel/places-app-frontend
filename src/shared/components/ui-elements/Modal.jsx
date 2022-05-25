import {createPortal} from "react-dom";

export default function Modal({children, id}) {
  const content = (
    <div className="modal modal-bottom sm:modal-middle" id={id}>
      <div className="modal-box">
        { children}
      </div>
    </div>
  )
  return createPortal(content, document.getElementById('modal-hook'));
}