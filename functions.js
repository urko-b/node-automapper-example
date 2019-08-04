

module.exports.curry = (fn) => {
    const curried = function (...t) {
        return t.length >= fn.length
            ? fn.call(this, ...t)
            : curried.bind(this, ...t);
    };

    return curried;
};

module.exports.equal = this.curry((o1, o2) => o1 === o2);
module.exports.isNil = (arg) => arg === null || arg === undefined;

module.exports.anyPass = (...fns) => {
    const fnArray = fns[0] && fns[0][Symbol.iterator] ? fns[0] : fns;
    return (...args) => fnArray.some((fn) => fn.apply(this, args));
};

module.exports.allPass = (...fns) => {
    const fnArray = fns[0] && fns[0][Symbol.iterator] ? fns[0] : fns;
    return (...args) => fnArray.every((fn) => fn.apply(this, args));
};

module.exports.isPlainObject = (arg) => arg.constructor === Object;

module.exports.isEmpty = (arg) => {
    const typeOfArg = typeof arg;

    if (this.isNil(arg)) {
        return true;
    }

    if (this.anyPass(
        this.equal('number'),
        this.equal('boolean'),
        this.equal('function')
    )(typeOfArg)) {
        return this.isNil(arg);
    }

    if (this.equal('string', typeOfArg)) {
        return this.anyPass(this.isNil, this.equal(''))(arg);
    }

    if (this.allPass(
        a => Array.isArray(a),
        a => this.equal(a.length, 0))(arg)) {
        return true;
    }
    if (
        this.allPass(
            () => this.equal('object', typeOfArg),
            this.isPlainObject,
            o => Object.keys(o).length === 0
        )(arg)
    ) {
        return true;
    }

    return false;
};
