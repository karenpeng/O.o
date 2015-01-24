var later = require('later')
var whatever = {
  pre: 0,
  cur: 1
}

function observer(changes) {
  changes.forEach(function (change, i) {
    console.log('what property changed? ' + change.name)
    console.log('how did it change? ' + change.type)
    console.log('what\'s the current value? ' + change.object[object.name])
    console.log(change)
  })
}

Object.observe(whatever, observer);

function* fibonacci2() {
  yield whatever.pre
  yield whatever.cur
  while (true) {
    var tmp = whatever.pre + whatever.cur
    whatever.pre = whatever.cur
    whatever.cur = tmp
    yield whatever.cur
  }
}

var test = fibonacci2()
var sched = later.parse.recur().every(1).minute()
later.setInterval(function () {
  test.next()
}, sched)