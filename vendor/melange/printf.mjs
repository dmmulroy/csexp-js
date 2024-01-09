// Generated by Melange

import * as CamlinternalFormat from "./camlinternalFormat.mjs";
import * as Curry from "melange.js/curry.mjs";
import * as Stdlib from "./stdlib.mjs";
import * as Stdlib__Buffer from "./buffer.mjs";

function kfprintf(k, o, param) {
  return CamlinternalFormat.make_printf((function (acc) {
                CamlinternalFormat.output_acc(o, acc);
                return Curry._1(k, o);
              }), /* End_of_acc */0, param._0);
}

function kbprintf(k, b, param) {
  return CamlinternalFormat.make_printf((function (acc) {
                CamlinternalFormat.bufput_acc(b, acc);
                return Curry._1(k, b);
              }), /* End_of_acc */0, param._0);
}

function ikfprintf(k, oc, param) {
  return CamlinternalFormat.make_iprintf(k, oc, param._0);
}

function fprintf(oc, fmt) {
  return kfprintf((function (prim) {
                
              }), oc, fmt);
}

function bprintf(b, fmt) {
  return kbprintf((function (prim) {
                
              }), b, fmt);
}

function ifprintf(oc, fmt) {
  return ikfprintf((function (prim) {
                
              }), oc, fmt);
}

function ibprintf(b, fmt) {
  return ikfprintf((function (prim) {
                
              }), b, fmt);
}

function printf(fmt) {
  return fprintf(Stdlib.stdout, fmt);
}

function eprintf(fmt) {
  return fprintf(Stdlib.stderr, fmt);
}

function ksprintf(k, param) {
  var k$p = function (acc) {
    var buf = Stdlib__Buffer.create(64);
    CamlinternalFormat.strput_acc(buf, acc);
    return Curry._1(k, Stdlib__Buffer.contents(buf));
  };
  return CamlinternalFormat.make_printf(k$p, /* End_of_acc */0, param._0);
}

function sprintf(fmt) {
  return ksprintf((function (s) {
                return s;
              }), fmt);
}

var ikbprintf = ikfprintf;

var kprintf = ksprintf;

export {
  fprintf ,
  printf ,
  eprintf ,
  sprintf ,
  bprintf ,
  ifprintf ,
  ibprintf ,
  kfprintf ,
  ikfprintf ,
  ksprintf ,
  kbprintf ,
  ikbprintf ,
  kprintf ,
}
/* No side effect */
