import { Transition } from "react-transition-group";
import "./modal.scss";
import "../../index.scss";
import { IoMdClose } from "react-icons/io";
import { useRef } from "react";

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const ModalComponent: React.FC<ModalProps> = (props: ModalProps) => {
  const modal = useRef(null);
  return (
    <>
      <Transition nodeRef={modal} in={props.isOpen} timeout={350} unmountOnExit>
        {(state) => (
          <div ref={modal} className={`modal modal--${state}`}>
            <div className="modal-wrapper">
              <div className="modal-content">
                <button
                  className="modal-close"
                  aria-label="Close modal"
                  onClick={() => props.onClose()}
                >
                  <IoMdClose size={32} />
                </button>
                {props.children}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};
