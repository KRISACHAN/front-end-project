const isEqual = (data1, data2) => data1 === data2;

const typeMap = {
    // 原始类型
    NULL: 'NULL',
    UNDEFINED: 'UNDEFINED',
    BOOLEAN: 'BOOLEAN',
    NUMBER: 'NUMBER',
    BIGINT: 'BIGINT',
    STRING: 'STRING',
    SYMBOL: 'SYMBOL',

    // 引用类型
    OBJECT: 'OBJECT',
    ARRAY: 'ARRAY',
    DATE: 'DATE',
    REGEXP: 'REGEXP',
    ERROR: 'ERROR',
    MAP: 'MAP',
    SET: 'SET',
    WEAKMAP: 'WEAKMAP',
    WEAKSET: 'WEAKSET',
};

// 原始类型合集
const originTypes = [
    typeMap.NULL,
    typeMap.UNDEFINED,
    typeMap.BOOLEAN,
    typeMap.NUMBER,
    typeMap.BIGINT,
    typeMap.STRING,
    typeMap.SYMBOL,
];

// 引用类型合集
const referenceTypes = [
    typeMap.OBJECT,
    typeMap.ARRAY,
    typeMap.DATE,
    typeMap.REGEXP,
    typeMap.ERROR,
    typeMap.MAP,
    typeMap.SET,
    typeMap.WEAKMAP,
    typeMap.WEAKSET,
];

// 引用类型构造器
const referenceConstructor = [
    Date,
    RegExp,
    Error,
    Map,
    Set,
    WeakMap,
    WeakSet,
];

// 获取元素类型
const getType = (data) => {
    const rawType = Object.prototype.toString.call(data);
    return rawType.replace(/^\[object\s(.+)\]$/, '$1').toUpperCase();
};

// 深拷贝
const cloneDeep = (data, hash = new WeakMap()) => {
    // 如果已经存在元素，直接返回，用于解决循环引用的问题
    if (hash.has(data)) {
        return data;
    };
    const currentType = getType(data);
    // 原始类型可直接解析
    if (originTypes.includes(currentType)) {
        return JSON.parse(JSON.stringify(data));
    };
    // 部分引用类型直接重新生成即可
    if (referenceConstructor.includes(data?.constructor)) {
        return new data.constructor(data);
    };
    // 如果是数组，则循环遍历
    if (isEqual(currentType, typeMap.ARRAY)) {
        return data.map(item => cloneDeep(item));
    };
    // 如果是对象，也要循环遍历
    if (isEqual(data, typeMap.OBJECT)) {
        const res = {};
        Object.entries(data).forEach(item => {
            const [key, value] = item;
            res[key] = deepClone(value);
        });
        hash.set(data, res);
    };
    return data;
};
