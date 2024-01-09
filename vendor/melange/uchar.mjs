// Generated by Melange

import * as Caml from "melange.js/caml.mjs";
import * as Caml_format from "melange.js/caml_format.mjs";

function err_not_sv(i) {
  return Caml_format.caml_format_int("%X", i) + " is not an Unicode scalar value";
}

function err_not_latin1(u) {
  return "U+" + (Caml_format.caml_format_int("%04X", u) + " is not a latin1 character");
}

function succ(u) {
  if (u === 55295) {
    return 57344;
  }
  if (u === 1114111) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "U+10FFFF has no successor",
          Error: new Error()
        };
  }
  return u + 1 | 0;
}

function pred(u) {
  if (u === 57344) {
    return 55295;
  }
  if (u === 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "U+0000 has no predecessor",
          Error: new Error()
        };
  }
  return u - 1 | 0;
}

function is_valid(i) {
  if (0 <= i && i <= 55295) {
    return true;
  } else if (57344 <= i) {
    return i <= 1114111;
  } else {
    return false;
  }
}

function of_int(i) {
  if (is_valid(i)) {
    return i;
  }
  var s = err_not_sv(i);
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: s,
        Error: new Error()
      };
}

function is_char(u) {
  return u < 256;
}

function of_char(c) {
  return c;
}

function to_char(u) {
  if (u <= 255) {
    return u;
  }
  var s = err_not_latin1(u);
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: s,
        Error: new Error()
      };
}

function unsafe_to_char(prim) {
  return prim;
}

function equal(prim0, prim1) {
  return prim0 === prim1;
}

var compare = Caml.caml_int_compare;

function hash(prim) {
  return prim;
}

function utf_decode_is_valid(d) {
  return (d >>> 27) === 1;
}

function utf_decode_length(d) {
  return (d >>> 24) & 7;
}

function utf_decode_uchar(d) {
  return d & 16777215;
}

function utf_decode(n, u) {
  return ((8 | n) << 24) | u;
}

function utf_decode_invalid(n) {
  return (n << 24) | 65533;
}

function utf_8_byte_length(u) {
  if (u < 0) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "jscomp/stdlib/uchar.ml",
            80,
            18
          ],
          Error: new Error()
        };
  }
  if (u <= 127) {
    return 1;
  }
  if (u <= 2047) {
    return 2;
  }
  if (u <= 65535) {
    return 3;
  }
  if (u <= 1114111) {
    return 4;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "jscomp/stdlib/uchar.ml",
          85,
          7
        ],
        Error: new Error()
      };
}

function utf_16_byte_length(u) {
  if (u < 0) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "jscomp/stdlib/uchar.ml",
            88,
            18
          ],
          Error: new Error()
        };
  }
  if (u <= 65535) {
    return 2;
  }
  if (u <= 1114111) {
    return 4;
  }
  throw {
        RE_EXN_ID: "Assert_failure",
        _1: [
          "jscomp/stdlib/uchar.ml",
          91,
          7
        ],
        Error: new Error()
      };
}

var min = 0;

var max = 1114111;

var bom = 65279;

var rep = 65533;

function unsafe_of_int(prim) {
  return prim;
}

function to_int(prim) {
  return prim;
}

export {
  min ,
  max ,
  bom ,
  rep ,
  succ ,
  pred ,
  is_valid ,
  of_int ,
  unsafe_of_int ,
  to_int ,
  is_char ,
  of_char ,
  to_char ,
  unsafe_to_char ,
  equal ,
  compare ,
  hash ,
  utf_decode_is_valid ,
  utf_decode_uchar ,
  utf_decode_length ,
  utf_decode ,
  utf_decode_invalid ,
  utf_8_byte_length ,
  utf_16_byte_length ,
}
/* No side effect */