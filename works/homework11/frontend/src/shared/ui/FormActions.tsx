type FormActionsProps = {
  busy: boolean
  submitLabel: string
  onCancel: () => void
}

export default function FormActions({ busy, submitLabel, onCancel }: FormActionsProps) {
  return (
    <div className="modal-actions">
      <button type="button" className="button" disabled={busy} onClick={onCancel}>Скасувати</button>
      <button className="button primary" disabled={busy}>{busy ? 'Збереження…' : submitLabel}</button>
    </div>
  )
}
