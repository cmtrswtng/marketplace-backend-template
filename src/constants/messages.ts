export const isStringMessage = { message: "Должно быть строкой" };
export const isNumberMessage = { message: "Должно быть числом" };
export const maxMinLength = (min?: number, max?: number) => {
  if (min === max) {
    return { message: `Длина должна быть ${min} символов` };
  }
  if (!min) {
    return { message: `Длина должна быть не более ${max}` };
  }
  if (!max) {
    return { message: `Длина должна быть не менее ${min}` };
  }
  if (!min) return { message: `Не менее ${min} и не более ${max} символов` };
};