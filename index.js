// (Any) => Any
var _ = function (x) { return x }

// collection fns
// (String, Any) => Object
_.pair = function (key, val) {
  var o = {}
  o[key] = val
  return o
}

// (Object, String) => Boolean
_.contains = function (obj, key) {
  for (var k in obj) {
    if (k === key) {
      return true
    }
  }
  return false
}

// quantifiers

// type Predicate : (value: Any, key: String?) => Boolean

// (Object, Predicate) => Boolean
_.some = function (obj, predicate) {
  predicate = predicate || function () { return true }
  for (var k in obj) {
    if (predicate(obj[k], k)) {
      return true
    }
  }
  return false
}

// (Object, Predicate) => Boolean
_.every = function (obj, predicate) {
  for (var k in obj) {
    if (!predicate(obj[k], k)) {
      return false
    }
  }
  return true
}

// collection

// (Object, Predicate?) => Int
_.count = function (obj, predicate) {
  if (typeof predicate !== 'function') {
    return Object.keys(obj).length
  }
  var c = 0
  for (var k in obj) {
    if (predicate(obj[k])) {
      c++
    }
  }
  return c
}

// (Object, Predicate) => Object
_.filter = function (obj, predicate) {
  var o = {}
  for (var k in obj) {
    if (predicate(obj[k])) {
      o[k] = obj[k]
    }
  }
  return o
}

// (Object, Function) => Object
_.forEach = function (obj, iterator) {
  for (var k in obj) {
    iterator(obj[k], k)
  }
  return obj
}

// algebraic fns

// (Object, (val: Any, key: String) => Any) => Object
_.map = function (obj, fn) {
  var o = {}
  for (var k in obj) {
    o[k] = fn(obj[k], k)
  }
  return o
}

// type Reducer : (accumulator: Any, val: Any, key: String) => Any

// (Object, Reducer, seed: Any) => Any
_.reduce = function (obj, fn, seed) {
  var val = seed || {}
  for (var k in obj) {
    val = fn(val, obj[k], k)
  }
  return val
}

// (Object, Object) => Object
_.concat = function (objA, objB) {
  for (var k in objB) {
    objA[k] = objB[k]
  }
  return objA
}

/* I might be doing this wrong:
 * this applies a function to each key-value pair in a dictionary
 * where the function is (Pair) => Array
 * and returns a flattened Array
 */
// (Object, Reducer) => Array
_.flatMap = function (obj, fn) {
  return _.reduce(obj, function (arr, val, key) {
    return arr.concat(fn(val, key))
  }, [])
}



// generic functions
// (Any, Any) => Boolean
_.eq = function (a, b) { return a === b }

// type Comparator : (Any, Any) => Boolean
// (Comparator, Any, Any) => void
// (Comparator, Any) => (Any) => void
// (Any, Any) => void
// (Any) => (Any) => void
// `fn` defaults to the Equality Comparator (_.eq)
// Optionally curries `val`
_.assert = function (fn, expect, val) {
  if (typeof fn !== 'function') {
    val = expect
    expect = fn
    fn = eq
  }
  if (val === undefined) {
    // return partially applied function
    return function (val) {
      return assert(fn, expect, val)
    }
  }
  if (!eq(expect, val)) {
    throw new Error('Assertion error', expect, val)
  }
}

// connective operators

// (Any) => Boolean
_.not = function (a) {
  return !a
}

// (Any, Any) => Boolean
_.and = function (a, b) {
  return a && b
}

// (Any, Any) => Boolean
_.or = function (a, b) {
  return a || b
}

// (Any, Any) => Boolean
_.xor = function (a, b) {
  return (a || b) && !(a && b)
}

module.exports = _