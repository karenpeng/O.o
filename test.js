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