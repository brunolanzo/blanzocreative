/* @ds-bundle: {"format":4,"namespace":"BlanzoDesignSystem_58a5f6","components":[{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Marquee","sourcePath":"components/brand/Marquee.jsx"},{"name":"ServiceRow","sourcePath":"components/content/ServiceRow.jsx"},{"name":"StatBlock","sourcePath":"components/content/StatBlock.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Display","sourcePath":"components/core/Display.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Field","sourcePath":"components/core/Field.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"ProjectTile","sourcePath":"components/media/ProjectTile.jsx"},{"name":"VideoFrame","sourcePath":"components/media/VideoFrame.jsx"}],"sourceHashes":{"components/brand/Logo.jsx":"8fb2211ee371","components/brand/Marquee.jsx":"1e95f737941c","components/content/ServiceRow.jsx":"afc83c5135c4","components/content/StatBlock.jsx":"0090d0ae9b05","components/core/Button.jsx":"2e5812ac9905","components/core/Display.jsx":"9655a869b803","components/core/Eyebrow.jsx":"f69a7e594027","components/core/Field.jsx":"d775727e023d","components/core/Tag.jsx":"3dd7a56c9502","components/media/ProjectTile.jsx":"229d0efc0863","components/media/VideoFrame.jsx":"a78dcca72ade","ui_kits/studio-site/AboutContact.jsx":"dfa9aeb811ba","ui_kits/studio-site/Chrome.jsx":"bd2973c659ab","ui_kits/studio-site/HomeScreen.jsx":"5b99cb9a44e3","ui_kits/studio-site/WorkScreens.jsx":"69a785dd87f3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.BlanzoDesignSystem_58a5f6 = window.BlanzoDesignSystem_58a5f6 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Logo.jsx
try { (() => {
function Logo({
  variant = "wordmark",
  theme = "light-on-dark",
  height = 32,
  animated = false,
  base = ".",
  style
}) {
  const white = theme === "light-on-dark";
  if (animated) {
    const src = variant === "wordmark" ? `${base}/assets/motion/logo-full-animated.mp4` : `${base}/assets/motion/logo-short-animated.mp4`;
    return /*#__PURE__*/React.createElement("video", {
      src: src,
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
      style: {
        height,
        width: "auto",
        mixBlendMode: white ? "screen" : "multiply",
        ...style
      }
    });
  }
  const files = {
    wordmark: white ? "wordmark-white.png" : "wordmark-black.png",
    monogram: white ? "monogram-white.png" : "monogram-black.png",
    badge: "badge-black.png"
  };
  return /*#__PURE__*/React.createElement("img", {
    src: `${base}/assets/logo/${files[variant] || files.wordmark}`,
    alt: "Blanzo",
    style: {
      height,
      width: "auto",
      ...style
    }
  });
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Marquee.jsx
try { (() => {
function Marquee({
  items = [],
  speed = 28,
  separator = "✳",
  accentEvery = 0,
  size = "var(--size-display-m)"
}) {
  const run = [...items, ...items];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "hidden",
      width: "100%",
      borderTop: "1px solid var(--border-hairline)",
      borderBottom: "1px solid var(--border-hairline)",
      padding: "var(--space-4) 0"
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes blanzo-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-6)",
      width: "max-content",
      animation: `blanzo-marquee ${speed}s linear infinite`
    }
  }, run.map((item, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: size,
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-display)",
      textTransform: "lowercase",
      lineHeight: 1,
      color: accentEvery && (i + 1) % accentEvery === 0 ? "var(--flash-500)" : "var(--text-primary)",
      whiteSpace: "nowrap"
    }
  }, item), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "1rem",
      color: "var(--text-muted)"
    }
  }, separator)))));
}
Object.assign(__ds_scope, { Marquee });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Marquee.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceRow.jsx
try { (() => {
function ServiceRow({
  index,
  title,
  description,
  tags = [],
  open = false,
  onToggle
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onToggle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      borderTop: "1px solid var(--border-hairline)",
      padding: "var(--space-5) 0",
      cursor: onToggle ? "pointer" : "default"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "56px 1fr auto",
      alignItems: "baseline",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-label)",
      letterSpacing: "var(--tracking-label)",
      color: hover || open ? "var(--flash-500)" : "var(--text-muted)",
      fontVariantNumeric: "tabular-nums",
      transition: "color var(--dur-fast) var(--ease-out)"
    }
  }, index), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-h2)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-heading)",
      textTransform: "lowercase",
      color: hover || open ? "var(--flash-500)" : "var(--text-primary)",
      transition: "color var(--dur-fast) var(--ease-out)"
    }
  }, title), onToggle && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-h3)",
      color: hover || open ? "var(--flash-500)" : "var(--text-muted)",
      transform: open ? "rotate(45deg)" : "none",
      transition: "transform var(--dur-base) var(--ease-draw), color var(--dur-fast) var(--ease-out)",
      lineHeight: 1
    }
  }, "+")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "56px 1fr",
      gap: "var(--space-4)",
      maxHeight: open ? 320 : 0,
      opacity: open ? 1 : 0,
      overflow: "hidden",
      transition: "max-height var(--dur-base) var(--ease-draw), opacity var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: "var(--space-4)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "var(--maxw-prose)",
      color: "var(--text-secondary)",
      fontSize: "var(--size-body-l)"
    }
  }, description), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      padding: "6px 14px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--border-hairline)",
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, t))))));
}
Object.assign(__ds_scope, { ServiceRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceRow.jsx", error: String((e && e.message) || e) }); }

// components/content/StatBlock.jsx
try { (() => {
function StatBlock({
  value,
  label,
  accent = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-display-m)",
      fontWeight: "var(--weight-medium)",
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tracking-display)",
      color: accent ? "var(--flash-500)" : "var(--text-primary)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    padding: "8px 16px",
    fontSize: "var(--size-label-s)",
    letterSpacing: "var(--tracking-label)"
  },
  md: {
    padding: "13px 26px",
    fontSize: "var(--size-label)",
    letterSpacing: "var(--tracking-label)"
  },
  lg: {
    padding: "18px 36px",
    fontSize: "0.8125rem",
    letterSpacing: "var(--tracking-label)"
  }
};
const variants = {
  primary: {
    background: "var(--paper)",
    color: "var(--ink-1000)",
    border: "1px solid var(--paper)"
  },
  accent: {
    background: "var(--flash-500)",
    color: "var(--paper)",
    border: "1px solid var(--flash-500)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid var(--border-strong)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid transparent"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled = false,
  full = false,
  onClick,
  ...rest
}) {
  const Tag = href ? "a" : "button";
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = variants[variant] || variants.primary;
  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "var(--space-2)",
    width: full ? "100%" : "auto",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--weight-medium)",
    textTransform: "uppercase",
    borderRadius: "var(--radius-pill)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.35 : 1,
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: "background var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), transform var(--dur-instant) var(--ease-out)",
    transform: press && !disabled ? "scale(.97)" : "scale(1)",
    ...sizes[size],
    ...v
  };
  if (hover && !disabled) {
    if (variant === "primary") Object.assign(style, {
      background: "var(--flash-500)",
      color: "var(--paper)",
      borderColor: "var(--flash-500)"
    });
    if (variant === "accent") Object.assign(style, {
      background: "var(--flash-400)",
      borderColor: "var(--flash-400)"
    });
    if (variant === "outline") Object.assign(style, {
      borderColor: "var(--paper)"
    });
    if (variant === "ghost") Object.assign(style, {
      color: "var(--flash-500)"
    });
  }
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    onClick: disabled ? undefined : onClick,
    disabled: Tag === "button" ? disabled : undefined,
    style: style,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, rest), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Display.jsx
try { (() => {
const sizes = {
  xl: "var(--size-display-xl)",
  l: "var(--size-display-l)",
  m: "var(--size-display-m)"
};
function Display({
  children,
  size = "l",
  as = "h1",
  accent,
  style
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    style: {
      margin: 0,
      fontFamily: "var(--font-sans)",
      fontWeight: "var(--weight-medium)",
      fontSize: sizes[size] || sizes.l,
      lineHeight: "var(--lh-display)",
      letterSpacing: "var(--tracking-display)",
      textTransform: "lowercase",
      color: "var(--text-primary)",
      ...style
    }
  }, children, accent && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--flash-500)"
    }
  }, "."));
}
Object.assign(__ds_scope, { Display });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Display.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function Eyebrow({
  children,
  accent = false,
  index,
  as = "div",
  style
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-3)",
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      lineHeight: "var(--lh-label)",
      color: accent ? "var(--flash-500)" : "var(--text-muted)",
      ...style
    }
  }, index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent ? "var(--flash-500)" : "var(--text-muted)",
      fontVariantNumeric: "tabular-nums"
    }
  }, index), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 24,
      height: 1,
      background: "currentColor",
      opacity: .5
    }
  }), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Field.jsx
