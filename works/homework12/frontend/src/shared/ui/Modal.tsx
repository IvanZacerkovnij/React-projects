import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useModal } from '../hooks/useModal'

type ModalProps = {
  children: ReactNode
  titleId: string
  onClose: () => void
  busy?: boolean
}

export default function Modal({ children, titleId, onClose, busy = false }: ModalProps) {
  const { dialogRef, onCancel, onBackdropClick } = useModal(onClose, busy)

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      aria-busy={busy}
      className="modal"
      onCancel={onCancel}
      onClick={onBackdropClick}
    >
      <button type="button" aria-label="Закрити вікно" onClick={onClose} disabled={busy} className="modal-close">×</button>
      {children}
    </dialog>,
    document.getElementById('modal-root')!,
  )
}
