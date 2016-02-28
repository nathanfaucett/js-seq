var Iterator = require("iterator");


var hasIterator = Iterator.hasIterator;


module.exports = isIterable;


function isIterable(value) {
    return !!(value && hasIterator(value));
}
