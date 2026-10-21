import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'

type ModalProps = {
  children: ReactNode
  titleId: string
  onClose: () => void
  busy?: boolean
}

export default function Modal({ children, titleId, onClose, busy = false }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current!
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    dialog.querySelector('input')?.focus()

    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [])

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-modal="true"
      aria-busy={busy}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-950/50"
      onCancel={event => { event.preventDefault(); if (!busy) onClose() }}
      onClick={event => { if (event.target === event.currentTarget && !busy) onClose() }}
    >
      <button type="button" aria-label="Закрити вікно" onClick={onClose} disabled={busy} className="absolute right-4 top-3 rounded-lg px-2 py-1 text-2xl text-slate-500 hover:bg-slate-100 disabled:opacity-50">×</button>
      {children}
    </dialog>,
    document.getElementById('modal-root')!,
  )
}
