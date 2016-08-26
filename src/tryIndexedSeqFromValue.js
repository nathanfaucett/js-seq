var isArrayLike = require("@nathanfaucett/is_array_like"),
    Iterator = require("@nathanfaucett/iterator"),
    isIterable = require("./isIterable"),
    IteratorSeq = require("./IteratorSeq"),
    ArraySeq = require("./ArraySeq");


var getIterator = Iterator.getIterator;


module.exports = tryIndexedSeqFromValue;


function tryIndexedSeqFromValue(value) {
    return (
        isIterable(value) ? new IteratorSeq(getIterator(value)()) :
        isArrayLike(value) ? new ArraySeq(value) :
        void(0)
    );
}