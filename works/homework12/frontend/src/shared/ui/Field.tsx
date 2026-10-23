import type { ReactNode } from 'react'

type FieldProps = {
  label: string
  id: string
  error?: string
  children: ReactNode
}

export default function Field({ label, id, error, children }: FieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <p id={`${id}-error`} className="field-error" role="alert">{error}</p>}
    </div>
  )
}
