var MyLibrary = (function (exports) {
    'use strict';

    const increase = (total, value) => total + value;

    const decrease = (total, value) => total - value;

    var others = {
      a: 1,
      b: 2,
      c: () => 3
    };
    const e = 5;

    function multiply(total2, value) {
      return total2 * value;
    }
    function power(total2, value) {
      return total2 ** value;
    }
    let total = others.a;
    total = increase(total, 10);
    total = increase(total, 20);
    total = decrease(total, 5);
    total = multiply(total, e);
    console.log(`Total is ${total}`);
    const isEqual = (data1, data2) => data1 === data2;
    const typeMap = {
      NULL: "NULL",
      UNDEFINED: "UNDEFINED",
      BOOLEAN: "BOOLEAN",
      NUMBER: "NUMBER",
      BIGINT: "BIGINT",
      STRING: "STRING",
      SYMBOL: "SYMBOL",
      OBJECT: "OBJECT",
      ARRAY: "ARRAY",
      DATE: "DATE",
      REGEXP: "REGEXP",
      ERROR: "ERROR",
      MAP: "MAP",
      SET: "SET",
      WEAKMAP: "WEAKMAP",
      WEAKSET: "WEAKSET"
    };
    const originTypes = [
      typeMap.NULL,
      typeMap.UNDEFINED,
      typeMap.BOOLEAN,
      typeMap.NUMBER,
      typeMap.BIGINT,
      typeMap.STRING,
      typeMap.SYMBOL
    ];
    const referenceConstructor = [
      Date,
      RegExp,
      Error,
      Map,
      Set,
      WeakMap,
      WeakSet
    ];
    const getType = (data) => {
      const rawType = Object.prototype.toString.call(data);
      return rawType.replace(/^\[object\s(.+)\]$/, "$1").toUpperCase();
    };
    const cloneDeep = (data, hash = new WeakMap()) => {
      if (hash.has(data)) {
        return data;
      }
      const currentType = getType(data);
      if (originTypes.includes(currentType)) {
        return JSON.parse(JSON.stringify(data));
      }
      if (referenceConstructor.includes(data?.constructor)) {
        return new data.constructor(data);
      }
      if (isEqual(currentType, typeMap.ARRAY)) {
        return data.map((item) => cloneDeep(item));
      }
      if (isEqual(data, typeMap.OBJECT)) {
        const res = {};
        Object.entries(data).forEach((item) => {
          const [key, value] = item;
          res[key] = cloneDeep(value);
        });
        hash.set(data, res);
      }
      return data;
    };
    cloneDeep(1);

    exports.power = power;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=index.iife.js.map
