var isArray = require("@nathanfaucett/is_array"),
    isObject = require("@nathanfaucett/is_object");


module.exports = keyedFromValue;


function keyedFromValue(value) {
    var seq = (
        isArray(value) ? new ArraySeq(value).toEntrySeq() :
        isIterator(value) ? new IteratorSeq(value).toEntrySeq() :
        isObject(value) ? new ObjectSeq(value) :
        undefined
    );
    if (!seq) {
        throw new TypeError(
            "Expected Array or iterable object of [k, v] entries, or keyed object: " + value
        );
    }
    return seq;
}
