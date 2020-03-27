export const createSpyObj = <T>(...methodNames: (keyof T)[]): Partial<T> => {
  let obj: any = {};

  methodNames.forEach(methodName => obj[methodName] = jest.fn());

  return obj;
};
