// Modal.tsx
import React, { ReactNode } from 'react';
import s from './modal.module.css';

interface ModalProps {
  active: boolean;
  setActive: (active: boolean) => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ active, setActive, children }) => {
  return (
    <div
      className={s.modalWrapper}
      style={{ opacity: active ? 1 : 0, pointerEvents: active ? 'all' : 'none' }}
      onClick={() => setActive(false)}>
      <div
        className={s.modalContent}
        style={{ transform: `scale(${active ? 1 : 0.5})` }}
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
