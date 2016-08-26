var isObject = require("@nathanfaucett/is_object"),
    ObjectSeq = require("./ObjectSeq"),
    tryIndexedSeqFromValue = require("./tryIndexedSeqFromValue");


module.exports = fromValue;


function fromValue(value) {
    var seq = tryIndexedSeqFromValue(value) || (isObject(value) && new ObjectSeq(value));

    if (seq) {
        return seq;
    } else {
        throw new TypeError(
            "Expected Array or iterable object of values, or keyed object: " + value
        );
    }
}