// Generated by Melange

import * as Belt__Belt_internalAVLtree from "./belt_internalAVLtree.mjs";
import * as Caml_option from "melange.js/caml_option.mjs";
import * as Curry from "melange.js/curry.mjs";

function set(t, newK, newD, cmp) {
  if (t === undefined) {
    return Belt__Belt_internalAVLtree.singleton(newK, newD);
  }
  var n = Caml_option.valFromOption(t);
  var k = n.k;
  var c = cmp(newK, k);
  if (c === 0) {
    return Belt__Belt_internalAVLtree.updateValue(n, newD);
  }
  var l = n.l;
  var r = n.r;
  var v = n.v;
  if (c < 0) {
    return Belt__Belt_internalAVLtree.bal(set(l, newK, newD, cmp), k, v, r);
  } else {
    return Belt__Belt_internalAVLtree.bal(l, k, v, set(r, newK, newD, cmp));
  }
}

function updateU(t, newK, f, cmp) {
  if (t !== undefined) {
    var n = Caml_option.valFromOption(t);
    var k = n.k;
    var c = cmp(newK, k);
    if (c === 0) {
      var newD = f(Caml_option.some(n.v));
      if (newD !== undefined) {
        return Belt__Belt_internalAVLtree.updateValue(n, Caml_option.valFromOption(newD));
      }
      var l = n.l;
      var r = n.r;
      if (l === undefined) {
        return r;
      }
      if (r === undefined) {
        return l;
      }
      var rn = Caml_option.valFromOption(r);
      var kr = {
        contents: rn.k
      };
      var vr = {
        contents: rn.v
      };
      var r$1 = Belt__Belt_internalAVLtree.removeMinAuxWithRef(rn, kr, vr);
      return Belt__Belt_internalAVLtree.bal(l, kr.contents, vr.contents, r$1);
    }
    var l$1 = n.l;
    var r$2 = n.r;
    var v = n.v;
    if (c < 0) {
      var ll = updateU(l$1, newK, f, cmp);
      if (l$1 === ll) {
        return t;
      } else {
        return Belt__Belt_internalAVLtree.bal(ll, k, v, r$2);
      }
    }
    var rr = updateU(r$2, newK, f, cmp);
    if (r$2 === rr) {
      return t;
    } else {
      return Belt__Belt_internalAVLtree.bal(l$1, k, v, rr);
    }
  }
  var newD$1 = f(undefined);
  if (newD$1 !== undefined) {
    return Belt__Belt_internalAVLtree.singleton(newK, Caml_option.valFromOption(newD$1));
  } else {
    return t;
  }
}

function update(t, newK, f, cmp) {
  return updateU(t, newK, Curry.__1(f), cmp);
}

function removeAux0(n, x, cmp) {
  var v = n.k;
  var l = n.l;
  var r = n.r;
  var c = cmp(x, v);
  if (c === 0) {
    if (l === undefined) {
      return r;
    }
    if (r === undefined) {
      return l;
    }
    var rn = Caml_option.valFromOption(r);
    var kr = {
      contents: rn.k
    };
    var vr = {
      contents: rn.v
    };
    var r$1 = Belt__Belt_internalAVLtree.removeMinAuxWithRef(rn, kr, vr);
    return Belt__Belt_internalAVLtree.bal(l, kr.contents, vr.contents, r$1);
  }
  if (c < 0) {
    if (l === undefined) {
      return n;
    }
    var ll = removeAux0(Caml_option.valFromOption(l), x, cmp);
    if (ll === l) {
      return n;
    } else {
      return Belt__Belt_internalAVLtree.bal(ll, v, n.v, r);
    }
  }
  if (r === undefined) {
    return n;
  }
  var rr = removeAux0(Caml_option.valFromOption(r), x, cmp);
  if (rr === r) {
    return n;
  } else {
    return Belt__Belt_internalAVLtree.bal(l, v, n.v, rr);
  }
}

function remove(n, x, cmp) {
  if (n !== undefined) {
    return removeAux0(n, x, cmp);
  }
  
}

