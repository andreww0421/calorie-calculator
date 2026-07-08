function Vf(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qu = { exports: {} }, Ga = {}, Ju = { exports: {} }, I = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Dr = Symbol.for("react.element"), Qf = Symbol.for("react.portal"), Yf = Symbol.for("react.fragment"), Zf = Symbol.for("react.strict_mode"), Xf = Symbol.for("react.profiler"), qf = Symbol.for("react.provider"), Jf = Symbol.for("react.context"), em = Symbol.for("react.forward_ref"), tm = Symbol.for("react.suspense"), nm = Symbol.for("react.memo"), rm = Symbol.for("react.lazy"), Cs = Symbol.iterator;
function am(e) {
  return e === null || typeof e != "object" ? null : (e = Cs && e[Cs] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ec = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, tc = Object.assign, nc = {};
function zn(e, t, n) {
  this.props = e, this.context = t, this.refs = nc, this.updater = n || ec;
}
zn.prototype.isReactComponent = {};
zn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
zn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function rc() {
}
rc.prototype = zn.prototype;
function Xl(e, t, n) {
  this.props = e, this.context = t, this.refs = nc, this.updater = n || ec;
}
var ql = Xl.prototype = new rc();
ql.constructor = Xl;
tc(ql, zn.prototype);
ql.isPureReactComponent = !0;
var Ms = Array.isArray, ac = Object.prototype.hasOwnProperty, Jl = { current: null }, oc = { key: !0, ref: !0, __self: !0, __source: !0 };
function lc(e, t, n) {
  var r, a = {}, o = null, l = null;
  if (t != null) for (r in t.ref !== void 0 && (l = t.ref), t.key !== void 0 && (o = "" + t.key), t) ac.call(t, r) && !oc.hasOwnProperty(r) && (a[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) a.children = n;
  else if (1 < i) {
    for (var u = Array(i), c = 0; c < i; c++) u[c] = arguments[c + 2];
    a.children = u;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) a[r] === void 0 && (a[r] = i[r]);
  return { $$typeof: Dr, type: e, key: o, ref: l, props: a, _owner: Jl.current };
}
function om(e, t) {
  return { $$typeof: Dr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function ei(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Dr;
}
function lm(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var js = /\/+/g;
function po(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? lm("" + e.key) : t.toString(36);
}
function ia(e, t, n, r, a) {
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
        case Dr:
        case Qf:
          l = !0;
      }
  }
  if (l) return l = e, a = a(l), e = r === "" ? "." + po(l, 0) : r, Ms(a) ? (n = "", e != null && (n = e.replace(js, "$&/") + "/"), ia(a, t, n, "", function(c) {
    return c;
  })) : a != null && (ei(a) && (a = om(a, n + (!a.key || l && l.key === a.key ? "" : ("" + a.key).replace(js, "$&/") + "/") + e)), t.push(a)), 1;
  if (l = 0, r = r === "" ? "." : r + ":", Ms(e)) for (var i = 0; i < e.length; i++) {
    o = e[i];
    var u = r + po(o, i);
    l += ia(o, t, n, u, a);
  }
  else if (u = am(e), typeof u == "function") for (e = u.call(e), i = 0; !(o = e.next()).done; ) o = o.value, u = r + po(o, i++), l += ia(o, t, n, u, a);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return l;
}
function Hr(e, t, n) {
  if (e == null) return e;
  var r = [], a = 0;
  return ia(e, r, "", "", function(o) {
    return t.call(n, o, a++);
  }), r;
}
function im(e) {
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
var ye = { current: null }, sa = { transition: null }, sm = { ReactCurrentDispatcher: ye, ReactCurrentBatchConfig: sa, ReactCurrentOwner: Jl };
function ic() {
  throw Error("act(...) is not supported in production builds of React.");
}
I.Children = { map: Hr, forEach: function(e, t, n) {
  Hr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Hr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Hr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!ei(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
I.Component = zn;
I.Fragment = Yf;
I.Profiler = Xf;
I.PureComponent = Xl;
I.StrictMode = Zf;
I.Suspense = tm;
I.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sm;
I.act = ic;
I.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = tc({}, e.props), a = e.key, o = e.ref, l = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, l = Jl.current), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (u in t) ac.call(t, u) && !oc.hasOwnProperty(u) && (r[u] = t[u] === void 0 && i !== void 0 ? i[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    i = Array(u);
    for (var c = 0; c < u; c++) i[c] = arguments[c + 2];
    r.children = i;
  }
  return { $$typeof: Dr, type: e.type, key: a, ref: o, props: r, _owner: l };
};
I.createContext = function(e) {
  return e = { $$typeof: Jf, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: qf, _context: e }, e.Consumer = e;
};
I.createElement = lc;
I.createFactory = function(e) {
  var t = lc.bind(null, e);
  return t.type = e, t;
};
I.createRef = function() {
  return { current: null };
};
I.forwardRef = function(e) {
  return { $$typeof: em, render: e };
};
I.isValidElement = ei;
I.lazy = function(e) {
  return { $$typeof: rm, _payload: { _status: -1, _result: e }, _init: im };
};
I.memo = function(e, t) {
  return { $$typeof: nm, type: e, compare: t === void 0 ? null : t };
};
I.startTransition = function(e) {
  var t = sa.transition;
  sa.transition = {};
  try {
    e();
  } finally {
    sa.transition = t;
  }
};
I.unstable_act = ic;
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
Ju.exports = I;
var X = Ju.exports;
const de = /* @__PURE__ */ Vf(X);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var um = X, cm = Symbol.for("react.element"), dm = Symbol.for("react.fragment"), fm = Object.prototype.hasOwnProperty, mm = um.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, pm = { key: !0, ref: !0, __self: !0, __source: !0 };
function sc(e, t, n) {
  var r, a = {}, o = null, l = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (l = t.ref);
  for (r in t) fm.call(t, r) && !pm.hasOwnProperty(r) && (a[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) a[r] === void 0 && (a[r] = t[r]);
  return { $$typeof: cm, type: e, key: o, ref: l, props: a, _owner: mm.current };
}
Ga.Fragment = dm;
Ga.jsx = sc;
Ga.jsxs = sc;
qu.exports = Ga;
var s = qu.exports, Dt = {}, uc = { exports: {} }, Le = {}, cc = { exports: {} }, dc = {};
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
  function t(T, L) {
    var A = T.length;
    T.push(L);
    e: for (; 0 < A; ) {
      var W = A - 1 >>> 1, Z = T[W];
      if (0 < a(Z, L)) T[W] = L, T[A] = Z, A = W;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var L = T[0], A = T.pop();
    if (A !== L) {
      T[0] = A;
      e: for (var W = 0, Z = T.length, Ot = Z >>> 1; W < Ot; ) {
        var Ge = 2 * (W + 1) - 1, an = T[Ge], Ve = Ge + 1, $t = T[Ve];
        if (0 > a(an, A)) Ve < Z && 0 > a($t, an) ? (T[W] = $t, T[Ve] = A, W = Ve) : (T[W] = an, T[Ge] = A, W = Ge);
        else if (Ve < Z && 0 > a($t, A)) T[W] = $t, T[Ve] = A, W = Ve;
        else break e;
      }
    }
    return L;
  }
  function a(T, L) {
    var A = T.sortIndex - L.sortIndex;
    return A !== 0 ? A : T.id - L.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var l = Date, i = l.now();
    e.unstable_now = function() {
      return l.now() - i;
    };
  }
  var u = [], c = [], h = 1, m = null, f = 3, y = !1, v = !1, _ = !1, P = typeof setTimeout == "function" ? setTimeout : null, p = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function g(T) {
    for (var L = n(c); L !== null; ) {
      if (L.callback === null) r(c);
      else if (L.startTime <= T) r(c), L.sortIndex = L.expirationTime, t(u, L);
      else break;
      L = n(c);
    }
  }
  function S(T) {
    if (_ = !1, g(T), !v) if (n(u) !== null) v = !0, nn(x);
    else {
      var L = n(c);
      L !== null && rn(S, L.startTime - T);
    }
  }
  function x(T, L) {
    v = !1, _ && (_ = !1, p(M), M = -1), y = !0;
    var A = f;
    try {
      for (g(L), m = n(u); m !== null && (!(m.expirationTime > L) || T && !ae()); ) {
        var W = m.callback;
        if (typeof W == "function") {
          m.callback = null, f = m.priorityLevel;
          var Z = W(m.expirationTime <= L);
          L = e.unstable_now(), typeof Z == "function" ? m.callback = Z : m === n(u) && r(u), g(L);
        } else r(u);
        m = n(u);
      }
      if (m !== null) var Ot = !0;
      else {
        var Ge = n(c);
        Ge !== null && rn(S, Ge.startTime - L), Ot = !1;
      }
      return Ot;
    } finally {
      m = null, f = A, y = !1;
    }
  }
  var C = !1, N = null, M = -1, O = 5, D = -1;
  function ae() {
    return !(e.unstable_now() - D < O);
  }
  function Y() {
    if (N !== null) {
      var T = e.unstable_now();
      D = T;
      var L = !0;
      try {
        L = N(!0, T);
      } finally {
        L ? ht() : (C = !1, N = null);
      }
    } else C = !1;
  }
  var ht;
  if (typeof d == "function") ht = function() {
    d(Y);
  };
  else if (typeof MessageChannel < "u") {
    var Bn = new MessageChannel(), Br = Bn.port2;
    Bn.port1.onmessage = Y, ht = function() {
      Br.postMessage(null);
    };
  } else ht = function() {
    P(Y, 0);
  };
  function nn(T) {
    N = T, C || (C = !0, ht());
  }
  function rn(T, L) {
    M = P(function() {
      T(e.unstable_now());
    }, L);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    v || y || (v = !0, nn(x));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : O = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return f;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(T) {
    switch (f) {
      case 1:
      case 2:
      case 3:
        var L = 3;
        break;
      default:
        L = f;
    }
    var A = f;
    f = L;
    try {
      return T();
    } finally {
      f = A;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, L) {
    switch (T) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        T = 3;
    }
    var A = f;
    f = T;
    try {
      return L();
    } finally {
      f = A;
    }
  }, e.unstable_scheduleCallback = function(T, L, A) {
    var W = e.unstable_now();
    switch (typeof A == "object" && A !== null ? (A = A.delay, A = typeof A == "number" && 0 < A ? W + A : W) : A = W, T) {
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
    return Z = A + Z, T = { id: h++, callback: L, priorityLevel: T, startTime: A, expirationTime: Z, sortIndex: -1 }, A > W ? (T.sortIndex = A, t(c, T), n(u) === null && T === n(c) && (_ ? (p(M), M = -1) : _ = !0, rn(S, A - W))) : (T.sortIndex = Z, t(u, T), v || y || (v = !0, nn(x))), T;
  }, e.unstable_shouldYield = ae, e.unstable_wrapCallback = function(T) {
    var L = f;
    return function() {
      var A = f;
      f = L;
      try {
        return T.apply(this, arguments);
      } finally {
        f = A;
      }
    };
  };
})(dc);
cc.exports = dc;
var hm = cc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gm = X, Ee = hm;
function w(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var fc = /* @__PURE__ */ new Set(), hr = {};
function en(e, t) {
  jn(e, t), jn(e + "Capture", t);
}
function jn(e, t) {
  for (hr[e] = t, e = 0; e < t.length; e++) fc.add(t[e]);
}
var ut = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), qo = Object.prototype.hasOwnProperty, ym = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Es = {}, Ls = {};
function vm(e) {
  return qo.call(Ls, e) ? !0 : qo.call(Es, e) ? !1 : ym.test(e) ? Ls[e] = !0 : (Es[e] = !0, !1);
}
function Sm(e, t, n, r) {
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
function _m(e, t, n, r) {
  if (t === null || typeof t > "u" || Sm(e, t, n, r)) return !0;
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
var ie = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ie[e] = new ve(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ie[t] = new ve(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ie[e] = new ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ie[e] = new ve(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ie[e] = new ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ie[e] = new ve(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ie[e] = new ve(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ie[e] = new ve(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ie[e] = new ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ti = /[\-:]([a-z])/g;
function ni(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    ti,
    ni
  );
  ie[t] = new ve(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(ti, ni);
  ie[t] = new ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(ti, ni);
  ie[t] = new ve(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ie[e] = new ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ie.xlinkHref = new ve("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ie[e] = new ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ri(e, t, n, r) {
  var a = ie.hasOwnProperty(t) ? ie[t] : null;
  (a !== null ? a.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (_m(t, n, a, r) && (n = null), r || a === null ? vm(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = n === null ? a.type === 3 ? !1 : "" : n : (t = a.attributeName, r = a.attributeNamespace, n === null ? e.removeAttribute(t) : (a = a.type, n = a === 3 || a === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var mt = gm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ur = Symbol.for("react.element"), un = Symbol.for("react.portal"), cn = Symbol.for("react.fragment"), ai = Symbol.for("react.strict_mode"), Jo = Symbol.for("react.profiler"), mc = Symbol.for("react.provider"), pc = Symbol.for("react.context"), oi = Symbol.for("react.forward_ref"), el = Symbol.for("react.suspense"), tl = Symbol.for("react.suspense_list"), li = Symbol.for("react.memo"), yt = Symbol.for("react.lazy"), hc = Symbol.for("react.offscreen"), Ds = Symbol.iterator;
function Wn(e) {
  return e === null || typeof e != "object" ? null : (e = Ds && e[Ds] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, ho;
function Jn(e) {
  if (ho === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    ho = t && t[1] || "";
  }
  return `
` + ho + e;
}
var go = !1;
function yo(e, t) {
  if (!e || go) return "";
  go = !0;
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
`), l = a.length - 1, i = o.length - 1; 1 <= l && 0 <= i && a[l] !== o[i]; ) i--;
      for (; 1 <= l && 0 <= i; l--, i--) if (a[l] !== o[i]) {
        if (l !== 1 || i !== 1)
          do
            if (l--, i--, 0 > i || a[l] !== o[i]) {
              var u = `
` + a[l].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= l && 0 <= i);
        break;
      }
    }
  } finally {
    go = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Jn(e) : "";
}
function wm(e) {
  switch (e.tag) {
    case 5:
      return Jn(e.type);
    case 16:
      return Jn("Lazy");
    case 13:
      return Jn("Suspense");
    case 19:
      return Jn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = yo(e.type, !1), e;
    case 11:
      return e = yo(e.type.render, !1), e;
    case 1:
      return e = yo(e.type, !0), e;
    default:
      return "";
  }
}
function nl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case cn:
      return "Fragment";
    case un:
      return "Portal";
    case Jo:
      return "Profiler";
    case ai:
      return "StrictMode";
    case el:
      return "Suspense";
    case tl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case pc:
      return (e.displayName || "Context") + ".Consumer";
    case mc:
      return (e._context.displayName || "Context") + ".Provider";
    case oi:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case li:
      return t = e.displayName || null, t !== null ? t : nl(e.type) || "Memo";
    case yt:
      t = e._payload, e = e._init;
      try {
        return nl(e(t));
      } catch {
      }
  }
  return null;
}
function km(e) {
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
      return nl(t);
    case 8:
      return t === ai ? "StrictMode" : "Mode";
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
function gc(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function xm(e) {
  var t = gc(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function Kr(e) {
  e._valueTracker || (e._valueTracker = xm(e));
}
function yc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = gc(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function _a(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function rl(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function As(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = At(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function vc(e, t) {
  t = t.checked, t != null && ri(e, "checked", t, !1);
}
function al(e, t) {
  vc(e, t);
  var n = At(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? ol(e, t.type, n) : t.hasOwnProperty("defaultValue") && ol(e, t.type, At(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Ps(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function ol(e, t, n) {
  (t !== "number" || _a(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var er = Array.isArray;
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
function ll(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(w(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Is(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(w(92));
      if (er(n)) {
        if (1 < n.length) throw Error(w(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: At(n) };
}
function Sc(e, t) {
  var n = At(t.value), r = At(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function zs(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function _c(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function il(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? _c(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Gr, wc = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, a) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, a);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Gr = Gr || document.createElement("div"), Gr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Gr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function gr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var ar = {
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
}, Tm = ["Webkit", "ms", "Moz", "O"];
Object.keys(ar).forEach(function(e) {
  Tm.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), ar[t] = ar[e];
  });
});
function kc(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || ar.hasOwnProperty(e) && ar[e] ? ("" + t).trim() : t + "px";
}
function xc(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, a = kc(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
  }
}
var Nm = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function sl(e, t) {
  if (t) {
    if (Nm[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(w(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(w(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(w(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(w(62));
  }
}
function ul(e, t) {
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
var cl = null;
function ii(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var dl = null, Tn = null, Nn = null;
function Fs(e) {
  if (e = Ir(e)) {
    if (typeof dl != "function") throw Error(w(280));
    var t = e.stateNode;
    t && (t = Xa(t), dl(e.stateNode, e.type, t));
  }
}
function Tc(e) {
  Tn ? Nn ? Nn.push(e) : Nn = [e] : Tn = e;
}
function Nc() {
  if (Tn) {
    var e = Tn, t = Nn;
    if (Nn = Tn = null, Fs(e), t) for (e = 0; e < t.length; e++) Fs(t[e]);
  }
}
function bc(e, t) {
  return e(t);
}
function Cc() {
}
var vo = !1;
function Mc(e, t, n) {
  if (vo) return e(t, n);
  vo = !0;
  try {
    return bc(e, t, n);
  } finally {
    vo = !1, (Tn !== null || Nn !== null) && (Cc(), Nc());
  }
}
function yr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Xa(n);
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
var fl = !1;
if (ut) try {
  var Hn = {};
  Object.defineProperty(Hn, "passive", { get: function() {
    fl = !0;
  } }), window.addEventListener("test", Hn, Hn), window.removeEventListener("test", Hn, Hn);
} catch {
  fl = !1;
}
function bm(e, t, n, r, a, o, l, i, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (h) {
    this.onError(h);
  }
}
var or = !1, wa = null, ka = !1, ml = null, Cm = { onError: function(e) {
  or = !0, wa = e;
} };
function Mm(e, t, n, r, a, o, l, i, u) {
  or = !1, wa = null, bm.apply(Cm, arguments);
}
function jm(e, t, n, r, a, o, l, i, u) {
  if (Mm.apply(this, arguments), or) {
    if (or) {
      var c = wa;
      or = !1, wa = null;
    } else throw Error(w(198));
    ka || (ka = !0, ml = c);
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
function jc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Os(e) {
  if (tn(e) !== e) throw Error(w(188));
}
function Em(e) {
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
        if (o === n) return Os(a), e;
        if (o === r) return Os(a), t;
        o = o.sibling;
      }
      throw Error(w(188));
    }
    if (n.return !== r.return) n = a, r = o;
    else {
      for (var l = !1, i = a.child; i; ) {
        if (i === n) {
          l = !0, n = a, r = o;
          break;
        }
        if (i === r) {
          l = !0, r = a, n = o;
          break;
        }
        i = i.sibling;
      }
      if (!l) {
        for (i = o.child; i; ) {
          if (i === n) {
            l = !0, n = o, r = a;
            break;
          }
          if (i === r) {
            l = !0, r = o, n = a;
            break;
          }
          i = i.sibling;
        }
        if (!l) throw Error(w(189));
      }
    }
    if (n.alternate !== r) throw Error(w(190));
  }
  if (n.tag !== 3) throw Error(w(188));
  return n.stateNode.current === n ? e : t;
}
function Ec(e) {
  return e = Em(e), e !== null ? Lc(e) : null;
}
function Lc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Lc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Dc = Ee.unstable_scheduleCallback, $s = Ee.unstable_cancelCallback, Lm = Ee.unstable_shouldYield, Dm = Ee.unstable_requestPaint, q = Ee.unstable_now, Am = Ee.unstable_getCurrentPriorityLevel, si = Ee.unstable_ImmediatePriority, Ac = Ee.unstable_UserBlockingPriority, xa = Ee.unstable_NormalPriority, Pm = Ee.unstable_LowPriority, Pc = Ee.unstable_IdlePriority, Va = null, et = null;
function Im(e) {
  if (et && typeof et.onCommitFiberRoot == "function") try {
    et.onCommitFiberRoot(Va, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var He = Math.clz32 ? Math.clz32 : Om, zm = Math.log, Fm = Math.LN2;
function Om(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (zm(e) / Fm | 0) | 0;
}
var Vr = 64, Qr = 4194304;
function tr(e) {
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
function Ta(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, a = e.suspendedLanes, o = e.pingedLanes, l = n & 268435455;
  if (l !== 0) {
    var i = l & ~a;
    i !== 0 ? r = tr(i) : (o &= l, o !== 0 && (r = tr(o)));
  } else l = n & ~a, l !== 0 ? r = tr(l) : o !== 0 && (r = tr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & a) && (a = r & -r, o = t & -t, a >= o || a === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - He(t), a = 1 << n, r |= e[n], t &= ~a;
  return r;
}
function $m(e, t) {
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
function Rm(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var l = 31 - He(o), i = 1 << l, u = a[l];
    u === -1 ? (!(i & n) || i & r) && (a[l] = $m(i, t)) : u <= t && (e.expiredLanes |= i), o &= ~i;
  }
}
function pl(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Ic() {
  var e = Vr;
  return Vr <<= 1, !(Vr & 4194240) && (Vr = 64), e;
}
function So(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Ar(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - He(t), e[t] = n;
}
function Bm(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var a = 31 - He(n), o = 1 << a;
    t[a] = 0, r[a] = -1, e[a] = -1, n &= ~o;
  }
}
function ui(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - He(n), a = 1 << r;
    a & t | e[r] & t && (e[r] |= t), n &= ~a;
  }
}
var F = 0;
function zc(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Fc, ci, Oc, $c, Rc, hl = !1, Yr = [], Tt = null, Nt = null, bt = null, vr = /* @__PURE__ */ new Map(), Sr = /* @__PURE__ */ new Map(), _t = [], Wm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Rs(e, t) {
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
      vr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Sr.delete(t.pointerId);
  }
}
function Un(e, t, n, r, a, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [a] }, t !== null && (t = Ir(t), t !== null && ci(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
}
function Hm(e, t, n, r, a) {
  switch (t) {
    case "focusin":
      return Tt = Un(Tt, e, t, n, r, a), !0;
    case "dragenter":
      return Nt = Un(Nt, e, t, n, r, a), !0;
    case "mouseover":
      return bt = Un(bt, e, t, n, r, a), !0;
    case "pointerover":
      var o = a.pointerId;
      return vr.set(o, Un(vr.get(o) || null, e, t, n, r, a)), !0;
    case "gotpointercapture":
      return o = a.pointerId, Sr.set(o, Un(Sr.get(o) || null, e, t, n, r, a)), !0;
  }
  return !1;
}
function Bc(e) {
  var t = Ht(e.target);
  if (t !== null) {
    var n = tn(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = jc(n), t !== null) {
          e.blockedOn = t, Rc(e.priority, function() {
            Oc(n);
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
function ua(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = gl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      cl = r, n.target.dispatchEvent(r), cl = null;
    } else return t = Ir(n), t !== null && ci(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Bs(e, t, n) {
  ua(e) && n.delete(t);
}
function Um() {
  hl = !1, Tt !== null && ua(Tt) && (Tt = null), Nt !== null && ua(Nt) && (Nt = null), bt !== null && ua(bt) && (bt = null), vr.forEach(Bs), Sr.forEach(Bs);
}
function Kn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, hl || (hl = !0, Ee.unstable_scheduleCallback(Ee.unstable_NormalPriority, Um)));
}
function _r(e) {
  function t(a) {
    return Kn(a, e);
  }
  if (0 < Yr.length) {
    Kn(Yr[0], e);
    for (var n = 1; n < Yr.length; n++) {
      var r = Yr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Tt !== null && Kn(Tt, e), Nt !== null && Kn(Nt, e), bt !== null && Kn(bt, e), vr.forEach(t), Sr.forEach(t), n = 0; n < _t.length; n++) r = _t[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < _t.length && (n = _t[0], n.blockedOn === null); ) Bc(n), n.blockedOn === null && _t.shift();
}
var bn = mt.ReactCurrentBatchConfig, Na = !0;
function Km(e, t, n, r) {
  var a = F, o = bn.transition;
  bn.transition = null;
  try {
    F = 1, di(e, t, n, r);
  } finally {
    F = a, bn.transition = o;
  }
}
function Gm(e, t, n, r) {
  var a = F, o = bn.transition;
  bn.transition = null;
  try {
    F = 4, di(e, t, n, r);
  } finally {
    F = a, bn.transition = o;
  }
}
function di(e, t, n, r) {
  if (Na) {
    var a = gl(e, t, n, r);
    if (a === null) jo(e, t, r, ba, n), Rs(e, r);
    else if (Hm(a, e, t, n, r)) r.stopPropagation();
    else if (Rs(e, r), t & 4 && -1 < Wm.indexOf(e)) {
      for (; a !== null; ) {
        var o = Ir(a);
        if (o !== null && Fc(o), o = gl(e, t, n, r), o === null && jo(e, t, r, ba, n), o === a) break;
        a = o;
      }
      a !== null && r.stopPropagation();
    } else jo(e, t, r, null, n);
  }
}
var ba = null;
function gl(e, t, n, r) {
  if (ba = null, e = ii(r), e = Ht(e), e !== null) if (t = tn(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = jc(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return ba = e, null;
}
function Wc(e) {
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
      switch (Am()) {
        case si:
          return 1;
        case Ac:
          return 4;
        case xa:
        case Pm:
          return 16;
        case Pc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kt = null, fi = null, ca = null;
function Hc() {
  if (ca) return ca;
  var e, t = fi, n = t.length, r, a = "value" in kt ? kt.value : kt.textContent, o = a.length;
  for (e = 0; e < n && t[e] === a[e]; e++) ;
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === a[o - r]; r++) ;
  return ca = a.slice(e, 1 < r ? 1 - r : void 0);
}
function da(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Zr() {
  return !0;
}
function Ws() {
  return !1;
}
function De(e) {
  function t(n, r, a, o, l) {
    this._reactName = n, this._targetInst = a, this.type = r, this.nativeEvent = o, this.target = l, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(o) : o[i]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Zr : Ws, this.isPropagationStopped = Ws, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Zr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Zr);
  }, persist: function() {
  }, isPersistent: Zr }), t;
}
var Fn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, mi = De(Fn), Pr = G({}, Fn, { view: 0, detail: 0 }), Vm = De(Pr), _o, wo, Gn, Qa = G({}, Pr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: pi, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Gn && (Gn && e.type === "mousemove" ? (_o = e.screenX - Gn.screenX, wo = e.screenY - Gn.screenY) : wo = _o = 0, Gn = e), _o);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : wo;
} }), Hs = De(Qa), Qm = G({}, Qa, { dataTransfer: 0 }), Ym = De(Qm), Zm = G({}, Pr, { relatedTarget: 0 }), ko = De(Zm), Xm = G({}, Fn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), qm = De(Xm), Jm = G({}, Fn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), ep = De(Jm), tp = G({}, Fn, { data: 0 }), Us = De(tp), np = {
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
}, rp = {
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
}, ap = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function op(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ap[e]) ? !!t[e] : !1;
}
function pi() {
  return op;
}
var lp = G({}, Pr, { key: function(e) {
  if (e.key) {
    var t = np[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = da(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? rp[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: pi, charCode: function(e) {
  return e.type === "keypress" ? da(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? da(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), ip = De(lp), sp = G({}, Qa, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ks = De(sp), up = G({}, Pr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: pi }), cp = De(up), dp = G({}, Fn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), fp = De(dp), mp = G({}, Qa, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), pp = De(mp), hp = [9, 13, 27, 32], hi = ut && "CompositionEvent" in window, lr = null;
ut && "documentMode" in document && (lr = document.documentMode);
var gp = ut && "TextEvent" in window && !lr, Uc = ut && (!hi || lr && 8 < lr && 11 >= lr), Gs = " ", Vs = !1;
function Kc(e, t) {
  switch (e) {
    case "keyup":
      return hp.indexOf(t.keyCode) !== -1;
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
function Gc(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var dn = !1;
function yp(e, t) {
  switch (e) {
    case "compositionend":
      return Gc(t);
    case "keypress":
      return t.which !== 32 ? null : (Vs = !0, Gs);
    case "textInput":
      return e = t.data, e === Gs && Vs ? null : e;
    default:
      return null;
  }
}
function vp(e, t) {
  if (dn) return e === "compositionend" || !hi && Kc(e, t) ? (e = Hc(), ca = fi = kt = null, dn = !1, e) : null;
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
      return Uc && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Sp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Qs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Sp[e.type] : t === "textarea";
}
function Vc(e, t, n, r) {
  Tc(r), t = Ca(t, "onChange"), 0 < t.length && (n = new mi("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var ir = null, wr = null;
function _p(e) {
  ad(e, 0);
}
function Ya(e) {
  var t = pn(e);
  if (yc(t)) return e;
}
function wp(e, t) {
  if (e === "change") return t;
}
var Qc = !1;
if (ut) {
  var xo;
  if (ut) {
    var To = "oninput" in document;
    if (!To) {
      var Ys = document.createElement("div");
      Ys.setAttribute("oninput", "return;"), To = typeof Ys.oninput == "function";
    }
    xo = To;
  } else xo = !1;
  Qc = xo && (!document.documentMode || 9 < document.documentMode);
}
function Zs() {
  ir && (ir.detachEvent("onpropertychange", Yc), wr = ir = null);
}
function Yc(e) {
  if (e.propertyName === "value" && Ya(wr)) {
    var t = [];
    Vc(t, wr, e, ii(e)), Mc(_p, t);
  }
}
function kp(e, t, n) {
  e === "focusin" ? (Zs(), ir = t, wr = n, ir.attachEvent("onpropertychange", Yc)) : e === "focusout" && Zs();
}
function xp(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ya(wr);
}
function Tp(e, t) {
  if (e === "click") return Ya(t);
}
function Np(e, t) {
  if (e === "input" || e === "change") return Ya(t);
}
function bp(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Ke = typeof Object.is == "function" ? Object.is : bp;
function kr(e, t) {
  if (Ke(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var a = n[r];
    if (!qo.call(t, a) || !Ke(e[a], t[a])) return !1;
  }
  return !0;
}
function Xs(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function qs(e, t) {
  var n = Xs(e);
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
    n = Xs(n);
  }
}
function Zc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Zc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Xc() {
  for (var e = window, t = _a(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = _a(e.document);
  }
  return t;
}
function gi(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Cp(e) {
  var t = Xc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Zc(n.ownerDocument.documentElement, n)) {
    if (r !== null && gi(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var a = n.textContent.length, o = Math.min(r.start, a);
        r = r.end === void 0 ? o : Math.min(r.end, a), !e.extend && o > r && (a = r, r = o, o = a), a = qs(n, o);
        var l = qs(
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
var Mp = ut && "documentMode" in document && 11 >= document.documentMode, fn = null, yl = null, sr = null, vl = !1;
function Js(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  vl || fn == null || fn !== _a(r) || (r = fn, "selectionStart" in r && gi(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), sr && kr(sr, r) || (sr = r, r = Ca(yl, "onSelect"), 0 < r.length && (t = new mi("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = fn)));
}
function Xr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var mn = { animationend: Xr("Animation", "AnimationEnd"), animationiteration: Xr("Animation", "AnimationIteration"), animationstart: Xr("Animation", "AnimationStart"), transitionend: Xr("Transition", "TransitionEnd") }, No = {}, qc = {};
ut && (qc = document.createElement("div").style, "AnimationEvent" in window || (delete mn.animationend.animation, delete mn.animationiteration.animation, delete mn.animationstart.animation), "TransitionEvent" in window || delete mn.transitionend.transition);
function Za(e) {
  if (No[e]) return No[e];
  if (!mn[e]) return e;
  var t = mn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in qc) return No[e] = t[n];
  return e;
}
var Jc = Za("animationend"), ed = Za("animationiteration"), td = Za("animationstart"), nd = Za("transitionend"), rd = /* @__PURE__ */ new Map(), eu = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function It(e, t) {
  rd.set(e, t), en(t, [e]);
}
for (var bo = 0; bo < eu.length; bo++) {
  var Co = eu[bo], jp = Co.toLowerCase(), Ep = Co[0].toUpperCase() + Co.slice(1);
  It(jp, "on" + Ep);
}
It(Jc, "onAnimationEnd");
It(ed, "onAnimationIteration");
It(td, "onAnimationStart");
It("dblclick", "onDoubleClick");
It("focusin", "onFocus");
It("focusout", "onBlur");
It(nd, "onTransitionEnd");
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
var nr = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Lp = new Set("cancel close invalid load scroll toggle".split(" ").concat(nr));
function tu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, jm(r, t, void 0, e), e.currentTarget = null;
}
function ad(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], a = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var l = r.length - 1; 0 <= l; l--) {
        var i = r[l], u = i.instance, c = i.currentTarget;
        if (i = i.listener, u !== o && a.isPropagationStopped()) break e;
        tu(a, i, c), o = u;
      }
      else for (l = 0; l < r.length; l++) {
        if (i = r[l], u = i.instance, c = i.currentTarget, i = i.listener, u !== o && a.isPropagationStopped()) break e;
        tu(a, i, c), o = u;
      }
    }
  }
  if (ka) throw e = ml, ka = !1, ml = null, e;
}
function R(e, t) {
  var n = t[xl];
  n === void 0 && (n = t[xl] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (od(t, e, 2, !1), n.add(r));
}
function Mo(e, t, n) {
  var r = 0;
  t && (r |= 4), od(n, e, r, t);
}
var qr = "_reactListening" + Math.random().toString(36).slice(2);
function xr(e) {
  if (!e[qr]) {
    e[qr] = !0, fc.forEach(function(n) {
      n !== "selectionchange" && (Lp.has(n) || Mo(n, !1, e), Mo(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[qr] || (t[qr] = !0, Mo("selectionchange", !1, t));
  }
}
function od(e, t, n, r) {
  switch (Wc(t)) {
    case 1:
      var a = Km;
      break;
    case 4:
      a = Gm;
      break;
    default:
      a = di;
  }
  n = a.bind(null, t, n, e), a = void 0, !fl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), r ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
}
function jo(e, t, n, r, a) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var l = r.tag;
    if (l === 3 || l === 4) {
      var i = r.stateNode.containerInfo;
      if (i === a || i.nodeType === 8 && i.parentNode === a) break;
      if (l === 4) for (l = r.return; l !== null; ) {
        var u = l.tag;
        if ((u === 3 || u === 4) && (u = l.stateNode.containerInfo, u === a || u.nodeType === 8 && u.parentNode === a)) return;
        l = l.return;
      }
      for (; i !== null; ) {
        if (l = Ht(i), l === null) return;
        if (u = l.tag, u === 5 || u === 6) {
          r = o = l;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  Mc(function() {
    var c = o, h = ii(n), m = [];
    e: {
      var f = rd.get(e);
      if (f !== void 0) {
        var y = mi, v = e;
        switch (e) {
          case "keypress":
            if (da(n) === 0) break e;
          case "keydown":
          case "keyup":
            y = ip;
            break;
          case "focusin":
            v = "focus", y = ko;
            break;
          case "focusout":
            v = "blur", y = ko;
            break;
          case "beforeblur":
          case "afterblur":
            y = ko;
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
            y = Hs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            y = Ym;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            y = cp;
            break;
          case Jc:
          case ed:
          case td:
            y = qm;
            break;
          case nd:
            y = fp;
            break;
          case "scroll":
            y = Vm;
            break;
          case "wheel":
            y = pp;
            break;
          case "copy":
          case "cut":
          case "paste":
            y = ep;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            y = Ks;
        }
        var _ = (t & 4) !== 0, P = !_ && e === "scroll", p = _ ? f !== null ? f + "Capture" : null : f;
        _ = [];
        for (var d = c, g; d !== null; ) {
          g = d;
          var S = g.stateNode;
          if (g.tag === 5 && S !== null && (g = S, p !== null && (S = yr(d, p), S != null && _.push(Tr(d, S, g)))), P) break;
          d = d.return;
        }
        0 < _.length && (f = new y(f, v, null, n, h), m.push({ event: f, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (f = e === "mouseover" || e === "pointerover", y = e === "mouseout" || e === "pointerout", f && n !== cl && (v = n.relatedTarget || n.fromElement) && (Ht(v) || v[ct])) break e;
        if ((y || f) && (f = h.window === h ? h : (f = h.ownerDocument) ? f.defaultView || f.parentWindow : window, y ? (v = n.relatedTarget || n.toElement, y = c, v = v ? Ht(v) : null, v !== null && (P = tn(v), v !== P || v.tag !== 5 && v.tag !== 6) && (v = null)) : (y = null, v = c), y !== v)) {
          if (_ = Hs, S = "onMouseLeave", p = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (_ = Ks, S = "onPointerLeave", p = "onPointerEnter", d = "pointer"), P = y == null ? f : pn(y), g = v == null ? f : pn(v), f = new _(S, d + "leave", y, n, h), f.target = P, f.relatedTarget = g, S = null, Ht(h) === c && (_ = new _(p, d + "enter", v, n, h), _.target = g, _.relatedTarget = P, S = _), P = S, y && v) t: {
            for (_ = y, p = v, d = 0, g = _; g; g = ln(g)) d++;
            for (g = 0, S = p; S; S = ln(S)) g++;
            for (; 0 < d - g; ) _ = ln(_), d--;
            for (; 0 < g - d; ) p = ln(p), g--;
            for (; d--; ) {
              if (_ === p || p !== null && _ === p.alternate) break t;
              _ = ln(_), p = ln(p);
            }
            _ = null;
          }
          else _ = null;
          y !== null && nu(m, f, y, _, !1), v !== null && P !== null && nu(m, P, v, _, !0);
        }
      }
      e: {
        if (f = c ? pn(c) : window, y = f.nodeName && f.nodeName.toLowerCase(), y === "select" || y === "input" && f.type === "file") var x = wp;
        else if (Qs(f)) if (Qc) x = Np;
        else {
          x = xp;
          var C = kp;
        }
        else (y = f.nodeName) && y.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (x = Tp);
        if (x && (x = x(e, c))) {
          Vc(m, x, n, h);
          break e;
        }
        C && C(e, f, c), e === "focusout" && (C = f._wrapperState) && C.controlled && f.type === "number" && ol(f, "number", f.value);
      }
      switch (C = c ? pn(c) : window, e) {
        case "focusin":
          (Qs(C) || C.contentEditable === "true") && (fn = C, yl = c, sr = null);
          break;
        case "focusout":
          sr = yl = fn = null;
          break;
        case "mousedown":
          vl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          vl = !1, Js(m, n, h);
          break;
        case "selectionchange":
          if (Mp) break;
        case "keydown":
        case "keyup":
          Js(m, n, h);
      }
      var N;
      if (hi) e: {
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
      else dn ? Kc(e, n) && (M = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
      M && (Uc && n.locale !== "ko" && (dn || M !== "onCompositionStart" ? M === "onCompositionEnd" && dn && (N = Hc()) : (kt = h, fi = "value" in kt ? kt.value : kt.textContent, dn = !0)), C = Ca(c, M), 0 < C.length && (M = new Us(M, e, null, n, h), m.push({ event: M, listeners: C }), N ? M.data = N : (N = Gc(n), N !== null && (M.data = N)))), (N = gp ? yp(e, n) : vp(e, n)) && (c = Ca(c, "onBeforeInput"), 0 < c.length && (h = new Us("onBeforeInput", "beforeinput", null, n, h), m.push({ event: h, listeners: c }), h.data = N));
    }
    ad(m, t);
  });
}
function Tr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ca(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var a = e, o = a.stateNode;
    a.tag === 5 && o !== null && (a = o, o = yr(e, n), o != null && r.unshift(Tr(e, o, a)), o = yr(e, t), o != null && r.push(Tr(e, o, a))), e = e.return;
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
function nu(e, t, n, r, a) {
  for (var o = t._reactName, l = []; n !== null && n !== r; ) {
    var i = n, u = i.alternate, c = i.stateNode;
    if (u !== null && u === r) break;
    i.tag === 5 && c !== null && (i = c, a ? (u = yr(n, o), u != null && l.unshift(Tr(n, u, i))) : a || (u = yr(n, o), u != null && l.push(Tr(n, u, i)))), n = n.return;
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var Dp = /\r\n?/g, Ap = /\u0000|\uFFFD/g;
function ru(e) {
  return (typeof e == "string" ? e : "" + e).replace(Dp, `
`).replace(Ap, "");
}
function Jr(e, t, n) {
  if (t = ru(t), ru(e) !== t && n) throw Error(w(425));
}
function Ma() {
}
var Sl = null, _l = null;
function wl(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var kl = typeof setTimeout == "function" ? setTimeout : void 0, Pp = typeof clearTimeout == "function" ? clearTimeout : void 0, au = typeof Promise == "function" ? Promise : void 0, Ip = typeof queueMicrotask == "function" ? queueMicrotask : typeof au < "u" ? function(e) {
  return au.resolve(null).then(e).catch(zp);
} : kl;
function zp(e) {
  setTimeout(function() {
    throw e;
  });
}
function Eo(e, t) {
  var n = t, r = 0;
  do {
    var a = n.nextSibling;
    if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$") {
      if (r === 0) {
        e.removeChild(a), _r(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = a;
  } while (n);
  _r(t);
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
function ou(e) {
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
var On = Math.random().toString(36).slice(2), qe = "__reactFiber$" + On, Nr = "__reactProps$" + On, ct = "__reactContainer$" + On, xl = "__reactEvents$" + On, Fp = "__reactListeners$" + On, Op = "__reactHandles$" + On;
function Ht(e) {
  var t = e[qe];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[ct] || n[qe]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ou(e); e !== null; ) {
        if (n = e[qe]) return n;
        e = ou(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Ir(e) {
  return e = e[qe] || e[ct], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function pn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(w(33));
}
function Xa(e) {
  return e[Nr] || null;
}
var Tl = [], hn = -1;
function zt(e) {
  return { current: e };
}
function B(e) {
  0 > hn || (e.current = Tl[hn], Tl[hn] = null, hn--);
}
function $(e, t) {
  hn++, Tl[hn] = e.current, e.current = t;
}
var Pt = {}, me = zt(Pt), we = zt(!1), Yt = Pt;
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
function ja() {
  B(we), B(me);
}
function lu(e, t, n) {
  if (me.current !== Pt) throw Error(w(168));
  $(me, t), $(we, n);
}
function ld(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var a in r) if (!(a in t)) throw Error(w(108, km(e) || "Unknown", a));
  return G({}, n, r);
}
function Ea(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Pt, Yt = me.current, $(me, e), $(we, we.current), !0;
}
function iu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(w(169));
  n ? (e = ld(e, t, Yt), r.__reactInternalMemoizedMergedChildContext = e, B(we), B(me), $(me, e)) : B(we), $(we, n);
}
var at = null, qa = !1, Lo = !1;
function id(e) {
  at === null ? at = [e] : at.push(e);
}
function $p(e) {
  qa = !0, id(e);
}
function Ft() {
  if (!Lo && at !== null) {
    Lo = !0;
    var e = 0, t = F;
    try {
      var n = at;
      for (F = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      at = null, qa = !1;
    } catch (a) {
      throw at !== null && (at = at.slice(e + 1)), Dc(si, Ft), a;
    } finally {
      F = t, Lo = !1;
    }
  }
  return null;
}
var gn = [], yn = 0, La = null, Da = 0, Ae = [], Pe = 0, Zt = null, lt = 1, it = "";
function Bt(e, t) {
  gn[yn++] = Da, gn[yn++] = La, La = e, Da = t;
}
function sd(e, t, n) {
  Ae[Pe++] = lt, Ae[Pe++] = it, Ae[Pe++] = Zt, Zt = e;
  var r = lt;
  e = it;
  var a = 32 - He(r) - 1;
  r &= ~(1 << a), n += 1;
  var o = 32 - He(t) + a;
  if (30 < o) {
    var l = a - a % 5;
    o = (r & (1 << l) - 1).toString(32), r >>= l, a -= l, lt = 1 << 32 - He(t) + a | n << a | r, it = o + e;
  } else lt = 1 << o | n << a | r, it = e;
}
function yi(e) {
  e.return !== null && (Bt(e, 1), sd(e, 1, 0));
}
function vi(e) {
  for (; e === La; ) La = gn[--yn], gn[yn] = null, Da = gn[--yn], gn[yn] = null;
  for (; e === Zt; ) Zt = Ae[--Pe], Ae[Pe] = null, it = Ae[--Pe], Ae[Pe] = null, lt = Ae[--Pe], Ae[Pe] = null;
}
var Me = null, Ce = null, H = !1, We = null;
function ud(e, t) {
  var n = Ie(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function su(e, t) {
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
function Nl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function bl(e) {
  if (H) {
    var t = Ce;
    if (t) {
      var n = t;
      if (!su(e, t)) {
        if (Nl(e)) throw Error(w(418));
        t = Ct(n.nextSibling);
        var r = Me;
        t && su(e, t) ? ud(r, n) : (e.flags = e.flags & -4097 | 2, H = !1, Me = e);
      }
    } else {
      if (Nl(e)) throw Error(w(418));
      e.flags = e.flags & -4097 | 2, H = !1, Me = e;
    }
  }
}
function uu(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Me = e;
}
function ea(e) {
  if (e !== Me) return !1;
  if (!H) return uu(e), H = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !wl(e.type, e.memoizedProps)), t && (t = Ce)) {
    if (Nl(e)) throw cd(), Error(w(418));
    for (; t; ) ud(e, t), t = Ct(t.nextSibling);
  }
  if (uu(e), e.tag === 13) {
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
function cd() {
  for (var e = Ce; e; ) e = Ct(e.nextSibling);
}
function Ln() {
  Ce = Me = null, H = !1;
}
function Si(e) {
  We === null ? We = [e] : We.push(e);
}
var Rp = mt.ReactCurrentBatchConfig;
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
        var i = a.refs;
        l === null ? delete i[o] : i[o] = l;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(w(284));
    if (!n._owner) throw Error(w(290, e));
  }
  return e;
}
function ta(e, t) {
  throw e = Object.prototype.toString.call(t), Error(w(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function cu(e) {
  var t = e._init;
  return t(e._payload);
}
function dd(e) {
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
  function i(p, d, g, S) {
    return d === null || d.tag !== 6 ? (d = Oo(g, p.mode, S), d.return = p, d) : (d = a(d, g), d.return = p, d);
  }
  function u(p, d, g, S) {
    var x = g.type;
    return x === cn ? h(p, d, g.props.children, S, g.key) : d !== null && (d.elementType === x || typeof x == "object" && x !== null && x.$$typeof === yt && cu(x) === d.type) ? (S = a(d, g.props), S.ref = Vn(p, d, g), S.return = p, S) : (S = va(g.type, g.key, g.props, null, p.mode, S), S.ref = Vn(p, d, g), S.return = p, S);
  }
  function c(p, d, g, S) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== g.containerInfo || d.stateNode.implementation !== g.implementation ? (d = $o(g, p.mode, S), d.return = p, d) : (d = a(d, g.children || []), d.return = p, d);
  }
  function h(p, d, g, S, x) {
    return d === null || d.tag !== 7 ? (d = Vt(g, p.mode, S, x), d.return = p, d) : (d = a(d, g), d.return = p, d);
  }
  function m(p, d, g) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = Oo("" + d, p.mode, g), d.return = p, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case Ur:
          return g = va(d.type, d.key, d.props, null, p.mode, g), g.ref = Vn(p, null, d), g.return = p, g;
        case un:
          return d = $o(d, p.mode, g), d.return = p, d;
        case yt:
          var S = d._init;
          return m(p, S(d._payload), g);
      }
      if (er(d) || Wn(d)) return d = Vt(d, p.mode, g, null), d.return = p, d;
      ta(p, d);
    }
    return null;
  }
  function f(p, d, g, S) {
    var x = d !== null ? d.key : null;
    if (typeof g == "string" && g !== "" || typeof g == "number") return x !== null ? null : i(p, d, "" + g, S);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Ur:
          return g.key === x ? u(p, d, g, S) : null;
        case un:
          return g.key === x ? c(p, d, g, S) : null;
        case yt:
          return x = g._init, f(
            p,
            d,
            x(g._payload),
            S
          );
      }
      if (er(g) || Wn(g)) return x !== null ? null : h(p, d, g, S, null);
      ta(p, g);
    }
    return null;
  }
  function y(p, d, g, S, x) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return p = p.get(g) || null, i(d, p, "" + S, x);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Ur:
          return p = p.get(S.key === null ? g : S.key) || null, u(d, p, S, x);
        case un:
          return p = p.get(S.key === null ? g : S.key) || null, c(d, p, S, x);
        case yt:
          var C = S._init;
          return y(p, d, g, C(S._payload), x);
      }
      if (er(S) || Wn(S)) return p = p.get(g) || null, h(d, p, S, x, null);
      ta(d, S);
    }
    return null;
  }
  function v(p, d, g, S) {
    for (var x = null, C = null, N = d, M = d = 0, O = null; N !== null && M < g.length; M++) {
      N.index > M ? (O = N, N = null) : O = N.sibling;
      var D = f(p, N, g[M], S);
      if (D === null) {
        N === null && (N = O);
        break;
      }
      e && N && D.alternate === null && t(p, N), d = o(D, d, M), C === null ? x = D : C.sibling = D, C = D, N = O;
    }
    if (M === g.length) return n(p, N), H && Bt(p, M), x;
    if (N === null) {
      for (; M < g.length; M++) N = m(p, g[M], S), N !== null && (d = o(N, d, M), C === null ? x = N : C.sibling = N, C = N);
      return H && Bt(p, M), x;
    }
    for (N = r(p, N); M < g.length; M++) O = y(N, p, M, g[M], S), O !== null && (e && O.alternate !== null && N.delete(O.key === null ? M : O.key), d = o(O, d, M), C === null ? x = O : C.sibling = O, C = O);
    return e && N.forEach(function(ae) {
      return t(p, ae);
    }), H && Bt(p, M), x;
  }
  function _(p, d, g, S) {
    var x = Wn(g);
    if (typeof x != "function") throw Error(w(150));
    if (g = x.call(g), g == null) throw Error(w(151));
    for (var C = x = null, N = d, M = d = 0, O = null, D = g.next(); N !== null && !D.done; M++, D = g.next()) {
      N.index > M ? (O = N, N = null) : O = N.sibling;
      var ae = f(p, N, D.value, S);
      if (ae === null) {
        N === null && (N = O);
        break;
      }
      e && N && ae.alternate === null && t(p, N), d = o(ae, d, M), C === null ? x = ae : C.sibling = ae, C = ae, N = O;
    }
    if (D.done) return n(
      p,
      N
    ), H && Bt(p, M), x;
    if (N === null) {
      for (; !D.done; M++, D = g.next()) D = m(p, D.value, S), D !== null && (d = o(D, d, M), C === null ? x = D : C.sibling = D, C = D);
      return H && Bt(p, M), x;
    }
    for (N = r(p, N); !D.done; M++, D = g.next()) D = y(N, p, M, D.value, S), D !== null && (e && D.alternate !== null && N.delete(D.key === null ? M : D.key), d = o(D, d, M), C === null ? x = D : C.sibling = D, C = D);
    return e && N.forEach(function(Y) {
      return t(p, Y);
    }), H && Bt(p, M), x;
  }
  function P(p, d, g, S) {
    if (typeof g == "object" && g !== null && g.type === cn && g.key === null && (g = g.props.children), typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case Ur:
          e: {
            for (var x = g.key, C = d; C !== null; ) {
              if (C.key === x) {
                if (x = g.type, x === cn) {
                  if (C.tag === 7) {
                    n(p, C.sibling), d = a(C, g.props.children), d.return = p, p = d;
                    break e;
                  }
                } else if (C.elementType === x || typeof x == "object" && x !== null && x.$$typeof === yt && cu(x) === C.type) {
                  n(p, C.sibling), d = a(C, g.props), d.ref = Vn(p, C, g), d.return = p, p = d;
                  break e;
                }
                n(p, C);
                break;
              } else t(p, C);
              C = C.sibling;
            }
            g.type === cn ? (d = Vt(g.props.children, p.mode, S, g.key), d.return = p, p = d) : (S = va(g.type, g.key, g.props, null, p.mode, S), S.ref = Vn(p, d, g), S.return = p, p = S);
          }
          return l(p);
        case un:
          e: {
            for (C = g.key; d !== null; ) {
              if (d.key === C) if (d.tag === 4 && d.stateNode.containerInfo === g.containerInfo && d.stateNode.implementation === g.implementation) {
                n(p, d.sibling), d = a(d, g.children || []), d.return = p, p = d;
                break e;
              } else {
                n(p, d);
                break;
              }
              else t(p, d);
              d = d.sibling;
            }
            d = $o(g, p.mode, S), d.return = p, p = d;
          }
          return l(p);
        case yt:
          return C = g._init, P(p, d, C(g._payload), S);
      }
      if (er(g)) return v(p, d, g, S);
      if (Wn(g)) return _(p, d, g, S);
      ta(p, g);
    }
    return typeof g == "string" && g !== "" || typeof g == "number" ? (g = "" + g, d !== null && d.tag === 6 ? (n(p, d.sibling), d = a(d, g), d.return = p, p = d) : (n(p, d), d = Oo(g, p.mode, S), d.return = p, p = d), l(p)) : n(p, d);
  }
  return P;
}
var Dn = dd(!0), fd = dd(!1), Aa = zt(null), Pa = null, vn = null, _i = null;
function wi() {
  _i = vn = Pa = null;
}
function ki(e) {
  var t = Aa.current;
  B(Aa), e._currentValue = t;
}
function Cl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function Cn(e, t) {
  Pa = e, _i = vn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (_e = !0), e.firstContext = null);
}
function Fe(e) {
  var t = e._currentValue;
  if (_i !== e) if (e = { context: e, memoizedValue: t, next: null }, vn === null) {
    if (Pa === null) throw Error(w(308));
    vn = e, Pa.dependencies = { lanes: 0, firstContext: e };
  } else vn = vn.next = e;
  return t;
}
var Ut = null;
function xi(e) {
  Ut === null ? Ut = [e] : Ut.push(e);
}
function md(e, t, n, r) {
  var a = t.interleaved;
  return a === null ? (n.next = n, xi(t)) : (n.next = a.next, a.next = n), t.interleaved = n, dt(e, r);
}
function dt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var vt = !1;
function Ti(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function pd(e, t) {
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
  return a = r.interleaved, a === null ? (t.next = t, xi(r)) : (t.next = a.next, a.next = t), r.interleaved = t, dt(e, n);
}
function fa(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ui(e, n);
  }
}
function du(e, t) {
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
function Ia(e, t, n, r) {
  var a = e.updateQueue;
  vt = !1;
  var o = a.firstBaseUpdate, l = a.lastBaseUpdate, i = a.shared.pending;
  if (i !== null) {
    a.shared.pending = null;
    var u = i, c = u.next;
    u.next = null, l === null ? o = c : l.next = c, l = u;
    var h = e.alternate;
    h !== null && (h = h.updateQueue, i = h.lastBaseUpdate, i !== l && (i === null ? h.firstBaseUpdate = c : i.next = c, h.lastBaseUpdate = u));
  }
  if (o !== null) {
    var m = a.baseState;
    l = 0, h = c = u = null, i = o;
    do {
      var f = i.lane, y = i.eventTime;
      if ((r & f) === f) {
        h !== null && (h = h.next = {
          eventTime: y,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var v = e, _ = i;
          switch (f = t, y = n, _.tag) {
            case 1:
              if (v = _.payload, typeof v == "function") {
                m = v.call(y, m, f);
                break e;
              }
              m = v;
              break e;
            case 3:
              v.flags = v.flags & -65537 | 128;
            case 0:
              if (v = _.payload, f = typeof v == "function" ? v.call(y, m, f) : v, f == null) break e;
              m = G({}, m, f);
              break e;
            case 2:
              vt = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, f = a.effects, f === null ? a.effects = [i] : f.push(i));
      } else y = { eventTime: y, lane: f, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, h === null ? (c = h = y, u = m) : h = h.next = y, l |= f;
      if (i = i.next, i === null) {
        if (i = a.shared.pending, i === null) break;
        f = i, i = f.next, f.next = null, a.lastBaseUpdate = f, a.shared.pending = null;
      }
    } while (!0);
    if (h === null && (u = m), a.baseState = u, a.firstBaseUpdate = c, a.lastBaseUpdate = h, t = a.shared.interleaved, t !== null) {
      a = t;
      do
        l |= a.lane, a = a.next;
      while (a !== t);
    } else o === null && (a.shared.lanes = 0);
    qt |= l, e.lanes = l, e.memoizedState = m;
  }
}
function fu(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], a = r.callback;
    if (a !== null) {
      if (r.callback = null, r = n, typeof a != "function") throw Error(w(191, a));
      a.call(r);
    }
  }
}
var zr = {}, tt = zt(zr), br = zt(zr), Cr = zt(zr);
function Kt(e) {
  if (e === zr) throw Error(w(174));
  return e;
}
function Ni(e, t) {
  switch ($(Cr, t), $(br, e), $(tt, zr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : il(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = il(t, e);
  }
  B(tt), $(tt, t);
}
function An() {
  B(tt), B(br), B(Cr);
}
function hd(e) {
  Kt(Cr.current);
  var t = Kt(tt.current), n = il(t, e.type);
  t !== n && ($(br, e), $(tt, n));
}
function bi(e) {
  br.current === e && (B(tt), B(br));
}
var U = zt(0);
function za(e) {
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
var Do = [];
function Ci() {
  for (var e = 0; e < Do.length; e++) Do[e]._workInProgressVersionPrimary = null;
  Do.length = 0;
}
var ma = mt.ReactCurrentDispatcher, Ao = mt.ReactCurrentBatchConfig, Xt = 0, K = null, ee = null, ne = null, Fa = !1, ur = !1, Mr = 0, Bp = 0;
function se() {
  throw Error(w(321));
}
function Mi(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Ke(e[n], t[n])) return !1;
  return !0;
}
function ji(e, t, n, r, a, o) {
  if (Xt = o, K = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, ma.current = e === null || e.memoizedState === null ? Kp : Gp, e = n(r, a), ur) {
    o = 0;
    do {
      if (ur = !1, Mr = 0, 25 <= o) throw Error(w(301));
      o += 1, ne = ee = null, t.updateQueue = null, ma.current = Vp, e = n(r, a);
    } while (ur);
  }
  if (ma.current = Oa, t = ee !== null && ee.next !== null, Xt = 0, ne = ee = K = null, Fa = !1, t) throw Error(w(300));
  return e;
}
function Ei() {
  var e = Mr !== 0;
  return Mr = 0, e;
}
function Ze() {
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
function jr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Po(e) {
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
    var i = l = null, u = null, c = o;
    do {
      var h = c.lane;
      if ((Xt & h) === h) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var m = {
          lane: h,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (i = u = m, l = r) : u = u.next = m, K.lanes |= h, qt |= h;
      }
      c = c.next;
    } while (c !== null && c !== o);
    u === null ? l = r : u.next = i, Ke(r, t.memoizedState) || (_e = !0), t.memoizedState = r, t.baseState = l, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    a = e;
    do
      o = a.lane, K.lanes |= o, qt |= o, a = a.next;
    while (a !== e);
  } else a === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Io(e) {
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
    Ke(o, t.memoizedState) || (_e = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function gd() {
}
function yd(e, t) {
  var n = K, r = Oe(), a = t(), o = !Ke(r.memoizedState, a);
  if (o && (r.memoizedState = a, _e = !0), r = r.queue, Li(_d.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ne !== null && ne.memoizedState.tag & 1) {
    if (n.flags |= 2048, Er(9, Sd.bind(null, n, r, a, t), void 0, null), re === null) throw Error(w(349));
    Xt & 30 || vd(n, t, a);
  }
  return a;
}
function vd(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Sd(e, t, n, r) {
  t.value = n, t.getSnapshot = r, wd(t) && kd(e);
}
function _d(e, t, n) {
  return n(function() {
    wd(t) && kd(e);
  });
}
function wd(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Ke(e, n);
  } catch {
    return !0;
  }
}
function kd(e) {
  var t = dt(e, 1);
  t !== null && Ue(t, e, 1, -1);
}
function mu(e) {
  var t = Ze();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: jr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Up.bind(null, K, e), [t.memoizedState, e];
}
function Er(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = K.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, K.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function xd() {
  return Oe().memoizedState;
}
function pa(e, t, n, r) {
  var a = Ze();
  K.flags |= e, a.memoizedState = Er(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ja(e, t, n, r) {
  var a = Oe();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ee !== null) {
    var l = ee.memoizedState;
    if (o = l.destroy, r !== null && Mi(r, l.deps)) {
      a.memoizedState = Er(t, n, o, r);
      return;
    }
  }
  K.flags |= e, a.memoizedState = Er(1 | t, n, o, r);
}
function pu(e, t) {
  return pa(8390656, 8, e, t);
}
function Li(e, t) {
  return Ja(2048, 8, e, t);
}
function Td(e, t) {
  return Ja(4, 2, e, t);
}
function Nd(e, t) {
  return Ja(4, 4, e, t);
}
function bd(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Cd(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ja(4, 4, bd.bind(null, t, e), n);
}
function Di() {
}
function Md(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Mi(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function jd(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Mi(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Ed(e, t, n) {
  return Xt & 21 ? (Ke(n, t) || (n = Ic(), K.lanes |= n, qt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, _e = !0), e.memoizedState = n);
}
function Wp(e, t) {
  var n = F;
  F = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = Ao.transition;
  Ao.transition = {};
  try {
    e(!1), t();
  } finally {
    F = n, Ao.transition = r;
  }
}
function Ld() {
  return Oe().memoizedState;
}
function Hp(e, t, n) {
  var r = Et(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, Dd(e)) Ad(t, n);
  else if (n = md(e, t, n, r), n !== null) {
    var a = he();
    Ue(n, e, r, a), Pd(n, t, r);
  }
}
function Up(e, t, n) {
  var r = Et(e), a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Dd(e)) Ad(t, a);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var l = t.lastRenderedState, i = o(l, n);
      if (a.hasEagerState = !0, a.eagerState = i, Ke(i, l)) {
        var u = t.interleaved;
        u === null ? (a.next = a, xi(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
        return;
      }
    } catch {
    } finally {
    }
    n = md(e, t, a, r), n !== null && (a = he(), Ue(n, e, r, a), Pd(n, t, r));
  }
}
function Dd(e) {
  var t = e.alternate;
  return e === K || t !== null && t === K;
}
function Ad(e, t) {
  ur = Fa = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Pd(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ui(e, n);
  }
}
var Oa = { readContext: Fe, useCallback: se, useContext: se, useEffect: se, useImperativeHandle: se, useInsertionEffect: se, useLayoutEffect: se, useMemo: se, useReducer: se, useRef: se, useState: se, useDebugValue: se, useDeferredValue: se, useTransition: se, useMutableSource: se, useSyncExternalStore: se, useId: se, unstable_isNewReconciler: !1 }, Kp = { readContext: Fe, useCallback: function(e, t) {
  return Ze().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Fe, useEffect: pu, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, pa(
    4194308,
    4,
    bd.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return pa(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return pa(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ze();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ze();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Hp.bind(null, K, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ze();
  return e = { current: e }, t.memoizedState = e;
}, useState: mu, useDebugValue: Di, useDeferredValue: function(e) {
  return Ze().memoizedState = e;
}, useTransition: function() {
  var e = mu(!1), t = e[0];
  return e = Wp.bind(null, e[1]), Ze().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = K, a = Ze();
  if (H) {
    if (n === void 0) throw Error(w(407));
    n = n();
  } else {
    if (n = t(), re === null) throw Error(w(349));
    Xt & 30 || vd(r, t, n);
  }
  a.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return a.queue = o, pu(_d.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, Er(9, Sd.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = Ze(), t = re.identifierPrefix;
  if (H) {
    var n = it, r = lt;
    n = (r & ~(1 << 32 - He(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = Mr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Bp++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Gp = {
  readContext: Fe,
  useCallback: Md,
  useContext: Fe,
  useEffect: Li,
  useImperativeHandle: Cd,
  useInsertionEffect: Td,
  useLayoutEffect: Nd,
  useMemo: jd,
  useReducer: Po,
  useRef: xd,
  useState: function() {
    return Po(jr);
  },
  useDebugValue: Di,
  useDeferredValue: function(e) {
    var t = Oe();
    return Ed(t, ee.memoizedState, e);
  },
  useTransition: function() {
    var e = Po(jr)[0], t = Oe().memoizedState;
    return [e, t];
  },
  useMutableSource: gd,
  useSyncExternalStore: yd,
  useId: Ld,
  unstable_isNewReconciler: !1
}, Vp = { readContext: Fe, useCallback: Md, useContext: Fe, useEffect: Li, useImperativeHandle: Cd, useInsertionEffect: Td, useLayoutEffect: Nd, useMemo: jd, useReducer: Io, useRef: xd, useState: function() {
  return Io(jr);
}, useDebugValue: Di, useDeferredValue: function(e) {
  var t = Oe();
  return ee === null ? t.memoizedState = e : Ed(t, ee.memoizedState, e);
}, useTransition: function() {
  var e = Io(jr)[0], t = Oe().memoizedState;
  return [e, t];
}, useMutableSource: gd, useSyncExternalStore: yd, useId: Ld, unstable_isNewReconciler: !1 };
function Re(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Ml(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var eo = { isMounted: function(e) {
  return (e = e._reactInternals) ? tn(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), a = Et(e), o = st(r, a);
  o.payload = t, n != null && (o.callback = n), t = Mt(e, o, a), t !== null && (Ue(t, e, a, r), fa(t, e, a));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = he(), a = Et(e), o = st(r, a);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Mt(e, o, a), t !== null && (Ue(t, e, a, r), fa(t, e, a));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = he(), r = Et(e), a = st(n, r);
  a.tag = 2, t != null && (a.callback = t), t = Mt(e, a, r), t !== null && (Ue(t, e, r, n), fa(t, e, r));
} };
function hu(e, t, n, r, a, o, l) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, l) : t.prototype && t.prototype.isPureReactComponent ? !kr(n, r) || !kr(a, o) : !0;
}
function Id(e, t, n) {
  var r = !1, a = Pt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Fe(o) : (a = ke(t) ? Yt : me.current, r = t.contextTypes, o = (r = r != null) ? En(e, a) : Pt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = eo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function gu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && eo.enqueueReplaceState(t, t.state, null);
}
function jl(e, t, n, r) {
  var a = e.stateNode;
  a.props = n, a.state = e.memoizedState, a.refs = {}, Ti(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? a.context = Fe(o) : (o = ke(t) ? Yt : me.current, a.context = En(e, o)), a.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Ml(e, t, o, n), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && eo.enqueueReplaceState(a, a.state, null), Ia(e, n, a, r), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
}
function Pn(e, t) {
  try {
    var n = "", r = t;
    do
      n += wm(r), r = r.return;
    while (r);
    var a = n;
  } catch (o) {
    a = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: a, digest: null };
}
function zo(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function El(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Qp = typeof WeakMap == "function" ? WeakMap : Map;
function zd(e, t, n) {
  n = st(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Ra || (Ra = !0, Rl = r), El(e, t);
  }, n;
}
function Fd(e, t, n) {
  n = st(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var a = t.value;
    n.payload = function() {
      return r(a);
    }, n.callback = function() {
      El(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    El(e, t), typeof r != "function" && (jt === null ? jt = /* @__PURE__ */ new Set([this]) : jt.add(this));
    var l = t.stack;
    this.componentDidCatch(t.value, { componentStack: l !== null ? l : "" });
  }), n;
}
function yu(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Qp();
    var a = /* @__PURE__ */ new Set();
    r.set(t, a);
  } else a = r.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), r.set(t, a));
  a.has(n) || (a.add(n), e = sh.bind(null, e, t, n), t.then(e, e));
}
function vu(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Su(e, t, n, r, a) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = st(-1, 1), t.tag = 2, Mt(n, t, 1))), n.lanes |= 1), e);
}
var Yp = mt.ReactCurrentOwner, _e = !1;
function pe(e, t, n, r) {
  t.child = e === null ? fd(t, null, n, r) : Dn(t, e.child, n, r);
}
function _u(e, t, n, r, a) {
  n = n.render;
  var o = t.ref;
  return Cn(t, a), r = ji(e, t, n, r, o, a), n = Ei(), e !== null && !_e ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, ft(e, t, a)) : (H && n && yi(t), t.flags |= 1, pe(e, t, r, a), t.child);
}
function wu(e, t, n, r, a) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ri(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Od(e, t, o, r, a)) : (e = va(n.type, null, r, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & a)) {
    var l = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : kr, n(l, r) && e.ref === t.ref) return ft(e, t, a);
  }
  return t.flags |= 1, e = Lt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Od(e, t, n, r, a) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (kr(o, r) && e.ref === t.ref) if (_e = !1, t.pendingProps = r = o, (e.lanes & a) !== 0) e.flags & 131072 && (_e = !0);
    else return t.lanes = e.lanes, ft(e, t, a);
  }
  return Ll(e, t, n, r, a);
}
function $d(e, t, n) {
  var r = t.pendingProps, a = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, $(_n, Ne), Ne |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, $(_n, Ne), Ne |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, $(_n, Ne), Ne |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, $(_n, Ne), Ne |= r;
  return pe(e, t, a, n), t.child;
}
function Rd(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Ll(e, t, n, r, a) {
  var o = ke(n) ? Yt : me.current;
  return o = En(t, o), Cn(t, a), n = ji(e, t, n, r, o, a), r = Ei(), e !== null && !_e ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, ft(e, t, a)) : (H && r && yi(t), t.flags |= 1, pe(e, t, n, a), t.child);
}
function ku(e, t, n, r, a) {
  if (ke(n)) {
    var o = !0;
    Ea(t);
  } else o = !1;
  if (Cn(t, a), t.stateNode === null) ha(e, t), Id(t, n, r), jl(t, n, r, a), r = !0;
  else if (e === null) {
    var l = t.stateNode, i = t.memoizedProps;
    l.props = i;
    var u = l.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Fe(c) : (c = ke(n) ? Yt : me.current, c = En(t, c));
    var h = n.getDerivedStateFromProps, m = typeof h == "function" || typeof l.getSnapshotBeforeUpdate == "function";
    m || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (i !== r || u !== c) && gu(t, l, r, c), vt = !1;
    var f = t.memoizedState;
    l.state = f, Ia(t, r, l, a), u = t.memoizedState, i !== r || f !== u || we.current || vt ? (typeof h == "function" && (Ml(t, n, h, r), u = t.memoizedState), (i = vt || hu(t, n, i, r, f, u, c)) ? (m || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount()), typeof l.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), l.props = r, l.state = u, l.context = c, r = i) : (typeof l.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    l = t.stateNode, pd(e, t), i = t.memoizedProps, c = t.type === t.elementType ? i : Re(t.type, i), l.props = c, m = t.pendingProps, f = l.context, u = n.contextType, typeof u == "object" && u !== null ? u = Fe(u) : (u = ke(n) ? Yt : me.current, u = En(t, u));
    var y = n.getDerivedStateFromProps;
    (h = typeof y == "function" || typeof l.getSnapshotBeforeUpdate == "function") || typeof l.UNSAFE_componentWillReceiveProps != "function" && typeof l.componentWillReceiveProps != "function" || (i !== m || f !== u) && gu(t, l, r, u), vt = !1, f = t.memoizedState, l.state = f, Ia(t, r, l, a);
    var v = t.memoizedState;
    i !== m || f !== v || we.current || vt ? (typeof y == "function" && (Ml(t, n, y, r), v = t.memoizedState), (c = vt || hu(t, n, c, r, f, v, u) || !1) ? (h || typeof l.UNSAFE_componentWillUpdate != "function" && typeof l.componentWillUpdate != "function" || (typeof l.componentWillUpdate == "function" && l.componentWillUpdate(r, v, u), typeof l.UNSAFE_componentWillUpdate == "function" && l.UNSAFE_componentWillUpdate(r, v, u)), typeof l.componentDidUpdate == "function" && (t.flags |= 4), typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof l.componentDidUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), l.props = r, l.state = v, l.context = u, r = c) : (typeof l.componentDidUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof l.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Dl(e, t, n, r, o, a);
}
function Dl(e, t, n, r, a, o) {
  Rd(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return a && iu(t, n, !1), ft(e, t, o);
  r = t.stateNode, Yp.current = t;
  var i = l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && l ? (t.child = Dn(t, e.child, null, o), t.child = Dn(t, null, i, o)) : pe(e, t, i, o), t.memoizedState = r.state, a && iu(t, n, !0), t.child;
}
function Bd(e) {
  var t = e.stateNode;
  t.pendingContext ? lu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && lu(e, t.context, !1), Ni(e, t.containerInfo);
}
function xu(e, t, n, r, a) {
  return Ln(), Si(a), t.flags |= 256, pe(e, t, n, r), t.child;
}
var Al = { dehydrated: null, treeContext: null, retryLane: 0 };
function Pl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Wd(e, t, n) {
  var r = t.pendingProps, a = U.current, o = !1, l = (t.flags & 128) !== 0, i;
  if ((i = l) || (i = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), i ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), $(U, a & 1), e === null)
    return bl(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (l = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, l = { mode: "hidden", children: l }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = l) : o = ro(l, r, 0, null), e = Vt(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = Pl(n), t.memoizedState = Al, e) : Ai(t, l));
  if (a = e.memoizedState, a !== null && (i = a.dehydrated, i !== null)) return Zp(e, t, l, r, i, a, n);
  if (o) {
    o = r.fallback, l = t.mode, a = e.child, i = a.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(l & 1) && t.child !== a ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Lt(a, u), r.subtreeFlags = a.subtreeFlags & 14680064), i !== null ? o = Lt(i, o) : (o = Vt(o, l, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, l = e.child.memoizedState, l = l === null ? Pl(n) : { baseLanes: l.baseLanes | n, cachePool: null, transitions: l.transitions }, o.memoizedState = l, o.childLanes = e.childLanes & ~n, t.memoizedState = Al, r;
  }
  return o = e.child, e = o.sibling, r = Lt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function Ai(e, t) {
  return t = ro({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function na(e, t, n, r) {
  return r !== null && Si(r), Dn(t, e.child, null, n), e = Ai(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Zp(e, t, n, r, a, o, l) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = zo(Error(w(422))), na(e, t, l, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, a = t.mode, r = ro({ mode: "visible", children: r.children }, a, 0, null), o = Vt(o, a, l, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && Dn(t, e.child, null, l), t.child.memoizedState = Pl(l), t.memoizedState = Al, o);
  if (!(t.mode & 1)) return na(e, t, l, null);
  if (a.data === "$!") {
    if (r = a.nextSibling && a.nextSibling.dataset, r) var i = r.dgst;
    return r = i, o = Error(w(419)), r = zo(o, r, void 0), na(e, t, l, r);
  }
  if (i = (l & e.childLanes) !== 0, _e || i) {
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
      a = a & (r.suspendedLanes | l) ? 0 : a, a !== 0 && a !== o.retryLane && (o.retryLane = a, dt(e, a), Ue(r, e, a, -1));
    }
    return $i(), r = zo(Error(w(421))), na(e, t, l, r);
  }
  return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = uh.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, Ce = Ct(a.nextSibling), Me = t, H = !0, We = null, e !== null && (Ae[Pe++] = lt, Ae[Pe++] = it, Ae[Pe++] = Zt, lt = e.id, it = e.overflow, Zt = t), t = Ai(t, r.children), t.flags |= 4096, t);
}
function Tu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Cl(e.return, t, n);
}
function Fo(e, t, n, r, a) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = a);
}
function Hd(e, t, n) {
  var r = t.pendingProps, a = r.revealOrder, o = r.tail;
  if (pe(e, t, r.children, n), r = U.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Tu(e, n, t);
      else if (e.tag === 19) Tu(e, n, t);
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
      for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && za(e) === null && (a = n), n = n.sibling;
      n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Fo(t, !1, a, n, o);
      break;
    case "backwards":
      for (n = null, a = t.child, t.child = null; a !== null; ) {
        if (e = a.alternate, e !== null && za(e) === null) {
          t.child = a;
          break;
        }
        e = a.sibling, a.sibling = n, n = a, a = e;
      }
      Fo(t, !0, n, null, o);
      break;
    case "together":
      Fo(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ha(e, t) {
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
function Xp(e, t, n) {
  switch (t.tag) {
    case 3:
      Bd(t), Ln();
      break;
    case 5:
      hd(t);
      break;
    case 1:
      ke(t.type) && Ea(t);
      break;
    case 4:
      Ni(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, a = t.memoizedProps.value;
      $(Aa, r._currentValue), r._currentValue = a;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? ($(U, U.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Wd(e, t, n) : ($(U, U.current & 1), e = ft(e, t, n), e !== null ? e.sibling : null);
      $(U, U.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Hd(e, t, n);
        t.flags |= 128;
      }
      if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), $(U, U.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, $d(e, t, n);
  }
  return ft(e, t, n);
}
var Ud, Il, Kd, Gd;
Ud = function(e, t) {
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
Il = function() {
};
Kd = function(e, t, n, r) {
  var a = e.memoizedProps;
  if (a !== r) {
    e = t.stateNode, Kt(tt.current);
    var o = null;
    switch (n) {
      case "input":
        a = rl(e, a), r = rl(e, r), o = [];
        break;
      case "select":
        a = G({}, a, { value: void 0 }), r = G({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        a = ll(e, a), r = ll(e, r), o = [];
        break;
      default:
        typeof a.onClick != "function" && typeof r.onClick == "function" && (e.onclick = Ma);
    }
    sl(n, r);
    var l;
    n = null;
    for (c in a) if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && a[c] != null) if (c === "style") {
      var i = a[c];
      for (l in i) i.hasOwnProperty(l) && (n || (n = {}), n[l] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (hr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (i = a != null ? a[c] : void 0, r.hasOwnProperty(c) && u !== i && (u != null || i != null)) if (c === "style") if (i) {
        for (l in i) !i.hasOwnProperty(l) || u && u.hasOwnProperty(l) || (n || (n = {}), n[l] = "");
        for (l in u) u.hasOwnProperty(l) && i[l] !== u[l] && (n || (n = {}), n[l] = u[l]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, i = i ? i.__html : void 0, u != null && i !== u && (o = o || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (o = o || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (hr.hasOwnProperty(c) ? (u != null && c === "onScroll" && R("scroll", e), o || i === u || (o = [])) : (o = o || []).push(c, u));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
Gd = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Qn(e, t) {
  if (!H) switch (e.tailMode) {
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
function ue(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 14680064, r |= a.flags & 14680064, a.return = e, a = a.sibling;
  else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function qp(e, t, n) {
  var r = t.pendingProps;
  switch (vi(t), t.tag) {
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
      return ue(t), null;
    case 1:
      return ke(t.type) && ja(), ue(t), null;
    case 3:
      return r = t.stateNode, An(), B(we), B(me), Ci(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (ea(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, We !== null && (Hl(We), We = null))), Il(e, t), ue(t), null;
    case 5:
      bi(t);
      var a = Kt(Cr.current);
      if (n = t.type, e !== null && t.stateNode != null) Kd(e, t, n, r, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(w(166));
          return ue(t), null;
        }
        if (e = Kt(tt.current), ea(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[qe] = t, r[Nr] = o, e = (t.mode & 1) !== 0, n) {
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
              for (a = 0; a < nr.length; a++) R(nr[a], r);
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
              As(r, o), R("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, R("invalid", r);
              break;
            case "textarea":
              Is(r, o), R("invalid", r);
          }
          sl(n, o), a = null;
          for (var l in o) if (o.hasOwnProperty(l)) {
            var i = o[l];
            l === "children" ? typeof i == "string" ? r.textContent !== i && (o.suppressHydrationWarning !== !0 && Jr(r.textContent, i, e), a = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (o.suppressHydrationWarning !== !0 && Jr(
              r.textContent,
              i,
              e
            ), a = ["children", "" + i]) : hr.hasOwnProperty(l) && i != null && l === "onScroll" && R("scroll", r);
          }
          switch (n) {
            case "input":
              Kr(r), Ps(r, o, !0);
              break;
            case "textarea":
              Kr(r), zs(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Ma);
          }
          r = a, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          l = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = _c(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = l.createElement(n, { is: r.is }) : (e = l.createElement(n), n === "select" && (l = e, r.multiple ? l.multiple = !0 : r.size && (l.size = r.size))) : e = l.createElementNS(e, n), e[qe] = t, e[Nr] = r, Ud(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (l = ul(n, r), n) {
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
                for (a = 0; a < nr.length; a++) R(nr[a], e);
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
                As(e, r), a = rl(e, r), R("invalid", e);
                break;
              case "option":
                a = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, a = G({}, r, { value: void 0 }), R("invalid", e);
                break;
              case "textarea":
                Is(e, r), a = ll(e, r), R("invalid", e);
                break;
              default:
                a = r;
            }
            sl(n, a), i = a;
            for (o in i) if (i.hasOwnProperty(o)) {
              var u = i[o];
              o === "style" ? xc(e, u) : o === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && wc(e, u)) : o === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && gr(e, u) : typeof u == "number" && gr(e, "" + u) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (hr.hasOwnProperty(o) ? u != null && o === "onScroll" && R("scroll", e) : u != null && ri(e, o, u, l));
            }
            switch (n) {
              case "input":
                Kr(e), Ps(e, r, !1);
                break;
              case "textarea":
                Kr(e), zs(e);
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
                typeof a.onClick == "function" && (e.onclick = Ma);
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
      return ue(t), null;
    case 6:
      if (e && t.stateNode != null) Gd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(w(166));
        if (n = Kt(Cr.current), Kt(tt.current), ea(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[qe] = t, (o = r.nodeValue !== n) && (e = Me, e !== null)) switch (e.tag) {
            case 3:
              Jr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Jr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[qe] = t, t.stateNode = r;
      }
      return ue(t), null;
    case 13:
      if (B(U), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (H && Ce !== null && t.mode & 1 && !(t.flags & 128)) cd(), Ln(), t.flags |= 98560, o = !1;
        else if (o = ea(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(w(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(w(317));
            o[qe] = t;
          } else Ln(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ue(t), o = !1;
        } else We !== null && (Hl(We), We = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? te === 0 && (te = 3) : $i())), t.updateQueue !== null && (t.flags |= 4), ue(t), null);
    case 4:
      return An(), Il(e, t), e === null && xr(t.stateNode.containerInfo), ue(t), null;
    case 10:
      return ki(t.type._context), ue(t), null;
    case 17:
      return ke(t.type) && ja(), ue(t), null;
    case 19:
      if (B(U), o = t.memoizedState, o === null) return ue(t), null;
      if (r = (t.flags & 128) !== 0, l = o.rendering, l === null) if (r) Qn(o, !1);
      else {
        if (te !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (l = za(e), l !== null) {
            for (t.flags |= 128, Qn(o, !1), r = l.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, l = o.alternate, l === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = l.childLanes, o.lanes = l.lanes, o.child = l.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = l.memoizedProps, o.memoizedState = l.memoizedState, o.updateQueue = l.updateQueue, o.type = l.type, e = l.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return $(U, U.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && q() > In && (t.flags |= 128, r = !0, Qn(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = za(l), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Qn(o, !0), o.tail === null && o.tailMode === "hidden" && !l.alternate && !H) return ue(t), null;
        } else 2 * q() - o.renderingStartTime > In && n !== 1073741824 && (t.flags |= 128, r = !0, Qn(o, !1), t.lanes = 4194304);
        o.isBackwards ? (l.sibling = t.child, t.child = l) : (n = o.last, n !== null ? n.sibling = l : t.child = l, o.last = l);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = q(), t.sibling = null, n = U.current, $(U, r ? n & 1 | 2 : n & 1), t) : (ue(t), null);
    case 22:
    case 23:
      return Oi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ne & 1073741824 && (ue(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ue(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(w(156, t.tag));
}
function Jp(e, t) {
  switch (vi(t), t.tag) {
    case 1:
      return ke(t.type) && ja(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return An(), B(we), B(me), Ci(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return bi(t), null;
    case 13:
      if (B(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(w(340));
        Ln();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return B(U), null;
    case 4:
      return An(), null;
    case 10:
      return ki(t.type._context), null;
    case 22:
    case 23:
      return Oi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var ra = !1, ce = !1, eh = typeof WeakSet == "function" ? WeakSet : Set, b = null;
function Sn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Q(e, t, r);
  }
  else n.current = null;
}
function zl(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var Nu = !1;
function th(e, t) {
  if (Sl = Na, e = Xc(), gi(e)) {
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
        var l = 0, i = -1, u = -1, c = 0, h = 0, m = e, f = null;
        t: for (; ; ) {
          for (var y; m !== n || a !== 0 && m.nodeType !== 3 || (i = l + a), m !== o || r !== 0 && m.nodeType !== 3 || (u = l + r), m.nodeType === 3 && (l += m.nodeValue.length), (y = m.firstChild) !== null; )
            f = m, m = y;
          for (; ; ) {
            if (m === e) break t;
            if (f === n && ++c === a && (i = l), f === o && ++h === r && (u = l), (y = m.nextSibling) !== null) break;
            m = f, f = m.parentNode;
          }
          m = y;
        }
        n = i === -1 || u === -1 ? null : { start: i, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (_l = { focusedElem: e, selectionRange: n }, Na = !1, b = t; b !== null; ) if (t = b, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, b = e;
  else for (; b !== null; ) {
    t = b;
    try {
      var v = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (v !== null) {
            var _ = v.memoizedProps, P = v.memoizedState, p = t.stateNode, d = p.getSnapshotBeforeUpdate(t.elementType === t.type ? _ : Re(t.type, _), P);
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
    } catch (S) {
      Q(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, b = e;
      break;
    }
    b = t.return;
  }
  return v = Nu, Nu = !1, v;
}
function cr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var a = r = r.next;
    do {
      if ((a.tag & e) === e) {
        var o = a.destroy;
        a.destroy = void 0, o !== void 0 && zl(t, n, o);
      }
      a = a.next;
    } while (a !== r);
  }
}
function to(e, t) {
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
function Fl(e) {
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
function Vd(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Vd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[qe], delete t[Nr], delete t[xl], delete t[Fp], delete t[Op])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Qd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function bu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Qd(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ol(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Ma));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ol(e, t, n), e = e.sibling; e !== null; ) Ol(e, t, n), e = e.sibling;
}
function $l(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for ($l(e, t, n), e = e.sibling; e !== null; ) $l(e, t, n), e = e.sibling;
}
var oe = null, Be = !1;
function gt(e, t, n) {
  for (n = n.child; n !== null; ) Yd(e, t, n), n = n.sibling;
}
function Yd(e, t, n) {
  if (et && typeof et.onCommitFiberUnmount == "function") try {
    et.onCommitFiberUnmount(Va, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ce || Sn(n, t);
    case 6:
      var r = oe, a = Be;
      oe = null, gt(e, t, n), oe = r, Be = a, oe !== null && (Be ? (e = oe, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : oe.removeChild(n.stateNode));
      break;
    case 18:
      oe !== null && (Be ? (e = oe, n = n.stateNode, e.nodeType === 8 ? Eo(e.parentNode, n) : e.nodeType === 1 && Eo(e, n), _r(e)) : Eo(oe, n.stateNode));
      break;
    case 4:
      r = oe, a = Be, oe = n.stateNode.containerInfo, Be = !0, gt(e, t, n), oe = r, Be = a;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ce && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        a = r = r.next;
        do {
          var o = a, l = o.destroy;
          o = o.tag, l !== void 0 && (o & 2 || o & 4) && zl(n, t, l), a = a.next;
        } while (a !== r);
      }
      gt(e, t, n);
      break;
    case 1:
      if (!ce && (Sn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        Q(n, t, i);
      }
      gt(e, t, n);
      break;
    case 21:
      gt(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ce = (r = ce) || n.memoizedState !== null, gt(e, t, n), ce = r) : gt(e, t, n);
      break;
    default:
      gt(e, t, n);
  }
}
function Cu(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new eh()), t.forEach(function(r) {
      var a = ch.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(a, a));
    });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var a = n[r];
    try {
      var o = e, l = t, i = l;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            oe = i.stateNode, Be = !1;
            break e;
          case 3:
            oe = i.stateNode.containerInfo, Be = !0;
            break e;
          case 4:
            oe = i.stateNode.containerInfo, Be = !0;
            break e;
        }
        i = i.return;
      }
      if (oe === null) throw Error(w(160));
      Yd(o, l, a), oe = null, Be = !1;
      var u = a.alternate;
      u !== null && (u.return = null), a.return = null;
    } catch (c) {
      Q(a, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Zd(t, e), t = t.sibling;
}
function Zd(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ($e(t, e), Qe(e), r & 4) {
        try {
          cr(3, e, e.return), to(3, e);
        } catch (_) {
          Q(e, e.return, _);
        }
        try {
          cr(5, e, e.return);
        } catch (_) {
          Q(e, e.return, _);
        }
      }
      break;
    case 1:
      $e(t, e), Qe(e), r & 512 && n !== null && Sn(n, n.return);
      break;
    case 5:
      if ($e(t, e), Qe(e), r & 512 && n !== null && Sn(n, n.return), e.flags & 32) {
        var a = e.stateNode;
        try {
          gr(a, "");
        } catch (_) {
          Q(e, e.return, _);
        }
      }
      if (r & 4 && (a = e.stateNode, a != null)) {
        var o = e.memoizedProps, l = n !== null ? n.memoizedProps : o, i = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          i === "input" && o.type === "radio" && o.name != null && vc(a, o), ul(i, l);
          var c = ul(i, o);
          for (l = 0; l < u.length; l += 2) {
            var h = u[l], m = u[l + 1];
            h === "style" ? xc(a, m) : h === "dangerouslySetInnerHTML" ? wc(a, m) : h === "children" ? gr(a, m) : ri(a, h, m, c);
          }
          switch (i) {
            case "input":
              al(a, o);
              break;
            case "textarea":
              Sc(a, o);
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
          a[Nr] = o;
        } catch (_) {
          Q(e, e.return, _);
        }
      }
      break;
    case 6:
      if ($e(t, e), Qe(e), r & 4) {
        if (e.stateNode === null) throw Error(w(162));
        a = e.stateNode, o = e.memoizedProps;
        try {
          a.nodeValue = o;
        } catch (_) {
          Q(e, e.return, _);
        }
      }
      break;
    case 3:
      if ($e(t, e), Qe(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        _r(t.containerInfo);
      } catch (_) {
        Q(e, e.return, _);
      }
      break;
    case 4:
      $e(t, e), Qe(e);
      break;
    case 13:
      $e(t, e), Qe(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || (zi = q())), r & 4 && Cu(e);
      break;
    case 22:
      if (h = n !== null && n.memoizedState !== null, e.mode & 1 ? (ce = (c = ce) || h, $e(t, e), ce = c) : $e(t, e), Qe(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !h && e.mode & 1) for (b = e, h = e.child; h !== null; ) {
          for (m = b = h; b !== null; ) {
            switch (f = b, y = f.child, f.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                cr(4, f, f.return);
                break;
              case 1:
                Sn(f, f.return);
                var v = f.stateNode;
                if (typeof v.componentWillUnmount == "function") {
                  r = f, n = f.return;
                  try {
                    t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount();
                  } catch (_) {
                    Q(r, n, _);
                  }
                }
                break;
              case 5:
                Sn(f, f.return);
                break;
              case 22:
                if (f.memoizedState !== null) {
                  ju(m);
                  continue;
                }
            }
            y !== null ? (y.return = f, b = y) : ju(m);
          }
          h = h.sibling;
        }
        e: for (h = null, m = e; ; ) {
          if (m.tag === 5) {
            if (h === null) {
              h = m;
              try {
                a = m.stateNode, c ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (i = m.stateNode, u = m.memoizedProps.style, l = u != null && u.hasOwnProperty("display") ? u.display : null, i.style.display = kc("display", l));
              } catch (_) {
                Q(e, e.return, _);
              }
            }
          } else if (m.tag === 6) {
            if (h === null) try {
              m.stateNode.nodeValue = c ? "" : m.memoizedProps;
            } catch (_) {
              Q(e, e.return, _);
            }
          } else if ((m.tag !== 22 && m.tag !== 23 || m.memoizedState === null || m === e) && m.child !== null) {
            m.child.return = m, m = m.child;
            continue;
          }
          if (m === e) break e;
          for (; m.sibling === null; ) {
            if (m.return === null || m.return === e) break e;
            h === m && (h = null), m = m.return;
          }
          h === m && (h = null), m.sibling.return = m.return, m = m.sibling;
        }
      }
      break;
    case 19:
      $e(t, e), Qe(e), r & 4 && Cu(e);
      break;
    case 21:
      break;
    default:
      $e(
        t,
        e
      ), Qe(e);
  }
}
function Qe(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Qd(n)) {
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
          r.flags & 32 && (gr(a, ""), r.flags &= -33);
          var o = bu(e);
          $l(e, o, a);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo, i = bu(e);
          Ol(e, i, l);
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
function nh(e, t, n) {
  b = e, Xd(e);
}
function Xd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; b !== null; ) {
    var a = b, o = a.child;
    if (a.tag === 22 && r) {
      var l = a.memoizedState !== null || ra;
      if (!l) {
        var i = a.alternate, u = i !== null && i.memoizedState !== null || ce;
        i = ra;
        var c = ce;
        if (ra = l, (ce = u) && !c) for (b = a; b !== null; ) l = b, u = l.child, l.tag === 22 && l.memoizedState !== null ? Eu(a) : u !== null ? (u.return = l, b = u) : Eu(a);
        for (; o !== null; ) b = o, Xd(o), o = o.sibling;
        b = a, ra = i, ce = c;
      }
      Mu(e);
    } else a.subtreeFlags & 8772 && o !== null ? (o.return = a, b = o) : Mu(e);
  }
}
function Mu(e) {
  for (; b !== null; ) {
    var t = b;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ce || to(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ce) if (n === null) r.componentDidMount();
            else {
              var a = t.elementType === t.type ? n.memoizedProps : Re(t.type, n.memoizedProps);
              r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && fu(t, o, r);
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
              fu(t, l, n);
            }
            break;
          case 5:
            var i = t.stateNode;
            if (n === null && t.flags & 4) {
              n = i;
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
                var h = c.memoizedState;
                if (h !== null) {
                  var m = h.dehydrated;
                  m !== null && _r(m);
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
        ce || t.flags & 512 && Fl(t);
      } catch (f) {
        Q(t, t.return, f);
      }
    }
    if (t === e) {
      b = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, b = n;
      break;
    }
    b = t.return;
  }
}
function ju(e) {
  for (; b !== null; ) {
    var t = b;
    if (t === e) {
      b = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, b = n;
      break;
    }
    b = t.return;
  }
}
function Eu(e) {
  for (; b !== null; ) {
    var t = b;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            to(4, t);
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
            Fl(t);
          } catch (u) {
            Q(t, o, u);
          }
          break;
        case 5:
          var l = t.return;
          try {
            Fl(t);
          } catch (u) {
            Q(t, l, u);
          }
      }
    } catch (u) {
      Q(t, t.return, u);
    }
    if (t === e) {
      b = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, b = i;
      break;
    }
    b = t.return;
  }
}
var rh = Math.ceil, $a = mt.ReactCurrentDispatcher, Pi = mt.ReactCurrentOwner, ze = mt.ReactCurrentBatchConfig, z = 0, re = null, J = null, le = 0, Ne = 0, _n = zt(0), te = 0, Lr = null, qt = 0, no = 0, Ii = 0, dr = null, Se = null, zi = 0, In = 1 / 0, rt = null, Ra = !1, Rl = null, jt = null, aa = !1, xt = null, Ba = 0, fr = 0, Bl = null, ga = -1, ya = 0;
function he() {
  return z & 6 ? q() : ga !== -1 ? ga : ga = q();
}
function Et(e) {
  return e.mode & 1 ? z & 2 && le !== 0 ? le & -le : Rp.transition !== null ? (ya === 0 && (ya = Ic()), ya) : (e = F, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Wc(e.type)), e) : 1;
}
function Ue(e, t, n, r) {
  if (50 < fr) throw fr = 0, Bl = null, Error(w(185));
  Ar(e, n, r), (!(z & 2) || e !== re) && (e === re && (!(z & 2) && (no |= n), te === 4 && wt(e, le)), xe(e, r), n === 1 && z === 0 && !(t.mode & 1) && (In = q() + 500, qa && Ft()));
}
function xe(e, t) {
  var n = e.callbackNode;
  Rm(e, t);
  var r = Ta(e, e === re ? le : 0);
  if (r === 0) n !== null && $s(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && $s(n), t === 1) e.tag === 0 ? $p(Lu.bind(null, e)) : id(Lu.bind(null, e)), Ip(function() {
      !(z & 6) && Ft();
    }), n = null;
    else {
      switch (zc(r)) {
        case 1:
          n = si;
          break;
        case 4:
          n = Ac;
          break;
        case 16:
          n = xa;
          break;
        case 536870912:
          n = Pc;
          break;
        default:
          n = xa;
      }
      n = of(n, qd.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function qd(e, t) {
  if (ga = -1, ya = 0, z & 6) throw Error(w(327));
  var n = e.callbackNode;
  if (Mn() && e.callbackNode !== n) return null;
  var r = Ta(e, e === re ? le : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Wa(e, r);
  else {
    t = r;
    var a = z;
    z |= 2;
    var o = ef();
    (re !== e || le !== t) && (rt = null, In = q() + 500, Gt(e, t));
    do
      try {
        lh();
        break;
      } catch (i) {
        Jd(e, i);
      }
    while (!0);
    wi(), $a.current = o, z = a, J !== null ? t = 0 : (re = null, le = 0, t = te);
  }
  if (t !== 0) {
    if (t === 2 && (a = pl(e), a !== 0 && (r = a, t = Wl(e, a))), t === 1) throw n = Lr, Gt(e, 0), wt(e, r), xe(e, q()), n;
    if (t === 6) wt(e, r);
    else {
      if (a = e.current.alternate, !(r & 30) && !ah(a) && (t = Wa(e, r), t === 2 && (o = pl(e), o !== 0 && (r = o, t = Wl(e, o))), t === 1)) throw n = Lr, Gt(e, 0), wt(e, r), xe(e, q()), n;
      switch (e.finishedWork = a, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(w(345));
        case 2:
          Wt(e, Se, rt);
          break;
        case 3:
          if (wt(e, r), (r & 130023424) === r && (t = zi + 500 - q(), 10 < t)) {
            if (Ta(e, 0) !== 0) break;
            if (a = e.suspendedLanes, (a & r) !== r) {
              he(), e.pingedLanes |= e.suspendedLanes & a;
              break;
            }
            e.timeoutHandle = kl(Wt.bind(null, e, Se, rt), t);
            break;
          }
          Wt(e, Se, rt);
          break;
        case 4:
          if (wt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, a = -1; 0 < r; ) {
            var l = 31 - He(r);
            o = 1 << l, l = t[l], l > a && (a = l), r &= ~o;
          }
          if (r = a, r = q() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * rh(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = kl(Wt.bind(null, e, Se, rt), r);
            break;
          }
          Wt(e, Se, rt);
          break;
        case 5:
          Wt(e, Se, rt);
          break;
        default:
          throw Error(w(329));
      }
    }
  }
  return xe(e, q()), e.callbackNode === n ? qd.bind(null, e) : null;
}
function Wl(e, t) {
  var n = dr;
  return e.current.memoizedState.isDehydrated && (Gt(e, t).flags |= 256), e = Wa(e, t), e !== 2 && (t = Se, Se = n, t !== null && Hl(t)), e;
}
function Hl(e) {
  Se === null ? Se = e : Se.push.apply(Se, e);
}
function ah(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var a = n[r], o = a.getSnapshot;
        a = a.value;
        try {
          if (!Ke(o(), a)) return !1;
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
  for (t &= ~Ii, t &= ~no, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - He(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Lu(e) {
  if (z & 6) throw Error(w(327));
  Mn();
  var t = Ta(e, 0);
  if (!(t & 1)) return xe(e, q()), null;
  var n = Wa(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = pl(e);
    r !== 0 && (t = r, n = Wl(e, r));
  }
  if (n === 1) throw n = Lr, Gt(e, 0), wt(e, t), xe(e, q()), n;
  if (n === 6) throw Error(w(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, Wt(e, Se, rt), xe(e, q()), null;
}
function Fi(e, t) {
  var n = z;
  z |= 1;
  try {
    return e(t);
  } finally {
    z = n, z === 0 && (In = q() + 500, qa && Ft());
  }
}
function Jt(e) {
  xt !== null && xt.tag === 0 && !(z & 6) && Mn();
  var t = z;
  z |= 1;
  var n = ze.transition, r = F;
  try {
    if (ze.transition = null, F = 1, e) return e();
  } finally {
    F = r, ze.transition = n, z = t, !(z & 6) && Ft();
  }
}
function Oi() {
  Ne = _n.current, B(_n);
}
function Gt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Pp(n)), J !== null) for (n = J.return; n !== null; ) {
    var r = n;
    switch (vi(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ja();
        break;
      case 3:
        An(), B(we), B(me), Ci();
        break;
      case 5:
        bi(r);
        break;
      case 4:
        An();
        break;
      case 13:
        B(U);
        break;
      case 19:
        B(U);
        break;
      case 10:
        ki(r.type._context);
        break;
      case 22:
      case 23:
        Oi();
    }
    n = n.return;
  }
  if (re = e, J = e = Lt(e.current, null), le = Ne = t, te = 0, Lr = null, Ii = no = qt = 0, Se = dr = null, Ut !== null) {
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
function Jd(e, t) {
  do {
    var n = J;
    try {
      if (wi(), ma.current = Oa, Fa) {
        for (var r = K.memoizedState; r !== null; ) {
          var a = r.queue;
          a !== null && (a.pending = null), r = r.next;
        }
        Fa = !1;
      }
      if (Xt = 0, ne = ee = K = null, ur = !1, Mr = 0, Pi.current = null, n === null || n.return === null) {
        te = 1, Lr = t, J = null;
        break;
      }
      e: {
        var o = e, l = n.return, i = n, u = t;
        if (t = le, i.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, h = i, m = h.tag;
          if (!(h.mode & 1) && (m === 0 || m === 11 || m === 15)) {
            var f = h.alternate;
            f ? (h.updateQueue = f.updateQueue, h.memoizedState = f.memoizedState, h.lanes = f.lanes) : (h.updateQueue = null, h.memoizedState = null);
          }
          var y = vu(l);
          if (y !== null) {
            y.flags &= -257, Su(y, l, i, o, t), y.mode & 1 && yu(o, c, t), t = y, u = c;
            var v = t.updateQueue;
            if (v === null) {
              var _ = /* @__PURE__ */ new Set();
              _.add(u), t.updateQueue = _;
            } else v.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              yu(o, c, t), $i();
              break e;
            }
            u = Error(w(426));
          }
        } else if (H && i.mode & 1) {
          var P = vu(l);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256), Su(P, l, i, o, t), Si(Pn(u, i));
            break e;
          }
        }
        o = u = Pn(u, i), te !== 4 && (te = 2), dr === null ? dr = [o] : dr.push(o), o = l;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var p = zd(o, u, t);
              du(o, p);
              break e;
            case 1:
              i = u;
              var d = o.type, g = o.stateNode;
              if (!(o.flags & 128) && (typeof d.getDerivedStateFromError == "function" || g !== null && typeof g.componentDidCatch == "function" && (jt === null || !jt.has(g)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var S = Fd(o, i, t);
                du(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      nf(n);
    } catch (x) {
      t = x, J === n && n !== null && (J = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ef() {
  var e = $a.current;
  return $a.current = Oa, e === null ? Oa : e;
}
function $i() {
  (te === 0 || te === 3 || te === 2) && (te = 4), re === null || !(qt & 268435455) && !(no & 268435455) || wt(re, le);
}
function Wa(e, t) {
  var n = z;
  z |= 2;
  var r = ef();
  (re !== e || le !== t) && (rt = null, Gt(e, t));
  do
    try {
      oh();
      break;
    } catch (a) {
      Jd(e, a);
    }
  while (!0);
  if (wi(), z = n, $a.current = r, J !== null) throw Error(w(261));
  return re = null, le = 0, te;
}
function oh() {
  for (; J !== null; ) tf(J);
}
function lh() {
  for (; J !== null && !Lm(); ) tf(J);
}
function tf(e) {
  var t = af(e.alternate, e, Ne);
  e.memoizedProps = e.pendingProps, t === null ? nf(e) : J = t, Pi.current = null;
}
function nf(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Jp(n, t), n !== null) {
        n.flags &= 32767, J = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        te = 6, J = null;
        return;
      }
    } else if (n = qp(n, t, Ne), n !== null) {
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
  var r = F, a = ze.transition;
  try {
    ze.transition = null, F = 1, ih(e, t, n, r);
  } finally {
    ze.transition = a, F = r;
  }
  return null;
}
function ih(e, t, n, r) {
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
  if (Bm(e, o), e === re && (J = re = null, le = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || aa || (aa = !0, of(xa, function() {
    return Mn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = ze.transition, ze.transition = null;
    var l = F;
    F = 1;
    var i = z;
    z |= 4, Pi.current = null, th(e, n), Zd(n, e), Cp(_l), Na = !!Sl, _l = Sl = null, e.current = n, nh(n), Dm(), z = i, F = l, ze.transition = o;
  } else e.current = n;
  if (aa && (aa = !1, xt = e, Ba = a), o = e.pendingLanes, o === 0 && (jt = null), Im(n.stateNode), xe(e, q()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], r(a.value, { componentStack: a.stack, digest: a.digest });
  if (Ra) throw Ra = !1, e = Rl, Rl = null, e;
  return Ba & 1 && e.tag !== 0 && Mn(), o = e.pendingLanes, o & 1 ? e === Bl ? fr++ : (fr = 0, Bl = e) : fr = 0, Ft(), null;
}
function Mn() {
  if (xt !== null) {
    var e = zc(Ba), t = ze.transition, n = F;
    try {
      if (ze.transition = null, F = 16 > e ? 16 : e, xt === null) var r = !1;
      else {
        if (e = xt, xt = null, Ba = 0, z & 6) throw Error(w(331));
        var a = z;
        for (z |= 4, b = e.current; b !== null; ) {
          var o = b, l = o.child;
          if (b.flags & 16) {
            var i = o.deletions;
            if (i !== null) {
              for (var u = 0; u < i.length; u++) {
                var c = i[u];
                for (b = c; b !== null; ) {
                  var h = b;
                  switch (h.tag) {
                    case 0:
                    case 11:
                    case 15:
                      cr(8, h, o);
                  }
                  var m = h.child;
                  if (m !== null) m.return = h, b = m;
                  else for (; b !== null; ) {
                    h = b;
                    var f = h.sibling, y = h.return;
                    if (Vd(h), h === c) {
                      b = null;
                      break;
                    }
                    if (f !== null) {
                      f.return = y, b = f;
                      break;
                    }
                    b = y;
                  }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var _ = v.child;
                if (_ !== null) {
                  v.child = null;
                  do {
                    var P = _.sibling;
                    _.sibling = null, _ = P;
                  } while (_ !== null);
                }
              }
              b = o;
            }
          }
          if (o.subtreeFlags & 2064 && l !== null) l.return = o, b = l;
          else e: for (; b !== null; ) {
            if (o = b, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                cr(9, o, o.return);
            }
            var p = o.sibling;
            if (p !== null) {
              p.return = o.return, b = p;
              break e;
            }
            b = o.return;
          }
        }
        var d = e.current;
        for (b = d; b !== null; ) {
          l = b;
          var g = l.child;
          if (l.subtreeFlags & 2064 && g !== null) g.return = l, b = g;
          else e: for (l = d; b !== null; ) {
            if (i = b, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  to(9, i);
              }
            } catch (x) {
              Q(i, i.return, x);
            }
            if (i === l) {
              b = null;
              break e;
            }
            var S = i.sibling;
            if (S !== null) {
              S.return = i.return, b = S;
              break e;
            }
            b = i.return;
          }
        }
        if (z = a, Ft(), et && typeof et.onPostCommitFiberRoot == "function") try {
          et.onPostCommitFiberRoot(Va, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      F = n, ze.transition = t;
    }
  }
  return !1;
}
function Du(e, t, n) {
  t = Pn(n, t), t = zd(e, t, 1), e = Mt(e, t, 1), t = he(), e !== null && (Ar(e, 1, t), xe(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3) Du(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Du(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (jt === null || !jt.has(r))) {
        e = Pn(n, e), e = Fd(t, e, 1), t = Mt(t, e, 1), e = he(), t !== null && (Ar(t, 1, e), xe(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function sh(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = he(), e.pingedLanes |= e.suspendedLanes & n, re === e && (le & n) === n && (te === 4 || te === 3 && (le & 130023424) === le && 500 > q() - zi ? Gt(e, 0) : Ii |= n), xe(e, t);
}
function rf(e, t) {
  t === 0 && (e.mode & 1 ? (t = Qr, Qr <<= 1, !(Qr & 130023424) && (Qr = 4194304)) : t = 1);
  var n = he();
  e = dt(e, t), e !== null && (Ar(e, t, n), xe(e, n));
}
function uh(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), rf(e, n);
}
function ch(e, t) {
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
  r !== null && r.delete(t), rf(e, n);
}
var af;
af = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || we.current) _e = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return _e = !1, Xp(e, t, n);
    _e = !!(e.flags & 131072);
  }
  else _e = !1, H && t.flags & 1048576 && sd(t, Da, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ha(e, t), e = t.pendingProps;
      var a = En(t, me.current);
      Cn(t, n), a = ji(null, t, r, e, a, n);
      var o = Ei();
      return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ke(r) ? (o = !0, Ea(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, Ti(t), a.updater = eo, t.stateNode = a, a._reactInternals = t, jl(t, r, e, n), t = Dl(null, t, r, !0, o, n)) : (t.tag = 0, H && o && yi(t), pe(null, t, a, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ha(e, t), e = t.pendingProps, a = r._init, r = a(r._payload), t.type = r, a = t.tag = fh(r), e = Re(r, e), a) {
          case 0:
            t = Ll(null, t, r, e, n);
            break e;
          case 1:
            t = ku(null, t, r, e, n);
            break e;
          case 11:
            t = _u(null, t, r, e, n);
            break e;
          case 14:
            t = wu(null, t, r, Re(r.type, e), n);
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
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), Ll(e, t, r, a, n);
    case 1:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), ku(e, t, r, a, n);
    case 3:
      e: {
        if (Bd(t), e === null) throw Error(w(387));
        r = t.pendingProps, o = t.memoizedState, a = o.element, pd(e, t), Ia(t, r, null, n);
        var l = t.memoizedState;
        if (r = l.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: l.cache, pendingSuspenseBoundaries: l.pendingSuspenseBoundaries, transitions: l.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          a = Pn(Error(w(423)), t), t = xu(e, t, r, n, a);
          break e;
        } else if (r !== a) {
          a = Pn(Error(w(424)), t), t = xu(e, t, r, n, a);
          break e;
        } else for (Ce = Ct(t.stateNode.containerInfo.firstChild), Me = t, H = !0, We = null, n = fd(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (Ln(), r === a) {
            t = ft(e, t, n);
            break e;
          }
          pe(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return hd(t), e === null && bl(t), r = t.type, a = t.pendingProps, o = e !== null ? e.memoizedProps : null, l = a.children, wl(r, a) ? l = null : o !== null && wl(r, o) && (t.flags |= 32), Rd(e, t), pe(e, t, l, n), t.child;
    case 6:
      return e === null && bl(t), null;
    case 13:
      return Wd(e, t, n);
    case 4:
      return Ni(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Dn(t, null, r, n) : pe(e, t, r, n), t.child;
    case 11:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), _u(e, t, r, a, n);
    case 7:
      return pe(e, t, t.pendingProps, n), t.child;
    case 8:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return pe(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, a = t.pendingProps, o = t.memoizedProps, l = a.value, $(Aa, r._currentValue), r._currentValue = l, o !== null) if (Ke(o.value, l)) {
          if (o.children === a.children && !we.current) {
            t = ft(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var i = o.dependencies;
          if (i !== null) {
            l = o.child;
            for (var u = i.firstContext; u !== null; ) {
              if (u.context === r) {
                if (o.tag === 1) {
                  u = st(-1, n & -n), u.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var h = c.pending;
                    h === null ? u.next = u : (u.next = h.next, h.next = u), c.pending = u;
                  }
                }
                o.lanes |= n, u = o.alternate, u !== null && (u.lanes |= n), Cl(
                  o.return,
                  n,
                  t
                ), i.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (o.tag === 10) l = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (l = o.return, l === null) throw Error(w(341));
            l.lanes |= n, i = l.alternate, i !== null && (i.lanes |= n), Cl(l, n, t), l = o.sibling;
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
        pe(e, t, a.children, n), t = t.child;
      }
      return t;
    case 9:
      return a = t.type, r = t.pendingProps.children, Cn(t, n), a = Fe(a), r = r(a), t.flags |= 1, pe(e, t, r, n), t.child;
    case 14:
      return r = t.type, a = Re(r, t.pendingProps), a = Re(r.type, a), wu(e, t, r, a, n);
    case 15:
      return Od(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Re(r, a), ha(e, t), t.tag = 1, ke(r) ? (e = !0, Ea(t)) : e = !1, Cn(t, n), Id(t, r, a), jl(t, r, a, n), Dl(null, t, r, !0, e, n);
    case 19:
      return Hd(e, t, n);
    case 22:
      return $d(e, t, n);
  }
  throw Error(w(156, t.tag));
};
function of(e, t) {
  return Dc(e, t);
}
function dh(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ie(e, t, n, r) {
  return new dh(e, t, n, r);
}
function Ri(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function fh(e) {
  if (typeof e == "function") return Ri(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === oi) return 11;
    if (e === li) return 14;
  }
  return 2;
}
function Lt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ie(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function va(e, t, n, r, a, o) {
  var l = 2;
  if (r = e, typeof e == "function") Ri(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else e: switch (e) {
    case cn:
      return Vt(n.children, a, o, t);
    case ai:
      l = 8, a |= 8;
      break;
    case Jo:
      return e = Ie(12, n, t, a | 2), e.elementType = Jo, e.lanes = o, e;
    case el:
      return e = Ie(13, n, t, a), e.elementType = el, e.lanes = o, e;
    case tl:
      return e = Ie(19, n, t, a), e.elementType = tl, e.lanes = o, e;
    case hc:
      return ro(n, a, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case mc:
          l = 10;
          break e;
        case pc:
          l = 9;
          break e;
        case oi:
          l = 11;
          break e;
        case li:
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
function ro(e, t, n, r) {
  return e = Ie(22, e, r, t), e.elementType = hc, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Oo(e, t, n) {
  return e = Ie(6, e, null, t), e.lanes = n, e;
}
function $o(e, t, n) {
  return t = Ie(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function mh(e, t, n, r, a) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = So(0), this.expirationTimes = So(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = So(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
}
function Bi(e, t, n, r, a, o, l, i, u) {
  return e = new mh(e, t, n, i, u), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = Ie(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ti(o), e;
}
function ph(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: un, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function lf(e) {
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
    if (ke(n)) return ld(e, n, t);
  }
  return t;
}
function sf(e, t, n, r, a, o, l, i, u) {
  return e = Bi(n, r, !0, e, a, o, l, i, u), e.context = lf(null), n = e.current, r = he(), a = Et(n), o = st(r, a), o.callback = t ?? null, Mt(n, o, a), e.current.lanes = a, Ar(e, a, r), xe(e, r), e;
}
function ao(e, t, n, r) {
  var a = t.current, o = he(), l = Et(a);
  return n = lf(n), t.context === null ? t.context = n : t.pendingContext = n, t = st(o, l), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Mt(a, t, l), e !== null && (Ue(e, a, l, o), fa(e, a, l)), l;
}
function Ha(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Au(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Wi(e, t) {
  Au(e, t), (e = e.alternate) && Au(e, t);
}
function hh() {
  return null;
}
var uf = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Hi(e) {
  this._internalRoot = e;
}
oo.prototype.render = Hi.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(w(409));
  ao(e, t, null, null);
};
oo.prototype.unmount = Hi.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Jt(function() {
      ao(null, e, null, null);
    }), t[ct] = null;
  }
};
function oo(e) {
  this._internalRoot = e;
}
oo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = $c();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < _t.length && t !== 0 && t < _t[n].priority; n++) ;
    _t.splice(n, 0, e), n === 0 && Bc(e);
  }
};
function Ui(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function lo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Pu() {
}
function gh(e, t, n, r, a) {
  if (a) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = Ha(l);
        o.call(c);
      };
    }
    var l = sf(t, r, e, 0, null, !1, !1, "", Pu);
    return e._reactRootContainer = l, e[ct] = l.current, xr(e.nodeType === 8 ? e.parentNode : e), Jt(), l;
  }
  for (; a = e.lastChild; ) e.removeChild(a);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var c = Ha(u);
      i.call(c);
    };
  }
  var u = Bi(e, 0, !1, null, null, !1, !1, "", Pu);
  return e._reactRootContainer = u, e[ct] = u.current, xr(e.nodeType === 8 ? e.parentNode : e), Jt(function() {
    ao(t, u, n, r);
  }), u;
}
function io(e, t, n, r, a) {
  var o = n._reactRootContainer;
  if (o) {
    var l = o;
    if (typeof a == "function") {
      var i = a;
      a = function() {
        var u = Ha(l);
        i.call(u);
      };
    }
    ao(t, l, e, a);
  } else l = gh(n, t, e, a, r);
  return Ha(l);
}
Fc = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = tr(t.pendingLanes);
        n !== 0 && (ui(t, n | 1), xe(t, q()), !(z & 6) && (In = q() + 500, Ft()));
      }
      break;
    case 13:
      Jt(function() {
        var r = dt(e, 1);
        if (r !== null) {
          var a = he();
          Ue(r, e, 1, a);
        }
      }), Wi(e, 1);
  }
};
ci = function(e) {
  if (e.tag === 13) {
    var t = dt(e, 134217728);
    if (t !== null) {
      var n = he();
      Ue(t, e, 134217728, n);
    }
    Wi(e, 134217728);
  }
};
Oc = function(e) {
  if (e.tag === 13) {
    var t = Et(e), n = dt(e, t);
    if (n !== null) {
      var r = he();
      Ue(n, e, t, r);
    }
    Wi(e, t);
  }
};
$c = function() {
  return F;
};
Rc = function(e, t) {
  var n = F;
  try {
    return F = e, t();
  } finally {
    F = n;
  }
};
dl = function(e, t, n) {
  switch (t) {
    case "input":
      if (al(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var a = Xa(r);
            if (!a) throw Error(w(90));
            yc(r), al(r, a);
          }
        }
      }
      break;
    case "textarea":
      Sc(e, n);
      break;
    case "select":
      t = n.value, t != null && xn(e, !!n.multiple, t, !1);
  }
};
bc = Fi;
Cc = Jt;
var yh = { usingClientEntryPoint: !1, Events: [Ir, pn, Xa, Tc, Nc, Fi] }, Yn = { findFiberByHostInstance: Ht, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, vh = { bundleType: Yn.bundleType, version: Yn.version, rendererPackageName: Yn.rendererPackageName, rendererConfig: Yn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: mt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ec(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Yn.findFiberByHostInstance || hh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var oa = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!oa.isDisabled && oa.supportsFiber) try {
    Va = oa.inject(vh), et = oa;
  } catch {
  }
}
Le.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yh;
Le.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ui(t)) throw Error(w(200));
  return ph(e, t, null, n);
};
Le.createRoot = function(e, t) {
  if (!Ui(e)) throw Error(w(299));
  var n = !1, r = "", a = uf;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = Bi(e, 1, !1, null, null, n, !1, r, a), e[ct] = t.current, xr(e.nodeType === 8 ? e.parentNode : e), new Hi(t);
};
Le.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(w(188)) : (e = Object.keys(e).join(","), Error(w(268, e)));
  return e = Ec(t), e = e === null ? null : e.stateNode, e;
};
Le.flushSync = function(e) {
  return Jt(e);
};
Le.hydrate = function(e, t, n) {
  if (!lo(t)) throw Error(w(200));
  return io(null, e, t, !0, n);
};
Le.hydrateRoot = function(e, t, n) {
  if (!Ui(e)) throw Error(w(405));
  var r = n != null && n.hydratedSources || null, a = !1, o = "", l = uf;
  if (n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (l = n.onRecoverableError)), t = sf(t, null, e, 1, n ?? null, a, !1, o, l), e[ct] = t.current, xr(e), r) for (e = 0; e < r.length; e++) n = r[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(
    n,
    a
  );
  return new oo(t);
};
Le.render = function(e, t, n) {
  if (!lo(t)) throw Error(w(200));
  return io(null, e, t, !1, n);
};
Le.unmountComponentAtNode = function(e) {
  if (!lo(e)) throw Error(w(40));
  return e._reactRootContainer ? (Jt(function() {
    io(null, null, e, !1, function() {
      e._reactRootContainer = null, e[ct] = null;
    });
  }), !0) : !1;
};
Le.unstable_batchedUpdates = Fi;
Le.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!lo(n)) throw Error(w(200));
  if (e == null || e._reactInternals === void 0) throw Error(w(38));
  return io(e, t, n, !1, r);
};
Le.version = "18.3.1-next-f1338f8080-20240426";
function cf() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(cf);
    } catch (e) {
      console.error(e);
    }
}
cf(), uc.exports = Le;
var Sh = uc.exports, Iu = Sh;
Dt.createRoot = Iu.createRoot, Dt.hydrateRoot = Iu.hydrateRoot;
const _h = Object.freeze({
  selectedDate: "",
  curLang: "zh-TW",
  curTheme: "light",
  targetCalories: 0,
  currentMealMode: "4",
  currentGoalType: "lose",
  loggedWeight: "",
  foodItems: Object.freeze([]),
  favoriteFoods: Object.freeze([]),
  tempAIResult: null,
  tempAIResultSaved: !1,
  analysisFlow: Object.freeze({
    status: "idle",
    source: "none",
    cooldownRemaining: 0,
    quotaExceeded: !1,
    isSoftError: !1,
    lastError: "",
    verificationUnavailable: !1,
    verificationMessage: ""
  }),
  profile: null
}), wh = Object.freeze({
  getAppState() {
    return _h;
  },
  subscribeAppState() {
    return () => {
    };
  }
});
function kh() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofAppStateBridge) || wh;
}
function $n() {
  const [e, t] = X.useState(() => {
    var r;
    return !!((r = globalThis.window) != null && r.__woofAppStateBridge);
  });
  X.useEffect(() => {
    if (e || typeof window > "u") return;
    let r = 0;
    const a = () => {
      if (window.__woofAppStateBridge) {
        t(!0);
        return;
      }
      r = window.requestAnimationFrame(a);
    };
    return r = window.requestAnimationFrame(a), () => window.cancelAnimationFrame(r);
  }, [e]);
  const n = kh();
  return X.useSyncExternalStore(
    n.subscribeAppState,
    n.getAppState,
    n.getAppState
  );
}
function Ki(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = Ki(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
function Gi(e) {
  return `${Math.round(Number(e) || 0)} kcal`;
}
const Vi = {
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
    bondLabel: "Bond",
    energyLabel: "Energy",
    streakLabel: "Streak",
    dayUnit: "d",
    tapLabel: "Interact with your companion"
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
  mealGroupMeta: (e, t) => `${Number(e) || 0} items / ${Gi(t)}`
}, xh = Ki(Vi, {
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
    bondLabel: "羈絆",
    energyLabel: "能量",
    streakLabel: "連續",
    dayUnit: "天",
    tapLabel: "和夥伴互動"
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
  mealGroupMeta: (e, t) => `${Number(e) || 0} 項 / ${Gi(t)}`
}), Th = Ki(Vi, {
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
    bondLabel: "羁绊",
    energyLabel: "能量",
    streakLabel: "连续",
    dayUnit: "天",
    tapLabel: "和伙伴互动"
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
  mealGroupMeta: (e, t) => `${Number(e) || 0} 项 / ${Gi(t)}`
}), Ro = {
  en: Vi,
  "zh-TW": xh,
  "zh-CN": Th
};
function Qi(e = "en") {
  return Ro[e] || Ro[String(e || "en").split("-")[0]] || Ro.en;
}
const Nh = {
  appTitle: "Woof Cal - AI Diet Tracker"
}, bh = {
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
}, Ch = {
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
}, Ul = {
  "zh-TW": Ch,
  "zh-CN": bh,
  en: Nh
}, Mh = {
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
}, Bo = /* @__PURE__ */ new Map();
function Wo(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function df(e, t) {
  const n = { ...e };
  return Wo(t) && Object.entries(t).forEach(([r, a]) => {
    if (Wo(a) && Wo(e[r])) {
      n[r] = df(e[r], a);
      return;
    }
    a != null && (n[r] = a);
  }), n;
}
function pt(e = "zh-TW") {
  const t = String(e || "zh-TW");
  if (!Bo.has(t)) {
    const n = df(
      Mh,
      Ul[t] || Ul.en || {}
    );
    Bo.set(t, n);
  }
  return Bo.get(t);
}
Object.freeze(Object.keys(Ul));
const jh = {
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
}, Eh = {
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
}, Ho = {
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
  "zh-TW": jh,
  "zh-CN": Eh
};
function Lh(e = "en") {
  return Ho[e] || Ho[String(e || "en").split("-")[0]] || Ho.en;
}
const Dh = {
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
}, Ah = {
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
}, Kl = {
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
  "zh-TW": Dh,
  "zh-CN": Ah
}, je = typeof window < "u" && window.__WOOF_CAL_CONFIG__ ? window.__WOOF_CAL_CONFIG__ : {};
je.workerUrl;
je.turnstileWidgetSelector;
je.turnstileSiteKey;
Object.freeze(
  Array.isArray(je.turnstileAllowedHostnames) && je.turnstileAllowedHostnames.length > 0 ? je.turnstileAllowedHostnames.map((e) => String(e || "").trim().toLowerCase()).filter(Boolean) : ["andreww0421.github.io"]
);
je.serviceWorkerPath;
const Ph = Number(je.dailyAiLimit) || 20, Ih = je.usageKey || "woofCal_usage";
je.storageSchemaKey;
Number(je.appSchemaVersion);
je.diagnosticsKey;
Number(je.maxDiagnosticEvents);
function fe(e = /* @__PURE__ */ new Date()) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ua(e) {
  if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e))
    return null;
  const [t, n, r] = e.split("-"), a = Number(t), o = Number(n), l = Number(r);
  if (!Number.isInteger(a) || !Number.isInteger(o) || !Number.isInteger(l))
    return null;
  const i = new Date(a, o - 1, l);
  return i.getFullYear() !== a || i.getMonth() !== o - 1 || i.getDate() !== l ? null : i;
}
function zh(e, {
  max: t = fe(),
  fallback: n = fe()
} = {}) {
  const r = Ua(e);
  if (!r) return n;
  const a = Ua(t), o = fe(r);
  return a && o > fe(a) ? fe(a) : o;
}
function ff(e, t = 0, {
  fallback: n = fe()
} = {}) {
  const r = Ua(e) || Ua(n) || /* @__PURE__ */ new Date(), a = new Date(r);
  return a.setDate(a.getDate() + (Number(t) || 0)), fe(a);
}
function Yi(e, t = null) {
  if (typeof e != "string" || e === "") return t;
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}
const mf = Object.freeze({
  calories: Object.freeze({ aliases: ["cal"] }),
  protein: Object.freeze({ aliases: [] }),
  fat: Object.freeze({ aliases: [] }),
  carbohydrate: Object.freeze({ aliases: ["carb"] }),
  sugar: Object.freeze({ aliases: [] }),
  sodium: Object.freeze({ aliases: ["sod"] }),
  saturatedFat: Object.freeze({ aliases: ["sat"] }),
  transFat: Object.freeze({ aliases: ["trans"] }),
  fiber: Object.freeze({ aliases: [] })
}), Rn = Object.freeze(Object.keys(mf));
function zu(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Fh(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const o = Math.min(Math.max(a, t), n);
  if (r === null) return o;
  const l = 10 ** r;
  return Math.round(o * l) / l;
}
function Oh(e) {
  const t = zu(e) ? e : {}, n = zu(t.nutri) ? t.nutri : null;
  return n ? [n, t] : [t];
}
function $h(e, t, n) {
  const r = [t, ...n], a = Oh(e);
  for (const o of a)
    for (const l of r) {
      const i = o == null ? void 0 : o[l];
      if (i != null && i !== "")
        return i;
    }
  return 0;
}
function Rh() {
  return Object.fromEntries(Rn.map((e) => [e, 0]));
}
function Te(e = {}, t = {}) {
  const { fieldOptions: n = {} } = t;
  return Object.fromEntries(Rn.map((r) => {
    const a = mf[r], o = $h(e, r, a.aliases);
    return [r, Fh(o, n[r])];
  }));
}
function Fr(e = {}, t = {}) {
  return Te(e, t);
}
function Zi(e = {}) {
  const t = Te(e);
  return Rn.some((n) => t[n] !== 0);
}
function Zn(e) {
  return typeof e == "function";
}
function Bh(e) {
  return !!e && Zn(e.getItem) && Zn(e.setItem) && Zn(e.removeItem) && Zn(e.clear) && Zn(e.key) && typeof e.length == "number";
}
function Wh(e) {
  if (!Bh(e))
    throw new Error("Invalid storage adapter");
  return e;
}
function Hh() {
  return globalThis.localStorage;
}
function Uh(e = Hh) {
  const t = () => {
    const n = typeof e == "function" ? e() : e;
    return Wh(n);
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
const Kh = Uh();
let Gh = Kh;
function so(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function pf() {
  return Gh;
}
function Or(e) {
  return pf().getItem(e);
}
function hf(e, t) {
  pf().setItem(e, t);
}
function Xi(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function gf(e) {
  return Array.isArray(e) ? e.filter(so).map((t) => ({
    name: String(t.name ?? "").trim(),
    weight: String(t.weight ?? "").trim()
  })).filter((t) => t.name || t.weight) : [];
}
function Vh(e) {
  if (!so(e)) return null;
  const t = Te(e), n = gf(e.items), r = {
    type: String(e.type || "snack"),
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Xi(e.healthScore ?? 0)
  };
  return r.name || n.length || Zi(t) ? r : null;
}
function Qh(e) {
  if (!so(e)) return null;
  const t = Te(e), n = gf(e.items), r = {
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Xi(e.healthScore ?? 0)
  };
  return r.name || n.length || Zi(t) ? r : null;
}
function Yh(e) {
  return so(e) ? {
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
function Zh(e, t) {
  return Array.isArray(e) ? e.map(t).filter(Boolean) : [];
}
function yf(e, t) {
  const n = Yi(Or(e), []), r = Zh(n, t);
  return JSON.stringify(n) !== JSON.stringify(r) && hf(e, JSON.stringify(r)), r;
}
function vf(e = fe()) {
  return zh(String(e || fe()));
}
function Xh() {
  return yf("myFavorites", Qh);
}
function Sf(e, t) {
  return Or(e) || t;
}
function qi(e) {
  return yf(`record_${e}`, Vh);
}
function qh(e) {
  const t = Or(`weight_${e}`);
  if (!t) return null;
  const n = parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function Jh() {
  const e = Yh(Yi(Or("myProfile_v5"), null));
  return e ? (hf("myProfile_v5", JSON.stringify(e)), e) : null;
}
function eg(e = 7, t = fe()) {
  const n = [], r = vf(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = ff(r, -a), l = qi(o);
    let i = 0;
    l.forEach((u) => {
      var c;
      i += Xi((c = u == null ? void 0 : u.nutri) == null ? void 0 : c.calories);
    }), n.push({ date: o.slice(5), calories: Math.round(i) });
  }
  return n;
}
function tg(e = 7, t = fe()) {
  const n = [], r = vf(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = ff(r, -a);
    n.push({
      date: o,
      label: o.slice(5),
      items: qi(o)
    });
  }
  return n;
}
function ng() {
  const e = fe(), t = Yi(Or(Ih), {});
  return (t == null ? void 0 : t.date) !== e ? { date: e, count: 0 } : {
    date: e,
    count: Number(t.count) || 0
  };
}
function rg(e) {
  return qi(e);
}
function _f(e = 7, t) {
  return eg(e, t);
}
function wf(e = 7, t) {
  return tg(e, t);
}
function ag() {
  return Xh();
}
function og() {
  return Jh();
}
const lg = Object.freeze(["zh-TW", "zh-CN", "en"]);
function kf(e, t = "zh-TW") {
  const n = String(e || "").trim();
  return lg.includes(n) ? n : t;
}
function ig() {
  return kf(Sf("appLang", "zh-TW"));
}
function sg() {
  return Sf("appTheme", "light");
}
function ug() {
  return ng();
}
function cg(e) {
  return qh(e);
}
function dg(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function xf(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const o = dg(a, t, n);
  if (r === null) return o;
  const l = 10 ** r;
  return Math.round(o * l) / l;
}
function Fu(e) {
  const t = String((e == null ? void 0 : e.name) ?? "").trim(), n = String((e == null ? void 0 : e.weight) ?? "").trim();
  return !t && !n ? null : { name: t, weight: n };
}
function Ou(e) {
  return {
    name: String((e == null ? void 0 : e.name) ?? "").trim(),
    weight: String((e == null ? void 0 : e.weight) ?? "").trim()
  };
}
function $u(e = []) {
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
function fg(e = {}, t = {}) {
  const {
    fallbackName: n = "",
    fallbackItems: r = []
  } = t, a = Array.isArray(e.items) ? e.items.map(Fu).filter(Boolean) : r.map(Fu).filter(Boolean), o = Te(e, {
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
    healthScore: xf(e.healthScore, { max: 10, digits: 1 }),
    items: a
  };
  if (!(Zi(o) || l.items.length > 0))
    throw new Error("AI_INVALID_PAYLOAD");
  return l;
}
function mg(e, t = {}) {
  if (!e || typeof e != "object") return null;
  const {
    fallbackName: n = "",
    fallbackItems: r = [],
    preferredName: a = "",
    correctionHistory: o = (e == null ? void 0 : e.correctionHistory) || []
  } = t, l = e.nutri !== void 0 || e.correctionHistory !== void 0, i = Array.isArray(e.items) ? e.items.map(Ou) : r.map(Ou);
  if (l)
    return {
      name: String(e.name || a || n || "").trim() || "Food Analysis",
      nutri: Te(e.nutri !== void 0 ? e.nutri : e),
      items: i,
      healthScore: xf(e.healthScore, { max: 10, digits: 1 }),
      correctionHistory: $u(o)
    };
  const u = fg(e, {
    fallbackName: n,
    fallbackItems: r
  });
  return {
    name: String(a || u.foodName || n || "").trim() || "Food Analysis",
    nutri: Te(u),
    items: u.items,
    healthScore: u.healthScore,
    correctionHistory: $u(o)
  };
}
const Ru = {
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
}, Tf = {
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
function uo(e = 0, { weightKg: t = 0, goalType: n = "lose" } = {}) {
  const r = Math.max(0, Math.round(V(e))), a = Math.max(0, V(t)), o = pg(n);
  if (a > 0) {
    const l = Tf[o], i = Math.max(0, Math.round(a * l.proteinPerKg)), u = Math.max(0, Math.round(a * l.fatPerKg)), c = Math.max(r - i * 4 - u * 9, 0);
    return {
      protein: i,
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
function pg(e = "lose") {
  const t = String(e || "lose");
  return Tf[t] ? t : "lose";
}
function hg(e = "4", t = {}, n = 0) {
  return (Ru[String(e)] || Ru[4]).map((a) => ({
    ...a,
    title: (t == null ? void 0 : t[a.titleKey]) || a.type,
    suggestedCalories: n > 0 ? Math.round(n * a.ratio) : 0
  }));
}
function $r(e = []) {
  const t = { cal: 0, pro: 0, fat: 0, carb: 0, sugar: 0, sod: 0, sat: 0, trans: 0, fiber: 0 }, n = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
  return e.forEach((r) => {
    const a = (r == null ? void 0 : r.nutri) || {};
    t.cal += V(a.calories), t.pro += V(a.protein), t.fat += V(a.fat), t.carb += V(a.carbohydrate), t.sugar += V(a.sugar), t.sod += V(a.sodium), t.sat += V(a.saturatedFat), t.trans += V(a.transFat), t.fiber += V(a.fiber), n[r == null ? void 0 : r.type] !== void 0 && (n[r.type] += V(a.calories));
  }), { totals: t, mealTotals: n };
}
function gg(e = []) {
  const t = e.filter((o) => V(o == null ? void 0 : o.calories) > 0), n = t.reduce((o, l) => o + V(l == null ? void 0 : l.calories), 0), r = t.length > 0 ? Math.round(n / t.length) : 0, a = t.reduce((o, l) => o ? V(l.calories) > V(o.calories) ? l : o : l, null);
  return {
    loggedDays: t.length,
    averageCalories: r,
    bestDayLabel: (a == null ? void 0 : a.date) || "--",
    bestDayCalories: Math.round(V(a == null ? void 0 : a.calories))
  };
}
function yg({ total: e = {}, targetCalories: t = 0, calorieHistory: n = [], goalType: r = "lose", weightKg: a = 0 } = {}) {
  const o = V(t), l = uo(o, {
    goalType: r,
    weightKg: a
  }), i = V(e.cal), u = V(e.pro), c = V(e.fiber), h = V(e.sod);
  let m = "steady";
  i <= 0 ? m = "start_logging" : o > 0 && i > o * 1.08 ? m = "over_target" : u < l.protein * 0.65 ? m = "protein_gap" : c > 0 && c < 18 ? m = "fiber_gap" : h > 2300 ? m = "sodium_high" : o > 0 && i >= o * 0.85 && (m = "near_goal");
  const f = [];
  return i <= 0 ? f.push("use_ai", "log_first_meal") : (u < l.protein * 0.85 && f.push("protein_boost"), c < 25 && f.push("fiber_boost"), h > 2300 && f.push("watch_sodium"), o > 0 && i > o * 1.08 && f.push("portion_reset"), f.length === 0 && f.push("keep_momentum")), {
    status: m,
    targetCalories: o,
    calories: i,
    protein: u,
    fiber: c,
    sodium: h,
    remainingCalories: o > 0 ? Math.max(Math.round(o - i), 0) : 0,
    overCalories: o > 0 ? Math.max(Math.round(i - o), 0) : 0,
    proteinGap: Math.max(l.protein - Math.round(u), 0),
    fiberGap: Math.max(25 - Math.round(c), 0),
    tipKeys: [...new Set(f)].slice(0, 3),
    macroGoals: l,
    weekly: gg(n)
  };
}
function vg(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    name: String((t == null ? void 0 : t.name) || ""),
    weight: String((t == null ? void 0 : t.weight) || "")
  })) : [];
}
function Sg(e = {}) {
  return Fr(e);
}
function Ka(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    type: String((t == null ? void 0 : t.type) || "snack"),
    name: String((t == null ? void 0 : t.name) || ""),
    nutri: Sg(t),
    items: vg(t == null ? void 0 : t.items),
    healthScore: Number(t == null ? void 0 : t.healthScore) || 0
  })) : [];
}
function Nf(e) {
  return mg(e);
}
function bf(e) {
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
function _g(e = !1) {
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
function Cf(e = {}, t = !1) {
  const n = _g(t);
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
function wg(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function kg(e = {}) {
  const t = String(e.selectedDate || fe()), n = bf(e.profile !== void 0 ? e.profile : og()), r = String(e.currentMealMode || (n == null ? void 0 : n.mealMode) || "4"), a = String(e.currentGoalType || (n == null ? void 0 : n.goalType) || "lose"), l = ug().count >= Ph;
  return {
    selectedDate: t,
    curLang: kf(e.curLang || ig()),
    curTheme: String(e.curTheme || sg()),
    targetCalories: wg(e.targetCalories, 2e3),
    currentMealMode: r,
    currentGoalType: a,
    loggedWeight: e.loggedWeight ?? cg(t),
    foodItems: Ka(e.foodItems !== void 0 ? e.foodItems : rg(t)),
    favoriteFoods: Ka(e.favoriteFoods !== void 0 ? e.favoriteFoods : ag()),
    tempAIResult: Nf(e.tempAIResult),
    tempAIResultSaved: !!e.tempAIResultSaved,
    analysisFlow: Cf(e.analysisFlow, l),
    profile: n
  };
}
function xg(e) {
  return Object.freeze({
    ...e,
    foodItems: Ka(e.foodItems),
    favoriteFoods: Ka(e.favoriteFoods),
    tempAIResult: Nf(e.tempAIResult),
    profile: bf(e.profile),
    analysisFlow: Cf(e.analysisFlow),
    updatedAt: Date.now()
  });
}
let Tg = kg(), Gl = xg(Tg);
function ge() {
  return Gl;
}
function Ng(e = Gl) {
  var a;
  const t = e || Gl, n = $r(t.foodItems), r = Math.max(0, Number((a = t.profile) == null ? void 0 : a.weight) || 0);
  return {
    selectedDate: t.selectedDate,
    lang: t.curLang,
    goalType: t.currentGoalType,
    targetCalories: Number(t.targetCalories) || 0,
    profileWeight: r,
    waterTarget: Math.round((r || 60) * 35),
    calorieHistory: _f(7, t.selectedDate),
    foodItems: t.foodItems,
    totals: n.totals,
    mealTotals: n.mealTotals
  };
}
function Mf(e, t = ge().curLang) {
  var n;
  return ((n = Kl[t]) == null ? void 0 : n[e]) || Kl.en[e];
}
function jf(e = ge().curLang) {
  return Mf("extra", e);
}
function bg(e = ge().curLang) {
  return Mf("goal", e);
}
function Cg(e = ge().curLang) {
  return Lh(e);
}
function Mg(e = "lose", t = ge().curLang) {
  var r, a;
  const n = bg(t);
  return ((r = n.goalTypes) == null ? void 0 : r[e]) || ((a = n.goalTypes) == null ? void 0 : a.lose) || Kl.en.goal.goalTypes.lose;
}
function jg(e, t = ge().curLang) {
  var c, h, m, f, y, v, _, P, p, d, g;
  const n = Qi(t), r = pt(t), a = (((c = e == null ? void 0 : e.mealCoverage) == null ? void 0 : c.loggedMeals) || 0) > 0, o = ((m = r.meals) == null ? void 0 : m[((h = e == null ? void 0 : e.mealCoverage) == null ? void 0 : h.nextMealTitleKey) || ""]) || "", l = a ? n.heroSummaryActive : n.heroSummaryBase || "", i = Number((e == null ? void 0 : e.proteinCurrent) || 0).toFixed(1).replace(/\.0$/, ""), u = (e == null ? void 0 : e.proteinRemaining) > 0 ? n.signalProteinToGoal(e.proteinRemaining) : n.signalProteinOnTrack;
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
            ((_ = e == null ? void 0 : e.mealCoverage) == null ? void 0 : _.plannedMeals) || 0
          )
        },
        {
          label: n.statLabels.protein,
          value: n.formatProteinPace(i, (e == null ? void 0 : e.proteinTarget) || 0)
        }
      ],
      meta: [
        Mg(e == null ? void 0 : e.goalType, t),
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
          value: `${i}g`,
          detail: u
        },
        {
          label: n.signals.meals,
          value: n.formatMealCoverage(
            ((P = e == null ? void 0 : e.mealCoverage) == null ? void 0 : P.loggedMeals) || 0,
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
function Eg(e, t = ge().curLang) {
  var i, u, c, h;
  const n = Cg(t).trend, r = (e == null ? void 0 : e.focusKey) || "balanced", a = ((i = n.headlines) == null ? void 0 : i[r]) || ((u = n.headlines) == null ? void 0 : u.balanced) || "", o = ((c = n.summaries) == null ? void 0 : c[r]) || ((h = n.summaries) == null ? void 0 : h.balanced) || "", l = typeof o == "function" ? o((e == null ? void 0 : e.loggedDays) || 7) : o;
  return {
    title: n.title,
    subtitle: n.subtitle,
    headline: a,
    summary: l,
    signals: ((e == null ? void 0 : e.signals) || []).map((m) => {
      var f, y, v;
      return {
        key: m.key,
        label: ((f = n.signalLabels) == null ? void 0 : f[m.key]) || m.key,
        value: (y = n.signalValue) != null && y[m.key] ? n.signalValue[m.key](m) : String(m.current ?? "--"),
        detail: (v = n.signalDetails) != null && v[m.key] ? n.signalDetails[m.key](m) : ""
      };
    })
  };
}
function Ji(e = ge().selectedDate, t = ge().curLang) {
  const { selectedDate: n } = ge(), r = e || n || fe(), a = jf(t);
  return r === fe() ? a.todayLabel : r;
}
function ot(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Ef(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function Rr(e = []) {
  return !Array.isArray(e) || e.length === 0 ? 0 : e.reduce((t, n) => t + ot(n), 0) / e.length;
}
function Lg(e = []) {
  if (!Array.isArray(e) || e.length < 2) return 0;
  const t = Rr(e), n = e.reduce((r, a) => {
    const o = ot(a) - t;
    return r + o * o;
  }, 0) / e.length;
  return Math.sqrt(n);
}
function Lf(e = [], t = 0.45) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  if (e.length === 1) return 60;
  const n = Rr(e);
  if (n <= 0) return 0;
  const r = Lg(e) / n;
  return Math.round((1 - Ef(r / t, 0, 1)) * 100);
}
function es(e, t) {
  return {
    key: e,
    score: 0,
    status: t,
    loggedDays: 0
  };
}
function Dg(e = {}) {
  const t = Array.isArray(e == null ? void 0 : e.items) ? e.items : [], { totals: n, mealTotals: r } = $r(t), a = Math.round(ot(n.cal)), o = Math.round(ot(n.pro) * 10) / 10, l = Math.round(ot(r.breakfast)), i = Math.round(ot(r.dinner)), u = Math.round(ot(r.lunch)), c = Math.round(ot(r.snack)), h = t.length > 0 || a > 0 || o > 0;
  return {
    date: String((e == null ? void 0 : e.date) || ""),
    label: String((e == null ? void 0 : e.label) || (e == null ? void 0 : e.date) || ""),
    logged: h,
    totalCalories: a,
    totalProtein: o,
    breakfastCalories: l,
    lunchCalories: u,
    dinnerCalories: i,
    snackCalories: c,
    dinnerShare: a > 0 ? i / a : 0,
    breakfastLogged: l > 0,
    dinnerLogged: i > 0
  };
}
function Ag(e = []) {
  const t = e.filter((i) => i.logged);
  if (t.length === 0)
    return es("breakfast", "not_enough_data");
  const n = t.filter((i) => i.breakfastLogged), r = n.length / t.length, a = Lf(
    n.map((i) => i.breakfastCalories),
    0.5
  ), o = Math.round((r * 0.7 + a / 100 * 0.3) * 100);
  let l = "irregular";
  return t.length < 3 ? l = n.length > 0 ? "building" : "irregular" : o >= 70 ? l = "steady" : o >= 40 && (l = "building"), {
    key: "breakfast",
    score: o,
    status: l,
    loggedDays: t.length,
    breakfastDays: n.length,
    averageBreakfastCalories: Math.round(Rr(n.map((i) => i.breakfastCalories)))
  };
}
function Pg(e = []) {
  const t = e.filter((i) => i.logged);
  if (t.length === 0)
    return es("dinner", "not_enough_data");
  const n = t.filter((i) => i.dinnerShare >= 0.45), r = Rr(t.map((i) => i.dinnerShare)), a = n.length / t.length, o = Math.round((Ef(r / 0.6, 0, 1) * 0.7 + a * 0.3) * 100);
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
function Ig(e = [], t = 0) {
  const n = e.filter((h) => h.logged);
  if (n.length === 0)
    return es("protein", "not_enough_data");
  const r = Math.max(0, ot(t)), a = Math.round(Rr(n.map((h) => h.totalProtein)) * 10) / 10, o = Lf(
    n.map((h) => h.totalProtein),
    0.4
  ), l = r > 0 ? n.filter((h) => h.totalProtein >= r * 0.9).length : 0, i = n.length > 0 ? l / n.length : 0, u = r > 0 ? Math.round((i * 0.6 + o / 100 * 0.4) * 100) : o;
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
function zg(e = 7) {
  return {
    key: "hydration",
    score: null,
    status: "placeholder",
    available: !1,
    windowSize: e,
    trackedDays: 0
  };
}
function Fg({ dayLogs: e = [], proteinTarget: t = 0 } = {}) {
  const n = Array.isArray(e) ? e.map(Dg) : [], r = n.filter((c) => c.logged), a = Ag(n), o = Pg(n), l = Ig(n, t), i = zg(n.length || 7);
  let u = "start_logging";
  return r.length >= 3 ? a.status === "irregular" ? u = "breakfast_anchor" : o.status === "heavy" ? u = "dinner_balance" : l.status === "inconsistent" ? u = "protein_rhythm" : a.status === "building" || l.status === "building" ? u = "building_consistency" : u = "steady_week" : r.length > 0 && (u = "building_consistency"), {
    windowSize: n.length || 7,
    loggedDays: r.length,
    focus: u,
    breakfast: a,
    dinner: o,
    protein: l,
    hydration: i,
    days: n
  };
}
function Og(e = ge(), { days: t = 7 } = {}) {
  var u, c;
  const n = e || ge(), r = Math.max(0, Number((u = n == null ? void 0 : n.profile) == null ? void 0 : u.weight) || 0), a = Math.max(0, Number(n == null ? void 0 : n.targetCalories) || 0), o = String((n == null ? void 0 : n.currentGoalType) || ((c = n == null ? void 0 : n.profile) == null ? void 0 : c.goalType) || "lose"), l = uo(a, {
    weightKg: r,
    goalType: o
  }), i = Fg({
    dayLogs: wf(t, n.selectedDate),
    proteinTarget: l.protein
  });
  return {
    ...i,
    proteinTarget: l.protein,
    lang: (n == null ? void 0 : n.curLang) || "en",
    hasData: i.loggedDays > 0
  };
}
function $g(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Qt(e, t = "en", n = "en") {
  if (typeof e == "string") return e;
  if (!$g(e)) return "";
  const r = String(t || n || "en"), a = r.split("-")[0];
  return String(
    e[r] || e[a] || e[n] || Object.values(e).find(Boolean) || ""
  ).trim();
}
function Df(e) {
  if (Array.isArray(e))
    return e.map((n) => String(n || "").trim()).filter(Boolean);
  const t = String(e || "").trim();
  return t ? [t] : [];
}
function Af(e) {
  return String(Array.isArray(e) ? e[0] : e || "").trim();
}
function ts(e) {
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
function Rg(e = {}) {
  return Object.fromEntries(Rn.map((t) => {
    const n = Number(e == null ? void 0 : e[t]);
    return [t, Number.isFinite(n) ? n : 0];
  }));
}
function Bg(e, t = 1) {
  const n = Number(t), r = Number.isFinite(n) ? n : 1, a = Fr(e);
  return ts(Object.fromEntries(
    Rn.map((o) => [o, a[o] * r])
  ));
}
function Wg(e, t = {}) {
  const n = Fr(e), r = Rg(t);
  return ts(Object.fromEntries(
    Rn.map((a) => [a, n[a] + r[a]])
  ));
}
function Bu(e, t) {
  return {
    name: Qt(e == null ? void 0 : e.name, t) || "Item",
    weight: String((e == null ? void 0 : e.weight) || "").trim()
  };
}
function Hg(e = {}) {
  const t = Array.isArray(e.options) ? e.options : [];
  if (e.selectionType === "multi")
    return t.filter((a) => a == null ? void 0 : a.default).map((a) => String(a.id || "").trim()).filter(Boolean);
  const r = t.find((a) => a == null ? void 0 : a.default) || t[0];
  return r != null && r.id ? [String(r.id).trim()] : [];
}
function Pf(e, t = {}) {
  const n = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  return Object.fromEntries(n.map((r) => {
    const a = String((r == null ? void 0 : r.id) || "").trim(), o = t == null ? void 0 : t[a], l = Hg(r);
    if (r.selectionType === "multi") {
      const u = Df(o);
      return [a, u.length > 0 ? u : l];
    }
    const i = Af(o);
    return [a, i || l[0] || ""];
  }));
}
function Ug(e, t) {
  const n = Array.isArray(e == null ? void 0 : e.options) ? e.options : [];
  if ((e == null ? void 0 : e.selectionType) === "multi") {
    const a = new Set(Df(t));
    return n.filter((o) => a.has(String((o == null ? void 0 : o.id) || "").trim()));
  }
  const r = Af(t);
  return n.filter((a) => String((a == null ? void 0 : a.id) || "").trim() === r);
}
function Kg(e = [], t = [], n = "en") {
  return [
    ...Array.isArray(e) ? e.map((r) => Bu(r, n)) : [],
    ...Array.isArray(t) ? t.map((r) => Bu(r, n)) : []
  ];
}
function Gg(e, t = {}) {
  const n = String(t.lang || "en"), r = Pf(e, t.selectedModifiers), a = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  let o = Fr((e == null ? void 0 : e.nutrition) || Rh()), l = [];
  const i = [], u = [];
  a.forEach((m) => {
    Ug(m, r[m.id]).forEach((y) => {
      const v = (y == null ? void 0 : y.effect) || {};
      v.nutritionMultiplier !== void 0 && (o = Bg(o, v.nutritionMultiplier)), v.nutritionDelta && (o = Wg(o, v.nutritionDelta));
      const _ = Array.isArray(v.items) ? v.items : v.item ? [v.item] : [];
      _.length > 0 && (l = [...l, ..._]);
      const P = Qt(y == null ? void 0 : y.label, n) || (y == null ? void 0 : y.id) || "";
      i.push({
        groupId: String((m == null ? void 0 : m.id) || "").trim(),
        optionId: String((y == null ? void 0 : y.id) || "").trim(),
        label: P,
        selectionType: (m == null ? void 0 : m.selectionType) === "multi" ? "multi" : "single"
      }), y != null && y.includeInName && u.push(Qt((y == null ? void 0 : y.nameLabel) || (y == null ? void 0 : y.label), n));
    });
  });
  const c = Qt(e == null ? void 0 : e.name, n) || "Preset Meal", h = u.filter(Boolean).join(", ");
  return {
    id: String((e == null ? void 0 : e.id) || "").trim(),
    region: String((e == null ? void 0 : e.region) || "").trim(),
    name: h ? `${c} (${h})` : c,
    suggestedMealType: String((e == null ? void 0 : e.suggestedMealType) || "snack"),
    nutrition: ts(o),
    items: Kg(e == null ? void 0 : e.items, l, n),
    appliedModifiers: i,
    selectedModifiers: r
  };
}
function Vg(e, t = "en") {
  return Qt(e == null ? void 0 : e.name, t) || String((e == null ? void 0 : e.id) || "Preset Meal");
}
function Qg(e, t = "en") {
  return Qt(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Modifier");
}
function Yg(e, t = "en") {
  return Qt(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Option");
}
function Zg(e = "zh-TW") {
  return String(e || "zh-TW").toLowerCase().startsWith("en") ? "singapore" : "taiwan";
}
const ns = Object.freeze([
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
function Xg(e = {}) {
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
function If(e = {}) {
  return {
    ...e,
    nutrition: { ...e.nutrition || {} },
    items: Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [],
    modifierGroups: Array.isArray(e.modifierGroups) ? e.modifierGroups.map((t) => ({
      ...t,
      options: Array.isArray(t.options) ? t.options.map(Xg) : []
    })) : []
  };
}
function qg() {
  return ns.map(If);
}
function Jg(e) {
  const t = String(e || "").trim(), n = ns.find((r) => r.id === t);
  return n ? If(n) : null;
}
function ey() {
  return [...new Set(ns.map((e) => String(e.region || "").trim()).filter(Boolean))];
}
const ty = Object.freeze({
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
function ny(e = "en") {
  return String(e || "en").split("-")[0];
}
function ry(e, t = "en") {
  const n = ty[e] || {};
  return n[t] || n[ny(t)] || n.en || e;
}
function ay(e = "zh-TW") {
  return Zg(e);
}
function oy(e = "en") {
  return ey().map((t) => ({
    id: t,
    label: ry(t, e)
  }));
}
function ly(e = "", t = "en") {
  const n = String(e || "").trim();
  return qg().filter((r) => !n || r.region === n).map((r) => ({
    id: r.id,
    region: r.region,
    label: Vg(r, t),
    suggestedMealType: r.suggestedMealType
  }));
}
function iy({
  lang: e = "en",
  region: t = "",
  profileRegion: n = "",
  presetId: r = "",
  selectedModifiers: a = {}
} = {}) {
  var m;
  const o = t || String(n || "").trim() || ay(e), l = ly(o, e), i = r && l.some((f) => f.id === r) ? r : ((m = l[0]) == null ? void 0 : m.id) || "", u = Jg(i), c = u ? Pf(u, a) : {}, h = u ? Gg(u, {
    lang: e,
    selectedModifiers: c
  }) : null;
  return {
    regions: oy(e),
    selectedRegion: o,
    presets: l,
    selectedPresetId: i,
    modifierGroups: Array.isArray(u == null ? void 0 : u.modifierGroups) ? u.modifierGroups.map((f) => ({
      id: f.id,
      label: Qg(f, e),
      selectionType: f.selectionType === "multi" ? "multi" : "single",
      selectedValue: c[f.id] ?? (f.selectionType === "multi" ? [] : ""),
      options: (f.options || []).map((y) => ({
        id: y.id,
        label: Yg(y, e),
        selected: f.selectionType === "multi" ? (c[f.id] || []).includes(y.id) : c[f.id] === y.id
      }))
    })) : [],
    resolvedPreset: h
  };
}
const Uo = [
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
function sy({
  hour: e = (/* @__PURE__ */ new Date()).getHours(),
  minutesSinceLastOpen: t = 0,
  allQuestsComplete: n = !1,
  justLevelledUp: r = !1,
  ratio: a = 0,
  hoursWithoutLog: o = 0
} = {}) {
  return r ? Xn.celebrating : n ? Xn.excited : e >= 23 || e < 6 ? Xn.sleeping : t >= 1440 ? Xn.lonely : a < 0.1 && o >= 6 ? Xn.starving : null;
}
const Je = Object.freeze({
  TAP: "tap",
  LONG_PRESS: "long_press",
  COMBO: "combo"
}), la = Object.freeze({
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
function uy({ type: e, mood: t = "hungry", comboCount: n = 0, holdSeconds: r = 0 } = {}) {
  if (e === Je.TAP) {
    const a = la.tap;
    return a[t] || a.hungry;
  }
  if (e === Je.LONG_PRESS) {
    const a = la.long_press;
    for (let o = a.length - 1; o >= 0; o -= 1)
      if (r >= a[o].threshold) return a[o];
    return a[0];
  }
  if (e === Je.COMBO) {
    const a = la.combo;
    for (let o = a.length - 1; o >= 0; o -= 1)
      if (n >= a[o].threshold) return a[o];
    return a[0];
  }
  return la.tap.hungry;
}
const cy = Object.freeze({
  [Je.TAP]: 2e3,
  [Je.LONG_PRESS]: 5e3,
  [Je.COMBO]: 1e4
}), dy = Object.freeze([
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
function mr(e, t = 0, n = 100) {
  return Math.min(Math.max(e, t), n);
}
function zf(e = {}) {
  const t = Math.max(0, Math.round(be(e == null ? void 0 : e.xp))), n = Math.floor(t / 100) + 1;
  return {
    level: Math.max(1, Math.round(be(e == null ? void 0 : e.level, n)) || n),
    xp: t,
    mood: String((e == null ? void 0 : e.mood) || "hungry"),
    energy: mr(Math.round(be(e == null ? void 0 : e.energy))),
    bond: mr(Math.round(be(e == null ? void 0 : e.bond))),
    streak: Math.max(0, Math.round(be(e == null ? void 0 : e.streak)))
  };
}
function fy(e = []) {
  var n;
  if (!Array.isArray(e) || e.length === 0) return 0;
  let t = 0;
  for (let r = e.length - 1; r >= 0 && !(be((n = e[r]) == null ? void 0 : n.calories) <= 0); r -= 1)
    t += 1;
  return t;
}
function my({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0
} = {}) {
  const o = Math.max(0, be(e)), l = Math.max(0, be(t)), i = l > 0 ? Math.min(o / l, 1.4) : 0, u = Math.max(0, Math.round(be(n))), c = Math.max(0, Math.round(be(r))), h = mr(Math.round(be(a))), m = mr(Math.round(i * 90) + Math.min(u, 5) * 2), f = Math.round(Math.min(i, 1.1) * 80) + Math.min(u, 5) * 10 + Math.min(c, 7) * 5, y = Math.floor(f / 100) + 1, v = mr(h + Math.min(c, 7) * 5 + Math.min(u, 5) * 3);
  return zf({
    level: y,
    xp: f,
    mood: "hungry",
    energy: m,
    bond: v,
    streak: c
  });
}
function py({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0,
  overlayContext: o = null
} = {}) {
  const l = Math.max(0, be(e)), i = Math.max(0, be(t, 2e3)) || 2e3, u = Math.min(l / i, 1.4), c = Uo.find((y) => u >= y.minRatio) || Uo[Uo.length - 1], h = my({
    totalCalories: l,
    targetCalories: i,
    loggedMeals: n,
    streak: r,
    bond: a
  }), f = (o ? sy(o) : null) || c;
  return {
    key: f.key,
    ratio: u,
    frameKey: f.frameKey,
    messageKey: f.messageKey,
    mood: f.mood,
    baseKey: c.key,
    baseMood: c.mood,
    progress: zf({
      ...h,
      mood: f.mood
    })
  };
}
function hy(e = ge()) {
  var c;
  const t = $r((e == null ? void 0 : e.foodItems) || []), n = _f(7, e == null ? void 0 : e.selectedDate), r = Number(e == null ? void 0 : e.targetCalories) || 0, a = Math.max(0, Number((c = e == null ? void 0 : e.profile) == null ? void 0 : c.weight) || 0), o = (e == null ? void 0 : e.currentGoalType) || "lose", l = yg({
    total: t.totals,
    targetCalories: r,
    calorieHistory: n,
    goalType: o,
    weightKg: a
  }), i = fy(n), u = py({
    totalCalories: t.totals.cal,
    targetCalories: r,
    loggedMeals: Array.isArray(e == null ? void 0 : e.foodItems) ? e.foodItems.length : 0,
    streak: i
  });
  return {
    totals: t.totals,
    coach: l,
    calorieHistory: n,
    statusKey: u.key,
    frameKey: u.frameKey,
    messageKey: u.messageKey,
    progress: u.progress,
    interactionMessageKeys: dy
  };
}
const gy = Object.freeze([
  "calories",
  "protein",
  "carbohydrate",
  "fat"
]), yy = Object.freeze([
  Object.freeze({
    id: "quality",
    fields: Object.freeze(["fiber", "sugar", "sodium"])
  }),
  Object.freeze({
    id: "fatDetails",
    fields: Object.freeze(["saturatedFat", "transFat"])
  })
]), vy = Object.freeze({
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
function St(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Wu(e, t) {
  const n = t[e] ?? 0, r = e === "calories" || e === "sodium" ? Math.round(Number(n) || 0) : St(n);
  return {
    field: e,
    value: r,
    unit: vy[e] || ""
  };
}
function Sy(e = []) {
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
      return [r, r === "calories" || r === "sodium" ? Math.round(a) : St(a)];
    })
  );
}
function _y(e = {}) {
  const t = Te(e);
  return {
    nutrition: t,
    highlights: gy.map((n) => Wu(n, t)),
    sections: yy.map((n) => ({
      id: n.id,
      items: n.fields.map((r) => Wu(r, t))
    }))
  };
}
function wy({
  todayNutrition: e = {},
  nutritionHistory: t = [],
  proteinTarget: n = 0,
  fiberTarget: r = 25,
  sodiumLimit: a = 2300
} = {}) {
  const o = Te(e), l = (Array.isArray(t) ? t : []).map((f) => Te(f)).filter((f) => Object.values(f).some((y) => Number(y) > 0)), i = Sy(l), u = Math.max(0, St(n)), c = Math.max(0, St(r)), h = Math.max(0, Math.round(Number(a) || 0));
  let m = "balanced";
  return l.length === 0 && o.calories <= 0 ? m = "start_logging" : u > 0 && o.protein < u * 0.72 ? m = "protein" : o.fiber < Math.max(c * 0.72, 12) ? m = "fiber" : h > 0 && o.sodium > h && (m = "sodium"), {
    focusKey: m,
    loggedDays: l.length,
    averageNutrition: i,
    proteinTarget: u,
    fiberTarget: c,
    sodiumLimit: h,
    signals: [
      {
        key: "protein",
        current: St(o.protein),
        target: u,
        average: St(i.protein)
      },
      {
        key: "fiber",
        current: St(o.fiber),
        target: c,
        average: St(i.fiber)
      },
      {
        key: "sodium",
        current: Math.round(o.sodium),
        target: h,
        average: Math.round(i.sodium)
      }
    ]
  };
}
const co = Object.freeze({
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
function rs(e = {}) {
  return Fr({
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
function ky(e = 7, t) {
  return wf(e, t).map((n) => {
    const r = $r((n == null ? void 0 : n.items) || []);
    return rs(r.totals);
  }).filter((n) => Object.values(n).some((r) => Number(r) > 0));
}
function Ff(e) {
  return e && typeof e == "object" ? e : co;
}
function Of(e = co) {
  var a;
  const t = Ff(e), n = $r(t.foodItems), r = Math.max(0, Number((a = t.profile) == null ? void 0 : a.weight) || 0);
  return {
    selectedDate: t.selectedDate,
    targetCalories: Number(t.targetCalories) || 0,
    waterTarget: Math.round((r || 60) * 35),
    totals: n.totals
  };
}
function xy(e = co) {
  const t = Of(e), n = rs(t.totals), r = Number(t.targetCalories) || 0;
  return {
    nutrition: n,
    detail: _y(n),
    targetCalories: r,
    remainingCalories: r > 0 ? Math.round(r - n.calories) : 0,
    waterTarget: Number(t.waterTarget) || 0
  };
}
function Ty(e = co, { days: t = 7 } = {}) {
  var i, u;
  const n = Ff(e), r = Of(n), a = rs(r.totals), o = Math.max(0, Number((i = n == null ? void 0 : n.profile) == null ? void 0 : i.weight) || 0), l = uo(r.targetCalories, {
    weightKg: o,
    goalType: (n == null ? void 0 : n.currentGoalType) || ((u = n == null ? void 0 : n.profile) == null ? void 0 : u.goalType) || "lose"
  });
  return {
    days: t,
    nutrition: a,
    ...wy({
      todayNutrition: a,
      nutritionHistory: ky(t, n.selectedDate),
      proteinTarget: l.protein,
      fiberTarget: 25,
      sodiumLimit: 2300
    })
  };
}
function Hu(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Ny(e, t) {
  const n = hg(String((e == null ? void 0 : e.currentMealMode) || "4"), {}, Number(e == null ? void 0 : e.targetCalories) || 0), r = n.map((i) => i.type), a = new Set(
    ((t == null ? void 0 : t.foodItems) || []).map((i) => i == null ? void 0 : i.type).filter(Boolean)
  ), o = r.filter((i) => a.has(i)).length, l = n.find((i) => !a.has(i.type)) || null;
  return {
    plannedMealTypes: r,
    loggedMealTypes: [...a],
    loggedMeals: o,
    plannedMeals: n.length,
    nextMealType: (l == null ? void 0 : l.type) || "",
    nextMealTitleKey: (l == null ? void 0 : l.titleKey) || ""
  };
}
function by(e = ge()) {
  var P, p, d, g, S, x, C, N;
  const t = e || ge(), n = Ng(t), r = hy(t), a = Og(t, { days: 7 }), o = Math.max(0, Number((P = t == null ? void 0 : t.profile) == null ? void 0 : P.weight) || 0), l = uo(n.targetCalories, {
    weightKg: o,
    goalType: (t == null ? void 0 : t.currentGoalType) || ((p = t == null ? void 0 : t.profile) == null ? void 0 : p.goalType) || "lose"
  }), i = Math.max(0, Number(l.protein) || 0), u = Math.max(0, Number(l.fat) || 0), c = Math.max(0, Number(l.carb) || 0), h = Hu(n.totals.pro, 1), m = Math.max(0, Hu(i - h, 1)), f = Ny(t, n), y = Math.round(Math.max(0, (n.targetCalories || 0) - (n.totals.cal || 0))), v = iy({
    lang: (t == null ? void 0 : t.curLang) || "en",
    profileRegion: ((d = t == null ? void 0 : t.profile) == null ? void 0 : d.region) || ""
  }), _ = (v.regions || []).find((M) => M.id === v.selectedRegion);
  return {
    lang: (t == null ? void 0 : t.curLang) || "en",
    goalType: (t == null ? void 0 : t.currentGoalType) || ((g = t == null ? void 0 : t.profile) == null ? void 0 : g.goalType) || "lose",
    diningOutFrequency: String(((S = t == null ? void 0 : t.profile) == null ? void 0 : S.diningOutFrequency) || "sometimes"),
    targetCalories: n.targetCalories,
    remainingCalories: y,
    calorieProgressPercent: n.targetCalories > 0 ? Math.min(Math.round(n.totals.cal / n.targetCalories * 100), 199) : 0,
    presetRegion: v.selectedRegion,
    presetRegionLabel: (_ == null ? void 0 : _.label) || v.selectedRegion || "",
    presetCount: ((x = v.presets) == null ? void 0 : x.length) || 0,
    featuredPresetName: ((N = (C = v.presets) == null ? void 0 : C[0]) == null ? void 0 : N.label) || "",
    proteinTarget: i,
    proteinCurrent: h,
    proteinRemaining: m,
    fatTarget: u,
    carbTarget: c,
    mealCoverage: f,
    daily: n,
    pet: r,
    rhythm: a
  };
}
const Cy = ["breakfast", "lunch", "dinner", "snack"], Ko = Object.freeze({
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
});
function E(e, t = "") {
  return e == null ? t : String(e);
}
function Go(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function My(e = "en") {
  return Ko[e] || Ko[String(e || "en").split("-")[0]] || Ko.en;
}
function Vl(e, t) {
  var r;
  const n = pt(t);
  return ((r = n == null ? void 0 : n.meals) == null ? void 0 : r[e]) || e || "";
}
function jy(e) {
  return e === "zh-TW" || e === "zh-CN" ? "加入常吃" : "Save favorite";
}
function Ey(e) {
  return e === "zh-TW" ? "刪除餐點" : e === "zh-CN" ? "删除餐点" : "Delete meal";
}
function Ly(e, t, n) {
  const r = Qi(t), o = Cy.map((l) => {
    const i = e.filter((c) => c.mealType === l), u = i.reduce((c, h) => c + h.calories, 0);
    return {
      key: l,
      label: Vl(l, t),
      totalCalories: u,
      metaText: i.length > 0 ? r.mealGroupMeta(i.length, u) : n,
      items: i,
      emptyText: n
    };
  }).filter((l) => l.items.length > 0);
  return o.length > 0 ? o : [];
}
function Dy(e) {
  var P, p, d, g, S, x, C, N, M, O, D, ae, Y, ht, Bn, Br, nn, rn, T, L, A, W, Z, Ot, Ge, an, Ve, $t, cs, ds, fs, ms, ps, hs, gs, ys, vs, Ss, _s, ws, ks, xs, Ts, Ns, bs;
  const t = by(e), n = pt(t.lang), r = jg(t, t.lang), a = Qi(t.lang), o = My(t.lang), l = ((P = r.hero) == null ? void 0 : P.stats) || [], i = ((p = r.hero) == null ? void 0 : p.meta) || [], u = (((d = t.daily) == null ? void 0 : d.foodItems) || []).map((j, Wr) => {
    const on = (j == null ? void 0 : j.nutri) || (j == null ? void 0 : j.nutrition) || {}, fo = Number((on == null ? void 0 : on.calories) ?? (on == null ? void 0 : on.cal) ?? 0) || 0, mo = String((j == null ? void 0 : j.type) || "snack");
    return {
      id: `${mo}-${Wr}-${String((j == null ? void 0 : j.name) || "meal")}`.replace(/\s+/g, "-").toLowerCase(),
      sourceIndex: Wr,
      name: E((j == null ? void 0 : j.name) || (j == null ? void 0 : j.foodName), ""),
      mealType: mo,
      mealTypeLabel: Vl(mo, t.lang),
      calories: fo,
      portion: E((j == null ? void 0 : j.weight) || (j == null ? void 0 : j.portion) || "", ""),
      hint: fo > 0 ? `${Math.round(fo)} kcal` : (n == null ? void 0 : n.txtNoData) || ""
    };
  }).filter((j) => j.name || j.calories > 0), c = Ly(u, t.lang, a.emptyMeal), h = Ji(e.selectedDate, t.lang), m = fe(), f = u.reduce((j, Wr) => j + Wr.calories, 0), y = Go((S = (g = t.daily) == null ? void 0 : g.totals) == null ? void 0 : S.pro, 1), v = Go((C = (x = t.daily) == null ? void 0 : x.totals) == null ? void 0 : C.fat, 1), _ = Go((M = (N = t.daily) == null ? void 0 : N.totals) == null ? void 0 : M.carb, 1);
  return {
    companion: {
      ...t,
      pet: {
        ...t.pet,
        resolvedMessage: E(n == null ? void 0 : n[(O = t.pet) == null ? void 0 : O.messageKey], "") || E((D = t.pet) == null ? void 0 : D.messageKey, ""),
        equipped: ((ae = t.pet) == null ? void 0 : ae.equipped) || {}
      }
    },
    petStageCopy: {
      pet: a.pet || "Companion",
      bondLabel: E((Y = a.petStage) == null ? void 0 : Y.bondLabel, (n == null ? void 0 : n.petBondLabel) || "Bond"),
      energyLabel: E((ht = a.petStage) == null ? void 0 : ht.energyLabel, (n == null ? void 0 : n.petEnergyLabel) || "Energy"),
      streakLabel: E((Bn = a.petStage) == null ? void 0 : Bn.streakLabel, (n == null ? void 0 : n.petStreakLabel) || "Streak"),
      dayUnit: E((Br = a.petStage) == null ? void 0 : Br.dayUnit, (n == null ? void 0 : n.petDayUnit) || "d"),
      petTapLabel: E((nn = a.petStage) == null ? void 0 : nn.tapLabel, (n == null ? void 0 : n.petTapLabel) || "Interact with your companion")
    },
    resolveDialogText: (j) => E(n == null ? void 0 : n[j], ""),
    copy: {
      ...a,
      favoriteActionLabel: jy(t.lang),
      deleteActionLabel: Ey(t.lang),
      appName: E(a.appName, "Woof Cal"),
      screenTitle: E(a.screenTitle, a.today || "Today"),
      dailyCaloriesTitle: E(a.dailyCaloriesTitle, "Daily calories"),
      remainingLabel: E(a.remainingLabel, "Remaining"),
      macroFocusEyebrow: E(a.macroFocusEyebrow, "3 macro focus"),
      macroFocusTitle: E(a.macroFocusTitle, "Macros"),
      macroFocusHint: E(a.macroFocusHint, ""),
      mealDiaryEyebrow: E(a.mealDiaryEyebrow, o.mealDiaryTitle),
      previousDate: E(a.previousDate, "Previous date"),
      nextDate: E(a.nextDate, "Next date"),
      headlineEmpty: E(a.headlineEmpty, "Start your first meal"),
      headlineProgress: E(a.headlineProgress, "Nice momentum today"),
      headlineComplete: E(a.headlineComplete, "Great progress today")
    },
    hero: {
      eyebrow: E((rn = r.hero) == null ? void 0 : rn.eyebrow, ""),
      title: E((T = r.hero) == null ? void 0 : T.title, ""),
      summary: E((L = r.hero) == null ? void 0 : L.summary, ""),
      stats: l.map((j) => ({
        label: E(j == null ? void 0 : j.label, ""),
        value: E(j == null ? void 0 : j.value, "")
      })),
      meta: i.map((j) => E(j, "")).filter(Boolean),
      actions: {
        log: E((W = (A = r.hero) == null ? void 0 : A.actions) == null ? void 0 : W.log, "Log meal"),
        ai: E((Ot = (Z = r.hero) == null ? void 0 : Z.actions) == null ? void 0 : Ot.ai, "AI Analysis"),
        favorites: E((an = (Ge = r.hero) == null ? void 0 : Ge.actions) == null ? void 0 : an.favorites, "Favorites")
      }
    },
    quickLog: {
      title: E((Ve = r.logHub) == null ? void 0 : Ve.title, ""),
      summary: E(($t = r.logHub) == null ? void 0 : $t.summary, ""),
      favoritesCopy: E((cs = r.logHub) == null ? void 0 : cs.favoritesCopy, ""),
      todayMealsKicker: E((ds = r.logHub) == null ? void 0 : ds.todayMealsKicker, a.today),
      todayMealsTitle: E((fs = r.logHub) == null ? void 0 : fs.todayMealsTitle, a.today),
      todayMealsHint: E((ms = r.logHub) == null ? void 0 : ms.todayMealsHint, "")
    },
    overview: {
      title: E((ps = r.overview) == null ? void 0 : ps.title, ""),
      hint: E((hs = r.overview) == null ? void 0 : hs.hint, ""),
      signals: (((gs = r.overview) == null ? void 0 : gs.signals) || []).map((j) => ({
        label: E(j == null ? void 0 : j.label, ""),
        value: E(j == null ? void 0 : j.value, "--"),
        detail: E(j == null ? void 0 : j.detail, "")
      }))
    },
    todayMeals: {
      title: o.mealDiaryTitle,
      hint: u.length > 0 ? a.mealGroupMeta(u.length, f) : o.mealDiaryHint,
      kicker: E((ys = r.logHub) == null ? void 0 : ys.todayMealsKicker, a.today),
      actionLabel: h,
      dateLabel: h,
      dateControl: {
        value: e.selectedDate,
        label: h,
        max: m,
        nextDisabled: e.selectedDate >= m
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
      caloriesLabel: n.cal || ((vs = a.metrics) == null ? void 0 : vs.calories) || "Calories",
      caloriesValue: Number((_s = (Ss = t.daily) == null ? void 0 : Ss.totals) == null ? void 0 : _s.cal) || 0,
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
          value: _,
          unit: "g",
          color: "#79aef7"
        }
      ]
    },
    today: {
      calories: Number((ks = (ws = t.daily) == null ? void 0 : ws.totals) == null ? void 0 : ks.cal) || 0,
      targetCalories: Number(t.targetCalories) || 0,
      remainingCalories: Number(t.remainingCalories) || 0,
      calorieProgressPercent: Number(t.calorieProgressPercent) || 0,
      proteinCurrent: Number(t.proteinCurrent) || 0,
      proteinTarget: Number(t.proteinTarget) || 0,
      proteinRemaining: Number(t.proteinRemaining) || 0,
      fatCurrent: Number(v) || 0,
      fatTarget: Number(t.fatTarget) || 0,
      carbCurrent: Number(_) || 0,
      carbTarget: Number(t.carbTarget) || 0,
      loggedMeals: Number((xs = t.mealCoverage) == null ? void 0 : xs.loggedMeals) || 0,
      plannedMeals: Number((Ts = t.mealCoverage) == null ? void 0 : Ts.plannedMeals) || 0,
      nextMealType: Vl((Ns = t.mealCoverage) == null ? void 0 : Ns.nextMealType, t.lang),
      nextMealTitleKey: E((bs = t.mealCoverage) == null ? void 0 : bs.nextMealTitleKey, "")
    }
  };
}
function Ay() {
  const e = $n();
  return Dy(e);
}
function Py() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" }),
    /* @__PURE__ */ s.jsx("path", { d: "M12 18a2 2 0 0 1-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 0 1-2 2Z" })
  ] });
}
function $f() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
    /* @__PURE__ */ s.jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" }),
    /* @__PURE__ */ s.jsx("path", { d: "M8 7h8" }),
    /* @__PURE__ */ s.jsx("path", { d: "M8 11h5" })
  ] });
}
function Iy() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("ellipse", { cx: "8.5", cy: "6.5", rx: "1.8", ry: "2.2" }),
    /* @__PURE__ */ s.jsx("ellipse", { cx: "15.5", cy: "6.5", rx: "1.8", ry: "2.2" }),
    /* @__PURE__ */ s.jsx("ellipse", { cx: "5.5", cy: "11.5", rx: "1.5", ry: "2" }),
    /* @__PURE__ */ s.jsx("ellipse", { cx: "18.5", cy: "11.5", rx: "1.5", ry: "2" }),
    /* @__PURE__ */ s.jsx("path", { d: "M7 17c0-2.5 2-4.5 5-4.5s5 2 5 4.5c0 1.5-1.5 3-5 3s-5-1.5-5-3Z" })
  ] });
}
function zy() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M18 20V10" }),
    /* @__PURE__ */ s.jsx("path", { d: "M12 20V4" }),
    /* @__PURE__ */ s.jsx("path", { d: "M6 20v-6" })
  ] });
}
function Fy() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "7", r: "4" })
  ] });
}
const Oy = 3e3, Uu = 1500;
function $y({ mood: e = "hungry", onBondChange: t } = {}) {
  const [n, r] = X.useState(null), a = X.useRef(null), o = X.useRef({ count: 0, timer: null }), l = X.useRef({ startTime: 0, timer: null, active: !1 }), i = X.useCallback(() => {
    r(null);
  }, []), u = X.useCallback((f, y = {}) => {
    if (a.current) return;
    const v = uy({ type: f, mood: e, ...y });
    r({ type: f, ...v, timestamp: Date.now() }), v.bondDelta > 0 && typeof t == "function" && t(v.bondDelta);
    const _ = cy[f] || 2e3;
    a.current = setTimeout(() => {
      a.current = null;
    }, _);
  }, [e, t]), c = X.useCallback((f) => {
    f.preventDefault(), l.current.startTime = Date.now(), l.current.active = !0, l.current.timer = setTimeout(() => {
      if (!l.current.active) return;
      l.current.active = !1;
      const y = (Date.now() - l.current.startTime) / 1e3;
      u(Je.LONG_PRESS, { holdSeconds: y });
    }, Uu);
  }, [u]), h = X.useCallback(() => {
    if (!l.current.active) return;
    l.current.active = !1;
    const f = Date.now() - l.current.startTime;
    if (clearTimeout(l.current.timer), f >= Uu) {
      const y = f / 1e3;
      u(Je.LONG_PRESS, { holdSeconds: y });
      return;
    }
    if (o.current.count += 1, clearTimeout(o.current.timer), o.current.count >= 3) {
      const y = o.current.count;
      o.current.count = 0, u(Je.COMBO, { comboCount: y });
      return;
    }
    o.current.timer = setTimeout(() => {
      o.current.count = 0, u(Je.TAP);
    }, Oy);
  }, [u]), m = X.useCallback(() => {
    l.current.active = !1, clearTimeout(l.current.timer);
  }, []);
  return {
    interaction: n,
    clearInteraction: i,
    pointerHandlers: {
      onPointerDown: c,
      onPointerUp: h,
      onPointerCancel: m,
      onPointerLeave: m
    }
  };
}
const Ry = 3e3;
function By({ text: e, visible: t = !1, onDismiss: n }) {
  const [r, a] = X.useState(!1);
  return X.useEffect(() => {
    if (!t || !e) {
      a(!1);
      return;
    }
    a(!0);
    const o = setTimeout(() => {
      a(!1), typeof n == "function" && n();
    }, Ry);
    return () => clearTimeout(o);
  }, [t, e, n]), !r || !e ? null : /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__speech-bubble", "aria-live": "polite", children: [
    /* @__PURE__ */ s.jsx("span", { className: "woof-pet__speech-text", children: e }),
    /* @__PURE__ */ s.jsx("div", { className: "woof-pet__speech-tail", "aria-hidden": "true" })
  ] });
}
const Ku = {
  hearts: ["❤️", "💕", "💖"],
  stars: ["⭐", "✨", "🌟"],
  zzz: ["💤", "Z", "z"],
  sweat: ["💦", "😅"],
  confetti: ["🎉", "🎊", "✨", "🌟"],
  bounce: ["✨", "⭐"],
  spiral: ["💫", "😵‍💫"]
};
function Wy({ effect: e }) {
  if (!e || e === "none") return null;
  const t = Ku[e] || Ku.stars;
  return /* @__PURE__ */ s.jsx("div", { className: "woof-pet__particles", "aria-hidden": "true", children: t.map((n, r) => /* @__PURE__ */ s.jsx(
    "span",
    {
      className: `woof-pet__particle woof-pet__particle--${r}`,
      children: n
    },
    `${e}-${r}`
  )) });
}
const Gu = Object.freeze({
  hungry: "dog_animation/dog_sad.gif",
  low: "dog_animation/dog_idle.gif",
  mid: "dog_animation/dog_walk.gif",
  balanced: "dog_animation/dog_happy.gif",
  full: "dog_animation/dog_fat.gif",
  eating: "dog_animation/dog_eat.gif",
  // Extended states fall back to closest existing animation
  sleeping: "dog_animation/dog_idle.gif",
  lonely: "dog_animation/dog_sad.gif",
  excited: "dog_animation/dog_happy.gif",
  celebrating: "dog_animation/dog_happy.gif",
  starving: "dog_animation/dog_sad.gif"
});
function Hy(e = "low") {
  return Gu[e] || Gu.low;
}
function Uy(e, t) {
  const n = e - (t - 1) * 100;
  return `${Math.max(0, n)}/100`;
}
function Ky({
  pet: e = {},
  copy: t = {},
  resolveDialogText: n,
  onQuickLog: r
}) {
  const a = (e == null ? void 0 : e.mood) || (e == null ? void 0 : e.baseMood) || "hungry", o = (e == null ? void 0 : e.progress) || {}, [l, i] = X.useState(""), u = X.useCallback(() => {
  }, []), { interaction: c, clearInteraction: h, pointerHandlers: m } = $y({
    mood: a,
    onBondChange: u
  });
  X.useEffect(() => {
    if (!(c != null && c.animClass)) return;
    i(c.animClass);
    const v = setTimeout(() => i(""), 800);
    return () => clearTimeout(v);
  }, [c]);
  const f = c != null && c.dialogKey && typeof n == "function" ? n(c.dialogKey) : "", y = (e == null ? void 0 : e.equipped) || {};
  return Object.values(y).some(Boolean), /* @__PURE__ */ s.jsxs("section", { className: "woof-pet__stage", "aria-label": t.pet || "Companion", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__scene", children: [
      /* @__PURE__ */ s.jsx("div", { className: "woof-pet__orb", "aria-hidden": "true" }),
      /* @__PURE__ */ s.jsxs(
        "div",
        {
          className: `woof-pet__character ${l}`,
          ...m,
          role: "button",
          tabIndex: 0,
          "aria-label": t.petTapLabel || "Interact with pet",
          style: { touchAction: "none" },
          children: [
            /* @__PURE__ */ s.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--base",
                src: Hy(e == null ? void 0 : e.frameKey),
                alt: "",
                loading: "eager",
                decoding: "async",
                draggable: !1
              }
            ),
            y.outfit && /* @__PURE__ */ s.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--outfit",
                src: `costumes/${y.outfit}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                alt: "",
                draggable: !1
              }
            ),
            y.accessory && /* @__PURE__ */ s.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--accessory",
                src: `costumes/${y.accessory}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                alt: "",
                draggable: !1
              }
            ),
            y.headwear && /* @__PURE__ */ s.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--headwear",
                src: `costumes/${y.headwear}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                alt: "",
                draggable: !1
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ s.jsx(Wy, { effect: c == null ? void 0 : c.effect }),
      /* @__PURE__ */ s.jsx(
        By,
        {
          text: f,
          visible: !!c,
          onDismiss: h
        }
      )
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__stats", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__level-badge", children: [
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__level-label", children: "Lv." }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__level-value", children: o.level || 1 })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__xp-bar", children: [
        /* @__PURE__ */ s.jsx(
          "div",
          {
            className: "woof-pet__xp-fill",
            style: { width: `${Math.min((o.xp || 0) % 100, 100)}%` }
          }
        ),
        /* @__PURE__ */ s.jsxs("span", { className: "woof-pet__xp-text", children: [
          Uy(o.xp || 0, o.level || 1),
          " XP"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__meters", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__meter", title: t.bondLabel || "Bond", children: [
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "❤️" }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-label", children: t.bondLabel || "Bond" }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-value", children: o.bond || 0 })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__meter", title: t.energyLabel || "Energy", children: [
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "⚡" }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-label", children: t.energyLabel || "Energy" }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-value", children: o.energy || 0 })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "woof-pet__meter", title: t.streakLabel || "Streak", children: [
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "🔥" }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-pet__meter-label", children: t.streakLabel || "Streak" }),
        /* @__PURE__ */ s.jsxs("span", { className: "woof-pet__meter-value", children: [
          o.streak || 0,
          t.dayUnit || "d"
        ] })
      ] })
    ] })
  ] });
}
function Xe() {
}
function Ql(e) {
  const t = Math.round((Number(e) || 0) * 10) / 10;
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
}
function Gy({
  name: e,
  calories: t,
  portion: n,
  favoriteLabel: r,
  deleteLabel: a,
  onFavorite: o = Xe,
  onDelete: l = Xe
}) {
  return /* @__PURE__ */ s.jsxs("div", { className: "woof-home__meal-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "woof-home__meal-row-main", children: [
      /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-name", children: e }),
      n ? /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-portion", children: n }) : null
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "woof-home__meal-row-side", children: [
      /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-calories", children: t > 0 ? `${Math.round(t)} kcal` : "--" }),
      /* @__PURE__ */ s.jsxs("div", { className: "woof-home__meal-row-actions", children: [
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "woof-home__meal-action woof-home__meal-action--favorite",
            onClick: o,
            "aria-label": r,
            title: r,
            children: /* @__PURE__ */ s.jsx("span", { className: "woof-home__meal-action-icon", "aria-hidden": "true", children: "♡" })
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            type: "button",
            className: "woof-home__meal-action woof-home__meal-action--delete",
            onClick: l,
            "aria-label": a,
            title: a,
            children: /* @__PURE__ */ s.jsx("span", { className: "woof-home__meal-action-icon", "aria-hidden": "true", children: "×" })
          }
        )
      ] })
    ] })
  ] });
}
function Vy({
  group: e,
  favoriteLabel: t,
  deleteLabel: n,
  onFavoriteMeal: r = Xe,
  onDeleteMeal: a = Xe
}) {
  const o = e.items || [], l = o.length > 0, i = e.metaText || e.emptyText;
  return /* @__PURE__ */ s.jsxs("div", { className: "woof-home__meal-group", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "woof-home__meal-group-header", children: [
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-type", children: e.label }),
        /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-group-meta", children: i })
      ] }),
      l ? /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-group-total", children: e.totalCalories > 0 ? `${Math.round(e.totalCalories)} kcal` : "--" }) : null
    ] }),
    l ? /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-list", children: o.map((u) => /* @__PURE__ */ s.jsx(
      Gy,
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
    )) }) : /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-group-empty", children: e.emptyText })
  ] });
}
function Qy({
  control: e,
  changeLabel: t,
  previousLabel: n,
  nextLabel: r,
  onShiftDate: a,
  onSelectDate: o
}) {
  return e ? /* @__PURE__ */ s.jsxs("div", { className: "woof-home__date-nav", "aria-label": t, children: [
    /* @__PURE__ */ s.jsx(
      "button",
      {
        type: "button",
        className: "woof-home__date-nav-button",
        onClick: () => a(-1),
        "aria-label": n,
        children: "‹"
      }
    ),
    /* @__PURE__ */ s.jsxs("label", { className: "woof-home__date-pill", title: e.label, children: [
      /* @__PURE__ */ s.jsx("span", { children: e.label }),
      /* @__PURE__ */ s.jsx("span", { className: "woof-home__date-pill-caret", "aria-hidden": "true", children: "▾" }),
      /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsx(
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
function Yy({ progress: e = 0, calories: t = "--", target: n = "--" }) {
  const a = 2 * Math.PI * 42, l = Math.max(0, Math.min(Number(e) || 0, 100)) / 100 * a;
  return /* @__PURE__ */ s.jsxs("div", { className: "woof-home__progress-ring", "aria-hidden": "true", children: [
    /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 120 120", className: "woof-home__progress-ring-svg", children: [
      /* @__PURE__ */ s.jsx("circle", { className: "woof-home__progress-ring-track", cx: "60", cy: "60", r: 42 }),
      /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsxs("div", { className: "woof-home__progress-ring-center", children: [
      /* @__PURE__ */ s.jsx("div", { className: "woof-home__progress-ring-calories", children: t }),
      /* @__PURE__ */ s.jsxs("div", { className: "woof-home__progress-ring-target", children: [
        "/ ",
        n
      ] })
    ] })
  ] });
}
function Zy({ label: e, value: t = 0, target: n = 0, tone: r = "protein" }) {
  const a = Math.max(Number(n) || 0, 0), o = Math.max(Number(t) || 0, 0), l = a > 0 ? Math.min(o / a * 100, 100) : 0;
  return /* @__PURE__ */ s.jsxs("div", { className: "woof-home__macro-progress-row", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "woof-home__macro-progress-head", children: [
      /* @__PURE__ */ s.jsx("span", { className: "woof-home__macro-progress-label", children: e }),
      /* @__PURE__ */ s.jsx("span", { className: "woof-home__macro-progress-value", children: `${Ql(o)}g / ${Ql(a)}g` })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "woof-home__macro-progress-track", children: /* @__PURE__ */ s.jsx(
      "div",
      {
        className: `woof-home__macro-progress-fill woof-home__macro-progress-fill--${r}`,
        style: { width: `${l}%` }
      }
    ) })
  ] });
}
function Xy({ label: e, value: t }) {
  return /* @__PURE__ */ s.jsxs("div", { className: "woof-home__motivation-stat", children: [
    /* @__PURE__ */ s.jsx("div", { className: "woof-home__motivation-stat-value", children: t }),
    /* @__PURE__ */ s.jsx("div", { className: "woof-home__motivation-stat-label", children: e })
  ] });
}
function qy({
  onQuickLog: e = Xe,
  onSetSelectedDate: t = Xe,
  onShiftDate: n = Xe,
  onFavoriteMealItem: r = Xe,
  onDeleteMealItem: a = Xe,
  onOpenDailySummary: o = Xe
}) {
  var N, M, O, D, ae;
  const l = Ay(), { copy: i, dashboard: u, hero: c, quickLog: h, todayMeals: m, today: f, companion: y, petStageCopy: v, resolveDialogText: _ } = l, P = m.groups || [], p = m.count > 0, d = f.targetCalories > 0 ? i.caloriesRemaining(f.remainingCalories) : "--", g = f.calorieProgressPercent >= 70 ? i.headlineComplete : f.calorieProgressPercent > 0 ? i.headlineProgress : i.headlineEmpty, S = [
    {
      key: "protein",
      label: (N = u.macros[0]) == null ? void 0 : N.label,
      value: f.proteinCurrent,
      target: f.proteinTarget,
      tone: "protein"
    },
    {
      key: "carbs",
      label: (M = u.macros[2]) == null ? void 0 : M.label,
      value: f.carbCurrent,
      target: f.carbTarget,
      tone: "carb"
    },
    {
      key: "fat",
      label: (O = u.macros[1]) == null ? void 0 : O.label,
      value: f.fatCurrent,
      target: f.fatTarget,
      tone: "fat"
    }
  ], x = f.plannedMeals > 0 ? `${f.loggedMeals}/${f.plannedMeals}` : String(f.loggedMeals), C = [
    { label: i.metrics.meals, value: x },
    { label: i.metrics.protein, value: `${Ql(f.proteinCurrent)}g` },
    { label: i.remainingLabel, value: d }
  ];
  return /* @__PURE__ */ s.jsxs("main", { className: "woof-home", "data-surface": "home", children: [
    /* @__PURE__ */ s.jsx("header", { className: "woof-home__today-header", children: /* @__PURE__ */ s.jsxs("div", { className: "woof-home__today-brand", children: [
      /* @__PURE__ */ s.jsx(
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
      /* @__PURE__ */ s.jsxs("div", { children: [
        /* @__PURE__ */ s.jsx("div", { className: "woof-home__today-kicker", children: i.appName }),
        /* @__PURE__ */ s.jsx("h1", { className: "woof-home__today-title", children: i.screenTitle }),
        /* @__PURE__ */ s.jsx("p", { className: "woof-home__today-date", children: ((D = m.dateControl) == null ? void 0 : D.label) || i.today })
      ] })
    ] }) }),
    /* @__PURE__ */ s.jsx(
      Ky,
      {
        pet: y.pet,
        copy: v || {},
        resolveDialogText: _,
        onQuickLog: e
      }
    ),
    /* @__PURE__ */ s.jsx("section", { className: "woof-home__motivation-banner", "aria-label": i.pet, children: /* @__PURE__ */ s.jsxs("div", { className: "woof-home__motivation-copy", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "woof-home__motivation-badge", children: [
        /* @__PURE__ */ s.jsx("span", { className: "woof-home__motivation-badge-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(Iy, {}) }),
        /* @__PURE__ */ s.jsx("span", { children: c.eyebrow || i.pet })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "woof-home__motivation-title", children: g }),
      /* @__PURE__ */ s.jsx("p", { className: "woof-home__motivation-summary", children: ((ae = y.pet) == null ? void 0 : ae.resolvedMessage) || c.summary }),
      /* @__PURE__ */ s.jsx("div", { className: "woof-home__motivation-stats", children: C.map((Y) => /* @__PURE__ */ s.jsx(Xy, { label: Y.label, value: Y.value }, Y.label)) }),
      /* @__PURE__ */ s.jsxs("div", { className: "woof-home__motivation-footer", children: [
        /* @__PURE__ */ s.jsx("div", { className: "woof-home__motivation-next", children: f.nextMealType || h.title || i.quickLog }),
        /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsxs("button", { type: "button", className: "woof-home__dashboard-card", onClick: o, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "woof-home__dashboard-head", children: [
        /* @__PURE__ */ s.jsx("span", { className: "woof-home__section-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(Py, {}) }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-home__dashboard-head-title", children: i.dailyCaloriesTitle }),
        /* @__PURE__ */ s.jsx("span", { className: "woof-home__dashboard-head-progress", children: `${f.calorieProgressPercent}%` })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "woof-home__dashboard-layout", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "woof-home__dashboard-ring-col", children: [
          /* @__PURE__ */ s.jsx(
            Yy,
            {
              progress: f.calorieProgressPercent,
              calories: Math.round(u.caloriesValue || 0),
              target: Math.round(f.targetCalories || 0)
            }
          ),
          /* @__PURE__ */ s.jsxs("div", { className: "woof-home__dashboard-ring-meta", children: [
            /* @__PURE__ */ s.jsx("div", { className: "woof-home__dashboard-ring-label", children: i.remainingLabel }),
            /* @__PURE__ */ s.jsx("div", { className: "woof-home__dashboard-ring-value", children: d })
          ] })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "woof-home__dashboard-macro-col", children: S.map((Y) => /* @__PURE__ */ s.jsx(
          Zy,
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
    /* @__PURE__ */ s.jsxs("section", { className: "woof-home__today", "aria-label": m.title, children: [
      /* @__PURE__ */ s.jsxs("div", { className: "woof-home__diary-header", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "woof-home__diary-title-group", children: [
          /* @__PURE__ */ s.jsx("span", { className: "woof-home__section-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx($f, {}) }),
          /* @__PURE__ */ s.jsx("h2", { className: "woof-home__section-title", children: m.title })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "woof-home__diary-controls", children: [
          /* @__PURE__ */ s.jsx(
            Qy,
            {
              control: m.dateControl,
              changeLabel: i.changeDate,
              previousLabel: i.previousDate,
              nextLabel: i.nextDate,
              onShiftDate: n,
              onSelectDate: t
            }
          ),
          /* @__PURE__ */ s.jsx(
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
      p ? /* @__PURE__ */ s.jsx("div", { className: "woof-home__meal-group-list", children: P.map((Y) => /* @__PURE__ */ s.jsx(
        Vy,
        {
          group: Y,
          favoriteLabel: i.favoriteActionLabel,
          deleteLabel: i.deleteActionLabel,
          onFavoriteMeal: r,
          onDeleteMeal: a
        },
        Y.key
      )) }) : /* @__PURE__ */ s.jsxs("div", { className: "woof-home__empty-state woof-home__today-empty", children: [
        /* @__PURE__ */ s.jsx("div", { className: "woof-home__empty-title", children: i.companion }),
        /* @__PURE__ */ s.jsx("p", { className: "woof-home__empty-copy", children: m.hint || h.summary })
      ] })
    ] })
  ] });
}
function nt() {
}
function Jy({
  onQuickLog: e = nt,
  onOpenAI: t = nt,
  onOpenFavorites: n = nt,
  onSetSelectedDate: r = nt,
  onShiftDate: a = nt,
  onFavoriteMealItem: o = nt,
  onDeleteMealItem: l = nt,
  onOpenRhythm: i = nt,
  onOpenDailySummary: u = nt
}) {
  return /* @__PURE__ */ s.jsx(
    qy,
    {
      onQuickLog: e,
      onOpenAI: t,
      onOpenFavorites: n,
      onSetSelectedDate: r,
      onShiftDate: a,
      onFavoriteMealItem: o,
      onDeleteMealItem: l,
      onOpenRhythm: i,
      onOpenDailySummary: u
    }
  );
}
const ev = Object.freeze(["photo", "text", "manual"]), tv = Object.freeze(["breakfast", "lunch", "dinner", "snack"]), Rf = "photo", Bf = "breakfast", nv = Object.freeze({
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
    return Rf;
  },
  getAddMealType() {
    return Bf;
  }
}), Vo = Object.freeze({
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
function rv(e, t) {
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
  return ((e = globalThis.window) == null ? void 0 : e.__woofAddBridge) || nv;
}
function av() {
  var t, n;
  const e = (n = (t = wn()).getAddMode) == null ? void 0 : n.call(t);
  return ev.includes(e) ? e : Rf;
}
function ov() {
  var t, n;
  const e = (n = (t = wn()).getAddMealType) == null ? void 0 : n.call(t);
  return tv.includes(e) ? e : Bf;
}
function lv(e = "en") {
  return Vo[e] || Vo[String(e || "en").split("-")[0]] || Vo.en;
}
function Wf() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M4 8.5h3l1.5-2h7L17 8.5h3A1.5 1.5 0 0 1 21.5 10v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" }),
    /* @__PURE__ */ s.jsx("circle", { cx: "12", cy: "13.2", r: "3.5" })
  ] });
}
function iv() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M5 6.5h14" }),
    /* @__PURE__ */ s.jsx("path", { d: "M9 6.5v11" }),
    /* @__PURE__ */ s.jsx("path", { d: "M15 6.5v11" }),
    /* @__PURE__ */ s.jsx("path", { d: "M7 17.5h10" })
  ] });
}
function sv() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M4 20l3.6-.7L18 8.9l-2.9-2.9L4.7 16.4 4 20Z" }),
    /* @__PURE__ */ s.jsx("path", { d: "m13.8 7.3 2.9 2.9" })
  ] });
}
function uv() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M5 16a7 7 0 0 1 14 0" }),
    /* @__PURE__ */ s.jsx("path", { d: "M3 16h18" }),
    /* @__PURE__ */ s.jsx("path", { d: "M12 5.5v3" }),
    /* @__PURE__ */ s.jsx("path", { d: "M6.5 8.5 8 10" }),
    /* @__PURE__ */ s.jsx("path", { d: "m17.5 8.5-1.5 1.5" })
  ] });
}
function cv() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M4 12.5h16a7 7 0 0 1-16 0Z" }),
    /* @__PURE__ */ s.jsx("path", { d: "M7 17.5h10" }),
    /* @__PURE__ */ s.jsx("path", { d: "M9 6.5c0 1 .6 1.6 1.6 1.6S12.2 7.5 12.2 6.5" }),
    /* @__PURE__ */ s.jsx("path", { d: "M13.3 5.7c0 1 .6 1.6 1.6 1.6s1.6-.6 1.6-1.6" })
  ] });
}
function dv() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M6 15.5a6 6 0 1 0 8-8 5.5 5.5 0 1 1-8 8Z" }),
    /* @__PURE__ */ s.jsx("path", { d: "M15.5 17.5H20" }),
    /* @__PURE__ */ s.jsx("path", { d: "M18 15v5" })
  ] });
}
function fv() {
  return /* @__PURE__ */ s.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ s.jsx("path", { d: "M12 4.5c2.8 0 5 2.2 5 5 0 5-5 9-5 9s-5-4-5-9c0-2.8 2.2-5 5-5Z" }),
    /* @__PURE__ */ s.jsx("path", { d: "M12 8.3v2.8" }),
    /* @__PURE__ */ s.jsx("path", { d: "M10.6 9.7h2.8" })
  ] });
}
function mv({ mode: e }) {
  return e === "photo" ? /* @__PURE__ */ s.jsx(Wf, {}) : e === "text" ? /* @__PURE__ */ s.jsx(iv, {}) : /* @__PURE__ */ s.jsx(sv, {});
}
function pv({ mealType: e }) {
  return e === "breakfast" ? /* @__PURE__ */ s.jsx(uv, {}) : e === "lunch" ? /* @__PURE__ */ s.jsx(cv, {}) : e === "dinner" ? /* @__PURE__ */ s.jsx(dv, {}) : /* @__PURE__ */ s.jsx(fv, {});
}
function hv({ copy: e, t, onAnalyze: n }) {
  return /* @__PURE__ */ s.jsxs("div", { id: "add-analysis-actions", className: "add-shell-card add-shell-card--analysis", children: [
    /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: e.analysisTitle }),
    /* @__PURE__ */ s.jsx("div", { id: "turnstile-widget", "aria-hidden": "true" }),
    /* @__PURE__ */ s.jsx("div", { id: "turnstile-status-note", className: "ai-status-note", hidden: !0 }),
    /* @__PURE__ */ s.jsx("button", { id: "analyze-btn", className: "btn-analyze", type: "button", onClick: n, children: /* @__PURE__ */ s.jsx("span", { id: "txt-analyze-btn", children: t.btnAnalyze || "Analyze meal" }) }),
    /* @__PURE__ */ s.jsx("div", { className: "loading-spinner", id: "ai-loading", children: /* @__PURE__ */ s.jsx("span", { id: "txt-ai-loading", children: t.aiLoading || "AI is analyzing the meal..." }) })
  ] });
}
function gv() {
  const e = $n(), t = pt(e.curLang), n = lv(e.curLang), r = t.meals || {}, a = wn(), [o, l] = de.useState(av), [i, u] = de.useState(ov), c = de.useRef(null), h = [
    { id: "photo", label: n.modes.photo },
    { id: "text", label: n.modes.text },
    { id: "manual", label: n.modes.manual }
  ], m = [
    { id: "breakfast", label: r.breakfast || "Breakfast" },
    { id: "lunch", label: r.lunch || "Lunch" },
    { id: "dinner", label: r.dinner || "Dinner" },
    { id: "snack", label: r.snack || "Snack" }
  ], f = o === "photo" || o === "text";
  return de.useEffect(() => rv(l, u), []), de.useEffect(() => {
    var v, _, P;
    const y = wn();
    (v = y.updateMealUI) == null || v.call(y), (_ = y.setAddMealType) == null || _.call(y, i), (P = y.setAddMode) == null || P.call(y, o);
  }, [i, o, e.curLang, e.currentMealMode, e.targetCalories]), /* @__PURE__ */ s.jsxs("div", { "data-add-react-surface": "true", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "surface-heading", children: [
      /* @__PURE__ */ s.jsx("div", { className: "surface-heading__eyebrow", children: n.eyebrow }),
      /* @__PURE__ */ s.jsx("h1", { className: "surface-heading__title", children: n.title }),
      /* @__PURE__ */ s.jsx("p", { className: "surface-heading__copy", children: n.summary })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "add-shell-card", children: /* @__PURE__ */ s.jsx("div", { className: "add-mode-switch", role: "tablist", "aria-label": n.modeLabel, children: h.map((y) => /* @__PURE__ */ s.jsxs(
      "button",
      {
        type: "button",
        className: `add-mode-pill${o === y.id ? " is-active" : ""}`,
        "data-add-mode": y.id,
        "aria-pressed": String(o === y.id),
        onClick: () => {
          var v, _;
          l(y.id), (_ = (v = wn()).setAddMode) == null || _.call(v, y.id);
        },
        children: [
          /* @__PURE__ */ s.jsx("span", { className: "add-mode-pill__icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(mv, { mode: y.id }) }),
          /* @__PURE__ */ s.jsx("span", { children: y.label })
        ]
      },
      y.id
    )) }) }),
    /* @__PURE__ */ s.jsxs("div", { className: "add-shell-card", children: [
      /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: n.mealTypeTitle }),
      /* @__PURE__ */ s.jsx("div", { className: "add-meal-type-grid", children: m.map((y) => /* @__PURE__ */ s.jsxs(
        "button",
        {
          type: "button",
          className: `add-meal-type-chip${i === y.id ? " is-active" : ""}`,
          "data-add-meal-type": y.id,
          "aria-pressed": String(i === y.id),
          onClick: () => {
            var v, _;
            u(y.id), (_ = (v = wn()).setAddMealType) == null || _.call(v, y.id);
          },
          children: [
            /* @__PURE__ */ s.jsx("span", { className: "add-meal-type-chip__icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(pv, { mealType: y.id }) }),
            /* @__PURE__ */ s.jsx("span", { children: y.label })
          ]
        },
        y.id
      )) })
    ] }),
    o === "photo" ? /* @__PURE__ */ s.jsx("section", { id: "add-panel-photo", className: "add-panel-surface", children: /* @__PURE__ */ s.jsxs("div", { className: "add-panel-card add-panel-card--upload", children: [
      /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: n.photoTitle }),
      /* @__PURE__ */ s.jsxs("div", { className: "add-upload-dropzone", children: [
        /* @__PURE__ */ s.jsx("div", { className: "add-upload-dropzone__icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(Wf, {}) }),
        /* @__PURE__ */ s.jsx("div", { className: "add-upload-dropzone__title", children: n.photoDropzoneTitle }),
        /* @__PURE__ */ s.jsx("div", { className: "add-upload-dropzone__copy", children: n.photoDropzoneCopy }),
        /* @__PURE__ */ s.jsx(
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
        /* @__PURE__ */ s.jsx(
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
      /* @__PURE__ */ s.jsx("img", { id: "image-preview", className: "add-upload-preview", alt: "" }),
      /* @__PURE__ */ s.jsxs("div", { id: "ai-desc-group", className: "add-description-group", children: [
        /* @__PURE__ */ s.jsx("label", { htmlFor: "ai-desc", children: n.photoNotesLabel }),
        /* @__PURE__ */ s.jsx(
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
    o === "text" ? /* @__PURE__ */ s.jsx("section", { id: "add-panel-text", className: "add-panel-surface", children: /* @__PURE__ */ s.jsxs("div", { className: "add-panel-card", children: [
      /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: n.textTitle }),
      /* @__PURE__ */ s.jsxs("div", { id: "ai-text-only-group", className: "add-text-group", children: [
        /* @__PURE__ */ s.jsx("label", { id: "txt-text-ai-label", htmlFor: "ai-text-desc", children: n.textLabel }),
        /* @__PURE__ */ s.jsx(
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
    f ? /* @__PURE__ */ s.jsx(
      hv,
      {
        copy: n,
        t,
        onAnalyze: () => a.startAnalysis()
      }
    ) : null,
    o === "manual" ? /* @__PURE__ */ s.jsx("section", { id: "add-panel-manual", className: "add-panel-surface", children: /* @__PURE__ */ s.jsxs("div", { className: "add-panel-card", children: [
      /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: n.manualTitle }),
      /* @__PURE__ */ s.jsx("p", { className: "add-manual-copy", children: n.manualCopy }),
      /* @__PURE__ */ s.jsxs("div", { className: "home-log-form home-log-form--inline", children: [
        /* @__PURE__ */ s.jsx("label", { htmlFor: "manual-name", children: n.manualDetailsLabel }),
        /* @__PURE__ */ s.jsxs("div", { className: "manual-grid", children: [
          /* @__PURE__ */ s.jsx("input", { type: "text", id: "manual-name", placeholder: n.manualNamePlaceholder }),
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-cal", placeholder: n.manualCaloriesPlaceholder })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "small-input-group", children: [
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-pro", placeholder: t.phPro || "Protein" }),
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-fat", placeholder: t.phFat || "Fat" }),
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-carb", placeholder: t.phCarb || "Carbs" }),
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-sugar", placeholder: t.phSugar || "Sugar" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "small-input-group", children: [
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-sod", placeholder: t.phSod || "Sodium" }),
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-sat", placeholder: t.phSat || "Sat. fat" }),
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-trans", placeholder: t.phTrans || "Trans fat" }),
          /* @__PURE__ */ s.jsx("input", { type: "number", id: "manual-fiber", placeholder: t.phFiber || t.fiber || "Fiber" })
        ] }),
        /* @__PURE__ */ s.jsx("select", { id: "manual-type", className: "manual-type-select", "aria-label": n.manualTypeLabel }),
        /* @__PURE__ */ s.jsxs("div", { className: "add-manual-actions", children: [
          /* @__PURE__ */ s.jsx("button", { id: "btn-add-record", type: "button", onClick: () => a.addManualFood(), children: n.addRecord }),
          /* @__PURE__ */ s.jsx(
            "button",
            {
              className: "btn-fav-save",
              id: "btn-fav-save-main",
              type: "button",
              onClick: () => a.saveToFavorites(),
              children: n.saveFavorite
            }
          ),
          /* @__PURE__ */ s.jsx(
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
function as(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = as(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
const os = {
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
}, yv = as(os, {
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
}), vv = as(os, {
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
}), Qo = {
  en: os,
  "zh-TW": yv,
  "zh-CN": vv
};
function Sv(e = "en") {
  return Qo[e] || Qo[String(e || "en").split("-")[0]] || Qo.en;
}
const Vu = Object.freeze(["breakfast", "lunch", "dinner", "snack"]), _v = Object.freeze({
  breakfast: "☕",
  lunch: "🥗",
  dinner: "🍕",
  snack: "🍎"
});
function Yo(e) {
  return `${Math.round(Number(e) || 0)}`;
}
function sn(e) {
  const t = Math.round((Number(e) || 0) * 10) / 10;
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
}
function wv(e, t) {
  return e >= 90 ? t.statusGreat : e >= 60 ? t.statusOnTrack : e > 0 ? t.statusKeepGoing : t.statusStart;
}
function kv(e, t) {
  var n;
  return ((n = t == null ? void 0 : t.meals) == null ? void 0 : n[e]) || e;
}
function xv(e = [], t = "Untitled meal") {
  return e.map((n, r) => {
    var a, o, l, i, u, c, h;
    return {
      id: `${String((n == null ? void 0 : n.type) || "snack")}-${r}`,
      index: r,
      type: String((n == null ? void 0 : n.type) || "snack"),
      name: String((n == null ? void 0 : n.name) || "").trim() || t,
      calories: Number(((a = n == null ? void 0 : n.nutri) == null ? void 0 : a.calories) ?? ((o = n == null ? void 0 : n.nutri) == null ? void 0 : o.cal) ?? 0) || 0,
      protein: Number(((l = n == null ? void 0 : n.nutri) == null ? void 0 : l.protein) ?? ((i = n == null ? void 0 : n.nutri) == null ? void 0 : i.pro) ?? 0) || 0,
      carb: Number(((u = n == null ? void 0 : n.nutri) == null ? void 0 : u.carbohydrate) ?? ((c = n == null ? void 0 : n.nutri) == null ? void 0 : c.carb) ?? 0) || 0,
      fat: Number(((h = n == null ? void 0 : n.nutri) == null ? void 0 : h.fat) ?? 0) || 0
    };
  }).sort((n, r) => Vu.indexOf(n.type) - Vu.indexOf(r.type) || n.index - r.index);
}
function Tv(e = []) {
  return e.reduce((t, n) => {
    const r = (n == null ? void 0 : n.nutri) || {};
    return t.cal += Number(r.calories) || 0, t.pro += Number(r.protein) || 0, t.carb += Number(r.carbohydrate) || 0, t.fat += Number(r.fat) || 0, t;
  }, { cal: 0, pro: 0, carb: 0, fat: 0 });
}
function Nv() {
  const e = $n(), t = pt(e.curLang), n = Sv(e.curLang), r = Tv(e.foodItems), a = Number(r.cal) || 0, o = Number(e.targetCalories) || 0, l = o > 0 ? Math.min(Math.round(a / o * 100), 100) : 0, i = xv(e.foodItems, n.untitledMeal);
  return /* @__PURE__ */ s.jsxs("div", { "data-history-react-surface": "true", children: [
    /* @__PURE__ */ s.jsxs("section", { className: "history-summary-card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "history-summary-card__copy", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "section-kicker-row", children: [
          /* @__PURE__ */ s.jsx("span", { className: "section-kicker-icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx($f, {}) }),
          /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: n.dailySummary })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "history-summary-card__total", children: `${Yo(a)} cal` }),
        /* @__PURE__ */ s.jsx("div", { className: "history-summary-card__target", children: o > 0 ? n.ofTarget(Yo(o)) : n.setGoal }),
        /* @__PURE__ */ s.jsx("div", { className: "history-summary-card__status", children: wv(l, n) }),
        /* @__PURE__ */ s.jsxs("div", { className: "history-summary-card__macro-row", children: [
          /* @__PURE__ */ s.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ s.jsx("span", { className: "history-summary-card__macro-label", children: n.protein }),
            /* @__PURE__ */ s.jsx("span", { children: `${sn(r.pro)}g` })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ s.jsx("span", { className: "history-summary-card__macro-label", children: n.carbs }),
            /* @__PURE__ */ s.jsx("span", { children: `${sn(r.carb)}g` })
          ] }),
          /* @__PURE__ */ s.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ s.jsx("span", { className: "history-summary-card__macro-label", children: n.fats }),
            /* @__PURE__ */ s.jsx("span", { children: `${sn(r.fat)}g` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "history-summary-ring", style: { "--history-progress": `${l}%` }, children: /* @__PURE__ */ s.jsx("div", { className: "history-summary-ring__inner", children: /* @__PURE__ */ s.jsx("span", { children: `${l}%` }) }) })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "history-entry-list", children: i.length > 0 ? i.map((u) => /* @__PURE__ */ s.jsxs("article", { className: "history-log-card", children: [
      /* @__PURE__ */ s.jsx("div", { className: `history-log-card__icon history-log-card__icon--${u.type}`, children: _v[u.type] || "🍽" }),
      /* @__PURE__ */ s.jsxs("div", { className: "history-log-card__body", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "history-log-card__head", children: [
          /* @__PURE__ */ s.jsx("div", { className: "history-log-card__title", children: u.name }),
          /* @__PURE__ */ s.jsx("div", { className: "history-log-card__calories", children: `${Yo(u.calories)} cal` })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "history-log-card__meta", children: kv(u.type, t) }),
        /* @__PURE__ */ s.jsxs("div", { className: "history-log-card__stats", children: [
          /* @__PURE__ */ s.jsx("span", { className: "history-log-card__stat history-log-card__stat--protein", children: `${sn(u.protein)}g ${n.proteinSuffix}` }),
          /* @__PURE__ */ s.jsx("span", { className: "history-log-card__stat history-log-card__stat--carb", children: `${sn(u.carb)}g ${n.carbsSuffix}` }),
          /* @__PURE__ */ s.jsx("span", { className: "history-log-card__stat history-log-card__stat--fat", children: `${sn(u.fat)}g ${n.fatSuffix}` })
        ] })
      ] })
    ] }, u.id)) : /* @__PURE__ */ s.jsxs("div", { className: "history-empty-state", children: [
      /* @__PURE__ */ s.jsx("div", { className: "history-empty-state__title", children: n.emptyTitle }),
      /* @__PURE__ */ s.jsx("p", { className: "history-empty-state__copy", children: n.emptyCopy })
    ] }) })
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
}, bv = ls(is, {
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
}), Cv = ls(is, {
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
}), Zo = {
  en: is,
  "zh-TW": bv,
  "zh-CN": Cv
};
function Mv(e = "en") {
  return Zo[e] || Zo[String(e || "en").split("-")[0]] || Zo.en;
}
function jv(e) {
  const t = Number(e) || 0;
  return t > 0 ? `${Math.round(t)} kcal` : "--";
}
const Ev = ["goal", "target", "mealMode", "frequency"];
function Lv() {
  const e = $n(), t = Mv(e.curLang), n = e.profile || {}, r = {
    goal: t.goalLabel,
    target: t.targetLabel,
    mealMode: t.mealModeLabel,
    frequency: t.diningOutLabel
  }, a = String(e.currentGoalType || n.goalType || "lose"), o = String(n.mealMode || "4"), l = String(n.diningOutFrequency || "").trim(), i = {
    goal: t.goalTypes[a] || t.goalTypes.lose,
    target: jv(e.targetCalories),
    mealMode: t.mealModes[o] || t.mealModes[4],
    frequency: t.diningFreqs[l] || "--"
  };
  return /* @__PURE__ */ s.jsxs("section", { className: "profile-hero-card", "data-profile-react-surface": "true", children: [
    /* @__PURE__ */ s.jsx("div", { className: "profile-hero-card__icon-shell", children: /* @__PURE__ */ s.jsx(
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
    /* @__PURE__ */ s.jsxs("div", { className: "profile-hero-card__copy", children: [
      /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: t.kicker }),
      /* @__PURE__ */ s.jsxs("div", { className: "profile-hero-card__title-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "profile-hero-card__icon-badge", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(Fy, {}) }),
        /* @__PURE__ */ s.jsx("h1", { className: "profile-hero-card__title", children: t.title })
      ] }),
      /* @__PURE__ */ s.jsx("p", { className: "profile-hero-card__summary", children: t.summary })
    ] }),
    /* @__PURE__ */ s.jsx("div", { className: "profile-hero-card__grid", children: Ev.map((u) => /* @__PURE__ */ s.jsxs("div", { className: "profile-hero-card__metric", children: [
      /* @__PURE__ */ s.jsx("span", { className: "profile-hero-card__metric-label", children: r[u] }),
      /* @__PURE__ */ s.jsx("strong", { children: i[u] })
    ] }, u)) })
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
}, Dv = ss(us, {
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
}), Av = ss(us, {
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
}), Xo = {
  en: us,
  "zh-TW": Dv,
  "zh-CN": Av
};
function Pv(e = "en") {
  return Xo[e] || Xo[String(e || "en").split("-")[0]] || Xo.en;
}
const Yl = Object.freeze({
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
}), Iv = Object.freeze({
  getDashboardViewModel() {
    return Yl;
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
function qn() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofStatsBridge) || Iv;
}
function Qu(e, t) {
  return t.rangeLabelFn ? t.rangeLabelFn(e) : `${e} Days`;
}
function zv({ t: e }) {
  const t = [
    { key: "protein", label: e.pro || "Protein" },
    { key: "fat", label: e.fat || "Fat" },
    { key: "carb", label: e.carb || "Carbs" }
  ];
  return /* @__PURE__ */ s.jsx("div", { className: "stats-mini-legend", "aria-hidden": "true", children: t.map((n) => /* @__PURE__ */ s.jsxs("span", { className: "stats-mini-legend__item", children: [
    /* @__PURE__ */ s.jsx("span", { className: `stats-mini-legend__swatch stats-mini-legend__swatch--${n.key}` }),
    /* @__PURE__ */ s.jsx("span", { children: n.label })
  ] }, n.key)) });
}
function Fv() {
  const e = $n(), [t, n] = de.useState(7), [r, a] = de.useState(() => String(e.loggedWeight ?? "")), o = pt(e.curLang), l = Pv(e.curLang), i = qn(), { metrics: u = Yl.metrics } = i.getDashboardViewModel(e, { range: t, weightDays: 30 }) || Yl, c = Qu(t, l), h = r ? `${r} kg` : "--";
  return de.useEffect(() => {
    a(String(e.loggedWeight ?? ""));
  }, [e.loggedWeight]), /* @__PURE__ */ s.jsxs("div", { "data-stats-react-surface": "true", children: [
    /* @__PURE__ */ s.jsxs("div", { className: "surface-heading", children: [
      /* @__PURE__ */ s.jsx("div", { className: "surface-heading__eyebrow", children: l.eyebrow }),
      /* @__PURE__ */ s.jsxs("div", { className: "surface-heading__title-row", children: [
        /* @__PURE__ */ s.jsx("span", { className: "surface-heading__icon", "aria-hidden": "true", children: /* @__PURE__ */ s.jsx(zy, {}) }),
        /* @__PURE__ */ s.jsx("h1", { className: "surface-heading__title", children: l.title })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "stats-range-shell", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "stats-range-shell__copy", children: [
        /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: l.trend }),
        /* @__PURE__ */ s.jsx("div", { className: "stats-range-shell__title", children: c })
      ] }),
      /* @__PURE__ */ s.jsx("div", { className: "chart-range-toggle chart-range-toggle--segmented", children: [7, 30, 90].map((m) => /* @__PURE__ */ s.jsx(
        "button",
        {
          id: `btn-chart-${m}d`,
          className: `range-btn${t === m ? " active-range" : ""}`,
          type: "button",
          onClick: () => {
            qn().setDashboardChartRange(m), de.startTransition(() => {
              n(m);
            }), qn().ensureDashboardChartsReady();
          },
          children: Qu(m, l)
        },
        m
      )) })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "stats-summary-card", children: [
      /* @__PURE__ */ s.jsx("div", { className: "stats-summary-card__title", children: l.summaryTitle }),
      /* @__PURE__ */ s.jsxs("div", { className: "stats-summary-grid", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "stats-tile", children: [
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__label", children: l.avgCalories }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__value", children: u.averageCalories > 0 ? u.averageCalories : "--" }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__meta", children: l.targetOverview })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "stats-tile", children: [
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__label", children: l.streak }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__value", children: u.streak }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__meta", children: l.streakMeta })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "stats-tile stats-tile--wide", children: [
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__label", children: l.avgProtein }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__value", children: u.averageProtein > 0 ? `${u.averageProtein}g` : "--" }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-tile__meta", children: l.avgProteinMeta })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "stats-chart-card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-card__head", children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: l.macroBalance }),
          /* @__PURE__ */ s.jsx("h2", { className: "stats-chart-card__title", children: l.nutritionSnapshot })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "stats-chart-card__head-meta", children: c })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "chart-grid chart-grid--stats", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ s.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ s.jsx("canvas", { id: "macroChart" }) }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-chart-caption", id: "macroChartDate" })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ s.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ s.jsx("canvas", { id: "weeklyChart" }) }),
          /* @__PURE__ */ s.jsx(zv, { t: o }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-chart-caption stats-chart-caption--hint", id: "weeklyChartHint" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("div", { className: "stats-trend-grid", children: [
      /* @__PURE__ */ s.jsxs("section", { className: "stats-chart-card", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-card__head", children: [
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: l.trend }),
            /* @__PURE__ */ s.jsx("h2", { className: "stats-chart-card__title", id: "txt-cal-trend-title", children: l.calorieTrend })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-chart-card__head-meta", children: c })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ s.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ s.jsx("canvas", { id: "calTrendChart" }) }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-chart-caption", id: "calTrendHoverValue" })
        ] })
      ] }),
      /* @__PURE__ */ s.jsxs("section", { className: "stats-chart-card", children: [
        /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-card__head", children: [
          /* @__PURE__ */ s.jsxs("div", { children: [
            /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: l.protein }),
            /* @__PURE__ */ s.jsx("h2", { className: "stats-chart-card__title", id: "txt-protein-trend-title", children: l.proteinTrend })
          ] }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-chart-card__head-meta", children: c })
        ] }),
        /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ s.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ s.jsx("canvas", { id: "proteinTrendChart" }) }),
          /* @__PURE__ */ s.jsx("div", { className: "stats-chart-caption", id: "proteinTrendHoverValue" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ s.jsxs("section", { className: "stats-chart-card", children: [
      /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-card__head", children: [
        /* @__PURE__ */ s.jsxs("div", { children: [
          /* @__PURE__ */ s.jsx("div", { className: "section-kicker", children: l.weightSection }),
          /* @__PURE__ */ s.jsx("h2", { className: "stats-chart-card__title", children: l.weightTrend })
        ] }),
        /* @__PURE__ */ s.jsx("div", { className: "stats-chart-card__head-meta", children: h })
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "weight-input-inline", children: [
        /* @__PURE__ */ s.jsx(
          "input",
          {
            type: "number",
            id: "daily-weight-input",
            placeholder: l.weightPlaceholder,
            step: "0.1",
            value: r,
            onChange: (m) => {
              const f = m.target.value;
              a(f), qn().previewWeightChart(f, { state: e });
            }
          }
        ),
        /* @__PURE__ */ s.jsx(
          "button",
          {
            id: "btn-save-weight",
            className: "weight-save-btn",
            type: "button",
            onClick: () => {
              qn().saveCurrentWeight();
            },
            children: /* @__PURE__ */ s.jsx("span", { id: "txt-weight-title", children: l.save })
          }
        )
      ] }),
      /* @__PURE__ */ s.jsxs("div", { className: "stats-chart-shell", children: [
        /* @__PURE__ */ s.jsx("div", { className: "chart-container", style: { height: "248px" }, children: /* @__PURE__ */ s.jsx("canvas", { id: "weightChart" }) }),
        /* @__PURE__ */ s.jsx("div", { className: "stats-chart-caption", id: "weightTrendHoverValue" })
      ] })
    ] })
  ] });
}
const Zl = Object.freeze({
  selectedDate: "",
  curLang: "zh-TW",
  targetCalories: 0,
  currentGoalType: "lose",
  foodItems: Object.freeze([]),
  profile: null
}), Ov = Object.freeze({
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
}), $v = Object.freeze({
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
}), Yu = Object.freeze(["protein", "fat", "carbohydrate"]), Rv = Object.freeze(["protein", "fat", "carbohydrate", "sugar", "sodium", "saturatedFat", "transFat", "fiber"]), Hf = Object.freeze({
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbohydrate: "g",
  sugar: "g",
  sodium: "mg",
  saturatedFat: "g",
  transFat: "g",
  fiber: "g"
}), Bv = Object.freeze({
  protein: "#6aa874",
  fat: "#efb04a",
  carbohydrate: "#6f9fe8"
});
function Uf(e, t = "en") {
  return e[t] || e[String(t || "en").split("-")[0]] || e.en;
}
function Wv(e, t = 1) {
  const n = Math.round((Number(e) || 0) * 10 ** t) / 10 ** t;
  return Number.isInteger(n) ? n : Number(n.toFixed(t));
}
function kn(e, t) {
  return e === "calories" || e === "sodium" ? Math.round(Number(t) || 0) : Wv(t);
}
function pr(e, t) {
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
function Hv(e, t) {
  const n = kn(e, t);
  return {
    field: e,
    value: n,
    unit: Hf[e] || ""
  };
}
function Kf(e, t) {
  const n = Yu.reduce((r, a) => r + Math.max(Number(e == null ? void 0 : e[a]) || 0, 0), 0);
  return Yu.map((r) => {
    const a = Math.max(Number(e == null ? void 0 : e[r]) || 0, 0), o = n > 0 ? Math.round(a / n * 100) : 0, l = o > 0 ? t === "zh-TW" ? `約佔三大營養的 ${o}%` : t === "zh-CN" ? `约占三大营养的 ${o}%` : `${o}% of today's macro total` : "--";
    return {
      field: r,
      label: pr(r, t),
      value: kn(r, a),
      unit: Hf[r],
      share: o,
      shareLabel: l,
      color: Bv[r]
    };
  });
}
function Gf(e, t) {
  return Rv.map((n) => ({
    field: n,
    label: pr(n, t),
    ...Hv(n, e == null ? void 0 : e[n])
  }));
}
function Uv(e, t) {
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
function Kv(e) {
  const t = e.curLang || "en", n = pt(t), r = jf(t), a = Uf(Ov, t), o = xy(e), l = Ty(e, { days: 7 }), i = Eg(l, t), u = o.nutrition || {};
  return {
    kind: "daily-summary",
    lang: t,
    title: a.title,
    subtitle: Ji(e.selectedDate, t),
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
      cards: Kf(u, t)
    },
    reportSection: {
      title: a.reportTitle,
      summary: a.reportSummary
    },
    nutrientSection: {
      title: a.nutrientTitle,
      summary: a.nutrientSummary,
      headers: [a.nutrientHeader, a.valueHeader],
      rows: Gf(u, t)
    },
    compositionSection: null,
    focusPanel: Uv(i, a)
  };
}
function Gv(e = {}, t = Zl) {
  var c;
  const n = t.curLang || "en", r = pt(n), a = Uf($v, n), o = (e == null ? void 0 : e.nutri) || (e == null ? void 0 : e.nutrition) || e || {}, l = e != null && e.type ? ((c = r.meals) == null ? void 0 : c[e.type]) || e.type : Ji(t.selectedDate, n), i = Number(e == null ? void 0 : e.healthScore) || 0, u = (Array.isArray(e == null ? void 0 : e.items) ? e.items : []).map((h) => ({
    name: String((h == null ? void 0 : h.name) || ""),
    amount: String((h == null ? void 0 : h.weight) || (h == null ? void 0 : h.amount) || "")
  })).filter((h) => h.name || h.amount);
  return {
    kind: "item-detail",
    lang: n,
    title: (e == null ? void 0 : e.name) || a.reportTitle,
    subtitle: l,
    summary: a.summary,
    closeLabel: r.close || "Close",
    badge: i > 0 ? {
      label: r.healthScoreLabel || "Health Score",
      value: `${Math.round(i)}/10`
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
        label: pr("carbohydrate", n),
        value: kn("carbohydrate", o.carbohydrate),
        unit: "g"
      },
      {
        field: "protein",
        label: pr("protein", n),
        value: kn("protein", o.protein),
        unit: "g"
      },
      {
        field: "fat",
        label: pr("fat", n),
        value: kn("fat", o.fat),
        unit: "g"
      }
    ],
    macroSection: {
      title: a.macroTitle,
      summary: a.macroSummary,
      cards: Kf(o, n)
    },
    reportSection: {
      title: a.reportTitle,
      summary: a.reportSummary
    },
    nutrientSection: {
      title: a.nutrientTitle,
      summary: a.nutrientSummary,
      headers: [a.nutrientHeader, a.valueHeader],
      rows: Gf(o, n)
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
function Vv(e = Zl, t = { kind: "daily-summary" }) {
  const n = e || Zl;
  return ((t == null ? void 0 : t.kind) || "daily-summary") === "item-detail" ? Gv((t == null ? void 0 : t.item) || {}, n) : Kv(n);
}
function Qv() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofDetailSurfaceBridge) || {
    getState: () => null,
    subscribe: () => () => {
    }
  };
}
function Yv() {
  const e = $n(), t = Qv(), n = X.useSyncExternalStore(t.subscribe, t.getState, t.getState);
  return !n || !n.kind ? null : Vv(e, n);
}
const k = de.createElement;
function Zu() {
}
function Zv({ field: e }) {
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
function Xv({ value: e, unit: t, emphasis: n = !1 }) {
  const r = String(e ?? "").replace(/[^0-9A-Za-z]/g, "").length, a = r >= 7 ? " woof-detail__hero-value--very-long" : r >= 5 ? " woof-detail__hero-value--long" : "";
  return k(
    "div",
    { className: `woof-detail__hero-value${n ? " woof-detail__hero-value--emphasis" : ""}${a}` },
    k("span", { className: "woof-detail__hero-number" }, e),
    t ? k("span", { className: "woof-detail__hero-unit" }, t) : null
  );
}
function qv({ stat: e }) {
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
      k(Zv, { field: t }),
      k("div", { className: "woof-detail__hero-label" }, e.label)
    ),
    k(Xv, {
      value: e.value,
      unit: e.unit,
      emphasis: e.emphasis
    })
  );
}
function Jv({ card: e }) {
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
function e0({ rows: e, headers: t = ["Nutrient", "Value"] }) {
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
function t0({ section: e }) {
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
function rr({ title: e, summary: t, children: n, modifier: r = "" }) {
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
function n0({ panel: e }) {
  return !e || !Array.isArray(e.signals) || e.signals.length === 0 ? null : k(
    rr,
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
function r0({
  model: e,
  onClose: t = Zu
}) {
  var o, l, i, u, c, h, m, f, y;
  const n = Yv(), r = e || n;
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
        t !== Zu ? k("button", {
          type: "button",
          className: "woof-detail__close-button",
          onClick: t,
          "aria-label": r.closeLabel,
          title: r.closeLabel
        }, "×") : null
      )
    ),
    k(
      rr,
      {
        title: (o = r.reportSection) == null ? void 0 : o.title,
        summary: (l = r.reportSection) == null ? void 0 : l.summary,
        modifier: " woof-detail__section-block--hero"
      },
      k(
        "div",
        { className: `woof-detail__hero-grid${r.kind === "item-detail" ? " woof-detail__hero-grid--item" : ""}` },
        ...(r.heroStats || []).map((v) => k(qv, {
          key: v.label,
          stat: v
        }))
      )
    ),
    k(
      rr,
      {
        title: (i = r.macroSection) == null ? void 0 : i.title,
        summary: (u = r.macroSection) == null ? void 0 : u.summary
      },
      k(
        "div",
        { className: "woof-detail__macro-grid" },
        ...(((c = r.macroSection) == null ? void 0 : c.cards) || []).map((v) => k(Jv, {
          key: v.field,
          card: v
        }))
      )
    ),
    r.compositionSection ? k(
      rr,
      {
        title: r.compositionSection.title,
        summary: r.compositionSection.summary
      },
      k(t0, { section: r.compositionSection })
    ) : null,
    k(
      rr,
      {
        title: (h = r.nutrientSection) == null ? void 0 : h.title,
        summary: (m = r.nutrientSection) == null ? void 0 : m.summary
      },
      k(e0, {
        rows: ((f = r.nutrientSection) == null ? void 0 : f.rows) || [],
        headers: ((y = r.nutrientSection) == null ? void 0 : y.headers) || ["Nutrient", "Value"]
      })
    ),
    k(n0, { panel: r.focusPanel })
  );
}
window.__woofReactHomeStatus = "bundle-loaded";
const a0 = Object.freeze([
  "__woofUiBridge",
  "__woofAppStateBridge",
  "__woofDetailSurfaceBridge",
  "__woofAddBridge",
  "__woofStatsBridge"
]), o0 = 120;
let Xu = 0;
function Ye() {
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
function l0() {
  return a0.every((e) => !!window[e]);
}
function i0() {
  const e = document.getElementById("home-react-root"), t = document.getElementById("view-daily");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-home-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ s.jsx(de.StrictMode, { children: /* @__PURE__ */ s.jsx(
          Jy,
          {
            onQuickLog: () => Ye().openHomeLogModal(),
            onOpenAI: () => Ye().openAIView(),
            onOpenFavorites: () => Ye().openFavorites(),
            onSetSelectedDate: (n) => Ye().setSelectedDate(n),
            onShiftDate: (n) => Ye().shiftSelectedDate(n),
            onFavoriteMealItem: (n) => Ye().addRecordToFavorites(n),
            onDeleteMealItem: (n) => Ye().deleteMealRecord(n),
            onOpenRhythm: () => Ye().openRhythmView(),
            onOpenDailySummary: () => Ye().openDailySummaryDetail()
          }
        ) })
      ), window.__woofReactHomeStatus = "mounted";
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-home-enabled"), window.__woofReactHomeStatus = "failed", window.__woofReactHomeError = String((n == null ? void 0 : n.stack) || n || "Unknown React home mount error"), console.error("React home mount failed", n);
    }
}
function s0() {
  const e = document.getElementById("detail-react-root");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", Dt.createRoot(e).render(
        /* @__PURE__ */ s.jsx(de.StrictMode, { children: /* @__PURE__ */ s.jsx(r0, { onClose: () => Ye().closeDetailModal() }) })
      );
    } catch (t) {
      e.dataset.mounted = "false", console.error("React detail surface mount failed", t);
    }
}
function u0() {
  const e = document.getElementById("history-react-root"), t = document.getElementById("view-history");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-history-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ s.jsx(de.StrictMode, { children: /* @__PURE__ */ s.jsx(Nv, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-history-enabled"), console.error("React history mount failed", n);
    }
}
function c0() {
  const e = document.getElementById("add-react-root"), t = document.getElementById("view-add");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-add-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ s.jsx(de.StrictMode, { children: /* @__PURE__ */ s.jsx(gv, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-add-enabled"), console.error("React add shell mount failed", n);
    }
}
function d0() {
  const e = document.getElementById("stats-react-root"), t = document.getElementById("view-stats");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-stats-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ s.jsx(de.StrictMode, { children: /* @__PURE__ */ s.jsx(Fv, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-stats-enabled"), console.error("React stats mount failed", n);
    }
}
function f0() {
  const e = document.getElementById("profile-react-root"), t = document.getElementById("view-profile");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-profile-enabled"), Dt.createRoot(e).render(
        /* @__PURE__ */ s.jsx(de.StrictMode, { children: /* @__PURE__ */ s.jsx(Lv, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-profile-enabled"), console.error("React profile mount failed", n);
    }
}
function Sa() {
  if (!l0() && Xu < o0) {
    Xu += 1, window.__woofReactHomeStatus = "waiting-for-bridge", window.requestAnimationFrame(Sa);
    return;
  }
  i0(), c0(), u0(), d0(), f0(), s0();
}
const m0 = !!(document.getElementById("home-react-root") || document.getElementById("add-react-root") || document.getElementById("history-react-root") || document.getElementById("stats-react-root") || document.getElementById("profile-react-root") || document.getElementById("detail-react-root"));
m0 ? Sa() : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Sa, { once: !0 }) : Sa();
