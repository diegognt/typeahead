import { useRef } from "react";
import { createPortal } from "react-dom";

type DialogProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
};

function Dialog(props: DialogProps) {
  const { children, isOpen = false, onClose } = props;
  const portalRoot = document.getElementById("portal-root");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    if (!isOpen) return;

    if (onClose) {
      onClose();
    }

    dialogRef.current?.close();
  };

  return portalRoot
    ? createPortal(
      <dialog ref={dialogRef} open={isOpen}>
        <button
          onClick={handleClose}
          aria-label="Close the dialog"
        >
          Close
        </button>
        {children}
      </dialog>,
      portalRoot
    )
    : null;
}

export default Dialog;
