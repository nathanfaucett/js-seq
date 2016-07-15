var isArrayLike = require("@nathanfaucett/is_array_like"),
    Iterator = require("@nathanfaucett/iterator"),
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
