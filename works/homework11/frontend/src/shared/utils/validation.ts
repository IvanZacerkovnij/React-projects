export function requiredText(message: string, maxLength: number) {
  return {
    validate: (value: string) => !!value.trim() || message,
    maxLength: { value: maxLength, message: `Максимум ${maxLength} символів.` },
  }
}
