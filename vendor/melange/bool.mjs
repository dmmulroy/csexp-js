// Generated by Melange

import * as Caml from "melange.js/caml.mjs";
import * as Caml_hash from "melange.js/caml_hash.mjs";

function equal(prim0, prim1) {
  return prim0 === prim1;
}

var compare = Caml.caml_int_compare;

function to_int(param) {
  if (param) {
    return 1;
  } else {
    return 0;
  }
}

function to_float(param) {
  if (param) {
    return 1;
  } else {
    return 0;
  }
}

function to_string(param) {
  if (param) {
    return "true";
  } else {
    return "false";
  }
}

function seeded_hash(seed, x) {
  return Caml_hash.caml_hash(10, 100, seed, x);
}

function hash(x) {
  return Caml_hash.caml_hash(10, 100, 0, x);
}

function not(prim) {
  return !prim;
}

export {
  not ,
  equal ,
  compare ,
  to_int ,
  to_float ,
  to_string ,
  seeded_hash ,
  hash ,
}
/* No side effect */
