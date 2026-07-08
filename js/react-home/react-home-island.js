function _p(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var od = { exports: {} }, Eo = {}, id = { exports: {} }, z = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var la = Symbol.for("react.element"), wp = Symbol.for("react.portal"), Tp = Symbol.for("react.fragment"), kp = Symbol.for("react.strict_mode"), xp = Symbol.for("react.profiler"), bp = Symbol.for("react.provider"), Np = Symbol.for("react.context"), Cp = Symbol.for("react.forward_ref"), Mp = Symbol.for("react.suspense"), Ep = Symbol.for("react.memo"), Ap = Symbol.for("react.lazy"), Au = Symbol.iterator;
function Ip(e) {
  return e === null || typeof e != "object" ? null : (e = Au && e[Au] || e["@@iterator"], typeof e == "function" ? e : null);
}
var ld = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, sd = Object.assign, ud = {};
function lr(e, t, n) {
  this.props = e, this.context = t, this.refs = ud, this.updater = n || ld;
}
lr.prototype.isReactComponent = {};
lr.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
lr.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function cd() {
}
cd.prototype = lr.prototype;
function Bl(e, t, n) {
  this.props = e, this.context = t, this.refs = ud, this.updater = n || ld;
}
var Ul = Bl.prototype = new cd();
Ul.constructor = Bl;
sd(Ul, lr.prototype);
Ul.isPureReactComponent = !0;
var Iu = Array.isArray, dd = Object.prototype.hasOwnProperty, Vl = { current: null }, fd = { key: !0, ref: !0, __self: !0, __source: !0 };
function md(e, t, n) {
  var r, a = {}, o = null, i = null;
  if (t != null) for (r in t.ref !== void 0 && (i = t.ref), t.key !== void 0 && (o = "" + t.key), t) dd.call(t, r) && !fd.hasOwnProperty(r) && (a[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) a.children = n;
  else if (1 < l) {
    for (var s = Array(l), c = 0; c < l; c++) s[c] = arguments[c + 2];
    a.children = s;
  }
  if (e && e.defaultProps) for (r in l = e.defaultProps, l) a[r] === void 0 && (a[r] = l[r]);
  return { $$typeof: la, type: e, key: o, ref: i, props: a, _owner: Vl.current };
}
function Lp(e, t) {
  return { $$typeof: la, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function Kl(e) {
  return typeof e == "object" && e !== null && e.$$typeof === la;
}
function jp(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var Lu = /\/+/g;
function ai(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? jp("" + e.key) : t.toString(36);
}
function Fa(e, t, n, r, a) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else switch (o) {
    case "string":
    case "number":
      i = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case la:
        case wp:
          i = !0;
      }
  }
  if (i) return i = e, a = a(i), e = r === "" ? "." + ai(i, 0) : r, Iu(a) ? (n = "", e != null && (n = e.replace(Lu, "$&/") + "/"), Fa(a, t, n, "", function(c) {
    return c;
  })) : a != null && (Kl(a) && (a = Lp(a, n + (!a.key || i && i.key === a.key ? "" : ("" + a.key).replace(Lu, "$&/") + "/") + e)), t.push(a)), 1;
  if (i = 0, r = r === "" ? "." : r + ":", Iu(e)) for (var l = 0; l < e.length; l++) {
    o = e[l];
    var s = r + ai(o, l);
    i += Fa(o, t, n, s, a);
  }
  else if (s = Ip(e), typeof s == "function") for (e = s.call(e), l = 0; !(o = e.next()).done; ) o = o.value, s = r + ai(o, l++), i += Fa(o, t, n, s, a);
  else if (o === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return i;
}
function va(e, t, n) {
  if (e == null) return e;
  var r = [], a = 0;
  return Fa(e, r, "", "", function(o) {
    return t.call(n, o, a++);
  }), r;
}
function Pp(e) {
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
var _e = { current: null }, Oa = { transition: null }, Dp = { ReactCurrentDispatcher: _e, ReactCurrentBatchConfig: Oa, ReactCurrentOwner: Vl };
function pd() {
  throw Error("act(...) is not supported in production builds of React.");
}
z.Children = { map: va, forEach: function(e, t, n) {
  va(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return va(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return va(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!Kl(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
z.Component = lr;
z.Fragment = Tp;
z.Profiler = xp;
z.PureComponent = Bl;
z.StrictMode = kp;
z.Suspense = Mp;
z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dp;
z.act = pd;
z.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = sd({}, e.props), a = e.key, o = e.ref, i = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (o = t.ref, i = Vl.current), t.key !== void 0 && (a = "" + t.key), e.type && e.type.defaultProps) var l = e.type.defaultProps;
    for (s in t) dd.call(t, s) && !fd.hasOwnProperty(s) && (r[s] = t[s] === void 0 && l !== void 0 ? l[s] : t[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = n;
  else if (1 < s) {
    l = Array(s);
    for (var c = 0; c < s; c++) l[c] = arguments[c + 2];
    r.children = l;
  }
  return { $$typeof: la, type: e.type, key: a, ref: o, props: r, _owner: i };
};
z.createContext = function(e) {
  return e = { $$typeof: Np, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: bp, _context: e }, e.Consumer = e;
};
z.createElement = md;
z.createFactory = function(e) {
  var t = md.bind(null, e);
  return t.type = e, t;
};
z.createRef = function() {
  return { current: null };
};
z.forwardRef = function(e) {
  return { $$typeof: Cp, render: e };
};
z.isValidElement = Kl;
z.lazy = function(e) {
  return { $$typeof: Ap, _payload: { _status: -1, _result: e }, _init: Pp };
};
z.memo = function(e, t) {
  return { $$typeof: Ep, type: e, compare: t === void 0 ? null : t };
};
z.startTransition = function(e) {
  var t = Oa.transition;
  Oa.transition = {};
  try {
    e();
  } finally {
    Oa.transition = t;
  }
};
z.unstable_act = pd;
z.useCallback = function(e, t) {
  return _e.current.useCallback(e, t);
};
z.useContext = function(e) {
  return _e.current.useContext(e);
};
z.useDebugValue = function() {
};
z.useDeferredValue = function(e) {
  return _e.current.useDeferredValue(e);
};
z.useEffect = function(e, t) {
  return _e.current.useEffect(e, t);
};
z.useId = function() {
  return _e.current.useId();
};
z.useImperativeHandle = function(e, t, n) {
  return _e.current.useImperativeHandle(e, t, n);
};
z.useInsertionEffect = function(e, t) {
  return _e.current.useInsertionEffect(e, t);
};
z.useLayoutEffect = function(e, t) {
  return _e.current.useLayoutEffect(e, t);
};
z.useMemo = function(e, t) {
  return _e.current.useMemo(e, t);
};
z.useReducer = function(e, t, n) {
  return _e.current.useReducer(e, t, n);
};
z.useRef = function(e) {
  return _e.current.useRef(e);
};
z.useState = function(e) {
  return _e.current.useState(e);
};
z.useSyncExternalStore = function(e, t, n) {
  return _e.current.useSyncExternalStore(e, t, n);
};
z.useTransition = function() {
  return _e.current.useTransition();
};
z.version = "18.3.1";
id.exports = z;
var ee = id.exports;
const ge = /* @__PURE__ */ _p(ee);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zp = ee, Fp = Symbol.for("react.element"), Op = Symbol.for("react.fragment"), Rp = Object.prototype.hasOwnProperty, $p = zp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Hp = { key: !0, ref: !0, __self: !0, __source: !0 };
function hd(e, t, n) {
  var r, a = {}, o = null, i = null;
  n !== void 0 && (o = "" + n), t.key !== void 0 && (o = "" + t.key), t.ref !== void 0 && (i = t.ref);
  for (r in t) Rp.call(t, r) && !Hp.hasOwnProperty(r) && (a[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) a[r] === void 0 && (a[r] = t[r]);
  return { $$typeof: Fp, type: e, key: o, ref: i, props: a, _owner: $p.current };
}
Eo.Fragment = Op;
Eo.jsx = hd;
Eo.jsxs = hd;
od.exports = Eo;
var u = od.exports, Qt = {}, gd = { exports: {} }, ze = {}, yd = { exports: {} }, vd = {};
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
  function t(C, j) {
    var P = C.length;
    C.push(j);
    e: for (; 0 < P; ) {
      var H = P - 1 >>> 1, K = C[H];
      if (0 < a(K, j)) C[H] = j, C[P] = K, P = H;
      else break e;
    }
  }
  function n(C) {
    return C.length === 0 ? null : C[0];
  }
  function r(C) {
    if (C.length === 0) return null;
    var j = C[0], P = C.pop();
    if (P !== j) {
      C[0] = P;
      e: for (var H = 0, K = C.length, Ke = K >>> 1; H < Ke; ) {
        var rt = 2 * (H + 1) - 1, Tn = C[rt], at = rt + 1, en = C[at];
        if (0 > a(Tn, P)) at < K && 0 > a(en, Tn) ? (C[H] = en, C[at] = P, H = at) : (C[H] = Tn, C[rt] = P, H = rt);
        else if (at < K && 0 > a(en, P)) C[H] = en, C[at] = P, H = at;
        else break e;
      }
    }
    return j;
  }
  function a(C, j) {
    var P = C.sortIndex - j.sortIndex;
    return P !== 0 ? P : C.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function() {
      return o.now();
    };
  } else {
    var i = Date, l = i.now();
    e.unstable_now = function() {
      return i.now() - l;
    };
  }
  var s = [], c = [], m = 1, p = null, d = 3, h = !1, v = !1, _ = !1, L = typeof setTimeout == "function" ? setTimeout : null, g = typeof clearTimeout == "function" ? clearTimeout : null, f = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(C) {
    for (var j = n(c); j !== null; ) {
      if (j.callback === null) r(c);
      else if (j.startTime <= C) r(c), j.sortIndex = j.expirationTime, t(s, j);
      else break;
      j = n(c);
    }
  }
  function S(C) {
    if (_ = !1, y(C), !v) if (n(s) !== null) v = !0, nt(b);
    else {
      var j = n(c);
      j !== null && Re(S, j.startTime - C);
    }
  }
  function b(C, j) {
    v = !1, _ && (_ = !1, g(N), N = -1), h = !0;
    var P = d;
    try {
      for (y(j), p = n(s); p !== null && (!(p.expirationTime > j) || C && !V()); ) {
        var H = p.callback;
        if (typeof H == "function") {
          p.callback = null, d = p.priorityLevel;
          var K = H(p.expirationTime <= j);
          j = e.unstable_now(), typeof K == "function" ? p.callback = K : p === n(s) && r(s), y(j);
        } else r(s);
        p = n(s);
      }
      if (p !== null) var Ke = !0;
      else {
        var rt = n(c);
        rt !== null && Re(S, rt.startTime - j), Ke = !1;
      }
      return Ke;
    } finally {
      p = null, d = P, h = !1;
    }
  }
  var w = !1, k = null, N = -1, A = 5, E = -1;
  function V() {
    return !(e.unstable_now() - E < A);
  }
  function $() {
    if (k !== null) {
      var C = e.unstable_now();
      E = C;
      var j = !0;
      try {
        j = k(!0, C);
      } finally {
        j ? Oe() : (w = !1, k = null);
      }
    } else w = !1;
  }
  var Oe;
  if (typeof f == "function") Oe = function() {
    f($);
  };
  else if (typeof MessageChannel < "u") {
    var Et = new MessageChannel(), gt = Et.port2;
    Et.port1.onmessage = $, Oe = function() {
      gt.postMessage(null);
    };
  } else Oe = function() {
    L($, 0);
  };
  function nt(C) {
    k = C, w || (w = !0, Oe());
  }
  function Re(C, j) {
    N = L(function() {
      C(e.unstable_now());
    }, j);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(C) {
    C.callback = null;
  }, e.unstable_continueExecution = function() {
    v || h || (v = !0, nt(b));
  }, e.unstable_forceFrameRate = function(C) {
    0 > C || 125 < C ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : A = 0 < C ? Math.floor(1e3 / C) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return d;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(s);
  }, e.unstable_next = function(C) {
    switch (d) {
      case 1:
      case 2:
      case 3:
        var j = 3;
        break;
      default:
        j = d;
    }
    var P = d;
    d = j;
    try {
      return C();
    } finally {
      d = P;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(C, j) {
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
    var P = d;
    d = C;
    try {
      return j();
    } finally {
      d = P;
    }
  }, e.unstable_scheduleCallback = function(C, j, P) {
    var H = e.unstable_now();
    switch (typeof P == "object" && P !== null ? (P = P.delay, P = typeof P == "number" && 0 < P ? H + P : H) : P = H, C) {
      case 1:
        var K = -1;
        break;
      case 2:
        K = 250;
        break;
      case 5:
        K = 1073741823;
        break;
      case 4:
        K = 1e4;
        break;
      default:
        K = 5e3;
    }
    return K = P + K, C = { id: m++, callback: j, priorityLevel: C, startTime: P, expirationTime: K, sortIndex: -1 }, P > H ? (C.sortIndex = P, t(c, C), n(s) === null && C === n(c) && (_ ? (g(N), N = -1) : _ = !0, Re(S, P - H))) : (C.sortIndex = K, t(s, C), v || h || (v = !0, nt(b))), C;
  }, e.unstable_shouldYield = V, e.unstable_wrapCallback = function(C) {
    var j = d;
    return function() {
      var P = d;
      d = j;
      try {
        return C.apply(this, arguments);
      } finally {
        d = P;
      }
    };
  };
})(vd);
yd.exports = vd;
var Wp = yd.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bp = ee, De = Wp;
function T(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Sd = /* @__PURE__ */ new Set(), Wr = {};
function Sn(e, t) {
  Zn(e, t), Zn(e + "Capture", t);
}
function Zn(e, t) {
  for (Wr[e] = t, e = 0; e < t.length; e++) Sd.add(t[e]);
}
var xt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Bi = Object.prototype.hasOwnProperty, Up = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ju = {}, Pu = {};
function Vp(e) {
  return Bi.call(Pu, e) ? !0 : Bi.call(ju, e) ? !1 : Up.test(e) ? Pu[e] = !0 : (ju[e] = !0, !1);
}
function Kp(e, t, n, r) {
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
function Gp(e, t, n, r) {
  if (t === null || typeof t > "u" || Kp(e, t, n, r)) return !0;
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
function we(e, t, n, r, a, o, i) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = a, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = o, this.removeEmptyString = i;
}
var de = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  de[e] = new we(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  de[t] = new we(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  de[e] = new we(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  de[e] = new we(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  de[e] = new we(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  de[e] = new we(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  de[e] = new we(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  de[e] = new we(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  de[e] = new we(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Gl = /[\-:]([a-z])/g;
function Ql(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    Gl,
    Ql
  );
  de[t] = new we(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(Gl, Ql);
  de[t] = new we(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(Gl, Ql);
  de[t] = new we(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  de[e] = new we(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
de.xlinkHref = new we("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  de[e] = new we(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Yl(e, t, n, r) {
  var a = de.hasOwnProperty(t) ? de[t] : null;
  (a !== null ? a.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (Gp(t, n, a, r) && (n = null), r || a === null ? Vp(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : a.mustUseProperty ? e[a.propertyName] = n === null ? a.type === 3 ? !1 : "" : n : (t = a.attributeName, r = a.attributeNamespace, n === null ? e.removeAttribute(t) : (a = a.type, n = a === 3 || a === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var Mt = Bp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Sa = Symbol.for("react.element"), En = Symbol.for("react.portal"), An = Symbol.for("react.fragment"), ql = Symbol.for("react.strict_mode"), Ui = Symbol.for("react.profiler"), _d = Symbol.for("react.provider"), wd = Symbol.for("react.context"), Xl = Symbol.for("react.forward_ref"), Vi = Symbol.for("react.suspense"), Ki = Symbol.for("react.suspense_list"), Zl = Symbol.for("react.memo"), It = Symbol.for("react.lazy"), Td = Symbol.for("react.offscreen"), Du = Symbol.iterator;
function hr(e) {
  return e === null || typeof e != "object" ? null : (e = Du && e[Du] || e["@@iterator"], typeof e == "function" ? e : null);
}
var X = Object.assign, oi;
function Nr(e) {
  if (oi === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    oi = t && t[1] || "";
  }
  return `
` + oi + e;
}
var ii = !1;
function li(e, t) {
  if (!e || ii) return "";
  ii = !0;
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
`), i = a.length - 1, l = o.length - 1; 1 <= i && 0 <= l && a[i] !== o[l]; ) l--;
      for (; 1 <= i && 0 <= l; i--, l--) if (a[i] !== o[l]) {
        if (i !== 1 || l !== 1)
          do
            if (i--, l--, 0 > l || a[i] !== o[l]) {
              var s = `
` + a[i].replace(" at new ", " at ");
              return e.displayName && s.includes("<anonymous>") && (s = s.replace("<anonymous>", e.displayName)), s;
            }
          while (1 <= i && 0 <= l);
        break;
      }
    }
  } finally {
    ii = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? Nr(e) : "";
}
function Qp(e) {
  switch (e.tag) {
    case 5:
      return Nr(e.type);
    case 16:
      return Nr("Lazy");
    case 13:
      return Nr("Suspense");
    case 19:
      return Nr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = li(e.type, !1), e;
    case 11:
      return e = li(e.type.render, !1), e;
    case 1:
      return e = li(e.type, !0), e;
    default:
      return "";
  }
}
function Gi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case An:
      return "Fragment";
    case En:
      return "Portal";
    case Ui:
      return "Profiler";
    case ql:
      return "StrictMode";
    case Vi:
      return "Suspense";
    case Ki:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case wd:
      return (e.displayName || "Context") + ".Consumer";
    case _d:
      return (e._context.displayName || "Context") + ".Provider";
    case Xl:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case Zl:
      return t = e.displayName || null, t !== null ? t : Gi(e.type) || "Memo";
    case It:
      t = e._payload, e = e._init;
      try {
        return Gi(e(t));
      } catch {
      }
  }
  return null;
}
function Yp(e) {
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
      return Gi(t);
    case 8:
      return t === ql ? "StrictMode" : "Mode";
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
function Yt(e) {
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
function kd(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function qp(e) {
  var t = kd(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var a = n.get, o = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return a.call(this);
    }, set: function(i) {
      r = "" + i, o.call(this, i);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(i) {
      r = "" + i;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function _a(e) {
  e._valueTracker || (e._valueTracker = qp(e));
}
function xd(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = kd(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Ja(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Qi(e, t) {
  var n = t.checked;
  return X({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function zu(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = Yt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function bd(e, t) {
  t = t.checked, t != null && Yl(e, "checked", t, !1);
}
function Yi(e, t) {
  bd(e, t);
  var n = Yt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? qi(e, t.type, n) : t.hasOwnProperty("defaultValue") && qi(e, t.type, Yt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function Fu(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function qi(e, t, n) {
  (t !== "number" || Ja(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var Cr = Array.isArray;
function Kn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var a = 0; a < n.length; a++) t["$" + n[a]] = !0;
    for (n = 0; n < e.length; n++) a = t.hasOwnProperty("$" + e[n].value), e[n].selected !== a && (e[n].selected = a), a && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + Yt(n), t = null, a = 0; a < e.length; a++) {
      if (e[a].value === n) {
        e[a].selected = !0, r && (e[a].defaultSelected = !0);
        return;
      }
      t !== null || e[a].disabled || (t = e[a]);
    }
    t !== null && (t.selected = !0);
  }
}
function Xi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(T(91));
  return X({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function Ou(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(T(92));
      if (Cr(n)) {
        if (1 < n.length) throw Error(T(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: Yt(n) };
}
function Nd(e, t) {
  var n = Yt(t.value), r = Yt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function Ru(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Cd(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Zi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Cd(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var wa, Md = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, a) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, a);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (wa = wa || document.createElement("div"), wa.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = wa.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Br(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Ir = {
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
}, Xp = ["Webkit", "ms", "Moz", "O"];
Object.keys(Ir).forEach(function(e) {
  Xp.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Ir[t] = Ir[e];
  });
});
function Ed(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Ir.hasOwnProperty(e) && Ir[e] ? ("" + t).trim() : t + "px";
}
function Ad(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, a = Ed(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, a) : e[n] = a;
  }
}
var Zp = X({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function Ji(e, t) {
  if (t) {
    if (Zp[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(T(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(T(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(T(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(T(62));
  }
}
function el(e, t) {
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
var tl = null;
function Jl(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var nl = null, Gn = null, Qn = null;
function $u(e) {
  if (e = ca(e)) {
    if (typeof nl != "function") throw Error(T(280));
    var t = e.stateNode;
    t && (t = Po(t), nl(e.stateNode, e.type, t));
  }
}
function Id(e) {
  Gn ? Qn ? Qn.push(e) : Qn = [e] : Gn = e;
}
function Ld() {
  if (Gn) {
    var e = Gn, t = Qn;
    if (Qn = Gn = null, $u(e), t) for (e = 0; e < t.length; e++) $u(t[e]);
  }
}
function jd(e, t) {
  return e(t);
}
function Pd() {
}
var si = !1;
function Dd(e, t, n) {
  if (si) return e(t, n);
  si = !0;
  try {
    return jd(e, t, n);
  } finally {
    si = !1, (Gn !== null || Qn !== null) && (Pd(), Ld());
  }
}
function Ur(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = Po(n);
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
  if (n && typeof n != "function") throw Error(T(231, t, typeof n));
  return n;
}
var rl = !1;
if (xt) try {
  var gr = {};
  Object.defineProperty(gr, "passive", { get: function() {
    rl = !0;
  } }), window.addEventListener("test", gr, gr), window.removeEventListener("test", gr, gr);
} catch {
  rl = !1;
}
function Jp(e, t, n, r, a, o, i, l, s) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (m) {
    this.onError(m);
  }
}
var Lr = !1, eo = null, to = !1, al = null, eh = { onError: function(e) {
  Lr = !0, eo = e;
} };
function th(e, t, n, r, a, o, i, l, s) {
  Lr = !1, eo = null, Jp.apply(eh, arguments);
}
function nh(e, t, n, r, a, o, i, l, s) {
  if (th.apply(this, arguments), Lr) {
    if (Lr) {
      var c = eo;
      Lr = !1, eo = null;
    } else throw Error(T(198));
    to || (to = !0, al = c);
  }
}
function _n(e) {
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
function zd(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function Hu(e) {
  if (_n(e) !== e) throw Error(T(188));
}
function rh(e) {
  var t = e.alternate;
  if (!t) {
    if (t = _n(e), t === null) throw Error(T(188));
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
        if (o === n) return Hu(a), e;
        if (o === r) return Hu(a), t;
        o = o.sibling;
      }
      throw Error(T(188));
    }
    if (n.return !== r.return) n = a, r = o;
    else {
      for (var i = !1, l = a.child; l; ) {
        if (l === n) {
          i = !0, n = a, r = o;
          break;
        }
        if (l === r) {
          i = !0, r = a, n = o;
          break;
        }
        l = l.sibling;
      }
      if (!i) {
        for (l = o.child; l; ) {
          if (l === n) {
            i = !0, n = o, r = a;
            break;
          }
          if (l === r) {
            i = !0, r = o, n = a;
            break;
          }
          l = l.sibling;
        }
        if (!i) throw Error(T(189));
      }
    }
    if (n.alternate !== r) throw Error(T(190));
  }
  if (n.tag !== 3) throw Error(T(188));
  return n.stateNode.current === n ? e : t;
}
function Fd(e) {
  return e = rh(e), e !== null ? Od(e) : null;
}
function Od(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Od(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Rd = De.unstable_scheduleCallback, Wu = De.unstable_cancelCallback, ah = De.unstable_shouldYield, oh = De.unstable_requestPaint, te = De.unstable_now, ih = De.unstable_getCurrentPriorityLevel, es = De.unstable_ImmediatePriority, $d = De.unstable_UserBlockingPriority, no = De.unstable_NormalPriority, lh = De.unstable_LowPriority, Hd = De.unstable_IdlePriority, Ao = null, pt = null;
function sh(e) {
  if (pt && typeof pt.onCommitFiberRoot == "function") try {
    pt.onCommitFiberRoot(Ao, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ze = Math.clz32 ? Math.clz32 : dh, uh = Math.log, ch = Math.LN2;
function dh(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (uh(e) / ch | 0) | 0;
}
var Ta = 64, ka = 4194304;
function Mr(e) {
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
function ro(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, a = e.suspendedLanes, o = e.pingedLanes, i = n & 268435455;
  if (i !== 0) {
    var l = i & ~a;
    l !== 0 ? r = Mr(l) : (o &= i, o !== 0 && (r = Mr(o)));
  } else i = n & ~a, i !== 0 ? r = Mr(i) : o !== 0 && (r = Mr(o));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & a) && (a = r & -r, o = t & -t, a >= o || a === 16 && (o & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ze(t), a = 1 << n, r |= e[n], t &= ~a;
  return r;
}
function fh(e, t) {
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
function mh(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, a = e.expirationTimes, o = e.pendingLanes; 0 < o; ) {
    var i = 31 - Ze(o), l = 1 << i, s = a[i];
    s === -1 ? (!(l & n) || l & r) && (a[i] = fh(l, t)) : s <= t && (e.expiredLanes |= l), o &= ~l;
  }
}
function ol(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function Wd() {
  var e = Ta;
  return Ta <<= 1, !(Ta & 4194240) && (Ta = 64), e;
}
function ui(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function sa(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ze(t), e[t] = n;
}
function ph(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var a = 31 - Ze(n), o = 1 << a;
    t[a] = 0, r[a] = -1, e[a] = -1, n &= ~o;
  }
}
function ts(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ze(n), a = 1 << r;
    a & t | e[r] & t && (e[r] |= t), n &= ~a;
  }
}
var R = 0;
function Bd(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var Ud, ns, Vd, Kd, Gd, il = !1, xa = [], Rt = null, $t = null, Ht = null, Vr = /* @__PURE__ */ new Map(), Kr = /* @__PURE__ */ new Map(), Dt = [], hh = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Bu(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Rt = null;
      break;
    case "dragenter":
    case "dragleave":
      $t = null;
      break;
    case "mouseover":
    case "mouseout":
      Ht = null;
      break;
    case "pointerover":
    case "pointerout":
      Vr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Kr.delete(t.pointerId);
  }
}
function yr(e, t, n, r, a, o) {
  return e === null || e.nativeEvent !== o ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: o, targetContainers: [a] }, t !== null && (t = ca(t), t !== null && ns(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, a !== null && t.indexOf(a) === -1 && t.push(a), e);
}
function gh(e, t, n, r, a) {
  switch (t) {
    case "focusin":
      return Rt = yr(Rt, e, t, n, r, a), !0;
    case "dragenter":
      return $t = yr($t, e, t, n, r, a), !0;
    case "mouseover":
      return Ht = yr(Ht, e, t, n, r, a), !0;
    case "pointerover":
      var o = a.pointerId;
      return Vr.set(o, yr(Vr.get(o) || null, e, t, n, r, a)), !0;
    case "gotpointercapture":
      return o = a.pointerId, Kr.set(o, yr(Kr.get(o) || null, e, t, n, r, a)), !0;
  }
  return !1;
}
function Qd(e) {
  var t = on(e.target);
  if (t !== null) {
    var n = _n(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = zd(n), t !== null) {
          e.blockedOn = t, Gd(e.priority, function() {
            Vd(n);
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
function Ra(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = ll(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      tl = r, n.target.dispatchEvent(r), tl = null;
    } else return t = ca(n), t !== null && ns(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function Uu(e, t, n) {
  Ra(e) && n.delete(t);
}
function yh() {
  il = !1, Rt !== null && Ra(Rt) && (Rt = null), $t !== null && Ra($t) && ($t = null), Ht !== null && Ra(Ht) && (Ht = null), Vr.forEach(Uu), Kr.forEach(Uu);
}
function vr(e, t) {
  e.blockedOn === t && (e.blockedOn = null, il || (il = !0, De.unstable_scheduleCallback(De.unstable_NormalPriority, yh)));
}
function Gr(e) {
  function t(a) {
    return vr(a, e);
  }
  if (0 < xa.length) {
    vr(xa[0], e);
    for (var n = 1; n < xa.length; n++) {
      var r = xa[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (Rt !== null && vr(Rt, e), $t !== null && vr($t, e), Ht !== null && vr(Ht, e), Vr.forEach(t), Kr.forEach(t), n = 0; n < Dt.length; n++) r = Dt[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Dt.length && (n = Dt[0], n.blockedOn === null); ) Qd(n), n.blockedOn === null && Dt.shift();
}
var Yn = Mt.ReactCurrentBatchConfig, ao = !0;
function vh(e, t, n, r) {
  var a = R, o = Yn.transition;
  Yn.transition = null;
  try {
    R = 1, rs(e, t, n, r);
  } finally {
    R = a, Yn.transition = o;
  }
}
function Sh(e, t, n, r) {
  var a = R, o = Yn.transition;
  Yn.transition = null;
  try {
    R = 4, rs(e, t, n, r);
  } finally {
    R = a, Yn.transition = o;
  }
}
function rs(e, t, n, r) {
  if (ao) {
    var a = ll(e, t, n, r);
    if (a === null) Si(e, t, r, oo, n), Bu(e, r);
    else if (gh(a, e, t, n, r)) r.stopPropagation();
    else if (Bu(e, r), t & 4 && -1 < hh.indexOf(e)) {
      for (; a !== null; ) {
        var o = ca(a);
        if (o !== null && Ud(o), o = ll(e, t, n, r), o === null && Si(e, t, r, oo, n), o === a) break;
        a = o;
      }
      a !== null && r.stopPropagation();
    } else Si(e, t, r, null, n);
  }
}
var oo = null;
function ll(e, t, n, r) {
  if (oo = null, e = Jl(r), e = on(e), e !== null) if (t = _n(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = zd(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return oo = e, null;
}
function Yd(e) {
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
      switch (ih()) {
        case es:
          return 1;
        case $d:
          return 4;
        case no:
        case lh:
          return 16;
        case Hd:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Ft = null, as = null, $a = null;
function qd() {
  if ($a) return $a;
  var e, t = as, n = t.length, r, a = "value" in Ft ? Ft.value : Ft.textContent, o = a.length;
  for (e = 0; e < n && t[e] === a[e]; e++) ;
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === a[o - r]; r++) ;
  return $a = a.slice(e, 1 < r ? 1 - r : void 0);
}
function Ha(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function ba() {
  return !0;
}
function Vu() {
  return !1;
}
function Fe(e) {
  function t(n, r, a, o, i) {
    this._reactName = n, this._targetInst = a, this.type = r, this.nativeEvent = o, this.target = i, this.currentTarget = null;
    for (var l in e) e.hasOwnProperty(l) && (n = e[l], this[l] = n ? n(o) : o[l]);
    return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? ba : Vu, this.isPropagationStopped = Vu, this;
  }
  return X(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ba);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ba);
  }, persist: function() {
  }, isPersistent: ba }), t;
}
var sr = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, os = Fe(sr), ua = X({}, sr, { view: 0, detail: 0 }), _h = Fe(ua), ci, di, Sr, Io = X({}, ua, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: is, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Sr && (Sr && e.type === "mousemove" ? (ci = e.screenX - Sr.screenX, di = e.screenY - Sr.screenY) : di = ci = 0, Sr = e), ci);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : di;
} }), Ku = Fe(Io), wh = X({}, Io, { dataTransfer: 0 }), Th = Fe(wh), kh = X({}, ua, { relatedTarget: 0 }), fi = Fe(kh), xh = X({}, sr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), bh = Fe(xh), Nh = X({}, sr, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), Ch = Fe(Nh), Mh = X({}, sr, { data: 0 }), Gu = Fe(Mh), Eh = {
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
}, Ah = {
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
}, Ih = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Lh(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Ih[e]) ? !!t[e] : !1;
}
function is() {
  return Lh;
}
var jh = X({}, ua, { key: function(e) {
  if (e.key) {
    var t = Eh[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ha(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Ah[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: is, charCode: function(e) {
  return e.type === "keypress" ? Ha(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ha(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), Ph = Fe(jh), Dh = X({}, Io, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Qu = Fe(Dh), zh = X({}, ua, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: is }), Fh = Fe(zh), Oh = X({}, sr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Rh = Fe(Oh), $h = X({}, Io, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Hh = Fe($h), Wh = [9, 13, 27, 32], ls = xt && "CompositionEvent" in window, jr = null;
xt && "documentMode" in document && (jr = document.documentMode);
var Bh = xt && "TextEvent" in window && !jr, Xd = xt && (!ls || jr && 8 < jr && 11 >= jr), Yu = " ", qu = !1;
function Zd(e, t) {
  switch (e) {
    case "keyup":
      return Wh.indexOf(t.keyCode) !== -1;
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
function Jd(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var In = !1;
function Uh(e, t) {
  switch (e) {
    case "compositionend":
      return Jd(t);
    case "keypress":
      return t.which !== 32 ? null : (qu = !0, Yu);
    case "textInput":
      return e = t.data, e === Yu && qu ? null : e;
    default:
      return null;
  }
}
function Vh(e, t) {
  if (In) return e === "compositionend" || !ls && Zd(e, t) ? (e = qd(), $a = as = Ft = null, In = !1, e) : null;
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
      return Xd && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var Kh = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Xu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!Kh[e.type] : t === "textarea";
}
function ef(e, t, n, r) {
  Id(r), t = io(t, "onChange"), 0 < t.length && (n = new os("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Pr = null, Qr = null;
function Gh(e) {
  ff(e, 0);
}
function Lo(e) {
  var t = Pn(e);
  if (xd(t)) return e;
}
function Qh(e, t) {
  if (e === "change") return t;
}
var tf = !1;
if (xt) {
  var mi;
  if (xt) {
    var pi = "oninput" in document;
    if (!pi) {
      var Zu = document.createElement("div");
      Zu.setAttribute("oninput", "return;"), pi = typeof Zu.oninput == "function";
    }
    mi = pi;
  } else mi = !1;
  tf = mi && (!document.documentMode || 9 < document.documentMode);
}
function Ju() {
  Pr && (Pr.detachEvent("onpropertychange", nf), Qr = Pr = null);
}
function nf(e) {
  if (e.propertyName === "value" && Lo(Qr)) {
    var t = [];
    ef(t, Qr, e, Jl(e)), Dd(Gh, t);
  }
}
function Yh(e, t, n) {
  e === "focusin" ? (Ju(), Pr = t, Qr = n, Pr.attachEvent("onpropertychange", nf)) : e === "focusout" && Ju();
}
function qh(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Lo(Qr);
}
function Xh(e, t) {
  if (e === "click") return Lo(t);
}
function Zh(e, t) {
  if (e === "input" || e === "change") return Lo(t);
}
function Jh(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var et = typeof Object.is == "function" ? Object.is : Jh;
function Yr(e, t) {
  if (et(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var a = n[r];
    if (!Bi.call(t, a) || !et(e[a], t[a])) return !1;
  }
  return !0;
}
function ec(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function tc(e, t) {
  var n = ec(e);
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
    n = ec(n);
  }
}
function rf(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? rf(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function af() {
  for (var e = window, t = Ja(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Ja(e.document);
  }
  return t;
}
function ss(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function eg(e) {
  var t = af(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && rf(n.ownerDocument.documentElement, n)) {
    if (r !== null && ss(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var a = n.textContent.length, o = Math.min(r.start, a);
        r = r.end === void 0 ? o : Math.min(r.end, a), !e.extend && o > r && (a = r, r = o, o = a), a = tc(n, o);
        var i = tc(
          n,
          r
        );
        a && i && (e.rangeCount !== 1 || e.anchorNode !== a.node || e.anchorOffset !== a.offset || e.focusNode !== i.node || e.focusOffset !== i.offset) && (t = t.createRange(), t.setStart(a.node, a.offset), e.removeAllRanges(), o > r ? (e.addRange(t), e.extend(i.node, i.offset)) : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var tg = xt && "documentMode" in document && 11 >= document.documentMode, Ln = null, sl = null, Dr = null, ul = !1;
function nc(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  ul || Ln == null || Ln !== Ja(r) || (r = Ln, "selectionStart" in r && ss(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Dr && Yr(Dr, r) || (Dr = r, r = io(sl, "onSelect"), 0 < r.length && (t = new os("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Ln)));
}
function Na(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var jn = { animationend: Na("Animation", "AnimationEnd"), animationiteration: Na("Animation", "AnimationIteration"), animationstart: Na("Animation", "AnimationStart"), transitionend: Na("Transition", "TransitionEnd") }, hi = {}, of = {};
xt && (of = document.createElement("div").style, "AnimationEvent" in window || (delete jn.animationend.animation, delete jn.animationiteration.animation, delete jn.animationstart.animation), "TransitionEvent" in window || delete jn.transitionend.transition);
function jo(e) {
  if (hi[e]) return hi[e];
  if (!jn[e]) return e;
  var t = jn[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in of) return hi[e] = t[n];
  return e;
}
var lf = jo("animationend"), sf = jo("animationiteration"), uf = jo("animationstart"), cf = jo("transitionend"), df = /* @__PURE__ */ new Map(), rc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Xt(e, t) {
  df.set(e, t), Sn(t, [e]);
}
for (var gi = 0; gi < rc.length; gi++) {
  var yi = rc[gi], ng = yi.toLowerCase(), rg = yi[0].toUpperCase() + yi.slice(1);
  Xt(ng, "on" + rg);
}
Xt(lf, "onAnimationEnd");
Xt(sf, "onAnimationIteration");
Xt(uf, "onAnimationStart");
Xt("dblclick", "onDoubleClick");
Xt("focusin", "onFocus");
Xt("focusout", "onBlur");
Xt(cf, "onTransitionEnd");
Zn("onMouseEnter", ["mouseout", "mouseover"]);
Zn("onMouseLeave", ["mouseout", "mouseover"]);
Zn("onPointerEnter", ["pointerout", "pointerover"]);
Zn("onPointerLeave", ["pointerout", "pointerover"]);
Sn("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Sn("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Sn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Sn("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Sn("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Sn("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Er = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ag = new Set("cancel close invalid load scroll toggle".split(" ").concat(Er));
function ac(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, nh(r, t, void 0, e), e.currentTarget = null;
}
function ff(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], a = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t) for (var i = r.length - 1; 0 <= i; i--) {
        var l = r[i], s = l.instance, c = l.currentTarget;
        if (l = l.listener, s !== o && a.isPropagationStopped()) break e;
        ac(a, l, c), o = s;
      }
      else for (i = 0; i < r.length; i++) {
        if (l = r[i], s = l.instance, c = l.currentTarget, l = l.listener, s !== o && a.isPropagationStopped()) break e;
        ac(a, l, c), o = s;
      }
    }
  }
  if (to) throw e = al, to = !1, al = null, e;
}
function B(e, t) {
  var n = t[pl];
  n === void 0 && (n = t[pl] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (mf(t, e, 2, !1), n.add(r));
}
function vi(e, t, n) {
  var r = 0;
  t && (r |= 4), mf(n, e, r, t);
}
var Ca = "_reactListening" + Math.random().toString(36).slice(2);
function qr(e) {
  if (!e[Ca]) {
    e[Ca] = !0, Sd.forEach(function(n) {
      n !== "selectionchange" && (ag.has(n) || vi(n, !1, e), vi(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[Ca] || (t[Ca] = !0, vi("selectionchange", !1, t));
  }
}
function mf(e, t, n, r) {
  switch (Yd(t)) {
    case 1:
      var a = vh;
      break;
    case 4:
      a = Sh;
      break;
    default:
      a = rs;
  }
  n = a.bind(null, t, n, e), a = void 0, !rl || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (a = !0), r ? a !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: a }) : e.addEventListener(t, n, !0) : a !== void 0 ? e.addEventListener(t, n, { passive: a }) : e.addEventListener(t, n, !1);
}
function Si(e, t, n, r, a) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var i = r.tag;
    if (i === 3 || i === 4) {
      var l = r.stateNode.containerInfo;
      if (l === a || l.nodeType === 8 && l.parentNode === a) break;
      if (i === 4) for (i = r.return; i !== null; ) {
        var s = i.tag;
        if ((s === 3 || s === 4) && (s = i.stateNode.containerInfo, s === a || s.nodeType === 8 && s.parentNode === a)) return;
        i = i.return;
      }
      for (; l !== null; ) {
        if (i = on(l), i === null) return;
        if (s = i.tag, s === 5 || s === 6) {
          r = o = i;
          continue e;
        }
        l = l.parentNode;
      }
    }
    r = r.return;
  }
  Dd(function() {
    var c = o, m = Jl(n), p = [];
    e: {
      var d = df.get(e);
      if (d !== void 0) {
        var h = os, v = e;
        switch (e) {
          case "keypress":
            if (Ha(n) === 0) break e;
          case "keydown":
          case "keyup":
            h = Ph;
            break;
          case "focusin":
            v = "focus", h = fi;
            break;
          case "focusout":
            v = "blur", h = fi;
            break;
          case "beforeblur":
          case "afterblur":
            h = fi;
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
            h = Ku;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            h = Th;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            h = Fh;
            break;
          case lf:
          case sf:
          case uf:
            h = bh;
            break;
          case cf:
            h = Rh;
            break;
          case "scroll":
            h = _h;
            break;
          case "wheel":
            h = Hh;
            break;
          case "copy":
          case "cut":
          case "paste":
            h = Ch;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            h = Qu;
        }
        var _ = (t & 4) !== 0, L = !_ && e === "scroll", g = _ ? d !== null ? d + "Capture" : null : d;
        _ = [];
        for (var f = c, y; f !== null; ) {
          y = f;
          var S = y.stateNode;
          if (y.tag === 5 && S !== null && (y = S, g !== null && (S = Ur(f, g), S != null && _.push(Xr(f, S, y)))), L) break;
          f = f.return;
        }
        0 < _.length && (d = new h(d, v, null, n, m), p.push({ event: d, listeners: _ }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (d = e === "mouseover" || e === "pointerover", h = e === "mouseout" || e === "pointerout", d && n !== tl && (v = n.relatedTarget || n.fromElement) && (on(v) || v[bt])) break e;
        if ((h || d) && (d = m.window === m ? m : (d = m.ownerDocument) ? d.defaultView || d.parentWindow : window, h ? (v = n.relatedTarget || n.toElement, h = c, v = v ? on(v) : null, v !== null && (L = _n(v), v !== L || v.tag !== 5 && v.tag !== 6) && (v = null)) : (h = null, v = c), h !== v)) {
          if (_ = Ku, S = "onMouseLeave", g = "onMouseEnter", f = "mouse", (e === "pointerout" || e === "pointerover") && (_ = Qu, S = "onPointerLeave", g = "onPointerEnter", f = "pointer"), L = h == null ? d : Pn(h), y = v == null ? d : Pn(v), d = new _(S, f + "leave", h, n, m), d.target = L, d.relatedTarget = y, S = null, on(m) === c && (_ = new _(g, f + "enter", v, n, m), _.target = y, _.relatedTarget = L, S = _), L = S, h && v) t: {
            for (_ = h, g = v, f = 0, y = _; y; y = xn(y)) f++;
            for (y = 0, S = g; S; S = xn(S)) y++;
            for (; 0 < f - y; ) _ = xn(_), f--;
            for (; 0 < y - f; ) g = xn(g), y--;
            for (; f--; ) {
              if (_ === g || g !== null && _ === g.alternate) break t;
              _ = xn(_), g = xn(g);
            }
            _ = null;
          }
          else _ = null;
          h !== null && oc(p, d, h, _, !1), v !== null && L !== null && oc(p, L, v, _, !0);
        }
      }
      e: {
        if (d = c ? Pn(c) : window, h = d.nodeName && d.nodeName.toLowerCase(), h === "select" || h === "input" && d.type === "file") var b = Qh;
        else if (Xu(d)) if (tf) b = Zh;
        else {
          b = qh;
          var w = Yh;
        }
        else (h = d.nodeName) && h.toLowerCase() === "input" && (d.type === "checkbox" || d.type === "radio") && (b = Xh);
        if (b && (b = b(e, c))) {
          ef(p, b, n, m);
          break e;
        }
        w && w(e, d, c), e === "focusout" && (w = d._wrapperState) && w.controlled && d.type === "number" && qi(d, "number", d.value);
      }
      switch (w = c ? Pn(c) : window, e) {
        case "focusin":
          (Xu(w) || w.contentEditable === "true") && (Ln = w, sl = c, Dr = null);
          break;
        case "focusout":
          Dr = sl = Ln = null;
          break;
        case "mousedown":
          ul = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          ul = !1, nc(p, n, m);
          break;
        case "selectionchange":
          if (tg) break;
        case "keydown":
        case "keyup":
          nc(p, n, m);
      }
      var k;
      if (ls) e: {
        switch (e) {
          case "compositionstart":
            var N = "onCompositionStart";
            break e;
          case "compositionend":
            N = "onCompositionEnd";
            break e;
          case "compositionupdate":
            N = "onCompositionUpdate";
            break e;
        }
        N = void 0;
      }
      else In ? Zd(e, n) && (N = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      N && (Xd && n.locale !== "ko" && (In || N !== "onCompositionStart" ? N === "onCompositionEnd" && In && (k = qd()) : (Ft = m, as = "value" in Ft ? Ft.value : Ft.textContent, In = !0)), w = io(c, N), 0 < w.length && (N = new Gu(N, e, null, n, m), p.push({ event: N, listeners: w }), k ? N.data = k : (k = Jd(n), k !== null && (N.data = k)))), (k = Bh ? Uh(e, n) : Vh(e, n)) && (c = io(c, "onBeforeInput"), 0 < c.length && (m = new Gu("onBeforeInput", "beforeinput", null, n, m), p.push({ event: m, listeners: c }), m.data = k));
    }
    ff(p, t);
  });
}
function Xr(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function io(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var a = e, o = a.stateNode;
    a.tag === 5 && o !== null && (a = o, o = Ur(e, n), o != null && r.unshift(Xr(e, o, a)), o = Ur(e, t), o != null && r.push(Xr(e, o, a))), e = e.return;
  }
  return r;
}
function xn(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function oc(e, t, n, r, a) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var l = n, s = l.alternate, c = l.stateNode;
    if (s !== null && s === r) break;
    l.tag === 5 && c !== null && (l = c, a ? (s = Ur(n, o), s != null && i.unshift(Xr(n, s, l))) : a || (s = Ur(n, o), s != null && i.push(Xr(n, s, l)))), n = n.return;
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var og = /\r\n?/g, ig = /\u0000|\uFFFD/g;
function ic(e) {
  return (typeof e == "string" ? e : "" + e).replace(og, `
`).replace(ig, "");
}
function Ma(e, t, n) {
  if (t = ic(t), ic(e) !== t && n) throw Error(T(425));
}
function lo() {
}
var cl = null, dl = null;
function fl(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var ml = typeof setTimeout == "function" ? setTimeout : void 0, lg = typeof clearTimeout == "function" ? clearTimeout : void 0, lc = typeof Promise == "function" ? Promise : void 0, sg = typeof queueMicrotask == "function" ? queueMicrotask : typeof lc < "u" ? function(e) {
  return lc.resolve(null).then(e).catch(ug);
} : ml;
function ug(e) {
  setTimeout(function() {
    throw e;
  });
}
function _i(e, t) {
  var n = t, r = 0;
  do {
    var a = n.nextSibling;
    if (e.removeChild(n), a && a.nodeType === 8) if (n = a.data, n === "/$") {
      if (r === 0) {
        e.removeChild(a), Gr(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = a;
  } while (n);
  Gr(t);
}
function Wt(e) {
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
function sc(e) {
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
var ur = Math.random().toString(36).slice(2), ct = "__reactFiber$" + ur, Zr = "__reactProps$" + ur, bt = "__reactContainer$" + ur, pl = "__reactEvents$" + ur, cg = "__reactListeners$" + ur, dg = "__reactHandles$" + ur;
function on(e) {
  var t = e[ct];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[bt] || n[ct]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = sc(e); e !== null; ) {
        if (n = e[ct]) return n;
        e = sc(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function ca(e) {
  return e = e[ct] || e[bt], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function Pn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(T(33));
}
function Po(e) {
  return e[Zr] || null;
}
var hl = [], Dn = -1;
function Zt(e) {
  return { current: e };
}
function U(e) {
  0 > Dn || (e.current = hl[Dn], hl[Dn] = null, Dn--);
}
function W(e, t) {
  Dn++, hl[Dn] = e.current, e.current = t;
}
var qt = {}, ye = Zt(qt), xe = Zt(!1), pn = qt;
function Jn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return qt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var a = {}, o;
  for (o in n) a[o] = t[o];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = a), a;
}
function be(e) {
  return e = e.childContextTypes, e != null;
}
function so() {
  U(xe), U(ye);
}
function uc(e, t, n) {
  if (ye.current !== qt) throw Error(T(168));
  W(ye, t), W(xe, n);
}
function pf(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var a in r) if (!(a in t)) throw Error(T(108, Yp(e) || "Unknown", a));
  return X({}, n, r);
}
function uo(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || qt, pn = ye.current, W(ye, e), W(xe, xe.current), !0;
}
function cc(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(T(169));
  n ? (e = pf(e, t, pn), r.__reactInternalMemoizedMergedChildContext = e, U(xe), U(ye), W(ye, e)) : U(xe), W(xe, n);
}
var St = null, Do = !1, wi = !1;
function hf(e) {
  St === null ? St = [e] : St.push(e);
}
function fg(e) {
  Do = !0, hf(e);
}
function Jt() {
  if (!wi && St !== null) {
    wi = !0;
    var e = 0, t = R;
    try {
      var n = St;
      for (R = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      St = null, Do = !1;
    } catch (a) {
      throw St !== null && (St = St.slice(e + 1)), Rd(es, Jt), a;
    } finally {
      R = t, wi = !1;
    }
  }
  return null;
}
var zn = [], Fn = 0, co = null, fo = 0, $e = [], He = 0, hn = null, wt = 1, Tt = "";
function nn(e, t) {
  zn[Fn++] = fo, zn[Fn++] = co, co = e, fo = t;
}
function gf(e, t, n) {
  $e[He++] = wt, $e[He++] = Tt, $e[He++] = hn, hn = e;
  var r = wt;
  e = Tt;
  var a = 32 - Ze(r) - 1;
  r &= ~(1 << a), n += 1;
  var o = 32 - Ze(t) + a;
  if (30 < o) {
    var i = a - a % 5;
    o = (r & (1 << i) - 1).toString(32), r >>= i, a -= i, wt = 1 << 32 - Ze(t) + a | n << a | r, Tt = o + e;
  } else wt = 1 << o | n << a | r, Tt = e;
}
function us(e) {
  e.return !== null && (nn(e, 1), gf(e, 1, 0));
}
function cs(e) {
  for (; e === co; ) co = zn[--Fn], zn[Fn] = null, fo = zn[--Fn], zn[Fn] = null;
  for (; e === hn; ) hn = $e[--He], $e[He] = null, Tt = $e[--He], $e[He] = null, wt = $e[--He], $e[He] = null;
}
var je = null, Le = null, Q = !1, qe = null;
function yf(e, t) {
  var n = We(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function dc(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, je = e, Le = Wt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, je = e, Le = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = hn !== null ? { id: wt, overflow: Tt } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = We(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, je = e, Le = null, !0) : !1;
    default:
      return !1;
  }
}
function gl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function yl(e) {
  if (Q) {
    var t = Le;
    if (t) {
      var n = t;
      if (!dc(e, t)) {
        if (gl(e)) throw Error(T(418));
        t = Wt(n.nextSibling);
        var r = je;
        t && dc(e, t) ? yf(r, n) : (e.flags = e.flags & -4097 | 2, Q = !1, je = e);
      }
    } else {
      if (gl(e)) throw Error(T(418));
      e.flags = e.flags & -4097 | 2, Q = !1, je = e;
    }
  }
}
function fc(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  je = e;
}
function Ea(e) {
  if (e !== je) return !1;
  if (!Q) return fc(e), Q = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !fl(e.type, e.memoizedProps)), t && (t = Le)) {
    if (gl(e)) throw vf(), Error(T(418));
    for (; t; ) yf(e, t), t = Wt(t.nextSibling);
  }
  if (fc(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(T(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Le = Wt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      Le = null;
    }
  } else Le = je ? Wt(e.stateNode.nextSibling) : null;
  return !0;
}
function vf() {
  for (var e = Le; e; ) e = Wt(e.nextSibling);
}
function er() {
  Le = je = null, Q = !1;
}
function ds(e) {
  qe === null ? qe = [e] : qe.push(e);
}
var mg = Mt.ReactCurrentBatchConfig;
function _r(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(T(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(T(147, e));
      var a = r, o = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === o ? t.ref : (t = function(i) {
        var l = a.refs;
        i === null ? delete l[o] : l[o] = i;
      }, t._stringRef = o, t);
    }
    if (typeof e != "string") throw Error(T(284));
    if (!n._owner) throw Error(T(290, e));
  }
  return e;
}
function Aa(e, t) {
  throw e = Object.prototype.toString.call(t), Error(T(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function mc(e) {
  var t = e._init;
  return t(e._payload);
}
function Sf(e) {
  function t(g, f) {
    if (e) {
      var y = g.deletions;
      y === null ? (g.deletions = [f], g.flags |= 16) : y.push(f);
    }
  }
  function n(g, f) {
    if (!e) return null;
    for (; f !== null; ) t(g, f), f = f.sibling;
    return null;
  }
  function r(g, f) {
    for (g = /* @__PURE__ */ new Map(); f !== null; ) f.key !== null ? g.set(f.key, f) : g.set(f.index, f), f = f.sibling;
    return g;
  }
  function a(g, f) {
    return g = Kt(g, f), g.index = 0, g.sibling = null, g;
  }
  function o(g, f, y) {
    return g.index = y, e ? (y = g.alternate, y !== null ? (y = y.index, y < f ? (g.flags |= 2, f) : y) : (g.flags |= 2, f)) : (g.flags |= 1048576, f);
  }
  function i(g) {
    return e && g.alternate === null && (g.flags |= 2), g;
  }
  function l(g, f, y, S) {
    return f === null || f.tag !== 6 ? (f = Mi(y, g.mode, S), f.return = g, f) : (f = a(f, y), f.return = g, f);
  }
  function s(g, f, y, S) {
    var b = y.type;
    return b === An ? m(g, f, y.props.children, S, y.key) : f !== null && (f.elementType === b || typeof b == "object" && b !== null && b.$$typeof === It && mc(b) === f.type) ? (S = a(f, y.props), S.ref = _r(g, f, y), S.return = g, S) : (S = Qa(y.type, y.key, y.props, null, g.mode, S), S.ref = _r(g, f, y), S.return = g, S);
  }
  function c(g, f, y, S) {
    return f === null || f.tag !== 4 || f.stateNode.containerInfo !== y.containerInfo || f.stateNode.implementation !== y.implementation ? (f = Ei(y, g.mode, S), f.return = g, f) : (f = a(f, y.children || []), f.return = g, f);
  }
  function m(g, f, y, S, b) {
    return f === null || f.tag !== 7 ? (f = cn(y, g.mode, S, b), f.return = g, f) : (f = a(f, y), f.return = g, f);
  }
  function p(g, f, y) {
    if (typeof f == "string" && f !== "" || typeof f == "number") return f = Mi("" + f, g.mode, y), f.return = g, f;
    if (typeof f == "object" && f !== null) {
      switch (f.$$typeof) {
        case Sa:
          return y = Qa(f.type, f.key, f.props, null, g.mode, y), y.ref = _r(g, null, f), y.return = g, y;
        case En:
          return f = Ei(f, g.mode, y), f.return = g, f;
        case It:
          var S = f._init;
          return p(g, S(f._payload), y);
      }
      if (Cr(f) || hr(f)) return f = cn(f, g.mode, y, null), f.return = g, f;
      Aa(g, f);
    }
    return null;
  }
  function d(g, f, y, S) {
    var b = f !== null ? f.key : null;
    if (typeof y == "string" && y !== "" || typeof y == "number") return b !== null ? null : l(g, f, "" + y, S);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Sa:
          return y.key === b ? s(g, f, y, S) : null;
        case En:
          return y.key === b ? c(g, f, y, S) : null;
        case It:
          return b = y._init, d(
            g,
            f,
            b(y._payload),
            S
          );
      }
      if (Cr(y) || hr(y)) return b !== null ? null : m(g, f, y, S, null);
      Aa(g, y);
    }
    return null;
  }
  function h(g, f, y, S, b) {
    if (typeof S == "string" && S !== "" || typeof S == "number") return g = g.get(y) || null, l(f, g, "" + S, b);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case Sa:
          return g = g.get(S.key === null ? y : S.key) || null, s(f, g, S, b);
        case En:
          return g = g.get(S.key === null ? y : S.key) || null, c(f, g, S, b);
        case It:
          var w = S._init;
          return h(g, f, y, w(S._payload), b);
      }
      if (Cr(S) || hr(S)) return g = g.get(y) || null, m(f, g, S, b, null);
      Aa(f, S);
    }
    return null;
  }
  function v(g, f, y, S) {
    for (var b = null, w = null, k = f, N = f = 0, A = null; k !== null && N < y.length; N++) {
      k.index > N ? (A = k, k = null) : A = k.sibling;
      var E = d(g, k, y[N], S);
      if (E === null) {
        k === null && (k = A);
        break;
      }
      e && k && E.alternate === null && t(g, k), f = o(E, f, N), w === null ? b = E : w.sibling = E, w = E, k = A;
    }
    if (N === y.length) return n(g, k), Q && nn(g, N), b;
    if (k === null) {
      for (; N < y.length; N++) k = p(g, y[N], S), k !== null && (f = o(k, f, N), w === null ? b = k : w.sibling = k, w = k);
      return Q && nn(g, N), b;
    }
    for (k = r(g, k); N < y.length; N++) A = h(k, g, N, y[N], S), A !== null && (e && A.alternate !== null && k.delete(A.key === null ? N : A.key), f = o(A, f, N), w === null ? b = A : w.sibling = A, w = A);
    return e && k.forEach(function(V) {
      return t(g, V);
    }), Q && nn(g, N), b;
  }
  function _(g, f, y, S) {
    var b = hr(y);
    if (typeof b != "function") throw Error(T(150));
    if (y = b.call(y), y == null) throw Error(T(151));
    for (var w = b = null, k = f, N = f = 0, A = null, E = y.next(); k !== null && !E.done; N++, E = y.next()) {
      k.index > N ? (A = k, k = null) : A = k.sibling;
      var V = d(g, k, E.value, S);
      if (V === null) {
        k === null && (k = A);
        break;
      }
      e && k && V.alternate === null && t(g, k), f = o(V, f, N), w === null ? b = V : w.sibling = V, w = V, k = A;
    }
    if (E.done) return n(
      g,
      k
    ), Q && nn(g, N), b;
    if (k === null) {
      for (; !E.done; N++, E = y.next()) E = p(g, E.value, S), E !== null && (f = o(E, f, N), w === null ? b = E : w.sibling = E, w = E);
      return Q && nn(g, N), b;
    }
    for (k = r(g, k); !E.done; N++, E = y.next()) E = h(k, g, N, E.value, S), E !== null && (e && E.alternate !== null && k.delete(E.key === null ? N : E.key), f = o(E, f, N), w === null ? b = E : w.sibling = E, w = E);
    return e && k.forEach(function($) {
      return t(g, $);
    }), Q && nn(g, N), b;
  }
  function L(g, f, y, S) {
    if (typeof y == "object" && y !== null && y.type === An && y.key === null && (y = y.props.children), typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case Sa:
          e: {
            for (var b = y.key, w = f; w !== null; ) {
              if (w.key === b) {
                if (b = y.type, b === An) {
                  if (w.tag === 7) {
                    n(g, w.sibling), f = a(w, y.props.children), f.return = g, g = f;
                    break e;
                  }
                } else if (w.elementType === b || typeof b == "object" && b !== null && b.$$typeof === It && mc(b) === w.type) {
                  n(g, w.sibling), f = a(w, y.props), f.ref = _r(g, w, y), f.return = g, g = f;
                  break e;
                }
                n(g, w);
                break;
              } else t(g, w);
              w = w.sibling;
            }
            y.type === An ? (f = cn(y.props.children, g.mode, S, y.key), f.return = g, g = f) : (S = Qa(y.type, y.key, y.props, null, g.mode, S), S.ref = _r(g, f, y), S.return = g, g = S);
          }
          return i(g);
        case En:
          e: {
            for (w = y.key; f !== null; ) {
              if (f.key === w) if (f.tag === 4 && f.stateNode.containerInfo === y.containerInfo && f.stateNode.implementation === y.implementation) {
                n(g, f.sibling), f = a(f, y.children || []), f.return = g, g = f;
                break e;
              } else {
                n(g, f);
                break;
              }
              else t(g, f);
              f = f.sibling;
            }
            f = Ei(y, g.mode, S), f.return = g, g = f;
          }
          return i(g);
        case It:
          return w = y._init, L(g, f, w(y._payload), S);
      }
      if (Cr(y)) return v(g, f, y, S);
      if (hr(y)) return _(g, f, y, S);
      Aa(g, y);
    }
    return typeof y == "string" && y !== "" || typeof y == "number" ? (y = "" + y, f !== null && f.tag === 6 ? (n(g, f.sibling), f = a(f, y), f.return = g, g = f) : (n(g, f), f = Mi(y, g.mode, S), f.return = g, g = f), i(g)) : n(g, f);
  }
  return L;
}
var tr = Sf(!0), _f = Sf(!1), mo = Zt(null), po = null, On = null, fs = null;
function ms() {
  fs = On = po = null;
}
function ps(e) {
  var t = mo.current;
  U(mo), e._currentValue = t;
}
function vl(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function qn(e, t) {
  po = e, fs = On = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (ke = !0), e.firstContext = null);
}
function Ue(e) {
  var t = e._currentValue;
  if (fs !== e) if (e = { context: e, memoizedValue: t, next: null }, On === null) {
    if (po === null) throw Error(T(308));
    On = e, po.dependencies = { lanes: 0, firstContext: e };
  } else On = On.next = e;
  return t;
}
var ln = null;
function hs(e) {
  ln === null ? ln = [e] : ln.push(e);
}
function wf(e, t, n, r) {
  var a = t.interleaved;
  return a === null ? (n.next = n, hs(t)) : (n.next = a.next, a.next = n), t.interleaved = n, Nt(e, r);
}
function Nt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var Lt = !1;
function gs(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Tf(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function kt(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function Bt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, O & 2) {
    var a = r.pending;
    return a === null ? t.next = t : (t.next = a.next, a.next = t), r.pending = t, Nt(e, n);
  }
  return a = r.interleaved, a === null ? (t.next = t, hs(r)) : (t.next = a.next, a.next = t), r.interleaved = t, Nt(e, n);
}
function Wa(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ts(e, n);
  }
}
function pc(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var a = null, o = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var i = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        o === null ? a = o = i : o = o.next = i, n = n.next;
      } while (n !== null);
      o === null ? a = o = t : o = o.next = t;
    } else a = o = t;
    n = { baseState: r.baseState, firstBaseUpdate: a, lastBaseUpdate: o, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ho(e, t, n, r) {
  var a = e.updateQueue;
  Lt = !1;
  var o = a.firstBaseUpdate, i = a.lastBaseUpdate, l = a.shared.pending;
  if (l !== null) {
    a.shared.pending = null;
    var s = l, c = s.next;
    s.next = null, i === null ? o = c : i.next = c, i = s;
    var m = e.alternate;
    m !== null && (m = m.updateQueue, l = m.lastBaseUpdate, l !== i && (l === null ? m.firstBaseUpdate = c : l.next = c, m.lastBaseUpdate = s));
  }
  if (o !== null) {
    var p = a.baseState;
    i = 0, m = c = s = null, l = o;
    do {
      var d = l.lane, h = l.eventTime;
      if ((r & d) === d) {
        m !== null && (m = m.next = {
          eventTime: h,
          lane: 0,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null
        });
        e: {
          var v = e, _ = l;
          switch (d = t, h = n, _.tag) {
            case 1:
              if (v = _.payload, typeof v == "function") {
                p = v.call(h, p, d);
                break e;
              }
              p = v;
              break e;
            case 3:
              v.flags = v.flags & -65537 | 128;
            case 0:
              if (v = _.payload, d = typeof v == "function" ? v.call(h, p, d) : v, d == null) break e;
              p = X({}, p, d);
              break e;
            case 2:
              Lt = !0;
          }
        }
        l.callback !== null && l.lane !== 0 && (e.flags |= 64, d = a.effects, d === null ? a.effects = [l] : d.push(l));
      } else h = { eventTime: h, lane: d, tag: l.tag, payload: l.payload, callback: l.callback, next: null }, m === null ? (c = m = h, s = p) : m = m.next = h, i |= d;
      if (l = l.next, l === null) {
        if (l = a.shared.pending, l === null) break;
        d = l, l = d.next, d.next = null, a.lastBaseUpdate = d, a.shared.pending = null;
      }
    } while (!0);
    if (m === null && (s = p), a.baseState = s, a.firstBaseUpdate = c, a.lastBaseUpdate = m, t = a.shared.interleaved, t !== null) {
      a = t;
      do
        i |= a.lane, a = a.next;
      while (a !== t);
    } else o === null && (a.shared.lanes = 0);
    yn |= i, e.lanes = i, e.memoizedState = p;
  }
}
function hc(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], a = r.callback;
    if (a !== null) {
      if (r.callback = null, r = n, typeof a != "function") throw Error(T(191, a));
      a.call(r);
    }
  }
}
var da = {}, ht = Zt(da), Jr = Zt(da), ea = Zt(da);
function sn(e) {
  if (e === da) throw Error(T(174));
  return e;
}
function ys(e, t) {
  switch (W(ea, t), W(Jr, e), W(ht, da), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Zi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = Zi(t, e);
  }
  U(ht), W(ht, t);
}
function nr() {
  U(ht), U(Jr), U(ea);
}
function kf(e) {
  sn(ea.current);
  var t = sn(ht.current), n = Zi(t, e.type);
  t !== n && (W(Jr, e), W(ht, n));
}
function vs(e) {
  Jr.current === e && (U(ht), U(Jr));
}
var Y = Zt(0);
function go(e) {
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
var Ti = [];
function Ss() {
  for (var e = 0; e < Ti.length; e++) Ti[e]._workInProgressVersionPrimary = null;
  Ti.length = 0;
}
var Ba = Mt.ReactCurrentDispatcher, ki = Mt.ReactCurrentBatchConfig, gn = 0, q = null, ae = null, ie = null, yo = !1, zr = !1, ta = 0, pg = 0;
function fe() {
  throw Error(T(321));
}
function _s(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!et(e[n], t[n])) return !1;
  return !0;
}
function ws(e, t, n, r, a, o) {
  if (gn = o, q = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, Ba.current = e === null || e.memoizedState === null ? vg : Sg, e = n(r, a), zr) {
    o = 0;
    do {
      if (zr = !1, ta = 0, 25 <= o) throw Error(T(301));
      o += 1, ie = ae = null, t.updateQueue = null, Ba.current = _g, e = n(r, a);
    } while (zr);
  }
  if (Ba.current = vo, t = ae !== null && ae.next !== null, gn = 0, ie = ae = q = null, yo = !1, t) throw Error(T(300));
  return e;
}
function Ts() {
  var e = ta !== 0;
  return ta = 0, e;
}
function lt() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ie === null ? q.memoizedState = ie = e : ie = ie.next = e, ie;
}
function Ve() {
  if (ae === null) {
    var e = q.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ae.next;
  var t = ie === null ? q.memoizedState : ie.next;
  if (t !== null) ie = t, ae = e;
  else {
    if (e === null) throw Error(T(310));
    ae = e, e = { memoizedState: ae.memoizedState, baseState: ae.baseState, baseQueue: ae.baseQueue, queue: ae.queue, next: null }, ie === null ? q.memoizedState = ie = e : ie = ie.next = e;
  }
  return ie;
}
function na(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function xi(e) {
  var t = Ve(), n = t.queue;
  if (n === null) throw Error(T(311));
  n.lastRenderedReducer = e;
  var r = ae, a = r.baseQueue, o = n.pending;
  if (o !== null) {
    if (a !== null) {
      var i = a.next;
      a.next = o.next, o.next = i;
    }
    r.baseQueue = a = o, n.pending = null;
  }
  if (a !== null) {
    o = a.next, r = r.baseState;
    var l = i = null, s = null, c = o;
    do {
      var m = c.lane;
      if ((gn & m) === m) s !== null && (s = s.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var p = {
          lane: m,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        s === null ? (l = s = p, i = r) : s = s.next = p, q.lanes |= m, yn |= m;
      }
      c = c.next;
    } while (c !== null && c !== o);
    s === null ? i = r : s.next = l, et(r, t.memoizedState) || (ke = !0), t.memoizedState = r, t.baseState = i, t.baseQueue = s, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    a = e;
    do
      o = a.lane, q.lanes |= o, yn |= o, a = a.next;
    while (a !== e);
  } else a === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function bi(e) {
  var t = Ve(), n = t.queue;
  if (n === null) throw Error(T(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, a = n.pending, o = t.memoizedState;
  if (a !== null) {
    n.pending = null;
    var i = a = a.next;
    do
      o = e(o, i.action), i = i.next;
    while (i !== a);
    et(o, t.memoizedState) || (ke = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
  }
  return [o, r];
}
function xf() {
}
function bf(e, t) {
  var n = q, r = Ve(), a = t(), o = !et(r.memoizedState, a);
  if (o && (r.memoizedState = a, ke = !0), r = r.queue, ks(Mf.bind(null, n, r, e), [e]), r.getSnapshot !== t || o || ie !== null && ie.memoizedState.tag & 1) {
    if (n.flags |= 2048, ra(9, Cf.bind(null, n, r, a, t), void 0, null), le === null) throw Error(T(349));
    gn & 30 || Nf(n, t, a);
  }
  return a;
}
function Nf(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, q.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Cf(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ef(t) && Af(e);
}
function Mf(e, t, n) {
  return n(function() {
    Ef(t) && Af(e);
  });
}
function Ef(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !et(e, n);
  } catch {
    return !0;
  }
}
function Af(e) {
  var t = Nt(e, 1);
  t !== null && Je(t, e, 1, -1);
}
function gc(e) {
  var t = lt();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: na, lastRenderedState: e }, t.queue = e, e = e.dispatch = yg.bind(null, q, e), [t.memoizedState, e];
}
function ra(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = q.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, q.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function If() {
  return Ve().memoizedState;
}
function Ua(e, t, n, r) {
  var a = lt();
  q.flags |= e, a.memoizedState = ra(1 | t, n, void 0, r === void 0 ? null : r);
}
function zo(e, t, n, r) {
  var a = Ve();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (ae !== null) {
    var i = ae.memoizedState;
    if (o = i.destroy, r !== null && _s(r, i.deps)) {
      a.memoizedState = ra(t, n, o, r);
      return;
    }
  }
  q.flags |= e, a.memoizedState = ra(1 | t, n, o, r);
}
function yc(e, t) {
  return Ua(8390656, 8, e, t);
}
function ks(e, t) {
  return zo(2048, 8, e, t);
}
function Lf(e, t) {
  return zo(4, 2, e, t);
}
function jf(e, t) {
  return zo(4, 4, e, t);
}
function Pf(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function Df(e, t, n) {
  return n = n != null ? n.concat([e]) : null, zo(4, 4, Pf.bind(null, t, e), n);
}
function xs() {
}
function zf(e, t) {
  var n = Ve();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _s(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function Ff(e, t) {
  var n = Ve();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && _s(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function Of(e, t, n) {
  return gn & 21 ? (et(n, t) || (n = Wd(), q.lanes |= n, yn |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, ke = !0), e.memoizedState = n);
}
function hg(e, t) {
  var n = R;
  R = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ki.transition;
  ki.transition = {};
  try {
    e(!1), t();
  } finally {
    R = n, ki.transition = r;
  }
}
function Rf() {
  return Ve().memoizedState;
}
function gg(e, t, n) {
  var r = Vt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, $f(e)) Hf(t, n);
  else if (n = wf(e, t, n, r), n !== null) {
    var a = Se();
    Je(n, e, r, a), Wf(n, t, r);
  }
}
function yg(e, t, n) {
  var r = Vt(e), a = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if ($f(e)) Hf(t, a);
  else {
    var o = e.alternate;
    if (e.lanes === 0 && (o === null || o.lanes === 0) && (o = t.lastRenderedReducer, o !== null)) try {
      var i = t.lastRenderedState, l = o(i, n);
      if (a.hasEagerState = !0, a.eagerState = l, et(l, i)) {
        var s = t.interleaved;
        s === null ? (a.next = a, hs(t)) : (a.next = s.next, s.next = a), t.interleaved = a;
        return;
      }
    } catch {
    } finally {
    }
    n = wf(e, t, a, r), n !== null && (a = Se(), Je(n, e, r, a), Wf(n, t, r));
  }
}
function $f(e) {
  var t = e.alternate;
  return e === q || t !== null && t === q;
}
function Hf(e, t) {
  zr = yo = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function Wf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, ts(e, n);
  }
}
var vo = { readContext: Ue, useCallback: fe, useContext: fe, useEffect: fe, useImperativeHandle: fe, useInsertionEffect: fe, useLayoutEffect: fe, useMemo: fe, useReducer: fe, useRef: fe, useState: fe, useDebugValue: fe, useDeferredValue: fe, useTransition: fe, useMutableSource: fe, useSyncExternalStore: fe, useId: fe, unstable_isNewReconciler: !1 }, vg = { readContext: Ue, useCallback: function(e, t) {
  return lt().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: Ue, useEffect: yc, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Ua(
    4194308,
    4,
    Pf.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Ua(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Ua(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = lt();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = lt();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = gg.bind(null, q, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = lt();
  return e = { current: e }, t.memoizedState = e;
}, useState: gc, useDebugValue: xs, useDeferredValue: function(e) {
  return lt().memoizedState = e;
}, useTransition: function() {
  var e = gc(!1), t = e[0];
  return e = hg.bind(null, e[1]), lt().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = q, a = lt();
  if (Q) {
    if (n === void 0) throw Error(T(407));
    n = n();
  } else {
    if (n = t(), le === null) throw Error(T(349));
    gn & 30 || Nf(r, t, n);
  }
  a.memoizedState = n;
  var o = { value: n, getSnapshot: t };
  return a.queue = o, yc(Mf.bind(
    null,
    r,
    o,
    e
  ), [e]), r.flags |= 2048, ra(9, Cf.bind(null, r, o, n, t), void 0, null), n;
}, useId: function() {
  var e = lt(), t = le.identifierPrefix;
  if (Q) {
    var n = Tt, r = wt;
    n = (r & ~(1 << 32 - Ze(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = ta++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = pg++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Sg = {
  readContext: Ue,
  useCallback: zf,
  useContext: Ue,
  useEffect: ks,
  useImperativeHandle: Df,
  useInsertionEffect: Lf,
  useLayoutEffect: jf,
  useMemo: Ff,
  useReducer: xi,
  useRef: If,
  useState: function() {
    return xi(na);
  },
  useDebugValue: xs,
  useDeferredValue: function(e) {
    var t = Ve();
    return Of(t, ae.memoizedState, e);
  },
  useTransition: function() {
    var e = xi(na)[0], t = Ve().memoizedState;
    return [e, t];
  },
  useMutableSource: xf,
  useSyncExternalStore: bf,
  useId: Rf,
  unstable_isNewReconciler: !1
}, _g = { readContext: Ue, useCallback: zf, useContext: Ue, useEffect: ks, useImperativeHandle: Df, useInsertionEffect: Lf, useLayoutEffect: jf, useMemo: Ff, useReducer: bi, useRef: If, useState: function() {
  return bi(na);
}, useDebugValue: xs, useDeferredValue: function(e) {
  var t = Ve();
  return ae === null ? t.memoizedState = e : Of(t, ae.memoizedState, e);
}, useTransition: function() {
  var e = bi(na)[0], t = Ve().memoizedState;
  return [e, t];
}, useMutableSource: xf, useSyncExternalStore: bf, useId: Rf, unstable_isNewReconciler: !1 };
function Qe(e, t) {
  if (e && e.defaultProps) {
    t = X({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Sl(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : X({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Fo = { isMounted: function(e) {
  return (e = e._reactInternals) ? _n(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = Se(), a = Vt(e), o = kt(r, a);
  o.payload = t, n != null && (o.callback = n), t = Bt(e, o, a), t !== null && (Je(t, e, a, r), Wa(t, e, a));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = Se(), a = Vt(e), o = kt(r, a);
  o.tag = 1, o.payload = t, n != null && (o.callback = n), t = Bt(e, o, a), t !== null && (Je(t, e, a, r), Wa(t, e, a));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = Se(), r = Vt(e), a = kt(n, r);
  a.tag = 2, t != null && (a.callback = t), t = Bt(e, a, r), t !== null && (Je(t, e, r, n), Wa(t, e, r));
} };
function vc(e, t, n, r, a, o, i) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, o, i) : t.prototype && t.prototype.isPureReactComponent ? !Yr(n, r) || !Yr(a, o) : !0;
}
function Bf(e, t, n) {
  var r = !1, a = qt, o = t.contextType;
  return typeof o == "object" && o !== null ? o = Ue(o) : (a = be(t) ? pn : ye.current, r = t.contextTypes, o = (r = r != null) ? Jn(e, a) : qt), t = new t(n, o), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Fo, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = a, e.__reactInternalMemoizedMaskedChildContext = o), t;
}
function Sc(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Fo.enqueueReplaceState(t, t.state, null);
}
function _l(e, t, n, r) {
  var a = e.stateNode;
  a.props = n, a.state = e.memoizedState, a.refs = {}, gs(e);
  var o = t.contextType;
  typeof o == "object" && o !== null ? a.context = Ue(o) : (o = be(t) ? pn : ye.current, a.context = Jn(e, o)), a.state = e.memoizedState, o = t.getDerivedStateFromProps, typeof o == "function" && (Sl(e, t, o, n), a.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (t = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), t !== a.state && Fo.enqueueReplaceState(a, a.state, null), ho(e, n, a, r), a.state = e.memoizedState), typeof a.componentDidMount == "function" && (e.flags |= 4194308);
}
function rr(e, t) {
  try {
    var n = "", r = t;
    do
      n += Qp(r), r = r.return;
    while (r);
    var a = n;
  } catch (o) {
    a = `
Error generating stack: ` + o.message + `
` + o.stack;
  }
  return { value: e, source: t, stack: a, digest: null };
}
function Ni(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function wl(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var wg = typeof WeakMap == "function" ? WeakMap : Map;
function Uf(e, t, n) {
  n = kt(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    _o || (_o = !0, Il = r), wl(e, t);
  }, n;
}
function Vf(e, t, n) {
  n = kt(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var a = t.value;
    n.payload = function() {
      return r(a);
    }, n.callback = function() {
      wl(e, t);
    };
  }
  var o = e.stateNode;
  return o !== null && typeof o.componentDidCatch == "function" && (n.callback = function() {
    wl(e, t), typeof r != "function" && (Ut === null ? Ut = /* @__PURE__ */ new Set([this]) : Ut.add(this));
    var i = t.stack;
    this.componentDidCatch(t.value, { componentStack: i !== null ? i : "" });
  }), n;
}
function _c(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new wg();
    var a = /* @__PURE__ */ new Set();
    r.set(t, a);
  } else a = r.get(t), a === void 0 && (a = /* @__PURE__ */ new Set(), r.set(t, a));
  a.has(n) || (a.add(n), e = Dg.bind(null, e, t, n), t.then(e, e));
}
function wc(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Tc(e, t, n, r, a) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = a, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = kt(-1, 1), t.tag = 2, Bt(n, t, 1))), n.lanes |= 1), e);
}
var Tg = Mt.ReactCurrentOwner, ke = !1;
function ve(e, t, n, r) {
  t.child = e === null ? _f(t, null, n, r) : tr(t, e.child, n, r);
}
function kc(e, t, n, r, a) {
  n = n.render;
  var o = t.ref;
  return qn(t, a), r = ws(e, t, n, r, o, a), n = Ts(), e !== null && !ke ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Ct(e, t, a)) : (Q && n && us(t), t.flags |= 1, ve(e, t, r, a), t.child);
}
function xc(e, t, n, r, a) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" && !Ls(o) && o.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = o, Kf(e, t, o, r, a)) : (e = Qa(n.type, null, r, t, t.mode, a), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (o = e.child, !(e.lanes & a)) {
    var i = o.memoizedProps;
    if (n = n.compare, n = n !== null ? n : Yr, n(i, r) && e.ref === t.ref) return Ct(e, t, a);
  }
  return t.flags |= 1, e = Kt(o, r), e.ref = t.ref, e.return = t, t.child = e;
}
function Kf(e, t, n, r, a) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Yr(o, r) && e.ref === t.ref) if (ke = !1, t.pendingProps = r = o, (e.lanes & a) !== 0) e.flags & 131072 && (ke = !0);
    else return t.lanes = e.lanes, Ct(e, t, a);
  }
  return Tl(e, t, n, r, a);
}
function Gf(e, t, n) {
  var r = t.pendingProps, a = r.children, o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, W($n, Ae), Ae |= n;
  else {
    if (!(n & 1073741824)) return e = o !== null ? o.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, W($n, Ae), Ae |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = o !== null ? o.baseLanes : n, W($n, Ae), Ae |= r;
  }
  else o !== null ? (r = o.baseLanes | n, t.memoizedState = null) : r = n, W($n, Ae), Ae |= r;
  return ve(e, t, a, n), t.child;
}
function Qf(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Tl(e, t, n, r, a) {
  var o = be(n) ? pn : ye.current;
  return o = Jn(t, o), qn(t, a), n = ws(e, t, n, r, o, a), r = Ts(), e !== null && !ke ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~a, Ct(e, t, a)) : (Q && r && us(t), t.flags |= 1, ve(e, t, n, a), t.child);
}
function bc(e, t, n, r, a) {
  if (be(n)) {
    var o = !0;
    uo(t);
  } else o = !1;
  if (qn(t, a), t.stateNode === null) Va(e, t), Bf(t, n, r), _l(t, n, r, a), r = !0;
  else if (e === null) {
    var i = t.stateNode, l = t.memoizedProps;
    i.props = l;
    var s = i.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = Ue(c) : (c = be(n) ? pn : ye.current, c = Jn(t, c));
    var m = n.getDerivedStateFromProps, p = typeof m == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    p || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (l !== r || s !== c) && Sc(t, i, r, c), Lt = !1;
    var d = t.memoizedState;
    i.state = d, ho(t, r, i, a), s = t.memoizedState, l !== r || d !== s || xe.current || Lt ? (typeof m == "function" && (Sl(t, n, m, r), s = t.memoizedState), (l = Lt || vc(t, n, l, r, d, s, c)) ? (p || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = s), i.props = r, i.state = s, i.context = c, r = l) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    i = t.stateNode, Tf(e, t), l = t.memoizedProps, c = t.type === t.elementType ? l : Qe(t.type, l), i.props = c, p = t.pendingProps, d = i.context, s = n.contextType, typeof s == "object" && s !== null ? s = Ue(s) : (s = be(n) ? pn : ye.current, s = Jn(t, s));
    var h = n.getDerivedStateFromProps;
    (m = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (l !== p || d !== s) && Sc(t, i, r, s), Lt = !1, d = t.memoizedState, i.state = d, ho(t, r, i, a);
    var v = t.memoizedState;
    l !== p || d !== v || xe.current || Lt ? (typeof h == "function" && (Sl(t, n, h, r), v = t.memoizedState), (c = Lt || vc(t, n, c, r, d, v, s) || !1) ? (m || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(r, v, s), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(r, v, s)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = v), i.props = r, i.state = v, i.context = s, r = c) : (typeof i.componentDidUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || l === e.memoizedProps && d === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return kl(e, t, n, r, o, a);
}
function kl(e, t, n, r, a, o) {
  Qf(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return a && cc(t, n, !1), Ct(e, t, o);
  r = t.stateNode, Tg.current = t;
  var l = i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && i ? (t.child = tr(t, e.child, null, o), t.child = tr(t, null, l, o)) : ve(e, t, l, o), t.memoizedState = r.state, a && cc(t, n, !0), t.child;
}
function Yf(e) {
  var t = e.stateNode;
  t.pendingContext ? uc(e, t.pendingContext, t.pendingContext !== t.context) : t.context && uc(e, t.context, !1), ys(e, t.containerInfo);
}
function Nc(e, t, n, r, a) {
  return er(), ds(a), t.flags |= 256, ve(e, t, n, r), t.child;
}
var xl = { dehydrated: null, treeContext: null, retryLane: 0 };
function bl(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function qf(e, t, n) {
  var r = t.pendingProps, a = Y.current, o = !1, i = (t.flags & 128) !== 0, l;
  if ((l = i) || (l = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0), l ? (o = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (a |= 1), W(Y, a & 1), e === null)
    return yl(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (i = r.children, e = r.fallback, o ? (r = t.mode, o = t.child, i = { mode: "hidden", children: i }, !(r & 1) && o !== null ? (o.childLanes = 0, o.pendingProps = i) : o = $o(i, r, 0, null), e = cn(e, r, n, null), o.return = t, e.return = t, o.sibling = e, t.child = o, t.child.memoizedState = bl(n), t.memoizedState = xl, e) : bs(t, i));
  if (a = e.memoizedState, a !== null && (l = a.dehydrated, l !== null)) return kg(e, t, i, r, l, a, n);
  if (o) {
    o = r.fallback, i = t.mode, a = e.child, l = a.sibling;
    var s = { mode: "hidden", children: r.children };
    return !(i & 1) && t.child !== a ? (r = t.child, r.childLanes = 0, r.pendingProps = s, t.deletions = null) : (r = Kt(a, s), r.subtreeFlags = a.subtreeFlags & 14680064), l !== null ? o = Kt(l, o) : (o = cn(o, i, n, null), o.flags |= 2), o.return = t, r.return = t, r.sibling = o, t.child = r, r = o, o = t.child, i = e.child.memoizedState, i = i === null ? bl(n) : { baseLanes: i.baseLanes | n, cachePool: null, transitions: i.transitions }, o.memoizedState = i, o.childLanes = e.childLanes & ~n, t.memoizedState = xl, r;
  }
  return o = e.child, e = o.sibling, r = Kt(o, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function bs(e, t) {
  return t = $o({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Ia(e, t, n, r) {
  return r !== null && ds(r), tr(t, e.child, null, n), e = bs(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function kg(e, t, n, r, a, o, i) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = Ni(Error(T(422))), Ia(e, t, i, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (o = r.fallback, a = t.mode, r = $o({ mode: "visible", children: r.children }, a, 0, null), o = cn(o, a, i, null), o.flags |= 2, r.return = t, o.return = t, r.sibling = o, t.child = r, t.mode & 1 && tr(t, e.child, null, i), t.child.memoizedState = bl(i), t.memoizedState = xl, o);
  if (!(t.mode & 1)) return Ia(e, t, i, null);
  if (a.data === "$!") {
    if (r = a.nextSibling && a.nextSibling.dataset, r) var l = r.dgst;
    return r = l, o = Error(T(419)), r = Ni(o, r, void 0), Ia(e, t, i, r);
  }
  if (l = (i & e.childLanes) !== 0, ke || l) {
    if (r = le, r !== null) {
      switch (i & -i) {
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
      a = a & (r.suspendedLanes | i) ? 0 : a, a !== 0 && a !== o.retryLane && (o.retryLane = a, Nt(e, a), Je(r, e, a, -1));
    }
    return Is(), r = Ni(Error(T(421))), Ia(e, t, i, r);
  }
  return a.data === "$?" ? (t.flags |= 128, t.child = e.child, t = zg.bind(null, e), a._reactRetry = t, null) : (e = o.treeContext, Le = Wt(a.nextSibling), je = t, Q = !0, qe = null, e !== null && ($e[He++] = wt, $e[He++] = Tt, $e[He++] = hn, wt = e.id, Tt = e.overflow, hn = t), t = bs(t, r.children), t.flags |= 4096, t);
}
function Cc(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), vl(e.return, t, n);
}
function Ci(e, t, n, r, a) {
  var o = e.memoizedState;
  o === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: a } : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = a);
}
function Xf(e, t, n) {
  var r = t.pendingProps, a = r.revealOrder, o = r.tail;
  if (ve(e, t, r.children, n), r = Y.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && Cc(e, n, t);
      else if (e.tag === 19) Cc(e, n, t);
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
  if (W(Y, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (a) {
    case "forwards":
      for (n = t.child, a = null; n !== null; ) e = n.alternate, e !== null && go(e) === null && (a = n), n = n.sibling;
      n = a, n === null ? (a = t.child, t.child = null) : (a = n.sibling, n.sibling = null), Ci(t, !1, a, n, o);
      break;
    case "backwards":
      for (n = null, a = t.child, t.child = null; a !== null; ) {
        if (e = a.alternate, e !== null && go(e) === null) {
          t.child = a;
          break;
        }
        e = a.sibling, a.sibling = n, n = a, a = e;
      }
      Ci(t, !0, n, null, o);
      break;
    case "together":
      Ci(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Va(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function Ct(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), yn |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(T(153));
  if (t.child !== null) {
    for (e = t.child, n = Kt(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = Kt(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function xg(e, t, n) {
  switch (t.tag) {
    case 3:
      Yf(t), er();
      break;
    case 5:
      kf(t);
      break;
    case 1:
      be(t.type) && uo(t);
      break;
    case 4:
      ys(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, a = t.memoizedProps.value;
      W(mo, r._currentValue), r._currentValue = a;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (W(Y, Y.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? qf(e, t, n) : (W(Y, Y.current & 1), e = Ct(e, t, n), e !== null ? e.sibling : null);
      W(Y, Y.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return Xf(e, t, n);
        t.flags |= 128;
      }
      if (a = t.memoizedState, a !== null && (a.rendering = null, a.tail = null, a.lastEffect = null), W(Y, Y.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, Gf(e, t, n);
  }
  return Ct(e, t, n);
}
var Zf, Nl, Jf, em;
Zf = function(e, t) {
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
Nl = function() {
};
Jf = function(e, t, n, r) {
  var a = e.memoizedProps;
  if (a !== r) {
    e = t.stateNode, sn(ht.current);
    var o = null;
    switch (n) {
      case "input":
        a = Qi(e, a), r = Qi(e, r), o = [];
        break;
      case "select":
        a = X({}, a, { value: void 0 }), r = X({}, r, { value: void 0 }), o = [];
        break;
      case "textarea":
        a = Xi(e, a), r = Xi(e, r), o = [];
        break;
      default:
        typeof a.onClick != "function" && typeof r.onClick == "function" && (e.onclick = lo);
    }
    Ji(n, r);
    var i;
    n = null;
    for (c in a) if (!r.hasOwnProperty(c) && a.hasOwnProperty(c) && a[c] != null) if (c === "style") {
      var l = a[c];
      for (i in l) l.hasOwnProperty(i) && (n || (n = {}), n[i] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Wr.hasOwnProperty(c) ? o || (o = []) : (o = o || []).push(c, null));
    for (c in r) {
      var s = r[c];
      if (l = a != null ? a[c] : void 0, r.hasOwnProperty(c) && s !== l && (s != null || l != null)) if (c === "style") if (l) {
        for (i in l) !l.hasOwnProperty(i) || s && s.hasOwnProperty(i) || (n || (n = {}), n[i] = "");
        for (i in s) s.hasOwnProperty(i) && l[i] !== s[i] && (n || (n = {}), n[i] = s[i]);
      } else n || (o || (o = []), o.push(
        c,
        n
      )), n = s;
      else c === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, l = l ? l.__html : void 0, s != null && l !== s && (o = o || []).push(c, s)) : c === "children" ? typeof s != "string" && typeof s != "number" || (o = o || []).push(c, "" + s) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Wr.hasOwnProperty(c) ? (s != null && c === "onScroll" && B("scroll", e), o || l === s || (o = [])) : (o = o || []).push(c, s));
    }
    n && (o = o || []).push("style", n);
    var c = o;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
em = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function wr(e, t) {
  if (!Q) switch (e.tailMode) {
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
function me(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags & 14680064, r |= a.flags & 14680064, a.return = e, a = a.sibling;
  else for (a = e.child; a !== null; ) n |= a.lanes | a.childLanes, r |= a.subtreeFlags, r |= a.flags, a.return = e, a = a.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function bg(e, t, n) {
  var r = t.pendingProps;
  switch (cs(t), t.tag) {
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
      return me(t), null;
    case 1:
      return be(t.type) && so(), me(t), null;
    case 3:
      return r = t.stateNode, nr(), U(xe), U(ye), Ss(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Ea(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, qe !== null && (Pl(qe), qe = null))), Nl(e, t), me(t), null;
    case 5:
      vs(t);
      var a = sn(ea.current);
      if (n = t.type, e !== null && t.stateNode != null) Jf(e, t, n, r, a), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(T(166));
          return me(t), null;
        }
        if (e = sn(ht.current), Ea(t)) {
          r = t.stateNode, n = t.type;
          var o = t.memoizedProps;
          switch (r[ct] = t, r[Zr] = o, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              B("cancel", r), B("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              B("load", r);
              break;
            case "video":
            case "audio":
              for (a = 0; a < Er.length; a++) B(Er[a], r);
              break;
            case "source":
              B("error", r);
              break;
            case "img":
            case "image":
            case "link":
              B(
                "error",
                r
              ), B("load", r);
              break;
            case "details":
              B("toggle", r);
              break;
            case "input":
              zu(r, o), B("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!o.multiple }, B("invalid", r);
              break;
            case "textarea":
              Ou(r, o), B("invalid", r);
          }
          Ji(n, o), a = null;
          for (var i in o) if (o.hasOwnProperty(i)) {
            var l = o[i];
            i === "children" ? typeof l == "string" ? r.textContent !== l && (o.suppressHydrationWarning !== !0 && Ma(r.textContent, l, e), a = ["children", l]) : typeof l == "number" && r.textContent !== "" + l && (o.suppressHydrationWarning !== !0 && Ma(
              r.textContent,
              l,
              e
            ), a = ["children", "" + l]) : Wr.hasOwnProperty(i) && l != null && i === "onScroll" && B("scroll", r);
          }
          switch (n) {
            case "input":
              _a(r), Fu(r, o, !0);
              break;
            case "textarea":
              _a(r), Ru(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = lo);
          }
          r = a, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          i = a.nodeType === 9 ? a : a.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Cd(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = i.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = i.createElement(n, { is: r.is }) : (e = i.createElement(n), n === "select" && (i = e, r.multiple ? i.multiple = !0 : r.size && (i.size = r.size))) : e = i.createElementNS(e, n), e[ct] = t, e[Zr] = r, Zf(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (i = el(n, r), n) {
              case "dialog":
                B("cancel", e), B("close", e), a = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                B("load", e), a = r;
                break;
              case "video":
              case "audio":
                for (a = 0; a < Er.length; a++) B(Er[a], e);
                a = r;
                break;
              case "source":
                B("error", e), a = r;
                break;
              case "img":
              case "image":
              case "link":
                B(
                  "error",
                  e
                ), B("load", e), a = r;
                break;
              case "details":
                B("toggle", e), a = r;
                break;
              case "input":
                zu(e, r), a = Qi(e, r), B("invalid", e);
                break;
              case "option":
                a = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, a = X({}, r, { value: void 0 }), B("invalid", e);
                break;
              case "textarea":
                Ou(e, r), a = Xi(e, r), B("invalid", e);
                break;
              default:
                a = r;
            }
            Ji(n, a), l = a;
            for (o in l) if (l.hasOwnProperty(o)) {
              var s = l[o];
              o === "style" ? Ad(e, s) : o === "dangerouslySetInnerHTML" ? (s = s ? s.__html : void 0, s != null && Md(e, s)) : o === "children" ? typeof s == "string" ? (n !== "textarea" || s !== "") && Br(e, s) : typeof s == "number" && Br(e, "" + s) : o !== "suppressContentEditableWarning" && o !== "suppressHydrationWarning" && o !== "autoFocus" && (Wr.hasOwnProperty(o) ? s != null && o === "onScroll" && B("scroll", e) : s != null && Yl(e, o, s, i));
            }
            switch (n) {
              case "input":
                _a(e), Fu(e, r, !1);
                break;
              case "textarea":
                _a(e), Ru(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Yt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, o = r.value, o != null ? Kn(e, !!r.multiple, o, !1) : r.defaultValue != null && Kn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof a.onClick == "function" && (e.onclick = lo);
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
      return me(t), null;
    case 6:
      if (e && t.stateNode != null) em(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(T(166));
        if (n = sn(ea.current), sn(ht.current), Ea(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[ct] = t, (o = r.nodeValue !== n) && (e = je, e !== null)) switch (e.tag) {
            case 3:
              Ma(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Ma(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          o && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[ct] = t, t.stateNode = r;
      }
      return me(t), null;
    case 13:
      if (U(Y), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Q && Le !== null && t.mode & 1 && !(t.flags & 128)) vf(), er(), t.flags |= 98560, o = !1;
        else if (o = Ea(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!o) throw Error(T(318));
            if (o = t.memoizedState, o = o !== null ? o.dehydrated : null, !o) throw Error(T(317));
            o[ct] = t;
          } else er(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          me(t), o = !1;
        } else qe !== null && (Pl(qe), qe = null), o = !0;
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || Y.current & 1 ? oe === 0 && (oe = 3) : Is())), t.updateQueue !== null && (t.flags |= 4), me(t), null);
    case 4:
      return nr(), Nl(e, t), e === null && qr(t.stateNode.containerInfo), me(t), null;
    case 10:
      return ps(t.type._context), me(t), null;
    case 17:
      return be(t.type) && so(), me(t), null;
    case 19:
      if (U(Y), o = t.memoizedState, o === null) return me(t), null;
      if (r = (t.flags & 128) !== 0, i = o.rendering, i === null) if (r) wr(o, !1);
      else {
        if (oe !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (i = go(e), i !== null) {
            for (t.flags |= 128, wr(o, !1), r = i.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) o = n, e = r, o.flags &= 14680066, i = o.alternate, i === null ? (o.childLanes = 0, o.lanes = e, o.child = null, o.subtreeFlags = 0, o.memoizedProps = null, o.memoizedState = null, o.updateQueue = null, o.dependencies = null, o.stateNode = null) : (o.childLanes = i.childLanes, o.lanes = i.lanes, o.child = i.child, o.subtreeFlags = 0, o.deletions = null, o.memoizedProps = i.memoizedProps, o.memoizedState = i.memoizedState, o.updateQueue = i.updateQueue, o.type = i.type, e = i.dependencies, o.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return W(Y, Y.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        o.tail !== null && te() > ar && (t.flags |= 128, r = !0, wr(o, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = go(i), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), wr(o, !0), o.tail === null && o.tailMode === "hidden" && !i.alternate && !Q) return me(t), null;
        } else 2 * te() - o.renderingStartTime > ar && n !== 1073741824 && (t.flags |= 128, r = !0, wr(o, !1), t.lanes = 4194304);
        o.isBackwards ? (i.sibling = t.child, t.child = i) : (n = o.last, n !== null ? n.sibling = i : t.child = i, o.last = i);
      }
      return o.tail !== null ? (t = o.tail, o.rendering = t, o.tail = t.sibling, o.renderingStartTime = te(), t.sibling = null, n = Y.current, W(Y, r ? n & 1 | 2 : n & 1), t) : (me(t), null);
    case 22:
    case 23:
      return As(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? Ae & 1073741824 && (me(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : me(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(T(156, t.tag));
}
function Ng(e, t) {
  switch (cs(t), t.tag) {
    case 1:
      return be(t.type) && so(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return nr(), U(xe), U(ye), Ss(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return vs(t), null;
    case 13:
      if (U(Y), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(T(340));
        er();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return U(Y), null;
    case 4:
      return nr(), null;
    case 10:
      return ps(t.type._context), null;
    case 22:
    case 23:
      return As(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var La = !1, he = !1, Cg = typeof WeakSet == "function" ? WeakSet : Set, M = null;
function Rn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    J(e, t, r);
  }
  else n.current = null;
}
function Cl(e, t, n) {
  try {
    n();
  } catch (r) {
    J(e, t, r);
  }
}
var Mc = !1;
function Mg(e, t) {
  if (cl = ao, e = af(), ss(e)) {
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
        var i = 0, l = -1, s = -1, c = 0, m = 0, p = e, d = null;
        t: for (; ; ) {
          for (var h; p !== n || a !== 0 && p.nodeType !== 3 || (l = i + a), p !== o || r !== 0 && p.nodeType !== 3 || (s = i + r), p.nodeType === 3 && (i += p.nodeValue.length), (h = p.firstChild) !== null; )
            d = p, p = h;
          for (; ; ) {
            if (p === e) break t;
            if (d === n && ++c === a && (l = i), d === o && ++m === r && (s = i), (h = p.nextSibling) !== null) break;
            p = d, d = p.parentNode;
          }
          p = h;
        }
        n = l === -1 || s === -1 ? null : { start: l, end: s };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (dl = { focusedElem: e, selectionRange: n }, ao = !1, M = t; M !== null; ) if (t = M, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, M = e;
  else for (; M !== null; ) {
    t = M;
    try {
      var v = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (v !== null) {
            var _ = v.memoizedProps, L = v.memoizedState, g = t.stateNode, f = g.getSnapshotBeforeUpdate(t.elementType === t.type ? _ : Qe(t.type, _), L);
            g.__reactInternalSnapshotBeforeUpdate = f;
          }
          break;
        case 3:
          var y = t.stateNode.containerInfo;
          y.nodeType === 1 ? y.textContent = "" : y.nodeType === 9 && y.documentElement && y.removeChild(y.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(T(163));
      }
    } catch (S) {
      J(t, t.return, S);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, M = e;
      break;
    }
    M = t.return;
  }
  return v = Mc, Mc = !1, v;
}
function Fr(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var a = r = r.next;
    do {
      if ((a.tag & e) === e) {
        var o = a.destroy;
        a.destroy = void 0, o !== void 0 && Cl(t, n, o);
      }
      a = a.next;
    } while (a !== r);
  }
}
function Oo(e, t) {
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
function Ml(e) {
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
function tm(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, tm(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[ct], delete t[Zr], delete t[pl], delete t[cg], delete t[dg])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function nm(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ec(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || nm(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function El(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = lo));
  else if (r !== 4 && (e = e.child, e !== null)) for (El(e, t, n), e = e.sibling; e !== null; ) El(e, t, n), e = e.sibling;
}
function Al(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Al(e, t, n), e = e.sibling; e !== null; ) Al(e, t, n), e = e.sibling;
}
var se = null, Ye = !1;
function At(e, t, n) {
  for (n = n.child; n !== null; ) rm(e, t, n), n = n.sibling;
}
function rm(e, t, n) {
  if (pt && typeof pt.onCommitFiberUnmount == "function") try {
    pt.onCommitFiberUnmount(Ao, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      he || Rn(n, t);
    case 6:
      var r = se, a = Ye;
      se = null, At(e, t, n), se = r, Ye = a, se !== null && (Ye ? (e = se, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : se.removeChild(n.stateNode));
      break;
    case 18:
      se !== null && (Ye ? (e = se, n = n.stateNode, e.nodeType === 8 ? _i(e.parentNode, n) : e.nodeType === 1 && _i(e, n), Gr(e)) : _i(se, n.stateNode));
      break;
    case 4:
      r = se, a = Ye, se = n.stateNode.containerInfo, Ye = !0, At(e, t, n), se = r, Ye = a;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!he && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        a = r = r.next;
        do {
          var o = a, i = o.destroy;
          o = o.tag, i !== void 0 && (o & 2 || o & 4) && Cl(n, t, i), a = a.next;
        } while (a !== r);
      }
      At(e, t, n);
      break;
    case 1:
      if (!he && (Rn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (l) {
        J(n, t, l);
      }
      At(e, t, n);
      break;
    case 21:
      At(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (he = (r = he) || n.memoizedState !== null, At(e, t, n), he = r) : At(e, t, n);
      break;
    default:
      At(e, t, n);
  }
}
function Ac(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new Cg()), t.forEach(function(r) {
      var a = Fg.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(a, a));
    });
  }
}
function Ge(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var a = n[r];
    try {
      var o = e, i = t, l = i;
      e: for (; l !== null; ) {
        switch (l.tag) {
          case 5:
            se = l.stateNode, Ye = !1;
            break e;
          case 3:
            se = l.stateNode.containerInfo, Ye = !0;
            break e;
          case 4:
            se = l.stateNode.containerInfo, Ye = !0;
            break e;
        }
        l = l.return;
      }
      if (se === null) throw Error(T(160));
      rm(o, i, a), se = null, Ye = !1;
      var s = a.alternate;
      s !== null && (s.return = null), a.return = null;
    } catch (c) {
      J(a, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) am(t, e), t = t.sibling;
}
function am(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (Ge(t, e), ot(e), r & 4) {
        try {
          Fr(3, e, e.return), Oo(3, e);
        } catch (_) {
          J(e, e.return, _);
        }
        try {
          Fr(5, e, e.return);
        } catch (_) {
          J(e, e.return, _);
        }
      }
      break;
    case 1:
      Ge(t, e), ot(e), r & 512 && n !== null && Rn(n, n.return);
      break;
    case 5:
      if (Ge(t, e), ot(e), r & 512 && n !== null && Rn(n, n.return), e.flags & 32) {
        var a = e.stateNode;
        try {
          Br(a, "");
        } catch (_) {
          J(e, e.return, _);
        }
      }
      if (r & 4 && (a = e.stateNode, a != null)) {
        var o = e.memoizedProps, i = n !== null ? n.memoizedProps : o, l = e.type, s = e.updateQueue;
        if (e.updateQueue = null, s !== null) try {
          l === "input" && o.type === "radio" && o.name != null && bd(a, o), el(l, i);
          var c = el(l, o);
          for (i = 0; i < s.length; i += 2) {
            var m = s[i], p = s[i + 1];
            m === "style" ? Ad(a, p) : m === "dangerouslySetInnerHTML" ? Md(a, p) : m === "children" ? Br(a, p) : Yl(a, m, p, c);
          }
          switch (l) {
            case "input":
              Yi(a, o);
              break;
            case "textarea":
              Nd(a, o);
              break;
            case "select":
              var d = a._wrapperState.wasMultiple;
              a._wrapperState.wasMultiple = !!o.multiple;
              var h = o.value;
              h != null ? Kn(a, !!o.multiple, h, !1) : d !== !!o.multiple && (o.defaultValue != null ? Kn(
                a,
                !!o.multiple,
                o.defaultValue,
                !0
              ) : Kn(a, !!o.multiple, o.multiple ? [] : "", !1));
          }
          a[Zr] = o;
        } catch (_) {
          J(e, e.return, _);
        }
      }
      break;
    case 6:
      if (Ge(t, e), ot(e), r & 4) {
        if (e.stateNode === null) throw Error(T(162));
        a = e.stateNode, o = e.memoizedProps;
        try {
          a.nodeValue = o;
        } catch (_) {
          J(e, e.return, _);
        }
      }
      break;
    case 3:
      if (Ge(t, e), ot(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Gr(t.containerInfo);
      } catch (_) {
        J(e, e.return, _);
      }
      break;
    case 4:
      Ge(t, e), ot(e);
      break;
    case 13:
      Ge(t, e), ot(e), a = e.child, a.flags & 8192 && (o = a.memoizedState !== null, a.stateNode.isHidden = o, !o || a.alternate !== null && a.alternate.memoizedState !== null || (Ms = te())), r & 4 && Ac(e);
      break;
    case 22:
      if (m = n !== null && n.memoizedState !== null, e.mode & 1 ? (he = (c = he) || m, Ge(t, e), he = c) : Ge(t, e), ot(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !m && e.mode & 1) for (M = e, m = e.child; m !== null; ) {
          for (p = M = m; M !== null; ) {
            switch (d = M, h = d.child, d.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Fr(4, d, d.return);
                break;
              case 1:
                Rn(d, d.return);
                var v = d.stateNode;
                if (typeof v.componentWillUnmount == "function") {
                  r = d, n = d.return;
                  try {
                    t = r, v.props = t.memoizedProps, v.state = t.memoizedState, v.componentWillUnmount();
                  } catch (_) {
                    J(r, n, _);
                  }
                }
                break;
              case 5:
                Rn(d, d.return);
                break;
              case 22:
                if (d.memoizedState !== null) {
                  Lc(p);
                  continue;
                }
            }
            h !== null ? (h.return = d, M = h) : Lc(p);
          }
          m = m.sibling;
        }
        e: for (m = null, p = e; ; ) {
          if (p.tag === 5) {
            if (m === null) {
              m = p;
              try {
                a = p.stateNode, c ? (o = a.style, typeof o.setProperty == "function" ? o.setProperty("display", "none", "important") : o.display = "none") : (l = p.stateNode, s = p.memoizedProps.style, i = s != null && s.hasOwnProperty("display") ? s.display : null, l.style.display = Ed("display", i));
              } catch (_) {
                J(e, e.return, _);
              }
            }
          } else if (p.tag === 6) {
            if (m === null) try {
              p.stateNode.nodeValue = c ? "" : p.memoizedProps;
            } catch (_) {
              J(e, e.return, _);
            }
          } else if ((p.tag !== 22 && p.tag !== 23 || p.memoizedState === null || p === e) && p.child !== null) {
            p.child.return = p, p = p.child;
            continue;
          }
          if (p === e) break e;
          for (; p.sibling === null; ) {
            if (p.return === null || p.return === e) break e;
            m === p && (m = null), p = p.return;
          }
          m === p && (m = null), p.sibling.return = p.return, p = p.sibling;
        }
      }
      break;
    case 19:
      Ge(t, e), ot(e), r & 4 && Ac(e);
      break;
    case 21:
      break;
    default:
      Ge(
        t,
        e
      ), ot(e);
  }
}
function ot(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (nm(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(T(160));
      }
      switch (r.tag) {
        case 5:
          var a = r.stateNode;
          r.flags & 32 && (Br(a, ""), r.flags &= -33);
          var o = Ec(e);
          Al(e, o, a);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo, l = Ec(e);
          El(e, l, i);
          break;
        default:
          throw Error(T(161));
      }
    } catch (s) {
      J(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Eg(e, t, n) {
  M = e, om(e);
}
function om(e, t, n) {
  for (var r = (e.mode & 1) !== 0; M !== null; ) {
    var a = M, o = a.child;
    if (a.tag === 22 && r) {
      var i = a.memoizedState !== null || La;
      if (!i) {
        var l = a.alternate, s = l !== null && l.memoizedState !== null || he;
        l = La;
        var c = he;
        if (La = i, (he = s) && !c) for (M = a; M !== null; ) i = M, s = i.child, i.tag === 22 && i.memoizedState !== null ? jc(a) : s !== null ? (s.return = i, M = s) : jc(a);
        for (; o !== null; ) M = o, om(o), o = o.sibling;
        M = a, La = l, he = c;
      }
      Ic(e);
    } else a.subtreeFlags & 8772 && o !== null ? (o.return = a, M = o) : Ic(e);
  }
}
function Ic(e) {
  for (; M !== null; ) {
    var t = M;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            he || Oo(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !he) if (n === null) r.componentDidMount();
            else {
              var a = t.elementType === t.type ? n.memoizedProps : Qe(t.type, n.memoizedProps);
              r.componentDidUpdate(a, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var o = t.updateQueue;
            o !== null && hc(t, o, r);
            break;
          case 3:
            var i = t.updateQueue;
            if (i !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              hc(t, i, n);
            }
            break;
          case 5:
            var l = t.stateNode;
            if (n === null && t.flags & 4) {
              n = l;
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
              var c = t.alternate;
              if (c !== null) {
                var m = c.memoizedState;
                if (m !== null) {
                  var p = m.dehydrated;
                  p !== null && Gr(p);
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
            throw Error(T(163));
        }
        he || t.flags & 512 && Ml(t);
      } catch (d) {
        J(t, t.return, d);
      }
    }
    if (t === e) {
      M = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, M = n;
      break;
    }
    M = t.return;
  }
}
function Lc(e) {
  for (; M !== null; ) {
    var t = M;
    if (t === e) {
      M = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, M = n;
      break;
    }
    M = t.return;
  }
}
function jc(e) {
  for (; M !== null; ) {
    var t = M;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            Oo(4, t);
          } catch (s) {
            J(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var a = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              J(t, a, s);
            }
          }
          var o = t.return;
          try {
            Ml(t);
          } catch (s) {
            J(t, o, s);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Ml(t);
          } catch (s) {
            J(t, i, s);
          }
      }
    } catch (s) {
      J(t, t.return, s);
    }
    if (t === e) {
      M = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      l.return = t.return, M = l;
      break;
    }
    M = t.return;
  }
}
var Ag = Math.ceil, So = Mt.ReactCurrentDispatcher, Ns = Mt.ReactCurrentOwner, Be = Mt.ReactCurrentBatchConfig, O = 0, le = null, ne = null, ce = 0, Ae = 0, $n = Zt(0), oe = 0, aa = null, yn = 0, Ro = 0, Cs = 0, Or = null, Te = null, Ms = 0, ar = 1 / 0, vt = null, _o = !1, Il = null, Ut = null, ja = !1, Ot = null, wo = 0, Rr = 0, Ll = null, Ka = -1, Ga = 0;
function Se() {
  return O & 6 ? te() : Ka !== -1 ? Ka : Ka = te();
}
function Vt(e) {
  return e.mode & 1 ? O & 2 && ce !== 0 ? ce & -ce : mg.transition !== null ? (Ga === 0 && (Ga = Wd()), Ga) : (e = R, e !== 0 || (e = window.event, e = e === void 0 ? 16 : Yd(e.type)), e) : 1;
}
function Je(e, t, n, r) {
  if (50 < Rr) throw Rr = 0, Ll = null, Error(T(185));
  sa(e, n, r), (!(O & 2) || e !== le) && (e === le && (!(O & 2) && (Ro |= n), oe === 4 && zt(e, ce)), Ne(e, r), n === 1 && O === 0 && !(t.mode & 1) && (ar = te() + 500, Do && Jt()));
}
function Ne(e, t) {
  var n = e.callbackNode;
  mh(e, t);
  var r = ro(e, e === le ? ce : 0);
  if (r === 0) n !== null && Wu(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && Wu(n), t === 1) e.tag === 0 ? fg(Pc.bind(null, e)) : hf(Pc.bind(null, e)), sg(function() {
      !(O & 6) && Jt();
    }), n = null;
    else {
      switch (Bd(r)) {
        case 1:
          n = es;
          break;
        case 4:
          n = $d;
          break;
        case 16:
          n = no;
          break;
        case 536870912:
          n = Hd;
          break;
        default:
          n = no;
      }
      n = mm(n, im.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function im(e, t) {
  if (Ka = -1, Ga = 0, O & 6) throw Error(T(327));
  var n = e.callbackNode;
  if (Xn() && e.callbackNode !== n) return null;
  var r = ro(e, e === le ? ce : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = To(e, r);
  else {
    t = r;
    var a = O;
    O |= 2;
    var o = sm();
    (le !== e || ce !== t) && (vt = null, ar = te() + 500, un(e, t));
    do
      try {
        jg();
        break;
      } catch (l) {
        lm(e, l);
      }
    while (!0);
    ms(), So.current = o, O = a, ne !== null ? t = 0 : (le = null, ce = 0, t = oe);
  }
  if (t !== 0) {
    if (t === 2 && (a = ol(e), a !== 0 && (r = a, t = jl(e, a))), t === 1) throw n = aa, un(e, 0), zt(e, r), Ne(e, te()), n;
    if (t === 6) zt(e, r);
    else {
      if (a = e.current.alternate, !(r & 30) && !Ig(a) && (t = To(e, r), t === 2 && (o = ol(e), o !== 0 && (r = o, t = jl(e, o))), t === 1)) throw n = aa, un(e, 0), zt(e, r), Ne(e, te()), n;
      switch (e.finishedWork = a, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(T(345));
        case 2:
          rn(e, Te, vt);
          break;
        case 3:
          if (zt(e, r), (r & 130023424) === r && (t = Ms + 500 - te(), 10 < t)) {
            if (ro(e, 0) !== 0) break;
            if (a = e.suspendedLanes, (a & r) !== r) {
              Se(), e.pingedLanes |= e.suspendedLanes & a;
              break;
            }
            e.timeoutHandle = ml(rn.bind(null, e, Te, vt), t);
            break;
          }
          rn(e, Te, vt);
          break;
        case 4:
          if (zt(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, a = -1; 0 < r; ) {
            var i = 31 - Ze(r);
            o = 1 << i, i = t[i], i > a && (a = i), r &= ~o;
          }
          if (r = a, r = te() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * Ag(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = ml(rn.bind(null, e, Te, vt), r);
            break;
          }
          rn(e, Te, vt);
          break;
        case 5:
          rn(e, Te, vt);
          break;
        default:
          throw Error(T(329));
      }
    }
  }
  return Ne(e, te()), e.callbackNode === n ? im.bind(null, e) : null;
}
function jl(e, t) {
  var n = Or;
  return e.current.memoizedState.isDehydrated && (un(e, t).flags |= 256), e = To(e, t), e !== 2 && (t = Te, Te = n, t !== null && Pl(t)), e;
}
function Pl(e) {
  Te === null ? Te = e : Te.push.apply(Te, e);
}
function Ig(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var a = n[r], o = a.getSnapshot;
        a = a.value;
        try {
          if (!et(o(), a)) return !1;
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
function zt(e, t) {
  for (t &= ~Cs, t &= ~Ro, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ze(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function Pc(e) {
  if (O & 6) throw Error(T(327));
  Xn();
  var t = ro(e, 0);
  if (!(t & 1)) return Ne(e, te()), null;
  var n = To(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = ol(e);
    r !== 0 && (t = r, n = jl(e, r));
  }
  if (n === 1) throw n = aa, un(e, 0), zt(e, t), Ne(e, te()), n;
  if (n === 6) throw Error(T(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, rn(e, Te, vt), Ne(e, te()), null;
}
function Es(e, t) {
  var n = O;
  O |= 1;
  try {
    return e(t);
  } finally {
    O = n, O === 0 && (ar = te() + 500, Do && Jt());
  }
}
function vn(e) {
  Ot !== null && Ot.tag === 0 && !(O & 6) && Xn();
  var t = O;
  O |= 1;
  var n = Be.transition, r = R;
  try {
    if (Be.transition = null, R = 1, e) return e();
  } finally {
    R = r, Be.transition = n, O = t, !(O & 6) && Jt();
  }
}
function As() {
  Ae = $n.current, U($n);
}
function un(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, lg(n)), ne !== null) for (n = ne.return; n !== null; ) {
    var r = n;
    switch (cs(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && so();
        break;
      case 3:
        nr(), U(xe), U(ye), Ss();
        break;
      case 5:
        vs(r);
        break;
      case 4:
        nr();
        break;
      case 13:
        U(Y);
        break;
      case 19:
        U(Y);
        break;
      case 10:
        ps(r.type._context);
        break;
      case 22:
      case 23:
        As();
    }
    n = n.return;
  }
  if (le = e, ne = e = Kt(e.current, null), ce = Ae = t, oe = 0, aa = null, Cs = Ro = yn = 0, Te = Or = null, ln !== null) {
    for (t = 0; t < ln.length; t++) if (n = ln[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var a = r.next, o = n.pending;
      if (o !== null) {
        var i = o.next;
        o.next = a, r.next = i;
      }
      n.pending = r;
    }
    ln = null;
  }
  return e;
}
function lm(e, t) {
  do {
    var n = ne;
    try {
      if (ms(), Ba.current = vo, yo) {
        for (var r = q.memoizedState; r !== null; ) {
          var a = r.queue;
          a !== null && (a.pending = null), r = r.next;
        }
        yo = !1;
      }
      if (gn = 0, ie = ae = q = null, zr = !1, ta = 0, Ns.current = null, n === null || n.return === null) {
        oe = 1, aa = t, ne = null;
        break;
      }
      e: {
        var o = e, i = n.return, l = n, s = t;
        if (t = ce, l.flags |= 32768, s !== null && typeof s == "object" && typeof s.then == "function") {
          var c = s, m = l, p = m.tag;
          if (!(m.mode & 1) && (p === 0 || p === 11 || p === 15)) {
            var d = m.alternate;
            d ? (m.updateQueue = d.updateQueue, m.memoizedState = d.memoizedState, m.lanes = d.lanes) : (m.updateQueue = null, m.memoizedState = null);
          }
          var h = wc(i);
          if (h !== null) {
            h.flags &= -257, Tc(h, i, l, o, t), h.mode & 1 && _c(o, c, t), t = h, s = c;
            var v = t.updateQueue;
            if (v === null) {
              var _ = /* @__PURE__ */ new Set();
              _.add(s), t.updateQueue = _;
            } else v.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              _c(o, c, t), Is();
              break e;
            }
            s = Error(T(426));
          }
        } else if (Q && l.mode & 1) {
          var L = wc(i);
          if (L !== null) {
            !(L.flags & 65536) && (L.flags |= 256), Tc(L, i, l, o, t), ds(rr(s, l));
            break e;
          }
        }
        o = s = rr(s, l), oe !== 4 && (oe = 2), Or === null ? Or = [o] : Or.push(o), o = i;
        do {
          switch (o.tag) {
            case 3:
              o.flags |= 65536, t &= -t, o.lanes |= t;
              var g = Uf(o, s, t);
              pc(o, g);
              break e;
            case 1:
              l = s;
              var f = o.type, y = o.stateNode;
              if (!(o.flags & 128) && (typeof f.getDerivedStateFromError == "function" || y !== null && typeof y.componentDidCatch == "function" && (Ut === null || !Ut.has(y)))) {
                o.flags |= 65536, t &= -t, o.lanes |= t;
                var S = Vf(o, l, t);
                pc(o, S);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      cm(n);
    } catch (b) {
      t = b, ne === n && n !== null && (ne = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function sm() {
  var e = So.current;
  return So.current = vo, e === null ? vo : e;
}
function Is() {
  (oe === 0 || oe === 3 || oe === 2) && (oe = 4), le === null || !(yn & 268435455) && !(Ro & 268435455) || zt(le, ce);
}
function To(e, t) {
  var n = O;
  O |= 2;
  var r = sm();
  (le !== e || ce !== t) && (vt = null, un(e, t));
  do
    try {
      Lg();
      break;
    } catch (a) {
      lm(e, a);
    }
  while (!0);
  if (ms(), O = n, So.current = r, ne !== null) throw Error(T(261));
  return le = null, ce = 0, oe;
}
function Lg() {
  for (; ne !== null; ) um(ne);
}
function jg() {
  for (; ne !== null && !ah(); ) um(ne);
}
function um(e) {
  var t = fm(e.alternate, e, Ae);
  e.memoizedProps = e.pendingProps, t === null ? cm(e) : ne = t, Ns.current = null;
}
function cm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = Ng(n, t), n !== null) {
        n.flags &= 32767, ne = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        oe = 6, ne = null;
        return;
      }
    } else if (n = bg(n, t, Ae), n !== null) {
      ne = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      ne = t;
      return;
    }
    ne = t = e;
  } while (t !== null);
  oe === 0 && (oe = 5);
}
function rn(e, t, n) {
  var r = R, a = Be.transition;
  try {
    Be.transition = null, R = 1, Pg(e, t, n, r);
  } finally {
    Be.transition = a, R = r;
  }
  return null;
}
function Pg(e, t, n, r) {
  do
    Xn();
  while (Ot !== null);
  if (O & 6) throw Error(T(327));
  n = e.finishedWork;
  var a = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(T(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var o = n.lanes | n.childLanes;
  if (ph(e, o), e === le && (ne = le = null, ce = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || ja || (ja = !0, mm(no, function() {
    return Xn(), null;
  })), o = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || o) {
    o = Be.transition, Be.transition = null;
    var i = R;
    R = 1;
    var l = O;
    O |= 4, Ns.current = null, Mg(e, n), am(n, e), eg(dl), ao = !!cl, dl = cl = null, e.current = n, Eg(n), oh(), O = l, R = i, Be.transition = o;
  } else e.current = n;
  if (ja && (ja = !1, Ot = e, wo = a), o = e.pendingLanes, o === 0 && (Ut = null), sh(n.stateNode), Ne(e, te()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) a = t[n], r(a.value, { componentStack: a.stack, digest: a.digest });
  if (_o) throw _o = !1, e = Il, Il = null, e;
  return wo & 1 && e.tag !== 0 && Xn(), o = e.pendingLanes, o & 1 ? e === Ll ? Rr++ : (Rr = 0, Ll = e) : Rr = 0, Jt(), null;
}
function Xn() {
  if (Ot !== null) {
    var e = Bd(wo), t = Be.transition, n = R;
    try {
      if (Be.transition = null, R = 16 > e ? 16 : e, Ot === null) var r = !1;
      else {
        if (e = Ot, Ot = null, wo = 0, O & 6) throw Error(T(331));
        var a = O;
        for (O |= 4, M = e.current; M !== null; ) {
          var o = M, i = o.child;
          if (M.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var s = 0; s < l.length; s++) {
                var c = l[s];
                for (M = c; M !== null; ) {
                  var m = M;
                  switch (m.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Fr(8, m, o);
                  }
                  var p = m.child;
                  if (p !== null) p.return = m, M = p;
                  else for (; M !== null; ) {
                    m = M;
                    var d = m.sibling, h = m.return;
                    if (tm(m), m === c) {
                      M = null;
                      break;
                    }
                    if (d !== null) {
                      d.return = h, M = d;
                      break;
                    }
                    M = h;
                  }
                }
              }
              var v = o.alternate;
              if (v !== null) {
                var _ = v.child;
                if (_ !== null) {
                  v.child = null;
                  do {
                    var L = _.sibling;
                    _.sibling = null, _ = L;
                  } while (_ !== null);
                }
              }
              M = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) i.return = o, M = i;
          else e: for (; M !== null; ) {
            if (o = M, o.flags & 2048) switch (o.tag) {
              case 0:
              case 11:
              case 15:
                Fr(9, o, o.return);
            }
            var g = o.sibling;
            if (g !== null) {
              g.return = o.return, M = g;
              break e;
            }
            M = o.return;
          }
        }
        var f = e.current;
        for (M = f; M !== null; ) {
          i = M;
          var y = i.child;
          if (i.subtreeFlags & 2064 && y !== null) y.return = i, M = y;
          else e: for (i = f; M !== null; ) {
            if (l = M, l.flags & 2048) try {
              switch (l.tag) {
                case 0:
                case 11:
                case 15:
                  Oo(9, l);
              }
            } catch (b) {
              J(l, l.return, b);
            }
            if (l === i) {
              M = null;
              break e;
            }
            var S = l.sibling;
            if (S !== null) {
              S.return = l.return, M = S;
              break e;
            }
            M = l.return;
          }
        }
        if (O = a, Jt(), pt && typeof pt.onPostCommitFiberRoot == "function") try {
          pt.onPostCommitFiberRoot(Ao, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      R = n, Be.transition = t;
    }
  }
  return !1;
}
function Dc(e, t, n) {
  t = rr(n, t), t = Uf(e, t, 1), e = Bt(e, t, 1), t = Se(), e !== null && (sa(e, 1, t), Ne(e, t));
}
function J(e, t, n) {
  if (e.tag === 3) Dc(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      Dc(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (Ut === null || !Ut.has(r))) {
        e = rr(n, e), e = Vf(t, e, 1), t = Bt(t, e, 1), e = Se(), t !== null && (sa(t, 1, e), Ne(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function Dg(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = Se(), e.pingedLanes |= e.suspendedLanes & n, le === e && (ce & n) === n && (oe === 4 || oe === 3 && (ce & 130023424) === ce && 500 > te() - Ms ? un(e, 0) : Cs |= n), Ne(e, t);
}
function dm(e, t) {
  t === 0 && (e.mode & 1 ? (t = ka, ka <<= 1, !(ka & 130023424) && (ka = 4194304)) : t = 1);
  var n = Se();
  e = Nt(e, t), e !== null && (sa(e, t, n), Ne(e, n));
}
function zg(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), dm(e, n);
}
function Fg(e, t) {
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
      throw Error(T(314));
  }
  r !== null && r.delete(t), dm(e, n);
}
var fm;
fm = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || xe.current) ke = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return ke = !1, xg(e, t, n);
    ke = !!(e.flags & 131072);
  }
  else ke = !1, Q && t.flags & 1048576 && gf(t, fo, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Va(e, t), e = t.pendingProps;
      var a = Jn(t, ye.current);
      qn(t, n), a = ws(null, t, r, e, a, n);
      var o = Ts();
      return t.flags |= 1, typeof a == "object" && a !== null && typeof a.render == "function" && a.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, be(r) ? (o = !0, uo(t)) : o = !1, t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, gs(t), a.updater = Fo, t.stateNode = a, a._reactInternals = t, _l(t, r, e, n), t = kl(null, t, r, !0, o, n)) : (t.tag = 0, Q && o && us(t), ve(null, t, a, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Va(e, t), e = t.pendingProps, a = r._init, r = a(r._payload), t.type = r, a = t.tag = Rg(r), e = Qe(r, e), a) {
          case 0:
            t = Tl(null, t, r, e, n);
            break e;
          case 1:
            t = bc(null, t, r, e, n);
            break e;
          case 11:
            t = kc(null, t, r, e, n);
            break e;
          case 14:
            t = xc(null, t, r, Qe(r.type, e), n);
            break e;
        }
        throw Error(T(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Qe(r, a), Tl(e, t, r, a, n);
    case 1:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Qe(r, a), bc(e, t, r, a, n);
    case 3:
      e: {
        if (Yf(t), e === null) throw Error(T(387));
        r = t.pendingProps, o = t.memoizedState, a = o.element, Tf(e, t), ho(t, r, null, n);
        var i = t.memoizedState;
        if (r = i.element, o.isDehydrated) if (o = { element: r, isDehydrated: !1, cache: i.cache, pendingSuspenseBoundaries: i.pendingSuspenseBoundaries, transitions: i.transitions }, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
          a = rr(Error(T(423)), t), t = Nc(e, t, r, n, a);
          break e;
        } else if (r !== a) {
          a = rr(Error(T(424)), t), t = Nc(e, t, r, n, a);
          break e;
        } else for (Le = Wt(t.stateNode.containerInfo.firstChild), je = t, Q = !0, qe = null, n = _f(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (er(), r === a) {
            t = Ct(e, t, n);
            break e;
          }
          ve(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return kf(t), e === null && yl(t), r = t.type, a = t.pendingProps, o = e !== null ? e.memoizedProps : null, i = a.children, fl(r, a) ? i = null : o !== null && fl(r, o) && (t.flags |= 32), Qf(e, t), ve(e, t, i, n), t.child;
    case 6:
      return e === null && yl(t), null;
    case 13:
      return qf(e, t, n);
    case 4:
      return ys(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = tr(t, null, r, n) : ve(e, t, r, n), t.child;
    case 11:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Qe(r, a), kc(e, t, r, a, n);
    case 7:
      return ve(e, t, t.pendingProps, n), t.child;
    case 8:
      return ve(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ve(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, a = t.pendingProps, o = t.memoizedProps, i = a.value, W(mo, r._currentValue), r._currentValue = i, o !== null) if (et(o.value, i)) {
          if (o.children === a.children && !xe.current) {
            t = Ct(e, t, n);
            break e;
          }
        } else for (o = t.child, o !== null && (o.return = t); o !== null; ) {
          var l = o.dependencies;
          if (l !== null) {
            i = o.child;
            for (var s = l.firstContext; s !== null; ) {
              if (s.context === r) {
                if (o.tag === 1) {
                  s = kt(-1, n & -n), s.tag = 2;
                  var c = o.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var m = c.pending;
                    m === null ? s.next = s : (s.next = m.next, m.next = s), c.pending = s;
                  }
                }
                o.lanes |= n, s = o.alternate, s !== null && (s.lanes |= n), vl(
                  o.return,
                  n,
                  t
                ), l.lanes |= n;
                break;
              }
              s = s.next;
            }
          } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
          else if (o.tag === 18) {
            if (i = o.return, i === null) throw Error(T(341));
            i.lanes |= n, l = i.alternate, l !== null && (l.lanes |= n), vl(i, n, t), i = o.sibling;
          } else i = o.child;
          if (i !== null) i.return = o;
          else for (i = o; i !== null; ) {
            if (i === t) {
              i = null;
              break;
            }
            if (o = i.sibling, o !== null) {
              o.return = i.return, i = o;
              break;
            }
            i = i.return;
          }
          o = i;
        }
        ve(e, t, a.children, n), t = t.child;
      }
      return t;
    case 9:
      return a = t.type, r = t.pendingProps.children, qn(t, n), a = Ue(a), r = r(a), t.flags |= 1, ve(e, t, r, n), t.child;
    case 14:
      return r = t.type, a = Qe(r, t.pendingProps), a = Qe(r.type, a), xc(e, t, r, a, n);
    case 15:
      return Kf(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, a = t.pendingProps, a = t.elementType === r ? a : Qe(r, a), Va(e, t), t.tag = 1, be(r) ? (e = !0, uo(t)) : e = !1, qn(t, n), Bf(t, r, a), _l(t, r, a, n), kl(null, t, r, !0, e, n);
    case 19:
      return Xf(e, t, n);
    case 22:
      return Gf(e, t, n);
  }
  throw Error(T(156, t.tag));
};
function mm(e, t) {
  return Rd(e, t);
}
function Og(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function We(e, t, n, r) {
  return new Og(e, t, n, r);
}
function Ls(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function Rg(e) {
  if (typeof e == "function") return Ls(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === Xl) return 11;
    if (e === Zl) return 14;
  }
  return 2;
}
function Kt(e, t) {
  var n = e.alternate;
  return n === null ? (n = We(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Qa(e, t, n, r, a, o) {
  var i = 2;
  if (r = e, typeof e == "function") Ls(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else e: switch (e) {
    case An:
      return cn(n.children, a, o, t);
    case ql:
      i = 8, a |= 8;
      break;
    case Ui:
      return e = We(12, n, t, a | 2), e.elementType = Ui, e.lanes = o, e;
    case Vi:
      return e = We(13, n, t, a), e.elementType = Vi, e.lanes = o, e;
    case Ki:
      return e = We(19, n, t, a), e.elementType = Ki, e.lanes = o, e;
    case Td:
      return $o(n, a, o, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case _d:
          i = 10;
          break e;
        case wd:
          i = 9;
          break e;
        case Xl:
          i = 11;
          break e;
        case Zl:
          i = 14;
          break e;
        case It:
          i = 16, r = null;
          break e;
      }
      throw Error(T(130, e == null ? e : typeof e, ""));
  }
  return t = We(i, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
}
function cn(e, t, n, r) {
  return e = We(7, e, r, t), e.lanes = n, e;
}
function $o(e, t, n, r) {
  return e = We(22, e, r, t), e.elementType = Td, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function Mi(e, t, n) {
  return e = We(6, e, null, t), e.lanes = n, e;
}
function Ei(e, t, n) {
  return t = We(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function $g(e, t, n, r, a) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ui(0), this.expirationTimes = ui(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ui(0), this.identifierPrefix = r, this.onRecoverableError = a, this.mutableSourceEagerHydrationData = null;
}
function js(e, t, n, r, a, o, i, l, s) {
  return e = new $g(e, t, n, l, s), t === 1 ? (t = 1, o === !0 && (t |= 8)) : t = 0, o = We(3, null, null, t), e.current = o, o.stateNode = e, o.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, gs(o), e;
}
function Hg(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: En, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function pm(e) {
  if (!e) return qt;
  e = e._reactInternals;
  e: {
    if (_n(e) !== e || e.tag !== 1) throw Error(T(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (be(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(T(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (be(n)) return pf(e, n, t);
  }
  return t;
}
function hm(e, t, n, r, a, o, i, l, s) {
  return e = js(n, r, !0, e, a, o, i, l, s), e.context = pm(null), n = e.current, r = Se(), a = Vt(n), o = kt(r, a), o.callback = t ?? null, Bt(n, o, a), e.current.lanes = a, sa(e, a, r), Ne(e, r), e;
}
function Ho(e, t, n, r) {
  var a = t.current, o = Se(), i = Vt(a);
  return n = pm(n), t.context === null ? t.context = n : t.pendingContext = n, t = kt(o, i), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = Bt(a, t, i), e !== null && (Je(e, a, i, o), Wa(e, a, i)), i;
}
function ko(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function zc(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Ps(e, t) {
  zc(e, t), (e = e.alternate) && zc(e, t);
}
function Wg() {
  return null;
}
var gm = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Ds(e) {
  this._internalRoot = e;
}
Wo.prototype.render = Ds.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(T(409));
  Ho(e, t, null, null);
};
Wo.prototype.unmount = Ds.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    vn(function() {
      Ho(null, e, null, null);
    }), t[bt] = null;
  }
};
function Wo(e) {
  this._internalRoot = e;
}
Wo.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = Kd();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Dt.length && t !== 0 && t < Dt[n].priority; n++) ;
    Dt.splice(n, 0, e), n === 0 && Qd(e);
  }
};
function zs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Bo(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function Fc() {
}
function Bg(e, t, n, r, a) {
  if (a) {
    if (typeof r == "function") {
      var o = r;
      r = function() {
        var c = ko(i);
        o.call(c);
      };
    }
    var i = hm(t, r, e, 0, null, !1, !1, "", Fc);
    return e._reactRootContainer = i, e[bt] = i.current, qr(e.nodeType === 8 ? e.parentNode : e), vn(), i;
  }
  for (; a = e.lastChild; ) e.removeChild(a);
  if (typeof r == "function") {
    var l = r;
    r = function() {
      var c = ko(s);
      l.call(c);
    };
  }
  var s = js(e, 0, !1, null, null, !1, !1, "", Fc);
  return e._reactRootContainer = s, e[bt] = s.current, qr(e.nodeType === 8 ? e.parentNode : e), vn(function() {
    Ho(t, s, n, r);
  }), s;
}
function Uo(e, t, n, r, a) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof a == "function") {
      var l = a;
      a = function() {
        var s = ko(i);
        l.call(s);
      };
    }
    Ho(t, i, e, a);
  } else i = Bg(n, t, e, a, r);
  return ko(i);
}
Ud = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = Mr(t.pendingLanes);
        n !== 0 && (ts(t, n | 1), Ne(t, te()), !(O & 6) && (ar = te() + 500, Jt()));
      }
      break;
    case 13:
      vn(function() {
        var r = Nt(e, 1);
        if (r !== null) {
          var a = Se();
          Je(r, e, 1, a);
        }
      }), Ps(e, 1);
  }
};
ns = function(e) {
  if (e.tag === 13) {
    var t = Nt(e, 134217728);
    if (t !== null) {
      var n = Se();
      Je(t, e, 134217728, n);
    }
    Ps(e, 134217728);
  }
};
Vd = function(e) {
  if (e.tag === 13) {
    var t = Vt(e), n = Nt(e, t);
    if (n !== null) {
      var r = Se();
      Je(n, e, t, r);
    }
    Ps(e, t);
  }
};
Kd = function() {
  return R;
};
Gd = function(e, t) {
  var n = R;
  try {
    return R = e, t();
  } finally {
    R = n;
  }
};
nl = function(e, t, n) {
  switch (t) {
    case "input":
      if (Yi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var a = Po(r);
            if (!a) throw Error(T(90));
            xd(r), Yi(r, a);
          }
        }
      }
      break;
    case "textarea":
      Nd(e, n);
      break;
    case "select":
      t = n.value, t != null && Kn(e, !!n.multiple, t, !1);
  }
};
jd = Es;
Pd = vn;
var Ug = { usingClientEntryPoint: !1, Events: [ca, Pn, Po, Id, Ld, Es] }, Tr = { findFiberByHostInstance: on, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Vg = { bundleType: Tr.bundleType, version: Tr.version, rendererPackageName: Tr.rendererPackageName, rendererConfig: Tr.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: Mt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = Fd(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Tr.findFiberByHostInstance || Wg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Pa = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Pa.isDisabled && Pa.supportsFiber) try {
    Ao = Pa.inject(Vg), pt = Pa;
  } catch {
  }
}
ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ug;
ze.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!zs(t)) throw Error(T(200));
  return Hg(e, t, null, n);
};
ze.createRoot = function(e, t) {
  if (!zs(e)) throw Error(T(299));
  var n = !1, r = "", a = gm;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (a = t.onRecoverableError)), t = js(e, 1, !1, null, null, n, !1, r, a), e[bt] = t.current, qr(e.nodeType === 8 ? e.parentNode : e), new Ds(t);
};
ze.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(T(188)) : (e = Object.keys(e).join(","), Error(T(268, e)));
  return e = Fd(t), e = e === null ? null : e.stateNode, e;
};
ze.flushSync = function(e) {
  return vn(e);
};
ze.hydrate = function(e, t, n) {
  if (!Bo(t)) throw Error(T(200));
  return Uo(null, e, t, !0, n);
};
ze.hydrateRoot = function(e, t, n) {
  if (!zs(e)) throw Error(T(405));
  var r = n != null && n.hydratedSources || null, a = !1, o = "", i = gm;
  if (n != null && (n.unstable_strictMode === !0 && (a = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (i = n.onRecoverableError)), t = hm(t, null, e, 1, n ?? null, a, !1, o, i), e[bt] = t.current, qr(e), r) for (e = 0; e < r.length; e++) n = r[e], a = n._getVersion, a = a(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, a] : t.mutableSourceEagerHydrationData.push(
    n,
    a
  );
  return new Wo(t);
};
ze.render = function(e, t, n) {
  if (!Bo(t)) throw Error(T(200));
  return Uo(null, e, t, !1, n);
};
ze.unmountComponentAtNode = function(e) {
  if (!Bo(e)) throw Error(T(40));
  return e._reactRootContainer ? (vn(function() {
    Uo(null, null, e, !1, function() {
      e._reactRootContainer = null, e[bt] = null;
    });
  }), !0) : !1;
};
ze.unstable_batchedUpdates = Es;
ze.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Bo(n)) throw Error(T(200));
  if (e == null || e._reactInternals === void 0) throw Error(T(38));
  return Uo(e, t, n, !1, r);
};
ze.version = "18.3.1-next-f1338f8080-20240426";
function ym() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ym);
    } catch (e) {
      console.error(e);
    }
}
ym(), gd.exports = ze;
var Kg = gd.exports, Oc = Kg;
Qt.createRoot = Oc.createRoot, Qt.hydrateRoot = Oc.hydrateRoot;
const Pe = typeof window < "u" && window.__WOOF_CAL_CONFIG__ ? window.__WOOF_CAL_CONFIG__ : {};
Pe.workerUrl;
Pe.turnstileWidgetSelector;
Pe.turnstileSiteKey;
Object.freeze(
  Array.isArray(Pe.turnstileAllowedHostnames) && Pe.turnstileAllowedHostnames.length > 0 ? Pe.turnstileAllowedHostnames.map((e) => String(e || "").trim().toLowerCase()).filter(Boolean) : ["andreww0421.github.io"]
);
Pe.serviceWorkerPath;
const vm = Number(Pe.dailyAiLimit) || 20, Gg = Pe.usageKey || "woofCal_usage";
Pe.storageSchemaKey;
Number(Pe.appSchemaVersion);
Pe.diagnosticsKey;
Number(Pe.maxDiagnosticEvents);
function re(e = /* @__PURE__ */ new Date()) {
  const t = e.getFullYear(), n = String(e.getMonth() + 1).padStart(2, "0"), r = String(e.getDate()).padStart(2, "0");
  return `${t}-${n}-${r}`;
}
function xo(e) {
  if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e))
    return null;
  const [t, n, r] = e.split("-"), a = Number(t), o = Number(n), i = Number(r);
  if (!Number.isInteger(a) || !Number.isInteger(o) || !Number.isInteger(i))
    return null;
  const l = new Date(a, o - 1, i);
  return l.getFullYear() !== a || l.getMonth() !== o - 1 || l.getDate() !== i ? null : l;
}
function Sm(e, {
  max: t = re(),
  fallback: n = re()
} = {}) {
  const r = xo(e);
  if (!r) return n;
  const a = xo(t), o = re(r);
  return a && o > re(a) ? re(a) : o;
}
function Vo(e, t = 0, {
  fallback: n = re()
} = {}) {
  const r = xo(e) || xo(n) || /* @__PURE__ */ new Date(), a = new Date(r);
  return a.setDate(a.getDate() + (Number(t) || 0)), re(a);
}
function fa(e, t = null) {
  if (typeof e != "string" || e === "") return t;
  try {
    return JSON.parse(e);
  } catch {
    return t;
  }
}
const _m = Object.freeze({
  calories: Object.freeze({ aliases: ["cal"] }),
  protein: Object.freeze({ aliases: [] }),
  fat: Object.freeze({ aliases: [] }),
  carbohydrate: Object.freeze({ aliases: ["carb"] }),
  sugar: Object.freeze({ aliases: [] }),
  sodium: Object.freeze({ aliases: ["sod"] }),
  saturatedFat: Object.freeze({ aliases: ["sat"] }),
  transFat: Object.freeze({ aliases: ["trans"] }),
  fiber: Object.freeze({ aliases: [] })
}), cr = Object.freeze(Object.keys(_m));
function Rc(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Qg(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const o = Math.min(Math.max(a, t), n);
  if (r === null) return o;
  const i = 10 ** r;
  return Math.round(o * i) / i;
}
function Yg(e) {
  const t = Rc(e) ? e : {}, n = Rc(t.nutri) ? t.nutri : null;
  return n ? [n, t] : [t];
}
function qg(e, t, n) {
  const r = [t, ...n], a = Yg(e);
  for (const o of a)
    for (const i of r) {
      const l = o == null ? void 0 : o[i];
      if (l != null && l !== "")
        return l;
    }
  return 0;
}
function Xg() {
  return Object.fromEntries(cr.map((e) => [e, 0]));
}
function Ce(e = {}, t = {}) {
  const { fieldOptions: n = {} } = t;
  return Object.fromEntries(cr.map((r) => {
    const a = _m[r], o = qg(e, r, a.aliases);
    return [r, Qg(o, n[r])];
  }));
}
function dr(e = {}, t = {}) {
  return Ce(e, t);
}
function Fs(e = {}) {
  const t = Ce(e);
  return cr.some((n) => t[n] !== 0);
}
function kr(e) {
  return typeof e == "function";
}
function Zg(e) {
  return !!e && kr(e.getItem) && kr(e.setItem) && kr(e.removeItem) && kr(e.clear) && kr(e.key) && typeof e.length == "number";
}
function Jg(e) {
  if (!Zg(e))
    throw new Error("Invalid storage adapter");
  return e;
}
function ey() {
  return globalThis.localStorage;
}
function ty(e = ey) {
  const t = () => {
    const n = typeof e == "function" ? e() : e;
    return Jg(n);
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
const ny = ty();
let ry = ny;
function Ko(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function wm() {
  return ry;
}
function ma(e) {
  return wm().getItem(e);
}
function wn(e, t) {
  wm().setItem(e, t);
}
function Go(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Tm(e) {
  return Array.isArray(e) ? e.filter(Ko).map((t) => ({
    name: String(t.name ?? "").trim(),
    weight: String(t.weight ?? "").trim()
  })).filter((t) => t.name || t.weight) : [];
}
function km(e) {
  if (!Ko(e)) return null;
  const t = Ce(e), n = Tm(e.items), r = {
    type: String(e.type || "snack"),
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Go(e.healthScore ?? 0)
  };
  return r.name || n.length || Fs(t) ? r : null;
}
function xm(e) {
  if (!Ko(e)) return null;
  const t = Ce(e), n = Tm(e.items), r = {
    name: String(e.name ?? "").trim(),
    nutri: t,
    items: n,
    healthScore: Go(e.healthScore ?? 0)
  };
  return r.name || n.length || Fs(t) ? r : null;
}
function bm(e) {
  return Ko(e) ? {
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
function Os(e, t) {
  return Array.isArray(e) ? e.map(t).filter(Boolean) : [];
}
function Nm(e, t) {
  const n = fa(ma(e), []), r = Os(n, t);
  return JSON.stringify(n) !== JSON.stringify(r) && wn(e, JSON.stringify(r)), r;
}
function Qo(e = re()) {
  return Sm(String(e || re()));
}
function ay() {
  return Nm("myFavorites", xm);
}
function oy(e) {
  wn(
    "myFavorites",
    JSON.stringify(Os(e, xm))
  );
}
function Yo(e, t) {
  return ma(e) || t;
}
function qo(e, t) {
  wn(e, t);
}
function iy(e, t) {
  wn(
    `record_${e}`,
    JSON.stringify(Os(t, km))
  );
}
function Xo(e) {
  return Nm(`record_${e}`, km);
}
function ly(e, t) {
  const n = parseFloat(t);
  return !Number.isFinite(n) || n <= 0 ? !1 : (wn(`weight_${e}`, String(n)), !0);
}
function Cm(e) {
  const t = ma(`weight_${e}`);
  if (!t) return null;
  const n = parseFloat(t);
  return Number.isFinite(n) && n > 0 ? n : null;
}
function sy(e = 30, t = re()) {
  const n = [], r = Qo(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = Vo(r, -a);
    n.push({
      date: o.slice(5),
      weight: Cm(o)
    });
  }
  return n;
}
function uy(e) {
  const t = bm(e);
  return t ? (wn("myProfile_v5", JSON.stringify(t)), !0) : !1;
}
function cy() {
  const e = bm(fa(ma("myProfile_v5"), null));
  return e ? (wn("myProfile_v5", JSON.stringify(e)), e) : null;
}
function dy(e = 7, t = re()) {
  const n = [], r = Qo(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = Vo(r, -a), i = Xo(o);
    let l = 0;
    i.forEach((s) => {
      var c;
      l += Go((c = s == null ? void 0 : s.nutri) == null ? void 0 : c.calories);
    }), n.push({ date: o.slice(5), calories: Math.round(l) });
  }
  return n;
}
function fy(e = 7, t = re()) {
  const n = [], r = Qo(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = Vo(r, -a), i = Xo(o);
    let l = 0;
    i.forEach((s) => {
      var c;
      l += Go((c = s == null ? void 0 : s.nutri) == null ? void 0 : c.protein);
    }), n.push({ date: o.slice(5), protein: Math.round(l * 10) / 10 });
  }
  return n;
}
function my(e = 7, t = re()) {
  const n = [], r = Qo(t);
  for (let a = e - 1; a >= 0; a -= 1) {
    const o = Vo(r, -a);
    n.push({
      date: o,
      label: o.slice(5),
      items: Xo(o)
    });
  }
  return n;
}
function py() {
  const e = re(), t = fa(ma(Gg), {});
  return (t == null ? void 0 : t.date) !== e ? { date: e, count: 0 } : {
    date: e,
    count: Number(t.count) || 0
  };
}
function Rs(e) {
  return Xo(e);
}
function $c(e, t) {
  iy(e, t);
}
function bo(e = 7, t) {
  return dy(e, t);
}
function hy(e = 7, t) {
  return fy(e, t);
}
function $s(e = 7, t) {
  return my(e, t);
}
function gy() {
  return ay();
}
function Hc(e) {
  oy(e);
}
function Mm() {
  return cy();
}
function Em(e) {
  return uy(e);
}
const yy = Object.freeze(["zh-TW", "zh-CN", "en"]);
function pa(e, t = "zh-TW") {
  const n = String(e || "").trim();
  return yy.includes(n) ? n : t;
}
function vy() {
  return pa(Yo("appLang", "zh-TW"));
}
function Sy(e) {
  qo("appLang", pa(e));
}
function _y() {
  return Yo("appTheme", "light");
}
function wy(e) {
  qo("appTheme", e);
}
function Am() {
  return py();
}
function Zo(e) {
  return Cm(e);
}
function Ty(e, t) {
  return ly(e, t);
}
function ky(e = 30, t) {
  return sy(e, t);
}
function xy(e, t, n) {
  return Math.min(Math.max(e, t), n);
}
function Im(e, { min: t = 0, max: n = Number.POSITIVE_INFINITY, digits: r = null } = {}) {
  const a = Number(e);
  if (!Number.isFinite(a)) return t;
  const o = xy(a, t, n);
  if (r === null) return o;
  const i = 10 ** r;
  return Math.round(o * i) / i;
}
function Wc(e) {
  const t = String((e == null ? void 0 : e.name) ?? "").trim(), n = String((e == null ? void 0 : e.weight) ?? "").trim();
  return !t && !n ? null : { name: t, weight: n };
}
function No(e) {
  return {
    name: String((e == null ? void 0 : e.name) ?? "").trim(),
    weight: String((e == null ? void 0 : e.weight) ?? "").trim()
  };
}
function Co(e = []) {
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
function by(e, t = {}) {
  return {
    type: String(e),
    timestamp: t.timestamp || (/* @__PURE__ */ new Date()).toISOString(),
    itemIndex: Number.isInteger(t.itemIndex) ? t.itemIndex : void 0,
    field: t.field ? String(t.field) : void 0,
    previousValue: t.previousValue !== void 0 ? String(t.previousValue) : void 0,
    nextValue: t.nextValue !== void 0 ? String(t.nextValue) : void 0,
    itemName: t.itemName !== void 0 ? String(t.itemName) : void 0,
    weight: t.weight !== void 0 ? String(t.weight) : void 0,
    itemCount: t.itemCount !== void 0 ? Math.max(0, Math.round(Number(t.itemCount) || 0)) : void 0
  };
}
function Lm(e = [], t = null, { limit: n = 25 } = {}) {
  const r = Co(e);
  if (!t) return r;
  const a = Co([t])[0];
  return a ? [...r, a].slice(-n) : r;
}
function Ny(e = {}, t = {}) {
  const {
    fallbackName: n = "",
    fallbackItems: r = []
  } = t, a = Array.isArray(e.items) ? e.items.map(Wc).filter(Boolean) : r.map(Wc).filter(Boolean), o = Ce(e, {
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
  }), i = {
    foodName: String(e.foodName ?? e.name ?? n ?? "").trim() || "Food Analysis",
    ...o,
    healthScore: Im(e.healthScore, { max: 10, digits: 1 }),
    items: a
  };
  if (!(Fs(o) || i.items.length > 0))
    throw new Error("AI_INVALID_PAYLOAD");
  return i;
}
function Hs(e, t = {}) {
  if (!e || typeof e != "object") return null;
  const {
    fallbackName: n = "",
    fallbackItems: r = [],
    preferredName: a = "",
    correctionHistory: o = (e == null ? void 0 : e.correctionHistory) || []
  } = t, i = e.nutri !== void 0 || e.correctionHistory !== void 0, l = Array.isArray(e.items) ? e.items.map(No) : r.map(No);
  if (i)
    return {
      name: String(e.name || a || n || "").trim() || "Food Analysis",
      nutri: Ce(e.nutri !== void 0 ? e.nutri : e),
      items: l,
      healthScore: Im(e.healthScore, { max: 10, digits: 1 }),
      correctionHistory: Co(o)
    };
  const s = Ny(e, {
    fallbackName: n,
    fallbackItems: r
  });
  return {
    name: String(a || s.foodName || n || "").trim() || "Food Analysis",
    nutri: Ce(s),
    items: s.items,
    healthScore: s.healthScore,
    correctionHistory: Co(o)
  };
}
const Bc = {
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
}, Ws = {
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
function G(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function ha(e = 0, { weightKg: t = 0, goalType: n = "lose" } = {}) {
  const r = Math.max(0, Math.round(G(e))), a = Math.max(0, G(t)), o = Bs(n);
  if (a > 0) {
    const i = Ws[o], l = Math.max(0, Math.round(a * i.proteinPerKg)), s = Math.max(0, Math.round(a * i.fatPerKg)), c = Math.max(r - l * 4 - s * 9, 0);
    return {
      protein: l,
      fat: s,
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
function Bs(e = "lose") {
  const t = String(e || "lose");
  return Ws[t] ? t : "lose";
}
function Cy({ tdee: e = 0, bmr: t = 0, goalType: n = "lose" } = {}) {
  const r = Bs(n), a = Math.round(G(e)), o = Math.round(G(t));
  if (a <= 0) return 0;
  const i = a + Ws[r].calorieAdjustment;
  return r === "lose" && o > 0 ? Math.max(i, o) : i;
}
function My({ weightKg: e = 0, tdee: t = 0, bmr: n = 0, goalType: r = "lose" } = {}) {
  const a = Bs(r), o = Cy({
    tdee: t,
    bmr: n,
    goalType: a
  });
  return {
    goalType: a,
    targetCalories: o,
    macroGoals: ha(o, {
      weightKg: e,
      goalType: a
    })
  };
}
function Ey(e = "4", t = {}, n = 0) {
  return (Bc[String(e)] || Bc[4]).map((a) => ({
    ...a,
    title: (t == null ? void 0 : t[a.titleKey]) || a.type,
    suggestedCalories: n > 0 ? Math.round(n * a.ratio) : 0
  }));
}
function fr(e = []) {
  const t = { cal: 0, pro: 0, fat: 0, carb: 0, sugar: 0, sod: 0, sat: 0, trans: 0, fiber: 0 }, n = { breakfast: 0, lunch: 0, dinner: 0, snack: 0 };
  return e.forEach((r) => {
    const a = (r == null ? void 0 : r.nutri) || {};
    t.cal += G(a.calories), t.pro += G(a.protein), t.fat += G(a.fat), t.carb += G(a.carbohydrate), t.sugar += G(a.sugar), t.sod += G(a.sodium), t.sat += G(a.saturatedFat), t.trans += G(a.transFat), t.fiber += G(a.fiber), n[r == null ? void 0 : r.type] !== void 0 && (n[r.type] += G(a.calories));
  }), { totals: t, mealTotals: n };
}
function Ay(e = []) {
  const t = e.filter((o) => G(o == null ? void 0 : o.calories) > 0), n = t.reduce((o, i) => o + G(i == null ? void 0 : i.calories), 0), r = t.length > 0 ? Math.round(n / t.length) : 0, a = t.reduce((o, i) => o ? G(i.calories) > G(o.calories) ? i : o : i, null);
  return {
    loggedDays: t.length,
    averageCalories: r,
    bestDayLabel: (a == null ? void 0 : a.date) || "--",
    bestDayCalories: Math.round(G(a == null ? void 0 : a.calories))
  };
}
function Iy({ total: e = {}, targetCalories: t = 0, calorieHistory: n = [], goalType: r = "lose", weightKg: a = 0 } = {}) {
  const o = G(t), i = ha(o, {
    goalType: r,
    weightKg: a
  }), l = G(e.cal), s = G(e.pro), c = G(e.fiber), m = G(e.sod);
  let p = "steady";
  l <= 0 ? p = "start_logging" : o > 0 && l > o * 1.08 ? p = "over_target" : s < i.protein * 0.65 ? p = "protein_gap" : c > 0 && c < 18 ? p = "fiber_gap" : m > 2300 ? p = "sodium_high" : o > 0 && l >= o * 0.85 && (p = "near_goal");
  const d = [];
  return l <= 0 ? d.push("use_ai", "log_first_meal") : (s < i.protein * 0.85 && d.push("protein_boost"), c < 25 && d.push("fiber_boost"), m > 2300 && d.push("watch_sodium"), o > 0 && l > o * 1.08 && d.push("portion_reset"), d.length === 0 && d.push("keep_momentum")), {
    status: p,
    targetCalories: o,
    calories: l,
    protein: s,
    fiber: c,
    sodium: m,
    remainingCalories: o > 0 ? Math.max(Math.round(o - l), 0) : 0,
    overCalories: o > 0 ? Math.max(Math.round(l - o), 0) : 0,
    proteinGap: Math.max(i.protein - Math.round(s), 0),
    fiberGap: Math.max(25 - Math.round(c), 0),
    tipKeys: [...new Set(d)].slice(0, 3),
    macroGoals: i,
    weekly: Ay(n)
  };
}
const Dl = /* @__PURE__ */ new Set();
function Ly(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    name: String((t == null ? void 0 : t.name) || ""),
    weight: String((t == null ? void 0 : t.weight) || "")
  })) : [];
}
function jy(e = {}) {
  return dr(e);
}
function or(e = []) {
  return Array.isArray(e) ? e.map((t) => ({
    type: String((t == null ? void 0 : t.type) || "snack"),
    name: String((t == null ? void 0 : t.name) || ""),
    nutri: jy(t),
    items: Ly(t == null ? void 0 : t.items),
    healthScore: Number(t == null ? void 0 : t.healthScore) || 0
  })) : [];
}
function Us(e) {
  return Hs(e);
}
function Mo(e) {
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
function Py(e = !1) {
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
function Vs(e = {}, t = !1) {
  const n = Py(t);
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
function jm(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function Dy(e = {}) {
  const t = String(e.selectedDate || re()), n = Mo(e.profile !== void 0 ? e.profile : Mm()), r = String(e.currentMealMode || (n == null ? void 0 : n.mealMode) || "4"), a = String(e.currentGoalType || (n == null ? void 0 : n.goalType) || "lose"), i = Am().count >= vm;
  return {
    selectedDate: t,
    curLang: pa(e.curLang || vy()),
    curTheme: String(e.curTheme || _y()),
    targetCalories: jm(e.targetCalories, 2e3),
    currentMealMode: r,
    currentGoalType: a,
    loggedWeight: e.loggedWeight ?? Zo(t),
    foodItems: or(e.foodItems !== void 0 ? e.foodItems : Rs(t)),
    favoriteFoods: or(e.favoriteFoods !== void 0 ? e.favoriteFoods : gy()),
    tempAIResult: Us(e.tempAIResult),
    tempAIResultSaved: !!e.tempAIResultSaved,
    analysisFlow: Vs(e.analysisFlow, i),
    profile: n
  };
}
function zy(e) {
  const t = String((e == null ? void 0 : e.selectedDate) || re()), n = Mo(e == null ? void 0 : e.profile) || Mo(Mm()), r = String((e == null ? void 0 : e.currentMealMode) || (n == null ? void 0 : n.mealMode) || "4"), a = String((e == null ? void 0 : e.currentGoalType) || (n == null ? void 0 : n.goalType) || "lose"), i = Am().count >= vm;
  return {
    selectedDate: t,
    curLang: pa((e == null ? void 0 : e.curLang) || "zh-TW"),
    curTheme: String((e == null ? void 0 : e.curTheme) || "light"),
    targetCalories: jm(e == null ? void 0 : e.targetCalories, 2e3),
    currentMealMode: r,
    currentGoalType: a,
    loggedWeight: (e == null ? void 0 : e.loggedWeight) ?? Zo(t),
    foodItems: or(e == null ? void 0 : e.foodItems),
    favoriteFoods: or(e == null ? void 0 : e.favoriteFoods),
    tempAIResult: Us(e == null ? void 0 : e.tempAIResult),
    tempAIResultSaved: !!(e != null && e.tempAIResultSaved),
    analysisFlow: Vs(e == null ? void 0 : e.analysisFlow, i),
    profile: n
  };
}
function Pm(e) {
  return Object.freeze({
    ...e,
    foodItems: or(e.foodItems),
    favoriteFoods: or(e.favoriteFoods),
    tempAIResult: Us(e.tempAIResult),
    profile: Mo(e.profile),
    analysisFlow: Vs(e.analysisFlow),
    updatedAt: Date.now()
  });
}
let Ya = Dy(), dn = Pm(Ya);
function Fy(e, t = {}) {
  Dl.forEach((n) => n(dn, e, t));
}
function Z(e = {}, t = {}) {
  const n = dn, r = {
    ...Ya,
    ...e
  };
  if (e.selectedDate !== void 0) {
    const a = String(e.selectedDate || re());
    r.selectedDate = a, e.foodItems === void 0 && (r.foodItems = Rs(a)), e.loggedWeight === void 0 && (r.loggedWeight = Zo(a));
  }
  return Ya = zy(r), dn = Pm(Ya), Fy(n, t), dn;
}
function F() {
  return dn;
}
function Oy(e) {
  return typeof e != "function" ? () => {
  } : (Dl.add(e), () => {
    Dl.delete(e);
  });
}
function Jo(e = dn) {
  var a;
  const t = e || dn, n = fr(t.foodItems), r = Math.max(0, Number((a = t.profile) == null ? void 0 : a.weight) || 0);
  return {
    selectedDate: t.selectedDate,
    lang: t.curLang,
    goalType: t.currentGoalType,
    targetCalories: Number(t.targetCalories) || 0,
    profileWeight: r,
    waterTarget: Math.round((r || 60) * 35),
    calorieHistory: bo(7, t.selectedDate),
    foodItems: t.foodItems,
    totals: n.totals,
    mealTotals: n.mealTotals
  };
}
const Ry = Object.freeze({
  getAppState: F,
  subscribeAppState: Oy
});
function $y() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofAppStateBridge) || Ry;
}
function mr() {
  const [e, t] = ee.useState(() => {
    var r;
    return !!((r = globalThis.window) != null && r.__woofAppStateBridge);
  });
  ee.useEffect(() => {
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
  const n = $y();
  return ee.useSyncExternalStore(
    n.subscribeAppState,
    n.getAppState,
    n.getAppState
  );
}
function Ks(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = Ks(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
function Gs(e) {
  return `${Math.round(Number(e) || 0)} kcal`;
}
const Qs = {
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
  mealGroupMeta: (e, t) => `${Number(e) || 0} items / ${Gs(t)}`
}, Hy = Ks(Qs, {
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
  mealGroupMeta: (e, t) => `${Number(e) || 0} 項 / ${Gs(t)}`
}), Wy = Ks(Qs, {
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
  mealGroupMeta: (e, t) => `${Number(e) || 0} 项 / ${Gs(t)}`
}), Ai = {
  en: Qs,
  "zh-TW": Hy,
  "zh-CN": Wy
};
function Ys(e = "en") {
  return Ai[e] || Ai[String(e || "en").split("-")[0]] || Ai.en;
}
const By = {
  appTitle: "Woof Cal - AI Diet Tracker"
}, Uy = {
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
}, Vy = {
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
}, zl = {
  "zh-TW": Vy,
  "zh-CN": Uy,
  en: By
}, Ky = {
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
}, Ii = /* @__PURE__ */ new Map();
function Li(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function Dm(e, t) {
  const n = { ...e };
  return Li(t) && Object.entries(t).forEach(([r, a]) => {
    if (Li(a) && Li(e[r])) {
      n[r] = Dm(e[r], a);
      return;
    }
    a != null && (n[r] = a);
  }), n;
}
function tt(e = "zh-TW") {
  const t = String(e || "zh-TW");
  if (!Ii.has(t)) {
    const n = Dm(
      Ky,
      zl[t] || zl.en || {}
    );
    Ii.set(t, n);
  }
  return Ii.get(t);
}
Object.freeze(Object.keys(zl));
const Gy = {
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
}, Qy = {
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
}, ji = {
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
  "zh-TW": Gy,
  "zh-CN": Qy
};
function Yy(e = "en") {
  return ji[e] || ji[String(e || "en").split("-")[0]] || ji.en;
}
const qy = {
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
}, Xy = {
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
}, Fl = {
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
  "zh-TW": qy,
  "zh-CN": Xy
};
function zm(e, t = F().curLang) {
  var n;
  return ((n = Fl[t]) == null ? void 0 : n[e]) || Fl.en[e];
}
function Fm(e = F().curLang) {
  return zm("extra", e);
}
function Zy(e = F().curLang) {
  return zm("goal", e);
}
function Jy(e = F().curLang) {
  return Yy(e);
}
function ev(e = "lose", t = F().curLang) {
  var r, a;
  const n = Zy(t);
  return ((r = n.goalTypes) == null ? void 0 : r[e]) || ((a = n.goalTypes) == null ? void 0 : a.lose) || Fl.en.goal.goalTypes.lose;
}
function tv(e, t = F().curLang) {
  var c, m, p, d, h, v, _, L, g, f, y;
  const n = Ys(t), r = tt(t), a = (((c = e == null ? void 0 : e.mealCoverage) == null ? void 0 : c.loggedMeals) || 0) > 0, o = ((p = r.meals) == null ? void 0 : p[((m = e == null ? void 0 : e.mealCoverage) == null ? void 0 : m.nextMealTitleKey) || ""]) || "", i = a ? n.heroSummaryActive : n.heroSummaryBase || "", l = Number((e == null ? void 0 : e.proteinCurrent) || 0).toFixed(1).replace(/\.0$/, ""), s = (e == null ? void 0 : e.proteinRemaining) > 0 ? n.signalProteinToGoal(e.proteinRemaining) : n.signalProteinOnTrack;
  return {
    hero: {
      eyebrow: a ? n.heroEyebrowActive : n.heroEyebrowEmpty,
      title: a ? n.heroTitleActive(e.mealCoverage || { loggedMeals: 0, plannedMeals: 0 }) : n.heroTitleEmpty,
      summary: i,
      stats: [
        {
          label: n.statLabels.streak,
          value: n.formatDayCount(((h = (d = e == null ? void 0 : e.pet) == null ? void 0 : d.progress) == null ? void 0 : h.streak) || 0)
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
          value: n.formatProteinPace(l, (e == null ? void 0 : e.proteinTarget) || 0)
        }
      ],
      meta: [
        ev(e == null ? void 0 : e.goalType, t),
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
          value: `${l}g`,
          detail: s
        },
        {
          label: n.signals.meals,
          value: n.formatMealCoverage(
            ((L = e == null ? void 0 : e.mealCoverage) == null ? void 0 : L.loggedMeals) || 0,
            ((g = e == null ? void 0 : e.mealCoverage) == null ? void 0 : g.plannedMeals) || 0
          ),
          detail: a ? n.signalMealsActive(
            ((f = e == null ? void 0 : e.mealCoverage) == null ? void 0 : f.loggedMeals) || 0,
            ((y = e == null ? void 0 : e.mealCoverage) == null ? void 0 : y.plannedMeals) || 0,
            o
          ) : n.signalMealsEmpty
        }
      ]
    }
  };
}
function nv(e, t = F().curLang) {
  var l, s, c, m;
  const n = Jy(t).trend, r = (e == null ? void 0 : e.focusKey) || "balanced", a = ((l = n.headlines) == null ? void 0 : l[r]) || ((s = n.headlines) == null ? void 0 : s.balanced) || "", o = ((c = n.summaries) == null ? void 0 : c[r]) || ((m = n.summaries) == null ? void 0 : m.balanced) || "", i = typeof o == "function" ? o((e == null ? void 0 : e.loggedDays) || 7) : o;
  return {
    title: n.title,
    subtitle: n.subtitle,
    headline: a,
    summary: i,
    signals: ((e == null ? void 0 : e.signals) || []).map((p) => {
      var d, h, v;
      return {
        key: p.key,
        label: ((d = n.signalLabels) == null ? void 0 : d[p.key]) || p.key,
        value: (h = n.signalValue) != null && h[p.key] ? n.signalValue[p.key](p) : String(p.current ?? "--"),
        detail: (v = n.signalDetails) != null && v[p.key] ? n.signalDetails[p.key](p) : ""
      };
    })
  };
}
function qs(e = F().selectedDate, t = F().curLang) {
  const { selectedDate: n } = F(), r = e || n || re(), a = Fm(t);
  return r === re() ? a.todayLabel : r;
}
function _t(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Om(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function ga(e = []) {
  return !Array.isArray(e) || e.length === 0 ? 0 : e.reduce((t, n) => t + _t(n), 0) / e.length;
}
function rv(e = []) {
  if (!Array.isArray(e) || e.length < 2) return 0;
  const t = ga(e), n = e.reduce((r, a) => {
    const o = _t(a) - t;
    return r + o * o;
  }, 0) / e.length;
  return Math.sqrt(n);
}
function Rm(e = [], t = 0.45) {
  if (!Array.isArray(e) || e.length === 0) return 0;
  if (e.length === 1) return 60;
  const n = ga(e);
  if (n <= 0) return 0;
  const r = rv(e) / n;
  return Math.round((1 - Om(r / t, 0, 1)) * 100);
}
function Xs(e, t) {
  return {
    key: e,
    score: 0,
    status: t,
    loggedDays: 0
  };
}
function av(e = {}) {
  const t = Array.isArray(e == null ? void 0 : e.items) ? e.items : [], { totals: n, mealTotals: r } = fr(t), a = Math.round(_t(n.cal)), o = Math.round(_t(n.pro) * 10) / 10, i = Math.round(_t(r.breakfast)), l = Math.round(_t(r.dinner)), s = Math.round(_t(r.lunch)), c = Math.round(_t(r.snack)), m = t.length > 0 || a > 0 || o > 0;
  return {
    date: String((e == null ? void 0 : e.date) || ""),
    label: String((e == null ? void 0 : e.label) || (e == null ? void 0 : e.date) || ""),
    logged: m,
    totalCalories: a,
    totalProtein: o,
    breakfastCalories: i,
    lunchCalories: s,
    dinnerCalories: l,
    snackCalories: c,
    dinnerShare: a > 0 ? l / a : 0,
    breakfastLogged: i > 0,
    dinnerLogged: l > 0
  };
}
function ov(e = []) {
  const t = e.filter((l) => l.logged);
  if (t.length === 0)
    return Xs("breakfast", "not_enough_data");
  const n = t.filter((l) => l.breakfastLogged), r = n.length / t.length, a = Rm(
    n.map((l) => l.breakfastCalories),
    0.5
  ), o = Math.round((r * 0.7 + a / 100 * 0.3) * 100);
  let i = "irregular";
  return t.length < 3 ? i = n.length > 0 ? "building" : "irregular" : o >= 70 ? i = "steady" : o >= 40 && (i = "building"), {
    key: "breakfast",
    score: o,
    status: i,
    loggedDays: t.length,
    breakfastDays: n.length,
    averageBreakfastCalories: Math.round(ga(n.map((l) => l.breakfastCalories)))
  };
}
function iv(e = []) {
  const t = e.filter((l) => l.logged);
  if (t.length === 0)
    return Xs("dinner", "not_enough_data");
  const n = t.filter((l) => l.dinnerShare >= 0.45), r = ga(t.map((l) => l.dinnerShare)), a = n.length / t.length, o = Math.round((Om(r / 0.6, 0, 1) * 0.7 + a * 0.3) * 100);
  let i = "balanced";
  return r < 0.3 && n.length === 0 ? i = "light" : (o >= 60 || r >= 0.48) && (i = "heavy"), {
    key: "dinner",
    score: o,
    status: i,
    loggedDays: t.length,
    heavyDays: n.length,
    averageDinnerShare: Math.round(r * 100)
  };
}
function lv(e = [], t = 0) {
  const n = e.filter((m) => m.logged);
  if (n.length === 0)
    return Xs("protein", "not_enough_data");
  const r = Math.max(0, _t(t)), a = Math.round(ga(n.map((m) => m.totalProtein)) * 10) / 10, o = Rm(
    n.map((m) => m.totalProtein),
    0.4
  ), i = r > 0 ? n.filter((m) => m.totalProtein >= r * 0.9).length : 0, l = n.length > 0 ? i / n.length : 0, s = r > 0 ? Math.round((l * 0.6 + o / 100 * 0.4) * 100) : o;
  let c = "inconsistent";
  return n.length < 3 ? c = n.length > 0 ? "building" : "inconsistent" : s >= 70 ? c = "steady" : s >= 45 && (c = "building"), {
    key: "protein",
    score: s,
    status: c,
    loggedDays: n.length,
    targetDays: i,
    averageProtein: a,
    proteinTarget: r
  };
}
function sv(e = 7) {
  return {
    key: "hydration",
    score: null,
    status: "placeholder",
    available: !1,
    windowSize: e,
    trackedDays: 0
  };
}
function uv({ dayLogs: e = [], proteinTarget: t = 0 } = {}) {
  const n = Array.isArray(e) ? e.map(av) : [], r = n.filter((c) => c.logged), a = ov(n), o = iv(n), i = lv(n, t), l = sv(n.length || 7);
  let s = "start_logging";
  return r.length >= 3 ? a.status === "irregular" ? s = "breakfast_anchor" : o.status === "heavy" ? s = "dinner_balance" : i.status === "inconsistent" ? s = "protein_rhythm" : a.status === "building" || i.status === "building" ? s = "building_consistency" : s = "steady_week" : r.length > 0 && (s = "building_consistency"), {
    windowSize: n.length || 7,
    loggedDays: r.length,
    focus: s,
    breakfast: a,
    dinner: o,
    protein: i,
    hydration: l,
    days: n
  };
}
function $m(e = F(), { days: t = 7 } = {}) {
  var s, c;
  const n = e || F(), r = Math.max(0, Number((s = n == null ? void 0 : n.profile) == null ? void 0 : s.weight) || 0), a = Math.max(0, Number(n == null ? void 0 : n.targetCalories) || 0), o = String((n == null ? void 0 : n.currentGoalType) || ((c = n == null ? void 0 : n.profile) == null ? void 0 : c.goalType) || "lose"), i = ha(a, {
    weightKg: r,
    goalType: o
  }), l = uv({
    dayLogs: $s(t, n.selectedDate),
    proteinTarget: i.protein
  });
  return {
    ...l,
    proteinTarget: i.protein,
    lang: (n == null ? void 0 : n.curLang) || "en",
    hasData: l.loggedDays > 0
  };
}
function cv(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function fn(e, t = "en", n = "en") {
  if (typeof e == "string") return e;
  if (!cv(e)) return "";
  const r = String(t || n || "en"), a = r.split("-")[0];
  return String(
    e[r] || e[a] || e[n] || Object.values(e).find(Boolean) || ""
  ).trim();
}
function Hm(e) {
  if (Array.isArray(e))
    return e.map((n) => String(n || "").trim()).filter(Boolean);
  const t = String(e || "").trim();
  return t ? [t] : [];
}
function Wm(e) {
  return String(Array.isArray(e) ? e[0] : e || "").trim();
}
function Zs(e) {
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
function dv(e = {}) {
  return Object.fromEntries(cr.map((t) => {
    const n = Number(e == null ? void 0 : e[t]);
    return [t, Number.isFinite(n) ? n : 0];
  }));
}
function fv(e, t = 1) {
  const n = Number(t), r = Number.isFinite(n) ? n : 1, a = dr(e);
  return Zs(Object.fromEntries(
    cr.map((o) => [o, a[o] * r])
  ));
}
function mv(e, t = {}) {
  const n = dr(e), r = dv(t);
  return Zs(Object.fromEntries(
    cr.map((a) => [a, n[a] + r[a]])
  ));
}
function Uc(e, t) {
  return {
    name: fn(e == null ? void 0 : e.name, t) || "Item",
    weight: String((e == null ? void 0 : e.weight) || "").trim()
  };
}
function pv(e = {}) {
  const t = Array.isArray(e.options) ? e.options : [];
  if (e.selectionType === "multi")
    return t.filter((a) => a == null ? void 0 : a.default).map((a) => String(a.id || "").trim()).filter(Boolean);
  const r = t.find((a) => a == null ? void 0 : a.default) || t[0];
  return r != null && r.id ? [String(r.id).trim()] : [];
}
function Bm(e, t = {}) {
  const n = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  return Object.fromEntries(n.map((r) => {
    const a = String((r == null ? void 0 : r.id) || "").trim(), o = t == null ? void 0 : t[a], i = pv(r);
    if (r.selectionType === "multi") {
      const s = Hm(o);
      return [a, s.length > 0 ? s : i];
    }
    const l = Wm(o);
    return [a, l || i[0] || ""];
  }));
}
function hv(e, t) {
  const n = Array.isArray(e == null ? void 0 : e.options) ? e.options : [];
  if ((e == null ? void 0 : e.selectionType) === "multi") {
    const a = new Set(Hm(t));
    return n.filter((o) => a.has(String((o == null ? void 0 : o.id) || "").trim()));
  }
  const r = Wm(t);
  return n.filter((a) => String((a == null ? void 0 : a.id) || "").trim() === r);
}
function gv(e = [], t = [], n = "en") {
  return [
    ...Array.isArray(e) ? e.map((r) => Uc(r, n)) : [],
    ...Array.isArray(t) ? t.map((r) => Uc(r, n)) : []
  ];
}
function yv(e, t = {}) {
  const n = String(t.lang || "en"), r = Bm(e, t.selectedModifiers), a = Array.isArray(e == null ? void 0 : e.modifierGroups) ? e.modifierGroups : [];
  let o = dr((e == null ? void 0 : e.nutrition) || Xg()), i = [];
  const l = [], s = [];
  a.forEach((p) => {
    hv(p, r[p.id]).forEach((h) => {
      const v = (h == null ? void 0 : h.effect) || {};
      v.nutritionMultiplier !== void 0 && (o = fv(o, v.nutritionMultiplier)), v.nutritionDelta && (o = mv(o, v.nutritionDelta));
      const _ = Array.isArray(v.items) ? v.items : v.item ? [v.item] : [];
      _.length > 0 && (i = [...i, ..._]);
      const L = fn(h == null ? void 0 : h.label, n) || (h == null ? void 0 : h.id) || "";
      l.push({
        groupId: String((p == null ? void 0 : p.id) || "").trim(),
        optionId: String((h == null ? void 0 : h.id) || "").trim(),
        label: L,
        selectionType: (p == null ? void 0 : p.selectionType) === "multi" ? "multi" : "single"
      }), h != null && h.includeInName && s.push(fn((h == null ? void 0 : h.nameLabel) || (h == null ? void 0 : h.label), n));
    });
  });
  const c = fn(e == null ? void 0 : e.name, n) || "Preset Meal", m = s.filter(Boolean).join(", ");
  return {
    id: String((e == null ? void 0 : e.id) || "").trim(),
    region: String((e == null ? void 0 : e.region) || "").trim(),
    name: m ? `${c} (${m})` : c,
    suggestedMealType: String((e == null ? void 0 : e.suggestedMealType) || "snack"),
    nutrition: Zs(o),
    items: gv(e == null ? void 0 : e.items, i, n),
    appliedModifiers: l,
    selectedModifiers: r
  };
}
function vv(e, t = "en") {
  return fn(e == null ? void 0 : e.name, t) || String((e == null ? void 0 : e.id) || "Preset Meal");
}
function Sv(e, t = "en") {
  return fn(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Modifier");
}
function _v(e, t = "en") {
  return fn(e == null ? void 0 : e.label, t) || String((e == null ? void 0 : e.id) || "Option");
}
function Da(e) {
  const t = Number(e);
  return Number.isFinite(t) ? t : 0;
}
function Js(e = "zh-TW") {
  return String(e || "zh-TW").toLowerCase().startsWith("en") ? "singapore" : "taiwan";
}
function wv(e = {}, t = "zh-TW") {
  const n = String(e.region || "").trim() || Js(t);
  return {
    region: n,
    diningOutFrequency: String(e.diningOutFrequency || "sometimes").trim() || "sometimes",
    preferredPresetRegion: n
  };
}
function Um(e = {}, t = "zh-TW") {
  const n = wv(e, t);
  return {
    gender: String(e.gender || "male"),
    age: Math.max(0, Da(e.age)),
    height: Math.max(0, Da(e.height)),
    weight: Math.max(0, Da(e.weight)),
    activity: Math.max(0, Da(e.activity)),
    goalType: String(e.goalType || "lose"),
    mealMode: String(e.mealMode || "4"),
    region: n.region,
    diningOutFrequency: n.diningOutFrequency,
    preferredPresetRegion: n.preferredPresetRegion
  };
}
function Vc(e = {}, t = "zh-TW") {
  const n = Um(e, t), r = [];
  return (!n.age || !n.height || !n.weight || !n.activity) && r.push("basicProfile"), n.goalType || r.push("goalType"), {
    ...n,
    isComplete: r.length === 0,
    missingFields: r
  };
}
function Tv(e = {}) {
  const t = Um(e);
  if (!t.age || !t.height || !t.weight || !t.activity)
    return null;
  const n = t.gender === "male" ? 10 * t.weight + 6.25 * t.height - 5 * t.age + 5 : 10 * t.weight + 6.25 * t.height - 5 * t.age - 161, r = Math.round(n * t.activity), a = My({
    weightKg: t.weight,
    tdee: r,
    bmr: n,
    goalType: t.goalType
  });
  return {
    ...t,
    bmr: Math.round(n),
    tdee: r,
    targetCalories: a.targetCalories,
    macroGoals: a.macroGoals,
    goalType: a.goalType
  };
}
const eu = Object.freeze([
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
function kv(e = {}) {
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
function Vm(e = {}) {
  return {
    ...e,
    nutrition: { ...e.nutrition || {} },
    items: Array.isArray(e.items) ? e.items.map((t) => ({ ...t })) : [],
    modifierGroups: Array.isArray(e.modifierGroups) ? e.modifierGroups.map((t) => ({
      ...t,
      options: Array.isArray(t.options) ? t.options.map(kv) : []
    })) : []
  };
}
function xv() {
  return eu.map(Vm);
}
function bv(e) {
  const t = String(e || "").trim(), n = eu.find((r) => r.id === t);
  return n ? Vm(n) : null;
}
function Nv() {
  return [...new Set(eu.map((e) => String(e.region || "").trim()).filter(Boolean))];
}
const Cv = Object.freeze({
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
function Mv(e = "en") {
  return String(e || "en").split("-")[0];
}
function Ev(e, t = "en") {
  const n = Cv[e] || {};
  return n[t] || n[Mv(t)] || n.en || e;
}
function Av(e = "zh-TW") {
  return Js(e);
}
function Iv(e = "en") {
  return Nv().map((t) => ({
    id: t,
    label: Ev(t, e)
  }));
}
function Lv(e = "", t = "en") {
  const n = String(e || "").trim();
  return xv().filter((r) => !n || r.region === n).map((r) => ({
    id: r.id,
    region: r.region,
    label: vv(r, t),
    suggestedMealType: r.suggestedMealType
  }));
}
function jv({
  lang: e = "en",
  region: t = "",
  profileRegion: n = "",
  presetId: r = "",
  selectedModifiers: a = {}
} = {}) {
  var p;
  const o = t || String(n || "").trim() || Av(e), i = Lv(o, e), l = r && i.some((d) => d.id === r) ? r : ((p = i[0]) == null ? void 0 : p.id) || "", s = bv(l), c = s ? Bm(s, a) : {}, m = s ? yv(s, {
    lang: e,
    selectedModifiers: c
  }) : null;
  return {
    regions: Iv(e),
    selectedRegion: o,
    presets: i,
    selectedPresetId: l,
    modifierGroups: Array.isArray(s == null ? void 0 : s.modifierGroups) ? s.modifierGroups.map((d) => ({
      id: d.id,
      label: Sv(d, e),
      selectionType: d.selectionType === "multi" ? "multi" : "single",
      selectedValue: c[d.id] ?? (d.selectionType === "multi" ? [] : ""),
      options: (d.options || []).map((h) => ({
        id: h.id,
        label: _v(h, e),
        selected: d.selectionType === "multi" ? (c[d.id] || []).includes(h.id) : c[d.id] === h.id
      }))
    })) : [],
    resolvedPreset: m
  };
}
const Pi = [
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
], xr = Object.freeze({
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
function Pv({
  hour: e = (/* @__PURE__ */ new Date()).getHours(),
  minutesSinceLastOpen: t = 0,
  allQuestsComplete: n = !1,
  justLevelledUp: r = !1,
  ratio: a = 0,
  hoursWithoutLog: o = 0
} = {}) {
  return r ? xr.celebrating : n ? xr.excited : e >= 23 || e < 6 ? xr.sleeping : t >= 1440 ? xr.lonely : a < 0.1 && o >= 6 ? xr.starving : null;
}
const dt = Object.freeze({
  TAP: "tap",
  LONG_PRESS: "long_press",
  COMBO: "combo"
}), za = Object.freeze({
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
function Dv({ type: e, mood: t = "hungry", comboCount: n = 0, holdSeconds: r = 0 } = {}) {
  if (e === dt.TAP) {
    const a = za.tap;
    return a[t] || a.hungry;
  }
  if (e === dt.LONG_PRESS) {
    const a = za.long_press;
    for (let o = a.length - 1; o >= 0; o -= 1)
      if (r >= a[o].threshold) return a[o];
    return a[0];
  }
  if (e === dt.COMBO) {
    const a = za.combo;
    for (let o = a.length - 1; o >= 0; o -= 1)
      if (n >= a[o].threshold) return a[o];
    return a[0];
  }
  return za.tap.hungry;
}
const zv = Object.freeze({
  [dt.TAP]: 2e3,
  [dt.LONG_PRESS]: 5e3,
  [dt.COMBO]: 1e4
}), Fv = Object.freeze([
  "petInteractMsg1",
  "petInteractMsg2",
  "petInteractMsg3",
  "petInteractMsg4",
  "petInteractMsg5"
]);
function Ie(e, t = 0) {
  const n = Number(e);
  return Number.isFinite(n) ? n : t;
}
function $r(e, t = 0, n = 100) {
  return Math.min(Math.max(e, t), n);
}
function Km(e = {}) {
  const t = Math.max(0, Math.round(Ie(e == null ? void 0 : e.xp))), n = Math.floor(t / 100) + 1;
  return {
    level: Math.max(1, Math.round(Ie(e == null ? void 0 : e.level, n)) || n),
    xp: t,
    mood: String((e == null ? void 0 : e.mood) || "hungry"),
    energy: $r(Math.round(Ie(e == null ? void 0 : e.energy))),
    bond: $r(Math.round(Ie(e == null ? void 0 : e.bond))),
    streak: Math.max(0, Math.round(Ie(e == null ? void 0 : e.streak)))
  };
}
function Ov(e = []) {
  var n;
  if (!Array.isArray(e) || e.length === 0) return 0;
  let t = 0;
  for (let r = e.length - 1; r >= 0 && !(Ie((n = e[r]) == null ? void 0 : n.calories) <= 0); r -= 1)
    t += 1;
  return t;
}
function Rv({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0
} = {}) {
  const o = Math.max(0, Ie(e)), i = Math.max(0, Ie(t)), l = i > 0 ? Math.min(o / i, 1.4) : 0, s = Math.max(0, Math.round(Ie(n))), c = Math.max(0, Math.round(Ie(r))), m = $r(Math.round(Ie(a))), p = $r(Math.round(l * 90) + Math.min(s, 5) * 2), d = Math.round(Math.min(l, 1.1) * 80) + Math.min(s, 5) * 10 + Math.min(c, 7) * 5, h = Math.floor(d / 100) + 1, v = $r(m + Math.min(c, 7) * 5 + Math.min(s, 5) * 3);
  return Km({
    level: h,
    xp: d,
    mood: "hungry",
    energy: p,
    bond: v,
    streak: c
  });
}
function $v({
  totalCalories: e = 0,
  targetCalories: t = 0,
  loggedMeals: n = 0,
  streak: r = 0,
  bond: a = 0,
  overlayContext: o = null
} = {}) {
  const i = Math.max(0, Ie(e)), l = Math.max(0, Ie(t, 2e3)) || 2e3, s = Math.min(i / l, 1.4), c = Pi.find((h) => s >= h.minRatio) || Pi[Pi.length - 1], m = Rv({
    totalCalories: i,
    targetCalories: l,
    loggedMeals: n,
    streak: r,
    bond: a
  }), d = (o ? Pv(o) : null) || c;
  return {
    key: d.key,
    ratio: s,
    frameKey: d.frameKey,
    messageKey: d.messageKey,
    mood: d.mood,
    baseKey: c.key,
    baseMood: c.mood,
    progress: Km({
      ...m,
      mood: d.mood
    })
  };
}
function Gm(e = F()) {
  var c;
  const t = fr((e == null ? void 0 : e.foodItems) || []), n = bo(7, e == null ? void 0 : e.selectedDate), r = Number(e == null ? void 0 : e.targetCalories) || 0, a = Math.max(0, Number((c = e == null ? void 0 : e.profile) == null ? void 0 : c.weight) || 0), o = (e == null ? void 0 : e.currentGoalType) || "lose", i = Iy({
    total: t.totals,
    targetCalories: r,
    calorieHistory: n,
    goalType: o,
    weightKg: a
  }), l = Ov(n), s = $v({
    totalCalories: t.totals.cal,
    targetCalories: r,
    loggedMeals: Array.isArray(e == null ? void 0 : e.foodItems) ? e.foodItems.length : 0,
    streak: l
  });
  return {
    totals: t.totals,
    coach: i,
    calorieHistory: n,
    statusKey: s.key,
    frameKey: s.frameKey,
    messageKey: s.messageKey,
    progress: s.progress,
    interactionMessageKeys: Fv
  };
}
const Hv = Object.freeze([
  "calories",
  "protein",
  "carbohydrate",
  "fat"
]), Wv = Object.freeze([
  Object.freeze({
    id: "quality",
    fields: Object.freeze(["fiber", "sugar", "sodium"])
  }),
  Object.freeze({
    id: "fatDetails",
    fields: Object.freeze(["saturatedFat", "transFat"])
  })
]), Bv = Object.freeze({
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
function jt(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function Kc(e, t) {
  const n = t[e] ?? 0, r = e === "calories" || e === "sodium" ? Math.round(Number(n) || 0) : jt(n);
  return {
    field: e,
    value: r,
    unit: Bv[e] || ""
  };
}
function Uv(e = []) {
  const t = Array.isArray(e) ? e : [];
  if (t.length === 0)
    return Ce();
  const n = t.reduce((r, a) => {
    const o = Ce(a);
    return Object.keys(r).forEach((i) => {
      r[i] += Number(o[i]) || 0;
    }), r;
  }, Ce());
  return Object.fromEntries(
    Object.keys(n).map((r) => {
      const a = n[r] / t.length;
      return [r, r === "calories" || r === "sodium" ? Math.round(a) : jt(a)];
    })
  );
}
function Vv(e = {}) {
  const t = Ce(e);
  return {
    nutrition: t,
    highlights: Hv.map((n) => Kc(n, t)),
    sections: Wv.map((n) => ({
      id: n.id,
      items: n.fields.map((r) => Kc(r, t))
    }))
  };
}
function Kv({
  todayNutrition: e = {},
  nutritionHistory: t = [],
  proteinTarget: n = 0,
  fiberTarget: r = 25,
  sodiumLimit: a = 2300
} = {}) {
  const o = Ce(e), i = (Array.isArray(t) ? t : []).map((d) => Ce(d)).filter((d) => Object.values(d).some((h) => Number(h) > 0)), l = Uv(i), s = Math.max(0, jt(n)), c = Math.max(0, jt(r)), m = Math.max(0, Math.round(Number(a) || 0));
  let p = "balanced";
  return i.length === 0 && o.calories <= 0 ? p = "start_logging" : s > 0 && o.protein < s * 0.72 ? p = "protein" : o.fiber < Math.max(c * 0.72, 12) ? p = "fiber" : m > 0 && o.sodium > m && (p = "sodium"), {
    focusKey: p,
    loggedDays: i.length,
    averageNutrition: l,
    proteinTarget: s,
    fiberTarget: c,
    sodiumLimit: m,
    signals: [
      {
        key: "protein",
        current: jt(o.protein),
        target: s,
        average: jt(l.protein)
      },
      {
        key: "fiber",
        current: jt(o.fiber),
        target: c,
        average: jt(l.fiber)
      },
      {
        key: "sodium",
        current: Math.round(o.sodium),
        target: m,
        average: Math.round(l.sodium)
      }
    ]
  };
}
function tn(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function tu(e = {}) {
  return dr({
    calories: Math.round(Number(e.cal) || 0),
    protein: tn(e.pro),
    fat: tn(e.fat),
    carbohydrate: tn(e.carb),
    sugar: tn(e.sugar),
    sodium: Math.round(Number(e.sod) || 0),
    saturatedFat: tn(e.sat),
    transFat: tn(e.trans),
    fiber: tn(e.fiber)
  });
}
function Gv(e = 7, t) {
  return $s(e, t).map((n) => {
    const r = fr((n == null ? void 0 : n.items) || []);
    return tu(r.totals);
  }).filter((n) => Object.values(n).some((r) => Number(r) > 0));
}
function Qv(e = F()) {
  const t = Jo(e), n = tu(t.totals), r = Number(t.targetCalories) || 0;
  return {
    nutrition: n,
    detail: Vv(n),
    targetCalories: r,
    remainingCalories: r > 0 ? Math.round(r - n.calories) : 0,
    waterTarget: Number(t.waterTarget) || 0
  };
}
function Qm(e = F(), { days: t = 7 } = {}) {
  var l, s;
  const n = e || F(), r = Jo(n), a = tu(r.totals), o = Math.max(0, Number((l = n == null ? void 0 : n.profile) == null ? void 0 : l.weight) || 0), i = ha(r.targetCalories, {
    weightKg: o,
    goalType: (n == null ? void 0 : n.currentGoalType) || ((s = n == null ? void 0 : n.profile) == null ? void 0 : s.goalType) || "lose"
  });
  return {
    days: t,
    nutrition: a,
    ...Kv({
      todayNutrition: a,
      nutritionHistory: Gv(t, n.selectedDate),
      proteinTarget: i.protein,
      fiberTarget: 25,
      sodiumLimit: 2300
    })
  };
}
function Yv(e = F()) {
  return fr((e == null ? void 0 : e.foodItems) || []);
}
function Hn(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function qv(e = 7, t) {
  return $s(e, t).map((n) => {
    const r = fr((n == null ? void 0 : n.items) || []).totals, a = Hn(r.pro, 1), o = Hn(r.fat, 1), i = Hn(r.carb, 1);
    return {
      date: (n == null ? void 0 : n.date) || "",
      label: (n == null ? void 0 : n.label) || String((n == null ? void 0 : n.date) || "").slice(5),
      protein: a,
      fat: o,
      carb: i,
      calories: Math.round(Number(r.cal) || 0),
      totalMacros: Hn(a + o + i, 1)
    };
  });
}
function pr(e = F(), { range: t = 7, weightDays: n = 30 } = {}) {
  const r = Yv(e), a = e == null ? void 0 : e.selectedDate;
  return {
    totals: r.totals,
    mealTotals: r.mealTotals,
    weeklyCalories: bo(7, a),
    calorieTrend: bo(t, a),
    proteinTrend: hy(t, a),
    macroSnapshot: qv(t, a),
    weightTrend: ky(n, a),
    mealRhythm: $m(e, { days: 7 }),
    nutritionFocus: Qm(e, { days: 7 })
  };
}
function Xv(e, t) {
  const n = Ey(String((e == null ? void 0 : e.currentMealMode) || "4"), {}, Number(e == null ? void 0 : e.targetCalories) || 0), r = n.map((l) => l.type), a = new Set(
    ((t == null ? void 0 : t.foodItems) || []).map((l) => l == null ? void 0 : l.type).filter(Boolean)
  ), o = r.filter((l) => a.has(l)).length, i = n.find((l) => !a.has(l.type)) || null;
  return {
    plannedMealTypes: r,
    loggedMealTypes: [...a],
    loggedMeals: o,
    plannedMeals: n.length,
    nextMealType: (i == null ? void 0 : i.type) || "",
    nextMealTitleKey: (i == null ? void 0 : i.titleKey) || ""
  };
}
function Zv(e = F()) {
  var L, g, f, y, S, b, w, k;
  const t = e || F(), n = Jo(t), r = Gm(t), a = $m(t, { days: 7 }), o = Math.max(0, Number((L = t == null ? void 0 : t.profile) == null ? void 0 : L.weight) || 0), i = ha(n.targetCalories, {
    weightKg: o,
    goalType: (t == null ? void 0 : t.currentGoalType) || ((g = t == null ? void 0 : t.profile) == null ? void 0 : g.goalType) || "lose"
  }), l = Math.max(0, Number(i.protein) || 0), s = Math.max(0, Number(i.fat) || 0), c = Math.max(0, Number(i.carb) || 0), m = Hn(n.totals.pro, 1), p = Math.max(0, Hn(l - m, 1)), d = Xv(t, n), h = Math.round(Math.max(0, (n.targetCalories || 0) - (n.totals.cal || 0))), v = jv({
    lang: (t == null ? void 0 : t.curLang) || "en",
    profileRegion: ((f = t == null ? void 0 : t.profile) == null ? void 0 : f.region) || ""
  }), _ = (v.regions || []).find((N) => N.id === v.selectedRegion);
  return {
    lang: (t == null ? void 0 : t.curLang) || "en",
    goalType: (t == null ? void 0 : t.currentGoalType) || ((y = t == null ? void 0 : t.profile) == null ? void 0 : y.goalType) || "lose",
    diningOutFrequency: String(((S = t == null ? void 0 : t.profile) == null ? void 0 : S.diningOutFrequency) || "sometimes"),
    targetCalories: n.targetCalories,
    remainingCalories: h,
    calorieProgressPercent: n.targetCalories > 0 ? Math.min(Math.round(n.totals.cal / n.targetCalories * 100), 199) : 0,
    presetRegion: v.selectedRegion,
    presetRegionLabel: (_ == null ? void 0 : _.label) || v.selectedRegion || "",
    presetCount: ((b = v.presets) == null ? void 0 : b.length) || 0,
    featuredPresetName: ((k = (w = v.presets) == null ? void 0 : w[0]) == null ? void 0 : k.label) || "",
    proteinTarget: l,
    proteinCurrent: m,
    proteinRemaining: p,
    fatTarget: s,
    carbTarget: c,
    mealCoverage: d,
    daily: n,
    pet: r,
    rhythm: a
  };
}
const Jv = ["breakfast", "lunch", "dinner", "snack"], Di = Object.freeze({
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
function D(e, t = "") {
  return e == null ? t : String(e);
}
function zi(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function e0(e = "en") {
  return Di[e] || Di[String(e || "en").split("-")[0]] || Di.en;
}
function Ol(e, t) {
  var r;
  const n = tt(t);
  return ((r = n == null ? void 0 : n.meals) == null ? void 0 : r[e]) || e || "";
}
function t0(e) {
  return e === "zh-TW" || e === "zh-CN" ? "加入常吃" : "Save favorite";
}
function n0(e) {
  return e === "zh-TW" ? "刪除餐點" : e === "zh-CN" ? "删除餐点" : "Delete meal";
}
function r0(e, t, n) {
  const r = Ys(t), o = Jv.map((i) => {
    const l = e.filter((c) => c.mealType === i), s = l.reduce((c, m) => c + m.calories, 0);
    return {
      key: i,
      label: Ol(i, t),
      totalCalories: s,
      metaText: l.length > 0 ? r.mealGroupMeta(l.length, s) : n,
      items: l,
      emptyText: n
    };
  }).filter((i) => i.items.length > 0);
  return o.length > 0 ? o : [];
}
function a0(e) {
  var L, g, f, y, S, b, w, k, N, A, E, V, $, Oe, Et, gt, nt, Re, C, j, P, H, K, Ke, rt, Tn, at, en, mu, pu, hu, gu, yu, vu, Su, _u, wu, Tu, ku, xu, bu, Nu, Cu, Mu, Eu;
  const t = Zv(e), n = tt(t.lang), r = tv(t, t.lang), a = Ys(t.lang), o = e0(t.lang), i = ((L = r.hero) == null ? void 0 : L.stats) || [], l = ((g = r.hero) == null ? void 0 : g.meta) || [], s = (((f = t.daily) == null ? void 0 : f.foodItems) || []).map((I, ya) => {
    const kn = (I == null ? void 0 : I.nutri) || (I == null ? void 0 : I.nutrition) || {}, ni = Number((kn == null ? void 0 : kn.calories) ?? (kn == null ? void 0 : kn.cal) ?? 0) || 0, ri = String((I == null ? void 0 : I.type) || "snack");
    return {
      id: `${ri}-${ya}-${String((I == null ? void 0 : I.name) || "meal")}`.replace(/\s+/g, "-").toLowerCase(),
      sourceIndex: ya,
      name: D((I == null ? void 0 : I.name) || (I == null ? void 0 : I.foodName), ""),
      mealType: ri,
      mealTypeLabel: Ol(ri, t.lang),
      calories: ni,
      portion: D((I == null ? void 0 : I.weight) || (I == null ? void 0 : I.portion) || "", ""),
      hint: ni > 0 ? `${Math.round(ni)} kcal` : (n == null ? void 0 : n.txtNoData) || ""
    };
  }).filter((I) => I.name || I.calories > 0), c = r0(s, t.lang, a.emptyMeal), m = qs(e.selectedDate, t.lang), p = re(), d = s.reduce((I, ya) => I + ya.calories, 0), h = zi((S = (y = t.daily) == null ? void 0 : y.totals) == null ? void 0 : S.pro, 1), v = zi((w = (b = t.daily) == null ? void 0 : b.totals) == null ? void 0 : w.fat, 1), _ = zi((N = (k = t.daily) == null ? void 0 : k.totals) == null ? void 0 : N.carb, 1);
  return {
    companion: {
      ...t,
      pet: {
        ...t.pet,
        resolvedMessage: D(n == null ? void 0 : n[(A = t.pet) == null ? void 0 : A.messageKey], "") || D((E = t.pet) == null ? void 0 : E.messageKey, ""),
        equipped: ((V = t.pet) == null ? void 0 : V.equipped) || {}
      }
    },
    petStageCopy: {
      pet: a.pet || "Companion",
      bondLabel: D(($ = a.petStage) == null ? void 0 : $.bondLabel, (n == null ? void 0 : n.petBondLabel) || "Bond"),
      energyLabel: D((Oe = a.petStage) == null ? void 0 : Oe.energyLabel, (n == null ? void 0 : n.petEnergyLabel) || "Energy"),
      streakLabel: D((Et = a.petStage) == null ? void 0 : Et.streakLabel, (n == null ? void 0 : n.petStreakLabel) || "Streak"),
      dayUnit: D((gt = a.petStage) == null ? void 0 : gt.dayUnit, (n == null ? void 0 : n.petDayUnit) || "d"),
      petTapLabel: D((nt = a.petStage) == null ? void 0 : nt.tapLabel, (n == null ? void 0 : n.petTapLabel) || "Interact with your companion")
    },
    resolveDialogText: (I) => D(n == null ? void 0 : n[I], ""),
    copy: {
      ...a,
      favoriteActionLabel: t0(t.lang),
      deleteActionLabel: n0(t.lang),
      appName: D(a.appName, "Woof Cal"),
      screenTitle: D(a.screenTitle, a.today || "Today"),
      dailyCaloriesTitle: D(a.dailyCaloriesTitle, "Daily calories"),
      remainingLabel: D(a.remainingLabel, "Remaining"),
      macroFocusEyebrow: D(a.macroFocusEyebrow, "3 macro focus"),
      macroFocusTitle: D(a.macroFocusTitle, "Macros"),
      macroFocusHint: D(a.macroFocusHint, ""),
      mealDiaryEyebrow: D(a.mealDiaryEyebrow, o.mealDiaryTitle),
      previousDate: D(a.previousDate, "Previous date"),
      nextDate: D(a.nextDate, "Next date"),
      headlineEmpty: D(a.headlineEmpty, "Start your first meal"),
      headlineProgress: D(a.headlineProgress, "Nice momentum today"),
      headlineComplete: D(a.headlineComplete, "Great progress today")
    },
    hero: {
      eyebrow: D((Re = r.hero) == null ? void 0 : Re.eyebrow, ""),
      title: D((C = r.hero) == null ? void 0 : C.title, ""),
      summary: D((j = r.hero) == null ? void 0 : j.summary, ""),
      stats: i.map((I) => ({
        label: D(I == null ? void 0 : I.label, ""),
        value: D(I == null ? void 0 : I.value, "")
      })),
      meta: l.map((I) => D(I, "")).filter(Boolean),
      actions: {
        log: D((H = (P = r.hero) == null ? void 0 : P.actions) == null ? void 0 : H.log, "Log meal"),
        ai: D((Ke = (K = r.hero) == null ? void 0 : K.actions) == null ? void 0 : Ke.ai, "AI Analysis"),
        favorites: D((Tn = (rt = r.hero) == null ? void 0 : rt.actions) == null ? void 0 : Tn.favorites, "Favorites")
      }
    },
    quickLog: {
      title: D((at = r.logHub) == null ? void 0 : at.title, ""),
      summary: D((en = r.logHub) == null ? void 0 : en.summary, ""),
      favoritesCopy: D((mu = r.logHub) == null ? void 0 : mu.favoritesCopy, ""),
      todayMealsKicker: D((pu = r.logHub) == null ? void 0 : pu.todayMealsKicker, a.today),
      todayMealsTitle: D((hu = r.logHub) == null ? void 0 : hu.todayMealsTitle, a.today),
      todayMealsHint: D((gu = r.logHub) == null ? void 0 : gu.todayMealsHint, "")
    },
    overview: {
      title: D((yu = r.overview) == null ? void 0 : yu.title, ""),
      hint: D((vu = r.overview) == null ? void 0 : vu.hint, ""),
      signals: (((Su = r.overview) == null ? void 0 : Su.signals) || []).map((I) => ({
        label: D(I == null ? void 0 : I.label, ""),
        value: D(I == null ? void 0 : I.value, "--"),
        detail: D(I == null ? void 0 : I.detail, "")
      }))
    },
    todayMeals: {
      title: o.mealDiaryTitle,
      hint: s.length > 0 ? a.mealGroupMeta(s.length, d) : o.mealDiaryHint,
      kicker: D((_u = r.logHub) == null ? void 0 : _u.todayMealsKicker, a.today),
      actionLabel: m,
      dateLabel: m,
      dateControl: {
        value: e.selectedDate,
        label: m,
        max: p,
        nextDisabled: e.selectedDate >= p
      },
      count: s.length,
      totalCalories: d,
      groups: c
    },
    dashboard: {
      title: o.nutritionSummaryTitle,
      hint: o.nutritionSummaryHint,
      cta: o.nutritionSummaryCta,
      nutrientCountLabel: o.nutrientCountLabel,
      caloriesLabel: n.cal || ((wu = a.metrics) == null ? void 0 : wu.calories) || "Calories",
      caloriesValue: Number((ku = (Tu = t.daily) == null ? void 0 : Tu.totals) == null ? void 0 : ku.cal) || 0,
      remainingCalories: Number(t.remainingCalories) || 0,
      macros: [
        {
          key: "protein",
          label: n.pro || "Protein",
          shortLabel: n.pro || "Protein",
          value: h,
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
      calories: Number((bu = (xu = t.daily) == null ? void 0 : xu.totals) == null ? void 0 : bu.cal) || 0,
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
      loggedMeals: Number((Nu = t.mealCoverage) == null ? void 0 : Nu.loggedMeals) || 0,
      plannedMeals: Number((Cu = t.mealCoverage) == null ? void 0 : Cu.plannedMeals) || 0,
      nextMealType: Ol((Mu = t.mealCoverage) == null ? void 0 : Mu.nextMealType, t.lang),
      nextMealTitleKey: D((Eu = t.mealCoverage) == null ? void 0 : Eu.nextMealTitleKey, "")
    }
  };
}
function o0() {
  const e = mr();
  return a0(e);
}
function i0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10Z" }),
    /* @__PURE__ */ u.jsx("path", { d: "M12 18a2 2 0 0 1-2-2c0-2 2-3 2-5 0 2 2 3 2 5a2 2 0 0 1-2 2Z" })
  ] });
}
function Ym() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20" }),
    /* @__PURE__ */ u.jsx("path", { d: "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" }),
    /* @__PURE__ */ u.jsx("path", { d: "M8 7h8" }),
    /* @__PURE__ */ u.jsx("path", { d: "M8 11h5" })
  ] });
}
function l0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("ellipse", { cx: "8.5", cy: "6.5", rx: "1.8", ry: "2.2" }),
    /* @__PURE__ */ u.jsx("ellipse", { cx: "15.5", cy: "6.5", rx: "1.8", ry: "2.2" }),
    /* @__PURE__ */ u.jsx("ellipse", { cx: "5.5", cy: "11.5", rx: "1.5", ry: "2" }),
    /* @__PURE__ */ u.jsx("ellipse", { cx: "18.5", cy: "11.5", rx: "1.5", ry: "2" }),
    /* @__PURE__ */ u.jsx("path", { d: "M7 17c0-2.5 2-4.5 5-4.5s5 2 5 4.5c0 1.5-1.5 3-5 3s-5-1.5-5-3Z" })
  ] });
}
function s0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M18 20V10" }),
    /* @__PURE__ */ u.jsx("path", { d: "M12 20V4" }),
    /* @__PURE__ */ u.jsx("path", { d: "M6 20v-6" })
  ] });
}
function u0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" }),
    /* @__PURE__ */ u.jsx("circle", { cx: "12", cy: "7", r: "4" })
  ] });
}
const c0 = 3e3, Gc = 1500;
function d0({ mood: e = "hungry", onBondChange: t } = {}) {
  const [n, r] = ee.useState(null), a = ee.useRef(null), o = ee.useRef({ count: 0, timer: null }), i = ee.useRef({ startTime: 0, timer: null, active: !1 }), l = ee.useCallback(() => {
    r(null);
  }, []), s = ee.useCallback((d, h = {}) => {
    if (a.current) return;
    const v = Dv({ type: d, mood: e, ...h });
    r({ type: d, ...v, timestamp: Date.now() }), v.bondDelta > 0 && typeof t == "function" && t(v.bondDelta);
    const _ = zv[d] || 2e3;
    a.current = setTimeout(() => {
      a.current = null;
    }, _);
  }, [e, t]), c = ee.useCallback((d) => {
    d.preventDefault(), i.current.startTime = Date.now(), i.current.active = !0, i.current.timer = setTimeout(() => {
      if (!i.current.active) return;
      i.current.active = !1;
      const h = (Date.now() - i.current.startTime) / 1e3;
      s(dt.LONG_PRESS, { holdSeconds: h });
    }, Gc);
  }, [s]), m = ee.useCallback(() => {
    if (!i.current.active) return;
    i.current.active = !1;
    const d = Date.now() - i.current.startTime;
    if (clearTimeout(i.current.timer), d >= Gc) {
      const h = d / 1e3;
      s(dt.LONG_PRESS, { holdSeconds: h });
      return;
    }
    if (o.current.count += 1, clearTimeout(o.current.timer), o.current.count >= 3) {
      const h = o.current.count;
      o.current.count = 0, s(dt.COMBO, { comboCount: h });
      return;
    }
    o.current.timer = setTimeout(() => {
      o.current.count = 0, s(dt.TAP);
    }, c0);
  }, [s]), p = ee.useCallback(() => {
    i.current.active = !1, clearTimeout(i.current.timer);
  }, []);
  return {
    interaction: n,
    clearInteraction: l,
    pointerHandlers: {
      onPointerDown: c,
      onPointerUp: m,
      onPointerCancel: p,
      onPointerLeave: p
    }
  };
}
const f0 = 3e3;
function m0({ text: e, visible: t = !1, onDismiss: n }) {
  const [r, a] = ee.useState(!1);
  return ee.useEffect(() => {
    if (!t || !e) {
      a(!1);
      return;
    }
    a(!0);
    const o = setTimeout(() => {
      a(!1), typeof n == "function" && n();
    }, f0);
    return () => clearTimeout(o);
  }, [t, e, n]), !r || !e ? null : /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__speech-bubble", "aria-live": "polite", children: [
    /* @__PURE__ */ u.jsx("span", { className: "woof-pet__speech-text", children: e }),
    /* @__PURE__ */ u.jsx("div", { className: "woof-pet__speech-tail", "aria-hidden": "true" })
  ] });
}
const Qc = {
  hearts: ["❤️", "💕", "💖"],
  stars: ["⭐", "✨", "🌟"],
  zzz: ["💤", "Z", "z"],
  sweat: ["💦", "😅"],
  confetti: ["🎉", "🎊", "✨", "🌟"],
  bounce: ["✨", "⭐"],
  spiral: ["💫", "😵‍💫"]
};
function p0({ effect: e }) {
  if (!e || e === "none") return null;
  const t = Qc[e] || Qc.stars;
  return /* @__PURE__ */ u.jsx("div", { className: "woof-pet__particles", "aria-hidden": "true", children: t.map((n, r) => /* @__PURE__ */ u.jsx(
    "span",
    {
      className: `woof-pet__particle woof-pet__particle--${r}`,
      children: n
    },
    `${e}-${r}`
  )) });
}
const Yc = Object.freeze({
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
function h0(e = "low") {
  return Yc[e] || Yc.low;
}
function g0(e, t) {
  const n = e - (t - 1) * 100;
  return `${Math.max(0, n)}/100`;
}
function y0({
  pet: e = {},
  copy: t = {},
  resolveDialogText: n,
  onQuickLog: r
}) {
  const a = (e == null ? void 0 : e.mood) || (e == null ? void 0 : e.baseMood) || "hungry", o = (e == null ? void 0 : e.progress) || {}, [i, l] = ee.useState(""), s = ee.useCallback(() => {
  }, []), { interaction: c, clearInteraction: m, pointerHandlers: p } = d0({
    mood: a,
    onBondChange: s
  });
  ee.useEffect(() => {
    if (!(c != null && c.animClass)) return;
    l(c.animClass);
    const v = setTimeout(() => l(""), 800);
    return () => clearTimeout(v);
  }, [c]);
  const d = c != null && c.dialogKey && typeof n == "function" ? n(c.dialogKey) : "", h = (e == null ? void 0 : e.equipped) || {};
  return Object.values(h).some(Boolean), /* @__PURE__ */ u.jsxs("section", { className: "woof-pet__stage", "aria-label": t.pet || "Companion", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__scene", children: [
      /* @__PURE__ */ u.jsx("div", { className: "woof-pet__orb", "aria-hidden": "true" }),
      /* @__PURE__ */ u.jsxs(
        "div",
        {
          className: `woof-pet__character ${i}`,
          ...p,
          role: "button",
          tabIndex: 0,
          "aria-label": t.petTapLabel || "Interact with pet",
          style: { touchAction: "none" },
          children: [
            /* @__PURE__ */ u.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--base",
                src: h0(e == null ? void 0 : e.frameKey),
                alt: "",
                loading: "eager",
                decoding: "async",
                draggable: !1
              }
            ),
            h.outfit && /* @__PURE__ */ u.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--outfit",
                src: `costumes/${h.outfit}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                alt: "",
                draggable: !1
              }
            ),
            h.accessory && /* @__PURE__ */ u.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--accessory",
                src: `costumes/${h.accessory}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                alt: "",
                draggable: !1
              }
            ),
            h.headwear && /* @__PURE__ */ u.jsx(
              "img",
              {
                className: "woof-pet__sprite woof-pet__sprite--headwear",
                src: `costumes/${h.headwear}/${(e == null ? void 0 : e.frameKey) || "low"}.png`,
                alt: "",
                draggable: !1
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ u.jsx(p0, { effect: c == null ? void 0 : c.effect }),
      /* @__PURE__ */ u.jsx(
        m0,
        {
          text: d,
          visible: !!c,
          onDismiss: m
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__stats", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__level-badge", children: [
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__level-label", children: "Lv." }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__level-value", children: o.level || 1 })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__xp-bar", children: [
        /* @__PURE__ */ u.jsx(
          "div",
          {
            className: "woof-pet__xp-fill",
            style: { width: `${Math.min((o.xp || 0) % 100, 100)}%` }
          }
        ),
        /* @__PURE__ */ u.jsxs("span", { className: "woof-pet__xp-text", children: [
          g0(o.xp || 0, o.level || 1),
          " XP"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__meters", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__meter", title: t.bondLabel || "Bond", children: [
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "❤️" }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-label", children: t.bondLabel || "Bond" }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-value", children: o.bond || 0 })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__meter", title: t.energyLabel || "Energy", children: [
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "⚡" }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-label", children: t.energyLabel || "Energy" }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-value", children: o.energy || 0 })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "woof-pet__meter", title: t.streakLabel || "Streak", children: [
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-icon", "aria-hidden": "true", children: "🔥" }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-pet__meter-label", children: t.streakLabel || "Streak" }),
        /* @__PURE__ */ u.jsxs("span", { className: "woof-pet__meter-value", children: [
          o.streak || 0,
          t.dayUnit || "d"
        ] })
      ] })
    ] })
  ] });
}
function ut() {
}
function Rl(e) {
  const t = Math.round((Number(e) || 0) * 10) / 10;
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
}
function v0({
  name: e,
  calories: t,
  portion: n,
  favoriteLabel: r,
  deleteLabel: a,
  onFavorite: o = ut,
  onDelete: i = ut
}) {
  return /* @__PURE__ */ u.jsxs("div", { className: "woof-home__meal-row", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "woof-home__meal-row-main", children: [
      /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-name", children: e }),
      n ? /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-portion", children: n }) : null
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "woof-home__meal-row-side", children: [
      /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-calories", children: t > 0 ? `${Math.round(t)} kcal` : "--" }),
      /* @__PURE__ */ u.jsxs("div", { className: "woof-home__meal-row-actions", children: [
        /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "woof-home__meal-action woof-home__meal-action--favorite",
            onClick: o,
            "aria-label": r,
            title: r,
            children: /* @__PURE__ */ u.jsx("span", { className: "woof-home__meal-action-icon", "aria-hidden": "true", children: "♡" })
          }
        ),
        /* @__PURE__ */ u.jsx(
          "button",
          {
            type: "button",
            className: "woof-home__meal-action woof-home__meal-action--delete",
            onClick: i,
            "aria-label": a,
            title: a,
            children: /* @__PURE__ */ u.jsx("span", { className: "woof-home__meal-action-icon", "aria-hidden": "true", children: "×" })
          }
        )
      ] })
    ] })
  ] });
}
function S0({
  group: e,
  favoriteLabel: t,
  deleteLabel: n,
  onFavoriteMeal: r = ut,
  onDeleteMeal: a = ut
}) {
  const o = e.items || [], i = o.length > 0, l = e.metaText || e.emptyText;
  return /* @__PURE__ */ u.jsxs("div", { className: "woof-home__meal-group", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "woof-home__meal-group-header", children: [
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-type", children: e.label }),
        /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-group-meta", children: l })
      ] }),
      i ? /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-group-total", children: e.totalCalories > 0 ? `${Math.round(e.totalCalories)} kcal` : "--" }) : null
    ] }),
    i ? /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-list", children: o.map((s) => /* @__PURE__ */ u.jsx(
      v0,
      {
        name: s.name,
        calories: s.calories,
        portion: s.portion,
        favoriteLabel: t,
        deleteLabel: n,
        onFavorite: () => r(s.sourceIndex),
        onDelete: () => a(s.sourceIndex)
      },
      s.id
    )) }) : /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-group-empty", children: e.emptyText })
  ] });
}
function _0({
  control: e,
  changeLabel: t,
  previousLabel: n,
  nextLabel: r,
  onShiftDate: a,
  onSelectDate: o
}) {
  return e ? /* @__PURE__ */ u.jsxs("div", { className: "woof-home__date-nav", "aria-label": t, children: [
    /* @__PURE__ */ u.jsx(
      "button",
      {
        type: "button",
        className: "woof-home__date-nav-button",
        onClick: () => a(-1),
        "aria-label": n,
        children: "‹"
      }
    ),
    /* @__PURE__ */ u.jsxs("label", { className: "woof-home__date-pill", title: e.label, children: [
      /* @__PURE__ */ u.jsx("span", { children: e.label }),
      /* @__PURE__ */ u.jsx("span", { className: "woof-home__date-pill-caret", "aria-hidden": "true", children: "▾" }),
      /* @__PURE__ */ u.jsx(
        "input",
        {
          type: "date",
          className: "woof-home__date-input",
          value: e.value,
          max: e.max,
          "aria-label": t,
          onChange: (i) => o(i.target.value)
        }
      )
    ] }),
    /* @__PURE__ */ u.jsx(
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
function w0({ progress: e = 0, calories: t = "--", target: n = "--" }) {
  const a = 2 * Math.PI * 42, i = Math.max(0, Math.min(Number(e) || 0, 100)) / 100 * a;
  return /* @__PURE__ */ u.jsxs("div", { className: "woof-home__progress-ring", "aria-hidden": "true", children: [
    /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 120 120", className: "woof-home__progress-ring-svg", children: [
      /* @__PURE__ */ u.jsx("circle", { className: "woof-home__progress-ring-track", cx: "60", cy: "60", r: 42 }),
      /* @__PURE__ */ u.jsx(
        "circle",
        {
          className: "woof-home__progress-ring-fill",
          cx: "60",
          cy: "60",
          r: 42,
          strokeDasharray: `${i} ${a - i}`
        }
      )
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "woof-home__progress-ring-center", children: [
      /* @__PURE__ */ u.jsx("div", { className: "woof-home__progress-ring-calories", children: t }),
      /* @__PURE__ */ u.jsxs("div", { className: "woof-home__progress-ring-target", children: [
        "/ ",
        n
      ] })
    ] })
  ] });
}
function T0({ label: e, value: t = 0, target: n = 0, tone: r = "protein" }) {
  const a = Math.max(Number(n) || 0, 0), o = Math.max(Number(t) || 0, 0), i = a > 0 ? Math.min(o / a * 100, 100) : 0;
  return /* @__PURE__ */ u.jsxs("div", { className: "woof-home__macro-progress-row", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "woof-home__macro-progress-head", children: [
      /* @__PURE__ */ u.jsx("span", { className: "woof-home__macro-progress-label", children: e }),
      /* @__PURE__ */ u.jsx("span", { className: "woof-home__macro-progress-value", children: `${Rl(o)}g / ${Rl(a)}g` })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "woof-home__macro-progress-track", children: /* @__PURE__ */ u.jsx(
      "div",
      {
        className: `woof-home__macro-progress-fill woof-home__macro-progress-fill--${r}`,
        style: { width: `${i}%` }
      }
    ) })
  ] });
}
function k0({ label: e, value: t }) {
  return /* @__PURE__ */ u.jsxs("div", { className: "woof-home__motivation-stat", children: [
    /* @__PURE__ */ u.jsx("div", { className: "woof-home__motivation-stat-value", children: t }),
    /* @__PURE__ */ u.jsx("div", { className: "woof-home__motivation-stat-label", children: e })
  ] });
}
function x0({
  onQuickLog: e = ut,
  onSetSelectedDate: t = ut,
  onShiftDate: n = ut,
  onFavoriteMealItem: r = ut,
  onDeleteMealItem: a = ut,
  onOpenDailySummary: o = ut
}) {
  var k, N, A, E, V;
  const i = o0(), { copy: l, dashboard: s, hero: c, quickLog: m, todayMeals: p, today: d, companion: h, petStageCopy: v, resolveDialogText: _ } = i, L = p.groups || [], g = p.count > 0, f = d.targetCalories > 0 ? l.caloriesRemaining(d.remainingCalories) : "--", y = d.calorieProgressPercent >= 70 ? l.headlineComplete : d.calorieProgressPercent > 0 ? l.headlineProgress : l.headlineEmpty, S = [
    {
      key: "protein",
      label: (k = s.macros[0]) == null ? void 0 : k.label,
      value: d.proteinCurrent,
      target: d.proteinTarget,
      tone: "protein"
    },
    {
      key: "carbs",
      label: (N = s.macros[2]) == null ? void 0 : N.label,
      value: d.carbCurrent,
      target: d.carbTarget,
      tone: "carb"
    },
    {
      key: "fat",
      label: (A = s.macros[1]) == null ? void 0 : A.label,
      value: d.fatCurrent,
      target: d.fatTarget,
      tone: "fat"
    }
  ], b = d.plannedMeals > 0 ? `${d.loggedMeals}/${d.plannedMeals}` : String(d.loggedMeals), w = [
    { label: l.metrics.meals, value: b },
    { label: l.metrics.protein, value: `${Rl(d.proteinCurrent)}g` },
    { label: l.remainingLabel, value: f }
  ];
  return /* @__PURE__ */ u.jsxs("main", { className: "woof-home", "data-surface": "home", children: [
    /* @__PURE__ */ u.jsx("header", { className: "woof-home__today-header", children: /* @__PURE__ */ u.jsxs("div", { className: "woof-home__today-brand", children: [
      /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsxs("div", { children: [
        /* @__PURE__ */ u.jsx("div", { className: "woof-home__today-kicker", children: l.appName }),
        /* @__PURE__ */ u.jsx("h1", { className: "woof-home__today-title", children: l.screenTitle }),
        /* @__PURE__ */ u.jsx("p", { className: "woof-home__today-date", children: ((E = p.dateControl) == null ? void 0 : E.label) || l.today })
      ] })
    ] }) }),
    /* @__PURE__ */ u.jsx(
      y0,
      {
        pet: h.pet,
        copy: v || {},
        resolveDialogText: _,
        onQuickLog: e
      }
    ),
    /* @__PURE__ */ u.jsx("section", { className: "woof-home__motivation-banner", "aria-label": l.pet, children: /* @__PURE__ */ u.jsxs("div", { className: "woof-home__motivation-copy", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "woof-home__motivation-badge", children: [
        /* @__PURE__ */ u.jsx("span", { className: "woof-home__motivation-badge-icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(l0, {}) }),
        /* @__PURE__ */ u.jsx("span", { children: c.eyebrow || l.pet })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "woof-home__motivation-title", children: y }),
      /* @__PURE__ */ u.jsx("p", { className: "woof-home__motivation-summary", children: ((V = h.pet) == null ? void 0 : V.resolvedMessage) || c.summary }),
      /* @__PURE__ */ u.jsx("div", { className: "woof-home__motivation-stats", children: w.map(($) => /* @__PURE__ */ u.jsx(k0, { label: $.label, value: $.value }, $.label)) }),
      /* @__PURE__ */ u.jsxs("div", { className: "woof-home__motivation-footer", children: [
        /* @__PURE__ */ u.jsx("div", { className: "woof-home__motivation-next", children: d.nextMealType || m.title || l.quickLog }),
        /* @__PURE__ */ u.jsx(
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
    /* @__PURE__ */ u.jsxs("button", { type: "button", className: "woof-home__dashboard-card", onClick: o, children: [
      /* @__PURE__ */ u.jsxs("div", { className: "woof-home__dashboard-head", children: [
        /* @__PURE__ */ u.jsx("span", { className: "woof-home__section-icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(i0, {}) }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-home__dashboard-head-title", children: l.dailyCaloriesTitle }),
        /* @__PURE__ */ u.jsx("span", { className: "woof-home__dashboard-head-progress", children: `${d.calorieProgressPercent}%` })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "woof-home__dashboard-layout", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "woof-home__dashboard-ring-col", children: [
          /* @__PURE__ */ u.jsx(
            w0,
            {
              progress: d.calorieProgressPercent,
              calories: Math.round(s.caloriesValue || 0),
              target: Math.round(d.targetCalories || 0)
            }
          ),
          /* @__PURE__ */ u.jsxs("div", { className: "woof-home__dashboard-ring-meta", children: [
            /* @__PURE__ */ u.jsx("div", { className: "woof-home__dashboard-ring-label", children: l.remainingLabel }),
            /* @__PURE__ */ u.jsx("div", { className: "woof-home__dashboard-ring-value", children: f })
          ] })
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "woof-home__dashboard-macro-col", children: S.map(($) => /* @__PURE__ */ u.jsx(
          T0,
          {
            label: $.label,
            value: $.value,
            target: $.target,
            tone: $.tone
          },
          $.key
        )) })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "woof-home__today", "aria-label": p.title, children: [
      /* @__PURE__ */ u.jsxs("div", { className: "woof-home__diary-header", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "woof-home__diary-title-group", children: [
          /* @__PURE__ */ u.jsx("span", { className: "woof-home__section-icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(Ym, {}) }),
          /* @__PURE__ */ u.jsx("h2", { className: "woof-home__section-title", children: p.title })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "woof-home__diary-controls", children: [
          /* @__PURE__ */ u.jsx(
            _0,
            {
              control: p.dateControl,
              changeLabel: l.changeDate,
              previousLabel: l.previousDate,
              nextLabel: l.nextDate,
              onShiftDate: n,
              onSelectDate: t
            }
          ),
          /* @__PURE__ */ u.jsx(
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
      g ? /* @__PURE__ */ u.jsx("div", { className: "woof-home__meal-group-list", children: L.map(($) => /* @__PURE__ */ u.jsx(
        S0,
        {
          group: $,
          favoriteLabel: l.favoriteActionLabel,
          deleteLabel: l.deleteActionLabel,
          onFavoriteMeal: r,
          onDeleteMeal: a
        },
        $.key
      )) }) : /* @__PURE__ */ u.jsxs("div", { className: "woof-home__empty-state woof-home__today-empty", children: [
        /* @__PURE__ */ u.jsx("div", { className: "woof-home__empty-title", children: l.companion }),
        /* @__PURE__ */ u.jsx("p", { className: "woof-home__empty-copy", children: p.hint || m.summary })
      ] })
    ] })
  ] });
}
function yt() {
}
function b0({
  onQuickLog: e = yt,
  onOpenAI: t = yt,
  onOpenFavorites: n = yt,
  onSetSelectedDate: r = yt,
  onShiftDate: a = yt,
  onFavoriteMealItem: o = yt,
  onDeleteMealItem: i = yt,
  onOpenRhythm: l = yt,
  onOpenDailySummary: s = yt
}) {
  return /* @__PURE__ */ u.jsx(
    x0,
    {
      onQuickLog: e,
      onOpenAI: t,
      onOpenFavorites: n,
      onSetSelectedDate: r,
      onShiftDate: a,
      onFavoriteMealItem: o,
      onDeleteMealItem: i,
      onOpenRhythm: l,
      onOpenDailySummary: s
    }
  );
}
const N0 = Object.freeze(["photo", "text", "manual"]), C0 = Object.freeze(["breakfast", "lunch", "dinner", "snack"]), qm = "photo", Xm = "breakfast", M0 = Object.freeze({
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
    return qm;
  },
  getAddMealType() {
    return Xm;
  }
}), Fi = Object.freeze({
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
function E0(e, t) {
  const n = (a) => {
    var i;
    const o = (i = a == null ? void 0 : a.detail) == null ? void 0 : i.mode;
    typeof o == "string" && e(o);
  }, r = (a) => {
    var i;
    const o = (i = a == null ? void 0 : a.detail) == null ? void 0 : i.mealType;
    typeof o == "string" && t(o);
  };
  return window.addEventListener("woof:add-mode-change", n), window.addEventListener("woof:add-meal-type-change", r), () => {
    window.removeEventListener("woof:add-mode-change", n), window.removeEventListener("woof:add-meal-type-change", r);
  };
}
function Wn() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofAddBridge) || M0;
}
function A0() {
  var t, n;
  const e = (n = (t = Wn()).getAddMode) == null ? void 0 : n.call(t);
  return N0.includes(e) ? e : qm;
}
function I0() {
  var t, n;
  const e = (n = (t = Wn()).getAddMealType) == null ? void 0 : n.call(t);
  return C0.includes(e) ? e : Xm;
}
function L0(e = "en") {
  return Fi[e] || Fi[String(e || "en").split("-")[0]] || Fi.en;
}
function Zm() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M4 8.5h3l1.5-2h7L17 8.5h3A1.5 1.5 0 0 1 21.5 10v8A1.5 1.5 0 0 1 20 19.5H4A1.5 1.5 0 0 1 2.5 18v-8A1.5 1.5 0 0 1 4 8.5Z" }),
    /* @__PURE__ */ u.jsx("circle", { cx: "12", cy: "13.2", r: "3.5" })
  ] });
}
function j0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M5 6.5h14" }),
    /* @__PURE__ */ u.jsx("path", { d: "M9 6.5v11" }),
    /* @__PURE__ */ u.jsx("path", { d: "M15 6.5v11" }),
    /* @__PURE__ */ u.jsx("path", { d: "M7 17.5h10" })
  ] });
}
function P0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.9", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M4 20l3.6-.7L18 8.9l-2.9-2.9L4.7 16.4 4 20Z" }),
    /* @__PURE__ */ u.jsx("path", { d: "m13.8 7.3 2.9 2.9" })
  ] });
}
function D0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M5 16a7 7 0 0 1 14 0" }),
    /* @__PURE__ */ u.jsx("path", { d: "M3 16h18" }),
    /* @__PURE__ */ u.jsx("path", { d: "M12 5.5v3" }),
    /* @__PURE__ */ u.jsx("path", { d: "M6.5 8.5 8 10" }),
    /* @__PURE__ */ u.jsx("path", { d: "m17.5 8.5-1.5 1.5" })
  ] });
}
function z0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M4 12.5h16a7 7 0 0 1-16 0Z" }),
    /* @__PURE__ */ u.jsx("path", { d: "M7 17.5h10" }),
    /* @__PURE__ */ u.jsx("path", { d: "M9 6.5c0 1 .6 1.6 1.6 1.6S12.2 7.5 12.2 6.5" }),
    /* @__PURE__ */ u.jsx("path", { d: "M13.3 5.7c0 1 .6 1.6 1.6 1.6s1.6-.6 1.6-1.6" })
  ] });
}
function F0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M6 15.5a6 6 0 1 0 8-8 5.5 5.5 0 1 1-8 8Z" }),
    /* @__PURE__ */ u.jsx("path", { d: "M15.5 17.5H20" }),
    /* @__PURE__ */ u.jsx("path", { d: "M18 15v5" })
  ] });
}
function O0() {
  return /* @__PURE__ */ u.jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round", children: [
    /* @__PURE__ */ u.jsx("path", { d: "M12 4.5c2.8 0 5 2.2 5 5 0 5-5 9-5 9s-5-4-5-9c0-2.8 2.2-5 5-5Z" }),
    /* @__PURE__ */ u.jsx("path", { d: "M12 8.3v2.8" }),
    /* @__PURE__ */ u.jsx("path", { d: "M10.6 9.7h2.8" })
  ] });
}
function R0({ mode: e }) {
  return e === "photo" ? /* @__PURE__ */ u.jsx(Zm, {}) : e === "text" ? /* @__PURE__ */ u.jsx(j0, {}) : /* @__PURE__ */ u.jsx(P0, {});
}
function $0({ mealType: e }) {
  return e === "breakfast" ? /* @__PURE__ */ u.jsx(D0, {}) : e === "lunch" ? /* @__PURE__ */ u.jsx(z0, {}) : e === "dinner" ? /* @__PURE__ */ u.jsx(F0, {}) : /* @__PURE__ */ u.jsx(O0, {});
}
function H0({ copy: e, t, onAnalyze: n }) {
  return /* @__PURE__ */ u.jsxs("div", { id: "add-analysis-actions", className: "add-shell-card add-shell-card--analysis", children: [
    /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: e.analysisTitle }),
    /* @__PURE__ */ u.jsx("div", { id: "turnstile-widget", "aria-hidden": "true" }),
    /* @__PURE__ */ u.jsx("div", { id: "turnstile-status-note", className: "ai-status-note", hidden: !0 }),
    /* @__PURE__ */ u.jsx("button", { id: "analyze-btn", className: "btn-analyze", type: "button", onClick: n, children: /* @__PURE__ */ u.jsx("span", { id: "txt-analyze-btn", children: t.btnAnalyze || "Analyze meal" }) }),
    /* @__PURE__ */ u.jsx("div", { className: "loading-spinner", id: "ai-loading", children: /* @__PURE__ */ u.jsx("span", { id: "txt-ai-loading", children: t.aiLoading || "AI is analyzing the meal..." }) })
  ] });
}
function W0() {
  const e = mr(), t = tt(e.curLang), n = L0(e.curLang), r = t.meals || {}, a = Wn(), [o, i] = ge.useState(A0), [l, s] = ge.useState(I0), c = ge.useRef(null), m = [
    { id: "photo", label: n.modes.photo },
    { id: "text", label: n.modes.text },
    { id: "manual", label: n.modes.manual }
  ], p = [
    { id: "breakfast", label: r.breakfast || "Breakfast" },
    { id: "lunch", label: r.lunch || "Lunch" },
    { id: "dinner", label: r.dinner || "Dinner" },
    { id: "snack", label: r.snack || "Snack" }
  ], d = o === "photo" || o === "text";
  return ge.useEffect(() => E0(i, s), []), ge.useEffect(() => {
    var v, _, L;
    const h = Wn();
    (v = h.updateMealUI) == null || v.call(h), (_ = h.setAddMealType) == null || _.call(h, l), (L = h.setAddMode) == null || L.call(h, o);
  }, [l, o, e.curLang, e.currentMealMode, e.targetCalories]), /* @__PURE__ */ u.jsxs("div", { "data-add-react-surface": "true", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "surface-heading", children: [
      /* @__PURE__ */ u.jsx("div", { className: "surface-heading__eyebrow", children: n.eyebrow }),
      /* @__PURE__ */ u.jsx("h1", { className: "surface-heading__title", children: n.title }),
      /* @__PURE__ */ u.jsx("p", { className: "surface-heading__copy", children: n.summary })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "add-shell-card", children: /* @__PURE__ */ u.jsx("div", { className: "add-mode-switch", role: "tablist", "aria-label": n.modeLabel, children: m.map((h) => /* @__PURE__ */ u.jsxs(
      "button",
      {
        type: "button",
        className: `add-mode-pill${o === h.id ? " is-active" : ""}`,
        "data-add-mode": h.id,
        "aria-pressed": String(o === h.id),
        onClick: () => {
          var v, _;
          i(h.id), (_ = (v = Wn()).setAddMode) == null || _.call(v, h.id);
        },
        children: [
          /* @__PURE__ */ u.jsx("span", { className: "add-mode-pill__icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(R0, { mode: h.id }) }),
          /* @__PURE__ */ u.jsx("span", { children: h.label })
        ]
      },
      h.id
    )) }) }),
    /* @__PURE__ */ u.jsxs("div", { className: "add-shell-card", children: [
      /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: n.mealTypeTitle }),
      /* @__PURE__ */ u.jsx("div", { className: "add-meal-type-grid", children: p.map((h) => /* @__PURE__ */ u.jsxs(
        "button",
        {
          type: "button",
          className: `add-meal-type-chip${l === h.id ? " is-active" : ""}`,
          "data-add-meal-type": h.id,
          "aria-pressed": String(l === h.id),
          onClick: () => {
            var v, _;
            s(h.id), (_ = (v = Wn()).setAddMealType) == null || _.call(v, h.id);
          },
          children: [
            /* @__PURE__ */ u.jsx("span", { className: "add-meal-type-chip__icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx($0, { mealType: h.id }) }),
            /* @__PURE__ */ u.jsx("span", { children: h.label })
          ]
        },
        h.id
      )) })
    ] }),
    o === "photo" ? /* @__PURE__ */ u.jsx("section", { id: "add-panel-photo", className: "add-panel-surface", children: /* @__PURE__ */ u.jsxs("div", { className: "add-panel-card add-panel-card--upload", children: [
      /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: n.photoTitle }),
      /* @__PURE__ */ u.jsxs("div", { className: "add-upload-dropzone", children: [
        /* @__PURE__ */ u.jsx("div", { className: "add-upload-dropzone__icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(Zm, {}) }),
        /* @__PURE__ */ u.jsx("div", { className: "add-upload-dropzone__title", children: n.photoDropzoneTitle }),
        /* @__PURE__ */ u.jsx("div", { className: "add-upload-dropzone__copy", children: n.photoDropzoneCopy }),
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "file",
            id: "image-upload",
            accept: "image/*",
            ref: c,
            onChange: (h) => a.handleFileSelect(h.currentTarget),
            style: { display: "none" }
          }
        ),
        /* @__PURE__ */ u.jsx(
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
      /* @__PURE__ */ u.jsx("img", { id: "image-preview", className: "add-upload-preview", alt: "" }),
      /* @__PURE__ */ u.jsxs("div", { id: "ai-desc-group", className: "add-description-group", children: [
        /* @__PURE__ */ u.jsx("label", { htmlFor: "ai-desc", children: n.photoNotesLabel }),
        /* @__PURE__ */ u.jsx(
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
    o === "text" ? /* @__PURE__ */ u.jsx("section", { id: "add-panel-text", className: "add-panel-surface", children: /* @__PURE__ */ u.jsxs("div", { className: "add-panel-card", children: [
      /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: n.textTitle }),
      /* @__PURE__ */ u.jsxs("div", { id: "ai-text-only-group", className: "add-text-group", children: [
        /* @__PURE__ */ u.jsx("label", { id: "txt-text-ai-label", htmlFor: "ai-text-desc", children: n.textLabel }),
        /* @__PURE__ */ u.jsx(
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
    d ? /* @__PURE__ */ u.jsx(
      H0,
      {
        copy: n,
        t,
        onAnalyze: () => a.startAnalysis()
      }
    ) : null,
    o === "manual" ? /* @__PURE__ */ u.jsx("section", { id: "add-panel-manual", className: "add-panel-surface", children: /* @__PURE__ */ u.jsxs("div", { className: "add-panel-card", children: [
      /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: n.manualTitle }),
      /* @__PURE__ */ u.jsx("p", { className: "add-manual-copy", children: n.manualCopy }),
      /* @__PURE__ */ u.jsxs("div", { className: "home-log-form home-log-form--inline", children: [
        /* @__PURE__ */ u.jsx("label", { htmlFor: "manual-name", children: n.manualDetailsLabel }),
        /* @__PURE__ */ u.jsxs("div", { className: "manual-grid", children: [
          /* @__PURE__ */ u.jsx("input", { type: "text", id: "manual-name", placeholder: n.manualNamePlaceholder }),
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-cal", placeholder: n.manualCaloriesPlaceholder })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "small-input-group", children: [
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-pro", placeholder: t.phPro || "Protein" }),
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-fat", placeholder: t.phFat || "Fat" }),
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-carb", placeholder: t.phCarb || "Carbs" }),
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-sugar", placeholder: t.phSugar || "Sugar" })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "small-input-group", children: [
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-sod", placeholder: t.phSod || "Sodium" }),
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-sat", placeholder: t.phSat || "Sat. fat" }),
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-trans", placeholder: t.phTrans || "Trans fat" }),
          /* @__PURE__ */ u.jsx("input", { type: "number", id: "manual-fiber", placeholder: t.phFiber || t.fiber || "Fiber" })
        ] }),
        /* @__PURE__ */ u.jsx("select", { id: "manual-type", className: "manual-type-select", "aria-label": n.manualTypeLabel }),
        /* @__PURE__ */ u.jsxs("div", { className: "add-manual-actions", children: [
          /* @__PURE__ */ u.jsx("button", { id: "btn-add-record", type: "button", onClick: () => a.addManualFood(), children: n.addRecord }),
          /* @__PURE__ */ u.jsx(
            "button",
            {
              className: "btn-fav-save",
              id: "btn-fav-save-main",
              type: "button",
              onClick: () => a.saveToFavorites(),
              children: n.saveFavorite
            }
          ),
          /* @__PURE__ */ u.jsx(
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
function nu(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = nu(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
const ru = {
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
}, B0 = nu(ru, {
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
}), U0 = nu(ru, {
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
}), Oi = {
  en: ru,
  "zh-TW": B0,
  "zh-CN": U0
};
function V0(e = "en") {
  return Oi[e] || Oi[String(e || "en").split("-")[0]] || Oi.en;
}
const qc = Object.freeze(["breakfast", "lunch", "dinner", "snack"]), K0 = Object.freeze({
  breakfast: "☕",
  lunch: "🥗",
  dinner: "🍕",
  snack: "🍎"
});
function Ri(e) {
  return `${Math.round(Number(e) || 0)}`;
}
function bn(e) {
  const t = Math.round((Number(e) || 0) * 10) / 10;
  return Number.isInteger(t) ? String(t) : t.toFixed(1);
}
function G0(e, t) {
  return e >= 90 ? t.statusGreat : e >= 60 ? t.statusOnTrack : e > 0 ? t.statusKeepGoing : t.statusStart;
}
function Q0(e, t) {
  var n;
  return ((n = t == null ? void 0 : t.meals) == null ? void 0 : n[e]) || e;
}
function Y0(e = [], t = "Untitled meal") {
  return e.map((n, r) => {
    var a, o, i, l, s, c, m;
    return {
      id: `${String((n == null ? void 0 : n.type) || "snack")}-${r}`,
      index: r,
      type: String((n == null ? void 0 : n.type) || "snack"),
      name: String((n == null ? void 0 : n.name) || "").trim() || t,
      calories: Number(((a = n == null ? void 0 : n.nutri) == null ? void 0 : a.calories) ?? ((o = n == null ? void 0 : n.nutri) == null ? void 0 : o.cal) ?? 0) || 0,
      protein: Number(((i = n == null ? void 0 : n.nutri) == null ? void 0 : i.protein) ?? ((l = n == null ? void 0 : n.nutri) == null ? void 0 : l.pro) ?? 0) || 0,
      carb: Number(((s = n == null ? void 0 : n.nutri) == null ? void 0 : s.carbohydrate) ?? ((c = n == null ? void 0 : n.nutri) == null ? void 0 : c.carb) ?? 0) || 0,
      fat: Number(((m = n == null ? void 0 : n.nutri) == null ? void 0 : m.fat) ?? 0) || 0
    };
  }).sort((n, r) => qc.indexOf(n.type) - qc.indexOf(r.type) || n.index - r.index);
}
function q0() {
  const e = mr(), t = Jo(e), n = tt(e.curLang), r = V0(e.curLang), a = Number(t.totals.cal) || 0, o = Number(t.targetCalories) || 0, i = o > 0 ? Math.min(Math.round(a / o * 100), 100) : 0, l = Y0(e.foodItems, r.untitledMeal);
  return /* @__PURE__ */ u.jsxs("div", { "data-history-react-surface": "true", children: [
    /* @__PURE__ */ u.jsxs("section", { className: "history-summary-card", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "history-summary-card__copy", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "section-kicker-row", children: [
          /* @__PURE__ */ u.jsx("span", { className: "section-kicker-icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(Ym, {}) }),
          /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: r.dailySummary })
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "history-summary-card__total", children: `${Ri(a)} cal` }),
        /* @__PURE__ */ u.jsx("div", { className: "history-summary-card__target", children: o > 0 ? r.ofTarget(Ri(o)) : r.setGoal }),
        /* @__PURE__ */ u.jsx("div", { className: "history-summary-card__status", children: G0(i, r) }),
        /* @__PURE__ */ u.jsxs("div", { className: "history-summary-card__macro-row", children: [
          /* @__PURE__ */ u.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ u.jsx("span", { className: "history-summary-card__macro-label", children: r.protein }),
            /* @__PURE__ */ u.jsx("span", { children: `${bn(t.totals.pro)}g` })
          ] }),
          /* @__PURE__ */ u.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ u.jsx("span", { className: "history-summary-card__macro-label", children: r.carbs }),
            /* @__PURE__ */ u.jsx("span", { children: `${bn(t.totals.carb)}g` })
          ] }),
          /* @__PURE__ */ u.jsxs("div", { className: "history-summary-card__macro", children: [
            /* @__PURE__ */ u.jsx("span", { className: "history-summary-card__macro-label", children: r.fats }),
            /* @__PURE__ */ u.jsx("span", { children: `${bn(t.totals.fat)}g` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "history-summary-ring", style: { "--history-progress": `${i}%` }, children: /* @__PURE__ */ u.jsx("div", { className: "history-summary-ring__inner", children: /* @__PURE__ */ u.jsx("span", { children: `${i}%` }) }) })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "history-entry-list", children: l.length > 0 ? l.map((s) => /* @__PURE__ */ u.jsxs("article", { className: "history-log-card", children: [
      /* @__PURE__ */ u.jsx("div", { className: `history-log-card__icon history-log-card__icon--${s.type}`, children: K0[s.type] || "🍽" }),
      /* @__PURE__ */ u.jsxs("div", { className: "history-log-card__body", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "history-log-card__head", children: [
          /* @__PURE__ */ u.jsx("div", { className: "history-log-card__title", children: s.name }),
          /* @__PURE__ */ u.jsx("div", { className: "history-log-card__calories", children: `${Ri(s.calories)} cal` })
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "history-log-card__meta", children: Q0(s.type, n) }),
        /* @__PURE__ */ u.jsxs("div", { className: "history-log-card__stats", children: [
          /* @__PURE__ */ u.jsx("span", { className: "history-log-card__stat history-log-card__stat--protein", children: `${bn(s.protein)}g ${r.proteinSuffix}` }),
          /* @__PURE__ */ u.jsx("span", { className: "history-log-card__stat history-log-card__stat--carb", children: `${bn(s.carb)}g ${r.carbsSuffix}` }),
          /* @__PURE__ */ u.jsx("span", { className: "history-log-card__stat history-log-card__stat--fat", children: `${bn(s.fat)}g ${r.fatSuffix}` })
        ] })
      ] })
    ] }, s.id)) : /* @__PURE__ */ u.jsxs("div", { className: "history-empty-state", children: [
      /* @__PURE__ */ u.jsx("div", { className: "history-empty-state__title", children: r.emptyTitle }),
      /* @__PURE__ */ u.jsx("p", { className: "history-empty-state__copy", children: r.emptyCopy })
    ] }) })
  ] });
}
function au(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = au(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
const ou = {
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
}, X0 = au(ou, {
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
}), Z0 = au(ou, {
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
}), $i = {
  en: ou,
  "zh-TW": X0,
  "zh-CN": Z0
};
function J0(e = "en") {
  return $i[e] || $i[String(e || "en").split("-")[0]] || $i.en;
}
function e1(e) {
  const t = Number(e) || 0;
  return t > 0 ? `${Math.round(t)} kcal` : "--";
}
const t1 = ["goal", "target", "mealMode", "frequency"];
function n1() {
  const e = mr(), t = J0(e.curLang), n = e.profile || {}, r = {
    goal: t.goalLabel,
    target: t.targetLabel,
    mealMode: t.mealModeLabel,
    frequency: t.diningOutLabel
  }, a = String(e.currentGoalType || n.goalType || "lose"), o = String(n.mealMode || "4"), i = String(n.diningOutFrequency || "").trim(), l = {
    goal: t.goalTypes[a] || t.goalTypes.lose,
    target: e1(e.targetCalories),
    mealMode: t.mealModes[o] || t.mealModes[4],
    frequency: t.diningFreqs[i] || "--"
  };
  return /* @__PURE__ */ u.jsxs("section", { className: "profile-hero-card", "data-profile-react-surface": "true", children: [
    /* @__PURE__ */ u.jsx("div", { className: "profile-hero-card__icon-shell", children: /* @__PURE__ */ u.jsx(
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
    /* @__PURE__ */ u.jsxs("div", { className: "profile-hero-card__copy", children: [
      /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: t.kicker }),
      /* @__PURE__ */ u.jsxs("div", { className: "profile-hero-card__title-row", children: [
        /* @__PURE__ */ u.jsx("span", { className: "profile-hero-card__icon-badge", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(u0, {}) }),
        /* @__PURE__ */ u.jsx("h1", { className: "profile-hero-card__title", children: t.title })
      ] }),
      /* @__PURE__ */ u.jsx("p", { className: "profile-hero-card__summary", children: t.summary })
    ] }),
    /* @__PURE__ */ u.jsx("div", { className: "profile-hero-card__grid", children: t1.map((s) => /* @__PURE__ */ u.jsxs("div", { className: "profile-hero-card__metric", children: [
      /* @__PURE__ */ u.jsx("span", { className: "profile-hero-card__metric-label", children: r[s] }),
      /* @__PURE__ */ u.jsx("strong", { children: l[s] })
    ] }, s)) })
  ] });
}
function iu(e, t) {
  const n = { ...e };
  return Object.entries(t || {}).forEach(([r, a]) => {
    if (a && typeof a == "object" && !Array.isArray(a) && typeof e[r] == "object" && e[r] !== null) {
      n[r] = iu(e[r], a);
      return;
    }
    n[r] = a;
  }), n;
}
const lu = {
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
}, r1 = iu(lu, {
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
}), a1 = iu(lu, {
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
}), Hi = {
  en: lu,
  "zh-TW": r1,
  "zh-CN": a1
};
function o1(e = "en") {
  return Hi[e] || Hi[String(e || "en").split("-")[0]] || Hi.en;
}
function ei() {
  return tt(F().curLang);
}
function $l(e, t = "info") {
  let n = document.querySelector(".toast-container");
  n || (n = document.createElement("div"), n.className = "toast-container", document.body.appendChild(n));
  const r = document.createElement("div");
  r.className = `toast ${t}`, r.innerText = e, n.appendChild(r), setTimeout(() => r.classList.add("show"), 10), setTimeout(() => {
    r.classList.remove("show"), setTimeout(() => r.remove(), 300);
  }, 3e3);
}
function oa(e, t, n) {
  return Math.max(t, Math.min(n, e));
}
function i1(e) {
  const t = e.canvas, n = globalThis.devicePixelRatio || 1, r = Math.max(t.clientWidth || t.width || 320, 180), a = Math.max(t.clientHeight || t.height || 200, 140);
  return t.style.width = `${r}px`, t.style.height = `${a}px`, t.style.display = "block", t.width = Math.round(r * n), t.height = Math.round(a * n), e.setTransform(1, 0, 0, 1, 0, 0), e.clearRect(0, 0, t.width, t.height), e.scale(n, n), { width: r, height: a };
}
function qa(e, t) {
  return globalThis.document && getComputedStyle(document.documentElement).getPropertyValue(e).trim() || t;
}
function ti(e, t = "#7a6fe0") {
  var a;
  const n = String(e || "").trim();
  if (!n) return t;
  if (!n.startsWith("var(")) return n;
  const r = (a = n.match(/var\((--[^),\s]+)/)) == null ? void 0 : a[1];
  return r ? qa(r, t) : t;
}
function Xe(e, t = 1) {
  const n = ti(e), r = oa(t, 0, 1);
  if (n.startsWith("#")) {
    const a = n.slice(1), o = a.length === 3 ? 1 : 2, i = (m) => o === 1 ? `${m}${m}` : m, [l, s, c] = [0, 1, 2].map((m) => parseInt(i(a.slice(m * o, m * o + o)), 16));
    return `rgba(${l}, ${s}, ${c}, ${r})`;
  }
  return n.startsWith("rgba(") ? n.replace(/rgba\(([^)]+),\s*[\d.]+\)/, `rgba($1, ${r})`) : n.startsWith("rgb(") ? n.replace("rgb(", "rgba(").replace(")", `, ${r})`) : n;
}
function su() {
  const e = qa("--text-color", "#1f2140"), t = qa("--text-secondary", "#707294"), n = qa("--card-bg", "#ffffff");
  return {
    text: e,
    muted: t,
    grid: Xe(e, 0.08),
    gridStrong: Xe(e, 0.14),
    track: Xe(e, 0.1),
    card: n,
    white: "#ffffff"
  };
}
function ft(e) {
  typeof e.save == "function" && e.save();
}
function mt(e) {
  typeof e.restore == "function" && e.restore();
}
function Jm(e, {
  x0: t,
  y0: n,
  x1: r,
  y1: a,
  stops: o,
  fallback: i
}) {
  if (typeof e.createLinearGradient != "function")
    return i;
  const l = e.createLinearGradient(t, n, r, a);
  return o.forEach(([s, c]) => {
    l.addColorStop(s, c);
  }), l;
}
function Wi(e, t, n, r, a, o) {
  const i = Math.min(o, r / 2, a / 2);
  if (typeof e.roundRect == "function") {
    e.beginPath(), e.roundRect(t, n, r, a, i), e.closePath();
    return;
  }
  e.beginPath(), e.moveTo(t + i, n), e.lineTo(t + r - i, n), e.quadraticCurveTo(t + r, n, t + r, n + i), e.lineTo(t + r, n + a - i), e.quadraticCurveTo(t + r, n + a, t + r - i, n + a), e.lineTo(t + i, n + a), e.quadraticCurveTo(t, n + a, t, n + a - i), e.lineTo(t, n + i), e.quadraticCurveTo(t, n, t + i, n), e.closePath();
}
function ep(e, { left: t, right: n, top: r, bottom: a, steps: o = 4, theme: i }) {
  ft(e), e.strokeStyle = i.grid, e.lineWidth = 1;
  for (let l = 0; l <= o; l += 1) {
    const s = r + (a - r) / o * l;
    e.beginPath(), e.moveTo(t, s), e.lineTo(n, s), e.stroke();
  }
  mt(e);
}
function tp(e, t, n, r, a) {
  if (!t.length || !n.length) return;
  const o = t.length > 14 ? Math.ceil(t.length / 6) : 1;
  ft(e), e.fillStyle = a.muted, e.font = '11px "Segoe UI", sans-serif', e.textAlign = "center", e.textBaseline = "top", t.forEach((i, l) => {
    n[l] && (l % o !== 0 && l !== t.length - 1 || e.fillText(String(i || ""), n[l].x, r));
  }), mt(e);
}
function Xc(e, t) {
  if (t.length !== 0) {
    e.beginPath(), e.moveTo(t[0].x, t[0].y);
    for (let n = 0; n < t.length - 1; n += 1) {
      const r = t[n - 1] || t[n], a = t[n], o = t[n + 1], i = t[n + 2] || o, l = a.x + (o.x - r.x) / 6, s = oa(
        a.y + (o.y - r.y) / 6,
        Math.min(a.y, o.y),
        Math.max(a.y, o.y)
      ), c = o.x - (i.x - a.x) / 6, m = oa(
        o.y - (i.y - a.y) / 6,
        Math.min(a.y, o.y),
        Math.max(a.y, o.y)
      );
      e.bezierCurveTo(l, s, c, m, o.x, o.y);
    }
  }
}
function l1(e, t, n, r, a = {}) {
  const o = Array.isArray(t == null ? void 0 : t.labels) ? t.labels : [], i = Array.isArray(t == null ? void 0 : t.items) ? t.items : [], l = Array.isArray(n) && n.length ? n : [];
  if (!o.length || !l.length) return { type: "bar-group", items: [] };
  const s = su(), c = l.map((A) => Array.isArray(A == null ? void 0 : A.data) ? A.data.map((E) => Math.max(Number(E) || 0, 0)) : []), m = o.map((A, E) => l.reduce((V, $, Oe) => V + ((c[Oe] || [])[E] || 0), 0)), p = Math.max(...m, 1), d = 18, h = r.width - 18, v = 18, _ = r.height - 30, L = _ - v, g = o.length >= 45 ? 1 : o.length >= 21 ? 2 : o.length >= 11 ? 6 : 10, y = (Math.max(h - d, 24) - g * Math.max(o.length - 1, 0)) / Math.max(o.length, 1), S = Math.max(y, 1), b = Number.isInteger(a == null ? void 0 : a.hoverIndex) ? a.hoverIndex : -1, w = Number.isInteger(a == null ? void 0 : a.selectedIndex) ? a.selectedIndex : -1, k = [];
  ep(e, { left: d, right: h, top: v, bottom: _, steps: 4, theme: s }), o.forEach((A, E) => {
    const V = d + E * (S + g), $ = E === b ? 0.12 : E === w ? 0.08 : 0;
    $ > 0 && (e.fillStyle = Xe("var(--primary-color)", $), Wi(e, V - 4, v - 2, S + 8, L + 8, 16), e.fill());
    const Oe = l.reduce((Re, C, j) => {
      const P = c[j] || [];
      return Re + (P[E] || 0);
    }, 0), Et = V, gt = Math.max(S, 1);
    let nt = _;
    Oe <= 0 ? (e.fillStyle = Xe("var(--primary-color)", 0.12), Wi(e, Et, _ - 4, gt, 4, Math.min(12, gt / 2)), e.fill()) : l.forEach((Re, C) => {
      const P = (c[C] || [])[E] || 0;
      if (P <= 0) return;
      const H = ti(Re == null ? void 0 : Re.backgroundColor, "#7a6fe0"), K = Math.max(P / p * L, 3), Ke = nt - K;
      e.fillStyle = Jm(e, {
        x0: 0,
        y0: Ke,
        x1: 0,
        y1: nt,
        stops: [
          [0, Xe(H, 0.96)],
          [1, Xe(H, 0.38)]
        ],
        fallback: H
      }), Wi(e, Et, Ke, gt, K, Math.min(12, gt / 2)), e.fill(), nt = Ke;
    }), k.push({
      index: E,
      x: V,
      y: v,
      width: S,
      height: L,
      label: A,
      payload: i[E] || null
    });
  });
  const N = k.map((A) => ({
    x: A.x + A.width / 2
  }));
  return tp(e, o, N, r.height - 22, s), { type: "bar-group", items: k };
}
function s1(e, t, n, r, a = {}) {
  const o = Array.isArray(n == null ? void 0 : n.data) ? n.data.map((A) => Number(A) || 0) : [], i = Array.isArray(t == null ? void 0 : t.labels) ? t.labels : [], l = Array.isArray(t == null ? void 0 : t.items) ? t.items : [];
  if (!o.length) return { type: "line-point", items: [] };
  const s = su(), c = Math.max(...o, 1), m = Math.min(...o, 0), p = Math.max(c - m, 1), d = 18, h = r.width - 18, v = 18, _ = r.height - 30, L = Math.max(h - d, 1), g = Math.max(_ - v, 1), f = o.length > 1 ? L / (o.length - 1) : 0, y = ti(n == null ? void 0 : n.borderColor, "#7a6fe0"), S = (n == null ? void 0 : n.backgroundColor) || Xe(y, 0.16), b = Number.isInteger(a == null ? void 0 : a.hoverIndex) ? a.hoverIndex : -1, w = o.map((A, E) => ({
    index: E,
    x: d + f * E,
    y: _ - (A - m) / p * g,
    label: i[E],
    value: A,
    payload: l[E] || null
  }));
  if (ep(e, { left: d, right: h, top: v, bottom: _, steps: 4, theme: s }), n != null && n.fill && w.length > 1 && (ft(e), e.fillStyle = Jm(e, {
    x0: 0,
    y0: v,
    x1: 0,
    y1: _,
    stops: [
      [0, Xe(S, 0.3)],
      [1, Xe(S, 0.02)]
    ],
    fallback: Xe(S, 0.18)
  }), Xc(e, w), e.lineTo(w[w.length - 1].x, _), e.lineTo(w[0].x, _), e.closePath(), e.fill(), mt(e)), ft(e), e.strokeStyle = y, e.lineWidth = (n == null ? void 0 : n.borderWidth) || 3, e.lineCap = "round", e.lineJoin = "round", Xc(e, w), e.stroke(), mt(e), b >= 0 && w[b]) {
    const A = w[b];
    ft(e), e.strokeStyle = s.gridStrong, e.lineWidth = 1, e.beginPath(), e.moveTo(A.x, v), e.lineTo(A.x, _), e.stroke(), mt(e);
  }
  w.forEach((A, E) => {
    const $ = E === b ? 5.6 : E === w.length - 1 ? 4.5 : 3.2;
    e.fillStyle = s.white, e.beginPath(), e.arc(A.x, A.y, $ + 1.8, 0, Math.PI * 2), e.fill(), e.fillStyle = y, e.beginPath(), e.arc(A.x, A.y, $, 0, Math.PI * 2), e.fill();
  });
  const k = o[o.length - 1], N = w[w.length - 1];
  return N && Number.isFinite(k) && (ft(e), e.fillStyle = y, e.font = '700 11px "Segoe UI", sans-serif', e.textAlign = "right", e.textBaseline = "bottom", e.fillText(String(Math.round(k * 10) / 10), h, Math.max(v + 12, N.y - 10)), mt(e)), tp(e, i, w, r.height - 22, s), { type: "line-point", items: w };
}
function u1(e, t, n, r) {
  const a = su(), o = Array.isArray(n == null ? void 0 : n.data) ? n.data.map((w) => Math.max(Number(w) || 0, 0)) : [], i = !!(n != null && n.placeholder), l = o.reduce((w, k) => w + k, 0), s = i ? o.map(() => 1) : o, c = s.reduce((w, k) => w + k, 0) || 1, m = Array.isArray(t == null ? void 0 : t.labels) ? t.labels : [], p = Array.isArray(n == null ? void 0 : n.backgroundColor) ? n.backgroundColor.map((w, k) => ti(w, ["#5db27d", "#f6b356", "#7a6fe0"][k % 3])) : ["#5db27d", "#f6b356", "#7a6fe0"], d = r.width / 2, h = r.height * 0.34, v = Math.min(r.width, r.height) * 0.2, _ = 18, L = 0.08;
  let g = -Math.PI / 2;
  ft(e), e.strokeStyle = a.track, e.lineWidth = _, e.lineCap = "round", e.beginPath(), e.arc(d, h, v, 0, Math.PI * 2), e.stroke(), mt(e), s.forEach((w, k) => {
    const N = w / c * Math.PI * 2, A = g + Math.max(N - L, 0.12);
    ft(e), e.strokeStyle = p[k % p.length], e.lineWidth = _, e.lineCap = "round", e.beginPath(), e.arc(d, h, v, g, A), e.stroke(), mt(e), g += N;
  }), ft(e), e.fillStyle = a.text, e.textAlign = "center", e.textBaseline = "alphabetic", e.font = '800 24px "Segoe UI", sans-serif', e.fillText(`${Math.round(l)}`, d, h + 8), e.font = '600 11px "Segoe UI", sans-serif', e.fillStyle = a.muted, e.fillText("g", d, h + 24), mt(e);
  const f = h + v + 28, y = 20, S = r.width - 20, b = 24;
  m.forEach((w, k) => {
    const N = f + k * b, A = p[k % p.length], E = o[k] || 0;
    ft(e), e.fillStyle = A, e.beginPath(), e.arc(y + 6, N, 5, 0, Math.PI * 2), e.fill(), e.fillStyle = a.text, e.font = '600 11px "Segoe UI", sans-serif', e.textAlign = "left", e.textBaseline = "middle", e.fillText(String(w || ""), y + 18, N), e.fillStyle = a.muted, e.textAlign = "right", e.fillText(`${Math.round(E * 10) / 10}g`, S, N), mt(e);
  });
}
class br {
  constructor(t, n = {}) {
    var r, a;
    this.ctx = t, this.type = n.type || "bar", this.data = n.data || { labels: [], datasets: [] }, this.options = n.options || {}, this.hoverIndex = -1, this.selectedIndex = Number.isInteger((a = (r = this.options) == null ? void 0 : r.interaction) == null ? void 0 : a.selectedIndex) ? this.options.interaction.selectedIndex : -1, this.interactionMap = { type: "none", items: [] }, this.handlePointerMove = this.handlePointerMove.bind(this), this.handlePointerLeave = this.handlePointerLeave.bind(this), this.handlePointerSelect = this.handlePointerSelect.bind(this), this.bindCanvasInteractions(), this.render();
  }
  render() {
    var a, o, i;
    const t = i1(this.ctx), n = Array.isArray((a = this.data) == null ? void 0 : a.datasets) ? this.data.datasets : [], r = n[0] || {};
    if (Number.isInteger((i = (o = this.options) == null ? void 0 : o.interaction) == null ? void 0 : i.selectedIndex) && (this.selectedIndex = this.options.interaction.selectedIndex), this.type === "doughnut") {
      u1(this.ctx, this.data, r, t), this.interactionMap = { type: "none", items: [] };
      return;
    }
    if (this.type === "line") {
      this.interactionMap = s1(this.ctx, this.data, r, t, {
        hoverIndex: this.hoverIndex
      });
      return;
    }
    this.interactionMap = l1(this.ctx, this.data, n, t, {
      hoverIndex: this.hoverIndex,
      selectedIndex: this.selectedIndex
    });
  }
  update() {
    this.render();
  }
  destroy() {
    var n;
    const t = (n = this.ctx) == null ? void 0 : n.canvas;
    t && typeof t.removeEventListener == "function" && (t.removeEventListener("pointermove", this.handlePointerMove), t.removeEventListener("pointerleave", this.handlePointerLeave), t.removeEventListener("click", this.handlePointerSelect));
  }
  resize(t, n) {
    t && (this.ctx.canvas.style.width = `${oa(t, 120, 2e3)}px`), n && (this.ctx.canvas.style.height = `${oa(n, 120, 2e3)}px`), this.render();
  }
  bindCanvasInteractions() {
    var n;
    const t = (n = this.ctx) == null ? void 0 : n.canvas;
    !t || typeof t.addEventListener != "function" || (t.addEventListener("pointermove", this.handlePointerMove), t.addEventListener("pointerleave", this.handlePointerLeave), t.addEventListener("click", this.handlePointerSelect));
  }
  getCanvasPosition(t) {
    var a;
    const n = (a = this.ctx) == null ? void 0 : a.canvas, r = typeof (n == null ? void 0 : n.getBoundingClientRect) == "function" ? n.getBoundingClientRect() : {
      left: 0,
      top: 0,
      width: (n == null ? void 0 : n.clientWidth) || (n == null ? void 0 : n.width) || 0,
      height: (n == null ? void 0 : n.clientHeight) || (n == null ? void 0 : n.height) || 0
    };
    return {
      x: Number(t == null ? void 0 : t.clientX) - r.left,
      y: Number(t == null ? void 0 : t.clientY) - r.top,
      width: r.width || (n == null ? void 0 : n.clientWidth) || 0,
      height: r.height || (n == null ? void 0 : n.clientHeight) || 0
    };
  }
  resolveInteraction(t) {
    var r;
    const n = Array.isArray((r = this.interactionMap) == null ? void 0 : r.items) ? this.interactionMap.items : [];
    if (!n.length) return null;
    if (this.interactionMap.type === "line-point") {
      const a = n.reduce((i, l) => {
        const s = Math.abs(l.x - t.x);
        return !i || s < i.distance ? { item: l, distance: s } : i;
      }, null), o = Math.max(24, t.width / Math.max(n.length * 2, 6));
      return a && a.distance <= o ? a.item : null;
    }
    return this.interactionMap.type === "bar-group" && n.find((a) => t.x >= a.x && t.x <= a.x + a.width && t.y >= a.y && t.y <= a.y + a.height + 24) || null;
  }
  emitInteraction(t, n) {
    var a, o;
    const r = (o = (a = this.options) == null ? void 0 : a.interaction) == null ? void 0 : o[t];
    typeof r == "function" && r({
      index: (n == null ? void 0 : n.index) ?? -1,
      label: (n == null ? void 0 : n.label) ?? "",
      payload: (n == null ? void 0 : n.payload) ?? null,
      value: (n == null ? void 0 : n.value) ?? null
    });
  }
  handlePointerMove(t) {
    const n = this.resolveInteraction(this.getCanvasPosition(t)), r = Number.isInteger(n == null ? void 0 : n.index) ? n.index : -1;
    if (r !== this.hoverIndex) {
      if (this.hoverIndex = r, this.render(), n) {
        this.emitInteraction("onHover", n);
        return;
      }
      this.emitInteraction("onLeave", null);
    }
  }
  handlePointerLeave() {
    this.hoverIndex !== -1 && (this.hoverIndex = -1, this.render(), this.emitInteraction("onLeave", null));
  }
  handlePointerSelect(t) {
    const n = this.resolveInteraction(this.getCanvasPosition(t));
    n && (this.interactionMap.type === "bar-group" && (this.selectedIndex = n.index, this.render()), this.emitInteraction("onSelect", n));
  }
}
let Pt = null, pe = null, Nn = null, Cn = null, Mn = null, ia = 7, Zc = !1, Me = [], Bn = [], Un = [], an = [], ir = "";
function Xa(e, t = 1) {
  const n = 10 ** t;
  return Math.round((Number(e) || 0) * n) / n;
}
function ue(e, t = "") {
  const n = document.getElementById(e);
  n && (n.textContent = String(t ?? "").replaceAll(" 路 ", " | "));
}
function Ee(e, t, n = "") {
  if (!e) return "";
  const r = e.date || e.label || "--", a = Xa(e == null ? void 0 : e[t], 1);
  return `${r} · ${a}${n}`;
}
function c1(e) {
  return e ? `${e.label || String(e.date || "").slice(5) || "--"} · ${Math.round(Number(e.calories) || 0)} kcal` : "";
}
function Hl(e, t = ei()) {
  if (!e) return "";
  const n = e.label || String(e.date || "").slice(5) || "--", r = Xa(e.protein, 1), a = Xa(e.fat, 1), o = Xa(e.carb, 1);
  return `${n} · ${t.pro || "Protein"} ${r}g · ${t.fat || "Fat"} ${a}g · ${t.carb || "Carbs"} ${o}g`;
}
function mn(e = []) {
  return !Array.isArray(e) || e.length === 0 ? null : e[e.length - 1] || null;
}
function uu(e = Me) {
  return !Array.isArray(e) || e.length === 0 ? null : e.find((t) => t.date === ir) || e[e.length - 1] || null;
}
function d1() {
  ue("calTrendHoverValue", Ee(mn(Bn), "calories", " kcal")), ue("proteinTrendHoverValue", Ee(mn(Un), "protein", "g")), ue("weightTrendHoverValue", Ee(mn(an), "weight", " kg"));
}
function np(e = uu()) {
  if (!Pt) return;
  const t = Math.max(Number(e == null ? void 0 : e.protein) || 0, 0), n = Math.max(Number(e == null ? void 0 : e.fat) || 0, 0), r = Math.max(Number(e == null ? void 0 : e.carb) || 0, 0), a = t + n + r, o = ei();
  Pt.data.labels = [o.pro, o.fat, o.carb], Pt.data.datasets[0].data = a === 0 ? [1, 1, 1] : [t, n, r], Pt.data.datasets[0].backgroundColor = a === 0 ? ["#ddd8f6", "#f9dfb3", "#d6f0df"] : ["#5db27d", "#ff9a6b", "#7a6fe0"], Pt.data.datasets[0].placeholder = a === 0, Pt.update(), ue("macroChartDate", c1(e)), ue("weeklyChartHint", Hl(e, o));
}
function rp(e = Me) {
  var n;
  const t = uu(e);
  ir = (t == null ? void 0 : t.date) || "", (n = pe == null ? void 0 : pe.options) != null && n.interaction && (pe.options.interaction.selectedIndex = e.findIndex((r) => r.date === ir)), np(t), pe && pe.update();
}
function f1(e, {
  selectedDate: t = "",
  previewWeight: n = null
} = {}) {
  if (!Array.isArray(e)) return [];
  const r = Number(n);
  if (!Number.isFinite(r) || r <= 0)
    return [...e];
  const a = String(t || "").slice(5);
  let o = !1;
  const i = e.map((l) => (l == null ? void 0 : l.date) !== a ? l : (o = !0, {
    ...l,
    weight: r
  }));
  return o ? i : [...e];
}
function m1(e) {
  ia = e;
}
async function p1() {
  if (Zc)
    return !0;
  const e = document.getElementById("macroChart"), t = document.getElementById("weeklyChart"), n = document.getElementById("calTrendChart"), r = document.getElementById("proteinTrendChart"), a = document.getElementById("weightChart");
  if (!e || !t || !n || !r || !a)
    return !1;
  const o = ei();
  return Pt = new br(e.getContext("2d"), {
    type: "doughnut",
    data: {
      labels: [o.pro, o.fat, o.carb],
      datasets: [{
        data: [1, 1, 1],
        backgroundColor: ["#ddd8f6", "#f9dfb3", "#d6f0df"],
        placeholder: !0,
        borderWidth: 2,
        borderColor: "var(--card-bg)"
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      plugins: {
        legend: { display: !1 }
      }
    }
  }), pe = new br(t.getContext("2d"), {
    type: "bar",
    data: {
      labels: [],
      items: [],
      datasets: [
        { label: o.pro, data: [], backgroundColor: "#5db27d", borderRadius: 8 },
        { label: o.fat, data: [], backgroundColor: "#ff9a6b", borderRadius: 8 },
        { label: o.carb, data: [], backgroundColor: "#7a6fe0", borderRadius: 8 }
      ]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } },
        y: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } }
      },
      plugins: { legend: { display: !1 } },
      interaction: {
        mode: "group",
        selectedIndex: -1,
        onHover: ({ payload: i }) => {
          i && ue("weeklyChartHint", Hl(i));
        },
        onLeave: () => {
          ue("weeklyChartHint", Hl(uu()));
        },
        onSelect: ({ payload: i }) => {
          i && (ir = i.date || "", rp());
        }
      }
    }
  }), Cn = new br(n.getContext("2d"), {
    type: "line",
    data: {
      labels: [],
      items: [],
      datasets: [{
        label: o.cal,
        data: [],
        borderColor: "#ff9a6b",
        backgroundColor: "rgba(255, 154, 107, 0.18)",
        borderWidth: 3,
        tension: 0.35,
        fill: !0
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } },
        y: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } }
      },
      interaction: {
        onHover: ({ payload: i }) => {
          i && ue("calTrendHoverValue", Ee(i, "calories", " kcal"));
        },
        onLeave: () => {
          ue("calTrendHoverValue", Ee(mn(Bn), "calories", " kcal"));
        },
        onSelect: ({ payload: i }) => {
          i && ue("calTrendHoverValue", Ee(i, "calories", " kcal"));
        }
      }
    }
  }), Mn = new br(r.getContext("2d"), {
    type: "line",
    data: {
      labels: [],
      items: [],
      datasets: [{
        label: o.pro,
        data: [],
        borderColor: "#5db27d",
        backgroundColor: "rgba(93, 178, 125, 0.18)",
        borderWidth: 3,
        tension: 0.35,
        fill: !0
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } },
        y: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } }
      },
      interaction: {
        onHover: ({ payload: i }) => {
          i && ue("proteinTrendHoverValue", Ee(i, "protein", "g"));
        },
        onLeave: () => {
          ue("proteinTrendHoverValue", Ee(mn(Un), "protein", "g"));
        },
        onSelect: ({ payload: i }) => {
          i && ue("proteinTrendHoverValue", Ee(i, "protein", "g"));
        }
      }
    }
  }), Nn = new br(a.getContext("2d"), {
    type: "line",
    data: {
      labels: [],
      items: [],
      datasets: [{
        label: o.weight,
        data: [],
        borderColor: "#6358c8",
        backgroundColor: "rgba(122, 111, 224, 0.16)",
        borderWidth: 3,
        tension: 0.35,
        fill: !0
      }]
    },
    options: {
      responsive: !0,
      maintainAspectRatio: !1,
      scales: {
        x: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } },
        y: { ticks: { color: getComputedStyle(document.body).getPropertyValue("--text-color") } }
      },
      interaction: {
        onHover: ({ payload: i }) => {
          i && ue("weightTrendHoverValue", Ee(i, "weight", " kg"));
        },
        onLeave: () => {
          ue("weightTrendHoverValue", Ee(mn(an), "weight", " kg"));
        },
        onSelect: ({ payload: i }) => {
          i && ue("weightTrendHoverValue", Ee(i, "weight", " kg"));
        }
      }
    }
  }), Zc = !0, ap(ia), cu(), !0;
}
function ap(e, t = pr(F(), { range: e })) {
  Bn = Array.isArray(t.calorieTrend) ? t.calorieTrend : [], Un = Array.isArray(t.proteinTrend) ? t.proteinTrend : [], Cn && (Cn.data.labels = Bn.map((n) => n.date), Cn.data.items = Bn, Cn.data.datasets[0].data = Bn.map((n) => n.calories), Cn.update()), Mn && (Mn.data.labels = Un.map((n) => n.date), Mn.data.items = Un, Mn.data.datasets[0].data = Un.map((n) => n.protein), Mn.update()), d1();
}
function h1(e, t = pr(F(), { range: ia })) {
  if (!Pt || !pe) return;
  const n = ei();
  if (Me = Array.isArray(t.macroSnapshot) ? t.macroSnapshot : [], pe.data.labels = Me.map((r) => r.label), pe.data.items = Me, pe.data.datasets[0].label = n.pro, pe.data.datasets[0].data = Me.map((r) => r.protein), pe.data.datasets[1].label = n.fat, pe.data.datasets[1].data = Me.map((r) => r.fat), pe.data.datasets[2].label = n.carb, pe.data.datasets[2].data = Me.map((r) => r.carb), !ir && Me.length > 0 && (ir = Me[Me.length - 1].date || ""), Me.length > 0) {
    rp(Me);
    return;
  }
  np({
    date: "",
    label: "",
    protein: Number(e.pro) || 0,
    fat: Number(e.fat) || 0,
    carb: Number(e.carb) || 0,
    calories: Number(e.cal) || 0
  });
}
function cu(e = pr(F()).weightTrend) {
  Nn && (an = Array.isArray(e) ? e.map((t) => ({
    ...t,
    weight: Number(t == null ? void 0 : t.weight) || 0
  })) : [], Nn.data.labels = an.map((t) => t.date), Nn.data.items = an, Nn.data.datasets[0].data = an.map((t) => t.weight), Nn.update(), ue("weightTrendHoverValue", Ee(mn(an), "weight", " kg")));
}
function g1(e, {
  state: t = F()
} = {}) {
  const n = pr(t), r = f1(n.weightTrend, {
    selectedDate: t.selectedDate,
    previewWeight: e
  });
  cu(r);
}
async function y1() {
  try {
    await p1();
    const e = pr(F(), { range: ia });
    h1(e.totals, e), cu(e.weightTrend), ap(ia, e);
  } catch (e) {
    console.error("Dashboard chart initialization failed.", e);
  }
}
const st = Object.freeze({
  ONBOARDING_COMPLETED: "onboarding_completed",
  FIRST_LOG_COMPLETED: "first_log_completed",
  AI_ANALYSIS_STARTED: "ai_analysis_started",
  AI_ANALYSIS_FAILED: "ai_analysis_failed",
  AI_RESULT_CORRECTED: "ai_result_corrected",
  PET_INTERACTION: "pet_interaction",
  RHYTHM_SUMMARY_VIEWED: "rhythm_summary_viewed"
}), v1 = Object.freeze({
  [st.ONBOARDING_COMPLETED]: Object.freeze({
    area: "onboarding",
    description: "Profile onboarding transitions from incomplete to complete."
  }),
  [st.FIRST_LOG_COMPLETED]: Object.freeze({
    area: "logging",
    description: "The user successfully adds their first meal log."
  }),
  [st.AI_ANALYSIS_STARTED]: Object.freeze({
    area: "ai",
    description: "An AI meal analysis request is submitted."
  }),
  [st.AI_ANALYSIS_FAILED]: Object.freeze({
    area: "ai",
    description: "An AI meal analysis request fails or is rejected."
  }),
  [st.AI_RESULT_CORRECTED]: Object.freeze({
    area: "ai",
    description: "A corrected AI result is recalculated from edited draft items."
  }),
  [st.PET_INTERACTION]: Object.freeze({
    area: "companion",
    description: "The user taps the dog companion and receives an interaction response."
  }),
  [st.RHYTHM_SUMMARY_VIEWED]: Object.freeze({
    area: "insights",
    description: "A 7-day rhythm summary surface becomes visible to the user."
  })
});
function op(e) {
  return !!e && Object.hasOwn(v1, e);
}
const ip = "analytics_events_v1", lp = "analytics_meta_v1";
function du(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function S1(e) {
  return du(e) ? e : {};
}
function fu(e) {
  return !du(e) || !op(e.name) ? null : {
    name: e.name,
    timestamp: String(e.timestamp || (/* @__PURE__ */ new Date()).toISOString()),
    payload: S1(e.payload)
  };
}
function sp(e) {
  const t = du(e == null ? void 0 : e.once) ? e.once : {};
  return {
    once: Object.fromEntries(
      Object.entries(t).map(([n, r]) => [String(n), String(r || "")])
    )
  };
}
function _1() {
  const e = fa(Yo(ip, "[]"), []), t = Array.isArray(e) ? e.map(fu).filter(Boolean) : [];
  return JSON.stringify(e) !== JSON.stringify(t) && up(t), t;
}
function up(e = []) {
  const t = Array.isArray(e) ? e.map(fu).filter(Boolean).slice(-200) : [];
  return qo(ip, JSON.stringify(t)), t;
}
function w1(e) {
  const t = fu(e);
  if (!t) return null;
  const n = [..._1(), t].slice(-200);
  return up(n), t;
}
function T1() {
  const e = fa(Yo(lp, "{}"), {}), t = sp(e);
  return JSON.stringify(e) !== JSON.stringify(t) && cp(t), t;
}
function cp(e = {}) {
  const t = sp(e);
  return qo(lp, JSON.stringify(t)), t;
}
const k1 = /* @__PURE__ */ new Set();
function x1(e) {
  return !!e && typeof e == "object" && !Array.isArray(e);
}
function b1(e) {
  if (e === null) return null;
  if (["string", "number", "boolean"].includes(typeof e))
    return e;
}
function Wl(e, t = 0) {
  const n = b1(e);
  if (n !== void 0) return n;
  if (!(t >= 2)) {
    if (Array.isArray(e))
      return e.map((r) => Wl(r, t + 1)).filter((r) => r !== void 0);
    if (x1(e))
      return Object.fromEntries(
        Object.entries(e).map(([r, a]) => [r, Wl(a, t + 1)]).filter(([, r]) => r !== void 0)
      );
  }
}
function N1(e) {
  k1.forEach((t) => {
    try {
      if (typeof t == "function") {
        t(e);
        return;
      }
      t && typeof t.track == "function" && t.track(e);
    } catch {
    }
  });
}
function dp(e, t = {}, n = {}) {
  if (!op(e)) return null;
  const r = n.onceKey ? `${e}:${String(n.onceKey)}` : "";
  if (r) {
    const o = T1();
    if (o.once[r])
      return null;
    o.once[r] = (/* @__PURE__ */ new Date()).toISOString(), cp(o);
  }
  const a = w1({
    name: e,
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    payload: Wl(t) || {}
  });
  return a && N1(a), a;
}
function fp(e, t = {}, n = "global") {
  return dp(e, t, { onceKey: n });
}
function Gt(e, t = "") {
  return String(e || t);
}
function C1(e = {}) {
  return fp(st.ONBOARDING_COMPLETED, {
    region: Gt(e.region),
    goalType: Gt(e.goalType, "lose"),
    diningOutFrequency: Gt(e.diningOutFrequency, "sometimes")
  }, "global");
}
function M1(e = {}, t = {}) {
  return fp(st.FIRST_LOG_COMPLETED, {
    source: Gt(t.source, "manual"),
    mealType: Gt(e.type, "snack"),
    selectedDate: Gt(t.selectedDate),
    itemCount: Array.isArray(e.items) ? e.items.length : 0
  }, "global");
}
function E1(e = {}) {
  return dp(st.AI_RESULT_CORRECTED, {
    itemCount: Number(e.itemCount) || 0,
    correctionCount: Number(e.correctionCount) || 0,
    selectedDate: Gt(e.selectedDate),
    source: Gt(e.source, "items")
  });
}
function Jc(e = [], t) {
  const n = e.filter((r) => Number(r == null ? void 0 : r[t]) > 0);
  return n.length === 0 ? 0 : Math.round(
    n.reduce((r, a) => r + Number((a == null ? void 0 : a[t]) || 0), 0) / n.length
  );
}
function A1(e, t, n) {
  var s, c, m, p, d;
  const r = e.weeklyCalories || [], a = e.proteinTrend || [], o = Jc(r, "calories"), i = t > 0 ? r.filter((h) => h.calories > 0 && h.calories >= t * 0.85 && h.calories <= t * 1.15).length : 0, l = Jc(a, "protein");
  return {
    averageCalories: o,
    averageProtein: l,
    onTargetDays: i,
    streak: ((s = n.progress) == null ? void 0 : s.streak) || 0,
    level: ((c = n.progress) == null ? void 0 : c.level) || 1,
    xpWidth: `${Math.min((((m = n.progress) == null ? void 0 : m.xp) || 0) % 100, 100)}%`,
    energyWidth: `${Math.min(((p = n.progress) == null ? void 0 : p.energy) || 0, 100)}%`,
    bondWidth: `${Math.min(((d = n.progress) == null ? void 0 : d.bond) || 0, 100)}%`
  };
}
function mp(e = {}) {
  return {
    type: String(e.type || "snack"),
    name: String(e.name || ""),
    nutri: dr(e),
    items: Array.isArray(e.items) ? e.items.map((t) => ({
      name: String((t == null ? void 0 : t.name) || ""),
      weight: String((t == null ? void 0 : t.weight) || "")
    })) : [],
    healthScore: Number(e.healthScore) || 0
  };
}
function I1(e = {}) {
  const t = mp({
    ...e,
    type: "favorite"
  });
  return {
    name: t.name,
    nutri: t.nutri,
    items: t.items,
    healthScore: t.healthScore
  };
}
function L1(e = {}) {
  return {
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
function ed(e, {
  result: t = e.tempAIResult,
  saved: n = e.tempAIResultSaved,
  syncModal: r = !0,
  reason: a = "ai-result:update",
  status: o = "editing",
  historyEntry: i = null,
  preserveHistory: l = !0,
  preferredName: s = ""
} = {}) {
  var d;
  const c = l ? ((d = e.tempAIResult) == null ? void 0 : d.correctionHistory) || [] : [], m = Lm(c, i), p = Hs(t, {
    correctionHistory: m,
    preferredName: s
  });
  return Z({
    tempAIResult: p,
    tempAIResultSaved: !!n,
    analysisFlow: {
      ...e.analysisFlow,
      status: o,
      lastError: "",
      isSoftError: !1
    }
  }, {
    reason: a,
    syncModal: r
  });
}
function j1(e, t = {}) {
  var r, a, o, i;
  const n = F();
  switch (e) {
    case "SET_LANGUAGE": {
      const l = pa(t.lang || n.curLang || "zh-TW");
      return Sy(l), Z({
        curLang: l
      }, {
        reason: "lang:set",
        lang: l
      });
    }
    case "SET_THEME": {
      const l = String(t.theme || n.curTheme || "light");
      return wy(l), Z({
        curTheme: l
      }, {
        reason: "theme:set",
        theme: l
      });
    }
    case "SET_SELECTED_DATE": {
      const l = String(t.date || "").trim();
      if (!l)
        return Z({}, { reason: "date:noop" });
      const s = Sm(l);
      return Z({
        selectedDate: s,
        foodItems: Rs(s)
      }, {
        reason: "date:set",
        date: s
      });
    }
    case "ADD_FOOD_ITEM": {
      const l = mp(t.entry), s = [...n.foodItems, l];
      $c(n.selectedDate, s);
      const c = Z({
        foodItems: s
      }, {
        reason: "food:add",
        entryName: l.name
      });
      return M1(l, {
        source: t.source || "manual",
        selectedDate: n.selectedDate
      }), c;
    }
    case "DELETE_FOOD_ITEM": {
      const l = Number(t.index);
      if (!Number.isInteger(l) || l < 0 || l >= n.foodItems.length)
        return Z({}, { reason: "food:noop" });
      const s = n.foodItems.filter((c, m) => m !== l);
      return $c(n.selectedDate, s), Z({
        foodItems: s
      }, {
        reason: "food:delete",
        index: l
      });
    }
    case "ADD_FAVORITE": {
      const l = I1(t.favorite), s = [...n.favoriteFoods, l];
      return Hc(s), Z({
        favoriteFoods: s
      }, {
        reason: "favorite:add",
        favoriteName: l.name
      });
    }
    case "DELETE_FAVORITE": {
      const l = Number(t.index);
      if (!Number.isInteger(l) || l < 0 || l >= n.favoriteFoods.length)
        return Z({}, { reason: "favorite:noop" });
      const s = n.favoriteFoods.filter((c, m) => m !== l);
      return Hc(s), Z({
        favoriteFoods: s
      }, {
        reason: "favorite:delete",
        index: l
      });
    }
    case "SET_TEMP_AI_RESULT": {
      const l = t.result ? Hs(t.result, {
        correctionHistory: Lm(
          t.preserveHistory ? ((r = n.tempAIResult) == null ? void 0 : r.correctionHistory) || [] : [],
          t.historyEntry || null
        ),
        preferredName: t.preferredName || ""
      }) : null, s = Z({
        tempAIResult: l,
        tempAIResultSaved: t.saved !== void 0 ? !!t.saved : n.tempAIResultSaved,
        analysisFlow: {
          ...n.analysisFlow,
          status: "result",
          isSoftError: !1,
          lastError: ""
        }
      }, {
        reason: "ai-result:set",
        openModal: !!t.openModal
      });
      return ((a = t.historyEntry) == null ? void 0 : a.type) === "recalculate" && l && E1({
        itemCount: ((o = l.items) == null ? void 0 : o.length) || 0,
        correctionCount: ((i = l.correctionHistory) == null ? void 0 : i.length) || 0,
        selectedDate: n.selectedDate,
        source: "items"
      }), s;
    }
    case "SET_TEMP_AI_ITEMS": {
      if (!n.tempAIResult)
        return Z({}, { reason: "ai-result:noop" });
      const l = Array.isArray(t.items) ? t.items.map(No) : [];
      return ed(n, {
        result: {
          ...n.tempAIResult,
          items: l
        },
        saved: t.saved,
        syncModal: t.syncModal !== !1,
        reason: "ai-result:update-items",
        historyEntry: t.historyEntry || null,
        preserveHistory: !0
      });
    }
    case "UPDATE_TEMP_AI_ITEM": {
      if (!n.tempAIResult)
        return Z({}, { reason: "ai-result:noop" });
      const l = Number(t.index);
      if (!Number.isInteger(l) || l < 0 || l >= n.tempAIResult.items.length)
        return Z({}, { reason: "ai-result:noop" });
      const s = n.tempAIResult.items[l] || { name: "", weight: "" }, c = No({
        ...s,
        ...t.patch || {}
      }), m = t.field ? (s == null ? void 0 : s[t.field]) ?? "" : "", p = t.field ? (c == null ? void 0 : c[t.field]) ?? "" : "", d = n.tempAIResult.items.map((h, v) => v === l ? c : h);
      return ed(n, {
        result: {
          ...n.tempAIResult,
          items: d
        },
        saved: t.saved,
        syncModal: t.syncModal !== !1,
        reason: "ai-result:update-item",
        historyEntry: t.trackHistory && m !== p ? by("item:update", {
          itemIndex: l,
          field: t.field || "",
          previousValue: m,
          nextValue: p
        }) : null,
        preserveHistory: !0
      });
    }
    case "MARK_TEMP_AI_SAVED":
      return Z({
        tempAIResultSaved: !!t.saved,
        analysisFlow: {
          ...n.analysisFlow,
          status: "saved"
        }
      }, {
        reason: "ai-result:saved"
      });
    case "CLEAR_TEMP_AI_RESULT":
      return Z({
        tempAIResult: null,
        tempAIResultSaved: !1
      }, {
        reason: "ai-result:clear"
      });
    case "SET_ANALYSIS_FLOW": {
      const l = {
        ...n.analysisFlow,
        ...t.flow || t
      };
      return Z({
        analysisFlow: l
      }, {
        reason: t.reason || "analysis:state"
      });
    }
    case "APPLY_PROFILE_PLAN": {
      const l = L1(t.profile), s = Vc(n.profile || {}, n.curLang).isComplete, c = Vc(l, n.curLang);
      t.persist !== !1 && Em(l);
      const m = Z({
        profile: l,
        targetCalories: Number(t.targetCalories) || 0,
        currentMealMode: l.mealMode || t.mealMode || "4",
        currentGoalType: String(t.goalType || l.goalType || "lose")
      }, {
        reason: "profile:apply"
      });
      return !s && c.isComplete && C1(l), m;
    }
    default:
      return Z({}, { reason: "state:sync" });
  }
}
function pp() {
  return tt(F().curLang);
}
function hp() {
  var t, n, r;
  const e = F();
  return {
    gender: document.getElementById("gender").value,
    age: document.getElementById("age").value,
    height: document.getElementById("height").value,
    weight: document.getElementById("weight").value,
    activity: document.getElementById("activity").value,
    mealMode: document.getElementById("meal-mode").value,
    goalType: ((t = document.getElementById("goal-type")) == null ? void 0 : t.value) || "lose",
    region: String(((n = e.profile) == null ? void 0 : n.region) || "").trim() || Js(e.curLang),
    diningOutFrequency: ((r = document.getElementById("dining-out-frequency")) == null ? void 0 : r.value) || "sometimes"
  };
}
function P1(e = !1, t = {}) {
  const n = pp(), r = hp(), a = Tv(r);
  return a ? (j1("APPLY_PROFILE_PLAN", {
    profile: r,
    goalType: a.goalType,
    targetCalories: a.targetCalories,
    persist: t.persist !== !1
  }), a) : (e || $l(n.alertFill || "Please fill in the required profile fields.", "error"), null);
}
function D1() {
  var r;
  const e = document.getElementById("daily-weight-input").value, t = pp(), { selectedDate: n } = F();
  if (Ty(n, e)) {
    $l(t.alertWeightSaved || "Weight saved.", "success"), document.getElementById("weight").value = e;
    const a = Zo(n), o = hp();
    return ((r = document.getElementById("goal-result")) == null ? void 0 : r.style.display) === "block" ? (P1(!0), Z({
      loggedWeight: a
    }, { reason: "weight:save" })) : (Em(o), Z({
      profile: o,
      loggedWeight: a
    }, { reason: "weight:save" })), !0;
  }
  return $l(t.alertInvalidWeight || "Please enter a valid weight.", "error"), !1;
}
function td(e, t) {
  return t.rangeLabelFn ? t.rangeLabelFn(e) : `${e} Days`;
}
function z1({ t: e }) {
  const t = [
    { key: "protein", label: e.pro || "Protein" },
    { key: "fat", label: e.fat || "Fat" },
    { key: "carb", label: e.carb || "Carbs" }
  ];
  return /* @__PURE__ */ u.jsx("div", { className: "stats-mini-legend", "aria-hidden": "true", children: t.map((n) => /* @__PURE__ */ u.jsxs("span", { className: "stats-mini-legend__item", children: [
    /* @__PURE__ */ u.jsx("span", { className: `stats-mini-legend__swatch stats-mini-legend__swatch--${n.key}` }),
    /* @__PURE__ */ u.jsx("span", { children: n.label })
  ] }, n.key)) });
}
function F1() {
  const e = mr(), [t, n] = ge.useState(7), [r, a] = ge.useState(() => String(e.loggedWeight ?? "")), o = tt(e.curLang), i = o1(e.curLang), l = pr(e, { range: t, weightDays: 30 }), s = Gm(e), c = A1(l, Number(e.targetCalories) || 0, s), m = td(t, i), p = r ? `${r} kg` : "--";
  return ge.useEffect(() => {
    a(String(e.loggedWeight ?? ""));
  }, [e.loggedWeight]), /* @__PURE__ */ u.jsxs("div", { "data-stats-react-surface": "true", children: [
    /* @__PURE__ */ u.jsxs("div", { className: "surface-heading", children: [
      /* @__PURE__ */ u.jsx("div", { className: "surface-heading__eyebrow", children: i.eyebrow }),
      /* @__PURE__ */ u.jsxs("div", { className: "surface-heading__title-row", children: [
        /* @__PURE__ */ u.jsx("span", { className: "surface-heading__icon", "aria-hidden": "true", children: /* @__PURE__ */ u.jsx(s0, {}) }),
        /* @__PURE__ */ u.jsx("h1", { className: "surface-heading__title", children: i.title })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "stats-range-shell", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "stats-range-shell__copy", children: [
        /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: i.trend }),
        /* @__PURE__ */ u.jsx("div", { className: "stats-range-shell__title", children: m })
      ] }),
      /* @__PURE__ */ u.jsx("div", { className: "chart-range-toggle chart-range-toggle--segmented", children: [7, 30, 90].map((d) => /* @__PURE__ */ u.jsx(
        "button",
        {
          id: `btn-chart-${d}d`,
          className: `range-btn${t === d ? " active-range" : ""}`,
          type: "button",
          onClick: () => {
            m1(d), ge.startTransition(() => {
              n(d);
            }), y1();
          },
          children: td(d, i)
        },
        d
      )) })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "stats-summary-card", children: [
      /* @__PURE__ */ u.jsx("div", { className: "stats-summary-card__title", children: i.summaryTitle }),
      /* @__PURE__ */ u.jsxs("div", { className: "stats-summary-grid", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "stats-tile", children: [
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__label", children: i.avgCalories }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__value", children: c.averageCalories > 0 ? c.averageCalories : "--" }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__meta", children: i.targetOverview })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "stats-tile", children: [
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__label", children: i.streak }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__value", children: c.streak }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__meta", children: i.streakMeta })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "stats-tile stats-tile--wide", children: [
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__label", children: i.avgProtein }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__value", children: c.averageProtein > 0 ? `${c.averageProtein}g` : "--" }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-tile__meta", children: i.avgProteinMeta })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "stats-chart-card", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-card__head", children: [
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: i.macroBalance }),
          /* @__PURE__ */ u.jsx("h2", { className: "stats-chart-card__title", children: i.nutritionSnapshot })
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "stats-chart-card__head-meta", children: m })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "chart-grid chart-grid--stats", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ u.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ u.jsx("canvas", { id: "macroChart" }) }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-chart-caption", id: "macroChartDate" })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ u.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ u.jsx("canvas", { id: "weeklyChart" }) }),
          /* @__PURE__ */ u.jsx(z1, { t: o }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-chart-caption stats-chart-caption--hint", id: "weeklyChartHint" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("div", { className: "stats-trend-grid", children: [
      /* @__PURE__ */ u.jsxs("section", { className: "stats-chart-card", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-card__head", children: [
          /* @__PURE__ */ u.jsxs("div", { children: [
            /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: i.trend }),
            /* @__PURE__ */ u.jsx("h2", { className: "stats-chart-card__title", id: "txt-cal-trend-title", children: i.calorieTrend })
          ] }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-chart-card__head-meta", children: m })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ u.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ u.jsx("canvas", { id: "calTrendChart" }) }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-chart-caption", id: "calTrendHoverValue" })
        ] })
      ] }),
      /* @__PURE__ */ u.jsxs("section", { className: "stats-chart-card", children: [
        /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-card__head", children: [
          /* @__PURE__ */ u.jsxs("div", { children: [
            /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: i.protein }),
            /* @__PURE__ */ u.jsx("h2", { className: "stats-chart-card__title", id: "txt-protein-trend-title", children: i.proteinTrend })
          ] }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-chart-card__head-meta", children: m })
        ] }),
        /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-shell", children: [
          /* @__PURE__ */ u.jsx("div", { className: "chart-container", style: { height: "252px" }, children: /* @__PURE__ */ u.jsx("canvas", { id: "proteinTrendChart" }) }),
          /* @__PURE__ */ u.jsx("div", { className: "stats-chart-caption", id: "proteinTrendHoverValue" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ u.jsxs("section", { className: "stats-chart-card", children: [
      /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-card__head", children: [
        /* @__PURE__ */ u.jsxs("div", { children: [
          /* @__PURE__ */ u.jsx("div", { className: "section-kicker", children: i.weightSection }),
          /* @__PURE__ */ u.jsx("h2", { className: "stats-chart-card__title", children: i.weightTrend })
        ] }),
        /* @__PURE__ */ u.jsx("div", { className: "stats-chart-card__head-meta", children: p })
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "weight-input-inline", children: [
        /* @__PURE__ */ u.jsx(
          "input",
          {
            type: "number",
            id: "daily-weight-input",
            placeholder: i.weightPlaceholder,
            step: "0.1",
            value: r,
            onChange: (d) => {
              const h = d.target.value;
              a(h), g1(h, { state: e });
            }
          }
        ),
        /* @__PURE__ */ u.jsx(
          "button",
          {
            id: "btn-save-weight",
            className: "weight-save-btn",
            type: "button",
            onClick: () => {
              D1();
            },
            children: /* @__PURE__ */ u.jsx("span", { id: "txt-weight-title", children: i.save })
          }
        )
      ] }),
      /* @__PURE__ */ u.jsxs("div", { className: "stats-chart-shell", children: [
        /* @__PURE__ */ u.jsx("div", { className: "chart-container", style: { height: "248px" }, children: /* @__PURE__ */ u.jsx("canvas", { id: "weightChart" }) }),
        /* @__PURE__ */ u.jsx("div", { className: "stats-chart-caption", id: "weightTrendHoverValue" })
      ] })
    ] })
  ] });
}
const O1 = Object.freeze({
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
}), R1 = Object.freeze({
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
}), nd = Object.freeze(["protein", "fat", "carbohydrate"]), $1 = Object.freeze(["protein", "fat", "carbohydrate", "sugar", "sodium", "saturatedFat", "transFat", "fiber"]), gp = Object.freeze({
  calories: "kcal",
  protein: "g",
  fat: "g",
  carbohydrate: "g",
  sugar: "g",
  sodium: "mg",
  saturatedFat: "g",
  transFat: "g",
  fiber: "g"
}), H1 = Object.freeze({
  protein: "#6aa874",
  fat: "#efb04a",
  carbohydrate: "#6f9fe8"
});
function yp(e, t = "en") {
  return e[t] || e[String(t || "en").split("-")[0]] || e.en;
}
function W1(e, t = 1) {
  const n = Math.round((Number(e) || 0) * 10 ** t) / 10 ** t;
  return Number.isInteger(n) ? n : Number(n.toFixed(t));
}
function Vn(e, t) {
  return e === "calories" || e === "sodium" ? Math.round(Number(t) || 0) : W1(t);
}
function Hr(e, t) {
  const n = tt(t);
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
function B1(e, t) {
  const n = Vn(e, t);
  return {
    field: e,
    value: n,
    unit: gp[e] || ""
  };
}
function vp(e, t) {
  const n = nd.reduce((r, a) => r + Math.max(Number(e == null ? void 0 : e[a]) || 0, 0), 0);
  return nd.map((r) => {
    const a = Math.max(Number(e == null ? void 0 : e[r]) || 0, 0), o = n > 0 ? Math.round(a / n * 100) : 0, i = o > 0 ? t === "zh-TW" ? `約佔三大營養的 ${o}%` : t === "zh-CN" ? `约占三大营养的 ${o}%` : `${o}% of today's macro total` : "--";
    return {
      field: r,
      label: Hr(r, t),
      value: Vn(r, a),
      unit: gp[r],
      share: o,
      shareLabel: i,
      color: H1[r]
    };
  });
}
function Sp(e, t) {
  return $1.map((n) => ({
    field: n,
    label: Hr(n, t),
    ...B1(n, e == null ? void 0 : e[n])
  }));
}
function U1(e, t) {
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
function V1(e) {
  const t = e.curLang || "en", n = tt(t), r = Fm(t), a = yp(O1, t), o = Qv(e), i = Qm(e, { days: 7 }), l = nv(i, t), s = o.nutrition || {};
  return {
    kind: "daily-summary",
    lang: t,
    title: a.title,
    subtitle: qs(e.selectedDate, t),
    summary: a.summary,
    closeLabel: n.close || "Close",
    badge: null,
    heroStats: [
      {
        field: "calories",
        label: n.cal || "Calories",
        value: Math.round(Number(s.calories) || 0),
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
      cards: vp(s, t)
    },
    reportSection: {
      title: a.reportTitle,
      summary: a.reportSummary
    },
    nutrientSection: {
      title: a.nutrientTitle,
      summary: a.nutrientSummary,
      headers: [a.nutrientHeader, a.valueHeader],
      rows: Sp(s, t)
    },
    compositionSection: null,
    focusPanel: U1(l, a)
  };
}
function K1(e = {}, t = F()) {
  var c;
  const n = t.curLang || "en", r = tt(n), a = yp(R1, n), o = (e == null ? void 0 : e.nutri) || (e == null ? void 0 : e.nutrition) || e || {}, i = e != null && e.type ? ((c = r.meals) == null ? void 0 : c[e.type]) || e.type : qs(t.selectedDate, n), l = Number(e == null ? void 0 : e.healthScore) || 0, s = (Array.isArray(e == null ? void 0 : e.items) ? e.items : []).map((m) => ({
    name: String((m == null ? void 0 : m.name) || ""),
    amount: String((m == null ? void 0 : m.weight) || (m == null ? void 0 : m.amount) || "")
  })).filter((m) => m.name || m.amount);
  return {
    kind: "item-detail",
    lang: n,
    title: (e == null ? void 0 : e.name) || a.reportTitle,
    subtitle: i,
    summary: a.summary,
    closeLabel: r.close || "Close",
    badge: l > 0 ? {
      label: r.healthScoreLabel || "Health Score",
      value: `${Math.round(l)}/10`
    } : null,
    heroStats: [
      {
        field: "calories",
        label: r.cal || "Calories",
        value: Vn("calories", o.calories),
        unit: "kcal",
        emphasis: !0
      },
      {
        field: "carbohydrate",
        label: Hr("carbohydrate", n),
        value: Vn("carbohydrate", o.carbohydrate),
        unit: "g"
      },
      {
        field: "protein",
        label: Hr("protein", n),
        value: Vn("protein", o.protein),
        unit: "g"
      },
      {
        field: "fat",
        label: Hr("fat", n),
        value: Vn("fat", o.fat),
        unit: "g"
      }
    ],
    macroSection: {
      title: a.macroTitle,
      summary: a.macroSummary,
      cards: vp(o, n)
    },
    reportSection: {
      title: a.reportTitle,
      summary: a.reportSummary
    },
    nutrientSection: {
      title: a.nutrientTitle,
      summary: a.nutrientSummary,
      headers: [a.nutrientHeader, a.valueHeader],
      rows: Sp(o, n)
    },
    compositionSection: {
      title: a.compositionTitle,
      summary: a.compositionSummary,
      headers: [a.itemHeader, a.amountHeader],
      emptyText: a.compositionEmpty,
      rows: s
    },
    focusPanel: null
  };
}
function G1(e = F(), t = { kind: "daily-summary" }) {
  const n = e || F();
  return ((t == null ? void 0 : t.kind) || "daily-summary") === "item-detail" ? K1((t == null ? void 0 : t.item) || {}, n) : V1(n);
}
function Q1() {
  var e;
  return ((e = globalThis.window) == null ? void 0 : e.__woofDetailSurfaceBridge) || {
    getState: () => null,
    subscribe: () => () => {
    }
  };
}
function Y1() {
  const e = mr(), t = Q1(), n = ee.useSyncExternalStore(t.subscribe, t.getState, t.getState);
  return !n || !n.kind ? null : G1(e, n);
}
const x = ge.createElement;
function rd() {
}
function q1({ field: e }) {
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
        x("path", { key: "flame", d: "M13.5 2.5c.4 3-1.1 4.4-2.6 6-1.4 1.5-2.8 3-2.4 5.4.3 2 1.8 3.6 3.8 4.1-1.1-1.4-1-3.1.2-4.6.6 1.6 1.8 2.4 3.2 2.5 1.3-1.1 2.1-2.8 1.8-4.7-.4-2.5-2.4-4.7-4-8.2Z" }),
        x("path", { key: "base", d: "M6.8 9.2C5.6 10.8 5 12.4 5 14a7 7 0 0 0 14 0c0-2.8-1.6-5.3-3.5-7.4" })
      ];
      break;
    case "carbohydrate":
      n = [
        x("path", { key: "stem", d: "M12 21V8" }),
        x("path", { key: "left-top", d: "M12 11C8.8 11 6.5 9.3 6 6c3.2 0 5.5 1.7 6 5Z" }),
        x("path", { key: "right-top", d: "M12 11c3.2 0 5.5-1.7 6-5-3.2 0-5.5 1.7-6 5Z" }),
        x("path", { key: "left-bottom", d: "M12 17c-3.2 0-5.5-1.7-6-5 3.2 0 5.5 1.7 6 5Z" })
      ];
      break;
    case "protein":
      n = [
        x("path", { key: "bar", d: "M6 12h12" }),
        x("path", { key: "left-inner", d: "M6 7v10" }),
        x("path", { key: "right-inner", d: "M18 7v10" }),
        x("path", { key: "left-outer", d: "M3 9v6" }),
        x("path", { key: "right-outer", d: "M21 9v6" })
      ];
      break;
    case "fat":
      n = [
        x("path", { key: "drop", d: "M12 2.5s6 6.2 6 11a6 6 0 0 1-12 0c0-4.8 6-11 6-11Z" }),
        x("path", { key: "shine", d: "M9.2 14.5c.3 1.2 1.2 2 2.4 2.3" })
      ];
      break;
    case "goal":
      n = [
        x("circle", { key: "outer", cx: 12, cy: 12, r: 8 }),
        x("circle", { key: "inner", cx: 12, cy: 12, r: 3 }),
        x("path", { key: "arrow", d: "m14 10 5-5" })
      ];
      break;
    default:
      n = [
        x("circle", { key: "clock", cx: 12, cy: 12, r: 8 }),
        x("path", { key: "hand", d: "M12 8v4l2.5 1.5" })
      ];
  }
  return x(
    "span",
    { className: "woof-detail__metric-icon", "aria-hidden": "true" },
    x("svg", t, ...n)
  );
}
function X1({ value: e, unit: t, emphasis: n = !1 }) {
  const r = String(e ?? "").replace(/[^0-9A-Za-z]/g, "").length, a = r >= 7 ? " woof-detail__hero-value--very-long" : r >= 5 ? " woof-detail__hero-value--long" : "";
  return x(
    "div",
    { className: `woof-detail__hero-value${n ? " woof-detail__hero-value--emphasis" : ""}${a}` },
    x("span", { className: "woof-detail__hero-number" }, e),
    t ? x("span", { className: "woof-detail__hero-unit" }, t) : null
  );
}
function Z1({ stat: e }) {
  const t = String(e.field || "metric").replace(/[^a-z0-9-]/gi, "").toLowerCase() || "metric", n = `${e.label}: ${e.value}${e.unit ? ` ${e.unit}` : ""}`;
  return x(
    "article",
    {
      className: `woof-detail__hero-stat woof-detail__hero-stat--${t}`,
      "aria-label": n
    },
    x(
      "div",
      { className: "woof-detail__metric-head" },
      x(q1, { field: t }),
      x("div", { className: "woof-detail__hero-label" }, e.label)
    ),
    x(X1, {
      value: e.value,
      unit: e.unit,
      emphasis: e.emphasis
    })
  );
}
function J1({ card: e }) {
  return x(
    "article",
    { className: "woof-detail__macro-card" },
    x(
      "div",
      { className: "woof-detail__macro-card-head" },
      x("div", { className: "woof-detail__macro-card-label" }, e.label),
      x("div", { className: "woof-detail__macro-card-value" }, `${e.value}${e.unit}`)
    ),
    x(
      "div",
      { className: "woof-detail__macro-track", "aria-hidden": "true" },
      x("div", {
        className: "woof-detail__macro-fill",
        style: {
          width: `${Math.max(Math.min(Number(e.share) || 0, 100), 8)}%`,
          background: e.color
        }
      })
    ),
    x("div", { className: "woof-detail__macro-share" }, e.shareLabel || "--")
  );
}
function eS({ rows: e, headers: t = ["Nutrient", "Value"] }) {
  return x(
    "div",
    { className: "woof-detail__table" },
    x(
      "div",
      { className: "woof-detail__table-head" },
      x("div", null, t[0] || "Nutrient"),
      x("div", null, t[1] || "Value")
    ),
    ...e.map((n) => x(
      "div",
      { key: n.field, className: "woof-detail__table-row" },
      x("div", { className: "woof-detail__table-label" }, n.label),
      x(
        "div",
        { className: "woof-detail__table-value" },
        n.value,
        n.unit ? x("span", { className: "woof-detail__table-unit" }, n.unit) : null
      )
    ))
  );
}
function tS({ section: e }) {
  var n, r;
  const t = (e == null ? void 0 : e.rows) || [];
  return t.length === 0 ? x("div", { className: "woof-detail__empty-note" }, (e == null ? void 0 : e.emptyText) || "") : x(
    "div",
    { className: "woof-detail__table woof-detail__table--composition" },
    x(
      "div",
      { className: "woof-detail__table-head" },
      x("div", null, ((n = e == null ? void 0 : e.headers) == null ? void 0 : n[0]) || "Item"),
      x("div", null, ((r = e == null ? void 0 : e.headers) == null ? void 0 : r[1]) || "Amount")
    ),
    ...t.map((a, o) => x(
      "div",
      { key: `${a.name}-${o}`, className: "woof-detail__table-row" },
      x("div", { className: "woof-detail__table-label" }, a.name || "--"),
      x("div", { className: "woof-detail__table-value" }, a.amount || "--")
    ))
  );
}
function Ar({ title: e, summary: t, children: n, modifier: r = "" }) {
  return x(
    "section",
    { className: `woof-detail__section-block${r}` },
    x(
      "div",
      { className: "woof-detail__section-head" },
      x("h3", { className: "woof-detail__section-title" }, e),
      t ? x("p", { className: "woof-detail__section-summary" }, t) : null
    ),
    n
  );
}
function nS({ panel: e }) {
  return !e || !Array.isArray(e.signals) || e.signals.length === 0 ? null : x(
    Ar,
    {
      title: e.title,
      summary: e.summary,
      modifier: " woof-detail__section-block--focus"
    },
    x(
      "div",
      { className: "woof-detail__focus-grid" },
      ...e.signals.map((t) => x(
        "article",
        { key: t.key || t.label, className: "woof-detail__focus-card" },
        x("div", { className: "woof-detail__focus-label" }, t.label),
        x("div", { className: "woof-detail__focus-value" }, t.value),
        t.detail ? x("div", { className: "woof-detail__focus-detail" }, t.detail) : null
      ))
    )
  );
}
function rS({
  model: e,
  onClose: t = rd
}) {
  var o, i, l, s, c, m, p, d, h;
  const n = Y1(), r = e || n;
  if (!r) return null;
  const a = String(r.kind || "daily-summary").replace(/[^a-z0-9-]/gi, "").toLowerCase();
  return x(
    "section",
    { className: `woof-detail woof-detail--${a}`, "data-surface": "nutrition-detail", "aria-label": r.title },
    x(
      "header",
      { className: "woof-detail__header" },
      x(
        "div",
        { className: "woof-detail__header-copy" },
        x("div", { className: "woof-detail__eyebrow" }, r.summary),
        x("h2", { className: "woof-detail__title" }, r.title),
        x("p", { className: "woof-detail__subtitle" }, r.subtitle)
      ),
      x(
        "div",
        { className: "woof-detail__header-actions" },
        r.badge ? x(
          "div",
          { className: "woof-detail__badge" },
          x("span", { className: "woof-detail__badge-label" }, r.badge.label),
          x("span", { className: "woof-detail__badge-value" }, r.badge.value)
        ) : null,
        t !== rd ? x("button", {
          type: "button",
          className: "woof-detail__close-button",
          onClick: t,
          "aria-label": r.closeLabel,
          title: r.closeLabel
        }, "×") : null
      )
    ),
    x(
      Ar,
      {
        title: (o = r.reportSection) == null ? void 0 : o.title,
        summary: (i = r.reportSection) == null ? void 0 : i.summary,
        modifier: " woof-detail__section-block--hero"
      },
      x(
        "div",
        { className: `woof-detail__hero-grid${r.kind === "item-detail" ? " woof-detail__hero-grid--item" : ""}` },
        ...(r.heroStats || []).map((v) => x(Z1, {
          key: v.label,
          stat: v
        }))
      )
    ),
    x(
      Ar,
      {
        title: (l = r.macroSection) == null ? void 0 : l.title,
        summary: (s = r.macroSection) == null ? void 0 : s.summary
      },
      x(
        "div",
        { className: "woof-detail__macro-grid" },
        ...(((c = r.macroSection) == null ? void 0 : c.cards) || []).map((v) => x(J1, {
          key: v.field,
          card: v
        }))
      )
    ),
    r.compositionSection ? x(
      Ar,
      {
        title: r.compositionSection.title,
        summary: r.compositionSection.summary
      },
      x(tS, { section: r.compositionSection })
    ) : null,
    x(
      Ar,
      {
        title: (m = r.nutrientSection) == null ? void 0 : m.title,
        summary: (p = r.nutrientSection) == null ? void 0 : p.summary
      },
      x(eS, {
        rows: ((d = r.nutrientSection) == null ? void 0 : d.rows) || [],
        headers: ((h = r.nutrientSection) == null ? void 0 : h.headers) || ["Nutrient", "Value"]
      })
    ),
    x(nS, { panel: r.focusPanel })
  );
}
window.__woofReactHomeStatus = "bundle-loaded";
const aS = Object.freeze([
  "__woofUiBridge",
  "__woofAppStateBridge",
  "__woofDetailSurfaceBridge",
  "__woofAddBridge"
]), oS = 120;
let ad = 0;
function it() {
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
function iS() {
  return aS.every((e) => !!window[e]);
}
function lS() {
  const e = document.getElementById("home-react-root"), t = document.getElementById("view-daily");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-home-enabled"), Qt.createRoot(e).render(
        /* @__PURE__ */ u.jsx(ge.StrictMode, { children: /* @__PURE__ */ u.jsx(
          b0,
          {
            onQuickLog: () => it().openHomeLogModal(),
            onOpenAI: () => it().openAIView(),
            onOpenFavorites: () => it().openFavorites(),
            onSetSelectedDate: (n) => it().setSelectedDate(n),
            onShiftDate: (n) => it().shiftSelectedDate(n),
            onFavoriteMealItem: (n) => it().addRecordToFavorites(n),
            onDeleteMealItem: (n) => it().deleteMealRecord(n),
            onOpenRhythm: () => it().openRhythmView(),
            onOpenDailySummary: () => it().openDailySummaryDetail()
          }
        ) })
      ), window.__woofReactHomeStatus = "mounted";
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-home-enabled"), window.__woofReactHomeStatus = "failed", window.__woofReactHomeError = String((n == null ? void 0 : n.stack) || n || "Unknown React home mount error"), console.error("React home mount failed", n);
    }
}
function sS() {
  const e = document.getElementById("detail-react-root");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", Qt.createRoot(e).render(
        /* @__PURE__ */ u.jsx(ge.StrictMode, { children: /* @__PURE__ */ u.jsx(rS, { onClose: () => it().closeDetailModal() }) })
      );
    } catch (t) {
      e.dataset.mounted = "false", console.error("React detail surface mount failed", t);
    }
}
function uS() {
  const e = document.getElementById("history-react-root"), t = document.getElementById("view-history");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-history-enabled"), Qt.createRoot(e).render(
        /* @__PURE__ */ u.jsx(ge.StrictMode, { children: /* @__PURE__ */ u.jsx(q0, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-history-enabled"), console.error("React history mount failed", n);
    }
}
function cS() {
  const e = document.getElementById("add-react-root"), t = document.getElementById("view-add");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-add-enabled"), Qt.createRoot(e).render(
        /* @__PURE__ */ u.jsx(ge.StrictMode, { children: /* @__PURE__ */ u.jsx(W0, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-add-enabled"), console.error("React add shell mount failed", n);
    }
}
function dS() {
  const e = document.getElementById("stats-react-root"), t = document.getElementById("view-stats");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-stats-enabled"), Qt.createRoot(e).render(
        /* @__PURE__ */ u.jsx(ge.StrictMode, { children: /* @__PURE__ */ u.jsx(F1, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-stats-enabled"), console.error("React stats mount failed", n);
    }
}
function fS() {
  const e = document.getElementById("profile-react-root"), t = document.getElementById("view-profile");
  if (!(!e || e.dataset.mounted === "true"))
    try {
      e.dataset.mounted = "true", t == null || t.classList.add("react-profile-enabled"), Qt.createRoot(e).render(
        /* @__PURE__ */ u.jsx(ge.StrictMode, { children: /* @__PURE__ */ u.jsx(n1, {}) })
      );
    } catch (n) {
      e.dataset.mounted = "false", t == null || t.classList.remove("react-profile-enabled"), console.error("React profile mount failed", n);
    }
}
function Za() {
  if (!iS() && ad < oS) {
    ad += 1, window.__woofReactHomeStatus = "waiting-for-bridge", window.requestAnimationFrame(Za);
    return;
  }
  lS(), cS(), uS(), dS(), fS(), sS();
}
const mS = !!(document.getElementById("home-react-root") || document.getElementById("add-react-root") || document.getElementById("history-react-root") || document.getElementById("stats-react-root") || document.getElementById("profile-react-root") || document.getElementById("detail-react-root"));
mS ? Za() : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Za, { once: !0 }) : Za();
