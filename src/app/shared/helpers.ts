export function truthy<T>(value: T) {
  return !!value;
}

export function falsy<T>(value: T) {
  return !!!value;
}
