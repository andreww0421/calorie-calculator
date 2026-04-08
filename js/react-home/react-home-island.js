function Vd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ou = { exports: {} }, Ia = {}, iu = { exports: {} }, P = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kr = Symbol.for("react.element"), Kd = Symbol.for("react.portal"), Qd = Symbol.for("react.fragment"), Yd = Symbol.for("react.strict_mode"), Xd = Symbol.for("react.profiler"), qd = Symbol.for("react.provider"), Zd = Symbol.for("react.context"), Jd = Symbol.for("react.forward_ref"), ef = Symbol.for("react.suspense"), tf = Symbol.for("react.memo"), nf = Symbol.for("react.lazy"), $i = Symbol.iterator;
function rf(e) {
  return e === null || typeof e != "object" ? null : (e = $i && e[$i] || e["@@iterator"], typeof e == "function" ? e : null);
}
var su = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, uu = Object.assign, cu = {};
function Nn(e, t, n) {
  this.props = e, this.context = t, this.refs = cu, this.updater = n || su;
}
Nn.prototype.isReactComponent = {};
Nn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Nn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function du() {
}
du.prototype = Nn.prototype;
function Ao(e, t, n) {
  this.props = e, this.context = t, this.refs = cu, this.updater = n || su;
}
var Do = Ao.prototype = new du();
Do.constructor = Ao;
uu(Do, Nn.prototype);
Do.isPureReactComponent = !0;
var zi = Array.isArray, fu = Object.prototype.hasOwnProperty, Io = { current: null }, mu = { key: !0, ref: !0, __self: !0, __source: !0 };
function pu(e, t, n) {
  var r, a = {}, l = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (l = "" + t.key), t) fu.call(t, r) && !mu.hasOwnProperty(r) && (a[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) a.children = n;
  else if (1 < i) {
    for (var s = Array(i), u = 0; u < i; u++) s[u] = arguments[u + 2];
    a.children = s;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) a[r] === void 0 && (a[r] = i[r]);
  return { $$typeof: kr, type: e, key: l, ref: o, props: a, _owner: Io.current };
}
function af(e, t) {
  return { $$typeof: kr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Fo(e) {
  return typeof e == "object" && e !== null && e.$$typeof === kr;
}
function lf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Ri = /\/+/g;
function Ja(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? lf("" + e.key) : t.toString(36);
}
function Kr(e, t, n, r, a) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else switch (l) {
    case "string":
    case "number":
      o = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case kr:
        case Kd:
          o = !0;
      }
  }
  if (o) return o = e, a = a(o), e = r === "" ? "." + Ja(o, 0) : r, zi(a) ? (n = "", e != null && (n = e.replace(Ri, "$&/") + "/"), Kr(a, t, n, "", function(u) {
    return u;
  })) : a != null && (Fo(a) && (a = af(a, n + (!a.key || o && o.key === a.key ? "" : ("" + a.key).replace(Ri, "$&/") + "/") + e)), t.push(a)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", zi(e)) for (var i = 0; i < e.length; i++) {
    l = e[i];
    var s = r + Ja(l, i);
    o += Kr(l, t, n, s, a);
  }
  else if (s = rf(e), typeof s == "function") for (e = s.call(e), i = 0; !(l = e.next()).done; ) l = l.value, s = r + Ja(l, i++), o += Kr(l, t, n, s, a);
  else if (l === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function Dr(e, t, n) {
  if (e == null) return e;
  var r = [], a = 0;
  return Kr(e, r, "", "", function(l) {
    return t.call(n, l, a++);
  }), r;
}
function of(e) {
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
var fe = { current: null }, Qr = { transition: null }, sf = { ReactCurrentDispatcher: fe, ReactCurrentBatchConfig: Qr, ReactCurrentOwner: Io };
function gu() {
  throw Error("act(...) is not supported in production builds of React.");
}
P.Children = { map: Dr, forEach: function(e, t, n) {
  Dr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return Dr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return Dr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Fo(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
P.Component = Nn;
P.Fragment = Qd;
P.Profiler = Xd;
P.PureComponent = Ao;
P.StrictMode = Yd;
P.Suspense = ef;
P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sf;
P.act = gu;
P.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = uu({}, e.props), a = e.key, l = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (l = t.ref, o = Io.current), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (s in t) fu.call(t, s) && !mu.hasOwnProperty(s) && (r[s] = t[s] === void 0 && i !== void 0 ? i[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    i = Array(s);
    for (var u = 0; u < s; u++) i[u] = arguments[u + 2];
    r.children = i;
  }
  return { $$typeof: kr, type: e.type, key: a, ref: l, props: r, _owner: o };
};
P.createContext = function(e) {
  return e = { $$typeof: Zd, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: qd, _context: e }, e.Consumer = e;
};
P.createElement = pu;
P.createFactory = function(e) {
  var t = pu.bind(null, e);
  return t.type = e, t;
};
P.createRef = function() {
  return { current: null };
};
P.forwardRef = function(e) {
  return { $$typeof: Jd, render: e };
};
P.isValidElement = Fo;
P.lazy = function(e) {
  return { $$typeof: nf, _payload: { _status: -1, _result: e }, _init: of };
};
P.memo = function(e, t) {
  return { $$typeof: tf, type: e, compare: t === void 0 ? null : t };
};
P.startTransition = function(e) {
  var t = Qr.transition;
  Qr.transition = {};
  try {
    e();
  } finally {
    Qr.transition = t;
  }
};
P.unstable_act = gu;
P.useCallback = function(e, t) {
  return fe.current.useCallback(e, t);
};
P.useContext = function(e) {
  return fe.current.useContext(e);
};
P.useDebugValue = function() {
};
P.useDeferredValue = function(e) {
  return fe.current.useDeferredValue(e);
};
P.useEffect = function(e, t) {
  return fe.current.useEffect(e, t);
};
P.useId = function() {
  return fe.current.useId();
};
P.useImperativeHandle = function(e, t, n) {
  return fe.current.useImperativeHandle(e, t, n);
};
P.useInsertionEffect = function(e, t) {
  return fe.current.useInsertionEffect(e, t);
};
P.useLayoutEffect = function(e, t) {
  return fe.current.useLayoutEffect(e, t);
};
P.useMemo = function(e, t) {
  return fe.current.useMemo(e, t);
};
P.useReducer = function(e, t, n) {
  return fe.current.useReducer(e, t, n);
};
P.useRef = function(e) {
  return fe.current.useRef(e);
};
P.useState = function(e) {
  return fe.current.useState(e);
};
P.useSyncExternalStore = function(e, t, n) {
  return fe.current.useSyncExternalStore(e, t, n);
};
P.useTransition = function() {
  return fe.current.useTransition();
};
P.version = "18.3.1";
iu.exports = P;
var wr = iu.exports;
const bo = /* @__PURE__ */ Vd(wr);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uf = wr, cf = Symbol.for("react.element"), df = Symbol.for("react.fragment"), ff = Object.prototype.hasOwnProperty, mf = uf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, pf = { key: !0, ref: !0, __self: !0, __source: !0 };
function hu(e, t, n) {
  var r, a = {}, l = null, o = null;
  n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) ff.call(t, r) && !pf.hasOwnProperty(r) && (a[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) a[r] === void 0 && (a[r] = t[r]);
  return { $$typeof: cf, type: e, key: l, ref: o, props: a, _owner: mf.current };
}
Ia.Fragment = df;
Ia.jsx = hu;
Ia.jsxs = hu;
ou.exports = Ia;
var w = ou.exports, la = {}, yu = { exports: {} }, Ee = {}, vu = { exports: {} }, Su = {};
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
  function t(C, A) {
    var D = C.length;
    C.push(A);
    e: for (; 0 < D; ) {
      var B = D - 1 >>> 1, X = C[B];
      if (0 < a(X, A)) C[B] = A, C[D] = X, D = B;
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var A = C[0], D = C.pop();
    if (D !== A) {
      C[0] = D;
      e: for (var B = 0, X = C.length, Dt = X >>> 1; B < Dt; ) {
        var He = 2 * (B + 1) - 1, M = C[He], Ye = He + 1, Le = C[Ye];
        if (0 > a(M, D)) Ye < X && 0 > a(Le, M) ? (C[B] = Le, C[Ye] = D, B = Ye) : (C[B] = M, C[He] = D, B = He);
        else if (Ye < X && 0 > a(Le, D)) C[B] = Le, C[Ye] = D, B = Ye;
        else break e;
      }
    }
    return A;
  }
  function a(C, A) {
    var D = C.sortIndex - A.sortIndex;
    return D !== 0 ? D : C.id - A.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function() {
      return l.now();
    };
  } else {
    var o = Date, i = o.now();
    e.unstable_now = function() {
      return o.now() - i;
    };
  }
  var s = [], u = [], g = 1, d = null, f = 3, h = !1, v = !1, y = !1, b = typeof setTimeout == "function" ? setTimeout : null, m = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(C) {
    for (var A = n(u); A !== null; ) {
      if (A.callback === null) r(u);
      else if (A.startTime <= C) r(u), A.sortIndex = A.expirationTime, t(s, A);
      else break;
      A = n(u);
    }
  }
  function S(C) {
    if (y = !1, p(C), !v) if (n(s) !== null) v = !0, Kt(T);
    else {
      var A = n(u);
      A !== null && Qt(S, A.startTime - C);
    }
  }
  function T(C, A) {
    v = !1, y && (y = !1, m(_), _ = -1), h = !0;
    var D = f;
    try {
      for (p(A), d = n(s); d !== null && (!(d.expirationTime > A) || C && !pe()); ) {
        var B = d.callback;
        if (typeof B == "function") {
          d.callback = null, f = d.priorityLevel;
          var X = B(d.expirationTime <= A);
          A = e.unstable_now(), typeof X == "function" ? d.callback = X : d === n(s) && r(s), p(A);
        } else r(s);
        d = n(s);
      }
      if (d !== null) var Dt = !0;
      else {
        var He = n(u);
        He !== null && Qt(S, He.startTime - A), Dt = !1;
      }
      return Dt;
    } finally {
      d = null, f = D, h = !1;
    }
  }
  var N = !1, E = null, _ = -1, W = 5, F = -1;
  function pe() {
    return !(e.unstable_now() - F < W);
  }
  function it() {
    if (E !== null) {
      var C = e.unstable_now();
      F = C;
      var A = !0;
      try {
        A = E(!0, C);
      } finally {
        A ? st() : (N = !1, E = null);
      }
    } else N = !1;
  }
  var st;
  if (typeof c == "function") st = function() {
    c(it);
  };
  else if (typeof MessageChannel < "u") {
    var bn = new MessageChannel(), Ar = bn.port2;
    bn.port1.onmessage = it, st = function() {
      Ar.postMessage(null);
    };
  } else st = function() {
    b(it, 0);
  };
  function Kt(C) {
    E = C, N || (N = !0, st());
  }
  function Qt(C, A) {
    _ = b(function() {
      C(e.unstable_now());
    }, A);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    v || h || (v = !0, Kt(T));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : W = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return f;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(C) {
    switch (f) {
      case 1:
      case 2:
      case 3:
        var A = 3;
        break;
      default:
        A = f;
    }
    var D = f;
    f = A;
    try {
      return C();
    } finally {
      f = D;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, A) {
    switch (C) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        C = 3;
    }
    var D = f;
    f = C;
    try {
      return A();
    } finally {
      f = D;
    }
  }, e.unstable_scheduleCallback = function(C, A, D) {
    var B = e.unstable_now();
    switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? B + D : B) : D = B, C) {
      case 1:
        var X = -1;
        break;
      case 2:
        X = 250;
        break;
      case 5:
        X = 1073741823;
        break;
      case 4:
        X = 1e4;
        break;
      default:
        X = 5e3;
    }
    return X = D + X, C = { id: g++, callback: A, priorityLevel: C, startTime: D, expirationTime: X, sortIndex: -1 }, D > B ? (C.sortIndex = D, t(u, C), n(s) === null && C === n(u) && (y ? (m(_), _ = -1) : y = !0, Qt(S, D - B))) : (C.sortIndex = X, t(s, C), v || h || (v = !0, Kt(T))), C;
  }, e.unstable_shouldYield = pe, e.unstable_wrapCallback = function(C) {
    var A = f;
    return function() {
      var D = f;
      f = A;
      try {
        return C.apply(this, arguments);
      } finally {
        f = D;
      }
    };
  };
})(Su);
vu.exports = Su;
var gf = vu.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hf = wr, Ne = gf;
function k(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ku = /* @__PURE__ */ new Set(), rr = {};
function Gt(e, t) {
  vn(e, t), vn(e + "Capture", t);
}
function vn(e, t) {
  for (rr[e] = t, e = 0; e < t.length; e++) ku.add(t[e]);
}
var nt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fl = Object.prototype.hasOwnProperty, yf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Oi = {}, ji = {};
function vf(e) {
  return Fl.call(ji, e) ? !0 : Fl.call(Oi, e) ? !1 : yf.test(e) ? ji[e] = !0 : (Oi[e] = !0, !1);
}
function Sf(e, t, n, r) {
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
function kf(e, t, n, r) {
  if (t === null || typeof t > "u" || Sf(e, t, n, r)) return !0;
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
function me(e, t, n, r, a, l, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = o;
}
var le = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  le[e] = new me(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  le[t] = new me(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  le[e] = new me(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  le[e] = new me(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  le[e] = new me(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  le[e] = new me(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  le[e] = new me(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  le[e] = new me(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  le[e] = new me(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Po = /[\-:]([a-z])/g;
function Lo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Po,
    Lo
  );
  le[t] = new me(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Po, Lo);
  le[t] = new me(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Po, Lo);
  le[t] = new me(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  le[e] = new me(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
le.xlinkHref = new me("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  le[e] = new me(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function $o(e, t, n, r) {
  var a = le.hasOwnProperty(t) ? le[t] : null;
  (a !== null ? a.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (kf(t, n, a, r) && (n = null), r || a === null ? vf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = n === null ? a.type === 3 ? !1 : "" : n : (t = a.attributeName, r = a.attributeNamespace, n === null ? e.removeAttribute(t) : (a = a.type, n = a === 3 || a === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var ot = hf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ir = Symbol.for("react.element"), Jt = Symbol.for("react.portal"), en = Symbol.for("react.fragment"), zo = Symbol.for("react.strict_mode"), bl = Symbol.for("react.profiler"), wu = Symbol.for("react.provider"), Tu = Symbol.for("react.context"), Ro = Symbol.for("react.forward_ref"), Pl = Symbol.for("react.suspense"), Ll = Symbol.for("react.suspense_list"), Oo = Symbol.for("react.memo"), ct = Symbol.for("react.lazy"), _u = Symbol.for("react.offscreen"), Wi = Symbol.iterator;
function Pn(e) {
  return e === null || typeof e != "object" ? null : (e = Wi && e[Wi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var V = Object.assign, el;
function Hn(e) {
  if (el === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    el = t && t[1] || "";
  }
  return `
` + el + e;
}
var tl = !1;
function nl(e, t) {
  if (!e || tl) return "";
  tl = !0;
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
      } catch (u) {
        var r = u;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (u) {
        r = u;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (var a = u.stack.split(`
`), l = r.stack.split(`
`), o = a.length - 1, i = l.length - 1; 1 <= o && 0 <= i && a[o] !== l[i]; ) i--;
      for (; 1 <= o && 0 <= i; o--, i--) if (a[o] !== l[i]) {
        if (o !== 1 || i !== 1)
          do
            if (o--, i--, 0 > i || a[o] !== l[i]) {
              var s = `
` + a[o].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= o && 0 <= i);
        break;
      }
    }
  } finally {
    tl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Hn(e) : "";
}
function wf(e) {
  switch (e.tag) {
    case 5:
      return Hn(e.type);
    case 16:
      return Hn("Lazy");
    case 13:
      return Hn("Suspense");
    case 19:
      return Hn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = nl(e.type, !1), e;
    case 11:
      return e = nl(e.type.render, !1), e;
    case 1:
      return e = nl(e.type, !0), e;
    default:
      return "";
  }
}
function $l(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case en:
      return "Fragment";
    case Jt:
      return "Portal";
    case bl:
      return "Profiler";
    case zo:
      return "StrictMode";
    case Pl:
      return "Suspense";
    case Ll:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Tu:
      return (e.displayName || "Context") + ".Consumer";
    case wu:
      return (e._context.displayName || "Context") + ".Provider";
    case Ro:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Oo:
      return t = e.displayName || null, t !== null ? t : $l(e.type) || "Memo";
    case ct:
      t = e._payload, e = e._init;
      try {
        return $l(e(t));
      } catch {
      }
  }
  return null;
}
function Tf(e) {
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
      return $l(t);
    case 8:
      return t === zo ? "StrictMode" : "Mode";
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
function xt(e) {
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
function Cu(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function _f(e) {
  var t = Cu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var a = n.get, l = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return a.call(this);
    }, set: function(o) {
      r = "" + o, l.call(this, o);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(o) {
      r = "" + o;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function Fr(e) {
  e._valueTracker || (e._valueTracker = _f(e));
}
function xu(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Cu(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function oa(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function zl(e, t) {
  var n = t.checked;
  return V({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Bi(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = xt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Nu(e, t) {
  t = t.checked, t != null && $o(e, "checked", t, !1);
}
function Rl(e, t) {
  Nu(e, t);
  var n = xt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Ol(e, t.type, n) : t.hasOwnProperty("defaultValue") && Ol(e, t.type, xt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Hi(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Ol(e, t, n) {
  (t !== "number" || oa(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Un = Array.isArray;
function fn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
    for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + xt(n), t = null, a = 0; a < e.length; a++) {
      if (e[a].value === n) {
        e[a].selected = !0, r && (e[a].defaultSelected = !0);
        return;
      }
      t !== null || e[a].disabled || (t = e[a]);
    }
    t !== null && (t.selected = !0);
  }
}
function jl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return V({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ui(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(k(92));
      if (Un(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: xt(n) };
}
function Eu(e, t) {
  var n = xt(t.value), r = xt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Gi(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Mu(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Wl(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Mu(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var br, Au = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, a) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, a);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (br = br || document.createElement("div"), br.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = br.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function ar(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Kn = {
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
}, Cf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Kn).forEach(function(e) {
  Cf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Kn[t] = Kn[e];
  });
});
function Du(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Kn.hasOwnProperty(e) && Kn[e] ? ("" + t).trim() : t + "px";
}
function Iu(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, a = Du(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
  }
}
var xf = V({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Bl(e, t) {
  if (t) {
    if (xf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function Hl(e, t) {
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
var Ul = null;
function jo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Gl = null, mn = null, pn = null;
function Vi(e) {
  if (e = Cr(e)) {
    if (typeof Gl != "function") throw Error(k(280));
    var t = e.stateNode;
    t && (t = $a(t), Gl(e.stateNode, e.type, t));
  }
}
function Fu(e) {
  mn ? pn ? pn.push(e) : pn = [e] : mn = e;
}
function bu() {
  if (mn) {
    var e = mn, t = pn;
    if (pn = mn = null, Vi(e), t) for (e = 0; e < t.length; e++) Vi(t[e]);
  }
}
function Pu(e, t) {
  return e(t);
}
function Lu() {
}
var rl = !1;
function $u(e, t, n) {
  if (rl) return e(t, n);
  rl = !0;
  try {
    return Pu(e, t, n);
  } finally {
    rl = !1, (mn !== null || pn !== null) && (Lu(), bu());
  }
}
function lr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = $a(n);
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
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var Vl = !1;
if (nt) try {
  var Ln = {};
  Object.defineProperty(Ln, "passive", { get: function() {
    Vl = !0;
  } }), window.addEventListener("test", Ln, Ln), window.removeEventListener("test", Ln, Ln);
} catch {
  Vl = !1;
}
function Nf(e, t, n, r, a, l, o, i, s) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (g) {
    this.onError(g);
  }
}
var Qn = !1, ia = null, sa = !1, Kl = null, Ef = { onError: function(e) {
  Qn = !0, ia = e;
} };
function Mf(e, t, n, r, a, l, o, i, s) {
  Qn = !1, ia = null, Nf.apply(Ef, arguments);
}
function Af(e, t, n, r, a, l, o, i, s) {
  if (Mf.apply(this, arguments), Qn) {
    if (Qn) {
      var u = ia;
      Qn = !1, ia = null;
    } else throw Error(k(198));
    sa || (sa = !0, Kl = u);
  }
}
function Vt(e) {
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
function zu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Ki(e) {
  if (Vt(e) !== e) throw Error(k(188));
}
function Df(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Vt(e), t === null) throw Error(k(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var a = n.return;
    if (a === null) break;
    var l = a.alternate;
    if (l === null) {
      if (r = a.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (a.child === l.child) {
      for (l = a.child; l; ) {
        if (l === n) return Ki(a), e;
        if (l === r) return Ki(a), t;
        l = l.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return) n = a, r = l;
    else {
      for (var o = !1, i = a.child; i; ) {
        if (i === n) {
          o = !0, n = a, r = l;
          break;
        }
        if (i === r) {
          o = !0, r = a, n = l;
          break;
        }
        i = i.sibling;
      }
      if (!o) {
        for (i = l.child; i; ) {
          if (i === n) {
            o = !0, n = l, r = a;
            break;
          }
          if (i === r) {
            o = !0, r = l, n = a;
            break;
          }
          i = i.sibling;
        }
        if (!o) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function Ru(e) {
  return e = Df(e), e !== null ? Ou(e) : null;
}
function Ou(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ou(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ju = Ne.unstable_scheduleCallback, Qi = Ne.unstable_cancelCallback, If = Ne.unstable_shouldYield, Ff = Ne.unstable_requestPaint, q = Ne.unstable_now, bf = Ne.unstable_getCurrentPriorityLevel, Wo = Ne.unstable_ImmediatePriority, Wu = Ne.unstable_UserBlockingPriority, ua = Ne.unstable_NormalPriority, Pf = Ne.unstable_LowPriority, Bu = Ne.unstable_IdlePriority, Fa = null, Ke = null;
function Lf(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == "function") try {
    Ke.onCommitFiberRoot(Fa, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var je = Math.clz32 ? Math.clz32 : Rf, $f = Math.log, zf = Math.LN2;
function Rf(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - ($f(e) / zf | 0) | 0;
}
var Pr = 64, Lr = 4194304;
function Gn(e) {
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
function ca(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, a = e.suspendedLanes, l = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var i = o & ~a;
    i !== 0 ? r = Gn(i) : (l &= o, l !== 0 && (r = Gn(l)));
  } else o = n & ~a, o !== 0 ? r = Gn(o) : l !== 0 && (r = Gn(l));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & a) && (a = r & -r, l = t & -t, a >= l || a === 16 && (l & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - je(t), a = 1 << n, r |= e[n], t &= ~a;
  return r;
}
function Of(e, t) {
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
function jf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
    var o = 31 - je(l), i = 1 << o, s = a[o];
    s === -1 ? (!(i & n) || i & r) && (a[o] = Of(i, t)) : s <= t && (e.expiredLanes |= i), l &= ~i;
  }
}
function Ql(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Hu() {
  var e = Pr;
  return Pr <<= 1, !(Pr & 4194240) && (Pr = 64), e;
}
function al(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Tr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - je(t), e[t] = n;
}
function Wf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var a = 31 - je(n), l = 1 << a;
    t[a] = 0, r[a] = -1, e[a] = -1, n &= ~l;
  }
}
function Bo(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - je(n), a = 1 << r;
    a & t | e[r] & t && (e[r] |= t), n &= ~a;
  }
}
var $ = 0;
function Uu(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Gu, Ho, Vu, Ku, Qu, Yl = !1, $r = [], yt = null, vt = null, St = null, or = /* @__PURE__ */ new Map(), ir = /* @__PURE__ */ new Map(), mt = [], Bf = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Yi(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      yt = null;
      break;
    case "dragenter":
    case "dragleave":
      vt = null;
      break;
    case "mouseover":
    case "mouseout":
      St = null;
      break;
    case "pointerover":
    case "pointerout":
      or.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      ir.delete(t.pointerId);
  }
}
function $n(e, t, n, r, a, l) {
  return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: l, targetContainers: [a] }, t !== null && (t = Cr(t), t !== null && Ho(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
}
function Hf(e, t, n, r, a) {
  switch (t) {
    case "focusin":
      return yt = $n(yt, e, t, n, r, a), !0;
    case "dragenter":
      return vt = $n(vt, e, t, n, r, a), !0;
    case "mouseover":
      return St = $n(St, e, t, n, r, a), !0;
    case "pointerover":
      var l = a.pointerId;
      return or.set(l, $n(or.get(l) || null, e, t, n, r, a)), !0;
    case "gotpointercapture":
      return l = a.pointerId, ir.set(l, $n(ir.get(l) || null, e, t, n, r, a)), !0;
  }
  return !1;
}
function Yu(e) {
  var t = Pt(e.target);
  if (t !== null) {
    var n = Vt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = zu(n), t !== null) {
          e.blockedOn = t, Qu(e.priority, function() {
            Vu(n);
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
function Yr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Xl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Ul = r, n.target.dispatchEvent(r), Ul = null;
    } else return t = Cr(n), t !== null && Ho(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Xi(e, t, n) {
  Yr(e) && n.delete(t);
}
function Uf() {
  Yl = !1, yt !== null && Yr(yt) && (yt = null), vt !== null && Yr(vt) && (vt = null), St !== null && Yr(St) && (St = null), or.forEach(Xi), ir.forEach(Xi);
}
function zn(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Yl || (Yl = !0, Ne.unstable_scheduleCallback(Ne.unstable_NormalPriority, Uf)));
}
function sr(e) {
  function t(a) {
    return zn(a, e);
  }
  if (0 < $r.length) {
    zn($r[0], e);
    for (var n = 1; n < $r.length; n++) {
      var r = $r[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (yt !== null && zn(yt, e), vt !== null && zn(vt, e), St !== null && zn(St, e), or.forEach(t), ir.forEach(t), n = 0; n < mt.length; n++) r = mt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < mt.length && (n = mt[0], n.blockedOn === null); ) Yu(n), n.blockedOn === null && mt.shift();
}
var gn = ot.ReactCurrentBatchConfig, da = !0;
function Gf(e, t, n, r) {
  var a = $, l = gn.transition;
  gn.transition = null;
  try {
    $ = 1, Uo(e, t, n, r);
  } finally {
    $ = a, gn.transition = l;
  }
}
function Vf(e, t, n, r) {
  var a = $, l = gn.transition;
  gn.transition = null;
  try {
    $ = 4, Uo(e, t, n, r);
  } finally {
    $ = a, gn.transition = l;
  }
}
function Uo(e, t, n, r) {
  if (da) {
    var a = Xl(e, t, n, r);
    if (a === null) pl(e, t, r, fa, n), Yi(e, r);
    else if (Hf(a, e, t, n, r)) r.stopPropagation();
    else if (Yi(e, r), t & 4 && -1 < Bf.indexOf(e)) {
      for (; a !== null; ) {
        var l = Cr(a);
        if (l !== null && Gu(l), l = Xl(e, t, n, r), l === null && pl(e, t, r, fa, n), l === a) break;
        a = l;
      }
      a !== null && r.stopPropagation();
    } else pl(e, t, r, null, n);
  }
}
var fa = null;
function Xl(e, t, n, r) {
  if (fa = null, e = jo(r), e = Pt(e), e !== null) if (t = Vt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = zu(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return fa = e, null;
}
function Xu(e) {
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
      switch (bf()) {
        case Wo:
          return 1;
        case Wu:
          return 4;
        case ua:
        case Pf:
          return 16;
        case Bu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var gt = null, Go = null, Xr = null;
function qu() {
  if (Xr) return Xr;
  var e, t = Go, n = t.length, r, a = "value" in gt ? gt.value : gt.textContent, l = a.length;
  for (e = 0; e < n && t[e] === a[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === a[l - r]; r++) ;
  return Xr = a.slice(e, 1 < r ? 1 - r : void 0);
}
function qr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function zr() {
  return !0;
}
function qi() {
  return !1;
}
function Me(e) {
  function t(n, r, a, l, o) {
    this._reactName = n, this._targetInst = a, this.type = r, this.nativeEvent = l, this.target = o, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(l) : l[i]);
    return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? zr : qi, this.isPropagationStopped = qi, this;
  }
  return V(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = zr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = zr);
  }, persist: function() {
  }, isPersistent: zr }), t;
}
var En = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Vo = Me(En), _r = V({}, En, { view: 0, detail: 0 }), Kf = Me(_r), ll, ol, Rn, ba = V({}, _r, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ko, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Rn && (Rn && e.type === "mousemove" ? (ll = e.screenX - Rn.screenX, ol = e.screenY - Rn.screenY) : ol = ll = 0, Rn = e), ll);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : ol;
} }), Zi = Me(ba), Qf = V({}, ba, { dataTransfer: 0 }), Yf = Me(Qf), Xf = V({}, _r, { relatedTarget: 0 }), il = Me(Xf), qf = V({}, En, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Zf = Me(qf), Jf = V({}, En, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), em = Me(Jf), tm = V({}, En, { data: 0 }), Ji = Me(tm), nm = {
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
}, rm = {
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
}, am = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function lm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = am[e]) ? !!t[e] : !1;
}
function Ko() {
  return lm;
}
var om = V({}, _r, { key: function(e) {
  if (e.key) {
    var t = nm[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = qr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? rm[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ko, charCode: function(e) {
  return e.type === "keypress" ? qr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), im = Me(om), sm = V({}, ba, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), es = Me(sm), um = V({}, _r, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ko }), cm = Me(um), dm = V({}, En, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), fm = Me(dm), mm = V({}, ba, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), pm = Me(mm), gm = [9, 13, 27, 32], Qo = nt && "CompositionEvent" in window, Yn = null;
nt && "documentMode" in document && (Yn = document.documentMode);
var hm = nt && "TextEvent" in window && !Yn, Zu = nt && (!Qo || Yn && 8 < Yn && 11 >= Yn), ts = " ", ns = !1;
function Ju(e, t) {
  switch (e) {
    case "keyup":
      return gm.indexOf(t.keyCode) !== -1;
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
function ec(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var tn = !1;
function ym(e, t) {
  switch (e) {
    case "compositionend":
      return ec(t);
    case "keypress":
      return t.which !== 32 ? null : (ns = !0, ts);
    case "textInput":
      return e = t.data, e === ts && ns ? null : e;
    default:
      return null;
  }
}
function vm(e, t) {
  if (tn) return e === "compositionend" || !Qo && Ju(e, t) ? (e = qu(), Xr = Go = gt = null, tn = !1, e) : null;
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
      return Zu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Sm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function rs(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Sm[e.type] : t === "textarea";
}
function tc(e, t, n, r) {
  Fu(r), t = ma(t, "onChange"), 0 < t.length && (n = new Vo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Xn = null, ur = null;
function km(e) {
  fc(e, 0);
}
function Pa(e) {
  var t = an(e);
  if (xu(t)) return e;
}
function wm(e, t) {
  if (e === "change") return t;
}
var nc = !1;
if (nt) {
  var sl;
  if (nt) {
    var ul = "oninput" in document;
    if (!ul) {
      var as = document.createElement("div");
      as.setAttribute("oninput", "return;"), ul = typeof as.oninput == "function";
    }
    sl = ul;
  } else sl = !1;
  nc = sl && (!document.documentMode || 9 < document.documentMode);
}
function ls() {
  Xn && (Xn.detachEvent("onpropertychange", rc), ur = Xn = null);
}
function rc(e) {
  if (e.propertyName === "value" && Pa(ur)) {
    var t = [];
    tc(t, ur, e, jo(e)), $u(km, t);
  }
}
function Tm(e, t, n) {
  e === "focusin" ? (ls(), Xn = t, ur = n, Xn.attachEvent("onpropertychange", rc)) : e === "focusout" && ls();
}
function _m(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Pa(ur);
}
function Cm(e, t) {
  if (e === "click") return Pa(t);
}
function xm(e, t) {
  if (e === "input" || e === "change") return Pa(t);
}
function Nm(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var Be = typeof Object.is == "function" ? Object.is : Nm;
function cr(e, t) {
  if (Be(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var a = n[r];
    if (!Fl.call(t, a) || !Be(e[a], t[a])) return !1;
  }
  return !0;
}
function os(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function is(e, t) {
  var n = os(e);
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
    n = os(n);
  }
}
function ac(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? ac(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function lc() {
  for (var e = window, t = oa(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = oa(e.document);
  }
  return t;
}
function Yo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Em(e) {
  var t = lc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && ac(n.ownerDocument.documentElement, n)) {
    if (r !== null && Yo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var a = n.textContent.length, l = Math.min(r.start, a);
        r = r.end === void 0 ? l : Math.min(r.end, a), !e.extend && l > r && (a = r, r = l, l = a), a = is(n, l);
        var o = is(
          n,
          r
        );
        a && o && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== o.node || e.focusOffset !== o.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), l > r ? (e.addRange(t), e.extend(o.node, o.offset)) : (t.setEnd(o.node, o.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var Mm = nt && "documentMode" in document && 11 >= document.documentMode, nn = null, ql = null, qn = null, Zl = !1;
function ss(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Zl || nn == null || nn !== oa(r) || (r = nn, "selectionStart" in r && Yo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), qn && cr(qn, r) || (qn = r, r = ma(ql, "onSelect"), 0 < r.length && (t = new Vo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = nn)));
}
function Rr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var rn = { animationend: Rr("Animation", "AnimationEnd"), animationiteration: Rr("Animation", "AnimationIteration"), animationstart: Rr("Animation", "AnimationStart"), transitionend: Rr("Transition", "TransitionEnd") }, cl = {}, oc = {};
nt && (oc = document.createElement("div").style, "AnimationEvent" in window || (delete rn.animationend.animation, delete rn.animationiteration.animation, delete rn.animationstart.animation), "TransitionEvent" in window || delete rn.transitionend.transition);
function La(e) {
  if (cl[e]) return cl[e];
  if (!rn[e]) return e;
  var t = rn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in oc) return cl[e] = t[n];
  return e;
}
var ic = La("animationend"), sc = La("animationiteration"), uc = La("animationstart"), cc = La("transitionend"), dc = /* @__PURE__ */ new Map(), us = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Et(e, t) {
  dc.set(e, t), Gt(t, [e]);
}
for (var dl = 0; dl < us.length; dl++) {
  var fl = us[dl], Am = fl.toLowerCase(), Dm = fl[0].toUpperCase() + fl.slice(1);
  Et(Am, "on" + Dm);
}
Et(ic, "onAnimationEnd");
Et(sc, "onAnimationIteration");
Et(uc, "onAnimationStart");
Et("dblclick", "onDoubleClick");
Et("focusin", "onFocus");
Et("focusout", "onBlur");
Et(cc, "onTransitionEnd");
vn("onMouseEnter", ["mouseout", "mouseover"]);
vn("onMouseLeave", ["mouseout", "mouseover"]);
vn("onPointerEnter", ["pointerout", "pointerover"]);
vn("onPointerLeave", ["pointerout", "pointerover"]);
Gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Gt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Vn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Im = new Set("cancel close invalid load scroll toggle".split(" ").concat(Vn));
function cs(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Af(r, t, void 0, e), e.currentTarget = null;
}
function fc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], a = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var i = r[o], s = i.instance, u = i.currentTarget;
        if (i = i.listener, s !== l && a.isPropagationStopped()) break e;
        cs(a, i, u), l = s;
      }
      else for (o = 0; o < r.length; o++) {
        if (i = r[o], s = i.instance, u = i.currentTarget, i = i.listener, s !== l && a.isPropagationStopped()) break e;
        cs(a, i, u), l = s;
      }
    }
  }
  if (sa) throw e = Kl, sa = !1, Kl = null, e;
}
function O(e, t) {
  var n = t[ro];
  n === void 0 && (n = t[ro] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (mc(t, e, 2, !1), n.add(r));
}
function ml(e, t, n) {
  var r = 0;
  t && (r |= 4), mc(n, e, r, t);
}
var Or = "_reactListening" + Math.random().toString(36).slice(2);
function dr(e) {
  if (!e[Or]) {
    e[Or] = !0, ku.forEach(function(n) {
      n !== "selectionchange" && (Im.has(n) || ml(n, !1, e), ml(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Or] || (t[Or] = !0, ml("selectionchange", !1, t));
  }
}
function mc(e, t, n, r) {
  switch (Xu(t)) {
    case 1:
      var a = Gf;
      break;
    case 4:
      a = Vf;
      break;
    default:
      a = Uo;
  }
  n = a.bind(null, t, n, e), a = void 0, !Vl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), r ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
}
function pl(e, t, n, r, a) {
  var l = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var i = r.stateNode.containerInfo;
      if (i === a || i.nodeType === 8 && i.parentNode === a) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var s = o.tag;
        if ((s === 3 || s === 4) && (s = o.stateNode.containerInfo, s === a || s.nodeType === 8 && s.parentNode === a)) return;
        o = o.return;
      }
      for (; i !== null; ) {
        if (o = Pt(i), o === null) return;
        if (s = o.tag, s === 5 || s === 6) {
          r = l = o;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  $u(function() {
    var u = l, g = jo(n), d = [];
    e: {
      var f = dc.get(e);
      if (f !== void 0) {
        var h = Vo, v = e;
        switch (e) {
          case "keypress":
            if (qr(n) === 0) break e;
          case "keydown":
          case "keyup":
            h = im;
            break;
          case "focusin":
            v = "focus", h = il;
            break;
          case "focusout":
            v = "blur", h = il;
            break;
          case "beforeblur":
          case "afterblur":
            h = il;
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
            h = Zi;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Yf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = cm;
            break;
          case ic:
          case sc:
          case uc:
            h = Zf;
            break;
          case cc:
            h = fm;
            break;
          case "scroll":
            h = Kf;
            break;
          case "wheel":
            h = pm;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = em;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = es;
        }
        var y = (t & 4) !== 0, b = !y && e === "scroll", m = y ? f !== null ? f + "Capture" : null : f;
        y = [];
        for (var c = u, p; c !== null; ) {
          p = c;
          var S = p.stateNode;
          if (p.tag === 5 && S !== null && (p = S, m !== null && (S = lr(c, m), S != null && y.push(fr(c, S, p)))), b) break;
          c = c.return;
        }
        0 < y.length && (f = new h(f, v, null, n, g), d.push({ event: f, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (f = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", f && n !== Ul && (v = n.relatedTarget || n.fromElement) && (Pt(v) || v[rt])) break e;
        if ((h || f) && (f = g.window === g ? g : (f = g.ownerDocument) ? f.defaultView || f.parentWindow : window, h ? (v = n.relatedTarget || n.toElement, h = u, v = v ? Pt(v) : null, v !== null && (b = Vt(v), v !== b || v.tag !== 5 && v.tag !== 6) && (v = null)) : (h = null, v = u), h !== v)) {
          if (y = Zi, S = "onMouseLeave", m = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (y = es, S = "onPointerLeave", m = "onPointerEnter", c = "pointer"), b = h == null ? f : an(h), p = v == null ? f : an(v), f = new y(S, c + "leave", h, n, g), f.target = b, f.relatedTarget = p, S = null, Pt(g) === u && (y = new y(m, c + "enter", v, n, g), y.target = p, y.relatedTarget = b, S = y), b = S, h && v) t: {
            for (y = h, m = v, c = 0, p = y; p; p = Yt(p)) c++;
            for (p = 0, S = m; S; S = Yt(S)) p++;
            for (; 0 < c - p; ) y = Yt(y), c--;
            for (; 0 < p - c; ) m = Yt(m), p--;
            for (; c--; ) {
              if (y === m || m !== null && y === m.alternate) break t;
              y = Yt(y), m = Yt(m);
            }
            y = null;
          }
          else y = null;
          h !== null && ds(d, f, h, y, !1), v !== null && b !== null && ds(d, b, v, y, !0);
        }
      }
      e: {
        if (f = u ? an(u) : window, h = f.nodeName && f.nodeName.toLowerCase(), h === "select" || h === "input" && f.type === "file") var T = wm;
        else if (rs(f)) if (nc) T = xm;
        else {
          T = _m;
          var N = Tm;
        }
        else (h = f.nodeName) && h.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (T = Cm);
        if (T && (T = T(e, u))) {
          tc(d, T, n, g);
          break e;
        }
        N && N(e, f, u), e === "focusout" && (N = f._wrapperState) && N.controlled && f.type === "number" && Ol(f, "number", f.value);
      }
      switch (N = u ? an(u) : window, e) {
        case "focusin":
          (rs(N) || N.contentEditable === "true") && (nn = N, ql = u, qn = null);
          break;
        case "focusout":
          qn = ql = nn = null;
          break;
        case "mousedown":
          Zl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Zl = !1, ss(d, n, g);
          break;
        case "selectionchange":
          if (Mm) break;
        case "keydown":
        case "keyup":
          ss(d, n, g);
      }
      var E;
      if (Qo) e: {
        switch (e) {
          case "compositionstart":
            var _ = "onCompositionStart";
            break e;
          case "compositionend":
            _ = "onCompositionEnd";
            break e;
          case "compositionupdate":
            _ = "onCompositionUpdate";
            break e;
        }
        _ = void 0;
      }
      else tn ? Ju(e, n) && (_ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ && (Zu && n.locale !== "ko" && (tn || _ !== "onCompositionStart" ? _ === "onCompositionEnd" && tn && (E = qu()) : (gt = g, Go = "value" in gt ? gt.value : gt.textContent, tn = !0)), N = ma(u, _), 0 < N.length && (_ = new Ji(_, e, null, n, g), d.push({ event: _, listeners: N }), E ? _.data = E : (E = ec(n), E !== null && (_.data = E)))), (E = hm ? ym(e, n) : vm(e, n)) && (u = ma(u, "onBeforeInput"), 0 < u.length && (g = new Ji("onBeforeInput", "beforeinput", null, n, g), d.push({ event: g, listeners: u }), g.data = E));
    }
    fc(d, t);
  });
}
function fr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function ma(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var a = e, l = a.stateNode;
    a.tag === 5 && l !== null && (a = l, l = lr(e, n), l != null && r.unshift(fr(e, l, a)), l = lr(e, t), l != null && r.push(fr(e, l, a))), e = e.return;
  }
  return r;
}
function Yt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ds(e, t, n, r, a) {
  for (var l = t._reactName, o = []; n !== null && n !== r; ) {
    var i = n, s = i.alternate, u = i.stateNode;
    if (s !== null && s === r) break;
    i.tag === 5 && u !== null && (i = u, a ? (s = lr(n, l), s != null && o.unshift(fr(n, s, i))) : a || (s = lr(n, l), s != null && o.push(fr(n, s, i)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Fm = /\r\n?/g, bm = /\u0000|\uFFFD/g;
function fs(e) {
  return (typeof e == "string" ? e : "" + e).replace(Fm, `
`).replace(bm, "");
}
function jr(e, t, n) {
  if (t = fs(t), fs(e) !== t && n) throw Error(k(425));
}
function pa() {
}
var Jl = null, eo = null;
function to(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var no = typeof setTimeout == "function" ? setTimeout : void 0, Pm = typeof clearTimeout == "function" ? clearTimeout : void 0, ms = typeof Promise == "function" ? Promise : void 0, Lm = typeof queueMicrotask == "function" ? queueMicrotask : typeof ms < "u" ? function(e) {
  return ms.resolve(null).then(e).catch($m);
} : no;
function $m(e) {
  setTimeout(function() {
    throw e;
  });
}
function gl(e, t) {
  var n = t, r = 0;
  do {
    var a = n.nextSibling;
    if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$") {
      if (r === 0) {
        e.removeChild(a), sr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = a;
  } while (n);
  sr(t);
}
function kt(e) {
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
function ps(e) {
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
var Mn = Math.random().toString(36).slice(2), Ve = "__reactFiber$" + Mn, mr = "__reactProps$" + Mn, rt = "__reactContainer$" + Mn, ro = "__reactEvents$" + Mn, zm = "__reactListeners$" + Mn, Rm = "__reactHandles$" + Mn;
function Pt(e) {
  var t = e[Ve];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[rt] || n[Ve]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = ps(e); e !== null; ) {
        if (n = e[Ve]) return n;
        e = ps(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function Cr(e) {
  return e = e[Ve] || e[rt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function an(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function $a(e) {
  return e[mr] || null;
}
var ao = [], ln = -1;
function Mt(e) {
  return { current: e };
}
function j(e) {
  0 > ln || (e.current = ao[ln], ao[ln] = null, ln--);
}
function R(e, t) {
  ln++, ao[ln] = e.current, e.current = t;
}
var Nt = {}, ue = Mt(Nt), ye = Mt(!1), jt = Nt;
function Sn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Nt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var a = {}, l;
  for (l in n) a[l] = t[l];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
}
function ve(e) {
  return e = e.childContextTypes, e != null;
}
function ga() {
  j(ye), j(ue);
}
function gs(e, t, n) {
  if (ue.current !== Nt) throw Error(k(168));
  R(ue, t), R(ye, n);
}
function pc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var a in r) if (!(a in t)) throw Error(k(108, Tf(e) || "Unknown", a));
  return V({}, n, r);
}
function ha(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || Nt, jt = ue.current, R(ue, e), R(ye, ye.current), !0;
}
function hs(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n ? (e = pc(e, t, jt), r.__reactInternalMemoizedMergedChildContext = e, j(ye), j(ue), R(ue, e)) : j(ye), R(ye, n);
}
var qe = null, za = !1, hl = !1;
function gc(e) {
  qe === null ? qe = [e] : qe.push(e);
}
function Om(e) {
  za = !0, gc(e);
}
function At() {
  if (!hl && qe !== null) {
    hl = !0;
    var e = 0, t = $;
    try {
      var n = qe;
      for ($ = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      qe = null, za = !1;
    } catch (a) {
      throw qe !== null && (qe = qe.slice(e + 1)), ju(Wo, At), a;
    } finally {
      $ = t, hl = !1;
    }
  }
  return null;
}
var on = [], sn = 0, ya = null, va = 0, Ae = [], De = 0, Wt = null, Je = 1, et = "";
function Ft(e, t) {
  on[sn++] = va, on[sn++] = ya, ya = e, va = t;
}
function hc(e, t, n) {
  Ae[De++] = Je, Ae[De++] = et, Ae[De++] = Wt, Wt = e;
  var r = Je;
  e = et;
  var a = 32 - je(r) - 1;
  r &= ~(1 << a), n += 1;
  var l = 32 - je(t) + a;
  if (30 < l) {
    var o = a - a % 5;
    l = (r & (1 << o) - 1).toString(32), r >>= o, a -= o, Je = 1 << 32 - je(t) + a | n << a | r, et = l + e;
  } else Je = 1 << l | n << a | r, et = e;
}
function Xo(e) {
  e.return !== null && (Ft(e, 1), hc(e, 1, 0));
}
function qo(e) {
  for (; e === ya; ) ya = on[--sn], on[sn] = null, va = on[--sn], on[sn] = null;
  for (; e === Wt; ) Wt = Ae[--De], Ae[De] = null, et = Ae[--De], Ae[De] = null, Je = Ae[--De], Ae[De] = null;
}
var Ce = null, _e = null, H = !1, Oe = null;
function yc(e, t) {
  var n = Ie(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ys(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ce = e, _e = kt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ce = e, _e = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Wt !== null ? { id: Je, overflow: et } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ie(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ce = e, _e = null, !0) : !1;
    default:
      return !1;
  }
}
function lo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function oo(e) {
  if (H) {
    var t = _e;
    if (t) {
      var n = t;
      if (!ys(e, t)) {
        if (lo(e)) throw Error(k(418));
        t = kt(n.nextSibling);
        var r = Ce;
        t && ys(e, t) ? yc(r, n) : (e.flags = e.flags & -4097 | 2, H = !1, Ce = e);
      }
    } else {
      if (lo(e)) throw Error(k(418));
      e.flags = e.flags & -4097 | 2, H = !1, Ce = e;
    }
  }
}
function vs(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ce = e;
}
function Wr(e) {
  if (e !== Ce) return !1;
  if (!H) return vs(e), H = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !to(e.type, e.memoizedProps)), t && (t = _e)) {
    if (lo(e)) throw vc(), Error(k(418));
    for (; t; ) yc(e, t), t = kt(t.nextSibling);
  }
  if (vs(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              _e = kt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      _e = null;
    }
  } else _e = Ce ? kt(e.stateNode.nextSibling) : null;
  return !0;
}
function vc() {
  for (var e = _e; e; ) e = kt(e.nextSibling);
}
function kn() {
  _e = Ce = null, H = !1;
}
function Zo(e) {
  Oe === null ? Oe = [e] : Oe.push(e);
}
var jm = ot.ReactCurrentBatchConfig;
function On(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var a = r, l = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === l ? t.ref : (t = function(o) {
        var i = a.refs;
        o === null ? delete i[l] : i[l] = o;
      }, t._stringRef = l, t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function Br(e, t) {
  throw e = Object.prototype.toString.call(t), Error(k(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Ss(e) {
  var t = e._init;
  return t(e._payload);
}
function Sc(e) {
  function t(m, c) {
    if (e) {
      var p = m.deletions;
      p === null ? (m.deletions = [c], m.flags |= 16) : p.push(c);
    }
  }
  function n(m, c) {
    if (!e) return null;
    for (; c !== null; ) t(m, c), c = c.sibling;
    return null;
  }
  function r(m, c) {
    for (m = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? m.set(c.key, c) : m.set(c.index, c), c = c.sibling;
    return m;
  }
  function a(m, c) {
    return m = Ct(m, c), m.index = 0, m.sibling = null, m;
  }
  function l(m, c, p) {
    return m.index = p, e ? (p = m.alternate, p !== null ? (p = p.index, p < c ? (m.flags |= 2, c) : p) : (m.flags |= 2, c)) : (m.flags |= 1048576, c);
  }
  function o(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function i(m, c, p, S) {
    return c === null || c.tag !== 6 ? (c = _l(p, m.mode, S), c.return = m, c) : (c = a(c, p), c.return = m, c);
  }
  function s(m, c, p, S) {
    var T = p.type;
    return T === en ? g(m, c, p.props.children, S, p.key) : c !== null && (c.elementType === T || typeof T == "object" && T !== null && T.$$typeof === ct && Ss(T) === c.type) ? (S = a(c, p.props), S.ref = On(m, c, p), S.return = m, S) : (S = aa(p.type, p.key, p.props, null, m.mode, S), S.ref = On(m, c, p), S.return = m, S);
  }
  function u(m, c, p, S) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== p.containerInfo || c.stateNode.implementation !== p.implementation ? (c = Cl(p, m.mode, S), c.return = m, c) : (c = a(c, p.children || []), c.return = m, c);
  }
  function g(m, c, p, S, T) {
    return c === null || c.tag !== 7 ? (c = Rt(p, m.mode, S, T), c.return = m, c) : (c = a(c, p), c.return = m, c);
  }
  function d(m, c, p) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = _l("" + c, m.mode, p), c.return = m, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case Ir:
          return p = aa(c.type, c.key, c.props, null, m.mode, p), p.ref = On(m, null, c), p.return = m, p;
        case Jt:
          return c = Cl(c, m.mode, p), c.return = m, c;
        case ct:
          var S = c._init;
          return d(m, S(c._payload), p);
      }
      if (Un(c) || Pn(c)) return c = Rt(c, m.mode, p, null), c.return = m, c;
      Br(m, c);
    }
    return null;
  }
  function f(m, c, p, S) {
    var T = c !== null ? c.key : null;
    if (typeof p == "string" && p !== "" || typeof p == "number") return T !== null ? null : i(m, c, "" + p, S);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Ir:
          return p.key === T ? s(m, c, p, S) : null;
        case Jt:
          return p.key === T ? u(m, c, p, S) : null;
        case ct:
          return T = p._init, f(
            m,
            c,
            T(p._payload),
            S
          );
      }
      if (Un(p) || Pn(p)) return T !== null ? null : g(m, c, p, S, null);
      Br(m, p);
    }
    return null;
  }
  function h(m, c, p, S, T) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return m = m.get(p) || null, i(c, m, "" + S, T);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Ir:
          return m = m.get(S.key === null ? p : S.key) || null, s(c, m, S, T);
        case Jt:
          return m = m.get(S.key === null ? p : S.key) || null, u(c, m, S, T);
        case ct:
          var N = S._init;
          return h(m, c, p, N(S._payload), T);
      }
      if (Un(S) || Pn(S)) return m = m.get(p) || null, g(c, m, S, T, null);
      Br(c, S);
    }
    return null;
  }
  function v(m, c, p, S) {
    for (var T = null, N = null, E = c, _ = c = 0, W = null; E !== null && _ < p.length; _++) {
      E.index > _ ? (W = E, E = null) : W = E.sibling;
      var F = f(m, E, p[_], S);
      if (F === null) {
        E === null && (E = W);
        break;
      }
      e && E && F.alternate === null && t(m, E), c = l(F, c, _), N === null ? T = F : N.sibling = F, N = F, E = W;
    }
    if (_ === p.length) return n(m, E), H && Ft(m, _), T;
    if (E === null) {
      for (; _ < p.length; _++) E = d(m, p[_], S), E !== null && (c = l(E, c, _), N === null ? T = E : N.sibling = E, N = E);
      return H && Ft(m, _), T;
    }
    for (E = r(m, E); _ < p.length; _++) W = h(E, m, _, p[_], S), W !== null && (e && W.alternate !== null && E.delete(W.key === null ? _ : W.key), c = l(W, c, _), N === null ? T = W : N.sibling = W, N = W);
    return e && E.forEach(function(pe) {
      return t(m, pe);
    }), H && Ft(m, _), T;
  }
  function y(m, c, p, S) {
    var T = Pn(p);
    if (typeof T != "function") throw Error(k(150));
    if (p = T.call(p), p == null) throw Error(k(151));
    for (var N = T = null, E = c, _ = c = 0, W = null, F = p.next(); E !== null && !F.done; _++, F = p.next()) {
      E.index > _ ? (W = E, E = null) : W = E.sibling;
      var pe = f(m, E, F.value, S);
      if (pe === null) {
        E === null && (E = W);
        break;
      }
      e && E && pe.alternate === null && t(m, E), c = l(pe, c, _), N === null ? T = pe : N.sibling = pe, N = pe, E = W;
    }
    if (F.done) return n(
      m,
      E
    ), H && Ft(m, _), T;
    if (E === null) {
      for (; !F.done; _++, F = p.next()) F = d(m, F.value, S), F !== null && (c = l(F, c, _), N === null ? T = F : N.sibling = F, N = F);
      return H && Ft(m, _), T;
    }
    for (E = r(m, E); !F.done; _++, F = p.next()) F = h(E, m, _, F.value, S), F !== null && (e && F.alternate !== null && E.delete(F.key === null ? _ : F.key), c = l(F, c, _), N === null ? T = F : N.sibling = F, N = F);
    return e && E.forEach(function(it) {
      return t(m, it);
    }), H && Ft(m, _), T;
  }
  function b(m, c, p, S) {
    if (typeof p == "object" && p !== null && p.type === en && p.key === null && (p = p.props.children), typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Ir:
          e: {
            for (var T = p.key, N = c; N !== null; ) {
              if (N.key === T) {
                if (T = p.type, T === en) {
                  if (N.tag === 7) {
                    n(m, N.sibling), c = a(N, p.props.children), c.return = m, m = c;
                    break e;
                  }
                } else if (N.elementType === T || typeof T == "object" && T !== null && T.$$typeof === ct && Ss(T) === N.type) {
                  n(m, N.sibling), c = a(N, p.props), c.ref = On(m, N, p), c.return = m, m = c;
                  break e;
                }
                n(m, N);
                break;
              } else t(m, N);
              N = N.sibling;
            }
            p.type === en ? (c = Rt(p.props.children, m.mode, S, p.key), c.return = m, m = c) : (S = aa(p.type, p.key, p.props, null, m.mode, S), S.ref = On(m, c, p), S.return = m, m = S);
          }
          return o(m);
        case Jt:
          e: {
            for (N = p.key; c !== null; ) {
              if (c.key === N) if (c.tag === 4 && c.stateNode.containerInfo === p.containerInfo && c.stateNode.implementation === p.implementation) {
                n(m, c.sibling), c = a(c, p.children || []), c.return = m, m = c;
                break e;
              } else {
                n(m, c);
                break;
              }
              else t(m, c);
              c = c.sibling;
            }
            c = Cl(p, m.mode, S), c.return = m, m = c;
          }
          return o(m);
        case ct:
          return N = p._init, b(m, c, N(p._payload), S);
      }
      if (Un(p)) return v(m, c, p, S);
      if (Pn(p)) return y(m, c, p, S);
      Br(m, p);
    }
    return typeof p == "string" && p !== "" || typeof p == "number" ? (p = "" + p, c !== null && c.tag === 6 ? (n(m, c.sibling), c = a(c, p), c.return = m, m = c) : (n(m, c), c = _l(p, m.mode, S), c.return = m, m = c), o(m)) : n(m, c);
  }
  return b;
}
var wn = Sc(!0), kc = Sc(!1), Sa = Mt(null), ka = null, un = null, Jo = null;
function ei() {
  Jo = un = ka = null;
}
function ti(e) {
  var t = Sa.current;
  j(Sa), e._currentValue = t;
}
function io(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function hn(e, t) {
  ka = e, Jo = un = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (he = !0), e.firstContext = null);
}
function be(e) {
  var t = e._currentValue;
  if (Jo !== e) if (e = { context: e, memoizedValue: t, next: null }, un === null) {
    if (ka === null) throw Error(k(308));
    un = e, ka.dependencies = { lanes: 0, firstContext: e };
  } else un = un.next = e;
  return t;
}
var Lt = null;
function ni(e) {
  Lt === null ? Lt = [e] : Lt.push(e);
}
function wc(e, t, n, r) {
  var a = t.interleaved;
  return a === null ? (n.next = n, ni(t)) : (n.next = a.next, a.next = n), t.interleaved = n, at(e, r);
}
function at(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var dt = !1;
function ri(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Tc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function tt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function wt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, L & 2) {
    var a = r.pending;
    return a === null ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, at(e, n);
  }
  return a = r.interleaved, a === null ? (t.next = t, ni(r)) : (t.next = a.next, a.next = t), r.interleaved = t, at(e, n);
}
function Zr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Bo(e, n);
  }
}
function ks(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var a = null, l = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var o = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        l === null ? a = l = o : l = l.next = o, n = n.next;
      } while (n !== null);
      l === null ? a = l = t : l = l.next = t;
    } else a = l = t;
    n = { baseState: r.baseState, firstBaseUpdate: a, lastBaseUpdate: l, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function wa(e, t, n, r) {
  var a = e.updateQueue;
  dt = !1;
  var l = a.firstBaseUpdate, o = a.lastBaseUpdate, i = a.shared.pending;
  if (i !== null) {
    a.shared.pending = null;
    var s = i, u = s.next;
    s.next = null, o === null ? l = u : o.next = u, o = s;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, i = g.lastBaseUpdate, i !== o && (i === null ? g.firstBaseUpdate = u : i.next = u, g.lastBaseUpdate = s));
  }
  if (l !== null) {
    var d = a.baseState;
    o = 0, g = u = s = null, i = l;
    do {
      var f = i.lane, h = i.eventTime;
      if ((r & f) === f) {
        g !== null && (g = g.next = {
          eventTime: h,
          lane: 0,
          tag: i.tag,
          payload: i.payload,
          callback: i.callback,
          next: null
        });
        e: {
          var v = e, y = i;
          switch (f = t, h = n, y.tag) {
            case 1:
              if (v = y.payload, typeof v == "function") {
                d = v.call(h, d, f);
                break e;
              }
              d = v;
              break e;
            case 3:
              v.flags = v.flags & -65537 | 128;
            case 0:
              if (v = y.payload, f = typeof v == "function" ? v.call(h, d, f) : v, f == null) break e;
              d = V({}, d, f);
              break e;
            case 2:
              dt = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, f = a.effects, f === null ? a.effects = [i] : f.push(i));
      } else h = { eventTime: h, lane: f, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, g === null ? (u = g = h, s = d) : g = g.next = h, o |= f;
      if (i = i.next, i === null) {
        if (i = a.shared.pending, i === null) break;
        f = i, i = f.next, f.next = null, a.lastBaseUpdate = f, a.shared.pending = null;
      }
    } while (!0);
    if (g === null && (s = d), a.baseState = s, a.firstBaseUpdate = u, a.lastBaseUpdate = g, t = a.shared.interleaved, t !== null) {
      a = t;
      do
        o |= a.lane, a = a.next;
      while (a !== t);
    } else l === null && (a.shared.lanes = 0);
    Ht |= o, e.lanes = o, e.memoizedState = d;
  }
}
function ws(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], a = r.callback;
    if (a !== null) {
      if (r.callback = null, r = n, typeof a != "function") throw Error(k(191, a));
      a.call(r);
    }
  }
}
var xr = {}, Qe = Mt(xr), pr = Mt(xr), gr = Mt(xr);
function $t(e) {
  if (e === xr) throw Error(k(174));
  return e;
}
function ai(e, t) {
  switch (R(gr, t), R(pr, e), R(Qe, xr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Wl(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Wl(t, e);
  }
  j(Qe), R(Qe, t);
}
function Tn() {
  j(Qe), j(pr), j(gr);
}
function _c(e) {
  $t(gr.current);
  var t = $t(Qe.current), n = Wl(t, e.type);
  t !== n && (R(pr, e), R(Qe, n));
}
function li(e) {
  pr.current === e && (j(Qe), j(pr));
}
var U = Mt(0);
function Ta(e) {
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
var yl = [];
function oi() {
  for (var e = 0; e < yl.length; e++) yl[e]._workInProgressVersionPrimary = null;
  yl.length = 0;
}
var Jr = ot.ReactCurrentDispatcher, vl = ot.ReactCurrentBatchConfig, Bt = 0, G = null, J = null, te = null, _a = !1, Zn = !1, hr = 0, Wm = 0;
function oe() {
  throw Error(k(321));
}
function ii(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!Be(e[n], t[n])) return !1;
  return !0;
}
function si(e, t, n, r, a, l) {
  if (Bt = l, G = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Jr.current = e === null || e.memoizedState === null ? Gm : Vm, e = n(r, a), Zn) {
    l = 0;
    do {
      if (Zn = !1, hr = 0, 25 <= l) throw Error(k(301));
      l += 1, te = J = null, t.updateQueue = null, Jr.current = Km, e = n(r, a);
    } while (Zn);
  }
  if (Jr.current = Ca, t = J !== null && J.next !== null, Bt = 0, te = J = G = null, _a = !1, t) throw Error(k(300));
  return e;
}
function ui() {
  var e = hr !== 0;
  return hr = 0, e;
}
function Ge() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return te === null ? G.memoizedState = te = e : te = te.next = e, te;
}
function Pe() {
  if (J === null) {
    var e = G.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = J.next;
  var t = te === null ? G.memoizedState : te.next;
  if (t !== null) te = t, J = e;
  else {
    if (e === null) throw Error(k(310));
    J = e, e = { memoizedState: J.memoizedState, baseState: J.baseState, baseQueue: J.baseQueue, queue: J.queue, next: null }, te === null ? G.memoizedState = te = e : te = te.next = e;
  }
  return te;
}
function yr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Sl(e) {
  var t = Pe(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = J, a = r.baseQueue, l = n.pending;
  if (l !== null) {
    if (a !== null) {
      var o = a.next;
      a.next = l.next, l.next = o;
    }
    r.baseQueue = a = l, n.pending = null;
  }
  if (a !== null) {
    l = a.next, r = r.baseState;
    var i = o = null, s = null, u = l;
    do {
      var g = u.lane;
      if ((Bt & g) === g) s !== null && (s = s.next = { lane: 0, action: u.action, hasEagerState: u.hasEagerState, eagerState: u.eagerState, next: null }), r = u.hasEagerState ? u.eagerState : e(r, u.action);
      else {
        var d = {
          lane: g,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null
        };
        s === null ? (i = s = d, o = r) : s = s.next = d, G.lanes |= g, Ht |= g;
      }
      u = u.next;
    } while (u !== null && u !== l);
    s === null ? o = r : s.next = i, Be(r, t.memoizedState) || (he = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    a = e;
    do
      l = a.lane, G.lanes |= l, Ht |= l, a = a.next;
    while (a !== e);
  } else a === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function kl(e) {
  var t = Pe(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, a = n.pending, l = t.memoizedState;
  if (a !== null) {
    n.pending = null;
    var o = a = a.next;
    do
      l = e(l, o.action), o = o.next;
    while (o !== a);
    Be(l, t.memoizedState) || (he = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
  }
  return [l, r];
}
function Cc() {
}
function xc(e, t) {
  var n = G, r = Pe(), a = t(), l = !Be(r.memoizedState, a);
  if (l && (r.memoizedState = a, he = !0), r = r.queue, ci(Mc.bind(null, n, r, e), [e]), r.getSnapshot !== t || l || te !== null && te.memoizedState.tag & 1) {
    if (n.flags |= 2048, vr(9, Ec.bind(null, n, r, a, t), void 0, null), ne === null) throw Error(k(349));
    Bt & 30 || Nc(n, t, a);
  }
  return a;
}
function Nc(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Ec(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ac(t) && Dc(e);
}
function Mc(e, t, n) {
  return n(function() {
    Ac(t) && Dc(e);
  });
}
function Ac(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Be(e, n);
  } catch {
    return !0;
  }
}
function Dc(e) {
  var t = at(e, 1);
  t !== null && We(t, e, 1, -1);
}
function Ts(e) {
  var t = Ge();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: yr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Um.bind(null, G, e), [t.memoizedState, e];
}
function vr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = G.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, G.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ic() {
  return Pe().memoizedState;
}
function ea(e, t, n, r) {
  var a = Ge();
  G.flags |= e, a.memoizedState = vr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Ra(e, t, n, r) {
  var a = Pe();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (J !== null) {
    var o = J.memoizedState;
    if (l = o.destroy, r !== null && ii(r, o.deps)) {
      a.memoizedState = vr(t, n, l, r);
      return;
    }
  }
  G.flags |= e, a.memoizedState = vr(1 | t, n, l, r);
}
function _s(e, t) {
  return ea(8390656, 8, e, t);
}
function ci(e, t) {
  return Ra(2048, 8, e, t);
}
function Fc(e, t) {
  return Ra(4, 2, e, t);
}
function bc(e, t) {
  return Ra(4, 4, e, t);
}
function Pc(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Lc(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ra(4, 4, Pc.bind(null, t, e), n);
}
function di() {
}
function $c(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ii(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function zc(e, t) {
  var n = Pe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ii(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Rc(e, t, n) {
  return Bt & 21 ? (Be(n, t) || (n = Hu(), G.lanes |= n, Ht |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, he = !0), e.memoizedState = n);
}
function Bm(e, t) {
  var n = $;
  $ = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = vl.transition;
  vl.transition = {};
  try {
    e(!1), t();
  } finally {
    $ = n, vl.transition = r;
  }
}
function Oc() {
  return Pe().memoizedState;
}
function Hm(e, t, n) {
  var r = _t(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, jc(e)) Wc(t, n);
  else if (n = wc(e, t, n, r), n !== null) {
    var a = de();
    We(n, e, r, a), Bc(n, t, r);
  }
}
function Um(e, t, n) {
  var r = _t(e), a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (jc(e)) Wc(t, a);
  else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
      var o = t.lastRenderedState, i = l(o, n);
      if (a.hasEagerState = !0, a.eagerState = i, Be(i, o)) {
        var s = t.interleaved;
        s === null ? (a.next = a, ni(t)) : (a.next = s.next, s.next = a), t.interleaved = a;
        return;
      }
    } catch {
    } finally {
    }
    n = wc(e, t, a, r), n !== null && (a = de(), We(n, e, r, a), Bc(n, t, r));
  }
}
function jc(e) {
  var t = e.alternate;
  return e === G || t !== null && t === G;
}
function Wc(e, t) {
  Zn = _a = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Bc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Bo(e, n);
  }
}
var Ca = { readContext: be, useCallback: oe, useContext: oe, useEffect: oe, useImperativeHandle: oe, useInsertionEffect: oe, useLayoutEffect: oe, useMemo: oe, useReducer: oe, useRef: oe, useState: oe, useDebugValue: oe, useDeferredValue: oe, useTransition: oe, useMutableSource: oe, useSyncExternalStore: oe, useId: oe, unstable_isNewReconciler: !1 }, Gm = { readContext: be, useCallback: function(e, t) {
  return Ge().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: be, useEffect: _s, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ea(
    4194308,
    4,
    Pc.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ea(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ea(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ge();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ge();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Hm.bind(null, G, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ge();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ts, useDebugValue: di, useDeferredValue: function(e) {
  return Ge().memoizedState = e;
}, useTransition: function() {
  var e = Ts(!1), t = e[0];
  return e = Bm.bind(null, e[1]), Ge().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = G, a = Ge();
  if (H) {
    if (n === void 0) throw Error(k(407));
    n = n();
  } else {
    if (n = t(), ne === null) throw Error(k(349));
    Bt & 30 || Nc(r, t, n);
  }
  a.memoizedState = n;
  var l = { value: n, getSnapshot: t };
  return a.queue = l, _s(Mc.bind(
    null,
    r,
    l,
    e
  ), [e]), r.flags |= 2048, vr(9, Ec.bind(null, r, l, n, t), void 0, null), n;
}, useId: function() {
  var e = Ge(), t = ne.identifierPrefix;
  if (H) {
    var n = et, r = Je;
    n = (r & ~(1 << 32 - je(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = hr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Wm++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Vm = {
  readContext: be,
  useCallback: $c,
  useContext: be,
  useEffect: ci,
  useImperativeHandle: Lc,
  useInsertionEffect: Fc,
  useLayoutEffect: bc,
  useMemo: zc,
  useReducer: Sl,
  useRef: Ic,
  useState: function() {
    return Sl(yr);
  },
  useDebugValue: di,
  useDeferredValue: function(e) {
    var t = Pe();
    return Rc(t, J.memoizedState, e);
  },
  useTransition: function() {
    var e = Sl(yr)[0], t = Pe().memoizedState;
    return [e, t];
  },
  useMutableSource: Cc,
  useSyncExternalStore: xc,
  useId: Oc,
  unstable_isNewReconciler: !1
}, Km = { readContext: be, useCallback: $c, useContext: be, useEffect: ci, useImperativeHandle: Lc, useInsertionEffect: Fc, useLayoutEffect: bc, useMemo: zc, useReducer: kl, useRef: Ic, useState: function() {
  return kl(yr);
}, useDebugValue: di, useDeferredValue: function(e) {
  var t = Pe();
  return J === null ? t.memoizedState = e : Rc(t, J.memoizedState, e);
}, useTransition: function() {
  var e = kl(yr)[0], t = Pe().memoizedState;
  return [e, t];
}, useMutableSource: Cc, useSyncExternalStore: xc, useId: Oc, unstable_isNewReconciler: !1 };
function ze(e, t) {
  if (e && e.defaultProps) {
    t = V({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function so(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : V({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Oa = { isMounted: function(e) {
  return (e = e._reactInternals) ? Vt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), a = _t(e), l = tt(r, a);
  l.payload = t, n != null && (l.callback = n), t = wt(e, l, a), t !== null && (We(t, e, a, r), Zr(t, e, a));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = de(), a = _t(e), l = tt(r, a);
  l.tag = 1, l.payload = t, n != null && (l.callback = n), t = wt(e, l, a), t !== null && (We(t, e, a, r), Zr(t, e, a));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = de(), r = _t(e), a = tt(n, r);
  a.tag = 2, t != null && (a.callback = t), t = wt(e, a, r), t !== null && (We(t, e, r, n), Zr(t, e, r));
} };
function Cs(e, t, n, r, a, l, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, l, o) : t.prototype && t.prototype.isPureReactComponent ? !cr(n, r) || !cr(a, l) : !0;
}
function Hc(e, t, n) {
  var r = !1, a = Nt, l = t.contextType;
  return typeof l == "object" && l !== null ? l = be(l) : (a = ve(t) ? jt : ue.current, r = t.contextTypes, l = (r = r != null) ? Sn(e, a) : Nt), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Oa, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = l), t;
}
function xs(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Oa.enqueueReplaceState(t, t.state, null);
}
function uo(e, t, n, r) {
  var a = e.stateNode;
  a.props = n, a.state = e.memoizedState, a.refs = {}, ri(e);
  var l = t.contextType;
  typeof l == "object" && l !== null ? a.context = be(l) : (l = ve(t) ? jt : ue.current, a.context = Sn(e, l)), a.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (so(e, t, l, n), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && Oa.enqueueReplaceState(a, a.state, null), wa(e, n, a, r), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
}
function _n(e, t) {
  try {
    var n = "", r = t;
    do
      n += wf(r), r = r.return;
    while (r);
    var a = n;
  } catch (l) {
    a = `
Error generating stack: ` + l.message + `
` + l.stack;
  }
  return { value: e, source: t, stack: a, digest: null };
}
function wl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function co(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Qm = typeof WeakMap == "function" ? WeakMap : Map;
function Uc(e, t, n) {
  n = tt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    Na || (Na = !0, wo = r), co(e, t);
  }, n;
}
function Gc(e, t, n) {
  n = tt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var a = t.value;
    n.payload = function() {
      return r(a);
    }, n.callback = function() {
      co(e, t);
    };
  }
  var l = e.stateNode;
  return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
    co(e, t), typeof r != "function" && (Tt === null ? Tt = /* @__PURE__ */ new Set([this]) : Tt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Ns(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Qm();
    var a = /* @__PURE__ */ new Set();
    r.set(t, a);
  } else a = r.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), r.set(t, a));
  a.has(n) || (a.add(n), e = sp.bind(null, e, t, n), t.then(e, e));
}
function Es(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ms(e, t, n, r, a) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = tt(-1, 1), t.tag = 2, wt(n, t, 1))), n.lanes |= 1), e);
}
var Ym = ot.ReactCurrentOwner, he = !1;
function ce(e, t, n, r) {
  t.child = e === null ? kc(t, null, n, r) : wn(t, e.child, n, r);
}
function As(e, t, n, r, a) {
  n = n.render;
  var l = t.ref;
  return hn(t, a), r = si(e, t, n, r, l, a), n = ui(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, lt(e, t, a)) : (H && n && Xo(t), t.flags |= 1, ce(e, t, r, a), t.child);
}
function Ds(e, t, n, r, a) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" && !Si(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, Vc(e, t, l, r, a)) : (e = aa(n.type, null, r, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (l = e.child, !(e.lanes & a)) {
    var o = l.memoizedProps;
    if (n = n.compare, n = n !== null ? n : cr, n(o, r) && e.ref === t.ref) return lt(e, t, a);
  }
  return t.flags |= 1, e = Ct(l, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Vc(e, t, n, r, a) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (cr(l, r) && e.ref === t.ref) if (he = !1, t.pendingProps = r = l, (e.lanes & a) !== 0) e.flags & 131072 && (he = !0);
    else return t.lanes = e.lanes, lt(e, t, a);
  }
  return fo(e, t, n, r, a);
}
function Kc(e, t, n) {
  var r = t.pendingProps, a = r.children, l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, R(dn, we), we |= n;
  else {
    if (!(n & 1073741824)) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, R(dn, we), we |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = l !== null ? l.baseLanes : n, R(dn, we), we |= r;
  }
  else l !== null ? (r = l.baseLanes | n, t.memoizedState = null) : r = n, R(dn, we), we |= r;
  return ce(e, t, a, n), t.child;
}
function Qc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function fo(e, t, n, r, a) {
  var l = ve(n) ? jt : ue.current;
  return l = Sn(t, l), hn(t, a), n = si(e, t, n, r, l, a), r = ui(), e !== null && !he ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, lt(e, t, a)) : (H && r && Xo(t), t.flags |= 1, ce(e, t, n, a), t.child);
}
function Is(e, t, n, r, a) {
  if (ve(n)) {
    var l = !0;
    ha(t);
  } else l = !1;
  if (hn(t, a), t.stateNode === null) ta(e, t), Hc(t, n, r), uo(t, n, r, a), r = !0;
  else if (e === null) {
    var o = t.stateNode, i = t.memoizedProps;
    o.props = i;
    var s = o.context, u = n.contextType;
    typeof u == "object" && u !== null ? u = be(u) : (u = ve(n) ? jt : ue.current, u = Sn(t, u));
    var g = n.getDerivedStateFromProps, d = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    d || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (i !== r || s !== u) && xs(t, o, r, u), dt = !1;
    var f = t.memoizedState;
    o.state = f, wa(t, r, o, a), s = t.memoizedState, i !== r || f !== s || ye.current || dt ? (typeof g == "function" && (so(t, n, g, r), s = t.memoizedState), (i = dt || Cs(t, n, i, r, f, s, u)) ? (d || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), o.props = r, o.state = s, o.context = u, r = i) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, Tc(e, t), i = t.memoizedProps, u = t.type === t.elementType ? i : ze(t.type, i), o.props = u, d = t.pendingProps, f = o.context, s = n.contextType, typeof s == "object" && s !== null ? s = be(s) : (s = ve(n) ? jt : ue.current, s = Sn(t, s));
    var h = n.getDerivedStateFromProps;
    (g = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (i !== d || f !== s) && xs(t, o, r, s), dt = !1, f = t.memoizedState, o.state = f, wa(t, r, o, a);
    var v = t.memoizedState;
    i !== d || f !== v || ye.current || dt ? (typeof h == "function" && (so(t, n, h, r), v = t.memoizedState), (u = dt || Cs(t, n, u, r, f, v, s) || !1) ? (g || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, v, s), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, v, s)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), o.props = r, o.state = v, o.context = s, r = u) : (typeof o.componentDidUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return mo(e, t, n, r, l, a);
}
function mo(e, t, n, r, a, l) {
  Qc(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return a && hs(t, n, !1), lt(e, t, l);
  r = t.stateNode, Ym.current = t;
  var i = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = wn(t, e.child, null, l), t.child = wn(t, null, i, l)) : ce(e, t, i, l), t.memoizedState = r.state, a && hs(t, n, !0), t.child;
}
function Yc(e) {
  var t = e.stateNode;
  t.pendingContext ? gs(e, t.pendingContext, t.pendingContext !== t.context) : t.context && gs(e, t.context, !1), ai(e, t.containerInfo);
}
function Fs(e, t, n, r, a) {
  return kn(), Zo(a), t.flags |= 256, ce(e, t, n, r), t.child;
}
var po = { dehydrated: null, treeContext: null, retryLane: 0 };
function go(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Xc(e, t, n) {
  var r = t.pendingProps, a = U.current, l = !1, o = (t.flags & 128) !== 0, i;
  if ((i = o) || (i = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), i ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), R(U, a & 1), e === null)
    return oo(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, l ? (r = t.mode, l = t.child, o = { mode: "hidden", children: o }, !(r & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = o) : l = Ba(o, r, 0, null), e = Rt(e, r, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = go(n), t.memoizedState = po, e) : fi(t, o));
  if (a = e.memoizedState, a !== null && (i = a.dehydrated, i !== null)) return Xm(e, t, o, r, i, a, n);
  if (l) {
    l = r.fallback, o = t.mode, a = e.child, i = a.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== a ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Ct(a, s), r.subtreeFlags = a.subtreeFlags & 14680064), i !== null ? l = Ct(i, l) : (l = Rt(l, o, n, null), l.flags |= 2), l.return = t, r.return = t, r.sibling = l, t.child = r, r = l, l = t.child, o = e.child.memoizedState, o = o === null ? go(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, l.memoizedState = o, l.childLanes = e.childLanes & ~n, t.memoizedState = po, r;
  }
  return l = e.child, e = l.sibling, r = Ct(l, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function fi(e, t) {
  return t = Ba({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Hr(e, t, n, r) {
  return r !== null && Zo(r), wn(t, e.child, null, n), e = fi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Xm(e, t, n, r, a, l, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = wl(Error(k(422))), Hr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = r.fallback, a = t.mode, r = Ba({ mode: "visible", children: r.children }, a, 0, null), l = Rt(l, a, o, null), l.flags |= 2, r.return = t, l.return = t, r.sibling = l, t.child = r, t.mode & 1 && wn(t, e.child, null, o), t.child.memoizedState = go(o), t.memoizedState = po, l);
  if (!(t.mode & 1)) return Hr(e, t, o, null);
  if (a.data === "$!") {
    if (r = a.nextSibling && a.nextSibling.dataset, r) var i = r.dgst;
    return r = i, l = Error(k(419)), r = wl(l, r, void 0), Hr(e, t, o, r);
  }
  if (i = (o & e.childLanes) !== 0, he || i) {
    if (r = ne, r !== null) {
      switch (o & -o) {
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
      a = a & (r.suspendedLanes | o) ? 0 : a, a !== 0 && a !== l.retryLane && (l.retryLane = a, at(e, a), We(r, e, a, -1));
    }
    return vi(), r = wl(Error(k(421))), Hr(e, t, o, r);
  }
  return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = up.bind(null, e), a._reactRetry = t, null) : (e = l.treeContext, _e = kt(a.nextSibling), Ce = t, H = !0, Oe = null, e !== null && (Ae[De++] = Je, Ae[De++] = et, Ae[De++] = Wt, Je = e.id, et = e.overflow, Wt = t), t = fi(t, r.children), t.flags |= 4096, t);
}
function bs(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), io(e.return, t, n);
}
function Tl(e, t, n, r, a) {
  var l = e.memoizedState;
  l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = r, l.tail = n, l.tailMode = a);
}
function qc(e, t, n) {
  var r = t.pendingProps, a = r.revealOrder, l = r.tail;
  if (ce(e, t, r.children, n), r = U.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && bs(e, n, t);
      else if (e.tag === 19) bs(e, n, t);
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
  if (R(U, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (a) {
    case "forwards":
      for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && Ta(e) === null && (a = n), n = n.sibling;
      n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Tl(t, !1, a, n, l);
      break;
    case "backwards":
      for (n = null, a = t.child, t.child = null; a !== null; ) {
        if (e = a.alternate, e !== null && Ta(e) === null) {
          t.child = a;
          break;
        }
        e = a.sibling, a.sibling = n, n = a, a = e;
      }
      Tl(t, !0, n, null, l);
      break;
    case "together":
      Tl(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ta(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function lt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Ht |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (e = t.child, n = Ct(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Ct(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function qm(e, t, n) {
  switch (t.tag) {
    case 3:
      Yc(t), kn();
      break;
    case 5:
      _c(t);
      break;
    case 1:
      ve(t.type) && ha(t);
      break;
    case 4:
      ai(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, a = t.memoizedProps.value;
      R(Sa, r._currentValue), r._currentValue = a;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (R(U, U.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Xc(e, t, n) : (R(U, U.current & 1), e = lt(e, t, n), e !== null ? e.sibling : null);
      R(U, U.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return qc(e, t, n);
        t.flags |= 128;
      }
      if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), R(U, U.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Kc(e, t, n);
  }
  return lt(e, t, n);
}
var Zc, ho, Jc, ed;
Zc = function(e, t) {
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
ho = function() {
};
Jc = function(e, t, n, r) {
  var a = e.memoizedProps;
  if (a !== r) {
    e = t.stateNode, $t(Qe.current);
    var l = null;
    switch (n) {
      case "input":
        a = zl(e, a), r = zl(e, r), l = [];
        break;
      case "select":
        a = V({}, a, { value: void 0 }), r = V({}, r, { value: void 0 }), l = [];
        break;
      case "textarea":
        a = jl(e, a), r = jl(e, r), l = [];
        break;
      default:
        typeof a.onClick != "function" && typeof r.onClick == "function" && (e.onclick = pa);
    }
    Bl(n, r);
    var o;
    n = null;
    for (u in a) if (!r.hasOwnProperty(u) && a.hasOwnProperty(u) && a[u] != null) if (u === "style") {
      var i = a[u];
      for (o in i) i.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else u !== "dangerouslySetInnerHTML" && u !== "children" && u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && u !== "autoFocus" && (rr.hasOwnProperty(u) ? l || (l = []) : (l = l || []).push(u, null));
    for (u in r) {
      var s = r[u];
      if (i = a != null ? a[u] : void 0, r.hasOwnProperty(u) && s !== i && (s != null || i != null)) if (u === "style") if (i) {
        for (o in i) !i.hasOwnProperty(o) || s && s.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in s) s.hasOwnProperty(o) && i[o] !== s[o] && (n || (n = {}), n[o] = s[o]);
      } else n || (l || (l = []), l.push(
        u,
        n
      )), n = s;
      else u === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, i = i ? i.__html : void 0, s != null && i !== s && (l = l || []).push(u, s)) : u === "children" ? typeof s != "string" && typeof s != "number" || (l = l || []).push(u, "" + s) : u !== "suppressContentEditableWarning" && u !== "suppressHydrationWarning" && (rr.hasOwnProperty(u) ? (s != null && u === "onScroll" && O("scroll", e), l || i === s || (l = [])) : (l = l || []).push(u, s));
    }
    n && (l = l || []).push("style", n);
    var u = l;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
ed = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function jn(e, t) {
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
function ie(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 14680064, r |= a.flags & 14680064, a.return = e, a = a.sibling;
  else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Zm(e, t, n) {
  var r = t.pendingProps;
  switch (qo(t), t.tag) {
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
      return ie(t), null;
    case 1:
      return ve(t.type) && ga(), ie(t), null;
    case 3:
      return r = t.stateNode, Tn(), j(ye), j(ue), oi(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Wr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Oe !== null && (Co(Oe), Oe = null))), ho(e, t), ie(t), null;
    case 5:
      li(t);
      var a = $t(gr.current);
      if (n = t.type, e !== null && t.stateNode != null) Jc(e, t, n, r, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return ie(t), null;
        }
        if (e = $t(Qe.current), Wr(t)) {
          r = t.stateNode, n = t.type;
          var l = t.memoizedProps;
          switch (r[Ve] = t, r[mr] = l, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              O("cancel", r), O("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              O("load", r);
              break;
            case "video":
            case "audio":
              for (a = 0; a < Vn.length; a++) O(Vn[a], r);
              break;
            case "source":
              O("error", r);
              break;
            case "img":
            case "image":
            case "link":
              O(
                "error",
                r
              ), O("load", r);
              break;
            case "details":
              O("toggle", r);
              break;
            case "input":
              Bi(r, l), O("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!l.multiple }, O("invalid", r);
              break;
            case "textarea":
              Ui(r, l), O("invalid", r);
          }
          Bl(n, l), a = null;
          for (var o in l) if (l.hasOwnProperty(o)) {
            var i = l[o];
            o === "children" ? typeof i == "string" ? r.textContent !== i && (l.suppressHydrationWarning !== !0 && jr(r.textContent, i, e), a = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (l.suppressHydrationWarning !== !0 && jr(
              r.textContent,
              i,
              e
            ), a = ["children", "" + i]) : rr.hasOwnProperty(o) && i != null && o === "onScroll" && O("scroll", r);
          }
          switch (n) {
            case "input":
              Fr(r), Hi(r, l, !0);
              break;
            case "textarea":
              Fr(r), Gi(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = pa);
          }
          r = a, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Mu(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ve] = t, e[mr] = r, Zc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = Hl(n, r), n) {
              case "dialog":
                O("cancel", e), O("close", e), a = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                O("load", e), a = r;
                break;
              case "video":
              case "audio":
                for (a = 0; a < Vn.length; a++) O(Vn[a], e);
                a = r;
                break;
              case "source":
                O("error", e), a = r;
                break;
              case "img":
              case "image":
              case "link":
                O(
                  "error",
                  e
                ), O("load", e), a = r;
                break;
              case "details":
                O("toggle", e), a = r;
                break;
              case "input":
                Bi(e, r), a = zl(e, r), O("invalid", e);
                break;
              case "option":
                a = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, a = V({}, r, { value: void 0 }), O("invalid", e);
                break;
              case "textarea":
                Ui(e, r), a = jl(e, r), O("invalid", e);
                break;
              default:
                a = r;
            }
            Bl(n, a), i = a;
            for (l in i) if (i.hasOwnProperty(l)) {
              var s = i[l];
              l === "style" ? Iu(e, s) : l === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Au(e, s)) : l === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && ar(e, s) : typeof s == "number" && ar(e, "" + s) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (rr.hasOwnProperty(l) ? s != null && l === "onScroll" && O("scroll", e) : s != null && $o(e, l, s, o));
            }
            switch (n) {
              case "input":
                Fr(e), Hi(e, r, !1);
                break;
              case "textarea":
                Fr(e), Gi(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + xt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, l = r.value, l != null ? fn(e, !!r.multiple, l, !1) : r.defaultValue != null && fn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof a.onClick == "function" && (e.onclick = pa);
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
      return ie(t), null;
    case 6:
      if (e && t.stateNode != null) ed(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (n = $t(gr.current), $t(Qe.current), Wr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ve] = t, (l = r.nodeValue !== n) && (e = Ce, e !== null)) switch (e.tag) {
            case 3:
              jr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && jr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          l && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ve] = t, t.stateNode = r;
      }
      return ie(t), null;
    case 13:
      if (j(U), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (H && _e !== null && t.mode & 1 && !(t.flags & 128)) vc(), kn(), t.flags |= 98560, l = !1;
        else if (l = Wr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!l) throw Error(k(318));
            if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(k(317));
            l[Ve] = t;
          } else kn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          ie(t), l = !1;
        } else Oe !== null && (Co(Oe), Oe = null), l = !0;
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || U.current & 1 ? ee === 0 && (ee = 3) : vi())), t.updateQueue !== null && (t.flags |= 4), ie(t), null);
    case 4:
      return Tn(), ho(e, t), e === null && dr(t.stateNode.containerInfo), ie(t), null;
    case 10:
      return ti(t.type._context), ie(t), null;
    case 17:
      return ve(t.type) && ga(), ie(t), null;
    case 19:
      if (j(U), l = t.memoizedState, l === null) return ie(t), null;
      if (r = (t.flags & 128) !== 0, o = l.rendering, o === null) if (r) jn(l, !1);
      else {
        if (ee !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Ta(e), o !== null) {
            for (t.flags |= 128, jn(l, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) l = n, e = r, l.flags &= 14680066, o = l.alternate, o === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = o.childLanes, l.lanes = o.lanes, l.child = o.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = o.memoizedProps, l.memoizedState = o.memoizedState, l.updateQueue = o.updateQueue, l.type = o.type, e = o.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return R(U, U.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        l.tail !== null && q() > Cn && (t.flags |= 128, r = !0, jn(l, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Ta(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), jn(l, !0), l.tail === null && l.tailMode === "hidden" && !o.alternate && !H) return ie(t), null;
        } else 2 * q() - l.renderingStartTime > Cn && n !== 1073741824 && (t.flags |= 128, r = !0, jn(l, !1), t.lanes = 4194304);
        l.isBackwards ? (o.sibling = t.child, t.child = o) : (n = l.last, n !== null ? n.sibling = o : t.child = o, l.last = o);
      }
      return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = q(), t.sibling = null, n = U.current, R(U, r ? n & 1 | 2 : n & 1), t) : (ie(t), null);
    case 22:
    case 23:
      return yi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? we & 1073741824 && (ie(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : ie(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function Jm(e, t) {
  switch (qo(t), t.tag) {
    case 1:
      return ve(t.type) && ga(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Tn(), j(ye), j(ue), oi(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return li(t), null;
    case 13:
      if (j(U), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(k(340));
        kn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return j(U), null;
    case 4:
      return Tn(), null;
    case 10:
      return ti(t.type._context), null;
    case 22:
    case 23:
      return yi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ur = !1, se = !1, ep = typeof WeakSet == "function" ? WeakSet : Set, x = null;
function cn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    Q(e, t, r);
  }
  else n.current = null;
}
function yo(e, t, n) {
  try {
    n();
  } catch (r) {
    Q(e, t, r);
  }
}
var Ps = !1;
function tp(e, t) {
  if (Jl = da, e = lc(), Yo(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var a = r.anchorOffset, l = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, l.nodeType;
        } catch {
          n = null;
          break e;
        }
        var o = 0, i = -1, s = -1, u = 0, g = 0, d = e, f = null;
        t: for (; ; ) {
          for (var h; d !== n || a !== 0 && d.nodeType !== 3 || (i = o + a), d !== l || r !== 0 && d.nodeType !== 3 || (s = o + r), d.nodeType === 3 && (o += d.nodeValue.length), (h = d.firstChild) !== null; )
            f = d, d = h;
          for (; ; ) {
            if (d === e) break t;
            if (f === n && ++u === a && (i = o), f === l && ++g === r && (s = o), (h = d.nextSibling) !== null) break;
            d = f, f = d.parentNode;
          }
          d = h;
        }
        n = i === -1 || s === -1 ? null : { start: i, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (eo = { focusedElem: e, selectionRange: n }, da = !1, x = t; x !== null; ) if (t = x, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, x = e;
  else for (; x !== null; ) {
    t = x;
    try {
      var v = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (v !== null) {
            var y = v.memoizedProps, b = v.memoizedState, m = t.stateNode, c = m.getSnapshotBeforeUpdate(t.elementType === t.type ? y : ze(t.type, y), b);
            m.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var p = t.stateNode.containerInfo;
          p.nodeType === 1 ? p.textContent = "" : p.nodeType === 9 && p.documentElement && p.removeChild(p.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(k(163));
      }
    } catch (S) {
      Q(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, x = e;
      break;
    }
    x = t.return;
  }
  return v = Ps, Ps = !1, v;
}
function Jn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var a = r = r.next;
    do {
      if ((a.tag & e) === e) {
        var l = a.destroy;
        a.destroy = void 0, l !== void 0 && yo(t, n, l);
      }
      a = a.next;
    } while (a !== r);
  }
}
function ja(e, t) {
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
function vo(e) {
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
function td(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, td(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ve], delete t[mr], delete t[ro], delete t[zm], delete t[Rm])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function nd(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ls(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || nd(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function So(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = pa));
  else if (r !== 4 && (e = e.child, e !== null)) for (So(e, t, n), e = e.sibling; e !== null; ) So(e, t, n), e = e.sibling;
}
function ko(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (ko(e, t, n), e = e.sibling; e !== null; ) ko(e, t, n), e = e.sibling;
}
var re = null, Re = !1;
function ut(e, t, n) {
  for (n = n.child; n !== null; ) rd(e, t, n), n = n.sibling;
}
function rd(e, t, n) {
  if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
    Ke.onCommitFiberUnmount(Fa, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      se || cn(n, t);
    case 6:
      var r = re, a = Re;
      re = null, ut(e, t, n), re = r, Re = a, re !== null && (Re ? (e = re, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : re.removeChild(n.stateNode));
      break;
    case 18:
      re !== null && (Re ? (e = re, n = n.stateNode, e.nodeType === 8 ? gl(e.parentNode, n) : e.nodeType === 1 && gl(e, n), sr(e)) : gl(re, n.stateNode));
      break;
    case 4:
      r = re, a = Re, re = n.stateNode.containerInfo, Re = !0, ut(e, t, n), re = r, Re = a;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!se && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        a = r = r.next;
        do {
          var l = a, o = l.destroy;
          l = l.tag, o !== void 0 && (l & 2 || l & 4) && yo(n, t, o), a = a.next;
        } while (a !== r);
      }
      ut(e, t, n);
      break;
    case 1:
      if (!se && (cn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        Q(n, t, i);
      }
      ut(e, t, n);
      break;
    case 21:
      ut(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (se = (r = se) || n.memoizedState !== null, ut(e, t, n), se = r) : ut(e, t, n);
      break;
    default:
      ut(e, t, n);
  }
}
function $s(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new ep()), t.forEach(function(r) {
      var a = cp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(a, a));
    });
  }
}
function $e(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var a = n[r];
    try {
      var l = e, o = t, i = o;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            re = i.stateNode, Re = !1;
            break e;
          case 3:
            re = i.stateNode.containerInfo, Re = !0;
            break e;
          case 4:
            re = i.stateNode.containerInfo, Re = !0;
            break e;
        }
        i = i.return;
      }
      if (re === null) throw Error(k(160));
      rd(l, o, a), re = null, Re = !1;
      var s = a.alternate;
      s !== null && (s.return = null), a.return = null;
    } catch (u) {
      Q(a, t, u);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) ad(t, e), t = t.sibling;
}
function ad(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ($e(t, e), Ue(e), r & 4) {
        try {
          Jn(3, e, e.return), ja(3, e);
        } catch (y) {
          Q(e, e.return, y);
        }
        try {
          Jn(5, e, e.return);
        } catch (y) {
          Q(e, e.return, y);
        }
      }
      break;
    case 1:
      $e(t, e), Ue(e), r & 512 && n !== null && cn(n, n.return);
      break;
    case 5:
      if ($e(t, e), Ue(e), r & 512 && n !== null && cn(n, n.return), e.flags & 32) {
        var a = e.stateNode;
        try {
          ar(a, "");
        } catch (y) {
          Q(e, e.return, y);
        }
      }
      if (r & 4 && (a = e.stateNode, a != null)) {
        var l = e.memoizedProps, o = n !== null ? n.memoizedProps : l, i = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          i === "input" && l.type === "radio" && l.name != null && Nu(a, l), Hl(i, o);
          var u = Hl(i, l);
          for (o = 0; o < s.length; o += 2) {
            var g = s[o], d = s[o + 1];
            g === "style" ? Iu(a, d) : g === "dangerouslySetInnerHTML" ? Au(a, d) : g === "children" ? ar(a, d) : $o(a, g, d, u);
          }
          switch (i) {
            case "input":
              Rl(a, l);
              break;
            case "textarea":
              Eu(a, l);
              break;
            case "select":
              var f = a._wrapperState.wasMultiple;
              a._wrapperState.wasMultiple = !!l.multiple;
              var h = l.value;
              h != null ? fn(a, !!l.multiple, h, !1) : f !== !!l.multiple && (l.defaultValue != null ? fn(
                a,
                !!l.multiple,
                l.defaultValue,
                !0
              ) : fn(a, !!l.multiple, l.multiple ? [] : "", !1));
          }
          a[mr] = l;
        } catch (y) {
          Q(e, e.return, y);
        }
      }
      break;
    case 6:
      if ($e(t, e), Ue(e), r & 4) {
        if (e.stateNode === null) throw Error(k(162));
        a = e.stateNode, l = e.memoizedProps;
        try {
          a.nodeValue = l;
        } catch (y) {
          Q(e, e.return, y);
        }
      }
      break;
    case 3:
      if ($e(t, e), Ue(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        sr(t.containerInfo);
      } catch (y) {
        Q(e, e.return, y);
      }
      break;
    case 4:
      $e(t, e), Ue(e);
      break;
    case 13:
      $e(t, e), Ue(e), a = e.child, a.flags & 8192 && (l = a.memoizedState !== null, a.stateNode.isHidden = l, !l || a.alternate !== null && a.alternate.memoizedState !== null || (gi = q())), r & 4 && $s(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (se = (u = se) || g, $e(t, e), se = u) : $e(t, e), Ue(e), r & 8192) {
        if (u = e.memoizedState !== null, (e.stateNode.isHidden = u) && !g && e.mode & 1) for (x = e, g = e.child; g !== null; ) {
          for (d = x = g; x !== null; ) {
            switch (f = x, h = f.child, f.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Jn(4, f, f.return);
                break;
              case 1:
                cn(f, f.return);
                var v = f.stateNode;
                if (typeof v.componentWillUnmount == "function") {
                  r = f, n = f.return;
                  try {
                    t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount();
                  } catch (y) {
                    Q(r, n, y);
                  }
                }
                break;
              case 5:
                cn(f, f.return);
                break;
              case 22:
                if (f.memoizedState !== null) {
                  Rs(d);
                  continue;
                }
            }
            h !== null ? (h.return = f, x = h) : Rs(d);
          }
          g = g.sibling;
        }
        e: for (g = null, d = e; ; ) {
          if (d.tag === 5) {
            if (g === null) {
              g = d;
              try {
                a = d.stateNode, u ? (l = a.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (i = d.stateNode, s = d.memoizedProps.style, o = s != null && s.hasOwnProperty("display") ? s.display : null, i.style.display = Du("display", o));
              } catch (y) {
                Q(e, e.return, y);
              }
            }
          } else if (d.tag === 6) {
            if (g === null) try {
              d.stateNode.nodeValue = u ? "" : d.memoizedProps;
            } catch (y) {
              Q(e, e.return, y);
            }
          } else if ((d.tag !== 22 && d.tag !== 23 || d.memoizedState === null || d === e) && d.child !== null) {
            d.child.return = d, d = d.child;
            continue;
          }
          if (d === e) break e;
          for (; d.sibling === null; ) {
            if (d.return === null || d.return === e) break e;
            g === d && (g = null), d = d.return;
          }
          g === d && (g = null), d.sibling.return = d.return, d = d.sibling;
        }
      }
      break;
    case 19:
      $e(t, e), Ue(e), r & 4 && $s(e);
      break;
    case 21:
      break;
    default:
      $e(
        t,
        e
      ), Ue(e);
  }
}
function Ue(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (nd(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var a = r.stateNode;
          r.flags & 32 && (ar(a, ""), r.flags &= -33);
          var l = Ls(e);
          ko(e, l, a);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, i = Ls(e);
          So(e, i, o);
          break;
        default:
          throw Error(k(161));
      }
    } catch (s) {
      Q(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function np(e, t, n) {
  x = e, ld(e);
}
function ld(e, t, n) {
  for (var r = (e.mode & 1) !== 0; x !== null; ) {
    var a = x, l = a.child;
    if (a.tag === 22 && r) {
      var o = a.memoizedState !== null || Ur;
      if (!o) {
        var i = a.alternate, s = i !== null && i.memoizedState !== null || se;
        i = Ur;
        var u = se;
        if (Ur = o, (se = s) && !u) for (x = a; x !== null; ) o = x, s = o.child, o.tag === 22 && o.memoizedState !== null ? Os(a) : s !== null ? (s.return = o, x = s) : Os(a);
        for (; l !== null; ) x = l, ld(l), l = l.sibling;
        x = a, Ur = i, se = u;
      }
      zs(e);
    } else a.subtreeFlags & 8772 && l !== null ? (l.return = a, x = l) : zs(e);
  }
}
function zs(e) {
  for (; x !== null; ) {
    var t = x;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            se || ja(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !se) if (n === null) r.componentDidMount();
            else {
              var a = t.elementType === t.type ? n.memoizedProps : ze(t.type, n.memoizedProps);
              r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var l = t.updateQueue;
            l !== null && ws(t, l, r);
            break;
          case 3:
            var o = t.updateQueue;
            if (o !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              ws(t, o, n);
            }
            break;
          case 5:
            var i = t.stateNode;
            if (n === null && t.flags & 4) {
              n = i;
              var s = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  s.autoFocus && n.focus();
                  break;
                case "img":
                  s.src && (n.src = s.src);
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
              var u = t.alternate;
              if (u !== null) {
                var g = u.memoizedState;
                if (g !== null) {
                  var d = g.dehydrated;
                  d !== null && sr(d);
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
            throw Error(k(163));
        }
        se || t.flags & 512 && vo(t);
      } catch (f) {
        Q(t, t.return, f);
      }
    }
    if (t === e) {
      x = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, x = n;
      break;
    }
    x = t.return;
  }
}
function Rs(e) {
  for (; x !== null; ) {
    var t = x;
    if (t === e) {
      x = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, x = n;
      break;
    }
    x = t.return;
  }
}
function Os(e) {
  for (; x !== null; ) {
    var t = x;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ja(4, t);
          } catch (s) {
            Q(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var a = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              Q(t, a, s);
            }
          }
          var l = t.return;
          try {
            vo(t);
          } catch (s) {
            Q(t, l, s);
          }
          break;
        case 5:
          var o = t.return;
          try {
            vo(t);
          } catch (s) {
            Q(t, o, s);
          }
      }
    } catch (s) {
      Q(t, t.return, s);
    }
    if (t === e) {
      x = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, x = i;
      break;
    }
    x = t.return;
  }
}
var rp = Math.ceil, xa = ot.ReactCurrentDispatcher, mi = ot.ReactCurrentOwner, Fe = ot.ReactCurrentBatchConfig, L = 0, ne = null, Z = null, ae = 0, we = 0, dn = Mt(0), ee = 0, Sr = null, Ht = 0, Wa = 0, pi = 0, er = null, ge = null, gi = 0, Cn = 1 / 0, Xe = null, Na = !1, wo = null, Tt = null, Gr = !1, ht = null, Ea = 0, tr = 0, To = null, na = -1, ra = 0;
function de() {
  return L & 6 ? q() : na !== -1 ? na : na = q();
}
function _t(e) {
  return e.mode & 1 ? L & 2 && ae !== 0 ? ae & -ae : jm.transition !== null ? (ra === 0 && (ra = Hu()), ra) : (e = $, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Xu(e.type)), e) : 1;
}
function We(e, t, n, r) {
  if (50 < tr) throw tr = 0, To = null, Error(k(185));
  Tr(e, n, r), (!(L & 2) || e !== ne) && (e === ne && (!(L & 2) && (Wa |= n), ee === 4 && pt(e, ae)), Se(e, r), n === 1 && L === 0 && !(t.mode & 1) && (Cn = q() + 500, za && At()));
}
function Se(e, t) {
  var n = e.callbackNode;
  jf(e, t);
  var r = ca(e, e === ne ? ae : 0);
  if (r === 0) n !== null && Qi(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Qi(n), t === 1) e.tag === 0 ? Om(js.bind(null, e)) : gc(js.bind(null, e)), Lm(function() {
      !(L & 6) && At();
    }), n = null;
    else {
      switch (Uu(r)) {
        case 1:
          n = Wo;
          break;
        case 4:
          n = Wu;
          break;
        case 16:
          n = ua;
          break;
        case 536870912:
          n = Bu;
          break;
        default:
          n = ua;
      }
      n = md(n, od.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function od(e, t) {
  if (na = -1, ra = 0, L & 6) throw Error(k(327));
  var n = e.callbackNode;
  if (yn() && e.callbackNode !== n) return null;
  var r = ca(e, e === ne ? ae : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ma(e, r);
  else {
    t = r;
    var a = L;
    L |= 2;
    var l = sd();
    (ne !== e || ae !== t) && (Xe = null, Cn = q() + 500, zt(e, t));
    do
      try {
        op();
        break;
      } catch (i) {
        id(e, i);
      }
    while (!0);
    ei(), xa.current = l, L = a, Z !== null ? t = 0 : (ne = null, ae = 0, t = ee);
  }
  if (t !== 0) {
    if (t === 2 && (a = Ql(e), a !== 0 && (r = a, t = _o(e, a))), t === 1) throw n = Sr, zt(e, 0), pt(e, r), Se(e, q()), n;
    if (t === 6) pt(e, r);
    else {
      if (a = e.current.alternate, !(r & 30) && !ap(a) && (t = Ma(e, r), t === 2 && (l = Ql(e), l !== 0 && (r = l, t = _o(e, l))), t === 1)) throw n = Sr, zt(e, 0), pt(e, r), Se(e, q()), n;
      switch (e.finishedWork = a, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          bt(e, ge, Xe);
          break;
        case 3:
          if (pt(e, r), (r & 130023424) === r && (t = gi + 500 - q(), 10 < t)) {
            if (ca(e, 0) !== 0) break;
            if (a = e.suspendedLanes, (a & r) !== r) {
              de(), e.pingedLanes |= e.suspendedLanes & a;
              break;
            }
            e.timeoutHandle = no(bt.bind(null, e, ge, Xe), t);
            break;
          }
          bt(e, ge, Xe);
          break;
        case 4:
          if (pt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, a = -1; 0 < r; ) {
            var o = 31 - je(r);
            l = 1 << o, o = t[o], o > a && (a = o), r &= ~l;
          }
          if (r = a, r = q() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * rp(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = no(bt.bind(null, e, ge, Xe), r);
            break;
          }
          bt(e, ge, Xe);
          break;
        case 5:
          bt(e, ge, Xe);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return Se(e, q()), e.callbackNode === n ? od.bind(null, e) : null;
}
function _o(e, t) {
  var n = er;
  return e.current.memoizedState.isDehydrated && (zt(e, t).flags |= 256), e = Ma(e, t), e !== 2 && (t = ge, ge = n, t !== null && Co(t)), e;
}
function Co(e) {
  ge === null ? ge = e : ge.push.apply(ge, e);
}
function ap(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var a = n[r], l = a.getSnapshot;
        a = a.value;
        try {
          if (!Be(l(), a)) return !1;
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
function pt(e, t) {
  for (t &= ~pi, t &= ~Wa, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - je(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function js(e) {
  if (L & 6) throw Error(k(327));
  yn();
  var t = ca(e, 0);
  if (!(t & 1)) return Se(e, q()), null;
  var n = Ma(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ql(e);
    r !== 0 && (t = r, n = _o(e, r));
  }
  if (n === 1) throw n = Sr, zt(e, 0), pt(e, t), Se(e, q()), n;
  if (n === 6) throw Error(k(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, bt(e, ge, Xe), Se(e, q()), null;
}
function hi(e, t) {
  var n = L;
  L |= 1;
  try {
    return e(t);
  } finally {
    L = n, L === 0 && (Cn = q() + 500, za && At());
  }
}
function Ut(e) {
  ht !== null && ht.tag === 0 && !(L & 6) && yn();
  var t = L;
  L |= 1;
  var n = Fe.transition, r = $;
  try {
    if (Fe.transition = null, $ = 1, e) return e();
  } finally {
    $ = r, Fe.transition = n, L = t, !(L & 6) && At();
  }
}
function yi() {
  we = dn.current, j(dn);
}
function zt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Pm(n)), Z !== null) for (n = Z.return; n !== null; ) {
    var r = n;
    switch (qo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && ga();
        break;
      case 3:
        Tn(), j(ye), j(ue), oi();
        break;
      case 5:
        li(r);
        break;
      case 4:
        Tn();
        break;
      case 13:
        j(U);
        break;
      case 19:
        j(U);
        break;
      case 10:
        ti(r.type._context);
        break;
      case 22:
      case 23:
        yi();
    }
    n = n.return;
  }
  if (ne = e, Z = e = Ct(e.current, null), ae = we = t, ee = 0, Sr = null, pi = Wa = Ht = 0, ge = er = null, Lt !== null) {
    for (t = 0; t < Lt.length; t++) if (n = Lt[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var a = r.next, l = n.pending;
      if (l !== null) {
        var o = l.next;
        l.next = a, r.next = o;
      }
      n.pending = r;
    }
    Lt = null;
  }
  return e;
}
function id(e, t) {
  do {
    var n = Z;
    try {
      if (ei(), Jr.current = Ca, _a) {
        for (var r = G.memoizedState; r !== null; ) {
          var a = r.queue;
          a !== null && (a.pending = null), r = r.next;
        }
        _a = !1;
      }
      if (Bt = 0, te = J = G = null, Zn = !1, hr = 0, mi.current = null, n === null || n.return === null) {
        ee = 1, Sr = t, Z = null;
        break;
      }
      e: {
        var l = e, o = n.return, i = n, s = t;
        if (t = ae, i.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var u = s, g = i, d = g.tag;
          if (!(g.mode & 1) && (d === 0 || d === 11 || d === 15)) {
            var f = g.alternate;
            f ? (g.updateQueue = f.updateQueue, g.memoizedState = f.memoizedState, g.lanes = f.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var h = Es(o);
          if (h !== null) {
            h.flags &= -257, Ms(h, o, i, l, t), h.mode & 1 && Ns(l, u, t), t = h, s = u;
            var v = t.updateQueue;
            if (v === null) {
              var y = /* @__PURE__ */ new Set();
              y.add(s), t.updateQueue = y;
            } else v.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Ns(l, u, t), vi();
              break e;
            }
            s = Error(k(426));
          }
        } else if (H && i.mode & 1) {
          var b = Es(o);
          if (b !== null) {
            !(b.flags & 65536) && (b.flags |= 256), Ms(b, o, i, l, t), Zo(_n(s, i));
            break e;
          }
        }
        l = s = _n(s, i), ee !== 4 && (ee = 2), er === null ? er = [l] : er.push(l), l = o;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536, t &= -t, l.lanes |= t;
              var m = Uc(l, s, t);
              ks(l, m);
              break e;
            case 1:
              i = s;
              var c = l.type, p = l.stateNode;
              if (!(l.flags & 128) && (typeof c.getDerivedStateFromError == "function" || p !== null && typeof p.componentDidCatch == "function" && (Tt === null || !Tt.has(p)))) {
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var S = Gc(l, i, t);
                ks(l, S);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      cd(n);
    } catch (T) {
      t = T, Z === n && n !== null && (Z = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function sd() {
  var e = xa.current;
  return xa.current = Ca, e === null ? Ca : e;
}
function vi() {
  (ee === 0 || ee === 3 || ee === 2) && (ee = 4), ne === null || !(Ht & 268435455) && !(Wa & 268435455) || pt(ne, ae);
}
function Ma(e, t) {
  var n = L;
  L |= 2;
  var r = sd();
  (ne !== e || ae !== t) && (Xe = null, zt(e, t));
  do
    try {
      lp();
      break;
    } catch (a) {
      id(e, a);
    }
  while (!0);
  if (ei(), L = n, xa.current = r, Z !== null) throw Error(k(261));
  return ne = null, ae = 0, ee;
}
function lp() {
  for (; Z !== null; ) ud(Z);
}
function op() {
  for (; Z !== null && !If(); ) ud(Z);
}
function ud(e) {
  var t = fd(e.alternate, e, we);
  e.memoizedProps = e.pendingProps, t === null ? cd(e) : Z = t, mi.current = null;
}
function cd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Jm(n, t), n !== null) {
        n.flags &= 32767, Z = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        ee = 6, Z = null;
        return;
      }
    } else if (n = Zm(n, t, we), n !== null) {
      Z = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      Z = t;
      return;
    }
    Z = t = e;
  } while (t !== null);
  ee === 0 && (ee = 5);
}
function bt(e, t, n) {
  var r = $, a = Fe.transition;
  try {
    Fe.transition = null, $ = 1, ip(e, t, n, r);
  } finally {
    Fe.transition = a, $ = r;
  }
  return null;
}
function ip(e, t, n, r) {
  do
    yn();
  while (ht !== null);
  if (L & 6) throw Error(k(327));
  n = e.finishedWork;
  var a = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(k(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var l = n.lanes | n.childLanes;
  if (Wf(e, l), e === ne && (Z = ne = null, ae = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Gr || (Gr = !0, md(ua, function() {
    return yn(), null;
  })), l = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || l) {
    l = Fe.transition, Fe.transition = null;
    var o = $;
    $ = 1;
    var i = L;
    L |= 4, mi.current = null, tp(e, n), ad(n, e), Em(eo), da = !!Jl, eo = Jl = null, e.current = n, np(n), Ff(), L = i, $ = o, Fe.transition = l;
  } else e.current = n;
  if (Gr && (Gr = !1, ht = e, Ea = a), l = e.pendingLanes, l === 0 && (Tt = null), Lf(n.stateNode), Se(e, q()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], r(a.value, { componentStack: a.stack, digest: a.digest });
  if (Na) throw Na = !1, e = wo, wo = null, e;
  return Ea & 1 && e.tag !== 0 && yn(), l = e.pendingLanes, l & 1 ? e === To ? tr++ : (tr = 0, To = e) : tr = 0, At(), null;
}
function yn() {
  if (ht !== null) {
    var e = Uu(Ea), t = Fe.transition, n = $;
    try {
      if (Fe.transition = null, $ = 16 > e ? 16 : e, ht === null) var r = !1;
      else {
        if (e = ht, ht = null, Ea = 0, L & 6) throw Error(k(331));
        var a = L;
        for (L |= 4, x = e.current; x !== null; ) {
          var l = x, o = l.child;
          if (x.flags & 16) {
            var i = l.deletions;
            if (i !== null) {
              for (var s = 0; s < i.length; s++) {
                var u = i[s];
                for (x = u; x !== null; ) {
                  var g = x;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Jn(8, g, l);
                  }
                  var d = g.child;
                  if (d !== null) d.return = g, x = d;
                  else for (; x !== null; ) {
                    g = x;
                    var f = g.sibling, h = g.return;
                    if (td(g), g === u) {
                      x = null;
                      break;
                    }
                    if (f !== null) {
                      f.return = h, x = f;
                      break;
                    }
                    x = h;
                  }
                }
              }
              var v = l.alternate;
              if (v !== null) {
                var y = v.child;
                if (y !== null) {
                  v.child = null;
                  do {
                    var b = y.sibling;
                    y.sibling = null, y = b;
                  } while (y !== null);
                }
              }
              x = l;
            }
          }
          if (l.subtreeFlags & 2064 && o !== null) o.return = l, x = o;
          else e: for (; x !== null; ) {
            if (l = x, l.flags & 2048) switch (l.tag) {
              case 0:
              case 11:
              case 15:
                Jn(9, l, l.return);
            }
            var m = l.sibling;
            if (m !== null) {
              m.return = l.return, x = m;
              break e;
            }
            x = l.return;
          }
        }
        var c = e.current;
        for (x = c; x !== null; ) {
          o = x;
          var p = o.child;
          if (o.subtreeFlags & 2064 && p !== null) p.return = o, x = p;
          else e: for (o = c; x !== null; ) {
            if (i = x, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  ja(9, i);
              }
            } catch (T) {
              Q(i, i.return, T);
            }
            if (i === o) {
              x = null;
              break e;
            }
            var S = i.sibling;
            if (S !== null) {
              S.return = i.return, x = S;
              break e;
            }
            x = i.return;
          }
        }
        if (L = a, At(), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
          Ke.onPostCommitFiberRoot(Fa, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      $ = n, Fe.transition = t;
    }
  }
  return !1;
}
function Ws(e, t, n) {
  t = _n(n, t), t = Uc(e, t, 1), e = wt(e, t, 1), t = de(), e !== null && (Tr(e, 1, t), Se(e, t));
}
function Q(e, t, n) {
  if (e.tag === 3) Ws(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Ws(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Tt === null || !Tt.has(r))) {
        e = _n(n, e), e = Gc(t, e, 1), t = wt(t, e, 1), e = de(), t !== null && (Tr(t, 1, e), Se(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function sp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = de(), e.pingedLanes |= e.suspendedLanes & n, ne === e && (ae & n) === n && (ee === 4 || ee === 3 && (ae & 130023424) === ae && 500 > q() - gi ? zt(e, 0) : pi |= n), Se(e, t);
}
function dd(e, t) {
  t === 0 && (e.mode & 1 ? (t = Lr, Lr <<= 1, !(Lr & 130023424) && (Lr = 4194304)) : t = 1);
  var n = de();
  e = at(e, t), e !== null && (Tr(e, t, n), Se(e, n));
}
function up(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), dd(e, n);
}
function cp(e, t) {
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
      throw Error(k(314));
  }
  r !== null && r.delete(t), dd(e, n);
}
var fd;
fd = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || ye.current) he = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return he = !1, qm(e, t, n);
    he = !!(e.flags & 131072);
  }
  else he = !1, H && t.flags & 1048576 && hc(t, va, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ta(e, t), e = t.pendingProps;
      var a = Sn(t, ue.current);
      hn(t, n), a = si(null, t, r, e, a, n);
      var l = ui();
      return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ve(r) ? (l = !0, ha(t)) : l = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, ri(t), a.updater = Oa, t.stateNode = a, a._reactInternals = t, uo(t, r, e, n), t = mo(null, t, r, !0, l, n)) : (t.tag = 0, H && l && Xo(t), ce(null, t, a, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ta(e, t), e = t.pendingProps, a = r._init, r = a(r._payload), t.type = r, a = t.tag = fp(r), e = ze(r, e), a) {
          case 0:
            t = fo(null, t, r, e, n);
            break e;
          case 1:
            t = Is(null, t, r, e, n);
            break e;
          case 11:
            t = As(null, t, r, e, n);
            break e;
          case 14:
            t = Ds(null, t, r, ze(r.type, e), n);
            break e;
        }
        throw Error(k(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : ze(r, a), fo(e, t, r, a, n);
    case 1:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : ze(r, a), Is(e, t, r, a, n);
    case 3:
      e: {
        if (Yc(t), e === null) throw Error(k(387));
        r = t.pendingProps, l = t.memoizedState, a = l.element, Tc(e, t), wa(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, l.isDehydrated) if (l = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
          a = _n(Error(k(423)), t), t = Fs(e, t, r, n, a);
          break e;
        } else if (r !== a) {
          a = _n(Error(k(424)), t), t = Fs(e, t, r, n, a);
          break e;
        } else for (_e = kt(t.stateNode.containerInfo.firstChild), Ce = t, H = !0, Oe = null, n = kc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (kn(), r === a) {
            t = lt(e, t, n);
            break e;
          }
          ce(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return _c(t), e === null && oo(t), r = t.type, a = t.pendingProps, l = e !== null ? e.memoizedProps : null, o = a.children, to(r, a) ? o = null : l !== null && to(r, l) && (t.flags |= 32), Qc(e, t), ce(e, t, o, n), t.child;
    case 6:
      return e === null && oo(t), null;
    case 13:
      return Xc(e, t, n);
    case 4:
      return ai(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = wn(t, null, r, n) : ce(e, t, r, n), t.child;
    case 11:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : ze(r, a), As(e, t, r, a, n);
    case 7:
      return ce(e, t, t.pendingProps, n), t.child;
    case 8:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ce(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, a = t.pendingProps, l = t.memoizedProps, o = a.value, R(Sa, r._currentValue), r._currentValue = o, l !== null) if (Be(l.value, o)) {
          if (l.children === a.children && !ye.current) {
            t = lt(e, t, n);
            break e;
          }
        } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
          var i = l.dependencies;
          if (i !== null) {
            o = l.child;
            for (var s = i.firstContext; s !== null; ) {
              if (s.context === r) {
                if (l.tag === 1) {
                  s = tt(-1, n & -n), s.tag = 2;
                  var u = l.updateQueue;
                  if (u !== null) {
                    u = u.shared;
                    var g = u.pending;
                    g === null ? s.next = s : (s.next = g.next, g.next = s), u.pending = s;
                  }
                }
                l.lanes |= n, s = l.alternate, s !== null && (s.lanes |= n), io(
                  l.return,
                  n,
                  t
                ), i.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (l.tag === 10) o = l.type === t.type ? null : l.child;
          else if (l.tag === 18) {
            if (o = l.return, o === null) throw Error(k(341));
            o.lanes |= n, i = o.alternate, i !== null && (i.lanes |= n), io(o, n, t), o = l.sibling;
          } else o = l.child;
          if (o !== null) o.return = l;
          else for (o = l; o !== null; ) {
            if (o === t) {
              o = null;
              break;
            }
            if (l = o.sibling, l !== null) {
              l.return = o.return, o = l;
              break;
            }
            o = o.return;
          }
          l = o;
        }
        ce(e, t, a.children, n), t = t.child;
      }
      return t;
    case 9:
      return a = t.type, r = t.pendingProps.children, hn(t, n), a = be(a), r = r(a), t.flags |= 1, ce(e, t, r, n), t.child;
    case 14:
      return r = t.type, a = ze(r, t.pendingProps), a = ze(r.type, a), Ds(e, t, r, a, n);
    case 15:
      return Vc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : ze(r, a), ta(e, t), t.tag = 1, ve(r) ? (e = !0, ha(t)) : e = !1, hn(t, n), Hc(t, r, a), uo(t, r, a, n), mo(null, t, r, !0, e, n);
    case 19:
      return qc(e, t, n);
    case 22:
      return Kc(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function md(e, t) {
  return ju(e, t);
}
function dp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ie(e, t, n, r) {
  return new dp(e, t, n, r);
}
function Si(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function fp(e) {
  if (typeof e == "function") return Si(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Ro) return 11;
    if (e === Oo) return 14;
  }
  return 2;
}
function Ct(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ie(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function aa(e, t, n, r, a, l) {
  var o = 2;
  if (r = e, typeof e == "function") Si(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case en:
      return Rt(n.children, a, l, t);
    case zo:
      o = 8, a |= 8;
      break;
    case bl:
      return e = Ie(12, n, t, a | 2), e.elementType = bl, e.lanes = l, e;
    case Pl:
      return e = Ie(13, n, t, a), e.elementType = Pl, e.lanes = l, e;
    case Ll:
      return e = Ie(19, n, t, a), e.elementType = Ll, e.lanes = l, e;
    case _u:
      return Ba(n, a, l, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case wu:
          o = 10;
          break e;
        case Tu:
          o = 9;
          break e;
        case Ro:
          o = 11;
          break e;
        case Oo:
          o = 14;
          break e;
        case ct:
          o = 16, r = null;
          break e;
      }
      throw Error(k(130, e == null ? e : typeof e, ""));
  }
  return t = Ie(o, n, t, a), t.elementType = e, t.type = r, t.lanes = l, t;
}
function Rt(e, t, n, r) {
  return e = Ie(7, e, r, t), e.lanes = n, e;
}
function Ba(e, t, n, r) {
  return e = Ie(22, e, r, t), e.elementType = _u, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function _l(e, t, n) {
  return e = Ie(6, e, null, t), e.lanes = n, e;
}
function Cl(e, t, n) {
  return t = Ie(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function mp(e, t, n, r, a) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = al(0), this.expirationTimes = al(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = al(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
}
function ki(e, t, n, r, a, l, o, i, s) {
  return e = new mp(e, t, n, i, s), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = Ie(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ri(l), e;
}
function pp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Jt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function pd(e) {
  if (!e) return Nt;
  e = e._reactInternals;
  e: {
    if (Vt(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (ve(n)) return pc(e, n, t);
  }
  return t;
}
function gd(e, t, n, r, a, l, o, i, s) {
  return e = ki(n, r, !0, e, a, l, o, i, s), e.context = pd(null), n = e.current, r = de(), a = _t(n), l = tt(r, a), l.callback = t ?? null, wt(n, l, a), e.current.lanes = a, Tr(e, a, r), Se(e, r), e;
}
function Ha(e, t, n, r) {
  var a = t.current, l = de(), o = _t(a);
  return n = pd(n), t.context === null ? t.context = n : t.pendingContext = n, t = tt(l, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = wt(a, t, o), e !== null && (We(e, a, o, l), Zr(e, a, o)), o;
}
function Aa(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Bs(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function wi(e, t) {
  Bs(e, t), (e = e.alternate) && Bs(e, t);
}
function gp() {
  return null;
}
var hd = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ti(e) {
  this._internalRoot = e;
}
Ua.prototype.render = Ti.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  Ha(e, t, null, null);
};
Ua.prototype.unmount = Ti.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      Ha(null, e, null, null);
    }), t[rt] = null;
  }
};
function Ua(e) {
  this._internalRoot = e;
}
Ua.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Ku();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < mt.length && t !== 0 && t < mt[n].priority; n++) ;
    mt.splice(n, 0, e), n === 0 && Yu(e);
  }
};
function _i(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ga(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Hs() {
}
function hp(e, t, n, r, a) {
  if (a) {
    if (typeof r == "function") {
      var l = r;
      r = function() {
        var u = Aa(o);
        l.call(u);
      };
    }
    var o = gd(t, r, e, 0, null, !1, !1, "", Hs);
    return e._reactRootContainer = o, e[rt] = o.current, dr(e.nodeType === 8 ? e.parentNode : e), Ut(), o;
  }
  for (; a = e.lastChild; ) e.removeChild(a);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var u = Aa(s);
      i.call(u);
    };
  }
  var s = ki(e, 0, !1, null, null, !1, !1, "", Hs);
  return e._reactRootContainer = s, e[rt] = s.current, dr(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    Ha(t, s, n, r);
  }), s;
}
function Va(e, t, n, r, a) {
  var l = n._reactRootContainer;
  if (l) {
    var o = l;
    if (typeof a == "function") {
      var i = a;
      a = function() {
        var s = Aa(o);
        i.call(s);
      };
    }
    Ha(t, o, e, a);
  } else o = hp(n, t, e, a, r);
  return Aa(o);
}
Gu = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Gn(t.pendingLanes);
        n !== 0 && (Bo(t, n | 1), Se(t, q()), !(L & 6) && (Cn = q() + 500, At()));
      }
      break;
    case 13:
      Ut(function() {
        var r = at(e, 1);
        if (r !== null) {
          var a = de();
          We(r, e, 1, a);
        }
      }), wi(e, 1);
  }
};
Ho = function(e) {
  if (e.tag === 13) {
    var t = at(e, 134217728);
    if (t !== null) {
      var n = de();
      We(t, e, 134217728, n);
    }
    wi(e, 134217728);
  }
};
Vu = function(e) {
  if (e.tag === 13) {
    var t = _t(e), n = at(e, t);
    if (n !== null) {
      var r = de();
      We(n, e, t, r);
    }
    wi(e, t);
  }
};
Ku = function() {
  return $;
};
Qu = function(e, t) {
  var n = $;
  try {
    return $ = e, t();
  } finally {
    $ = n;
  }
};
Gl = function(e, t, n) {
  switch (t) {
    case "input":
      if (Rl(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var a = $a(r);
            if (!a) throw Error(k(90));
            xu(r), Rl(r, a);
          }
        }
      }
      break;
    case "textarea":
      Eu(e, n);
      break;
    case "select":
      t = n.value, t != null && fn(e, !!n.multiple, t, !1);
  }
};
Pu = hi;
Lu = Ut;
var yp = { usingClientEntryPoint: !1, Events: [Cr, an, $a, Fu, bu, hi] }, Wn = { findFiberByHostInstance: Pt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, vp = { bundleType: Wn.bundleType, version: Wn.version, rendererPackageName: Wn.rendererPackageName, rendererConfig: Wn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ot.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Ru(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Wn.findFiberByHostInstance || gp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Vr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Vr.isDisabled && Vr.supportsFiber) try {
    Fa = Vr.inject(vp), Ke = Vr;
  } catch {
  }
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = yp;
Ee.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!_i(t)) throw Error(k(200));
  return pp(e, t, null, n);
};
Ee.createRoot = function(e, t) {
  if (!_i(e)) throw Error(k(299));
  var n = !1, r = "", a = hd;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = ki(e, 1, !1, null, null, n, !1, r, a), e[rt] = t.current, dr(e.nodeType === 8 ? e.parentNode : e), new Ti(t);
};
Ee.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(k(188)) : (e = Object.keys(e).join(","), Error(k(268, e)));
  return e = Ru(t), e = e === null ? null : e.stateNode, e;
};
Ee.flushSync = function(e) {
  return Ut(e);
};
Ee.hydrate = function(e, t, n) {
  if (!Ga(t)) throw Error(k(200));
  return Va(null, e, t, !0, n);
};
Ee.hydrateRoot = function(e, t, n) {
  if (!_i(e)) throw Error(k(405));
  var r = n != null && n.hydratedSources || null, a = !1, l = "", o = hd;
  if (n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = gd(t, null, e, 1, n ?? null, a, !1, l, o), e[rt] = t.current, dr(e), r) for (e = 0; e < r.length; e++) n = r[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(
    n,
    a
  );
  return new Ua(t);
};
Ee.render = function(e, t, n) {
  if (!Ga(t)) throw Error(k(200));
  return Va(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function(e) {
  if (!Ga(e)) throw Error(k(40));
  return e._reactRootContainer ? (Ut(function() {
    Va(null, null, e, !1, function() {
      e._reactRootContainer = null, e[rt] = null;
    });
  }), !0) : !1;
};
Ee.unstable_batchedUpdates = hi;
Ee.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Ga(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return Va(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function yd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(yd);
    } catch (e) {
      console.error(e);
    }
}
yd(), yu.exports = Ee;
var Sp = yu.exports, Us = Sp;
la.createRoot = Us.createRoot, la.hydrateRoot = Us.hydrateRoot;
const xe = typeof window < "u" && window.__WOOF_CAL_CONFIG__ ? window.__WOOF_CAL_CONFIG__ : {};
xe.workerUrl;
xe.turnstileWidgetSelector;
xe.turnstileSiteKey;
Object.freeze(
  Array.isArray(xe.turnstileAllowedHostnames) && xe.turnstileAllowedHostnames.length > 0 ? xe.turnstileAllowedHostnames.map((e) => String(e || "").trim().toLowerCase()).filter(Boolean) : ["andreww0421.github.io"]
);
xe.serviceWorkerPath;
const kp = Number(xe.dailyAiLimit) || 20, wp = xe.usageKey || "woofCal_usage";
xe.storageSchemaKey;
Number(xe.appSchemaVersion);
xe.diagnosticsKey;
Number(xe.maxDiagnosticEvents);
function xn(e = /* @__PURE__ */ new Date()) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function Ci(e, t = null) {
  if (typeof e != "string" || e === "") return t;
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}
const vd = Object.freeze({
  calories: Object.freeze({ aliases: ["cal"] }),
  protein: Object.freeze({ aliases: [] }),
  fat: Object.freeze({ aliases: [] }),
  carbohydrate: Object.freeze({ aliases: ["carb"] }),
  sugar: Object.freeze({ aliases: [] }),
  sodium: Object.freeze({ aliases: ["sod"] }),
  saturatedFat: Object.freeze({ aliases: ["sat"] }),
  transFat: Object.freeze({ aliases: ["trans"] }),
  fiber: Object.freeze({ aliases: [] })
}), An = Object.freeze(Object.keys(vd));
function Gs(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Tp(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const l = Math.min(Math.max(a, t), n);
  if (r === null) return l;
  const o = 10 ** r;
  return Math.round(l * o) / o;
}
function _p(e) {
  const t = Gs(e) ? e : {}, n = Gs(t.nutri) ? t.nutri : null;
  return n ? [n, t] : [t];
}
function Cp(e, t, n) {
  const r = [t, ...n], a = _p(e);
  for (const l of a)
    for (const o of r) {
      const i = l == null ? void 0 : l[o];
      if (i != null && i !== "")
        return i;
    }
  return 0;
}
function xp() {
  return Object.fromEntries(An.map((e) => [e, 0]));
}
function ke(e = {}, t = {}) {
  const { fieldOptions: n = {} } = t;
  return Object.fromEntries(An.map((r) => {
    const a = vd[r], l = Cp(e, r, a.aliases);
    return [r, Tp(l, n[r])];
  }));
}
function Nr(e = {}, t = {}) {
  return ke(e, t);
}
function xi(e = {}) {
  const t = ke(e);
  return An.some((n) => t[n] !== 0);
}
function Bn(e) {
  return typeof e == "function";
}
function Np(e) {
  return !!e && Bn(e.getItem) && Bn(e.setItem) && Bn(e.removeItem) && Bn(e.clear) && Bn(e.key) && typeof e.length == "number";
}
function Ep(e) {
  if (!Np(e))
    throw new Error("Invalid storage adapter");
  return e;
}
function Mp() {
  return globalThis.localStorage;
}
function Ap(e = Mp) {
  const t = () => {
    const n = typeof e == "function" ? e() : e;
    return Ep(n);
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
const Dp = Ap();
let Ip = Dp;
function Ka(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Sd() {
  return Ip;
}
function Er(e) {
  return Sd().getItem(e);
}
function kd(e, t) {
  Sd().setItem(e, t);
}
function Ni(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function wd(e) {
  return Array.isArray(e) ? e.filter(Ka).map((t) => ({
    name: String(t.name ?? "").trim(),
    weight: String(t.weight ?? "").trim()
  })).filter((t) => t.name || t.weight) : [];
}
function Fp(e) {
  if (!Ka(e)) return null;
  const t = ke(e), n = wd(e.items), r = {
    type: String(e.type || "snack"),
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Ni(e.healthScore ?? 0)
  };
  return r.name || n.length || xi(t) ? r : null;
}
function bp(e) {
  if (!Ka(e)) return null;
  const t = ke(e), n = wd(e.items), r = {
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Ni(e.healthScore ?? 0)
  };
  return r.name || n.length || xi(t) ? r : null;
}
function Pp(e) {
  return Ka(e) ? {
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
function Lp(e, t) {
  return Array.isArray(e) ? e.map(t).filter(Boolean) : [];
}
function Td(e, t) {
  const n = Ci(Er(e), []), r = Lp(n, t);
  return JSON.stringify(n) !== JSON.stringify(r) && kd(e, JSON.stringify(r)), r;
}
function $p() {
  return Td("myFavorites", bp);
}
function _d(e, t) {
  return Er(e) || t;
}
function Ei(e) {
  return Td(`record_${e}`, Fp);
}
function zp(e) {
  const t = Er(`weight_${e}`);
  if (!t) return null;
  const n = parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function Rp() {
  const e = Pp(Ci(Er("myProfile_v5"), null));
  return e ? (kd("myProfile_v5", JSON.stringify(e)), e) : null;
}
function Op(e = 7) {
  const t = [], n = /* @__PURE__ */ new Date();
  for (let r = e - 1; r >= 0; r -= 1) {
    const a = /* @__PURE__ */ new Date();
    a.setDate(n.getDate() - r);
    const l = xn(a), o = Ei(l);
    let i = 0;
    o.forEach((s) => {
      var u;
      i += Ni((u = s == null ? void 0 : s.nutri) == null ? void 0 : u.calories);
    }), t.push({ date: l.slice(5), calories: Math.round(i) });
  }
  return t;
}
function jp(e = 7) {
  const t = [], n = /* @__PURE__ */ new Date();
  for (let r = e - 1; r >= 0; r -= 1) {
    const a = /* @__PURE__ */ new Date();
    a.setDate(n.getDate() - r);
    const l = xn(a);
    t.push({
      date: l,
      label: l.slice(5),
      items: Ei(l)
    });
  }
  return t;
}
function Wp() {
  const e = xn(), t = Ci(Er(wp), {});
  return (t == null ? void 0 : t.date) !== e ? { date: e, count: 0 } : {
    date: e,
    count: Number(t.count) || 0
  };
}
function Bp(e) {
  return Ei(e);
}
function Cd(e = 7) {
  return Op(e);
}
function xd(e = 7) {
  return jp(e);
}
function Hp() {
  return $p();
}
function Up() {
  return Rp();
}
function Gp() {
  return _d("appLang", "zh-TW");
}
function Vp() {
  return _d("appTheme", "light");
}
function Kp() {
  return Wp();
}
function Qp(e) {
  return zp(e);
}
function Yp(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Nd(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const l = Yp(a, t, n);
  if (r === null) return l;
  const o = 10 ** r;
  return Math.round(l * o) / o;
}
function Vs(e) {
  const t = String((e == null ? void 0 : e.name) ?? "").trim(), n = String((e == null ? void 0 : e.weight) ?? "").trim();
  return !t && !n ? null : { name: t, weight: n };
}
function Ks(e) {
  return {
    name: String((e == null ? void 0 : e.name) ?? "").trim(),
    weight: String((e == null ? void 0 : e.weight) ?? "").trim()
  };
}
function Qs(e = []) {
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
function Xp(e = {}, t = {}) {
  const {
    fallbackName: n = "",
    fallbackItems: r = []
  } = t, a = Array.isArray(e.items) ? e.items.map(Vs).filter(Boolean) : r.map(Vs).filter(Boolean), l = ke(e, {
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
  }), o = {
    foodName: String(e.foodName ?? e.name ?? n ?? "").trim() || "Food Analysis",
    ...l,
    healthScore: Nd(e.healthScore, { max: 10, digits: 1 }),
    items: a
  };
  if (!(xi(l) || o.items.length > 0))
    throw new Error("AI_INVALID_PAYLOAD");
  return o;
}
function qp(e, t = {}) {
  if (!e || typeof e != "object") return null;
  const {
    fallbackName: n = "",
    fallbackItems: r = [],
    preferredName: a = "",
    correctionHistory: l = (e == null ? void 0 : e.correctionHistory) || []
  } = t, o = e.nutri !== void 0 || e.correctionHistory !== void 0, i = Array.isArray(e.items) ? e.items.map(Ks) : r.map(Ks);
  if (o)
    return {
      name: String(e.name || a || n || "").trim() || "Food Analysis",
      nutri: ke(e.nutri !== void 0 ? e.nutri : e),
      items: i,
      healthScore: Nd(e.healthScore, { max: 10, digits: 1 }),
      correctionHistory: Qs(l)
    };
  const s = Xp(e, {
    fallbackName: n,
    fallbackItems: r
  });
  return {
    name: String(a || s.foodName || n || "").trim() || "Food Analysis",
    nutri: ke(s),
    items: s.items,
    healthScore: s.healthScore,
    correctionHistory: Qs(l)
  };
}
const Ys = {
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
}, Ed = {
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
function K(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Qa(e = 0, { weightKg: t = 0, goalType: n = "lose" } = {}) {
  const r = Math.max(0, Math.round(K(e))), a = Math.max(0, K(t)), l = Zp(n);
  if (a > 0) {
    const o = Ed[l], i = Math.max(0, Math.round(a * o.proteinPerKg)), s = Math.max(0, Math.round(a * o.fatPerKg)), u = Math.max(r - i * 4 - s * 9, 0);
    return {
      protein: i,
      fat: s,
      carb: Math.round(u / 4),
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
function Zp(e = "lose") {
  const t = String(e || "lose");
  return Ed[t] ? t : "lose";
}
function Jp(e = "4", t = {}, n = 0) {
  return (Ys[String(e)] || Ys[4]).map((a) => ({
    ...a,
    title: (t == null ? void 0 : t[a.titleKey]) || a.type,
    suggestedCalories: n > 0 ? Math.round(n * a.ratio) : 0
  }));
}
function Ya(e = []) {
  const t = { cal: 0, pro: 0, fat: 0, carb: 0, sugar: 0, sod: 0, sat: 0, trans: 0, fiber: 0 }, n = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
  return e.forEach((r) => {
    const a = (r == null ? void 0 : r.nutri) || {};
    t.cal += K(a.calories), t.pro += K(a.protein), t.fat += K(a.fat), t.carb += K(a.carbohydrate), t.sugar += K(a.sugar), t.sod += K(a.sodium), t.sat += K(a.saturatedFat), t.trans += K(a.transFat), t.fiber += K(a.fiber), n[r == null ? void 0 : r.type] !== void 0 && (n[r.type] += K(a.calories));
  }), { totals: t, mealTotals: n };
}
function eg(e = []) {
  const t = e.filter((l) => K(l == null ? void 0 : l.calories) > 0), n = t.reduce((l, o) => l + K(o == null ? void 0 : o.calories), 0), r = t.length > 0 ? Math.round(n / t.length) : 0, a = t.reduce((l, o) => l ? K(o.calories) > K(l.calories) ? o : l : o, null);
  return {
    loggedDays: t.length,
    averageCalories: r,
    bestDayLabel: (a == null ? void 0 : a.date) || "--",
    bestDayCalories: Math.round(K(a == null ? void 0 : a.calories))
  };
}
function tg({ total: e = {}, targetCalories: t = 0, calorieHistory: n = [], goalType: r = "lose", weightKg: a = 0 } = {}) {
  const l = K(t), o = Qa(l, {
    goalType: r,
    weightKg: a
  }), i = K(e.cal), s = K(e.pro), u = K(e.fiber), g = K(e.sod);
  let d = "steady";
  i <= 0 ? d = "start_logging" : l > 0 && i > l * 1.08 ? d = "over_target" : s < o.protein * 0.65 ? d = "protein_gap" : u > 0 && u < 18 ? d = "fiber_gap" : g > 2300 ? d = "sodium_high" : l > 0 && i >= l * 0.85 && (d = "near_goal");
  const f = [];
  return i <= 0 ? f.push("use_ai", "log_first_meal") : (s < o.protein * 0.85 && f.push("protein_boost"), u < 25 && f.push("fiber_boost"), g > 2300 && f.push("watch_sodium"), l > 0 && i > l * 1.08 && f.push("portion_reset"), f.length === 0 && f.push("keep_momentum")), {
    status: d,
    targetCalories: l,
    calories: i,
    protein: s,
    fiber: u,
    sodium: g,
    remainingCalories: l > 0 ? Math.max(Math.round(l - i), 0) : 0,
    overCalories: l > 0 ? Math.max(Math.round(i - l), 0) : 0,
    proteinGap: Math.max(o.protein - Math.round(s), 0),
    fiberGap: Math.max(25 - Math.round(u), 0),
    tipKeys: [...new Set(f)].slice(0, 3),
    macroGoals: o,
    weekly: eg(n)
  };
}
const Xs = /* @__PURE__ */ new Set();
function ng(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    name: String((t == null ? void 0 : t.name) || ""),
    weight: String((t == null ? void 0 : t.weight) || "")
  })) : [];
}
function rg(e = {}) {
  return Nr(e);
}
function Da(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    type: String((t == null ? void 0 : t.type) || "snack"),
    name: String((t == null ? void 0 : t.name) || ""),
    nutri: rg(t),
    items: ng(t == null ? void 0 : t.items),
    healthScore: Number(t == null ? void 0 : t.healthScore) || 0
  })) : [];
}
function Md(e) {
  return qp(e);
}
function Ad(e) {
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
function ag(e = !1) {
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
function Dd(e = {}, t = !1) {
  const n = ag(t);
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
function lg(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function og(e = {}) {
  const t = String(e.selectedDate || xn()), n = Ad(e.profile !== void 0 ? e.profile : Up()), r = String(e.currentMealMode || (n == null ? void 0 : n.mealMode) || "4"), a = String(e.currentGoalType || (n == null ? void 0 : n.goalType) || "lose"), o = Kp().count >= kp;
  return {
    selectedDate: t,
    curLang: String(e.curLang || Gp()),
    curTheme: String(e.curTheme || Vp()),
    targetCalories: lg(e.targetCalories, 2e3),
    currentMealMode: r,
    currentGoalType: a,
    loggedWeight: e.loggedWeight ?? Qp(t),
    foodItems: Da(e.foodItems !== void 0 ? e.foodItems : Bp(t)),
    favoriteFoods: Da(e.favoriteFoods !== void 0 ? e.favoriteFoods : Hp()),
    tempAIResult: Md(e.tempAIResult),
    tempAIResultSaved: !!e.tempAIResultSaved,
    analysisFlow: Dd(e.analysisFlow, o),
    profile: n
  };
}
function ig(e) {
  return Object.freeze({
    ...e,
    foodItems: Da(e.foodItems),
    favoriteFoods: Da(e.favoriteFoods),
    tempAIResult: Md(e.tempAIResult),
    profile: Ad(e.profile),
    analysisFlow: Dd(e.analysisFlow),
    updatedAt: Date.now()
  });
}
let sg = og(), xo = ig(sg);
function Y() {
  return xo;
}
function ug(e) {
  return typeof e != "function" ? () => {
  } : (Xs.add(e), () => {
    Xs.delete(e);
  });
}
function Mi(e = xo) {
  var a;
  const t = e || xo, n = Ya(t.foodItems), r = Math.max(0, Number((a = t.profile) == null ? void 0 : a.weight) || 0);
  return {
    selectedDate: t.selectedDate,
    lang: t.curLang,
    goalType: t.currentGoalType,
    targetCalories: Number(t.targetCalories) || 0,
    profileWeight: r,
    waterTarget: Math.round((r || 60) * 35),
    calorieHistory: Cd(7),
    foodItems: t.foodItems,
    totals: n.totals,
    mealTotals: n.mealTotals
  };
}
function cg() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofAppStateBridge) || {
    getAppState: Y,
    subscribeAppState: ug
  };
}
function Id() {
  const e = cg();
  return wr.useSyncExternalStore(
    e.subscribeAppState,
    e.getAppState,
    e.getAppState
  );
}
function Dn(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = Dn(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
function Ai(e) {
  const t = Number(e) || 0;
  return `${Math.round(t)} kcal`;
}
const In = {
  heroEyebrowEmpty: "Woof Cal companion",
  heroEyebrowActive: "Today with your pup",
  heroTitleEmpty: "Log your first meal today",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `${e}/${t} meal moments are already in today`,
  heroSummaryBase: "Common foods, favorites, and AI stay close at hand when you want a lighter log.",
  heroSummaryActive: "Keep the next entry light and consistent so the rest of the day stays easy to review.",
  heroActionLog: "Add a meal",
  heroActionCommonFoods: "Common foods",
  heroActionManual: "Manual entry",
  heroActionFavorites: "Favorites",
  logHubTitle: "Log today's meals",
  logHubCopyEmpty: "Choose a quick path first. Common foods and favorites stay close, while detailed editing moves to a secondary flow.",
  logHubCopyActive: "Keep logging easy from here, and leave detailed editing for the secondary flow when you need it.",
  logHubFavoritesButton: "Favorites",
  logHubFavoritesCopy: "Pick from foods you already save often.",
  logHubManualButton: "Manual entry",
  logHubManualCopy: "Use this only when you need to type a custom food or nutrition.",
  mealListTitle: "Today's meals",
  commonFoodsTitle: "Common foods",
  commonFoodsHint: "Choose a familiar dining-out item first. Open more options only when you want to adjust portions or add-ons.",
  commonFoodsMeta: (e) => `${e} suggestions`,
  commonFoodsButton: "Add this food to today",
  manualAdvancedTitle: "Advanced manual entry",
  manualModalTitle: "Manual meal entry",
  manualModalHint: "Use this when you want to type a custom food or adjust detailed nutrition yourself.",
  todayMealsKicker: "Daily diary",
  todayMealsTitle: "Today's meals",
  todayMealsHint: "Today's meals stay visible here without turning Home into a form.",
  overviewTitle: "Today at a glance",
  overviewHint: "Tap for the full nutrition details",
  signals: {
    protein: "Protein pace",
    meals: "Meal rhythm"
  },
  signalProteinToGoal: (e) => `${e}g to today's goal`,
  signalProteinOnTrack: "Protein is on track today",
  signalMealsEmpty: "One meal log is enough to start today's rhythm.",
  signalMealsActive: (e, t, n) => e < t && n ? `${e}/${t} key meal moments logged. ${n} can be the next anchor.` : `${e} meal moments logged today.`,
  statLabels: {
    streak: "Streak",
    meals: "Meals",
    protein: "Protein"
  },
  formatDayCount: (e) => `${e}d`,
  formatMealCoverage: (e, t) => `${e}/${t}`,
  formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`,
  quickActions: "Quick actions",
  today: "Today",
  overview: "Daily signals",
  pet: "Companion status",
  progress: "Progress",
  companion: "Log your first meal today",
  quickLog: "Quick logging",
  summary: "A calm read on today, with quick actions close by.",
  open: "Open",
  changeDate: "Date",
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
  mealGroupMeta: (e, t) => `${Number(e) || 0} items / ${Ai(t)}`
}, dg = Dn(In, {
  heroEyebrowEmpty: "Woof Cal 陪你開始",
  heroEyebrowActive: "今天和狗狗一起記錄",
  heroTitleEmpty: "先記下今天的第一餐",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今天已經記錄 ${e}/${t} 個餐次`,
  heroSummaryBase: "常吃食物、收藏和 AI 都會放在順手的位置，讓你可以用更輕的方式記錄。",
  heroSummaryActive: "下一筆維持輕量和一致，今天其餘時段就更容易整理。",
  heroActionLog: "新增一餐",
  heroActionCommonFoods: "常見外食",
  heroActionManual: "手動輸入",
  heroActionFavorites: "收藏",
  logHubTitle: "記錄今天的餐點",
  logHubCopyEmpty: "先選一條快速入口。常見外食與收藏都會放在前面，詳細編輯則移到次要流程。",
  logHubCopyActive: "這裡維持快速記錄，細部編輯留給需要的時候再打開。",
  logHubFavoritesButton: "收藏",
  logHubFavoritesCopy: "從你常存的食物裡快速選一個。",
  logHubManualButton: "手動輸入",
  logHubManualCopy: "只有在要輸入自訂食物或營養細節時才打開。",
  mealListTitle: "今天的餐次",
  commonFoodsTitle: "常見外食",
  commonFoodsHint: "先選熟悉的外食餐點，只有需要調整份量或加料時再打開更多選項。",
  commonFoodsMeta: (e) => `${e} 推薦`,
  commonFoodsButton: "直接加入今天",
  manualAdvancedTitle: "進階手動輸入",
  manualModalTitle: "手動輸入",
  manualModalHint: "需要自訂食物或手動調整營養時，再到這裡輸入。",
  todayMealsKicker: "今日日記",
  todayMealsTitle: "今天的餐次",
  todayMealsHint: "今天吃過的內容會整理在這裡，不會讓首頁變成表單。",
  overviewTitle: "今天先看這兩項",
  overviewHint: "點開可看完整營養",
  signals: {
    protein: "蛋白質節奏",
    meals: "餐次節奏"
  },
  signalProteinToGoal: (e) => `距離今天目標還差 ${e}g`,
  signalProteinOnTrack: "今天的蛋白質節奏還不錯",
  signalMealsEmpty: "先記下第一餐，就能開始建立今天的節奏。",
  signalMealsActive: (e, t, n) => e < t && n ? `已記錄 ${e}/${t} 個餐次。下一個可以先記 ${n}。` : `今天已記錄 ${e} 個餐次。`,
  statLabels: {
    streak: "連續",
    meals: "餐次",
    protein: "蛋白質"
  },
  quickActions: "快速操作",
  today: "今天",
  overview: "今日重點",
  pet: "陪伴狀態",
  progress: "進度",
  companion: "先記下今天的第一餐",
  quickLog: "快速記錄",
  summary: "先看今天的重點，再用簡單的方式把餐點記下來。",
  open: "查看",
  changeDate: "日期",
  statusOnTrack: "節奏正常",
  statusKeepGoing: "繼續維持",
  emptyMeal: "還沒有記錄",
  caloriesRemaining: (e = 0) => `還剩 ${Number(e) || 0} kcal`,
  proteinRemaining: (e = 0) => `還差 ${Number(e) || 0}g`,
  proteinOnTrack: "今天的蛋白質節奏正常",
  mealGroupMeta: (e, t) => `${Number(e) || 0} 項 / ${Ai(t)}`
}), fg = Dn(In, {
  heroEyebrowEmpty: "Woof Cal 陪你开始",
  heroEyebrowActive: "今天和狗狗一起记录",
  heroTitleEmpty: "先记下今天的第一餐",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今天已经记录 ${e}/${t} 个餐次`,
  heroSummaryBase: "常吃食物、收藏和 AI 都会放在顺手的位置，让你可以用更轻的方式记录。",
  heroSummaryActive: "下一笔维持轻量和一致，今天其余时段就更容易整理。",
  heroActionLog: "新增一餐",
  heroActionCommonFoods: "常见外食",
  heroActionManual: "手动输入",
  heroActionFavorites: "收藏",
  logHubTitle: "记录今天的餐点",
  logHubCopyEmpty: "先选一条快速入口。常见外食与收藏都会放在前面，详细编辑则移到次要流程。",
  logHubCopyActive: "这里维持快速记录，细部编辑留给需要的时候再打开。",
  logHubFavoritesButton: "收藏",
  logHubFavoritesCopy: "从你常存的食物里快速选一个。",
  logHubManualButton: "手动输入",
  logHubManualCopy: "只有在要输入自定义食物或营养细节时才打开。",
  mealListTitle: "今天的餐次",
  commonFoodsTitle: "常见外食",
  commonFoodsHint: "先选熟悉的外食餐点，只有需要调整份量或加料时再打开更多选项。",
  commonFoodsMeta: (e) => `${e} 推荐`,
  commonFoodsButton: "直接加入今天",
  manualAdvancedTitle: "进阶手动输入",
  manualModalTitle: "手动输入",
  manualModalHint: "需要自定义食物或手动调整营养时，再到这里输入。",
  todayMealsKicker: "今日日记",
  todayMealsTitle: "今天的餐次",
  todayMealsHint: "今天吃过的内容会整理在这里，不会让首页变成表单。",
  overviewTitle: "今天先看这两项",
  overviewHint: "点开可看完整营养",
  signals: {
    protein: "蛋白质节奏",
    meals: "餐次节奏"
  },
  signalProteinToGoal: (e) => `距离今天目标还差 ${e}g`,
  signalProteinOnTrack: "今天的蛋白质节奏还不错",
  signalMealsEmpty: "先记下第一餐，就能开始建立今天的节奏。",
  signalMealsActive: (e, t, n) => e < t && n ? `已记录 ${e}/${t} 个餐次。下一個可以先记 ${n}。` : `今天已记录 ${e} 个餐次。`,
  statLabels: {
    streak: "连续",
    meals: "餐次",
    protein: "蛋白质"
  },
  quickActions: "快速操作",
  today: "今天",
  overview: "今日重点",
  pet: "陪伴状态",
  progress: "进度",
  companion: "先记下今天的第一餐",
  quickLog: "快速记录",
  summary: "先看今天的重点，再用简单的方式把餐点记下来。",
  open: "查看",
  changeDate: "日期",
  statusOnTrack: "节奏正常",
  statusKeepGoing: "继续维持",
  emptyMeal: "还没有记录",
  caloriesRemaining: (e = 0) => `还剩 ${Number(e) || 0} kcal`,
  proteinRemaining: (e = 0) => `还差 ${Number(e) || 0}g`,
  proteinOnTrack: "今天的蛋白质节奏正常",
  mealGroupMeta: (e, t) => `${Number(e) || 0} 项 / ${Ai(t)}`
}), mg = Dn(In, {
  heroEyebrowEmpty: "Woof Cal と一緒にスタート",
  heroEyebrowActive: "今日は愛犬と記録",
  heroTitleEmpty: "まずは今日の最初の食事を記録",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今日は ${e}/${t} 個の食事が記録済み`,
  heroSummaryBase: "よく食べるもの、保存した食品、AI をすぐ使える場所に置いて、軽く記録できます。",
  heroActionLog: "食事を追加",
  heroActionCommonFoods: "よく使う外食",
  heroActionManual: "手動入力",
  heroActionFavorites: "お気に入り",
  logHubTitle: "今日の食事を記録",
  commonFoodsTitle: "よく使う外食",
  commonFoodsHint: "まずは馴染みのある外食を選び、量や追加だけ必要な時に調整します。",
  overviewTitle: "今日はこの2つを先に確認",
  signals: {
    protein: "たんぱく質の流れ",
    meals: "食事リズム"
  }
}), pg = Dn(In, {
  heroEyebrowEmpty: "Woof Cal과 함께 시작",
  heroEyebrowActive: "오늘은 반려견과 함께 기록",
  heroTitleEmpty: "오늘 첫 끼부터 기록해 보세요",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `오늘은 ${e}/${t} 끼를 기록했어요`,
  heroSummaryBase: "자주 먹는 음식, 즐겨찾기, AI를 바로 쓸 수 있는 위치에 두어 가볍게 기록할 수 있습니다.",
  heroActionLog: "식사 추가",
  heroActionCommonFoods: "자주 먹는 외식",
  heroActionManual: "수동 입력",
  heroActionFavorites: "즐겨찾기",
  logHubTitle: "오늘의 식사 기록",
  commonFoodsTitle: "자주 먹는 외식",
  commonFoodsHint: "익숙한 외식부터 고르고, 양이나 추가 재료는 필요할 때만 조정하세요.",
  overviewTitle: "오늘은 이 두 가지를 먼저",
  signals: {
    protein: "단백질 흐름",
    meals: "식사 리듬"
  }
}), gg = Dn(In, {
  direction: "rtl",
  heroEyebrowEmpty: "ابدأ مع Woof Cal",
  heroEyebrowActive: "اليوم مع رفيقك",
  heroTitleEmpty: "سجّل أول وجبة اليوم",
  heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `تم تسجيل ${e}/${t} لحظات وجبات اليوم`,
  heroSummaryBase: "ضع الأطعمة الشائعة والمفضلة والذكاء الاصطناعي في متناول يدك لتسجيل أخف وأسهل.",
  heroActionLog: "أضف وجبة",
  heroActionCommonFoods: "أطعمة شائعة",
  heroActionManual: "إدخال يدوي",
  heroActionFavorites: "المفضلة",
  logHubTitle: "سجّل وجبات اليوم",
  commonFoodsTitle: "أطعمة شائعة",
  commonFoodsHint: "ابدأ بعنصر مألوف من الأكل خارج المنزل، وغيّر الكمية أو الإضافات عند الحاجة فقط.",
  overviewTitle: "اليوم بنظرة سريعة",
  signals: {
    protein: "وتيرة البروتين",
    meals: "إيقاع الوجبات"
  }
}), xl = {
  en: In,
  "zh-TW": dg,
  "zh-CN": fg,
  ja: mg,
  ko: pg,
  ar: gg
};
function Di(e = "en") {
  return xl[e] || xl[String(e || "en").split("-")[0]] || xl.en;
}
const hg = {
  appTitle: "Woof Cal - AI Diet Tracker",
  dateLabel: "📅 التاريخ:",
  totalIntake: "إجمالي السعرات",
  goal: "الهدف",
  cal: "السعرات",
  pro: "بروتين",
  fat: "دهون",
  carb: "كربوهيدرات",
  sugar: "سكر",
  sod: "صوديوم",
  sat: "الدهون المشبعة",
  trans: "الدهون المتحولة",
  water: "الماء",
  chartTitle: "📊 التحليل الغذائي",
  chartMacro: "الماكروز",
  chartWeekly: "السعرات الأسبوعية",
  aiTitle: "📸 تحليل الذكاء الاصطناعي",
  btnPhoto: "📸 ١. اختيار صوره",
  btnAnalyze: "بدء التحليل",
  aiLoading: "جاري تحليل الـ AI...",
  aiDescPlaceholder: "📝 وصف إضافي (مثال: حساء دجاج بدون بصل)...",
  recordTitle: "سجل الطعام",
  manualLabel: "إدخال يدوي",
  placeholderName: "اسم الطعام",
  placeholderCal: "السعرات",
  btnAdd: "➕ إضافة سجل",
  btnFavSave: "حفظ في المفضلة",
  btnFavLoad: "اختيار من المفضلة",
  btnFavAi: "حفظ كمفضل",
  settingsTitle: "⚙️ إعدادات الملف الشخصي",
  gender: "الجنس",
  male: "ذكر",
  female: "أنثى",
  age: "العمر",
  height: "الطول",
  weight: "الوزن",
  activity: "مستوى النشاط",
  act1: "خامل",
  act2: "نشاط خفيف",
  act3: "نشاط متوسط",
  act4: "شديد النشاط",
  mealMode: "🍽️ نظام الوجبات",
  mode4: "عادي (٣ وجبات + سناك)",
  mode3: "٣ وجبات",
  mode2: "وجبتين (صيام ١٦٨)",
  mode1: "وجبة واحدة",
  btnCalc: "🔄 حفظ وتحديث",
  resTdee: "إجمالي الحرق",
  resTarget: "الهدف",
  modalTitle: "تقرير الذكاء الاصطناعي",
  modalAsk: "لأي وجبة؟",
  btnCancel: "إلغاء",
  favTitle: "قائمة المفضلة",
  btnClose: "إغلاق",
  menuImport: "استيراد البيانات",
  menuExport: "تصدير البيانات",
  menuTheme: "تغيير المظهر",
  menuLang: "اللغة",
  suggest: "مُقترح",
  langTitle: "اللغة",
  langCancel: "إلغاء",
  meals: {
    breakfast: "🍳 فطور",
    lunch: "🍱 غداء",
    dinner: "🍲 عشاء",
    snack: "🍪 سناك",
    meal1: "🍽️ وجبة ١",
    meal2: "🍽️ وجبة ٢",
    mealBig: "🏆 الوجبة الكبيرة"
  },
  alertDel: "حذف هذا العنصر؟",
  alertFavAdded: "تم الحفظ في المفضلة!",
  alertFavExist: "موجود مسبقاً في المفضلة!",
  alertSelImg: "الرجاء اختيار صورة!",
  alertAiFail: "فشل تحليل الذكاء الاصطناعي: ",
  alertFill: "الرجاء ملء جميع الحقول",
  alertNameCal: "أدخل الاسم والسعرات",
  alertImportOk: "🎉 تمت الاستعادة بنجاح!",
  alertImportFail: "❌ تنسيق الملف غير صحيح",
  weightTitle: "⚖️ سجل الوزن",
  weightInputPlaceholder: "وزن اليوم (كجم)",
  btnSaveWeight: "حفظ",
  weightChartTitle: "📈 مسار الوزن (اخر ٣٠ يوم)",
  textAiLabel: "📝 أدخل ما أكلته أو أضف تفاصيل لتحسين دقة الذكاء الاصطناعي：",
  textAiPlaceholder: "مثال: مكرونة بالصلصة بدون لحم...",
  appSettingsTitle: "🔧 إعدادات التطبيق",
  navDaily: "يوميات",
  navDashboard: "لوحة القيادة",
  navAi: "الذكاء الاصطناعي",
  navSettings: "إعدادات",
  txtWeightSettingsTitle: "الوزن (كجم)",
  alertWeightSaved: "تم حفظ الوزن بنجاح!",
  alertInvalidWeight: "الرجاء إدخال وزن صحيح!",
  alertSelImgOrText: "الرجاء تحديد صورة أو إدخال نص!",
  petMsg1: "ووف... أنا جائع جداً... (0%)",
  petMsg2: "لدي القليل من الطاقة ولكن أريد المزيد...",
  petMsg3: "أشم الطعام! جاري البحث...",
  petMsg4: "تغذية ممتازة! عمل رائع!",
  petMsg5: "تجشؤ... أكلت كثيراً!",
  petEatMsg: "يم يم... لذيذ!",
  petInteractMsg1: "ووف! هل شربت الماء اليوم؟",
  petInteractMsg2: "لنبقى بصحة جيدة معاً!",
  petInteractMsg3: "أنا أحب الطعام الصحي!",
  petInteractMsg4: "لن تنحف بمداعبتي، اذهب للرياضة! XD",
  petInteractMsg5: "تذكر أن تمضغ ببطء!",
  macroGoalTitle: "📊 الماكروز المقترحة (تقدير):",
  txtTdeeUnit: " (إجمالي حرق الطاقة)",
  txtResTarget: "الوزن المستهدف",
  txtTargetCalDisplayUnit: "الهدف",
  phPro: "البروتين",
  phFat: "الدهون",
  phCarb: "الكربوهيدرات",
  phSugar: "السكر",
  phSod: "الصوديوم",
  phSat: "الدهون المشبعة",
  phTrans: "الدهون المتحولة",
  txtManualLabel: "إدخال يدوي",
  btnAddRecord: "إضافة للسجل",
  txtRecordTitle: "سجل الوجبات",
  phFoodName: "اسم الطعام (مطلوب)",
  phFoodCal: "السعرات (ك.ك) (مطلوب)",
  chartCalTrend: "📈 اتجاه السعرات الحرارية",
  chartProteinTrend: "💪 اتجاه البروتين",
  chart7d: "٧ أيام",
  chart30d: "٣٠ يوم",
  chartTdeeTarget: "خط هدف TDEE",
  fiber: "ألياف",
  healthScoreLabel: "🏅 درجة الصحة",
  aiItemsLabel: "📋 تقدير مكونات الطعام",
  itemName: "الطعام",
  itemWeight: "الوزن",
  addItem: "＋ إضافة عنصر",
  recalculate: "🔄 إعادة الحساب",
  unsavedWarning: "تنبيه: لم يتم حفظ بيانات التغذية. هل أنت متأكد من المغادرة؟",
  detailTitle: "📋 تفاصيل التغذية",
  noData: "--",
  btnDetailClose: "إغلاق"
}, yg = {
  appTitle: "Woof Cal - AI Diet Tracker",
  dateLabel: "📅 Date:",
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
  chartTitle: "📊 Nutrition Analysis",
  chartMacro: "Macros (PFC)",
  chartWeekly: "Weekly Calories",
  aiTitle: "📸 AI Analysis",
  btnPhoto: "📸 1. Select Photo",
  btnAnalyze: "Analyze",
  aiLoading: "AI is analyzing...",
  aiDescPlaceholder: "📝 Optional description (e.g. Beef noodles, no onions)...",
  recordTitle: "Food Log",
  manualLabel: "Manual Entry",
  placeholderName: "Food Name",
  placeholderCal: "Calories",
  btnAdd: "➕ Add Log",
  btnFavSave: "Save Favorite",
  btnFavLoad: "Load Favorite",
  btnFavAi: "Save to Favorites",
  settingsTitle: "⚙️ Profile Settings",
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
  mealMode: "🍽️ Meal Mode",
  mode4: "Standard (3+Snack)",
  mode3: "3 Meals",
  mode2: "2 Meals (168)",
  mode1: "OMAD",
  btnCalc: "🔄 Save & Update",
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
  meals: {
    breakfast: "🍳 Breakfast",
    lunch: "🍱 Lunch",
    dinner: "🍲 Dinner",
    snack: "🍪 Snack",
    meal1: "🍽️ Meal 1",
    meal2: "🍽️ Meal 2",
    mealBig: "🏆 Big Meal"
  },
  alertDel: "Delete this item?",
  alertFavAdded: "Saved to favorites!",
  alertFavExist: "Already in favorites!",
  alertSelImg: "Select image first!",
  alertAiFail: "AI Failed: ",
  alertFill: "Fill all fields",
  alertNameCal: "Enter name and calories",
  alertImportOk: "🎉 Data Restored!",
  alertImportFail: "❌ Invalid File",
  weightTitle: "⚖️ Weight Record",
  weightInputPlaceholder: "Today's Weight (kg)",
  btnSaveWeight: "Save",
  weightChartTitle: "📈 Weight Trend (Last 30 Days)",
  textAiLabel: "📝 Enter the food you just ate, or add details to improve AI accuracy:",
  textAiPlaceholder: "e.g., Bowl of beef noodles, no onions...",
  appSettingsTitle: "🔧 App Settings",
  navDaily: "Daily",
  navDashboard: "Dashboard",
  navAi: "AI",
  navSettings: "Settings",
  txtWeightSettingsTitle: "Weight (kg)",
  alertWeightSaved: "Weight saved successfully!",
  alertInvalidWeight: "Please enter a valid weight!",
  alertSelImgOrText: "Please select an image or enter a description!",
  petMsg1: "Woof... So hungry... (0%)",
  petMsg2: "Got some energy, but want more food...",
  petMsg3: "Smelled food! Searching...",
  petMsg4: "Perfect nutrition! Great job!",
  petMsg5: "Burp... Ate too much!",
  petEatMsg: "Nom nom nom... Yummy!",
  petInteractMsg1: "Woof! Drank water today?",
  petInteractMsg2: "Let's stay healthy together!",
  petInteractMsg3: "I love healthy food!",
  petInteractMsg4: "Petting me won't make you thin, go exercise! XD",
  petInteractMsg5: "Remember to chew slowly!",
  macroGoalTitle: "📊 Recommended Macros (Estimated):",
  txtTdeeUnit: " (Total Energy Expended)",
  txtResTarget: "Target Goal",
  txtTargetCalDisplayUnit: "Goal",
  phPro: "Protein",
  phFat: "Fat",
  phCarb: "Carb",
  phSugar: "Sugar",
  phSod: "Sodium",
  phSat: "Sat. Fat",
  phTrans: "Trans Fat",
  txtManualLabel: "Manual Entry",
  btnAddRecord: "Add Record",
  txtRecordTitle: "Diet Record",
  phFoodName: "Food Name (Required)",
  phFoodCal: "Calories (kcal) (Req)",
  chartCalTrend: "📈 Calorie Intake Trend",
  chartProteinTrend: "💪 Protein Intake Trend",
  chart7d: "7D",
  chart30d: "30D",
  chartTdeeTarget: "TDEE Target",
  fiber: "Fiber",
  healthScoreLabel: "🏅 Health Score",
  aiItemsLabel: "📋 Estimated Food Items",
  itemName: "Item",
  itemWeight: "Weight",
  addItem: "＋ Add Item",
  recalculate: "🔄 Recalculate",
  unsavedWarning: "Warning: your nutrition data has not been saved. Are you sure you want to leave?",
  detailTitle: "📋 Nutrition Details",
  noData: "--",
  btnDetailClose: "Close"
}, vg = {
  appTitle: "Woof Cal - AI Diet Tracker",
  dateLabel: "📅 日付：",
  totalIntake: "摂取カロリー",
  goal: "目標",
  cal: "熱量",
  pro: "タンパク質",
  fat: "脂質",
  carb: "炭水化物",
  sugar: "糖質",
  sod: "塩分",
  sat: "飽和脂肪酸",
  trans: "トランス脂肪",
  water: "水分目標",
  chartTitle: "📊 栄養分析",
  chartMacro: "三大栄養素 (PFC)",
  chartWeekly: "週間カロリー",
  aiTitle: "📸 AI食事分析",
  btnPhoto: "📸 1. 写真を選択",
  btnAnalyze: "分析開始",
  aiLoading: "AI分析中...",
  aiDescPlaceholder: "📝 補足説明 (例: 牛肉麺、ネギ抜き)...",
  recordTitle: "食事記録",
  manualLabel: "手動入力",
  placeholderName: "食品名",
  placeholderCal: "kcal",
  btnAdd: "➕ 記録追加",
  btnFavSave: "お気に入りに追加",
  btnFavLoad: "お気に入りを読み込む",
  btnFavAi: "お気に入りに保存",
  settingsTitle: "⚙️ プロフィール設定",
  gender: "性別",
  male: "男性",
  female: "女性",
  age: "年齢",
  height: "身長",
  weight: "体重",
  activity: "活動レベル",
  act1: "座り仕事",
  act2: "軽い運動 (週1-3)",
  act3: "中程度の運動 (週3-5)",
  act4: "激しい運動 (週6-7)",
  mealMode: "🍽️ 食事回数",
  mode4: "標準 (3食+間食)",
  mode3: "3食のみ",
  mode2: "2食 (168断食)",
  mode1: "1食 (OMAD)",
  btnCalc: "🔄 保存して更新",
  resTdee: "TDEE",
  resTarget: "目標",
  modalTitle: "AI分析レポート",
  modalAsk: "どの食事ですか？",
  btnCancel: "キャンセル",
  favTitle: "お気に入りリスト",
  btnClose: "閉じる",
  menuImport: "復元",
  menuExport: "バックアップ",
  menuTheme: "テーマ切替",
  menuLang: "言語",
  suggest: "目安",
  langTitle: "言語",
  langCancel: "キャンセル",
  meals: {
    breakfast: "🍳 朝食",
    lunch: "🍱 昼食",
    dinner: "🍲 夕食",
    snack: "🍪 間食",
    meal1: "🍽️ 食事1",
    meal2: "🍽️ 食事2",
    mealBig: "🏆 大盛り"
  },
  alertDel: "削除しますか？",
  alertFavAdded: "お気に入りに保存しました！",
  alertFavExist: "既に保存されています",
  alertSelImg: "画像を選択してください",
  alertAiFail: "AIエラー: ",
  alertFill: "全ての項目を入力してください",
  alertNameCal: "名称とカロリーを入力",
  alertImportOk: "🎉 復元完了！",
  alertImportFail: "❌ ファイルエラー",
  weightTitle: "⚖️ 体重記録",
  weightInputPlaceholder: "今日の体重 (kg)",
  btnSaveWeight: "保存",
  weightChartTitle: "📈 体重トレンド (過去30日間)",
  textAiLabel: "📝 食べたものを入力するか、AI精度向上のため補足してください：",
  textAiPlaceholder: "例：ネギ抜きの牛肉麺...",
  appSettingsTitle: "🔧 アプリ設定",
  navDaily: "デイリー",
  navDashboard: "ダッシュボード",
  navAi: "AI",
  navSettings: "設定",
  txtWeightSettingsTitle: "体重 (kg)",
  alertWeightSaved: "体重が保存されました！",
  alertInvalidWeight: "有効な体重を入力してください！",
  alertSelImgOrText: "画像を選択するか、テキストを入力してください！",
  petMsg1: "ワン... お腹すいた... (0%)",
  petMsg2: "元気出たけど、もっと食べたい...",
  petMsg3: "いい匂い！ご飯探してます！",
  petMsg4: "栄養バッチリ！ 최고！",
  petMsg5: "ゲップ... 食べ過ぎた！",
  petEatMsg: "モグモグ... 美味しい！",
  petInteractMsg1: "ワン！水飲んだ？",
  petInteractMsg2: "一緒に健康になろう！",
  petInteractMsg3: "健康なご飯が大好き！",
  petInteractMsg4: "撫でても痩せないよ、運動しなきゃ！ XD",
  petInteractMsg5: "ゆっくり噛んで食べてね！",
  macroGoalTitle: "📊 栄養摂取目安 (推定：",
  txtTdeeUnit: " (総消費カロリー)",
  txtResTarget: "推奨目標",
  txtTargetCalDisplayUnit: "目標",
  phPro: "タンパク質",
  phFat: "脂質",
  phCarb: "炭水化物",
  phSugar: "糖質",
  phSod: "塩分",
  phSat: "飽和脂肪",
  phTrans: "トランス脂肪",
  txtManualLabel: "手動入力",
  btnAddRecord: "記録を追加",
  txtRecordTitle: "食事記録",
  phFoodName: "食べ物の名前 (必須)",
  phFoodCal: "カロリー (kcal) (必須)",
  chartCalTrend: "📈 カロリー摂取トレンド",
  chartProteinTrend: "💪 タンパク質トレンド",
  chart7d: "7日",
  chart30d: "30日",
  chartTdeeTarget: "TDEE 目標ライン",
  fiber: "食物繊維",
  healthScoreLabel: "🏅 ヘルススコア",
  aiItemsLabel: "📋 食材内訳の推定",
  itemName: "食材",
  itemWeight: "量",
  addItem: "＋食材追加",
  recalculate: "🔄 再計算",
  unsavedWarning: "注意：栄養データはまだ保存されていません。離れてもよろしいですか？",
  detailTitle: "📋 詳細栄養情報",
  noData: "--",
  btnDetailClose: "閉じる"
}, Sg = {
  appTitle: "Woof Cal - AI Diet Tracker",
  dateLabel: "📅 날짜:",
  totalIntake: "총 섭취량",
  goal: "목표",
  cal: "열량",
  pro: "단백질",
  fat: "지방",
  carb: "탄수화물",
  sugar: "당류",
  sod: "나트륨",
  sat: "포화지방",
  trans: "트랜스지방",
  water: "수분",
  chartTitle: "📊 영양 분석",
  chartMacro: "거시 영양소",
  chartWeekly: "주간 칼로리",
  aiTitle: "📸 AI 분석",
  btnPhoto: "📸 1. 사진 선택",
  btnAnalyze: "분석 시작",
  aiLoading: "AI 분석 중...",
  aiDescPlaceholder: "📝 추가 설명 (예: 양파 제외한 소고기 국수)...",
  recordTitle: "음식 기록",
  manualLabel: "수동 입력",
  placeholderName: "음식 이름",
  placeholderCal: "kcal",
  btnAdd: "➕ 기록 추가",
  btnFavSave: "즐겨찾기 저장",
  btnFavLoad: "즐겨찾기 선택",
  btnFavAi: "즐겨찾기에 저장",
  settingsTitle: "⚙️ 프로필 설정",
  gender: "성별",
  male: "남성",
  female: "여성",
  age: "나이",
  height: "키",
  weight: "체중",
  activity: "활동 수준",
  act1: "앉아서 생활",
  act2: "가벼운 활동",
  act3: "보통 활동",
  act4: "매우 활동적",
  mealMode: "🍽️ 식사 모드",
  mode4: "표준 (3끼+간식)",
  mode3: "3끼",
  mode2: "2끼 (168 단식)",
  mode1: "1끼 (1일 1식)",
  btnCalc: "🔄 저장 및 업데이트",
  resTdee: "TDEE",
  resTarget: "목표",
  modalTitle: "AI 보고서",
  modalAsk: "어느 식사입니까?",
  btnCancel: "취소",
  favTitle: "즐겨찾는 음식",
  btnClose: "닫기",
  menuImport: "데이터 가져오기",
  menuExport: "데이터 내보내기",
  menuTheme: "테마 변경",
  menuLang: "언어 선택",
  suggest: "권장",
  langTitle: "언어",
  langCancel: "취소",
  meals: {
    breakfast: "🍳 아침",
    lunch: "🍱 점심",
    dinner: "🍲 저녁",
    snack: "🍪 간식",
    meal1: "🍽️ 식사 1",
    meal2: "🍽️ 식사 2",
    mealBig: "🏆 큰 식사"
  },
  alertDel: "항목을 삭제하시겠습니까?",
  alertFavAdded: "즐겨찾기에 저장되었습니다!",
  alertFavExist: "이미 즐겨찾기에 있습니다!",
  alertSelImg: "먼저 이미지를 선택하세요!",
  alertAiFail: "AI 실패: ",
  alertFill: "모든 필드를 채워주세요",
  alertNameCal: "이름과 칼로리를 입력하세요",
  alertImportOk: "🎉 데이터 복원 성공!",
  alertImportFail: "❌ 잘못된 파일 형식",
  weightTitle: "⚖️ 체중 기록",
  weightInputPlaceholder: "오늘의 체중 (kg)",
  btnSaveWeight: "저장",
  weightChartTitle: "📈 체중 변화 (최근 30일)",
  textAiLabel: "📝 방금 먹은 음식을 입력하거나 AI 정확도를 높이기 위해 보충 설명하세요：",
  textAiPlaceholder: "예: 우육면, 파 빼고...",
  appSettingsTitle: "🔧 앱 설정",
  navDaily: "다이어리",
  navDashboard: "대시보드",
  navAi: "AI",
  navSettings: "설정",
  txtWeightSettingsTitle: "체중 (kg)",
  alertWeightSaved: "체중이 저장되었습니다!",
  alertInvalidWeight: "올바른 체중을 입력하세요!",
  alertSelImgOrText: "사진을 선택하거나 텍스트를 입력하세요!",
  petMsg1: "멍멍... 배고파... (0%)",
  petMsg2: "기운이 나지만 더 먹고 싶어...",
  petMsg3: "맛있는 냄새! 찾는 중...",
  petMsg4: "영양 완벽! 잘했어!",
  petMsg5: "꺼억... 너무 많이 먹었어!",
  petEatMsg: "냠냠... 맛있어!",
  petInteractMsg1: "멍! 오늘 물 마셨어?",
  petInteractMsg2: "같이 건강해지자!",
  petInteractMsg3: "건강한 음식이 좋아!",
  petInteractMsg4: "쓰다듬는다고 날씬해지진 않아, 운동해! XD",
  petInteractMsg5: "천천히 씹어 먹어!",
  macroGoalTitle: "📊 권장 영양소 (추정):",
  txtTdeeUnit: " (총 에너지 소비량)",
  txtResTarget: "목표 체중",
  txtTargetCalDisplayUnit: "목표",
  phPro: "단백질",
  phFat: "지방",
  phCarb: "탄수화물",
  phSugar: "당",
  phSod: "나트륨",
  phSat: "포화 지방",
  phTrans: "트랜스 지방",
  txtManualLabel: "수동 입력",
  btnAddRecord: "기록 추가",
  txtRecordTitle: "음식 기록",
  phFoodName: "음식 이름 (필수)",
  phFoodCal: "칼로리 (kcal) (필수)",
  chartCalTrend: "📈 칼로리 섭취 추이",
  chartProteinTrend: "💪 단백질 섭취 추이",
  chart7d: "7일",
  chart30d: "30일",
  chartTdeeTarget: "TDEE 목표선",
  fiber: "식이섬유",
  healthScoreLabel: "🏅 건강 점수",
  aiItemsLabel: "📋 추정 식재료",
  itemName: "식재료",
  itemWeight: "중량",
  addItem: "＋ 항목 추가",
  recalculate: "🔄 재계산",
  unsavedWarning: "주의: 영양 데이터가 저장되지 않았습니다. 나가시겠습니까?",
  detailTitle: "📋 상세 영양 정보",
  noData: "--",
  btnDetailClose: "닫기"
}, kg = {
  appTitle: "Woof Cal 汪卡管家",
  dateLabel: "📅 日期：",
  totalIntake: "今日摄取",
  goal: "目标",
  cal: "热量",
  pro: "蛋白质",
  fat: "脂肪",
  carb: "碳水",
  sugar: "糖",
  sod: "钠(mg)",
  sat: "饱和脂肪",
  trans: "反式脂肪",
  water: "目标水",
  chartTitle: "📊 营养与热量分析",
  chartMacro: "今日三大营养素 (PFC)",
  chartWeekly: "本周热量趋势",
  aiTitle: "📸 AI 饮食分析",
  btnPhoto: "📸 1. 拍照 / 选择图片",
  btnAnalyze: "送出分析",
  aiLoading: "AI 正在分析食物营养，请稍候...",
  aiDescPlaceholder: "📝 补充说明 (例如：这是一碗牛肉面，没加葱)...",
  recordTitle: "饮食记录",
  manualLabel: "手动补充",
  placeholderName: "食物名称",
  placeholderCal: "卡路里",
  btnAdd: "➕ 加入记录",
  btnFavSave: "加入收藏",
  btnFavLoad: "选择常吃食物",
  btnFavAi: "加入收藏",
  settingsTitle: "⚙️ 个人数据设定",
  gender: "性别",
  male: "男",
  female: "女",
  age: "年龄",
  height: "身高",
  weight: "体重",
  activity: "活动量",
  act1: "久坐 (办公室)",
  act2: "轻度 (每周运动1-3天)",
  act3: "中度 (每周运动3-5天)",
  act4: "高度 (每周运动6-7天)",
  mealMode: "🍽️ 每日餐数模式",
  mode4: "标准 (3餐+点心)",
  mode3: "3餐 (无点心)",
  mode2: "2餐 (168断食)",
  mode1: "1餐 (OMAD)",
  btnCalc: "🔄 保存并更新界面",
  resTdee: "TDEE",
  resTarget: "减重目标",
  modalTitle: "AI 分析报告",
  modalAsk: "请问这是哪一餐？",
  btnCancel: "取消",
  favTitle: "常吃食物清单",
  btnClose: "关闭",
  menuImport: "导入还原",
  menuExport: "导出备份",
  menuTheme: "切换主题",
  menuLang: "语言",
  suggest: "建议",
  langTitle: "语言",
  langCancel: "取消",
  meals: {
    breakfast: "🍳 早餐",
    lunch: "🍱 午餐",
    dinner: "🍲 晚餐",
    snack: "🍪 点心",
    meal1: "🍽️ 第一餐",
    meal2: "🍽️ 第二餐",
    mealBig: "🏆 唯一大餐"
  },
  alertDel: "确定要删除？",
  alertFavAdded: "已加入收藏！",
  alertFavExist: "这个食物已经在收藏清单啰！",
  alertSelImg: "请先选择图片！",
  alertAiFail: "AI 分析失败：",
  alertFill: "请填写资料",
  alertNameCal: "请输入名称与热量",
  alertImportOk: "🎉 资料还原成功！",
  alertImportFail: "❌ 档案格式错误",
  weightTitle: "⚖️ 体重记录",
  weightInputPlaceholder: "今日体重 (kg)",
  btnSaveWeight: "保存",
  weightChartTitle: "📈 体重趋势 (近30天)",
  textAiLabel: "📝 请输入您刚吃的食物或补充说明来提升AI准确度：",
  textAiPlaceholder: "例如：一碗牛肉面，没加葱，还有一盘烫青菜...",
  appSettingsTitle: "🔧 应用程序设定",
  navDaily: "日记",
  navDashboard: "面板",
  navAi: "AI",
  navSettings: "设置",
  txtWeightSettingsTitle: "体重 (kg)",
  alertWeightSaved: "体重记录已保存！",
  alertInvalidWeight: "请输入有效的体重数值！",
  alertSelImgOrText: "请选择图片，或输入文字描述！",
  petMsg1: "汪... 肚子好饿喔... (0%)",
  petMsg2: "有点力气了，但还想再吃一点...",
  petMsg3: "闻到香味了，正在寻找食物！",
  petMsg4: "营养刚刚好，太棒了！",
  petMsg5: "嗝... 吃太多了啦！",
  petEatMsg: "阿姆阿姆... 好吃！",
  petInteractMsg1: "汪！你今天喝水了吗？",
  petInteractMsg2: "保持健康，我们一起加油！",
  petInteractMsg3: "我最喜欢吃健康的食物了！",
  petInteractMsg4: "摸我也不会变瘦喔，去运动吧！ XD",
  petInteractMsg5: "记得要细嚼慢咽喔！",
  macroGoalTitle: "📊 营养摄取建议 (估算值)：",
  txtTdeeUnit: " (总消耗热量)",
  txtResTarget: "建议目标",
  txtTargetCalDisplayUnit: "目标",
  phPro: "蛋白质",
  phFat: "脂肪",
  phCarb: "碳水",
  phSugar: "糖",
  phSod: "钠(mg)",
  phSat: "饱和脂",
  phTrans: "反式脂",
  txtManualLabel: "手动补充",
  btnAddRecord: "加入记录",
  txtRecordTitle: "饮食记录",
  phFoodName: "食物名称 (必填)",
  phFoodCal: "热量 (kcal) (必填)",
  chartCalTrend: "📈 热量摄取趋势",
  chartProteinTrend: "💪 蛋白质摄取趋势",
  chart7d: "7天",
  chart30d: "30天",
  chartTdeeTarget: "TDEE 目标线",
  fiber: "膳食纤维",
  healthScoreLabel: "🏅 健康评分",
  aiItemsLabel: "📋 食物成分估算",
  itemName: "食物",
  itemWeight: "重量",
  addItem: "＋新增成分",
  recalculate: "🔄 重新计算",
  unsavedWarning: "注意，您的营养数据尚未保存，确定要离开吗？",
  detailTitle: "📋 详细营养信息",
  noData: "--",
  btnDetailClose: "关闭"
}, wg = {
  appTitle: "Woof Cal 汪卡管家",
  dateLabel: "日期：",
  totalIntake: "今日攝取",
  goal: "目標",
  cal: "熱量",
  pro: "蛋白質",
  fat: "脂肪",
  carb: "碳水",
  sugar: "糖",
  sod: "鈉 (mg)",
  sat: "飽和脂肪",
  trans: "反式脂肪",
  water: "水分",
  chartTitle: "營養與熱量分析",
  chartMacro: "今日三大營養素 (PFC)",
  chartWeekly: "本週熱量趨勢",
  aiTitle: "AI 飲食分析",
  btnPhoto: "1. 拍照 / 選擇圖片",
  btnAnalyze: "送出分析",
  aiLoading: "AI 正在分析食物營養，請稍候...",
  aiDescPlaceholder: "補充說明（例如：牛肉麵、不加蔥）",
  recordTitle: "飲食紀錄",
  manualLabel: "手動輸入",
  placeholderName: "食物名稱",
  placeholderCal: "熱量",
  btnAdd: "加入紀錄",
  btnFavSave: "加入最愛",
  btnFavLoad: "選擇常吃食物",
  btnFavAi: "加入收藏",
  settingsTitle: "個人資料設定",
  gender: "性別",
  male: "男",
  female: "女",
  age: "年齡",
  height: "身高",
  weight: "體重",
  activity: "活動量",
  act1: "久坐（幾乎不運動）",
  act2: "輕度活動（每週 1-3 天）",
  act3: "中度活動（每週 3-5 天）",
  act4: "高度活動（每週 6-7 天）",
  mealMode: "每日餐數",
  mode4: "標準（3 餐 + 點心）",
  mode3: "3 餐",
  mode2: "2 餐（16:8）",
  mode1: "1 餐（OMAD）",
  btnCalc: "儲存並更新",
  resTdee: "TDEE",
  resTarget: "建議目標",
  modalTitle: "AI 分析報告",
  modalAsk: "請問這是哪一餐？",
  btnCancel: "取消",
  favTitle: "常吃食物清單",
  btnClose: "關閉",
  menuImport: "匯入備份",
  menuExport: "匯出備份",
  menuTheme: "外觀設定",
  menuLang: "語言設定",
  suggest: "建議",
  langTitle: "語言",
  langCancel: "取消",
  alertDel: "確定要刪除這筆紀錄嗎？",
  alertFavAdded: "已加入最愛。",
  alertFavExist: "這個食物已經在最愛裡。",
  alertSelImg: "請先選擇圖片。",
  alertAiFail: "AI 分析失敗：",
  alertFill: "請填寫必要欄位。",
  alertNameCal: "請輸入食物名稱與熱量。",
  alertImportOk: "資料還原成功。",
  alertImportFail: "備份檔格式無效。",
  weightTitle: "體重紀錄",
  weightInputPlaceholder: "今日體重 (kg)",
  btnSaveWeight: "儲存",
  weightChartTitle: "體重趨勢（最近 30 天）",
  textAiLabel: "描述你剛剛吃了什麼，或補充細節讓 AI 更準：",
  textAiPlaceholder: "例如：一根香蕉和一顆水煮蛋",
  appSettingsTitle: "App 設定",
  navDaily: "日記",
  navDashboard: "儀表板",
  navAi: "AI",
  navSettings: "設定",
  txtWeightSettingsTitle: "體重 (kg)",
  alertWeightSaved: "體重已儲存。",
  alertInvalidWeight: "請輸入有效的體重數值。",
  alertSelImgOrText: "請選擇圖片或輸入文字描述。",
  petMsg1: "汪！今天想吃什麼呢？",
  petMsg2: "開始有些能量了，再記一餐吧。",
  petMsg3: "聞到食物香味了，快記錄下來。",
  petMsg4: "今天的營養很不錯，繼續保持。",
  petMsg5: "今天吃得有點多，下一餐清爽一點。",
  petEatMsg: "汪嗚汪嗚，好吃！",
  petInteractMsg1: "今天有記得喝水嗎？",
  petInteractMsg2: "穩定記錄，比一次完美更重要。",
  petInteractMsg3: "蛋白質也很重要，別忘了補。",
  petInteractMsg4: "均衡飲食加一點活動，效果更好。",
  petInteractMsg5: "慢慢吃，也比較有飽足感。",
  macroGoalTitle: "建議營養目標（估算）",
  txtTdeeUnit: "（每日總消耗）",
  txtResTarget: "建議目標",
  txtTargetCalDisplayUnit: "目標",
  phPro: "蛋白質",
  phFat: "脂肪",
  phCarb: "碳水",
  phSugar: "糖",
  phSod: "鈉 (mg)",
  phSat: "飽和脂肪",
  phTrans: "反式脂肪",
  phFiber: "膳食纖維",
  txtManualLabel: "手動輸入",
  btnAddRecord: "加入紀錄",
  txtRecordTitle: "飲食紀錄",
  phFoodName: "食物名稱（必填）",
  phFoodCal: "熱量 kcal（必填）",
  chartCalTrend: "熱量攝取趨勢",
  chartProteinTrend: "蛋白質攝取趨勢",
  chart7d: "7 天",
  chart30d: "30 天",
  chartTdeeTarget: "TDEE 目標線",
  fiber: "膳食纖維",
  healthScoreLabel: "健康評分",
  aiItemsLabel: "食物成分估算",
  itemName: "食物",
  itemWeight: "重量",
  addItem: "+ 新增食材",
  recalculate: "重新計算",
  unsavedWarning: "這份 AI 分析尚未儲存，確定要關閉嗎？",
  detailTitle: "詳細營養資訊",
  noData: "--",
  btnDetailClose: "關閉",
  aiQuotaExceededButton: "今日 AI 次數已達上限",
  aiQuotaExceededToast: "今天的 AI 分析次數已用完。",
  aiInvalidResponse: "AI 回傳的營養資料不完整，請換一張更清楚的照片或補充文字後再試一次。",
  turnstilePending: "安全驗證載入中，請稍後再試。",
  turnstileUnavailable: "目前這個網域無法使用安全驗證，請改用正式網站或將網域加入 Turnstile。",
  turnstileSetupError: "安全驗證初始化失敗，請重新整理後再試。",
  meals: {
    breakfast: "早餐",
    lunch: "午餐",
    dinner: "晚餐",
    snack: "點心",
    meal1: "第一餐",
    meal2: "第二餐",
    mealBig: "唯一大餐"
  },
  presetPanelTitle: "外食常用預設",
  presetPanelHint: "先套用地區餐點，再依實際份量微調手動欄位。",
  presetRegionLabel: "地區",
  presetFoodLabel: "餐點預設",
  presetApplyButton: "套用到手動輸入",
  presetAppliedToast: "已套用餐點預設。",
  presetSelectPrompt: "請先選擇一個餐點預設。"
}, No = {
  "zh-TW": wg,
  "zh-CN": kg,
  en: yg,
  ja: vg,
  ko: Sg,
  ar: hg
}, Tg = {
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
  btnPhoto: "1. Select Photo",
  btnAnalyze: "Analyze",
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
  navDaily: "Home",
  navDashboard: "Insights",
  navAi: "AI",
  navSettings: "Settings",
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
}, Nl = /* @__PURE__ */ new Map();
function El(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Fd(e, t) {
  const n = { ...e };
  return El(t) && Object.entries(t).forEach(([r, a]) => {
    if (El(a) && El(e[r])) {
      n[r] = Fd(e[r], a);
      return;
    }
    a != null && (n[r] = a);
  }), n;
}
function Fn(e = "zh-TW") {
  const t = String(e || "zh-TW");
  if (!Nl.has(t)) {
    const n = Fd(
      Tg,
      No[t] || No.en || {}
    );
    Nl.set(t, n);
  }
  return Nl.get(t);
}
Object.freeze(Object.keys(No));
const _g = {
  detail: {
    overviewTitle: "營養快覽",
    overviewSummary: "先用清楚的方式看懂這餐，再決定接下來怎麼調整。",
    sections: {
      quality: {
        title: "營養重點",
        summary: "這幾個數值最容易影響飽足感、口味與整體平衡。"
      },
      fatDetails: {
        title: "脂肪細節",
        summary: "補充看看脂肪來源與組成，幫你更快判斷這餐的油脂負擔。"
      }
    }
  },
  trend: {
    title: "營養焦點",
    subtitle: "今天 + 最近 7 天",
    headlines: {
      start_logging: "先記幾餐，營養節奏才會開始清楚",
      protein: "今天最值得補的是蛋白質",
      fiber: "今天最容易拉回來的是纖維",
      sodium: "下一餐清淡一點，整天會更平衡",
      balanced: "今天目前的營養分配算穩"
    },
    summaries: {
      start_logging: "有幾餐記錄之後，這張卡會開始顯示蛋白質、纖維和鈉的節奏。",
      protein: (e) => `和最近 ${e} 天相比，今天最值得先補的是蛋白質。`,
      fiber: (e) => `和最近 ${e} 天相比，今天最容易微調的是纖維。`,
      sodium: (e) => `今天的鈉比最近 ${e} 天的節奏再高一些，下一餐清淡些會更舒服。`,
      balanced: (e) => `和最近 ${e} 天相比，今天目前的營養分配算平衡。`
    },
    signalLabels: {
      protein: "蛋白質節奏",
      fiber: "纖維補位",
      sodium: "鈉平衡"
    },
    signalDetails: {
      protein: ({ average: e }) => e > 0 ? `近 7 天平均 ${e}g` : "再多記幾天就能看到節奏",
      fiber: ({ average: e }) => e > 0 ? `近 7 天平均 ${e}g` : "再多記幾天就能看到節奏",
      sodium: ({ average: e }) => e > 0 ? `近 7 天平均 ${e}mg` : "再多記幾天就能看到節奏"
    },
    signalValue: {
      protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
      fiber: ({ current: e }) => `${e}g`,
      sodium: ({ current: e }) => `${e}mg`
    }
  }
}, Cg = {
  detail: {
    overviewTitle: "营养快览",
    overviewSummary: "先用清楚的方式看懂这餐，再决定接下来怎么调整。",
    sections: {
      quality: {
        title: "营养重点",
        summary: "这些数值最容易影响饱足感、口味与整体平衡。"
      },
      fatDetails: {
        title: "脂肪细节",
        summary: "补充看看脂肪来源与组成，帮助你更快判断这餐的油脂负担。"
      }
    }
  },
  trend: {
    title: "营养焦点",
    subtitle: "今天 + 最近 7 天",
    headlines: {
      start_logging: "先记几餐，营养节奏才会开始清楚",
      protein: "今天最值得补的是蛋白质",
      fiber: "今天最容易拉回来的，是纤维",
      sodium: "下一餐清淡一点，整天会更平衡",
      balanced: "今天目前的营养分配算稳"
    },
    summaries: {
      start_logging: "有几餐记录之后，这张卡会开始显示蛋白质、纤维和钠的节奏。",
      protein: (e) => `和最近 ${e} 天相比，今天最值得先补的是蛋白质。`,
      fiber: (e) => `和最近 ${e} 天相比，今天最容易微调的是纤维。`,
      sodium: (e) => `今天的钠比最近 ${e} 天的节奏再高一些，下一餐清淡些会更舒服。`,
      balanced: (e) => `和最近 ${e} 天相比，今天目前的营养分配算平衡。`
    },
    signalLabels: {
      protein: "蛋白质节奏",
      fiber: "纤维补位",
      sodium: "钠平衡"
    },
    signalDetails: {
      protein: ({ average: e }) => e > 0 ? `近 7 天平均 ${e}g` : "再多记几天就能看到节奏",
      fiber: ({ average: e }) => e > 0 ? `近 7 天平均 ${e}g` : "再多记几天就能看到节奏",
      sodium: ({ average: e }) => e > 0 ? `近 7 天平均 ${e}mg` : "再多记几天就能看到节奏"
    },
    signalValue: {
      protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
      fiber: ({ current: e }) => `${e}g`,
      sodium: ({ current: e }) => `${e}mg`
    }
  }
}, xg = {
  detail: {
    overviewTitle: "栄養の見やすいまとめ",
    overviewSummary: "まずはこの食事の栄養を落ち着いて確認してから、次の調整を考えられます。",
    sections: {
      quality: {
        title: "栄養のポイント",
        summary: "満足感や全体のバランスに影響しやすい項目です。"
      },
      fatDetails: {
        title: "脂質の内訳",
        summary: "脂質の由来と組成を少し補足して、食事の重さを見やすくします。"
      }
    }
  },
  trend: {
    title: "栄養フォーカス",
    subtitle: "今日 + 直近 7 日",
    headlines: {
      start_logging: "数日の記録があると栄養の流れが見えてきます",
      protein: "今日はたんぱく質を先に補いたいです",
      fiber: "今日は食物繊維を少し足すと整いやすいです",
      sodium: "次の食事を少し薄味にすると整いやすいです",
      balanced: "今日の栄養バランスは比較的安定しています"
    },
    summaries: {
      start_logging: "数日の記録がたまると、このカードにたんぱく質・食物繊維・塩分の流れが見えてきます。",
      protein: (e) => `直近 ${e} 日と比べると、今日はたんぱく質を優先して補うと整いやすいです。`,
      fiber: (e) => `直近 ${e} 日と比べると、今日は食物繊維を少し足すのがいちばん簡単です。`,
      sodium: (e) => `今日は直近 ${e} 日より塩分が少し高めなので、次の食事は軽めが合います。`,
      balanced: (e) => `直近 ${e} 日と比べても、今日は今のところ栄養配分が整っています。`
    },
    signalLabels: {
      protein: "たんぱく質ペース",
      fiber: "食物繊維",
      sodium: "塩分バランス"
    },
    signalDetails: {
      protein: ({ average: e }) => e > 0 ? `7日平均 ${e}g` : "数日分の記録でペースが見えてきます",
      fiber: ({ average: e }) => e > 0 ? `7日平均 ${e}g` : "数日分の記録でペースが見えてきます",
      sodium: ({ average: e }) => e > 0 ? `7日平均 ${e}mg` : "数日分の記録でペースが見えてきます"
    },
    signalValue: {
      protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
      fiber: ({ current: e }) => `${e}g`,
      sodium: ({ current: e }) => `${e}mg`
    }
  }
}, Ng = {
  detail: {
    overviewTitle: "영양 한눈에 보기",
    overviewSummary: "이 식사의 영양을 먼저 차분히 보고, 다음 조절을 생각할 수 있게 정리했습니다.",
    sections: {
      quality: {
        title: "영양 포인트",
        summary: "포만감과 전체 균형에 영향을 주기 쉬운 항목입니다."
      },
      fatDetails: {
        title: "지방 세부 구성",
        summary: "지방의 구성과 출처를 조금 더 보여 주어 식사의 무게감을 읽기 쉽게 합니다."
      }
    }
  },
  trend: {
    title: "영양 포커스",
    subtitle: "오늘 + 최근 7일",
    headlines: {
      start_logging: "몇 끼만 기록해도 영양 흐름이 보이기 시작합니다",
      protein: "오늘은 단백질을 먼저 보강하는 편이 좋습니다",
      fiber: "오늘은 식이섬유를 조금 더 채우면 흐름이 좋아집니다",
      sodium: "다음 식사를 덜 짜게 하면 하루가 더 편안해집니다",
      balanced: "오늘 영양 흐름은 비교적 안정적입니다"
    },
    summaries: {
      start_logging: "기록이 조금 쌓이면 이 카드에서 단백질, 식이섬유, 나트륨 흐름이 보이기 시작합니다.",
      protein: (e) => `최근 ${e}일과 비교하면 오늘은 단백질을 먼저 채우는 편이 가장 효과적입니다.`,
      fiber: (e) => `최근 ${e}일과 비교하면 오늘은 식이섬유를 조금 더 올리는 것이 가장 쉽습니다.`,
      sodium: (e) => `오늘 나트륨은 최근 ${e}일 흐름보다 약간 높아 다음 식사를 가볍게 두는 편이 좋습니다.`,
      balanced: (e) => `최근 ${e}일과 비교해도 오늘 영양 분배는 비교적 고르게 유지되고 있습니다.`
    },
    signalLabels: {
      protein: "단백질 페이스",
      fiber: "식이섬유 보강",
      sodium: "나트륨 균형"
    },
    signalDetails: {
      protein: ({ average: e }) => e > 0 ? `7일 평균 ${e}g` : "몇 일 더 기록하면 흐름이 보입니다",
      fiber: ({ average: e }) => e > 0 ? `7일 평균 ${e}g` : "몇 일 더 기록하면 흐름이 보입니다",
      sodium: ({ average: e }) => e > 0 ? `7일 평균 ${e}mg` : "몇 일 더 기록하면 흐름이 보입니다"
    },
    signalValue: {
      protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
      fiber: ({ current: e }) => `${e}g`,
      sodium: ({ current: e }) => `${e}mg`
    }
  }
}, Eg = {
  detail: {
    overviewTitle: "نظرة غذائية سريعة",
    overviewSummary: "اقرأ هذه الوجبة بهدوء أولًا، ثم قرر كيف تريد التعديل بعدها.",
    sections: {
      quality: {
        title: "نقاط غذائية مهمة",
        summary: "هذه العناصر تؤثر غالبًا في الشبع والطعم وتوازن الوجبة."
      },
      fatDetails: {
        title: "تفاصيل الدهون",
        summary: "نضيف هنا سياقًا بسيطًا عن مصدر الدهون وتركيبها ليسهل فهم ثقل الوجبة."
      }
    }
  },
  trend: {
    title: "تركيز التغذية",
    subtitle: "اليوم + آخر 7 أيام",
    headlines: {
      start_logging: "بضع وجبات مسجلة تكفي ليبدأ نمط التغذية بالظهور",
      protein: "البروتين هو أوضح فجوة اليوم",
      fiber: "الألياف هي أسهل نقطة يمكن تحسينها الآن",
      sodium: "وجبة أخف وأقل ملوحة ستساعد اليوم",
      balanced: "التغذية تبدو مستقرة إلى حد جيد اليوم"
    },
    summaries: {
      start_logging: "بعد تسجيل بضع وجبات، ستبدأ هذه البطاقة بإظهار أنماط البروتين والألياف والصوديوم.",
      protein: (e) => `مقارنة بآخر ${e} أيام، البروتين هو العنصر الأكثر استحقاقًا للدعم اليوم.`,
      fiber: (e) => `الألياف هي أسهل مكان لتنعيم اليوم مقارنة بآخر ${e} أيام.`,
      sodium: (e) => `الصوديوم اليوم أعلى قليلًا من نمط آخر ${e} أيام، لذا الوجبة التالية الأخف ستكون أفضل.`,
      balanced: (e) => `مقارنة بآخر ${e} أيام، تبدو تغذية اليوم متوازنة إلى حد جيد حتى الآن.`
    },
    signalLabels: {
      protein: "إيقاع البروتين",
      fiber: "دعم الألياف",
      sodium: "توازن الصوديوم"
    },
    signalDetails: {
      protein: ({ average: e }) => e > 0 ? `متوسط 7 أيام ${e}g` : "أضف بضعة أيام أخرى لرؤية الإيقاع",
      fiber: ({ average: e }) => e > 0 ? `متوسط 7 أيام ${e}g` : "أضف بضعة أيام أخرى لرؤية الإيقاع",
      sodium: ({ average: e }) => e > 0 ? `متوسط 7 أيام ${e}mg` : "أضف بضعة أيام أخرى لرؤية الإيقاع"
    },
    signalValue: {
      protein: ({ current: e, target: t }) => t > 0 ? `${e}/${t}g` : `${e}g`,
      fiber: ({ current: e }) => `${e}g`,
      sodium: ({ current: e }) => `${e}mg`
    }
  }
}, Ml = {
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
  "zh-TW": _g,
  "zh-CN": Cg,
  ja: xg,
  ko: Ng,
  ar: Eg
};
function Mg(e = "en") {
  return Ml[e] || Ml[String(e || "en").split("-")[0]] || Ml.en;
}
const Ag = {
  extra: {
    direction: "ltr",
    todayLabel: "今天",
    metaTitle: "Woof Cal 汪卡管家",
    metaOgTitle: "Woof Cal 汪卡管家",
    metaDescription: "用 AI 分析照片或文字裡的餐點，輕鬆追蹤熱量、體重與營養。",
    dailySummaryHint: "點一下看完整營養與水分",
    dailySummaryEmpty: "開始記下今天的飲食吧",
    dailySummaryLeftGoal: (e) => `距離目標還差 ${e} kcal`,
    dailySummaryLeftToday: (e) => `今天還剩 ${e} kcal`,
    dailySummaryOverTarget: (e) => `今天已超出 ${e} kcal`,
    dailySummaryTitle: (e) => `${e} 的營養摘要`,
    remainingLabel: "剩餘",
    emptyStateEyebrow: "快速開始",
    emptyStateTitle: "先記下今天的第一餐",
    emptyStateBody: "你可以先拍照交給 AI，或用手動輸入快速建立第一筆飲食記錄。",
    emptyMealTitle: "還沒有記錄",
    emptyMealBody: "用 AI 或手動輸入開始今天的第一筆飲食。",
    aiGuideEyebrow: "AI 提示",
    aiGuideTitle: "讓 AI 分析更快更穩",
    aiGuideBody: "清楚的照片，加上一句關鍵食材或份量描述，通常能讓分析更穩定。",
    aiGuideTip1: "拍照時盡量避免食物被遮住",
    aiGuideTip2: "有包裝食品時，可補上品牌或品名",
    aiGuideTip3: "如果結果不夠準，可先編輯食材再重新計算",
    aiItemsRequired: "請至少保留一個食材項目。"
  },
  goal: {
    goalTypeLabel: "目標",
    goalSummaryLabel: "目前目標",
    calorieTargetLabel: "熱量目標",
    reportTitle: "目標進度",
    reportSubtitle: "最近 7 天的達標與記錄情況",
    goalTypes: {
      lose: "減重",
      maintain: "維持體重",
      gain: "增肌"
    },
    reportHeadline: (e) => `${e} 本週進度`,
    reportSummary: (e) => `最近 7 天記錄 ${e.loggedDays} 天，熱量達標 ${e.calorieTargetDays} 天，蛋白質達標 ${e.proteinTargetDays} 天`,
    statStreak: "連續記錄",
    statBestStreak: "最佳 streak",
    statCalories: "熱量達標",
    statProtein: "蛋白質達標",
    formatDayCount: (e) => `${e} 天`,
    formatWindowCount: (e, t) => `${e}/${t}`
  },
  coach: {
    cardTitle: "今日教練建議",
    weeklyTitle: "最近 7 天",
    headlines: {
      start_logging: "從第一餐開始建立今天的節奏",
      over_target: "今天的熱量已經偏高",
      near_goal: "你已經接近今天的目標區間",
      protein_gap: "蛋白質還可以再補一點",
      fiber_gap: "纖維還可以再拉高一些",
      sodium_high: "今天的鈉有點偏高",
      steady: "今天目前的節奏算穩定"
    },
    summaries: {
      start_logging: "先記下第一餐之後，儀表板和 AI 建議就會開始變得更有幫助。",
      over_target: (e) => `目前比目標多了約 ${e.overCalories} kcal，下一餐建議清爽一點。`,
      near_goal: (e) => `距離今天目標只剩約 ${e.remainingCalories} kcal，點心份量建議保守一些。`,
      protein_gap: (e) => `距離今天的蛋白質目標還差約 ${e.proteinGap}g。`,
      fiber_gap: (e) => `今天距離理想纖維量還差約 ${e.fiberGap}g。`,
      sodium_high: "下一餐清淡一點，整天的口味和營養平衡會更舒服。",
      steady: "目前熱量和營養分配都算穩，繼續保持就好。"
    },
    tips: {
      use_ai: "想快一點開始，直接用 AI 拍照記錄通常最快。",
      log_first_meal: "如果很忙，也可以先手動記熱量與蛋白質。",
      protein_boost: "下一餐可先補蛋、豆腐、雞胸、優格或牛奶。",
      fiber_boost: "蔬菜、水果、豆類和全穀都很適合補纖維。",
      watch_sodium: "接下來多喝水，也先少一點湯品、醬料或加工食品。",
      portion_reset: "下一餐把主食或點心份量收小一點，通常就能把節奏拉回來。",
      keep_momentum: "維持現在的節奏，晚一點再回來看摘要就夠了。"
    },
    weeklyAverage: (e) => `平均 ${e} kcal`,
    weeklyDays: (e) => `${e} 天有記錄`,
    weeklyBest: (e, t) => `${e} 最高 ${t} kcal`
  },
  rhythm: {
    title: "7 天飲食節奏",
    subtitle: "用比較生活化的方式，看這一週吃得如何。",
    dashboardSubtitle: "從最近 7 天的記錄看出你的飲食節奏。",
    labels: {
      breakfast: "早餐",
      dinner: "晚餐",
      protein: "蛋白質",
      hydration: "水分"
    },
    headlines: {
      start_logging: "先記幾餐，這張卡才會開始看出你的節奏",
      building_consistency: "這週已經開始有一點穩定感",
      steady_week: "這週的飲食節奏看起來算穩",
      breakfast_anchor: "早餐是這週最值得先固定下來的節奏",
      dinner_balance: "這週晚餐承擔了比較多熱量",
      protein_rhythm: "蛋白質的節奏還有點高低起伏"
    },
    summaries: {
      start_logging: "再多記幾餐，系統就能開始整理這一週的飲食節奏。",
      building_consistency: "目前已經看得到一些規律，再多兩三天穩定記錄會更清楚。",
      steady_week: "你的餐次與營養節奏開始有一致性，整天比較容易維持穩定。",
      breakfast_anchor: "如果想讓一天更穩，早餐通常是最值得先調整的地方。",
      dinner_balance: "這週晚餐吃得比較重，偶爾清爽一點會讓整體更平衡。",
      protein_rhythm: "蛋白質高低落差比較明顯，固定補充來源會更穩。"
    },
    breakfast: {
      steady: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天吃早餐，開頭算穩定。`,
      building: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天記到早餐。`,
      irregular: (e) => `最近 7 天只有 ${e.breakfastDays}/${e.loggedDays} 天出現早餐，節奏還在建立中。`
    },
    dinner: {
      light: () => "這週晚餐整體偏輕，白天分配得比較平均。",
      balanced: (e) => `晚餐平均約占全天 ${e.averageDinnerShare}% 的熱量。`,
      heavy: (e) => `最近 7 天有 ${e.heavyDays}/${e.loggedDays} 天是晚餐最重。`
    },
    protein: {
      steady: (e) => `蛋白質平均每天約 ${e.averageProtein}g，整體節奏算穩。`,
      building: (e) => `最近 7 天裡有 ${e.targetDays}/${e.loggedDays} 天接近你的蛋白質節奏。`,
      inconsistent: (e) => `蛋白質分配還不夠平均，目前只有 ${e.targetDays}/${e.loggedDays} 天比較穩。`
    },
    hydration: {
      placeholder: "等水分記錄開啟後，這裡會開始顯示喝水節奏。"
    }
  }
}, Dg = {
  extra: {
    direction: "ltr",
    todayLabel: "今天",
    metaTitle: "Woof Cal 汪卡管家",
    metaOgTitle: "Woof Cal 汪卡管家",
    metaDescription: "用 AI 分析照片或文字里的餐点，轻松追踪热量、体重与营养。",
    dailySummaryHint: "点一下看完整营养与水分",
    dailySummaryEmpty: "开始记下今天的饮食吧",
    dailySummaryLeftGoal: (e) => `距离目标还差 ${e} kcal`,
    dailySummaryLeftToday: (e) => `今天还剩 ${e} kcal`,
    dailySummaryOverTarget: (e) => `今天已超出 ${e} kcal`,
    dailySummaryTitle: (e) => `${e} 的营养摘要`,
    remainingLabel: "剩余",
    emptyStateEyebrow: "快速开始",
    emptyStateTitle: "先记下今天的第一餐",
    emptyStateBody: "你可以先拍照交给 AI，或用手动输入快速建立第一笔饮食记录。",
    emptyMealTitle: "还没有记录",
    emptyMealBody: "用 AI 或手动输入开始今天的第一笔饮食。",
    aiGuideEyebrow: "AI 提示",
    aiGuideTitle: "让 AI 分析更快更稳",
    aiGuideBody: "清楚的照片，加上一句关键食材或份量描述，通常能让分析更稳定。",
    aiGuideTip1: "拍照时尽量避免食物被挡住",
    aiGuideTip2: "有包装食品时，可补上品牌或品名",
    aiGuideTip3: "如果结果不够准，可先编辑食材再重新计算",
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
    reportSummary: (e) => `最近 7 天记录 ${e.loggedDays} 天，热量达标 ${e.calorieTargetDays} 天，蛋白质达标 ${e.proteinTargetDays} 天`,
    statStreak: "连续记录",
    statBestStreak: "最佳 streak",
    statCalories: "热量达标",
    statProtein: "蛋白质达标",
    formatDayCount: (e) => `${e} 天`,
    formatWindowCount: (e, t) => `${e}/${t}`
  },
  coach: {
    cardTitle: "今日教练建议",
    weeklyTitle: "最近 7 天",
    headlines: {
      start_logging: "从第一餐开始建立今天的节奏",
      over_target: "今天的热量已经偏高",
      near_goal: "你已经接近今天的目标区间",
      protein_gap: "蛋白质还可以再补一点",
      fiber_gap: "纤维还可以再拉高一些",
      sodium_high: "今天的钠有点偏高",
      steady: "今天目前的节奏算稳定"
    },
    summaries: {
      start_logging: "先记下第一餐之后，仪表板和 AI 建议就会开始变得更有帮助。",
      over_target: (e) => `目前比目标多了约 ${e.overCalories} kcal，下一餐建议清爽一点。`,
      near_goal: (e) => `距离今天目标只剩约 ${e.remainingCalories} kcal，零食份量建议保守一些。`,
      protein_gap: (e) => `距离今天的蛋白质目标还差约 ${e.proteinGap}g。`,
      fiber_gap: (e) => `今天距离理想纤维量还差约 ${e.fiberGap}g。`,
      sodium_high: "下一餐清淡一点，整天的口味和营养平衡会更舒服。",
      steady: "目前热量和营养分配都算稳，继续保持就好。"
    },
    tips: {
      use_ai: "想快一点开始，直接用 AI 拍照记录通常最快。",
      log_first_meal: "如果很忙，也可以先手动记热量与蛋白质。",
      protein_boost: "下一餐可先补蛋、豆腐、鸡胸、酸奶或牛奶。",
      fiber_boost: "蔬菜、水果、豆类和全谷都很适合补纤维。",
      watch_sodium: "接下来多喝水，也先少一点汤品、酱料或加工食品。",
      portion_reset: "下一餐把主食或点心份量收小一点，通常就能把节奏拉回来。",
      keep_momentum: "维持现在的节奏，晚一点再回来看摘要就够了。"
    },
    weeklyAverage: (e) => `平均 ${e} kcal`,
    weeklyDays: (e) => `${e} 天有记录`,
    weeklyBest: (e, t) => `${e} 最高 ${t} kcal`
  },
  rhythm: {
    title: "7 天饮食节奏",
    subtitle: "用更生活化的方式，看这一周吃得如何。",
    dashboardSubtitle: "从最近 7 天的记录看出你的饮食节奏。",
    labels: {
      breakfast: "早餐",
      dinner: "晚餐",
      protein: "蛋白质",
      hydration: "水分"
    },
    headlines: {
      start_logging: "先记几餐，这张卡才会开始看出你的节奏",
      building_consistency: "这周已经开始有一点稳定感",
      steady_week: "这周的饮食节奏看起来算稳",
      breakfast_anchor: "早餐是这周最值得先固定下来的节奏",
      dinner_balance: "这周晚餐承担了比较多热量",
      protein_rhythm: "蛋白质的节奏还有点高低起伏"
    },
    summaries: {
      start_logging: "再多记几餐，系统就能开始整理这一周的饮食节奏。",
      building_consistency: "目前已经看得到一些规律，再多两三天稳定记录会更清楚。",
      steady_week: "你的餐次与营养节奏开始有一致性，整天比较容易维持稳定。",
      breakfast_anchor: "如果想让一天更稳，早餐通常是最值得先调整的地方。",
      dinner_balance: "这周晚餐吃得比较重，偶尔清爽一点会让整体更平衡。",
      protein_rhythm: "蛋白质高低落差比较明显，固定补充来源会更稳。"
    },
    breakfast: {
      steady: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天吃早餐，开头算稳定。`,
      building: (e) => `最近 7 天有 ${e.breakfastDays}/${e.loggedDays} 天记到早餐。`,
      irregular: (e) => `最近 7 天只有 ${e.breakfastDays}/${e.loggedDays} 天出现早餐，节奏还在建立中。`
    },
    dinner: {
      light: () => "这周晚餐整体偏轻，白天分配得比较平均。",
      balanced: (e) => `晚餐平均约占全天 ${e.averageDinnerShare}% 的热量。`,
      heavy: (e) => `最近 7 天有 ${e.heavyDays}/${e.loggedDays} 天是晚餐最重。`
    },
    protein: {
      steady: (e) => `蛋白质平均每天约 ${e.averageProtein}g，整体节奏算稳。`,
      building: (e) => `最近 7 天里有 ${e.targetDays}/${e.loggedDays} 天接近你的蛋白质节奏。`,
      inconsistent: (e) => `蛋白质分配还不够平均，目前只有 ${e.targetDays}/${e.loggedDays} 天比较稳。`
    },
    hydration: {
      placeholder: "等水分记录开启后，这里会开始显示喝水节奏。"
    }
  }
}, Ig = {
  extra: {
    direction: "ltr",
    todayLabel: "今日",
    metaTitle: "Woof Cal",
    metaOgTitle: "Woof Cal",
    metaDescription: "AI で写真やテキストの食事を分析し、カロリー、体重、栄養を手軽に追跡します。",
    dailySummaryHint: "タップして栄養の詳細を見る",
    dailySummaryEmpty: "今日の食事を記録しましょう",
    dailySummaryLeftGoal: (e) => `目標まであと ${e} kcal`,
    dailySummaryLeftToday: (e) => `今日はあと ${e} kcal`,
    dailySummaryOverTarget: (e) => `今日は ${e} kcal オーバー`,
    dailySummaryTitle: (e) => `${e} の栄養サマリー`,
    remainingLabel: "残り",
    emptyStateEyebrow: "クイックスタート",
    emptyStateTitle: "今日の最初の一食を記録しよう",
    emptyStateBody: "AI 写真解析か手動入力で、今日の食事記録を始められます。",
    emptyMealTitle: "まだ記録がありません",
    emptyMealBody: "AI または手動入力で最初の一食を追加しましょう",
    aiGuideEyebrow: "AI ヒント",
    aiGuideTitle: "AI 分析をもっと速く、安定して",
    aiGuideBody: "写真を見やすくして、食材や量を少し補足すると、分析が安定しやすくなります。",
    aiGuideTip1: "料理全体が見えるように撮影する",
    aiGuideTip2: "必要なときはブランド名や主要食材を添える",
    aiGuideTip3: "結果がずれていたら、食材を編集してから再計算する",
    aiItemsRequired: "少なくとも 1 件の食材を残してください。"
  },
  goal: {
    goalTypeLabel: "目標",
    goalSummaryLabel: "現在の目標",
    calorieTargetLabel: "カロリー目標",
    reportTitle: "目標の進み具合",
    reportSubtitle: "直近 7 日の達成と記録",
    goalTypes: {
      lose: "減量",
      maintain: "維持",
      gain: "筋肉をつける"
    },
    reportHeadline: (e) => `${e} の週間進捗`,
    reportSummary: (e) => `直近 7 日で ${e.loggedDays} 日記録、カロリー達成 ${e.calorieTargetDays} 日、たんぱく質達成 ${e.proteinTargetDays} 日`,
    statStreak: "連続記録",
    statBestStreak: "ベスト streak",
    statCalories: "カロリー達成",
    statProtein: "たんぱく質達成",
    formatDayCount: (e) => `${e}日`,
    formatWindowCount: (e, t) => `${e}/${t}`
  },
  coach: {
    cardTitle: "今日のコーチ",
    weeklyTitle: "直近 7 日",
    headlines: {
      start_logging: "まずは一食記録して今日を始めよう",
      over_target: "今日はカロリーがやや高めです",
      near_goal: "目標ゾーンにかなり近づいています",
      protein_gap: "たんぱく質をもう少し足したいです",
      fiber_gap: "食物繊維を少し足す余地があります",
      sodium_high: "今日は塩分がやや高めです",
      steady: "今日はここまで安定した流れです"
    },
    summaries: {
      start_logging: "最初の一食を記録すると、残りの一日への提案が見えやすくなります。",
      over_target: (e) => `目標より約 ${e.overCalories} kcal 多いので、次の食事は軽めが合います。`,
      near_goal: (e) => `残りは約 ${e.remainingCalories} kcal なので、間食は控えめで十分です。`,
      protein_gap: (e) => `今日のたんぱく質目標まであと約 ${e.proteinGap}g です。`,
      fiber_gap: (e) => `食物繊維はあと約 ${e.fiberGap}g あると一日が整いやすいです。`,
      sodium_high: "次の食事を少し薄味にすると、全体のバランスが戻りやすくなります。",
      steady: "カロリーも栄養もここまでは比較的安定しています。"
    },
    tips: {
      use_ai: "いちばん速いのは AI 写真記録です。",
      log_first_meal: "忙しい日は、まずカロリーとたんぱく質だけ手入力でも十分です。",
      protein_boost: "次は卵、豆腐、鶏むね、ヨーグルト、牛乳などが補いやすいです。",
      fiber_boost: "野菜、果物、豆類、全粒穀物で食物繊維を足しやすくなります。",
      watch_sodium: "水分をとって、汁物やソース、加工食品を少し控えると整いやすいです。",
      portion_reset: "次の主食や間食を少し小さくすると、流れを戻しやすくなります。",
      keep_momentum: "今のペースを保って、夕方にもう一度サマリーを見れば十分です。"
    },
    weeklyAverage: (e) => `平均 ${e} kcal`,
    weeklyDays: (e) => `${e} 日記録`,
    weeklyBest: (e, t) => `${e} 最大 ${t} kcal`
  },
  rhythm: {
    title: "7日間の食事リズム",
    subtitle: "この一週間の流れをやさしく読み取ります。",
    dashboardSubtitle: "直近 7 日の記録から見える一貫性です。",
    labels: {
      breakfast: "朝食",
      dinner: "夕食",
      protein: "たんぱく質",
      hydration: "水分"
    },
    headlines: {
      start_logging: "数日の記録で一週間の流れが見えてきます",
      building_consistency: "少しずつ繰り返しやすい週になってきました",
      steady_week: "今週の食事リズムは比較的安定しています",
      breakfast_anchor: "朝食が一番整えやすいポイントです",
      dinner_balance: "夕食に少し重さが寄っています",
      protein_rhythm: "たんぱく質の流れはまだ日によってぶれています"
    },
    summaries: {
      start_logging: "数日の記録がたまると、このカードに食事の流れが見えてきます。",
      building_consistency: "いくつかの傾向が見え始めています。あと 2〜3 日続くともっとはっきりします。",
      steady_week: "食事の流れに繰り返しが出てきていて、一日を整えやすくなっています。",
      breakfast_anchor: "一日を安定させたいなら、まず朝食を整えるのがいちばん手堅いです。",
      dinner_balance: "夕食が今週の大きな比重を占めています。少し軽い夜があると整いやすくなります。",
      protein_rhythm: "たんぱく質の取り方にばらつきがあります。固定の補給ポイントがあると安定します。"
    },
    breakfast: {
      steady: (e) => `${e.loggedDays} 日のうち ${e.breakfastDays} 日で朝食が記録され、出だしは安定しています。`,
      building: (e) => `${e.loggedDays} 日のうち ${e.breakfastDays} 日で朝食が記録されています。`,
      irregular: (e) => `${e.loggedDays} 日のうち朝食があったのは ${e.breakfastDays} 日です。`
    },
    dinner: {
      light: () => "今週の夕食は比較的軽めです。",
      balanced: (e) => `夕食は一日のカロリーの約 ${e.averageDinnerShare}% を占めています。`,
      heavy: (e) => `${e.loggedDays} 日のうち ${e.heavyDays} 日で夕食が最も重くなっています。`
    },
    protein: {
      steady: (e) => `たんぱく質は平均 ${e.averageProtein}g で比較的安定しています。`,
      building: (e) => `${e.loggedDays} 日のうち ${e.targetDays} 日がたんぱく質ペースに近い日でした。`,
      inconsistent: (e) => `たんぱく質の入り方にはまだばらつきがあり、安定した日は ${e.targetDays}/${e.loggedDays} 日です。`
    },
    hydration: {
      placeholder: "水分記録が入ると、ここに水分リズムが表示されます。"
    }
  }
}, Fg = {
  extra: {
    direction: "ltr",
    todayLabel: "오늘",
    metaTitle: "Woof Cal",
    metaOgTitle: "Woof Cal",
    metaDescription: "AI로 사진이나 텍스트 식사를 분석하고, 칼로리와 체중, 영양을 가볍게 추적합니다.",
    dailySummaryHint: "눌러서 영양 상세 보기",
    dailySummaryEmpty: "오늘 식사를 기록해 보세요",
    dailySummaryLeftGoal: (e) => `목표까지 ${e} kcal 남음`,
    dailySummaryLeftToday: (e) => `오늘 ${e} kcal 남음`,
    dailySummaryOverTarget: (e) => `오늘 ${e} kcal 초과`,
    dailySummaryTitle: (e) => `${e} 영양 요약`,
    remainingLabel: "남음",
    emptyStateEyebrow: "빠른 시작",
    emptyStateTitle: "오늘의 첫 식사를 기록해 보세요",
    emptyStateBody: "AI 사진 분석이나 수동 입력으로 오늘 식사를 시작할 수 있습니다.",
    emptyMealTitle: "아직 기록이 없습니다",
    emptyMealBody: "AI 또는 수동 입력으로 첫 식사를 추가해 보세요",
    aiGuideEyebrow: "AI 팁",
    aiGuideTitle: "AI 분석을 더 빠르고 안정적으로",
    aiGuideBody: "사진을 또렷하게 찍고 재료나 양을 조금 덧붙이면 분석 결과가 더 안정적입니다.",
    aiGuideTip1: "접시가 가리지 않게 전체가 보이도록 찍기",
    aiGuideTip2: "필요하면 브랜드명이나 핵심 재료를 적기",
    aiGuideTip3: "결과가 어긋나면 재료를 먼저 수정한 뒤 다시 계산하기",
    aiItemsRequired: "최소 한 개의 재료는 남겨 주세요."
  },
  goal: {
    goalTypeLabel: "목표",
    goalSummaryLabel: "현재 목표",
    calorieTargetLabel: "칼로리 목표",
    reportTitle: "목표 진행도",
    reportSubtitle: "최근 7일의 달성과 기록",
    goalTypes: {
      lose: "감량",
      maintain: "유지",
      gain: "근육 늘리기"
    },
    reportHeadline: (e) => `${e} 주간 진행도`,
    reportSummary: (e) => `최근 7일 중 ${e.loggedDays}일 기록, 칼로리 달성 ${e.calorieTargetDays}일, 단백질 달성 ${e.proteinTargetDays}일`,
    statStreak: "연속 기록",
    statBestStreak: "최고 streak",
    statCalories: "칼로리 달성",
    statProtein: "단백질 달성",
    formatDayCount: (e) => `${e}일`,
    formatWindowCount: (e, t) => `${e}/${t}`
  },
  coach: {
    cardTitle: "오늘의 코치",
    weeklyTitle: "최근 7일",
    headlines: {
      start_logging: "첫 식사를 기록하며 오늘을 시작하세요",
      over_target: "오늘 칼로리가 다소 높게 가고 있습니다",
      near_goal: "목표 구간에 꽤 가까워졌습니다",
      protein_gap: "단백질을 조금 더 보강하면 좋습니다",
      fiber_gap: "식이섬유를 조금 더 올릴 수 있습니다",
      sodium_high: "오늘 나트륨이 다소 높습니다",
      steady: "오늘 흐름은 비교적 안정적입니다"
    },
    summaries: {
      start_logging: "첫 식사를 기록하면 남은 하루에 대한 제안이 더 분명해집니다.",
      over_target: (e) => `현재 목표보다 약 ${e.overCalories} kcal 높으니, 다음 식사는 조금 가볍게 가는 편이 좋습니다.`,
      near_goal: (e) => `남은 칼로리는 약 ${e.remainingCalories} kcal 이므로 간식은 가볍게면 충분합니다.`,
      protein_gap: (e) => `오늘 단백질 목표까지 약 ${e.proteinGap}g 남았습니다.`,
      fiber_gap: (e) => `식이섬유는 약 ${e.fiberGap}g 정도 더 있으면 하루 균형이 좋아집니다.`,
      sodium_high: "다음 식사를 조금 덜 짜게 하면 오늘 전체 흐름이 더 편안해집니다.",
      steady: "칼로리와 영양 흐름이 지금까지는 비교적 안정적입니다."
    },
    tips: {
      use_ai: "가장 빠른 시작은 AI 사진 기록입니다.",
      log_first_meal: "바쁠 때는 칼로리와 단백질만 먼저 수동으로 기록해도 충분합니다.",
      protein_boost: "다음 식사는 달걀, 두부, 닭가슴살, 요거트, 우유가 보강하기 쉽습니다.",
      fiber_boost: "채소, 과일, 콩류, 통곡물로 식이섬유를 채우기 쉽습니다.",
      watch_sodium: "물을 더 마시고 국물, 소스, 가공식품을 조금 줄여 보세요.",
      portion_reset: "다음 탄수화물이나 간식 양을 조금 줄이면 흐름을 되돌리기 쉽습니다.",
      keep_momentum: "지금 흐름을 유지하고 저녁 전에 요약을 한 번 더 보면 충분합니다."
    },
    weeklyAverage: (e) => `평균 ${e} kcal`,
    weeklyDays: (e) => `${e}일 기록`,
    weeklyBest: (e, t) => `${e} 최고 ${t} kcal`
  },
  rhythm: {
    title: "7일 식사 리듬",
    subtitle: "이번 주 흐름을 생활감 있게 읽어 줍니다.",
    dashboardSubtitle: "최근 7일 기록에서 보이는 일관성입니다.",
    labels: {
      breakfast: "아침",
      dinner: "저녁",
      protein: "단백질",
      hydration: "수분"
    },
    headlines: {
      start_logging: "몇 끼만 기록해도 주간 리듬이 보이기 시작합니다",
      building_consistency: "반복 가능한 한 주가 조금씩 만들어지고 있습니다",
      steady_week: "이번 주 식사 리듬은 비교적 안정적입니다",
      breakfast_anchor: "아침이 가장 고정하기 쉬운 기준점입니다",
      dinner_balance: "저녁 비중이 지금은 조금 큽니다",
      protein_rhythm: "단백질 흐름은 아직 날짜마다 흔들립니다"
    },
    summaries: {
      start_logging: "몇 끼만 더 기록하면 이 카드에 당신의 식사 흐름이 드러납니다.",
      building_consistency: "일부 패턴이 보이기 시작했습니다. 2~3일만 더 꾸준하면 훨씬 선명해집니다.",
      steady_week: "식사 흐름이 반복되기 시작해서 하루 전체를 맞추기 쉬워지고 있습니다.",
      breakfast_anchor: "하루를 안정적으로 만들고 싶다면 먼저 아침을 고정하는 편이 가장 쉽습니다.",
      dinner_balance: "저녁이 이번 주의 큰 비중을 차지하고 있습니다. 한두 번 가볍게 가면 더 매끈해집니다.",
      protein_rhythm: "단백질 섭취가 아직 들쭉날쭉합니다. 고정된 보강 포인트가 있으면 더 안정됩니다."
    },
    breakfast: {
      steady: (e) => `${e.loggedDays}일 중 ${e.breakfastDays}일에 아침이 기록되어 시작이 비교적 안정적입니다.`,
      building: (e) => `${e.loggedDays}일 중 ${e.breakfastDays}일에 아침이 기록되었습니다.`,
      irregular: (e) => `${e.loggedDays}일 중 아침이 있었던 날은 ${e.breakfastDays}일입니다.`
    },
    dinner: {
      light: () => "이번 주 저녁은 비교적 가볍게 유지되고 있습니다.",
      balanced: (e) => `저녁은 하루 칼로리의 약 ${e.averageDinnerShare}%를 차지하고 있습니다.`,
      heavy: (e) => `${e.loggedDays}일 중 ${e.heavyDays}일은 저녁이 가장 무거웠습니다.`
    },
    protein: {
      steady: (e) => `단백질은 하루 평균 ${e.averageProtein}g로 비교적 안정적입니다.`,
      building: (e) => `${e.loggedDays}일 중 ${e.targetDays}일이 단백질 페이스에 가까웠습니다.`,
      inconsistent: (e) => `단백질 분포는 아직 고르지 않고, 안정적인 날은 ${e.targetDays}/${e.loggedDays}일입니다.`
    },
    hydration: {
      placeholder: "수분 기록이 시작되면 여기에 물 리듬이 표시됩니다."
    }
  }
}, bg = {
  extra: {
    direction: "rtl",
    todayLabel: "اليوم",
    metaTitle: "Woof Cal",
    metaOgTitle: "Woof Cal",
    metaDescription: "حلّل وجباتك بالذكاء الاصطناعي وتابع السعرات والوزن والتغذية في واجهة خفيفة وواضحة.",
    dailySummaryHint: "اضغط لعرض التفاصيل الغذائية الكاملة",
    dailySummaryEmpty: "ابدأ بتسجيل وجبات اليوم",
    dailySummaryLeftGoal: (e) => `تبقّى ${e} kcal للوصول إلى الهدف`,
    dailySummaryLeftToday: (e) => `تبقّى ${e} kcal لليوم`,
    dailySummaryOverTarget: (e) => `تم تجاوز الهدف بمقدار ${e} kcal`,
    dailySummaryTitle: (e) => `${e} ملخص التغذية`,
    remainingLabel: "المتبقي",
    emptyStateEyebrow: "بداية سريعة",
    emptyStateTitle: "سجّل أول وجبة لك اليوم",
    emptyStateBody: "التقط صورة للوجبة بالذكاء الاصطناعي أو أضف إدخالاً يدويًا لبدء يومك.",
    emptyMealTitle: "لا توجد وجبات مسجلة بعد",
    emptyMealBody: "ابدأ بالذكاء الاصطناعي أو بالإدخال اليدوي",
    aiGuideEyebrow: "AI Tips",
    aiGuideTitle: "اجعل تحليل AI أسرع وأكثر دقة",
    aiGuideBody: "الصورة الواضحة مع وصف بسيط للمكونات أو الكمية تجعل التحليل أكثر استقرارًا.",
    aiGuideTip1: "حاول أن يكون الطبق ظاهرًا بالكامل في الصورة",
    aiGuideTip2: "أضف اسم المنتج أو المكونات الأساسية عند الحاجة",
    aiGuideTip3: "إذا بدا التحليل غير دقيق، عدّل المكونات قبل إعادة الحساب",
    aiItemsRequired: "يرجى الإبقاء على عنصر واحد على الأقل."
  },
  goal: {
    goalTypeLabel: "الهدف",
    goalSummaryLabel: "الهدف الحالي",
    calorieTargetLabel: "هدف السعرات",
    reportTitle: "تقدم الهدف",
    reportSubtitle: "آخر 7 أيام من الالتزام والتسجيل",
    goalTypes: {
      lose: "خسارة الوزن",
      maintain: "الحفاظ على الوزن",
      gain: "بناء العضلات"
    },
    reportHeadline: (e) => `التقدم الأسبوعي لهدف ${e}`,
    reportSummary: (e) => `تم التسجيل ${e.loggedDays}/7 أيام، وتحقيق هدف السعرات ${e.calorieTargetDays} أيام، وهدف البروتين ${e.proteinTargetDays} أيام`,
    statStreak: "تسجيل متتالٍ",
    statBestStreak: "أفضل streak",
    statCalories: "هدف السعرات",
    statProtein: "هدف البروتين",
    formatDayCount: (e) => `${e} أيام`,
    formatWindowCount: (e, t) => `${e}/${t}`
  },
  coach: {
    cardTitle: "مدرب اليوم",
    weeklyTitle: "آخر 7 أيام",
    headlines: {
      start_logging: "ابدأ اليوم بتسجيل أول وجبة",
      over_target: "السعرات اليوم أعلى من المطلوب",
      near_goal: "أنت قريب من نطاق الهدف",
      protein_gap: "البروتين ما زال يحتاج دفعة",
      fiber_gap: "الألياف تحتاج زيادة بسيطة",
      sodium_high: "الصوديوم مرتفع اليوم",
      steady: "إيقاع اليوم جيد حتى الآن"
    },
    summaries: {
      start_logging: "بمجرد تسجيل أول وجبة ستصبح صورة بقية اليوم أوضح.",
      over_target: (e) => `أنت أعلى من الهدف بحوالي ${e.overCalories} kcal، لذلك من الأفضل أن تكون الوجبة التالية أخف.`,
      near_goal: (e) => `المتبقي حوالي ${e.remainingCalories} kcal فقط، لذا يكفي سناك خفيف إذا احتجته.`,
      protein_gap: (e) => `ما زال ينقصك حوالي ${e.proteinGap}g للوصول إلى هدف البروتين اليومي.`,
      fiber_gap: (e) => `ما زال ينقصك حوالي ${e.fiberGap}g للوصول إلى يوم غني بالألياف.`,
      sodium_high: "اختر وجبة أقل ملوحة لاحقًا حتى يعود التوازن لبقية اليوم.",
      steady: "السعرات والعناصر الغذائية تسير بشكل متوازن حتى الآن."
    },
    tips: {
      use_ai: "أسرع بداية تكون غالبًا عبر تصوير الوجبة بالذكاء الاصطناعي.",
      log_first_meal: "إذا كنت مستعجلًا، يكفي أن تسجل السعرات والبروتين يدويًا أولًا.",
      protein_boost: "في الوجبة القادمة جرّب البيض أو الدجاج أو الزبادي أو التوفو.",
      fiber_boost: "أضف خضارًا أو فاكهة أو بقوليات أو حبوبًا كاملة لرفع الألياف.",
      watch_sodium: "اشرب ماء أكثر وخفف من الشوربة والصلصات والأطعمة المصنعة.",
      portion_reset: "تقليل النشويات أو السناك التالي إلى النصف يساعدك على العودة للمسار.",
      keep_momentum: "حافظ على الإيقاع الحالي وراجع البطاقة مرة أخرى قبل العشاء."
    },
    weeklyAverage: (e) => `المتوسط ${e} kcal`,
    weeklyDays: (e) => `${e} أيام مسجلة`,
    weeklyBest: (e, t) => `${e} الأعلى ${t} kcal`
  },
  rhythm: {
    title: "إيقاع الوجبات خلال 7 أيام",
    subtitle: "قراءة خفيفة لكيف سار أسبوعك.",
    dashboardSubtitle: "إشارات الثبات من آخر 7 أيام مسجلة.",
    labels: {
      breakfast: "الفطور",
      dinner: "العشاء",
      protein: "البروتين",
      hydration: "الماء"
    },
    headlines: {
      start_logging: "إيقاع الأسبوع يبدأ بعد تسجيل بضع وجبات",
      building_consistency: "أنت تبني أسبوعًا أكثر قابلية للتكرار",
      steady_week: "إيقاع وجباتك يبدو مستقرًا هذا الأسبوع",
      breakfast_anchor: "الفطور هو أوضح نقطة لتثبيت اليوم",
      dinner_balance: "العشاء يحمل جزءًا كبيرًا من هذا الأسبوع الآن",
      protein_rhythm: "إيقاع البروتين ما زال يتحرك من يوم لآخر"
    },
    summaries: {
      start_logging: "سجّل بضع وجبات عبر الأسبوع وستبدأ هذه البطاقة بإظهار روتينك.",
      building_consistency: "بعض الأنماط بدأت تظهر. يومان أو ثلاثة أكثر ثباتًا سيجعلان الصورة أوضح.",
      steady_week: "الوجبات بدأت تأخذ إيقاعًا متكررًا، وهذا يجعل بقية اليوم أسهل في التنظيم.",
      breakfast_anchor: "إذا أردت يومًا أكثر استقرارًا، فالفطور هو أسهل نقطة تبدأ منها.",
      dinner_balance: "العشاء يأخذ حصة كبيرة هذا الأسبوع. وجبة أخف مرة أو مرتين قد تنعم الإيقاع.",
      protein_rhythm: "تناول البروتين غير متساوٍ عبر الأسبوع. وجود نقطة ثابتة سيساعد كثيرًا."
    },
    breakfast: {
      steady: (e) => `تم تسجيل الفطور في ${e.breakfastDays}/${e.loggedDays} أيام وكانت البداية متكررة بشكل جيد.`,
      building: (e) => `ظهر الفطور في ${e.breakfastDays}/${e.loggedDays} من الأيام المسجلة.`,
      irregular: (e) => `ظهر الفطور فقط في ${e.breakfastDays}/${e.loggedDays} من الأيام المسجلة.`
    },
    dinner: {
      light: () => "العشاء بقي أخف نسبيًا هذا الأسبوع.",
      balanced: (e) => `العشاء يشكل في المتوسط حوالي ${e.averageDinnerShare}% من سعرات اليوم.`,
      heavy: (e) => `كان العشاء هو الأثقل في ${e.heavyDays}/${e.loggedDays} من الأيام المسجلة.`
    },
    protein: {
      steady: (e) => `البروتين يبدو مستقرًا إلى حد جيد بمتوسط ${e.averageProtein}g يوميًا.`,
      building: (e) => `${e.targetDays}/${e.loggedDays} أيام كانت قريبة من إيقاع البروتين المطلوب.`,
      inconsistent: (e) => `البروتين غير متساوٍ بعد، مع ${e.targetDays}/${e.loggedDays} أيام قوية فقط.`
    },
    hydration: {
      placeholder: "سيظهر إيقاع الماء هنا عندما يصبح تسجيل الشرب متاحًا."
    }
  }
}, Eo = {
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
  "zh-TW": Ag,
  "zh-CN": Dg,
  ja: Ig,
  ko: Fg,
  ar: bg
};
function bd(e, t = Y().curLang) {
  var n;
  return ((n = Eo[t]) == null ? void 0 : n[e]) || Eo.en[e];
}
function Pg(e = Y().curLang) {
  return bd("extra", e);
}
function Lg(e = Y().curLang) {
  return bd("goal", e);
}
function Xa(e = Y().curLang) {
  return Mg(e);
}
function $g(e = "lose", t = Y().curLang) {
  var r, a;
  const n = Lg(t);
  return ((r = n.goalTypes) == null ? void 0 : r[e]) || ((a = n.goalTypes) == null ? void 0 : a.lose) || Eo.en.goal.goalTypes.lose;
}
function zg(e, t = Y().curLang) {
  var u, g, d, f, h, v, y, b, m, c, p;
  const n = Di(t), r = Fn(t), a = (((u = e == null ? void 0 : e.mealCoverage) == null ? void 0 : u.loggedMeals) || 0) > 0, l = ((d = r.meals) == null ? void 0 : d[((g = e == null ? void 0 : e.mealCoverage) == null ? void 0 : g.nextMealTitleKey) || ""]) || "", o = a ? n.heroSummaryActive : n.heroSummaryBase || "", i = Number((e == null ? void 0 : e.proteinCurrent) || 0).toFixed(1).replace(/\.0$/, ""), s = (e == null ? void 0 : e.proteinRemaining) > 0 ? n.signalProteinToGoal(e.proteinRemaining) : n.signalProteinOnTrack;
  return {
    hero: {
      eyebrow: a ? n.heroEyebrowActive : n.heroEyebrowEmpty,
      title: a ? n.heroTitleActive(e.mealCoverage || { loggedMeals: 0, plannedMeals: 0 }) : n.heroTitleEmpty,
      summary: o,
      stats: [
        {
          label: n.statLabels.streak,
          value: n.formatDayCount(((h = (f = e == null ? void 0 : e.pet) == null ? void 0 : f.progress) == null ? void 0 : h.streak) || 0)
        },
        {
          label: n.statLabels.meals,
          value: n.formatMealCoverage(
            ((v = e == null ? void 0 : e.mealCoverage) == null ? void 0 : v.loggedMeals) || 0,
            ((y = e == null ? void 0 : e.mealCoverage) == null ? void 0 : y.plannedMeals) || 0
          )
        },
        {
          label: n.statLabels.protein,
          value: n.formatProteinPace(i, (e == null ? void 0 : e.proteinTarget) || 0)
        }
      ],
      meta: [
        $g(e == null ? void 0 : e.goalType, t),
        l || ""
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
          detail: s
        },
        {
          label: n.signals.meals,
          value: n.formatMealCoverage(
            ((b = e == null ? void 0 : e.mealCoverage) == null ? void 0 : b.loggedMeals) || 0,
            ((m = e == null ? void 0 : e.mealCoverage) == null ? void 0 : m.plannedMeals) || 0
          ),
          detail: a ? n.signalMealsActive(
            ((c = e == null ? void 0 : e.mealCoverage) == null ? void 0 : c.loggedMeals) || 0,
            ((p = e == null ? void 0 : e.mealCoverage) == null ? void 0 : p.plannedMeals) || 0,
            l
          ) : n.signalMealsEmpty
        }
      ]
    }
  };
}
function Rg(e, t = Y().curLang) {
  var i, s, u, g;
  const n = Xa(t).trend, r = (e == null ? void 0 : e.focusKey) || "balanced", a = ((i = n.headlines) == null ? void 0 : i[r]) || ((s = n.headlines) == null ? void 0 : s.balanced) || "", l = ((u = n.summaries) == null ? void 0 : u[r]) || ((g = n.summaries) == null ? void 0 : g.balanced) || "", o = typeof l == "function" ? l((e == null ? void 0 : e.loggedDays) || 7) : l;
  return {
    title: n.title,
    subtitle: n.subtitle,
    headline: a,
    summary: o,
    signals: ((e == null ? void 0 : e.signals) || []).map((d) => {
      var f, h, v;
      return {
        key: d.key,
        label: ((f = n.signalLabels) == null ? void 0 : f[d.key]) || d.key,
        value: (h = n.signalValue) != null && h[d.key] ? n.signalValue[d.key](d) : String(d.current ?? "--"),
        detail: (v = n.signalDetails) != null && v[d.key] ? n.signalDetails[d.key](d) : ""
      };
    })
  };
}
function Ii(e = Y().selectedDate, t = Y().curLang) {
  const { selectedDate: n } = Y(), r = e || n || xn(), a = Pg(t);
  return r === xn() ? a.todayLabel : r;
}
function Ze(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Pd(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function Mr(e = []) {
  return !Array.isArray(e) || e.length === 0 ? 0 : e.reduce((t, n) => t + Ze(n), 0) / e.length;
}
function Og(e = []) {
  if (!Array.isArray(e) || e.length < 2) return 0;
  const t = Mr(e), n = e.reduce((r, a) => {
    const l = Ze(a) - t;
    return r + l * l;
  }, 0) / e.length;
  return Math.sqrt(n);
}
function Ld(e = [], t = 0.45) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  if (e.length === 1) return 60;
  const n = Mr(e);
  if (n <= 0) return 0;
  const r = Og(e) / n;
  return Math.round((1 - Pd(r / t, 0, 1)) * 100);
}
function Fi(e, t) {
  return {
    key: e,
    score: 0,
    status: t,
    loggedDays: 0
  };
}
function jg(e = {}) {
  const t = Array.isArray(e == null ? void 0 : e.items) ? e.items : [], { totals: n, mealTotals: r } = Ya(t), a = Math.round(Ze(n.cal)), l = Math.round(Ze(n.pro) * 10) / 10, o = Math.round(Ze(r.breakfast)), i = Math.round(Ze(r.dinner)), s = Math.round(Ze(r.lunch)), u = Math.round(Ze(r.snack)), g = t.length > 0 || a > 0 || l > 0;
  return {
    date: String((e == null ? void 0 : e.date) || ""),
    label: String((e == null ? void 0 : e.label) || (e == null ? void 0 : e.date) || ""),
    logged: g,
    totalCalories: a,
    totalProtein: l,
    breakfastCalories: o,
    lunchCalories: s,
    dinnerCalories: i,
    snackCalories: u,
    dinnerShare: a > 0 ? i / a : 0,
    breakfastLogged: o > 0,
    dinnerLogged: i > 0
  };
}
function Wg(e = []) {
  const t = e.filter((i) => i.logged);
  if (t.length === 0)
    return Fi("breakfast", "not_enough_data");
  const n = t.filter((i) => i.breakfastLogged), r = n.length / t.length, a = Ld(
    n.map((i) => i.breakfastCalories),
    0.5
  ), l = Math.round((r * 0.7 + a / 100 * 0.3) * 100);
  let o = "irregular";
  return t.length < 3 ? o = n.length > 0 ? "building" : "irregular" : l >= 70 ? o = "steady" : l >= 40 && (o = "building"), {
    key: "breakfast",
    score: l,
    status: o,
    loggedDays: t.length,
    breakfastDays: n.length,
    averageBreakfastCalories: Math.round(Mr(n.map((i) => i.breakfastCalories)))
  };
}
function Bg(e = []) {
  const t = e.filter((i) => i.logged);
  if (t.length === 0)
    return Fi("dinner", "not_enough_data");
  const n = t.filter((i) => i.dinnerShare >= 0.45), r = Mr(t.map((i) => i.dinnerShare)), a = n.length / t.length, l = Math.round((Pd(r / 0.6, 0, 1) * 0.7 + a * 0.3) * 100);
  let o = "balanced";
  return r < 0.3 && n.length === 0 ? o = "light" : (l >= 60 || r >= 0.48) && (o = "heavy"), {
    key: "dinner",
    score: l,
    status: o,
    loggedDays: t.length,
    heavyDays: n.length,
    averageDinnerShare: Math.round(r * 100)
  };
}
function Hg(e = [], t = 0) {
  const n = e.filter((g) => g.logged);
  if (n.length === 0)
    return Fi("protein", "not_enough_data");
  const r = Math.max(0, Ze(t)), a = Math.round(Mr(n.map((g) => g.totalProtein)) * 10) / 10, l = Ld(
    n.map((g) => g.totalProtein),
    0.4
  ), o = r > 0 ? n.filter((g) => g.totalProtein >= r * 0.9).length : 0, i = n.length > 0 ? o / n.length : 0, s = r > 0 ? Math.round((i * 0.6 + l / 100 * 0.4) * 100) : l;
  let u = "inconsistent";
  return n.length < 3 ? u = n.length > 0 ? "building" : "inconsistent" : s >= 70 ? u = "steady" : s >= 45 && (u = "building"), {
    key: "protein",
    score: s,
    status: u,
    loggedDays: n.length,
    targetDays: o,
    averageProtein: a,
    proteinTarget: r
  };
}
function Ug(e = 7) {
  return {
    key: "hydration",
    score: null,
    status: "placeholder",
    available: !1,
    windowSize: e,
    trackedDays: 0
  };
}
function Gg({ dayLogs: e = [], proteinTarget: t = 0 } = {}) {
  const n = Array.isArray(e) ? e.map(jg) : [], r = n.filter((u) => u.logged), a = Wg(n), l = Bg(n), o = Hg(n, t), i = Ug(n.length || 7);
  let s = "start_logging";
  return r.length >= 3 ? a.status === "irregular" ? s = "breakfast_anchor" : l.status === "heavy" ? s = "dinner_balance" : o.status === "inconsistent" ? s = "protein_rhythm" : a.status === "building" || o.status === "building" ? s = "building_consistency" : s = "steady_week" : r.length > 0 && (s = "building_consistency"), {
    windowSize: n.length || 7,
    loggedDays: r.length,
    focus: s,
    breakfast: a,
    dinner: l,
    protein: o,
    hydration: i,
    days: n
  };
}
function Vg(e = Y(), { days: t = 7 } = {}) {
  var s, u;
  const n = e || Y(), r = Math.max(0, Number((s = n == null ? void 0 : n.profile) == null ? void 0 : s.weight) || 0), a = Math.max(0, Number(n == null ? void 0 : n.targetCalories) || 0), l = String((n == null ? void 0 : n.currentGoalType) || ((u = n == null ? void 0 : n.profile) == null ? void 0 : u.goalType) || "lose"), o = Qa(a, {
    weightKg: r,
    goalType: l
  }), i = Gg({
    dayLogs: xd(t),
    proteinTarget: o.protein
  });
  return {
    ...i,
    proteinTarget: o.protein,
    lang: (n == null ? void 0 : n.curLang) || "en",
    hasData: i.loggedDays > 0
  };
}
function Kg(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Ot(e, t = "en", n = "en") {
  if (typeof e == "string") return e;
  if (!Kg(e)) return "";
  const r = String(t || n || "en"), a = r.split("-")[0];
  return String(
    e[r] || e[a] || e[n] || Object.values(e).find(Boolean) || ""
  ).trim();
}
function $d(e) {
  if (Array.isArray(e))
    return e.map((n) => String(n || "").trim()).filter(Boolean);
  const t = String(e || "").trim();
  return t ? [t] : [];
}
function zd(e) {
  return String(Array.isArray(e) ? e[0] : e || "").trim();
}
function bi(e) {
  return ke(e, {
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
function Qg(e = {}) {
  return Object.fromEntries(An.map((t) => {
    const n = Number(e == null ? void 0 : e[t]);
    return [t, Number.isFinite(n) ? n : 0];
  }));
}
function Yg(e, t = 1) {
  const n = Number(t), r = Number.isFinite(n) ? n : 1, a = Nr(e);
  return bi(Object.fromEntries(
    An.map((l) => [l, a[l] * r])
  ));
}
function Xg(e, t = {}) {
  const n = Nr(e), r = Qg(t);
  return bi(Object.fromEntries(
    An.map((a) => [a, n[a] + r[a]])
  ));
}
function qs(e, t) {
  return {
    name: Ot(e == null ? void 0 : e.name, t) || "Item",
    weight: String((e == null ? void 0 : e.weight) || "").trim()
  };
}
function qg(e = {}) {
  const t = Array.isArray(e.options) ? e.options : [];
  if (e.selectionType === "multi")
    return t.filter((a) => a == null ? void 0 : a.default).map((a) => String(a.id || "").trim()).filter(Boolean);
  const r = t.find((a) => a == null ? void 0 : a.default) || t[0];
  return r != null && r.id ? [String(r.id).trim()] : [];
}
function Rd(e, t = {}) {
  const n = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  return Object.fromEntries(n.map((r) => {
    const a = String((r == null ? void 0 : r.id) || "").trim(), l = t == null ? void 0 : t[a], o = qg(r);
    if (r.selectionType === "multi") {
      const s = $d(l);
      return [a, s.length > 0 ? s : o];
    }
    const i = zd(l);
    return [a, i || o[0] || ""];
  }));
}
function Zg(e, t) {
  const n = Array.isArray(e == null ? void 0 : e.options) ? e.options : [];
  if ((e == null ? void 0 : e.selectionType) === "multi") {
    const a = new Set($d(t));
    return n.filter((l) => a.has(String((l == null ? void 0 : l.id) || "").trim()));
  }
  const r = zd(t);
  return n.filter((a) => String((a == null ? void 0 : a.id) || "").trim() === r);
}
function Jg(e = [], t = [], n = "en") {
  return [
    ...Array.isArray(e) ? e.map((r) => qs(r, n)) : [],
    ...Array.isArray(t) ? t.map((r) => qs(r, n)) : []
  ];
}
function eh(e, t = {}) {
  const n = String(t.lang || "en"), r = Rd(e, t.selectedModifiers), a = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  let l = Nr((e == null ? void 0 : e.nutrition) || xp()), o = [];
  const i = [], s = [];
  a.forEach((d) => {
    Zg(d, r[d.id]).forEach((h) => {
      const v = (h == null ? void 0 : h.effect) || {};
      v.nutritionMultiplier !== void 0 && (l = Yg(l, v.nutritionMultiplier)), v.nutritionDelta && (l = Xg(l, v.nutritionDelta));
      const y = Array.isArray(v.items) ? v.items : v.item ? [v.item] : [];
      y.length > 0 && (o = [...o, ...y]);
      const b = Ot(h == null ? void 0 : h.label, n) || (h == null ? void 0 : h.id) || "";
      i.push({
        groupId: String((d == null ? void 0 : d.id) || "").trim(),
        optionId: String((h == null ? void 0 : h.id) || "").trim(),
        label: b,
        selectionType: (d == null ? void 0 : d.selectionType) === "multi" ? "multi" : "single"
      }), h != null && h.includeInName && s.push(Ot((h == null ? void 0 : h.nameLabel) || (h == null ? void 0 : h.label), n));
    });
  });
  const u = Ot(e == null ? void 0 : e.name, n) || "Preset Meal", g = s.filter(Boolean).join(", ");
  return {
    id: String((e == null ? void 0 : e.id) || "").trim(),
    region: String((e == null ? void 0 : e.region) || "").trim(),
    name: g ? `${u} (${g})` : u,
    suggestedMealType: String((e == null ? void 0 : e.suggestedMealType) || "snack"),
    nutrition: bi(l),
    items: Jg(e == null ? void 0 : e.items, o, n),
    appliedModifiers: i,
    selectedModifiers: r
  };
}
function th(e, t = "en") {
  return Ot(e == null ? void 0 : e.name, t) || String((e == null ? void 0 : e.id) || "Preset Meal");
}
function nh(e, t = "en") {
  return Ot(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Modifier");
}
function rh(e, t = "en") {
  return Ot(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Option");
}
function ah(e = "zh-TW") {
  return String(e || "zh-TW").toLowerCase().startsWith("en") ? "singapore" : "taiwan";
}
const Pi = Object.freeze([
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
function lh(e = {}) {
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
function Od(e = {}) {
  return {
    ...e,
    nutrition: { ...e.nutrition || {} },
    items: Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [],
    modifierGroups: Array.isArray(e.modifierGroups) ? e.modifierGroups.map((t) => ({
      ...t,
      options: Array.isArray(t.options) ? t.options.map(lh) : []
    })) : []
  };
}
function oh() {
  return Pi.map(Od);
}
function ih(e) {
  const t = String(e || "").trim(), n = Pi.find((r) => r.id === t);
  return n ? Od(n) : null;
}
function sh() {
  return [...new Set(Pi.map((e) => String(e.region || "").trim()).filter(Boolean))];
}
const uh = Object.freeze({
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
function ch(e = "en") {
  return String(e || "en").split("-")[0];
}
function dh(e, t = "en") {
  const n = uh[e] || {};
  return n[t] || n[ch(t)] || n.en || e;
}
function fh(e = "zh-TW") {
  return ah(e);
}
function mh(e = "en") {
  return sh().map((t) => ({
    id: t,
    label: dh(t, e)
  }));
}
function ph(e = "", t = "en") {
  const n = String(e || "").trim();
  return oh().filter((r) => !n || r.region === n).map((r) => ({
    id: r.id,
    region: r.region,
    label: th(r, t),
    suggestedMealType: r.suggestedMealType
  }));
}
function gh({
  lang: e = "en",
  region: t = "",
  profileRegion: n = "",
  presetId: r = "",
  selectedModifiers: a = {}
} = {}) {
  var d;
  const l = t || String(n || "").trim() || fh(e), o = ph(l, e), i = r && o.some((f) => f.id === r) ? r : ((d = o[0]) == null ? void 0 : d.id) || "", s = ih(i), u = s ? Rd(s, a) : {}, g = s ? eh(s, {
    lang: e,
    selectedModifiers: u
  }) : null;
  return {
    regions: mh(e),
    selectedRegion: l,
    presets: o,
    selectedPresetId: i,
    modifierGroups: Array.isArray(s == null ? void 0 : s.modifierGroups) ? s.modifierGroups.map((f) => ({
      id: f.id,
      label: nh(f, e),
      selectionType: f.selectionType === "multi" ? "multi" : "single",
      selectedValue: u[f.id] ?? (f.selectionType === "multi" ? [] : ""),
      options: (f.options || []).map((h) => ({
        id: h.id,
        label: rh(h, e),
        selected: f.selectionType === "multi" ? (u[f.id] || []).includes(h.id) : u[f.id] === h.id
      }))
    })) : [],
    resolvedPreset: g
  };
}
const Al = [
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
], hh = Object.freeze([
  "petInteractMsg1",
  "petInteractMsg2",
  "petInteractMsg3",
  "petInteractMsg4",
  "petInteractMsg5"
]);
function Te(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function nr(e, t = 0, n = 100) {
  return Math.min(Math.max(e, t), n);
}
function jd(e = {}) {
  const t = Math.max(0, Math.round(Te(e == null ? void 0 : e.xp))), n = Math.floor(t / 100) + 1;
  return {
    level: Math.max(1, Math.round(Te(e == null ? void 0 : e.level, n)) || n),
    xp: t,
    mood: String((e == null ? void 0 : e.mood) || "hungry"),
    energy: nr(Math.round(Te(e == null ? void 0 : e.energy))),
    bond: nr(Math.round(Te(e == null ? void 0 : e.bond))),
    streak: Math.max(0, Math.round(Te(e == null ? void 0 : e.streak)))
  };
}
function yh(e = []) {
  var n;
  if (!Array.isArray(e) || e.length === 0) return 0;
  let t = 0;
  for (let r = e.length - 1; r >= 0 && !(Te((n = e[r]) == null ? void 0 : n.calories) <= 0); r -= 1)
    t += 1;
  return t;
}
function vh({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0
} = {}) {
  const l = Math.max(0, Te(e)), o = Math.max(0, Te(t)), i = o > 0 ? Math.min(l / o, 1.4) : 0, s = Math.max(0, Math.round(Te(n))), u = Math.max(0, Math.round(Te(r))), g = nr(Math.round(Te(a))), d = nr(Math.round(i * 90) + Math.min(s, 5) * 2), f = Math.round(Math.min(i, 1.1) * 80) + Math.min(s, 5) * 10 + Math.min(u, 7) * 5, h = Math.floor(f / 100) + 1, v = nr(g + Math.min(u, 7) * 5 + Math.min(s, 5) * 3);
  return jd({
    level: h,
    xp: f,
    mood: "hungry",
    energy: d,
    bond: v,
    streak: u
  });
}
function Sh({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0
} = {}) {
  const l = Math.max(0, Te(e)), o = Math.max(0, Te(t, 2e3)) || 2e3, i = Math.min(l / o, 1.4), s = Al.find((g) => i >= g.minRatio) || Al[Al.length - 1], u = vh({
    totalCalories: l,
    targetCalories: o,
    loggedMeals: n,
    streak: r,
    bond: a
  });
  return {
    key: s.key,
    ratio: i,
    frameKey: s.frameKey,
    messageKey: s.messageKey,
    mood: s.mood,
    progress: jd({
      ...u,
      mood: s.mood
    })
  };
}
function kh(e = Y()) {
  var u;
  const t = Ya((e == null ? void 0 : e.foodItems) || []), n = Cd(7), r = Number(e == null ? void 0 : e.targetCalories) || 0, a = Math.max(0, Number((u = e == null ? void 0 : e.profile) == null ? void 0 : u.weight) || 0), l = (e == null ? void 0 : e.currentGoalType) || "lose", o = tg({
    total: t.totals,
    targetCalories: r,
    calorieHistory: n,
    goalType: l,
    weightKg: a
  }), i = yh(n), s = Sh({
    totalCalories: t.totals.cal,
    targetCalories: r,
    loggedMeals: Array.isArray(e == null ? void 0 : e.foodItems) ? e.foodItems.length : 0,
    streak: i
  });
  return {
    totals: t.totals,
    coach: o,
    calorieHistory: n,
    statusKey: s.key,
    frameKey: s.frameKey,
    messageKey: s.messageKey,
    progress: s.progress,
    interactionMessageKeys: hh
  };
}
const wh = Object.freeze([
  "calories",
  "protein",
  "carbohydrate",
  "fat"
]), Th = Object.freeze([
  Object.freeze({
    id: "quality",
    fields: Object.freeze(["fiber", "sugar", "sodium"])
  }),
  Object.freeze({
    id: "fatDetails",
    fields: Object.freeze(["saturatedFat", "transFat"])
  })
]), _h = Object.freeze({
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
function ft(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Zs(e, t) {
  const n = t[e] ?? 0, r = e === "calories" || e === "sodium" ? Math.round(Number(n) || 0) : ft(n);
  return {
    field: e,
    value: r,
    unit: _h[e] || ""
  };
}
function Ch(e = []) {
  const t = Array.isArray(e) ? e : [];
  if (t.length === 0)
    return ke();
  const n = t.reduce((r, a) => {
    const l = ke(a);
    return Object.keys(r).forEach((o) => {
      r[o] += Number(l[o]) || 0;
    }), r;
  }, ke());
  return Object.fromEntries(
    Object.keys(n).map((r) => {
      const a = n[r] / t.length;
      return [r, r === "calories" || r === "sodium" ? Math.round(a) : ft(a)];
    })
  );
}
function Wd(e = {}) {
  const t = ke(e);
  return {
    nutrition: t,
    highlights: wh.map((n) => Zs(n, t)),
    sections: Th.map((n) => ({
      id: n.id,
      items: n.fields.map((r) => Zs(r, t))
    }))
  };
}
function xh({
  todayNutrition: e = {},
  nutritionHistory: t = [],
  proteinTarget: n = 0,
  fiberTarget: r = 25,
  sodiumLimit: a = 2300
} = {}) {
  const l = ke(e), o = (Array.isArray(t) ? t : []).map((f) => ke(f)).filter((f) => Object.values(f).some((h) => Number(h) > 0)), i = Ch(o), s = Math.max(0, ft(n)), u = Math.max(0, ft(r)), g = Math.max(0, Math.round(Number(a) || 0));
  let d = "balanced";
  return o.length === 0 && l.calories <= 0 ? d = "start_logging" : s > 0 && l.protein < s * 0.72 ? d = "protein" : l.fiber < Math.max(u * 0.72, 12) ? d = "fiber" : g > 0 && l.sodium > g && (d = "sodium"), {
    focusKey: d,
    loggedDays: o.length,
    averageNutrition: i,
    proteinTarget: s,
    fiberTarget: u,
    sodiumLimit: g,
    signals: [
      {
        key: "protein",
        current: ft(l.protein),
        target: s,
        average: ft(i.protein)
      },
      {
        key: "fiber",
        current: ft(l.fiber),
        target: u,
        average: ft(i.fiber)
      },
      {
        key: "sodium",
        current: Math.round(l.sodium),
        target: g,
        average: Math.round(i.sodium)
      }
    ]
  };
}
function It(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Li(e = {}) {
  return Nr({
    calories: Math.round(Number(e.cal) || 0),
    protein: It(e.pro),
    fat: It(e.fat),
    carbohydrate: It(e.carb),
    sugar: It(e.sugar),
    sodium: Math.round(Number(e.sod) || 0),
    saturatedFat: It(e.sat),
    transFat: It(e.trans),
    fiber: It(e.fiber)
  });
}
function Nh(e = 7) {
  return xd(e).map((t) => {
    const n = Ya((t == null ? void 0 : t.items) || []);
    return Li(n.totals);
  }).filter((t) => Object.values(t).some((n) => Number(n) > 0));
}
function Eh(e = Y()) {
  const t = Mi(e), n = Li(t.totals), r = Number(t.targetCalories) || 0;
  return {
    nutrition: n,
    detail: Wd(n),
    targetCalories: r,
    remainingCalories: r > 0 ? Math.round(r - n.calories) : 0,
    waterTarget: Number(t.waterTarget) || 0
  };
}
function Mh(e = Y(), { days: t = 7 } = {}) {
  var i, s;
  const n = e || Y(), r = Mi(n), a = Li(r.totals), l = Math.max(0, Number((i = n == null ? void 0 : n.profile) == null ? void 0 : i.weight) || 0), o = Qa(r.targetCalories, {
    weightKg: l,
    goalType: (n == null ? void 0 : n.currentGoalType) || ((s = n == null ? void 0 : n.profile) == null ? void 0 : s.goalType) || "lose"
  });
  return {
    days: t,
    nutrition: a,
    ...xh({
      todayNutrition: a,
      nutritionHistory: Nh(t),
      proteinTarget: o.protein,
      fiberTarget: 25,
      sodiumLimit: 2300
    })
  };
}
function Js(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Ah(e, t) {
  const n = Jp(String((e == null ? void 0 : e.currentMealMode) || "4"), {}, Number(e == null ? void 0 : e.targetCalories) || 0), r = n.map((i) => i.type), a = new Set(
    ((t == null ? void 0 : t.foodItems) || []).map((i) => i == null ? void 0 : i.type).filter(Boolean)
  ), l = r.filter((i) => a.has(i)).length, o = n.find((i) => !a.has(i.type)) || null;
  return {
    plannedMealTypes: r,
    loggedMealTypes: [...a],
    loggedMeals: l,
    plannedMeals: n.length,
    nextMealType: (o == null ? void 0 : o.type) || "",
    nextMealTitleKey: (o == null ? void 0 : o.titleKey) || ""
  };
}
function Dh(e = Y()) {
  var v, y, b, m, c, p, S, T;
  const t = e || Y(), n = Mi(t), r = kh(t), a = Vg(t, { days: 7 }), l = Math.max(0, Number((v = t == null ? void 0 : t.profile) == null ? void 0 : v.weight) || 0), o = Qa(n.targetCalories, {
    weightKg: l,
    goalType: (t == null ? void 0 : t.currentGoalType) || ((y = t == null ? void 0 : t.profile) == null ? void 0 : y.goalType) || "lose"
  }), i = Math.max(0, Number(o.protein) || 0), s = Js(n.totals.pro, 1), u = Math.max(0, Js(i - s, 1)), g = Ah(t, n), d = Math.round(Math.max(0, (n.targetCalories || 0) - (n.totals.cal || 0))), f = gh({
    lang: (t == null ? void 0 : t.curLang) || "en",
    profileRegion: ((b = t == null ? void 0 : t.profile) == null ? void 0 : b.region) || ""
  }), h = (f.regions || []).find((N) => N.id === f.selectedRegion);
  return {
    lang: (t == null ? void 0 : t.curLang) || "en",
    goalType: (t == null ? void 0 : t.currentGoalType) || ((m = t == null ? void 0 : t.profile) == null ? void 0 : m.goalType) || "lose",
    diningOutFrequency: String(((c = t == null ? void 0 : t.profile) == null ? void 0 : c.diningOutFrequency) || "sometimes"),
    targetCalories: n.targetCalories,
    remainingCalories: d,
    calorieProgressPercent: n.targetCalories > 0 ? Math.min(Math.round(n.totals.cal / n.targetCalories * 100), 199) : 0,
    presetRegion: f.selectedRegion,
    presetRegionLabel: (h == null ? void 0 : h.label) || f.selectedRegion || "",
    presetCount: ((p = f.presets) == null ? void 0 : p.length) || 0,
    featuredPresetName: ((T = (S = f.presets) == null ? void 0 : S[0]) == null ? void 0 : T.label) || "",
    proteinTarget: i,
    proteinCurrent: s,
    proteinRemaining: u,
    mealCoverage: g,
    daily: n,
    pet: r,
    rhythm: a
  };
}
const Ih = ["breakfast", "lunch", "dinner", "snack"];
function z(e, t = "") {
  return e == null ? t : String(e);
}
function Mo(e, t) {
  var r;
  const n = Fn(t);
  return ((r = n == null ? void 0 : n.meals) == null ? void 0 : r[e]) || e || "";
}
function Fh(e, t, n) {
  const r = Di(t), l = Ih.map((o) => {
    const i = e.filter((u) => u.mealType === o), s = i.reduce((u, g) => u + g.calories, 0);
    return {
      key: o,
      label: Mo(o, t),
      totalCalories: s,
      metaText: i.length > 0 ? r.mealGroupMeta(i.length, s) : n,
      items: i,
      emptyText: n
    };
  }).filter((o) => o.items.length > 0);
  return l.length > 0 ? l : [];
}
function bh(e) {
  var u, g, d, f, h, v, y, b, m, c, p, S, T, N, E, _, W, F, pe, it, st, bn, Ar, Kt, Qt, C, A, D, B, X, Dt, He;
  const t = Dh(e), n = Fn(t.lang), r = zg(t, t.lang), a = Di(t.lang), l = ((u = r.hero) == null ? void 0 : u.stats) || [], o = ((g = r.hero) == null ? void 0 : g.meta) || [], i = (((d = t.daily) == null ? void 0 : d.foodItems) || []).map((M, Ye) => {
    const Le = (M == null ? void 0 : M.nutri) || (M == null ? void 0 : M.nutrition) || {}, qa = Number((Le == null ? void 0 : Le.calories) ?? (Le == null ? void 0 : Le.cal) ?? 0) || 0, Za = String((M == null ? void 0 : M.type) || "snack");
    return {
      id: `${Za}-${Ye}-${String((M == null ? void 0 : M.name) || "meal")}`.replace(/\s+/g, "-").toLowerCase(),
      name: z((M == null ? void 0 : M.name) || (M == null ? void 0 : M.foodName), ""),
      mealType: Za,
      mealTypeLabel: Mo(Za, t.lang),
      calories: qa,
      portion: z((M == null ? void 0 : M.weight) || (M == null ? void 0 : M.portion) || "", ""),
      hint: qa > 0 ? `${Math.round(qa)} kcal` : (n == null ? void 0 : n.txtNoData) || ""
    };
  }).filter((M) => M.name || M.calories > 0), s = Fh(i, t.lang, a.emptyMeal);
  return {
    companion: {
      ...t,
      pet: {
        ...t.pet,
        resolvedMessage: z(n == null ? void 0 : n[(f = t.pet) == null ? void 0 : f.messageKey], "") || z((h = t.pet) == null ? void 0 : h.messageKey, "")
      }
    },
    copy: a,
    hero: {
      eyebrow: z((v = r.hero) == null ? void 0 : v.eyebrow, ""),
      title: z((y = r.hero) == null ? void 0 : y.title, ""),
      summary: z((b = r.hero) == null ? void 0 : b.summary, ""),
      stats: l.map((M) => ({
        label: z(M == null ? void 0 : M.label, ""),
        value: z(M == null ? void 0 : M.value, "")
      })),
      meta: o.map((M) => z(M, "")).filter(Boolean),
      actions: {
        log: z((c = (m = r.hero) == null ? void 0 : m.actions) == null ? void 0 : c.log, "Log meal"),
        ai: z((S = (p = r.hero) == null ? void 0 : p.actions) == null ? void 0 : S.ai, "AI Analysis"),
        favorites: z((N = (T = r.hero) == null ? void 0 : T.actions) == null ? void 0 : N.favorites, "Favorites")
      }
    },
    quickLog: {
      title: z((E = r.logHub) == null ? void 0 : E.title, ""),
      summary: z((_ = r.logHub) == null ? void 0 : _.summary, ""),
      favoritesCopy: z((W = r.logHub) == null ? void 0 : W.favoritesCopy, ""),
      todayMealsKicker: z((F = r.logHub) == null ? void 0 : F.todayMealsKicker, a.today),
      todayMealsTitle: z((pe = r.logHub) == null ? void 0 : pe.todayMealsTitle, a.today),
      todayMealsHint: z((it = r.logHub) == null ? void 0 : it.todayMealsHint, "")
    },
    overview: {
      title: z((st = r.overview) == null ? void 0 : st.title, ""),
      hint: z((bn = r.overview) == null ? void 0 : bn.hint, ""),
      signals: (((Ar = r.overview) == null ? void 0 : Ar.signals) || []).map((M) => ({
        label: z(M == null ? void 0 : M.label, ""),
        value: z(M == null ? void 0 : M.value, "--"),
        detail: z(M == null ? void 0 : M.detail, "")
      }))
    },
    todayMeals: {
      title: z((Kt = r.logHub) == null ? void 0 : Kt.todayMealsTitle, a.today),
      hint: z((Qt = r.logHub) == null ? void 0 : Qt.todayMealsHint, ""),
      kicker: z((C = r.logHub) == null ? void 0 : C.todayMealsKicker, a.today),
      dateLabel: Ii(e.selectedDate, t.lang),
      count: i.length,
      groups: s
    },
    today: {
      calories: Number((D = (A = t.daily) == null ? void 0 : A.totals) == null ? void 0 : D.cal) || 0,
      targetCalories: Number(t.targetCalories) || 0,
      remainingCalories: Number(t.remainingCalories) || 0,
      calorieProgressPercent: Number(t.calorieProgressPercent) || 0,
      proteinCurrent: Number(t.proteinCurrent) || 0,
      proteinTarget: Number(t.proteinTarget) || 0,
      proteinRemaining: Number(t.proteinRemaining) || 0,
      loggedMeals: Number((B = t.mealCoverage) == null ? void 0 : B.loggedMeals) || 0,
      plannedMeals: Number((X = t.mealCoverage) == null ? void 0 : X.plannedMeals) || 0,
      nextMealType: Mo((Dt = t.mealCoverage) == null ? void 0 : Dt.nextMealType, t.lang),
      nextMealTitleKey: z((He = t.mealCoverage) == null ? void 0 : He.nextMealTitleKey, "")
    }
  };
}
function Ph() {
  const e = Id();
  return bh(e);
}
function Xt() {
}
const eu = Object.freeze({
  hungry: "dog_animation/dog_sad.gif",
  low: "dog_animation/dog_idle.gif",
  mid: "dog_animation/dog_walk.gif",
  balanced: "dog_animation/dog_happy.gif",
  full: "dog_animation/dog_fat.gif",
  eating: "dog_animation/dog_eat.gif"
});
function Lh(e = "low") {
  return eu[e] || eu.low;
}
function tu({ label: e, value: t, detail: n }) {
  return /* @__PURE__ */ w.jsxs("div", { className: "woof-home__metric-card", children: [
    /* @__PURE__ */ w.jsx("div", { className: "woof-home__metric-value", children: t }),
    /* @__PURE__ */ w.jsx("div", { className: "woof-home__metric-label", children: e }),
    n ? /* @__PURE__ */ w.jsx("div", { className: "woof-home__metric-detail", children: n }) : null
  ] });
}
function $h({ label: e, value: t, detail: n }) {
  return /* @__PURE__ */ w.jsxs("div", { className: "woof-home__insight-card", children: [
    /* @__PURE__ */ w.jsx("div", { className: "woof-home__insight-label", children: e }),
    /* @__PURE__ */ w.jsx("div", { className: "woof-home__insight-value", children: t }),
    n ? /* @__PURE__ */ w.jsx("div", { className: "woof-home__insight-detail", children: n }) : null
  ] });
}
function zh({ name: e, calories: t, portion: n }) {
  return /* @__PURE__ */ w.jsxs("div", { className: "woof-home__meal-row", children: [
    /* @__PURE__ */ w.jsxs("div", { className: "woof-home__meal-row-main", children: [
      /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-name", children: e }),
      n ? /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-portion", children: n }) : null
    ] }),
    /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-calories", children: t > 0 ? `${Math.round(t)} kcal` : "--" })
  ] });
}
function Rh({ group: e }) {
  const t = e.items || [], n = t.length > 0, r = e.metaText || e.emptyText;
  return /* @__PURE__ */ w.jsxs("div", { className: "woof-home__meal-group", children: [
    /* @__PURE__ */ w.jsxs("div", { className: "woof-home__meal-group-header", children: [
      /* @__PURE__ */ w.jsxs("div", { children: [
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-type", children: e.label }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-group-meta", children: r })
      ] }),
      n ? /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-group-total", children: e.totalCalories > 0 ? `${Math.round(e.totalCalories)} kcal` : "--" }) : null
    ] }),
    n ? /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-list", children: t.map((a) => /* @__PURE__ */ w.jsx(
      zh,
      {
        name: a.name,
        calories: a.calories,
        portion: a.portion
      },
      a.id
    )) }) : /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-group-empty", children: e.emptyText })
  ] });
}
function nu({ eyebrow: e, title: t, hint: n, action: r, onAction: a }) {
  return /* @__PURE__ */ w.jsxs("div", { className: "woof-home__section-header", children: [
    /* @__PURE__ */ w.jsxs("div", { className: "woof-home__section-copy", children: [
      e ? /* @__PURE__ */ w.jsx("div", { className: "woof-home__eyebrow", children: e }) : null,
      /* @__PURE__ */ w.jsx("h2", { className: "woof-home__section-title", children: t }),
      n ? /* @__PURE__ */ w.jsx("p", { className: "woof-home__section-hint", children: n }) : null
    ] }),
    r ? /* @__PURE__ */ w.jsx("button", { type: "button", className: "woof-home__ghost-button", onClick: a, children: r }) : null
  ] });
}
function Dl({ label: e, hint: t, onClick: n, variant: r = "secondary" }) {
  return /* @__PURE__ */ w.jsxs(
    "button",
    {
      type: "button",
      className: `woof-home__action-button woof-home__action-button--${r}`,
      onClick: n,
      children: [
        /* @__PURE__ */ w.jsx("span", { className: "woof-home__action-label", children: e }),
        t ? /* @__PURE__ */ w.jsx("span", { className: "woof-home__action-hint", children: t }) : null
      ]
    }
  );
}
function Oh({
  onQuickLog: e = Xt,
  onOpenAI: t = Xt,
  onOpenFavorites: n = Xt,
  onOpenTodayMeals: r = Xt,
  onOpenRhythm: a = Xt,
  onOpenDailySummary: l = Xt
}) {
  var m, c, p, S, T, N, E;
  const o = Ph(), { copy: i, hero: s, quickLog: u, overview: g, todayMeals: d, today: f, companion: h } = o, v = g.signals || [], y = d.groups || [], b = d.count > 0;
  return /* @__PURE__ */ w.jsxs("main", { className: "woof-home", "data-surface": "home", children: [
    /* @__PURE__ */ w.jsxs("section", { className: "woof-home__hero", children: [
      /* @__PURE__ */ w.jsxs("aside", { className: "woof-home__hero-companion", "aria-label": i.pet, children: [
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__hero-companion-chip", children: i.pet }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__pet-stage", children: /* @__PURE__ */ w.jsx(
          "img",
          {
            className: "woof-home__pet-image",
            src: Lh((m = h.pet) == null ? void 0 : m.frameKey),
            alt: "",
            loading: "eager",
            decoding: "async"
          }
        ) }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__pet-level", children: `Lv.${((p = (c = h.pet) == null ? void 0 : c.progress) == null ? void 0 : p.level) || 1}` }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__pet-status", children: ((S = h.pet) == null ? void 0 : S.resolvedMessage) || ((T = h.pet) == null ? void 0 : T.messageKey) || "" }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__pet-progress", "aria-hidden": "true", children: /* @__PURE__ */ w.jsx(
          "div",
          {
            className: "woof-home__pet-progress-fill",
            style: { width: `${Math.min(((E = (N = h.pet) == null ? void 0 : N.progress) == null ? void 0 : E.xp) || 0, 100)}%` }
          }
        ) }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__pet-progress-label", children: i.progress }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__hero-meta", children: s.meta.map((_) => /* @__PURE__ */ w.jsx("span", { className: "woof-home__hero-meta-item", children: _ }, _)) })
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: "woof-home__hero-spotlight", "aria-hidden": "true" }),
      /* @__PURE__ */ w.jsxs("div", { className: "woof-home__hero-copy", children: [
        s.eyebrow ? /* @__PURE__ */ w.jsx("div", { className: "woof-home__hero-eyebrow", children: s.eyebrow }) : null,
        /* @__PURE__ */ w.jsx("h1", { className: "woof-home__hero-title", children: s.title }),
        /* @__PURE__ */ w.jsx("p", { className: "woof-home__hero-summary", children: s.summary }),
        /* @__PURE__ */ w.jsxs("div", { className: "woof-home__hero-actions", children: [
          /* @__PURE__ */ w.jsx(
            Dl,
            {
              label: s.actions.log,
              hint: "",
              onClick: e,
              variant: "primary"
            }
          ),
          /* @__PURE__ */ w.jsx(
            Dl,
            {
              label: s.actions.ai,
              hint: "",
              onClick: t
            }
          ),
          /* @__PURE__ */ w.jsx(
            Dl,
            {
              label: s.actions.favorites,
              hint: "",
              onClick: n
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ w.jsxs("section", { className: "woof-home__today", "aria-label": i.today, children: [
      /* @__PURE__ */ w.jsx(
        nu,
        {
          eyebrow: i.today,
          title: i.today,
          hint: d.dateLabel || u.summary,
          action: i.open,
          onAction: l
        }
      ),
      /* @__PURE__ */ w.jsxs("div", { className: "woof-home__metric-grid", children: [
        /* @__PURE__ */ w.jsx(
          tu,
          {
            label: i.metrics.calories,
            value: `${f.calories} / ${f.targetCalories}`,
            detail: f.targetCalories > 0 ? i.caloriesRemaining(f.remainingCalories) : "--"
          }
        ),
        /* @__PURE__ */ w.jsx(
          tu,
          {
            label: i.metrics.protein,
            value: `${f.proteinCurrent} / ${f.proteinTarget} g`,
            detail: f.proteinRemaining > 0 ? i.proteinRemaining(f.proteinRemaining) : i.proteinOnTrack
          }
        )
      ] }),
      /* @__PURE__ */ w.jsx("div", { className: "woof-home__summary-bar", "aria-hidden": "true", children: /* @__PURE__ */ w.jsx(
        "div",
        {
          className: "woof-home__summary-bar-fill",
          style: { width: `${Math.min(f.calorieProgressPercent, 100)}%` }
        }
      ) }),
      b ? /* @__PURE__ */ w.jsxs("div", { className: "woof-home__today-meals", children: [
        /* @__PURE__ */ w.jsxs("div", { className: "woof-home__today-meals-header", children: [
          /* @__PURE__ */ w.jsxs("div", { children: [
            /* @__PURE__ */ w.jsx("div", { className: "woof-home__eyebrow", children: d.kicker }),
            /* @__PURE__ */ w.jsx("div", { className: "woof-home__today-meals-title", children: d.title })
          ] }),
          /* @__PURE__ */ w.jsx("button", { type: "button", className: "woof-home__ghost-button woof-home__ghost-button--small", onClick: r, children: i.changeDate })
        ] }),
        /* @__PURE__ */ w.jsx("p", { className: "woof-home__today-meals-hint", children: d.hint }),
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__meal-group-list", children: y.map((_) => /* @__PURE__ */ w.jsx(Rh, { group: _ }, _.key)) })
      ] }) : /* @__PURE__ */ w.jsxs("div", { className: "woof-home__empty-state woof-home__today-empty", children: [
        /* @__PURE__ */ w.jsx("div", { className: "woof-home__empty-title", children: i.companion }),
        /* @__PURE__ */ w.jsx("p", { className: "woof-home__empty-copy", children: d.hint || u.summary })
      ] })
    ] }),
    /* @__PURE__ */ w.jsxs("section", { className: "woof-home__overview", "aria-label": i.overview, children: [
      /* @__PURE__ */ w.jsx(
        nu,
        {
          eyebrow: i.overview,
          title: g.title,
          hint: g.hint,
          action: i.open,
          onAction: a
        }
      ),
      /* @__PURE__ */ w.jsx("div", { className: "woof-home__signal-grid", children: v.map((_) => /* @__PURE__ */ w.jsx(
        $h,
        {
          label: _.label,
          value: _.value,
          detail: _.detail
        },
        _.label
      )) })
    ] })
  ] });
}
function qt() {
}
function jh({
  onQuickLog: e = qt,
  onOpenAI: t = qt,
  onOpenFavorites: n = qt,
  onOpenTodayMeals: r = qt,
  onOpenRhythm: a = qt,
  onOpenDailySummary: l = qt
}) {
  return /* @__PURE__ */ w.jsx(
    Oh,
    {
      onQuickLog: e,
      onOpenAI: t,
      onOpenFavorites: n,
      onOpenTodayMeals: r,
      onOpenRhythm: a,
      onOpenDailySummary: l
    }
  );
}
function Il(e, t = "") {
  return e == null ? t : String(e);
}
function Wh(e, t = "--") {
  return e == null || e === "" ? t : String(e);
}
function Bd(e, t) {
  const n = Fn(t);
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
function Hd(e, t) {
  var n;
  return (((n = e.detail) == null ? void 0 : n.highlights) || []).map((r) => ({
    field: r.field,
    label: Bd(r.field, t),
    value: r.value,
    unit: r.unit
  }));
}
function Ud(e, t, n) {
  var r;
  return (((r = e.detail) == null ? void 0 : r.sections) || []).map((a) => {
    var l, o, i, s;
    return {
      id: a.id,
      title: ((o = (l = n.sections) == null ? void 0 : l[a.id]) == null ? void 0 : o.title) || a.id,
      summary: ((s = (i = n.sections) == null ? void 0 : i[a.id]) == null ? void 0 : s.summary) || "",
      items: (a.items || []).map((u) => ({
        field: u.field,
        label: Bd(u.field, t),
        value: u.value,
        unit: u.unit
      }))
    };
  });
}
function Bh(e) {
  var i, s, u, g;
  const t = e.curLang || "en", n = Xa(t).detail, r = Fn(t), a = Eh(e), l = Mh(e, { days: 7 }), o = Rg(l, t);
  return {
    kind: "daily-summary",
    lang: t,
    title: n.overviewTitle || "Nutrition details",
    subtitle: Ii(e.selectedDate, t),
    summary: n.overviewSummary || "",
    closeLabel: r.close || "Close",
    detailTitle: ((s = (i = n.sections) == null ? void 0 : i.quality) == null ? void 0 : s.title) || "Core nutrition",
    detailSummary: ((g = (u = n.sections) == null ? void 0 : u.quality) == null ? void 0 : g.summary) || "A clearer look at calories, macros, and nutrient quality.",
    detail: a,
    focus: l,
    summaryCards: [
      {
        label: r.goal || "Goal",
        value: a.targetCalories > 0 ? `${a.targetCalories} kcal` : "--"
      },
      {
        label: n.remainingLabel || "Remaining",
        value: a.targetCalories > 0 ? `${a.remainingCalories} kcal` : "--"
      },
      {
        label: r.water || "Water",
        value: a.waterTarget > 0 ? `${a.waterTarget} ml` : "--"
      }
    ],
    detailCards: Hd(a, t),
    sectionCards: Ud(a, t, n),
    focusContent: o,
    focusSignals: (l.signals || []).map((d) => ({
      key: Il(d == null ? void 0 : d.key, ""),
      label: Il(d == null ? void 0 : d.label, ""),
      value: Wh(d == null ? void 0 : d.value),
      detail: Il(d == null ? void 0 : d.detail, "")
    }))
  };
}
function Hh(e = {}, t = Y()) {
  var g, d, f, h, v;
  const n = t.curLang || "en", r = Xa(n).detail, a = Fn(n), l = (e == null ? void 0 : e.nutri) || (e == null ? void 0 : e.nutrition) || e || {}, o = Uh(l, n), i = e != null && e.type ? ((g = a.meals) == null ? void 0 : g[e.type]) || e.type : "", s = Number(e == null ? void 0 : e.healthScore) > 0 ? `${Math.round(Number(e.healthScore))}/10` : "--", u = Array.isArray(e == null ? void 0 : e.items) ? e.items.length : 0;
  return {
    kind: "item-detail",
    lang: n,
    title: (e == null ? void 0 : e.name) || r.itemTitle || "Meal details",
    subtitle: i || Ii(t.selectedDate, n),
    summary: r.itemSummary || "A quicker look at this meal before you decide what to do next.",
    closeLabel: a.close || "Close",
    detailTitle: ((f = (d = r.sections) == null ? void 0 : d.quality) == null ? void 0 : f.title) || "Core nutrition",
    detailSummary: r.itemDetailSummary || "A clearer look at calories, macros, and nutrient quality.",
    detail: o,
    summaryCards: [
      {
        label: a.cal || "Calories",
        value: ((h = o.nutrition) == null ? void 0 : h.calories) > 0 ? `${o.nutrition.calories} kcal` : "--"
      },
      {
        label: a.pro || "Protein",
        value: ((v = o.nutrition) == null ? void 0 : v.protein) > 0 ? `${o.nutrition.protein} g` : "--"
      },
      {
        label: a.healthScoreLabel || "Health Score",
        value: s !== "--" ? s : u > 0 ? `${u} items` : "--"
      }
    ],
    detailCards: o.detailCards,
    sectionCards: o.sectionCards,
    focusContent: null,
    focusSignals: []
  };
}
function Uh(e = {}, t) {
  const n = Wd(e), r = Xa(t).detail;
  return {
    nutrition: n.nutrition,
    detailCards: Hd({ detail: n }, t),
    sectionCards: Ud({ detail: n }, t, r)
  };
}
function Gh(e = Y(), t = { kind: "daily-summary" }) {
  const n = e || Y();
  return ((t == null ? void 0 : t.kind) || "daily-summary") === "item-detail" ? Hh((t == null ? void 0 : t.item) || {}, n) : Bh(n);
}
function Vh() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofDetailSurfaceBridge) || {
    getState: () => null,
    subscribe: () => () => {
    }
  };
}
function Kh() {
  const e = Id(), t = Vh(), n = wr.useSyncExternalStore(t.subscribe, t.getState, t.getState);
  return !n || !n.kind ? null : Gh(e, n);
}
const I = bo.createElement;
function ru() {
}
function Qh({ label: e, value: t }) {
  return I(
    "div",
    { className: "woof-detail__summary-card" },
    I("div", { className: "woof-detail__summary-value" }, t),
    I("div", { className: "woof-detail__summary-label" }, e)
  );
}
function Gd({ label: e, value: t, unit: n }) {
  return I(
    "div",
    { className: "woof-detail__metric-chip" },
    I(
      "div",
      { className: "woof-detail__metric-value" },
      t,
      n ? I("span", { className: "woof-detail__metric-unit" }, n) : null
    ),
    I("div", { className: "woof-detail__metric-label" }, e)
  );
}
function Yh({ title: e, summary: t, items: n }) {
  const r = Array.isArray(n) && n.length > 0;
  return I(
    "article",
    { className: "woof-detail__section" },
    I(
      "div",
      { className: "woof-detail__section-copy" },
      I("h3", { className: "woof-detail__section-title" }, e),
      t ? I("p", { className: "woof-detail__section-summary" }, t) : null
    ),
    r ? I(
      "div",
      { className: "woof-detail__metric-grid" },
      ...n.map((a) => I(Gd, {
        key: a.field,
        label: a.label,
        value: a.value,
        unit: a.unit
      }))
    ) : null
  );
}
function Xh({
  model: e,
  onClose: t = ru
}) {
  var u, g, d, f, h, v;
  const n = Kh(), r = e || n;
  if (!r) return null;
  const a = r.summaryCards || [], l = r.detailCards || [], o = r.sectionCards || [], i = ((u = r.focusContent) == null ? void 0 : u.signals) || r.focusSignals || [], s = !!((g = r.focusContent) != null && g.title || (d = r.focusContent) != null && d.summary || i.length > 0);
  return I(
    "section",
    { className: "woof-detail", "data-surface": "nutrition-detail", "aria-label": r.title },
    I(
      "header",
      { className: "woof-detail__header" },
      I(
        "div",
        { className: "woof-detail__header-copy" },
        I("div", { className: "woof-detail__eyebrow" }, r.summary),
        I("h2", { className: "woof-detail__title" }, r.title),
        I("p", { className: "woof-detail__subtitle" }, r.subtitle)
      ),
      t !== ru ? I("button", {
        type: "button",
        className: "woof-detail__close-button",
        onClick: t
      }, r.closeLabel) : null
    ),
    I(
      "div",
      { className: "woof-detail__summary-grid" },
      ...a.map((y) => I(Qh, {
        key: y.label,
        label: y.label,
        value: y.value
      }))
    ),
    I(
      "section",
      { className: "woof-detail__panel" },
      I(
        "div",
        { className: "woof-detail__panel-head" },
        I("h3", { className: "woof-detail__panel-title" }, r.detailTitle || "Core nutrition"),
        I("p", { className: "woof-detail__panel-summary" }, r.detailSummary)
      ),
      I(
        "div",
        { className: "woof-detail__metric-grid" },
        ...l.map((y) => I(Gd, {
          key: y.field,
          label: y.label,
          value: y.value,
          unit: y.unit
        }))
      )
    ),
    I(
      "div",
      { className: "woof-detail__section-list" },
      ...o.map((y) => I(Yh, {
        key: y.id,
        title: y.title,
        summary: y.summary,
        items: y.items
      }))
    ),
    s ? I(
      "section",
      { className: "woof-detail__panel woof-detail__panel--focus" },
      I(
        "div",
        { className: "woof-detail__panel-head" },
        I("div", { className: "woof-detail__panel-kicker" }, ((f = r.focusContent) == null ? void 0 : f.subtitle) || "Weekly rhythm"),
        I("h3", { className: "woof-detail__panel-title" }, ((h = r.focusContent) == null ? void 0 : h.title) || "Nutrition focus"),
        I("p", { className: "woof-detail__panel-summary" }, ((v = r.focusContent) == null ? void 0 : v.summary) || "A lighter read on the last few logged days.")
      ),
      I(
        "div",
        { className: "woof-detail__signal-grid" },
        ...i.map((y) => I(
          "article",
          { key: y.key || y.label, className: "woof-detail__signal-card" },
          I("div", { className: "woof-detail__signal-label" }, y.label),
          I("div", { className: "woof-detail__signal-value" }, y.value || y.text),
          y.detail ? I("div", { className: "woof-detail__signal-detail" }, y.detail) : null
        ))
      )
    ) : null
  );
}
window.__woofReactHomeStatus = "bundle-loaded";
function Zt() {
  return window.__woofUiBridge || {
    openHomeLogModal() {
    },
    openAIView() {
    },
    openFavorites() {
    },
    openTodayMealsDatePicker() {
    },
    openRhythmView() {
    },
    openDailySummaryDetail() {
    },
    closeDetailModal() {
    }
  };
}
function au() {
  const e = document.getElementById("home-react-root"), t = document.getElementById("view-daily");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-home-enabled"), la.createRoot(e).render(
        /* @__PURE__ */ w.jsx(bo.StrictMode, { children: /* @__PURE__ */ w.jsx(
          jh,
          {
            onQuickLog: () => Zt().openHomeLogModal(),
            onOpenAI: () => Zt().openAIView(),
            onOpenFavorites: () => Zt().openFavorites(),
            onOpenTodayMeals: () => Zt().openTodayMealsDatePicker(),
            onOpenRhythm: () => Zt().openRhythmView(),
            onOpenDailySummary: () => Zt().openDailySummaryDetail()
          }
        ) })
      ), window.__woofReactHomeStatus = "mounted";
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-home-enabled"), window.__woofReactHomeStatus = "failed", window.__woofReactHomeError = String((n == null ? void 0 : n.stack) || n || "Unknown React home mount error"), console.error("React home mount failed", n);
    }
}
function lu() {
  const e = document.getElementById("detail-react-root");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", la.createRoot(e).render(
        /* @__PURE__ */ w.jsx(bo.StrictMode, { children: /* @__PURE__ */ w.jsx(Xh, {}) })
      );
    } catch (t) {
      e.dataset.mounted = "false", console.error("React detail surface mount failed", t);
    }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => {
  au(), lu();
}, { once: !0 }) : (au(), lu());
