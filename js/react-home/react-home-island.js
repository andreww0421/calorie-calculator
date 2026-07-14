function um(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var pc = { exports: {} }, Va = {}, hc = { exports: {} }, I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ar = Symbol.for("react.element"), cm = Symbol.for("react.portal"), dm = Symbol.for("react.fragment"), fm = Symbol.for("react.strict_mode"), mm = Symbol.for("react.profiler"), pm = Symbol.for("react.provider"), hm = Symbol.for("react.context"), gm = Symbol.for("react.forward_ref"), ym = Symbol.for("react.suspense"), vm = Symbol.for("react.memo"), _m = Symbol.for("react.lazy"), Ws = Symbol.iterator;
function Sm(e) {
  return e === null || typeof e != "object" ? null : (e = Ws && e[Ws] || e["@@iterator"], typeof e == "function" ? e : null);
}
var gc = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, yc = Object.assign, vc = {};
function zn(e, t, n) {
  this.props = e, this.context = t, this.refs = vc, this.updater = n || gc;
}
zn.prototype.isReactComponent = {};
zn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
zn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function _c() {
}
_c.prototype = zn.prototype;
function Jl(e, t, n) {
  this.props = e, this.context = t, this.refs = vc, this.updater = n || gc;
}
var ei = Jl.prototype = new _c();
ei.constructor = Jl;
yc(ei, zn.prototype);
ei.isPureReactComponent = !0;
var Bs = Array.isArray, Sc = Object.prototype.hasOwnProperty, ti = { current: null }, wc = { key: !0, ref: !0, __self: !0, __source: !0 };
function kc(e, t, n) {
  var r, a = {}, o = null, l = null;
  if (t != null) for (r in t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (o = "" + t.key), t) Sc.call(t, r) && !wc.hasOwnProperty(r) && (a[r] = t[r]);
  var s = arguments.length - 2;
  if (s === 1) a.children = n;
  else if (1 < s) {
    for (var u = Array(s), c = 0; c < s; c++) u[c] = arguments[c + 2];
    a.children = u;
  }
  if (e && e.defaultProps) for (r in s = e.defaultProps, s) a[r] === void 0 && (a[r] = s[r]);
  return { $$typeof: Ar, type: e, key: o, ref: l, props: a, _owner: ti.current };
}
function wm(e, t) {
  return { $$typeof: Ar, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ni(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Ar;
}
function km(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Us = /\/+/g;
function ho(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? km("" + e.key) : t.toString(36);
}
function sa(e, t, n, r, a) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var l = !1;
  if (e === null) l = !0;
  else switch (o) {
    case "string":
    case "number":
      l = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case Ar:
        case cm:
          l = !0;
      }
  }
  if (l) return l = e, a = a(l), e = r === "" ? "." + ho(l, 0) : r, Bs(a) ? (n = "", e != null && (n = e.replace(Us, "$&/") + "/"), sa(a, t, n, "", function(c) {
    return c;
  })) : a != null && (ni(a) && (a = wm(a, n + (!a.key || l && l.key === a.key ? "" : ("" + a.key).replace(Us, "$&/") + "/") + e)), t.push(a)), 1;
  if (l = 0, r = r === "" ? "." : r + ":", Bs(e)) for (var s = 0; s < e.length; s++) {
    o = e[s];
    var u = r + ho(o, s);
    l += sa(o, t, n, u, a);
  }
  else if (u = Sm(e), typeof u == "function") for (e = u.call(e), s = 0; !(o = e.next()).done; ) o = o.value, u = r + ho(o, s++), l += sa(o, t, n, u, a);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return l;
}
function Ur(e, t, n) {
  if (e == null) return e;
  var r = [], a = 0;
  return sa(e, r, "", "", function(o) {
    return t.call(n, o, a++);
  }), r;
}
function xm(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ye = { current: null }, ua = { transition: null }, Tm = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: ua, ReactCurrentOwner: ti };
function xc() {
  throw Error("act(...) is not supported in production builds of React.");
}
I.Children = { map: Ur, forEach: function(e, t, n) {
  Ur(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Ur(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Ur(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ni(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
I.Component = zn;
I.Fragment = dm;
I.Profiler = mm;
I.PureComponent = Jl;
I.StrictMode = fm;
I.Suspense = ym;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Tm;
I.act = xc;
I.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = yc({}, e.props), a = e.key, o = e.ref, l = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, l = ti.current), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps) var s = e.type.defaultProps;
    for (u in t) Sc.call(t, u) && !wc.hasOwnProperty(u) && (r[u] = t[u] === void 0 && s !== void 0 ? s[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    s = Array(u);
    for (var c = 0; c < u; c++) s[c] = arguments[c + 2];
    r.children = s;
  }
  return { $$typeof: Ar, type: e.type, key: a, ref: o, props: r, _owner: l };
};
I.createContext = function(e) {
  return e = { $$typeof: hm, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: pm, _context: e }, e.Consumer = e;
};
I.createElement = kc;
I.createFactory = function(e) {
  var t = kc.bind(null, e);
  return t.type = e, t;
};
I.createRef = function() {
  return { current: null };
};
I.forwardRef = function(e) {
  return { $$typeof: gm, render: e };
};
I.isValidElement = ni;
I.lazy = function(e) {
  return { $$typeof: _m, _payload: { _status: -1, _result: e }, _init: xm };
};
I.memo = function(e, t) {
  return { $$typeof: vm, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function(e) {
  var t = ua.transition;
  ua.transition = {};
  try {
    e();
  } finally {
    ua.transition = t;
  }
};
I.unstable_act = xc;
I.useCallback = function(e, t) {
  return ye.current.useCallback(e, t);
};
I.useContext = function(e) {
  return ye.current.useContext(e);
};
I.useDebugValue = function() {
};
I.useDeferredValue = function(e) {
  return ye.current.useDeferredValue(e);
};
I.useEffect = function(e, t) {
  return ye.current.useEffect(e, t);
};
I.useId = function() {
  return ye.current.useId();
};
I.useImperativeHandle = function(e, t, n) {
  return ye.current.useImperativeHandle(e, t, n);
};
I.useInsertionEffect = function(e, t) {
  return ye.current.useInsertionEffect(e, t);
};
I.useLayoutEffect = function(e, t) {
  return ye.current.useLayoutEffect(e, t);
};
I.useMemo = function(e, t) {
  return ye.current.useMemo(e, t);
};
I.useReducer = function(e, t, n) {
  return ye.current.useReducer(e, t, n);
};
I.useRef = function(e) {
  return ye.current.useRef(e);
};
I.useState = function(e) {
  return ye.current.useState(e);
};
I.useSyncExternalStore = function(e, t, n) {
  return ye.current.useSyncExternalStore(e, t, n);
};
I.useTransition = function() {
  return ye.current.useTransition();
};
I.version = "18.3.1";
hc.exports = I;
var X = hc.exports;
const le = /* @__PURE__ */ um(X);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Nm = X, bm = Symbol.for("react.element"), Cm = Symbol.for("react.fragment"), Mm = Object.prototype.hasOwnProperty, jm = Nm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Em = { key: !0, ref: !0, __self: !0, __source: !0 };
function Tc(e, t, n) {
  var r, a = {}, o = null, l = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (l = t.ref);
  for (r in t) Mm.call(t, r) && !Em.hasOwnProperty(r) && (a[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) a[r] === void 0 && (a[r] = t[r]);
  return { $$typeof: bm, type: e, key: o, ref: l, props: a, _owner: jm.current };
}
Va.Fragment = Cm;
Va.jsx = Tc;
Va.jsxs = Tc;
pc.exports = Va;
var i = pc.exports, Dt = {}, Nc = { exports: {} }, Le = {}, bc = { exports: {} }, Cc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(b, D) {
    var P = b.length;
    b.push(D);
    e: for (; 0 < P; ) {
      var W = P - 1 >>> 1, Z = b[W];
      if (0 < a(Z, D)) b[W] = D, b[P] = Z, P = W;
      else break e;
    }
  }
  function n(b) {
    return b.length === 0 ? null : b[0];
  }
  function r(b) {
    if (b.length === 0) return null;
    var D = b[0], P = b.pop();
    if (P !== D) {
      b[0] = P;
      e: for (var W = 0, Z = b.length, Ot = Z >>> 1; W < Ot; ) {
        var Ve = 2 * (W + 1) - 1, an = b[Ve], Qe = Ve + 1, $t = b[Qe];
        if (0 > a(an, P)) Qe < Z && 0 > a($t, an) ? (b[W] = $t, b[Qe] = P, W = Qe) : (b[W] = an, b[Ve] = P, W = Ve);
        else if (Qe < Z && 0 > a($t, P)) b[W] = $t, b[Qe] = P, W = Qe;
        else break e;
      }
    }
    return D;
  }
  function a(b, D) {
    var P = b.sortIndex - D.sortIndex;
    return P !== 0 ? P : b.id - D.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var l = Date, s = l.now();
    e.unstable_now = function() {
      return l.now() - s;
    };
  }
  var u = [], c = [], m = 1, h = null, f = 3, y = !1, v = !1, S = !1, L = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(b) {
    for (var D = n(c); D !== null; ) {
      if (D.callback === null) r(c);
      else if (D.startTime <= b) r(c), D.sortIndex = D.expirationTime, t(u, D);
      else break;
      D = n(c);
    }
  }
  function _(b) {
    if (S = !1, g(b), !v) if (n(u) !== null) v = !0, nn(x);
    else {
      var D = n(c);
      D !== null && rn(_, D.startTime - b);
    }
  }
  function x(b, D) {
    v = !1, S && (S = !1, p(M), M = -1), y = !0;
    var P = f;
    try {
      for (g(D), h = n(u); h !== null && (!(h.expirationTime > D) || b && !ae()); ) {
        var W = h.callback;
        if (typeof W == "function") {
          h.callback = null, f = h.priorityLevel;
          var Z = W(h.expirationTime <= D);
          D = e.unstable_now(), typeof Z == "function" ? h.callback = Z : h === n(u) && r(u), g(D);
        } else r(u);
        h = n(u);
      }
      if (h !== null) var Ot = !0;
      else {
        var Ve = n(c);
        Ve !== null && rn(_, Ve.startTime - D), Ot = !1;
      }
      return Ot;
    } finally {
      h = null, f = P, y = !1;
    }
  }
  var T = !1, N = null, M = -1, F = 5, A = -1;
  function ae() {
    return !(e.unstable_now() - A < F);
  }
  function Y() {
    if (N !== null) {
      var b = e.unstable_now();
      A = b;
      var D = !0;
      try {
        D = N(!0, b);
      } finally {
        D ? ht() : (T = !1, N = null);
      }
    } else T = !1;
  }
  var ht;
  if (typeof d == "function") ht = function() {
    d(Y);
  };
  else if (typeof MessageChannel < "u") {
    var Hn = new MessageChannel(), Wr = Hn.port2;
    Hn.port1.onmessage = Y, ht = function() {
      Wr.postMessage(null);
    };
  } else ht = function() {
    L(Y, 0);
  };
  function nn(b) {
    N = b, T || (T = !0, ht());
  }
  function rn(b, D) {
    M = L(function() {
      b(e.unstable_now());
    }, D);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(b) {
    b.callback = null;
  }, e.unstable_continueExecution = function() {
    v || y || (v = !0, nn(x));
  }, e.unstable_forceFrameRate = function(b) {
    0 > b || 125 < b ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : F = 0 < b ? Math.floor(1e3 / b) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return f;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(b) {
    switch (f) {
      case 1:
      case 2:
      case 3:
        var D = 3;
        break;
      default:
        D = f;
    }
    var P = f;
    f = D;
    try {
      return b();
    } finally {
      f = P;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(b, D) {
    switch (b) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        b = 3;
    }
    var P = f;
    f = b;
    try {
      return D();
    } finally {
      f = P;
    }
  }, e.unstable_scheduleCallback = function(b, D, P) {
    var W = e.unstable_now();
    switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? W + P : W) : P = W, b) {
      case 1:
        var Z = -1;
        break;
      case 2:
        Z = 250;
        break;
      case 5:
        Z = 1073741823;
        break;
      case 4:
        Z = 1e4;
        break;
      default:
        Z = 5e3;
    }
    return Z = P + Z, b = { id: m++, callback: D, priorityLevel: b, startTime: P, expirationTime: Z, sortIndex: -1 }, P > W ? (b.sortIndex = P, t(c, b), n(u) === null && b === n(c) && (S ? (p(M), M = -1) : S = !0, rn(_, P - W))) : (b.sortIndex = Z, t(u, b), v || y || (v = !0, nn(x))), b;
  }, e.unstable_shouldYield = ae, e.unstable_wrapCallback = function(b) {
    var D = f;
    return function() {
      var P = f;
      f = D;
      try {
        return b.apply(this, arguments);
      } finally {
        f = P;
      }
    };
  };
})(Cc);
bc.exports = Cc;
var Lm = bc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dm = X, Ee = Lm;
function w(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Mc = /* @__PURE__ */ new Set(), gr = {};
function en(e, t) {
  jn(e, t), jn(e + "Capture", t);
}
function jn(e, t) {
  for (gr[e] = t, e = 0; e < t.length; e++) Mc.add(t[e]);
}
var ut = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), el = Object.prototype.hasOwnProperty, Am = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ks = {}, Gs = {};
function Pm(e) {
  return el.call(Gs, e) ? !0 : el.call(Ks, e) ? !1 : Am.test(e) ? Gs[e] = !0 : (Ks[e] = !0, !1);
}
function Im(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function zm(e, t, n, r) {
  if (t === null || typeof t > "u" || Im(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ve(e, t, n, r, a, o, l) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = l;
}
var ue = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ue[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ue[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ue[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ue[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ue[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ue[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ue[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ue[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ue[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ri = /[\-:]([a-z])/g;
function ai(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ri,
    ai
  );
  ue[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ri, ai);
  ue[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ri, ai);
  ue[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ue[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ue.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ue[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function oi(e, t, n, r) {
  var a = ue.hasOwnProperty(t) ? ue[t] : null;
  (a !== null ? a.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (zm(t, n, a, r) && (n = null), r || a === null ? Pm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = n === null ? a.type === 3 ? !1 : "" : n : (t = a.attributeName, r = a.attributeNamespace, n === null ? e.removeAttribute(t) : (a = a.type, n = a === 3 || a === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var mt = Dm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Kr = Symbol.for("react.element"), un = Symbol.for("react.portal"), cn = Symbol.for("react.fragment"), li = Symbol.for("react.strict_mode"), tl = Symbol.for("react.profiler"), jc = Symbol.for("react.provider"), Ec = Symbol.for("react.context"), ii = Symbol.for("react.forward_ref"), nl = Symbol.for("react.suspense"), rl = Symbol.for("react.suspense_list"), si = Symbol.for("react.memo"), yt = Symbol.for("react.lazy"), Lc = Symbol.for("react.offscreen"), Vs = Symbol.iterator;
function Wn(e) {
  return e === null || typeof e != "object" ? null : (e = Vs && e[Vs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, go;
function er(e) {
  if (go === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    go = t && t[1] || "";
  }
  return `
` + go + e;
}
var yo = !1;
function vo(e, t) {
  if (!e || yo) return "";
  yo = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        r = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var a = c.stack.split(`
`), o = r.stack.split(`
`), l = a.length - 1, s = o.length - 1; 1 <= l && 0 <= s && a[l] !== o[s]; ) s--;
      for (; 1 <= l && 0 <= s; l--, s--) if (a[l] !== o[s]) {
        if (l !== 1 || s !== 1)
          do
            if (l--, s--, 0 > s || a[l] !== o[s]) {
              var u = `
` + a[l].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= l && 0 <= s);
        break;
      }
    }
  } finally {
    yo = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? er(e) : "";
}
function Fm(e) {
  switch (e.tag) {
    case 5:
      return er(e.type);
    case 16:
      return er("Lazy");
    case 13:
      return er("Suspense");
    case 19:
      return er("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = vo(e.type, !1), e;
    case 11:
      return e = vo(e.type.render, !1), e;
    case 1:
      return e = vo(e.type, !0), e;
    default:
      return "";
  }
}
function al(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case cn:
      return "Fragment";
    case un:
      return "Portal";
    case tl:
      return "Profiler";
    case li:
      return "StrictMode";
    case nl:
      return "Suspense";
    case rl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Ec:
      return (e.displayName || "Context") + ".Consumer";
    case jc:
      return (e._context.displayName || "Context") + ".Provider";
    case ii:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case si:
      return t = e.displayName || null, t !== null ? t : al(e.type) || "Memo";
    case yt:
      t = e._payload, e = e._init;
      try {
        return al(e(t));
      } catch {
      }
  }
  return null;
}
function Om(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return al(t);
    case 8:
      return t === li ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function At(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function Dc(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function $m(e) {
  var t = Dc(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var a = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return a.call(this);
    }, set: function(l) {
      r = "" + l, o.call(this, l);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(l) {
      r = "" + l;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Gr(e) {
  e._valueTracker || (e._valueTracker = $m(e));
}
function Ac(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Dc(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function ka(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ol(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Qs(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = At(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Pc(e, t) {
  t = t.checked, t != null && oi(e, "checked", t, !1);
}
function ll(e, t) {
  Pc(e, t);
  var n = At(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? il(e, t.type, n) : t.hasOwnProperty("defaultValue") && il(e, t.type, At(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ys(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function il(e, t, n) {
  (t !== "number" || ka(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var tr = Array.isArray;
function xn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
    for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + At(n), t = null, a = 0; a < e.length; a++) {
      if (e[a].value === n) {
        e[a].selected = !0, r && (e[a].defaultSelected = !0);
        return;
      }
      t !== null || e[a].disabled || (t = e[a]);
    }
    t !== null && (t.selected = !0);
  }
}
function sl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(w(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Zs(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(w(92));
      if (tr(n)) {
        if (1 < n.length) throw Error(w(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: At(n) };
}
function Ic(e, t) {
  var n = At(t.value), r = At(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Xs(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function zc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function ul(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? zc(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Vr, Fc = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, a) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, a);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Vr = Vr || document.createElement("div"), Vr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Vr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function yr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var or = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, Rm = ["Webkit", "ms", "Moz", "O"];
Object.keys(or).forEach(function(e) {
  Rm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), or[t] = or[e];
  });
});
function Oc(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || or.hasOwnProperty(e) && or[e] ? ("" + t).trim() : t + "px";
}
function $c(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, a = Oc(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
  }
}
var Hm = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function cl(e, t) {
  if (t) {
    if (Hm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(w(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(w(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(w(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(w(62));
  }
}
function dl(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var fl = null;
function ui(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ml = null, Tn = null, Nn = null;
function qs(e) {
  if (e = zr(e)) {
    if (typeof ml != "function") throw Error(w(280));
    var t = e.stateNode;
    t && (t = qa(t), ml(e.stateNode, e.type, t));
  }
}
function Rc(e) {
  Tn ? Nn ? Nn.push(e) : Nn = [e] : Tn = e;
}
function Hc() {
  if (Tn) {
    var e = Tn, t = Nn;
    if (Nn = Tn = null, qs(e), t) for (e = 0; e < t.length; e++) qs(t[e]);
  }
}
function Wc(e, t) {
  return e(t);
}
function Bc() {
}
var _o = !1;
function Uc(e, t, n) {
  if (_o) return e(t, n);
  _o = !0;
  try {
    return Wc(e, t, n);
  } finally {
    _o = !1, (Tn !== null || Nn !== null) && (Bc(), Hc());
  }
}
function vr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = qa(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(w(231, t, typeof n));
  return n;
}
var pl = !1;
if (ut) try {
  var Bn = {};
  Object.defineProperty(Bn, "passive", { get: function() {
    pl = !0;
  } }), window.addEventListener("test", Bn, Bn), window.removeEventListener("test", Bn, Bn);
} catch {
  pl = !1;
}
function Wm(e, t, n, r, a, o, l, s, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var lr = !1, xa = null, Ta = !1, hl = null, Bm = { onError: function(e) {
  lr = !0, xa = e;
} };
function Um(e, t, n, r, a, o, l, s, u) {
  lr = !1, xa = null, Wm.apply(Bm, arguments);
}
function Km(e, t, n, r, a, o, l, s, u) {
  if (Um.apply(this, arguments), lr) {
    if (lr) {
      var c = xa;
      lr = !1, xa = null;
    } else throw Error(w(198));
    Ta || (Ta = !0, hl = c);
  }
}
function tn(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Kc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Js(e) {
  if (tn(e) !== e) throw Error(w(188));
}
function Gm(e) {
  var t = e.alternate;
  if (!t) {
    if (t = tn(e), t === null) throw Error(w(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var a = n.return;
    if (a === null) break;
    var o = a.alternate;
    if (o === null) {
      if (r = a.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (a.child === o.child) {
      for (o = a.child; o; ) {
        if (o === n) return Js(a), e;
        if (o === r) return Js(a), t;
        o = o.sibling;
      }
      throw Error(w(188));
    }
    if (n.return !== r.return) n = a, r = o;
    else {
      for (var l = !1, s = a.child; s; ) {
        if (s === n) {
          l = !0, n = a, r = o;
          break;
        }
        if (s === r) {
          l = !0, r = a, n = o;
          break;
        }
        s = s.sibling;
      }
      if (!l) {
        for (s = o.child; s; ) {
          if (s === n) {
            l = !0, n = o, r = a;
            break;
          }
          if (s === r) {
            l = !0, r = o, n = a;
            break;
          }
          s = s.sibling;
        }
        if (!l) throw Error(w(189));
      }
    }
    if (n.alternate !== r) throw Error(w(190));
  }
  if (n.tag !== 3) throw Error(w(188));
  return n.stateNode.current === n ? e : t;
}
function Gc(e) {
  return e = Gm(e), e !== null ? Vc(e) : null;
}
function Vc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Vc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Qc = Ee.unstable_scheduleCallback, eu = Ee.unstable_cancelCallback, Vm = Ee.unstable_shouldYield, Qm = Ee.unstable_requestPaint, q = Ee.unstable_now, Ym = Ee.unstable_getCurrentPriorityLevel, ci = Ee.unstable_ImmediatePriority, Yc = Ee.unstable_UserBlockingPriority, Na = Ee.unstable_NormalPriority, Zm = Ee.unstable_LowPriority, Zc = Ee.unstable_IdlePriority, Qa = null, et = null;
function Xm(e) {
  if (et && typeof et.onCommitFiberRoot == "function") try {
    et.onCommitFiberRoot(Qa, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ue = Math.clz32 ? Math.clz32 : ep, qm = Math.log, Jm = Math.LN2;
function ep(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (qm(e) / Jm | 0) | 0;
}
var Qr = 64, Yr = 4194304;
function nr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function ba(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, a = e.suspendedLanes, o = e.pingedLanes, l = n & 268435455;
  if (l !== 0) {
    var s = l & ~a;
    s !== 0 ? r = nr(s) : (o &= l, o !== 0 && (r = nr(o)));
  } else l = n & ~a, l !== 0 ? r = nr(l) : o !== 0 && (r = nr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & a) && (a = r & -r, o = t & -t, a >= o || a === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ue(t), a = 1 << n, r |= e[n], t &= ~a;
  return r;
}
function tp(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function np(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var l = 31 - Ue(o), s = 1 << l, u = a[l];
    u === -1 ? (!(s & n) || s & r) && (a[l] = tp(s, t)) : u <= t && (e.expiredLanes |= s), o &= ~s;
  }
}
function gl(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Xc() {
  var e = Qr;
  return Qr <<= 1, !(Qr & 4194240) && (Qr = 64), e;
}
function So(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Pr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ue(t), e[t] = n;
}
function rp(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var a = 31 - Ue(n), o = 1 << a;
    t[a] = 0, r[a] = -1, e[a] = -1, n &= ~o;
  }
}
function di(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ue(n), a = 1 << r;
    a & t | e[r] & t && (e[r] |= t), n &= ~a;
  }
}
var O = 0;
function qc(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Jc, fi, ed, td, nd, yl = !1, Zr = [], Tt = null, Nt = null, bt = null, _r = /* @__PURE__ */ new Map(), Sr = /* @__PURE__ */ new Map(), St = [], ap = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function tu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Tt = null;
      break;
    case "dragenter":
    case "dragleave":
      Nt = null;
      break;
    case "mouseover":
    case "mouseout":
      bt = null;
      break;
    case "pointerover":
    case "pointerout":
      _r.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Sr.delete(t.pointerId);
  }
}
function Un(e, t, n, r, a, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [a] }, t !== null && (t = zr(t), t !== null && fi(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
}
function op(e, t, n, r, a) {
  switch (t) {
    case "focusin":
      return Tt = Un(Tt, e, t, n, r, a), !0;
    case "dragenter":
      return Nt = Un(Nt, e, t, n, r, a), !0;
    case "mouseover":
      return bt = Un(bt, e, t, n, r, a), !0;
    case "pointerover":
      var o = a.pointerId;
      return _r.set(o, Un(_r.get(o) || null, e, t, n, r, a)), !0;
    case "gotpointercapture":
      return o = a.pointerId, Sr.set(o, Un(Sr.get(o) || null, e, t, n, r, a)), !0;
  }
  return !1;
}
function rd(e) {
  var t = Bt(e.target);
  if (t !== null) {
    var n = tn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Kc(n), t !== null) {
          e.blockedOn = t, nd(e.priority, function() {
            ed(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ca(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = vl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      fl = r, n.target.dispatchEvent(r), fl = null;
    } else return t = zr(n), t !== null && fi(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function nu(e, t, n) {
  ca(e) && n.delete(t);
}
function lp() {
  yl = !1, Tt !== null && ca(Tt) && (Tt = null), Nt !== null && ca(Nt) && (Nt = null), bt !== null && ca(bt) && (bt = null), _r.forEach(nu), Sr.forEach(nu);
}
function Kn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, yl || (yl = !0, Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, lp)));
}
function wr(e) {
  function t(a) {
    return Kn(a, e);
  }
  if (0 < Zr.length) {
    Kn(Zr[0], e);
    for (var n = 1; n < Zr.length; n++) {
      var r = Zr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Tt !== null && Kn(Tt, e), Nt !== null && Kn(Nt, e), bt !== null && Kn(bt, e), _r.forEach(t), Sr.forEach(t), n = 0; n < St.length; n++) r = St[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < St.length && (n = St[0], n.blockedOn === null); ) rd(n), n.blockedOn === null && St.shift();
}
var bn = mt.ReactCurrentBatchConfig, Ca = !0;
function ip(e, t, n, r) {
  var a = O, o = bn.transition;
  bn.transition = null;
  try {
    O = 1, mi(e, t, n, r);
  } finally {
    O = a, bn.transition = o;
  }
}
function sp(e, t, n, r) {
  var a = O, o = bn.transition;
  bn.transition = null;
  try {
    O = 4, mi(e, t, n, r);
  } finally {
    O = a, bn.transition = o;
  }
}
function mi(e, t, n, r) {
  if (Ca) {
    var a = vl(e, t, n, r);
    if (a === null) Eo(e, t, r, Ma, n), tu(e, r);
    else if (op(a, e, t, n, r)) r.stopPropagation();
    else if (tu(e, r), t & 4 && -1 < ap.indexOf(e)) {
      for (; a !== null; ) {
        var o = zr(a);
        if (o !== null && Jc(o), o = vl(e, t, n, r), o === null && Eo(e, t, r, Ma, n), o === a) break;
        a = o;
      }
      a !== null && r.stopPropagation();
    } else Eo(e, t, r, null, n);
  }
}
var Ma = null;
function vl(e, t, n, r) {
  if (Ma = null, e = ui(r), e = Bt(e), e !== null) if (t = tn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Kc(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return Ma = e, null;
}
function ad(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Ym()) {
        case ci:
          return 1;
        case Yc:
          return 4;
        case Na:
        case Zm:
          return 16;
        case Zc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kt = null, pi = null, da = null;
function od() {
  if (da) return da;
  var e, t = pi, n = t.length, r, a = "value" in kt ? kt.value : kt.textContent, o = a.length;
  for (e = 0; e < n && t[e] === a[e]; e++) ;
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === a[o - r]; r++) ;
  return da = a.slice(e, 1 < r ? 1 - r : void 0);
}
function fa(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Xr() {
  return !0;
}
function ru() {
  return !1;
}
function De(e) {
  function t(n, r, a, o, l) {
    this._reactName = n, this._targetInst = a, this.type = r, this.nativeEvent = o, this.target = l, this.currentTarget = null;
    for (var s in e) e.hasOwnProperty(s) && (n = e[s], this[s] = n ? n(o) : o[s]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Xr : ru, this.isPropagationStopped = ru, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Xr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Xr);
  }, persist: function() {
  }, isPersistent: Xr }), t;
}
var Fn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, hi = De(Fn), Ir = G({}, Fn, { view: 0, detail: 0 }), up = De(Ir), wo, ko, Gn, Ya = G({}, Ir, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: gi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Gn && (Gn && e.type === "mousemove" ? (wo = e.screenX - Gn.screenX, ko = e.screenY - Gn.screenY) : ko = wo = 0, Gn = e), wo);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ko;
} }), au = De(Ya), cp = G({}, Ya, { dataTransfer: 0 }), dp = De(cp), fp = G({}, Ir, { relatedTarget: 0 }), xo = De(fp), mp = G({}, Fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), pp = De(mp), hp = G({}, Fn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), gp = De(hp), yp = G({}, Fn, { data: 0 }), ou = De(yp), vp = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, _p = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Sp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function wp(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Sp[e]) ? !!t[e] : !1;
}
function gi() {
  return wp;
}
var kp = G({}, Ir, { key: function(e) {
  if (e.key) {
    var t = vp[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = fa(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? _p[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: gi, charCode: function(e) {
  return e.type === "keypress" ? fa(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? fa(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), xp = De(kp), Tp = G({}, Ya, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), lu = De(Tp), Np = G({}, Ir, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: gi }), bp = De(Np), Cp = G({}, Fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Mp = De(Cp), jp = G({}, Ya, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Ep = De(jp), Lp = [9, 13, 27, 32], yi = ut && "CompositionEvent" in window, ir = null;
ut && "documentMode" in document && (ir = document.documentMode);
var Dp = ut && "TextEvent" in window && !ir, ld = ut && (!yi || ir && 8 < ir && 11 >= ir), iu = " ", su = !1;
function id(e, t) {
  switch (e) {
    case "keyup":
      return Lp.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function sd(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var dn = !1;
function Ap(e, t) {
  switch (e) {
    case "compositionend":
      return sd(t);
    case "keypress":
      return t.which !== 32 ? null : (su = !0, iu);
    case "textInput":
      return e = t.data, e === iu && su ? null : e;
    default:
      return null;
  }
}
function Pp(e, t) {
  if (dn) return e === "compositionend" || !yi && id(e, t) ? (e = od(), da = pi = kt = null, dn = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return ld && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Ip = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function uu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Ip[e.type] : t === "textarea";
}
function ud(e, t, n, r) {
  Rc(r), t = ja(t, "onChange"), 0 < t.length && (n = new hi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var sr = null, kr = null;
function zp(e) {
  Sd(e, 0);
}
function Za(e) {
  var t = pn(e);
  if (Ac(t)) return e;
}
function Fp(e, t) {
  if (e === "change") return t;
}
var cd = !1;
if (ut) {
  var To;
  if (ut) {
    var No = "oninput" in document;
    if (!No) {
      var cu = document.createElement("div");
      cu.setAttribute("oninput", "return;"), No = typeof cu.oninput == "function";
    }
    To = No;
  } else To = !1;
  cd = To && (!document.documentMode || 9 < document.documentMode);
}
function du() {
  sr && (sr.detachEvent("onpropertychange", dd), kr = sr = null);
}
function dd(e) {
  if (e.propertyName === "value" && Za(kr)) {
    var t = [];
    ud(t, kr, e, ui(e)), Uc(zp, t);
  }
}
function Op(e, t, n) {
  e === "focusin" ? (du(), sr = t, kr = n, sr.attachEvent("onpropertychange", dd)) : e === "focusout" && du();
}
function $p(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Za(kr);
}
function Rp(e, t) {
  if (e === "click") return Za(t);
}
function Hp(e, t) {
  if (e === "input" || e === "change") return Za(t);
}
function Wp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ge = typeof Object.is == "function" ? Object.is : Wp;
function xr(e, t) {
  if (Ge(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var a = n[r];
    if (!el.call(t, a) || !Ge(e[a], t[a])) return !1;
  }
  return !0;
}
function fu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function mu(e, t) {
  var n = fu(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = fu(n);
  }
}
function fd(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? fd(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function md() {
  for (var e = window, t = ka(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = ka(e.document);
  }
  return t;
}
function vi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Bp(e) {
  var t = md(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && fd(n.ownerDocument.documentElement, n)) {
    if (r !== null && vi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var a = n.textContent.length, o = Math.min(r.start, a);
        r = r.end === void 0 ? o : Math.min(r.end, a), !e.extend && o > r && (a = r, r = o, o = a), a = mu(n, o);
        var l = mu(
          n,
          r
        );
        a && l && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== l.node || e.focusOffset !== l.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(l.node, l.offset)) : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Up = ut && "documentMode" in document && 11 >= document.documentMode, fn = null, _l = null, ur = null, Sl = !1;
function pu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Sl || fn == null || fn !== ka(r) || (r = fn, "selectionStart" in r && vi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), ur && xr(ur, r) || (ur = r, r = ja(_l, "onSelect"), 0 < r.length && (t = new hi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = fn)));
}
function qr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var mn = { animationend: qr("Animation", "AnimationEnd"), animationiteration: qr("Animation", "AnimationIteration"), animationstart: qr("Animation", "AnimationStart"), transitionend: qr("Transition", "TransitionEnd") }, bo = {}, pd = {};
ut && (pd = document.createElement("div").style, "AnimationEvent" in window || (delete mn.animationend.animation, delete mn.animationiteration.animation, delete mn.animationstart.animation), "TransitionEvent" in window || delete mn.transitionend.transition);
function Xa(e) {
  if (bo[e]) return bo[e];
  if (!mn[e]) return e;
  var t = mn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in pd) return bo[e] = t[n];
  return e;
}
var hd = Xa("animationend"), gd = Xa("animationiteration"), yd = Xa("animationstart"), vd = Xa("transitionend"), _d = /* @__PURE__ */ new Map(), hu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function It(e, t) {
  _d.set(e, t), en(t, [e]);
}
for (var Co = 0; Co < hu.length; Co++) {
  var Mo = hu[Co], Kp = Mo.toLowerCase(), Gp = Mo[0].toUpperCase() + Mo.slice(1);
  It(Kp, "on" + Gp);
}
It(hd, "onAnimationEnd");
It(gd, "onAnimationIteration");
It(yd, "onAnimationStart");
It("dblclick", "onDoubleClick");
It("focusin", "onFocus");
It("focusout", "onBlur");
It(vd, "onTransitionEnd");
jn("onMouseEnter", ["mouseout", "mouseover"]);
jn("onMouseLeave", ["mouseout", "mouseover"]);
jn("onPointerEnter", ["pointerout", "pointerover"]);
jn("onPointerLeave", ["pointerout", "pointerover"]);
en("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
en("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
en("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
en("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
en("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
en("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var rr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Vp = new Set("cancel close invalid load scroll toggle".split(" ").concat(rr));
function gu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Km(r, t, void 0, e), e.currentTarget = null;
}
function Sd(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], a = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var l = r.length - 1; 0 <= l; l--) {
        var s = r[l], u = s.instance, c = s.currentTarget;
        if (s = s.listener, u !== o && a.isPropagationStopped()) break e;
        gu(a, s, c), o = u;
      }
      else for (l = 0; l < r.length; l++) {
        if (s = r[l], u = s.instance, c = s.currentTarget, s = s.listener, u !== o && a.isPropagationStopped()) break e;
        gu(a, s, c), o = u;
      }
    }
  }
  if (Ta) throw e = hl, Ta = !1, hl = null, e;
}
function R(e, t) {
  var n = t[Nl];
  n === void 0 && (n = t[Nl] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (wd(t, e, 2, !1), n.add(r));
}
function jo(e, t, n) {
  var r = 0;
  t && (r |= 4), wd(n, e, r, t);
}
var Jr = "_reactListening" + Math.random().toString(36).slice(2);
function Tr(e) {
  if (!e[Jr]) {
    e[Jr] = !0, Mc.forEach(function(n) {
      n !== "selectionchange" && (Vp.has(n) || jo(n, !1, e), jo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Jr] || (t[Jr] = !0, jo("selectionchange", !1, t));
  }
}
function wd(e, t, n, r) {
  switch (ad(t)) {
    case 1:
      var a = ip;
      break;
    case 4:
      a = sp;
      break;
    default:
      a = mi;
  }
  n = a.bind(null, t, n, e), a = void 0, !pl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), r ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
}
function Eo(e, t, n, r, a) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var l = r.tag;
    if (l === 3 || l === 4) {
      var s = r.stateNode.containerInfo;
      if (s === a || s.nodeType === 8 && s.parentNode === a) break;
      if (l === 4) for (l = r.return; l !== null; ) {
        var u = l.tag;
        if ((u === 3 || u === 4) && (u = l.stateNode.containerInfo, u === a || u.nodeType === 8 && u.parentNode === a)) return;
        l = l.return;
      }
      for (; s !== null; ) {
        if (l = Bt(s), l === null) return;
        if (u = l.tag, u === 5 || u === 6) {
          r = o = l;
          continue e;
        }
        s = s.parentNode;
      }
    }
    r = r.return;
  }
  Uc(function() {
    var c = o, m = ui(n), h = [];
    e: {
      var f = _d.get(e);
      if (f !== void 0) {
        var y = hi, v = e;
        switch (e) {
          case "keypress":
            if (fa(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = xp;
            break;
          case "focusin":
            v = "focus", y = xo;
            break;
          case "focusout":
            v = "blur", y = xo;
            break;
          case "beforeblur":
          case "afterblur":
            y = xo;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            y = au;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = dp;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = bp;
            break;
          case hd:
          case gd:
          case yd:
            y = pp;
            break;
          case vd:
            y = Mp;
            break;
          case "scroll":
            y = up;
            break;
          case "wheel":
            y = Ep;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = gp;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = lu;
        }
        var S = (t & 4) !== 0, L = !S && e === "scroll", p = S ? f !== null ? f + "Capture" : null : f;
        S = [];
        for (var d = c, g; d !== null; ) {
          g = d;
          var _ = g.stateNode;
          if (g.tag === 5 && _ !== null && (g = _, p !== null && (_ = vr(d, p), _ != null && S.push(Nr(d, _, g)))), L) break;
          d = d.return;
        }
        0 < S.length && (f = new y(f, v, null, n, m), h.push({ event: f, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (f = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", f && n !== fl && (v = n.relatedTarget || n.fromElement) && (Bt(v) || v[ct])) break e;
        if ((y || f) && (f = m.window === m ? m : (f = m.ownerDocument) ? f.defaultView || f.parentWindow : window, y ? (v = n.relatedTarget || n.toElement, y = c, v = v ? Bt(v) : null, v !== null && (L = tn(v), v !== L || v.tag !== 5 && v.tag !== 6) && (v = null)) : (y = null, v = c), y !== v)) {
          if (S = au, _ = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (S = lu, _ = "onPointerLeave", p = "onPointerEnter", d = "pointer"), L = y == null ? f : pn(y), g = v == null ? f : pn(v), f = new S(_, d + "leave", y, n, m), f.target = L, f.relatedTarget = g, _ = null, Bt(m) === c && (S = new S(p, d + "enter", v, n, m), S.target = g, S.relatedTarget = L, _ = S), L = _, y && v) t: {
            for (S = y, p = v, d = 0, g = S; g; g = ln(g)) d++;
            for (g = 0, _ = p; _; _ = ln(_)) g++;
            for (; 0 < d - g; ) S = ln(S), d--;
            for (; 0 < g - d; ) p = ln(p), g--;
            for (; d--; ) {
              if (S === p || p !== null && S === p.alternate) break t;
              S = ln(S), p = ln(p);
            }
            S = null;
          }
          else S = null;
          y !== null && yu(h, f, y, S, !1), v !== null && L !== null && yu(h, L, v, S, !0);
        }
      }
      e: {
        if (f = c ? pn(c) : window, y = f.nodeName && f.nodeName.toLowerCase(), y === "select" || y === "input" && f.type === "file") var x = Fp;
        else if (uu(f)) if (cd) x = Hp;
        else {
          x = $p;
          var T = Op;
        }
        else (y = f.nodeName) && y.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (x = Rp);
        if (x && (x = x(e, c))) {
          ud(h, x, n, m);
          break e;
        }
        T && T(e, f, c), e === "focusout" && (T = f._wrapperState) && T.controlled && f.type === "number" && il(f, "number", f.value);
      }
      switch (T = c ? pn(c) : window, e) {
        case "focusin":
          (uu(T) || T.contentEditable === "true") && (fn = T, _l = c, ur = null);
          break;
        case "focusout":
          ur = _l = fn = null;
          break;
        case "mousedown":
          Sl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Sl = !1, pu(h, n, m);
          break;
        case "selectionchange":
          if (Up) break;
        case "keydown":
        case "keyup":
          pu(h, n, m);
      }
      var N;
      if (yi) e: {
        switch (e) {
          case "compositionstart":
            var M = "onCompositionStart";
            break e;
          case "compositionend":
            M = "onCompositionEnd";
            break e;
          case "compositionupdate":
            M = "onCompositionUpdate";
            break e;
        }
        M = void 0;
      }
      else dn ? id(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
      M && (ld && n.locale !== "ko" && (dn || M !== "onCompositionStart" ? M === "onCompositionEnd" && dn && (N = od()) : (kt = m, pi = "value" in kt ? kt.value : kt.textContent, dn = !0)), T = ja(c, M), 0 < T.length && (M = new ou(M, e, null, n, m), h.push({ event: M, listeners: T }), N ? M.data = N : (N = sd(n), N !== null && (M.data = N)))), (N = Dp ? Ap(e, n) : Pp(e, n)) && (c = ja(c, "onBeforeInput"), 0 < c.length && (m = new ou("onBeforeInput", "beforeinput", null, n, m), h.push({ event: m, listeners: c }), m.data = N));
    }
    Sd(h, t);
  });
}
function Nr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ja(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var a = e, o = a.stateNode;
    a.tag === 5 && o !== null && (a = o, o = vr(e, n), o != null && r.unshift(Nr(e, o, a)), o = vr(e, t), o != null && r.push(Nr(e, o, a))), e = e.return;
  }
  return r;
}
function ln(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function yu(e, t, n, r, a) {
  for (var o = t._reactName, l = []; n !== null && n !== r; ) {
    var s = n, u = s.alternate, c = s.stateNode;
    if (u !== null && u === r) break;
    s.tag === 5 && c !== null && (s = c, a ? (u = vr(n, o), u != null && l.unshift(Nr(n, u, s))) : a || (u = vr(n, o), u != null && l.push(Nr(n, u, s)))), n = n.return;
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var Qp = /\r\n?/g, Yp = /\u0000|\uFFFD/g;
function vu(e) {
  return (typeof e == "string" ? e : "" + e).replace(Qp, `
`).replace(Yp, "");
}
function ea(e, t, n) {
  if (t = vu(t), vu(e) !== t && n) throw Error(w(425));
}
function Ea() {
}
var wl = null, kl = null;
function xl(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Tl = typeof setTimeout == "function" ? setTimeout : void 0, Zp = typeof clearTimeout == "function" ? clearTimeout : void 0, _u = typeof Promise == "function" ? Promise : void 0, Xp = typeof queueMicrotask == "function" ? queueMicrotask : typeof _u < "u" ? function(e) {
  return _u.resolve(null).then(e).catch(qp);
} : Tl;
function qp(e) {
  setTimeout(function() {
    throw e;
  });
}
function Lo(e, t) {
  var n = t, r = 0;
  do {
    var a = n.nextSibling;
    if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$") {
      if (r === 0) {
        e.removeChild(a), wr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = a;
  } while (n);
  wr(t);
}
function Ct(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Su(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var On = Math.random().toString(36).slice(2), Je = "__reactFiber$" + On, br = "__reactProps$" + On, ct = "__reactContainer$" + On, Nl = "__reactEvents$" + On, Jp = "__reactListeners$" + On, eh = "__reactHandles$" + On;
function Bt(e) {
  var t = e[Je];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[ct] || n[Je]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Su(e); e !== null; ) {
        if (n = e[Je]) return n;
        e = Su(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function zr(e) {
  return e = e[Je] || e[ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function pn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(w(33));
}
function qa(e) {
  return e[br] || null;
}
var bl = [], hn = -1;
function zt(e) {
  return { current: e };
}
function H(e) {
  0 > hn || (e.current = bl[hn], bl[hn] = null, hn--);
}
function $(e, t) {
  hn++, bl[hn] = e.current, e.current = t;
}
var Pt = {}, pe = zt(Pt), we = zt(!1), Yt = Pt;
function En(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Pt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var a = {}, o;
  for (o in n) a[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
}
function ke(e) {
  return e = e.childContextTypes, e != null;
}
function La() {
  H(we), H(pe);
}
function wu(e, t, n) {
  if (pe.current !== Pt) throw Error(w(168));
  $(pe, t), $(we, n);
}
function kd(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var a in r) if (!(a in t)) throw Error(w(108, Om(e) || "Unknown", a));
  return G({}, n, r);
}
function Da(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Pt, Yt = pe.current, $(pe, e), $(we, we.current), !0;
}
function ku(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(w(169));
  n ? (e = kd(e, t, Yt), r.__reactInternalMemoizedMergedChildContext = e, H(we), H(pe), $(pe, e)) : H(we), $(we, n);
}
var at = null, Ja = !1, Do = !1;
function xd(e) {
  at === null ? at = [e] : at.push(e);
}
function th(e) {
  Ja = !0, xd(e);
}
function Ft() {
  if (!Do && at !== null) {
    Do = !0;
    var e = 0, t = O;
    try {
      var n = at;
      for (O = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      at = null, Ja = !1;
    } catch (a) {
      throw at !== null && (at = at.slice(e + 1)), Qc(ci, Ft), a;
    } finally {
      O = t, Do = !1;
    }
  }
  return null;
}
var gn = [], yn = 0, Aa = null, Pa = 0, Ae = [], Pe = 0, Zt = null, lt = 1, it = "";
function Ht(e, t) {
  gn[yn++] = Pa, gn[yn++] = Aa, Aa = e, Pa = t;
}
function Td(e, t, n) {
  Ae[Pe++] = lt, Ae[Pe++] = it, Ae[Pe++] = Zt, Zt = e;
  var r = lt;
  e = it;
  var a = 32 - Ue(r) - 1;
  r &= ~(1 << a), n += 1;
  var o = 32 - Ue(t) + a;
  if (30 < o) {
    var l = a - a % 5;
    o = (r & (1 << l) - 1).toString(32), r >>= l, a -= l, lt = 1 << 32 - Ue(t) + a | n << a | r, it = o + e;
  } else lt = 1 << o | n << a | r, it = e;
}
function _i(e) {
  e.return !== null && (Ht(e, 1), Td(e, 1, 0));
}
function Si(e) {
  for (; e === Aa; ) Aa = gn[--yn], gn[yn] = null, Pa = gn[--yn], gn[yn] = null;
  for (; e === Zt; ) Zt = Ae[--Pe], Ae[Pe] = null, it = Ae[--Pe], Ae[Pe] = null, lt = Ae[--Pe], Ae[Pe] = null;
}
var Me = null, Ce = null, B = !1, We = null;
function Nd(e, t) {
  var n = Ie(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function xu(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Me = e, Ce = Ct(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Me = e, Ce = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Zt !== null ? { id: lt, overflow: it } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ie(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Me = e, Ce = null, !0) : !1;
    default:
      return !1;
  }
}
function Cl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ml(e) {
  if (B) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!xu(e, t)) {
        if (Cl(e)) throw Error(w(418));
        t = Ct(n.nextSibling);
        var r = Me;
        t && xu(e, t) ? Nd(r, n) : (e.flags = e.flags & -4097 | 2, B = !1, Me = e);
      }
    } else {
      if (Cl(e)) throw Error(w(418));
      e.flags = e.flags & -4097 | 2, B = !1, Me = e;
    }
  }
}
function Tu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Me = e;
}
function ta(e) {
  if (e !== Me) return !1;
  if (!B) return Tu(e), B = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !xl(e.type, e.memoizedProps)), t && (t = Ce)) {
    if (Cl(e)) throw bd(), Error(w(418));
    for (; t; ) Nd(e, t), t = Ct(t.nextSibling);
  }
  if (Tu(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(w(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ce = Ct(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Ce = null;
    }
  } else Ce = Me ? Ct(e.stateNode.nextSibling) : null;
  return !0;
}
function bd() {
  for (var e = Ce; e; ) e = Ct(e.nextSibling);
}
function Ln() {
  Ce = Me = null, B = !1;
}
function wi(e) {
  We === null ? We = [e] : We.push(e);
}
var nh = mt.ReactCurrentBatchConfig;
function Vn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(w(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(w(147, e));
      var a = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(l) {
        var s = a.refs;
        l === null ? delete s[o] : s[o] = l;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(w(284));
    if (!n._owner) throw Error(w(290, e));
  }
  return e;
}
function na(e, t) {
  throw e = Object.prototype.toString.call(t), Error(w(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Nu(e) {
  var t = e._init;
  return t(e._payload);
}
function Cd(e) {
  function t(p, d) {
    if (e) {
      var g = p.deletions;
      g === null ? (p.deletions = [d], p.flags |= 16) : g.push(d);
    }
  }
  function n(p, d) {
    if (!e) return null;
    for (; d !== null; ) t(p, d), d = d.sibling;
    return null;
  }
  function r(p, d) {
    for (p = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? p.set(d.key, d) : p.set(d.index, d), d = d.sibling;
    return p;
  }
  function a(p, d) {
    return p = Lt(p, d), p.index = 0, p.sibling = null, p;
  }
  function o(p, d, g) {
    return p.index = g, e ? (g = p.alternate, g !== null ? (g = g.index, g < d ? (p.flags |= 2, d) : g) : (p.flags |= 2, d)) : (p.flags |= 1048576, d);
  }
  function l(p) {
    return e && p.alternate === null && (p.flags |= 2), p;
  }
  function s(p, d, g, _) {
    return d === null || d.tag !== 6 ? (d = $o(g, p.mode, _), d.return = p, d) : (d = a(d, g), d.return = p, d);
  }
  function u(p, d, g, _) {
    var x = g.type;
    return x === cn ? m(p, d, g.props.children, _, g.key) : d !== null && (d.elementType === x || typeof x == "object" && x !== null && x.$$typeof === yt && Nu(x) === d.type) ? (_ = a(d, g.props), _.ref = Vn(p, d, g), _.return = p, _) : (_ = _a(g.type, g.key, g.props, null, p.mode, _), _.ref = Vn(p, d, g), _.return = p, _);
  }
  function c(p, d, g, _) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== g.containerInfo || d.stateNode.implementation !== g.implementation ? (d = Ro(g, p.mode, _), d.return = p, d) : (d = a(d, g.children || []), d.return = p, d);
  }
  function m(p, d, g, _, x) {
    return d === null || d.tag !== 7 ? (d = Vt(g, p.mode, _, x), d.return = p, d) : (d = a(d, g), d.return = p, d);
  }
  function h(p, d, g) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = $o("" + d, p.mode, g), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Kr:
          return g = _a(d.type, d.key, d.props, null, p.mode, g), g.ref = Vn(p, null, d), g.return = p, g;
        case un:
          return d = Ro(d, p.mode, g), d.return = p, d;
        case yt:
          var _ = d._init;
          return h(p, _(d._payload), g);
      }
      if (tr(d) || Wn(d)) return d = Vt(d, p.mode, g, null), d.return = p, d;
      na(p, d);
    }
    return null;
  }
  function f(p, d, g, _) {
    var x = d !== null ? d.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number") return x !== null ? null : s(p, d, "" + g, _);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Kr:
          return g.key === x ? u(p, d, g, _) : null;
        case un:
          return g.key === x ? c(p, d, g, _) : null;
        case yt:
          return x = g._init, f(
            p,
            d,
            x(g._payload),
            _
          );
      }
      if (tr(g) || Wn(g)) return x !== null ? null : m(p, d, g, _, null);
      na(p, g);
    }
    return null;
  }
  function y(p, d, g, _, x) {
    if (typeof _ == "string" && _ !== "" || typeof _ == "number") return p = p.get(g) || null, s(d, p, "" + _, x);
    if (typeof _ == "object" && _ !== null) {
      switch (_.$$typeof) {
        case Kr:
          return p = p.get(_.key === null ? g : _.key) || null, u(d, p, _, x);
        case un:
          return p = p.get(_.key === null ? g : _.key) || null, c(d, p, _, x);
        case yt:
          var T = _._init;
          return y(p, d, g, T(_._payload), x);
      }
      if (tr(_) || Wn(_)) return p = p.get(g) || null, m(d, p, _, x, null);
      na(d, _);
    }
    return null;
  }
  function v(p, d, g, _) {
    for (var x = null, T = null, N = d, M = d = 0, F = null; N !== null && M < g.length; M++) {
      N.index > M ? (F = N, N = null) : F = N.sibling;
      var A = f(p, N, g[M], _);
      if (A === null) {
        N === null && (N = F);
        break;
      }
      e && N && A.alternate === null && t(p, N), d = o(A, d, M), T === null ? x = A : T.sibling = A, T = A, N = F;
    }
    if (M === g.length) return n(p, N), B && Ht(p, M), x;
    if (N === null) {
      for (; M < g.length; M++) N = h(p, g[M], _), N !== null && (d = o(N, d, M), T === null ? x = N : T.sibling = N, T = N);
      return B && Ht(p, M), x;
    }
    for (N = r(p, N); M < g.length; M++) F = y(N, p, M, g[M], _), F !== null && (e && F.alternate !== null && N.delete(F.key === null ? M : F.key), d = o(F, d, M), T === null ? x = F : T.sibling = F, T = F);
    return e && N.forEach(function(ae) {
      return t(p, ae);
    }), B && Ht(p, M), x;
  }
  function S(p, d, g, _) {
    var x = Wn(g);
    if (typeof x != "function") throw Error(w(150));
    if (g = x.call(g), g == null) throw Error(w(151));
    for (var T = x = null, N = d, M = d = 0, F = null, A = g.next(); N !== null && !A.done; M++, A = g.next()) {
      N.index > M ? (F = N, N = null) : F = N.sibling;
      var ae = f(p, N, A.value, _);
      if (ae === null) {
        N === null && (N = F);
        break;
      }
      e && N && ae.alternate === null && t(p, N), d = o(ae, d, M), T === null ? x = ae : T.sibling = ae, T = ae, N = F;
    }
    if (A.done) return n(
      p,
      N
    ), B && Ht(p, M), x;
    if (N === null) {
      for (; !A.done; M++, A = g.next()) A = h(p, A.value, _), A !== null && (d = o(A, d, M), T === null ? x = A : T.sibling = A, T = A);
      return B && Ht(p, M), x;
    }
    for (N = r(p, N); !A.done; M++, A = g.next()) A = y(N, p, M, A.value, _), A !== null && (e && A.alternate !== null && N.delete(A.key === null ? M : A.key), d = o(A, d, M), T === null ? x = A : T.sibling = A, T = A);
    return e && N.forEach(function(Y) {
      return t(p, Y);
    }), B && Ht(p, M), x;
  }
  function L(p, d, g, _) {
    if (typeof g == "object" && g !== null && g.type === cn && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Kr:
          e: {
            for (var x = g.key, T = d; T !== null; ) {
              if (T.key === x) {
                if (x = g.type, x === cn) {
                  if (T.tag === 7) {
                    n(p, T.sibling), d = a(T, g.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (T.elementType === x || typeof x == "object" && x !== null && x.$$typeof === yt && Nu(x) === T.type) {
                  n(p, T.sibling), d = a(T, g.props), d.ref = Vn(p, T, g), d.return = p, p = d;
                  break e;
                }
                n(p, T);
                break;
              } else t(p, T);
              T = T.sibling;
            }
            g.type === cn ? (d = Vt(g.props.children, p.mode, _, g.key), d.return = p, p = d) : (_ = _a(g.type, g.key, g.props, null, p.mode, _), _.ref = Vn(p, d, g), _.return = p, p = _);
          }
          return l(p);
        case un:
          e: {
            for (T = g.key; d !== null; ) {
              if (d.key === T) if (d.tag === 4 && d.stateNode.containerInfo === g.containerInfo && d.stateNode.implementation === g.implementation) {
                n(p, d.sibling), d = a(d, g.children || []), d.return = p, p = d;
                break e;
              } else {
                n(p, d);
                break;
              }
              else t(p, d);
              d = d.sibling;
            }
            d = Ro(g, p.mode, _), d.return = p, p = d;
          }
          return l(p);
        case yt:
          return T = g._init, L(p, d, T(g._payload), _);
      }
      if (tr(g)) return v(p, d, g, _);
      if (Wn(g)) return S(p, d, g, _);
      na(p, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, d !== null && d.tag === 6 ? (n(p, d.sibling), d = a(d, g), d.return = p, p = d) : (n(p, d), d = $o(g, p.mode, _), d.return = p, p = d), l(p)) : n(p, d);
  }
  return L;
}
var Dn = Cd(!0), Md = Cd(!1), Ia = zt(null), za = null, vn = null, ki = null;
function xi() {
  ki = vn = za = null;
}
function Ti(e) {
  var t = Ia.current;
  H(Ia), e._currentValue = t;
}
function jl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Cn(e, t) {
  za = e, ki = vn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (Se = !0), e.firstContext = null);
}
function Fe(e) {
  var t = e._currentValue;
  if (ki !== e) if (e = { context: e, memoizedValue: t, next: null }, vn === null) {
    if (za === null) throw Error(w(308));
    vn = e, za.dependencies = { lanes: 0, firstContext: e };
  } else vn = vn.next = e;
  return t;
}
var Ut = null;
function Ni(e) {
  Ut === null ? Ut = [e] : Ut.push(e);
}
function jd(e, t, n, r) {
  var a = t.interleaved;
  return a === null ? (n.next = n, Ni(t)) : (n.next = a.next, a.next = n), t.interleaved = n, dt(e, r);
}
function dt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var vt = !1;
function bi(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Ed(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function st(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Mt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, z & 2) {
    var a = r.pending;
    return a === null ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, dt(e, n);
  }
  return a = r.interleaved, a === null ? (t.next = t, Ni(r)) : (t.next = a.next, a.next = t), r.interleaved = t, dt(e, n);
}
function ma(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, di(e, n);
  }
}
function bu(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var a = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var l = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? a = o = l : o = o.next = l, n = n.next;
      } while (n !== null);
      o === null ? a = o = t : o = o.next = t;
    } else a = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: a, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function Fa(e, t, n, r) {
  var a = e.updateQueue;
  vt = !1;
  var o = a.firstBaseUpdate, l = a.lastBaseUpdate, s = a.shared.pending;
  if (s !== null) {
    a.shared.pending = null;
    var u = s, c = u.next;
    u.next = null, l === null ? o = c : l.next = c, l = u;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, s = m.lastBaseUpdate, s !== l && (s === null ? m.firstBaseUpdate = c : s.next = c, m.lastBaseUpdate = u));
  }
  if (o !== null) {
    var h = a.baseState;
    l = 0, m = c = u = null, s = o;
    do {
      var f = s.lane, y = s.eventTime;
      if ((r & f) === f) {
        m !== null && (m = m.next = {
          eventTime: y,
          lane: 0,
          tag: s.tag,
          payload: s.payload,
          callback: s.callback,
          next: null
        });
        e: {
          var v = e, S = s;
          switch (f = t, y = n, S.tag) {
            case 1:
              if (v = S.payload, typeof v == "function") {
                h = v.call(y, h, f);
                break e;
              }
              h = v;
              break e;
            case 3:
              v.flags = v.flags & -65537 | 128;
            case 0:
              if (v = S.payload, f = typeof v == "function" ? v.call(y, h, f) : v, f == null) break e;
              h = G({}, h, f);
              break e;
            case 2:
              vt = !0;
          }
        }
        s.callback !== null && s.lane !== 0 && (e.flags |= 64, f = a.effects, f === null ? a.effects = [s] : f.push(s));
      } else y = { eventTime: y, lane: f, tag: s.tag, payload: s.payload, callback: s.callback, next: null }, m === null ? (c = m = y, u = h) : m = m.next = y, l |= f;
      if (s = s.next, s === null) {
        if (s = a.shared.pending, s === null) break;
        f = s, s = f.next, f.next = null, a.lastBaseUpdate = f, a.shared.pending = null;
      }
    } while (!0);
    if (m === null && (u = h), a.baseState = u, a.firstBaseUpdate = c, a.lastBaseUpdate = m, t = a.shared.interleaved, t !== null) {
      a = t;
      do
        l |= a.lane, a = a.next;
      while (a !== t);
    } else o === null && (a.shared.lanes = 0);
    qt |= l, e.lanes = l, e.memoizedState = h;
  }
}
function Cu(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], a = r.callback;
    if (a !== null) {
      if (r.callback = null, r = n, typeof a != "function") throw Error(w(191, a));
      a.call(r);
    }
  }
}
var Fr = {}, tt = zt(Fr), Cr = zt(Fr), Mr = zt(Fr);
function Kt(e) {
  if (e === Fr) throw Error(w(174));
  return e;
}
function Ci(e, t) {
  switch ($(Mr, t), $(Cr, e), $(tt, Fr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : ul(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = ul(t, e);
  }
  H(tt), $(tt, t);
}
function An() {
  H(tt), H(Cr), H(Mr);
}
function Ld(e) {
  Kt(Mr.current);
  var t = Kt(tt.current), n = ul(t, e.type);
  t !== n && ($(Cr, e), $(tt, n));
}
function Mi(e) {
  Cr.current === e && (H(tt), H(Cr));
}
var U = zt(0);
function Oa(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var Ao = [];
function ji() {
  for (var e = 0; e < Ao.length; e++) Ao[e]._workInProgressVersionPrimary = null;
  Ao.length = 0;
}
var pa = mt.ReactCurrentDispatcher, Po = mt.ReactCurrentBatchConfig, Xt = 0, K = null, ee = null, ne = null, $a = !1, cr = !1, jr = 0, rh = 0;
function ce() {
  throw Error(w(321));
}
function Ei(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ge(e[n], t[n])) return !1;
  return !0;
}
function Li(e, t, n, r, a, o) {
  if (Xt = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, pa.current = e === null || e.memoizedState === null ? ih : sh, e = n(r, a), cr) {
    o = 0;
    do {
      if (cr = !1, jr = 0, 25 <= o) throw Error(w(301));
      o += 1, ne = ee = null, t.updateQueue = null, pa.current = uh, e = n(r, a);
    } while (cr);
  }
  if (pa.current = Ra, t = ee !== null && ee.next !== null, Xt = 0, ne = ee = K = null, $a = !1, t) throw Error(w(300));
  return e;
}
function Di() {
  var e = jr !== 0;
  return jr = 0, e;
}
function Xe() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ne === null ? K.memoizedState = ne = e : ne = ne.next = e, ne;
}
function Oe() {
  if (ee === null) {
    var e = K.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ee.next;
  var t = ne === null ? K.memoizedState : ne.next;
  if (t !== null) ne = t, ee = e;
  else {
    if (e === null) throw Error(w(310));
    ee = e, e = { memoizedState: ee.memoizedState, baseState: ee.baseState, baseQueue: ee.baseQueue, queue: ee.queue, next: null }, ne === null ? K.memoizedState = ne = e : ne = ne.next = e;
  }
  return ne;
}
function Er(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Io(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = ee, a = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (a !== null) {
      var l = a.next;
      a.next = o.next, o.next = l;
    }
    r.baseQueue = a = o, n.pending = null;
  }
  if (a !== null) {
    o = a.next, r = r.baseState;
    var s = l = null, u = null, c = o;
    do {
      var m = c.lane;
      if ((Xt & m) === m) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var h = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (s = u = h, l = r) : u = u.next = h, K.lanes |= m, qt |= m;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? l = r : u.next = s, Ge(r, t.memoizedState) || (Se = !0), t.memoizedState = r, t.baseState = l, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    a = e;
    do
      o = a.lane, K.lanes |= o, qt |= o, a = a.next;
    while (a !== e);
  } else a === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function zo(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(w(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, a = n.pending, o = t.memoizedState;
  if (a !== null) {
    n.pending = null;
    var l = a = a.next;
    do
      o = e(o, l.action), l = l.next;
    while (l !== a);
    Ge(o, t.memoizedState) || (Se = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function Dd() {
}
function Ad(e, t) {
  var n = K, r = Oe(), a = t(), o = !Ge(r.memoizedState, a);
  if (o && (r.memoizedState = a, Se = !0), r = r.queue, Ai(zd.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ne !== null && ne.memoizedState.tag & 1) {
    if (n.flags |= 2048, Lr(9, Id.bind(null, n, r, a, t), void 0, null), re === null) throw Error(w(349));
    Xt & 30 || Pd(n, t, a);
  }
  return a;
}
function Pd(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Id(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Fd(t) && Od(e);
}
function zd(e, t, n) {
  return n(function() {
    Fd(t) && Od(e);
  });
}
function Fd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ge(e, n);
  } catch {
    return !0;
  }
}
function Od(e) {
  var t = dt(e, 1);
  t !== null && Ke(t, e, 1, -1);
}
function Mu(e) {
  var t = Xe();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Er, lastRenderedState: e }, t.queue = e, e = e.dispatch = lh.bind(null, K, e), [t.memoizedState, e];
}
function Lr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function $d() {
  return Oe().memoizedState;
}
function ha(e, t, n, r) {
  var a = Xe();
  K.flags |= e, a.memoizedState = Lr(1 | t, n, void 0, r === void 0 ? null : r);
}
function eo(e, t, n, r) {
  var a = Oe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var l = ee.memoizedState;
    if (o = l.destroy, r !== null && Ei(r, l.deps)) {
      a.memoizedState = Lr(t, n, o, r);
      return;
    }
  }
  K.flags |= e, a.memoizedState = Lr(1 | t, n, o, r);
}
function ju(e, t) {
  return ha(8390656, 8, e, t);
}
function Ai(e, t) {
  return eo(2048, 8, e, t);
}
function Rd(e, t) {
  return eo(4, 2, e, t);
}
function Hd(e, t) {
  return eo(4, 4, e, t);
}
function Wd(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Bd(e, t, n) {
  return n = n != null ? n.concat([e]) : null, eo(4, 4, Wd.bind(null, t, e), n);
}
function Pi() {
}
function Ud(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ei(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Kd(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ei(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Gd(e, t, n) {
  return Xt & 21 ? (Ge(n, t) || (n = Xc(), K.lanes |= n, qt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, Se = !0), e.memoizedState = n);
}
function ah(e, t) {
  var n = O;
  O = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Po.transition;
  Po.transition = {};
  try {
    e(!1), t();
  } finally {
    O = n, Po.transition = r;
  }
}
function Vd() {
  return Oe().memoizedState;
}
function oh(e, t, n) {
  var r = Et(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Qd(e)) Yd(t, n);
  else if (n = jd(e, t, n, r), n !== null) {
    var a = ge();
    Ke(n, e, r, a), Zd(n, t, r);
  }
}
function lh(e, t, n) {
  var r = Et(e), a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Qd(e)) Yd(t, a);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var l = t.lastRenderedState, s = o(l, n);
      if (a.hasEagerState = !0, a.eagerState = s, Ge(s, l)) {
        var u = t.interleaved;
        u === null ? (a.next = a, Ni(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
        return;
      }
    } catch {
    } finally {
    }
    n = jd(e, t, a, r), n !== null && (a = ge(), Ke(n, e, r, a), Zd(n, t, r));
  }
}
function Qd(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K;
}
function Yd(e, t) {
  cr = $a = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Zd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, di(e, n);
  }
}
var Ra = { readContext: Fe, useCallback: ce, useContext: ce, useEffect: ce, useImperativeHandle: ce, useInsertionEffect: ce, useLayoutEffect: ce, useMemo: ce, useReducer: ce, useRef: ce, useState: ce, useDebugValue: ce, useDeferredValue: ce, useTransition: ce, useMutableSource: ce, useSyncExternalStore: ce, useId: ce, unstable_isNewReconciler: !1 }, ih = { readContext: Fe, useCallback: function(e, t) {
  return Xe().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Fe, useEffect: ju, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ha(
    4194308,
    4,
    Wd.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ha(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ha(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Xe();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Xe();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = oh.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Xe();
  return e = { current: e }, t.memoizedState = e;
}, useState: Mu, useDebugValue: Pi, useDeferredValue: function(e) {
  return Xe().memoizedState = e;
}, useTransition: function() {
  var e = Mu(!1), t = e[0];
  return e = ah.bind(null, e[1]), Xe().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, a = Xe();
  if (B) {
    if (n === void 0) throw Error(w(407));
    n = n();
  } else {
    if (n = t(), re === null) throw Error(w(349));
    Xt & 30 || Pd(r, t, n);
  }
  a.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return a.queue = o, ju(zd.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Lr(9, Id.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Xe(), t = re.identifierPrefix;
  if (B) {
    var n = it, r = lt;
    n = (r & ~(1 << 32 - Ue(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = jr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = rh++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, sh = {
  readContext: Fe,
  useCallback: Ud,
  useContext: Fe,
  useEffect: Ai,
  useImperativeHandle: Bd,
  useInsertionEffect: Rd,
  useLayoutEffect: Hd,
  useMemo: Kd,
  useReducer: Io,
  useRef: $d,
  useState: function() {
    return Io(Er);
  },
  useDebugValue: Pi,
  useDeferredValue: function(e) {
    var t = Oe();
    return Gd(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = Io(Er)[0], t = Oe().memoizedState;
    return [e, t];
  },
  useMutableSource: Dd,
  useSyncExternalStore: Ad,
  useId: Vd,
  unstable_isNewReconciler: !1
}, uh = { readContext: Fe, useCallback: Ud, useContext: Fe, useEffect: Ai, useImperativeHandle: Bd, useInsertionEffect: Rd, useLayoutEffect: Hd, useMemo: Kd, useReducer: zo, useRef: $d, useState: function() {
  return zo(Er);
}, useDebugValue: Pi, useDeferredValue: function(e) {
  var t = Oe();
  return ee === null ? t.memoizedState = e : Gd(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = zo(Er)[0], t = Oe().memoizedState;
  return [e, t];
}, useMutableSource: Dd, useSyncExternalStore: Ad, useId: Vd, unstable_isNewReconciler: !1 };
function Re(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function El(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var to = { isMounted: function(e) {
  return (e = e._reactInternals) ? tn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ge(), a = Et(e), o = st(r, a);
  o.payload = t, n != null && (o.callback = n), t = Mt(e, o, a), t !== null && (Ke(t, e, a, r), ma(t, e, a));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ge(), a = Et(e), o = st(r, a);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Mt(e, o, a), t !== null && (Ke(t, e, a, r), ma(t, e, a));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ge(), r = Et(e), a = st(n, r);
  a.tag = 2, t != null && (a.callback = t), t = Mt(e, a, r), t !== null && (Ke(t, e, r, n), ma(t, e, r));
} };
function Eu(e, t, n, r, a, o, l) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, l) : t.prototype && t.prototype.isPureReactComponent ? !xr(n, r) || !xr(a, o) : !0;
}
function Xd(e, t, n) {
  var r = !1, a = Pt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Fe(o) : (a = ke(t) ? Yt : pe.current, r = t.contextTypes, o = (r = r != null) ? En(e, a) : Pt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = to, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Lu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && to.enqueueReplaceState(t, t.state, null);
}
function Ll(e, t, n, r) {
  var a = e.stateNode;
  a.props = n, a.state = e.memoizedState, a.refs = {}, bi(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? a.context = Fe(o) : (o = ke(t) ? Yt : pe.current, a.context = En(e, o)), a.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (El(e, t, o, n), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && to.enqueueReplaceState(a, a.state, null), Fa(e, n, a, r), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
}
function Pn(e, t) {
  try {
    var n = "", r = t;
    do
      n += Fm(r), r = r.return;
    while (r);
    var a = n;
  } catch (o) {
    a = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: a, digest: null };
}
function Fo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Dl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var ch = typeof WeakMap == "function" ? WeakMap : Map;
function qd(e, t, n) {
  n = st(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Wa || (Wa = !0, Wl = r), Dl(e, t);
  }, n;
}
function Jd(e, t, n) {
  n = st(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var a = t.value;
    n.payload = function() {
      return r(a);
    }, n.callback = function() {
      Dl(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    Dl(e, t), typeof r != "function" && (jt === null ? jt = /* @__PURE__ */ new Set([this]) : jt.add(this));
    var l = t.stack;
    this.componentDidCatch(t.value, { componentStack: l !== null ? l : "" });
  }), n;
}
function Du(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new ch();
    var a = /* @__PURE__ */ new Set();
    r.set(t, a);
  } else a = r.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), r.set(t, a));
  a.has(n) || (a.add(n), e = Th.bind(null, e, t, n), t.then(e, e));
}
function Au(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Pu(e, t, n, r, a) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = st(-1, 1), t.tag = 2, Mt(n, t, 1))), n.lanes |= 1), e);
}
var dh = mt.ReactCurrentOwner, Se = !1;
function he(e, t, n, r) {
  t.child = e === null ? Md(t, null, n, r) : Dn(t, e.child, n, r);
}
function Iu(e, t, n, r, a) {
  n = n.render;
  var o = t.ref;
  return Cn(t, a), r = Li(e, t, n, r, o, a), n = Di(), e !== null && !Se ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, ft(e, t, a)) : (B && n && _i(t), t.flags |= 1, he(e, t, r, a), t.child);
}
function zu(e, t, n, r, a) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Wi(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, ef(e, t, o, r, a)) : (e = _a(n.type, null, r, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & a)) {
    var l = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : xr, n(l, r) && e.ref === t.ref) return ft(e, t, a);
  }
  return t.flags |= 1, e = Lt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function ef(e, t, n, r, a) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (xr(o, r) && e.ref === t.ref) if (Se = !1, t.pendingProps = r = o, (e.lanes & a) !== 0) e.flags & 131072 && (Se = !0);
    else return t.lanes = e.lanes, ft(e, t, a);
  }
  return Al(e, t, n, r, a);
}
function tf(e, t, n) {
  var r = t.pendingProps, a = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $(Sn, Ne), Ne |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, $(Sn, Ne), Ne |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, $(Sn, Ne), Ne |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, $(Sn, Ne), Ne |= r;
  return he(e, t, a, n), t.child;
}
function nf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Al(e, t, n, r, a) {
  var o = ke(n) ? Yt : pe.current;
  return o = En(t, o), Cn(t, a), n = Li(e, t, n, r, o, a), r = Di(), e !== null && !Se ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, ft(e, t, a)) : (B && r && _i(t), t.flags |= 1, he(e, t, n, a), t.child);
}
function Fu(e, t, n, r, a) {
  if (ke(n)) {
    var o = !0;
    Da(t);
  } else o = !1;
  if (Cn(t, a), t.stateNode === null) ga(e, t), Xd(t, n, r), Ll(t, n, r, a), r = !0;
  else if (e === null) {
    var l = t.stateNode, s = t.memoizedProps;
    l.props = s;
    var u = l.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Fe(c) : (c = ke(n) ? Yt : pe.current, c = En(t, c));
    var m = n.getDerivedStateFromProps, h = typeof m == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    h || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== r || u !== c) && Lu(t, l, r, c), vt = !1;
    var f = t.memoizedState;
    l.state = f, Fa(t, r, l, a), u = t.memoizedState, s !== r || f !== u || we.current || vt ? (typeof m == "function" && (El(t, n, m, r), u = t.memoizedState), (s = vt || Eu(t, n, s, r, f, u, c)) ? (h || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), l.props = r, l.state = u, l.context = c, r = s) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    l = t.stateNode, Ed(e, t), s = t.memoizedProps, c = t.type === t.elementType ? s : Re(t.type, s), l.props = c, h = t.pendingProps, f = l.context, u = n.contextType, typeof u == "object" && u !== null ? u = Fe(u) : (u = ke(n) ? Yt : pe.current, u = En(t, u));
    var y = n.getDerivedStateFromProps;
    (m = typeof y == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (s !== h || f !== u) && Lu(t, l, r, u), vt = !1, f = t.memoizedState, l.state = f, Fa(t, r, l, a);
    var v = t.memoizedState;
    s !== h || f !== v || we.current || vt ? (typeof y == "function" && (El(t, n, y, r), v = t.memoizedState), (c = vt || Eu(t, n, c, r, f, v, u) || !1) ? (m || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, v, u), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, v, u)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), l.props = r, l.state = v, l.context = u, r = c) : (typeof l.componentDidUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || s === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Pl(e, t, n, r, o, a);
}
function Pl(e, t, n, r, a, o) {
  nf(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return a && ku(t, n, !1), ft(e, t, o);
  r = t.stateNode, dh.current = t;
  var s = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && l ? (t.child = Dn(t, e.child, null, o), t.child = Dn(t, null, s, o)) : he(e, t, s, o), t.memoizedState = r.state, a && ku(t, n, !0), t.child;
}
function rf(e) {
  var t = e.stateNode;
  t.pendingContext ? wu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && wu(e, t.context, !1), Ci(e, t.containerInfo);
}
function Ou(e, t, n, r, a) {
  return Ln(), wi(a), t.flags |= 256, he(e, t, n, r), t.child;
}
var Il = { dehydrated: null, treeContext: null, retryLane: 0 };
function zl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function af(e, t, n) {
  var r = t.pendingProps, a = U.current, o = !1, l = (t.flags & 128) !== 0, s;
  if ((s = l) || (s = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), s ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), $(U, a & 1), e === null)
    return Ml(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (l = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, l = { mode: "hidden", children: l }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = l) : o = ao(l, r, 0, null), e = Vt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = zl(n), t.memoizedState = Il, e) : Ii(t, l));
  if (a = e.memoizedState, a !== null && (s = a.dehydrated, s !== null)) return fh(e, t, l, r, s, a, n);
  if (o) {
    o = r.fallback, l = t.mode, a = e.child, s = a.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(l & 1) && t.child !== a ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Lt(a, u), r.subtreeFlags = a.subtreeFlags & 14680064), s !== null ? o = Lt(s, o) : (o = Vt(o, l, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, l = e.child.memoizedState, l = l === null ? zl(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, o.memoizedState = l, o.childLanes = e.childLanes & ~n, t.memoizedState = Il, r;
  }
  return o = e.child, e = o.sibling, r = Lt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ii(e, t) {
  return t = ao({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function ra(e, t, n, r) {
  return r !== null && wi(r), Dn(t, e.child, null, n), e = Ii(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function fh(e, t, n, r, a, o, l) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Fo(Error(w(422))), ra(e, t, l, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, a = t.mode, r = ao({ mode: "visible", children: r.children }, a, 0, null), o = Vt(o, a, l, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Dn(t, e.child, null, l), t.child.memoizedState = zl(l), t.memoizedState = Il, o);
  if (!(t.mode & 1)) return ra(e, t, l, null);
  if (a.data === "$!") {
    if (r = a.nextSibling && a.nextSibling.dataset, r) var s = r.dgst;
    return r = s, o = Error(w(419)), r = Fo(o, r, void 0), ra(e, t, l, r);
  }
  if (s = (l & e.childLanes) !== 0, Se || s) {
    if (r = re, r !== null) {
      switch (l & -l) {
        case 4:
          a = 2;
          break;
        case 16:
          a = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          a = 32;
          break;
        case 536870912:
          a = 268435456;
          break;
        default:
          a = 0;
      }
      a = a & (r.suspendedLanes | l) ? 0 : a, a !== 0 && a !== o.retryLane && (o.retryLane = a, dt(e, a), Ke(r, e, a, -1));
    }
    return Hi(), r = Fo(Error(w(421))), ra(e, t, l, r);
  }
  return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = Nh.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, Ce = Ct(a.nextSibling), Me = t, B = !0, We = null, e !== null && (Ae[Pe++] = lt, Ae[Pe++] = it, Ae[Pe++] = Zt, lt = e.id, it = e.overflow, Zt = t), t = Ii(t, r.children), t.flags |= 4096, t);
}
function $u(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), jl(e.return, t, n);
}
function Oo(e, t, n, r, a) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = a);
}
function of(e, t, n) {
  var r = t.pendingProps, a = r.revealOrder, o = r.tail;
  if (he(e, t, r.children, n), r = U.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && $u(e, n, t);
      else if (e.tag === 19) $u(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if ($(U, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (a) {
    case "forwards":
      for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && Oa(e) === null && (a = n), n = n.sibling;
      n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Oo(t, !1, a, n, o);
      break;
    case "backwards":
      for (n = null, a = t.child, t.child = null; a !== null; ) {
        if (e = a.alternate, e !== null && Oa(e) === null) {
          t.child = a;
          break;
        }
        e = a.sibling, a.sibling = n, n = a, a = e;
      }
      Oo(t, !0, n, null, o);
      break;
    case "together":
      Oo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ga(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function ft(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), qt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(w(153));
  if (t.child !== null) {
    for (e = t.child, n = Lt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Lt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function mh(e, t, n) {
  switch (t.tag) {
    case 3:
      rf(t), Ln();
      break;
    case 5:
      Ld(t);
      break;
    case 1:
      ke(t.type) && Da(t);
      break;
    case 4:
      Ci(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, a = t.memoizedProps.value;
      $(Ia, r._currentValue), r._currentValue = a;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? ($(U, U.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? af(e, t, n) : ($(U, U.current & 1), e = ft(e, t, n), e !== null ? e.sibling : null);
      $(U, U.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return of(e, t, n);
        t.flags |= 128;
      }
      if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), $(U, U.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, tf(e, t, n);
  }
  return ft(e, t, n);
}
var lf, Fl, sf, uf;
lf = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Fl = function() {
};
sf = function(e, t, n, r) {
  var a = e.memoizedProps;
  if (a !== r) {
    e = t.stateNode, Kt(tt.current);
    var o = null;
    switch (n) {
      case "input":
        a = ol(e, a), r = ol(e, r), o = [];
        break;
      case "select":
        a = G({}, a, { value: void 0 }), r = G({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        a = sl(e, a), r = sl(e, r), o = [];
        break;
      default:
        typeof a.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ea);
    }
    cl(n, r);
    var l;
    n = null;
    for (c in a) if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && a[c] != null) if (c === "style") {
      var s = a[c];
      for (l in s) s.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (gr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (s = a != null ? a[c] : void 0, r.hasOwnProperty(c) && u !== s && (u != null || s != null)) if (c === "style") if (s) {
        for (l in s) !s.hasOwnProperty(l) || u && u.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
        for (l in u) u.hasOwnProperty(l) && s[l] !== u[l] && (n || (n = {}), n[l] = u[l]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, s = s ? s.__html : void 0, u != null && s !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (gr.hasOwnProperty(c) ? (u != null && c === "onScroll" && R("scroll", e), o || s === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
uf = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Qn(e, t) {
  if (!B) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function de(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 14680064, r |= a.flags & 14680064, a.return = e, a = a.sibling;
  else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function ph(e, t, n) {
  var r = t.pendingProps;
  switch (Si(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return de(t), null;
    case 1:
      return ke(t.type) && La(), de(t), null;
    case 3:
      return r = t.stateNode, An(), H(we), H(pe), ji(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ta(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, We !== null && (Kl(We), We = null))), Fl(e, t), de(t), null;
    case 5:
      Mi(t);
      var a = Kt(Mr.current);
      if (n = t.type, e !== null && t.stateNode != null) sf(e, t, n, r, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(w(166));
          return de(t), null;
        }
        if (e = Kt(tt.current), ta(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[Je] = t, r[br] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              R("cancel", r), R("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              R("load", r);
              break;
            case "video":
            case "audio":
              for (a = 0; a < rr.length; a++) R(rr[a], r);
              break;
            case "source":
              R("error", r);
              break;
            case "img":
            case "image":
            case "link":
              R(
                "error",
                r
              ), R("load", r);
              break;
            case "details":
              R("toggle", r);
              break;
            case "input":
              Qs(r, o), R("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, R("invalid", r);
              break;
            case "textarea":
              Zs(r, o), R("invalid", r);
          }
          cl(n, o), a = null;
          for (var l in o) if (o.hasOwnProperty(l)) {
            var s = o[l];
            l === "children" ? typeof s == "string" ? r.textContent !== s && (o.suppressHydrationWarning !== !0 && ea(r.textContent, s, e), a = ["children", s]) : typeof s == "number" && r.textContent !== "" + s && (o.suppressHydrationWarning !== !0 && ea(
              r.textContent,
              s,
              e
            ), a = ["children", "" + s]) : gr.hasOwnProperty(l) && s != null && l === "onScroll" && R("scroll", r);
          }
          switch (n) {
            case "input":
              Gr(r), Ys(r, o, !0);
              break;
            case "textarea":
              Gr(r), Xs(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ea);
          }
          r = a, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          l = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = zc(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = l.createElement(n, { is: r.is }) : (e = l.createElement(n), n === "select" && (l = e, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : e = l.createElementNS(e, n), e[Je] = t, e[br] = r, lf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (l = dl(n, r), n) {
              case "dialog":
                R("cancel", e), R("close", e), a = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                R("load", e), a = r;
                break;
              case "video":
              case "audio":
                for (a = 0; a < rr.length; a++) R(rr[a], e);
                a = r;
                break;
              case "source":
                R("error", e), a = r;
                break;
              case "img":
              case "image":
              case "link":
                R(
                  "error",
                  e
                ), R("load", e), a = r;
                break;
              case "details":
                R("toggle", e), a = r;
                break;
              case "input":
                Qs(e, r), a = ol(e, r), R("invalid", e);
                break;
              case "option":
                a = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, a = G({}, r, { value: void 0 }), R("invalid", e);
                break;
              case "textarea":
                Zs(e, r), a = sl(e, r), R("invalid", e);
                break;
              default:
                a = r;
            }
            cl(n, a), s = a;
            for (o in s) if (s.hasOwnProperty(o)) {
              var u = s[o];
              o === "style" ? $c(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Fc(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && yr(e, u) : typeof u == "number" && yr(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (gr.hasOwnProperty(o) ? u != null && o === "onScroll" && R("scroll", e) : u != null && oi(e, o, u, l));
            }
            switch (n) {
              case "input":
                Gr(e), Ys(e, r, !1);
                break;
              case "textarea":
                Gr(e), Xs(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + At(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? xn(e, !!r.multiple, o, !1) : r.defaultValue != null && xn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof a.onClick == "function" && (e.onclick = Ea);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return de(t), null;
    case 6:
      if (e && t.stateNode != null) uf(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(w(166));
        if (n = Kt(Mr.current), Kt(tt.current), ta(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Je] = t, (o = r.nodeValue !== n) && (e = Me, e !== null)) switch (e.tag) {
            case 3:
              ea(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && ea(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Je] = t, t.stateNode = r;
      }
      return de(t), null;
    case 13:
      if (H(U), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (B && Ce !== null && t.mode & 1 && !(t.flags & 128)) bd(), Ln(), t.flags |= 98560, o = !1;
        else if (o = ta(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(w(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(w(317));
            o[Je] = t;
          } else Ln(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          de(t), o = !1;
        } else We !== null && (Kl(We), We = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? te === 0 && (te = 3) : Hi())), t.updateQueue !== null && (t.flags |= 4), de(t), null);
    case 4:
      return An(), Fl(e, t), e === null && Tr(t.stateNode.containerInfo), de(t), null;
    case 10:
      return Ti(t.type._context), de(t), null;
    case 17:
      return ke(t.type) && La(), de(t), null;
    case 19:
      if (H(U), o = t.memoizedState, o === null) return de(t), null;
      if (r = (t.flags & 128) !== 0, l = o.rendering, l === null) if (r) Qn(o, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (l = Oa(e), l !== null) {
            for (t.flags |= 128, Qn(o, !1), r = l.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, l = o.alternate, l === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, e = l.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return $(U, U.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && q() > In && (t.flags |= 128, r = !0, Qn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Oa(l), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Qn(o, !0), o.tail === null && o.tailMode === "hidden" && !l.alternate && !B) return de(t), null;
        } else 2 * q() - o.renderingStartTime > In && n !== 1073741824 && (t.flags |= 128, r = !0, Qn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (l.sibling = t.child, t.child = l) : (n = o.last, n !== null ? n.sibling = l : t.child = l, o.last = l);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = q(), t.sibling = null, n = U.current, $(U, r ? n & 1 | 2 : n & 1), t) : (de(t), null);
    case 22:
    case 23:
      return Ri(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ne & 1073741824 && (de(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : de(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(w(156, t.tag));
}
function hh(e, t) {
  switch (Si(t), t.tag) {
    case 1:
      return ke(t.type) && La(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return An(), H(we), H(pe), ji(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Mi(t), null;
    case 13:
      if (H(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(w(340));
        Ln();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return H(U), null;
    case 4:
      return An(), null;
    case 10:
      return Ti(t.type._context), null;
    case 22:
    case 23:
      return Ri(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var aa = !1, fe = !1, gh = typeof WeakSet == "function" ? WeakSet : Set, C = null;
function _n(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Q(e, t, r);
  }
  else n.current = null;
}
function Ol(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var Ru = !1;
function yh(e, t) {
  if (wl = Ca, e = md(), vi(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var a = r.anchorOffset, o = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, o.nodeType;
        } catch {
          n = null;
          break e;
        }
        var l = 0, s = -1, u = -1, c = 0, m = 0, h = e, f = null;
        t: for (; ; ) {
          for (var y; h !== n || a !== 0 && h.nodeType !== 3 || (s = l + a), h !== o || r !== 0 && h.nodeType !== 3 || (u = l + r), h.nodeType === 3 && (l += h.nodeValue.length), (y = h.firstChild) !== null; )
            f = h, h = y;
          for (; ; ) {
            if (h === e) break t;
            if (f === n && ++c === a && (s = l), f === o && ++m === r && (u = l), (y = h.nextSibling) !== null) break;
            h = f, f = h.parentNode;
          }
          h = y;
        }
        n = s === -1 || u === -1 ? null : { start: s, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (kl = { focusedElem: e, selectionRange: n }, Ca = !1, C = t; C !== null; ) if (t = C, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, C = e;
  else for (; C !== null; ) {
    t = C;
    try {
      var v = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (v !== null) {
            var S = v.memoizedProps, L = v.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? S : Re(t.type, S), L);
            p.__reactInternalSnapshotBeforeUpdate = d;
          }
          break;
        case 3:
          var g = t.stateNode.containerInfo;
          g.nodeType === 1 ? g.textContent = "" : g.nodeType === 9 && g.documentElement && g.removeChild(g.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(w(163));
      }
    } catch (_) {
      Q(t, t.return, _);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, C = e;
      break;
    }
    C = t.return;
  }
  return v = Ru, Ru = !1, v;
}
function dr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var a = r = r.next;
    do {
      if ((a.tag & e) === e) {
        var o = a.destroy;
        a.destroy = void 0, o !== void 0 && Ol(t, n, o);
      }
      a = a.next;
    } while (a !== r);
  }
}
function no(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function $l(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function cf(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, cf(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Je], delete t[br], delete t[Nl], delete t[Jp], delete t[eh])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function df(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Hu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || df(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Rl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ea));
  else if (r !== 4 && (e = e.child, e !== null)) for (Rl(e, t, n), e = e.sibling; e !== null; ) Rl(e, t, n), e = e.sibling;
}
function Hl(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Hl(e, t, n), e = e.sibling; e !== null; ) Hl(e, t, n), e = e.sibling;
}
var oe = null, He = !1;
function gt(e, t, n) {
  for (n = n.child; n !== null; ) ff(e, t, n), n = n.sibling;
}
function ff(e, t, n) {
  if (et && typeof et.onCommitFiberUnmount == "function") try {
    et.onCommitFiberUnmount(Qa, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      fe || _n(n, t);
    case 6:
      var r = oe, a = He;
      oe = null, gt(e, t, n), oe = r, He = a, oe !== null && (He ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (He ? (e = oe, n = n.stateNode, e.nodeType === 8 ? Lo(e.parentNode, n) : e.nodeType === 1 && Lo(e, n), wr(e)) : Lo(oe, n.stateNode));
      break;
    case 4:
      r = oe, a = He, oe = n.stateNode.containerInfo, He = !0, gt(e, t, n), oe = r, He = a;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!fe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        a = r = r.next;
        do {
          var o = a, l = o.destroy;
          o = o.tag, l !== void 0 && (o & 2 || o & 4) && Ol(n, t, l), a = a.next;
        } while (a !== r);
      }
      gt(e, t, n);
      break;
    case 1:
      if (!fe && (_n(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (s) {
        Q(n, t, s);
      }
      gt(e, t, n);
      break;
    case 21:
      gt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (fe = (r = fe) || n.memoizedState !== null, gt(e, t, n), fe = r) : gt(e, t, n);
      break;
    default:
      gt(e, t, n);
  }
}
function Wu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new gh()), t.forEach(function(r) {
      var a = bh.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(a, a));
    });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var a = n[r];
    try {
      var o = e, l = t, s = l;
      e: for (; s !== null; ) {
        switch (s.tag) {
          case 5:
            oe = s.stateNode, He = !1;
            break e;
          case 3:
            oe = s.stateNode.containerInfo, He = !0;
            break e;
          case 4:
            oe = s.stateNode.containerInfo, He = !0;
            break e;
        }
        s = s.return;
      }
      if (oe === null) throw Error(w(160));
      ff(o, l, a), oe = null, He = !1;
      var u = a.alternate;
      u !== null && (u.return = null), a.return = null;
    } catch (c) {
      Q(a, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) mf(t, e), t = t.sibling;
}
function mf(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ($e(t, e), Ye(e), r & 4) {
        try {
          dr(3, e, e.return), no(3, e);
        } catch (S) {
          Q(e, e.return, S);
        }
        try {
          dr(5, e, e.return);
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 1:
      $e(t, e), Ye(e), r & 512 && n !== null && _n(n, n.return);
      break;
    case 5:
      if ($e(t, e), Ye(e), r & 512 && n !== null && _n(n, n.return), e.flags & 32) {
        var a = e.stateNode;
        try {
          yr(a, "");
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      if (r & 4 && (a = e.stateNode, a != null)) {
        var o = e.memoizedProps, l = n !== null ? n.memoizedProps : o, s = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          s === "input" && o.type === "radio" && o.name != null && Pc(a, o), dl(s, l);
          var c = dl(s, o);
          for (l = 0; l < u.length; l += 2) {
            var m = u[l], h = u[l + 1];
            m === "style" ? $c(a, h) : m === "dangerouslySetInnerHTML" ? Fc(a, h) : m === "children" ? yr(a, h) : oi(a, m, h, c);
          }
          switch (s) {
            case "input":
              ll(a, o);
              break;
            case "textarea":
              Ic(a, o);
              break;
            case "select":
              var f = a._wrapperState.wasMultiple;
              a._wrapperState.wasMultiple = !!o.multiple;
              var y = o.value;
              y != null ? xn(a, !!o.multiple, y, !1) : f !== !!o.multiple && (o.defaultValue != null ? xn(
                a,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : xn(a, !!o.multiple, o.multiple ? [] : "", !1));
          }
          a[br] = o;
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 6:
      if ($e(t, e), Ye(e), r & 4) {
        if (e.stateNode === null) throw Error(w(162));
        a = e.stateNode, o = e.memoizedProps;
        try {
          a.nodeValue = o;
        } catch (S) {
          Q(e, e.return, S);
        }
      }
      break;
    case 3:
      if ($e(t, e), Ye(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        wr(t.containerInfo);
      } catch (S) {
        Q(e, e.return, S);
      }
      break;
    case 4:
      $e(t, e), Ye(e);
      break;
    case 13:
      $e(t, e), Ye(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || (Oi = q())), r & 4 && Wu(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (fe = (c = fe) || m, $e(t, e), fe = c) : $e(t, e), Ye(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1) for (C = e, m = e.child; m !== null; ) {
          for (h = C = m; C !== null; ) {
            switch (f = C, y = f.child, f.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                dr(4, f, f.return);
                break;
              case 1:
                _n(f, f.return);
                var v = f.stateNode;
                if (typeof v.componentWillUnmount == "function") {
                  r = f, n = f.return;
                  try {
                    t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount();
                  } catch (S) {
                    Q(r, n, S);
                  }
                }
                break;
              case 5:
                _n(f, f.return);
                break;
              case 22:
                if (f.memoizedState !== null) {
                  Uu(h);
                  continue;
                }
            }
            y !== null ? (y.return = f, C = y) : Uu(h);
          }
          m = m.sibling;
        }
        e: for (m = null, h = e; ; ) {
          if (h.tag === 5) {
            if (m === null) {
              m = h;
              try {
                a = h.stateNode, c ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (s = h.stateNode, u = h.memoizedProps.style, l = u != null && u.hasOwnProperty("display") ? u.display : null, s.style.display = Oc("display", l));
              } catch (S) {
                Q(e, e.return, S);
              }
            }
          } else if (h.tag === 6) {
            if (m === null) try {
              h.stateNode.nodeValue = c ? "" : h.memoizedProps;
            } catch (S) {
              Q(e, e.return, S);
            }
          } else if ((h.tag !== 22 && h.tag !== 23 || h.memoizedState === null || h === e) && h.child !== null) {
            h.child.return = h, h = h.child;
            continue;
          }
          if (h === e) break e;
          for (; h.sibling === null; ) {
            if (h.return === null || h.return === e) break e;
            m === h && (m = null), h = h.return;
          }
          m === h && (m = null), h.sibling.return = h.return, h = h.sibling;
        }
      }
      break;
    case 19:
      $e(t, e), Ye(e), r & 4 && Wu(e);
      break;
    case 21:
      break;
    default:
      $e(
        t,
        e
      ), Ye(e);
  }
}
function Ye(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (df(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(w(160));
      }
      switch (r.tag) {
        case 5:
          var a = r.stateNode;
          r.flags & 32 && (yr(a, ""), r.flags &= -33);
          var o = Hu(e);
          Hl(e, o, a);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo, s = Hu(e);
          Rl(e, s, l);
          break;
        default:
          throw Error(w(161));
      }
    } catch (u) {
      Q(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function vh(e, t, n) {
  C = e, pf(e);
}
function pf(e, t, n) {
  for (var r = (e.mode & 1) !== 0; C !== null; ) {
    var a = C, o = a.child;
    if (a.tag === 22 && r) {
      var l = a.memoizedState !== null || aa;
      if (!l) {
        var s = a.alternate, u = s !== null && s.memoizedState !== null || fe;
        s = aa;
        var c = fe;
        if (aa = l, (fe = u) && !c) for (C = a; C !== null; ) l = C, u = l.child, l.tag === 22 && l.memoizedState !== null ? Ku(a) : u !== null ? (u.return = l, C = u) : Ku(a);
        for (; o !== null; ) C = o, pf(o), o = o.sibling;
        C = a, aa = s, fe = c;
      }
      Bu(e);
    } else a.subtreeFlags & 8772 && o !== null ? (o.return = a, C = o) : Bu(e);
  }
}
function Bu(e) {
  for (; C !== null; ) {
    var t = C;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            fe || no(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !fe) if (n === null) r.componentDidMount();
            else {
              var a = t.elementType === t.type ? n.memoizedProps : Re(t.type, n.memoizedProps);
              r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && Cu(t, o, r);
            break;
          case 3:
            var l = t.updateQueue;
            if (l !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Cu(t, l, n);
            }
            break;
          case 5:
            var s = t.stateNode;
            if (n === null && t.flags & 4) {
              n = s;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var m = c.memoizedState;
                if (m !== null) {
                  var h = m.dehydrated;
                  h !== null && wr(h);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(w(163));
        }
        fe || t.flags & 512 && $l(t);
      } catch (f) {
        Q(t, t.return, f);
      }
    }
    if (t === e) {
      C = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Uu(e) {
  for (; C !== null; ) {
    var t = C;
    if (t === e) {
      C = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, C = n;
      break;
    }
    C = t.return;
  }
}
function Ku(e) {
  for (; C !== null; ) {
    var t = C;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            no(4, t);
          } catch (u) {
            Q(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var a = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              Q(t, a, u);
            }
          }
          var o = t.return;
          try {
            $l(t);
          } catch (u) {
            Q(t, o, u);
          }
          break;
        case 5:
          var l = t.return;
          try {
            $l(t);
          } catch (u) {
            Q(t, l, u);
          }
      }
    } catch (u) {
      Q(t, t.return, u);
    }
    if (t === e) {
      C = null;
      break;
    }
    var s = t.sibling;
    if (s !== null) {
      s.return = t.return, C = s;
      break;
    }
    C = t.return;
  }
}
var _h = Math.ceil, Ha = mt.ReactCurrentDispatcher, zi = mt.ReactCurrentOwner, ze = mt.ReactCurrentBatchConfig, z = 0, re = null, J = null, ie = 0, Ne = 0, Sn = zt(0), te = 0, Dr = null, qt = 0, ro = 0, Fi = 0, fr = null, _e = null, Oi = 0, In = 1 / 0, rt = null, Wa = !1, Wl = null, jt = null, oa = !1, xt = null, Ba = 0, mr = 0, Bl = null, ya = -1, va = 0;
function ge() {
  return z & 6 ? q() : ya !== -1 ? ya : ya = q();
}
function Et(e) {
  return e.mode & 1 ? z & 2 && ie !== 0 ? ie & -ie : nh.transition !== null ? (va === 0 && (va = Xc()), va) : (e = O, e !== 0 || (e = window.event, e = e === void 0 ? 16 : ad(e.type)), e) : 1;
}
function Ke(e, t, n, r) {
  if (50 < mr) throw mr = 0, Bl = null, Error(w(185));
  Pr(e, n, r), (!(z & 2) || e !== re) && (e === re && (!(z & 2) && (ro |= n), te === 4 && wt(e, ie)), xe(e, r), n === 1 && z === 0 && !(t.mode & 1) && (In = q() + 500, Ja && Ft()));
}
function xe(e, t) {
  var n = e.callbackNode;
  np(e, t);
  var r = ba(e, e === re ? ie : 0);
  if (r === 0) n !== null && eu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && eu(n), t === 1) e.tag === 0 ? th(Gu.bind(null, e)) : xd(Gu.bind(null, e)), Xp(function() {
      !(z & 6) && Ft();
    }), n = null;
    else {
      switch (qc(r)) {
        case 1:
          n = ci;
          break;
        case 4:
          n = Yc;
          break;
        case 16:
          n = Na;
          break;
        case 536870912:
          n = Zc;
          break;
        default:
          n = Na;
      }
      n = kf(n, hf.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function hf(e, t) {
  if (ya = -1, va = 0, z & 6) throw Error(w(327));
  var n = e.callbackNode;
  if (Mn() && e.callbackNode !== n) return null;
  var r = ba(e, e === re ? ie : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ua(e, r);
  else {
    t = r;
    var a = z;
    z |= 2;
    var o = yf();
    (re !== e || ie !== t) && (rt = null, In = q() + 500, Gt(e, t));
    do
      try {
        kh();
        break;
      } catch (s) {
        gf(e, s);
      }
    while (!0);
    xi(), Ha.current = o, z = a, J !== null ? t = 0 : (re = null, ie = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (a = gl(e), a !== 0 && (r = a, t = Ul(e, a))), t === 1) throw n = Dr, Gt(e, 0), wt(e, r), xe(e, q()), n;
    if (t === 6) wt(e, r);
    else {
      if (a = e.current.alternate, !(r & 30) && !Sh(a) && (t = Ua(e, r), t === 2 && (o = gl(e), o !== 0 && (r = o, t = Ul(e, o))), t === 1)) throw n = Dr, Gt(e, 0), wt(e, r), xe(e, q()), n;
      switch (e.finishedWork = a, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(w(345));
        case 2:
          Wt(e, _e, rt);
          break;
        case 3:
          if (wt(e, r), (r & 130023424) === r && (t = Oi + 500 - q(), 10 < t)) {
            if (ba(e, 0) !== 0) break;
            if (a = e.suspendedLanes, (a & r) !== r) {
              ge(), e.pingedLanes |= e.suspendedLanes & a;
              break;
            }
            e.timeoutHandle = Tl(Wt.bind(null, e, _e, rt), t);
            break;
          }
          Wt(e, _e, rt);
          break;
        case 4:
          if (wt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, a = -1; 0 < r; ) {
            var l = 31 - Ue(r);
            o = 1 << l, l = t[l], l > a && (a = l), r &= ~o;
          }
          if (r = a, r = q() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * _h(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Tl(Wt.bind(null, e, _e, rt), r);
            break;
          }
          Wt(e, _e, rt);
          break;
        case 5:
          Wt(e, _e, rt);
          break;
        default:
          throw Error(w(329));
      }
    }
  }
  return xe(e, q()), e.callbackNode === n ? hf.bind(null, e) : null;
}
function Ul(e, t) {
  var n = fr;
  return e.current.memoizedState.isDehydrated && (Gt(e, t).flags |= 256), e = Ua(e, t), e !== 2 && (t = _e, _e = n, t !== null && Kl(t)), e;
}
function Kl(e) {
  _e === null ? _e = e : _e.push.apply(_e, e);
}
function Sh(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var a = n[r], o = a.getSnapshot;
        a = a.value;
        try {
          if (!Ge(o(), a)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function wt(e, t) {
  for (t &= ~Fi, t &= ~ro, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ue(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Gu(e) {
  if (z & 6) throw Error(w(327));
  Mn();
  var t = ba(e, 0);
  if (!(t & 1)) return xe(e, q()), null;
  var n = Ua(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = gl(e);
    r !== 0 && (t = r, n = Ul(e, r));
  }
  if (n === 1) throw n = Dr, Gt(e, 0), wt(e, t), xe(e, q()), n;
  if (n === 6) throw Error(w(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Wt(e, _e, rt), xe(e, q()), null;
}
function $i(e, t) {
  var n = z;
  z |= 1;
  try {
    return e(t);
  } finally {
    z = n, z === 0 && (In = q() + 500, Ja && Ft());
  }
}
function Jt(e) {
  xt !== null && xt.tag === 0 && !(z & 6) && Mn();
  var t = z;
  z |= 1;
  var n = ze.transition, r = O;
  try {
    if (ze.transition = null, O = 1, e) return e();
  } finally {
    O = r, ze.transition = n, z = t, !(z & 6) && Ft();
  }
}
function Ri() {
  Ne = Sn.current, H(Sn);
}
function Gt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Zp(n)), J !== null) for (n = J.return; n !== null; ) {
    var r = n;
    switch (Si(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && La();
        break;
      case 3:
        An(), H(we), H(pe), ji();
        break;
      case 5:
        Mi(r);
        break;
      case 4:
        An();
        break;
      case 13:
        H(U);
        break;
      case 19:
        H(U);
        break;
      case 10:
        Ti(r.type._context);
        break;
      case 22:
      case 23:
        Ri();
    }
    n = n.return;
  }
  if (re = e, J = e = Lt(e.current, null), ie = Ne = t, te = 0, Dr = null, Fi = ro = qt = 0, _e = fr = null, Ut !== null) {
    for (t = 0; t < Ut.length; t++) if (n = Ut[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var a = r.next, o = n.pending;
      if (o !== null) {
        var l = o.next;
        o.next = a, r.next = l;
      }
      n.pending = r;
    }
    Ut = null;
  }
  return e;
}
function gf(e, t) {
  do {
    var n = J;
    try {
      if (xi(), pa.current = Ra, $a) {
        for (var r = K.memoizedState; r !== null; ) {
          var a = r.queue;
          a !== null && (a.pending = null), r = r.next;
        }
        $a = !1;
      }
      if (Xt = 0, ne = ee = K = null, cr = !1, jr = 0, zi.current = null, n === null || n.return === null) {
        te = 1, Dr = t, J = null;
        break;
      }
      e: {
        var o = e, l = n.return, s = n, u = t;
        if (t = ie, s.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, m = s, h = m.tag;
          if (!(m.mode & 1) && (h === 0 || h === 11 || h === 15)) {
            var f = m.alternate;
            f ? (m.updateQueue = f.updateQueue, m.memoizedState = f.memoizedState, m.lanes = f.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var y = Au(l);
          if (y !== null) {
            y.flags &= -257, Pu(y, l, s, o, t), y.mode & 1 && Du(o, c, t), t = y, u = c;
            var v = t.updateQueue;
            if (v === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(u), t.updateQueue = S;
            } else v.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Du(o, c, t), Hi();
              break e;
            }
            u = Error(w(426));
          }
        } else if (B && s.mode & 1) {
          var L = Au(l);
          if (L !== null) {
            !(L.flags & 65536) && (L.flags |= 256), Pu(L, l, s, o, t), wi(Pn(u, s));
            break e;
          }
        }
        o = u = Pn(u, s), te !== 4 && (te = 2), fr === null ? fr = [o] : fr.push(o), o = l;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = qd(o, u, t);
              bu(o, p);
              break e;
            case 1:
              s = u;
              var d = o.type, g = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (jt === null || !jt.has(g)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var _ = Jd(o, s, t);
                bu(o, _);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      _f(n);
    } catch (x) {
      t = x, J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function yf() {
  var e = Ha.current;
  return Ha.current = Ra, e === null ? Ra : e;
}
function Hi() {
  (te === 0 || te === 3 || te === 2) && (te = 4), re === null || !(qt & 268435455) && !(ro & 268435455) || wt(re, ie);
}
function Ua(e, t) {
  var n = z;
  z |= 2;
  var r = yf();
  (re !== e || ie !== t) && (rt = null, Gt(e, t));
  do
    try {
      wh();
      break;
    } catch (a) {
      gf(e, a);
    }
  while (!0);
  if (xi(), z = n, Ha.current = r, J !== null) throw Error(w(261));
  return re = null, ie = 0, te;
}
function wh() {
  for (; J !== null; ) vf(J);
}
function kh() {
  for (; J !== null && !Vm(); ) vf(J);
}
function vf(e) {
  var t = wf(e.alternate, e, Ne);
  e.memoizedProps = e.pendingProps, t === null ? _f(e) : J = t, zi.current = null;
}
function _f(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = hh(n, t), n !== null) {
        n.flags &= 32767, J = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        te = 6, J = null;
        return;
      }
    } else if (n = ph(n, t, Ne), n !== null) {
      J = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      J = t;
      return;
    }
    J = t = e;
  } while (t !== null);
  te === 0 && (te = 5);
}
function Wt(e, t, n) {
  var r = O, a = ze.transition;
  try {
    ze.transition = null, O = 1, xh(e, t, n, r);
  } finally {
    ze.transition = a, O = r;
  }
  return null;
}
function xh(e, t, n, r) {
  do
    Mn();
  while (xt !== null);
  if (z & 6) throw Error(w(327));
  n = e.finishedWork;
  var a = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(w(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (rp(e, o), e === re && (J = re = null, ie = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || oa || (oa = !0, kf(Na, function() {
    return Mn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ze.transition, ze.transition = null;
    var l = O;
    O = 1;
    var s = z;
    z |= 4, zi.current = null, yh(e, n), mf(n, e), Bp(kl), Ca = !!wl, kl = wl = null, e.current = n, vh(n), Qm(), z = s, O = l, ze.transition = o;
  } else e.current = n;
  if (oa && (oa = !1, xt = e, Ba = a), o = e.pendingLanes, o === 0 && (jt = null), Xm(n.stateNode), xe(e, q()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], r(a.value, { componentStack: a.stack, digest: a.digest });
  if (Wa) throw Wa = !1, e = Wl, Wl = null, e;
  return Ba & 1 && e.tag !== 0 && Mn(), o = e.pendingLanes, o & 1 ? e === Bl ? mr++ : (mr = 0, Bl = e) : mr = 0, Ft(), null;
}
function Mn() {
  if (xt !== null) {
    var e = qc(Ba), t = ze.transition, n = O;
    try {
      if (ze.transition = null, O = 16 > e ? 16 : e, xt === null) var r = !1;
      else {
        if (e = xt, xt = null, Ba = 0, z & 6) throw Error(w(331));
        var a = z;
        for (z |= 4, C = e.current; C !== null; ) {
          var o = C, l = o.child;
          if (C.flags & 16) {
            var s = o.deletions;
            if (s !== null) {
              for (var u = 0; u < s.length; u++) {
                var c = s[u];
                for (C = c; C !== null; ) {
                  var m = C;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      dr(8, m, o);
                  }
                  var h = m.child;
                  if (h !== null) h.return = m, C = h;
                  else for (; C !== null; ) {
                    m = C;
                    var f = m.sibling, y = m.return;
                    if (cf(m), m === c) {
                      C = null;
                      break;
                    }
                    if (f !== null) {
                      f.return = y, C = f;
                      break;
                    }
                    C = y;
                  }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var S = v.child;
                if (S !== null) {
                  v.child = null;
                  do {
                    var L = S.sibling;
                    S.sibling = null, S = L;
                  } while (S !== null);
                }
              }
              C = o;
            }
          }
          if (o.subtreeFlags & 2064 && l !== null) l.return = o, C = l;
          else e: for (; C !== null; ) {
            if (o = C, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                dr(9, o, o.return);
            }
            var p = o.sibling;
            if (p !== null) {
              p.return = o.return, C = p;
              break e;
            }
            C = o.return;
          }
        }
        var d = e.current;
        for (C = d; C !== null; ) {
          l = C;
          var g = l.child;
          if (l.subtreeFlags & 2064 && g !== null) g.return = l, C = g;
          else e: for (l = d; C !== null; ) {
            if (s = C, s.flags & 2048) try {
              switch (s.tag) {
                case 0:
                case 11:
                case 15:
                  no(9, s);
              }
            } catch (x) {
              Q(s, s.return, x);
            }
            if (s === l) {
              C = null;
              break e;
            }
            var _ = s.sibling;
            if (_ !== null) {
              _.return = s.return, C = _;
              break e;
            }
            C = s.return;
          }
        }
        if (z = a, Ft(), et && typeof et.onPostCommitFiberRoot == "function") try {
          et.onPostCommitFiberRoot(Qa, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      O = n, ze.transition = t;
    }
  }
  return !1;
}
function Vu(e, t, n) {
  t = Pn(n, t), t = qd(e, t, 1), e = Mt(e, t, 1), t = ge(), e !== null && (Pr(e, 1, t), xe(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3) Vu(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Vu(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (jt === null || !jt.has(r))) {
        e = Pn(n, e), e = Jd(t, e, 1), t = Mt(t, e, 1), e = ge(), t !== null && (Pr(t, 1, e), xe(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Th(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ge(), e.pingedLanes |= e.suspendedLanes & n, re === e && (ie & n) === n && (te === 4 || te === 3 && (ie & 130023424) === ie && 500 > q() - Oi ? Gt(e, 0) : Fi |= n), xe(e, t);
}
function Sf(e, t) {
  t === 0 && (e.mode & 1 ? (t = Yr, Yr <<= 1, !(Yr & 130023424) && (Yr = 4194304)) : t = 1);
  var n = ge();
  e = dt(e, t), e !== null && (Pr(e, t, n), xe(e, n));
}
function Nh(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Sf(e, n);
}
function bh(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, a = e.memoizedState;
      a !== null && (n = a.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(w(314));
  }
  r !== null && r.delete(t), Sf(e, n);
}
var wf;
wf = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || we.current) Se = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return Se = !1, mh(e, t, n);
    Se = !!(e.flags & 131072);
  }
  else Se = !1, B && t.flags & 1048576 && Td(t, Pa, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ga(e, t), e = t.pendingProps;
      var a = En(t, pe.current);
      Cn(t, n), a = Li(null, t, r, e, a, n);
      var o = Di();
      return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ke(r) ? (o = !0, Da(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, bi(t), a.updater = to, t.stateNode = a, a._reactInternals = t, Ll(t, r, e, n), t = Pl(null, t, r, !0, o, n)) : (t.tag = 0, B && o && _i(t), he(null, t, a, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ga(e, t), e = t.pendingProps, a = r._init, r = a(r._payload), t.type = r, a = t.tag = Mh(r), e = Re(r, e), a) {
          case 0:
            t = Al(null, t, r, e, n);
            break e;
          case 1:
            t = Fu(null, t, r, e, n);
            break e;
          case 11:
            t = Iu(null, t, r, e, n);
            break e;
          case 14:
            t = zu(null, t, r, Re(r.type, e), n);
            break e;
        }
        throw Error(w(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), Al(e, t, r, a, n);
    case 1:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), Fu(e, t, r, a, n);
    case 3:
      e: {
        if (rf(t), e === null) throw Error(w(387));
        r = t.pendingProps, o = t.memoizedState, a = o.element, Ed(e, t), Fa(t, r, null, n);
        var l = t.memoizedState;
        if (r = l.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          a = Pn(Error(w(423)), t), t = Ou(e, t, r, n, a);
          break e;
        } else if (r !== a) {
          a = Pn(Error(w(424)), t), t = Ou(e, t, r, n, a);
          break e;
        } else for (Ce = Ct(t.stateNode.containerInfo.firstChild), Me = t, B = !0, We = null, n = Md(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Ln(), r === a) {
            t = ft(e, t, n);
            break e;
          }
          he(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Ld(t), e === null && Ml(t), r = t.type, a = t.pendingProps, o = e !== null ? e.memoizedProps : null, l = a.children, xl(r, a) ? l = null : o !== null && xl(r, o) && (t.flags |= 32), nf(e, t), he(e, t, l, n), t.child;
    case 6:
      return e === null && Ml(t), null;
    case 13:
      return af(e, t, n);
    case 4:
      return Ci(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Dn(t, null, r, n) : he(e, t, r, n), t.child;
    case 11:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), Iu(e, t, r, a, n);
    case 7:
      return he(e, t, t.pendingProps, n), t.child;
    case 8:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, a = t.pendingProps, o = t.memoizedProps, l = a.value, $(Ia, r._currentValue), r._currentValue = l, o !== null) if (Ge(o.value, l)) {
          if (o.children === a.children && !we.current) {
            t = ft(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var s = o.dependencies;
          if (s !== null) {
            l = o.child;
            for (var u = s.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = st(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var m = c.pending;
                    m === null ? u.next = u : (u.next = m.next, m.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), jl(
                  o.return,
                  n,
                  t
                ), s.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) l = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (l = o.return, l === null) throw Error(w(341));
            l.lanes |= n, s = l.alternate, s !== null && (s.lanes |= n), jl(l, n, t), l = o.sibling;
          } else l = o.child;
          if (l !== null) l.return = o;
          else for (l = o; l !== null; ) {
            if (l === t) {
              l = null;
              break;
            }
            if (o = l.sibling, o !== null) {
              o.return = l.return, l = o;
              break;
            }
            l = l.return;
          }
          o = l;
        }
        he(e, t, a.children, n), t = t.child;
      }
      return t;
    case 9:
      return a = t.type, r = t.pendingProps.children, Cn(t, n), a = Fe(a), r = r(a), t.flags |= 1, he(e, t, r, n), t.child;
    case 14:
      return r = t.type, a = Re(r, t.pendingProps), a = Re(r.type, a), zu(e, t, r, a, n);
    case 15:
      return ef(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), ga(e, t), t.tag = 1, ke(r) ? (e = !0, Da(t)) : e = !1, Cn(t, n), Xd(t, r, a), Ll(t, r, a, n), Pl(null, t, r, !0, e, n);
    case 19:
      return of(e, t, n);
    case 22:
      return tf(e, t, n);
  }
  throw Error(w(156, t.tag));
};
function kf(e, t) {
  return Qc(e, t);
}
function Ch(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ie(e, t, n, r) {
  return new Ch(e, t, n, r);
}
function Wi(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Mh(e) {
  if (typeof e == "function") return Wi(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ii) return 11;
    if (e === si) return 14;
  }
  return 2;
}
function Lt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ie(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function _a(e, t, n, r, a, o) {
  var l = 2;
  if (r = e, typeof e == "function") Wi(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else e: switch (e) {
    case cn:
      return Vt(n.children, a, o, t);
    case li:
      l = 8, a |= 8;
      break;
    case tl:
      return e = Ie(12, n, t, a | 2), e.elementType = tl, e.lanes = o, e;
    case nl:
      return e = Ie(13, n, t, a), e.elementType = nl, e.lanes = o, e;
    case rl:
      return e = Ie(19, n, t, a), e.elementType = rl, e.lanes = o, e;
    case Lc:
      return ao(n, a, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case jc:
          l = 10;
          break e;
        case Ec:
          l = 9;
          break e;
        case ii:
          l = 11;
          break e;
        case si:
          l = 14;
          break e;
        case yt:
          l = 16, r = null;
          break e;
      }
      throw Error(w(130, e == null ? e : typeof e, ""));
  }
  return t = Ie(l, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
}
function Vt(e, t, n, r) {
  return e = Ie(7, e, r, t), e.lanes = n, e;
}
function ao(e, t, n, r) {
  return e = Ie(22, e, r, t), e.elementType = Lc, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function $o(e, t, n) {
  return e = Ie(6, e, null, t), e.lanes = n, e;
}
function Ro(e, t, n) {
  return t = Ie(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function jh(e, t, n, r, a) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = So(0), this.expirationTimes = So(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = So(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
}
function Bi(e, t, n, r, a, o, l, s, u) {
  return e = new jh(e, t, n, s, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ie(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, bi(o), e;
}
function Eh(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: un, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function xf(e) {
  if (!e) return Pt;
  e = e._reactInternals;
  e: {
    if (tn(e) !== e || e.tag !== 1) throw Error(w(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ke(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(w(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ke(n)) return kd(e, n, t);
  }
  return t;
}
function Tf(e, t, n, r, a, o, l, s, u) {
  return e = Bi(n, r, !0, e, a, o, l, s, u), e.context = xf(null), n = e.current, r = ge(), a = Et(n), o = st(r, a), o.callback = t ?? null, Mt(n, o, a), e.current.lanes = a, Pr(e, a, r), xe(e, r), e;
}
function oo(e, t, n, r) {
  var a = t.current, o = ge(), l = Et(a);
  return n = xf(n), t.context === null ? t.context = n : t.pendingContext = n, t = st(o, l), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Mt(a, t, l), e !== null && (Ke(e, a, l, o), ma(e, a, l)), l;
}
function Ka(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Qu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ui(e, t) {
  Qu(e, t), (e = e.alternate) && Qu(e, t);
}
function Lh() {
  return null;
}
var Nf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ki(e) {
  this._internalRoot = e;
}
lo.prototype.render = Ki.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(w(409));
  oo(e, t, null, null);
};
lo.prototype.unmount = Ki.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Jt(function() {
      oo(null, e, null, null);
    }), t[ct] = null;
  }
};
function lo(e) {
  this._internalRoot = e;
}
lo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = td();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < St.length && t !== 0 && t < St[n].priority; n++) ;
    St.splice(n, 0, e), n === 0 && rd(e);
  }
};
function Gi(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function io(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Yu() {
}
function Dh(e, t, n, r, a) {
  if (a) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = Ka(l);
        o.call(c);
      };
    }
    var l = Tf(t, r, e, 0, null, !1, !1, "", Yu);
    return e._reactRootContainer = l, e[ct] = l.current, Tr(e.nodeType === 8 ? e.parentNode : e), Jt(), l;
  }
  for (; a = e.lastChild; ) e.removeChild(a);
  if (typeof r == "function") {
    var s = r;
    r = function() {
      var c = Ka(u);
      s.call(c);
    };
  }
  var u = Bi(e, 0, !1, null, null, !1, !1, "", Yu);
  return e._reactRootContainer = u, e[ct] = u.current, Tr(e.nodeType === 8 ? e.parentNode : e), Jt(function() {
    oo(t, u, n, r);
  }), u;
}
function so(e, t, n, r, a) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof a == "function") {
      var s = a;
      a = function() {
        var u = Ka(l);
        s.call(u);
      };
    }
    oo(t, l, e, a);
  } else l = Dh(n, t, e, a, r);
  return Ka(l);
}
Jc = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = nr(t.pendingLanes);
        n !== 0 && (di(t, n | 1), xe(t, q()), !(z & 6) && (In = q() + 500, Ft()));
      }
      break;
    case 13:
      Jt(function() {
        var r = dt(e, 1);
        if (r !== null) {
          var a = ge();
          Ke(r, e, 1, a);
        }
      }), Ui(e, 1);
  }
};
fi = function(e) {
  if (e.tag === 13) {
    var t = dt(e, 134217728);
    if (t !== null) {
      var n = ge();
      Ke(t, e, 134217728, n);
    }
    Ui(e, 134217728);
  }
};
ed = function(e) {
  if (e.tag === 13) {
    var t = Et(e), n = dt(e, t);
    if (n !== null) {
      var r = ge();
      Ke(n, e, t, r);
    }
    Ui(e, t);
  }
};
td = function() {
  return O;
};
nd = function(e, t) {
  var n = O;
  try {
    return O = e, t();
  } finally {
    O = n;
  }
};
ml = function(e, t, n) {
  switch (t) {
    case "input":
      if (ll(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var a = qa(r);
            if (!a) throw Error(w(90));
            Ac(r), ll(r, a);
          }
        }
      }
      break;
    case "textarea":
      Ic(e, n);
      break;
    case "select":
      t = n.value, t != null && xn(e, !!n.multiple, t, !1);
  }
};
Wc = $i;
Bc = Jt;
var Ah = { usingClientEntryPoint: !1, Events: [zr, pn, qa, Rc, Hc, $i] }, Yn = { findFiberByHostInstance: Bt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Ph = { bundleType: Yn.bundleType, version: Yn.version, rendererPackageName: Yn.rendererPackageName, rendererConfig: Yn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: mt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Gc(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Yn.findFiberByHostInstance || Lh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var la = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!la.isDisabled && la.supportsFiber) try {
    Qa = la.inject(Ph), et = la;
  } catch {
  }
}
Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ah;
Le.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Gi(t)) throw Error(w(200));
  return Eh(e, t, null, n);
};
Le.createRoot = function(e, t) {
  if (!Gi(e)) throw Error(w(299));
  var n = !1, r = "", a = Nf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = Bi(e, 1, !1, null, null, n, !1, r, a), e[ct] = t.current, Tr(e.nodeType === 8 ? e.parentNode : e), new Ki(t);
};
Le.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(w(188)) : (e = Object.keys(e).join(","), Error(w(268, e)));
  return e = Gc(t), e = e === null ? null : e.stateNode, e;
};
Le.flushSync = function(e) {
  return Jt(e);
};
Le.hydrate = function(e, t, n) {
  if (!io(t)) throw Error(w(200));
  return so(null, e, t, !0, n);
};
Le.hydrateRoot = function(e, t, n) {
  if (!Gi(e)) throw Error(w(405));
  var r = n != null && n.hydratedSources || null, a = !1, o = "", l = Nf;
  if (n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), t = Tf(t, null, e, 1, n ?? null, a, !1, o, l), e[ct] = t.current, Tr(e), r) for (e = 0; e < r.length; e++) n = r[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(
    n,
    a
  );
  return new lo(t);
};
Le.render = function(e, t, n) {
  if (!io(t)) throw Error(w(200));
  return so(null, e, t, !1, n);
};
Le.unmountComponentAtNode = function(e) {
  if (!io(e)) throw Error(w(40));
  return e._reactRootContainer ? (Jt(function() {
    so(null, null, e, !1, function() {
      e._reactRootContainer = null, e[ct] = null;
    });
  }), !0) : !1;
};
Le.unstable_batchedUpdates = $i;
Le.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!io(n)) throw Error(w(200));
  if (e == null || e._reactInternals === void 0) throw Error(w(38));
  return so(e, t, n, !1, r);
};
Le.version = "18.3.1-next-f1338f8080-20240426";
function bf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(bf);
    } catch (e) {
      console.error(e);
    }
}
bf(), Nc.exports = Le;
var Ih = Nc.exports, Zu = Ih;
Dt.createRoot = Zu.createRoot, Dt.hydrateRoot = Zu.hydrateRoot;
const je = typeof window < "u" && window.__WOOF_CAL_CONFIG__ ? window.__WOOF_CAL_CONFIG__ : {};
je.workerUrl;
je.turnstileWidgetSelector;
je.turnstileSiteKey;
Object.freeze(
  Array.isArray(je.turnstileAllowedHostnames) && je.turnstileAllowedHostnames.length > 0 ? je.turnstileAllowedHostnames.map((e) => String(e || "").trim().toLowerCase()).filter(Boolean) : ["andreww0421.github.io"]
);
je.serviceWorkerPath;
const zh = Number(je.dailyAiLimit) || 20, Fh = je.usageKey || "woofCal_usage";
je.storageSchemaKey;
Number(je.appSchemaVersion);
je.diagnosticsKey;
Number(je.maxDiagnosticEvents);
function me(e = /* @__PURE__ */ new Date()) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ga(e) {
  if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e))
    return null;
  const [t, n, r] = e.split("-"), a = Number(t), o = Number(n), l = Number(r);
  if (!Number.isInteger(a) || !Number.isInteger(o) || !Number.isInteger(l))
    return null;
  const s = new Date(a, o - 1, l);
  return s.getFullYear() !== a || s.getMonth() !== o - 1 || s.getDate() !== l ? null : s;
}
function Oh(e, {
  max: t = me(),
  fallback: n = me()
} = {}) {
  const r = Ga(e);
  if (!r) return n;
  const a = Ga(t), o = me(r);
  return a && o > me(a) ? me(a) : o;
}
function Cf(e, t = 0, {
  fallback: n = me()
} = {}) {
  const r = Ga(e) || Ga(n) || /* @__PURE__ */ new Date(), a = new Date(r);
  return a.setDate(a.getDate() + (Number(t) || 0)), me(a);
}
function Vi(e, t = null) {
  if (typeof e != "string" || e === "") return t;
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}
const Mf = Object.freeze({
  calories: Object.freeze({ aliases: ["cal"] }),
  protein: Object.freeze({ aliases: [] }),
  fat: Object.freeze({ aliases: [] }),
  carbohydrate: Object.freeze({ aliases: ["carb"] }),
  sugar: Object.freeze({ aliases: [] }),
  sodium: Object.freeze({ aliases: ["sod"] }),
  saturatedFat: Object.freeze({ aliases: ["sat"] }),
  transFat: Object.freeze({ aliases: ["trans"] }),
  fiber: Object.freeze({ aliases: [] })
}), $n = Object.freeze(Object.keys(Mf));
function Xu(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function $h(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const o = Math.min(Math.max(a, t), n);
  if (r === null) return o;
  const l = 10 ** r;
  return Math.round(o * l) / l;
}
function Rh(e) {
  const t = Xu(e) ? e : {}, n = Xu(t.nutri) ? t.nutri : null;
  return n ? [n, t] : [t];
}
function Hh(e, t, n) {
  const r = [t, ...n], a = Rh(e);
  for (const o of a)
    for (const l of r) {
      const s = o == null ? void 0 : o[l];
      if (s != null && s !== "")
        return s;
    }
  return 0;
}
function Wh() {
  return Object.fromEntries($n.map((e) => [e, 0]));
}
function Te(e = {}, t = {}) {
  const { fieldOptions: n = {} } = t;
  return Object.fromEntries($n.map((r) => {
    const a = Mf[r], o = Hh(e, r, a.aliases);
    return [r, $h(o, n[r])];
  }));
}
function Or(e = {}, t = {}) {
  return Te(e, t);
}
function Qi(e = {}) {
  const t = Te(e);
  return $n.some((n) => t[n] !== 0);
}
function Zn(e) {
  return typeof e == "function";
}
function Bh(e) {
  return !!e && Zn(e.getItem) && Zn(e.setItem) && Zn(e.removeItem) && Zn(e.clear) && Zn(e.key) && typeof e.length == "number";
}
function Uh(e) {
  if (!Bh(e))
    throw new Error("Invalid storage adapter");
  return e;
}
function Kh() {
  return globalThis.localStorage;
}
function Gh(e = Kh) {
  const t = () => {
    const n = typeof e == "function" ? e() : e;
    return Uh(n);
  };
  return {
    kind: "localStorage",
    get length() {
      return t().length;
    },
    key(n) {
      return t().key(n);
    },
    getItem(n) {
      return t().getItem(n);
    },
    setItem(n, r) {
      t().setItem(n, r);
    },
    removeItem(n) {
      t().removeItem(n);
    },
    clear() {
      t().clear();
    }
  };
}
const Vh = Gh();
let Qh = Vh;
function uo(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function jf() {
  return Qh;
}
function $r(e) {
  return jf().getItem(e);
}
function Ef(e, t) {
  jf().setItem(e, t);
}
function Yi(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Lf(e) {
  return Array.isArray(e) ? e.filter(uo).map((t) => ({
    name: String(t.name ?? "").trim(),
    weight: String(t.weight ?? "").trim()
  })).filter((t) => t.name || t.weight) : [];
}
function Yh(e) {
  if (!uo(e)) return null;
  const t = Te(e), n = Lf(e.items), r = {
    type: String(e.type || "snack"),
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Yi(e.healthScore ?? 0)
  };
  return r.name || n.length || Qi(t) ? r : null;
}
function Zh(e) {
  if (!uo(e)) return null;
  const t = Te(e), n = Lf(e.items), r = {
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Yi(e.healthScore ?? 0)
  };
  return r.name || n.length || Qi(t) ? r : null;
}
function Xh(e) {
  return uo(e) ? {
    gender: String(e.gender || "male"),
    age: String(e.age ?? ""),
    height: String(e.height ?? ""),
    weight: String(e.weight ?? ""),
    activity: String(e.activity || "1.2"),
    mealMode: String(e.mealMode || "4"),
    goalType: String(e.goalType || "lose"),
    region: String(e.region || "").trim(),
    diningOutFrequency: String(e.diningOutFrequency || "sometimes").trim() || "sometimes"
  } : null;
}
function qh(e, t) {
  return Array.isArray(e) ? e.map(t).filter(Boolean) : [];
}
function Df(e, t) {
  const n = Vi($r(e), []), r = qh(n, t);
  return JSON.stringify(n) !== JSON.stringify(r) && Ef(e, JSON.stringify(r)), r;
}
function Af(e = me()) {
  return Oh(String(e || me()));
}
function Jh() {
  return Df("myFavorites", Zh);
}
function Pf(e, t) {
  return $r(e) || t;
}
function Zi(e) {
  return Df(`record_${e}`, Yh);
}
function eg(e) {
  const t = $r(`weight_${e}`);
  if (!t) return null;
  const n = parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function tg() {
  const e = Xh(Vi($r("myProfile_v5"), null));
  return e ? (Ef("myProfile_v5", JSON.stringify(e)), e) : null;
}
function ng(e = 7, t = me()) {
  const n = [], r = Af(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = Cf(r, -a), l = Zi(o);
    let s = 0;
    l.forEach((u) => {
      var c;
      s += Yi((c = u == null ? void 0 : u.nutri) == null ? void 0 : c.calories);
    }), n.push({ date: o.slice(5), calories: Math.round(s) });
  }
  return n;
}
function rg(e = 7, t = me()) {
  const n = [], r = Af(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = Cf(r, -a);
    n.push({
      date: o,
      label: o.slice(5),
      items: Zi(o)
    });
  }
  return n;
}
function ag() {
  const e = me(), t = Vi($r(Fh), {});
  return (t == null ? void 0 : t.date) !== e ? { date: e, count: 0 } : {
    date: e,
    count: Number(t.count) || 0
  };
}
function og(e) {
  return Zi(e);
}
function If(e = 7, t) {
  return ng(e, t);
}
function zf(e = 7, t) {
  return rg(e, t);
}
function lg() {
  return Jh();
}
function ig() {
  return tg();
}
const sg = Object.freeze(["zh-TW", "zh-CN", "en"]);
function Ff(e, t = "zh-TW") {
  const n = String(e || "").trim();
  return sg.includes(n) ? n : t;
}
function ug() {
  return Ff(Pf("appLang", "zh-TW"));
}
function cg() {
  return Pf("appTheme", "light");
}
function dg() {
  return ag();
}
function fg(e) {
  return eg(e);
}
function mg(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Of(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const o = mg(a, t, n);
  if (r === null) return o;
  const l = 10 ** r;
  return Math.round(o * l) / l;
}
function qu(e) {
  const t = String((e == null ? void 0 : e.name) ?? "").trim(), n = String((e == null ? void 0 : e.weight) ?? "").trim();
  return !t && !n ? null : { name: t, weight: n };
}
function Ju(e) {
  return {
    name: String((e == null ? void 0 : e.name) ?? "").trim(),
    weight: String((e == null ? void 0 : e.weight) ?? "").trim()
  };
}
function ec(e = []) {
  return Array.isArray(e) ? e.map((t) => {
    if (!t || typeof t != "object") return null;
    const n = String(t.type || "").trim(), r = String(t.timestamp || "").trim();
    return !n || !r ? null : {
      type: n,
      timestamp: r,
      itemIndex: Number.isInteger(t.itemIndex) ? t.itemIndex : void 0,
      field: t.field ? String(t.field) : void 0,
      previousValue: t.previousValue !== void 0 ? String(t.previousValue) : void 0,
      nextValue: t.nextValue !== void 0 ? String(t.nextValue) : void 0,
      itemName: t.itemName !== void 0 ? String(t.itemName) : void 0,
      weight: t.weight !== void 0 ? String(t.weight) : void 0,
      itemCount: t.itemCount !== void 0 ? Math.max(0, Math.round(Number(t.itemCount) || 0)) : void 0
    };
  }).filter(Boolean) : [];
}
function pg(e = {}, t = {}) {
  const {
    fallbackName: n = "",
    fallbackItems: r = []
  } = t, a = Array.isArray(e.items) ? e.items.map(qu).filter(Boolean) : r.map(qu).filter(Boolean), o = Te(e, {
    fieldOptions: {
      calories: { max: 5e3, digits: 0 },
      protein: { max: 300, digits: 1 },
      fat: { max: 300, digits: 1 },
      carbohydrate: { max: 500, digits: 1 },
      sugar: { max: 300, digits: 1 },
      sodium: { max: 2e4, digits: 0 },
      saturatedFat: { max: 150, digits: 1 },
      transFat: { max: 50, digits: 1 },
      fiber: { max: 150, digits: 1 }
    }
  }), l = {
    foodName: String(e.foodName ?? e.name ?? n ?? "").trim() || "Food Analysis",
    ...o,
    healthScore: Of(e.healthScore, { max: 10, digits: 1 }),
    items: a
  };
  if (!(Qi(o) || l.items.length > 0))
    throw new Error("AI_INVALID_PAYLOAD");
  return l;
}
function hg(e, t = {}) {
  if (!e || typeof e != "object") return null;
  const {
    fallbackName: n = "",
    fallbackItems: r = [],
    preferredName: a = "",
    correctionHistory: o = (e == null ? void 0 : e.correctionHistory) || []
  } = t, l = e.nutri !== void 0 || e.correctionHistory !== void 0, s = Array.isArray(e.items) ? e.items.map(Ju) : r.map(Ju);
  if (l)
    return {
      name: String(e.name || a || n || "").trim() || "Food Analysis",
      nutri: Te(e.nutri !== void 0 ? e.nutri : e),
      items: s,
      healthScore: Of(e.healthScore, { max: 10, digits: 1 }),
      correctionHistory: ec(o)
    };
  const u = pg(e, {
    fallbackName: n,
    fallbackItems: r
  });
  return {
    name: String(a || u.foodName || n || "").trim() || "Food Analysis",
    nutri: Te(u),
    items: u.items,
    healthScore: u.healthScore,
    correctionHistory: ec(o)
  };
}
const tc = {
  4: [
    { type: "breakfast", titleKey: "breakfast", ratio: 0.25 },
    { type: "lunch", titleKey: "lunch", ratio: 0.35 },
    { type: "dinner", titleKey: "dinner", ratio: 0.3 },
    { type: "snack", titleKey: "snack", ratio: 0.1 }
  ],
  3: [
    { type: "breakfast", titleKey: "breakfast", ratio: 0.3 },
    { type: "lunch", titleKey: "lunch", ratio: 0.4 },
    { type: "dinner", titleKey: "dinner", ratio: 0.3 }
  ],
  2: [
    { type: "lunch", titleKey: "meal1", ratio: 0.5 },
    { type: "dinner", titleKey: "meal2", ratio: 0.5 }
  ],
  1: [
    { type: "dinner", titleKey: "mealBig", ratio: 1 }
  ]
}, $f = {
  lose: {
    calorieAdjustment: -500,
    proteinPerKg: 2,
    fatPerKg: 0.8
  },
  maintain: {
    calorieAdjustment: 0,
    proteinPerKg: 1.6,
    fatPerKg: 0.8
  },
  gain: {
    calorieAdjustment: 250,
    proteinPerKg: 2.2,
    fatPerKg: 0.9
  }
};
function V(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function co(e = 0, { weightKg: t = 0, goalType: n = "lose" } = {}) {
  const r = Math.max(0, Math.round(V(e))), a = Math.max(0, V(t)), o = gg(n);
  if (a > 0) {
    const l = $f[o], s = Math.max(0, Math.round(a * l.proteinPerKg)), u = Math.max(0, Math.round(a * l.fatPerKg)), c = Math.max(r - s * 4 - u * 9, 0);
    return {
      protein: s,
      fat: u,
      carb: Math.round(c / 4),
      sugar: Math.round(r * 0.1 / 4),
      saturatedFat: Math.round(r * 0.1 / 9)
    };
  }
  return {
    protein: Math.round(r * 0.2 / 4),
    fat: Math.round(r * 0.3 / 9),
    carb: Math.round(r * 0.5 / 4),
    sugar: Math.round(r * 0.1 / 4),
    saturatedFat: Math.round(r * 0.1 / 9)
  };
}
function gg(e = "lose") {
  const t = String(e || "lose");
  return $f[t] ? t : "lose";
}
function yg(e = "4", t = {}, n = 0) {
  return (tc[String(e)] || tc[4]).map((a) => ({
    ...a,
    title: (t == null ? void 0 : t[a.titleKey]) || a.type,
    suggestedCalories: n > 0 ? Math.round(n * a.ratio) : 0
  }));
}
function Rr(e = []) {
  const t = { cal: 0, pro: 0, fat: 0, carb: 0, sugar: 0, sod: 0, sat: 0, trans: 0, fiber: 0 }, n = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
  return e.forEach((r) => {
    const a = (r == null ? void 0 : r.nutri) || {};
    t.cal += V(a.calories), t.pro += V(a.protein), t.fat += V(a.fat), t.carb += V(a.carbohydrate), t.sugar += V(a.sugar), t.sod += V(a.sodium), t.sat += V(a.saturatedFat), t.trans += V(a.transFat), t.fiber += V(a.fiber), n[r == null ? void 0 : r.type] !== void 0 && (n[r.type] += V(a.calories));
  }), { totals: t, mealTotals: n };
}
function vg(e = []) {
  const t = e.filter((o) => V(o == null ? void 0 : o.calories) > 0), n = t.reduce((o, l) => o + V(l == null ? void 0 : l.calories), 0), r = t.length > 0 ? Math.round(n / t.length) : 0, a = t.reduce((o, l) => o ? V(l.calories) > V(o.calories) ? l : o : l, null);
  return {
    loggedDays: t.length,
    averageCalories: r,
    bestDayLabel: (a == null ? void 0 : a.date) || "--",
    bestDayCalories: Math.round(V(a == null ? void 0 : a.calories))
  };
}
function _g({ total: e = {}, targetCalories: t = 0, calorieHistory: n = [], goalType: r = "lose", weightKg: a = 0 } = {}) {
  const o = V(t), l = co(o, {
    goalType: r,
    weightKg: a
  }), s = V(e.cal), u = V(e.pro), c = V(e.fiber), m = V(e.sod);
  let h = "steady";
  s <= 0 ? h = "start_logging" : o > 0 && s > o * 1.08 ? h = "over_target" : u < l.protein * 0.65 ? h = "protein_gap" : c > 0 && c < 18 ? h = "fiber_gap" : m > 2300 ? h = "sodium_high" : o > 0 && s >= o * 0.85 && (h = "near_goal");
  const f = [];
  return s <= 0 ? f.push("use_ai", "log_first_meal") : (u < l.protein * 0.85 && f.push("protein_boost"), c < 25 && f.push("fiber_boost"), m > 2300 && f.push("watch_sodium"), o > 0 && s > o * 1.08 && f.push("portion_reset"), f.length === 0 && f.push("keep_momentum")), {
    status: h,
    targetCalories: o,
    calories: s,
    protein: u,
    fiber: c,
    sodium: m,
    remainingCalories: o > 0 ? Math.max(Math.round(o - s), 0) : 0,
    overCalories: o > 0 ? Math.max(Math.round(s - o), 0) : 0,
    proteinGap: Math.max(l.protein - Math.round(u), 0),
    fiberGap: Math.max(25 - Math.round(c), 0),
    tipKeys: [...new Set(f)].slice(0, 3),
    macroGoals: l,
    weekly: vg(n)
  };
}
const nc = /* @__PURE__ */ new Set();
function Sg(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    name: String((t == null ? void 0 : t.name) || ""),
    weight: String((t == null ? void 0 : t.weight) || "")
  })) : [];
}
function wg(e = {}) {
  return Or(e);
}
function Gl(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    type: String((t == null ? void 0 : t.type) || "snack"),
    name: String((t == null ? void 0 : t.name) || ""),
    nutri: wg(t),
    items: Sg(t == null ? void 0 : t.items),
    healthScore: Number(t == null ? void 0 : t.healthScore) || 0
  })) : [];
}
function Rf(e) {
  return hg(e);
}
function Hf(e) {
  return !e || typeof e != "object" ? null : {
    gender: String(e.gender || "male"),
    age: String(e.age ?? ""),
    height: String(e.height ?? ""),
    weight: String(e.weight ?? ""),
    activity: String(e.activity || "1.2"),
    mealMode: String(e.mealMode || "4"),
    goalType: String(e.goalType || "lose"),
    region: String(e.region || "").trim(),
    diningOutFrequency: String(e.diningOutFrequency || "sometimes").trim() || "sometimes"
  };
}
function kg(e = !1) {
  return {
    status: "idle",
    source: "none",
    cooldownRemaining: 0,
    quotaExceeded: !!e,
    isSoftError: !1,
    lastError: "",
    verificationUnavailable: !1,
    verificationMessage: ""
  };
}
function Wf(e = {}, t = !1) {
  const n = kg(t);
  return {
    status: String((e == null ? void 0 : e.status) || n.status),
    source: String((e == null ? void 0 : e.source) || n.source),
    cooldownRemaining: Math.max(0, Number(e == null ? void 0 : e.cooldownRemaining) || 0),
    quotaExceeded: (e == null ? void 0 : e.quotaExceeded) !== void 0 ? !!e.quotaExceeded : n.quotaExceeded,
    isSoftError: !!(e != null && e.isSoftError),
    lastError: String((e == null ? void 0 : e.lastError) || ""),
    verificationUnavailable: !!(e != null && e.verificationUnavailable),
    verificationMessage: String((e == null ? void 0 : e.verificationMessage) || "")
  };
}
function xg(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function Tg(e = {}) {
  const t = String(e.selectedDate || me()), n = Hf(e.profile !== void 0 ? e.profile : ig()), r = String(e.currentMealMode || (n == null ? void 0 : n.mealMode) || "4"), a = String(e.currentGoalType || (n == null ? void 0 : n.goalType) || "lose"), l = dg().count >= zh;
  return {
    selectedDate: t,
    curLang: Ff(e.curLang || ug()),
    curTheme: String(e.curTheme || cg()),
    targetCalories: xg(e.targetCalories, 2e3),
    currentMealMode: r,
    currentGoalType: a,
    loggedWeight: e.loggedWeight ?? fg(t),
    foodItems: Gl(e.foodItems !== void 0 ? e.foodItems : og(t)),
    favoriteFoods: Gl(e.favoriteFoods !== void 0 ? e.favoriteFoods : lg()),
    tempAIResult: Rf(e.tempAIResult),
    tempAIResultSaved: !!e.tempAIResultSaved,
    analysisFlow: Wf(e.analysisFlow, l),
    profile: n
  };
}
const Ng = Object.freeze([
  "foodItems",
  "favoriteFoods",
  "tempAIResult",
  "profile",
  "analysisFlow"
]);
function bg(e, t) {
  switch (e) {
    case "foodItems":
    case "favoriteFoods":
      return Gl(t[e]);
    case "tempAIResult":
      return Rf(t.tempAIResult);
    case "profile":
      return Hf(t.profile);
    case "analysisFlow":
      return Wf(t.analysisFlow);
    default:
      return t[e];
  }
}
function Cg(e, t = null, n = null) {
  const r = Object.fromEntries(
    Ng.map((a) => [
      a,
      t && n && !n.has(a) ? t[a] : bg(a, e)
    ])
  );
  return Object.freeze({
    ...e,
    ...r,
    updatedAt: Date.now()
  });
}
let Mg = Tg(), Vl = Cg(Mg);
function se() {
  return Vl;
}
function jg(e) {
  return typeof e != "function" ? () => {
  } : (nc.add(e), () => {
    nc.delete(e);
  });
}
function Eg(e = Vl) {
  var a;
  const t = e || Vl, n = Rr(t.foodItems), r = Math.max(0, Number((a = t.profile) == null ? void 0 : a.weight) || 0);
  return {
    selectedDate: t.selectedDate,
    lang: t.curLang,
    goalType: t.currentGoalType,
    targetCalories: Number(t.targetCalories) || 0,
    profileWeight: r,
    waterTarget: Math.round((r || 60) * 35),
    calorieHistory: If(7, t.selectedDate),
    foodItems: t.foodItems,
    totals: n.totals,
    mealTotals: n.mealTotals
  };
}
const Lg = Object.freeze({
  getAppState: se,
  subscribeAppState: jg
});
function Dg() {
  var t;
  const e = (t = globalThis.window) == null ? void 0 : t.__woofAppStateBridge;
  return typeof (e == null ? void 0 : e.getAppState) == "function" && typeof (e == null ? void 0 : e.subscribeAppState) == "function" ? e : Lg;
}
function Rn() {
  const e = Dg();
  return X.useSyncExternalStore(
    e.subscribeAppState,
    e.getAppState,
    se
  );
}
function Xi(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = Xi(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
function qi(e) {
  return `${Math.round(Number(e) || 0)} kcal`;
}
const Ji = {
  heroEyebrowEmpty: "Companion check-in",
  heroEyebrowActive: "Today with your companion",
  heroTitleEmpty: "Start your first meal today",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `${e}/${t} meal moments logged today`,
  heroSummaryBase: "Keep the companion card as the hero so Home stays easy to scan, not form-heavy.",
  heroSummaryActive: "You already have momentum. Keep the next log small, clear, and easy to review.",
  heroActionLog: "Add meal",
  heroActionCommonFoods: "Common foods",
  heroActionManual: "Manual entry",
  heroActionFavorites: "Favorites",
  headlineEmpty: "Start your first meal",
  headlineProgress: "Nice momentum today",
  headlineComplete: "Great progress today",
  dailyCaloriesTitle: "Daily calories",
  remainingLabel: "Remaining",
  macroFocusEyebrow: "3 macro focus",
  macroFocusTitle: "Macros",
  macroFocusHint: "Open the nutrition summary to review all 8 nutrient fields.",
  mealDiaryEyebrow: "Meal diary",
  previousDate: "Previous date",
  nextDate: "Next date",
  appName: "Woof Cal",
  screenTitle: "Today",
  logHubTitle: "Log today's meals",
  logHubCopyEmpty: "Choose the fastest path first, then keep detailed editing in the secondary flow.",
  logHubCopyActive: "Keep logging easy here, then open the deeper flow only when you need detailed edits.",
  logHubFavoritesButton: "Favorites",
  logHubFavoritesCopy: "Pick from foods you save often.",
  logHubManualButton: "Add food",
  logHubManualCopy: "Open Add and start directly with AI photo analysis.",
  mealListTitle: "Today's meals",
  commonFoodsTitle: "Common foods",
  commonFoodsHint: "Start from a familiar meal and adjust only when you need to.",
  commonFoodsMeta: (e) => `${e} suggestions`,
  commonFoodsButton: "Add this meal to today",
  commonFoodsAdvancedButton: "Use this in manual entry",
  manualAdvancedTitle: "Advanced manual entry",
  manualModalTitle: "Manual meal entry",
  manualModalHint: "Use this when you need a custom food or full nutrition details.",
  todayMealsKicker: "Daily diary",
  todayMealsTitle: "Today's meals",
  todayMealsHint: "Keep today visible here without turning Home into a form.",
  overviewTitle: "Today at a glance",
  overviewHint: "Open the full nutrition summary",
  signals: {
    protein: "Protein pace",
    meals: "Meal rhythm"
  },
  signalProteinToGoal: (e) => `${e}g to goal`,
  signalProteinOnTrack: "Protein is on track",
  signalMealsEmpty: "Log the first meal to start today's rhythm.",
  signalMealsActive: (e, t, n) => e < t && n ? `${e}/${t} logged. ${n} is the next anchor.` : `${e} meal moments logged today.`,
  statLabels: {
    streak: "Streak",
    meals: "Meals",
    protein: "Protein"
  },
  petStage: {
    kicker: "Interactive companion",
    bondLabel: "Bond",
    energyLabel: "Energy",
    streakLabel: "Streak",
    dayUnit: "d",
    tapLabel: "Interact with your companion",
    tapHint: "Tap the dog for a mood check.",
    nextMealHint: "Next: {meal}",
    feedAction: "Feed / add meal",
    carePanelLabel: "Companion nutrition status"
  },
  formatDayCount: (e) => `${e}d`,
  formatMealCoverage: (e, t) => `${e}/${t}`,
  formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`,
  quickActions: "Quick actions",
  today: "Today",
  overview: "Signals",
  pet: "Companion status",
  progress: "Progress",
  companion: "Start your first meal today",
  quickLog: "Quick logging",
  summary: "A calmer read on today, with the next action close by.",
  open: "Open",
  changeDate: "Change date",
  statusOnTrack: "On track",
  statusKeepGoing: "Keep going",
  emptyMeal: "Nothing logged yet",
  caloriesRemaining: (e = 0) => `${Number(e) || 0} kcal left`,
  proteinRemaining: (e = 0) => `${Number(e) || 0}g to goal`,
  proteinOnTrack: "Protein is on track today",
  metrics: {
    calories: "Calories",
    protein: "Protein",
    meals: "Meals"
  },
  mealGroupMeta: (e, t) => `${Number(e) || 0} items / ${qi(t)}`
}, Ag = Xi(Ji, {
  heroEyebrowEmpty: "陪伴狀態",
  heroEyebrowActive: "今天和汪卡一起記錄",
  heroTitleEmpty: "先記下今天的第一餐",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今天已記錄 ${e}/${t} 次餐食`,
  heroSummaryBase: "把寵物卡放回首頁主角，首頁只保留最重要的進度與下一步，不再像一張大表單。",
  heroSummaryActive: "你今天已經有節奏了。下一筆只要維持簡潔，回顧就會更輕鬆。",
  heroActionLog: "新增餐點",
  heroActionCommonFoods: "常用餐點",
  heroActionManual: "手動輸入",
  heroActionFavorites: "常吃收藏",
  headlineEmpty: "先開始今天第一餐",
  headlineProgress: "今天節奏不錯",
  headlineComplete: "今天進度很穩",
  dailyCaloriesTitle: "今日熱量",
  remainingLabel: "剩餘",
  macroFocusEyebrow: "三大營養重點",
  macroFocusTitle: "三大營養素",
  macroFocusHint: "打開營養摘要即可查看完整 8 項營養資訊。",
  mealDiaryEyebrow: "餐點日記",
  previousDate: "前一天",
  nextDate: "後一天",
  screenTitle: "今天",
  logHubTitle: "記錄今天的飲食",
  logHubCopyEmpty: "先用最快的入口開始，把細節編輯留給下一步。",
  logHubCopyActive: "這裡維持快速記錄，真的需要細修時再往後走。",
  logHubFavoritesButton: "常吃收藏",
  logHubFavoritesCopy: "從你常吃的食物裡快速加入。",
  logHubManualButton: "新增食物",
  logHubManualCopy: "前往新增介面，直接使用 AI 照片分析食物。",
  mealListTitle: "今天吃了什麼",
  commonFoodsTitle: "常用餐點",
  commonFoodsHint: "先從熟悉的餐點開始，再按需要微調。",
  commonFoodsMeta: (e) => `${e} 推薦`,
  commonFoodsButton: "直接加入今天",
  commonFoodsAdvancedButton: "改用手動輸入微調",
  manualAdvancedTitle: "進階手動輸入",
  manualModalTitle: "手動新增餐點",
  manualModalHint: "當你需要完整自訂食物與營養內容時再使用。",
  todayMealsKicker: "飲食日記",
  todayMealsTitle: "今天的餐點",
  todayMealsHint: "今天吃過的內容都整理在這裡，首頁保持乾淨好讀。",
  overviewTitle: "今天先看這些",
  overviewHint: "點開即可查看完整營養摘要",
  signals: {
    protein: "蛋白質節奏",
    meals: "餐次節奏"
  },
  signalProteinToGoal: (e) => `距離目標還差 ${e}g`,
  signalProteinOnTrack: "蛋白質攝取節奏正常",
  signalMealsEmpty: "記下第一餐，就能開始建立今天的節奏。",
  signalMealsActive: (e, t, n) => e < t && n ? `已記錄 ${e}/${t} 次餐食，下一步可先安排 ${n}。` : `今天已記錄 ${e} 次餐食。`,
  statLabels: {
    streak: "連續",
    meals: "餐次",
    protein: "蛋白質"
  },
  petStage: {
    kicker: "互動汪卡",
    bondLabel: "羈絆",
    energyLabel: "能量",
    streakLabel: "連續",
    dayUnit: "天",
    tapLabel: "和夥伴互動",
    tapHint: "點一下狗狗，看看牠現在的心情。",
    nextMealHint: "下一餐：{meal}",
    feedAction: "餵食 / 新增餐點",
    carePanelLabel: "狗狗營養狀態"
  },
  quickActions: "快速操作",
  today: "今天",
  overview: "今日重點",
  pet: "陪伴狀態",
  progress: "進度",
  companion: "先記下今天的第一餐",
  quickLog: "快速記錄",
  summary: "先看今天的進度，再用最輕的方式記下下一餐。",
  open: "查看",
  changeDate: "選擇日期",
  statusOnTrack: "節奏穩定",
  statusKeepGoing: "繼續保持",
  emptyMeal: "還沒有記錄",
  caloriesRemaining: (e = 0) => `還剩 ${Number(e) || 0} kcal`,
  proteinRemaining: (e = 0) => `蛋白質還差 ${Number(e) || 0}g`,
  proteinOnTrack: "蛋白質表現穩定",
  metrics: {
    calories: "熱量",
    protein: "蛋白質",
    meals: "餐次"
  },
  mealGroupMeta: (e, t) => `${Number(e) || 0} 項 / ${qi(t)}`
}), Pg = Xi(Ji, {
  heroEyebrowEmpty: "陪伴状态",
  heroEyebrowActive: "今天和汪卡一起记录",
  heroTitleEmpty: "先记下今天的第一餐",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今天已记录 ${e}/${t} 次餐食`,
  heroSummaryBase: "把宠物卡放回首页主角，首页只保留最重要的进度与下一步，不再像一张大表单。",
  heroSummaryActive: "你今天已经有节奏了。下一笔只要保持简洁，回顾就会更轻松。",
  heroActionLog: "新增餐点",
  heroActionCommonFoods: "常用餐点",
  heroActionManual: "手动输入",
  heroActionFavorites: "常吃收藏",
  headlineEmpty: "先开始今天第一餐",
  headlineProgress: "今天节奏不错",
  headlineComplete: "今天进度很稳",
  dailyCaloriesTitle: "今日热量",
  remainingLabel: "剩余",
  macroFocusEyebrow: "三大营养重点",
  macroFocusTitle: "三大营养素",
  macroFocusHint: "打开营养摘要即可查看完整 8 项营养信息。",
  mealDiaryEyebrow: "餐点日记",
  previousDate: "前一天",
  nextDate: "后一天",
  screenTitle: "今天",
  logHubTitle: "记录今天的饮食",
  logHubCopyEmpty: "先用最快的入口开始，把细节编辑留到下一步。",
  logHubCopyActive: "这里保持快速记录，真的需要细调时再往后走。",
  logHubFavoritesButton: "常吃收藏",
  logHubFavoritesCopy: "从你常吃的食物里快速加入。",
  logHubManualButton: "新增食物",
  logHubManualCopy: "前往新增界面，直接使用 AI 照片分析食物。",
  mealListTitle: "今天吃了什么",
  commonFoodsTitle: "常用餐点",
  commonFoodsHint: "先从熟悉的餐点开始，再按需要微调。",
  commonFoodsMeta: (e) => `${e} 推荐`,
  commonFoodsButton: "直接加入今天",
  commonFoodsAdvancedButton: "改用手动输入微调",
  manualAdvancedTitle: "进阶手动输入",
  manualModalTitle: "手动新增餐点",
  manualModalHint: "当你需要完整自定义食物与营养内容时再使用。",
  todayMealsKicker: "饮食日记",
  todayMealsTitle: "今天的餐点",
  todayMealsHint: "今天吃过的内容都整理在这里，首页保持干净好读。",
  overviewTitle: "今天先看这些",
  overviewHint: "点开即可查看完整营养摘要",
  signals: {
    protein: "蛋白质节奏",
    meals: "餐次节奏"
  },
  signalProteinToGoal: (e) => `距离目标还差 ${e}g`,
  signalProteinOnTrack: "蛋白质摄取节奏正常",
  signalMealsEmpty: "记下第一餐，就能开始建立今天的节奏。",
  signalMealsActive: (e, t, n) => e < t && n ? `已记录 ${e}/${t} 次餐食，下一步可先安排 ${n}。` : `今天已记录 ${e} 次餐食。`,
  statLabels: {
    streak: "连续",
    meals: "餐次",
    protein: "蛋白质"
  },
  petStage: {
    kicker: "互动汪卡",
    bondLabel: "羁绊",
    energyLabel: "能量",
    streakLabel: "连续",
    dayUnit: "天",
    tapLabel: "和伙伴互动",
    tapHint: "点一下狗狗，看看它现在的心情。",
    nextMealHint: "下一餐：{meal}",
    feedAction: "喂食 / 新增餐点",
    carePanelLabel: "狗狗营养状态"
  },
  quickActions: "快速操作",
  today: "今天",
  overview: "今日重点",
  pet: "陪伴状态",
  progress: "进度",
  companion: "先记下今天的第一餐",
  quickLog: "快速记录",
  summary: "先看今天的进度，再用最轻的方式记下下一餐。",
  open: "查看",
  changeDate: "选择日期",
  statusOnTrack: "节奏稳定",
  statusKeepGoing: "继续保持",
  emptyMeal: "还没有记录",
  caloriesRemaining: (e = 0) => `还剩 ${Number(e) || 0} kcal`,
  proteinRemaining: (e = 0) => `蛋白质还差 ${Number(e) || 0}g`,
  proteinOnTrack: "蛋白质表现稳定",
  metrics: {
    calories: "热量",
    protein: "蛋白质",
    meals: "餐次"
  },
  mealGroupMeta: (e, t) => `${Number(e) || 0} 项 / ${qi(t)}`
}), Ho = {
  en: Ji,
  "zh-TW": Ag,
  "zh-CN": Pg
};
function es(e = "en") {
  return Ho[e] || Ho[String(e || "en").split("-")[0]] || Ho.en;
}
const Ig = {
  appTitle: "Woof Cal - AI Diet Tracker"
}, zg = {
  appTitle: "Woof Cal 汪卡管家",
  dateLabel: "日期",
  totalIntake: "今日摄取",
  goal: "目标",
  cal: "热量",
  pro: "蛋白质",
  fat: "脂肪",
  carb: "碳水",
  sugar: "糖",
  sod: "钠",
  sat: "饱和脂肪",
  trans: "反式脂肪",
  water: "水分",
  chartTitle: "营养分析",
  chartMacro: "三大营养素",
  chartWeekly: "每周热量",
  aiTitle: "AI 分析",
  btnPhoto: "打开相机",
  btnAnalyze: "送出分析",
  aiLoading: "AI 正在分析餐点...",
  aiDescPlaceholder: "补充说明，例如：牛肉面、不加葱",
  recordTitle: "饮食记录",
  manualLabel: "手动输入",
  btnAdd: "加入记录",
  btnFavSave: "保存常吃",
  btnFavLoad: "打开常吃",
  btnFavAi: "加入常吃",
  settingsTitle: "个人设置",
  gender: "性别",
  male: "男",
  female: "女",
  age: "年龄",
  height: "身高",
  weight: "体重",
  activity: "活动量",
  act1: "久坐",
  act2: "轻度活动",
  act3: "中度活动",
  act4: "高度活动",
  mealMode: "餐次模式",
  mode4: "标准 (3 餐 + 点心)",
  mode3: "3 餐",
  mode2: "2 餐 (16:8)",
  mode1: "1 餐 (OMAD)",
  btnCalc: "保存设置",
  resTdee: "TDEE",
  resTarget: "建议目标",
  modalTitle: "AI 分析结果",
  modalAsk: "这是哪一餐？",
  btnCancel: "取消",
  favTitle: "常吃食物",
  btnClose: "关闭",
  menuImport: "导入备份",
  menuExport: "导出备份",
  menuTheme: "外观设置",
  menuLang: "语言设置",
  suggest: "建议",
  langTitle: "语言",
  langCancel: "取消",
  alertDel: "确定要删除这条记录吗？",
  alertFavAdded: "已加入常吃。",
  alertFavExist: "这条数据已经在常吃列表中。",
  alertSelImg: "请先选择图片。",
  alertAiFail: "AI 分析失败：",
  alertFill: "请先填写必要字段。",
  alertNameCal: "请输入食物名称和热量。",
  alertImportOk: "备份已成功恢复。",
  alertImportFail: "备份文件格式不正确。",
  weightTitle: "体重记录",
  weightInputPlaceholder: "今天体重 (kg)",
  btnSaveWeight: "保存",
  weightChartTitle: "体重趋势",
  textAiLabel: "描述你吃了什么，或补充细节帮助 AI 更准确判断：",
  textAiPlaceholder: "例如：一碗牛肉面、青菜、无糖豆浆",
  appSettingsTitle: "App 设置",
  profileTargetsTitle: "个人营养目标",
  historyEyebrow: "每日回顾",
  historyTitle: "历史记录",
  navHome: "今天",
  navAdd: "新增",
  navHistory: "历史",
  navStats: "统计",
  navProfile: "我的",
  navDaily: "首页",
  navDashboard: "仪表板",
  navAi: "AI",
  navSettings: "设置",
  previousDate: "前一天",
  nextDate: "后一天",
  txtWeightSettingsTitle: "体重 (kg)",
  alertWeightSaved: "体重已保存。",
  alertInvalidWeight: "请输入有效的体重数值。",
  alertSelImgOrText: "请先选择图片或输入文字描述。",
  petMsg1: "汪！今天想吃什么呢？",
  petMsg2: "已经有点能量了，再补一餐更稳。",
  petMsg3: "闻到香味了，快记下来吧。",
  petMsg4: "今天的节奏很稳，继续保持。",
  petMsg5: "今天吃得有点多，下一餐清爽一点。",
  petEatMsg: "汪呜汪呜，好吃！",
  petInteractMsg1: "今天有记得喝水吗？",
  petInteractMsg2: "稳定记录，比一次完美更重要。",
  petInteractMsg3: "蛋白质也很重要，别忘了补。",
  petInteractMsg4: "均衡饮食加一点活动，效果会更好。",
  petInteractMsg5: "慢慢吃，也会更有饱足感。",
  // 扩展宠物状态
  petMsgSleeping: "zzZ...（轻声呼噜）",
  petMsgLonely: "你终于回来了…我好想你",
  petMsgExcited: "全部完成！太厉害了！",
  petMsgCelebrating: "升级啦！耶耶耶！",
  petMsgStarving: "呜…主人忘记我了吗…",
  // 点击互动（按情绪）
  petTapHungry: "给我吃东西嘛～",
  petTapLow: "嗨主人！今天还好吗？",
  petTapMid: "继续加油！快到了～",
  petTapBalanced: "汪汪！最爱主人了！",
  petTapFull: "太饱了…让我躺一下…",
  petTapSleeping: "呼噜…（不要吵我嘛）",
  petTapLonely: "你回来了！！！",
  petTapStarving: "拜托…给我食物…",
  petTapExcited: "全部做完了！一起庆祝吧！",
  petTapCelebrating: "耶耶耶！升级了！",
  // 长按互动
  petLongPress1: "嗯～好舒服～",
  petLongPress2: "再摸一下嘛～",
  petLongPress3: "呼噜…（睡着了）",
  // 连击互动
  petCombo3: "好开心好开心！",
  petCombo5: "停不下来了！",
  petCombo7: "晕…头好晕…",
  // 宠物界面标签
  petBondLabel: "羁绊",
  petEnergyLabel: "能量",
  petStreakLabel: "连续",
  petDayUnit: "天",
  petTapLabel: "和伙伴互动",
  macroGoalTitle: "建议营养目标",
  txtTdeeUnit: "（每日总消耗）",
  txtResTarget: "建议目标",
  txtTargetCalDisplayUnit: "目标",
  phPro: "蛋白质",
  phFat: "脂肪",
  phCarb: "碳水",
  phSugar: "糖",
  phSod: "钠",
  phSat: "饱和脂肪",
  phTrans: "反式脂肪",
  phFiber: "纤维",
  txtManualLabel: "手动输入",
  btnAddRecord: "加入今天",
  txtRecordTitle: "饮食记录",
  phFoodName: "食物名称 (必填)",
  phFoodCal: "热量 (kcal) (必填)",
  chartCalTrend: "热量趋势",
  chartProteinTrend: "蛋白质趋势",
  chart7d: "7 天",
  chart30d: "30 天",
  chartTdeeTarget: "TDEE 目标",
  fiber: "纤维",
  healthScoreLabel: "健康评分",
  aiItemsLabel: "AI 预估食材",
  itemName: "食材",
  itemWeight: "重量",
  addItem: "新增食材",
  recalculate: "重新计算",
  unsavedWarning: "AI 分析结果尚未保存，确定要离开吗？",
  detailTitle: "营养细节",
  noData: "--",
  btnDetailClose: "关闭",
  aiQuotaExceededButton: "今日 AI 次数已满",
  aiQuotaExceededToast: "今天的 AI 分析次数已用完。",
  aiInvalidResponse: "AI 返回的营养数据不完整，请换一张更清楚的照片或补充文字后再试。",
  turnstilePending: "安全验证尚未完成，请稍后再试。",
  turnstileUnavailable: "当前这个域名无法使用安全验证，请改用正式站点。",
  turnstileSetupError: "安全验证初始化失败，请刷新页面后再试。",
  presetPanelTitle: "外食常用预设",
  presetPanelHint: "先套用地区餐点，再根据实际份量微调手动字段。",
  presetRegionLabel: "地区",
  presetFoodLabel: "餐点预设",
  presetApplyButton: "套用到手动输入",
  presetAppliedToast: "已套用餐点预设。",
  presetSelectPrompt: "请先选择一个餐点预设。",
  meals: {
    breakfast: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
    snack: "点心",
    meal1: "第一餐",
    meal2: "第二餐",
    mealBig: "唯一主餐"
  }
}, Fg = {
  appTitle: "Woof Cal 汪卡管家",
  dateLabel: "日期",
  totalIntake: "今日攝取",
  goal: "目標",
  cal: "熱量",
  pro: "蛋白質",
  fat: "脂肪",
  carb: "碳水",
  sugar: "糖",
  sod: "鈉",
  sat: "飽和脂肪",
  trans: "反式脂肪",
  water: "水分",
  chartTitle: "營養分析",
  chartMacro: "三大營養素",
  chartWeekly: "每週熱量",
  aiTitle: "AI 分析",
  btnPhoto: "開啟相機",
  btnAnalyze: "送出分析",
  aiLoading: "AI 正在分析餐點...",
  aiDescPlaceholder: "補充說明，例如：牛肉麵、不加蔥",
  recordTitle: "飲食記錄",
  manualLabel: "手動輸入",
  btnAdd: "加入記錄",
  btnFavSave: "儲存常吃",
  btnFavLoad: "開啟常吃",
  btnFavAi: "加入常吃",
  settingsTitle: "個人設定",
  gender: "性別",
  male: "男",
  female: "女",
  age: "年齡",
  height: "身高",
  weight: "體重",
  activity: "活動量",
  act1: "久坐",
  act2: "輕度活動",
  act3: "中度活動",
  act4: "高度活動",
  mealMode: "餐次模式",
  mode4: "標準 (3 餐 + 點心)",
  mode3: "3 餐",
  mode2: "2 餐 (16:8)",
  mode1: "1 餐 (OMAD)",
  btnCalc: "儲存設定",
  resTdee: "TDEE",
  resTarget: "建議目標",
  modalTitle: "AI 分析結果",
  modalAsk: "這是哪一餐？",
  btnCancel: "取消",
  favTitle: "常吃食物",
  btnClose: "關閉",
  menuImport: "匯入備份",
  menuExport: "匯出備份",
  menuTheme: "外觀設定",
  menuLang: "語言設定",
  suggest: "建議",
  langTitle: "語言",
  langCancel: "取消",
  alertDel: "確定要刪除這筆記錄嗎？",
  alertFavAdded: "已加入常吃。",
  alertFavExist: "這筆資料已經在常吃清單中。",
  alertSelImg: "請先選擇圖片。",
  alertAiFail: "AI 分析失敗：",
  alertFill: "請先填寫必要欄位。",
  alertNameCal: "請輸入食物名稱與熱量。",
  alertImportOk: "備份已成功還原。",
  alertImportFail: "備份檔格式不正確。",
  weightTitle: "體重記錄",
  weightInputPlaceholder: "今天體重 (kg)",
  btnSaveWeight: "儲存",
  weightChartTitle: "體重趨勢",
  textAiLabel: "描述你吃了什麼，或補充細節幫助 AI 更準確判讀：",
  textAiPlaceholder: "例如：一碗牛肉麵、青菜、無糖豆漿",
  appSettingsTitle: "App 設定",
  profileTargetsTitle: "個人營養目標",
  historyEyebrow: "每日回顧",
  historyTitle: "歷史紀錄",
  navHome: "今天",
  navAdd: "新增",
  navHistory: "歷史",
  navStats: "統計",
  navProfile: "我的",
  navDaily: "首頁",
  navDashboard: "儀表板",
  navAi: "AI",
  navSettings: "設定",
  previousDate: "前一天",
  nextDate: "後一天",
  txtWeightSettingsTitle: "體重 (kg)",
  alertWeightSaved: "體重已儲存。",
  alertInvalidWeight: "請輸入有效的體重數值。",
  alertSelImgOrText: "請先選擇圖片或輸入文字描述。",
  petMsg1: "汪！今天想吃什麼呢？",
  petMsg2: "有點能量了，再補一餐更剛好。",
  petMsg3: "聞到食物香氣了，快記下來吧。",
  petMsg4: "今天的節奏很穩，繼續保持。",
  petMsg5: "今天吃得有點多，下一餐清爽一點。",
  petEatMsg: "汪嗚汪嗚，好吃！",
  petInteractMsg1: "今天有記得喝水嗎？",
  petInteractMsg2: "穩定記錄，比一次完美更重要。",
  petInteractMsg3: "蛋白質也很重要，別忘了補。",
  petInteractMsg4: "均衡飲食加上一點活動，效果會更好。",
  petInteractMsg5: "慢慢吃，也比較有飽足感。",
  // 擴展寵物狀態
  petMsgSleeping: "zzZ...（輕聲呼嚕）",
  petMsgLonely: "你終於回來了…我好想你",
  petMsgExcited: "全部完成！太厲害了！",
  petMsgCelebrating: "升級啦！耶耶耶！",
  petMsgStarving: "嗚…主人忘記我了嗎…",
  // 點擊互動（依情緒）
  petTapHungry: "給我吃東西嘛～",
  petTapLow: "嗨主人！今天還好嗎？",
  petTapMid: "繼續加油！快到了～",
  petTapBalanced: "汪汪！最愛主人了！",
  petTapFull: "太飽了…讓我躺一下…",
  petTapSleeping: "呼嚕…（不要吵我嘛）",
  petTapLonely: "你回來了！！！",
  petTapStarving: "拜託…給我食物…",
  petTapExcited: "全部做完了！一起慶祝吧！",
  petTapCelebrating: "耶耶耶！升級了！",
  // 長按互動
  petLongPress1: "嗯～好舒服～",
  petLongPress2: "再摸一下嘛～",
  petLongPress3: "呼嚕…（睡著了）",
  // 連擊互動
  petCombo3: "好開心好開心！",
  petCombo5: "停不下來了！",
  petCombo7: "暈…頭好暈…",
  // 寵物介面標籤
  petBondLabel: "羈絆",
  petEnergyLabel: "能量",
  petStreakLabel: "連續",
  petDayUnit: "天",
  petTapLabel: "和夥伴互動",
  macroGoalTitle: "建議營養目標",
  txtTdeeUnit: "（每日總消耗）",
  txtResTarget: "建議目標",
  txtTargetCalDisplayUnit: "目標",
  phPro: "蛋白質",
  phFat: "脂肪",
  phCarb: "碳水",
  phSugar: "糖",
  phSod: "鈉",
  phSat: "飽和脂肪",
  phTrans: "反式脂肪",
  phFiber: "纖維",
  txtManualLabel: "手動輸入",
  btnAddRecord: "加入今天",
  txtRecordTitle: "飲食記錄",
  phFoodName: "食物名稱 (必填)",
  phFoodCal: "熱量 (kcal) (必填)",
  chartCalTrend: "熱量趨勢",
  chartProteinTrend: "蛋白質趨勢",
  chart7d: "7 天",
  chart30d: "30 天",
  chartTdeeTarget: "TDEE 目標",
  fiber: "纖維",
  healthScoreLabel: "健康評分",
  aiItemsLabel: "AI 預估食材",
  itemName: "食材",
  itemWeight: "重量",
  addItem: "新增食材",
  recalculate: "重新計算",
  unsavedWarning: "AI 分析結果尚未儲存，確定要離開嗎？",
  detailTitle: "營養細節",
  noData: "--",
  btnDetailClose: "關閉",
  aiQuotaExceededButton: "今日 AI 次數已滿",
  aiQuotaExceededToast: "今天的 AI 分析次數已用完。",
  aiInvalidResponse: "AI 回傳的營養資料不完整，請換一張更清楚的照片或補充文字後再試。",
  turnstilePending: "安全驗證尚未完成，請稍後再試。",
  turnstileUnavailable: "目前這個網域無法使用安全驗證，請改用正式站點。",
  turnstileSetupError: "安全驗證初始化失敗，請重新整理後再試。",
  presetPanelTitle: "外食常用預設",
  presetPanelHint: "先套用地區餐點，再依實際份量微調手動欄位。",
  presetRegionLabel: "地區",
  presetFoodLabel: "餐點預設",
  presetApplyButton: "套用到手動輸入",
  presetAppliedToast: "已套用餐點預設。",
  presetSelectPrompt: "請先選擇一個餐點預設。",
  meals: {
    breakfast: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
    snack: "點心",
    meal1: "第一餐",
    meal2: "第二餐",
    mealBig: "唯一主餐"
  }
}, Ql = {
  "zh-TW": Fg,
  "zh-CN": zg,
  en: Ig
}, Og = {
  appTitle: "Woof Cal - AI Diet Tracker",
  dateLabel: "Date:",
  totalIntake: "Total Intake",
  goal: "Goal",
  cal: "Calories",
  pro: "Protein",
  fat: "Fat",
  carb: "Carb",
  sugar: "Sugar",
  sod: "Sodium",
  sat: "Sat. Fat",
  trans: "Trans Fat",
  water: "Water",
  chartTitle: "Nutrition Analysis",
  aiTitle: "AI Analysis",
  btnPhoto: "Open camera",
  btnAnalyze: "Analyze meal",
  aiLoading: "AI is analyzing...",
  aiDescPlaceholder: "Optional description (for example: beef noodles, no onions)",
  recordTitle: "Food Log",
  manualLabel: "Manual Entry",
  placeholderName: "Food Name",
  placeholderCal: "Calories",
  btnAdd: "Add Log",
  btnFavSave: "Save Favorite",
  btnFavLoad: "Load Favorite",
  btnFavAi: "Save to Favorites",
  settingsTitle: "Profile Settings",
  gender: "Gender",
  male: "Male",
  female: "Female",
  age: "Age",
  height: "Height",
  weight: "Weight",
  activity: "Activity Level",
  act1: "Sedentary",
  act2: "Lightly Active",
  act3: "Moderately Active",
  act4: "Very Active",
  mealMode: "Meal Mode",
  mode4: "Standard (3 meals + snack)",
  mode3: "3 Meals",
  mode2: "2 Meals (16:8)",
  mode1: "OMAD",
  btnCalc: "Save & Update",
  resTdee: "TDEE",
  resTarget: "Target",
  modalTitle: "AI Report",
  modalAsk: "Which meal is this?",
  btnCancel: "Cancel",
  favTitle: "Favorite Foods",
  btnClose: "Close",
  menuImport: "Import Data",
  menuExport: "Export Data",
  menuTheme: "Switch Theme",
  menuLang: "Language",
  suggest: "Goal",
  langTitle: "Language",
  langCancel: "Cancel",
  alertDel: "Delete this item?",
  alertFavAdded: "Saved to favorites.",
  alertFavExist: "Already saved in favorites.",
  alertSelImg: "Please select an image first.",
  alertAiFail: "AI analysis failed: ",
  alertFill: "Please fill in the required fields.",
  alertNameCal: "Please enter a food name and calories.",
  alertImportOk: "Data restored successfully.",
  alertImportFail: "Invalid backup file.",
  weightTitle: "Weight Record",
  weightInputPlaceholder: "Today's weight (kg)",
  btnSaveWeight: "Save",
  weightChartTitle: "Weight Trend (Last 30 Days)",
  textAiLabel: "Describe what you ate or add details to improve AI accuracy:",
  textAiPlaceholder: "For example: a bowl of beef noodles with vegetables",
  appSettingsTitle: "App Settings",
  profileTargetsTitle: "Personal Nutrition Targets",
  historyEyebrow: "Daily Review",
  historyTitle: "History",
  navHome: "Today",
  navAdd: "Add",
  navHistory: "History",
  navStats: "Stats",
  navProfile: "Profile",
  navDaily: "Home",
  navDashboard: "Insights",
  navAi: "AI",
  navSettings: "Settings",
  previousDate: "Previous date",
  nextDate: "Next date",
  txtWeightSettingsTitle: "Weight (kg)",
  alertWeightSaved: "Weight saved successfully.",
  alertInvalidWeight: "Please enter a valid weight.",
  alertSelImgOrText: "Please select an image or enter a description.",
  petMsg1: "Hungry... (0%)",
  petMsg2: "Getting some energy...",
  petMsg3: "Smelled food. Searching...",
  petMsg4: "Nice balance today.",
  petMsg5: "That was a lot of food.",
  petEatMsg: "Nom nom...",
  petInteractMsg1: "Did you drink water today?",
  petInteractMsg2: "Keep the rhythm going.",
  petInteractMsg3: "Protein helps recovery too.",
  petInteractMsg4: "A steady routine wins.",
  petInteractMsg5: "Slow chewing helps satiety.",
  // Extended pet states
  petMsgSleeping: "zzZ... (soft snoring)",
  petMsgLonely: "You came back... I missed you!",
  petMsgExcited: "All quests done! Amazing!",
  petMsgCelebrating: "Level up! Woo-hoo!",
  petMsgStarving: "So hungry... did you forget me?",
  // Tap interactions by mood
  petTapHungry: "Feed me something~",
  petTapLow: "Hey there! How are you today?",
  petTapMid: "Keep going! Almost there~",
  petTapBalanced: "Woof! You're the best!",
  petTapFull: "Too full... let me rest...",
  petTapSleeping: "Zzz... (don't wake me)",
  petTapLonely: "You're back!!!",
  petTapStarving: "Please... food...",
  petTapExcited: "Everything done! Let's celebrate!",
  petTapCelebrating: "Yay yay yay! Leveled up!",
  // Long press interactions
  petLongPress1: "Mmm~ that feels nice~",
  petLongPress2: "Pet me more~",
  petLongPress3: "Zzz... (fell asleep)",
  // Combo interactions
  petCombo3: "So happy so happy!",
  petCombo5: "Can't stop spinning!",
  petCombo7: "Dizzy... head is spinning...",
  // Pet stage labels
  petBondLabel: "Bond",
  petEnergyLabel: "Energy",
  petStreakLabel: "Streak",
  petDayUnit: "d",
  petTapLabel: "Interact with your companion",
  macroGoalTitle: "Recommended Macros (Estimated)",
  txtTdeeUnit: " (Total Energy Expenditure)",
  txtResTarget: "Target Goal",
  txtTargetCalDisplayUnit: "Goal",
  phPro: "Protein",
  phFat: "Fat",
  phCarb: "Carb",
  phSugar: "Sugar",
  phSod: "Sodium",
  phSat: "Sat. Fat",
  phTrans: "Trans Fat",
  phFiber: "Fiber",
  txtManualLabel: "Manual Entry",
  btnAddRecord: "Add Record",
  txtRecordTitle: "Diet Record",
  phFoodName: "Food Name (Required)",
  phFoodCal: "Calories (kcal) (Required)",
  chartMacro: "Macros (PFC)",
  chartWeekly: "Weekly Calories",
  chartCalTrend: "Calorie Intake Trend",
  chartProteinTrend: "Protein Intake Trend",
  chart7d: "7D",
  chart30d: "30D",
  chartTdeeTarget: "TDEE Target",
  fiber: "Fiber",
  healthScoreLabel: "Health Score",
  aiItemsLabel: "Estimated Food Items",
  itemName: "Item",
  itemWeight: "Weight",
  addItem: "+ Add Item",
  recalculate: "Recalculate",
  unsavedWarning: "Your AI nutrition result is not saved yet. Close anyway?",
  detailTitle: "Nutrition Details",
  noData: "--",
  btnDetailClose: "Close",
  aiQuotaExceededButton: "AI daily limit reached",
  aiQuotaExceededToast: "Today's AI limit has been used up.",
  aiInvalidResponse: "AI returned an incomplete nutrition result. Please try again with a clearer photo or description.",
  turnstilePending: "Security verification is still loading. Please try again in a moment.",
  turnstileUnavailable: "Security verification is unavailable on this domain. Use the production site or add this hostname to Turnstile.",
  turnstileSetupError: "Security verification could not be initialized. Reload the page and try again.",
  presetPanelTitle: "Dining-out presets",
  presetPanelHint: "Pick a regional preset, then fine-tune the manual fields if the dish differs.",
  presetRegionLabel: "Region",
  presetFoodLabel: "Preset meal",
  presetApplyButton: "Apply preset to manual entry",
  presetAppliedToast: "Preset applied to manual entry.",
  presetSelectPrompt: "Select a preset meal first.",
  meals: {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
    meal1: "Meal 1",
    meal2: "Meal 2",
    mealBig: "Big Meal"
  }
}, Wo = /* @__PURE__ */ new Map();
function Bo(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Bf(e, t) {
  const n = { ...e };
  return Bo(t) && Object.entries(t).forEach(([r, a]) => {
    if (Bo(a) && Bo(e[r])) {
      n[r] = Bf(e[r], a);
      return;
    }
    a != null && (n[r] = a);
  }), n;
}
function pt(e = "zh-TW") {
  const t = String(e || "zh-TW");
  if (!Wo.has(t)) {
    const n = Bf(
      Og,
      Ql[t] || Ql.en || {}
    );
    Wo.set(t, n);
  }
  return Wo.get(t);
}
Object.freeze(Object.keys(Ql));
const $g = {
  detail: {
    overviewTitle: "營養快照",
    overviewSummary: "在決定下一步之前，先用更平靜的方式看這餐的營養輪廓。",
    sections: {
      quality: {
        title: "品質訊號",
        summary: "這些營養通常最能影響飽足感與整體平衡。"
      },
      fatDetails: {
        title: "脂肪細節",
        summary: "多一點脂肪品質的資訊，但不把畫面變複雜。"
      }
    }
  },
  trend: {
    title: "營養焦點",
    subtitle: "今天 + 最近 7 天",
    headlines: {
      start_logging: "記錄幾餐後，完整的營養故事才會開始出現",
      protein: "今天最值得補的是蛋白質",
      fiber: "纖維還可以再拉高一點",
      sodium: "下一餐清淡一點會更平衡",
      balanced: "今天目前的營養分配算穩"
    },
    summaries: {
      start_logging: "多幾筆記錄後，這張卡就會開始讀出蛋白質、纖維與鈉的模式。",
      protein: (e) => `和最近 ${e} 天相比，今天最值得優先補的是蛋白質。`,
      fiber: (e) => `和最近 ${e} 天相比，纖維是最容易先補齊的一塊。`,
      sodium: (e) => `和最近 ${e} 天相比，今天的鈉有點偏高。`,
      balanced: (e) => `和最近 ${e} 天相比，今天目前的營養節奏算穩。`
    },
    signalLabels: {
      protein: "蛋白質節奏",
      fiber: "纖維支援",
      sodium: "鈉平衡"
    },
    signalDetails: {
      protein: ({ average: e }) => e > 0 ? `7 天平均 ${e}g` : "先累積幾筆記錄再看節奏",
      fiber: ({ average: e }) => e > 0 ? `7 天平均 ${e}g` : "先累積幾筆記錄再看節奏",
      sodium: ({ average: e }) => e > 0 ? `7 天平均 ${e}mg` : "先累積幾筆記錄再看節奏"
    },
    signalValue: {
      protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
      fiber: ({ current: e }) => `${e}g`,
      sodium: ({ current: e }) => `${e}mg`
    }
  }
}, Rg = {
  detail: {
    overviewTitle: "营养快照",
    overviewSummary: "在决定下一步之前，先用更平静的方式看这餐的营养轮廓。",
    sections: {
      quality: {
        title: "质量信号",
        summary: "这些营养通常最能影响饱足感与整体平衡。"
      },
      fatDetails: {
        title: "脂肪细节",
        summary: "多一点脂肪质量的信息，但不把画面变复杂。"
      }
    }
  },
  trend: {
    title: "营养焦点",
    subtitle: "今天 + 最近 7 天",
    headlines: {
      start_logging: "记录几餐后，完整的营养故事才会开始出现",
      protein: "今天最值得补的是蛋白质",
      fiber: "纤维还可以再拉高一点",
      sodium: "下一餐清淡一点会更平衡",
      balanced: "今天目前的营养分配算稳"
    },
    summaries: {
      start_logging: "多几条记录后，这张卡就会开始读出蛋白质、纤维与钠的模式。",
      protein: (e) => `和最近 ${e} 天相比，今天最值得优先补的是蛋白质。`,
      fiber: (e) => `和最近 ${e} 天相比，纤维是最容易先补齐的一块。`,
      sodium: (e) => `和最近 ${e} 天相比，今天的钠有点偏高。`,
      balanced: (e) => `和最近 ${e} 天相比，今天目前的营养节奏算稳。`
    },
    signalLabels: {
      protein: "蛋白质节奏",
      fiber: "纤维支持",
      sodium: "钠平衡"
    },
    signalDetails: {
      protein: ({ average: e }) => e > 0 ? `7 天平均 ${e}g` : "先积累几条记录再看节奏",
      fiber: ({ average: e }) => e > 0 ? `7 天平均 ${e}g` : "先积累几条记录再看节奏",
      sodium: ({ average: e }) => e > 0 ? `7 天平均 ${e}mg` : "先积累几条记录再看节奏"
    },
    signalValue: {
      protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
      fiber: ({ current: e }) => `${e}g`,
      sodium: ({ current: e }) => `${e}mg`
    }
  }
}, Uo = {
  en: {
    detail: {
      overviewTitle: "Nutrition snapshot",
      overviewSummary: "A calmer read on the meal before you decide what to do next.",
      sections: {
        quality: {
          title: "Quality signals",
          summary: "The nutrients that often shape how filling and balanced the meal feels."
        },
        fatDetails: {
          title: "Fat details",
          summary: "A little extra context on fat quality, without overcomplicating the view."
        }
      }
    },
    trend: {
      title: "Nutrition focus",
      subtitle: "Today + the last 7 logged days",
      headlines: {
        start_logging: "A few meal logs unlock the fuller nutrition story",
        protein: "Protein is the clearest gap today",
        fiber: "Fiber could use the next small lift",
        sodium: "A lighter, less salty next meal would help",
        balanced: "Nutrition looks fairly steady today"
      },
      summaries: {
        start_logging: "Once a few meals are logged, this card starts surfacing protein, fiber, and sodium patterns.",
        protein: (e) => `Compared with the last ${e} logged days, protein is the nutrient most worth reinforcing today.`,
        fiber: (e) => `Fiber is the easiest place to smooth the day compared with your last ${e} logged days.`,
        sodium: (e) => `Sodium is running a little ahead of your usual ${e}-day pace today.`,
        balanced: (e) => `Compared with the last ${e} logged days, today looks fairly balanced so far.`
      },
      signalLabels: {
        protein: "Protein pace",
        fiber: "Fiber support",
        sodium: "Sodium balance"
      },
      signalDetails: {
        protein: ({ average: e }) => e > 0 ? `7-day avg ${e}g` : "Build a few logs to see your pace",
        fiber: ({ average: e }) => e > 0 ? `7-day avg ${e}g` : "Build a few logs to see your pace",
        sodium: ({ average: e }) => e > 0 ? `7-day avg ${e}mg` : "Build a few logs to see your pace"
      },
      signalValue: {
        protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
        fiber: ({ current: e }) => `${e}g`,
        sodium: ({ current: e }) => `${e}mg`
      }
    }
  },
  "zh-TW": $g,
  "zh-CN": Rg
};
function Hg(e = "en") {
  return Uo[e] || Uo[String(e || "en").split("-")[0]] || Uo.en;
}
const Wg = {
  extra: {
    direction: "ltr",
    todayLabel: "今天",
    metaTitle: "Woof Cal 汪卡管家",
    metaOgTitle: "Woof Cal 汪卡管家",
    metaDescription: "用 AI 分析照片或文字中的餐點，輕鬆追蹤熱量、體重與營養節奏。",
    dailySummaryHint: "點一下查看完整營養摘要",
    dailySummaryEmpty: "先記下今天的第一餐吧",
    dailySummaryLeftGoal: (e) => `距離目標還差 ${e} kcal`,
    dailySummaryLeftToday: (e) => `今天還剩 ${e} kcal`,
    dailySummaryOverTarget: (e) => `今天已超過 ${e} kcal`,
    dailySummaryTitle: (e) => `${e} 的營養摘要`,
    remainingLabel: "剩餘",
    emptyStateEyebrow: "快速開始",
    emptyStateTitle: "先記下今天的第一餐",
    emptyStateBody: "先用 AI 或手動輸入建立第一筆紀錄，今天的儀表板就會完整展開。",
    emptyMealTitle: "還沒有任何餐點",
    emptyMealBody: "用 AI 或手動輸入開始今天的第一筆紀錄",
    aiGuideEyebrow: "AI 提示",
    aiGuideTitle: "讓 AI 讀得更快也更準",
    aiGuideBody: "清楚的照片加上一點食材或份量說明，通常就能讓分析更穩定。",
    aiGuideTip1: "拍照時盡量避免餐點被手或餐具遮住",
    aiGuideTip2: "包裝食品可補上品牌或口味資訊",
    aiGuideTip3: "結果不準時，先編修食材再重新計算",
    aiItemsRequired: "請至少保留一個食材項目。"
  },
  goal: {
    goalTypeLabel: "目標",
    goalSummaryLabel: "目前目標",
    calorieTargetLabel: "熱量目標",
    reportTitle: "目標進度",
    reportSubtitle: "最近 7 天的達標與記錄狀況",
    goalTypes: {
      lose: "減重",
      maintain: "維持體重",
      gain: "增肌"
    },
    reportHeadline: (e) => `${e} 本週進度`,
    reportSummary: (e) => `最近 7 天記錄了 ${e.loggedDays}/7 天，熱量達標 ${e.calorieTargetDays} 天，蛋白質達標 ${e.proteinTargetDays} 天`,
    statStreak: "目前連續天數",
    statBestStreak: "最佳連續天數",
    statCalories: "熱量達標",
    statProtein: "蛋白質達標",
    formatDayCount: (e) => `${e} 天`,
    formatWindowCount: (e, t) => `${e}/${t}`
  },
  coach: {
    cardTitle: "今日教練",
    weeklyTitle: "最近 7 天",
    headlines: {
      start_logging: "從第一餐開始建立今天的節奏",
      over_target: "今天的熱量已經有點偏高",
      near_goal: "你已經接近今天的目標區間",
      protein_gap: "蛋白質還可以再補一點",
      fiber_gap: "纖維還有再拉高的空間",
      sodium_high: "今天的鈉稍微偏高",
      steady: "今天目前走在穩定的方向上"
    },
    summaries: {
      start_logging: "先記下第一餐，儀表板就能開始根據今天的內容給你更有效的提醒。",
      over_target: (e) => `目前大約比目標多了 ${e.overCalories} kcal，下一餐建議輕一點。`,
      near_goal: (e) => `距離今天目標只剩大約 ${e.remainingCalories} kcal，點心建議保守一些。`,
      protein_gap: (e) => `距離今天的蛋白質目標還差大約 ${e.proteinGap}g。`,
      fiber_gap: (e) => `距離理想的纖維量還差大約 ${e.fiberGap}g。`,
      sodium_high: "下一餐清淡一點，整天會更平衡。",
      steady: "目前熱量與營養分配都算穩，照著這個節奏繼續就好。"
    },
    tips: {
      use_ai: "想更快開始，直接用 AI 拍照記錄通常最快。",
      log_first_meal: "如果很忙，也可以先記熱量與蛋白質，晚點再補細節。",
      protein_boost: "下一餐可優先補雞蛋、豆腐、雞胸、優格或牛奶。",
      fiber_boost: "蔬菜、水果、豆類與全穀都很適合補纖維。",
      watch_sodium: "接下來多喝水，也先少一點湯、醬料與加工食品。",
      portion_reset: "把下一餐的主食或點心收小一點，通常就能把節奏拉回來。",
      keep_momentum: "維持現在的節奏，晚一點再回來看一次摘要就夠了。"
    },
    weeklyAverage: (e) => `平均 ${e} kcal`,
    weeklyDays: (e) => `${e} 天有記錄`,
    weeklyBest: (e, t) => `${e} 最高 ${t} kcal`
  },
  rhythm: {
    title: "7 天飲食節奏",
    subtitle: "用更直觀的方式，看這一週吃得如何。",
    dashboardSubtitle: "從最近 7 天的記錄讀出你的餐次與營養節奏。",
    labels: {
      breakfast: "早餐",
      dinner: "晚餐",
      protein: "蛋白質",
      hydration: "喝水"
    },
    headlines: {
      start_logging: "先記幾餐，這張卡才會開始看出你的節奏",
      building_consistency: "這一週已經慢慢有穩定感",
      steady_week: "這一週的飲食節奏看起來算穩",
      breakfast_anchor: "早餐是最值得先固定下來的節奏點",
      dinner_balance: "晚餐目前承擔了比較多的熱量",
      protein_rhythm: "蛋白質的分配還有點忽高忽低"
    },
    summaries: {
      start_logging: "再多記幾餐，系統就能開始整理這一週的節奏。",
      building_consistency: "目前已經看得到一些規律，再多兩三天穩定記錄會更清楚。",
      steady_week: "你的餐次與營養節奏開始有一致性，整天也比較容易穩住。",
      breakfast_anchor: "如果想讓一天更穩，早餐通常是最值得先調整的地方。",
      dinner_balance: "這一週晚餐偏重，偶爾清爽一點會讓整體更平衡。",
      protein_rhythm: "蛋白質分配還不夠平均，固定補充來源會更穩。"
    },
    breakfast: {
      steady: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天吃早餐，起點很穩。`,
      building: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天記到早餐。`,
      irregular: (e) => `最近 7 天只有 ${e.breakfastDays}/${e.loggedDays} 天出現早餐，節奏還在建立中。`
    },
    dinner: {
      light: () => "這一週晚餐整體偏輕，白天分配得比較平均。",
      balanced: (e) => `晚餐平均大約佔全天 ${e.averageDinnerShare}% 的熱量。`,
      heavy: (e) => `最近 7 天有 ${e.heavyDays}/${e.loggedDays} 天是晚餐最重。`
    },
    protein: {
      steady: (e) => `蛋白質平均每天約 ${e.averageProtein}g，整體節奏算穩。`,
      building: (e) => `最近 7 天有 ${e.targetDays}/${e.loggedDays} 天接近你的蛋白質節奏。`,
      inconsistent: (e) => `蛋白質分配還不夠平均，目前只有 ${e.targetDays}/${e.loggedDays} 天較穩。`
    },
    hydration: {
      placeholder: "等喝水記錄開啟後，這裡會開始顯示喝水節奏。"
    }
  }
}, Bg = {
  extra: {
    direction: "ltr",
    todayLabel: "今天",
    metaTitle: "Woof Cal 汪卡管家",
    metaOgTitle: "Woof Cal 汪卡管家",
    metaDescription: "用 AI 分析照片或文字中的餐点，轻松追踪热量、体重与营养节奏。",
    dailySummaryHint: "点一下查看完整营养摘要",
    dailySummaryEmpty: "先记下今天的第一餐吧",
    dailySummaryLeftGoal: (e) => `距离目标还差 ${e} kcal`,
    dailySummaryLeftToday: (e) => `今天还剩 ${e} kcal`,
    dailySummaryOverTarget: (e) => `今天已超过 ${e} kcal`,
    dailySummaryTitle: (e) => `${e} 的营养摘要`,
    remainingLabel: "剩余",
    emptyStateEyebrow: "快速开始",
    emptyStateTitle: "先记下今天的第一餐",
    emptyStateBody: "先用 AI 或手动输入建立第一条记录，今天的仪表板就会完整展开。",
    emptyMealTitle: "还没有任何餐点",
    emptyMealBody: "用 AI 或手动输入开始今天的第一条记录",
    aiGuideEyebrow: "AI 提示",
    aiGuideTitle: "让 AI 读得更快也更准",
    aiGuideBody: "清楚的照片加上一点食材或份量说明，通常就能让分析更稳定。",
    aiGuideTip1: "拍照时尽量避免餐点被手或餐具挡住",
    aiGuideTip2: "包装食品可以补上品牌或口味信息",
    aiGuideTip3: "结果不准时，先编辑食材再重新计算",
    aiItemsRequired: "请至少保留一个食材项目。"
  },
  goal: {
    goalTypeLabel: "目标",
    goalSummaryLabel: "当前目标",
    calorieTargetLabel: "热量目标",
    reportTitle: "目标进度",
    reportSubtitle: "最近 7 天的达标与记录情况",
    goalTypes: {
      lose: "减重",
      maintain: "维持体重",
      gain: "增肌"
    },
    reportHeadline: (e) => `${e} 本周进度`,
    reportSummary: (e) => `最近 7 天记录了 ${e.loggedDays}/7 天，热量达标 ${e.calorieTargetDays} 天，蛋白质达标 ${e.proteinTargetDays} 天`,
    statStreak: "当前连续天数",
    statBestStreak: "最佳连续天数",
    statCalories: "热量达标",
    statProtein: "蛋白质达标",
    formatDayCount: (e) => `${e} 天`,
    formatWindowCount: (e, t) => `${e}/${t}`
  },
  coach: {
    cardTitle: "今日教练",
    weeklyTitle: "最近 7 天",
    headlines: {
      start_logging: "从第一餐开始建立今天的节奏",
      over_target: "今天的热量已经有点偏高",
      near_goal: "你已经接近今天的目标区间",
      protein_gap: "蛋白质还可以再补一点",
      fiber_gap: "纤维还有再拉高的空间",
      sodium_high: "今天的钠稍微偏高",
      steady: "今天目前走在稳定的方向上"
    },
    summaries: {
      start_logging: "先记下第一餐，仪表板就能开始根据今天的内容给你更有效的提醒。",
      over_target: (e) => `目前大约比目标多了 ${e.overCalories} kcal，下一餐建议轻一点。`,
      near_goal: (e) => `距离今天目标只剩大约 ${e.remainingCalories} kcal，零食建议保守一些。`,
      protein_gap: (e) => `距离今天的蛋白质目标还差大约 ${e.proteinGap}g。`,
      fiber_gap: (e) => `距离理想的纤维量还差大约 ${e.fiberGap}g。`,
      sodium_high: "下一餐清淡一点，整天会更平衡。",
      steady: "目前热量与营养分配都算稳，照着这个节奏继续就好。"
    },
    tips: {
      use_ai: "想更快开始，直接用 AI 拍照记录通常最快。",
      log_first_meal: "如果很忙，也可以先记热量与蛋白质，晚点再补细节。",
      protein_boost: "下一餐可优先补鸡蛋、豆腐、鸡胸、酸奶或牛奶。",
      fiber_boost: "蔬菜、水果、豆类与全谷都很适合补纤维。",
      watch_sodium: "接下来多喝水，也先少一点汤、酱料与加工食品。",
      portion_reset: "把下一餐的主食或零食缩小一点，通常就能把节奏拉回来。",
      keep_momentum: "维持现在的节奏，晚一点再回来看一次摘要就够了。"
    },
    weeklyAverage: (e) => `平均 ${e} kcal`,
    weeklyDays: (e) => `${e} 天有记录`,
    weeklyBest: (e, t) => `${e} 最高 ${t} kcal`
  },
  rhythm: {
    title: "7 天饮食节奏",
    subtitle: "用更直观的方式，看这一周吃得如何。",
    dashboardSubtitle: "从最近 7 天的记录读出你的餐次与营养节奏。",
    labels: {
      breakfast: "早餐",
      dinner: "晚餐",
      protein: "蛋白质",
      hydration: "喝水"
    },
    headlines: {
      start_logging: "先记几餐，这张卡才会开始看出你的节奏",
      building_consistency: "这一周已经慢慢有稳定感",
      steady_week: "这一周的饮食节奏看起来算稳",
      breakfast_anchor: "早餐是最值得先固定下来的节奏点",
      dinner_balance: "晚餐目前承担了比较多的热量",
      protein_rhythm: "蛋白质的分配还有点忽高忽低"
    },
    summaries: {
      start_logging: "再多记几餐，系统就能开始整理这一周的节奏。",
      building_consistency: "目前已经看得到一些规律，再多两三天稳定记录会更清楚。",
      steady_week: "你的餐次与营养节奏开始有一致性，整天也比较容易稳住。",
      breakfast_anchor: "如果想让一天更稳，早餐通常是最值得先调整的地方。",
      dinner_balance: "这一周晚餐偏重，偶尔清爽一点会让整体更平衡。",
      protein_rhythm: "蛋白质分配还不够平均，固定补充来源会更稳。"
    },
    breakfast: {
      steady: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天吃早餐，起点很稳。`,
      building: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天记到早餐。`,
      irregular: (e) => `最近 7 天只有 ${e.breakfastDays}/${e.loggedDays} 天出现早餐，节奏还在建立中。`
    },
    dinner: {
      light: () => "这一周晚餐整体偏轻，白天分配得比较平均。",
      balanced: (e) => `晚餐平均大约占全天 ${e.averageDinnerShare}% 的热量。`,
      heavy: (e) => `最近 7 天有 ${e.heavyDays}/${e.loggedDays} 天是晚餐最重。`
    },
    protein: {
      steady: (e) => `蛋白质平均每天约 ${e.averageProtein}g，整体节奏算稳。`,
      building: (e) => `最近 7 天有 ${e.targetDays}/${e.loggedDays} 天接近你的蛋白质节奏。`,
      inconsistent: (e) => `蛋白质分配还不够平均，目前只有 ${e.targetDays}/${e.loggedDays} 天较稳。`
    },
    hydration: {
      placeholder: "等喝水记录开启后，这里会开始显示喝水节奏。"
    }
  }
}, Yl = {
  en: {
    extra: {
      direction: "ltr",
      todayLabel: "Today",
      metaTitle: "Woof Cal - AI Diet Tracker",
      metaOgTitle: "Woof Cal - AI Diet Tracker",
      metaDescription: "Use AI to analyze meals from photos or text, then track calories, weight, and nutrition in one lightweight dashboard.",
      dailySummaryHint: "Tap to view all nutrients",
      dailySummaryEmpty: "Start logging today's meals",
      dailySummaryLeftGoal: (e) => `${e} kcal left to goal`,
      dailySummaryLeftToday: (e) => `${e} kcal left today`,
      dailySummaryOverTarget: (e) => `${e} kcal over target`,
      dailySummaryTitle: (e) => `${e} Nutrition Summary`,
      remainingLabel: "Remaining",
      emptyStateEyebrow: "Quick Start",
      emptyStateTitle: "Log your first meal today",
      emptyStateBody: "Snap a meal with AI or add a manual entry to unlock your daily dashboard.",
      emptyMealTitle: "No foods logged yet",
      emptyMealBody: "Use AI or manual entry to get started",
      aiGuideEyebrow: "AI Tips",
      aiGuideTitle: "Get faster, cleaner AI results",
      aiGuideBody: "Clear photos and a little extra context help the nutrition analysis stay more accurate.",
      aiGuideTip1: "Keep the meal visible and avoid blocking the plate",
      aiGuideTip2: "Add brand names or key ingredients when they matter",
      aiGuideTip3: "Edit ingredients before recalculating if the result looks off",
      aiItemsRequired: "Please keep at least one item."
    },
    goal: {
      goalTypeLabel: "Goal",
      goalSummaryLabel: "Current Goal",
      calorieTargetLabel: "Calorie Target",
      reportTitle: "Goal Progress",
      reportSubtitle: "Last 7 days of adherence and logging",
      goalTypes: { lose: "Lose Weight", maintain: "Maintain Weight", gain: "Build Muscle" },
      reportHeadline: (e) => `${e} weekly progress`,
      reportSummary: (e) => `${e.loggedDays}/7 days logged, calories on target ${e.calorieTargetDays} days, protein on target ${e.proteinTargetDays} days`,
      statStreak: "Current streak",
      statBestStreak: "Best streak",
      statCalories: "Calorie goal",
      statProtein: "Protein goal",
      formatDayCount: (e) => `${e}d`,
      formatWindowCount: (e, t) => `${e}/${t}`
    },
    coach: {
      cardTitle: "Daily Coach",
      weeklyTitle: "Last 7 Days",
      headlines: {
        start_logging: "Build today with the first meal",
        over_target: "Calories are already trending high",
        near_goal: "You are close to your target zone",
        protein_gap: "Protein still needs a boost",
        fiber_gap: "Fiber can use a lift",
        sodium_high: "Sodium is running high today",
        steady: "Today is moving in a solid direction"
      },
      summaries: {
        start_logging: "Log the first meal and the dashboard can start coaching the rest of your day.",
        over_target: (e) => `You are about ${e.overCalories} kcal over target, so the next meal should stay lighter.`,
        near_goal: (e) => `Only about ${e.remainingCalories} kcal remain, so snacks should stay modest.`,
        protein_gap: (e) => `You are still about ${e.proteinGap}g short of your protein target.`,
        fiber_gap: (e) => `You are still about ${e.fiberGap}g short of a strong fiber day.`,
        sodium_high: "A lighter, less salty next meal will help rebalance the day.",
        steady: "Calories and nutrients look fairly steady so far. Keep logging."
      },
      tips: {
        use_ai: "Use AI photo logging if you want the fastest start.",
        log_first_meal: "If you are busy, add a quick manual entry with calories and protein first.",
        protein_boost: "Try eggs, tofu, chicken breast, Greek yogurt, or milk next.",
        fiber_boost: "Add vegetables, fruit, beans, or whole grains to lift fiber.",
        watch_sodium: "Drink more water and go lighter on soup, sauce, and packaged foods.",
        portion_reset: "Cut the next carb or snack portion in half to recover the day.",
        keep_momentum: "Stay with the current pace and check the summary card again before dinner."
      },
      weeklyAverage: (e) => `${e} kcal avg`,
      weeklyDays: (e) => `${e} logged days`,
      weeklyBest: (e, t) => `${e} peak ${t} kcal`
    },
    rhythm: {
      title: "7-Day Meal Rhythm",
      subtitle: "A simple read on how this week is flowing.",
      dashboardSubtitle: "Consistency signals from the last 7 logged days.",
      labels: { breakfast: "Breakfast", dinner: "Dinner", protein: "Protein", hydration: "Hydration" },
      headlines: {
        start_logging: "Your weekly rhythm starts with a few logged meals",
        building_consistency: "You are starting to build a repeatable week",
        steady_week: "Your meal rhythm looks fairly steady this week",
        breakfast_anchor: "Breakfast is the clearest place to anchor the week",
        dinner_balance: "Dinner is carrying a big share of the week right now",
        protein_rhythm: "Protein rhythm is still moving around day to day"
      },
      summaries: {
        start_logging: "Log a few meals across the week and this card will start surfacing your routine.",
        building_consistency: "A few patterns are already visible. Two or three steadier days will make the picture clearer.",
        steady_week: "Your meals are showing a repeatable rhythm, which makes the rest of the day easier to pace.",
        breakfast_anchor: "Breakfast is the easiest place to add consistency if you want the day to feel more settled.",
        dinner_balance: "Dinner is doing a lot of the work this week. A lighter evening once or twice could smooth the rhythm.",
        protein_rhythm: "Protein intake is landing unevenly across the week. A more repeatable protein anchor would help."
      },
      breakfast: {
        steady: (e) => `Logged on ${e.breakfastDays}/${e.loggedDays} days with a fairly repeatable start.`,
        building: (e) => `Breakfast showed up on ${e.breakfastDays}/${e.loggedDays} logged days.`,
        irregular: (e) => `Breakfast only appeared on ${e.breakfastDays}/${e.loggedDays} logged days so far.`
      },
      dinner: {
        light: () => "Dinner is staying on the lighter side this week.",
        balanced: (e) => `Dinner is averaging about ${e.averageDinnerShare}% of daily calories.`,
        heavy: (e) => `Dinner ran heaviest on ${e.heavyDays}/${e.loggedDays} logged days.`
      },
      protein: {
        steady: (e) => `Protein looks fairly steady, averaging ${e.averageProtein}g a day.`,
        building: (e) => `${e.targetDays}/${e.loggedDays} days landed near your protein pace.`,
        inconsistent: (e) => `Protein is landing unevenly, with only ${e.targetDays}/${e.loggedDays} stronger days.`
      },
      hydration: {
        placeholder: "Hydration rhythm will show up here once water logging is enabled."
      }
    }
  },
  "zh-TW": Wg,
  "zh-CN": Bg
};
function Uf(e, t = se().curLang) {
  var n;
  return ((n = Yl[t]) == null ? void 0 : n[e]) || Yl.en[e];
}
function Kf(e = se().curLang) {
  return Uf("extra", e);
}
function Ug(e = se().curLang) {
  return Uf("goal", e);
}
function Kg(e = se().curLang) {
  return Hg(e);
}
function Gg(e = "lose", t = se().curLang) {
  var r, a;
  const n = Ug(t);
  return ((r = n.goalTypes) == null ? void 0 : r[e]) || ((a = n.goalTypes) == null ? void 0 : a.lose) || Yl.en.goal.goalTypes.lose;
}
function Vg(e, t = se().curLang) {
  var c, m, h, f, y, v, S, L, p, d, g;
  const n = es(t), r = pt(t), a = (((c = e == null ? void 0 : e.mealCoverage) == null ? void 0 : c.loggedMeals) || 0) > 0, o = ((h = r.meals) == null ? void 0 : h[((m = e == null ? void 0 : e.mealCoverage) == null ? void 0 : m.nextMealTitleKey) || ""]) || "", l = a ? n.heroSummaryActive : n.heroSummaryBase || "", s = Number((e == null ? void 0 : e.proteinCurrent) || 0).toFixed(1).replace(/\.0$/, ""), u = (e == null ? void 0 : e.proteinRemaining) > 0 ? n.signalProteinToGoal(e.proteinRemaining) : n.signalProteinOnTrack;
  return {
    hero: {
      eyebrow: a ? n.heroEyebrowActive : n.heroEyebrowEmpty,
      title: a ? n.heroTitleActive(e.mealCoverage || { loggedMeals: 0, plannedMeals: 0 }) : n.heroTitleEmpty,
      summary: l,
      stats: [
        {
          label: n.statLabels.streak,
          value: n.formatDayCount(((y = (f = e == null ? void 0 : e.pet) == null ? void 0 : f.progress) == null ? void 0 : y.streak) || 0)
        },
        {
          label: n.statLabels.meals,
          value: n.formatMealCoverage(
            ((v = e == null ? void 0 : e.mealCoverage) == null ? void 0 : v.loggedMeals) || 0,
            ((S = e == null ? void 0 : e.mealCoverage) == null ? void 0 : S.plannedMeals) || 0
          )
        },
        {
          label: n.statLabels.protein,
          value: n.formatProteinPace(s, (e == null ? void 0 : e.proteinTarget) || 0)
        }
      ],
      meta: [
        Gg(e == null ? void 0 : e.goalType, t),
        o || ""
      ].filter(Boolean),
      actions: {
        log: n.heroActionLog || r.btnAddRecord || r.btnAdd || "Log meal",
        ai: r.aiTitle || "AI Analysis",
        favorites: n.heroActionFavorites || r.btnFavLoad || "Favorites"
      }
    },
    logHub: {
      title: n.logHubTitle || n.quickLogTitle || r.txtRecordTitle || r.recordTitle || "Quick logging",
      summary: a ? n.logHubCopyActive || n.quickLogCopyActive : n.logHubCopyEmpty || n.quickLogCopyEmpty,
      commonFoodsButton: n.heroActionCommonFoods || r.presetFoodLabel || "Common foods",
      commonFoodsCopy: n.commonFoodsHint || "Choose a familiar food and keep Home light.",
      favoritesButton: n.logHubFavoritesButton || n.heroActionFavorites || r.btnFavLoad || "Favorites",
      favoritesCopy: n.logHubFavoritesCopy || "Pick from foods you already save often.",
      manualButton: n.logHubManualButton || n.heroActionManual || r.manualLabel || "Manual entry",
      manualCopy: n.logHubManualCopy || "Open this only when you need a custom food or detailed nutrition.",
      manualModalTitle: n.manualModalTitle || n.manualAdvancedTitle || r.manualLabel || "Manual meal entry",
      manualModalHint: n.manualModalHint || n.manualAdvancedHint || "Use this for custom foods or detailed nutrition edits.",
      todayMealsKicker: n.todayMealsKicker || n.heroEyebrowEmpty || "Daily diary",
      todayMealsTitle: n.todayMealsTitle || n.mealListTitle || "Today's meals",
      todayMealsHint: n.todayMealsHint || "Keep meals visible without turning Home into a form."
    },
    overview: {
      title: n.overviewTitle,
      hint: n.overviewHint,
      signals: [
        {
          label: n.signals.protein,
          value: `${s}g`,
          detail: u
        },
        {
          label: n.signals.meals,
          value: n.formatMealCoverage(
            ((L = e == null ? void 0 : e.mealCoverage) == null ? void 0 : L.loggedMeals) || 0,
            ((p = e == null ? void 0 : e.mealCoverage) == null ? void 0 : p.plannedMeals) || 0
          ),
          detail: a ? n.signalMealsActive(
            ((d = e == null ? void 0 : e.mealCoverage) == null ? void 0 : d.loggedMeals) || 0,
            ((g = e == null ? void 0 : e.mealCoverage) == null ? void 0 : g.plannedMeals) || 0,
            o
          ) : n.signalMealsEmpty
        }
      ]
    }
  };
}
function Qg(e, t = se().curLang) {
  var s, u, c, m;
  const n = Kg(t).trend, r = (e == null ? void 0 : e.focusKey) || "balanced", a = ((s = n.headlines) == null ? void 0 : s[r]) || ((u = n.headlines) == null ? void 0 : u.balanced) || "", o = ((c = n.summaries) == null ? void 0 : c[r]) || ((m = n.summaries) == null ? void 0 : m.balanced) || "", l = typeof o == "function" ? o((e == null ? void 0 : e.loggedDays) || 7) : o;
  return {
    title: n.title,
    subtitle: n.subtitle,
    headline: a,
    summary: l,
    signals: ((e == null ? void 0 : e.signals) || []).map((h) => {
      var f, y, v;
      return {
        key: h.key,
        label: ((f = n.signalLabels) == null ? void 0 : f[h.key]) || h.key,
        value: (y = n.signalValue) != null && y[h.key] ? n.signalValue[h.key](h) : String(h.current ?? "--"),
        detail: (v = n.signalDetails) != null && v[h.key] ? n.signalDetails[h.key](h) : ""
      };
    })
  };
}
function ts(e = se().selectedDate, t = se().curLang) {
  const { selectedDate: n } = se(), r = e || n || me(), a = Kf(t);
  return r === me() ? a.todayLabel : r;
}
function ot(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Gf(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function Hr(e = []) {
  return !Array.isArray(e) || e.length === 0 ? 0 : e.reduce((t, n) => t + ot(n), 0) / e.length;
}
function Yg(e = []) {
  if (!Array.isArray(e) || e.length < 2) return 0;
  const t = Hr(e), n = e.reduce((r, a) => {
    const o = ot(a) - t;
    return r + o * o;
  }, 0) / e.length;
  return Math.sqrt(n);
}
function Vf(e = [], t = 0.45) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  if (e.length === 1) return 60;
  const n = Hr(e);
  if (n <= 0) return 0;
  const r = Yg(e) / n;
  return Math.round((1 - Gf(r / t, 0, 1)) * 100);
}
function ns(e, t) {
  return {
    key: e,
    score: 0,
    status: t,
    loggedDays: 0
  };
}
function Zg(e = {}) {
  const t = Array.isArray(e == null ? void 0 : e.items) ? e.items : [], { totals: n, mealTotals: r } = Rr(t), a = Math.round(ot(n.cal)), o = Math.round(ot(n.pro) * 10) / 10, l = Math.round(ot(r.breakfast)), s = Math.round(ot(r.dinner)), u = Math.round(ot(r.lunch)), c = Math.round(ot(r.snack)), m = t.length > 0 || a > 0 || o > 0;
  return {
    date: String((e == null ? void 0 : e.date) || ""),
    label: String((e == null ? void 0 : e.label) || (e == null ? void 0 : e.date) || ""),
    logged: m,
    totalCalories: a,
    totalProtein: o,
    breakfastCalories: l,
    lunchCalories: u,
    dinnerCalories: s,
    snackCalories: c,
    dinnerShare: a > 0 ? s / a : 0,
    breakfastLogged: l > 0,
    dinnerLogged: s > 0
  };
}
function Xg(e = []) {
  const t = e.filter((s) => s.logged);
  if (t.length === 0)
    return ns("breakfast", "not_enough_data");
  const n = t.filter((s) => s.breakfastLogged), r = n.length / t.length, a = Vf(
    n.map((s) => s.breakfastCalories),
    0.5
  ), o = Math.round((r * 0.7 + a / 100 * 0.3) * 100);
  let l = "irregular";
  return t.length < 3 ? l = n.length > 0 ? "building" : "irregular" : o >= 70 ? l = "steady" : o >= 40 && (l = "building"), {
    key: "breakfast",
    score: o,
    status: l,
    loggedDays: t.length,
    breakfastDays: n.length,
    averageBreakfastCalories: Math.round(Hr(n.map((s) => s.breakfastCalories)))
  };
}
function qg(e = []) {
  const t = e.filter((s) => s.logged);
  if (t.length === 0)
    return ns("dinner", "not_enough_data");
  const n = t.filter((s) => s.dinnerShare >= 0.45), r = Hr(t.map((s) => s.dinnerShare)), a = n.length / t.length, o = Math.round((Gf(r / 0.6, 0, 1) * 0.7 + a * 0.3) * 100);
  let l = "balanced";
  return r < 0.3 && n.length === 0 ? l = "light" : (o >= 60 || r >= 0.48) && (l = "heavy"), {
    key: "dinner",
    score: o,
    status: l,
    loggedDays: t.length,
    heavyDays: n.length,
    averageDinnerShare: Math.round(r * 100)
  };
}
function Jg(e = [], t = 0) {
  const n = e.filter((m) => m.logged);
  if (n.length === 0)
    return ns("protein", "not_enough_data");
  const r = Math.max(0, ot(t)), a = Math.round(Hr(n.map((m) => m.totalProtein)) * 10) / 10, o = Vf(
    n.map((m) => m.totalProtein),
    0.4
  ), l = r > 0 ? n.filter((m) => m.totalProtein >= r * 0.9).length : 0, s = n.length > 0 ? l / n.length : 0, u = r > 0 ? Math.round((s * 0.6 + o / 100 * 0.4) * 100) : o;
  let c = "inconsistent";
  return n.length < 3 ? c = n.length > 0 ? "building" : "inconsistent" : u >= 70 ? c = "steady" : u >= 45 && (c = "building"), {
    key: "protein",
    score: u,
    status: c,
    loggedDays: n.length,
    targetDays: l,
    averageProtein: a,
    proteinTarget: r
  };
}
function ey(e = 7) {
  return {
    key: "hydration",
    score: null,
    status: "placeholder",
    available: !1,
    windowSize: e,
    trackedDays: 0
  };
}
function ty({ dayLogs: e = [], proteinTarget: t = 0 } = {}) {
  const n = Array.isArray(e) ? e.map(Zg) : [], r = n.filter((c) => c.logged), a = Xg(n), o = qg(n), l = Jg(n, t), s = ey(n.length || 7);
  let u = "start_logging";
  return r.length >= 3 ? a.status === "irregular" ? u = "breakfast_anchor" : o.status === "heavy" ? u = "dinner_balance" : l.status === "inconsistent" ? u = "protein_rhythm" : a.status === "building" || l.status === "building" ? u = "building_consistency" : u = "steady_week" : r.length > 0 && (u = "building_consistency"), {
    windowSize: n.length || 7,
    loggedDays: r.length,
    focus: u,
    breakfast: a,
    dinner: o,
    protein: l,
    hydration: s,
    days: n
  };
}
function ny(e = se(), { days: t = 7 } = {}) {
  var u, c;
  const n = e || se(), r = Math.max(0, Number((u = n == null ? void 0 : n.profile) == null ? void 0 : u.weight) || 0), a = Math.max(0, Number(n == null ? void 0 : n.targetCalories) || 0), o = String((n == null ? void 0 : n.currentGoalType) || ((c = n == null ? void 0 : n.profile) == null ? void 0 : c.goalType) || "lose"), l = co(a, {
    weightKg: r,
    goalType: o
  }), s = ty({
    dayLogs: zf(t, n.selectedDate),
    proteinTarget: l.protein
  });
  return {
    ...s,
    proteinTarget: l.protein,
    lang: (n == null ? void 0 : n.curLang) || "en",
    hasData: s.loggedDays > 0
  };
}
function ry(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Qt(e, t = "en", n = "en") {
  if (typeof e == "string") return e;
  if (!ry(e)) return "";
  const r = String(t || n || "en"), a = r.split("-")[0];
  return String(
    e[r] || e[a] || e[n] || Object.values(e).find(Boolean) || ""
  ).trim();
}
function Qf(e) {
  if (Array.isArray(e))
    return e.map((n) => String(n || "").trim()).filter(Boolean);
  const t = String(e || "").trim();
  return t ? [t] : [];
}
function Yf(e) {
  return String(Array.isArray(e) ? e[0] : e || "").trim();
}
function rs(e) {
  return Te(e, {
    fieldOptions: {
      calories: { min: 0, max: 5e3, digits: 0 },
      protein: { min: 0, max: 300, digits: 1 },
      fat: { min: 0, max: 300, digits: 1 },
      carbohydrate: { min: 0, max: 500, digits: 1 },
      sugar: { min: 0, max: 300, digits: 1 },
      sodium: { min: 0, max: 2e4, digits: 0 },
      saturatedFat: { min: 0, max: 150, digits: 1 },
      transFat: { min: 0, max: 50, digits: 1 },
      fiber: { min: 0, max: 150, digits: 1 }
    }
  });
}
function ay(e = {}) {
  return Object.fromEntries($n.map((t) => {
    const n = Number(e == null ? void 0 : e[t]);
    return [t, Number.isFinite(n) ? n : 0];
  }));
}
function oy(e, t = 1) {
  const n = Number(t), r = Number.isFinite(n) ? n : 1, a = Or(e);
  return rs(Object.fromEntries(
    $n.map((o) => [o, a[o] * r])
  ));
}
function ly(e, t = {}) {
  const n = Or(e), r = ay(t);
  return rs(Object.fromEntries(
    $n.map((a) => [a, n[a] + r[a]])
  ));
}
function rc(e, t) {
  return {
    name: Qt(e == null ? void 0 : e.name, t) || "Item",
    weight: String((e == null ? void 0 : e.weight) || "").trim()
  };
}
function iy(e = {}) {
  const t = Array.isArray(e.options) ? e.options : [];
  if (e.selectionType === "multi")
    return t.filter((a) => a == null ? void 0 : a.default).map((a) => String(a.id || "").trim()).filter(Boolean);
  const r = t.find((a) => a == null ? void 0 : a.default) || t[0];
  return r != null && r.id ? [String(r.id).trim()] : [];
}
function Zf(e, t = {}) {
  const n = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  return Object.fromEntries(n.map((r) => {
    const a = String((r == null ? void 0 : r.id) || "").trim(), o = t == null ? void 0 : t[a], l = iy(r);
    if (r.selectionType === "multi") {
      const u = Qf(o);
      return [a, u.length > 0 ? u : l];
    }
    const s = Yf(o);
    return [a, s || l[0] || ""];
  }));
}
function sy(e, t) {
  const n = Array.isArray(e == null ? void 0 : e.options) ? e.options : [];
  if ((e == null ? void 0 : e.selectionType) === "multi") {
    const a = new Set(Qf(t));
    return n.filter((o) => a.has(String((o == null ? void 0 : o.id) || "").trim()));
  }
  const r = Yf(t);
  return n.filter((a) => String((a == null ? void 0 : a.id) || "").trim() === r);
}
function uy(e = [], t = [], n = "en") {
  return [
    ...Array.isArray(e) ? e.map((r) => rc(r, n)) : [],
    ...Array.isArray(t) ? t.map((r) => rc(r, n)) : []
  ];
}
function cy(e, t = {}) {
  const n = String(t.lang || "en"), r = Zf(e, t.selectedModifiers), a = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  let o = Or((e == null ? void 0 : e.nutrition) || Wh()), l = [];
  const s = [], u = [];
  a.forEach((h) => {
    sy(h, r[h.id]).forEach((y) => {
      const v = (y == null ? void 0 : y.effect) || {};
      v.nutritionMultiplier !== void 0 && (o = oy(o, v.nutritionMultiplier)), v.nutritionDelta && (o = ly(o, v.nutritionDelta));
      const S = Array.isArray(v.items) ? v.items : v.item ? [v.item] : [];
      S.length > 0 && (l = [...l, ...S]);
      const L = Qt(y == null ? void 0 : y.label, n) || (y == null ? void 0 : y.id) || "";
      s.push({
        groupId: String((h == null ? void 0 : h.id) || "").trim(),
        optionId: String((y == null ? void 0 : y.id) || "").trim(),
        label: L,
        selectionType: (h == null ? void 0 : h.selectionType) === "multi" ? "multi" : "single"
      }), y != null && y.includeInName && u.push(Qt((y == null ? void 0 : y.nameLabel) || (y == null ? void 0 : y.label), n));
    });
  });
  const c = Qt(e == null ? void 0 : e.name, n) || "Preset Meal", m = u.filter(Boolean).join(", ");
  return {
    id: String((e == null ? void 0 : e.id) || "").trim(),
    region: String((e == null ? void 0 : e.region) || "").trim(),
    name: m ? `${c} (${m})` : c,
    suggestedMealType: String((e == null ? void 0 : e.suggestedMealType) || "snack"),
    nutrition: rs(o),
    items: uy(e == null ? void 0 : e.items, l, n),
    appliedModifiers: s,
    selectedModifiers: r
  };
}
function dy(e, t = "en") {
  return Qt(e == null ? void 0 : e.name, t) || String((e == null ? void 0 : e.id) || "Preset Meal");
}
function fy(e, t = "en") {
  return Qt(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Modifier");
}
function my(e, t = "en") {
  return Qt(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Option");
}
function py(e = "zh-TW") {
  return String(e || "zh-TW").toLowerCase().startsWith("en") ? "singapore" : "taiwan";
}
const as = Object.freeze([
  {
    id: "tw-beef-noodle-soup",
    region: "taiwan",
    suggestedMealType: "lunch",
    name: {
      "zh-TW": "紅燒牛肉麵",
      en: "Braised Beef Noodle Soup"
    },
    nutrition: {
      calories: 620,
      protein: 33,
      fat: 21,
      carbohydrate: 70,
      sugar: 6,
      sodium: 1900,
      saturatedFat: 7,
      transFat: 0,
      fiber: 4
    },
    items: [
      { name: { "zh-TW": "牛肉", en: "Beef" }, weight: "120 g" },
      { name: { "zh-TW": "麵條", en: "Noodles" }, weight: "180 g" },
      { name: { "zh-TW": "湯底", en: "Broth" }, weight: "350 ml" }
    ],
    modifierGroups: [
      {
        id: "portion",
        selectionType: "single",
        label: { "zh-TW": "份量", en: "Portion" },
        options: [
          {
            id: "small",
            label: { "zh-TW": "小碗", en: "Small" },
            includeInName: !0,
            effect: { nutritionMultiplier: 0.8 }
          },
          {
            id: "regular",
            label: { "zh-TW": "標準", en: "Regular" },
            default: !0,
            effect: { nutritionMultiplier: 1 }
          },
          {
            id: "large",
            label: { "zh-TW": "大碗", en: "Large" },
            includeInName: !0,
            effect: { nutritionMultiplier: 1.25 }
          }
        ]
      },
      {
        id: "addons",
        selectionType: "multi",
        label: { "zh-TW": "加料", en: "Add-ons" },
        options: [
          {
            id: "extra-beef",
            label: { "zh-TW": "加牛肉", en: "Extra beef" },
            effect: {
              nutritionDelta: {
                calories: 110,
                protein: 12,
                fat: 5,
                carbohydrate: 0,
                sugar: 0,
                sodium: 120,
                saturatedFat: 1.8,
                transFat: 0,
                fiber: 0
              },
              item: { name: { "zh-TW": "牛肉加料", en: "Extra beef" }, weight: "50 g" }
            }
          },
          {
            id: "extra-noodles",
            label: { "zh-TW": "加麵", en: "Extra noodles" },
            effect: {
              nutritionDelta: {
                calories: 130,
                protein: 4,
                fat: 1,
                carbohydrate: 28,
                sugar: 0,
                sodium: 60,
                saturatedFat: 0.2,
                transFat: 0,
                fiber: 1
              },
              item: { name: { "zh-TW": "加麵", en: "Extra noodles" }, weight: "90 g" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "tw-bubble-milk-tea",
    region: "taiwan",
    suggestedMealType: "snack",
    name: {
      "zh-TW": "珍珠奶茶",
      en: "Bubble Milk Tea"
    },
    nutrition: {
      calories: 360,
      protein: 4,
      fat: 7,
      carbohydrate: 68,
      sugar: 45,
      sodium: 110,
      saturatedFat: 4,
      transFat: 0,
      fiber: 0
    },
    items: [
      { name: { "zh-TW": "奶茶", en: "Milk tea" }, weight: "450 ml" },
      { name: { "zh-TW": "珍珠", en: "Pearls" }, weight: "50 g" }
    ],
    modifierGroups: [
      {
        id: "size",
        selectionType: "single",
        label: { "zh-TW": "杯量", en: "Drink size" },
        options: [
          {
            id: "small",
            label: { "zh-TW": "小杯", en: "Small" },
            includeInName: !0,
            effect: { nutritionMultiplier: 0.8 }
          },
          {
            id: "medium",
            label: { "zh-TW": "中杯", en: "Medium" },
            default: !0,
            effect: { nutritionMultiplier: 1 }
          },
          {
            id: "large",
            label: { "zh-TW": "大杯", en: "Large" },
            includeInName: !0,
            effect: { nutritionMultiplier: 1.25 }
          }
        ]
      },
      {
        id: "sweetness",
        selectionType: "single",
        label: { "zh-TW": "甜度", en: "Sweetness" },
        options: [
          {
            id: "no-sugar",
            label: { "zh-TW": "無糖", en: "No sugar" },
            includeInName: !0,
            effect: {
              nutritionDelta: {
                calories: -120,
                protein: 0,
                fat: 0,
                carbohydrate: -30,
                sugar: -32,
                sodium: 0,
                saturatedFat: 0,
                transFat: 0,
                fiber: 0
              }
            }
          },
          {
            id: "half",
            label: { "zh-TW": "半糖", en: "50% sugar" },
            default: !0,
            includeInName: !0,
            effect: {
              nutritionDelta: {
                calories: -40,
                protein: 0,
                fat: 0,
                carbohydrate: -10,
                sugar: -12,
                sodium: 0,
                saturatedFat: 0,
                transFat: 0,
                fiber: 0
              }
            }
          },
          {
            id: "full",
            label: { "zh-TW": "全糖", en: "100% sugar" },
            includeInName: !0,
            effect: { nutritionDelta: {} }
          }
        ]
      },
      {
        id: "addons",
        selectionType: "multi",
        label: { "zh-TW": "加料", en: "Add-ons" },
        options: [
          {
            id: "extra-pearls",
            label: { "zh-TW": "加珍珠", en: "Extra pearls" },
            effect: {
              nutritionDelta: {
                calories: 110,
                protein: 0,
                fat: 0,
                carbohydrate: 27,
                sugar: 13,
                sodium: 10,
                saturatedFat: 0,
                transFat: 0,
                fiber: 0
              },
              item: { name: { "zh-TW": "加珍珠", en: "Extra pearls" }, weight: "40 g" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "hk-char-siu-rice",
    region: "hong-kong",
    suggestedMealType: "lunch",
    name: {
      "zh-TW": "叉燒飯",
      en: "Char Siu Rice"
    },
    nutrition: {
      calories: 670,
      protein: 27,
      fat: 24,
      carbohydrate: 82,
      sugar: 16,
      sodium: 1480,
      saturatedFat: 7,
      transFat: 0,
      fiber: 3
    },
    items: [
      { name: { "zh-TW": "叉燒", en: "Char siu" }, weight: "120 g" },
      { name: { "zh-TW": "白飯", en: "Rice" }, weight: "220 g" }
    ],
    modifierGroups: [
      {
        id: "portion",
        selectionType: "single",
        label: { "zh-TW": "份量", en: "Portion" },
        options: [
          {
            id: "light-rice",
            label: { "zh-TW": "少飯", en: "Less rice" },
            includeInName: !0,
            effect: { nutritionMultiplier: 0.9 }
          },
          {
            id: "regular",
            label: { "zh-TW": "標準", en: "Regular" },
            default: !0,
            effect: { nutritionMultiplier: 1 }
          },
          {
            id: "extra-rice",
            label: { "zh-TW": "加飯", en: "Extra rice" },
            includeInName: !0,
            effect: { nutritionMultiplier: 1.18 }
          }
        ]
      },
      {
        id: "addons",
        selectionType: "multi",
        label: { "zh-TW": "加配料", en: "Add-ons" },
        options: [
          {
            id: "fried-egg",
            label: { "zh-TW": "煎蛋", en: "Fried egg" },
            effect: {
              nutritionDelta: {
                calories: 90,
                protein: 6,
                fat: 7,
                carbohydrate: 1,
                sugar: 0,
                sodium: 70,
                saturatedFat: 2,
                transFat: 0,
                fiber: 0
              },
              item: { name: { "zh-TW": "煎蛋", en: "Fried egg" }, weight: "1 pc" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "hk-milk-tea",
    region: "hong-kong",
    suggestedMealType: "snack",
    name: {
      "zh-TW": "港式奶茶",
      en: "Hong Kong Milk Tea"
    },
    nutrition: {
      calories: 210,
      protein: 3,
      fat: 5,
      carbohydrate: 38,
      sugar: 28,
      sodium: 65,
      saturatedFat: 3,
      transFat: 0,
      fiber: 0
    },
    items: [
      { name: { "zh-TW": "奶茶", en: "Milk tea" }, weight: "350 ml" }
    ],
    modifierGroups: [
      {
        id: "size",
        selectionType: "single",
        label: { "zh-TW": "杯量", en: "Drink size" },
        options: [
          {
            id: "hot",
            label: { "zh-TW": "熱飲", en: "Hot" },
            default: !0,
            effect: { nutritionMultiplier: 1 }
          },
          {
            id: "cold-large",
            label: { "zh-TW": "凍大杯", en: "Iced large" },
            includeInName: !0,
            effect: { nutritionMultiplier: 1.25 }
          }
        ]
      },
      {
        id: "sweetness",
        selectionType: "single",
        label: { "zh-TW": "甜度", en: "Sweetness" },
        options: [
          {
            id: "less-sugar",
            label: { "zh-TW": "少甜", en: "Less sugar" },
            includeInName: !0,
            effect: {
              nutritionDelta: {
                calories: -35,
                protein: 0,
                fat: 0,
                carbohydrate: -9,
                sugar: -10,
                sodium: 0,
                saturatedFat: 0,
                transFat: 0,
                fiber: 0
              }
            }
          },
          {
            id: "regular",
            label: { "zh-TW": "正常甜", en: "Regular" },
            default: !0,
            effect: { nutritionDelta: {} }
          }
        ]
      }
    ]
  },
  {
    id: "sg-hainanese-chicken-rice",
    region: "singapore",
    suggestedMealType: "lunch",
    name: {
      "zh-TW": "海南雞飯",
      en: "Hainanese Chicken Rice"
    },
    nutrition: {
      calories: 590,
      protein: 31,
      fat: 16,
      carbohydrate: 75,
      sugar: 3,
      sodium: 1020,
      saturatedFat: 4,
      transFat: 0,
      fiber: 2
    },
    items: [
      { name: { "zh-TW": "雞肉", en: "Chicken" }, weight: "130 g" },
      { name: { "zh-TW": "油飯", en: "Chicken rice" }, weight: "200 g" }
    ],
    modifierGroups: [
      {
        id: "portion",
        selectionType: "single",
        label: { "zh-TW": "份量", en: "Portion" },
        options: [
          {
            id: "light",
            label: { "zh-TW": "少飯", en: "Less rice" },
            includeInName: !0,
            effect: { nutritionMultiplier: 0.88 }
          },
          {
            id: "regular",
            label: { "zh-TW": "標準", en: "Regular" },
            default: !0,
            effect: { nutritionMultiplier: 1 }
          },
          {
            id: "double-rice",
            label: { "zh-TW": "加飯", en: "Extra rice" },
            includeInName: !0,
            effect: { nutritionMultiplier: 1.2 }
          }
        ]
      },
      {
        id: "addons",
        selectionType: "multi",
        label: { "zh-TW": "加點", en: "Add-ons" },
        options: [
          {
            id: "braised-egg",
            label: { "zh-TW": "滷蛋", en: "Braised egg" },
            effect: {
              nutritionDelta: {
                calories: 78,
                protein: 6,
                fat: 5,
                carbohydrate: 1,
                sugar: 0,
                sodium: 85,
                saturatedFat: 1.6,
                transFat: 0,
                fiber: 0
              },
              item: { name: { "zh-TW": "滷蛋", en: "Braised egg" }, weight: "1 pc" }
            }
          },
          {
            id: "extra-chicken",
            label: { "zh-TW": "加雞肉", en: "Extra chicken" },
            effect: {
              nutritionDelta: {
                calories: 95,
                protein: 14,
                fat: 4,
                carbohydrate: 0,
                sugar: 0,
                sodium: 120,
                saturatedFat: 1.1,
                transFat: 0,
                fiber: 0
              },
              item: { name: { "zh-TW": "加雞肉", en: "Extra chicken" }, weight: "60 g" }
            }
          }
        ]
      }
    ]
  },
  {
    id: "sg-kopi-c",
    region: "singapore",
    suggestedMealType: "snack",
    name: {
      "zh-TW": "Kopi C",
      en: "Kopi C"
    },
    nutrition: {
      calories: 140,
      protein: 2,
      fat: 2,
      carbohydrate: 27,
      sugar: 22,
      sodium: 35,
      saturatedFat: 1,
      transFat: 0,
      fiber: 0
    },
    items: [
      { name: { "zh-TW": "咖啡", en: "Coffee" }, weight: "300 ml" }
    ],
    modifierGroups: [
      {
        id: "size",
        selectionType: "single",
        label: { "zh-TW": "杯量", en: "Drink size" },
        options: [
          {
            id: "siew-dai",
            label: { "zh-TW": "小杯", en: "Small" },
            includeInName: !0,
            effect: { nutritionMultiplier: 0.8 }
          },
          {
            id: "regular",
            label: { "zh-TW": "標準", en: "Regular" },
            default: !0,
            effect: { nutritionMultiplier: 1 }
          },
          {
            id: "peng",
            label: { "zh-TW": "冰大杯", en: "Iced large" },
            includeInName: !0,
            effect: { nutritionMultiplier: 1.2 }
          }
        ]
      },
      {
        id: "sweetness",
        selectionType: "single",
        label: { "zh-TW": "甜度", en: "Sweetness" },
        options: [
          {
            id: "kosong",
            label: { "zh-TW": "Kosong 無糖", en: "Kosong (no sugar)" },
            includeInName: !0,
            effect: {
              nutritionDelta: {
                calories: -80,
                protein: 0,
                fat: 0,
                carbohydrate: -20,
                sugar: -22,
                sodium: 0,
                saturatedFat: 0,
                transFat: 0,
                fiber: 0
              }
            }
          },
          {
            id: "regular",
            label: { "zh-TW": "正常甜", en: "Regular" },
            default: !0,
            effect: { nutritionDelta: {} }
          }
        ]
      }
    ]
  }
]);
function hy(e = {}) {
  return {
    ...e,
    effect: e.effect ? {
      ...e.effect,
      nutritionDelta: e.effect.nutritionDelta ? { ...e.effect.nutritionDelta } : void 0,
      items: Array.isArray(e.effect.items) ? e.effect.items.map((t) => ({ ...t })) : void 0,
      item: e.effect.item ? { ...e.effect.item } : void 0
    } : void 0
  };
}
function Xf(e = {}) {
  return {
    ...e,
    nutrition: { ...e.nutrition || {} },
    items: Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [],
    modifierGroups: Array.isArray(e.modifierGroups) ? e.modifierGroups.map((t) => ({
      ...t,
      options: Array.isArray(t.options) ? t.options.map(hy) : []
    })) : []
  };
}
function gy() {
  return as.map(Xf);
}
function yy(e) {
  const t = String(e || "").trim(), n = as.find((r) => r.id === t);
  return n ? Xf(n) : null;
}
function vy() {
  return [...new Set(as.map((e) => String(e.region || "").trim()).filter(Boolean))];
}
const _y = Object.freeze({
  taiwan: {
    "zh-TW": "台灣",
    en: "Taiwan"
  },
  "hong-kong": {
    "zh-TW": "香港",
    en: "Hong Kong"
  },
  singapore: {
    "zh-TW": "新加坡",
    en: "Singapore"
  }
});
function Sy(e = "en") {
  return String(e || "en").split("-")[0];
}
function wy(e, t = "en") {
  const n = _y[e] || {};
  return n[t] || n[Sy(t)] || n.en || e;
}
function ky(e = "zh-TW") {
  return py(e);
}
function xy(e = "en") {
  return vy().map((t) => ({
    id: t,
    label: wy(t, e)
  }));
}
function Ty(e = "", t = "en") {
  const n = String(e || "").trim();
  return gy().filter((r) => !n || r.region === n).map((r) => ({
    id: r.id,
    region: r.region,
    label: dy(r, t),
    suggestedMealType: r.suggestedMealType
  }));
}
function Ny({
  lang: e = "en",
  region: t = "",
  profileRegion: n = "",
  presetId: r = "",
  selectedModifiers: a = {}
} = {}) {
  var h;
  const o = t || String(n || "").trim() || ky(e), l = Ty(o, e), s = r && l.some((f) => f.id === r) ? r : ((h = l[0]) == null ? void 0 : h.id) || "", u = yy(s), c = u ? Zf(u, a) : {}, m = u ? cy(u, {
    lang: e,
    selectedModifiers: c
  }) : null;
  return {
    regions: xy(e),
    selectedRegion: o,
    presets: l,
    selectedPresetId: s,
    modifierGroups: Array.isArray(u == null ? void 0 : u.modifierGroups) ? u.modifierGroups.map((f) => ({
      id: f.id,
      label: fy(f, e),
      selectionType: f.selectionType === "multi" ? "multi" : "single",
      selectedValue: c[f.id] ?? (f.selectionType === "multi" ? [] : ""),
      options: (f.options || []).map((y) => ({
        id: y.id,
        label: my(y, e),
        selected: f.selectionType === "multi" ? (c[f.id] || []).includes(y.id) : c[f.id] === y.id
      }))
    })) : [],
    resolvedPreset: m
  };
}
const Ko = [
  {
    key: "full",
    minRatio: 1.1,
    frameKey: "full",
    messageKey: "petMsg5",
    mood: "full"
  },
  {
    key: "balanced",
    minRatio: 0.85,
    frameKey: "balanced",
    messageKey: "petMsg4",
    mood: "happy"
  },
  {
    key: "mid",
    minRatio: 0.55,
    frameKey: "mid",
    messageKey: "petMsg3",
    mood: "curious"
  },
  {
    key: "low",
    minRatio: 0.25,
    frameKey: "low",
    messageKey: "petMsg2",
    mood: "warming_up"
  },
  {
    key: "hungry",
    minRatio: 0,
    frameKey: "hungry",
    messageKey: "petMsg1",
    mood: "hungry"
  }
], Xn = Object.freeze({
  celebrating: {
    key: "celebrating",
    frameKey: "celebrating",
    messageKey: "petMsgCelebrating",
    mood: "celebrating",
    priority: 50
  },
  excited: {
    key: "excited",
    frameKey: "excited",
    messageKey: "petMsgExcited",
    mood: "excited",
    priority: 40
  },
  sleeping: {
    key: "sleeping",
    frameKey: "sleeping",
    messageKey: "petMsgSleeping",
    mood: "sleeping",
    priority: 30
  },
  lonely: {
    key: "lonely",
    frameKey: "lonely",
    messageKey: "petMsgLonely",
    mood: "lonely",
    priority: 20
  },
  starving: {
    key: "starving",
    frameKey: "starving",
    messageKey: "petMsgStarving",
    mood: "starving",
    priority: 10
  }
});
function by({
  hour: e = (/* @__PURE__ */ new Date()).getHours(),
  minutesSinceLastOpen: t = 0,
  allQuestsComplete: n = !1,
  justLevelledUp: r = !1,
  ratio: a = 0,
  hoursWithoutLog: o = 0
} = {}) {
  return r ? Xn.celebrating : n ? Xn.excited : e >= 23 || e < 6 ? Xn.sleeping : t >= 1440 ? Xn.lonely : a < 0.1 && o >= 6 ? Xn.starving : null;
}
const Be = Object.freeze({
  TAP: "tap",
  LONG_PRESS: "long_press",
  COMBO: "combo"
}), ia = Object.freeze({
  tap: {
    hungry: { animClass: "pet-anim--tilt", dialogKey: "petTapHungry", effect: "none", bondDelta: 0 },
    low: { animClass: "pet-anim--wag", dialogKey: "petTapLow", effect: "none", bondDelta: 1 },
    mid: { animClass: "pet-anim--wiggle", dialogKey: "petTapMid", effect: "hearts", bondDelta: 1 },
    balanced: { animClass: "pet-anim--spin", dialogKey: "petTapBalanced", effect: "stars", bondDelta: 2 },
    full: { animClass: "pet-anim--flop", dialogKey: "petTapFull", effect: "sweat", bondDelta: 0 },
    sleeping: { animClass: "pet-anim--roll", dialogKey: "petTapSleeping", effect: "zzz", bondDelta: 0 },
    lonely: { animClass: "pet-anim--rush", dialogKey: "petTapLonely", effect: "hearts", bondDelta: 5 },
    starving: { animClass: "pet-anim--tilt", dialogKey: "petTapStarving", effect: "none", bondDelta: 0 },
    excited: { animClass: "pet-anim--bounce", dialogKey: "petTapExcited", effect: "stars", bondDelta: 2 },
    celebrating: { animClass: "pet-anim--bounce", dialogKey: "petTapCelebrating", effect: "confetti", bondDelta: 3 }
  },
  long_press: [
    { threshold: 1.5, animClass: "pet-anim--squint", dialogKey: "petLongPress1", effect: "none", bondDelta: 1 },
    { threshold: 3, animClass: "pet-anim--belly", dialogKey: "petLongPress2", effect: "hearts", bondDelta: 2 },
    { threshold: 5, animClass: "pet-anim--sleep", dialogKey: "petLongPress3", effect: "zzz", bondDelta: 3 }
  ],
  combo: [
    { threshold: 3, animClass: "pet-anim--wag-fast", dialogKey: "petCombo3", effect: "bounce", bondDelta: 2 },
    { threshold: 5, animClass: "pet-anim--spin-fast", dialogKey: "petCombo5", effect: "confetti", bondDelta: 3 },
    { threshold: 7, animClass: "pet-anim--dizzy", dialogKey: "petCombo7", effect: "spiral", bondDelta: 1 }
  ]
});
function Cy({ type: e, mood: t = "hungry", comboCount: n = 0, holdSeconds: r = 0 } = {}) {
  if (e === Be.TAP) {
    const a = ia.tap;
    return a[t] || a.hungry;
  }
  if (e === Be.LONG_PRESS) {
    const a = ia.long_press;
    for (let o = a.length - 1; o >= 0; o -= 1)
      if (r >= a[o].threshold) return a[o];
    return a[0];
  }
  if (e === Be.COMBO) {
    const a = ia.combo;
    for (let o = a.length - 1; o >= 0; o -= 1)
      if (n >= a[o].threshold) return a[o];
    return a[0];
  }
  return ia.tap.hungry;
}
const My = Object.freeze({
  [Be.TAP]: 2e3,
  [Be.LONG_PRESS]: 5e3,
  [Be.COMBO]: 1e4
}), jy = Object.freeze([
  "petInteractMsg1",
  "petInteractMsg2",
  "petInteractMsg3",
  "petInteractMsg4",
  "petInteractMsg5"
]);
function be(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function pr(e, t = 0, n = 100) {
  return Math.min(Math.max(e, t), n);
}
function qf(e = {}) {
  const t = Math.max(0, Math.round(be(e == null ? void 0 : e.xp))), n = Math.floor(t / 100) + 1;
  return {
    level: Math.max(1, Math.round(be(e == null ? void 0 : e.level, n)) || n),
    xp: t,
    mood: String((e == null ? void 0 : e.mood) || "hungry"),
    energy: pr(Math.round(be(e == null ? void 0 : e.energy))),
    bond: pr(Math.round(be(e == null ? void 0 : e.bond))),
    streak: Math.max(0, Math.round(be(e == null ? void 0 : e.streak)))
  };
}
function Ey(e = []) {
  var n;
  if (!Array.isArray(e) || e.length === 0) return 0;
  let t = 0;
  for (let r = e.length - 1; r >= 0 && !(be((n = e[r]) == null ? void 0 : n.calories) <= 0); r -= 1)
    t += 1;
  return t;
}
function Ly({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0
} = {}) {
  const o = Math.max(0, be(e)), l = Math.max(0, be(t)), s = l > 0 ? Math.min(o / l, 1.4) : 0, u = Math.max(0, Math.round(be(n))), c = Math.max(0, Math.round(be(r))), m = pr(Math.round(be(a))), h = pr(Math.round(s * 90) + Math.min(u, 5) * 2), f = Math.round(Math.min(s, 1.1) * 80) + Math.min(u, 5) * 10 + Math.min(c, 7) * 5, y = Math.floor(f / 100) + 1, v = pr(m + Math.min(c, 7) * 5 + Math.min(u, 5) * 3);
  return qf({
    level: y,
    xp: f,
    mood: "hungry",
    energy: h,
    bond: v,
    streak: c
  });
}
function Dy({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0,
  overlayContext: o = null
} = {}) {
  const l = Math.max(0, be(e)), s = Math.max(0, be(t, 2e3)) || 2e3, u = Math.min(l / s, 1.4), c = Ko.find((y) => u >= y.minRatio) || Ko[Ko.length - 1], m = Ly({
    totalCalories: l,
    targetCalories: s,
    loggedMeals: n,
    streak: r,
    bond: a
  }), f = (o ? by(o) : null) || c;
  return {
    key: f.key,
    ratio: u,
    frameKey: f.frameKey,
    messageKey: f.messageKey,
    mood: f.mood,
    baseKey: c.key,
    baseMood: c.mood,
    progress: qf({
      ...m,
      mood: f.mood
    })
  };
}
function Ay(e = se()) {
  var c;
  const t = Rr((e == null ? void 0 : e.foodItems) || []), n = If(7, e == null ? void 0 : e.selectedDate), r = Number(e == null ? void 0 : e.targetCalories) || 0, a = Math.max(0, Number((c = e == null ? void 0 : e.profile) == null ? void 0 : c.weight) || 0), o = (e == null ? void 0 : e.currentGoalType) || "lose", l = _g({
    total: t.totals,
    targetCalories: r,
    calorieHistory: n,
    goalType: o,
    weightKg: a
  }), s = Ey(n), u = Dy({
    totalCalories: t.totals.cal,
    targetCalories: r,
    loggedMeals: Array.isArray(e == null ? void 0 : e.foodItems) ? e.foodItems.length : 0,
    streak: s
  });
  return {
    totals: t.totals,
    coach: l,
    calorieHistory: n,
    key: u.key,
    statusKey: u.key,
    frameKey: u.frameKey,
    messageKey: u.messageKey,
    mood: u.mood,
    baseKey: u.baseKey,
    baseMood: u.baseMood,
    ratio: u.ratio,
    progress: u.progress,
    interactionMessageKeys: jy
  };
}
const Py = Object.freeze([
  "calories",
  "protein",
  "carbohydrate",
  "fat"
]), Iy = Object.freeze([
  Object.freeze({
    id: "quality",
    fields: Object.freeze(["fiber", "sugar", "sodium"])
  }),
  Object.freeze({
    id: "fatDetails",
    fields: Object.freeze(["saturatedFat", "transFat"])
  })
]), zy = Object.freeze({
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbohydrate: "g",
  sugar: "g",
  sodium: "mg",
  saturatedFat: "g",
  transFat: "g",
  fiber: "g"
});
function _t(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function ac(e, t) {
  const n = t[e] ?? 0, r = e === "calories" || e === "sodium" ? Math.round(Number(n) || 0) : _t(n);
  return {
    field: e,
    value: r,
    unit: zy[e] || ""
  };
}
function Fy(e = []) {
  const t = Array.isArray(e) ? e : [];
  if (t.length === 0)
    return Te();
  const n = t.reduce((r, a) => {
    const o = Te(a);
    return Object.keys(r).forEach((l) => {
      r[l] += Number(o[l]) || 0;
    }), r;
  }, Te());
  return Object.fromEntries(
    Object.keys(n).map((r) => {
      const a = n[r] / t.length;
      return [r, r === "calories" || r === "sodium" ? Math.round(a) : _t(a)];
    })
  );
}
function Oy(e = {}) {
  const t = Te(e);
  return {
    nutrition: t,
    highlights: Py.map((n) => ac(n, t)),
    sections: Iy.map((n) => ({
      id: n.id,
      items: n.fields.map((r) => ac(r, t))
    }))
  };
}
function $y({
  todayNutrition: e = {},
  nutritionHistory: t = [],
  proteinTarget: n = 0,
  fiberTarget: r = 25,
  sodiumLimit: a = 2300
} = {}) {
  const o = Te(e), l = (Array.isArray(t) ? t : []).map((f) => Te(f)).filter((f) => Object.values(f).some((y) => Number(y) > 0)), s = Fy(l), u = Math.max(0, _t(n)), c = Math.max(0, _t(r)), m = Math.max(0, Math.round(Number(a) || 0));
  let h = "balanced";
  return l.length === 0 && o.calories <= 0 ? h = "start_logging" : u > 0 && o.protein < u * 0.72 ? h = "protein" : o.fiber < Math.max(c * 0.72, 12) ? h = "fiber" : m > 0 && o.sodium > m && (h = "sodium"), {
    focusKey: h,
    loggedDays: l.length,
    averageNutrition: s,
    proteinTarget: u,
    fiberTarget: c,
    sodiumLimit: m,
    signals: [
      {
        key: "protein",
        current: _t(o.protein),
        target: u,
        average: _t(s.protein)
      },
      {
        key: "fiber",
        current: _t(o.fiber),
        target: c,
        average: _t(s.fiber)
      },
      {
        key: "sodium",
        current: Math.round(o.sodium),
        target: m,
        average: Math.round(s.sodium)
      }
    ]
  };
}
const fo = Object.freeze({
  selectedDate: "",
  targetCalories: 0,
  currentGoalType: "lose",
  foodItems: Object.freeze([]),
  profile: null
});
function Rt(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function os(e = {}) {
  return Or({
    calories: Math.round(Number(e.cal) || 0),
    protein: Rt(e.pro),
    fat: Rt(e.fat),
    carbohydrate: Rt(e.carb),
    sugar: Rt(e.sugar),
    sodium: Math.round(Number(e.sod) || 0),
    saturatedFat: Rt(e.sat),
    transFat: Rt(e.trans),
    fiber: Rt(e.fiber)
  });
}
function Ry(e = 7, t) {
  return zf(e, t).map((n) => {
    const r = Rr((n == null ? void 0 : n.items) || []);
    return os(r.totals);
  }).filter((n) => Object.values(n).some((r) => Number(r) > 0));
}
function Jf(e) {
  return e && typeof e == "object" ? e : fo;
}
function em(e = fo) {
  var a;
  const t = Jf(e), n = Rr(t.foodItems), r = Math.max(0, Number((a = t.profile) == null ? void 0 : a.weight) || 0);
  return {
    selectedDate: t.selectedDate,
    targetCalories: Number(t.targetCalories) || 0,
    waterTarget: Math.round((r || 60) * 35),
    totals: n.totals
  };
}
function Hy(e = fo) {
  const t = em(e), n = os(t.totals), r = Number(t.targetCalories) || 0;
  return {
    nutrition: n,
    detail: Oy(n),
    targetCalories: r,
    remainingCalories: r > 0 ? Math.round(r - n.calories) : 0,
    waterTarget: Number(t.waterTarget) || 0
  };
}
function Wy(e = fo, { days: t = 7 } = {}) {
  var s, u;
  const n = Jf(e), r = em(n), a = os(r.totals), o = Math.max(0, Number((s = n == null ? void 0 : n.profile) == null ? void 0 : s.weight) || 0), l = co(r.targetCalories, {
    weightKg: o,
    goalType: (n == null ? void 0 : n.currentGoalType) || ((u = n == null ? void 0 : n.profile) == null ? void 0 : u.goalType) || "lose"
  });
  return {
    days: t,
    nutrition: a,
    ...$y({
      todayNutrition: a,
      nutritionHistory: Ry(t, n.selectedDate),
      proteinTarget: l.protein,
      fiberTarget: 25,
      sodiumLimit: 2300
    })
  };
}
function oc(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function By(e, t) {
  const n = yg(String((e == null ? void 0 : e.currentMealMode) || "4"), {}, Number(e == null ? void 0 : e.targetCalories) || 0), r = n.map((s) => s.type), a = new Set(
    ((t == null ? void 0 : t.foodItems) || []).map((s) => s == null ? void 0 : s.type).filter(Boolean)
  ), o = r.filter((s) => a.has(s)).length, l = n.find((s) => !a.has(s.type)) || null;
  return {
    plannedMealTypes: r,
    loggedMealTypes: [...a],
    loggedMeals: o,
    plannedMeals: n.length,
    nextMealType: (l == null ? void 0 : l.type) || "",
    nextMealTitleKey: (l == null ? void 0 : l.titleKey) || ""
  };
}
function Uy(e = se()) {
  var L, p, d, g, _, x, T, N;
  const t = e || se(), n = Eg(t), r = Ay(t), a = ny(t, { days: 7 }), o = Math.max(0, Number((L = t == null ? void 0 : t.profile) == null ? void 0 : L.weight) || 0), l = co(n.targetCalories, {
    weightKg: o,
    goalType: (t == null ? void 0 : t.currentGoalType) || ((p = t == null ? void 0 : t.profile) == null ? void 0 : p.goalType) || "lose"
  }), s = Math.max(0, Number(l.protein) || 0), u = Math.max(0, Number(l.fat) || 0), c = Math.max(0, Number(l.carb) || 0), m = oc(n.totals.pro, 1), h = Math.max(0, oc(s - m, 1)), f = By(t, n), y = Math.round(Math.max(0, (n.targetCalories || 0) - (n.totals.cal || 0))), v = Ny({
    lang: (t == null ? void 0 : t.curLang) || "en",
    profileRegion: ((d = t == null ? void 0 : t.profile) == null ? void 0 : d.region) || ""
  }), S = (v.regions || []).find((M) => M.id === v.selectedRegion);
  return {
    lang: (t == null ? void 0 : t.curLang) || "en",
    goalType: (t == null ? void 0 : t.currentGoalType) || ((g = t == null ? void 0 : t.profile) == null ? void 0 : g.goalType) || "lose",
    diningOutFrequency: String(((_ = t == null ? void 0 : t.profile) == null ? void 0 : _.diningOutFrequency) || "sometimes"),
    targetCalories: n.targetCalories,
    remainingCalories: y,
    calorieProgressPercent: n.targetCalories > 0 ? Math.min(Math.round(n.totals.cal / n.targetCalories * 100), 199) : 0,
    presetRegion: v.selectedRegion,
    presetRegionLabel: (S == null ? void 0 : S.label) || v.selectedRegion || "",
    presetCount: ((x = v.presets) == null ? void 0 : x.length) || 0,
    featuredPresetName: ((N = (T = v.presets) == null ? void 0 : T[0]) == null ? void 0 : N.label) || "",
    proteinTarget: s,
    proteinCurrent: m,
    proteinRemaining: h,
    fatTarget: u,
    carbTarget: c,
    mealCoverage: f,
    daily: n,
    pet: r,
    rhythm: a
  };
}
const Ky = ["breakfast", "lunch", "dinner", "snack"], Go = Object.freeze({
  en: Object.freeze({
    nutritionSummaryTitle: "Nutrition summary",
    nutritionSummaryHint: "See today's macro balance at a glance, then open all 8 nutrient details.",
    nutritionSummaryCta: "Open the full nutrition summary",
    mealDiaryTitle: "Meal diary",
    mealDiaryHint: "Meals you log stay organized here so Home stays easy to scan.",
    nutrientCountLabel: "8 nutrients"
  }),
  "zh-TW": Object.freeze({
    nutritionSummaryTitle: "營養摘要",
    nutritionSummaryHint: "先快速看今天的三大營養素，再打開完整 8 項營養資訊。",
    nutritionSummaryCta: "查看完整營養摘要",
    mealDiaryTitle: "餐點日記",
    mealDiaryHint: "今天記錄的餐點都整理在這裡，讓首頁保持乾淨好讀。",
    nutrientCountLabel: "8 項營養"
  }),
  "zh-CN": Object.freeze({
    nutritionSummaryTitle: "营养摘要",
    nutritionSummaryHint: "先快速看今天的三大营养素，再打开完整 8 项营养信息。",
    nutritionSummaryCta: "查看完整营养摘要",
    mealDiaryTitle: "餐点日记",
    mealDiaryHint: "今天记录的餐点都整理在这里，让首页保持干净好读。",
    nutrientCountLabel: "8 项营养"
  })
}), Vo = Object.freeze({
  en: Object.freeze({
    hungry: "Waiting for the first bite",
    low: "Warming up",
    mid: "Sniffing the next meal",
    balanced: "Happy and balanced",
    full: "Full and resting",
    sleeping: "Sleepy companion",
    lonely: "Missed you",
    starving: "Very hungry",
    excited: "Daily quests complete",
    celebrating: "Level-up mood",
    default: "Companion mode"
  }),
  "zh-TW": Object.freeze({
    hungry: "等第一口飯飯",
    low: "開始有精神",
    mid: "正在尋找下一餐",
    balanced: "開心又穩定",
    full: "吃飽休息中",
    sleeping: "睏睏陪伴中",
    lonely: "好想你",
    starving: "肚子很餓",
    excited: "今日任務完成",
    celebrating: "升級開心中",
    default: "陪伴模式"
  }),
  "zh-CN": Object.freeze({
    hungry: "等第一口饭饭",
    low: "开始有精神",
    mid: "正在寻找下一餐",
    balanced: "开心又稳定",
    full: "吃饱休息中",
    sleeping: "困困陪伴中",
    lonely: "好想你",
    starving: "肚子很饿",
    excited: "今日任务完成",
    celebrating: "升级开心中",
    default: "陪伴模式"
  })
});
function j(e, t = "") {
  return e == null ? t : String(e);
}
function Gy(e = "en") {
  return Vo[e] || Vo[String(e || "en").split("-")[0]] || Vo.en;
}
function Qo(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Vy(e = "en") {
  return Go[e] || Go[String(e || "en").split("-")[0]] || Go.en;
}
function Sa(e, t) {
  var r;
  const n = pt(t);
  return ((r = n == null ? void 0 : n.meals) == null ? void 0 : r[e]) || e || "";
}
function Qy(e) {
  return e === "zh-TW" || e === "zh-CN" ? "加入常吃" : "Save favorite";
}
function Yy(e) {
  return e === "zh-TW" ? "刪除餐點" : e === "zh-CN" ? "删除餐点" : "Delete meal";
}
function Zy(e, t, n) {
  const r = es(t), o = Ky.map((l) => {
    const s = e.filter((c) => c.mealType === l), u = s.reduce((c, m) => c + m.calories, 0);
    return {
      key: l,
      label: Sa(l, t),
      totalCalories: u,
      metaText: s.length > 0 ? r.mealGroupMeta(s.length, u) : n,
      items: s,
      emptyText: n
    };
  }).filter((l) => l.items.length > 0);
  return o.length > 0 ? o : [];
}
function Xy(e) {
  var L, p, d, g, _, x, T, N, M, F, A, ae, Y, ht, Hn, Wr, nn, rn, b, D, P, W, Z, Ot, Ve, an, Qe, $t, fs, ms, ps, hs, gs, ys, vs, _s, Ss, ws, ks, xs, Ts, Ns, bs, Cs, Ms, js, Es, Ls, Ds, As, Ps, Is, zs, Fs, Os, $s, Rs, Hs;
  const t = Uy(e), n = pt(t.lang), r = Vg(t, t.lang), a = es(t.lang), o = Vy(t.lang), l = ((L = r.hero) == null ? void 0 : L.stats) || [], s = ((p = r.hero) == null ? void 0 : p.meta) || [], u = (((d = t.daily) == null ? void 0 : d.foodItems) || []).map((E, Br) => {
    const on = (E == null ? void 0 : E.nutri) || (E == null ? void 0 : E.nutrition) || {}, mo = Number((on == null ? void 0 : on.calories) ?? (on == null ? void 0 : on.cal) ?? 0) || 0, po = String((E == null ? void 0 : E.type) || "snack");
    return {
      id: `${po}-${Br}-${String((E == null ? void 0 : E.name) || "meal")}`.replace(/\s+/g, "-").toLowerCase(),
      sourceIndex: Br,
      name: j((E == null ? void 0 : E.name) || (E == null ? void 0 : E.foodName), ""),
      mealType: po,
      mealTypeLabel: Sa(po, t.lang),
      calories: mo,
      portion: j((E == null ? void 0 : E.weight) || (E == null ? void 0 : E.portion) || "", ""),
      hint: mo > 0 ? `${Math.round(mo)} kcal` : (n == null ? void 0 : n.txtNoData) || ""
    };
  }).filter((E) => E.name || E.calories > 0), c = Zy(u, t.lang, a.emptyMeal), m = ts(e.selectedDate, t.lang), h = me(), f = u.reduce((E, Br) => E + Br.calories, 0), y = Qo((_ = (g = t.daily) == null ? void 0 : g.totals) == null ? void 0 : _.pro, 1), v = Qo((T = (x = t.daily) == null ? void 0 : x.totals) == null ? void 0 : T.fat, 1), S = Qo((M = (N = t.daily) == null ? void 0 : N.totals) == null ? void 0 : M.carb, 1);
  return {
    companion: {
      ...t,
      pet: {
        ...t.pet,
        resolvedMessage: j(n == null ? void 0 : n[(F = t.pet) == null ? void 0 : F.messageKey], "") || j((A = t.pet) == null ? void 0 : A.messageKey, ""),
        equipped: ((ae = t.pet) == null ? void 0 : ae.equipped) || {},
        nutrition: {
          calorieProgressPercent: Number(t.calorieProgressPercent) || 0,
          proteinPercent: t.proteinTarget > 0 ? Math.min(Math.round(t.proteinCurrent / t.proteinTarget * 100), 199) : 0,
          proteinCurrent: t.proteinCurrent,
          proteinTarget: t.proteinTarget,
          loggedMeals: Number((Y = t.mealCoverage) == null ? void 0 : Y.loggedMeals) || 0,
          plannedMeals: Number((ht = t.mealCoverage) == null ? void 0 : ht.plannedMeals) || 0,
          nextMealType: Sa((Hn = t.mealCoverage) == null ? void 0 : Hn.nextMealType, t.lang)
        }
      }
    },
    petStageCopy: {
      pet: a.pet || "Companion",
      kicker: j((Wr = a.petStage) == null ? void 0 : Wr.kicker, a.pet || "Companion"),
      bondLabel: j((nn = a.petStage) == null ? void 0 : nn.bondLabel, (n == null ? void 0 : n.petBondLabel) || "Bond"),
      energyLabel: j((rn = a.petStage) == null ? void 0 : rn.energyLabel, (n == null ? void 0 : n.petEnergyLabel) || "Energy"),
      streakLabel: j((b = a.petStage) == null ? void 0 : b.streakLabel, (n == null ? void 0 : n.petStreakLabel) || "Streak"),
      dayUnit: j((D = a.petStage) == null ? void 0 : D.dayUnit, (n == null ? void 0 : n.petDayUnit) || "d"),
      petTapLabel: j((P = a.petStage) == null ? void 0 : P.tapLabel, (n == null ? void 0 : n.petTapLabel) || "Interact with your companion"),
      tapHint: j((W = a.petStage) == null ? void 0 : W.tapHint, ""),
      nextMealHint: j((Z = a.petStage) == null ? void 0 : Z.nextMealHint, ""),
      feedAction: j((Ot = a.petStage) == null ? void 0 : Ot.feedAction, (an = (Ve = r.hero) == null ? void 0 : Ve.actions) == null ? void 0 : an.log),
      carePanelLabel: j((Qe = a.petStage) == null ? void 0 : Qe.carePanelLabel, "Nutrition status"),
      caloriesLabel: j(($t = a.metrics) == null ? void 0 : $t.calories, "Calories"),
      proteinLabel: j((fs = a.metrics) == null ? void 0 : fs.protein, "Protein"),
      mealsLabel: j((ms = a.metrics) == null ? void 0 : ms.meals, "Meals"),
      statusLabels: Gy(t.lang)
    },
    resolveDialogText: (E) => j(n == null ? void 0 : n[E], ""),
    copy: {
      ...a,
      favoriteActionLabel: Qy(t.lang),
      deleteActionLabel: Yy(t.lang),
      appName: j(a.appName, "Woof Cal"),
      screenTitle: j(a.screenTitle, a.today || "Today"),
      dailyCaloriesTitle: j(a.dailyCaloriesTitle, "Daily calories"),
      remainingLabel: j(a.remainingLabel, "Remaining"),
      macroFocusEyebrow: j(a.macroFocusEyebrow, "3 macro focus"),
      macroFocusTitle: j(a.macroFocusTitle, "Macros"),
      macroFocusHint: j(a.macroFocusHint, ""),
      mealDiaryEyebrow: j(a.mealDiaryEyebrow, o.mealDiaryTitle),
      previousDate: j(a.previousDate, "Previous date"),
      nextDate: j(a.nextDate, "Next date"),
      headlineEmpty: j(a.headlineEmpty, "Start your first meal"),
      headlineProgress: j(a.headlineProgress, "Nice momentum today"),
      headlineComplete: j(a.headlineComplete, "Great progress today")
    },
    hero: {
      eyebrow: j((ps = r.hero) == null ? void 0 : ps.eyebrow, ""),
      title: j((hs = r.hero) == null ? void 0 : hs.title, ""),
      summary: j((gs = r.hero) == null ? void 0 : gs.summary, ""),
      stats: l.map((E) => ({
        label: j(E == null ? void 0 : E.label, ""),
        value: j(E == null ? void 0 : E.value, "")
      })),
      meta: s.map((E) => j(E, "")).filter(Boolean),
      actions: {
        log: j((vs = (ys = r.hero) == null ? void 0 : ys.actions) == null ? void 0 : vs.log, "Log meal"),
        ai: j((Ss = (_s = r.hero) == null ? void 0 : _s.actions) == null ? void 0 : Ss.ai, "AI Analysis"),
        favorites: j((ks = (ws = r.hero) == null ? void 0 : ws.actions) == null ? void 0 : ks.favorites, "Favorites")
      }
    },
    quickLog: {
      title: j((xs = r.logHub) == null ? void 0 : xs.title, ""),
      summary: j((Ts = r.logHub) == null ? void 0 : Ts.summary, ""),
      favoritesCopy: j((Ns = r.logHub) == null ? void 0 : Ns.favoritesCopy, ""),
      todayMealsKicker: j((bs = r.logHub) == null ? void 0 : bs.todayMealsKicker, a.today),
      todayMealsTitle: j((Cs = r.logHub) == null ? void 0 : Cs.todayMealsTitle, a.today),
      todayMealsHint: j((Ms = r.logHub) == null ? void 0 : Ms.todayMealsHint, "")
    },
    overview: {
      title: j((js = r.overview) == null ? void 0 : js.title, ""),
      hint: j((Es = r.overview) == null ? void 0 : Es.hint, ""),
      signals: (((Ls = r.overview) == null ? void 0 : Ls.signals) || []).map((E) => ({
        label: j(E == null ? void 0 : E.label, ""),
        value: j(E == null ? void 0 : E.value, "--"),
        detail: j(E == null ? void 0 : E.detail, "")
      }))
    },
    todayMeals: {
      title: o.mealDiaryTitle,
      hint: u.length > 0 ? a.mealGroupMeta(u.length, f) : o.mealDiaryHint,
      kicker: j((Ds = r.logHub) == null ? void 0 : Ds.todayMealsKicker, a.today),
      actionLabel: m,
      dateLabel: m,
      dateControl: {
        value: e.selectedDate,
        label: m,
        max: h,
        nextDisabled: e.selectedDate >= h
      },
      count: u.length,
      totalCalories: f,
      groups: c
    },
    dashboard: {
      title: o.nutritionSummaryTitle,
      hint: o.nutritionSummaryHint,
      cta: o.nutritionSummaryCta,
      nutrientCountLabel: o.nutrientCountLabel,
      caloriesLabel: n.cal || ((As = a.metrics) == null ? void 0 : As.calories) || "Calories",
      caloriesValue: Number((Is = (Ps = t.daily) == null ? void 0 : Ps.totals) == null ? void 0 : Is.cal) || 0,
      remainingCalories: Number(t.remainingCalories) || 0,
      macros: [
        {
          key: "protein",
          label: n.pro || "Protein",
          shortLabel: n.pro || "Protein",
          value: y,
          unit: "g",
          color: "#57a56d"
        },
        {
          key: "fat",
          label: n.fat || "Fat",
          shortLabel: n.fat || "Fat",
          value: v,
          unit: "g",
          color: "#f0b95d"
        },
        {
          key: "carbohydrate",
          label: n.carb || "Carb",
          shortLabel: n.carb || "Carb",
          value: S,
          unit: "g",
          color: "#79aef7"
        }
      ]
    },
    today: {
      calories: Number((Fs = (zs = t.daily) == null ? void 0 : zs.totals) == null ? void 0 : Fs.cal) || 0,
      targetCalories: Number(t.targetCalories) || 0,
      remainingCalories: Number(t.remainingCalories) || 0,
      calorieProgressPercent: Number(t.calorieProgressPercent) || 0,
      proteinCurrent: Number(t.proteinCurrent) || 0,
      proteinTarget: Number(t.proteinTarget) || 0,
      proteinRemaining: Number(t.proteinRemaining) || 0,
      fatCurrent: Number(v) || 0,
      fatTarget: Number(t.fatTarget) || 0,
      carbCurrent: Number(S) || 0,
      carbTarget: Number(t.carbTarget) || 0,
      loggedMeals: Number((Os = t.mealCoverage) == null ? void 0 : Os.loggedMeals) || 0,
      plannedMeals: Number(($s = t.mealCoverage) == null ? void 0 : $s.plannedMeals) || 0,
      nextMealType: Sa((Rs = t.mealCoverage) == null ? void 0 : Rs.nextMealType, t.lang),
      nextMealTitleKey: j((Hs = t.mealCoverage) == null ? void 0 : Hs.nextMealTitleKey, "")
    }
  };
}
function qy() {
  const e = Rn();
  return X.useMemo(
    () => Xy(e),
    [
      e.selectedDate,
      e.curLang,
      e.targetCalories,
      e.currentMealMode,
      e.currentGoalType,
      e.foodItems,
      e.profile
    ]
  );
}
function Jy() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" }),
    /* @__PURE__ */ i.jsx("path", { d: "M12 18a2 2 0 0 1-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 0 1-2 2Z" })
  ] });
}
function tm() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
    /* @__PURE__ */ i.jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" }),
    /* @__PURE__ */ i.jsx("path", { d: "M8 7h8" }),
    /* @__PURE__ */ i.jsx("path", { d: "M8 11h5" })
  ] });
}
function ev() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("ellipse", { cx: "8.5", cy: "6.5", rx: "1.8", ry: "2.2" }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: "15.5", cy: "6.5", rx: "1.8", ry: "2.2" }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: "5.5", cy: "11.5", rx: "1.5", ry: "2" }),
    /* @__PURE__ */ i.jsx("ellipse", { cx: "18.5", cy: "11.5", rx: "1.5", ry: "2" }),
    /* @__PURE__ */ i.jsx("path", { d: "M7 17c0-2.5 2-4.5 5-4.5s5 2 5 4.5c0 1.5-1.5 3-5 3s-5-1.5-5-3Z" })
  ] });
}
function tv() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M18 20V10" }),
    /* @__PURE__ */ i.jsx("path", { d: "M12 20V4" }),
    /* @__PURE__ */ i.jsx("path", { d: "M6 20v-6" })
  ] });
}
function nv() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ i.jsx("circle", { cx: "12", cy: "7", r: "4" })
  ] });
}
const rv = 3e3, lc = 1500;
function av({ mood: e = "hungry", onBondChange: t } = {}) {
  const [n, r] = X.useState(null), a = X.useRef(null), o = X.useRef({ count: 0, timer: null }), l = X.useRef({ startTime: 0, timer: null, active: !1 }), s = X.useCallback(() => {
    r(null);
  }, []), u = X.useCallback((y, v = {}, S = {}) => {
    if (a.current && !S.ignoreCooldown) return;
    const L = Cy({ type: y, mood: e, ...v });
    r({ type: y, ...L, timestamp: Date.now() }), L.bondDelta > 0 && typeof t == "function" && t(L.bondDelta);
    const p = My[y] || 2e3;
    a.current = setTimeout(() => {
      a.current = null;
    }, p);
  }, [e, t]), c = X.useCallback((y) => {
    y.preventDefault(), l.current.startTime = Date.now(), l.current.active = !0, l.current.timer = setTimeout(() => {
      if (!l.current.active) return;
      l.current.active = !1;
      const v = (Date.now() - l.current.startTime) / 1e3;
      u(Be.LONG_PRESS, { holdSeconds: v });
    }, lc);
  }, [u]), m = X.useCallback(() => {
    if (!l.current.active) return;
    l.current.active = !1;
    const y = Date.now() - l.current.startTime;
    if (clearTimeout(l.current.timer), y >= lc) {
      const v = y / 1e3;
      u(Be.LONG_PRESS, { holdSeconds: v });
      return;
    }
    if (o.current.count += 1, clearTimeout(o.current.timer), o.current.count >= 3) {
      const v = o.current.count;
      o.current.count = 0, u(Be.COMBO, { comboCount: v }, { ignoreCooldown: !0 });
      return;
    }
    o.current.timer = setTimeout(() => {
      o.current.count = 0;
    }, rv), u(Be.TAP, {}, { ignoreCooldown: !0 });
  }, [u]), h = X.useCallback((y) => {
    y.key !== "Enter" && y.key !== " " || (y.preventDefault(), u(Be.TAP, {}, { ignoreCooldown: !0 }));
  }, [u]), f = X.useCallback(() => {
    l.current.active = !1, clearTimeout(l.current.timer);
  }, []);
  return {
    interaction: n,
    clearInteraction: s,
    pointerHandlers: {
      onPointerDown: c,
      onPointerUp: m,
      onPointerCancel: f,
      onPointerLeave: f,
      onKeyDown: h
    }
  };
}
const ov = 3e3;
function lv({ text: e, visible: t = !1, onDismiss: n }) {
  const [r, a] = X.useState(!1);
  return X.useEffect(() => {
    if (!t || !e) {
      a(!1);
      return;
    }
    a(!0);
    const o = setTimeout(() => {
      a(!1), typeof n == "function" && n();
    }, ov);
    return () => clearTimeout(o);
  }, [t, e, n]), !r || !e ? null : /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__speech-bubble", "aria-live": "polite", children: [
    /* @__PURE__ */ i.jsx("span", { className: "woof-pet__speech-text", children: e }),
    /* @__PURE__ */ i.jsx("div", { className: "woof-pet__speech-tail", "aria-hidden": "true" })
  ] });
}
const ic = {
  hearts: ["❤️", "💕", "💖"],
  stars: ["⭐", "✨", "🌟"],
  zzz: ["💤", "Z", "z"],
  sweat: ["💦", "😅"],
  confetti: ["🎉", "🎊", "✨", "🌟"],
  bounce: ["✨", "⭐"],
  spiral: ["💫", "😵‍💫"]
};
function iv({ effect: e }) {
  if (!e || e === "none") return null;
  const t = ic[e] || ic.stars;
  return /* @__PURE__ */ i.jsx("div", { className: "woof-pet__particles", "aria-hidden": "true", children: t.map((n, r) => /* @__PURE__ */ i.jsx(
    "span",
    {
      className: `woof-pet__particle woof-pet__particle--${r}`,
      children: n
    },
    `${e}-${r}`
  )) });
}
const sc = Object.freeze({
  hungry: "dog_animation/dog_sad.gif",
  low: "dog_animation/dog_idle.gif",
  mid: "dog_animation/dog_walk.gif",
  balanced: "dog_animation/dog_happy.gif",
  full: "dog_animation/dog_fat.gif",
  eating: "dog_animation/dog_eat.gif",
  sleeping: "dog_animation/dog_idle.gif",
  lonely: "dog_animation/dog_sad.gif",
  excited: "dog_animation/dog_happy.gif",
  celebrating: "dog_animation/dog_happy.gif",
  starving: "dog_animation/dog_sad.gif"
});
function sv(e = "low") {
  return sc[e] || sc.low;
}
function uv(e, t) {
  const n = e - (t - 1) * 100;
  return `${Math.max(0, n)}/100`;
}
function qn(e) {
  return `${Math.max(0, Math.min(Math.round(Number(e) || 0), 199))}%`;
}
function cv(e, t, n = "g") {
  const r = Math.round(Number(e) || 0), a = Math.round(Number(t) || 0);
  return a > 0 ? `${r}/${a}${n}` : `${r}${n}`;
}
function dv(e) {
  return String(e || "hungry").replace(/[^a-z0-9-]/gi, "").toLowerCase() || "hungry";
}
function fv({
  pet: e = {},
  copy: t = {},
  resolveDialogText: n,
  onQuickLog: r
}) {
  var N, M;
  const a = dv((e == null ? void 0 : e.statusKey) || (e == null ? void 0 : e.key) || (e == null ? void 0 : e.baseKey) || (e == null ? void 0 : e.frameKey)), o = a, l = (e == null ? void 0 : e.progress) || {}, [s, u] = X.useState(""), c = X.useCallback(() => {
  }, []), { interaction: m, clearInteraction: h, pointerHandlers: f } = av({
    mood: o,
    onBondChange: c
  });
  X.useEffect(() => {
    if (!(m != null && m.animClass)) return;
    u(m.animClass);
    const F = setTimeout(() => u(""), 800);
    return () => clearTimeout(F);
  }, [m]);
  const y = m != null && m.dialogKey && typeof n == "function" ? n(m.dialogKey) : "", v = (e == null ? void 0 : e.nutrition) || {}, S = Number(v.calorieProgressPercent) || Math.round((Number(e == null ? void 0 : e.ratio) || 0) * 100), L = Number(v.proteinPercent) || 0, p = Number(v.loggedMeals) || 0, d = Number(v.plannedMeals) || 0, g = d > 0 ? `${p}/${d}` : String(p), _ = ((N = t.statusLabels) == null ? void 0 : N[a]) || ((M = t.statusLabels) == null ? void 0 : M.default) || a, x = v.nextMealType ? (t.nextMealHint || "Next: {meal}").replace("{meal}", v.nextMealType) : t.tapHint || "", T = (e == null ? void 0 : e.equipped) || {};
  return /* @__PURE__ */ i.jsxs(
    "section",
    {
      className: `woof-pet__stage woof-pet__stage--${a}`,
      "aria-label": t.pet || "Companion",
      "data-status": a,
      children: [
        /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__header", children: [
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__kicker", children: t.kicker || t.pet || "Companion" }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__status-title", children: _ })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__status-pill", children: [
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__status-dot", "aria-hidden": "true" }),
            /* @__PURE__ */ i.jsx("span", { children: qn(S) })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__scene", children: [
          /* @__PURE__ */ i.jsx("div", { className: "woof-pet__sun", "aria-hidden": "true" }),
          /* @__PURE__ */ i.jsx("div", { className: "woof-pet__backdrop-line woof-pet__backdrop-line--one", "aria-hidden": "true" }),
          /* @__PURE__ */ i.jsx("div", { className: "woof-pet__backdrop-line woof-pet__backdrop-line--two", "aria-hidden": "true" }),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__food-bowl", "aria-hidden": "true", children: [
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__food-bowl-dot" }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__food-bowl-dot" }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__food-bowl-dot" })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "woof-pet__orb", "aria-hidden": "true" }),
          /* @__PURE__ */ i.jsxs(
            "div",
            {
              className: `woof-pet__character ${s}`,
              ...f,
              role: "button",
              tabIndex: 0,
              "aria-label": t.petTapLabel || "Interact with pet",
              style: { touchAction: "none" },
              children: [
                /* @__PURE__ */ i.jsx(
                  "img",
                  {
                    className: "woof-pet__sprite woof-pet__sprite--base",
                    src: sv(e == null ? void 0 : e.frameKey),
                    alt: "",
                    loading: "eager",
                    decoding: "async",
                    draggable: !1
                  }
                ),
                T.outfit && /* @__PURE__ */ i.jsx(
                  "img",
                  {
                    className: "woof-pet__sprite woof-pet__sprite--outfit",
                    src: `costumes/${T.outfit}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                    alt: "",
                    draggable: !1
                  }
                ),
                T.accessory && /* @__PURE__ */ i.jsx(
                  "img",
                  {
                    className: "woof-pet__sprite woof-pet__sprite--accessory",
                    src: `costumes/${T.accessory}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                    alt: "",
                    draggable: !1
                  }
                ),
                T.headwear && /* @__PURE__ */ i.jsx(
                  "img",
                  {
                    className: "woof-pet__sprite woof-pet__sprite--headwear",
                    src: `costumes/${T.headwear}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                    alt: "",
                    draggable: !1
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ i.jsx(iv, { effect: m == null ? void 0 : m.effect }),
          /* @__PURE__ */ i.jsx(
            lv,
            {
              text: y || (e == null ? void 0 : e.resolvedMessage) || x,
              visible: !!m || !!(e != null && e.resolvedMessage),
              onDismiss: h
            }
          )
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__care-panel", "aria-label": t.carePanelLabel || "Nutrition status", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__care-row", children: [
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-label", children: t.caloriesLabel || "Calories" }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-value", children: qn(S) }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-track", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("span", { style: { width: qn(S) } }) })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__care-row", children: [
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-label", children: t.proteinLabel || "Protein" }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-value", children: cv(v.proteinCurrent, v.proteinTarget) }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-track woof-pet__care-track--protein", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("span", { style: { width: qn(L) } }) })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__care-row", children: [
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-label", children: t.mealsLabel || "Meals" }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-value", children: g }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-pet__care-track woof-pet__care-track--meal", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx("span", { style: { width: qn(d > 0 ? p / d * 100 : 0) } }) })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__stats", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__level-badge", children: [
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__level-label", children: "Lv." }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__level-value", children: l.level || 1 })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__xp-bar", children: [
            /* @__PURE__ */ i.jsx(
              "div",
              {
                className: "woof-pet__xp-fill",
                style: { width: `${Math.min((l.xp || 0) % 100, 100)}%` }
              }
            ),
            /* @__PURE__ */ i.jsxs("span", { className: "woof-pet__xp-text", children: [
              uv(l.xp || 0, l.level || 1),
              " XP"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__meters", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__meter", title: t.bondLabel || "Bond", children: [
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "❤️" }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-label", children: t.bondLabel || "Bond" }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-value", children: l.bond || 0 })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__meter", title: t.energyLabel || "Energy", children: [
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "⚡" }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-label", children: t.energyLabel || "Energy" }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-value", children: l.energy || 0 })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__meter", title: t.streakLabel || "Streak", children: [
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "🔥" }),
            /* @__PURE__ */ i.jsx("span", { className: "woof-pet__meter-label", children: t.streakLabel || "Streak" }),
            /* @__PURE__ */ i.jsxs("span", { className: "woof-pet__meter-value", children: [
              l.streak || 0,
              t.dayUnit || "d"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "woof-pet__footer", children: [
          /* @__PURE__ */ i.jsx("span", { className: "woof-pet__tap-hint", children: x || t.tapHint || "" }),
          typeof r == "function" ? /* @__PURE__ */ i.jsx("button", { className: "woof-pet__feed-button", type: "button", onClick: r, children: t.feedAction || "Feed" }) : null
        ] })
      ]
    }
  );
}
function qe() {
}
function Zl(e) {
  const t = Math.round((Number(e) || 0) * 10) / 10;
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
}
function mv({
  name: e,
  calories: t,
  portion: n,
  favoriteLabel: r,
  deleteLabel: a,
  onFavorite: o = qe,
  onDelete: l = qe
}) {
  return /* @__PURE__ */ i.jsxs("div", { className: "woof-home__meal-row", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "woof-home__meal-row-main", children: [
      /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-name", children: e }),
      n ? /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-portion", children: n }) : null
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "woof-home__meal-row-side", children: [
      /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-calories", children: t > 0 ? `${Math.round(t)} kcal` : "--" }),
      /* @__PURE__ */ i.jsxs("div", { className: "woof-home__meal-row-actions", children: [
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "woof-home__meal-action woof-home__meal-action--favorite",
            onClick: o,
            "aria-label": r,
            title: r,
            children: /* @__PURE__ */ i.jsx("span", { className: "woof-home__meal-action-icon", "aria-hidden": "true", children: "♡" })
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "woof-home__meal-action woof-home__meal-action--delete",
            onClick: l,
            "aria-label": a,
            title: a,
            children: /* @__PURE__ */ i.jsx("span", { className: "woof-home__meal-action-icon", "aria-hidden": "true", children: "×" })
          }
        )
      ] })
    ] })
  ] });
}
function pv({
  group: e,
  favoriteLabel: t,
  deleteLabel: n,
  onFavoriteMeal: r = qe,
  onDeleteMeal: a = qe
}) {
  const o = e.items || [], l = o.length > 0, s = e.metaText || e.emptyText;
  return /* @__PURE__ */ i.jsxs("div", { className: "woof-home__meal-group", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "woof-home__meal-group-header", children: [
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-type", children: e.label }),
        /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-group-meta", children: s })
      ] }),
      l ? /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-group-total", children: e.totalCalories > 0 ? `${Math.round(e.totalCalories)} kcal` : "--" }) : null
    ] }),
    l ? /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-list", children: o.map((u) => /* @__PURE__ */ i.jsx(
      mv,
      {
        name: u.name,
        calories: u.calories,
        portion: u.portion,
        favoriteLabel: t,
        deleteLabel: n,
        onFavorite: () => r(u.sourceIndex),
        onDelete: () => a(u.sourceIndex)
      },
      u.id
    )) }) : /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-group-empty", children: e.emptyText })
  ] });
}
function hv({
  control: e,
  changeLabel: t,
  previousLabel: n,
  nextLabel: r,
  onShiftDate: a,
  onSelectDate: o
}) {
  return e ? /* @__PURE__ */ i.jsxs("div", { className: "woof-home__date-nav", "aria-label": t, children: [
    /* @__PURE__ */ i.jsx(
      "button",
      {
        type: "button",
        className: "woof-home__date-nav-button",
        onClick: () => a(-1),
        "aria-label": n,
        children: "‹"
      }
    ),
    /* @__PURE__ */ i.jsxs("label", { className: "woof-home__date-pill", title: e.label, children: [
      /* @__PURE__ */ i.jsx("span", { children: e.label }),
      /* @__PURE__ */ i.jsx("span", { className: "woof-home__date-pill-caret", "aria-hidden": "true", children: "▾" }),
      /* @__PURE__ */ i.jsx(
        "input",
        {
          type: "date",
          className: "woof-home__date-input",
          value: e.value,
          max: e.max,
          "aria-label": t,
          onChange: (l) => o(l.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ i.jsx(
      "button",
      {
        type: "button",
        className: "woof-home__date-nav-button",
        onClick: () => a(1),
        "aria-label": r,
        disabled: e.nextDisabled,
        children: "›"
      }
    )
  ] }) : null;
}
function gv({ progress: e = 0, calories: t = "--", target: n = "--" }) {
  const a = 2 * Math.PI * 42, l = Math.max(0, Math.min(Number(e) || 0, 100)) / 100 * a;
  return /* @__PURE__ */ i.jsxs("div", { className: "woof-home__progress-ring", "aria-hidden": "true", children: [
    /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 120 120", className: "woof-home__progress-ring-svg", children: [
      /* @__PURE__ */ i.jsx("circle", { className: "woof-home__progress-ring-track", cx: "60", cy: "60", r: 42 }),
      /* @__PURE__ */ i.jsx(
        "circle",
        {
          className: "woof-home__progress-ring-fill",
          cx: "60",
          cy: "60",
          r: 42,
          strokeDasharray: `${l} ${a - l}`
        }
      )
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "woof-home__progress-ring-center", children: [
      /* @__PURE__ */ i.jsx("div", { className: "woof-home__progress-ring-calories", children: t }),
      /* @__PURE__ */ i.jsxs("div", { className: "woof-home__progress-ring-target", children: [
        "/ ",
        n
      ] })
    ] })
  ] });
}
function yv({ label: e, value: t = 0, target: n = 0, tone: r = "protein" }) {
  const a = Math.max(Number(n) || 0, 0), o = Math.max(Number(t) || 0, 0), l = a > 0 ? Math.min(o / a * 100, 100) : 0;
  return /* @__PURE__ */ i.jsxs("div", { className: "woof-home__macro-progress-row", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "woof-home__macro-progress-head", children: [
      /* @__PURE__ */ i.jsx("span", { className: "woof-home__macro-progress-label", children: e }),
      /* @__PURE__ */ i.jsx("span", { className: "woof-home__macro-progress-value", children: `${Zl(o)}g / ${Zl(a)}g` })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "woof-home__macro-progress-track", children: /* @__PURE__ */ i.jsx(
      "div",
      {
        className: `woof-home__macro-progress-fill woof-home__macro-progress-fill--${r}`,
        style: { width: `${l}%` }
      }
    ) })
  ] });
}
function vv({ label: e, value: t }) {
  return /* @__PURE__ */ i.jsxs("div", { className: "woof-home__motivation-stat", children: [
    /* @__PURE__ */ i.jsx("div", { className: "woof-home__motivation-stat-value", children: t }),
    /* @__PURE__ */ i.jsx("div", { className: "woof-home__motivation-stat-label", children: e })
  ] });
}
function _v({
  onQuickLog: e = qe,
  onSetSelectedDate: t = qe,
  onShiftDate: n = qe,
  onFavoriteMealItem: r = qe,
  onDeleteMealItem: a = qe,
  onOpenDailySummary: o = qe
}) {
  var N, M, F, A, ae;
  const l = qy(), { copy: s, dashboard: u, hero: c, quickLog: m, todayMeals: h, today: f, companion: y, petStageCopy: v, resolveDialogText: S } = l, L = h.groups || [], p = h.count > 0;
  u.caloriesValue > 0 && `${Math.round(u.caloriesValue)}`;
  const d = f.targetCalories > 0 ? s.caloriesRemaining(f.remainingCalories) : "--", g = f.calorieProgressPercent >= 70 ? s.headlineComplete : f.calorieProgressPercent > 0 ? s.headlineProgress : s.headlineEmpty, _ = [
    {
      key: "protein",
      label: ((N = u.macros[0]) == null ? void 0 : N.label) || "Protein",
      value: f.proteinCurrent,
      target: f.proteinTarget,
      tone: "protein"
    },
    {
      key: "carbs",
      label: ((M = u.macros[2]) == null ? void 0 : M.label) || "Carbs",
      value: f.carbCurrent,
      target: f.carbTarget,
      tone: "carb"
    },
    {
      key: "fat",
      label: ((F = u.macros[1]) == null ? void 0 : F.label) || "Fat",
      value: f.fatCurrent,
      target: f.fatTarget,
      tone: "fat"
    }
  ], x = f.plannedMeals > 0 ? `${f.loggedMeals}/${f.plannedMeals}` : String(f.loggedMeals), T = [
    { label: s.metrics.meals, value: x },
    { label: s.metrics.protein, value: `${Zl(f.proteinCurrent)}g` },
    { label: s.remainingLabel, value: d }
  ];
  return /* @__PURE__ */ i.jsxs("main", { className: "woof-home", "data-surface": "home", children: [
    /* @__PURE__ */ i.jsx("header", { className: "woof-home__today-header", children: /* @__PURE__ */ i.jsxs("div", { className: "woof-home__today-brand", children: [
      /* @__PURE__ */ i.jsx(
        "img",
        {
          className: "woof-home__today-logo",
          src: "calorie_icon-128.png",
          alt: "",
          width: "54",
          height: "54",
          decoding: "async"
        }
      ),
      /* @__PURE__ */ i.jsxs("div", { children: [
        /* @__PURE__ */ i.jsx("div", { className: "woof-home__today-kicker", children: s.appName }),
        /* @__PURE__ */ i.jsx("h1", { className: "woof-home__today-title", children: s.screenTitle }),
        /* @__PURE__ */ i.jsx("p", { className: "woof-home__today-date", children: ((A = h.dateControl) == null ? void 0 : A.label) || s.today })
      ] })
    ] }) }),
    /* @__PURE__ */ i.jsx(
      fv,
      {
        pet: y.pet,
        copy: v || {},
        resolveDialogText: S,
        onQuickLog: e
      }
    ),
    /* @__PURE__ */ i.jsx("section", { className: "woof-home__motivation-banner", "aria-label": s.pet, children: /* @__PURE__ */ i.jsxs("div", { className: "woof-home__motivation-copy", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "woof-home__motivation-badge", children: [
        /* @__PURE__ */ i.jsx("span", { className: "woof-home__motivation-badge-icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(ev, {}) }),
        /* @__PURE__ */ i.jsx("span", { children: c.eyebrow || s.pet })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "woof-home__motivation-title", children: g }),
      /* @__PURE__ */ i.jsx("p", { className: "woof-home__motivation-summary", children: ((ae = y.pet) == null ? void 0 : ae.resolvedMessage) || c.summary }),
      /* @__PURE__ */ i.jsx("div", { className: "woof-home__motivation-stats", children: T.map((Y) => /* @__PURE__ */ i.jsx(vv, { label: Y.label, value: Y.value }, Y.label)) }),
      /* @__PURE__ */ i.jsxs("div", { className: "woof-home__motivation-footer", children: [
        /* @__PURE__ */ i.jsx("div", { className: "woof-home__motivation-next", children: f.nextMealType || m.title || s.quickLog }),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            type: "button",
            className: "woof-home__ghost-button woof-home__ghost-button--small woof-home__motivation-action",
            onClick: e,
            children: c.actions.log
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ i.jsxs("button", { type: "button", className: "woof-home__dashboard-card", onClick: o, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "woof-home__dashboard-head", children: [
        /* @__PURE__ */ i.jsx("span", { className: "woof-home__section-icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(Jy, {}) }),
        /* @__PURE__ */ i.jsx("span", { className: "woof-home__dashboard-head-title", children: s.dailyCaloriesTitle }),
        /* @__PURE__ */ i.jsx("span", { className: "woof-home__dashboard-head-progress", children: `${f.calorieProgressPercent}%` })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "woof-home__dashboard-layout", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "woof-home__dashboard-ring-col", children: [
          /* @__PURE__ */ i.jsx(
            gv,
            {
              progress: f.calorieProgressPercent,
              calories: Math.round(u.caloriesValue || 0),
              target: Math.round(f.targetCalories || 0)
            }
          ),
          /* @__PURE__ */ i.jsxs("div", { className: "woof-home__dashboard-ring-meta", children: [
            /* @__PURE__ */ i.jsx("div", { className: "woof-home__dashboard-ring-label", children: s.remainingLabel }),
            /* @__PURE__ */ i.jsx("div", { className: "woof-home__dashboard-ring-value", children: d })
          ] })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "woof-home__dashboard-macro-col", children: _.map((Y) => /* @__PURE__ */ i.jsx(
          yv,
          {
            label: Y.label,
            value: Y.value,
            target: Y.target,
            tone: Y.tone
          },
          Y.key
        )) })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "woof-home__today", "aria-label": h.title, children: [
      /* @__PURE__ */ i.jsxs("div", { className: "woof-home__diary-header", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "woof-home__diary-title-group", children: [
          /* @__PURE__ */ i.jsx("span", { className: "woof-home__section-icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(tm, {}) }),
          /* @__PURE__ */ i.jsx("h2", { className: "woof-home__section-title", children: h.title })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "woof-home__diary-controls", children: [
          /* @__PURE__ */ i.jsx(
            hv,
            {
              control: h.dateControl,
              changeLabel: s.changeDate,
              previousLabel: s.previousDate,
              nextLabel: s.nextDate,
              onShiftDate: n,
              onSelectDate: t
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              type: "button",
              className: "woof-home__ghost-button woof-home__ghost-button--small woof-home__diary-action",
              onClick: e,
              children: c.actions.log
            }
          )
        ] })
      ] }),
      p ? /* @__PURE__ */ i.jsx("div", { className: "woof-home__meal-group-list", children: L.map((Y) => /* @__PURE__ */ i.jsx(
        pv,
        {
          group: Y,
          favoriteLabel: s.favoriteActionLabel,
          deleteLabel: s.deleteActionLabel,
          onFavoriteMeal: r,
          onDeleteMeal: a
        },
        Y.key
      )) }) : /* @__PURE__ */ i.jsxs("div", { className: "woof-home__empty-state woof-home__today-empty", children: [
        /* @__PURE__ */ i.jsx("div", { className: "woof-home__empty-title", children: s.companion }),
        /* @__PURE__ */ i.jsx("p", { className: "woof-home__empty-copy", children: h.hint || m.summary })
      ] })
    ] })
  ] });
}
function nt() {
}
function Sv({
  onQuickLog: e = nt,
  onOpenAI: t = nt,
  onOpenFavorites: n = nt,
  onSetSelectedDate: r = nt,
  onShiftDate: a = nt,
  onFavoriteMealItem: o = nt,
  onDeleteMealItem: l = nt,
  onOpenRhythm: s = nt,
  onOpenDailySummary: u = nt
}) {
  return /* @__PURE__ */ i.jsx(
    _v,
    {
      onQuickLog: e,
      onOpenAI: t,
      onOpenFavorites: n,
      onSetSelectedDate: r,
      onShiftDate: a,
      onFavoriteMealItem: o,
      onDeleteMealItem: l,
      onOpenRhythm: s,
      onOpenDailySummary: u
    }
  );
}
const wv = Object.freeze(["photo", "text", "manual"]), kv = Object.freeze(["breakfast", "lunch", "dinner", "snack"]), nm = "photo", rm = "breakfast", xv = Object.freeze({
  clickFileInput() {
  },
  handleFileSelect() {
  },
  syncAnalysisInputState() {
  },
  startAnalysis() {
  },
  addManualFood() {
  },
  saveToFavorites() {
  },
  openFavorites() {
  },
  updateMealUI() {
  },
  setAddMode() {
  },
  setAddMealType() {
  },
  getAddMode() {
    return nm;
  },
  getAddMealType() {
    return rm;
  }
}), Yo = Object.freeze({
  en: Object.freeze({
    eyebrow: "Quick logging",
    title: "Add meal",
    summary: "Choose the fastest input path first, then keep the heavier nutrition details in the same clean surface.",
    modeLabel: "Add meal modes",
    modes: {
      photo: "AI Photo Analysis",
      text: "AI Text Analysis",
      manual: "Manual"
    },
    mealTypeTitle: "Meal type",
    photoTitle: "AI Photo Analysis",
    photoDropzoneTitle: "Take a photo or upload an image",
    photoDropzoneCopy: "AI will estimate calories, macros, and the rest of the nutrition fields automatically.",
    photoButton: "Open camera",
    photoNotesLabel: "Photo notes",
    photoNotesPlaceholder: "Add extra details to help the AI read the meal accurately.",
    textTitle: "AI text analysis",
    textLabel: "Describe what you ate",
    textPlaceholder: "For example: grilled chicken rice, one boiled egg, greens, and iced black coffee.",
    manualTitle: "Manual entry",
    manualCopy: "Use this when you need full control over calories and all nutrient fields.",
    manualDetailsLabel: "Meal details",
    manualNamePlaceholder: "Food name (required)",
    manualCaloriesPlaceholder: "Calories (required)",
    manualTypeLabel: "Meal type",
    addRecord: "Add to today",
    saveFavorite: "Save favorite",
    openFavorites: "Open favorites",
    analysisTitle: "2. Send for analysis"
  }),
  "zh-TW": Object.freeze({
    eyebrow: "快速記錄",
    title: "新增餐點",
    summary: "先用最快的輸入方式開始，需要更細的營養欄位時也留在同一個乾淨畫面裡完成。",
    modeLabel: "新增餐點模式",
    modes: {
      photo: "AI照片分析",
      text: "AI文字分析",
      manual: "手動輸入"
    },
    mealTypeTitle: "餐次",
    photoTitle: "AI照片分析",
    photoDropzoneTitle: "拍照或上傳圖片",
    photoDropzoneCopy: "AI 會自動估算熱量、三大營養與其他營養欄位。",
    photoButton: "開啟相機",
    photoNotesLabel: "照片補充說明",
    photoNotesPlaceholder: "補充份量、品牌或特殊料理方式，能幫助 AI 判讀更準。",
    textTitle: "AI 文字分析",
    textLabel: "描述你吃了什麼",
    textPlaceholder: "例如：烤雞腿便當、一顆水煮蛋、青菜、無糖紅茶。",
    manualTitle: "手動輸入",
    manualCopy: "當你需要完整控制熱量與所有營養欄位時，再使用這一段。",
    manualDetailsLabel: "餐點內容",
    manualNamePlaceholder: "食物名稱 (必填)",
    manualCaloriesPlaceholder: "熱量 (必填)",
    manualTypeLabel: "餐次",
    addRecord: "加入今天",
    saveFavorite: "儲存常吃",
    openFavorites: "開啟常吃",
    analysisTitle: "2. 送出分析"
  }),
  "zh-CN": Object.freeze({
    eyebrow: "快速记录",
    title: "新增餐点",
    summary: "先用最快的输入方式开始，需要更细的营养字段时也留在同一个干净画面里完成。",
    modeLabel: "新增餐点模式",
    modes: {
      photo: "AI照片分析",
      text: "AI文字分析",
      manual: "手动输入"
    },
    mealTypeTitle: "餐次",
    photoTitle: "AI照片分析",
    photoDropzoneTitle: "拍照或上传图片",
    photoDropzoneCopy: "AI 会自动估算热量、三大营养和其他营养字段。",
    photoButton: "打开相机",
    photoNotesLabel: "照片补充说明",
    photoNotesPlaceholder: "补充份量、品牌或特殊烹调方式，能帮助 AI 判断更准。",
    textTitle: "AI 文字分析",
    textLabel: "描述你吃了什么",
    textPlaceholder: "例如：烤鸡腿便当、一颗水煮蛋、青菜、无糖红茶。",
    manualTitle: "手动输入",
    manualCopy: "当你需要完整控制热量和所有营养字段时，再使用这一段。",
    manualDetailsLabel: "餐点内容",
    manualNamePlaceholder: "食物名称 (必填)",
    manualCaloriesPlaceholder: "热量 (必填)",
    manualTypeLabel: "餐次",
    addRecord: "加入今天",
    saveFavorite: "保存常吃",
    openFavorites: "打开常吃",
    analysisTitle: "2. 送出分析"
  })
});
function Tv(e, t) {
  const n = (a) => {
    var l;
    const o = (l = a == null ? void 0 : a.detail) == null ? void 0 : l.mode;
    typeof o == "string" && e(o);
  }, r = (a) => {
    var l;
    const o = (l = a == null ? void 0 : a.detail) == null ? void 0 : l.mealType;
    typeof o == "string" && t(o);
  };
  return window.addEventListener("woof:add-mode-change", n), window.addEventListener("woof:add-meal-type-change", r), () => {
    window.removeEventListener("woof:add-mode-change", n), window.removeEventListener("woof:add-meal-type-change", r);
  };
}
function wn() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofAddBridge) || xv;
}
function Nv() {
  var t, n;
  const e = (n = (t = wn()).getAddMode) == null ? void 0 : n.call(t);
  return wv.includes(e) ? e : nm;
}
function bv() {
  var t, n;
  const e = (n = (t = wn()).getAddMealType) == null ? void 0 : n.call(t);
  return kv.includes(e) ? e : rm;
}
function Cv(e = "en") {
  return Yo[e] || Yo[String(e || "en").split("-")[0]] || Yo.en;
}
function am() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M4 8.5h3l1.5-2h7L17 8.5h3A1.5 1.5 0 0 1 21.5 10v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" }),
    /* @__PURE__ */ i.jsx("circle", { cx: "12", cy: "13.2", r: "3.5" })
  ] });
}
function Mv() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M5 6.5h14" }),
    /* @__PURE__ */ i.jsx("path", { d: "M9 6.5v11" }),
    /* @__PURE__ */ i.jsx("path", { d: "M15 6.5v11" }),
    /* @__PURE__ */ i.jsx("path", { d: "M7 17.5h10" })
  ] });
}
function jv() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M4 20l3.6-.7L18 8.9l-2.9-2.9L4.7 16.4 4 20Z" }),
    /* @__PURE__ */ i.jsx("path", { d: "m13.8 7.3 2.9 2.9" })
  ] });
}
function Ev() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M5 16a7 7 0 0 1 14 0" }),
    /* @__PURE__ */ i.jsx("path", { d: "M3 16h18" }),
    /* @__PURE__ */ i.jsx("path", { d: "M12 5.5v3" }),
    /* @__PURE__ */ i.jsx("path", { d: "M6.5 8.5 8 10" }),
    /* @__PURE__ */ i.jsx("path", { d: "m17.5 8.5-1.5 1.5" })
  ] });
}
function Lv() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M4 12.5h16a7 7 0 0 1-16 0Z" }),
    /* @__PURE__ */ i.jsx("path", { d: "M7 17.5h10" }),
    /* @__PURE__ */ i.jsx("path", { d: "M9 6.5c0 1 .6 1.6 1.6 1.6S12.2 7.5 12.2 6.5" }),
    /* @__PURE__ */ i.jsx("path", { d: "M13.3 5.7c0 1 .6 1.6 1.6 1.6s1.6-.6 1.6-1.6" })
  ] });
}
function Dv() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M6 15.5a6 6 0 1 0 8-8 5.5 5.5 0 1 1-8 8Z" }),
    /* @__PURE__ */ i.jsx("path", { d: "M15.5 17.5H20" }),
    /* @__PURE__ */ i.jsx("path", { d: "M18 15v5" })
  ] });
}
function Av() {
  return /* @__PURE__ */ i.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ i.jsx("path", { d: "M12 4.5c2.8 0 5 2.2 5 5 0 5-5 9-5 9s-5-4-5-9c0-2.8 2.2-5 5-5Z" }),
    /* @__PURE__ */ i.jsx("path", { d: "M12 8.3v2.8" }),
    /* @__PURE__ */ i.jsx("path", { d: "M10.6 9.7h2.8" })
  ] });
}
function Pv({ mode: e }) {
  return e === "photo" ? /* @__PURE__ */ i.jsx(am, {}) : e === "text" ? /* @__PURE__ */ i.jsx(Mv, {}) : /* @__PURE__ */ i.jsx(jv, {});
}
function Iv({ mealType: e }) {
  return e === "breakfast" ? /* @__PURE__ */ i.jsx(Ev, {}) : e === "lunch" ? /* @__PURE__ */ i.jsx(Lv, {}) : e === "dinner" ? /* @__PURE__ */ i.jsx(Dv, {}) : /* @__PURE__ */ i.jsx(Av, {});
}
function zv({ copy: e, t, onAnalyze: n }) {
  return /* @__PURE__ */ i.jsxs("div", { id: "add-analysis-actions", className: "add-shell-card add-shell-card--analysis", children: [
    /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: e.analysisTitle }),
    /* @__PURE__ */ i.jsx("div", { id: "turnstile-widget", "aria-hidden": "true" }),
    /* @__PURE__ */ i.jsx("div", { id: "turnstile-status-note", className: "ai-status-note", hidden: !0 }),
    /* @__PURE__ */ i.jsx("button", { id: "analyze-btn", className: "btn-analyze", type: "button", onClick: n, children: /* @__PURE__ */ i.jsx("span", { id: "txt-analyze-btn", children: t.btnAnalyze || "Analyze meal" }) }),
    /* @__PURE__ */ i.jsx("div", { className: "loading-spinner", id: "ai-loading", children: /* @__PURE__ */ i.jsx("span", { id: "txt-ai-loading", children: t.aiLoading || "AI is analyzing the meal..." }) })
  ] });
}
function Fv() {
  const e = Rn(), t = pt(e.curLang), n = Cv(e.curLang), r = t.meals || {}, a = wn(), [o, l] = le.useState(Nv), [s, u] = le.useState(bv), c = le.useRef(null), m = [
    { id: "photo", label: n.modes.photo },
    { id: "text", label: n.modes.text },
    { id: "manual", label: n.modes.manual }
  ], h = [
    { id: "breakfast", label: r.breakfast || "Breakfast" },
    { id: "lunch", label: r.lunch || "Lunch" },
    { id: "dinner", label: r.dinner || "Dinner" },
    { id: "snack", label: r.snack || "Snack" }
  ], f = o === "photo" || o === "text";
  return le.useEffect(() => Tv(l, u), []), le.useEffect(() => {
    var v, S, L;
    const y = wn();
    (v = y.updateMealUI) == null || v.call(y), (S = y.setAddMealType) == null || S.call(y, s), (L = y.setAddMode) == null || L.call(y, o);
  }, [s, o, e.curLang, e.currentMealMode, e.targetCalories]), /* @__PURE__ */ i.jsxs("div", { "data-add-react-surface": "true", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "surface-heading", children: [
      /* @__PURE__ */ i.jsx("div", { className: "surface-heading__eyebrow", children: n.eyebrow }),
      /* @__PURE__ */ i.jsx("h1", { className: "surface-heading__title", children: n.title }),
      /* @__PURE__ */ i.jsx("p", { className: "surface-heading__copy", children: n.summary })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "add-shell-card", children: /* @__PURE__ */ i.jsx("div", { className: "add-mode-switch", role: "tablist", "aria-label": n.modeLabel, children: m.map((y) => /* @__PURE__ */ i.jsxs(
      "button",
      {
        type: "button",
        className: `add-mode-pill${o === y.id ? " is-active" : ""}`,
        "data-add-mode": y.id,
        "aria-pressed": String(o === y.id),
        onClick: () => {
          var v, S;
          l(y.id), (S = (v = wn()).setAddMode) == null || S.call(v, y.id);
        },
        children: [
          /* @__PURE__ */ i.jsx("span", { className: "add-mode-pill__icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(Pv, { mode: y.id }) }),
          /* @__PURE__ */ i.jsx("span", { children: y.label })
        ]
      },
      y.id
    )) }) }),
    /* @__PURE__ */ i.jsxs("div", { className: "add-shell-card", children: [
      /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: n.mealTypeTitle }),
      /* @__PURE__ */ i.jsx("div", { className: "add-meal-type-grid", children: h.map((y) => /* @__PURE__ */ i.jsxs(
        "button",
        {
          type: "button",
          className: `add-meal-type-chip${s === y.id ? " is-active" : ""}`,
          "data-add-meal-type": y.id,
          "aria-pressed": String(s === y.id),
          onClick: () => {
            var v, S;
            u(y.id), (S = (v = wn()).setAddMealType) == null || S.call(v, y.id);
          },
          children: [
            /* @__PURE__ */ i.jsx("span", { className: "add-meal-type-chip__icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(Iv, { mealType: y.id }) }),
            /* @__PURE__ */ i.jsx("span", { children: y.label })
          ]
        },
        y.id
      )) })
    ] }),
    o === "photo" ? /* @__PURE__ */ i.jsx("section", { id: "add-panel-photo", className: "add-panel-surface", children: /* @__PURE__ */ i.jsxs("div", { className: "add-panel-card add-panel-card--upload", children: [
      /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: n.photoTitle }),
      /* @__PURE__ */ i.jsxs("div", { className: "add-upload-dropzone", children: [
        /* @__PURE__ */ i.jsx("div", { className: "add-upload-dropzone__icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(am, {}) }),
        /* @__PURE__ */ i.jsx("div", { className: "add-upload-dropzone__title", children: n.photoDropzoneTitle }),
        /* @__PURE__ */ i.jsx("div", { className: "add-upload-dropzone__copy", children: n.photoDropzoneCopy }),
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "file",
            id: "image-upload",
            accept: "image/*",
            ref: c,
            onChange: (y) => a.handleFileSelect(y.currentTarget),
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            className: "btn-ai",
            id: "btn-take-photo",
            type: "button",
            onClick: () => a.clickFileInput(c.current),
            children: n.photoButton
          }
        )
      ] }),
      /* @__PURE__ */ i.jsx("img", { id: "image-preview", className: "add-upload-preview", alt: "" }),
      /* @__PURE__ */ i.jsxs("div", { id: "ai-desc-group", className: "add-description-group", children: [
        /* @__PURE__ */ i.jsx("label", { htmlFor: "ai-desc", children: n.photoNotesLabel }),
        /* @__PURE__ */ i.jsx(
          "textarea",
          {
            id: "ai-desc",
            rows: "3",
            placeholder: n.photoNotesPlaceholder,
            onInput: () => a.syncAnalysisInputState()
          }
        )
      ] })
    ] }) }) : null,
    o === "text" ? /* @__PURE__ */ i.jsx("section", { id: "add-panel-text", className: "add-panel-surface", children: /* @__PURE__ */ i.jsxs("div", { className: "add-panel-card", children: [
      /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: n.textTitle }),
      /* @__PURE__ */ i.jsxs("div", { id: "ai-text-only-group", className: "add-text-group", children: [
        /* @__PURE__ */ i.jsx("label", { id: "txt-text-ai-label", htmlFor: "ai-text-desc", children: n.textLabel }),
        /* @__PURE__ */ i.jsx(
          "textarea",
          {
            id: "ai-text-desc",
            rows: "5",
            placeholder: n.textPlaceholder,
            onInput: () => a.syncAnalysisInputState()
          }
        )
      ] })
    ] }) }) : null,
    f ? /* @__PURE__ */ i.jsx(
      zv,
      {
        copy: n,
        t,
        onAnalyze: () => a.startAnalysis()
      }
    ) : null,
    o === "manual" ? /* @__PURE__ */ i.jsx("section", { id: "add-panel-manual", className: "add-panel-surface", children: /* @__PURE__ */ i.jsxs("div", { className: "add-panel-card", children: [
      /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: n.manualTitle }),
      /* @__PURE__ */ i.jsx("p", { className: "add-manual-copy", children: n.manualCopy }),
      /* @__PURE__ */ i.jsxs("div", { className: "home-log-form home-log-form--inline", children: [
        /* @__PURE__ */ i.jsx("label", { htmlFor: "manual-name", children: n.manualDetailsLabel }),
        /* @__PURE__ */ i.jsxs("div", { className: "manual-grid", children: [
          /* @__PURE__ */ i.jsx("input", { type: "text", id: "manual-name", placeholder: n.manualNamePlaceholder }),
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-cal", placeholder: n.manualCaloriesPlaceholder })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "small-input-group", children: [
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-pro", placeholder: t.phPro || "Protein" }),
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-fat", placeholder: t.phFat || "Fat" }),
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-carb", placeholder: t.phCarb || "Carbs" }),
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-sugar", placeholder: t.phSugar || "Sugar" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "small-input-group", children: [
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-sod", placeholder: t.phSod || "Sodium" }),
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-sat", placeholder: t.phSat || "Sat. fat" }),
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-trans", placeholder: t.phTrans || "Trans fat" }),
          /* @__PURE__ */ i.jsx("input", { type: "number", id: "manual-fiber", placeholder: t.phFiber || t.fiber || "Fiber" })
        ] }),
        /* @__PURE__ */ i.jsx("select", { id: "manual-type", className: "manual-type-select", "aria-label": n.manualTypeLabel }),
        /* @__PURE__ */ i.jsxs("div", { className: "add-manual-actions", children: [
          /* @__PURE__ */ i.jsx("button", { id: "btn-add-record", type: "button", onClick: () => a.addManualFood(), children: n.addRecord }),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "btn-fav-save",
              id: "btn-fav-save-main",
              type: "button",
              onClick: () => a.saveToFavorites(),
              children: n.saveFavorite
            }
          ),
          /* @__PURE__ */ i.jsx(
            "button",
            {
              className: "btn-fav-load",
              id: "btn-fav-load-main",
              type: "button",
              onClick: () => a.openFavorites(),
              children: n.openFavorites
            }
          )
        ] })
      ] })
    ] }) }) : null
  ] });
}
function ls(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = ls(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
const is = {
  dailySummary: "Daily Summary",
  protein: "Protein",
  carbs: "Carbs",
  fats: "Fats",
  ofTarget: (e) => `of ${e} cal`,
  setGoal: "Set a calorie goal",
  statusGreat: "Great progress today",
  statusOnTrack: "On track for your goal",
  statusKeepGoing: "Keep building today",
  statusStart: "Start with the first meal",
  untitledMeal: "Untitled meal",
  emptyTitle: "No meals logged for this day",
  emptyCopy: "Use Add to log a meal, then your daily summary and nutrition history will update automatically.",
  proteinSuffix: "protein",
  carbsSuffix: "carbs",
  fatSuffix: "fat"
}, Ov = ls(is, {
  dailySummary: "每日摘要",
  protein: "蛋白質",
  carbs: "碳水",
  fats: "脂肪",
  ofTarget: (e) => `目標 ${e} cal`,
  setGoal: "設定熱量目標",
  statusGreat: "今天進度很棒",
  statusOnTrack: "目標達成中",
  statusKeepGoing: "繼續努力",
  statusStart: "從第一餐開始",
  untitledMeal: "未命名餐點",
  emptyTitle: "今天還沒有記錄",
  emptyCopy: "使用「新增」記錄餐點，每日摘要與營養紀錄就會自動更新。",
  proteinSuffix: "蛋白質",
  carbsSuffix: "碳水",
  fatSuffix: "脂肪"
}), $v = ls(is, {
  dailySummary: "每日摘要",
  protein: "蛋白质",
  carbs: "碳水",
  fats: "脂肪",
  ofTarget: (e) => `目标 ${e} cal`,
  setGoal: "设定热量目标",
  statusGreat: "今天进度很棒",
  statusOnTrack: "目标达成中",
  statusKeepGoing: "继续努力",
  statusStart: "从第一餐开始",
  untitledMeal: "未命名餐点",
  emptyTitle: "今天还没有记录",
  emptyCopy: "使用「新增」记录餐点，每日摘要与营养记录就会自动更新。",
  proteinSuffix: "蛋白质",
  carbsSuffix: "碳水",
  fatSuffix: "脂肪"
}), Zo = {
  en: is,
  "zh-TW": Ov,
  "zh-CN": $v
};
function Rv(e = "en") {
  return Zo[e] || Zo[String(e || "en").split("-")[0]] || Zo.en;
}
const uc = Object.freeze(["breakfast", "lunch", "dinner", "snack"]), Hv = Object.freeze({
  breakfast: "☕",
  lunch: "🥗",
  dinner: "🍕",
  snack: "🍎"
});
function Xo(e) {
  return `${Math.round(Number(e) || 0)}`;
}
function sn(e) {
  const t = Math.round((Number(e) || 0) * 10) / 10;
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
}
function Wv(e, t) {
  return e >= 90 ? t.statusGreat : e >= 60 ? t.statusOnTrack : e > 0 ? t.statusKeepGoing : t.statusStart;
}
function Bv(e, t) {
  var n;
  return ((n = t == null ? void 0 : t.meals) == null ? void 0 : n[e]) || e;
}
function Uv(e = [], t = "Untitled meal") {
  return e.map((n, r) => {
    var a, o, l, s, u, c, m;
    return {
      id: `${String((n == null ? void 0 : n.type) || "snack")}-${r}`,
      index: r,
      type: String((n == null ? void 0 : n.type) || "snack"),
      name: String((n == null ? void 0 : n.name) || "").trim() || t,
      calories: Number(((a = n == null ? void 0 : n.nutri) == null ? void 0 : a.calories) ?? ((o = n == null ? void 0 : n.nutri) == null ? void 0 : o.cal) ?? 0) || 0,
      protein: Number(((l = n == null ? void 0 : n.nutri) == null ? void 0 : l.protein) ?? ((s = n == null ? void 0 : n.nutri) == null ? void 0 : s.pro) ?? 0) || 0,
      carb: Number(((u = n == null ? void 0 : n.nutri) == null ? void 0 : u.carbohydrate) ?? ((c = n == null ? void 0 : n.nutri) == null ? void 0 : c.carb) ?? 0) || 0,
      fat: Number(((m = n == null ? void 0 : n.nutri) == null ? void 0 : m.fat) ?? 0) || 0
    };
  }).sort((n, r) => uc.indexOf(n.type) - uc.indexOf(r.type) || n.index - r.index);
}
function Kv(e = []) {
  return e.reduce((t, n) => {
    const r = (n == null ? void 0 : n.nutri) || {};
    return t.cal += Number(r.calories) || 0, t.pro += Number(r.protein) || 0, t.carb += Number(r.carbohydrate) || 0, t.fat += Number(r.fat) || 0, t;
  }, { cal: 0, pro: 0, carb: 0, fat: 0 });
}
function Gv() {
  const e = Rn(), t = pt(e.curLang), n = Rv(e.curLang), r = Kv(e.foodItems), a = Number(r.cal) || 0, o = Number(e.targetCalories) || 0, l = o > 0 ? Math.min(Math.round(a / o * 100), 100) : 0, s = Uv(e.foodItems, n.untitledMeal);
  return /* @__PURE__ */ i.jsxs("div", { "data-history-react-surface": "true", children: [
    /* @__PURE__ */ i.jsxs("section", { className: "history-summary-card", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "history-summary-card__copy", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "section-kicker-row", children: [
          /* @__PURE__ */ i.jsx("span", { className: "section-kicker-icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(tm, {}) }),
          /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: n.dailySummary })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "history-summary-card__total", children: `${Xo(a)} cal` }),
        /* @__PURE__ */ i.jsx("div", { className: "history-summary-card__target", children: o > 0 ? n.ofTarget(Xo(o)) : n.setGoal }),
        /* @__PURE__ */ i.jsx("div", { className: "history-summary-card__status", children: Wv(l, n) }),
        /* @__PURE__ */ i.jsxs("div", { className: "history-summary-card__macro-row", children: [
          /* @__PURE__ */ i.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ i.jsx("span", { className: "history-summary-card__macro-label", children: n.protein }),
            /* @__PURE__ */ i.jsx("span", { children: `${sn(r.pro)}g` })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ i.jsx("span", { className: "history-summary-card__macro-label", children: n.carbs }),
            /* @__PURE__ */ i.jsx("span", { children: `${sn(r.carb)}g` })
          ] }),
          /* @__PURE__ */ i.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ i.jsx("span", { className: "history-summary-card__macro-label", children: n.fats }),
            /* @__PURE__ */ i.jsx("span", { children: `${sn(r.fat)}g` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "history-summary-ring", style: { "--history-progress": `${l}%` }, children: /* @__PURE__ */ i.jsx("div", { className: "history-summary-ring__inner", children: /* @__PURE__ */ i.jsx("span", { children: `${l}%` }) }) })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "history-entry-list", children: s.length > 0 ? s.map((u) => /* @__PURE__ */ i.jsxs("article", { className: "history-log-card", children: [
      /* @__PURE__ */ i.jsx("div", { className: `history-log-card__icon history-log-card__icon--${u.type}`, children: Hv[u.type] || "🍽" }),
      /* @__PURE__ */ i.jsxs("div", { className: "history-log-card__body", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "history-log-card__head", children: [
          /* @__PURE__ */ i.jsx("div", { className: "history-log-card__title", children: u.name }),
          /* @__PURE__ */ i.jsx("div", { className: "history-log-card__calories", children: `${Xo(u.calories)} cal` })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "history-log-card__meta", children: Bv(u.type, t) }),
        /* @__PURE__ */ i.jsxs("div", { className: "history-log-card__stats", children: [
          /* @__PURE__ */ i.jsx("span", { className: "history-log-card__stat history-log-card__stat--protein", children: `${sn(u.protein)}g ${n.proteinSuffix}` }),
          /* @__PURE__ */ i.jsx("span", { className: "history-log-card__stat history-log-card__stat--carb", children: `${sn(u.carb)}g ${n.carbsSuffix}` }),
          /* @__PURE__ */ i.jsx("span", { className: "history-log-card__stat history-log-card__stat--fat", children: `${sn(u.fat)}g ${n.fatSuffix}` })
        ] })
      ] })
    ] }, u.id)) : /* @__PURE__ */ i.jsxs("div", { className: "history-empty-state", children: [
      /* @__PURE__ */ i.jsx("div", { className: "history-empty-state__title", children: n.emptyTitle }),
      /* @__PURE__ */ i.jsx("p", { className: "history-empty-state__copy", children: n.emptyCopy })
    ] }) })
  ] });
}
function ss(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = ss(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
const us = {
  kicker: "Profile",
  title: "Woof Cal Companion",
  summary: "A calmer settings surface where your target calories, meal mode, and preferences stay easy to read.",
  goalLabel: "Goal",
  targetLabel: "Target",
  mealModeLabel: "Meal Mode",
  regionLabel: "Region",
  diningOutLabel: "Dining Out",
  goalTypes: {
    lose: "Lose weight",
    maintain: "Maintain weight",
    gain: "Build muscle"
  },
  mealModes: {
    1: "OMAD",
    2: "2 meals",
    3: "3 meals",
    4: "4 meals"
  },
  regions: {
    taiwan: "Taiwan",
    "hong-kong": "Hong Kong",
    singapore: "Singapore"
  },
  diningFreqs: {
    daily: "Almost daily",
    often: "Often",
    sometimes: "Sometimes",
    rare: "Rarely",
    rarely: "Rarely"
  }
}, Vv = ss(us, {
  kicker: "個人檔案",
  title: "Woof Cal 汪卡管家",
  summary: "在這裡檢視你的目標熱量、餐次模式和個人偏好設定。",
  goalLabel: "目標",
  targetLabel: "目標熱量",
  mealModeLabel: "餐次模式",
  regionLabel: "地區",
  diningOutLabel: "外食頻率",
  goalTypes: {
    lose: "減重",
    maintain: "維持體重",
    gain: "增肌"
  },
  mealModes: {
    1: "一餐 (OMAD)",
    2: "兩餐",
    3: "三餐",
    4: "四餐"
  },
  regions: {
    taiwan: "台灣",
    "hong-kong": "香港",
    singapore: "新加坡"
  },
  diningFreqs: {
    daily: "幾乎每天",
    often: "經常",
    sometimes: "偶爾",
    rare: "很少",
    rarely: "很少"
  }
}), Qv = ss(us, {
  kicker: "个人档案",
  title: "Woof Cal 汪卡管家",
  summary: "在这里查看你的目标热量、餐次模式和个人偏好设置。",
  goalLabel: "目标",
  targetLabel: "目标热量",
  mealModeLabel: "餐次模式",
  regionLabel: "地区",
  diningOutLabel: "外食频率",
  goalTypes: {
    lose: "减重",
    maintain: "维持体重",
    gain: "增肌"
  },
  mealModes: {
    1: "一餐 (OMAD)",
    2: "两餐",
    3: "三餐",
    4: "四餐"
  },
  regions: {
    taiwan: "台湾",
    "hong-kong": "香港",
    singapore: "新加坡"
  },
  diningFreqs: {
    daily: "几乎每天",
    often: "经常",
    sometimes: "偶尔",
    rare: "很少",
    rarely: "很少"
  }
}), qo = {
  en: us,
  "zh-TW": Vv,
  "zh-CN": Qv
};
function Yv(e = "en") {
  return qo[e] || qo[String(e || "en").split("-")[0]] || qo.en;
}
function Zv(e) {
  const t = Number(e) || 0;
  return t > 0 ? `${Math.round(t)} kcal` : "--";
}
const Xv = ["goal", "target", "mealMode", "frequency"];
function qv() {
  const e = Rn(), t = Yv(e.curLang), n = e.profile || {}, r = {
    goal: t.goalLabel,
    target: t.targetLabel,
    mealMode: t.mealModeLabel,
    frequency: t.diningOutLabel
  }, a = String(e.currentGoalType || n.goalType || "lose"), o = String(n.mealMode || "4"), l = String(n.diningOutFrequency || "").trim(), s = {
    goal: t.goalTypes[a] || t.goalTypes.lose,
    target: Zv(e.targetCalories),
    mealMode: t.mealModes[o] || t.mealModes[4],
    frequency: t.diningFreqs[l] || "--"
  };
  return /* @__PURE__ */ i.jsxs("section", { className: "profile-hero-card", "data-profile-react-surface": "true", children: [
    /* @__PURE__ */ i.jsx("div", { className: "profile-hero-card__icon-shell", children: /* @__PURE__ */ i.jsx(
      "img",
      {
        src: "calorie_icon-128.png",
        alt: "",
        className: "profile-hero-card__icon",
        width: "64",
        height: "64",
        loading: "lazy",
        decoding: "async"
      }
    ) }),
    /* @__PURE__ */ i.jsxs("div", { className: "profile-hero-card__copy", children: [
      /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: t.kicker }),
      /* @__PURE__ */ i.jsxs("div", { className: "profile-hero-card__title-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "profile-hero-card__icon-badge", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(nv, {}) }),
        /* @__PURE__ */ i.jsx("h1", { className: "profile-hero-card__title", children: t.title })
      ] }),
      /* @__PURE__ */ i.jsx("p", { className: "profile-hero-card__summary", children: t.summary })
    ] }),
    /* @__PURE__ */ i.jsx("div", { className: "profile-hero-card__grid", children: Xv.map((u) => /* @__PURE__ */ i.jsxs("div", { className: "profile-hero-card__metric", children: [
      /* @__PURE__ */ i.jsx("span", { className: "profile-hero-card__metric-label", children: r[u] }),
      /* @__PURE__ */ i.jsx("strong", { children: s[u] })
    ] }, u)) })
  ] });
}
function cs(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = cs(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
const ds = {
  eyebrow: "Weekly Overview",
  title: "Stats",
  summaryTitle: "Weekly Summary",
  avgCalories: "Avg. Calories",
  streak: "Streak",
  streakMeta: "days",
  avgProtein: "Avg. Protein",
  avgProteinMeta: "steady macro pace",
  macroBalance: "Macro Balance",
  nutritionSnapshot: "Nutrition Snapshot",
  trend: "Trend",
  calorieTrend: "Calorie Trend",
  protein: "Protein",
  proteinTrend: "Protein Intake Trend",
  weightSection: "Weight",
  weightTrend: "Weight Trend",
  save: "Save",
  weightPlaceholder: "Today's weight (kg)",
  targetOverview: "target overview",
  steadyMacroPace: "steady macro pace",
  rangeLabelFn: (e) => `${e} Days`,
  onTarget: "On-Target",
  onTargetMeta: "days"
}, Jv = cs(ds, {
  eyebrow: "週間總覽",
  title: "統計",
  summaryTitle: "每週摘要",
  avgCalories: "平均熱量",
  streak: "連續天數",
  streakMeta: "天",
  avgProtein: "平均蛋白質",
  avgProteinMeta: "穩定營養節奏",
  macroBalance: "巨量營養比例",
  nutritionSnapshot: "營養快照",
  trend: "趨勢",
  calorieTrend: "熱量趨勢",
  protein: "蛋白質",
  proteinTrend: "蛋白質趨勢",
  weightSection: "體重",
  weightTrend: "體重趨勢",
  save: "儲存",
  weightPlaceholder: "今天體重 (kg)",
  targetOverview: "目標概覽",
  steadyMacroPace: "穩定營養節奏",
  rangeLabelFn: (e) => `${e} 天`,
  onTarget: "達標",
  onTargetMeta: "天"
}), e0 = cs(ds, {
  eyebrow: "周间总览",
  title: "统计",
  summaryTitle: "每周摘要",
  avgCalories: "平均热量",
  streak: "连续天数",
  streakMeta: "天",
  avgProtein: "平均蛋白质",
  avgProteinMeta: "稳定营养节奏",
  macroBalance: "巨量营养比例",
  nutritionSnapshot: "营养快照",
  trend: "趋势",
  calorieTrend: "热量趋势",
  protein: "蛋白质",
  proteinTrend: "蛋白质趋势",
  weightSection: "体重",
  weightTrend: "体重趋势",
  save: "保存",
  weightPlaceholder: "今天体重 (kg)",
  targetOverview: "目标概览",
  steadyMacroPace: "稳定营养节奏",
  rangeLabelFn: (e) => `${e} 天`,
  onTarget: "达标",
  onTargetMeta: "天"
}), Jo = {
  en: ds,
  "zh-TW": Jv,
  "zh-CN": e0
};
function t0(e = "en") {
  return Jo[e] || Jo[String(e || "en").split("-")[0]] || Jo.en;
}
const Xl = Object.freeze({
  chartData: Object.freeze({}),
  pet: Object.freeze({}),
  metrics: Object.freeze({
    averageCalories: 0,
    averageProtein: 0,
    onTargetDays: 0,
    streak: 0,
    level: 1,
    xpWidth: "0%",
    energyWidth: "0%",
    bondWidth: "0%"
  })
}), n0 = Object.freeze({
  getDashboardViewModel() {
    return Xl;
  },
  setDashboardChartRange() {
  },
  ensureDashboardChartsReady() {
  },
  previewWeightChart() {
  },
  saveCurrentWeight() {
  }
});
function Jn() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofStatsBridge) || n0;
}
function cc(e, t) {
  return t.rangeLabelFn ? t.rangeLabelFn(e) : `${e} Days`;
}
function r0({ t: e }) {
  const t = [
    { key: "protein", label: e.pro || "Protein" },
    { key: "fat", label: e.fat || "Fat" },
    { key: "carb", label: e.carb || "Carbs" }
  ];
  return /* @__PURE__ */ i.jsx("div", { className: "stats-mini-legend", "aria-hidden": "true", children: t.map((n) => /* @__PURE__ */ i.jsxs("span", { className: "stats-mini-legend__item", children: [
    /* @__PURE__ */ i.jsx("span", { className: `stats-mini-legend__swatch stats-mini-legend__swatch--${n.key}` }),
    /* @__PURE__ */ i.jsx("span", { children: n.label })
  ] }, n.key)) });
}
function a0() {
  const e = Rn(), [t, n] = le.useState(7), [r, a] = le.useState(() => String(e.loggedWeight ?? "")), o = pt(e.curLang), l = t0(e.curLang), s = Jn(), u = le.useMemo(
    () => s.getDashboardViewModel(e, { range: t, weightDays: 30 }) || Xl,
    [
      s,
      t,
      e.selectedDate,
      e.curLang,
      e.targetCalories,
      e.currentMealMode,
      e.currentGoalType,
      e.loggedWeight,
      e.foodItems,
      e.profile
    ]
  ), { metrics: c = Xl.metrics } = u, m = cc(t, l), h = r ? `${r} kg` : "--";
  return le.useEffect(() => {
    a(String(e.loggedWeight ?? ""));
  }, [e.loggedWeight]), /* @__PURE__ */ i.jsxs("div", { "data-stats-react-surface": "true", children: [
    /* @__PURE__ */ i.jsxs("div", { className: "surface-heading", children: [
      /* @__PURE__ */ i.jsx("div", { className: "surface-heading__eyebrow", children: l.eyebrow }),
      /* @__PURE__ */ i.jsxs("div", { className: "surface-heading__title-row", children: [
        /* @__PURE__ */ i.jsx("span", { className: "surface-heading__icon", "aria-hidden": "true", children: /* @__PURE__ */ i.jsx(tv, {}) }),
        /* @__PURE__ */ i.jsx("h1", { className: "surface-heading__title", children: l.title })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "stats-range-shell", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "stats-range-shell__copy", children: [
        /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: l.trend }),
        /* @__PURE__ */ i.jsx("div", { className: "stats-range-shell__title", children: m })
      ] }),
      /* @__PURE__ */ i.jsx("div", { className: "chart-range-toggle chart-range-toggle--segmented", children: [7, 30, 90].map((f) => /* @__PURE__ */ i.jsx(
        "button",
        {
          id: `btn-chart-${f}d`,
          className: `range-btn${t === f ? " active-range" : ""}`,
          type: "button",
          onClick: () => {
            Jn().setDashboardChartRange(f), le.startTransition(() => {
              n(f);
            }), Jn().ensureDashboardChartsReady();
          },
          children: cc(f, l)
        },
        f
      )) })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "stats-summary-card", children: [
      /* @__PURE__ */ i.jsx("div", { className: "stats-summary-card__title", children: l.summaryTitle }),
      /* @__PURE__ */ i.jsxs("div", { className: "stats-summary-grid", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "stats-tile", children: [
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__label", children: l.avgCalories }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__value", children: c.averageCalories > 0 ? c.averageCalories : "--" }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__meta", children: l.targetOverview })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "stats-tile", children: [
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__label", children: l.streak }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__value", children: c.streak }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__meta", children: l.streakMeta })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "stats-tile stats-tile--wide", children: [
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__label", children: l.avgProtein }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__value", children: c.averageProtein > 0 ? `${c.averageProtein}g` : "--" }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-tile__meta", children: l.avgProteinMeta })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "stats-chart-card", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-card__head", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: l.macroBalance }),
          /* @__PURE__ */ i.jsx("h2", { className: "stats-chart-card__title", children: l.nutritionSnapshot })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "stats-chart-card__head-meta", children: m })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "chart-grid chart-grid--stats", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ i.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ i.jsx("canvas", { id: "macroChart" }) }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-chart-caption", id: "macroChartDate" })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ i.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ i.jsx("canvas", { id: "weeklyChart" }) }),
          /* @__PURE__ */ i.jsx(r0, { t: o }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-chart-caption stats-chart-caption--hint", id: "weeklyChartHint" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("div", { className: "stats-trend-grid", children: [
      /* @__PURE__ */ i.jsxs("section", { className: "stats-chart-card", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-card__head", children: [
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: l.trend }),
            /* @__PURE__ */ i.jsx("h2", { className: "stats-chart-card__title", id: "txt-cal-trend-title", children: l.calorieTrend })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-chart-card__head-meta", children: m })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ i.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ i.jsx("canvas", { id: "calTrendChart" }) }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-chart-caption", id: "calTrendHoverValue" })
        ] })
      ] }),
      /* @__PURE__ */ i.jsxs("section", { className: "stats-chart-card", children: [
        /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-card__head", children: [
          /* @__PURE__ */ i.jsxs("div", { children: [
            /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: l.protein }),
            /* @__PURE__ */ i.jsx("h2", { className: "stats-chart-card__title", id: "txt-protein-trend-title", children: l.proteinTrend })
          ] }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-chart-card__head-meta", children: m })
        ] }),
        /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ i.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ i.jsx("canvas", { id: "proteinTrendChart" }) }),
          /* @__PURE__ */ i.jsx("div", { className: "stats-chart-caption", id: "proteinTrendHoverValue" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ i.jsxs("section", { className: "stats-chart-card", children: [
      /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-card__head", children: [
        /* @__PURE__ */ i.jsxs("div", { children: [
          /* @__PURE__ */ i.jsx("div", { className: "section-kicker", children: l.weightSection }),
          /* @__PURE__ */ i.jsx("h2", { className: "stats-chart-card__title", children: l.weightTrend })
        ] }),
        /* @__PURE__ */ i.jsx("div", { className: "stats-chart-card__head-meta", children: h })
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "weight-input-inline", children: [
        /* @__PURE__ */ i.jsx(
          "input",
          {
            type: "number",
            id: "daily-weight-input",
            placeholder: l.weightPlaceholder,
            step: "0.1",
            value: r,
            onChange: (f) => {
              const y = f.target.value;
              a(y), Jn().previewWeightChart(y, { state: e });
            }
          }
        ),
        /* @__PURE__ */ i.jsx(
          "button",
          {
            id: "btn-save-weight",
            className: "weight-save-btn",
            type: "button",
            onClick: () => {
              Jn().saveCurrentWeight();
            },
            children: /* @__PURE__ */ i.jsx("span", { id: "txt-weight-title", children: l.save })
          }
        )
      ] }),
      /* @__PURE__ */ i.jsxs("div", { className: "stats-chart-shell", children: [
        /* @__PURE__ */ i.jsx("div", { className: "chart-container", style: { height: "248px" }, children: /* @__PURE__ */ i.jsx("canvas", { id: "weightChart" }) }),
        /* @__PURE__ */ i.jsx("div", { className: "stats-chart-caption", id: "weightTrendHoverValue" })
      ] })
    ] })
  ] });
}
const ql = Object.freeze({
  selectedDate: "",
  curLang: "zh-TW",
  targetCalories: 0,
  currentGoalType: "lose",
  foodItems: Object.freeze([]),
  profile: null
}), o0 = Object.freeze({
  en: Object.freeze({
    title: "Nutrition summary",
    summary: "A report view of today: total energy first, then the full eight nutrients.",
    reportTitle: "Today overview",
    reportSummary: "Calories, goal, and remaining energy aligned in one header.",
    macroTitle: "Macro distribution",
    macroSummary: "Protein, fat, and carbs shown as today's main intake split.",
    nutrientTitle: "All 8 nutrients",
    nutrientSummary: "Protein, fat, carbs, sugar, sodium, saturated fat, trans fat, and fiber.",
    nutrientHeader: "Nutrient",
    valueHeader: "Value",
    focusTitle: "Weekly focus",
    focusSummary: "Use the recent logging rhythm as a softer reference, not a hard grade."
  }),
  "zh-TW": Object.freeze({
    title: "營養摘要",
    summary: "用報告視角整理今天的熱量與八大營養，先看總覽，再看完整攝取量。",
    reportTitle: "今日總覽",
    reportSummary: "把熱量、目標與剩餘量先放在同一個抬頭裡。",
    macroTitle: "三大營養分布",
    macroSummary: "用最常看的蛋白質、脂肪、碳水快速判讀今天的補充節奏。",
    nutrientTitle: "八大營養",
    nutrientSummary: "蛋白質、脂肪、碳水、糖、鈉、飽和脂肪、反式脂肪與纖維一次看完。",
    nutrientHeader: "營養項目",
    valueHeader: "攝取量",
    focusTitle: "近期節奏",
    focusSummary: "把最近幾天的記錄當成參考線，幫你判讀今天的補充方向。"
  }),
  "zh-CN": Object.freeze({
    title: "营养摘要",
    summary: "用报告视角整理今天的热量与八大营养，先看总览，再看完整摄取量。",
    reportTitle: "今日总览",
    reportSummary: "把热量、目标与剩余量先放在同一个抬头里。",
    macroTitle: "三大营养分布",
    macroSummary: "用最常看的蛋白质、脂肪、碳水快速判断今天的补充节奏。",
    nutrientTitle: "八大营养",
    nutrientSummary: "蛋白质、脂肪、碳水、糖、钠、饱和脂肪、反式脂肪与纤维一次看完。",
    nutrientHeader: "营养项目",
    valueHeader: "摄取量",
    focusTitle: "近期节奏",
    focusSummary: "把最近几天的记录当成参考线，帮助判断今天的补充方向。"
  })
}), l0 = Object.freeze({
  en: Object.freeze({
    summary: "A clearer saved-food report before you add it back into today.",
    reportTitle: "Nutrition estimate",
    reportSummary: "The saved entry is reorganized as a clean nutrient report.",
    macroTitle: "Macro balance",
    macroSummary: "Compare the estimated share of protein, fat, and carbs at a glance.",
    nutrientTitle: "Nutrient table",
    nutrientSummary: "A compact table for the saved food's current nutrition estimate.",
    nutrientHeader: "Nutrient",
    valueHeader: "Value",
    compositionTitle: "Food items",
    compositionSummary: "The saved components behind this entry.",
    itemHeader: "Item",
    amountHeader: "Amount",
    compositionEmpty: "No ingredient breakdown was saved for this item."
  }),
  "zh-TW": Object.freeze({
    summary: "把收藏餐點整理成更直觀的報告格式，加入今天前先快速看懂內容。",
    reportTitle: "營養估算",
    reportSummary: "把這筆收藏重新整理成清楚的營養報告。",
    macroTitle: "營養比例",
    macroSummary: "用色條快速比較蛋白質、脂肪與碳水的估算比例。",
    nutrientTitle: "營養表格",
    nutrientSummary: "把這筆收藏的主要營養估算整理成固定表格。",
    nutrientHeader: "營養項目",
    valueHeader: "估算值",
    compositionTitle: "食物內容",
    compositionSummary: "這筆收藏背後包含的食物項目與份量。",
    itemHeader: "食物項目",
    amountHeader: "份量",
    compositionEmpty: "這筆收藏目前沒有存下更細的食物拆解。"
  }),
  "zh-CN": Object.freeze({
    summary: "把收藏餐点整理成更直观的报告格式，加入今天前先快速看懂内容。",
    reportTitle: "营养估算",
    reportSummary: "把这笔收藏重新整理成清楚的营养报告。",
    macroTitle: "营养比例",
    macroSummary: "用色条快速比较蛋白质、脂肪和碳水的估算比例。",
    nutrientTitle: "营养表格",
    nutrientSummary: "把这笔收藏的主要营养估算整理成固定表格。",
    nutrientHeader: "营养项目",
    valueHeader: "估算值",
    compositionTitle: "食物内容",
    compositionSummary: "这笔收藏背后包含的食物项目与份量。",
    itemHeader: "食物项目",
    amountHeader: "份量",
    compositionEmpty: "这笔收藏目前没有存下更细的食物拆解。"
  })
}), dc = Object.freeze(["protein", "fat", "carbohydrate"]), i0 = Object.freeze(["protein", "fat", "carbohydrate", "sugar", "sodium", "saturatedFat", "transFat", "fiber"]), om = Object.freeze({
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbohydrate: "g",
  sugar: "g",
  sodium: "mg",
  saturatedFat: "g",
  transFat: "g",
  fiber: "g"
}), s0 = Object.freeze({
  protein: "#6aa874",
  fat: "#efb04a",
  carbohydrate: "#6f9fe8"
});
function lm(e, t = "en") {
  return e[t] || e[String(t || "en").split("-")[0]] || e.en;
}
function u0(e, t = 1) {
  const n = Math.round((Number(e) || 0) * 10 ** t) / 10 ** t;
  return Number.isInteger(n) ? n : Number(n.toFixed(t));
}
function kn(e, t) {
  return e === "calories" || e === "sodium" ? Math.round(Number(t) || 0) : u0(t);
}
function hr(e, t) {
  const n = pt(t);
  return {
    calories: n.cal || "Calories",
    protein: n.pro || "Protein",
    fat: n.fat || "Fat",
    carbohydrate: n.carb || "Carb",
    sugar: n.sugar || "Sugar",
    sodium: n.sod || "Sodium",
    saturatedFat: n.sat || "Sat. Fat",
    transFat: n.trans || "Trans Fat",
    fiber: n.fiber || "Fiber"
  }[e] || e;
}
function c0(e, t) {
  const n = kn(e, t);
  return {
    field: e,
    value: n,
    unit: om[e] || ""
  };
}
function im(e, t) {
  const n = dc.reduce((r, a) => r + Math.max(Number(e == null ? void 0 : e[a]) || 0, 0), 0);
  return dc.map((r) => {
    const a = Math.max(Number(e == null ? void 0 : e[r]) || 0, 0), o = n > 0 ? Math.round(a / n * 100) : 0, l = o > 0 ? t === "zh-TW" ? `約佔三大營養的 ${o}%` : t === "zh-CN" ? `约占三大营养的 ${o}%` : `${o}% of today's macro total` : "--";
    return {
      field: r,
      label: hr(r, t),
      value: kn(r, a),
      unit: om[r],
      share: o,
      shareLabel: l,
      color: s0[r]
    };
  });
}
function sm(e, t) {
  return i0.map((n) => ({
    field: n,
    label: hr(n, t),
    ...c0(n, e == null ? void 0 : e[n])
  }));
}
function d0(e, t) {
  const n = ((e == null ? void 0 : e.signals) || []).map((r) => ({
    key: String((r == null ? void 0 : r.key) || ""),
    label: String((r == null ? void 0 : r.label) || ""),
    value: String((r == null ? void 0 : r.value) || ""),
    detail: String((r == null ? void 0 : r.detail) || "")
  })).filter((r) => r.label || r.value);
  return n.length === 0 ? null : {
    title: (e == null ? void 0 : e.title) || t.focusTitle,
    summary: (e == null ? void 0 : e.summary) || t.focusSummary,
    signals: n
  };
}
function f0(e) {
  const t = e.curLang || "en", n = pt(t), r = Kf(t), a = lm(o0, t), o = Hy(e), l = Wy(e, { days: 7 }), s = Qg(l, t), u = o.nutrition || {};
  return {
    kind: "daily-summary",
    lang: t,
    title: a.title,
    subtitle: ts(e.selectedDate, t),
    summary: a.summary,
    closeLabel: n.close || "Close",
    badge: null,
    heroStats: [
      {
        field: "calories",
        label: n.cal || "Calories",
        value: Math.round(Number(u.calories) || 0),
        unit: "kcal",
        emphasis: !0
      },
      {
        field: "goal",
        label: n.goal || "Goal",
        value: o.targetCalories > 0 ? Math.round(o.targetCalories) : "--",
        unit: o.targetCalories > 0 ? "kcal" : ""
      },
      {
        field: "remaining",
        label: r.remainingLabel || "Remaining",
        value: o.targetCalories > 0 ? Math.max(Math.round(o.remainingCalories), 0) : "--",
        unit: o.targetCalories > 0 ? "kcal" : ""
      }
    ],
    macroSection: {
      title: a.macroTitle,
      summary: a.macroSummary,
      cards: im(u, t)
    },
    reportSection: {
      title: a.reportTitle,
      summary: a.reportSummary
    },
    nutrientSection: {
      title: a.nutrientTitle,
      summary: a.nutrientSummary,
      headers: [a.nutrientHeader, a.valueHeader],
      rows: sm(u, t)
    },
    compositionSection: null,
    focusPanel: d0(s, a)
  };
}
function m0(e = {}, t = ql) {
  var c;
  const n = t.curLang || "en", r = pt(n), a = lm(l0, n), o = (e == null ? void 0 : e.nutri) || (e == null ? void 0 : e.nutrition) || e || {}, l = e != null && e.type ? ((c = r.meals) == null ? void 0 : c[e.type]) || e.type : ts(t.selectedDate, n), s = Number(e == null ? void 0 : e.healthScore) || 0, u = (Array.isArray(e == null ? void 0 : e.items) ? e.items : []).map((m) => ({
    name: String((m == null ? void 0 : m.name) || ""),
    amount: String((m == null ? void 0 : m.weight) || (m == null ? void 0 : m.amount) || "")
  })).filter((m) => m.name || m.amount);
  return {
    kind: "item-detail",
    lang: n,
    title: (e == null ? void 0 : e.name) || a.reportTitle,
    subtitle: l,
    summary: a.summary,
    closeLabel: r.close || "Close",
    badge: s > 0 ? {
      label: r.healthScoreLabel || "Health Score",
      value: `${Math.round(s)}/10`
    } : null,
    heroStats: [
      {
        field: "calories",
        label: r.cal || "Calories",
        value: kn("calories", o.calories),
        unit: "kcal",
        emphasis: !0
      },
      {
        field: "carbohydrate",
        label: hr("carbohydrate", n),
        value: kn("carbohydrate", o.carbohydrate),
        unit: "g"
      },
      {
        field: "protein",
        label: hr("protein", n),
        value: kn("protein", o.protein),
        unit: "g"
      },
      {
        field: "fat",
        label: hr("fat", n),
        value: kn("fat", o.fat),
        unit: "g"
      }
    ],
    macroSection: {
      title: a.macroTitle,
      summary: a.macroSummary,
      cards: im(o, n)
    },
    reportSection: {
      title: a.reportTitle,
      summary: a.reportSummary
    },
    nutrientSection: {
      title: a.nutrientTitle,
      summary: a.nutrientSummary,
      headers: [a.nutrientHeader, a.valueHeader],
      rows: sm(o, n)
    },
    compositionSection: {
      title: a.compositionTitle,
      summary: a.compositionSummary,
      headers: [a.itemHeader, a.amountHeader],
      emptyText: a.compositionEmpty,
      rows: u
    },
    focusPanel: null
  };
}
function p0(e = ql, t = { kind: "daily-summary" }) {
  const n = e || ql;
  return ((t == null ? void 0 : t.kind) || "daily-summary") === "item-detail" ? m0((t == null ? void 0 : t.item) || {}, n) : f0(n);
}
function h0() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofDetailSurfaceBridge) || {
    getState: () => null,
    subscribe: () => () => {
    }
  };
}
function g0() {
  const e = Rn(), t = h0(), n = X.useSyncExternalStore(t.subscribe, t.getState, t.getState);
  return !n || !n.kind ? null : p0(e, n);
}
const k = le.createElement;
function fc() {
}
function y0({ field: e }) {
  const t = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    focusable: "false"
  };
  let n;
  switch (e) {
    case "calories":
      n = [
        k("path", { key: "flame", d: "M13.5 2.5c.4 3-1.1 4.4-2.6 6-1.4 1.5-2.8 3-2.4 5.4.3 2 1.8 3.6 3.8 4.1-1.1-1.4-1-3.1.2-4.6.6 1.6 1.8 2.4 3.2 2.5 1.3-1.1 2.1-2.8 1.8-4.7-.4-2.5-2.4-4.7-4-8.2Z" }),
        k("path", { key: "base", d: "M6.8 9.2C5.6 10.8 5 12.4 5 14a7 7 0 0 0 14 0c0-2.8-1.6-5.3-3.5-7.4" })
      ];
      break;
    case "carbohydrate":
      n = [
        k("path", { key: "stem", d: "M12 21V8" }),
        k("path", { key: "left-top", d: "M12 11C8.8 11 6.5 9.3 6 6c3.2 0 5.5 1.7 6 5Z" }),
        k("path", { key: "right-top", d: "M12 11c3.2 0 5.5-1.7 6-5-3.2 0-5.5 1.7-6 5Z" }),
        k("path", { key: "left-bottom", d: "M12 17c-3.2 0-5.5-1.7-6-5 3.2 0 5.5 1.7 6 5Z" })
      ];
      break;
    case "protein":
      n = [
        k("path", { key: "bar", d: "M6 12h12" }),
        k("path", { key: "left-inner", d: "M6 7v10" }),
        k("path", { key: "right-inner", d: "M18 7v10" }),
        k("path", { key: "left-outer", d: "M3 9v6" }),
        k("path", { key: "right-outer", d: "M21 9v6" })
      ];
      break;
    case "fat":
      n = [
        k("path", { key: "drop", d: "M12 2.5s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" }),
        k("path", { key: "shine", d: "M9.2 14.5c.3 1.2 1.2 2 2.4 2.3" })
      ];
      break;
    case "goal":
      n = [
        k("circle", { key: "outer", cx: 12, cy: 12, r: 8 }),
        k("circle", { key: "inner", cx: 12, cy: 12, r: 3 }),
        k("path", { key: "arrow", d: "m14 10 5-5" })
      ];
      break;
    default:
      n = [
        k("circle", { key: "clock", cx: 12, cy: 12, r: 8 }),
        k("path", { key: "hand", d: "M12 8v4l2.5 1.5" })
      ];
  }
  return k(
    "span",
    { className: "woof-detail__metric-icon", "aria-hidden": "true" },
    k("svg", t, ...n)
  );
}
function v0({ value: e, unit: t, emphasis: n = !1 }) {
  const r = String(e ?? "").replace(/[^0-9A-Za-z]/g, "").length, a = r >= 7 ? " woof-detail__hero-value--very-long" : r >= 5 ? " woof-detail__hero-value--long" : "";
  return k(
    "div",
    { className: `woof-detail__hero-value${n ? " woof-detail__hero-value--emphasis" : ""}${a}` },
    k("span", { className: "woof-detail__hero-number" }, e),
    t ? k("span", { className: "woof-detail__hero-unit" }, t) : null
  );
}
function _0({ stat: e }) {
  const t = String(e.field || "metric").replace(/[^a-z0-9-]/gi, "").toLowerCase() || "metric", n = `${e.label}: ${e.value}${e.unit ? ` ${e.unit}` : ""}`;
  return k(
    "article",
    {
      className: `woof-detail__hero-stat woof-detail__hero-stat--${t}`,
      "aria-label": n
    },
    k(
      "div",
      { className: "woof-detail__metric-head" },
      k(y0, { field: t }),
      k("div", { className: "woof-detail__hero-label" }, e.label)
    ),
    k(v0, {
      value: e.value,
      unit: e.unit,
      emphasis: e.emphasis
    })
  );
}
function S0({ card: e }) {
  return k(
    "article",
    { className: "woof-detail__macro-card" },
    k(
      "div",
      { className: "woof-detail__macro-card-head" },
      k("div", { className: "woof-detail__macro-card-label" }, e.label),
      k("div", { className: "woof-detail__macro-card-value" }, `${e.value}${e.unit}`)
    ),
    k(
      "div",
      { className: "woof-detail__macro-track", "aria-hidden": "true" },
      k("div", {
        className: "woof-detail__macro-fill",
        style: {
          width: `${Math.max(Math.min(Number(e.share) || 0, 100), 8)}%`,
          background: e.color
        }
      })
    ),
    k("div", { className: "woof-detail__macro-share" }, e.shareLabel || "--")
  );
}
function w0({ rows: e, headers: t = ["Nutrient", "Value"] }) {
  return k(
    "div",
    { className: "woof-detail__table" },
    k(
      "div",
      { className: "woof-detail__table-head" },
      k("div", null, t[0] || "Nutrient"),
      k("div", null, t[1] || "Value")
    ),
    ...e.map((n) => k(
      "div",
      { key: n.field, className: "woof-detail__table-row" },
      k("div", { className: "woof-detail__table-label" }, n.label),
      k(
        "div",
        { className: "woof-detail__table-value" },
        n.value,
        n.unit ? k("span", { className: "woof-detail__table-unit" }, n.unit) : null
      )
    ))
  );
}
function k0({ section: e }) {
  var n, r;
  const t = (e == null ? void 0 : e.rows) || [];
  return t.length === 0 ? k("div", { className: "woof-detail__empty-note" }, (e == null ? void 0 : e.emptyText) || "") : k(
    "div",
    { className: "woof-detail__table woof-detail__table--composition" },
    k(
      "div",
      { className: "woof-detail__table-head" },
      k("div", null, ((n = e == null ? void 0 : e.headers) == null ? void 0 : n[0]) || "Item"),
      k("div", null, ((r = e == null ? void 0 : e.headers) == null ? void 0 : r[1]) || "Amount")
    ),
    ...t.map((a, o) => k(
      "div",
      { key: `${a.name}-${o}`, className: "woof-detail__table-row" },
      k("div", { className: "woof-detail__table-label" }, a.name || "--"),
      k("div", { className: "woof-detail__table-value" }, a.amount || "--")
    ))
  );
}
function ar({ title: e, summary: t, children: n, modifier: r = "" }) {
  return k(
    "section",
    { className: `woof-detail__section-block${r}` },
    k(
      "div",
      { className: "woof-detail__section-head" },
      k("h3", { className: "woof-detail__section-title" }, e),
      t ? k("p", { className: "woof-detail__section-summary" }, t) : null
    ),
    n
  );
}
function x0({ panel: e }) {
  return !e || !Array.isArray(e.signals) || e.signals.length === 0 ? null : k(
    ar,
    {
      title: e.title,
      summary: e.summary,
      modifier: " woof-detail__section-block--focus"
    },
    k(
      "div",
      { className: "woof-detail__focus-grid" },
      ...e.signals.map((t) => k(
        "article",
        { key: t.key || t.label, className: "woof-detail__focus-card" },
        k("div", { className: "woof-detail__focus-label" }, t.label),
        k("div", { className: "woof-detail__focus-value" }, t.value),
        t.detail ? k("div", { className: "woof-detail__focus-detail" }, t.detail) : null
      ))
    )
  );
}
function T0({
  model: e,
  onClose: t = fc
}) {
  var o, l, s, u, c, m, h, f, y;
  const n = g0(), r = e || n;
  if (!r) return null;
  const a = String(r.kind || "daily-summary").replace(/[^a-z0-9-]/gi, "").toLowerCase();
  return k(
    "section",
    { className: `woof-detail woof-detail--${a}`, "data-surface": "nutrition-detail", "aria-label": r.title },
    k(
      "header",
      { className: "woof-detail__header" },
      k(
        "div",
        { className: "woof-detail__header-copy" },
        k("div", { className: "woof-detail__eyebrow" }, r.summary),
        k("h2", { className: "woof-detail__title" }, r.title),
        k("p", { className: "woof-detail__subtitle" }, r.subtitle)
      ),
      k(
        "div",
        { className: "woof-detail__header-actions" },
        r.badge ? k(
          "div",
          { className: "woof-detail__badge" },
          k("span", { className: "woof-detail__badge-label" }, r.badge.label),
          k("span", { className: "woof-detail__badge-value" }, r.badge.value)
        ) : null,
        t !== fc ? k("button", {
          type: "button",
          className: "woof-detail__close-button",
          onClick: t,
          "aria-label": r.closeLabel,
          title: r.closeLabel
        }, "×") : null
      )
    ),
    k(
      ar,
      {
        title: (o = r.reportSection) == null ? void 0 : o.title,
        summary: (l = r.reportSection) == null ? void 0 : l.summary,
        modifier: " woof-detail__section-block--hero"
      },
      k(
        "div",
        { className: `woof-detail__hero-grid${r.kind === "item-detail" ? " woof-detail__hero-grid--item" : ""}` },
        ...(r.heroStats || []).map((v) => k(_0, {
          key: v.label,
          stat: v
        }))
      )
    ),
    k(
      ar,
      {
        title: (s = r.macroSection) == null ? void 0 : s.title,
        summary: (u = r.macroSection) == null ? void 0 : u.summary
      },
      k(
        "div",
        { className: "woof-detail__macro-grid" },
        ...(((c = r.macroSection) == null ? void 0 : c.cards) || []).map((v) => k(S0, {
          key: v.field,
          card: v
        }))
      )
    ),
    r.compositionSection ? k(
      ar,
      {
        title: r.compositionSection.title,
        summary: r.compositionSection.summary
      },
      k(k0, { section: r.compositionSection })
    ) : null,
    k(
      ar,
      {
        title: (m = r.nutrientSection) == null ? void 0 : m.title,
        summary: (h = r.nutrientSection) == null ? void 0 : h.summary
      },
      k(w0, {
        rows: ((f = r.nutrientSection) == null ? void 0 : f.rows) || [],
        headers: ((y = r.nutrientSection) == null ? void 0 : y.headers) || ["Nutrient", "Value"]
      })
    ),
    k(x0, { panel: r.focusPanel })
  );
}
window.__woofReactHomeStatus = "bundle-loaded";
const N0 = Object.freeze([
  "__woofUiBridge",
  "__woofAppStateBridge",
  "__woofDetailSurfaceBridge",
  "__woofAddBridge",
  "__woofStatsBridge"
]), b0 = 120;
let mc = 0;
function Ze() {
  return window.__woofUiBridge || {
    openHomeLogModal() {
    },
    openAIView() {
    },
    openFavorites() {
    },
    openTodayMealsDatePicker() {
    },
    setSelectedDate() {
    },
    shiftSelectedDate() {
    },
    addRecordToFavorites() {
    },
    deleteMealRecord() {
    },
    openRhythmView() {
    },
    openDailySummaryDetail() {
    },
    closeDetailModal() {
    }
  };
}
function C0() {
  return N0.every((e) => !!window[e]);
}
function M0() {
  const e = document.getElementById("home-react-root"), t = document.getElementById("view-daily");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-home-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ i.jsx(le.StrictMode, { children: /* @__PURE__ */ i.jsx(
          Sv,
          {
            onQuickLog: () => Ze().openHomeLogModal(),
            onOpenAI: () => Ze().openAIView(),
            onOpenFavorites: () => Ze().openFavorites(),
            onSetSelectedDate: (n) => Ze().setSelectedDate(n),
            onShiftDate: (n) => Ze().shiftSelectedDate(n),
            onFavoriteMealItem: (n) => Ze().addRecordToFavorites(n),
            onDeleteMealItem: (n) => Ze().deleteMealRecord(n),
            onOpenRhythm: () => Ze().openRhythmView(),
            onOpenDailySummary: () => Ze().openDailySummaryDetail()
          }
        ) })
      ), window.__woofReactHomeStatus = "mounted";
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-home-enabled"), window.__woofReactHomeStatus = "failed", window.__woofReactHomeError = String((n == null ? void 0 : n.stack) || n || "Unknown React home mount error"), console.error("React home mount failed", n);
    }
}
function j0() {
  const e = document.getElementById("detail-react-root");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", Dt.createRoot(e).render(
        /* @__PURE__ */ i.jsx(le.StrictMode, { children: /* @__PURE__ */ i.jsx(T0, { onClose: () => Ze().closeDetailModal() }) })
      );
    } catch (t) {
      e.dataset.mounted = "false", console.error("React detail surface mount failed", t);
    }
}
function E0() {
  const e = document.getElementById("history-react-root"), t = document.getElementById("view-history");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-history-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ i.jsx(le.StrictMode, { children: /* @__PURE__ */ i.jsx(Gv, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-history-enabled"), console.error("React history mount failed", n);
    }
}
function L0() {
  const e = document.getElementById("add-react-root"), t = document.getElementById("view-add");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-add-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ i.jsx(le.StrictMode, { children: /* @__PURE__ */ i.jsx(Fv, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-add-enabled"), console.error("React add shell mount failed", n);
    }
}
function D0() {
  const e = document.getElementById("stats-react-root"), t = document.getElementById("view-stats");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-stats-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ i.jsx(le.StrictMode, { children: /* @__PURE__ */ i.jsx(a0, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-stats-enabled"), console.error("React stats mount failed", n);
    }
}
function A0() {
  const e = document.getElementById("profile-react-root"), t = document.getElementById("view-profile");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-profile-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ i.jsx(le.StrictMode, { children: /* @__PURE__ */ i.jsx(qv, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-profile-enabled"), console.error("React profile mount failed", n);
    }
}
function wa() {
  if (!C0() && mc < b0) {
    mc += 1, window.__woofReactHomeStatus = "waiting-for-bridge", window.requestAnimationFrame(wa);
    return;
  }
  M0(), L0(), E0(), D0(), A0(), j0();
}
const P0 = !!(document.getElementById("home-react-root") || document.getElementById("add-react-root") || document.getElementById("history-react-root") || document.getElementById("stats-react-root") || document.getElementById("profile-react-root") || document.getElementById("detail-react-root"));
P0 ? wa() : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", wa, { once: !0 }) : wa();
