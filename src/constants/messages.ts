export const isStringMessage = { message: "Должно быть строкой" };
export const isNumberMessage = { message: "Должно быть числом" };
export const IsBooleanMessage = { message: "Должно быть булевым" };
export const IsArrayMessage = { message: "Должно быть массивом" };
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
  return { message: `Не менее ${min} и не более ${max} символов` };
};
export const alreadyExistMessage = (object: string, item?: string) => {
  if (!item) {
    return `${object} уже существует`;
  }
  return `${object} '${item}' уже существует`;
};
export const doesNotExistMessage = (item: string) => {
  return `${item} не существует`;
};
