// --获取数据类型
export const toRawType = value => {
  // Object;Symbol;Function;Undefined;Null;Array
  return Object.prototype.toString.call(value).slice(8, -1);
};
