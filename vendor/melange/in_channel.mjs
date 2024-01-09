// Generated by Melange

import * as Caml_bytes from "melange.js/caml_bytes.mjs";
import * as Caml_external_polyfill from "melange.js/caml_external_polyfill.mjs";
import * as Caml_js_exceptions from "melange.js/caml_js_exceptions.mjs";
import * as Caml_option from "melange.js/caml_option.mjs";
import * as Curry from "melange.js/curry.mjs";
import * as Stdlib from "./stdlib.mjs";
import * as Stdlib__Bytes from "./bytes.mjs";
import * as Stdlib__Fun from "./fun.mjs";
import * as Stdlib__Sys from "./sys.mjs";

function with_open(openfun, s, f) {
  var ic = Curry._1(openfun, s);
  return Stdlib__Fun.protect((function (param) {
                Stdlib.close_in_noerr(ic);
              }), (function (param) {
                return Curry._1(f, ic);
              }));
}

function with_open_bin(s, f) {
  return with_open(Stdlib.open_in_bin, s, f);
}

function with_open_text(s, f) {
  return with_open(Stdlib.open_in, s, f);
}

function with_open_gen(flags, perm, s, f) {
  return with_open((function (param) {
                return Stdlib.open_in_gen(flags, perm, param);
              }), s, f);
}

var seek = Stdlib.LargeFile.seek_in;

var pos = Stdlib.LargeFile.pos_in;

var length = Stdlib.LargeFile.in_channel_length;

function input_char(ic) {
  var c;
  try {
    c = Caml_external_polyfill.resolve("caml_ml_input_char")(ic);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.End_of_file) {
      return ;
    }
    throw exn;
  }
  return c;
}

function input_byte(ic) {
  var n;
  try {
    n = Caml_external_polyfill.resolve("caml_ml_input_char")(ic);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.End_of_file) {
      return ;
    }
    throw exn;
  }
  return n;
}

function input_line(ic) {
  var s;
  try {
    s = Stdlib.input_line(ic);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.End_of_file) {
      return ;
    }
    throw exn;
  }
  return s;
}

function really_input(ic, buf, pos, len) {
  try {
    Stdlib.really_input(ic, buf, pos, len);
    return Caml_option.some(undefined);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.End_of_file) {
      return ;
    }
    throw exn;
  }
}

function really_input_string(ic, len) {
  var s;
  try {
    s = Stdlib.really_input_string(ic, len);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.End_of_file) {
      return ;
    }
    throw exn;
  }
  return s;
}

function read_upto(ic, buf, ofs, len) {
  var loop = function (_ofs, _len) {
    while(true) {
      var len = _len;
      var ofs = _ofs;
      if (len === 0) {
        return ofs;
      }
      var r = Stdlib.input(ic, buf, ofs, len);
      if (r === 0) {
        return ofs;
      }
      _len = len - r | 0;
      _ofs = ofs + r | 0;
      continue ;
    };
  };
  return loop(ofs, len) - ofs | 0;
}

function ensure(buf, ofs, n) {
  var len = buf.length;
  if (len >= (ofs + n | 0)) {
    return buf;
  }
  var new_len = len;
  while(new_len < (ofs + n | 0)) {
    new_len = (new_len << 1) + 1 | 0;
  };
  var new_len$1 = new_len;
  var new_len$2;
  if (new_len$1 <= Stdlib__Sys.max_string_length) {
    new_len$2 = new_len$1;
  } else if (ofs < Stdlib__Sys.max_string_length) {
    new_len$2 = Stdlib__Sys.max_string_length;
  } else {
    throw {
          RE_EXN_ID: "Failure",
          _1: "In_channel.input_all: channel content is larger than maximum string length",
          Error: new Error()
        };
  }
  var new_buf = Caml_bytes.caml_create_bytes(new_len$2);
  Stdlib__Bytes.blit(buf, 0, new_buf, 0, ofs);
  return new_buf;
}

