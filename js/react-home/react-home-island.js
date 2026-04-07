function Hd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var rs = { exports: {} }, Ia = {}, as = { exports: {} }, P = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kr = Symbol.for("react.element"), Bd = Symbol.for("react.portal"), Ud = Symbol.for("react.fragment"), Gd = Symbol.for("react.strict_mode"), Kd = Symbol.for("react.profiler"), Vd = Symbol.for("react.provider"), Qd = Symbol.for("react.context"), Yd = Symbol.for("react.forward_ref"), Xd = Symbol.for("react.suspense"), qd = Symbol.for("react.memo"), Zd = Symbol.for("react.lazy"), Ri = Symbol.iterator;
function Jd(e) {
  return e === null || typeof e != "object" ? null : (e = Ri && e[Ri] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ls = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, os = Object.assign, is = {};
function Cn(e, t, n) {
  this.props = e, this.context = t, this.refs = is, this.updater = n || ls;
}
Cn.prototype.isReactComponent = {};
Cn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
Cn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function us() {
}
us.prototype = Cn.prototype;
function Io(e, t, n) {
  this.props = e, this.context = t, this.refs = is, this.updater = n || ls;
}
var $o = Io.prototype = new us();
$o.constructor = Io;
os($o, Cn.prototype);
$o.isPureReactComponent = !0;
var Oi = Array.isArray, ss = Object.prototype.hasOwnProperty, bo = { current: null }, cs = { key: !0, ref: !0, __self: !0, __source: !0 };
function ds(e, t, n) {
  var r, a = {}, l = null, o = null;
  if (t != null) for (r in t.ref !== void 0 && (o = t.ref), t.key !== void 0 && (l = "" + t.key), t) ss.call(t, r) && !cs.hasOwnProperty(r) && (a[r] = t[r]);
  var i = arguments.length - 2;
  if (i === 1) a.children = n;
  else if (1 < i) {
    for (var u = Array(i), s = 0; s < i; s++) u[s] = arguments[s + 2];
    a.children = u;
  }
  if (e && e.defaultProps) for (r in i = e.defaultProps, i) a[r] === void 0 && (a[r] = i[r]);
  return { $$typeof: kr, type: e, key: l, ref: o, props: a, _owner: bo.current };
}
function ef(e, t) {
  return { $$typeof: kr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Po(e) {
  return typeof e == "object" && e !== null && e.$$typeof === kr;
}
function tf(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var ji = /\/+/g;
function el(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? tf("" + e.key) : t.toString(36);
}
function Vr(e, t, n, r, a) {
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
        case Bd:
          o = !0;
      }
  }
  if (o) return o = e, a = a(o), e = r === "" ? "." + el(o, 0) : r, Oi(a) ? (n = "", e != null && (n = e.replace(ji, "$&/") + "/"), Vr(a, t, n, "", function(s) {
    return s;
  })) : a != null && (Po(a) && (a = ef(a, n + (!a.key || o && o.key === a.key ? "" : ("" + a.key).replace(ji, "$&/") + "/") + e)), t.push(a)), 1;
  if (o = 0, r = r === "" ? "." : r + ":", Oi(e)) for (var i = 0; i < e.length; i++) {
    l = e[i];
    var u = r + el(l, i);
    o += Vr(l, t, n, u, a);
  }
  else if (u = Jd(e), typeof u == "function") for (e = u.call(e), i = 0; !(l = e.next()).done; ) l = l.value, u = r + el(l, i++), o += Vr(l, t, n, u, a);
  else if (l === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return o;
}
function Dr(e, t, n) {
  if (e == null) return e;
  var r = [], a = 0;
  return Vr(e, r, "", "", function(l) {
    return t.call(n, l, a++);
  }), r;
}
function nf(e) {
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
var de = { current: null }, Qr = { transition: null }, rf = { ReactCurrentDispatcher: de, ReactCurrentBatchConfig: Qr, ReactCurrentOwner: bo };
function fs() {
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
  if (!Po(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
P.Component = Cn;
P.Fragment = Ud;
P.Profiler = Kd;
P.PureComponent = Io;
P.StrictMode = Gd;
P.Suspense = Xd;
P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = rf;
P.act = fs;
P.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = os({}, e.props), a = e.key, l = e.ref, o = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (l = t.ref, o = bo.current), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps) var i = e.type.defaultProps;
    for (u in t) ss.call(t, u) && !cs.hasOwnProperty(u) && (r[u] = t[u] === void 0 && i !== void 0 ? i[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    i = Array(u);
    for (var s = 0; s < u; s++) i[s] = arguments[s + 2];
    r.children = i;
  }
  return { $$typeof: kr, type: e.type, key: a, ref: l, props: r, _owner: o };
};
P.createContext = function(e) {
  return e = { $$typeof: Qd, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: Vd, _context: e }, e.Consumer = e;
};
P.createElement = ds;
P.createFactory = function(e) {
  var t = ds.bind(null, e);
  return t.type = e, t;
};
P.createRef = function() {
  return { current: null };
};
P.forwardRef = function(e) {
  return { $$typeof: Yd, render: e };
};
P.isValidElement = Po;
P.lazy = function(e) {
  return { $$typeof: Zd, _payload: { _status: -1, _result: e }, _init: nf };
};
P.memo = function(e, t) {
  return { $$typeof: qd, type: e, compare: t === void 0 ? null : t };
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
P.unstable_act = fs;
P.useCallback = function(e, t) {
  return de.current.useCallback(e, t);
};
P.useContext = function(e) {
  return de.current.useContext(e);
};
P.useDebugValue = function() {
};
P.useDeferredValue = function(e) {
  return de.current.useDeferredValue(e);
};
P.useEffect = function(e, t) {
  return de.current.useEffect(e, t);
};
P.useId = function() {
  return de.current.useId();
};
P.useImperativeHandle = function(e, t, n) {
  return de.current.useImperativeHandle(e, t, n);
};
P.useInsertionEffect = function(e, t) {
  return de.current.useInsertionEffect(e, t);
};
P.useLayoutEffect = function(e, t) {
  return de.current.useLayoutEffect(e, t);
};
P.useMemo = function(e, t) {
  return de.current.useMemo(e, t);
};
P.useReducer = function(e, t, n) {
  return de.current.useReducer(e, t, n);
};
P.useRef = function(e) {
  return de.current.useRef(e);
};
P.useState = function(e) {
  return de.current.useState(e);
};
P.useSyncExternalStore = function(e, t, n) {
  return de.current.useSyncExternalStore(e, t, n);
};
P.useTransition = function() {
  return de.current.useTransition();
};
P.version = "18.3.1";
as.exports = P;
var $a = as.exports;
const af = /* @__PURE__ */ Hd($a);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lf = $a, of = Symbol.for("react.element"), uf = Symbol.for("react.fragment"), sf = Object.prototype.hasOwnProperty, cf = lf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, df = { key: !0, ref: !0, __self: !0, __source: !0 };
function ms(e, t, n) {
  var r, a = {}, l = null, o = null;
  n !== void 0 && (l = "" + n), t.key !== void 0 && (l = "" + t.key), t.ref !== void 0 && (o = t.ref);
  for (r in t) sf.call(t, r) && !df.hasOwnProperty(r) && (a[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) a[r] === void 0 && (a[r] = t[r]);
  return { $$typeof: of, type: e, key: l, ref: o, props: a, _owner: cf.current };
}
Ia.Fragment = uf;
Ia.jsx = ms;
Ia.jsxs = ms;
rs.exports = Ia;
var T = rs.exports, Pl = {}, ps = { exports: {} }, Ee = {}, gs = { exports: {} }, hs = {};
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
  function t(x, N) {
    var I = x.length;
    x.push(N);
    e: for (; 0 < I; ) {
      var W = I - 1 >>> 1, Y = x[W];
      if (0 < a(Y, N)) x[W] = N, x[I] = Y, I = W;
      else break e;
    }
  }
  function n(x) {
    return x.length === 0 ? null : x[0];
  }
  function r(x) {
    if (x.length === 0) return null;
    var N = x[0], I = x.pop();
    if (I !== N) {
      x[0] = I;
      e: for (var W = 0, Y = x.length, At = Y >>> 1; W < At; ) {
        var We = 2 * (W + 1) - 1, Yt = x[We], He = We + 1, Dt = x[He];
        if (0 > a(Yt, I)) He < Y && 0 > a(Dt, Yt) ? (x[W] = Dt, x[He] = I, W = He) : (x[W] = Yt, x[We] = I, W = We);
        else if (He < Y && 0 > a(Dt, I)) x[W] = Dt, x[He] = I, W = He;
        else break e;
      }
    }
    return N;
  }
  function a(x, N) {
    var I = x.sortIndex - N.sortIndex;
    return I !== 0 ? I : x.id - N.id;
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
  var u = [], s = [], g = 1, p = null, f = 3, h = !1, v = !1, S = !1, b = typeof setTimeout == "function" ? setTimeout : null, d = typeof clearTimeout == "function" ? clearTimeout : null, c = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function m(x) {
    for (var N = n(s); N !== null; ) {
      if (N.callback === null) r(s);
      else if (N.startTime <= x) r(s), N.sortIndex = N.expirationTime, t(u, N);
      else break;
      N = n(s);
    }
  }
  function y(x) {
    if (S = !1, m(x), !v) if (n(u) !== null) v = !0, Vt(w);
    else {
      var N = n(s);
      N !== null && Qt(y, N.startTime - x);
    }
  }
  function w(x, N) {
    v = !1, S && (S = !1, d(_), _ = -1), h = !0;
    var I = f;
    try {
      for (m(N), p = n(u); p !== null && (!(p.expirationTime > N) || x && !me()); ) {
        var W = p.callback;
        if (typeof W == "function") {
          p.callback = null, f = p.priorityLevel;
          var Y = W(p.expirationTime <= N);
          N = e.unstable_now(), typeof Y == "function" ? p.callback = Y : p === n(u) && r(u), m(N);
        } else r(u);
        p = n(u);
      }
      if (p !== null) var At = !0;
      else {
        var We = n(s);
        We !== null && Qt(y, We.startTime - N), At = !1;
      }
      return At;
    } finally {
      p = null, f = I, h = !1;
    }
  }
  var M = !1, A = null, _ = -1, j = 5, $ = -1;
  function me() {
    return !(e.unstable_now() - $ < j);
  }
  function lt() {
    if (A !== null) {
      var x = e.unstable_now();
      $ = x;
      var N = !0;
      try {
        N = A(!0, x);
      } finally {
        N ? ot() : (M = !1, A = null);
      }
    } else M = !1;
  }
  var ot;
  if (typeof c == "function") ot = function() {
    c(lt);
  };
  else if (typeof MessageChannel < "u") {
    var An = new MessageChannel(), Ar = An.port2;
    An.port1.onmessage = lt, ot = function() {
      Ar.postMessage(null);
    };
  } else ot = function() {
    b(lt, 0);
  };
  function Vt(x) {
    A = x, M || (M = !0, ot());
  }
  function Qt(x, N) {
    _ = b(function() {
      x(e.unstable_now());
    }, N);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(x) {
    x.callback = null;
  }, e.unstable_continueExecution = function() {
    v || h || (v = !0, Vt(w));
  }, e.unstable_forceFrameRate = function(x) {
    0 > x || 125 < x ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : j = 0 < x ? Math.floor(1e3 / x) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return f;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(x) {
    switch (f) {
      case 1:
      case 2:
      case 3:
        var N = 3;
        break;
      default:
        N = f;
    }
    var I = f;
    f = N;
    try {
      return x();
    } finally {
      f = I;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(x, N) {
    switch (x) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        x = 3;
    }
    var I = f;
    f = x;
    try {
      return N();
    } finally {
      f = I;
    }
  }, e.unstable_scheduleCallback = function(x, N, I) {
    var W = e.unstable_now();
    switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? W + I : W) : I = W, x) {
      case 1:
        var Y = -1;
        break;
      case 2:
        Y = 250;
        break;
      case 5:
        Y = 1073741823;
        break;
      case 4:
        Y = 1e4;
        break;
      default:
        Y = 5e3;
    }
    return Y = I + Y, x = { id: g++, callback: N, priorityLevel: x, startTime: I, expirationTime: Y, sortIndex: -1 }, I > W ? (x.sortIndex = I, t(s, x), n(u) === null && x === n(s) && (S ? (d(_), _ = -1) : S = !0, Qt(y, I - W))) : (x.sortIndex = Y, t(u, x), v || h || (v = !0, Vt(w))), x;
  }, e.unstable_shouldYield = me, e.unstable_wrapCallback = function(x) {
    var N = f;
    return function() {
      var I = f;
      f = N;
      try {
        return x.apply(this, arguments);
      } finally {
        f = I;
      }
    };
  };
})(hs);
gs.exports = hs;
var ff = gs.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mf = $a, xe = ff;
function k(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var ys = /* @__PURE__ */ new Set(), nr = {};
function Gt(e, t) {
  yn(e, t), yn(e + "Capture", t);
}
function yn(e, t) {
  for (nr[e] = t, e = 0; e < t.length; e++) ys.add(t[e]);
}
var et = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Fl = Object.prototype.hasOwnProperty, pf = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Wi = {}, Hi = {};
function gf(e) {
  return Fl.call(Hi, e) ? !0 : Fl.call(Wi, e) ? !1 : pf.test(e) ? Hi[e] = !0 : (Wi[e] = !0, !1);
}
function hf(e, t, n, r) {
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
function yf(e, t, n, r) {
  if (t === null || typeof t > "u" || hf(e, t, n, r)) return !0;
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
function fe(e, t, n, r, a, l, o) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = l, this.removeEmptyString = o;
}
var ae = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ae[e] = new fe(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ae[t] = new fe(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ae[e] = new fe(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ae[e] = new fe(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ae[e] = new fe(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ae[e] = new fe(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ae[e] = new fe(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ae[e] = new fe(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ae[e] = new fe(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Fo = /[\-:]([a-z])/g;
function Lo(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Fo,
    Lo
  );
  ae[t] = new fe(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Fo, Lo);
  ae[t] = new fe(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Fo, Lo);
  ae[t] = new fe(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ae[e] = new fe(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ae.xlinkHref = new fe("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ae[e] = new fe(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function zo(e, t, n, r) {
  var a = ae.hasOwnProperty(t) ? ae[t] : null;
  (a !== null ? a.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (yf(t, n, a, r) && (n = null), r || a === null ? gf(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = n === null ? a.type === 3 ? !1 : "" : n : (t = a.attributeName, r = a.attributeNamespace, n === null ? e.removeAttribute(t) : (a = a.type, n = a === 3 || a === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var at = mf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Nr = Symbol.for("react.element"), Zt = Symbol.for("react.portal"), Jt = Symbol.for("react.fragment"), Ro = Symbol.for("react.strict_mode"), Ll = Symbol.for("react.profiler"), vs = Symbol.for("react.provider"), ks = Symbol.for("react.context"), Oo = Symbol.for("react.forward_ref"), zl = Symbol.for("react.suspense"), Rl = Symbol.for("react.suspense_list"), jo = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), Ss = Symbol.for("react.offscreen"), Bi = Symbol.iterator;
function Dn(e) {
  return e === null || typeof e != "object" ? null : (e = Bi && e[Bi] || e["@@iterator"], typeof e == "function" ? e : null);
}
var G = Object.assign, tl;
function Wn(e) {
  if (tl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    tl = t && t[1] || "";
  }
  return `
` + tl + e;
}
var nl = !1;
function rl(e, t) {
  if (!e || nl) return "";
  nl = !0;
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
      } catch (s) {
        var r = s;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (s) {
        r = s;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (s) {
        r = s;
      }
      e();
    }
  } catch (s) {
    if (s && r && typeof s.stack == "string") {
      for (var a = s.stack.split(`
`), l = r.stack.split(`
`), o = a.length - 1, i = l.length - 1; 1 <= o && 0 <= i && a[o] !== l[i]; ) i--;
      for (; 1 <= o && 0 <= i; o--, i--) if (a[o] !== l[i]) {
        if (o !== 1 || i !== 1)
          do
            if (o--, i--, 0 > i || a[o] !== l[i]) {
              var u = `
` + a[o].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= o && 0 <= i);
        break;
      }
    }
  } finally {
    nl = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Wn(e) : "";
}
function vf(e) {
  switch (e.tag) {
    case 5:
      return Wn(e.type);
    case 16:
      return Wn("Lazy");
    case 13:
      return Wn("Suspense");
    case 19:
      return Wn("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = rl(e.type, !1), e;
    case 11:
      return e = rl(e.type.render, !1), e;
    case 1:
      return e = rl(e.type, !0), e;
    default:
      return "";
  }
}
function Ol(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Jt:
      return "Fragment";
    case Zt:
      return "Portal";
    case Ll:
      return "Profiler";
    case Ro:
      return "StrictMode";
    case zl:
      return "Suspense";
    case Rl:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case ks:
      return (e.displayName || "Context") + ".Consumer";
    case vs:
      return (e._context.displayName || "Context") + ".Provider";
    case Oo:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case jo:
      return t = e.displayName || null, t !== null ? t : Ol(e.type) || "Memo";
    case ut:
      t = e._payload, e = e._init;
      try {
        return Ol(e(t));
      } catch {
      }
  }
  return null;
}
function kf(e) {
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
      return Ol(t);
    case 8:
      return t === Ro ? "StrictMode" : "Mode";
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
function wt(e) {
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
function Ts(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Sf(e) {
  var t = Ts(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
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
function Ir(e) {
  e._valueTracker || (e._valueTracker = Sf(e));
}
function ws(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = Ts(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function la(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function jl(e, t) {
  var n = t.checked;
  return G({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function Ui(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = wt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function _s(e, t) {
  t = t.checked, t != null && zo(e, "checked", t, !1);
}
function Wl(e, t) {
  _s(e, t);
  var n = wt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? Hl(e, t.type, n) : t.hasOwnProperty("defaultValue") && Hl(e, t.type, wt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Gi(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function Hl(e, t, n) {
  (t !== "number" || la(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Hn = Array.isArray;
function dn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
    for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + wt(n), t = null, a = 0; a < e.length; a++) {
      if (e[a].value === n) {
        e[a].selected = !0, r && (e[a].defaultSelected = !0);
        return;
      }
      t !== null || e[a].disabled || (t = e[a]);
    }
    t !== null && (t.selected = !0);
  }
}
function Bl(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return G({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ki(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(k(92));
      if (Hn(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: wt(n) };
}
function Cs(e, t) {
  var n = wt(t.value), r = wt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Vi(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function xs(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Ul(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? xs(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var $r, Es = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, a) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, a);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for ($r = $r || document.createElement("div"), $r.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = $r.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function rr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Gn = {
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
}, Tf = ["Webkit", "ms", "Moz", "O"];
Object.keys(Gn).forEach(function(e) {
  Tf.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Gn[t] = Gn[e];
  });
});
function Ms(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Gn.hasOwnProperty(e) && Gn[e] ? ("" + t).trim() : t + "px";
}
function As(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, a = Ms(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
  }
}
var wf = G({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Gl(e, t) {
  if (t) {
    if (wf[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function Kl(e, t) {
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
var Vl = null;
function Wo(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var Ql = null, fn = null, mn = null;
function Qi(e) {
  if (e = wr(e)) {
    if (typeof Ql != "function") throw Error(k(280));
    var t = e.stateNode;
    t && (t = za(t), Ql(e.stateNode, e.type, t));
  }
}
function Ds(e) {
  fn ? mn ? mn.push(e) : mn = [e] : fn = e;
}
function Ns() {
  if (fn) {
    var e = fn, t = mn;
    if (mn = fn = null, Qi(e), t) for (e = 0; e < t.length; e++) Qi(t[e]);
  }
}
function Is(e, t) {
  return e(t);
}
function $s() {
}
var al = !1;
function bs(e, t, n) {
  if (al) return e(t, n);
  al = !0;
  try {
    return Is(e, t, n);
  } finally {
    al = !1, (fn !== null || mn !== null) && ($s(), Ns());
  }
}
function ar(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = za(n);
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
var Yl = !1;
if (et) try {
  var Nn = {};
  Object.defineProperty(Nn, "passive", { get: function() {
    Yl = !0;
  } }), window.addEventListener("test", Nn, Nn), window.removeEventListener("test", Nn, Nn);
} catch {
  Yl = !1;
}
function _f(e, t, n, r, a, l, o, i, u) {
  var s = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, s);
  } catch (g) {
    this.onError(g);
  }
}
var Kn = !1, oa = null, ia = !1, Xl = null, Cf = { onError: function(e) {
  Kn = !0, oa = e;
} };
function xf(e, t, n, r, a, l, o, i, u) {
  Kn = !1, oa = null, _f.apply(Cf, arguments);
}
function Ef(e, t, n, r, a, l, o, i, u) {
  if (xf.apply(this, arguments), Kn) {
    if (Kn) {
      var s = oa;
      Kn = !1, oa = null;
    } else throw Error(k(198));
    ia || (ia = !0, Xl = s);
  }
}
function Kt(e) {
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
function Ps(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Yi(e) {
  if (Kt(e) !== e) throw Error(k(188));
}
function Mf(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Kt(e), t === null) throw Error(k(188));
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
        if (l === n) return Yi(a), e;
        if (l === r) return Yi(a), t;
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
function Fs(e) {
  return e = Mf(e), e !== null ? Ls(e) : null;
}
function Ls(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Ls(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var zs = xe.unstable_scheduleCallback, Xi = xe.unstable_cancelCallback, Af = xe.unstable_shouldYield, Df = xe.unstable_requestPaint, X = xe.unstable_now, Nf = xe.unstable_getCurrentPriorityLevel, Ho = xe.unstable_ImmediatePriority, Rs = xe.unstable_UserBlockingPriority, ua = xe.unstable_NormalPriority, If = xe.unstable_LowPriority, Os = xe.unstable_IdlePriority, ba = null, Ke = null;
function $f(e) {
  if (Ke && typeof Ke.onCommitFiberRoot == "function") try {
    Ke.onCommitFiberRoot(ba, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Re = Math.clz32 ? Math.clz32 : Ff, bf = Math.log, Pf = Math.LN2;
function Ff(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (bf(e) / Pf | 0) | 0;
}
var br = 64, Pr = 4194304;
function Bn(e) {
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
function sa(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, a = e.suspendedLanes, l = e.pingedLanes, o = n & 268435455;
  if (o !== 0) {
    var i = o & ~a;
    i !== 0 ? r = Bn(i) : (l &= o, l !== 0 && (r = Bn(l)));
  } else o = n & ~a, o !== 0 ? r = Bn(o) : l !== 0 && (r = Bn(l));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & a) && (a = r & -r, l = t & -t, a >= l || a === 16 && (l & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Re(t), a = 1 << n, r |= e[n], t &= ~a;
  return r;
}
function Lf(e, t) {
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
function zf(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, l = e.pendingLanes; 0 < l; ) {
    var o = 31 - Re(l), i = 1 << o, u = a[o];
    u === -1 ? (!(i & n) || i & r) && (a[o] = Lf(i, t)) : u <= t && (e.expiredLanes |= i), l &= ~i;
  }
}
function ql(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function js() {
  var e = br;
  return br <<= 1, !(br & 4194240) && (br = 64), e;
}
function ll(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Sr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Re(t), e[t] = n;
}
function Rf(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var a = 31 - Re(n), l = 1 << a;
    t[a] = 0, r[a] = -1, e[a] = -1, n &= ~l;
  }
}
function Bo(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Re(n), a = 1 << r;
    a & t | e[r] & t && (e[r] |= t), n &= ~a;
  }
}
var L = 0;
function Ws(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Hs, Uo, Bs, Us, Gs, Zl = !1, Fr = [], pt = null, gt = null, ht = null, lr = /* @__PURE__ */ new Map(), or = /* @__PURE__ */ new Map(), ct = [], Of = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function qi(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      pt = null;
      break;
    case "dragenter":
    case "dragleave":
      gt = null;
      break;
    case "mouseover":
    case "mouseout":
      ht = null;
      break;
    case "pointerover":
    case "pointerout":
      lr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      or.delete(t.pointerId);
  }
}
function In(e, t, n, r, a, l) {
  return e === null || e.nativeEvent !== l ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: l, targetContainers: [a] }, t !== null && (t = wr(t), t !== null && Uo(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
}
function jf(e, t, n, r, a) {
  switch (t) {
    case "focusin":
      return pt = In(pt, e, t, n, r, a), !0;
    case "dragenter":
      return gt = In(gt, e, t, n, r, a), !0;
    case "mouseover":
      return ht = In(ht, e, t, n, r, a), !0;
    case "pointerover":
      var l = a.pointerId;
      return lr.set(l, In(lr.get(l) || null, e, t, n, r, a)), !0;
    case "gotpointercapture":
      return l = a.pointerId, or.set(l, In(or.get(l) || null, e, t, n, r, a)), !0;
  }
  return !1;
}
function Ks(e) {
  var t = Pt(e.target);
  if (t !== null) {
    var n = Kt(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = Ps(n), t !== null) {
          e.blockedOn = t, Gs(e.priority, function() {
            Bs(n);
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
    var n = Jl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Vl = r, n.target.dispatchEvent(r), Vl = null;
    } else return t = wr(n), t !== null && Uo(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Zi(e, t, n) {
  Yr(e) && n.delete(t);
}
function Wf() {
  Zl = !1, pt !== null && Yr(pt) && (pt = null), gt !== null && Yr(gt) && (gt = null), ht !== null && Yr(ht) && (ht = null), lr.forEach(Zi), or.forEach(Zi);
}
function $n(e, t) {
  e.blockedOn === t && (e.blockedOn = null, Zl || (Zl = !0, xe.unstable_scheduleCallback(xe.unstable_NormalPriority, Wf)));
}
function ir(e) {
  function t(a) {
    return $n(a, e);
  }
  if (0 < Fr.length) {
    $n(Fr[0], e);
    for (var n = 1; n < Fr.length; n++) {
      var r = Fr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (pt !== null && $n(pt, e), gt !== null && $n(gt, e), ht !== null && $n(ht, e), lr.forEach(t), or.forEach(t), n = 0; n < ct.length; n++) r = ct[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ct.length && (n = ct[0], n.blockedOn === null); ) Ks(n), n.blockedOn === null && ct.shift();
}
var pn = at.ReactCurrentBatchConfig, ca = !0;
function Hf(e, t, n, r) {
  var a = L, l = pn.transition;
  pn.transition = null;
  try {
    L = 1, Go(e, t, n, r);
  } finally {
    L = a, pn.transition = l;
  }
}
function Bf(e, t, n, r) {
  var a = L, l = pn.transition;
  pn.transition = null;
  try {
    L = 4, Go(e, t, n, r);
  } finally {
    L = a, pn.transition = l;
  }
}
function Go(e, t, n, r) {
  if (ca) {
    var a = Jl(e, t, n, r);
    if (a === null) gl(e, t, r, da, n), qi(e, r);
    else if (jf(a, e, t, n, r)) r.stopPropagation();
    else if (qi(e, r), t & 4 && -1 < Of.indexOf(e)) {
      for (; a !== null; ) {
        var l = wr(a);
        if (l !== null && Hs(l), l = Jl(e, t, n, r), l === null && gl(e, t, r, da, n), l === a) break;
        a = l;
      }
      a !== null && r.stopPropagation();
    } else gl(e, t, r, null, n);
  }
}
var da = null;
function Jl(e, t, n, r) {
  if (da = null, e = Wo(r), e = Pt(e), e !== null) if (t = Kt(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = Ps(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return da = e, null;
}
function Vs(e) {
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
      switch (Nf()) {
        case Ho:
          return 1;
        case Rs:
          return 4;
        case ua:
        case If:
          return 16;
        case Os:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ft = null, Ko = null, Xr = null;
function Qs() {
  if (Xr) return Xr;
  var e, t = Ko, n = t.length, r, a = "value" in ft ? ft.value : ft.textContent, l = a.length;
  for (e = 0; e < n && t[e] === a[e]; e++) ;
  var o = n - e;
  for (r = 1; r <= o && t[n - r] === a[l - r]; r++) ;
  return Xr = a.slice(e, 1 < r ? 1 - r : void 0);
}
function qr(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Lr() {
  return !0;
}
function Ji() {
  return !1;
}
function Me(e) {
  function t(n, r, a, l, o) {
    this._reactName = n, this._targetInst = a, this.type = r, this.nativeEvent = l, this.target = o, this.currentTarget = null;
    for (var i in e) e.hasOwnProperty(i) && (n = e[i], this[i] = n ? n(l) : l[i]);
    return this.isDefaultPrevented = (l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1) ? Lr : Ji, this.isPropagationStopped = Ji, this;
  }
  return G(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Lr);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Lr);
  }, persist: function() {
  }, isPersistent: Lr }), t;
}
var xn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Vo = Me(xn), Tr = G({}, xn, { view: 0, detail: 0 }), Uf = Me(Tr), ol, il, bn, Pa = G({}, Tr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Qo, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== bn && (bn && e.type === "mousemove" ? (ol = e.screenX - bn.screenX, il = e.screenY - bn.screenY) : il = ol = 0, bn = e), ol);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : il;
} }), eu = Me(Pa), Gf = G({}, Pa, { dataTransfer: 0 }), Kf = Me(Gf), Vf = G({}, Tr, { relatedTarget: 0 }), ul = Me(Vf), Qf = G({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Yf = Me(Qf), Xf = G({}, xn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), qf = Me(Xf), Zf = G({}, xn, { data: 0 }), tu = Me(Zf), Jf = {
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
}, em = {
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
}, tm = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function nm(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = tm[e]) ? !!t[e] : !1;
}
function Qo() {
  return nm;
}
var rm = G({}, Tr, { key: function(e) {
  if (e.key) {
    var t = Jf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = qr(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? em[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Qo, charCode: function(e) {
  return e.type === "keypress" ? qr(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? qr(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), am = Me(rm), lm = G({}, Pa, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), nu = Me(lm), om = G({}, Tr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Qo }), im = Me(om), um = G({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), sm = Me(um), cm = G({}, Pa, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), dm = Me(cm), fm = [9, 13, 27, 32], Yo = et && "CompositionEvent" in window, Vn = null;
et && "documentMode" in document && (Vn = document.documentMode);
var mm = et && "TextEvent" in window && !Vn, Ys = et && (!Yo || Vn && 8 < Vn && 11 >= Vn), ru = " ", au = !1;
function Xs(e, t) {
  switch (e) {
    case "keyup":
      return fm.indexOf(t.keyCode) !== -1;
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
function qs(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var en = !1;
function pm(e, t) {
  switch (e) {
    case "compositionend":
      return qs(t);
    case "keypress":
      return t.which !== 32 ? null : (au = !0, ru);
    case "textInput":
      return e = t.data, e === ru && au ? null : e;
    default:
      return null;
  }
}
function gm(e, t) {
  if (en) return e === "compositionend" || !Yo && Xs(e, t) ? (e = Qs(), Xr = Ko = ft = null, en = !1, e) : null;
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
      return Ys && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var hm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function lu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!hm[e.type] : t === "textarea";
}
function Zs(e, t, n, r) {
  Ds(r), t = fa(t, "onChange"), 0 < t.length && (n = new Vo("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Qn = null, ur = null;
function ym(e) {
  sc(e, 0);
}
function Fa(e) {
  var t = rn(e);
  if (ws(t)) return e;
}
function vm(e, t) {
  if (e === "change") return t;
}
var Js = !1;
if (et) {
  var sl;
  if (et) {
    var cl = "oninput" in document;
    if (!cl) {
      var ou = document.createElement("div");
      ou.setAttribute("oninput", "return;"), cl = typeof ou.oninput == "function";
    }
    sl = cl;
  } else sl = !1;
  Js = sl && (!document.documentMode || 9 < document.documentMode);
}
function iu() {
  Qn && (Qn.detachEvent("onpropertychange", ec), ur = Qn = null);
}
function ec(e) {
  if (e.propertyName === "value" && Fa(ur)) {
    var t = [];
    Zs(t, ur, e, Wo(e)), bs(ym, t);
  }
}
function km(e, t, n) {
  e === "focusin" ? (iu(), Qn = t, ur = n, Qn.attachEvent("onpropertychange", ec)) : e === "focusout" && iu();
}
function Sm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Fa(ur);
}
function Tm(e, t) {
  if (e === "click") return Fa(t);
}
function wm(e, t) {
  if (e === "input" || e === "change") return Fa(t);
}
function _m(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var je = typeof Object.is == "function" ? Object.is : _m;
function sr(e, t) {
  if (je(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var a = n[r];
    if (!Fl.call(t, a) || !je(e[a], t[a])) return !1;
  }
  return !0;
}
function uu(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function su(e, t) {
  var n = uu(e);
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
    n = uu(n);
  }
}
function tc(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? tc(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function nc() {
  for (var e = window, t = la(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = la(e.document);
  }
  return t;
}
function Xo(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Cm(e) {
  var t = nc(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && tc(n.ownerDocument.documentElement, n)) {
    if (r !== null && Xo(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var a = n.textContent.length, l = Math.min(r.start, a);
        r = r.end === void 0 ? l : Math.min(r.end, a), !e.extend && l > r && (a = r, r = l, l = a), a = su(n, l);
        var o = su(
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
var xm = et && "documentMode" in document && 11 >= document.documentMode, tn = null, eo = null, Yn = null, to = !1;
function cu(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  to || tn == null || tn !== la(r) || (r = tn, "selectionStart" in r && Xo(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Yn && sr(Yn, r) || (Yn = r, r = fa(eo, "onSelect"), 0 < r.length && (t = new Vo("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = tn)));
}
function zr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var nn = { animationend: zr("Animation", "AnimationEnd"), animationiteration: zr("Animation", "AnimationIteration"), animationstart: zr("Animation", "AnimationStart"), transitionend: zr("Transition", "TransitionEnd") }, dl = {}, rc = {};
et && (rc = document.createElement("div").style, "AnimationEvent" in window || (delete nn.animationend.animation, delete nn.animationiteration.animation, delete nn.animationstart.animation), "TransitionEvent" in window || delete nn.transitionend.transition);
function La(e) {
  if (dl[e]) return dl[e];
  if (!nn[e]) return e;
  var t = nn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in rc) return dl[e] = t[n];
  return e;
}
var ac = La("animationend"), lc = La("animationiteration"), oc = La("animationstart"), ic = La("transitionend"), uc = /* @__PURE__ */ new Map(), du = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function xt(e, t) {
  uc.set(e, t), Gt(t, [e]);
}
for (var fl = 0; fl < du.length; fl++) {
  var ml = du[fl], Em = ml.toLowerCase(), Mm = ml[0].toUpperCase() + ml.slice(1);
  xt(Em, "on" + Mm);
}
xt(ac, "onAnimationEnd");
xt(lc, "onAnimationIteration");
xt(oc, "onAnimationStart");
xt("dblclick", "onDoubleClick");
xt("focusin", "onFocus");
xt("focusout", "onBlur");
xt(ic, "onTransitionEnd");
yn("onMouseEnter", ["mouseout", "mouseover"]);
yn("onMouseLeave", ["mouseout", "mouseover"]);
yn("onPointerEnter", ["pointerout", "pointerover"]);
yn("onPointerLeave", ["pointerout", "pointerover"]);
Gt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Gt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Gt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Gt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Gt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Gt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Un = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Am = new Set("cancel close invalid load scroll toggle".split(" ").concat(Un));
function fu(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Ef(r, t, void 0, e), e.currentTarget = null;
}
function sc(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], a = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (t) for (var o = r.length - 1; 0 <= o; o--) {
        var i = r[o], u = i.instance, s = i.currentTarget;
        if (i = i.listener, u !== l && a.isPropagationStopped()) break e;
        fu(a, i, s), l = u;
      }
      else for (o = 0; o < r.length; o++) {
        if (i = r[o], u = i.instance, s = i.currentTarget, i = i.listener, u !== l && a.isPropagationStopped()) break e;
        fu(a, i, s), l = u;
      }
    }
  }
  if (ia) throw e = Xl, ia = !1, Xl = null, e;
}
function R(e, t) {
  var n = t[oo];
  n === void 0 && (n = t[oo] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (cc(t, e, 2, !1), n.add(r));
}
function pl(e, t, n) {
  var r = 0;
  t && (r |= 4), cc(n, e, r, t);
}
var Rr = "_reactListening" + Math.random().toString(36).slice(2);
function cr(e) {
  if (!e[Rr]) {
    e[Rr] = !0, ys.forEach(function(n) {
      n !== "selectionchange" && (Am.has(n) || pl(n, !1, e), pl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Rr] || (t[Rr] = !0, pl("selectionchange", !1, t));
  }
}
function cc(e, t, n, r) {
  switch (Vs(t)) {
    case 1:
      var a = Hf;
      break;
    case 4:
      a = Bf;
      break;
    default:
      a = Go;
  }
  n = a.bind(null, t, n, e), a = void 0, !Yl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), r ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
}
function gl(e, t, n, r, a) {
  var l = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var o = r.tag;
    if (o === 3 || o === 4) {
      var i = r.stateNode.containerInfo;
      if (i === a || i.nodeType === 8 && i.parentNode === a) break;
      if (o === 4) for (o = r.return; o !== null; ) {
        var u = o.tag;
        if ((u === 3 || u === 4) && (u = o.stateNode.containerInfo, u === a || u.nodeType === 8 && u.parentNode === a)) return;
        o = o.return;
      }
      for (; i !== null; ) {
        if (o = Pt(i), o === null) return;
        if (u = o.tag, u === 5 || u === 6) {
          r = l = o;
          continue e;
        }
        i = i.parentNode;
      }
    }
    r = r.return;
  }
  bs(function() {
    var s = l, g = Wo(n), p = [];
    e: {
      var f = uc.get(e);
      if (f !== void 0) {
        var h = Vo, v = e;
        switch (e) {
          case "keypress":
            if (qr(n) === 0) break e;
          case "keydown":
          case "keyup":
            h = am;
            break;
          case "focusin":
            v = "focus", h = ul;
            break;
          case "focusout":
            v = "blur", h = ul;
            break;
          case "beforeblur":
          case "afterblur":
            h = ul;
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
            h = eu;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Kf;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = im;
            break;
          case ac:
          case lc:
          case oc:
            h = Yf;
            break;
          case ic:
            h = sm;
            break;
          case "scroll":
            h = Uf;
            break;
          case "wheel":
            h = dm;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = qf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = nu;
        }
        var S = (t & 4) !== 0, b = !S && e === "scroll", d = S ? f !== null ? f + "Capture" : null : f;
        S = [];
        for (var c = s, m; c !== null; ) {
          m = c;
          var y = m.stateNode;
          if (m.tag === 5 && y !== null && (m = y, d !== null && (y = ar(c, d), y != null && S.push(dr(c, y, m)))), b) break;
          c = c.return;
        }
        0 < S.length && (f = new h(f, v, null, n, g), p.push({ event: f, listeners: S }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (f = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", f && n !== Vl && (v = n.relatedTarget || n.fromElement) && (Pt(v) || v[tt])) break e;
        if ((h || f) && (f = g.window === g ? g : (f = g.ownerDocument) ? f.defaultView || f.parentWindow : window, h ? (v = n.relatedTarget || n.toElement, h = s, v = v ? Pt(v) : null, v !== null && (b = Kt(v), v !== b || v.tag !== 5 && v.tag !== 6) && (v = null)) : (h = null, v = s), h !== v)) {
          if (S = eu, y = "onMouseLeave", d = "onMouseEnter", c = "mouse", (e === "pointerout" || e === "pointerover") && (S = nu, y = "onPointerLeave", d = "onPointerEnter", c = "pointer"), b = h == null ? f : rn(h), m = v == null ? f : rn(v), f = new S(y, c + "leave", h, n, g), f.target = b, f.relatedTarget = m, y = null, Pt(g) === s && (S = new S(d, c + "enter", v, n, g), S.target = m, S.relatedTarget = b, y = S), b = y, h && v) t: {
            for (S = h, d = v, c = 0, m = S; m; m = qt(m)) c++;
            for (m = 0, y = d; y; y = qt(y)) m++;
            for (; 0 < c - m; ) S = qt(S), c--;
            for (; 0 < m - c; ) d = qt(d), m--;
            for (; c--; ) {
              if (S === d || d !== null && S === d.alternate) break t;
              S = qt(S), d = qt(d);
            }
            S = null;
          }
          else S = null;
          h !== null && mu(p, f, h, S, !1), v !== null && b !== null && mu(p, b, v, S, !0);
        }
      }
      e: {
        if (f = s ? rn(s) : window, h = f.nodeName && f.nodeName.toLowerCase(), h === "select" || h === "input" && f.type === "file") var w = vm;
        else if (lu(f)) if (Js) w = wm;
        else {
          w = Sm;
          var M = km;
        }
        else (h = f.nodeName) && h.toLowerCase() === "input" && (f.type === "checkbox" || f.type === "radio") && (w = Tm);
        if (w && (w = w(e, s))) {
          Zs(p, w, n, g);
          break e;
        }
        M && M(e, f, s), e === "focusout" && (M = f._wrapperState) && M.controlled && f.type === "number" && Hl(f, "number", f.value);
      }
      switch (M = s ? rn(s) : window, e) {
        case "focusin":
          (lu(M) || M.contentEditable === "true") && (tn = M, eo = s, Yn = null);
          break;
        case "focusout":
          Yn = eo = tn = null;
          break;
        case "mousedown":
          to = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          to = !1, cu(p, n, g);
          break;
        case "selectionchange":
          if (xm) break;
        case "keydown":
        case "keyup":
          cu(p, n, g);
      }
      var A;
      if (Yo) e: {
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
      else en ? Xs(e, n) && (_ = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (_ = "onCompositionStart");
      _ && (Ys && n.locale !== "ko" && (en || _ !== "onCompositionStart" ? _ === "onCompositionEnd" && en && (A = Qs()) : (ft = g, Ko = "value" in ft ? ft.value : ft.textContent, en = !0)), M = fa(s, _), 0 < M.length && (_ = new tu(_, e, null, n, g), p.push({ event: _, listeners: M }), A ? _.data = A : (A = qs(n), A !== null && (_.data = A)))), (A = mm ? pm(e, n) : gm(e, n)) && (s = fa(s, "onBeforeInput"), 0 < s.length && (g = new tu("onBeforeInput", "beforeinput", null, n, g), p.push({ event: g, listeners: s }), g.data = A));
    }
    sc(p, t);
  });
}
function dr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function fa(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var a = e, l = a.stateNode;
    a.tag === 5 && l !== null && (a = l, l = ar(e, n), l != null && r.unshift(dr(e, l, a)), l = ar(e, t), l != null && r.push(dr(e, l, a))), e = e.return;
  }
  return r;
}
function qt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function mu(e, t, n, r, a) {
  for (var l = t._reactName, o = []; n !== null && n !== r; ) {
    var i = n, u = i.alternate, s = i.stateNode;
    if (u !== null && u === r) break;
    i.tag === 5 && s !== null && (i = s, a ? (u = ar(n, l), u != null && o.unshift(dr(n, u, i))) : a || (u = ar(n, l), u != null && o.push(dr(n, u, i)))), n = n.return;
  }
  o.length !== 0 && e.push({ event: t, listeners: o });
}
var Dm = /\r\n?/g, Nm = /\u0000|\uFFFD/g;
function pu(e) {
  return (typeof e == "string" ? e : "" + e).replace(Dm, `
`).replace(Nm, "");
}
function Or(e, t, n) {
  if (t = pu(t), pu(e) !== t && n) throw Error(k(425));
}
function ma() {
}
var no = null, ro = null;
function ao(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var lo = typeof setTimeout == "function" ? setTimeout : void 0, Im = typeof clearTimeout == "function" ? clearTimeout : void 0, gu = typeof Promise == "function" ? Promise : void 0, $m = typeof queueMicrotask == "function" ? queueMicrotask : typeof gu < "u" ? function(e) {
  return gu.resolve(null).then(e).catch(bm);
} : lo;
function bm(e) {
  setTimeout(function() {
    throw e;
  });
}
function hl(e, t) {
  var n = t, r = 0;
  do {
    var a = n.nextSibling;
    if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$") {
      if (r === 0) {
        e.removeChild(a), ir(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = a;
  } while (n);
  ir(t);
}
function yt(e) {
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
function hu(e) {
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
var En = Math.random().toString(36).slice(2), Ge = "__reactFiber$" + En, fr = "__reactProps$" + En, tt = "__reactContainer$" + En, oo = "__reactEvents$" + En, Pm = "__reactListeners$" + En, Fm = "__reactHandles$" + En;
function Pt(e) {
  var t = e[Ge];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[tt] || n[Ge]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = hu(e); e !== null; ) {
        if (n = e[Ge]) return n;
        e = hu(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function wr(e) {
  return e = e[Ge] || e[tt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function rn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function za(e) {
  return e[fr] || null;
}
var io = [], an = -1;
function Et(e) {
  return { current: e };
}
function O(e) {
  0 > an || (e.current = io[an], io[an] = null, an--);
}
function z(e, t) {
  an++, io[an] = e.current, e.current = t;
}
var _t = {}, ue = Et(_t), he = Et(!1), jt = _t;
function vn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return _t;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var a = {}, l;
  for (l in n) a[l] = t[l];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
}
function ye(e) {
  return e = e.childContextTypes, e != null;
}
function pa() {
  O(he), O(ue);
}
function yu(e, t, n) {
  if (ue.current !== _t) throw Error(k(168));
  z(ue, t), z(he, n);
}
function dc(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var a in r) if (!(a in t)) throw Error(k(108, kf(e) || "Unknown", a));
  return G({}, n, r);
}
function ga(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || _t, jt = ue.current, z(ue, e), z(he, he.current), !0;
}
function vu(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n ? (e = dc(e, t, jt), r.__reactInternalMemoizedMergedChildContext = e, O(he), O(ue), z(ue, e)) : O(he), z(he, n);
}
var Ye = null, Ra = !1, yl = !1;
function fc(e) {
  Ye === null ? Ye = [e] : Ye.push(e);
}
function Lm(e) {
  Ra = !0, fc(e);
}
function Mt() {
  if (!yl && Ye !== null) {
    yl = !0;
    var e = 0, t = L;
    try {
      var n = Ye;
      for (L = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Ye = null, Ra = !1;
    } catch (a) {
      throw Ye !== null && (Ye = Ye.slice(e + 1)), zs(Ho, Mt), a;
    } finally {
      L = t, yl = !1;
    }
  }
  return null;
}
var ln = [], on = 0, ha = null, ya = 0, Ae = [], De = 0, Wt = null, qe = 1, Ze = "";
function It(e, t) {
  ln[on++] = ya, ln[on++] = ha, ha = e, ya = t;
}
function mc(e, t, n) {
  Ae[De++] = qe, Ae[De++] = Ze, Ae[De++] = Wt, Wt = e;
  var r = qe;
  e = Ze;
  var a = 32 - Re(r) - 1;
  r &= ~(1 << a), n += 1;
  var l = 32 - Re(t) + a;
  if (30 < l) {
    var o = a - a % 5;
    l = (r & (1 << o) - 1).toString(32), r >>= o, a -= o, qe = 1 << 32 - Re(t) + a | n << a | r, Ze = l + e;
  } else qe = 1 << l | n << a | r, Ze = e;
}
function qo(e) {
  e.return !== null && (It(e, 1), mc(e, 1, 0));
}
function Zo(e) {
  for (; e === ha; ) ha = ln[--on], ln[on] = null, ya = ln[--on], ln[on] = null;
  for (; e === Wt; ) Wt = Ae[--De], Ae[De] = null, Ze = Ae[--De], Ae[De] = null, qe = Ae[--De], Ae[De] = null;
}
var we = null, Te = null, H = !1, ze = null;
function pc(e, t) {
  var n = Ne(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function ku(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, we = e, Te = yt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, we = e, Te = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Wt !== null ? { id: qe, overflow: Ze } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Ne(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, we = e, Te = null, !0) : !1;
    default:
      return !1;
  }
}
function uo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function so(e) {
  if (H) {
    var t = Te;
    if (t) {
      var n = t;
      if (!ku(e, t)) {
        if (uo(e)) throw Error(k(418));
        t = yt(n.nextSibling);
        var r = we;
        t && ku(e, t) ? pc(r, n) : (e.flags = e.flags & -4097 | 2, H = !1, we = e);
      }
    } else {
      if (uo(e)) throw Error(k(418));
      e.flags = e.flags & -4097 | 2, H = !1, we = e;
    }
  }
}
function Su(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  we = e;
}
function jr(e) {
  if (e !== we) return !1;
  if (!H) return Su(e), H = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !ao(e.type, e.memoizedProps)), t && (t = Te)) {
    if (uo(e)) throw gc(), Error(k(418));
    for (; t; ) pc(e, t), t = yt(t.nextSibling);
  }
  if (Su(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Te = yt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Te = null;
    }
  } else Te = we ? yt(e.stateNode.nextSibling) : null;
  return !0;
}
function gc() {
  for (var e = Te; e; ) e = yt(e.nextSibling);
}
function kn() {
  Te = we = null, H = !1;
}
function Jo(e) {
  ze === null ? ze = [e] : ze.push(e);
}
var zm = at.ReactCurrentBatchConfig;
function Pn(e, t, n) {
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
function Wr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(k(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function Tu(e) {
  var t = e._init;
  return t(e._payload);
}
function hc(e) {
  function t(d, c) {
    if (e) {
      var m = d.deletions;
      m === null ? (d.deletions = [c], d.flags |= 16) : m.push(c);
    }
  }
  function n(d, c) {
    if (!e) return null;
    for (; c !== null; ) t(d, c), c = c.sibling;
    return null;
  }
  function r(d, c) {
    for (d = /* @__PURE__ */ new Map(); c !== null; ) c.key !== null ? d.set(c.key, c) : d.set(c.index, c), c = c.sibling;
    return d;
  }
  function a(d, c) {
    return d = Tt(d, c), d.index = 0, d.sibling = null, d;
  }
  function l(d, c, m) {
    return d.index = m, e ? (m = d.alternate, m !== null ? (m = m.index, m < c ? (d.flags |= 2, c) : m) : (d.flags |= 2, c)) : (d.flags |= 1048576, c);
  }
  function o(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function i(d, c, m, y) {
    return c === null || c.tag !== 6 ? (c = Cl(m, d.mode, y), c.return = d, c) : (c = a(c, m), c.return = d, c);
  }
  function u(d, c, m, y) {
    var w = m.type;
    return w === Jt ? g(d, c, m.props.children, y, m.key) : c !== null && (c.elementType === w || typeof w == "object" && w !== null && w.$$typeof === ut && Tu(w) === c.type) ? (y = a(c, m.props), y.ref = Pn(d, c, m), y.return = d, y) : (y = aa(m.type, m.key, m.props, null, d.mode, y), y.ref = Pn(d, c, m), y.return = d, y);
  }
  function s(d, c, m, y) {
    return c === null || c.tag !== 4 || c.stateNode.containerInfo !== m.containerInfo || c.stateNode.implementation !== m.implementation ? (c = xl(m, d.mode, y), c.return = d, c) : (c = a(c, m.children || []), c.return = d, c);
  }
  function g(d, c, m, y, w) {
    return c === null || c.tag !== 7 ? (c = Rt(m, d.mode, y, w), c.return = d, c) : (c = a(c, m), c.return = d, c);
  }
  function p(d, c, m) {
    if (typeof c == "string" && c !== "" || typeof c == "number") return c = Cl("" + c, d.mode, m), c.return = d, c;
    if (typeof c == "object" && c !== null) {
      switch (c.$$typeof) {
        case Nr:
          return m = aa(c.type, c.key, c.props, null, d.mode, m), m.ref = Pn(d, null, c), m.return = d, m;
        case Zt:
          return c = xl(c, d.mode, m), c.return = d, c;
        case ut:
          var y = c._init;
          return p(d, y(c._payload), m);
      }
      if (Hn(c) || Dn(c)) return c = Rt(c, d.mode, m, null), c.return = d, c;
      Wr(d, c);
    }
    return null;
  }
  function f(d, c, m, y) {
    var w = c !== null ? c.key : null;
    if (typeof m == "string" && m !== "" || typeof m == "number") return w !== null ? null : i(d, c, "" + m, y);
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Nr:
          return m.key === w ? u(d, c, m, y) : null;
        case Zt:
          return m.key === w ? s(d, c, m, y) : null;
        case ut:
          return w = m._init, f(
            d,
            c,
            w(m._payload),
            y
          );
      }
      if (Hn(m) || Dn(m)) return w !== null ? null : g(d, c, m, y, null);
      Wr(d, m);
    }
    return null;
  }
  function h(d, c, m, y, w) {
    if (typeof y == "string" && y !== "" || typeof y == "number") return d = d.get(m) || null, i(c, d, "" + y, w);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Nr:
          return d = d.get(y.key === null ? m : y.key) || null, u(c, d, y, w);
        case Zt:
          return d = d.get(y.key === null ? m : y.key) || null, s(c, d, y, w);
        case ut:
          var M = y._init;
          return h(d, c, m, M(y._payload), w);
      }
      if (Hn(y) || Dn(y)) return d = d.get(m) || null, g(c, d, y, w, null);
      Wr(c, y);
    }
    return null;
  }
  function v(d, c, m, y) {
    for (var w = null, M = null, A = c, _ = c = 0, j = null; A !== null && _ < m.length; _++) {
      A.index > _ ? (j = A, A = null) : j = A.sibling;
      var $ = f(d, A, m[_], y);
      if ($ === null) {
        A === null && (A = j);
        break;
      }
      e && A && $.alternate === null && t(d, A), c = l($, c, _), M === null ? w = $ : M.sibling = $, M = $, A = j;
    }
    if (_ === m.length) return n(d, A), H && It(d, _), w;
    if (A === null) {
      for (; _ < m.length; _++) A = p(d, m[_], y), A !== null && (c = l(A, c, _), M === null ? w = A : M.sibling = A, M = A);
      return H && It(d, _), w;
    }
    for (A = r(d, A); _ < m.length; _++) j = h(A, d, _, m[_], y), j !== null && (e && j.alternate !== null && A.delete(j.key === null ? _ : j.key), c = l(j, c, _), M === null ? w = j : M.sibling = j, M = j);
    return e && A.forEach(function(me) {
      return t(d, me);
    }), H && It(d, _), w;
  }
  function S(d, c, m, y) {
    var w = Dn(m);
    if (typeof w != "function") throw Error(k(150));
    if (m = w.call(m), m == null) throw Error(k(151));
    for (var M = w = null, A = c, _ = c = 0, j = null, $ = m.next(); A !== null && !$.done; _++, $ = m.next()) {
      A.index > _ ? (j = A, A = null) : j = A.sibling;
      var me = f(d, A, $.value, y);
      if (me === null) {
        A === null && (A = j);
        break;
      }
      e && A && me.alternate === null && t(d, A), c = l(me, c, _), M === null ? w = me : M.sibling = me, M = me, A = j;
    }
    if ($.done) return n(
      d,
      A
    ), H && It(d, _), w;
    if (A === null) {
      for (; !$.done; _++, $ = m.next()) $ = p(d, $.value, y), $ !== null && (c = l($, c, _), M === null ? w = $ : M.sibling = $, M = $);
      return H && It(d, _), w;
    }
    for (A = r(d, A); !$.done; _++, $ = m.next()) $ = h(A, d, _, $.value, y), $ !== null && (e && $.alternate !== null && A.delete($.key === null ? _ : $.key), c = l($, c, _), M === null ? w = $ : M.sibling = $, M = $);
    return e && A.forEach(function(lt) {
      return t(d, lt);
    }), H && It(d, _), w;
  }
  function b(d, c, m, y) {
    if (typeof m == "object" && m !== null && m.type === Jt && m.key === null && (m = m.props.children), typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case Nr:
          e: {
            for (var w = m.key, M = c; M !== null; ) {
              if (M.key === w) {
                if (w = m.type, w === Jt) {
                  if (M.tag === 7) {
                    n(d, M.sibling), c = a(M, m.props.children), c.return = d, d = c;
                    break e;
                  }
                } else if (M.elementType === w || typeof w == "object" && w !== null && w.$$typeof === ut && Tu(w) === M.type) {
                  n(d, M.sibling), c = a(M, m.props), c.ref = Pn(d, M, m), c.return = d, d = c;
                  break e;
                }
                n(d, M);
                break;
              } else t(d, M);
              M = M.sibling;
            }
            m.type === Jt ? (c = Rt(m.props.children, d.mode, y, m.key), c.return = d, d = c) : (y = aa(m.type, m.key, m.props, null, d.mode, y), y.ref = Pn(d, c, m), y.return = d, d = y);
          }
          return o(d);
        case Zt:
          e: {
            for (M = m.key; c !== null; ) {
              if (c.key === M) if (c.tag === 4 && c.stateNode.containerInfo === m.containerInfo && c.stateNode.implementation === m.implementation) {
                n(d, c.sibling), c = a(c, m.children || []), c.return = d, d = c;
                break e;
              } else {
                n(d, c);
                break;
              }
              else t(d, c);
              c = c.sibling;
            }
            c = xl(m, d.mode, y), c.return = d, d = c;
          }
          return o(d);
        case ut:
          return M = m._init, b(d, c, M(m._payload), y);
      }
      if (Hn(m)) return v(d, c, m, y);
      if (Dn(m)) return S(d, c, m, y);
      Wr(d, m);
    }
    return typeof m == "string" && m !== "" || typeof m == "number" ? (m = "" + m, c !== null && c.tag === 6 ? (n(d, c.sibling), c = a(c, m), c.return = d, d = c) : (n(d, c), c = Cl(m, d.mode, y), c.return = d, d = c), o(d)) : n(d, c);
  }
  return b;
}
var Sn = hc(!0), yc = hc(!1), va = Et(null), ka = null, un = null, ei = null;
function ti() {
  ei = un = ka = null;
}
function ni(e) {
  var t = va.current;
  O(va), e._currentValue = t;
}
function co(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function gn(e, t) {
  ka = e, ei = un = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ge = !0), e.firstContext = null);
}
function $e(e) {
  var t = e._currentValue;
  if (ei !== e) if (e = { context: e, memoizedValue: t, next: null }, un === null) {
    if (ka === null) throw Error(k(308));
    un = e, ka.dependencies = { lanes: 0, firstContext: e };
  } else un = un.next = e;
  return t;
}
var Ft = null;
function ri(e) {
  Ft === null ? Ft = [e] : Ft.push(e);
}
function vc(e, t, n, r) {
  var a = t.interleaved;
  return a === null ? (n.next = n, ri(t)) : (n.next = a.next, a.next = n), t.interleaved = n, nt(e, r);
}
function nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var st = !1;
function ai(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function kc(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function Je(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function vt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, F & 2) {
    var a = r.pending;
    return a === null ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, nt(e, n);
  }
  return a = r.interleaved, a === null ? (t.next = t, ri(r)) : (t.next = a.next, a.next = t), r.interleaved = t, nt(e, n);
}
function Zr(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Bo(e, n);
  }
}
function wu(e, t) {
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
function Sa(e, t, n, r) {
  var a = e.updateQueue;
  st = !1;
  var l = a.firstBaseUpdate, o = a.lastBaseUpdate, i = a.shared.pending;
  if (i !== null) {
    a.shared.pending = null;
    var u = i, s = u.next;
    u.next = null, o === null ? l = s : o.next = s, o = u;
    var g = e.alternate;
    g !== null && (g = g.updateQueue, i = g.lastBaseUpdate, i !== o && (i === null ? g.firstBaseUpdate = s : i.next = s, g.lastBaseUpdate = u));
  }
  if (l !== null) {
    var p = a.baseState;
    o = 0, g = s = u = null, i = l;
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
          var v = e, S = i;
          switch (f = t, h = n, S.tag) {
            case 1:
              if (v = S.payload, typeof v == "function") {
                p = v.call(h, p, f);
                break e;
              }
              p = v;
              break e;
            case 3:
              v.flags = v.flags & -65537 | 128;
            case 0:
              if (v = S.payload, f = typeof v == "function" ? v.call(h, p, f) : v, f == null) break e;
              p = G({}, p, f);
              break e;
            case 2:
              st = !0;
          }
        }
        i.callback !== null && i.lane !== 0 && (e.flags |= 64, f = a.effects, f === null ? a.effects = [i] : f.push(i));
      } else h = { eventTime: h, lane: f, tag: i.tag, payload: i.payload, callback: i.callback, next: null }, g === null ? (s = g = h, u = p) : g = g.next = h, o |= f;
      if (i = i.next, i === null) {
        if (i = a.shared.pending, i === null) break;
        f = i, i = f.next, f.next = null, a.lastBaseUpdate = f, a.shared.pending = null;
      }
    } while (!0);
    if (g === null && (u = p), a.baseState = u, a.firstBaseUpdate = s, a.lastBaseUpdate = g, t = a.shared.interleaved, t !== null) {
      a = t;
      do
        o |= a.lane, a = a.next;
      while (a !== t);
    } else l === null && (a.shared.lanes = 0);
    Bt |= o, e.lanes = o, e.memoizedState = p;
  }
}
function _u(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], a = r.callback;
    if (a !== null) {
      if (r.callback = null, r = n, typeof a != "function") throw Error(k(191, a));
      a.call(r);
    }
  }
}
var _r = {}, Ve = Et(_r), mr = Et(_r), pr = Et(_r);
function Lt(e) {
  if (e === _r) throw Error(k(174));
  return e;
}
function li(e, t) {
  switch (z(pr, t), z(mr, e), z(Ve, _r), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Ul(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Ul(t, e);
  }
  O(Ve), z(Ve, t);
}
function Tn() {
  O(Ve), O(mr), O(pr);
}
function Sc(e) {
  Lt(pr.current);
  var t = Lt(Ve.current), n = Ul(t, e.type);
  t !== n && (z(mr, e), z(Ve, n));
}
function oi(e) {
  mr.current === e && (O(Ve), O(mr));
}
var B = Et(0);
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
var vl = [];
function ii() {
  for (var e = 0; e < vl.length; e++) vl[e]._workInProgressVersionPrimary = null;
  vl.length = 0;
}
var Jr = at.ReactCurrentDispatcher, kl = at.ReactCurrentBatchConfig, Ht = 0, U = null, Z = null, ee = null, wa = !1, Xn = !1, gr = 0, Rm = 0;
function le() {
  throw Error(k(321));
}
function ui(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!je(e[n], t[n])) return !1;
  return !0;
}
function si(e, t, n, r, a, l) {
  if (Ht = l, U = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Jr.current = e === null || e.memoizedState === null ? Hm : Bm, e = n(r, a), Xn) {
    l = 0;
    do {
      if (Xn = !1, gr = 0, 25 <= l) throw Error(k(301));
      l += 1, ee = Z = null, t.updateQueue = null, Jr.current = Um, e = n(r, a);
    } while (Xn);
  }
  if (Jr.current = _a, t = Z !== null && Z.next !== null, Ht = 0, ee = Z = U = null, wa = !1, t) throw Error(k(300));
  return e;
}
function ci() {
  var e = gr !== 0;
  return gr = 0, e;
}
function Ue() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ee === null ? U.memoizedState = ee = e : ee = ee.next = e, ee;
}
function be() {
  if (Z === null) {
    var e = U.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = Z.next;
  var t = ee === null ? U.memoizedState : ee.next;
  if (t !== null) ee = t, Z = e;
  else {
    if (e === null) throw Error(k(310));
    Z = e, e = { memoizedState: Z.memoizedState, baseState: Z.baseState, baseQueue: Z.baseQueue, queue: Z.queue, next: null }, ee === null ? U.memoizedState = ee = e : ee = ee.next = e;
  }
  return ee;
}
function hr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Sl(e) {
  var t = be(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = Z, a = r.baseQueue, l = n.pending;
  if (l !== null) {
    if (a !== null) {
      var o = a.next;
      a.next = l.next, l.next = o;
    }
    r.baseQueue = a = l, n.pending = null;
  }
  if (a !== null) {
    l = a.next, r = r.baseState;
    var i = o = null, u = null, s = l;
    do {
      var g = s.lane;
      if ((Ht & g) === g) u !== null && (u = u.next = { lane: 0, action: s.action, hasEagerState: s.hasEagerState, eagerState: s.eagerState, next: null }), r = s.hasEagerState ? s.eagerState : e(r, s.action);
      else {
        var p = {
          lane: g,
          action: s.action,
          hasEagerState: s.hasEagerState,
          eagerState: s.eagerState,
          next: null
        };
        u === null ? (i = u = p, o = r) : u = u.next = p, U.lanes |= g, Bt |= g;
      }
      s = s.next;
    } while (s !== null && s !== l);
    u === null ? o = r : u.next = i, je(r, t.memoizedState) || (ge = !0), t.memoizedState = r, t.baseState = o, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    a = e;
    do
      l = a.lane, U.lanes |= l, Bt |= l, a = a.next;
    while (a !== e);
  } else a === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Tl(e) {
  var t = be(), n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, a = n.pending, l = t.memoizedState;
  if (a !== null) {
    n.pending = null;
    var o = a = a.next;
    do
      l = e(l, o.action), o = o.next;
    while (o !== a);
    je(l, t.memoizedState) || (ge = !0), t.memoizedState = l, t.baseQueue === null && (t.baseState = l), n.lastRenderedState = l;
  }
  return [l, r];
}
function Tc() {
}
function wc(e, t) {
  var n = U, r = be(), a = t(), l = !je(r.memoizedState, a);
  if (l && (r.memoizedState = a, ge = !0), r = r.queue, di(xc.bind(null, n, r, e), [e]), r.getSnapshot !== t || l || ee !== null && ee.memoizedState.tag & 1) {
    if (n.flags |= 2048, yr(9, Cc.bind(null, n, r, a, t), void 0, null), te === null) throw Error(k(349));
    Ht & 30 || _c(n, t, a);
  }
  return a;
}
function _c(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = U.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, U.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Cc(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ec(t) && Mc(e);
}
function xc(e, t, n) {
  return n(function() {
    Ec(t) && Mc(e);
  });
}
function Ec(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !je(e, n);
  } catch {
    return !0;
  }
}
function Mc(e) {
  var t = nt(e, 1);
  t !== null && Oe(t, e, 1, -1);
}
function Cu(e) {
  var t = Ue();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: hr, lastRenderedState: e }, t.queue = e, e = e.dispatch = Wm.bind(null, U, e), [t.memoizedState, e];
}
function yr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = U.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, U.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Ac() {
  return be().memoizedState;
}
function ea(e, t, n, r) {
  var a = Ue();
  U.flags |= e, a.memoizedState = yr(1 | t, n, void 0, r === void 0 ? null : r);
}
function Oa(e, t, n, r) {
  var a = be();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (Z !== null) {
    var o = Z.memoizedState;
    if (l = o.destroy, r !== null && ui(r, o.deps)) {
      a.memoizedState = yr(t, n, l, r);
      return;
    }
  }
  U.flags |= e, a.memoizedState = yr(1 | t, n, l, r);
}
function xu(e, t) {
  return ea(8390656, 8, e, t);
}
function di(e, t) {
  return Oa(2048, 8, e, t);
}
function Dc(e, t) {
  return Oa(4, 2, e, t);
}
function Nc(e, t) {
  return Oa(4, 4, e, t);
}
function Ic(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function $c(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Oa(4, 4, Ic.bind(null, t, e), n);
}
function fi() {
}
function bc(e, t) {
  var n = be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ui(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Pc(e, t) {
  var n = be();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && ui(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Fc(e, t, n) {
  return Ht & 21 ? (je(n, t) || (n = js(), U.lanes |= n, Bt |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ge = !0), e.memoizedState = n);
}
function Om(e, t) {
  var n = L;
  L = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = kl.transition;
  kl.transition = {};
  try {
    e(!1), t();
  } finally {
    L = n, kl.transition = r;
  }
}
function Lc() {
  return be().memoizedState;
}
function jm(e, t, n) {
  var r = St(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, zc(e)) Rc(t, n);
  else if (n = vc(e, t, n, r), n !== null) {
    var a = ce();
    Oe(n, e, r, a), Oc(n, t, r);
  }
}
function Wm(e, t, n) {
  var r = St(e), a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (zc(e)) Rc(t, a);
  else {
    var l = e.alternate;
    if (e.lanes === 0 && (l === null || l.lanes === 0) && (l = t.lastRenderedReducer, l !== null)) try {
      var o = t.lastRenderedState, i = l(o, n);
      if (a.hasEagerState = !0, a.eagerState = i, je(i, o)) {
        var u = t.interleaved;
        u === null ? (a.next = a, ri(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
        return;
      }
    } catch {
    } finally {
    }
    n = vc(e, t, a, r), n !== null && (a = ce(), Oe(n, e, r, a), Oc(n, t, r));
  }
}
function zc(e) {
  var t = e.alternate;
  return e === U || t !== null && t === U;
}
function Rc(e, t) {
  Xn = wa = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Oc(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, Bo(e, n);
  }
}
var _a = { readContext: $e, useCallback: le, useContext: le, useEffect: le, useImperativeHandle: le, useInsertionEffect: le, useLayoutEffect: le, useMemo: le, useReducer: le, useRef: le, useState: le, useDebugValue: le, useDeferredValue: le, useTransition: le, useMutableSource: le, useSyncExternalStore: le, useId: le, unstable_isNewReconciler: !1 }, Hm = { readContext: $e, useCallback: function(e, t) {
  return Ue().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: $e, useEffect: xu, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, ea(
    4194308,
    4,
    Ic.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return ea(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return ea(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = Ue();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = Ue();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = jm.bind(null, U, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = Ue();
  return e = { current: e }, t.memoizedState = e;
}, useState: Cu, useDebugValue: fi, useDeferredValue: function(e) {
  return Ue().memoizedState = e;
}, useTransition: function() {
  var e = Cu(!1), t = e[0];
  return e = Om.bind(null, e[1]), Ue().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = U, a = Ue();
  if (H) {
    if (n === void 0) throw Error(k(407));
    n = n();
  } else {
    if (n = t(), te === null) throw Error(k(349));
    Ht & 30 || _c(r, t, n);
  }
  a.memoizedState = n;
  var l = { value: n, getSnapshot: t };
  return a.queue = l, xu(xc.bind(
    null,
    r,
    l,
    e
  ), [e]), r.flags |= 2048, yr(9, Cc.bind(null, r, l, n, t), void 0, null), n;
}, useId: function() {
  var e = Ue(), t = te.identifierPrefix;
  if (H) {
    var n = Ze, r = qe;
    n = (r & ~(1 << 32 - Re(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = gr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Rm++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Bm = {
  readContext: $e,
  useCallback: bc,
  useContext: $e,
  useEffect: di,
  useImperativeHandle: $c,
  useInsertionEffect: Dc,
  useLayoutEffect: Nc,
  useMemo: Pc,
  useReducer: Sl,
  useRef: Ac,
  useState: function() {
    return Sl(hr);
  },
  useDebugValue: fi,
  useDeferredValue: function(e) {
    var t = be();
    return Fc(t, Z.memoizedState, e);
  },
  useTransition: function() {
    var e = Sl(hr)[0], t = be().memoizedState;
    return [e, t];
  },
  useMutableSource: Tc,
  useSyncExternalStore: wc,
  useId: Lc,
  unstable_isNewReconciler: !1
}, Um = { readContext: $e, useCallback: bc, useContext: $e, useEffect: di, useImperativeHandle: $c, useInsertionEffect: Dc, useLayoutEffect: Nc, useMemo: Pc, useReducer: Tl, useRef: Ac, useState: function() {
  return Tl(hr);
}, useDebugValue: fi, useDeferredValue: function(e) {
  var t = be();
  return Z === null ? t.memoizedState = e : Fc(t, Z.memoizedState, e);
}, useTransition: function() {
  var e = Tl(hr)[0], t = be().memoizedState;
  return [e, t];
}, useMutableSource: Tc, useSyncExternalStore: wc, useId: Lc, unstable_isNewReconciler: !1 };
function Fe(e, t) {
  if (e && e.defaultProps) {
    t = G({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function fo(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : G({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var ja = { isMounted: function(e) {
  return (e = e._reactInternals) ? Kt(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), a = St(e), l = Je(r, a);
  l.payload = t, n != null && (l.callback = n), t = vt(e, l, a), t !== null && (Oe(t, e, a, r), Zr(t, e, a));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = ce(), a = St(e), l = Je(r, a);
  l.tag = 1, l.payload = t, n != null && (l.callback = n), t = vt(e, l, a), t !== null && (Oe(t, e, a, r), Zr(t, e, a));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = ce(), r = St(e), a = Je(n, r);
  a.tag = 2, t != null && (a.callback = t), t = vt(e, a, r), t !== null && (Oe(t, e, r, n), Zr(t, e, r));
} };
function Eu(e, t, n, r, a, l, o) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, l, o) : t.prototype && t.prototype.isPureReactComponent ? !sr(n, r) || !sr(a, l) : !0;
}
function jc(e, t, n) {
  var r = !1, a = _t, l = t.contextType;
  return typeof l == "object" && l !== null ? l = $e(l) : (a = ye(t) ? jt : ue.current, r = t.contextTypes, l = (r = r != null) ? vn(e, a) : _t), t = new t(n, l), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = ja, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = l), t;
}
function Mu(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && ja.enqueueReplaceState(t, t.state, null);
}
function mo(e, t, n, r) {
  var a = e.stateNode;
  a.props = n, a.state = e.memoizedState, a.refs = {}, ai(e);
  var l = t.contextType;
  typeof l == "object" && l !== null ? a.context = $e(l) : (l = ye(t) ? jt : ue.current, a.context = vn(e, l)), a.state = e.memoizedState, l = t.getDerivedStateFromProps, typeof l == "function" && (fo(e, t, l, n), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && ja.enqueueReplaceState(a, a.state, null), Sa(e, n, a, r), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
}
function wn(e, t) {
  try {
    var n = "", r = t;
    do
      n += vf(r), r = r.return;
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
function po(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var Gm = typeof WeakMap == "function" ? WeakMap : Map;
function Wc(e, t, n) {
  n = Je(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    xa || (xa = !0, Co = r), po(e, t);
  }, n;
}
function Hc(e, t, n) {
  n = Je(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var a = t.value;
    n.payload = function() {
      return r(a);
    }, n.callback = function() {
      po(e, t);
    };
  }
  var l = e.stateNode;
  return l !== null && typeof l.componentDidCatch == "function" && (n.callback = function() {
    po(e, t), typeof r != "function" && (kt === null ? kt = /* @__PURE__ */ new Set([this]) : kt.add(this));
    var o = t.stack;
    this.componentDidCatch(t.value, { componentStack: o !== null ? o : "" });
  }), n;
}
function Au(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Gm();
    var a = /* @__PURE__ */ new Set();
    r.set(t, a);
  } else a = r.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), r.set(t, a));
  a.has(n) || (a.add(n), e = lp.bind(null, e, t, n), t.then(e, e));
}
function Du(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Nu(e, t, n, r, a) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = Je(-1, 1), t.tag = 2, vt(n, t, 1))), n.lanes |= 1), e);
}
var Km = at.ReactCurrentOwner, ge = !1;
function se(e, t, n, r) {
  t.child = e === null ? yc(t, null, n, r) : Sn(t, e.child, n, r);
}
function Iu(e, t, n, r, a) {
  n = n.render;
  var l = t.ref;
  return gn(t, a), r = si(e, t, n, r, l, a), n = ci(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, rt(e, t, a)) : (H && n && qo(t), t.flags |= 1, se(e, t, r, a), t.child);
}
function $u(e, t, n, r, a) {
  if (e === null) {
    var l = n.type;
    return typeof l == "function" && !Si(l) && l.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = l, Bc(e, t, l, r, a)) : (e = aa(n.type, null, r, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (l = e.child, !(e.lanes & a)) {
    var o = l.memoizedProps;
    if (n = n.compare, n = n !== null ? n : sr, n(o, r) && e.ref === t.ref) return rt(e, t, a);
  }
  return t.flags |= 1, e = Tt(l, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Bc(e, t, n, r, a) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (sr(l, r) && e.ref === t.ref) if (ge = !1, t.pendingProps = r = l, (e.lanes & a) !== 0) e.flags & 131072 && (ge = !0);
    else return t.lanes = e.lanes, rt(e, t, a);
  }
  return go(e, t, n, r, a);
}
function Uc(e, t, n) {
  var r = t.pendingProps, a = r.children, l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, z(cn, ke), ke |= n;
  else {
    if (!(n & 1073741824)) return e = l !== null ? l.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, z(cn, ke), ke |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = l !== null ? l.baseLanes : n, z(cn, ke), ke |= r;
  }
  else l !== null ? (r = l.baseLanes | n, t.memoizedState = null) : r = n, z(cn, ke), ke |= r;
  return se(e, t, a, n), t.child;
}
function Gc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function go(e, t, n, r, a) {
  var l = ye(n) ? jt : ue.current;
  return l = vn(t, l), gn(t, a), n = si(e, t, n, r, l, a), r = ci(), e !== null && !ge ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, rt(e, t, a)) : (H && r && qo(t), t.flags |= 1, se(e, t, n, a), t.child);
}
function bu(e, t, n, r, a) {
  if (ye(n)) {
    var l = !0;
    ga(t);
  } else l = !1;
  if (gn(t, a), t.stateNode === null) ta(e, t), jc(t, n, r), mo(t, n, r, a), r = !0;
  else if (e === null) {
    var o = t.stateNode, i = t.memoizedProps;
    o.props = i;
    var u = o.context, s = n.contextType;
    typeof s == "object" && s !== null ? s = $e(s) : (s = ye(n) ? jt : ue.current, s = vn(t, s));
    var g = n.getDerivedStateFromProps, p = typeof g == "function" || typeof o.getSnapshotBeforeUpdate == "function";
    p || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (i !== r || u !== s) && Mu(t, o, r, s), st = !1;
    var f = t.memoizedState;
    o.state = f, Sa(t, r, o, a), u = t.memoizedState, i !== r || f !== u || he.current || st ? (typeof g == "function" && (fo(t, n, g, r), u = t.memoizedState), (i = st || Eu(t, n, i, r, f, u, s)) ? (p || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), o.props = r, o.state = u, o.context = s, r = i) : (typeof o.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    o = t.stateNode, kc(e, t), i = t.memoizedProps, s = t.type === t.elementType ? i : Fe(t.type, i), o.props = s, p = t.pendingProps, f = o.context, u = n.contextType, typeof u == "object" && u !== null ? u = $e(u) : (u = ye(n) ? jt : ue.current, u = vn(t, u));
    var h = n.getDerivedStateFromProps;
    (g = typeof h == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (i !== p || f !== u) && Mu(t, o, r, u), st = !1, f = t.memoizedState, o.state = f, Sa(t, r, o, a);
    var v = t.memoizedState;
    i !== p || f !== v || he.current || st ? (typeof h == "function" && (fo(t, n, h, r), v = t.memoizedState), (s = st || Eu(t, n, s, r, f, v, u) || !1) ? (g || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(r, v, u), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(r, v, u)), typeof o.componentDidUpdate == "function" && (t.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), o.props = r, o.state = v, o.context = u, r = s) : (typeof o.componentDidUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || i === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return ho(e, t, n, r, l, a);
}
function ho(e, t, n, r, a, l) {
  Gc(e, t);
  var o = (t.flags & 128) !== 0;
  if (!r && !o) return a && vu(t, n, !1), rt(e, t, l);
  r = t.stateNode, Km.current = t;
  var i = o && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && o ? (t.child = Sn(t, e.child, null, l), t.child = Sn(t, null, i, l)) : se(e, t, i, l), t.memoizedState = r.state, a && vu(t, n, !0), t.child;
}
function Kc(e) {
  var t = e.stateNode;
  t.pendingContext ? yu(e, t.pendingContext, t.pendingContext !== t.context) : t.context && yu(e, t.context, !1), li(e, t.containerInfo);
}
function Pu(e, t, n, r, a) {
  return kn(), Jo(a), t.flags |= 256, se(e, t, n, r), t.child;
}
var yo = { dehydrated: null, treeContext: null, retryLane: 0 };
function vo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Vc(e, t, n) {
  var r = t.pendingProps, a = B.current, l = !1, o = (t.flags & 128) !== 0, i;
  if ((i = o) || (i = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), i ? (l = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), z(B, a & 1), e === null)
    return so(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (o = r.children, e = r.fallback, l ? (r = t.mode, l = t.child, o = { mode: "hidden", children: o }, !(r & 1) && l !== null ? (l.childLanes = 0, l.pendingProps = o) : l = Ba(o, r, 0, null), e = Rt(e, r, n, null), l.return = t, e.return = t, l.sibling = e, t.child = l, t.child.memoizedState = vo(n), t.memoizedState = yo, e) : mi(t, o));
  if (a = e.memoizedState, a !== null && (i = a.dehydrated, i !== null)) return Vm(e, t, o, r, i, a, n);
  if (l) {
    l = r.fallback, o = t.mode, a = e.child, i = a.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(o & 1) && t.child !== a ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = Tt(a, u), r.subtreeFlags = a.subtreeFlags & 14680064), i !== null ? l = Tt(i, l) : (l = Rt(l, o, n, null), l.flags |= 2), l.return = t, r.return = t, r.sibling = l, t.child = r, r = l, l = t.child, o = e.child.memoizedState, o = o === null ? vo(n) : { baseLanes: o.baseLanes | n, cachePool: null, transitions: o.transitions }, l.memoizedState = o, l.childLanes = e.childLanes & ~n, t.memoizedState = yo, r;
  }
  return l = e.child, e = l.sibling, r = Tt(l, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function mi(e, t) {
  return t = Ba({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Hr(e, t, n, r) {
  return r !== null && Jo(r), Sn(t, e.child, null, n), e = mi(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function Vm(e, t, n, r, a, l, o) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = wl(Error(k(422))), Hr(e, t, o, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (l = r.fallback, a = t.mode, r = Ba({ mode: "visible", children: r.children }, a, 0, null), l = Rt(l, a, o, null), l.flags |= 2, r.return = t, l.return = t, r.sibling = l, t.child = r, t.mode & 1 && Sn(t, e.child, null, o), t.child.memoizedState = vo(o), t.memoizedState = yo, l);
  if (!(t.mode & 1)) return Hr(e, t, o, null);
  if (a.data === "$!") {
    if (r = a.nextSibling && a.nextSibling.dataset, r) var i = r.dgst;
    return r = i, l = Error(k(419)), r = wl(l, r, void 0), Hr(e, t, o, r);
  }
  if (i = (o & e.childLanes) !== 0, ge || i) {
    if (r = te, r !== null) {
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
      a = a & (r.suspendedLanes | o) ? 0 : a, a !== 0 && a !== l.retryLane && (l.retryLane = a, nt(e, a), Oe(r, e, a, -1));
    }
    return ki(), r = wl(Error(k(421))), Hr(e, t, o, r);
  }
  return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = op.bind(null, e), a._reactRetry = t, null) : (e = l.treeContext, Te = yt(a.nextSibling), we = t, H = !0, ze = null, e !== null && (Ae[De++] = qe, Ae[De++] = Ze, Ae[De++] = Wt, qe = e.id, Ze = e.overflow, Wt = t), t = mi(t, r.children), t.flags |= 4096, t);
}
function Fu(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), co(e.return, t, n);
}
function _l(e, t, n, r, a) {
  var l = e.memoizedState;
  l === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = r, l.tail = n, l.tailMode = a);
}
function Qc(e, t, n) {
  var r = t.pendingProps, a = r.revealOrder, l = r.tail;
  if (se(e, t, r.children, n), r = B.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Fu(e, n, t);
      else if (e.tag === 19) Fu(e, n, t);
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
  if (z(B, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (a) {
    case "forwards":
      for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && Ta(e) === null && (a = n), n = n.sibling;
      n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), _l(t, !1, a, n, l);
      break;
    case "backwards":
      for (n = null, a = t.child, t.child = null; a !== null; ) {
        if (e = a.alternate, e !== null && Ta(e) === null) {
          t.child = a;
          break;
        }
        e = a.sibling, a.sibling = n, n = a, a = e;
      }
      _l(t, !0, n, null, l);
      break;
    case "together":
      _l(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function ta(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function rt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), Bt |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (e = t.child, n = Tt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Tt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function Qm(e, t, n) {
  switch (t.tag) {
    case 3:
      Kc(t), kn();
      break;
    case 5:
      Sc(t);
      break;
    case 1:
      ye(t.type) && ga(t);
      break;
    case 4:
      li(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, a = t.memoizedProps.value;
      z(va, r._currentValue), r._currentValue = a;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (z(B, B.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? Vc(e, t, n) : (z(B, B.current & 1), e = rt(e, t, n), e !== null ? e.sibling : null);
      z(B, B.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Qc(e, t, n);
        t.flags |= 128;
      }
      if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), z(B, B.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Uc(e, t, n);
  }
  return rt(e, t, n);
}
var Yc, ko, Xc, qc;
Yc = function(e, t) {
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
ko = function() {
};
Xc = function(e, t, n, r) {
  var a = e.memoizedProps;
  if (a !== r) {
    e = t.stateNode, Lt(Ve.current);
    var l = null;
    switch (n) {
      case "input":
        a = jl(e, a), r = jl(e, r), l = [];
        break;
      case "select":
        a = G({}, a, { value: void 0 }), r = G({}, r, { value: void 0 }), l = [];
        break;
      case "textarea":
        a = Bl(e, a), r = Bl(e, r), l = [];
        break;
      default:
        typeof a.onClick != "function" && typeof r.onClick == "function" && (e.onclick = ma);
    }
    Gl(n, r);
    var o;
    n = null;
    for (s in a) if (!r.hasOwnProperty(s) && a.hasOwnProperty(s) && a[s] != null) if (s === "style") {
      var i = a[s];
      for (o in i) i.hasOwnProperty(o) && (n || (n = {}), n[o] = "");
    } else s !== "dangerouslySetInnerHTML" && s !== "children" && s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && s !== "autoFocus" && (nr.hasOwnProperty(s) ? l || (l = []) : (l = l || []).push(s, null));
    for (s in r) {
      var u = r[s];
      if (i = a != null ? a[s] : void 0, r.hasOwnProperty(s) && u !== i && (u != null || i != null)) if (s === "style") if (i) {
        for (o in i) !i.hasOwnProperty(o) || u && u.hasOwnProperty(o) || (n || (n = {}), n[o] = "");
        for (o in u) u.hasOwnProperty(o) && i[o] !== u[o] && (n || (n = {}), n[o] = u[o]);
      } else n || (l || (l = []), l.push(
        s,
        n
      )), n = u;
      else s === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, i = i ? i.__html : void 0, u != null && i !== u && (l = l || []).push(s, u)) : s === "children" ? typeof u != "string" && typeof u != "number" || (l = l || []).push(s, "" + u) : s !== "suppressContentEditableWarning" && s !== "suppressHydrationWarning" && (nr.hasOwnProperty(s) ? (u != null && s === "onScroll" && R("scroll", e), l || i === u || (l = [])) : (l = l || []).push(s, u));
    }
    n && (l = l || []).push("style", n);
    var s = l;
    (t.updateQueue = s) && (t.flags |= 4);
  }
};
qc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Fn(e, t) {
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
function oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 14680064, r |= a.flags & 14680064, a.return = e, a = a.sibling;
  else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function Ym(e, t, n) {
  var r = t.pendingProps;
  switch (Zo(t), t.tag) {
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
      return oe(t), null;
    case 1:
      return ye(t.type) && pa(), oe(t), null;
    case 3:
      return r = t.stateNode, Tn(), O(he), O(ue), ii(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (jr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, ze !== null && (Mo(ze), ze = null))), ko(e, t), oe(t), null;
    case 5:
      oi(t);
      var a = Lt(pr.current);
      if (n = t.type, e !== null && t.stateNode != null) Xc(e, t, n, r, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return oe(t), null;
        }
        if (e = Lt(Ve.current), jr(t)) {
          r = t.stateNode, n = t.type;
          var l = t.memoizedProps;
          switch (r[Ge] = t, r[fr] = l, e = (t.mode & 1) !== 0, n) {
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
              for (a = 0; a < Un.length; a++) R(Un[a], r);
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
              Ui(r, l), R("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!l.multiple }, R("invalid", r);
              break;
            case "textarea":
              Ki(r, l), R("invalid", r);
          }
          Gl(n, l), a = null;
          for (var o in l) if (l.hasOwnProperty(o)) {
            var i = l[o];
            o === "children" ? typeof i == "string" ? r.textContent !== i && (l.suppressHydrationWarning !== !0 && Or(r.textContent, i, e), a = ["children", i]) : typeof i == "number" && r.textContent !== "" + i && (l.suppressHydrationWarning !== !0 && Or(
              r.textContent,
              i,
              e
            ), a = ["children", "" + i]) : nr.hasOwnProperty(o) && i != null && o === "onScroll" && R("scroll", r);
          }
          switch (n) {
            case "input":
              Ir(r), Gi(r, l, !0);
              break;
            case "textarea":
              Ir(r), Vi(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = ma);
          }
          r = a, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          o = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = xs(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = o.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = o.createElement(n, { is: r.is }) : (e = o.createElement(n), n === "select" && (o = e, r.multiple ? o.multiple = !0 : r.size && (o.size = r.size))) : e = o.createElementNS(e, n), e[Ge] = t, e[fr] = r, Yc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (o = Kl(n, r), n) {
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
                for (a = 0; a < Un.length; a++) R(Un[a], e);
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
                Ui(e, r), a = jl(e, r), R("invalid", e);
                break;
              case "option":
                a = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, a = G({}, r, { value: void 0 }), R("invalid", e);
                break;
              case "textarea":
                Ki(e, r), a = Bl(e, r), R("invalid", e);
                break;
              default:
                a = r;
            }
            Gl(n, a), i = a;
            for (l in i) if (i.hasOwnProperty(l)) {
              var u = i[l];
              l === "style" ? As(e, u) : l === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Es(e, u)) : l === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && rr(e, u) : typeof u == "number" && rr(e, "" + u) : l !== "suppressContentEditableWarning" && l !== "suppressHydrationWarning" && l !== "autoFocus" && (nr.hasOwnProperty(l) ? u != null && l === "onScroll" && R("scroll", e) : u != null && zo(e, l, u, o));
            }
            switch (n) {
              case "input":
                Ir(e), Gi(e, r, !1);
                break;
              case "textarea":
                Ir(e), Vi(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + wt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, l = r.value, l != null ? dn(e, !!r.multiple, l, !1) : r.defaultValue != null && dn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof a.onClick == "function" && (e.onclick = ma);
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
      return oe(t), null;
    case 6:
      if (e && t.stateNode != null) qc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (n = Lt(pr.current), Lt(Ve.current), jr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[Ge] = t, (l = r.nodeValue !== n) && (e = we, e !== null)) switch (e.tag) {
            case 3:
              Or(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Or(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          l && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[Ge] = t, t.stateNode = r;
      }
      return oe(t), null;
    case 13:
      if (O(B), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (H && Te !== null && t.mode & 1 && !(t.flags & 128)) gc(), kn(), t.flags |= 98560, l = !1;
        else if (l = jr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!l) throw Error(k(318));
            if (l = t.memoizedState, l = l !== null ? l.dehydrated : null, !l) throw Error(k(317));
            l[Ge] = t;
          } else kn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          oe(t), l = !1;
        } else ze !== null && (Mo(ze), ze = null), l = !0;
        if (!l) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || B.current & 1 ? J === 0 && (J = 3) : ki())), t.updateQueue !== null && (t.flags |= 4), oe(t), null);
    case 4:
      return Tn(), ko(e, t), e === null && cr(t.stateNode.containerInfo), oe(t), null;
    case 10:
      return ni(t.type._context), oe(t), null;
    case 17:
      return ye(t.type) && pa(), oe(t), null;
    case 19:
      if (O(B), l = t.memoizedState, l === null) return oe(t), null;
      if (r = (t.flags & 128) !== 0, o = l.rendering, o === null) if (r) Fn(l, !1);
      else {
        if (J !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (o = Ta(e), o !== null) {
            for (t.flags |= 128, Fn(l, !1), r = o.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) l = n, e = r, l.flags &= 14680066, o = l.alternate, o === null ? (l.childLanes = 0, l.lanes = e, l.child = null, l.subtreeFlags = 0, l.memoizedProps = null, l.memoizedState = null, l.updateQueue = null, l.dependencies = null, l.stateNode = null) : (l.childLanes = o.childLanes, l.lanes = o.lanes, l.child = o.child, l.subtreeFlags = 0, l.deletions = null, l.memoizedProps = o.memoizedProps, l.memoizedState = o.memoizedState, l.updateQueue = o.updateQueue, l.type = o.type, e = o.dependencies, l.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return z(B, B.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        l.tail !== null && X() > _n && (t.flags |= 128, r = !0, Fn(l, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = Ta(o), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Fn(l, !0), l.tail === null && l.tailMode === "hidden" && !o.alternate && !H) return oe(t), null;
        } else 2 * X() - l.renderingStartTime > _n && n !== 1073741824 && (t.flags |= 128, r = !0, Fn(l, !1), t.lanes = 4194304);
        l.isBackwards ? (o.sibling = t.child, t.child = o) : (n = l.last, n !== null ? n.sibling = o : t.child = o, l.last = o);
      }
      return l.tail !== null ? (t = l.tail, l.rendering = t, l.tail = t.sibling, l.renderingStartTime = X(), t.sibling = null, n = B.current, z(B, r ? n & 1 | 2 : n & 1), t) : (oe(t), null);
    case 22:
    case 23:
      return vi(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ke & 1073741824 && (oe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : oe(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function Xm(e, t) {
  switch (Zo(t), t.tag) {
    case 1:
      return ye(t.type) && pa(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return Tn(), O(he), O(ue), ii(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return oi(t), null;
    case 13:
      if (O(B), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(k(340));
        kn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return O(B), null;
    case 4:
      return Tn(), null;
    case 10:
      return ni(t.type._context), null;
    case 22:
    case 23:
      return vi(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Br = !1, ie = !1, qm = typeof WeakSet == "function" ? WeakSet : Set, E = null;
function sn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    V(e, t, r);
  }
  else n.current = null;
}
function So(e, t, n) {
  try {
    n();
  } catch (r) {
    V(e, t, r);
  }
}
var Lu = !1;
function Zm(e, t) {
  if (no = ca, e = nc(), Xo(e)) {
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
        var o = 0, i = -1, u = -1, s = 0, g = 0, p = e, f = null;
        t: for (; ; ) {
          for (var h; p !== n || a !== 0 && p.nodeType !== 3 || (i = o + a), p !== l || r !== 0 && p.nodeType !== 3 || (u = o + r), p.nodeType === 3 && (o += p.nodeValue.length), (h = p.firstChild) !== null; )
            f = p, p = h;
          for (; ; ) {
            if (p === e) break t;
            if (f === n && ++s === a && (i = o), f === l && ++g === r && (u = o), (h = p.nextSibling) !== null) break;
            p = f, f = p.parentNode;
          }
          p = h;
        }
        n = i === -1 || u === -1 ? null : { start: i, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (ro = { focusedElem: e, selectionRange: n }, ca = !1, E = t; E !== null; ) if (t = E, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, E = e;
  else for (; E !== null; ) {
    t = E;
    try {
      var v = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (v !== null) {
            var S = v.memoizedProps, b = v.memoizedState, d = t.stateNode, c = d.getSnapshotBeforeUpdate(t.elementType === t.type ? S : Fe(t.type, S), b);
            d.__reactInternalSnapshotBeforeUpdate = c;
          }
          break;
        case 3:
          var m = t.stateNode.containerInfo;
          m.nodeType === 1 ? m.textContent = "" : m.nodeType === 9 && m.documentElement && m.removeChild(m.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(k(163));
      }
    } catch (y) {
      V(t, t.return, y);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, E = e;
      break;
    }
    E = t.return;
  }
  return v = Lu, Lu = !1, v;
}
function qn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var a = r = r.next;
    do {
      if ((a.tag & e) === e) {
        var l = a.destroy;
        a.destroy = void 0, l !== void 0 && So(t, n, l);
      }
      a = a.next;
    } while (a !== r);
  }
}
function Wa(e, t) {
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
function To(e) {
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
function Zc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, Zc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[Ge], delete t[fr], delete t[oo], delete t[Pm], delete t[Fm])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function Jc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function zu(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || Jc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function wo(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = ma));
  else if (r !== 4 && (e = e.child, e !== null)) for (wo(e, t, n), e = e.sibling; e !== null; ) wo(e, t, n), e = e.sibling;
}
function _o(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (_o(e, t, n), e = e.sibling; e !== null; ) _o(e, t, n), e = e.sibling;
}
var ne = null, Le = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) ed(e, t, n), n = n.sibling;
}
function ed(e, t, n) {
  if (Ke && typeof Ke.onCommitFiberUnmount == "function") try {
    Ke.onCommitFiberUnmount(ba, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      ie || sn(n, t);
    case 6:
      var r = ne, a = Le;
      ne = null, it(e, t, n), ne = r, Le = a, ne !== null && (Le ? (e = ne, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ne.removeChild(n.stateNode));
      break;
    case 18:
      ne !== null && (Le ? (e = ne, n = n.stateNode, e.nodeType === 8 ? hl(e.parentNode, n) : e.nodeType === 1 && hl(e, n), ir(e)) : hl(ne, n.stateNode));
      break;
    case 4:
      r = ne, a = Le, ne = n.stateNode.containerInfo, Le = !0, it(e, t, n), ne = r, Le = a;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!ie && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        a = r = r.next;
        do {
          var l = a, o = l.destroy;
          l = l.tag, o !== void 0 && (l & 2 || l & 4) && So(n, t, o), a = a.next;
        } while (a !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (!ie && (sn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (i) {
        V(n, t, i);
      }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (ie = (r = ie) || n.memoizedState !== null, it(e, t, n), ie = r) : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function Ru(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new qm()), t.forEach(function(r) {
      var a = ip.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(a, a));
    });
  }
}
function Pe(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var a = n[r];
    try {
      var l = e, o = t, i = o;
      e: for (; i !== null; ) {
        switch (i.tag) {
          case 5:
            ne = i.stateNode, Le = !1;
            break e;
          case 3:
            ne = i.stateNode.containerInfo, Le = !0;
            break e;
          case 4:
            ne = i.stateNode.containerInfo, Le = !0;
            break e;
        }
        i = i.return;
      }
      if (ne === null) throw Error(k(160));
      ed(l, o, a), ne = null, Le = !1;
      var u = a.alternate;
      u !== null && (u.return = null), a.return = null;
    } catch (s) {
      V(a, t, s);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) td(t, e), t = t.sibling;
}
function td(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Pe(t, e), Be(e), r & 4) {
        try {
          qn(3, e, e.return), Wa(3, e);
        } catch (S) {
          V(e, e.return, S);
        }
        try {
          qn(5, e, e.return);
        } catch (S) {
          V(e, e.return, S);
        }
      }
      break;
    case 1:
      Pe(t, e), Be(e), r & 512 && n !== null && sn(n, n.return);
      break;
    case 5:
      if (Pe(t, e), Be(e), r & 512 && n !== null && sn(n, n.return), e.flags & 32) {
        var a = e.stateNode;
        try {
          rr(a, "");
        } catch (S) {
          V(e, e.return, S);
        }
      }
      if (r & 4 && (a = e.stateNode, a != null)) {
        var l = e.memoizedProps, o = n !== null ? n.memoizedProps : l, i = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          i === "input" && l.type === "radio" && l.name != null && _s(a, l), Kl(i, o);
          var s = Kl(i, l);
          for (o = 0; o < u.length; o += 2) {
            var g = u[o], p = u[o + 1];
            g === "style" ? As(a, p) : g === "dangerouslySetInnerHTML" ? Es(a, p) : g === "children" ? rr(a, p) : zo(a, g, p, s);
          }
          switch (i) {
            case "input":
              Wl(a, l);
              break;
            case "textarea":
              Cs(a, l);
              break;
            case "select":
              var f = a._wrapperState.wasMultiple;
              a._wrapperState.wasMultiple = !!l.multiple;
              var h = l.value;
              h != null ? dn(a, !!l.multiple, h, !1) : f !== !!l.multiple && (l.defaultValue != null ? dn(
                a,
                !!l.multiple,
                l.defaultValue,
                !0
              ) : dn(a, !!l.multiple, l.multiple ? [] : "", !1));
          }
          a[fr] = l;
        } catch (S) {
          V(e, e.return, S);
        }
      }
      break;
    case 6:
      if (Pe(t, e), Be(e), r & 4) {
        if (e.stateNode === null) throw Error(k(162));
        a = e.stateNode, l = e.memoizedProps;
        try {
          a.nodeValue = l;
        } catch (S) {
          V(e, e.return, S);
        }
      }
      break;
    case 3:
      if (Pe(t, e), Be(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        ir(t.containerInfo);
      } catch (S) {
        V(e, e.return, S);
      }
      break;
    case 4:
      Pe(t, e), Be(e);
      break;
    case 13:
      Pe(t, e), Be(e), a = e.child, a.flags & 8192 && (l = a.memoizedState !== null, a.stateNode.isHidden = l, !l || a.alternate !== null && a.alternate.memoizedState !== null || (hi = X())), r & 4 && Ru(e);
      break;
    case 22:
      if (g = n !== null && n.memoizedState !== null, e.mode & 1 ? (ie = (s = ie) || g, Pe(t, e), ie = s) : Pe(t, e), Be(e), r & 8192) {
        if (s = e.memoizedState !== null, (e.stateNode.isHidden = s) && !g && e.mode & 1) for (E = e, g = e.child; g !== null; ) {
          for (p = E = g; E !== null; ) {
            switch (f = E, h = f.child, f.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                qn(4, f, f.return);
                break;
              case 1:
                sn(f, f.return);
                var v = f.stateNode;
                if (typeof v.componentWillUnmount == "function") {
                  r = f, n = f.return;
                  try {
                    t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount();
                  } catch (S) {
                    V(r, n, S);
                  }
                }
                break;
              case 5:
                sn(f, f.return);
                break;
              case 22:
                if (f.memoizedState !== null) {
                  ju(p);
                  continue;
                }
            }
            h !== null ? (h.return = f, E = h) : ju(p);
          }
          g = g.sibling;
        }
        e: for (g = null, p = e; ; ) {
          if (p.tag === 5) {
            if (g === null) {
              g = p;
              try {
                a = p.stateNode, s ? (l = a.style, typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none") : (i = p.stateNode, u = p.memoizedProps.style, o = u != null && u.hasOwnProperty("display") ? u.display : null, i.style.display = Ms("display", o));
              } catch (S) {
                V(e, e.return, S);
              }
            }
          } else if (p.tag === 6) {
            if (g === null) try {
              p.stateNode.nodeValue = s ? "" : p.memoizedProps;
            } catch (S) {
              V(e, e.return, S);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            g === p && (g = null), p = p.return;
          }
          g === p && (g = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      Pe(t, e), Be(e), r & 4 && Ru(e);
      break;
    case 21:
      break;
    default:
      Pe(
        t,
        e
      ), Be(e);
  }
}
function Be(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Jc(n)) {
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
          r.flags & 32 && (rr(a, ""), r.flags &= -33);
          var l = zu(e);
          _o(e, l, a);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo, i = zu(e);
          wo(e, i, o);
          break;
        default:
          throw Error(k(161));
      }
    } catch (u) {
      V(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Jm(e, t, n) {
  E = e, nd(e);
}
function nd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; E !== null; ) {
    var a = E, l = a.child;
    if (a.tag === 22 && r) {
      var o = a.memoizedState !== null || Br;
      if (!o) {
        var i = a.alternate, u = i !== null && i.memoizedState !== null || ie;
        i = Br;
        var s = ie;
        if (Br = o, (ie = u) && !s) for (E = a; E !== null; ) o = E, u = o.child, o.tag === 22 && o.memoizedState !== null ? Wu(a) : u !== null ? (u.return = o, E = u) : Wu(a);
        for (; l !== null; ) E = l, nd(l), l = l.sibling;
        E = a, Br = i, ie = s;
      }
      Ou(e);
    } else a.subtreeFlags & 8772 && l !== null ? (l.return = a, E = l) : Ou(e);
  }
}
function Ou(e) {
  for (; E !== null; ) {
    var t = E;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            ie || Wa(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !ie) if (n === null) r.componentDidMount();
            else {
              var a = t.elementType === t.type ? n.memoizedProps : Fe(t.type, n.memoizedProps);
              r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var l = t.updateQueue;
            l !== null && _u(t, l, r);
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
              _u(t, o, n);
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
              var s = t.alternate;
              if (s !== null) {
                var g = s.memoizedState;
                if (g !== null) {
                  var p = g.dehydrated;
                  p !== null && ir(p);
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
        ie || t.flags & 512 && To(t);
      } catch (f) {
        V(t, t.return, f);
      }
    }
    if (t === e) {
      E = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, E = n;
      break;
    }
    E = t.return;
  }
}
function ju(e) {
  for (; E !== null; ) {
    var t = E;
    if (t === e) {
      E = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, E = n;
      break;
    }
    E = t.return;
  }
}
function Wu(e) {
  for (; E !== null; ) {
    var t = E;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Wa(4, t);
          } catch (u) {
            V(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var a = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              V(t, a, u);
            }
          }
          var l = t.return;
          try {
            To(t);
          } catch (u) {
            V(t, l, u);
          }
          break;
        case 5:
          var o = t.return;
          try {
            To(t);
          } catch (u) {
            V(t, o, u);
          }
      }
    } catch (u) {
      V(t, t.return, u);
    }
    if (t === e) {
      E = null;
      break;
    }
    var i = t.sibling;
    if (i !== null) {
      i.return = t.return, E = i;
      break;
    }
    E = t.return;
  }
}
var ep = Math.ceil, Ca = at.ReactCurrentDispatcher, pi = at.ReactCurrentOwner, Ie = at.ReactCurrentBatchConfig, F = 0, te = null, q = null, re = 0, ke = 0, cn = Et(0), J = 0, vr = null, Bt = 0, Ha = 0, gi = 0, Zn = null, pe = null, hi = 0, _n = 1 / 0, Qe = null, xa = !1, Co = null, kt = null, Ur = !1, mt = null, Ea = 0, Jn = 0, xo = null, na = -1, ra = 0;
function ce() {
  return F & 6 ? X() : na !== -1 ? na : na = X();
}
function St(e) {
  return e.mode & 1 ? F & 2 && re !== 0 ? re & -re : zm.transition !== null ? (ra === 0 && (ra = js()), ra) : (e = L, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Vs(e.type)), e) : 1;
}
function Oe(e, t, n, r) {
  if (50 < Jn) throw Jn = 0, xo = null, Error(k(185));
  Sr(e, n, r), (!(F & 2) || e !== te) && (e === te && (!(F & 2) && (Ha |= n), J === 4 && dt(e, re)), ve(e, r), n === 1 && F === 0 && !(t.mode & 1) && (_n = X() + 500, Ra && Mt()));
}
function ve(e, t) {
  var n = e.callbackNode;
  zf(e, t);
  var r = sa(e, e === te ? re : 0);
  if (r === 0) n !== null && Xi(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Xi(n), t === 1) e.tag === 0 ? Lm(Hu.bind(null, e)) : fc(Hu.bind(null, e)), $m(function() {
      !(F & 6) && Mt();
    }), n = null;
    else {
      switch (Ws(r)) {
        case 1:
          n = Ho;
          break;
        case 4:
          n = Rs;
          break;
        case 16:
          n = ua;
          break;
        case 536870912:
          n = Os;
          break;
        default:
          n = ua;
      }
      n = cd(n, rd.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function rd(e, t) {
  if (na = -1, ra = 0, F & 6) throw Error(k(327));
  var n = e.callbackNode;
  if (hn() && e.callbackNode !== n) return null;
  var r = sa(e, e === te ? re : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Ma(e, r);
  else {
    t = r;
    var a = F;
    F |= 2;
    var l = ld();
    (te !== e || re !== t) && (Qe = null, _n = X() + 500, zt(e, t));
    do
      try {
        rp();
        break;
      } catch (i) {
        ad(e, i);
      }
    while (!0);
    ti(), Ca.current = l, F = a, q !== null ? t = 0 : (te = null, re = 0, t = J);
  }
  if (t !== 0) {
    if (t === 2 && (a = ql(e), a !== 0 && (r = a, t = Eo(e, a))), t === 1) throw n = vr, zt(e, 0), dt(e, r), ve(e, X()), n;
    if (t === 6) dt(e, r);
    else {
      if (a = e.current.alternate, !(r & 30) && !tp(a) && (t = Ma(e, r), t === 2 && (l = ql(e), l !== 0 && (r = l, t = Eo(e, l))), t === 1)) throw n = vr, zt(e, 0), dt(e, r), ve(e, X()), n;
      switch (e.finishedWork = a, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          $t(e, pe, Qe);
          break;
        case 3:
          if (dt(e, r), (r & 130023424) === r && (t = hi + 500 - X(), 10 < t)) {
            if (sa(e, 0) !== 0) break;
            if (a = e.suspendedLanes, (a & r) !== r) {
              ce(), e.pingedLanes |= e.suspendedLanes & a;
              break;
            }
            e.timeoutHandle = lo($t.bind(null, e, pe, Qe), t);
            break;
          }
          $t(e, pe, Qe);
          break;
        case 4:
          if (dt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, a = -1; 0 < r; ) {
            var o = 31 - Re(r);
            l = 1 << o, o = t[o], o > a && (a = o), r &= ~l;
          }
          if (r = a, r = X() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ep(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = lo($t.bind(null, e, pe, Qe), r);
            break;
          }
          $t(e, pe, Qe);
          break;
        case 5:
          $t(e, pe, Qe);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return ve(e, X()), e.callbackNode === n ? rd.bind(null, e) : null;
}
function Eo(e, t) {
  var n = Zn;
  return e.current.memoizedState.isDehydrated && (zt(e, t).flags |= 256), e = Ma(e, t), e !== 2 && (t = pe, pe = n, t !== null && Mo(t)), e;
}
function Mo(e) {
  pe === null ? pe = e : pe.push.apply(pe, e);
}
function tp(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var a = n[r], l = a.getSnapshot;
        a = a.value;
        try {
          if (!je(l(), a)) return !1;
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
function dt(e, t) {
  for (t &= ~gi, t &= ~Ha, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Re(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Hu(e) {
  if (F & 6) throw Error(k(327));
  hn();
  var t = sa(e, 0);
  if (!(t & 1)) return ve(e, X()), null;
  var n = Ma(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ql(e);
    r !== 0 && (t = r, n = Eo(e, r));
  }
  if (n === 1) throw n = vr, zt(e, 0), dt(e, t), ve(e, X()), n;
  if (n === 6) throw Error(k(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, $t(e, pe, Qe), ve(e, X()), null;
}
function yi(e, t) {
  var n = F;
  F |= 1;
  try {
    return e(t);
  } finally {
    F = n, F === 0 && (_n = X() + 500, Ra && Mt());
  }
}
function Ut(e) {
  mt !== null && mt.tag === 0 && !(F & 6) && hn();
  var t = F;
  F |= 1;
  var n = Ie.transition, r = L;
  try {
    if (Ie.transition = null, L = 1, e) return e();
  } finally {
    L = r, Ie.transition = n, F = t, !(F & 6) && Mt();
  }
}
function vi() {
  ke = cn.current, O(cn);
}
function zt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Im(n)), q !== null) for (n = q.return; n !== null; ) {
    var r = n;
    switch (Zo(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && pa();
        break;
      case 3:
        Tn(), O(he), O(ue), ii();
        break;
      case 5:
        oi(r);
        break;
      case 4:
        Tn();
        break;
      case 13:
        O(B);
        break;
      case 19:
        O(B);
        break;
      case 10:
        ni(r.type._context);
        break;
      case 22:
      case 23:
        vi();
    }
    n = n.return;
  }
  if (te = e, q = e = Tt(e.current, null), re = ke = t, J = 0, vr = null, gi = Ha = Bt = 0, pe = Zn = null, Ft !== null) {
    for (t = 0; t < Ft.length; t++) if (n = Ft[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var a = r.next, l = n.pending;
      if (l !== null) {
        var o = l.next;
        l.next = a, r.next = o;
      }
      n.pending = r;
    }
    Ft = null;
  }
  return e;
}
function ad(e, t) {
  do {
    var n = q;
    try {
      if (ti(), Jr.current = _a, wa) {
        for (var r = U.memoizedState; r !== null; ) {
          var a = r.queue;
          a !== null && (a.pending = null), r = r.next;
        }
        wa = !1;
      }
      if (Ht = 0, ee = Z = U = null, Xn = !1, gr = 0, pi.current = null, n === null || n.return === null) {
        J = 1, vr = t, q = null;
        break;
      }
      e: {
        var l = e, o = n.return, i = n, u = t;
        if (t = re, i.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var s = u, g = i, p = g.tag;
          if (!(g.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var f = g.alternate;
            f ? (g.updateQueue = f.updateQueue, g.memoizedState = f.memoizedState, g.lanes = f.lanes) : (g.updateQueue = null, g.memoizedState = null);
          }
          var h = Du(o);
          if (h !== null) {
            h.flags &= -257, Nu(h, o, i, l, t), h.mode & 1 && Au(l, s, t), t = h, u = s;
            var v = t.updateQueue;
            if (v === null) {
              var S = /* @__PURE__ */ new Set();
              S.add(u), t.updateQueue = S;
            } else v.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Au(l, s, t), ki();
              break e;
            }
            u = Error(k(426));
          }
        } else if (H && i.mode & 1) {
          var b = Du(o);
          if (b !== null) {
            !(b.flags & 65536) && (b.flags |= 256), Nu(b, o, i, l, t), Jo(wn(u, i));
            break e;
          }
        }
        l = u = wn(u, i), J !== 4 && (J = 2), Zn === null ? Zn = [l] : Zn.push(l), l = o;
        do {
          switch (l.tag) {
            case 3:
              l.flags |= 65536, t &= -t, l.lanes |= t;
              var d = Wc(l, u, t);
              wu(l, d);
              break e;
            case 1:
              i = u;
              var c = l.type, m = l.stateNode;
              if (!(l.flags & 128) && (typeof c.getDerivedStateFromError == "function" || m !== null && typeof m.componentDidCatch == "function" && (kt === null || !kt.has(m)))) {
                l.flags |= 65536, t &= -t, l.lanes |= t;
                var y = Hc(l, i, t);
                wu(l, y);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      id(n);
    } catch (w) {
      t = w, q === n && n !== null && (q = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function ld() {
  var e = Ca.current;
  return Ca.current = _a, e === null ? _a : e;
}
function ki() {
  (J === 0 || J === 3 || J === 2) && (J = 4), te === null || !(Bt & 268435455) && !(Ha & 268435455) || dt(te, re);
}
function Ma(e, t) {
  var n = F;
  F |= 2;
  var r = ld();
  (te !== e || re !== t) && (Qe = null, zt(e, t));
  do
    try {
      np();
      break;
    } catch (a) {
      ad(e, a);
    }
  while (!0);
  if (ti(), F = n, Ca.current = r, q !== null) throw Error(k(261));
  return te = null, re = 0, J;
}
function np() {
  for (; q !== null; ) od(q);
}
function rp() {
  for (; q !== null && !Af(); ) od(q);
}
function od(e) {
  var t = sd(e.alternate, e, ke);
  e.memoizedProps = e.pendingProps, t === null ? id(e) : q = t, pi.current = null;
}
function id(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Xm(n, t), n !== null) {
        n.flags &= 32767, q = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        J = 6, q = null;
        return;
      }
    } else if (n = Ym(n, t, ke), n !== null) {
      q = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      q = t;
      return;
    }
    q = t = e;
  } while (t !== null);
  J === 0 && (J = 5);
}
function $t(e, t, n) {
  var r = L, a = Ie.transition;
  try {
    Ie.transition = null, L = 1, ap(e, t, n, r);
  } finally {
    Ie.transition = a, L = r;
  }
  return null;
}
function ap(e, t, n, r) {
  do
    hn();
  while (mt !== null);
  if (F & 6) throw Error(k(327));
  n = e.finishedWork;
  var a = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(k(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var l = n.lanes | n.childLanes;
  if (Rf(e, l), e === te && (q = te = null, re = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || Ur || (Ur = !0, cd(ua, function() {
    return hn(), null;
  })), l = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || l) {
    l = Ie.transition, Ie.transition = null;
    var o = L;
    L = 1;
    var i = F;
    F |= 4, pi.current = null, Zm(e, n), td(n, e), Cm(ro), ca = !!no, ro = no = null, e.current = n, Jm(n), Df(), F = i, L = o, Ie.transition = l;
  } else e.current = n;
  if (Ur && (Ur = !1, mt = e, Ea = a), l = e.pendingLanes, l === 0 && (kt = null), $f(n.stateNode), ve(e, X()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], r(a.value, { componentStack: a.stack, digest: a.digest });
  if (xa) throw xa = !1, e = Co, Co = null, e;
  return Ea & 1 && e.tag !== 0 && hn(), l = e.pendingLanes, l & 1 ? e === xo ? Jn++ : (Jn = 0, xo = e) : Jn = 0, Mt(), null;
}
function hn() {
  if (mt !== null) {
    var e = Ws(Ea), t = Ie.transition, n = L;
    try {
      if (Ie.transition = null, L = 16 > e ? 16 : e, mt === null) var r = !1;
      else {
        if (e = mt, mt = null, Ea = 0, F & 6) throw Error(k(331));
        var a = F;
        for (F |= 4, E = e.current; E !== null; ) {
          var l = E, o = l.child;
          if (E.flags & 16) {
            var i = l.deletions;
            if (i !== null) {
              for (var u = 0; u < i.length; u++) {
                var s = i[u];
                for (E = s; E !== null; ) {
                  var g = E;
                  switch (g.tag) {
                    case 0:
                    case 11:
                    case 15:
                      qn(8, g, l);
                  }
                  var p = g.child;
                  if (p !== null) p.return = g, E = p;
                  else for (; E !== null; ) {
                    g = E;
                    var f = g.sibling, h = g.return;
                    if (Zc(g), g === s) {
                      E = null;
                      break;
                    }
                    if (f !== null) {
                      f.return = h, E = f;
                      break;
                    }
                    E = h;
                  }
                }
              }
              var v = l.alternate;
              if (v !== null) {
                var S = v.child;
                if (S !== null) {
                  v.child = null;
                  do {
                    var b = S.sibling;
                    S.sibling = null, S = b;
                  } while (S !== null);
                }
              }
              E = l;
            }
          }
          if (l.subtreeFlags & 2064 && o !== null) o.return = l, E = o;
          else e: for (; E !== null; ) {
            if (l = E, l.flags & 2048) switch (l.tag) {
              case 0:
              case 11:
              case 15:
                qn(9, l, l.return);
            }
            var d = l.sibling;
            if (d !== null) {
              d.return = l.return, E = d;
              break e;
            }
            E = l.return;
          }
        }
        var c = e.current;
        for (E = c; E !== null; ) {
          o = E;
          var m = o.child;
          if (o.subtreeFlags & 2064 && m !== null) m.return = o, E = m;
          else e: for (o = c; E !== null; ) {
            if (i = E, i.flags & 2048) try {
              switch (i.tag) {
                case 0:
                case 11:
                case 15:
                  Wa(9, i);
              }
            } catch (w) {
              V(i, i.return, w);
            }
            if (i === o) {
              E = null;
              break e;
            }
            var y = i.sibling;
            if (y !== null) {
              y.return = i.return, E = y;
              break e;
            }
            E = i.return;
          }
        }
        if (F = a, Mt(), Ke && typeof Ke.onPostCommitFiberRoot == "function") try {
          Ke.onPostCommitFiberRoot(ba, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      L = n, Ie.transition = t;
    }
  }
  return !1;
}
function Bu(e, t, n) {
  t = wn(n, t), t = Wc(e, t, 1), e = vt(e, t, 1), t = ce(), e !== null && (Sr(e, 1, t), ve(e, t));
}
function V(e, t, n) {
  if (e.tag === 3) Bu(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Bu(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (kt === null || !kt.has(r))) {
        e = wn(n, e), e = Hc(t, e, 1), t = vt(t, e, 1), e = ce(), t !== null && (Sr(t, 1, e), ve(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function lp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = ce(), e.pingedLanes |= e.suspendedLanes & n, te === e && (re & n) === n && (J === 4 || J === 3 && (re & 130023424) === re && 500 > X() - hi ? zt(e, 0) : gi |= n), ve(e, t);
}
function ud(e, t) {
  t === 0 && (e.mode & 1 ? (t = Pr, Pr <<= 1, !(Pr & 130023424) && (Pr = 4194304)) : t = 1);
  var n = ce();
  e = nt(e, t), e !== null && (Sr(e, t, n), ve(e, n));
}
function op(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), ud(e, n);
}
function ip(e, t) {
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
  r !== null && r.delete(t), ud(e, n);
}
var sd;
sd = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || he.current) ge = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ge = !1, Qm(e, t, n);
    ge = !!(e.flags & 131072);
  }
  else ge = !1, H && t.flags & 1048576 && mc(t, ya, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      ta(e, t), e = t.pendingProps;
      var a = vn(t, ue.current);
      gn(t, n), a = si(null, t, r, e, a, n);
      var l = ci();
      return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, ye(r) ? (l = !0, ga(t)) : l = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, ai(t), a.updater = ja, t.stateNode = a, a._reactInternals = t, mo(t, r, e, n), t = ho(null, t, r, !0, l, n)) : (t.tag = 0, H && l && qo(t), se(null, t, a, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (ta(e, t), e = t.pendingProps, a = r._init, r = a(r._payload), t.type = r, a = t.tag = sp(r), e = Fe(r, e), a) {
          case 0:
            t = go(null, t, r, e, n);
            break e;
          case 1:
            t = bu(null, t, r, e, n);
            break e;
          case 11:
            t = Iu(null, t, r, e, n);
            break e;
          case 14:
            t = $u(null, t, r, Fe(r.type, e), n);
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
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Fe(r, a), go(e, t, r, a, n);
    case 1:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Fe(r, a), bu(e, t, r, a, n);
    case 3:
      e: {
        if (Kc(t), e === null) throw Error(k(387));
        r = t.pendingProps, l = t.memoizedState, a = l.element, kc(e, t), Sa(t, r, null, n);
        var o = t.memoizedState;
        if (r = o.element, l.isDehydrated) if (l = { element: r, isDehydrated: !1, cache: o.cache, pendingSuspenseBoundaries: o.pendingSuspenseBoundaries, transitions: o.transitions }, t.updateQueue.baseState = l, t.memoizedState = l, t.flags & 256) {
          a = wn(Error(k(423)), t), t = Pu(e, t, r, n, a);
          break e;
        } else if (r !== a) {
          a = wn(Error(k(424)), t), t = Pu(e, t, r, n, a);
          break e;
        } else for (Te = yt(t.stateNode.containerInfo.firstChild), we = t, H = !0, ze = null, n = yc(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (kn(), r === a) {
            t = rt(e, t, n);
            break e;
          }
          se(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Sc(t), e === null && so(t), r = t.type, a = t.pendingProps, l = e !== null ? e.memoizedProps : null, o = a.children, ao(r, a) ? o = null : l !== null && ao(r, l) && (t.flags |= 32), Gc(e, t), se(e, t, o, n), t.child;
    case 6:
      return e === null && so(t), null;
    case 13:
      return Vc(e, t, n);
    case 4:
      return li(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Sn(t, null, r, n) : se(e, t, r, n), t.child;
    case 11:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Fe(r, a), Iu(e, t, r, a, n);
    case 7:
      return se(e, t, t.pendingProps, n), t.child;
    case 8:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return se(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, a = t.pendingProps, l = t.memoizedProps, o = a.value, z(va, r._currentValue), r._currentValue = o, l !== null) if (je(l.value, o)) {
          if (l.children === a.children && !he.current) {
            t = rt(e, t, n);
            break e;
          }
        } else for (l = t.child, l !== null && (l.return = t); l !== null; ) {
          var i = l.dependencies;
          if (i !== null) {
            o = l.child;
            for (var u = i.firstContext; u !== null; ) {
              if (u.context === r) {
                if (l.tag === 1) {
                  u = Je(-1, n & -n), u.tag = 2;
                  var s = l.updateQueue;
                  if (s !== null) {
                    s = s.shared;
                    var g = s.pending;
                    g === null ? u.next = u : (u.next = g.next, g.next = u), s.pending = u;
                  }
                }
                l.lanes |= n, u = l.alternate, u !== null && (u.lanes |= n), co(
                  l.return,
                  n,
                  t
                ), i.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (l.tag === 10) o = l.type === t.type ? null : l.child;
          else if (l.tag === 18) {
            if (o = l.return, o === null) throw Error(k(341));
            o.lanes |= n, i = o.alternate, i !== null && (i.lanes |= n), co(o, n, t), o = l.sibling;
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
        se(e, t, a.children, n), t = t.child;
      }
      return t;
    case 9:
      return a = t.type, r = t.pendingProps.children, gn(t, n), a = $e(a), r = r(a), t.flags |= 1, se(e, t, r, n), t.child;
    case 14:
      return r = t.type, a = Fe(r, t.pendingProps), a = Fe(r.type, a), $u(e, t, r, a, n);
    case 15:
      return Bc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Fe(r, a), ta(e, t), t.tag = 1, ye(r) ? (e = !0, ga(t)) : e = !1, gn(t, n), jc(t, r, a), mo(t, r, a, n), ho(null, t, r, !0, e, n);
    case 19:
      return Qc(e, t, n);
    case 22:
      return Uc(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function cd(e, t) {
  return zs(e, t);
}
function up(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Ne(e, t, n, r) {
  return new up(e, t, n, r);
}
function Si(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function sp(e) {
  if (typeof e == "function") return Si(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Oo) return 11;
    if (e === jo) return 14;
  }
  return 2;
}
function Tt(e, t) {
  var n = e.alternate;
  return n === null ? (n = Ne(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function aa(e, t, n, r, a, l) {
  var o = 2;
  if (r = e, typeof e == "function") Si(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else e: switch (e) {
    case Jt:
      return Rt(n.children, a, l, t);
    case Ro:
      o = 8, a |= 8;
      break;
    case Ll:
      return e = Ne(12, n, t, a | 2), e.elementType = Ll, e.lanes = l, e;
    case zl:
      return e = Ne(13, n, t, a), e.elementType = zl, e.lanes = l, e;
    case Rl:
      return e = Ne(19, n, t, a), e.elementType = Rl, e.lanes = l, e;
    case Ss:
      return Ba(n, a, l, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case vs:
          o = 10;
          break e;
        case ks:
          o = 9;
          break e;
        case Oo:
          o = 11;
          break e;
        case jo:
          o = 14;
          break e;
        case ut:
          o = 16, r = null;
          break e;
      }
      throw Error(k(130, e == null ? e : typeof e, ""));
  }
  return t = Ne(o, n, t, a), t.elementType = e, t.type = r, t.lanes = l, t;
}
function Rt(e, t, n, r) {
  return e = Ne(7, e, r, t), e.lanes = n, e;
}
function Ba(e, t, n, r) {
  return e = Ne(22, e, r, t), e.elementType = Ss, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Cl(e, t, n) {
  return e = Ne(6, e, null, t), e.lanes = n, e;
}
function xl(e, t, n) {
  return t = Ne(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function cp(e, t, n, r, a) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ll(0), this.expirationTimes = ll(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ll(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
}
function Ti(e, t, n, r, a, l, o, i, u) {
  return e = new cp(e, t, n, i, u), t === 1 ? (t = 1, l === !0 && (t |= 8)) : t = 0, l = Ne(3, null, null, t), e.current = l, l.stateNode = e, l.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ai(l), e;
}
function dp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Zt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function dd(e) {
  if (!e) return _t;
  e = e._reactInternals;
  e: {
    if (Kt(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (ye(t.type)) {
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
    if (ye(n)) return dc(e, n, t);
  }
  return t;
}
function fd(e, t, n, r, a, l, o, i, u) {
  return e = Ti(n, r, !0, e, a, l, o, i, u), e.context = dd(null), n = e.current, r = ce(), a = St(n), l = Je(r, a), l.callback = t ?? null, vt(n, l, a), e.current.lanes = a, Sr(e, a, r), ve(e, r), e;
}
function Ua(e, t, n, r) {
  var a = t.current, l = ce(), o = St(a);
  return n = dd(n), t.context === null ? t.context = n : t.pendingContext = n, t = Je(l, o), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = vt(a, t, o), e !== null && (Oe(e, a, o, l), Zr(e, a, o)), o;
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
function Uu(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function wi(e, t) {
  Uu(e, t), (e = e.alternate) && Uu(e, t);
}
function fp() {
  return null;
}
var md = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function _i(e) {
  this._internalRoot = e;
}
Ga.prototype.render = _i.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  Ua(e, t, null, null);
};
Ga.prototype.unmount = _i.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Ut(function() {
      Ua(null, e, null, null);
    }), t[tt] = null;
  }
};
function Ga(e) {
  this._internalRoot = e;
}
Ga.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Us();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ct.length && t !== 0 && t < ct[n].priority; n++) ;
    ct.splice(n, 0, e), n === 0 && Ks(e);
  }
};
function Ci(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Ka(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Gu() {
}
function mp(e, t, n, r, a) {
  if (a) {
    if (typeof r == "function") {
      var l = r;
      r = function() {
        var s = Aa(o);
        l.call(s);
      };
    }
    var o = fd(t, r, e, 0, null, !1, !1, "", Gu);
    return e._reactRootContainer = o, e[tt] = o.current, cr(e.nodeType === 8 ? e.parentNode : e), Ut(), o;
  }
  for (; a = e.lastChild; ) e.removeChild(a);
  if (typeof r == "function") {
    var i = r;
    r = function() {
      var s = Aa(u);
      i.call(s);
    };
  }
  var u = Ti(e, 0, !1, null, null, !1, !1, "", Gu);
  return e._reactRootContainer = u, e[tt] = u.current, cr(e.nodeType === 8 ? e.parentNode : e), Ut(function() {
    Ua(t, u, n, r);
  }), u;
}
function Va(e, t, n, r, a) {
  var l = n._reactRootContainer;
  if (l) {
    var o = l;
    if (typeof a == "function") {
      var i = a;
      a = function() {
        var u = Aa(o);
        i.call(u);
      };
    }
    Ua(t, o, e, a);
  } else o = mp(n, t, e, a, r);
  return Aa(o);
}
Hs = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Bn(t.pendingLanes);
        n !== 0 && (Bo(t, n | 1), ve(t, X()), !(F & 6) && (_n = X() + 500, Mt()));
      }
      break;
    case 13:
      Ut(function() {
        var r = nt(e, 1);
        if (r !== null) {
          var a = ce();
          Oe(r, e, 1, a);
        }
      }), wi(e, 1);
  }
};
Uo = function(e) {
  if (e.tag === 13) {
    var t = nt(e, 134217728);
    if (t !== null) {
      var n = ce();
      Oe(t, e, 134217728, n);
    }
    wi(e, 134217728);
  }
};
Bs = function(e) {
  if (e.tag === 13) {
    var t = St(e), n = nt(e, t);
    if (n !== null) {
      var r = ce();
      Oe(n, e, t, r);
    }
    wi(e, t);
  }
};
Us = function() {
  return L;
};
Gs = function(e, t) {
  var n = L;
  try {
    return L = e, t();
  } finally {
    L = n;
  }
};
Ql = function(e, t, n) {
  switch (t) {
    case "input":
      if (Wl(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var a = za(r);
            if (!a) throw Error(k(90));
            ws(r), Wl(r, a);
          }
        }
      }
      break;
    case "textarea":
      Cs(e, n);
      break;
    case "select":
      t = n.value, t != null && dn(e, !!n.multiple, t, !1);
  }
};
Is = yi;
$s = Ut;
var pp = { usingClientEntryPoint: !1, Events: [wr, rn, za, Ds, Ns, yi] }, Ln = { findFiberByHostInstance: Pt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, gp = { bundleType: Ln.bundleType, version: Ln.version, rendererPackageName: Ln.rendererPackageName, rendererConfig: Ln.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: at.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Fs(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Ln.findFiberByHostInstance || fp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Gr = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Gr.isDisabled && Gr.supportsFiber) try {
    ba = Gr.inject(gp), Ke = Gr;
  } catch {
  }
}
Ee.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = pp;
Ee.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!Ci(t)) throw Error(k(200));
  return dp(e, t, null, n);
};
Ee.createRoot = function(e, t) {
  if (!Ci(e)) throw Error(k(299));
  var n = !1, r = "", a = md;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = Ti(e, 1, !1, null, null, n, !1, r, a), e[tt] = t.current, cr(e.nodeType === 8 ? e.parentNode : e), new _i(t);
};
Ee.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(k(188)) : (e = Object.keys(e).join(","), Error(k(268, e)));
  return e = Fs(t), e = e === null ? null : e.stateNode, e;
};
Ee.flushSync = function(e) {
  return Ut(e);
};
Ee.hydrate = function(e, t, n) {
  if (!Ka(t)) throw Error(k(200));
  return Va(null, e, t, !0, n);
};
Ee.hydrateRoot = function(e, t, n) {
  if (!Ci(e)) throw Error(k(405));
  var r = n != null && n.hydratedSources || null, a = !1, l = "", o = md;
  if (n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (l = n.identifierPrefix), n.onRecoverableError !== void 0 && (o = n.onRecoverableError)), t = fd(t, null, e, 1, n ?? null, a, !1, l, o), e[tt] = t.current, cr(e), r) for (e = 0; e < r.length; e++) n = r[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(
    n,
    a
  );
  return new Ga(t);
};
Ee.render = function(e, t, n) {
  if (!Ka(t)) throw Error(k(200));
  return Va(null, e, t, !1, n);
};
Ee.unmountComponentAtNode = function(e) {
  if (!Ka(e)) throw Error(k(40));
  return e._reactRootContainer ? (Ut(function() {
    Va(null, null, e, !1, function() {
      e._reactRootContainer = null, e[tt] = null;
    });
  }), !0) : !1;
};
Ee.unstable_batchedUpdates = yi;
Ee.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Ka(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return Va(e, t, n, !1, r);
};
Ee.version = "18.3.1-next-f1338f8080-20240426";
function pd() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pd);
    } catch (e) {
      console.error(e);
    }
}
pd(), ps.exports = Ee;
var hp = ps.exports, Ku = hp;
Pl.createRoot = Ku.createRoot, Pl.hydrateRoot = Ku.hydrateRoot;
const _e = typeof window < "u" && window.__WOOF_CAL_CONFIG__ ? window.__WOOF_CAL_CONFIG__ : {};
_e.workerUrl;
_e.turnstileWidgetSelector;
_e.turnstileSiteKey;
Object.freeze(
  Array.isArray(_e.turnstileAllowedHostnames) && _e.turnstileAllowedHostnames.length > 0 ? _e.turnstileAllowedHostnames.map((e) => String(e || "").trim().toLowerCase()).filter(Boolean) : ["andreww0421.github.io"]
);
_e.serviceWorkerPath;
const yp = Number(_e.dailyAiLimit) || 20, vp = _e.usageKey || "woofCal_usage";
_e.storageSchemaKey;
Number(_e.appSchemaVersion);
_e.diagnosticsKey;
Number(_e.maxDiagnosticEvents);
function Ct(e = /* @__PURE__ */ new Date()) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function xi(e, t = null) {
  if (typeof e != "string" || e === "") return t;
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}
const gd = Object.freeze({
  calories: Object.freeze({ aliases: ["cal"] }),
  protein: Object.freeze({ aliases: [] }),
  fat: Object.freeze({ aliases: [] }),
  carbohydrate: Object.freeze({ aliases: ["carb"] }),
  sugar: Object.freeze({ aliases: [] }),
  sodium: Object.freeze({ aliases: ["sod"] }),
  saturatedFat: Object.freeze({ aliases: ["sat"] }),
  transFat: Object.freeze({ aliases: ["trans"] }),
  fiber: Object.freeze({ aliases: [] })
}), Mn = Object.freeze(Object.keys(gd));
function Vu(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function kp(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const l = Math.min(Math.max(a, t), n);
  if (r === null) return l;
  const o = 10 ** r;
  return Math.round(l * o) / o;
}
function Sp(e) {
  const t = Vu(e) ? e : {}, n = Vu(t.nutri) ? t.nutri : null;
  return n ? [n, t] : [t];
}
function Tp(e, t, n) {
  const r = [t, ...n], a = Sp(e);
  for (const l of a)
    for (const o of r) {
      const i = l == null ? void 0 : l[o];
      if (i != null && i !== "")
        return i;
    }
  return 0;
}
function wp() {
  return Object.fromEntries(Mn.map((e) => [e, 0]));
}
function Ce(e = {}, t = {}) {
  const { fieldOptions: n = {} } = t;
  return Object.fromEntries(Mn.map((r) => {
    const a = gd[r], l = Tp(e, r, a.aliases);
    return [r, kp(l, n[r])];
  }));
}
function Cr(e = {}, t = {}) {
  return Ce(e, t);
}
function Ei(e = {}) {
  const t = Ce(e);
  return Mn.some((n) => t[n] !== 0);
}
function zn(e) {
  return typeof e == "function";
}
function _p(e) {
  return !!e && zn(e.getItem) && zn(e.setItem) && zn(e.removeItem) && zn(e.clear) && zn(e.key) && typeof e.length == "number";
}
function Cp(e) {
  if (!_p(e))
    throw new Error("Invalid storage adapter");
  return e;
}
function xp() {
  return globalThis.localStorage;
}
function Ep(e = xp) {
  const t = () => {
    const n = typeof e == "function" ? e() : e;
    return Cp(n);
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
const Mp = Ep();
let Ap = Mp;
function Qa(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function hd() {
  return Ap;
}
function xr(e) {
  return hd().getItem(e);
}
function yd(e, t) {
  hd().setItem(e, t);
}
function Ya(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function vd(e) {
  return Array.isArray(e) ? e.filter(Qa).map((t) => ({
    name: String(t.name ?? "").trim(),
    weight: String(t.weight ?? "").trim()
  })).filter((t) => t.name || t.weight) : [];
}
function Dp(e) {
  if (!Qa(e)) return null;
  const t = Ce(e), n = vd(e.items), r = {
    type: String(e.type || "snack"),
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Ya(e.healthScore ?? 0)
  };
  return r.name || n.length || Ei(t) ? r : null;
}
function Np(e) {
  if (!Qa(e)) return null;
  const t = Ce(e), n = vd(e.items), r = {
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Ya(e.healthScore ?? 0)
  };
  return r.name || n.length || Ei(t) ? r : null;
}
function Ip(e) {
  return Qa(e) ? {
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
function $p(e, t) {
  return Array.isArray(e) ? e.map(t).filter(Boolean) : [];
}
function kd(e, t) {
  const n = xi(xr(e), []), r = $p(n, t);
  return JSON.stringify(n) !== JSON.stringify(r) && yd(e, JSON.stringify(r)), r;
}
function bp() {
  return kd("myFavorites", Np);
}
function Sd(e, t) {
  return xr(e) || t;
}
function Xa(e) {
  return kd(`record_${e}`, Dp);
}
function Td(e) {
  const t = xr(`weight_${e}`);
  if (!t) return null;
  const n = parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function Pp(e = 30) {
  const t = [], n = /* @__PURE__ */ new Date();
  for (let r = e - 1; r >= 0; r -= 1) {
    const a = /* @__PURE__ */ new Date();
    a.setDate(n.getDate() - r);
    const l = Ct(a);
    t.push({
      date: l.slice(5),
      weight: Td(l)
    });
  }
  return t;
}
function Fp() {
  const e = Ip(xi(xr("myProfile_v5"), null));
  return e ? (yd("myProfile_v5", JSON.stringify(e)), e) : null;
}
function Lp(e = 7) {
  const t = [], n = /* @__PURE__ */ new Date();
  for (let r = e - 1; r >= 0; r -= 1) {
    const a = /* @__PURE__ */ new Date();
    a.setDate(n.getDate() - r);
    const l = Ct(a), o = Xa(l);
    let i = 0;
    o.forEach((u) => {
      var s;
      i += Ya((s = u == null ? void 0 : u.nutri) == null ? void 0 : s.calories);
    }), t.push({ date: l.slice(5), calories: Math.round(i) });
  }
  return t;
}
function zp(e = 7) {
  const t = [], n = /* @__PURE__ */ new Date();
  for (let r = e - 1; r >= 0; r -= 1) {
    const a = /* @__PURE__ */ new Date();
    a.setDate(n.getDate() - r);
    const l = Ct(a), o = Xa(l);
    let i = 0;
    o.forEach((u) => {
      var s;
      i += Ya((s = u == null ? void 0 : u.nutri) == null ? void 0 : s.protein);
    }), t.push({ date: l.slice(5), protein: Math.round(i * 10) / 10 });
  }
  return t;
}
function Rp(e = 7) {
  const t = [], n = /* @__PURE__ */ new Date();
  for (let r = e - 1; r >= 0; r -= 1) {
    const a = /* @__PURE__ */ new Date();
    a.setDate(n.getDate() - r);
    const l = Ct(a);
    t.push({
      date: l,
      label: l.slice(5),
      items: Xa(l)
    });
  }
  return t;
}
function Op() {
  const e = Ct(), t = xi(xr(vp), {});
  return (t == null ? void 0 : t.date) !== e ? { date: e, count: 0 } : {
    date: e,
    count: Number(t.count) || 0
  };
}
function jp(e) {
  return Xa(e);
}
function Da(e = 7) {
  return Lp(e);
}
function Wp(e = 7) {
  return zp(e);
}
function wd(e = 7) {
  return Rp(e);
}
function Hp() {
  return bp();
}
function Bp() {
  return Fp();
}
function Up() {
  return Sd("appLang", "zh-TW");
}
function Gp() {
  return Sd("appTheme", "light");
}
function Kp() {
  return Op();
}
function Vp(e) {
  return Td(e);
}
function Qp(e = 30) {
  return Pp(e);
}
function Yp(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function _d(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const l = Yp(a, t, n);
  if (r === null) return l;
  const o = 10 ** r;
  return Math.round(l * o) / o;
}
function Qu(e) {
  const t = String((e == null ? void 0 : e.name) ?? "").trim(), n = String((e == null ? void 0 : e.weight) ?? "").trim();
  return !t && !n ? null : { name: t, weight: n };
}
function Yu(e) {
  return {
    name: String((e == null ? void 0 : e.name) ?? "").trim(),
    weight: String((e == null ? void 0 : e.weight) ?? "").trim()
  };
}
function Xu(e = []) {
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
  } = t, a = Array.isArray(e.items) ? e.items.map(Qu).filter(Boolean) : r.map(Qu).filter(Boolean), l = Ce(e, {
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
    healthScore: _d(e.healthScore, { max: 10, digits: 1 }),
    items: a
  };
  if (!(Ei(l) || o.items.length > 0))
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
  } = t, o = e.nutri !== void 0 || e.correctionHistory !== void 0, i = Array.isArray(e.items) ? e.items.map(Yu) : r.map(Yu);
  if (o)
    return {
      name: String(e.name || a || n || "").trim() || "Food Analysis",
      nutri: Ce(e.nutri !== void 0 ? e.nutri : e),
      items: i,
      healthScore: _d(e.healthScore, { max: 10, digits: 1 }),
      correctionHistory: Xu(l)
    };
  const u = Xp(e, {
    fallbackName: n,
    fallbackItems: r
  });
  return {
    name: String(a || u.foodName || n || "").trim() || "Food Analysis",
    nutri: Ce(u),
    items: u.items,
    healthScore: u.healthScore,
    correctionHistory: Xu(l)
  };
}
const qu = {
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
}, Cd = {
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
function qa(e = 0, { weightKg: t = 0, goalType: n = "lose" } = {}) {
  const r = Math.max(0, Math.round(K(e))), a = Math.max(0, K(t)), l = Zp(n);
  if (a > 0) {
    const o = Cd[l], i = Math.max(0, Math.round(a * o.proteinPerKg)), u = Math.max(0, Math.round(a * o.fatPerKg)), s = Math.max(r - i * 4 - u * 9, 0);
    return {
      protein: i,
      fat: u,
      carb: Math.round(s / 4),
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
  return Cd[t] ? t : "lose";
}
function Jp(e = "4", t = {}, n = 0) {
  return (qu[String(e)] || qu[4]).map((a) => ({
    ...a,
    title: (t == null ? void 0 : t[a.titleKey]) || a.type,
    suggestedCalories: n > 0 ? Math.round(n * a.ratio) : 0
  }));
}
function Er(e = []) {
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
  const l = K(t), o = qa(l, {
    goalType: r,
    weightKg: a
  }), i = K(e.cal), u = K(e.pro), s = K(e.fiber), g = K(e.sod);
  let p = "steady";
  i <= 0 ? p = "start_logging" : l > 0 && i > l * 1.08 ? p = "over_target" : u < o.protein * 0.65 ? p = "protein_gap" : s > 0 && s < 18 ? p = "fiber_gap" : g > 2300 ? p = "sodium_high" : l > 0 && i >= l * 0.85 && (p = "near_goal");
  const f = [];
  return i <= 0 ? f.push("use_ai", "log_first_meal") : (u < o.protein * 0.85 && f.push("protein_boost"), s < 25 && f.push("fiber_boost"), g > 2300 && f.push("watch_sodium"), l > 0 && i > l * 1.08 && f.push("portion_reset"), f.length === 0 && f.push("keep_momentum")), {
    status: p,
    targetCalories: l,
    calories: i,
    protein: u,
    fiber: s,
    sodium: g,
    remainingCalories: l > 0 ? Math.max(Math.round(l - i), 0) : 0,
    overCalories: l > 0 ? Math.max(Math.round(i - l), 0) : 0,
    proteinGap: Math.max(o.protein - Math.round(u), 0),
    fiberGap: Math.max(25 - Math.round(s), 0),
    tipKeys: [...new Set(f)].slice(0, 3),
    macroGoals: o,
    weekly: eg(n)
  };
}
const Zu = /* @__PURE__ */ new Set();
function ng(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    name: String((t == null ? void 0 : t.name) || ""),
    weight: String((t == null ? void 0 : t.weight) || "")
  })) : [];
}
function rg(e = {}) {
  return Cr(e);
}
function Na(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    type: String((t == null ? void 0 : t.type) || "snack"),
    name: String((t == null ? void 0 : t.name) || ""),
    nutri: rg(t),
    items: ng(t == null ? void 0 : t.items),
    healthScore: Number(t == null ? void 0 : t.healthScore) || 0
  })) : [];
}
function xd(e) {
  return qp(e);
}
function Ed(e) {
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
function Md(e = {}, t = !1) {
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
  const t = String(e.selectedDate || Ct()), n = Ed(e.profile !== void 0 ? e.profile : Bp()), r = String(e.currentMealMode || (n == null ? void 0 : n.mealMode) || "4"), a = String(e.currentGoalType || (n == null ? void 0 : n.goalType) || "lose"), o = Kp().count >= yp;
  return {
    selectedDate: t,
    curLang: String(e.curLang || Up()),
    curTheme: String(e.curTheme || Gp()),
    targetCalories: lg(e.targetCalories, 2e3),
    currentMealMode: r,
    currentGoalType: a,
    loggedWeight: e.loggedWeight ?? Vp(t),
    foodItems: Na(e.foodItems !== void 0 ? e.foodItems : jp(t)),
    favoriteFoods: Na(e.favoriteFoods !== void 0 ? e.favoriteFoods : Hp()),
    tempAIResult: xd(e.tempAIResult),
    tempAIResultSaved: !!e.tempAIResultSaved,
    analysisFlow: Md(e.analysisFlow, o),
    profile: n
  };
}
function ig(e) {
  return Object.freeze({
    ...e,
    foodItems: Na(e.foodItems),
    favoriteFoods: Na(e.favoriteFoods),
    tempAIResult: xd(e.tempAIResult),
    profile: Ed(e.profile),
    analysisFlow: Md(e.analysisFlow),
    updatedAt: Date.now()
  });
}
let ug = og(), Ao = ig(ug);
function Q() {
  return Ao;
}
function sg(e) {
  return typeof e != "function" ? () => {
  } : (Zu.add(e), () => {
    Zu.delete(e);
  });
}
function Ad(e = Ao) {
  var a;
  const t = e || Ao, n = Er(t.foodItems), r = Math.max(0, Number((a = t.profile) == null ? void 0 : a.weight) || 0);
  return {
    selectedDate: t.selectedDate,
    lang: t.curLang,
    goalType: t.currentGoalType,
    targetCalories: Number(t.targetCalories) || 0,
    profileWeight: r,
    waterTarget: Math.round((r || 60) * 35),
    calorieHistory: Da(7),
    foodItems: t.foodItems,
    totals: n.totals,
    mealTotals: n.mealTotals
  };
}
function cg() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofAppStateBridge) || {
    getAppState: Q,
    subscribeAppState: sg
  };
}
function dg() {
  const e = cg();
  return $a.useSyncExternalStore(
    e.subscribeAppState,
    e.getAppState,
    e.getAppState
  );
}
function Xe(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Dd(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function Mr(e = []) {
  return !Array.isArray(e) || e.length === 0 ? 0 : e.reduce((t, n) => t + Xe(n), 0) / e.length;
}
function fg(e = []) {
  if (!Array.isArray(e) || e.length < 2) return 0;
  const t = Mr(e), n = e.reduce((r, a) => {
    const l = Xe(a) - t;
    return r + l * l;
  }, 0) / e.length;
  return Math.sqrt(n);
}
function Nd(e = [], t = 0.45) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  if (e.length === 1) return 60;
  const n = Mr(e);
  if (n <= 0) return 0;
  const r = fg(e) / n;
  return Math.round((1 - Dd(r / t, 0, 1)) * 100);
}
function Mi(e, t) {
  return {
    key: e,
    score: 0,
    status: t,
    loggedDays: 0
  };
}
function mg(e = {}) {
  const t = Array.isArray(e == null ? void 0 : e.items) ? e.items : [], { totals: n, mealTotals: r } = Er(t), a = Math.round(Xe(n.cal)), l = Math.round(Xe(n.pro) * 10) / 10, o = Math.round(Xe(r.breakfast)), i = Math.round(Xe(r.dinner)), u = Math.round(Xe(r.lunch)), s = Math.round(Xe(r.snack)), g = t.length > 0 || a > 0 || l > 0;
  return {
    date: String((e == null ? void 0 : e.date) || ""),
    label: String((e == null ? void 0 : e.label) || (e == null ? void 0 : e.date) || ""),
    logged: g,
    totalCalories: a,
    totalProtein: l,
    breakfastCalories: o,
    lunchCalories: u,
    dinnerCalories: i,
    snackCalories: s,
    dinnerShare: a > 0 ? i / a : 0,
    breakfastLogged: o > 0,
    dinnerLogged: i > 0
  };
}
function pg(e = []) {
  const t = e.filter((i) => i.logged);
  if (t.length === 0)
    return Mi("breakfast", "not_enough_data");
  const n = t.filter((i) => i.breakfastLogged), r = n.length / t.length, a = Nd(
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
function gg(e = []) {
  const t = e.filter((i) => i.logged);
  if (t.length === 0)
    return Mi("dinner", "not_enough_data");
  const n = t.filter((i) => i.dinnerShare >= 0.45), r = Mr(t.map((i) => i.dinnerShare)), a = n.length / t.length, l = Math.round((Dd(r / 0.6, 0, 1) * 0.7 + a * 0.3) * 100);
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
function hg(e = [], t = 0) {
  const n = e.filter((g) => g.logged);
  if (n.length === 0)
    return Mi("protein", "not_enough_data");
  const r = Math.max(0, Xe(t)), a = Math.round(Mr(n.map((g) => g.totalProtein)) * 10) / 10, l = Nd(
    n.map((g) => g.totalProtein),
    0.4
  ), o = r > 0 ? n.filter((g) => g.totalProtein >= r * 0.9).length : 0, i = n.length > 0 ? o / n.length : 0, u = r > 0 ? Math.round((i * 0.6 + l / 100 * 0.4) * 100) : l;
  let s = "inconsistent";
  return n.length < 3 ? s = n.length > 0 ? "building" : "inconsistent" : u >= 70 ? s = "steady" : u >= 45 && (s = "building"), {
    key: "protein",
    score: u,
    status: s,
    loggedDays: n.length,
    targetDays: o,
    averageProtein: a,
    proteinTarget: r
  };
}
function yg(e = 7) {
  return {
    key: "hydration",
    score: null,
    status: "placeholder",
    available: !1,
    windowSize: e,
    trackedDays: 0
  };
}
function vg({ dayLogs: e = [], proteinTarget: t = 0 } = {}) {
  const n = Array.isArray(e) ? e.map(mg) : [], r = n.filter((s) => s.logged), a = pg(n), l = gg(n), o = hg(n, t), i = yg(n.length || 7);
  let u = "start_logging";
  return r.length >= 3 ? a.status === "irregular" ? u = "breakfast_anchor" : l.status === "heavy" ? u = "dinner_balance" : o.status === "inconsistent" ? u = "protein_rhythm" : a.status === "building" || o.status === "building" ? u = "building_consistency" : u = "steady_week" : r.length > 0 && (u = "building_consistency"), {
    windowSize: n.length || 7,
    loggedDays: r.length,
    focus: u,
    breakfast: a,
    dinner: l,
    protein: o,
    hydration: i,
    days: n
  };
}
function Id(e = Q(), { days: t = 7 } = {}) {
  var u, s;
  const n = e || Q(), r = Math.max(0, Number((u = n == null ? void 0 : n.profile) == null ? void 0 : u.weight) || 0), a = Math.max(0, Number(n == null ? void 0 : n.targetCalories) || 0), l = String((n == null ? void 0 : n.currentGoalType) || ((s = n == null ? void 0 : n.profile) == null ? void 0 : s.goalType) || "lose"), o = qa(a, {
    weightKg: r,
    goalType: l
  }), i = vg({
    dayLogs: wd(t),
    proteinTarget: o.protein
  });
  return {
    ...i,
    proteinTarget: o.protein,
    lang: (n == null ? void 0 : n.curLang) || "en",
    hasData: i.loggedDays > 0
  };
}
function kg(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Ot(e, t = "en", n = "en") {
  if (typeof e == "string") return e;
  if (!kg(e)) return "";
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
function bd(e) {
  return String(Array.isArray(e) ? e[0] : e || "").trim();
}
function Ai(e) {
  return Ce(e, {
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
function Sg(e = {}) {
  return Object.fromEntries(Mn.map((t) => {
    const n = Number(e == null ? void 0 : e[t]);
    return [t, Number.isFinite(n) ? n : 0];
  }));
}
function Tg(e, t = 1) {
  const n = Number(t), r = Number.isFinite(n) ? n : 1, a = Cr(e);
  return Ai(Object.fromEntries(
    Mn.map((l) => [l, a[l] * r])
  ));
}
function wg(e, t = {}) {
  const n = Cr(e), r = Sg(t);
  return Ai(Object.fromEntries(
    Mn.map((a) => [a, n[a] + r[a]])
  ));
}
function Ju(e, t) {
  return {
    name: Ot(e == null ? void 0 : e.name, t) || "Item",
    weight: String((e == null ? void 0 : e.weight) || "").trim()
  };
}
function _g(e = {}) {
  const t = Array.isArray(e.options) ? e.options : [];
  if (e.selectionType === "multi")
    return t.filter((a) => a == null ? void 0 : a.default).map((a) => String(a.id || "").trim()).filter(Boolean);
  const r = t.find((a) => a == null ? void 0 : a.default) || t[0];
  return r != null && r.id ? [String(r.id).trim()] : [];
}
function Pd(e, t = {}) {
  const n = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  return Object.fromEntries(n.map((r) => {
    const a = String((r == null ? void 0 : r.id) || "").trim(), l = t == null ? void 0 : t[a], o = _g(r);
    if (r.selectionType === "multi") {
      const u = $d(l);
      return [a, u.length > 0 ? u : o];
    }
    const i = bd(l);
    return [a, i || o[0] || ""];
  }));
}
function Cg(e, t) {
  const n = Array.isArray(e == null ? void 0 : e.options) ? e.options : [];
  if ((e == null ? void 0 : e.selectionType) === "multi") {
    const a = new Set($d(t));
    return n.filter((l) => a.has(String((l == null ? void 0 : l.id) || "").trim()));
  }
  const r = bd(t);
  return n.filter((a) => String((a == null ? void 0 : a.id) || "").trim() === r);
}
function xg(e = [], t = [], n = "en") {
  return [
    ...Array.isArray(e) ? e.map((r) => Ju(r, n)) : [],
    ...Array.isArray(t) ? t.map((r) => Ju(r, n)) : []
  ];
}
function Eg(e, t = {}) {
  const n = String(t.lang || "en"), r = Pd(e, t.selectedModifiers), a = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  let l = Cr((e == null ? void 0 : e.nutrition) || wp()), o = [];
  const i = [], u = [];
  a.forEach((p) => {
    Cg(p, r[p.id]).forEach((h) => {
      const v = (h == null ? void 0 : h.effect) || {};
      v.nutritionMultiplier !== void 0 && (l = Tg(l, v.nutritionMultiplier)), v.nutritionDelta && (l = wg(l, v.nutritionDelta));
      const S = Array.isArray(v.items) ? v.items : v.item ? [v.item] : [];
      S.length > 0 && (o = [...o, ...S]);
      const b = Ot(h == null ? void 0 : h.label, n) || (h == null ? void 0 : h.id) || "";
      i.push({
        groupId: String((p == null ? void 0 : p.id) || "").trim(),
        optionId: String((h == null ? void 0 : h.id) || "").trim(),
        label: b,
        selectionType: (p == null ? void 0 : p.selectionType) === "multi" ? "multi" : "single"
      }), h != null && h.includeInName && u.push(Ot((h == null ? void 0 : h.nameLabel) || (h == null ? void 0 : h.label), n));
    });
  });
  const s = Ot(e == null ? void 0 : e.name, n) || "Preset Meal", g = u.filter(Boolean).join(", ");
  return {
    id: String((e == null ? void 0 : e.id) || "").trim(),
    region: String((e == null ? void 0 : e.region) || "").trim(),
    name: g ? `${s} (${g})` : s,
    suggestedMealType: String((e == null ? void 0 : e.suggestedMealType) || "snack"),
    nutrition: Ai(l),
    items: xg(e == null ? void 0 : e.items, o, n),
    appliedModifiers: i,
    selectedModifiers: r
  };
}
function Mg(e, t = "en") {
  return Ot(e == null ? void 0 : e.name, t) || String((e == null ? void 0 : e.id) || "Preset Meal");
}
function Ag(e, t = "en") {
  return Ot(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Modifier");
}
function Dg(e, t = "en") {
  return Ot(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Option");
}
function Ng(e = "zh-TW") {
  return String(e || "zh-TW").toLowerCase().startsWith("en") ? "singapore" : "taiwan";
}
const Di = Object.freeze([
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
function Ig(e = {}) {
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
function Fd(e = {}) {
  return {
    ...e,
    nutrition: { ...e.nutrition || {} },
    items: Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [],
    modifierGroups: Array.isArray(e.modifierGroups) ? e.modifierGroups.map((t) => ({
      ...t,
      options: Array.isArray(t.options) ? t.options.map(Ig) : []
    })) : []
  };
}
function $g() {
  return Di.map(Fd);
}
function bg(e) {
  const t = String(e || "").trim(), n = Di.find((r) => r.id === t);
  return n ? Fd(n) : null;
}
function Pg() {
  return [...new Set(Di.map((e) => String(e.region || "").trim()).filter(Boolean))];
}
const Fg = Object.freeze({
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
function Lg(e = "en") {
  return String(e || "en").split("-")[0];
}
function zg(e, t = "en") {
  const n = Fg[e] || {};
  return n[t] || n[Lg(t)] || n.en || e;
}
function Rg(e = "zh-TW") {
  return Ng(e);
}
function Og(e = "en") {
  return Pg().map((t) => ({
    id: t,
    label: zg(t, e)
  }));
}
function jg(e = "", t = "en") {
  const n = String(e || "").trim();
  return $g().filter((r) => !n || r.region === n).map((r) => ({
    id: r.id,
    region: r.region,
    label: Mg(r, t),
    suggestedMealType: r.suggestedMealType
  }));
}
function Wg({
  lang: e = "en",
  region: t = "",
  profileRegion: n = "",
  presetId: r = "",
  selectedModifiers: a = {}
} = {}) {
  var p;
  const l = t || String(n || "").trim() || Rg(e), o = jg(l, e), i = r && o.some((f) => f.id === r) ? r : ((p = o[0]) == null ? void 0 : p.id) || "", u = bg(i), s = u ? Pd(u, a) : {}, g = u ? Eg(u, {
    lang: e,
    selectedModifiers: s
  }) : null;
  return {
    regions: Og(e),
    selectedRegion: l,
    presets: o,
    selectedPresetId: i,
    modifierGroups: Array.isArray(u == null ? void 0 : u.modifierGroups) ? u.modifierGroups.map((f) => ({
      id: f.id,
      label: Ag(f, e),
      selectionType: f.selectionType === "multi" ? "multi" : "single",
      selectedValue: s[f.id] ?? (f.selectionType === "multi" ? [] : ""),
      options: (f.options || []).map((h) => ({
        id: h.id,
        label: Dg(h, e),
        selected: f.selectionType === "multi" ? (s[f.id] || []).includes(h.id) : s[f.id] === h.id
      }))
    })) : [],
    resolvedPreset: g
  };
}
const El = [
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
], Hg = Object.freeze([
  "petInteractMsg1",
  "petInteractMsg2",
  "petInteractMsg3",
  "petInteractMsg4",
  "petInteractMsg5"
]);
function Se(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function er(e, t = 0, n = 100) {
  return Math.min(Math.max(e, t), n);
}
function Ld(e = {}) {
  const t = Math.max(0, Math.round(Se(e == null ? void 0 : e.xp))), n = Math.floor(t / 100) + 1;
  return {
    level: Math.max(1, Math.round(Se(e == null ? void 0 : e.level, n)) || n),
    xp: t,
    mood: String((e == null ? void 0 : e.mood) || "hungry"),
    energy: er(Math.round(Se(e == null ? void 0 : e.energy))),
    bond: er(Math.round(Se(e == null ? void 0 : e.bond))),
    streak: Math.max(0, Math.round(Se(e == null ? void 0 : e.streak)))
  };
}
function Bg(e = []) {
  var n;
  if (!Array.isArray(e) || e.length === 0) return 0;
  let t = 0;
  for (let r = e.length - 1; r >= 0 && !(Se((n = e[r]) == null ? void 0 : n.calories) <= 0); r -= 1)
    t += 1;
  return t;
}
function Ug({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0
} = {}) {
  const l = Math.max(0, Se(e)), o = Math.max(0, Se(t)), i = o > 0 ? Math.min(l / o, 1.4) : 0, u = Math.max(0, Math.round(Se(n))), s = Math.max(0, Math.round(Se(r))), g = er(Math.round(Se(a))), p = er(Math.round(i * 90) + Math.min(u, 5) * 2), f = Math.round(Math.min(i, 1.1) * 80) + Math.min(u, 5) * 10 + Math.min(s, 7) * 5, h = Math.floor(f / 100) + 1, v = er(g + Math.min(s, 7) * 5 + Math.min(u, 5) * 3);
  return Ld({
    level: h,
    xp: f,
    mood: "hungry",
    energy: p,
    bond: v,
    streak: s
  });
}
function Gg({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0
} = {}) {
  const l = Math.max(0, Se(e)), o = Math.max(0, Se(t, 2e3)) || 2e3, i = Math.min(l / o, 1.4), u = El.find((g) => i >= g.minRatio) || El[El.length - 1], s = Ug({
    totalCalories: l,
    targetCalories: o,
    loggedMeals: n,
    streak: r,
    bond: a
  });
  return {
    key: u.key,
    ratio: i,
    frameKey: u.frameKey,
    messageKey: u.messageKey,
    mood: u.mood,
    progress: Ld({
      ...s,
      mood: u.mood
    })
  };
}
function Kg(e = Q()) {
  var s;
  const t = Er((e == null ? void 0 : e.foodItems) || []), n = Da(7), r = Number(e == null ? void 0 : e.targetCalories) || 0, a = Math.max(0, Number((s = e == null ? void 0 : e.profile) == null ? void 0 : s.weight) || 0), l = (e == null ? void 0 : e.currentGoalType) || "lose", o = tg({
    total: t.totals,
    targetCalories: r,
    calorieHistory: n,
    goalType: l,
    weightKg: a
  }), i = Bg(n), u = Gg({
    totalCalories: t.totals.cal,
    targetCalories: r,
    loggedMeals: Array.isArray(e == null ? void 0 : e.foodItems) ? e.foodItems.length : 0,
    streak: i
  });
  return {
    totals: t.totals,
    coach: o,
    calorieHistory: n,
    statusKey: u.key,
    frameKey: u.frameKey,
    messageKey: u.messageKey,
    progress: u.progress,
    interactionMessageKeys: Hg
  };
}
function bt(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Vg(e = []) {
  const t = Array.isArray(e) ? e : [];
  if (t.length === 0)
    return Ce();
  const n = t.reduce((r, a) => {
    const l = Ce(a);
    return Object.keys(r).forEach((o) => {
      r[o] += Number(l[o]) || 0;
    }), r;
  }, Ce());
  return Object.fromEntries(
    Object.keys(n).map((r) => {
      const a = n[r] / t.length;
      return [r, r === "calories" || r === "sodium" ? Math.round(a) : bt(a)];
    })
  );
}
function Qg({
  todayNutrition: e = {},
  nutritionHistory: t = [],
  proteinTarget: n = 0,
  fiberTarget: r = 25,
  sodiumLimit: a = 2300
} = {}) {
  const l = Ce(e), o = (Array.isArray(t) ? t : []).map((f) => Ce(f)).filter((f) => Object.values(f).some((h) => Number(h) > 0)), i = Vg(o), u = Math.max(0, bt(n)), s = Math.max(0, bt(r)), g = Math.max(0, Math.round(Number(a) || 0));
  let p = "balanced";
  return o.length === 0 && l.calories <= 0 ? p = "start_logging" : u > 0 && l.protein < u * 0.72 ? p = "protein" : l.fiber < Math.max(s * 0.72, 12) ? p = "fiber" : g > 0 && l.sodium > g && (p = "sodium"), {
    focusKey: p,
    loggedDays: o.length,
    averageNutrition: i,
    proteinTarget: u,
    fiberTarget: s,
    sodiumLimit: g,
    signals: [
      {
        key: "protein",
        current: bt(l.protein),
        target: u,
        average: bt(i.protein)
      },
      {
        key: "fiber",
        current: bt(l.fiber),
        target: s,
        average: bt(i.fiber)
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
function Nt(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function zd(e = {}) {
  return Cr({
    calories: Math.round(Number(e.cal) || 0),
    protein: Nt(e.pro),
    fat: Nt(e.fat),
    carbohydrate: Nt(e.carb),
    sugar: Nt(e.sugar),
    sodium: Math.round(Number(e.sod) || 0),
    saturatedFat: Nt(e.sat),
    transFat: Nt(e.trans),
    fiber: Nt(e.fiber)
  });
}
function Yg(e = 7) {
  return wd(e).map((t) => {
    const n = Er((t == null ? void 0 : t.items) || []);
    return zd(n.totals);
  }).filter((t) => Object.values(t).some((n) => Number(n) > 0));
}
function Xg(e = Q(), { days: t = 7 } = {}) {
  var i, u;
  const n = e || Q(), r = Ad(n), a = zd(r.totals), l = Math.max(0, Number((i = n == null ? void 0 : n.profile) == null ? void 0 : i.weight) || 0), o = qa(r.targetCalories, {
    weightKg: l,
    goalType: (n == null ? void 0 : n.currentGoalType) || ((u = n == null ? void 0 : n.profile) == null ? void 0 : u.goalType) || "lose"
  });
  return {
    days: t,
    nutrition: a,
    ...Qg({
      todayNutrition: a,
      nutritionHistory: Yg(t),
      proteinTarget: o.protein,
      fiberTarget: 25,
      sodiumLimit: 2300
    })
  };
}
function qg(e = Q()) {
  return Er((e == null ? void 0 : e.foodItems) || []);
}
function Zg(e = Q(), { range: t = 7, weightDays: n = 30 } = {}) {
  const r = qg(e);
  return {
    totals: r.totals,
    mealTotals: r.mealTotals,
    weeklyCalories: Da(7),
    calorieTrend: Da(t),
    proteinTrend: Wp(t),
    weightTrend: Qp(n),
    mealRhythm: Id(e, { days: 7 }),
    nutritionFocus: Xg(e, { days: 7 })
  };
}
function es(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Jg(e, t) {
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
function eh(e = Q()) {
  var v, S, b, d, c, m, y, w;
  const t = e || Q(), n = Ad(t), r = Kg(t), a = Id(t, { days: 7 }), l = Math.max(0, Number((v = t == null ? void 0 : t.profile) == null ? void 0 : v.weight) || 0), o = qa(n.targetCalories, {
    weightKg: l,
    goalType: (t == null ? void 0 : t.currentGoalType) || ((S = t == null ? void 0 : t.profile) == null ? void 0 : S.goalType) || "lose"
  }), i = Math.max(0, Number(o.protein) || 0), u = es(n.totals.pro, 1), s = Math.max(0, es(i - u, 1)), g = Jg(t, n), p = Math.round(Math.max(0, (n.targetCalories || 0) - (n.totals.cal || 0))), f = Wg({
    lang: (t == null ? void 0 : t.curLang) || "en",
    profileRegion: ((b = t == null ? void 0 : t.profile) == null ? void 0 : b.region) || ""
  }), h = (f.regions || []).find((M) => M.id === f.selectedRegion);
  return {
    lang: (t == null ? void 0 : t.curLang) || "en",
    goalType: (t == null ? void 0 : t.currentGoalType) || ((d = t == null ? void 0 : t.profile) == null ? void 0 : d.goalType) || "lose",
    diningOutFrequency: String(((c = t == null ? void 0 : t.profile) == null ? void 0 : c.diningOutFrequency) || "sometimes"),
    targetCalories: n.targetCalories,
    remainingCalories: p,
    calorieProgressPercent: n.targetCalories > 0 ? Math.min(Math.round(n.totals.cal / n.targetCalories * 100), 199) : 0,
    presetRegion: f.selectedRegion,
    presetRegionLabel: (h == null ? void 0 : h.label) || f.selectedRegion || "",
    presetCount: ((m = f.presets) == null ? void 0 : m.length) || 0,
    featuredPresetName: ((w = (y = f.presets) == null ? void 0 : y[0]) == null ? void 0 : w.label) || "",
    proteinTarget: i,
    proteinCurrent: u,
    proteinRemaining: s,
    mealCoverage: g,
    daily: n,
    pet: r,
    rhythm: a
  };
}
const th = {
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
  navDaily: "الرئيسية",
  navDashboard: "تحليلات",
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
}, nh = {
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
  navDaily: "Home",
  navDashboard: "Insights",
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
}, rh = {
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
  navDaily: "ホーム",
  navDashboard: "分析",
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
}, ah = {
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
  navDaily: "홈",
  navDashboard: "인사이트",
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
}, lh = {
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
  navDaily: "首页",
  navDashboard: "洞察",
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
}, oh = {
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
  navDaily: "首頁",
  navDashboard: "洞察",
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
}, Do = {
  "zh-TW": oh,
  "zh-CN": lh,
  en: nh,
  ja: rh,
  ko: ah,
  ar: th
}, ih = {
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
}, Ml = /* @__PURE__ */ new Map();
function Al(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Rd(e, t) {
  const n = { ...e };
  return Al(t) && Object.entries(t).forEach(([r, a]) => {
    if (Al(a) && Al(e[r])) {
      n[r] = Rd(e[r], a);
      return;
    }
    a != null && (n[r] = a);
  }), n;
}
function Ni(e = "zh-TW") {
  const t = String(e || "zh-TW");
  if (!Ml.has(t)) {
    const n = Rd(
      ih,
      Do[t] || Do.en || {}
    );
    Ml.set(t, n);
  }
  return Ml.get(t);
}
Object.freeze(Object.keys(Do));
const tr = {
  en: {
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
    logHubCopyEmpty: "Choose a quick path first. Common foods and favorites stay close, while advanced entry moves to a secondary flow.",
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
    todayMealsHint: "Your meal sections stay visible here, so you can see what is still missing without opening another flow.",
    overviewTitle: "Today at a glance",
    overviewHint: "Tap for the full nutrition details",
    signals: {
      protein: "Protein pace",
      meals: "Meal rhythm"
    },
    signalProteinToGoal: (e) => `${e}g to today's goal`,
    signalProteinOnTrack: "On a steady protein pace",
    signalMealsEmpty: "One meal log is enough to start today's rhythm.",
    signalMealsActive: (e, t, n) => e < t && n ? `${e}/${t} key meal moments logged. ${n} can be the next anchor.` : `${e} meal moments logged today.`,
    statLabels: {
      streak: "Streak",
      meals: "Meals",
      protein: "Protein"
    },
    formatDayCount: (e) => `${e}d`,
    formatMealCoverage: (e, t) => `${e}/${t}`,
    formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`
  },
  "zh-TW": {
    heroEyebrowEmpty: "汪卡今日陪伴",
    heroEyebrowActive: "今天和汪汪一起",
    heroTitleEmpty: "先記下今天的第一餐",
    heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今天已經有 ${e}/${t} 段餐次就位`,
    heroSummaryBase: "常見外食、收藏與 AI 都會在這裡陪你輕鬆記下今天。",
    heroSummaryActive: "下一筆繼續輕快記下，今天的節奏就會更容易維持。",
    heroActionLog: "新增記錄",
    heroActionCommonFoods: "常用外食",
    heroActionManual: "手動輸入",
    heroActionFavorites: "常吃食物",
    logHubTitle: "記錄今天飲食",
    logHubCopyEmpty: "先選一個輕量簡單的方式，詳細手動輸入留到次要流程。",
    logHubCopyActive: "這裡先快速補下一餐，需要調整時再進入進階輸入。",
    logHubFavoritesButton: "常吃食物",
    logHubFavoritesCopy: "從你平常儲存的食物裡選一筆快速加回今天。",
    logHubManualButton: "手動輸入",
    logHubManualCopy: "真的需要自訂食物或營養時，再打開完整輸入。",
    mealListTitle: "今天的餐次",
    commonFoodsTitle: "常用外食",
    commonFoodsHint: "先選一個熟悉的外食餐點，想調整份量或加料時再往下改。",
    commonFoodsMeta: (e) => `${e} 推薦`,
    commonFoodsButton: "直接加入今天",
    manualAdvancedTitle: "進階手動輸入",
    manualModalTitle: "手動輸入",
    manualModalHint: "需要自訂食物或手動調整營養時，再到這裡輸入。",
    todayMealsKicker: "今日日記",
    todayMealsTitle: "今天餐次",
    todayMealsHint: "今天吃過的內容直接排在這裡，很快就能看出哪一餐還沒記。",
    overviewTitle: "今天先看這兩個重點",
    overviewHint: "點擊可看完整營養資訊",
    signals: {
      protein: "蛋白質節奏",
      meals: "餐次節奏"
    },
    signalProteinToGoal: (e) => `距離今天的蛋白質目標還差 ${e}g`,
    signalProteinOnTrack: "今天的蛋白質節奏算穩",
    signalMealsEmpty: "先記下一餐，今天的節奏就會開始浮現。",
    signalMealsActive: (e, t, n) => e < t && n ? `已經記下 ${e}/${t} 段關鍵餐次，下一個可以先補 ${n}。` : `今天已經記下 ${e} 段餐次。`,
    statLabels: {
      streak: "連續",
      meals: "餐次",
      protein: "蛋白質"
    },
    formatDayCount: (e) => `${e} 天`,
    formatMealCoverage: (e, t) => `${e}/${t}`,
    formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`
  },
  "zh-CN": {
    heroEyebrowEmpty: "汪卡今日陪伴",
    heroEyebrowActive: "今天和汪汪一起",
    heroTitleEmpty: "先记下今天的第一餐",
    heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今天已经有 ${e}/${t} 段餐次就位`,
    heroSummaryBase: "常见外食、收藏与 AI 都会在这里陪你轻松记下今天。",
    heroSummaryActive: "下一笔继续轻快记下，今天的节奏就会更容易维持。",
    heroActionLog: "新增记录",
    heroActionCommonFoods: "常用外食",
    heroActionManual: "手动输入",
    heroActionFavorites: "常吃食物",
    logHubTitle: "记录今天饮食",
    logHubCopyEmpty: "先选一个轻量简单的方式，详细手动输入留到次要流程。",
    logHubCopyActive: "这里先快速补下一餐，需要调整时再进入进阶输入。",
    logHubFavoritesButton: "常吃食物",
    logHubFavoritesCopy: "从你平常保存的食物里选一笔快速加回今天。",
    logHubManualButton: "手动输入",
    logHubManualCopy: "真的需要自定义食物或营养时，再打开完整输入。",
    mealListTitle: "今天的餐次",
    commonFoodsTitle: "常用外食",
    commonFoodsHint: "先选一个熟悉的外食餐点，想调整份量或加料时再往下改。",
    commonFoodsMeta: (e) => `${e} 推荐`,
    commonFoodsButton: "直接加入今天",
    manualAdvancedTitle: "进阶手动输入",
    manualModalTitle: "手动输入",
    manualModalHint: "需要自定义食物或手动调整营养时，再到这里输入。",
    todayMealsKicker: "今日日记",
    todayMealsTitle: "今天餐次",
    todayMealsHint: "今天吃过的内容直接排在这里，很快就能看出哪一餐还没记。",
    overviewTitle: "今天先看这两个重点",
    overviewHint: "点击可看完整营养信息",
    signals: {
      protein: "蛋白质节奏",
      meals: "餐次节奏"
    },
    signalProteinToGoal: (e) => `距离今天的蛋白质目标还差 ${e}g`,
    signalProteinOnTrack: "今天的蛋白质节奏算稳",
    signalMealsEmpty: "先记下一餐，今天的节奏就会开始浮现。",
    signalMealsActive: (e, t, n) => e < t && n ? `已经记下 ${e}/${t} 段关键餐次，下一个可以先补 ${n}。` : `今天已经记下 ${e} 段餐次。`,
    statLabels: {
      streak: "连续",
      meals: "餐次",
      protein: "蛋白质"
    },
    formatDayCount: (e) => `${e} 天`,
    formatMealCoverage: (e, t) => `${e}/${t}`,
    formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`
  },
  ja: {
    heroEyebrowEmpty: "今日の相棒",
    heroEyebrowActive: "今日はワンちゃんと一緒",
    heroTitleEmpty: "今日の最初の一食を記録しよう",
    heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `今日は ${e}/${t} 回の食事が入っています`,
    heroSummaryBase: "よく食べる外食、保存した食事、AI 解析がここで今日を支えます。",
    heroSummaryActive: "次の一食も軽く記録して、今日の流れを保ちましょう。",
    heroActionLog: "食事を追加",
    heroActionCommonFoods: "よく食べる外食",
    heroActionManual: "手入力",
    heroActionFavorites: "お気に入り",
    logHubTitle: "今日の食事を記録",
    logHubCopyEmpty: "まずは軽い方法から。詳しい手入力は次の画面に回せます。",
    logHubCopyActive: "ここでは素早く追加して、細かな調整は必要なときだけ行いましょう。",
    logHubFavoritesButton: "お気に入り",
    logHubFavoritesCopy: "よく使う食事をすぐに追加できます。",
    logHubManualButton: "手入力",
    logHubManualCopy: "食事や栄養を自分で細かく入力したいときだけ使います。",
    mealListTitle: "今日の食事",
    commonFoodsTitle: "よく食べる外食",
    commonFoodsHint: "まずはいつもの外食を選んで、量や追加項目は必要なときだけ調整します。",
    commonFoodsMeta: (e) => `${e} の候補`,
    commonFoodsButton: "今日に追加",
    manualAdvancedTitle: "詳細な手入力",
    manualModalTitle: "手入力",
    manualModalHint: "食事を自分で入力したいときだけ開きます。",
    todayMealsKicker: "今日の記録",
    todayMealsTitle: "今日の食事",
    todayMealsHint: "今日食べたものがここにまとまり、抜けている食事も見つけやすくなります。",
    overviewTitle: "今日はこの 2 点を先に確認",
    overviewHint: "タップして詳しい栄養を見る",
    signals: {
      protein: "たんぱく質の流れ",
      meals: "食事リズム"
    },
    signalProteinToGoal: (e) => `今日の目標まであと ${e}g`,
    signalProteinOnTrack: "たんぱく質の流れは安定しています",
    signalMealsEmpty: "まず一食記録すると、今日の流れが見え始めます。",
    signalMealsActive: (e, t, n) => e < t && n ? `${e}/${t} 回の食事を記録済み。次は ${n} が目安です。` : `今日は ${e} 回の食事を記録しています。`,
    statLabels: {
      streak: "連続",
      meals: "食事",
      protein: "たんぱく質"
    },
    formatDayCount: (e) => `${e}日`,
    formatMealCoverage: (e, t) => `${e}/${t}`,
    formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`
  },
  ko: {
    heroEyebrowEmpty: "오늘의 반려",
    heroEyebrowActive: "오늘은 강아지와 함께",
    heroTitleEmpty: "오늘의 첫 식사를 기록해 보세요",
    heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `오늘 ${e}/${t}번의 식사가 기록되었습니다`,
    heroSummaryBase: "자주 먹는 외식, 즐겨찾기, AI가 오늘 기록을 가볍게 도와줍니다.",
    heroSummaryActive: "다음 식사도 가볍게 기록해 오늘 흐름을 유지하세요.",
    heroActionLog: "식사 추가",
    heroActionCommonFoods: "자주 먹는 외식",
    heroActionManual: "수동 입력",
    heroActionFavorites: "즐겨찾기",
    logHubTitle: "오늘 식사 기록",
    logHubCopyEmpty: "먼저 가벼운 방법을 선택하고, 자세한 수동 입력은 다음 단계로 넘기세요.",
    logHubCopyActive: "여기서는 빠르게 추가하고, 자세한 수정은 필요할 때만 여세요.",
    logHubFavoritesButton: "즐겨찾기",
    logHubFavoritesCopy: "자주 저장한 음식을 바로 다시 추가할 수 있습니다.",
    logHubManualButton: "수동 입력",
    logHubManualCopy: "음식이나 영양을 직접 세부 입력할 때만 사용하세요.",
    mealListTitle: "오늘의 식사",
    commonFoodsTitle: "자주 먹는 외식",
    commonFoodsHint: "익숙한 외식 메뉴를 먼저 고르고, 양이나 추가 항목은 필요할 때만 조정하세요.",
    commonFoodsMeta: (e) => `${e} 추천`,
    commonFoodsButton: "오늘에 추가",
    manualAdvancedTitle: "고급 수동 입력",
    manualModalTitle: "수동 입력",
    manualModalHint: "음식이나 영양을 직접 입력하고 싶을 때만 엽니다.",
    todayMealsKicker: "오늘 기록",
    todayMealsTitle: "오늘 식사",
    todayMealsHint: "오늘 먹은 내용이 여기 모여 있어 빠진 끼니를 확인하기 쉽습니다.",
    overviewTitle: "오늘은 이 두 가지를 먼저 보세요",
    overviewHint: "눌러서 자세한 영양 보기",
    signals: {
      protein: "단백질 흐름",
      meals: "식사 리듬"
    },
    signalProteinToGoal: (e) => `오늘 목표까지 ${e}g 남음`,
    signalProteinOnTrack: "단백질 흐름은 안정적입니다",
    signalMealsEmpty: "한 끼만 기록해도 오늘의 흐름이 보이기 시작합니다.",
    signalMealsActive: (e, t, n) => e < t && n ? `${e}/${t}번의 핵심 식사를 기록했습니다. 다음은 ${n}이 기준점입니다.` : `오늘 ${e}번의 식사를 기록했습니다.`,
    statLabels: {
      streak: "연속",
      meals: "식사",
      protein: "단백질"
    },
    formatDayCount: (e) => `${e}일`,
    formatMealCoverage: (e, t) => `${e}/${t}`,
    formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`
  },
  ar: {
    heroEyebrowEmpty: "رفيق ووف كال",
    heroEyebrowActive: "اليوم مع كلبك",
    heroTitleEmpty: "ابدأ بتسجيل أول وجبة اليوم",
    heroTitleActive: ({ loggedMeals: e, plannedMeals: t }) => `تم تسجيل ${e}/${t} من لحظات الوجبات اليوم`,
    heroSummaryBase: "الأكلات الشائعة والمفضلة و AI قريبة منك لتسجيل يومك بسهولة.",
    heroSummaryActive: "أضف الوجبة التالية بخفة ليبقى إيقاع اليوم واضحًا وسهل المراجعة.",
    heroActionLog: "أضف وجبة",
    heroActionCommonFoods: "أكلات شائعة",
    heroActionManual: "إدخال يدوي",
    heroActionFavorites: "المفضلة",
    logHubTitle: "سجّل وجبات اليوم",
    logHubCopyEmpty: "ابدأ بمسار سريع أولًا، واترك الإدخال التفصيلي للخطوة الثانوية.",
    logHubCopyActive: "حافظ على التسجيل سهلًا من هنا، واترك التعديل التفصيلي للوقت الذي تحتاجه فقط.",
    logHubFavoritesButton: "المفضلة",
    logHubFavoritesCopy: "اختر من الأطعمة التي تحفظها كثيرًا.",
    logHubManualButton: "إدخال يدوي",
    logHubManualCopy: "استخدمه فقط عندما تريد كتابة طعام أو تغذية مخصصة.",
    mealListTitle: "وجبات اليوم",
    commonFoodsTitle: "أكلات شائعة",
    commonFoodsHint: "ابدأ بطبق خارجي مألوف، وافتح التعديل فقط عندما تريد تغيير الكمية أو الإضافات.",
    commonFoodsMeta: (e) => `اقتراحات ${e}`,
    commonFoodsButton: "أضف هذا الطعام إلى اليوم",
    manualAdvancedTitle: "إدخال يدوي متقدم",
    manualModalTitle: "إدخال الوجبة يدويًا",
    manualModalHint: "استخدم هذا عندما تريد كتابة طعام مخصص أو تعديل التغذية بنفسك.",
    todayMealsKicker: "مذكرات اليوم",
    todayMealsTitle: "وجبات اليوم",
    todayMealsHint: "تبقى أقسام الوجبات ظاهرة هنا حتى ترى ما الذي ما زال ناقصًا بدون فتح مسار آخر.",
    overviewTitle: "لمحة سريعة عن اليوم",
    overviewHint: "اضغط لعرض التفاصيل الغذائية الكاملة",
    signals: {
      protein: "إيقاع البروتين",
      meals: "إيقاع الوجبات"
    },
    signalProteinToGoal: (e) => `تبقّى ${e}g لهدف اليوم`,
    signalProteinOnTrack: "إيقاع البروتين مستقر",
    signalMealsEmpty: "تسجيل وجبة واحدة يكفي لبدء إيقاع اليوم.",
    signalMealsActive: (e, t, n) => e < t && n ? `تم تسجيل ${e}/${t} من لحظات الوجبات الأساسية. يمكن أن تكون ${n} المحطة التالية.` : `تم تسجيل ${e} من الوجبات اليوم.`,
    statLabels: {
      streak: "الاستمرارية",
      meals: "الوجبات",
      protein: "البروتين"
    },
    formatDayCount: (e) => `${e} يوم`,
    formatMealCoverage: (e, t) => `${e}/${t}`,
    formatProteinPace: (e, t) => t > 0 ? `${e}/${t}g` : `${e}g`
  }
};
function uh(e = "en") {
  return tr[e] || tr[String(e || "en").split("-")[0]] || tr.en;
}
function sh(e = "en") {
  return !!(tr[e] || tr[String(e || "en").split("-")[0]]);
}
const ch = {
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
}, dh = {
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
}, fh = {
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
}, mh = {
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
}, ph = {
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
}, Dl = {
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
  "zh-TW": ch,
  "zh-CN": dh,
  ja: fh,
  ko: mh,
  ar: ph
};
function gh(e = "en") {
  return Dl[e] || Dl[String(e || "en").split("-")[0]] || Dl.en;
}
const hh = {
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
}, yh = {
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
}, vh = {
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
}, kh = {
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
}, Sh = {
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
}, No = {
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
  "zh-TW": hh,
  "zh-CN": yh,
  ja: vh,
  ko: kh,
  ar: Sh
};
function Ii(e, t = Q().curLang) {
  var n;
  return ((n = No[t]) == null ? void 0 : n[e]) || No.en[e];
}
function Od(e = Q().curLang) {
  return Ii("extra", e);
}
function Th(e = Q().curLang) {
  return Ii("goal", e);
}
function wh(e = Q().curLang) {
  return Ii("rhythm", e);
}
function _h(e = Q().curLang) {
  return gh(e);
}
function Ch(e = "lose", t = Q().curLang) {
  var r, a;
  const n = Th(t);
  return ((r = n.goalTypes) == null ? void 0 : r[e]) || ((a = n.goalTypes) == null ? void 0 : a.lose) || No.en.goal.goalTypes.lose;
}
function xh(e, t = Q().curLang) {
  var p, f, h, v, S, b, d, c, m, y, w;
  const n = uh(t), r = Ni(t), a = Od(t), l = sh(t), o = (((p = e == null ? void 0 : e.mealCoverage) == null ? void 0 : p.loggedMeals) || 0) > 0, i = ((h = r.meals) == null ? void 0 : h[((f = e == null ? void 0 : e.mealCoverage) == null ? void 0 : f.nextMealTitleKey) || ""]) || "", u = o ? n.heroSummaryActive : n.heroSummaryBase || "", s = Number((e == null ? void 0 : e.proteinCurrent) || 0).toFixed(1).replace(/\.0$/, ""), g = (e == null ? void 0 : e.proteinRemaining) > 0 ? n.signalProteinToGoal(e.proteinRemaining) : n.signalProteinOnTrack;
  return {
    hero: {
      eyebrow: o ? n.heroEyebrowActive : n.heroEyebrowEmpty,
      title: o ? n.heroTitleActive(e.mealCoverage || { loggedMeals: 0, plannedMeals: 0 }) : n.heroTitleEmpty,
      summary: u,
      stats: [
        {
          label: n.statLabels.streak,
          value: n.formatDayCount(((S = (v = e == null ? void 0 : e.pet) == null ? void 0 : v.progress) == null ? void 0 : S.streak) || 0)
        },
        {
          label: n.statLabels.meals,
          value: n.formatMealCoverage(
            ((b = e == null ? void 0 : e.mealCoverage) == null ? void 0 : b.loggedMeals) || 0,
            ((d = e == null ? void 0 : e.mealCoverage) == null ? void 0 : d.plannedMeals) || 0
          )
        },
        {
          label: n.statLabels.protein,
          value: n.formatProteinPace(s, (e == null ? void 0 : e.proteinTarget) || 0)
        }
      ],
      meta: [
        Ch(e == null ? void 0 : e.goalType, t),
        i || ""
      ].filter(Boolean),
      actions: {
        log: n.heroActionLog || r.btnAddRecord || r.btnAdd || "Log meal",
        ai: r.aiTitle || "AI Analysis",
        favorites: n.heroActionFavorites || r.btnFavLoad || "Favorites"
      }
    },
    logHub: {
      title: n.logHubTitle || n.quickLogTitle || r.txtRecordTitle || r.recordTitle || "Log today's meals",
      summary: o ? n.logHubCopyActive || n.quickLogCopyActive : n.logHubCopyEmpty || n.quickLogCopyEmpty,
      commonFoodsButton: n.heroActionCommonFoods || r.presetFoodLabel || "Common foods",
      commonFoodsCopy: n.commonFoodsHint || "Choose a familiar food and keep Home light.",
      favoritesButton: n.logHubFavoritesButton || n.heroActionFavorites || r.btnFavLoad || "Favorites",
      favoritesCopy: n.logHubFavoritesCopy || "Pick from foods you already save often.",
      manualButton: n.logHubManualButton || n.heroActionManual || r.manualLabel || "Manual entry",
      manualCopy: n.logHubManualCopy || "Open this only when you need to type a custom food or nutrition.",
      manualModalTitle: n.manualModalTitle || n.manualAdvancedTitle || r.manualLabel || "Advanced manual entry",
      manualModalHint: n.manualModalHint || n.manualAdvancedHint || "Open only when you need to type a custom food or edit nutrition by hand.",
      todayMealsKicker: n.todayMealsKicker || n.heroEyebrowEmpty || "Daily diary",
      todayMealsTitle: n.todayMealsTitle || n.mealListTitle || "Today's meals",
      todayMealsHint: n.todayMealsHint || "Keep meal sections visible here so Home still feels calm."
    },
    overview: {
      title: n.overviewTitle,
      hint: l ? n.overviewHint : a.dailySummaryHint,
      signals: [
        {
          label: n.signals.protein,
          value: `${s}g`,
          detail: g
        },
        {
          label: n.signals.meals,
          value: n.formatMealCoverage(
            ((c = e == null ? void 0 : e.mealCoverage) == null ? void 0 : c.loggedMeals) || 0,
            ((m = e == null ? void 0 : e.mealCoverage) == null ? void 0 : m.plannedMeals) || 0
          ),
          detail: o ? n.signalMealsActive(
            ((y = e == null ? void 0 : e.mealCoverage) == null ? void 0 : y.loggedMeals) || 0,
            ((w = e == null ? void 0 : e.mealCoverage) == null ? void 0 : w.plannedMeals) || 0,
            i
          ) : n.signalMealsEmpty
        }
      ]
    }
  };
}
function Kr(e = {}, t = {}) {
  const n = (e == null ? void 0 : e[t == null ? void 0 : t.status]) || (e == null ? void 0 : e.building) || (e == null ? void 0 : e.placeholder) || "";
  return typeof n == "function" ? n(t) : n;
}
function Eh(e, t = Q().curLang, { variant: n = "home" } = {}) {
  var i, u, s, g, p, f, h, v;
  const r = wh(t), a = (e == null ? void 0 : e.focus) || "start_logging", l = ((i = r.summaries) == null ? void 0 : i[a]) || ((u = r.summaries) == null ? void 0 : u.steady_week) || "", o = n === "dashboard" && r.dashboardSubtitle || r.subtitle;
  return {
    title: r.title,
    subtitle: o,
    headline: ((s = r.headlines) == null ? void 0 : s[a]) || ((g = r.headlines) == null ? void 0 : g.steady_week) || "",
    summary: typeof l == "function" ? l(e || {}) : l,
    signals: [
      {
        key: "breakfast",
        label: ((p = r.labels) == null ? void 0 : p.breakfast) || "Breakfast",
        text: Kr(r.breakfast, (e == null ? void 0 : e.breakfast) || {})
      },
      {
        key: "dinner",
        label: ((f = r.labels) == null ? void 0 : f.dinner) || "Dinner",
        text: Kr(r.dinner, (e == null ? void 0 : e.dinner) || {})
      },
      {
        key: "protein",
        label: ((h = r.labels) == null ? void 0 : h.protein) || "Protein",
        text: Kr(r.protein, (e == null ? void 0 : e.protein) || {})
      },
      {
        key: "hydration",
        label: ((v = r.labels) == null ? void 0 : v.hydration) || "Hydration",
        text: Kr(r.hydration, (e == null ? void 0 : e.hydration) || {})
      }
    ]
  };
}
function Mh(e, t = Q().curLang) {
  var i, u, s, g;
  const n = _h(t).trend, r = (e == null ? void 0 : e.focusKey) || "balanced", a = ((i = n.headlines) == null ? void 0 : i[r]) || ((u = n.headlines) == null ? void 0 : u.balanced) || "", l = ((s = n.summaries) == null ? void 0 : s[r]) || ((g = n.summaries) == null ? void 0 : g.balanced) || "", o = typeof l == "function" ? l((e == null ? void 0 : e.loggedDays) || 7) : l;
  return {
    title: n.title,
    subtitle: n.subtitle,
    headline: a,
    summary: o,
    signals: ((e == null ? void 0 : e.signals) || []).map((p) => {
      var f, h, v;
      return {
        key: p.key,
        label: ((f = n.signalLabels) == null ? void 0 : f[p.key]) || p.key,
        value: (h = n.signalValue) != null && h[p.key] ? n.signalValue[p.key](p) : String(p.current ?? "--"),
        detail: (v = n.signalDetails) != null && v[p.key] ? n.signalDetails[p.key](p) : ""
      };
    })
  };
}
function Ah(e = Q().selectedDate, t = Q().curLang) {
  const { selectedDate: n } = Q(), r = e || n || Ct(), a = Od(t);
  return r === Ct() ? a.todayLabel : r;
}
const Dh = ["breakfast", "lunch", "dinner", "snack"];
function D(e, t = "") {
  return e == null ? t : String(e);
}
function ts(e, t = "--") {
  return e == null || e === "" ? t : String(e);
}
function jd(e, t) {
  var r;
  const n = Ni(t);
  return ((r = n == null ? void 0 : n.meals) == null ? void 0 : r[e]) || e || "";
}
function Nh(e, t, n) {
  return Dh.map((r) => {
    const a = e.filter((l) => l.mealType === r);
    return {
      key: r,
      label: jd(r, t),
      totalCalories: a.reduce((l, o) => l + o.calories, 0),
      items: a,
      emptyText: n
    };
  });
}
function Ih(e = "en") {
  const t = {
    "zh-TW": {
      quickActions: "快速操作",
      today: "今日摘要",
      overview: "日常重點",
      rhythm: "用餐節奏",
      nutrition: "營養焦點",
      pet: "夥伴狀態",
      progress: "進度",
      companion: "今天先記下一餐",
      quickLog: "輕鬆記錄今天的飲食",
      summary: "本日節奏與營養重點會同步在這裡整理。",
      open: "查看",
      changeDate: "切換日期",
      statusOnTrack: "計畫內",
      statusKeepGoing: "繼續保持",
      emptyMeal: "還沒有記錄",
      metrics: {
        calories: "熱量",
        protein: "蛋白質",
        meals: "餐次"
      }
    },
    "zh-CN": {
      quickActions: "快捷操作",
      today: "今日摘要",
      overview: "日常重点",
      rhythm: "用餐节奏",
      nutrition: "营养焦点",
      pet: "伙伴状态",
      progress: "进度",
      companion: "今天先记下一餐",
      quickLog: "轻松记录今天的饮食",
      summary: "本日节奏与营养重点会同步在这里整理。",
      open: "查看",
      changeDate: "切换日期",
      statusOnTrack: "计划内",
      statusKeepGoing: "继续保持",
      emptyMeal: "还没有记录",
      metrics: {
        calories: "热量",
        protein: "蛋白质",
        meals: "餐次"
      }
    },
    ja: {
      quickActions: "Quick actions",
      today: "Today at a glance",
      overview: "Daily signals",
      rhythm: "Meal rhythm",
      nutrition: "Nutrition focus",
      pet: "Companion status",
      progress: "Progress",
      companion: "Start with your first meal today",
      quickLog: "Log today's food in a few taps",
      summary: "Your rhythm and nutrition highlights live here.",
      open: "View",
      changeDate: "Change date",
      statusOnTrack: "On track",
      statusKeepGoing: "Keep going",
      emptyMeal: "Nothing logged yet",
      metrics: {
        calories: "Calories",
        protein: "Protein",
        meals: "Meals"
      }
    },
    ko: {
      quickActions: "Quick actions",
      today: "Today at a glance",
      overview: "Daily signals",
      rhythm: "Meal rhythm",
      nutrition: "Nutrition focus",
      pet: "Companion status",
      progress: "Progress",
      companion: "Start with your first meal today",
      quickLog: "Log today's food in a few taps",
      summary: "Your rhythm and nutrition highlights live here.",
      open: "View",
      changeDate: "Change date",
      statusOnTrack: "On track",
      statusKeepGoing: "Keep going",
      emptyMeal: "Nothing logged yet",
      metrics: {
        calories: "Calories",
        protein: "Protein",
        meals: "Meals"
      }
    },
    ar: {
      quickActions: "Quick actions",
      today: "Today at a glance",
      overview: "Daily signals",
      rhythm: "Meal rhythm",
      nutrition: "Nutrition focus",
      pet: "Companion status",
      progress: "Progress",
      companion: "Start with your first meal today",
      quickLog: "Log today's food in a few taps",
      summary: "Your rhythm and nutrition highlights live here.",
      open: "View",
      changeDate: "Change date",
      statusOnTrack: "On track",
      statusKeepGoing: "Keep going",
      emptyMeal: "Nothing logged yet",
      metrics: {
        calories: "Calories",
        protein: "Protein",
        meals: "Meals"
      }
    },
    en: {
      quickActions: "Quick actions",
      today: "Today at a glance",
      overview: "Daily signals",
      rhythm: "Meal rhythm",
      nutrition: "Nutrition focus",
      pet: "Companion status",
      progress: "Progress",
      companion: "Start with your first meal today",
      quickLog: "Log today's food in a few taps",
      summary: "Your rhythm and nutrition highlights live here.",
      open: "View",
      changeDate: "Change date",
      statusOnTrack: "On track",
      statusKeepGoing: "Keep going",
      emptyMeal: "Nothing logged yet",
      metrics: {
        calories: "Calories",
        protein: "Protein",
        meals: "Meals"
      }
    }
  };
  return t[e] || t.en;
}
function $h(e) {
  var f, h, v, S, b, d, c, m, y, w, M, A, _, j, $, me, lt, ot, An, Ar, Vt, Qt, x, N, I, W, Y, At, We, Yt, He, Dt, $i, bi, Pi, Fi, Li, zi;
  const t = eh(e), n = Zg(e, { range: 7, weightDays: 30 }), r = Ni(t.lang), a = xh(t, t.lang), l = Eh(t.rhythm, t.lang, { variant: "home" }), o = Mh(n.nutritionFocus, t.lang), i = Ih(t.lang), u = ((f = a.hero) == null ? void 0 : f.stats) || [], s = ((h = a.hero) == null ? void 0 : h.meta) || [], g = (((v = t.daily) == null ? void 0 : v.foodItems) || []).map((C, Wd) => {
    const Xt = (C == null ? void 0 : C.nutri) || (C == null ? void 0 : C.nutrition) || {}, Za = Number((Xt == null ? void 0 : Xt.calories) ?? (Xt == null ? void 0 : Xt.cal) ?? 0) || 0, Ja = String((C == null ? void 0 : C.type) || "snack");
    return {
      id: `${Ja}-${Wd}-${String((C == null ? void 0 : C.name) || "meal")}`.replace(/\s+/g, "-").toLowerCase(),
      name: D((C == null ? void 0 : C.name) || (C == null ? void 0 : C.foodName), ""),
      mealType: Ja,
      mealTypeLabel: jd(Ja, t.lang),
      calories: Za,
      portion: D((C == null ? void 0 : C.weight) || (C == null ? void 0 : C.portion) || "", ""),
      hint: Za > 0 ? `${Math.round(Za)} kcal` : (r == null ? void 0 : r.txtNoData) || ""
    };
  }).filter((C) => C.name || C.calories > 0), p = Nh(g, t.lang, i.emptyMeal);
  return {
    companion: t,
    dashboard: n,
    copy: i,
    hero: {
      eyebrow: D((S = a.hero) == null ? void 0 : S.eyebrow, ""),
      title: D((b = a.hero) == null ? void 0 : b.title, ""),
      summary: D((d = a.hero) == null ? void 0 : d.summary, ""),
      stats: u.map((C) => ({
        label: D(C == null ? void 0 : C.label, ""),
        value: D(C == null ? void 0 : C.value, "")
      })),
      meta: s.map((C) => D(C, "")),
      actions: {
        log: D((m = (c = a.hero) == null ? void 0 : c.actions) == null ? void 0 : m.log, "Log meal"),
        ai: D((w = (y = a.hero) == null ? void 0 : y.actions) == null ? void 0 : w.ai, "AI Analysis"),
        favorites: D((A = (M = a.hero) == null ? void 0 : M.actions) == null ? void 0 : A.favorites, "Favorites")
      }
    },
    quickLog: {
      title: D((_ = a.logHub) == null ? void 0 : _.title, ""),
      summary: D((j = a.logHub) == null ? void 0 : j.summary, ""),
      commonFoodsButton: D(($ = a.logHub) == null ? void 0 : $.commonFoodsButton, "Common foods"),
      commonFoodsCopy: D((me = a.logHub) == null ? void 0 : me.commonFoodsCopy, ""),
      favoritesButton: D((lt = a.logHub) == null ? void 0 : lt.favoritesButton, "Favorites"),
      favoritesCopy: D((ot = a.logHub) == null ? void 0 : ot.favoritesCopy, ""),
      manualButton: D((An = a.logHub) == null ? void 0 : An.manualButton, "Manual entry"),
      manualCopy: D((Ar = a.logHub) == null ? void 0 : Ar.manualCopy, ""),
      manualModalTitle: D((Vt = a.logHub) == null ? void 0 : Vt.manualModalTitle, "Advanced manual entry"),
      manualModalHint: D((Qt = a.logHub) == null ? void 0 : Qt.manualModalHint, ""),
      todayMealsKicker: D((x = a.logHub) == null ? void 0 : x.todayMealsKicker, "Daily diary"),
      todayMealsTitle: D((N = a.logHub) == null ? void 0 : N.todayMealsTitle, "Today's meals"),
      todayMealsHint: D((I = a.logHub) == null ? void 0 : I.todayMealsHint, "")
    },
    overview: {
      title: D((W = a.overview) == null ? void 0 : W.title, ""),
      hint: D((Y = a.overview) == null ? void 0 : Y.hint, ""),
      signals: (((At = a.overview) == null ? void 0 : At.signals) || []).map((C) => ({
        label: D(C == null ? void 0 : C.label, ""),
        value: ts(C == null ? void 0 : C.value),
        detail: D(C == null ? void 0 : C.detail, "")
      }))
    },
    rhythm: {
      title: D(l.title, ""),
      subtitle: D(l.subtitle, ""),
      headline: D(l.headline, ""),
      summary: D(l.summary, ""),
      signals: (l.signals || []).map((C) => ({
        key: D(C == null ? void 0 : C.key, ""),
        label: D(C == null ? void 0 : C.label, ""),
        text: D(C == null ? void 0 : C.text, "")
      }))
    },
    nutrition: {
      title: D(o.title, ""),
      subtitle: D(o.subtitle, ""),
      headline: D(o.headline, ""),
      summary: D(o.summary, ""),
      signals: (o.signals || []).map((C) => ({
        key: D(C == null ? void 0 : C.key, ""),
        label: D(C == null ? void 0 : C.label, ""),
        value: ts(C == null ? void 0 : C.value),
        detail: D(C == null ? void 0 : C.detail, "")
      }))
    },
    todayMeals: {
      title: D((We = a.logHub) == null ? void 0 : We.todayMealsTitle, i.today),
      hint: D((Yt = a.logHub) == null ? void 0 : Yt.todayMealsHint, ""),
      kicker: D((He = a.logHub) == null ? void 0 : He.todayMealsKicker, i.today),
      dateLabel: Ah(e.selectedDate, t.lang),
      count: g.length,
      groups: p
    },
    today: {
      calories: Number(($i = (Dt = t.daily) == null ? void 0 : Dt.totals) == null ? void 0 : $i.cal) || 0,
      targetCalories: Number(t.targetCalories) || 0,
      remainingCalories: Number(t.remainingCalories) || 0,
      calorieProgressPercent: Number(t.calorieProgressPercent) || 0,
      proteinCurrent: Number(t.proteinCurrent) || 0,
      proteinTarget: Number(t.proteinTarget) || 0,
      proteinRemaining: Number(t.proteinRemaining) || 0,
      waterTarget: Number((bi = t.daily) == null ? void 0 : bi.waterTarget) || 0,
      loggedMeals: Number((Pi = t.mealCoverage) == null ? void 0 : Pi.loggedMeals) || 0,
      plannedMeals: Number((Fi = t.mealCoverage) == null ? void 0 : Fi.plannedMeals) || 0,
      nextMealType: D((Li = t.mealCoverage) == null ? void 0 : Li.nextMealType, ""),
      nextMealTitleKey: D((zi = t.mealCoverage) == null ? void 0 : zi.nextMealTitleKey, "")
    }
  };
}
function bh() {
  const e = dg();
  return $h(e);
}
function Rn() {
}
function Nl({ label: e, value: t, detail: n }) {
  return /* @__PURE__ */ T.jsxs("div", { className: "woof-home__metric-card", children: [
    /* @__PURE__ */ T.jsx("div", { className: "woof-home__metric-value", children: t }),
    /* @__PURE__ */ T.jsx("div", { className: "woof-home__metric-label", children: e }),
    n ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__metric-detail", children: n }) : null
  ] });
}
function Il({ label: e, value: t, detail: n }) {
  return /* @__PURE__ */ T.jsxs("div", { className: "woof-home__insight-card", children: [
    /* @__PURE__ */ T.jsx("div", { className: "woof-home__insight-label", children: e }),
    /* @__PURE__ */ T.jsx("div", { className: "woof-home__insight-value", children: t }),
    n ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__insight-detail", children: n }) : null
  ] });
}
function Ph({ name: e, calories: t, portion: n }) {
  return /* @__PURE__ */ T.jsxs("div", { className: "woof-home__meal-row", children: [
    /* @__PURE__ */ T.jsxs("div", { className: "woof-home__meal-row-main", children: [
      /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-name", children: e }),
      n ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-portion", children: n }) : null
    ] }),
    /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-calories", children: t > 0 ? `${Math.round(t)} kcal` : "--" })
  ] });
}
function Fh({ group: e }) {
  const t = e.items || [], n = t.length > 0, r = n ? `${t.length} · ${e.totalCalories > 0 ? `${Math.round(e.totalCalories)} kcal` : "--"}` : e.emptyText;
  return /* @__PURE__ */ T.jsxs("div", { className: "woof-home__meal-group", children: [
    /* @__PURE__ */ T.jsxs("div", { className: "woof-home__meal-group-header", children: [
      /* @__PURE__ */ T.jsxs("div", { children: [
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-type", children: e.label }),
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-group-meta", children: r })
      ] }),
      n ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-group-total", children: e.totalCalories > 0 ? `${Math.round(e.totalCalories)} kcal` : "--" }) : null
    ] }),
    n ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-list", children: t.map((a) => /* @__PURE__ */ T.jsx(
      Ph,
      {
        name: a.name,
        calories: a.calories,
        portion: a.portion
      },
      a.id
    )) }) : /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-group-empty", children: e.emptyText })
  ] });
}
function On({ eyebrow: e, title: t, hint: n, action: r, onAction: a }) {
  return /* @__PURE__ */ T.jsxs("div", { className: "woof-home__section-header", children: [
    /* @__PURE__ */ T.jsxs("div", { className: "woof-home__section-copy", children: [
      e ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__eyebrow", children: e }) : null,
      /* @__PURE__ */ T.jsx("h2", { className: "woof-home__section-title", children: t }),
      n ? /* @__PURE__ */ T.jsx("p", { className: "woof-home__section-hint", children: n }) : null
    ] }),
    r ? /* @__PURE__ */ T.jsx("button", { type: "button", className: "woof-home__ghost-button", onClick: a, children: r }) : null
  ] });
}
function $l({ label: e, hint: t, onClick: n, variant: r = "secondary" }) {
  return /* @__PURE__ */ T.jsxs(
    "button",
    {
      type: "button",
      className: `woof-home__action-button woof-home__action-button--${r}`,
      onClick: n,
      children: [
        /* @__PURE__ */ T.jsx("span", { className: "woof-home__action-label", children: e }),
        t ? /* @__PURE__ */ T.jsx("span", { className: "woof-home__action-hint", children: t }) : null
      ]
    }
  );
}
function Lh({
  onQuickLog: e = Rn,
  onOpenAI: t = Rn,
  onOpenFavorites: n = Rn,
  onOpenTodayMeals: r = Rn,
  onOpenRhythm: a = Rn
}) {
  var m, y, w, M, A;
  const l = bh(), { copy: o, hero: i, quickLog: u, overview: s, rhythm: g, nutrition: p, todayMeals: f, today: h, companion: v } = l, S = s.signals || [], b = g.signals || [], d = p.signals || [], c = f.groups || [];
  return /* @__PURE__ */ T.jsxs("main", { className: "woof-home", "data-surface": "home", children: [
    /* @__PURE__ */ T.jsxs("section", { className: "woof-home__hero", children: [
      /* @__PURE__ */ T.jsxs("div", { className: "woof-home__hero-copy", children: [
        i.eyebrow ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__hero-eyebrow", children: i.eyebrow }) : null,
        /* @__PURE__ */ T.jsx("h1", { className: "woof-home__hero-title", children: i.title }),
        /* @__PURE__ */ T.jsx("p", { className: "woof-home__hero-summary", children: i.summary }),
        /* @__PURE__ */ T.jsxs("div", { className: "woof-home__hero-actions", children: [
          /* @__PURE__ */ T.jsx(
            $l,
            {
              label: i.actions.log,
              hint: u.title || o.quickLog,
              onClick: e,
              variant: "primary"
            }
          ),
          /* @__PURE__ */ T.jsx(
            $l,
            {
              label: i.actions.ai,
              hint: g.headline || o.open,
              onClick: t
            }
          ),
          /* @__PURE__ */ T.jsx(
            $l,
            {
              label: i.actions.favorites,
              hint: u.favoritesCopy || o.open,
              onClick: n
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ T.jsxs("aside", { className: "woof-home__hero-companion", "aria-label": o.pet, children: [
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__hero-companion-chip", children: o.pet }),
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__pet-level", children: `Lv.${((y = (m = v.pet) == null ? void 0 : m.progress) == null ? void 0 : y.level) || 1}` }),
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__pet-status", children: ((w = v.pet) == null ? void 0 : w.messageKey) || "petMsg1" }),
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__pet-progress", "aria-hidden": "true", children: /* @__PURE__ */ T.jsx(
          "div",
          {
            className: "woof-home__pet-progress-fill",
            style: { width: `${Math.min(((A = (M = v.pet) == null ? void 0 : M.progress) == null ? void 0 : A.xp) || 0, 100)}%` }
          }
        ) }),
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__pet-progress-label", children: o.progress }),
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__hero-meta", children: i.meta.map((_) => /* @__PURE__ */ T.jsx("span", { className: "woof-home__hero-meta-item", children: _ }, _)) })
      ] })
    ] }),
    /* @__PURE__ */ T.jsxs("section", { className: "woof-home__today", "aria-label": o.today, children: [
      /* @__PURE__ */ T.jsx(
        On,
        {
          eyebrow: o.today,
          title: o.today,
          hint: u.summary
        }
      ),
      /* @__PURE__ */ T.jsxs("div", { className: "woof-home__metric-grid", children: [
        /* @__PURE__ */ T.jsx(
          Nl,
          {
            label: o.metrics.calories,
            value: `${h.calories} / ${h.targetCalories}`,
            detail: h.targetCalories > 0 ? `${h.remainingCalories} kcal left` : "--"
          }
        ),
        /* @__PURE__ */ T.jsx(
          Nl,
          {
            label: o.metrics.protein,
            value: `${h.proteinCurrent} / ${h.proteinTarget} g`,
            detail: h.proteinRemaining > 0 ? `${h.proteinRemaining} g remaining` : o.statusOnTrack
          }
        ),
        /* @__PURE__ */ T.jsx(
          Nl,
          {
            label: o.metrics.meals,
            value: `${h.loggedMeals}/${h.plannedMeals}`,
            detail: h.nextMealType || o.statusKeepGoing
          }
        )
      ] }),
      /* @__PURE__ */ T.jsx("div", { className: "woof-home__summary-bar", "aria-hidden": "true", children: /* @__PURE__ */ T.jsx(
        "div",
        {
          className: "woof-home__summary-bar-fill",
          style: { width: `${Math.min(h.calorieProgressPercent, 100)}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ T.jsxs("section", { className: "woof-home__panel", "aria-label": f.title, children: [
      /* @__PURE__ */ T.jsx(
        On,
        {
          eyebrow: f.kicker,
          title: f.title,
          hint: f.dateLabel || f.hint,
          action: o.changeDate,
          onAction: r
        }
      ),
      f.count > 0 ? /* @__PURE__ */ T.jsx("div", { className: "woof-home__meal-group-list", children: c.map((_) => /* @__PURE__ */ T.jsx(Fh, { group: _ }, _.key)) }) : /* @__PURE__ */ T.jsxs("div", { className: "woof-home__empty-state", children: [
        /* @__PURE__ */ T.jsx("div", { className: "woof-home__empty-title", children: o.companion }),
        /* @__PURE__ */ T.jsx("p", { className: "woof-home__empty-copy", children: f.hint || u.summary })
      ] })
    ] }),
    /* @__PURE__ */ T.jsxs("section", { className: "woof-home__overview", "aria-label": o.overview, children: [
      /* @__PURE__ */ T.jsx(
        On,
        {
          eyebrow: o.overview,
          title: s.title,
          hint: s.hint
        }
      ),
      /* @__PURE__ */ T.jsx("div", { className: "woof-home__signal-grid", children: S.map((_) => /* @__PURE__ */ T.jsx(
        Il,
        {
          label: _.label,
          value: _.value,
          detail: _.detail
        },
        _.label
      )) })
    ] }),
    /* @__PURE__ */ T.jsxs("section", { className: "woof-home__panel", "aria-label": o.rhythm, children: [
      /* @__PURE__ */ T.jsx(
        On,
        {
          eyebrow: g.subtitle,
          title: g.title,
          hint: g.headline,
          action: o.open,
          onAction: a
        }
      ),
      /* @__PURE__ */ T.jsx("p", { className: "woof-home__panel-summary", children: g.summary }),
      /* @__PURE__ */ T.jsx("div", { className: "woof-home__signal-grid", children: b.map((_) => /* @__PURE__ */ T.jsx(
        Il,
        {
          label: _.label,
          value: _.text
        },
        _.key
      )) })
    ] }),
    /* @__PURE__ */ T.jsxs("section", { className: "woof-home__panel", "aria-label": o.nutrition, children: [
      /* @__PURE__ */ T.jsx(
        On,
        {
          eyebrow: p.subtitle,
          title: p.title,
          hint: p.headline
        }
      ),
      /* @__PURE__ */ T.jsx("p", { className: "woof-home__panel-summary", children: p.summary }),
      /* @__PURE__ */ T.jsx("div", { className: "woof-home__signal-grid", children: d.map((_) => /* @__PURE__ */ T.jsx(
        Il,
        {
          label: _.label,
          value: _.value,
          detail: _.detail
        },
        _.key
      )) })
    ] })
  ] });
}
function jn() {
}
function zh({
  onQuickLog: e = jn,
  onOpenAI: t = jn,
  onOpenFavorites: n = jn,
  onOpenTodayMeals: r = jn,
  onOpenRhythm: a = jn
}) {
  return /* @__PURE__ */ T.jsx(
    Lh,
    {
      onQuickLog: e,
      onOpenAI: t,
      onOpenFavorites: n,
      onOpenTodayMeals: r,
      onOpenRhythm: a
    }
  );
}
window.__woofReactHomeStatus = "bundle-loaded";
function bl(e) {
  return () => {
    var t;
    (t = document.getElementById(e)) == null || t.click();
  };
}
function Rh() {
  var e;
  (e = document.getElementById("btn-change-log-date")) == null || e.click();
}
function Oh() {
  var e;
  (e = document.querySelector('.nav-item[data-target="view-dashboard"]')) == null || e.click();
}
function ns() {
  const e = document.getElementById("home-react-root"), t = document.getElementById("view-daily");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-home-enabled"), Pl.createRoot(e).render(
        /* @__PURE__ */ T.jsx(af.StrictMode, { children: /* @__PURE__ */ T.jsx(
          zh,
          {
            onQuickLog: bl("btn-home-log-hub"),
            onOpenAI: bl("btn-home-ai"),
            onOpenFavorites: bl("btn-home-favorites"),
            onOpenTodayMeals: Rh,
            onOpenRhythm: Oh
          }
        ) })
      ), window.__woofReactHomeStatus = "mounted";
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-home-enabled"), window.__woofReactHomeStatus = "failed", window.__woofReactHomeError = String((n == null ? void 0 : n.stack) || n || "Unknown React home mount error"), console.error("React home mount failed", n);
    }
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", ns, { once: !0 }) : ns();