function mergeMany(h, arr, cmp) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var match = arr[i];
    v = set(v, match[0], match[1], cmp);
  }
  return v;
}

function splitAuxPivot(n, x, pres, cmp) {
  var v = n.k;
  var d = n.v;
  var l = n.l;
  var r = n.r;
  var c = cmp(x, v);
  if (c === 0) {
    pres.contents = Caml_option.some(d);
    return [
            l,
            r
          ];
  }
  if (c < 0) {
    if (l === undefined) {
      return [
              undefined,
              n
            ];
    }
    var match = splitAuxPivot(Caml_option.valFromOption(l), x, pres, cmp);
    return [
            match[0],
            Belt__Belt_internalAVLtree.join(match[1], v, d, r)
          ];
  }
  if (r === undefined) {
    return [
            n,
            undefined
          ];
  }
  var match$1 = splitAuxPivot(Caml_option.valFromOption(r), x, pres, cmp);
  return [
          Belt__Belt_internalAVLtree.join(l, v, d, match$1[0]),
          match$1[1]
        ];
}

function split(n, x, cmp) {
  if (n === undefined) {
    return [
            [
              undefined,
              undefined
            ],
            undefined
          ];
  }
  var pres = {
    contents: undefined
  };
  var v = splitAuxPivot(n, x, pres, cmp);
  return [
          v,
          pres.contents
        ];
}

function mergeU(s1, s2, f, cmp) {
  if (s1 === undefined) {
    if (s2 !== undefined) {
      return Belt__Belt_internalAVLtree.keepMapU(s2, (function (k, v) {
                    return f(k, undefined, Caml_option.some(v));
                  }));
    } else {
      return ;
    }
  }
  var s1n = Caml_option.valFromOption(s1);
  if (s2 === undefined) {
    return Belt__Belt_internalAVLtree.keepMapU(s1, (function (k, v) {
                  return f(k, Caml_option.some(v), undefined);
                }));
  }
  var s2n = Caml_option.valFromOption(s2);
  if (s1n.h >= s2n.h) {
    var v1 = s1n.k;
    var d1 = s1n.v;
    var l1 = s1n.l;
    var r1 = s1n.r;
    var d2 = {
      contents: undefined
    };
    var match = splitAuxPivot(s2n, v1, d2, cmp);
    var d2$1 = d2.contents;
    var newLeft = mergeU(l1, match[0], f, cmp);
    var newD = f(v1, Caml_option.some(d1), d2$1);
    var newRight = mergeU(r1, match[1], f, cmp);
    return Belt__Belt_internalAVLtree.concatOrJoin(newLeft, v1, newD, newRight);
  }
  var v2 = s2n.k;
  var d2$2 = s2n.v;
  var l2 = s2n.l;
  var r2 = s2n.r;
  var d1$1 = {
    contents: undefined
  };
  var match$1 = splitAuxPivot(s1n, v2, d1$1, cmp);
  var d1$2 = d1$1.contents;
  var newLeft$1 = mergeU(match$1[0], l2, f, cmp);
  var newD$1 = f(v2, d1$2, Caml_option.some(d2$2));
  var newRight$1 = mergeU(match$1[1], r2, f, cmp);
  return Belt__Belt_internalAVLtree.concatOrJoin(newLeft$1, v2, newD$1, newRight$1);
}

function merge(s1, s2, f, cmp) {
  return mergeU(s1, s2, Curry.__3(f), cmp);
}

function removeMany(t, keys, cmp) {
  var len = keys.length;
  if (t !== undefined) {
    var _t = t;
    var _i = 0;
    while(true) {
      var i = _i;
      var t$1 = _t;
      if (i >= len) {
        return t$1;
      }
      var ele = keys[i];
      var u = removeAux0(t$1, ele, cmp);
      if (u === undefined) {
        return u;
      }
      _i = i + 1 | 0;
      _t = Caml_option.valFromOption(u);
      continue ;
    };
  }
  
}

var empty;

var isEmpty = Belt__Belt_internalAVLtree.isEmpty;

