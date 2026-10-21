export function getAuthRules(isRegister: boolean, getPassword: () => string) {
  return {
    email: {
      required: 'Вкажіть email.',
      maxLength: { value: 254, message: 'Максимум 254 символи.' },
      validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) || 'Вкажіть коректний email.',
    },
    password: {
      required: 'Вкажіть пароль.',
      minLength: isRegister ? { value: 8, message: 'Мінімум 8 символів.' } : undefined,
      maxLength: { value: 128, message: 'Максимум 128 символів.' },
    },
    repeatPassword: {
      required: 'Повторіть пароль.',
      validate: (value: string) => value === getPassword() || 'Паролі не збігаються.',
    },
  }
}
