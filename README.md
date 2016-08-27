seq [![Build Status](https://travis-ci.org/nathanfaucett/seq.svg?branch=master)](https://travis-ci.org/nathanfaucett/seq)
=======

create iteratable sequences from javascript objects

```javascript
var Seq = require("@nathanfaucett/seq");


// Arrays
var seq = Seq.of([0, 1, 2, 3]),
    iterator = seq.iterator(),
    step;

while (!(step = iterator.next()).done) {
    console.log(step.value);
}

// Objects
var seq = Seq({
        a: 0,
        b: 1,
        c: 2
    }),
    iterator = seq.iterator(),
    step;

while (!(step = iterator.next()).done) {
    console.log(step.value[0], step.value[1]);
}

// Iterators
var array = [0, 1, 2, 3, 4],
    seq = Seq({
        iterator: function() {
            var index = 0,
                length = array.length;

            return new Iterator(function next() {
                if (index < length) {
                    return Iterator.createValue(Iterator.VALUES, index, array[index++]);
                } else {
                    return Iterator.createDone();
                }
            });
        }
    }),
    iterator = seq.iterator(),
    step;

while (!(step = iterator.next()).done) {
    console.log(step.value);
}
```
