var tape = require("tape"),
    Iterator = require("iterator"),
    Seq = require("..");


global.Seq = Seq;


tape("Seq(value: Array)", function(assert) {
    var seq = Seq([0, 1, 2, 3]),
        iterator = seq.iterator(),
        step, index = 0;

    while (!(step = iterator.next()).done) {
        assert.equal(step.value, index++);
    }

    assert.end();
});

tape("Seq(value: Object)", function(assert) {
    var seq = Seq({
            a: 0,
            b: 1,
            c: 2
        }),
        iterator = seq.iterator(),
        step, index = 0;

    while (!(step = iterator.next()).done) {
        assert.equal(step.value[1], index++);
    }

    assert.end();
});

tape("Seq(value: Iterator)", function(assert) {
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
        step, index = 0;

    while (!(step = iterator.next()).done) {
        assert.equal(step.value, index++);
    }

    assert.end();
});
