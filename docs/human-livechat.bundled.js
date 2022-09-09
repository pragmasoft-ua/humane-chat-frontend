/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window,
  i =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  s = Symbol(),
  e = new WeakMap();
class n {
  constructor(t, i, e) {
    if (((this._$cssResult$ = !0), e !== s))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    (this.cssText = t), (this.t = i);
  }
  get styleSheet() {
    let t = this.o;
    const s = this.t;
    if (i && void 0 === t) {
      const i = void 0 !== s && 1 === s.length;
      i && (t = e.get(s)),
        void 0 === t &&
          ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText),
          i && e.set(s, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
}
const o = i
  ? (t) => t
  : (t) =>
      t instanceof CSSStyleSheet
        ? ((t) => {
            let i = '';
            for (const s of t.cssRules) i += s.cssText;
            return ((t) => new n('string' == typeof t ? t : t + '', void 0, s))(
              i
            );
          })(t)
        : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var h;
const r = window,
  l = r.trustedTypes,
  u = l ? l.emptyScript : '',
  c = r.reactiveElementPolyfillSupport,
  a = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? u : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, i) {
      let s = t;
      switch (i) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  d = (t, i) => i !== t && (i == i || t == t),
  v = {attribute: !0, type: String, converter: a, reflect: !1, hasChanged: d};
class f extends HTMLElement {
  constructor() {
    super(),
      (this._$Ei = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$El = null),
      this.u();
  }
  static addInitializer(t) {
    var i;
    (null !== (i = this.h) && void 0 !== i) || (this.h = []), this.h.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this._$Ep(s, i);
        void 0 !== e && (this._$Ev.set(e, s), t.push(e));
      }),
      t
    );
  }
  static createProperty(t, i = v) {
    if (
      (i.state && (i.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, i),
      !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },
      set(e) {
        const n = this[t];
        (this[i] = e), this.requestUpdate(t, n, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || v;
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Ev = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        i = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const s of i) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const i = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) i.unshift(o(t));
    } else void 0 !== t && i.push(o(t));
    return i;
  }
  static _$Ep(t, i) {
    const s = i.attribute;
    return !1 === s
      ? void 0
      : 'string' == typeof s
      ? s
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  u() {
    var t;
    (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Eg(),
      this.requestUpdate(),
      null === (t = this.constructor.h) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var i, s;
    (null !== (i = this._$ES) && void 0 !== i ? i : (this._$ES = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var i;
    null === (i = this._$ES) ||
      void 0 === i ||
      i.splice(this._$ES.indexOf(t) >>> 0, 1);
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[i]), delete this[i]);
    });
  }
  createRenderRoot() {
    var s;
    const e =
      null !== (s = this.shadowRoot) && void 0 !== s
        ? s
        : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((s, e) => {
        i
          ? (s.adoptedStyleSheets = e.map((t) =>
              t instanceof CSSStyleSheet ? t : t.styleSheet
            ))
          : e.forEach((i) => {
              const e = document.createElement('style'),
                n = t.litNonce;
              void 0 !== n && e.setAttribute('nonce', n),
                (e.textContent = i.cssText),
                s.appendChild(e);
            });
      })(e, this.constructor.elementStyles),
      e
    );
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$ES) ||
        void 0 === t ||
        t.forEach((t) => {
          var i;
          return null === (i = t.hostConnected) || void 0 === i
            ? void 0
            : i.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((t) => {
        var i;
        return null === (i = t.hostDisconnected) || void 0 === i
          ? void 0
          : i.call(t);
      });
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s);
  }
  _$EO(t, i, s = v) {
    var e;
    const n = this.constructor._$Ep(t, s);
    if (void 0 !== n && !0 === s.reflect) {
      const o = (
        void 0 !==
        (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute)
          ? s.converter
          : a
      ).toAttribute(i, s.type);
      (this._$El = t),
        null == o ? this.removeAttribute(n) : this.setAttribute(n, o),
        (this._$El = null);
    }
  }
  _$AK(t, i) {
    var s;
    const e = this.constructor,
      n = e._$Ev.get(t);
    if (void 0 !== n && this._$El !== n) {
      const t = e.getPropertyOptions(n),
        o =
          'function' == typeof t.converter
            ? {fromAttribute: t.converter}
            : void 0 !==
              (null === (s = t.converter) || void 0 === s
                ? void 0
                : s.fromAttribute)
            ? t.converter
            : a;
      (this._$El = n),
        (this[n] = o.fromAttribute(i, t.type)),
        (this._$El = null);
    }
  }
  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || d)(
        this[t],
        i
      )
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect &&
            this._$El !== t &&
            (void 0 === this._$EC && (this._$EC = new Map()),
            this._$EC.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._$E_ = this._$Ej());
  }
  async _$Ej() {
    this.isUpdatePending = !0;
    try {
      await this._$E_;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Ei &&
        (this._$Ei.forEach((t, i) => (this[i] = t)), (this._$Ei = void 0));
    let i = !1;
    const s = this._$AL;
    try {
      (i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this._$ES) ||
              void 0 === t ||
              t.forEach((t) => {
                var i;
                return null === (i = t.hostUpdate) || void 0 === i
                  ? void 0
                  : i.call(t);
              }),
            this.update(s))
          : this._$Ek();
    } catch (t) {
      throw ((i = !1), this._$Ek(), t);
    }
    i && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var i;
    null === (i = this._$ES) ||
      void 0 === i ||
      i.forEach((t) => {
        var i;
        return null === (i = t.hostUpdated) || void 0 === i
          ? void 0
          : i.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$Ek() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$E_;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$EC &&
      (this._$EC.forEach((t, i) => this._$EO(i, this[i], t)),
      (this._$EC = void 0)),
      this._$Ek();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var p;
(f.finalized = !0),
  (f.elementProperties = new Map()),
  (f.elementStyles = []),
  (f.shadowRootOptions = {mode: 'open'}),
  null == c || c({ReactiveElement: f}),
  (null !== (h = r.reactiveElementVersions) && void 0 !== h
    ? h
    : (r.reactiveElementVersions = [])
  ).push('1.4.1');
const y = window,
  g = y.trustedTypes,
  b = g ? g.createPolicy('lit-html', {createHTML: (t) => t}) : void 0,
  m = `lit$${(Math.random() + '').slice(9)}$`,
  w = '?' + m,
  $ = `<${w}>`,
  S = document,
  C = (t = '') => S.createComment(t),
  A = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  _ = Array.isArray,
  k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  E = /-->/g,
  x = />/g,
  U = RegExp(
    '>|[ \t\n\f\r](?:([^\\s"\'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r"\'`<>=]|("|\')|))|$)',
    'g'
  ),
  O = /'/g,
  M = /"/g,
  T = /^(?:script|style|textarea|title)$/i,
  j = (
    (t) =>
    (i, ...s) => ({_$litType$: t, strings: i, values: s})
  )(1),
  N = Symbol.for('lit-noChange'),
  R = Symbol.for('lit-nothing'),
  P = new WeakMap(),
  z = S.createTreeWalker(S, 129, null, !1),
  I = (t, i) => {
    const s = t.length - 1,
      e = [];
    let n,
      o = 2 === i ? '<svg>' : '',
      h = k;
    for (let i = 0; i < s; i++) {
      const s = t[i];
      let r,
        l,
        u = -1,
        c = 0;
      for (; c < s.length && ((h.lastIndex = c), (l = h.exec(s)), null !== l); )
        (c = h.lastIndex),
          h === k
            ? '!--' === l[1]
              ? (h = E)
              : void 0 !== l[1]
              ? (h = x)
              : void 0 !== l[2]
              ? (T.test(l[2]) && (n = RegExp('</' + l[2], 'g')), (h = U))
              : void 0 !== l[3] && (h = U)
            : h === U
            ? '>' === l[0]
              ? ((h = null != n ? n : k), (u = -1))
              : void 0 === l[1]
              ? (u = -2)
              : ((u = h.lastIndex - l[2].length),
                (r = l[1]),
                (h = void 0 === l[3] ? U : '"' === l[3] ? M : O))
            : h === M || h === O
            ? (h = U)
            : h === E || h === x
            ? (h = k)
            : ((h = U), (n = void 0));
      const a = h === U && t[i + 1].startsWith('/>') ? ' ' : '';
      o +=
        h === k
          ? s + $
          : u >= 0
          ? (e.push(r), s.slice(0, u) + '$lit$' + s.slice(u) + m + a)
          : s + m + (-2 === u ? (e.push(void 0), i) : a);
    }
    const r = o + (t[s] || '<?>') + (2 === i ? '</svg>' : '');
    if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
      throw Error('invalid template strings array');
    return [void 0 !== b ? b.createHTML(r) : r, e];
  };
class H {
  constructor({strings: t, _$litType$: i}, s) {
    let e;
    this.parts = [];
    let n = 0,
      o = 0;
    const h = t.length - 1,
      r = this.parts,
      [l, u] = I(t, i);
    if (
      ((this.el = H.createElement(l, s)),
      (z.currentNode = this.el.content),
      2 === i)
    ) {
      const t = this.el.content,
        i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }
    for (; null !== (e = z.nextNode()) && r.length < h; ) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          const t = [];
          for (const i of e.getAttributeNames())
            if (i.endsWith('$lit$') || i.startsWith(m)) {
              const s = u[o++];
              if ((t.push(i), void 0 !== s)) {
                const t = e.getAttribute(s.toLowerCase() + '$lit$').split(m),
                  i = /([.?@])?(.*)/.exec(s);
                r.push({
                  type: 1,
                  index: n,
                  name: i[2],
                  strings: t,
                  ctor:
                    '.' === i[1] ? J : '?' === i[1] ? Z : '@' === i[1] ? q : D,
                });
              } else r.push({type: 6, index: n});
            }
          for (const i of t) e.removeAttribute(i);
        }
        if (T.test(e.tagName)) {
          const t = e.textContent.split(m),
            i = t.length - 1;
          if (i > 0) {
            e.textContent = g ? g.emptyScript : '';
            for (let s = 0; s < i; s++)
              e.append(t[s], C()), z.nextNode(), r.push({type: 2, index: ++n});
            e.append(t[i], C());
          }
        }
      } else if (8 === e.nodeType)
        if (e.data === w) r.push({type: 2, index: n});
        else {
          let t = -1;
          for (; -1 !== (t = e.data.indexOf(m, t + 1)); )
            r.push({type: 7, index: n}), (t += m.length - 1);
        }
      n++;
    }
  }
  static createElement(t, i) {
    const s = S.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function L(t, i, s = t, e) {
  var n, o, h, r;
  if (i === N) return i;
  let l =
    void 0 !== e
      ? null === (n = s._$Cl) || void 0 === n
        ? void 0
        : n[e]
      : s._$Cu;
  const u = A(i) ? void 0 : i._$litDirective$;
  return (
    (null == l ? void 0 : l.constructor) !== u &&
      (null === (o = null == l ? void 0 : l._$AO) ||
        void 0 === o ||
        o.call(l, !1),
      void 0 === u ? (l = void 0) : ((l = new u(t)), l._$AT(t, s, e)),
      void 0 !== e
        ? ((null !== (h = (r = s)._$Cl) && void 0 !== h ? h : (r._$Cl = []))[
            e
          ] = l)
        : (s._$Cu = l)),
    void 0 !== l && (i = L(t, l._$AS(t, i.values), l, e)),
    i
  );
}
class W {
  constructor(t, i) {
    (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var i;
    const {
        el: {content: s},
        parts: e,
      } = this._$AD,
      n = (
        null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i
          ? i
          : S
      ).importNode(s, !0);
    z.currentNode = n;
    let o = z.nextNode(),
      h = 0,
      r = 0,
      l = e[0];
    for (; void 0 !== l; ) {
      if (h === l.index) {
        let i;
        2 === l.type
          ? (i = new B(o, o.nextSibling, this, t))
          : 1 === l.type
          ? (i = new l.ctor(o, l.name, l.strings, this, t))
          : 6 === l.type && (i = new V(o, this, t)),
          this.v.push(i),
          (l = e[++r]);
      }
      h !== (null == l ? void 0 : l.index) && ((o = z.nextNode()), h++);
    }
    return n;
  }
  m(t) {
    let i = 0;
    for (const s of this.v)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, i), (i += s.strings.length - 2))
          : s._$AI(t[i])),
        i++;
  }
}
class B {
  constructor(t, i, s, e) {
    var n;
    (this.type = 2),
      (this._$AH = R),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = i),
      (this._$AM = s),
      (this.options = e),
      (this._$C_ =
        null === (n = null == e ? void 0 : e.isConnected) || void 0 === n || n);
  }
  get _$AU() {
    var t, i;
    return null !==
      (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== i
      ? i
      : this._$C_;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const i = this._$AM;
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, i = this) {
    (t = L(this, t, i)),
      A(t)
        ? t === R || null == t || '' === t
          ? (this._$AH !== R && this._$AR(), (this._$AH = R))
          : t !== this._$AH && t !== N && this.$(t)
        : void 0 !== t._$litType$
        ? this.T(t)
        : void 0 !== t.nodeType
        ? this.k(t)
        : ((t) =>
            _(t) ||
            'function' == typeof (null == t ? void 0 : t[Symbol.iterator]))(t)
        ? this.O(t)
        : this.$(t);
  }
  S(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i);
  }
  k(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.S(t)));
  }
  $(t) {
    this._$AH !== R && A(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.k(S.createTextNode(t)),
      (this._$AH = t);
  }
  T(t) {
    var i;
    const {values: s, _$litType$: e} = t,
      n =
        'number' == typeof e
          ? this._$AC(t)
          : (void 0 === e.el && (e.el = H.createElement(e.h, this.options)), e);
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === n)
      this._$AH.m(s);
    else {
      const t = new W(n, this),
        i = t.p(this.options);
      t.m(s), this.k(i), (this._$AH = t);
    }
  }
  _$AC(t) {
    let i = P.get(t.strings);
    return void 0 === i && P.set(t.strings, (i = new H(t))), i;
  }
  O(t) {
    _(this._$AH) || ((this._$AH = []), this._$AR());
    const i = this._$AH;
    let s,
      e = 0;
    for (const n of t)
      e === i.length
        ? i.push((s = new B(this.S(C()), this.S(C()), this, this.options)))
        : (s = i[e]),
        s._$AI(n),
        e++;
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e));
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s;
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i);
      t && t !== this._$AB;

    ) {
      const i = t.nextSibling;
      t.remove(), (t = i);
    }
  }
  setConnected(t) {
    var i;
    void 0 === this._$AM &&
      ((this._$C_ = t),
      null === (i = this._$AP) || void 0 === i || i.call(this, t));
  }
}
class D {
  constructor(t, i, s, e, n) {
    (this.type = 1),
      (this._$AH = R),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = n),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = R);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, i = this, s, e) {
    const n = this.strings;
    let o = !1;
    if (void 0 === n)
      (t = L(this, t, i, 0)),
        (o = !A(t) || (t !== this._$AH && t !== N)),
        o && (this._$AH = t);
    else {
      const e = t;
      let h, r;
      for (t = n[0], h = 0; h < n.length - 1; h++)
        (r = L(this, e[s + h], i, h)),
          r === N && (r = this._$AH[h]),
          o || (o = !A(r) || r !== this._$AH[h]),
          r === R ? (t = R) : t !== R && (t += (null != r ? r : '') + n[h + 1]),
          (this._$AH[h] = r);
    }
    o && !e && this.P(t);
  }
  P(t) {
    t === R
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '');
  }
}
class J extends D {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  P(t) {
    this.element[this.name] = t === R ? void 0 : t;
  }
}
const K = g ? g.emptyScript : '';
class Z extends D {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  P(t) {
    t && t !== R
      ? this.element.setAttribute(this.name, K)
      : this.element.removeAttribute(this.name);
  }
}
class q extends D {
  constructor(t, i, s, e, n) {
    super(t, i, s, e, n), (this.type = 5);
  }
  _$AI(t, i = this) {
    var s;
    if ((t = null !== (s = L(this, t, i, 0)) && void 0 !== s ? s : R) === N)
      return;
    const e = this._$AH,
      n =
        (t === R && e !== R) ||
        t.capture !== e.capture ||
        t.once !== e.once ||
        t.passive !== e.passive,
      o = t !== R && (e === R || n);
    n && this.element.removeEventListener(this.name, this, e),
      o && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var i, s;
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (i = this.options) || void 0 === i ? void 0 : i.host) &&
            void 0 !== s
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class V {
  constructor(t, i, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = i),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    L(this, t);
  }
}
const F = y.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G, Q;
null == F || F(H, B),
  (null !== (p = y.litHtmlVersions) && void 0 !== p
    ? p
    : (y.litHtmlVersions = [])
  ).push('2.3.1');
