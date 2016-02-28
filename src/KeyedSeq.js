var inherits = require("inherits"),
    Iterator = require("iterator"),
    keyedFromValue;


var KeyedSeqPrototype;


module.exports = KeyedSeq;


function KeyedSeq() {
    return (
        isNullOrUndefined(value) ? EMPTY_SEQ :
        keyedFromValue(value)
    );
}
inherits(KeyedSeq, require("./Seq"));
KeyedSeqPrototype = KeyedSeq.prototype;


keyedFromValue = require("./keyedFromValue");


KeyedSeqPrototype.toKeyedSeq = function() {
    return this;
};

KeyedSeqPrototype.iterator = function(reverse) {
    return this.__iterator(Iterator.ENTRIES, reverse);
};
