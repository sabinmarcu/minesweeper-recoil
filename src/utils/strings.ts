export const camelCaseToKebabCase = (
  str: string,
): string => str.replace(/([A-Z])/g, (it) => `-${it.toLowerCase()}`);
