// Generated by Melange

import * as Caml_exceptions from "../melange.js/caml_exceptions.mjs";
import * as Stdlib__Obj from "./obj.mjs";

function make(param) {
  var Id = /* @__PURE__ */Caml_exceptions.create("Id");
  return {
          Id: Id
        };
}

function uid(A) {
  return Stdlib__Obj.Extension_constructor.id(Stdlib__Obj.Extension_constructor.of_val({
                  RE_EXN_ID: A.Id
                }));
}

function provably_equal(A, B) {
  if (A.Id === B.Id) {
    return /* Equal */0;
  }
  
}

var Id = {
  make: make,
  uid: uid,
  provably_equal: provably_equal
};

export {
  Id ,
}
/* No side effect */