class X extends f {
  constructor() {
    super(...arguments),
      (this.renderOptions = {host: this}),
      (this._$Do = void 0);
  }
  createRenderRoot() {
    var t, i;
    const s = super.createRenderRoot();
    return (
      (null !== (t = (i = this.renderOptions).renderBefore) && void 0 !== t) ||
        (i.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const i = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = ((t, i, s) => {
        var e, n;
        const o =
          null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e
            ? e
            : i;
        let h = o._$litPart$;
        if (void 0 === h) {
          const t =
            null !== (n = null == s ? void 0 : s.renderBefore) && void 0 !== n
              ? n
              : null;
          o._$litPart$ = h = new B(
            i.insertBefore(C(), t),
            t,
            void 0,
            null != s ? s : {}
          );
        }
        return h._$AI(t), h;
      })(i, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this._$Do) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this._$Do) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return N;
  }
}
(X.finalized = !0),
  (X._$litElement$ = !0),
  null === (G = globalThis.litElementHydrateSupport) ||
    void 0 === G ||
    G.call(globalThis, {LitElement: X});
const Y = globalThis.litElementPolyfillSupport;
null == Y || Y({LitElement: X}),
  (null !== (Q = globalThis.litElementVersions) && void 0 !== Q
    ? Q
    : (globalThis.litElementVersions = [])
  ).push('3.2.2');
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = (t, i) =>
  'method' === i.kind && i.descriptor && !('value' in i.descriptor)
    ? {
        ...i,
        finisher(s) {
          s.createProperty(i.key, t);
        },
      }
    : {
        kind: 'field',
        key: Symbol(),
        placement: 'own',
        descriptor: {},
        originalKey: i.key,
        initializer() {
          'function' == typeof i.initializer &&
            (this[i.key] = i.initializer.call(this));
        },
        finisher(s) {
          s.createProperty(i.key, t);
        },
      };
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function it(t) {
  return (i, s) =>
    void 0 !== s
      ? ((t, i, s) => {
          i.constructor.createProperty(s, t);
        })(t, i, s)
      : tt(t, i);
  /**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
}
var st;
null === (st = window.HTMLSlotElement) ||
  void 0 === st ||
  st.prototype.assignedElements;
const et = ((t, ...i) => {
  const e =
    1 === t.length
      ? t[0]
      : i.reduce(
          (i, s, e) =>
            i +
            ((t) => {
              if (!0 === t._$cssResult$) return t.cssText;
              if ('number' == typeof t) return t;
              throw Error(
                "Value passed to 'css' function must be a 'css' function result: " +
                  t +
                  ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
              );
            })(s) +
            t[e + 1],
          t[0]
        );
  return new n(e, t, s);
})`
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
`;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var nt = function (t, i, s, e) {
  for (
    var n,
      o = arguments.length,
      h =
        o < 3
          ? i
          : null === e
          ? (e = Object.getOwnPropertyDescriptor(i, s))
          : e,
      r = t.length - 1;
    r >= 0;
    r--
  )
    (n = t[r]) && (h = (o < 3 ? n(h) : o > 3 ? n(i, s, h) : n(i, s)) || h);
  return o > 3 && h && Object.defineProperty(i, s, h), h;
};
let ot = class extends X {
  constructor() {
    super(...arguments), (this.name = 'World'), (this.count = 0);
  }
  render() {
    return j`
      <h1>${this.sayHello(this.name)}!</h1>
      <button @click=${this._onClick} part="button">
        Click Count: ${this.count}
      </button>
      <slot></slot>
    `;
  }
  _onClick() {
    this.count++, this.dispatchEvent(new CustomEvent('count-changed'));
  }
  sayHello(t) {
    return `Hello, ${t}`;
  }
};
(ot.styles = et),
  nt([it()], ot.prototype, 'name', void 0),
  nt([it({type: Number})], ot.prototype, 'count', void 0),
  (ot = nt(
    [
      (
        (t) => (i) =>
          'function' == typeof i
            ? ((t, i) => (customElements.define(t, i), i))(t, i)
            : ((t, i) => {
                const {kind: s, elements: e} = i;
                return {
                  kind: s,
                  elements: e,
                  finisher(i) {
                    customElements.define(t, i);
                  },
                };
              })(t, i)
      )('humane-chat'),
    ],
    ot
  ));
export {ot as MyElement};
