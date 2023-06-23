type DataType = 'NULL' | 'UNDEFINED' | 'BOOLEAN' | 'NUMBER' | 'BIGINT' | 'STRING' | 'SYMBOL' | 'OBJECT' | 'ARRAY' | 'DATE' | 'REGEXP' | 'ERROR' | 'MAP' | 'SET' | 'WEAKMAP' | 'WEAKSET';

const isEqual = (data1: any, data2: any): boolean => data1 === data2;

const typeMap: Record<string, DataType> = {
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
const originTypes: DataType[] = [
    typeMap.NULL,
    typeMap.UNDEFINED,
    typeMap.BOOLEAN,
    typeMap.NUMBER,
    typeMap.BIGINT,
    typeMap.STRING,
    typeMap.SYMBOL,
];

// 引用类型合集
const referenceTypes: DataType[] = [
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
const referenceConstructor: Function[] = [
    Date,
    RegExp,
    Error,
    Map,
    Set,
    WeakMap,
    WeakSet,
];

// 获取元素类型
const getType = (data: any): DataType => {
    const rawType = Object.prototype.toString.call(data);
    return rawType.replace(/^\[object\s(.+)\]$/, '$1').toUpperCase() as DataType;
};

// 深拷贝
const cloneDeep = (data: any, hash = new WeakMap()): any => {
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
        return data.map((item: any) => cloneDeep(item));
    };
    // 如果是对象，也要循环遍历
    if (isEqual(data, typeMap.OBJECT)) {
        const res: Record<string, any> = {};
        Object.entries(data).forEach((item: [string, any]) => {
            const [key, value] = item;
            res[key] = cloneDeep(value);
        });
        hash.set(data, res);
    };
    return data;
};

cloneDeep(1);
