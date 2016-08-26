var tryIndexedSeqFromValue = require("./tryIndexedSeqFromValue");


module.exports = indexedFromValue;


function indexedFromValue(value) {
    var seq = tryIndexedSeqFromValue(value);

    if (seq) {
        return seq;
    } else {
        throw new TypeError(
            "Expected Array or iterable object of values: " + value
        );
    }
}