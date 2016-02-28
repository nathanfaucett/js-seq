var isArrayLike = require("is_array_like"),
    Iterator = require("iterator"),
    isIterable = require("./isIterable"),
    IteratorSeq = require("./IteratorSeq"),
    ArraySeq = require("./ArraySeq");


var getIterator = Iterator.getIterator;


module.exports = tryIndexedSeqFromValue;


function tryIndexedSeqFromValue(value) {
    return (
        isArrayLike(value) ? new ArraySeq(value) :
        isIterable(value) ? new IteratorSeq(getIterator(value)()) :
        void(0)
    );
}
