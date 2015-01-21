/*
test 1
 */
var todoModel = {
  label: 'Default',
  completed: false
}

function observer(changes) {
  changes.forEach(function (change, i) {
    console.log('what property changed? ' + change.name);
    console.log('how did it change? ' + change.type);
    console.log('what\'s the current value? ' + change.object[object.name]);
    console.log(change);
  });
}

Object.observe(todoModel, observer);

/*
test 2
 */
var model = {
  a: {}
}

var _b = 2;

Object.defineProperty(model.a, 'b', {
  get: function () {
    return _b;
  },
  set: function (b) {
    Object.getNotifier(this).notify({
      type: 'update',
      name: 'b',
      oldValue: _b
    });
    console.log('set, b');
    _b = b;
  }
});

function observer(changes) {
  changes.forEach(function (change) {
    console.log(change);
  })
}

Object.observe(model.a, observer);

/*
test 3
 */
function Circle(r) {
  var radius = r;

  var notifier = Object.getNotifier(this);

  function notifyAreaAndRadius(radius) {
    notifier.notify({
      type: 'update',
      name: 'radius',
      oldValue: radius
    })
    notifier.notify({
      type: 'update',
      name: 'area',
      oldValue: Math.pow(radius * Math.PI, 2)
    });
  }

  Object.defineProperty(this, 'radius', {
    get: function () {
      return radius;
    },
    set: function (r) {
      if (radius === r)
        return;
      notifyAreaAndRadius(radius);
      radius = r;
    }
  });

  Object.defineProperty(this, 'area', {
    get: function () {
      return Math.pow(radius, 2) * Math.PI;
    },
    set: function (a) {
      r = Math.sqrt(a / Math.PI);
      notifyAreaAndRadius(radius);
      radius = r;
    }
  });
}

function observer(changes) {
  changes.forEach(function (change, i) {
    console.log(change);
  })
}

/*
test 4
 */
function Thingy(a, b, c) {
  this.a = a;
  this.b = b;
}

Thingy.MULTIPLY = 'multiply';
Thingy.INCREMENT = 'increment';
Thingy.INCREMENT_AND_MULTIPLY = 'incrementAndMultiply';

Thingy.prototype = {
  increment: function (amount) {
    var notifier = Object.getNotifier(this);
    notifier.performChange(Thingy.INCREMENT, function () {
      this.a += amount;
      this.b += amount;
    }, this);

    notifier.notify({
      object: this,
      type: Thingy.INCREMENT,
      incremented: amount
    });
  },

  multiply: function (amount) {
    var notifier = Object.getNotifier(this);
    notifier.performChange(Thingy.MULTIPLY, function () {
      this.a *= amount;
      this.b *= amount;
    }, this);

    notifier.notify({
      object: this,
      type: Thingy.MULTIPLY,
      multiplied: amount
    });
  },

  incrementAndMultiply: function (incAmount, multAmount) {
    var notifier = Object.getNotifier(this);
    notifier.performChange(Thingy.INCREMENT_AND_MULTIPLY, function () {
      this.increment(incAmount);
      this.multiply(multAmount);
    }, this);

    notifier.notify({
      object: this,
      type: Thingy.INCREMENT_AND_MULTIPLY,
      incremented: incAmount,
      multiplied: multAmount
    });
  }
}

var observer, observer2 = {
  records: undefined,
  callbackCount: 0,
  reset: function () {
    this.records = undefined;
    this.callbackCount = 0;
  },
};

observer.callback = function (r) {
  console.log(r);
  observer.records = r;
  observer.callbackCount++;
};

observer2.callback = function (r) {
  console.log('Observer 2', r);
}

Thingy.observe = function (thingy, callback) {
  Object.observe(thingy, callback, [Thingy.INCREMENT,
    Thingy.MULTIPLY,
    Thingy.INCREMENT_AND_MULTIPLY,
    'update'
  ]);
}

Thingy.unobserve = function (thingy, callback) {
  Object.unobserve(thingy);
}

var thingy = new Thingy(2, 4);

Object.observe(thingy, observer.callback);
Thingy.observe(thingy, observer2.callback);