try { (() => {
function Field({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  rows,
  required,
  hint,
  id
}) {
  const [focus, setFocus] = React.useState(false);
  const Tag = rows ? "textarea" : "input";
  const inputStyle = {
    width: "100%",
    background: "transparent",
    color: "var(--text-primary)",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--size-body-l)",
    lineHeight: "var(--lh-body)",
    border: "none",
    borderBottom: `1px solid ${focus ? "var(--flash-500)" : "var(--border-hairline)"}`,
    padding: "10px 0 12px",
    outline: "none",
    resize: "vertical",
    transition: "border-color var(--dur-fast) var(--ease-out)"
  };
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-sans)",
      fontSize: "var(--size-label-s)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: focus ? "var(--flash-500)" : "var(--text-muted)",
      transition: "color var(--dur-fast) var(--ease-out)"
    }
  }, label, required && " *"), /*#__PURE__*/React.createElement(Tag, {
    id: id,
    type: rows ? undefined : type,
    rows: rows,
    placeholder: placeholder,
    value: value,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: inputStyle
  }), hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-body-s)",
      color: "var(--text-muted)"
    }
  }, hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Field.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  tone = "default",
  size = "md"
}) {
  const tones = {
    default: {
      color: "var(--text-secondary)",
      border: "1px solid var(--border-hairline)",
      background: "transparent"
    },
    accent: {
      color: "var(--flash-500)",
      border: "1px solid var(--flash-500)",
      background: "transparent"
    },
    solid: {
      color: "var(--ink-1000)",
      border: "1px solid var(--paper)",
      background: "var(--paper)"
    }
  };
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      padding: size === "sm" ? "4px 10px" : "6px 14px",
      fontFamily: "var(--font-sans)",
      fontSize: size === "sm" ? "var(--size-label-s)" : "var(--size-label)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      lineHeight: "var(--lh-label)",
      borderRadius: "var(--radius-pill)",
      ...tones[tone]
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/media/ProjectTile.jsx
try { (() => {
function ProjectTile({
  title,
  client,
  year,
  tags = [],
  ratio = "16 / 9",
  poster,
  video,
  onClick,
  index
}) {
  const [hover, setHover] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (hover) {
      v.play?.().catch(() => {});
    } else {
      v.pause?.();
      v.currentTime = 0;
    }
  }, [hover]);
  return /*#__PURE__*/React.createElement("a", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: "block",
      cursor: "pointer",
      textDecoration: "none",
      border: "none",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      overflow: "hidden",
      background: "var(--ink-800)",
      borderRadius: "var(--radius-md)"
    }
  }, poster && /*#__PURE__*/React.createElement("img", {
    src: poster,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transition: "transform var(--dur-slow) var(--ease-out), opacity var(--dur-base) var(--ease-out)",
      transform: hover ? "scale(1.04)" : "scale(1)",
      opacity: hover && video ? 0 : 1
    }
  }), video && /*#__PURE__*/React.createElement("video", {
    ref: ref,
    src: video,
    muted: true,
    loop: true,
    playsInline: true,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: hover ? 1 : 0,
      transition: "opacity var(--dur-base) var(--ease-out)"
    }
  }), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: "var(--space-4)",
      left: "var(--space-4)",
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--paper)",
      mixBlendMode: "difference",
      fontVariantNumeric: "tabular-nums"
    }
  }, index)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-h3)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-heading)",
      textTransform: "lowercase",
      color: hover ? "var(--flash-500)" : "var(--text-primary)",
      transition: "color var(--dur-fast) var(--ease-out)"
    }
  }, title), client && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-body-s)",
      color: "var(--text-muted)"
    }
  }, client)), year && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      color: "var(--text-muted)",
      fontVariantNumeric: "tabular-nums"
    }
  }, year)), tags.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      marginTop: "var(--space-3)"
    }
  }, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      padding: "4px 10px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid var(--border-hairline)",
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-secondary)"
    }
  }, t))));
}
Object.assign(__ds_scope, { ProjectTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/ProjectTile.jsx", error: String((e && e.message) || e) }); }

// components/media/VideoFrame.jsx
try { (() => {
function VideoFrame({
  src,
  poster,
  ratio = "16 / 9",
  caption,
  autoPlay = true,
  loop = true,
  controls = false,
  fullBleed = false
}) {
  const ref = React.useRef(null);
  const [playing, setPlaying] = React.useState(autoPlay);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: ratio,
      background: "var(--ink-1000)",
      overflow: "hidden",
      borderRadius: fullBleed ? 0 : "var(--radius-md)"
    }
  }, /*#__PURE__*/React.createElement("video", {
    ref: ref,
    src: src,
    poster: poster,
    autoPlay: autoPlay,
    muted: true,
    loop: loop,
    playsInline: true,
    controls: controls,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), !controls && /*#__PURE__*/React.createElement("button", {
    onClick: toggle,
    "aria-label": playing ? "Pause" : "Play",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      background: "transparent",
      border: "none",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: "var(--space-4)",
      right: "var(--space-4)",
      padding: "8px 16px",
      borderRadius: "var(--radius-pill)",
      border: "1px solid rgba(255,255,255,.4)",
      color: "var(--paper)",
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      backdropFilter: "blur(8px)"
    }
  }, playing ? "pause" : "play"))), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontSize: "var(--size-body-s)",
      color: "var(--text-muted)"
    }
  }, caption));
}
Object.assign(__ds_scope, { VideoFrame });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/media/VideoFrame.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-site/AboutContact.jsx
try { (() => {
function AboutScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-9) var(--gutter-page) var(--section-y)",
      display: "grid",
      gridTemplateColumns: "minmax(0,1.4fr) minmax(280px,1fr)",
      gap: "var(--space-8)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    index: "\u2014"
  }, "about"), /*#__PURE__*/React.createElement(Display, {
    size: "l"
  }, "a generalist, on purpose", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--flash-500)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "var(--maxw-prose)",
      fontSize: "var(--size-body-l)"
    }
  }, "I started in motion design and never stopped moving outward. Today I take briefs from the first sketch to the final grade \u2014 sometimes alone at a keyframe, sometimes directing a crew."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "var(--maxw-prose)",
      color: "var(--text-secondary)"
    }
  }, "The logo says it before I do: one line, two letters, no lift of the pen. That's how I like to work \u2014 continuous, from idea to delivery, without the brief being re-explained four times."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap",
      marginTop: "var(--space-2)"
    }
  }, ["motion design", "art direction", "3d", "shooting", "edit", "grade", "sound"].map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t)))), /*#__PURE__*/React.createElement("video", {
    src: A + "motion/logo-short-animated.mp4",
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    style: {
      width: "100%",
      aspectRatio: "1 / 1",
      objectFit: "cover",
      borderRadius: "var(--radius-md)",
      background: "var(--ink-900)"
    }
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 var(--gutter-page) var(--section-y)",
      borderTop: "1px solid var(--border-hairline)",
      paddingTop: "var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    index: "01",
    style: {
      marginBottom: "var(--space-6)"
    }
  }, "how it runs"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "var(--space-6)"
    }
  }, [["brief", "One call. I want the constraint, not the mood board."], ["direction", "Concept, references, a look you can approve before anything is animated."], ["make", "Design, shoot, animate — whatever the film needs, in one place."], ["deliver", "Masters, cutdowns, and a motion guide so it survives without me."]].map(([t, d], i) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      borderTop: "1px solid var(--border-hairline)",
      paddingTop: "var(--space-4)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--flash-500)"
    }
  }, "0" + (i + 1)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--size-h3)",
      fontWeight: "var(--weight-medium)",
      textTransform: "lowercase",
      letterSpacing: "var(--tracking-heading)"
    }
  }, t), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--text-secondary)",
      fontSize: "var(--size-body-s)"
    }
  }, d))))));
}
function ServicesScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-9) var(--gutter-page) var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    index: "\u2014"
  }, "services"), /*#__PURE__*/React.createElement(Display, {
    size: "l"
  }, "from keyframe to crew", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--flash-500)"
    }
  }, "."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-4) var(--gutter-page) var(--section-y)"
    }
  }, /*#__PURE__*/React.createElement(ServicesList, null)));
}
function ContactScreen() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    brief: ""
  });
  const set = k => e => setForm({
    ...form,
    [k]: e.target.value
  });
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-9) var(--gutter-page) var(--section-y)",
      display: "grid",
      gridTemplateColumns: "minmax(0,1fr) minmax(320px,1fr)",
      gap: "var(--space-9)",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    accent: true
  }, "booking 2026"), /*#__PURE__*/React.createElement(Display, {
    size: "l"
  }, "tell me what", /*#__PURE__*/React.createElement("br", null), "it should feel like", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--flash-500)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "var(--maxw-prose)",
      color: "var(--text-secondary)"
    }
  }, "Deck, script, or a single sentence \u2014 all of it works. I reply within two days."), /*#__PURE__*/React.createElement("a", {
    href: "mailto:hello@blanzo.studio",
    style: {
      fontSize: "var(--size-h3)",
      textTransform: "lowercase"
    }
  }, "hello@blanzo.studio")), sent ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--flash-500)",
      paddingTop: "var(--space-5)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    accent: true
  }, "received"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--size-body-l)"
    }
  }, "Thanks ", form.name || "—", ". I'll come back to you within two days."), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    onClick: () => {
      setSent(false);
      setForm({
        name: "",
        email: "",
        brief: ""
      });
    }
  }, "send another"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      setSent(true);
    },
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    id: "n",
    label: "Name",
    value: form.name,
    onChange: set("name"),
    placeholder: "who's writing",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    id: "e",
    label: "Email",
    type: "email",
    value: form.email,
    onChange: set("email"),
    placeholder: "you@company.com",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    id: "b",
    label: "The brief",
    rows: 4,
    value: form.brief,
    onChange: set("brief"),
    placeholder: "what moves, for whom, by when",
    hint: "Budget range helps more than a deadline."
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "accent",
    size: "lg",
    full: true
  }, "send it")));
}
Object.assign(window, {
  AboutScreen,
  ServicesScreen,
  ContactScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-site/AboutContact.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-site/Chrome.jsx
try { (() => {
const A = "../../assets/";
const NAV = [["work", "work"], ["services", "services"], ["about", "about"], ["contact", "contact"]];
function Nav({
  route,
  go
}) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const el = document.getElementById("scroller");
    if (!el) return;
    const on = () => setScrolled(el.scrollTop > 24);
    el.addEventListener("scroll", on);
    return () => el.removeEventListener("scroll", on);
  }, []);
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px var(--gutter-page)",
      background: scrolled ? "rgba(0,0,0,.72)" : "transparent",
      backdropFilter: scrolled ? "var(--blur-panel)" : "none",
      borderBottom: scrolled ? "1px solid var(--border-hairline)" : "1px solid transparent",
      transition: "background var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    onClick: () => go("home"),
    style: {
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: A + "logo/wordmark-white.png",
    alt: "Blanzo",
    style: {
      height: 26
    }
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      alignItems: "center"
    }
  }, NAV.map(([id, label]) => /*#__PURE__*/React.createElement("a", {
    key: id,
    onClick: () => go(id),
    style: {
      border: "none",
      cursor: "pointer",
      fontSize: "var(--size-label)",
      fontWeight: "var(--weight-medium)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: route === id ? "var(--flash-500)" : "var(--text-primary)"
    }
  }, label)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "var(--flash-500)"
    }
  }), "booking 2026")));
}
function Footer({
  go
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      borderTop: "1px solid var(--border-hairline)",
      padding: "var(--space-8) var(--gutter-page) var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "var(--space-6)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Display, {
    size: "m"
  }, "let's make it move", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--flash-500)"
    }
  }, ".")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go("contact")
  }, "start a project")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-5)",
      flexWrap: "wrap",
      fontSize: "var(--size-body-s)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      borderColor: "transparent"
    }
  }, "instagram"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      borderColor: "transparent"
    }
  }, "vimeo"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      borderColor: "transparent"
    }
  }, "linkedin")), /*#__PURE__*/React.createElement("img", {
    src: A + "logo/monogram-white.png",
    alt: "",
    style: {
      height: 20,
      opacity: .6
    }
  }), /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Blanzo Creative Studio")));
}
function Section({
  eyebrow,
  index,
  title,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y) var(--gutter-page)",
      ...style
    }
  }, (eyebrow || title) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      marginBottom: "var(--space-7)"
    }
  }, eyebrow && /*#__PURE__*/React.createElement(Eyebrow, {
    index: index
  }, eyebrow), title && /*#__PURE__*/React.createElement(Display, {
    size: "m"
  }, title)), children);
}
Object.assign(window, {
  Nav,
  Footer,
  Section,
  A
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-site/Chrome.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-site/HomeScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const PROJECTS = [{
  id: "trim-path",
  index: "01",
  title: "trim path in / out",
  client: "Blanzo — self-initiated",
  year: "2025",
  tags: ["motion", "type in motion"],
  ratio: "16 / 9",
  video: A + "motion/logo-trimpath-loop-long.mp4"
}, {
  id: "bl-loop",
  index: "02",
  title: "bl loop",
  client: "Blanzo — identity",
  year: "2025",
  tags: ["identity", "2d"],
  ratio: "4 / 5",
  video: A + "motion/logo-trimpath-loop-short.mp4"
}, {
  id: "ball",
  index: "03",
  title: "ball study",
  client: "Blanzo — R&D",
  year: "2024",
  tags: ["motion", "study"],
  ratio: "1 / 1",
  video: A + "motion/logo-trimpath-ball-loop-short.mp4"
}, {
  id: "signature",
  index: "04",
  title: "signature draw-on",
  client: "Blanzo — identity",
  year: "2024",
  tags: ["identity", "direction"],
  ratio: "16 / 9",
  video: A + "motion/logo-full-animated.mp4"
}];
function HomeScreen({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      minHeight: "82vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      padding: "var(--space-9) var(--gutter-page) var(--space-8)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("video", {
    src: A + "motion/logo-trimpath-loop-long.mp4",
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: .45
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--protect-gradient)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    accent: true
  }, "creative studio \xB7 motion first"), /*#__PURE__*/React.createElement(Display, {
    size: "xl"
  }, "one mind,", /*#__PURE__*/React.createElement("br", null), "whole production", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--flash-500)"
    }
  }, ".")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "48ch",
      fontSize: "var(--size-body-l)",
      color: "var(--text-secondary)"
    }
  }, "I move between high-end motion design and full creative production \u2014 direction, shoot, edit, finish. One brief, one head, no handoff tax."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap",
      marginTop: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    onClick: () => go("work")
  }, "see the work"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "lg",
    onClick: () => go("contact")
  }, "start a project")))), /*#__PURE__*/React.createElement(Marquee, {
    items: ["motion design", "creative direction", "3d", "production", "edit", "grade"],
    accentEvery: 3,
    speed: 30,
    size: "var(--size-display-m)"
  }), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "selected work",
    index: "01",
    title: "things that move"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      gap: "var(--space-7) var(--space-6)",
      alignItems: "start"
    }
  }, PROJECTS.map(p => /*#__PURE__*/React.createElement(ProjectTile, _extends({
    key: p.id
  }, p, {
    onClick: () => go("case")
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-7)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go("work")
  }, "all projects \u2192"))), /*#__PURE__*/React.createElement(Section, {
    eyebrow: "capabilities",
    index: "02",
    title: "what I actually do",
    style: {
      borderTop: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement(ServicesList, null)), /*#__PURE__*/React.createElement(Section, {
    style: {
      borderTop: "1px solid var(--border-hairline)",
      display: "flex",
      gap: "var(--space-9)",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(StatBlock, {
    value: "12+",
    label: "years in motion",
    accent: true
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "240",
    label: "films delivered"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "8",
    label: "countries shot in"
  }), /*#__PURE__*/React.createElement(StatBlock, {
    value: "1",
    label: "generalist"
  })));
}
const SERVICES = [{
  index: "01",
  title: "motion design",
  description: "Frame-by-frame craft: type in motion, 2D systems, 3D, broadcast packages and social cutdowns built from one master.",
  tags: ["2d", "3d", "type in motion", "broadcast"]
}, {
  index: "02",
  title: "creative direction",
  description: "The idea before the frame. Concept, references, look, and the team to make it — I direct and I stay through delivery.",
  tags: ["concept", "art direction", "pitch"]
}, {
  index: "03",
  title: "production",
  description: "Full production house when you need one: crew, camera, location, edit, sound and grade coordinated end to end.",
  tags: ["shoot", "edit", "grade", "sound"]
}, {
  index: "04",
  title: "brand in motion",
  description: "Identity systems designed to move — logo behaviour, transitions, motion guidelines your team can actually use.",
  tags: ["identity", "guidelines", "toolkits"]
}];
function ServicesList() {
  const [open, setOpen] = React.useState(0);
  return /*#__PURE__*/React.createElement("div", null, SERVICES.map((s, i) => /*#__PURE__*/React.createElement(ServiceRow, _extends({
    key: s.index
  }, s, {
    open: open === i,
    onToggle: () => setOpen(open === i ? -1 : i)
  }))));
}
Object.assign(window, {
  HomeScreen,
  ServicesList,
  SERVICES,
  PROJECTS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-site/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/studio-site/WorkScreens.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const FILTERS = ["all", "motion", "identity", "production", "3d"];
function WorkScreen({
  go
}) {
  const [filter, setFilter] = React.useState("all");
  const list = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.tags.some(t => t.includes(filter)));
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-9) var(--gutter-page) var(--space-6)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    index: "\u2014"
  }, "work"), /*#__PURE__*/React.createElement(Display, {
    size: "l"
  }, "selected work", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--flash-500)"
    }
  }, ".")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap",
      marginTop: "var(--space-3)"
    }
  }, FILTERS.map(f => /*#__PURE__*/React.createElement(Button, {
    key: f,
    size: "sm",
    variant: filter === f ? "accent" : "outline",
    onClick: () => setFilter(f)
  }, f)))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--space-6) var(--gutter-page) var(--section-y)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))",
      gap: "var(--space-7) var(--space-6)",
      alignItems: "start"
    }
  }, list.map(p => /*#__PURE__*/React.createElement(ProjectTile, _extends({
    key: p.id
  }, p, {
    onClick: () => go("case")
  }))), list.length === 0 && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--text-muted)"
    }
  }, "nothing under that filter yet.")));
}
function CaseStudyScreen({
  go
}) {
  const p = PROJECTS[0];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
    style: {
      position: "relative",
      height: "70vh",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("video", {
    src: p.video,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "var(--protect-gradient)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "var(--gutter-page)",
      bottom: "var(--space-7)",
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Eyebrow, {
    accent: true,
    index: p.index
  }, "case study"), /*#__PURE__*/React.createElement(Display, {
    size: "l"
  }, p.title))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y) var(--gutter-page)",
      display: "grid",
      gridTemplateColumns: "minmax(240px,1fr) minmax(0,2fr)",
      gap: "var(--space-8)",
      borderBottom: "1px solid var(--border-hairline)"
    }
  }, /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, [["client", p.client], ["year", p.year], ["role", "direction · design · animation"], ["deliverables", "logo system, 6 stings, motion guide"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-1)"
    }
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontSize: "var(--size-label-s)",
      letterSpacing: "var(--tracking-label)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontSize: "var(--size-body)",
      color: "var(--text-primary)"
    }
  }, v)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "var(--maxw-prose)",
      fontSize: "var(--size-body-l)",
      color: "var(--text-primary)"
    }
  }, "The mark is one continuous line: the b and the l drawn in a single gesture. Everything else in the system follows that rule \u2014 nothing appears, everything is drawn."), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "var(--maxw-prose)",
      color: "var(--text-secondary)"
    }
  }, "Trim path in, trim path out, 2.4 seconds, one easing curve. The loop reads as a signature rather than an animation, which is the point: the studio is a person."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      flexWrap: "wrap"
    }
  }, p.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "var(--section-y) var(--gutter-page)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(VideoFrame, {
    src: A + "motion/logo-trimpath-loop-short.mp4",
    ratio: "1 / 1",
    caption: "Short loop \u2014 social"
  }), /*#__PURE__*/React.createElement(VideoFrame, {
    src: A + "motion/logo-trimpath-ball-loop-short.mp4",
    ratio: "1 / 1",
    caption: "Ball study \u2014 dot behaviour"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 var(--gutter-page) var(--section-y)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "var(--space-5)",
      flexWrap: "wrap",
      borderTop: "1px solid var(--border-hairline)",
      paddingTop: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => go("work")
  }, "\u2190 all work"), /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    onClick: () => go("case")
  }, "next project \u2192")));
}
Object.assign(window, {
  WorkScreen,
  CaseStudyScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/studio-site/WorkScreens.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Marquee = __ds_scope.Marquee;

__ds_ns.ServiceRow = __ds_scope.ServiceRow;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Display = __ds_scope.Display;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.ProjectTile = __ds_scope.ProjectTile;

__ds_ns.VideoFrame = __ds_scope.VideoFrame;

})();
