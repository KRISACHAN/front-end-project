class MyMath {
    #MATH_KEYS = {
        MIN: 'min',
        MAX: 'max'
    }

    #TYPE_KEYS = {
        OBJECT: 'object',
        ARRAY: 'array',
        NUMBER: 'number'
    }

    constructor() {}

    #getArg(args) {
        if (!args.length || args.length === 0) {
            return '错了错了';
        };
        return args.length > 1 ? args : args[0];
    }

    #getType(data) {
        return Object.prototype.toString.call(data).replace(/^\[object\s(.+)\]/, '$1').toLowerCase();
    }

    #allNumber(data) {
        return data.every(value => this.#getType(value) === this.#TYPE_KEYS.NUMBER);
    }

    #mathCore(args, mathType) {
        const arg = this.#getArg(args);
        const arg_type = this.#getType(arg);
        
        if (![this.#TYPE_KEYS.OBJECT, this.#TYPE_KEYS.ARRAY].includes(arg_type)) {
            return '错了错了';
        };
        let values = arg;
        if (arg_type === this.#TYPE_KEYS.OBJECT) {
            values = Object.values(arg);
        };
        if (this.#allNumber(values)) {
            return Math[mathType](...values);
        };
        return '错了错了';
    }
    
    minOf(...args) {
        return this.#mathCore(args, this.#MATH_KEYS.MIN);
    }

    maxOf(...args) {
        return this.#mathCore(args, this.#MATH_KEYS.MAX);
    }
}
const myMath = new MyMath();
console.log(myMath.minOf());
console.log(myMath.minOf(1));
console.log(myMath.minOf(1, 2));
console.log(myMath.minOf(1, 2, 3));
console.log(myMath.minOf([1, 2, 3, 4]));
console.log(myMath.minOf({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }));
console.log(myMath.maxOf());
console.log(myMath.maxOf(1));
console.log(myMath.maxOf(1, 2));
console.log(myMath.maxOf(1, 2, 3));
console.log(myMath.maxOf([1, 2, 3, 4]));
console.log(myMath.maxOf({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }));