// function* fibonacci() {
//   let prev = 0;
//   let curr = 1;
//   for (;;) {
//     let tmp = prev + curr;
//     prev = curr;
//     curr = tmp;
//     yield curr;
//   }
// }

/*
just return a function
 */
function foo() {
  var prev = 0;
  var curr = 1;

  return function () {
    //console.log(pre);
    var tmp = prev + curr;
    var hold_prev = prev;
    prev = curr;
    curr = tmp;
    return hold_prev;
  }
}

/*
yield
 */

function* fibonacci2() {
  let pre = 0,
    cur = 1,
    tmp;
  yield pre;
  yield cur;
  while (true) {
    tmp = pre + cur;
    pre = cur;
    cur = tmp;
    yield cur;
  }
}

/*
https://github.com/karenpeng/learn-generators/blob/master/exercises%2Flook_sync_do_async%2Fsolution%2Fsolution.js
*/
var fs = require('fs');

function run(generator) {
  var it = generator(next);

  function go(err, result) {
    if (err) it.throw(err)
    it.next(result);
  }

  go();
}

run(function* (done) {
  try {
    var dirFiles =
      yield fs.readdir('NoNoNoNo', done); // No such dir
  } catch (err) {
    var firstFile = null;
  }

  console.log(firstFile);
});

/*
https://github.com/karenpeng/learn-generators/blob/master/exercises%2Flook_sync_make_promise%2Fsolution%2Fsolution.js
 */
function getFoo() {
  return new Promise(function (resolve, reject) {
    resolve('foo');
  });
}

function run(generator) {
  var it = generator();

  function go(result) {
    if (result.done) return result.value;

    return result.value.then(function (value) {
      return go(it.next(value));
    }, function (error) {
      return go(it.throw(value));
    });

  }

  go(it.next());
}

run(function* () {
  try {
    var foo =
      yield getFoo();
    console.log(foo);
  } catch (e) {
    console.log(e);
  }
});