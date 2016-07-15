var inherits = require("@nathanfaucett/inherits"),
    indexedFromValue, EMPTY_SEQ;


var IndexedSeqPrototype;


module.exports = IndexedSeq;


function IndexedSeq() {
    return (
        isNullOrUndefined(value) ? EMPTY_SEQ :
        indexedFromValue(value)
    );
}
inherits(IndexedSeq, require("./Seq"));
IndexedSeqPrototype = IndexedSeq.prototype;


indexedFromValue = require("./indexedFromValue");
EMPTY_SEQ = require("./EMPTY_SEQ");


IndexedSeqPrototype.toIndexedSeq = function() {
    return this;
};
