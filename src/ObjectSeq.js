var has = require("@nathanfaucett/has"),
    keys = require("@nathanfaucett/keys"),
    inherits = require("@nathanfaucett/inherits"),
    Iterator = require("@nathanfaucett/iterator"),
    defineProperty = require("@nathanfaucett/define_property");


var ObjectSeqPrototype;


module.exports = ObjectSeq;


function ObjectSeq(object) {
    this.__keys = keys(object);
    this.__object = object;
}
inherits(ObjectSeq, require("./KeyedSeq"));
ObjectSeqPrototype = ObjectSeq.prototype;


ObjectSeqPrototype.size = function() {
    return this.__keys.length;
};
if (defineProperty.hasGettersSetters) {
    defineProperty(ObjectSeqPrototype, "length", {
        get: ObjectSeqPrototype.size
    });
}

ObjectSeqPrototype.has = function(key) {
    return has(this.__object, key);
};

ObjectSeqPrototype.get = function(key, notSetValue) {
    if (this.has(key)) {
        return this.__object[key];
    } else {
        return notSetValue;
    }
};

ObjectSeqPrototype.__iterate = function(fn, reverse) {
    if (reverse) {
        return ObjectSeq_iterateReverse(this, fn);
    } else {
        return ObjectSeq_iterate(this, fn);
    }
};

ObjectSeqPrototype.__iterator = function(type, reverse) {
    if (reverse) {
        return ObjectSeq_iteratorReverse(this, type);
    } else {
        return ObjectSeq_iterator(this, type);
    }
};

function ObjectSeq_iterateReverse(_this, fn) {
    var keys = _this.__keys,
        object = _this.__object,
        i = keys.length,
        key;

    while (i-- >= 0) {
        key = keys[i];
        if (fn(key, object[key], _this) === false) {
            return _this;
        }
    }

    return _this;
}

function ObjectSeq_iterate(_this, fn) {
    var keys = _this.__keys,
        object = _this.__object,
        i = -1,
        il = keys.length - 1,
        key;

    while (i++ < il) {
        key = keys[i];
        if (fn(key, object[key], _this) === false) {
            return _this;
        }
    }

    return _this;
}

function ObjectSeq_iteratorReverse(_this, type) {
    var keys = _this.__keys,
        object = _this.__object,
        index = keys.length;

    return new Iterator(function next() {
        var key;

        if (index >= 0) {
            key = keys[index--];
            return Iterator.createValue(type, key, object[key]);
        } else {
            return Iterator.createDone();
        }
    });
}

function ObjectSeq_iterator(_this, type) {
    var keys = _this.__keys,
        object = _this.__object,
        index = 0,
        length = keys.length;

    return new Iterator(function next() {
        var key;

        if (index !== length) {
            key = keys[index++];
            return Iterator.createValue(type, key, object[key]);
        } else {
            return Iterator.createDone();
        }
    });
}