var inherits = require("@nathanfaucett/inherits"),
    Iterator = require("@nathanfaucett/iterator"),
    defineProperty = require("@nathanfaucett/define_property"),
    IteratorSeq;


var ArraySeqPrototype;


module.exports = ArraySeq;


function ArraySeq(array) {
    this.__array = array;
}
inherits(ArraySeq, require("./IndexedSeq"));
ArraySeqPrototype = ArraySeq.prototype;


IteratorSeq = require("./IteratorSeq");


ArraySeqPrototype.size = function() {
    return this.__array.length;
};
if (defineProperty.hasGettersSetters) {
    defineProperty(ArraySeqPrototype, "length", {
        get: ArraySeqPrototype.size
    });
}

ArraySeqPrototype.has = function(index) {
    if (index >= 0 && index < this.size()) {
        return true;
    } else {
        return false;
    }
};

ArraySeqPrototype.get = function(index, notSetValue) {
    if (this.has(index)) {
        return this.__array[index];
    } else {
        return notSetValue;
    }
};

ArraySeqPrototype.toEntrySeq = function() {
    var array = this.__array,
        index = 0,
        length = array.length;

    return new IteratorSeq(new Iterator(function next() {
        if (index < length) {
            return Iterator.createValue(Iterator.ENTRIES, index, array[index++]);
        } else {
            return Iterator.createDone();
        }
    }));
};

ArraySeqPrototype.__iterate = function(fn, reverse) {
    if (reverse) {
        return ArraySeq_iterateReverse(this, fn);
    } else {
        return ArraySeq_iterate(this, fn);
    }
};

ArraySeqPrototype.__iterator = function(type, reverse) {
    if (reverse) {
        return ArraySeq_iteratorReverse(this, type);
    } else {
        return ArraySeq_iterator(this, type);
    }
};

function ArraySeq_iterateReverse(_this, fn) {
    var array = _this.__array,
        i = array.length;

    while (i-- >= 0) {
        if (fn(i, array[i], _this) === false) {
            return _this;
        }
    }

    return _this;
}

function ArraySeq_iterate(_this, fn) {
    var array = _this.__array,
        i = -1,
        il = array.length - 1;

    while (i++ < il) {
        if (fn(i, array[i], _this) === false) {
            return _this;
        }
    }

    return _this;
}

function ArraySeq_iteratorReverse(_this, type) {
    var array = _this.__array,
        index = array.length;

    return new Iterator(function next() {
        if (index >= 0) {
            return Iterator.createValue(type, index, array[index--]);
        } else {
            return Iterator.createDone();
        }
    });
}

function ArraySeq_iterator(_this, type) {
    var array = _this.__array,
        index = 0,
        length = array.length;

    return new Iterator(function next() {
        if (index !== length) {
            return Iterator.createValue(type, index, array[index++]);
        } else {
            return Iterator.createDone();
        }
    });
}