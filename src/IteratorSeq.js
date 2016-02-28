var inherits = require("inherits"),
    defineProperty = require("define_property"),
    ArraySeq;


var IteratorSeqPrototype;


module.exports = IteratorSeq;


function IteratorSeq(iterator) {
    this.__iteratorValue = iterator;
    this.__cache = null;
}
inherits(IteratorSeq, require("./IndexedSeq"));
IteratorSeqPrototype = IteratorSeq.prototype;


ArraySeq = require("./ArraySeq");


IteratorSeqPrototype.size = function() {
    return this.__cacheResult().length;
};
if (defineProperty.hasGettersSetters) {
    defineProperty(IteratorSeqPrototype, "length", {
        get: IteratorSeqPrototype.size
    });
}

IteratorSeqPrototype.has = function(index) {
    if (index >= 0 && index < this.size()) {
        return true;
    } else {
        return false;
    }
};

IteratorSeqPrototype.get = function(index, notSetValue) {
    if (this.has(index)) {
        return this.__cache[index];
    } else {
        return notSetValue;
    }
};

IteratorSeqPrototype.toEntrySeq = function() {
    return this.__cacheResult().toEntrySeq();
};

IteratorSeqPrototype.__cacheResult = function() {
    var cache = this.__cache,
        iterator, step;

    if (!cache) {
        cache = [];
        iterator = this.__iteratorValue;

        while (!(step = iterator.next()).done) {
            cache[cache.length] = step.value;
        }

        cache = new ArraySeq(cache);
    }

    return cache;
};

IteratorSeqPrototype.__iterate = function(fn, reverse) {
    return this.__cacheResult().__iterate(fn, reverse);
};

IteratorSeqPrototype.__iterator = function(type, reverse) {
    return this.__cacheResult().__iterator(type, reverse);
};
