var Iterator = require("@nathanfaucett/iterator");


var hasIterator = Iterator.hasIterator;


module.exports = isIterable;


function isIterable(value) {
    return !!(value && hasIterator(value));
}