var has = Belt__Belt_internalAVLtree.has;

var cmpU = Belt__Belt_internalAVLtree.cmpU;

var cmp = Belt__Belt_internalAVLtree.cmp;

var eqU = Belt__Belt_internalAVLtree.eqU;

var eq = Belt__Belt_internalAVLtree.eq;

var findFirstByU = Belt__Belt_internalAVLtree.findFirstByU;

var findFirstBy = Belt__Belt_internalAVLtree.findFirstBy;

var forEachU = Belt__Belt_internalAVLtree.forEachU;

var forEach = Belt__Belt_internalAVLtree.forEach;

var reduceU = Belt__Belt_internalAVLtree.reduceU;

var reduce = Belt__Belt_internalAVLtree.reduce;

var everyU = Belt__Belt_internalAVLtree.everyU;

var every = Belt__Belt_internalAVLtree.every;

var someU = Belt__Belt_internalAVLtree.someU;

var some = Belt__Belt_internalAVLtree.some;

var size = Belt__Belt_internalAVLtree.size;

var toList = Belt__Belt_internalAVLtree.toList;

var toArray = Belt__Belt_internalAVLtree.toArray;

var fromArray = Belt__Belt_internalAVLtree.fromArray;

var keysToArray = Belt__Belt_internalAVLtree.keysToArray;

var valuesToArray = Belt__Belt_internalAVLtree.valuesToArray;

var minKey = Belt__Belt_internalAVLtree.minKey;

var minKeyUndefined = Belt__Belt_internalAVLtree.minKeyUndefined;

var maxKey = Belt__Belt_internalAVLtree.maxKey;

var maxKeyUndefined = Belt__Belt_internalAVLtree.maxKeyUndefined;

var minimum = Belt__Belt_internalAVLtree.minimum;

var minUndefined = Belt__Belt_internalAVLtree.minUndefined;

var maximum = Belt__Belt_internalAVLtree.maximum;

var maxUndefined = Belt__Belt_internalAVLtree.maxUndefined;

var get = Belt__Belt_internalAVLtree.get;

var getUndefined = Belt__Belt_internalAVLtree.getUndefined;

var getWithDefault = Belt__Belt_internalAVLtree.getWithDefault;

var getExn = Belt__Belt_internalAVLtree.getExn;

var checkInvariantInternal = Belt__Belt_internalAVLtree.checkInvariantInternal;

var keepU = Belt__Belt_internalAVLtree.keepSharedU;

var keep = Belt__Belt_internalAVLtree.keepShared;

var partitionU = Belt__Belt_internalAVLtree.partitionSharedU;

var partition = Belt__Belt_internalAVLtree.partitionShared;

var mapU = Belt__Belt_internalAVLtree.mapU;

var map = Belt__Belt_internalAVLtree.map;

var mapWithKeyU = Belt__Belt_internalAVLtree.mapWithKeyU;

var mapWithKey = Belt__Belt_internalAVLtree.mapWithKey;

export {
  empty ,
  isEmpty ,
  has ,
  cmpU ,
  cmp ,
  eqU ,
  eq ,
  findFirstByU ,
  findFirstBy ,
  forEachU ,
  forEach ,
  reduceU ,
  reduce ,
  everyU ,
  every ,
  someU ,
  some ,
  size ,
  toList ,
  toArray ,
  fromArray ,
  keysToArray ,
  valuesToArray ,
  minKey ,
  minKeyUndefined ,
  maxKey ,
  maxKeyUndefined ,
  minimum ,
  minUndefined ,
  maximum ,
  maxUndefined ,
  get ,
  getUndefined ,
  getWithDefault ,
  getExn ,
  checkInvariantInternal ,
  remove ,
  removeMany ,
  set ,
  updateU ,
  update ,
  mergeU ,
  merge ,
  mergeMany ,
  keepU ,
  keep ,
  partitionU ,
  partition ,
  split ,
  mapU ,
  map ,
  mapWithKeyU ,
  mapWithKey ,
}
/* No side effect */