function input_all(ic) {
  var initial_size;
  try {
    initial_size = Caml_external_polyfill.resolve("caml_ml_channel_size")(ic) - Caml_external_polyfill.resolve("caml_ml_pos_in")(ic) | 0;
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.Sys_error) {
      initial_size = -1;
    } else {
      throw exn;
    }
  }
  var initial_size$1 = initial_size < 0 ? 65536 : initial_size;
  var initial_size$2 = initial_size$1 <= Stdlib__Sys.max_string_length ? initial_size$1 : Stdlib__Sys.max_string_length;
  var buf = Caml_bytes.caml_create_bytes(initial_size$2);
  var nread = read_upto(ic, buf, 0, initial_size$2);
  if (nread < initial_size$2) {
    return Stdlib__Bytes.sub_string(buf, 0, nread);
  }
  var c;
  try {
    c = Caml_external_polyfill.resolve("caml_ml_input_char")(ic);
  }
  catch (raw_exn$1){
    var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn$1);
    if (exn$1.RE_EXN_ID === Stdlib.End_of_file) {
      return Caml_bytes.bytes_to_string(buf);
    }
    throw exn$1;
  }
  var buf$1 = ensure(buf, nread, 65537);
  Caml_bytes.set(buf$1, nread, c);
  var _buf = buf$1;
  var _ofs = nread + 1 | 0;
  while(true) {
    var ofs = _ofs;
    var buf$2 = _buf;
    var buf$3 = ensure(buf$2, ofs, 65536);
    var rem = buf$3.length - ofs | 0;
    var r = read_upto(ic, buf$3, ofs, rem);
    if (r < rem) {
      return Stdlib__Bytes.sub_string(buf$3, 0, ofs + r | 0);
    }
    _ofs = ofs + rem | 0;
    _buf = buf$3;
    continue ;
  };
}

function input_lines_dps(_dst, _offset, ic) {
  while(true) {
    var dst = _dst;
    var offset = _offset;
    var line;
    try {
      line = Stdlib.input_line(ic);
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === Stdlib.End_of_file) {
        dst[offset] = /* [] */0;
        return ;
      }
      throw exn;
      dst[offset] = undefined;
      dst[offset] = undefined;
      return ;
    }
    var block = {
      hd: line,
      tl: 24029
    };
    dst[offset] = block;
    _offset = "tl";
    _dst = block;
    continue ;
  };
}

function input_lines(ic) {
  var line;
  try {
    line = Stdlib.input_line(ic);
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === Stdlib.End_of_file) {
      return /* [] */0;
    }
    throw exn;
  }
  var block = {
    hd: line,
    tl: 24029
  };
  input_lines_dps(block, "tl", ic);
  return block;
}

function fold_lines(f, _accu, ic) {
  while(true) {
    var accu = _accu;
    var line;
    try {
      line = Stdlib.input_line(ic);
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn.RE_EXN_ID === Stdlib.End_of_file) {
        return accu;
      }
      throw exn;
    }
    _accu = Curry._2(f, accu, line);
    continue ;
  };
}

var stdin = Stdlib.stdin;

var open_bin = Stdlib.open_in_bin;

var open_text = Stdlib.open_in;

var open_gen = Stdlib.open_in_gen;

var close = Stdlib.close_in;

var close_noerr = Stdlib.close_in_noerr;

var input = Stdlib.input;

var set_binary_mode = Stdlib.set_binary_mode_in;

function isatty(prim) {
  return Caml_external_polyfill.resolve("caml_sys_isatty")(prim);
}

export {
  stdin ,
  open_bin ,
  open_text ,
  open_gen ,
  with_open_bin ,
  with_open_text ,
  with_open_gen ,
  close ,
  close_noerr ,
  input_char ,
  input_byte ,
  input_line ,
  really_input_string ,
  input_all ,
  input_lines ,
  input ,
  really_input ,
  fold_lines ,
  seek ,
  pos ,
  length ,
  set_binary_mode ,
  isatty ,
}
/* Stdlib__Fun Not a pure module */