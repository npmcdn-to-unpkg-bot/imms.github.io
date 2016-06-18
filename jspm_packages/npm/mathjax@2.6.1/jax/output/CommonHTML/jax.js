/* */ 
(function(process) {
  (function(i, c, f, g) {
    var h;
    var l,
        b,
        d;
    var e = 1,
        p = 0.1,
        j = 0.025,
        a = 0.025;
    var o = {
      ".mjx-chtml": {
        display: "inline-block",
        "line-height": 0,
        "text-indent": 0,
        "text-align": "left",
        "text-transform": "none",
        "font-style": "normal",
        "font-weight": "normal",
        "font-size": "100%",
        "font-size-adjust": "none",
        "letter-spacing": "normal",
        "word-wrap": "normal",
        "word-spacing": "normal",
        "white-space": "nowrap",
        "float": "none",
        direction: "ltr",
        "max-width": "none",
        "max-height": "none",
        "min-width": 0,
        "min-height": 0,
        border: 0,
        margin: 0,
        padding: "1px 0"
      },
      ".MJXc-display": {
        display: "block",
        "text-align": "center",
        margin: "1em 0",
        padding: 0
      },
      ".mjx-chtml[tabindex]:focus, body :focus .mjx-chtml[tabindex]": {display: "inline-table"},
      ".mjx-math": {
        display: "inline-block",
        "border-collapse": "separate",
        "border-spacing": 0
      },
      ".mjx-math *": {
        display: "inline-block",
        "text-align": "left"
      },
      ".mjx-numerator": {
        display: "block",
        "text-align": "center"
      },
      ".mjx-denominator": {
        display: "block",
        "text-align": "center"
      },
      ".MJXc-stacked": {
        height: 0,
        position: "relative"
      },
      ".MJXc-stacked > *": {position: "absolute"},
      ".MJXc-bevelled > *": {display: "inline-block"},
      ".mjx-stack": {display: "inline-block"},
      ".mjx-op": {display: "block"},
      ".mjx-under": {display: "table-cell"},
      ".mjx-over": {display: "block"},
      ".mjx-over > *": {
        "padding-left": "0px!important",
        "padding-right": "0px!important"
      },
      ".mjx-under > *": {
        "padding-left": "0px!important",
        "padding-right": "0px!important"
      },
      ".mjx-stack > .mjx-sup": {display: "block"},
      ".mjx-stack > .mjx-sub": {display: "block"},
      ".mjx-prestack > .mjx-presup": {display: "block"},
      ".mjx-prestack > .mjx-presub": {display: "block"},
      ".mjx-delim-h > .mjx-char": {display: "inline-block"},
      ".mjx-surd": {"vertical-align": "top"},
      ".mjx-mphantom *": {visibility: "hidden"},
      ".mjx-merror": {
        "background-color": "#FFFF88",
        color: "#CC0000",
        border: "1px solid #CC0000",
        padding: "2px 3px",
        "font-style": "normal",
        "font-size": "90%"
      },
      ".mjx-annotation-xml": {"line-height": "normal"},
      ".mjx-menclose > svg": {
        fill: "none",
        stroke: "currentColor"
      },
      ".mjx-mtr": {display: "table-row"},
      ".mjx-mlabeledtr": {display: "table-row"},
      ".mjx-mtd": {
        display: "table-cell",
        "text-align": "center"
      },
      ".mjx-label": {display: "block"},
      ".mjx-box": {display: "inline-block"},
      ".mjx-block": {display: "block"},
      ".mjx-span": {display: "span"},
      ".mjx-char": {
        display: "block",
        "white-space": "pre"
      },
      ".mjx-itable": {display: "inline-table"},
      ".mjx-row": {display: "table-row"},
      ".mjx-cell": {display: "table-cell"},
      ".mjx-table": {
        display: "table",
        width: "100%"
      },
      ".mjx-line": {
        display: "block",
        height: 0
      },
      ".mjx-strut": {
        width: 0,
        "padding-top": e + "em"
      },
      ".mjx-vsize": {width: 0},
      ".MJXc-space1": {"margin-left": ".167em"},
      ".MJXc-space2": {"margin-left": ".222em"},
      ".MJXc-space3": {"margin-left": ".278em"},
      ".mjx-chartest": {
        display: "block",
        visibility: "hidden",
        position: "absolute",
        top: 0,
        "line-height": "normal",
        "font-size": "500%"
      },
      ".mjx-chartest .mjx-char": {display: "inline"},
      ".mjx-chartest .mjx-box": {"padding-top": "1000px"},
      ".MJXc-processing": {
        visibility: "hidden",
        position: "fixed",
        width: 0,
        height: 0,
        overflow: "hidden"
      },
      ".MJXc-processed": {display: "none"},
      ".mjx-test": {
        display: "block",
        "font-style": "normal",
        "font-weight": "normal",
        "font-size": "100%",
        "font-size-adjust": "none",
        "text-indent": 0,
        "text-transform": "none",
        "letter-spacing": "normal",
        "word-spacing": "normal",
        overflow: "hidden",
        height: "1px"
      },
      ".mjx-ex-box-test": {
        position: "absolute",
        width: "1px",
        height: "60ex"
      },
      "#MathJax_CHTML_Tooltip": {
        "background-color": "InfoBackground",
        color: "InfoText",
        border: "1px solid black",
        "box-shadow": "2px 2px 5px #AAAAAA",
        "-webkit-box-shadow": "2px 2px 5px #AAAAAA",
        "-moz-box-shadow": "2px 2px 5px #AAAAAA",
        "-khtml-box-shadow": "2px 2px 5px #AAAAAA",
        padding: "3px 4px",
        "z-index": 401,
        position: "absolute",
        left: 0,
        top: 0,
        width: "auto",
        height: "auto",
        display: "none"
      }
    };
    var m = 1000000;
    var k = {},
        n = MathJax.Hub.config;
    g.Augment({
      settings: c.config.menuSettings,
      config: {styles: o},
      Config: function() {
        if (!this.require) {
          this.require = [];
        }
        this.SUPER(arguments).Config.call(this);
        var q = this.settings;
        if (q.scale) {
          this.config.scale = q.scale;
        }
        this.require.push(this.fontDir + "/TeX/fontdata.js");
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
        k = this.config.linebreaks;
      },
      Startup: function() {
        l = MathJax.Extension.MathEvents.Event;
        b = MathJax.Extension.MathEvents.Touch;
        d = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = l.ContextMenu;
        this.Mousedown = l.AltContextMenu;
        this.Mouseover = d.Mouseover;
        this.Mouseout = d.Mouseout;
        this.Mousemove = d.Mousemove;
        var q = g.addElement(document.body, "mjx-block", {style: {
            display: "block",
            width: "5in"
          }});
        this.pxPerInch = q.offsetWidth / 5;
        q.parentNode.removeChild(q);
        this.TestSpan = g.Element("mjx-test", {style: {left: "1em"}}, [["mjx-ex-box-test"]]);
        return i.Styles(this.config.styles, ["InitializeCHTML", this]);
      },
      InitializeCHTML: function() {
        this.getDefaultExEm();
        if (this.defaultEm) {
          return;
        }
        var q = MathJax.Callback();
        i.timer.start(i, function(r) {
          if (r.time(q)) {
            c.signal.Post(["CommonHTML Jax - no default em size"]);
            return;
          }
          g.getDefaultExEm();
          if (g.defaultEm) {
            q();
          } else {
            setTimeout(r, r.delay);
          }
        }, this.defaultEmDelay, this.defaultEmTimeout);
        return q;
      },
      defaultEmDelay: 100,
      defaultEmTimeout: 1000,
      getDefaultExEm: function() {
        document.body.appendChild(this.TestSpan);
        this.defaultEm = this.getFontSize(this.TestSpan);
        this.defaultEx = this.TestSpan.firstChild.offsetHeight / 60;
        this.defaultWidth = this.TestSpan.offsetWidth;
        document.body.removeChild(this.TestSpan);
      },
      getFontSize: (window.getComputedStyle ? function(r) {
        var q = window.getComputedStyle(r);
        return parseFloat(q.fontSize);
      } : function(q) {
        return q.style.pixelLeft;
      }),
      getMaxWidth: (window.getComputedStyle ? function(r) {
        var q = window.getComputedStyle(r);
        if (q.maxWidth !== "none") {
          return parseFloat(q.maxWidth);
        }
        return 0;
      } : function(r) {
        var q = r.currentStyle.maxWidth;
        if (q !== "none") {
          if (q.match(/\d*px/)) {
            return parseFloat(q);
          }
          var s = r.style.left;
          r.style.left = q;
          q = r.style.pixelLeft;
          r.style.left = s;
          return q;
        }
        return 0;
      }),
      loadFont: function(q) {
        c.RestartAfter(i.Require(this.fontDir + "/" + q));
      },
      fontLoaded: function(q) {
        if (!q.match(/-|fontdata/)) {
          q += "-Regular";
        }
        if (!q.match(/\.js$/)) {
          q += ".js";
        }
        MathJax.Callback.Queue(["Post", c.Startup.signal, ["CommonHTML - font data loaded", q]], ["loadComplete", i, this.fontDir + "/" + q]);
      },
      Element: function(q, s, r) {
        if (q.substr(0, 4) === "mjx-") {
          if (!s) {
            s = {};
          }
          if (s.isMathJax == null) {
            s.isMathJax = true;
          }
          if (s.className) {
            s.className = q + " " + s.className;
          } else {
            s.className = q;
          }
          q = "span";
        }
        return this.HTMLElement(q, s, r);
      },
      addElement: function(s, q, t, r) {
        return s.appendChild(this.Element(q, t, r));
      },
      HTMLElement: f.Element,
      ucMatch: f.ucMatch,
      setScript: f.setScript,
      getNodesByClass: (document.getElementsByClassName ? function(r, q) {
        return r.getElementsByClassName(q);
      } : function(w, v) {
        var s = [];
        var r = w.getElementsByTagName("span");
        var t = RegExp("\\b" + v + "\\b");
        for (var u = 0,
            q = r.length; u < q; u++) {
          if (t.test(r[u].className)) {
            s.push = r[u];
          }
        }
        return s;
      }),
      getNode: function(v, t) {
        var r = this.getNodesByClass(v, t);
        if (r.length === 1) {
          return r[0];
        }
        var u = r[0],
            w = this.getNodeDepth(v, u);
        for (var s = 1,
            q = r.length; s < q; s++) {
          var x = this.getNodeDepth(v, r[s]);
          if (x < w) {
            u = r[s];
            w = x;
          }
        }
        return u;
      },
      getNodeDepth: function(q, r) {
        var s = 0;
        while (r && r !== q) {
          r = r.parentNode;
          s++;
        }
        return s;
      },
      preTranslate: function(r) {
        var z = r.jax[this.id],
            A,
            x = z.length,
            E,
            y,
            w,
            s,
            D,
            u;
        var q = 100000,
            C = false,
            B = 0,
            F = k.automatic,
            t = k.width;
        if (F) {
          C = !!t.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/);
          if (C) {
            t = t.replace(/\s*container\s*/, "");
          } else {
            q = this.defaultWidth;
          }
          if (t === "") {
            t = "100%";
          }
        }
        for (A = 0; A < x; A++) {
          E = z[A];
          if (!E.parentNode) {
            continue;
          }
          y = E.previousSibling;
          if (y && y.className && String(y.className).substr(0, 9) === "mjx-chtml") {
            y.parentNode.removeChild(y);
          }
          s = E.MathJax.elementJax;
          if (!s) {
            continue;
          }
          s.CHTML = {display: (s.root.Get("display") === "block")};
          w = g.Element("mjx-chtml", {
            id: s.inputID + "-Frame",
            className: "MathJax_CHTML",
            isMathJax: true,
            jaxID: this.id,
            oncontextmenu: l.Menu,
            onmousedown: l.Mousedown,
            onmouseover: l.Mouseover,
            onmouseout: l.Mouseout,
            onmousemove: l.Mousemove,
            onclick: l.Click,
            ondblclick: l.DblClick,
            onkeydown: l.Keydown,
            tabIndex: c.getTabOrder(s)
          });
          if (s.CHTML.display) {
            var v = g.Element("mjx-chtml", {
              className: "MJXc-display",
              isMathJax: false
            });
            v.appendChild(w);
            w = v;
          }
          if (c.Browser.noContextMenu) {
            w.ontouchstart = b.start;
            w.ontouchend = b.end;
          }
          w.className += " MJXc-processing";
          E.parentNode.insertBefore(w, E);
          E.parentNode.insertBefore(this.TestSpan.cloneNode(true), E);
        }
        for (A = 0; A < x; A++) {
          E = z[A];
          if (!E.parentNode) {
            continue;
          }
          test = E.previousSibling;
          s = E.MathJax.elementJax;
          if (!s) {
            continue;
          }
          u = g.getFontSize(test);
          D = test.firstChild.offsetHeight / 60;
          if (D === 0 || D === "NaN") {
            D = this.defaultEx;
          }
          w = test;
          while (w) {
            B = w.offsetWidth;
            if (B) {
              break;
            }
            B = g.getMaxWidth(w);
            if (B) {
              break;
            }
            w = w.parentNode;
          }
          if (C) {
            q = B;
          }
          scale = (this.config.matchFontHeight ? D / this.TEX.x_height / u : 1);
          scale = Math.floor(Math.max(this.config.minScaleAdjust / 100, scale) * this.config.scale);
          s.CHTML.scale = scale / 100;
          s.CHTML.fontSize = scale + "%";
          s.CHTML.outerEm = u;
          s.CHTML.em = this.em = u * scale / 100;
          s.CHTML.ex = D;
          s.CHTML.cwidth = B / this.em;
          s.CHTML.lineWidth = (F ? this.length2em(t, q / this.em, 1) : q);
        }
        for (A = 0; A < x; A++) {
          E = z[A];
          if (!E.parentNode) {
            continue;
          }
          test = z[A].previousSibling;
          s = z[A].MathJax.elementJax;
          if (!s) {
            continue;
          }
          test.parentNode.removeChild(test);
        }
        r.CHTMLeqn = r.CHTMLlast = 0;
        r.CHTMLi = -1;
        r.CHTMLchunk = this.config.EqnChunk;
        r.CHTMLdelay = false;
      },
      Translate: function(r, v) {
        if (!r.parentNode) {
          return;
        }
        if (v.CHTMLdelay) {
          v.CHTMLdelay = false;
          c.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
        }
        var q = r.MathJax.elementJax,
            u = q.root,
            t = document.getElementById(q.inputID + "-Frame");
        this.getMetrics(q);
        if (this.scale !== 1) {
          t.style.fontSize = q.CHTML.fontSize;
        }
        this.initCHTML(u, t);
        this.savePreview(r);
        this.CHTMLnode = t;
        try {
          u.setTeXclass();
          u.toCommonHTML(t);
        } catch (s) {
          while (t.firstChild) {
            t.removeChild(t.firstChild);
          }
          delete this.CHTMLnode;
          this.restorePreview(r);
          throw s;
        }
        delete this.CHTMLnode;
        this.restorePreview(r);
        if (q.CHTML.display) {
          t = t.parentNode;
        }
        t.className = t.className.replace(/ [^ ]+$/, "");
        t.className += " MJXc-processed";
        if (r.MathJax.preview) {
          q.CHTML.preview = r.MathJax.preview;
          delete r.MathJax.preview;
        }
        v.CHTMLeqn += (v.i - v.CHTMLi);
        v.CHTMLi = v.i;
        if (v.CHTMLeqn >= v.CHTMLlast + v.CHTMLchunk) {
          this.postTranslate(v);
          v.CHTMLchunk = Math.floor(v.CHTMLchunk * this.config.EqnChunkFactor);
          v.CHTMLdelay = true;
        }
      },
      initCHTML: function(r, q) {},
      savePreview: function(q) {
        var r = q.MathJax.preview;
        if (r && r.parentNode) {
          q.MathJax.tmpPreview = document.createElement("span");
          r.parentNode.replaceChild(q.MathJax.tmpPreview, r);
        }
      },
      restorePreview: function(q) {
        var r = q.MathJax.tmpPreview;
        if (r) {
          r.parentNode.replaceChild(q.MathJax.preview, r);
          delete q.MathJax.tmpPreview;
        }
      },
      getMetrics: function(q) {
        var r = q.CHTML;
        this.jax = q;
        this.em = r.em;
        this.outerEm = r.outerEm;
        this.scale = r.scale;
        this.cwidth = r.cwidth;
        this.linebreakWidth = r.lineWidth;
      },
      postTranslate: function(v) {
        var r = v.jax[this.id];
        for (var t = v.CHTMLlast,
            q = v.CHTMLeqn; t < q; t++) {
          var s = r[t];
          if (s && s.MathJax.elementJax) {
            s.previousSibling.className = s.previousSibling.className.replace(/ [^ ]+$/, "");
            var u = s.MathJax.elementJax.CHTML;
            if (u.preview) {
              u.preview.innerHTML = "";
              s.MathJax.preview = u.preview;
              delete u.preview;
            }
          }
        }
        v.CHTMLlast = v.CHTMLeqn;
      },
      getJaxFromMath: function(q) {
        if (q.parentNode.className.match(/MJXc-display/)) {
          q = q.parentNode;
        }
        do {
          q = q.nextSibling;
        } while (q && q.nodeName.toLowerCase() !== "script");
        return c.getJaxFor(q);
      },
      getHoverSpan: function(q, r) {
        return q.root.CHTMLnodeElement();
      },
      getHoverBBox: function(q, t, u) {
        var v = q.root.CHTML,
            s = q.CHTML.outerEm;
        var r = {
          w: v.w * s,
          h: v.h * s,
          d: v.d * s
        };
        if (v.width) {
          r.width = v.width;
        }
        return r;
      },
      Zoom: function(s, z, y, q, w) {
        this.getMetrics(s);
        var t = g.addElement(z, "mjx-chtml", {
          style: {"font-size": Math.floor(g.scale * 100) + "%"},
          isMathJax: false
        });
        g.CHTMLnode = t;
        this.idPostfix = "-zoom";
        s.root.toCommonHTML(t);
        this.idPostfix = "";
        var r = t.style,
            A = s.root.CHTML;
        if (A.t > A.h) {
          r.marginTop = g.Em(A.t - A.h);
        }
        if (A.b > A.d) {
          r.marginBottom = g.Em(A.b - A.d);
        }
        if (A.l < 0) {
          r.paddingLeft = g.Em(-A.l);
        }
        if (A.r > A.w) {
          r.marginRight = g.Em(A.r - A.w);
        }
        r.position = "absolute";
        var x = t.offsetWidth,
            v = t.offsetHeight,
            B = y.firstChild.offsetHeight,
            u = y.firstChild.offsetWidth;
        t.style.position = "";
        return {
          Y: -l.getBBox(z).h,
          mW: u,
          mH: B,
          zW: x,
          zH: v
        };
      },
      Remove: function(q) {
        var r = document.getElementById(q.inputID + "-Frame");
        if (r && q.CHTML.display) {
          r = r.parentNode;
        }
        if (r) {
          r.parentNode.removeChild(r);
        }
        delete q.CHTML;
      },
      ID: 0,
      idPostfix: "",
      GetID: function() {
        this.ID++;
        return this.ID;
      },
      MATHSPACE: {
        veryverythinmathspace: 1 / 18,
        verythinmathspace: 2 / 18,
        thinmathspace: 3 / 18,
        mediummathspace: 4 / 18,
        thickmathspace: 5 / 18,
        verythickmathspace: 6 / 18,
        veryverythickmathspace: 7 / 18,
        negativeveryverythinmathspace: -1 / 18,
        negativeverythinmathspace: -2 / 18,
        negativethinmathspace: -3 / 18,
        negativemediummathspace: -4 / 18,
        negativethickmathspace: -5 / 18,
        negativeverythickmathspace: -6 / 18,
        negativeveryverythickmathspace: -7 / 18,
        thin: 0.04,
        medium: 0.06,
        thick: 0.1,
        infinity: m
      },
      SPACECLASS: {
        thinmathspace: "MJXc-space1",
        mediummathspace: "MJXc-space2",
        thickmathspace: "MJXc-space3"
      },
      pxPerInch: 96,
      em: 16,
      maxStretchyParts: 1000,
      FONTDEF: {},
      TEXDEF: {
        x_height: 0.442,
        quad: 1,
        num1: 0.676508,
        num2: 0.393732,
        num3: 0.44373,
        denom1: 0.685951,
        denom2: 0.344841,
        sup1: 0.412892,
        sup2: 0.362892,
        sup3: 0.288888,
        sub1: 0.15,
        sub2: 0.247217,
        sup_drop: 0.386108,
        sub_drop: 0.05,
        delim1: 2.39,
        delim2: 1,
        axis_height: 0.25,
        rule_thickness: 0.06,
        big_op_spacing1: 0.111111,
        big_op_spacing2: 0.166666,
        big_op_spacing3: 0.2,
        big_op_spacing4: 0.45,
        big_op_spacing5: 0.1,
        surd_height: 0.075,
        scriptspace: 0.05,
        nulldelimiterspace: 0.12,
        delimiterfactor: 901,
        delimitershortfall: 0.3,
        min_rule_thickness: 1.25
      },
      unicodeChar: function(q) {
        if (q < 65535) {
          return String.fromCharCode(q);
        }
        q -= 65536;
        return String.fromCharCode((q >> 10) + 55296) + String.fromCharCode((q & 1023) + 56320);
      },
      getUnicode: function(q) {
        var r = q.text.charCodeAt(q.i);
        q.i++;
        if (r >= 55296 && r < 56319) {
          r = (((r - 55296) << 10) + (q.text.charCodeAt(q.i) - 56320)) + 65536;
          q.i++;
        }
        return r;
      },
      getCharList: function(u, t) {
        var s,
            y,
            x = [],
            q = u.cache,
            B = t;
        if (q[t]) {
          return q[t];
        }
        var r = this.FONTDATA.RANGES,
            A = this.FONTDATA.VARIANT;
        if (t >= r[0].low && t <= r[r.length - 1].high) {
          for (s = 0, y = r.length; s < y; s++) {
            if (r[s].name === "alpha" && u.noLowerCase) {
              continue;
            }
            var w = u["offset" + r[s].offset];
            if (w && t >= r[s].low && t <= r[s].high) {
              if (r[s].remap && r[s].remap[t]) {
                t = w + r[s].remap[t];
              } else {
                t = t - r[s].low + w;
                if (r[s].add) {
                  t += r[s].add;
                }
              }
              if (u["variant" + r[s].offset]) {
                u = A[u["variant" + r[s].offset]];
              }
              break;
            }
          }
        }
        if (u.remap && u.remap[t]) {
          t = u.remap[t];
          if (u.remap.variant) {
            u = A[u.remap.variant];
          }
        } else {
          if (this.FONTDATA.REMAP[t] && !u.noRemap) {
            t = this.FONTDATA.REMAP[t];
          }
        }
        if (t instanceof Array) {
          u = A[t[1]];
          t = t[0];
        }
        if (typeof(t) === "string") {
          var v = {
            text: t,
            i: 0,
            length: t.length
          };
          while (v.i < v.length) {
            t = this.getUnicode(v);
            var z = this.getCharList(u, t);
            if (z) {
              x.push.apply(x, z);
            }
          }
        } else {
          if (u.cache[t]) {
            x = u.cache[t];
          } else {
            u.cache[t] = x = [this.lookupChar(u, t)];
          }
        }
        q[B] = x;
        return x;
      },
      lookupChar: function(t, w) {
        var v = t;
        while (t) {
          for (var s = 0,
              q = t.fonts.length; s < q; s++) {
            var r = this.FONTDATA.FONTS[t.fonts[s]];
            if (typeof(r) === "string") {
              this.loadFont(r);
            }
            var u = r[w];
            if (u) {
              if (u.length === 5) {
                u[5] = {};
              }
              if (u.c == null) {
                u[0] /= 1000;
                u[1] /= 1000;
                u[2] /= 1000;
                u[3] /= 1000;
                u[4] /= 1000;
                u.c = this.unicodeChar(w);
              }
              if (u[5].space) {
                return {
                  type: "space",
                  w: u[2],
                  font: r
                };
              }
              return {
                type: "char",
                font: r,
                n: w
              };
            } else {
              if (r.Extra) {
                this.findBlock(r, w);
              }
            }
          }
          t = this.FONTDATA.VARIANT[t.chain];
        }
        return this.unknownChar(v, w);
      },
      findBlock: function(s, w) {
        var r = s.Extra,
            t = s.file,
            v;
        for (var u = 0,
            q = r.length; u < q; u++) {
          if (typeof(r[u]) === "number") {
            if (w === r[u]) {
              v = t;
              break;
            }
          } else {
            if (w < r[u][0]) {
              return;
            }
            if (w <= r[u][1]) {
              v = t;
              break;
            }
          }
        }
        if (v) {
          delete s.Extra;
          this.loadFont(t);
        }
      },
      unknownChar: function(q, t) {
        c.signal.Post(["CommonHTML Jax - unknown char", t, q]);
        var s = "";
        if (q.bold) {
          s += "B";
        }
        if (q.italic) {
          s += "I";
        }
        var r = this.FONTDATA.UNKNOWN[s || "R"];
        if (!r[t]) {
          this.getUnknownChar(r, t);
        }
        return {
          type: "unknown",
          n: t,
          font: r
        };
      },
      getUnknownChar: function(r, t) {
        var s = this.unicodeChar(t);
        var q = this.getHDW(s, r.className);
        r[t] = [0.8, 0.2, q.w, 0, q.w, {
          a: Math.max(0, (q.h - q.d) / 2),
          h: q.h,
          d: q.d
        }];
        r[t].c = s;
      },
      styledText: function(r, u) {
        c.signal.Post(["CommonHTML Jax - styled text", u, r]);
        var s = r.style;
        var v = "_" + (s["font-family"] || r.className || "");
        if (s["font-weight"]) {
          v += "_" + s["font-weight"];
        }
        if (s["font-style"]) {
          v += "_" + s["font-style"];
        }
        if (!this.STYLEDTEXT) {
          this.STYLEDTEXT = {};
        }
        if (!this.STYLEDTEXT[v]) {
          this.STYLEDTEXT[v] = {className: r.className || ""};
        }
        var t = this.STYLEDTEXT[v];
        if (!t["_" + u]) {
          var q = this.getHDW(u, r.className || "", s);
          t["_" + u] = [0.8, 0.2, q.w, 0, q.w, {
            a: Math.max(0, (q.h - q.d) / 2),
            h: q.h,
            d: q.d
          }];
          t["_" + u].c = u;
        }
        return {
          type: "unknown",
          n: "_" + u,
          font: t,
          style: s,
          rscale: r.rscale
        };
      },
      getHDW: function(z, s, D) {
        var r = g.addElement(g.CHTMLnode, "mjx-chartest", {className: s}, [["mjx-char", {style: D}, [z]]]);
        var q = g.addElement(g.CHTMLnode, "mjx-chartest", {className: s}, [["mjx-char", {style: D}, [z, ["mjx-box"]]]]);
        r.firstChild.style.fontSize = q.firstChild.style.fontSize = "";
        var t = 5 * g.em;
        var C = r.offsetHeight,
            A = q.offsetHeight,
            u = r.offsetWidth;
        g.CHTMLnode.removeChild(r);
        g.CHTMLnode.removeChild(q);
        if (A === 0) {
          t = 5 * g.defaultEm;
          var y = document.body.appendChild(document.createElement("div"));
          y.appendChild(r);
          y.appendChild(q);
          C = r.offsetHeight, A = q.offsetHeight, u = r.offsetWidth;
          document.body.removeChild(y);
        }
        var x = (A - 1000) / t,
            B = u / t,
            v = C / t - x;
        return {
          h: v,
          d: x,
          w: B
        };
      },
      addCharList: function(t, v, w) {
        var u = {
          text: "",
          className: null,
          a: 0
        };
        for (var r = 0,
            q = v.length; r < q; r++) {
          var s = v[r];
          if (this.charList[s.type]) {
            (this.charList[s.type])(s, t, w, u, q);
          }
        }
        if (u.text !== "") {
          if (t.childNodes.length) {
            this.charList.flushText(t, u);
          } else {
            f.addText(t, u.text);
            if (t.className) {
              t.className += " " + u.className;
            } else {
              t.className = u.className;
            }
          }
        }
        w.b = (u.flushed ? 0 : w.a);
      },
      charList: {
        "char": function(t, s, w, u, q) {
          var r = t.font;
          if (u.className && r.className !== u.className) {
            this.flushText(s, u);
          }
          if (!u.a) {
            u.a = r.centerline / 1000;
          }
          if (u.a > (w.a || 0)) {
            w.a = u.a;
          }
          var v = r[t.n];
          u.text += v.c;
          u.className = r.className;
          if (w.h < v[0] + j) {
            w.t = w.h = v[0] + j;
          }
          if (w.d < v[1] + a) {
            w.b = w.d = v[1] + a;
          }
          if (w.l > w.w + v[3]) {
            w.l = w.w + v[3];
          }
          if (w.r < w.w + v[4]) {
            w.r = w.w + v[4];
          }
          w.w += v[2] * (t.rscale || 1);
          if (q == 1 && r.skew && r.skew[t.n]) {
            w.skew = r.skew[t.n];
          }
          if (v[5].rfix) {
            this.flushText(s, u).style.marginRight = g.Em(v[5].rfix / 1000);
          }
        },
        space: function(r, q, t, s) {
          if (r.w) {
            if (s.text === "") {
              s.className = r.font.className;
            }
            this.flushText(q, s).style.marginRight = g.Em(r.w);
            t.w += r.w;
          }
        },
        unknown: function(r, q, u, s) {
          (this["char"])(r, q, u, s, 0);
          var t = r.font[r.n];
          if (t[5].a) {
            s.a = t[5].a;
            if (u.a == null || s.a > u.a) {
              u.a = s.a;
            }
          }
          q = this.flushText(q, s, r.style);
          q.style.width = g.Em(t[2]);
        },
        flushText: function(r, s, q) {
          r = g.addElement(r, "mjx-charbox", {
            className: s.className,
            style: q
          }, [s.text]);
          if (s.a) {
            r.style.paddingBottom = g.Em(s.a);
          }
          s.text = "";
          s.className = null;
          s.a = 0;
          s.flushed = true;
          return r;
        }
      },
      handleText: function(s, v, r, u) {
        if (s.childNodes.length === 0) {
          g.addElement(s, "mjx-char");
          u = g.BBOX.empty(u);
        }
        if (typeof(r) === "string") {
          r = this.FONTDATA.VARIANT[r];
        }
        if (!r) {
          r = this.FONTDATA.VARIANT[h.VARIANT.NORMAL];
        }
        var q = {
          text: v,
          i: 0,
          length: v.length
        },
            t = [];
        if (r.style && q.length) {
          t.push(this.styledText(r, v));
        } else {
          while (q.i < q.length) {
            var w = this.getUnicode(q);
            t.push.apply(t, this.getCharList(r, w));
          }
        }
        if (t.length) {
          this.addCharList(s.firstChild, t, u);
        }
        u.clean();
        if (u.d < 0) {
          u.D = u.d;
          u.d = 0;
        }
        if (u.h - u.a) {
          s.firstChild.style[u.h - u.a < 0 ? "marginTop" : "paddingTop"] = this.EmRounded(u.h - u.a);
        }
        if (u.d > -u.b) {
          s.firstChild.style.paddingBottom = this.EmRounded(u.d + u.b);
        }
        return u;
      },
      createDelimiter: function(v, q, s, y, t) {
        if (!q) {
          var z = this.BBOX.zero();
          z.w = z.r = this.TEX.nulldelimiterspace;
          g.addElement(v, "mjx-box", {style: {width: z.w}});
          return z;
        }
        if (!(s instanceof Array)) {
          s = [s, s];
        }
        var x = s[1];
        s = s[0];
        var r = {alias: q};
        while (r.alias) {
          q = r.alias;
          r = this.FONTDATA.DELIMITERS[q];
          if (!r) {
            r = {HW: [0, this.FONTDATA.VARIANT[h.VARIANT.NORMAL]]};
          }
        }
        if (r.load) {
          c.RestartAfter(i.Require(this.fontDir + "/TeX/fontdata-" + r.load + ".js"));
        }
        for (var w = 0,
            u = r.HW.length; w < u; w++) {
          if (r.HW[w][0] >= s - 0.01 || (w == u - 1 && !r.stretch)) {
            if (r.HW[w][3]) {
              q = r.HW[w][3];
            }
            z = this.createChar(v, [q, r.HW[w][1]], (r.HW[w][2] || 1), t);
            z.offset = 0.6 * z.w;
            if (y) {
              z.scale = y.scale;
              y.rscale = y.rscale;
            }
            return z;
          }
        }
        if (!r.stretch) {
          return z;
        }
        return this["extendDelimiter" + r.dir](v, x, r.stretch, y, t);
      },
      extendDelimiterV: function(C, v, N, u, A) {
        C = g.addElement(C, "mjx-delim-v");
        var L = g.Element("span");
        var z,
            y,
            M,
            t,
            F,
            r,
            D,
            w,
            E = 1,
            K;
        F = this.createChar(L, (N.top || N.ext), 1, A);
        z = L.removeChild(L.firstChild);
        r = this.createChar(L, (N.bot || N.ext), 1, A);
        y = L.removeChild(L.firstChild);
        D = w = g.BBOX.zero();
        var G = F.h + F.d + r.h + r.d - p;
        C.appendChild(z);
        if (N.mid) {
          D = this.createChar(L, N.mid, 1, A);
          M = L.removeChild(L.firstChild);
          G += D.h + D.d;
          E = 2;
        }
        if (N.min && v < G * N.min) {
          v = G * N.min;
        }
        if (v > G) {
          w = this.createChar(L, N.ext, 1, A);
          t = L.removeChild(L.firstChild);
          var J = w.h + w.d,
              s = J - p;
          var B = Math.min(Math.ceil((v - G) / (E * s)), this.maxStretchyParts);
          if (N.fullExtenders) {
            v = B * E * s + G;
          } else {
            s = (v - G) / (E * B);
          }
          K = w.d + w.a - J / 2;
          t.style.margin = t.style.padding = "";
          t.style.lineHeight = g.Em(s);
          t.style.marginBottom = g.Em(K - p / 2 / E);
          t.style.marginTop = g.Em(-K - p / 2 / E);
          var I = t.textContent,
              x = "\n" + I;
          while (--B > 0) {
            I += x;
          }
          t.textContent = I;
          C.appendChild(t);
          if (N.mid) {
            C.appendChild(M);
            C.appendChild(t.cloneNode(true));
          }
        } else {
          K = (v - G - p) / E;
          z.style.marginBottom = g.Em(K + parseFloat(z.style.marginBottom || "0"));
          if (N.mid) {
            C.appendChild(M);
          }
          y.style.marginTop = g.Em(K + parseFloat(y.style.marginTop || "0"));
        }
        C.appendChild(y);
        var q = g.BBOX({
          w: Math.max(F.w, w.w, r.w, D.w),
          l: Math.min(F.l, w.l, r.l, D.l),
          r: Math.max(F.r, w.r, r.r, D.r),
          h: v - r.d,
          d: r.d,
          t: v - r.d,
          b: r.d
        });
        q.offset = 0.5 * q.w;
        if (u) {
          q.scale = u.scale;
          q.rscale = u.rscale;
        }
        return q;
      },
      extendDelimiterH: function(D, q, N, t, B) {
        D = g.addElement(D, "mjx-delim-h");
        var L = g.Element("span");
        var r,
            K,
            M,
            s,
            I,
            A,
            u,
            E,
            x,
            F = 1;
        A = this.createChar(L, (N.left || N.rep), 1, B);
        r = L.removeChild(L.firstChild);
        u = this.createChar(L, (N.right || N.rep), 1, B);
        K = L.removeChild(L.firstChild);
        x = this.createChar(L, N.rep, 1, B);
        s = L.removeChild(L.firstChild);
        r.style.marginLeft = g.Em(-A.l);
        K.style.marginRight = g.Em(u.r - u.w);
        D.appendChild(r);
        var O = g.BBOX.zero();
        O.h = Math.max(A.h, u.h, x.h);
        O.d = Math.max(A.D || A.d, u.D || u.d, x.D || x.d);
        var v = (A.r - A.l) + (u.r - u.l) - p;
        if (N.mid) {
          E = this.createChar(L, N.mid, 1, B);
          M = L.removeChild(L.firstChild);
          M.style.marginleft = g.Em(-E.l);
          M.style.marginRight = g.Em(E.r - E.w);
          v += E.r - E.l + p;
          F = 2;
          if (E.h > O.h) {
            O.h = E.h;
          }
          if (E.d > O.d) {
            O.d = E.d;
          }
        }
        if (N.min && q < v * N.min) {
          q = v * N.min;
        }
        O.w = O.r = q;
        if (q > v) {
          var z = x.r - x.l,
              H = z - p;
          var C = Math.min(Math.ceil((q - v) / (F * H)), this.maxStretchyParts);
          if (N.fullExtenders) {
            q = C * F * H + v;
          } else {
            H = (q - v) / (F * C);
          }
          var J = (z - H + p / F) / 2;
          s.style.marginLeft = g.Em(-x.l - J);
          s.style.marginRight = g.Em(x.r - x.w + J);
          s.style.letterSpacing = g.Em(-(x.w - H));
          r.style.marginRight = g.Em(A.r - A.w);
          K.style.marginleft = g.Em(-u.l);
          var G = s.textContent,
              y = G;
          while (--C > 0) {
            G += y;
          }
          s.textContent = G;
          D.appendChild(s);
          if (N.mid) {
            D.appendChild(M);
            I = D.appendChild(s.cloneNode(true));
          }
        } else {
          J = (q - v - p / F) / 2;
          r.style.marginRight = g.Em(A.r - A.w + J);
          if (N.mid) {
            D.appendChild(M);
          }
          K.style.marginLeft = g.Em(-u.l + J);
        }
        D.appendChild(K);
        this.adjustHeights([r, s, M, I, K], [A, x, E, x, u], O);
        if (t) {
          O.scale = t.scale;
          O.rscale = t.rscale;
        }
        return O;
      },
      adjustHeights: function(r, u, v) {
        var s = v.h,
            w = v.d;
        if (v.d < 0) {
          w = -v.d;
          v.D = v.d;
          v.d = 0;
        }
        for (var t = 0,
            q = r.length; t < q; t++) {
          if (r[t]) {
            r[t].style.paddingTop = g.Em(s - u[t].a);
            r[t].style.paddingBottom = g.Em(w + u[t].a);
            r[t].style.marginTop = r[t].style.marginBottom = 0;
          }
        }
      },
      createChar: function(s, w, u, r) {
        var z = "",
            v = {
              fonts: [w[1]],
              noRemap: true,
              cache: {}
            };
        if (r && r === h.VARIANT.BOLD && this.FONTDATA.FONTS[w[1] + "-Bold"]) {
          v.fonts = [w[1] + "-Bold", w[1]];
        }
        if (typeof(w[1]) !== "string") {
          v = w[1];
        }
        if (w[0] instanceof Array) {
          for (var x = 0,
              t = w[0].length; x < t; x++) {
            z += String.fromCharCode(w[0][x]);
          }
        } else {
          z = String.fromCharCode(w[0]);
        }
        if (w[4]) {
          u *= w[4];
        }
        var y = this.handleText(s, z, v),
            q = s.firstChild.style;
        if (u !== 1) {
          q.fontSize = this.Percent(u);
        }
        if (w[2]) {
          q.paddingLeft = this.Em(w[2]);
          y.w += w[2];
          y.r += w[2];
        }
        if (w[3]) {
          q.verticalAlign = this.Em(w[3]);
          y.h += w[3];
          if (y.h < 0) {
            y.h = 0;
          }
        }
        if (w[5]) {
          q.marginTop = this.Em(w[5]);
          y.h += w[5];
          y.t += w[5];
        }
        if (w[6]) {
          q.marginBottom = this.Em(w[6]);
          y.d += w[6];
          y.b += w[6];
        }
        return y;
      },
      length2em: function(u, s, v) {
        if (typeof(u) !== "string") {
          u = u.toString();
        }
        if (u === "") {
          return "";
        }
        if (u === h.SIZE.NORMAL) {
          return 1;
        }
        if (u === h.SIZE.BIG) {
          return 2;
        }
        if (u === h.SIZE.SMALL) {
          return 0.71;
        }
        if (this.MATHSPACE[u]) {
          return this.MATHSPACE[u];
        }
        var r = u.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        var q = parseFloat(r[1] || "1"),
            t = r[2];
        if (s == null) {
          s = 1;
        }
        if (!v) {
          v = 1;
        }
        v = 1 / this.em / v;
        if (t === "em") {
          return q;
        }
        if (t === "ex") {
          return q * this.TEX.x_height;
        }
        if (t === "%") {
          return q / 100 * s;
        }
        if (t === "px") {
          return q * v;
        }
        if (t === "pt") {
          return q / 10;
        }
        if (t === "pc") {
          return q * 1.2;
        }
        v *= this.pxPerInch;
        if (t === "in") {
          return q * v;
        }
        if (t === "cm") {
          return q * v / 2.54;
        }
        if (t === "mm") {
          return q * v / 25.4;
        }
        if (t === "mu") {
          return q / 18;
        }
        return q * s;
      },
      thickness2em: function(q, r) {
        var s = g.TEX.rule_thickness / (r || 1);
        if (q === h.LINETHICKNESS.MEDIUM) {
          return s;
        }
        if (q === h.LINETHICKNESS.THIN) {
          return 0.67 * s;
        }
        if (q === h.LINETHICKNESS.THICK) {
          return 1.67 * s;
        }
        return this.length2em(q, s, r);
      },
      Em: function(q) {
        if (Math.abs(q) < 0.001) {
          return "0";
        }
        return (q.toFixed(3).replace(/\.?0+$/, "")) + "em";
      },
      EmRounded: function(q) {
        q = (Math.round(q * g.em) + 0.05) / g.em;
        if (Math.abs(q) < 0.0006) {
          return "0em";
        }
        return q.toFixed(3).replace(/\.?0+$/, "") + "em";
      },
      unEm: function(q) {
        return parseFloat(q);
      },
      Px: function(q, r) {
        q *= this.em;
        if (r && q < r) {
          q = r;
        }
        if (Math.abs(q) < 0.1) {
          return "0";
        }
        return q.toFixed(1).replace(/\.0$/, "") + "px";
      },
      Percent: function(q) {
        return (100 * q).toFixed(1).replace(/\.?0+$/, "") + "%";
      },
      Transform: function(t, r, q) {
        var s = t.style;
        s.transform = s.WebkitTransform = s.MozTransform = s["-ms-transform"] = r;
        if (q) {
          s.transformOrigin = s.WebkitTransformOrigin = s.MozTransformOrigin = s["-ms-transform-origin"] = q;
        }
      },
      arrayEntry: function(q, r) {
        return q[Math.max(0, Math.min(r, q.length - 1))];
      },
      removeStyles: ["fontSize", "fontFamily", "fontWeight", "fontStyle", "fontVariant", "font"]
    });
    g.BBOX = MathJax.Object.Subclass({
      Init: function(q) {
        for (var r in q) {
          if (q.hasOwnProperty(r)) {
            this[r] = q[r];
          }
        }
      },
      clean: function() {
        if (this.h === -m) {
          this.h = 0;
        }
        if (this.d === -m) {
          this.d = 0;
        }
        if (this.l === m) {
          this.l = 0;
        }
        if (this.r === -m) {
          this.r = 0;
        }
        if (this.t === -m) {
          this.t = 0;
        }
        if (this.b === -m) {
          this.b = 0;
        }
        if (this.D && this.d > 0) {
          delete this.D;
        }
      },
      rescale: function(q) {
        this.w *= q;
        this.h *= q;
        this.d *= q;
        this.l *= q;
        this.r *= q;
        this.t *= q;
        this.b *= q;
        if (this.L) {
          this.L *= q;
        }
        if (this.R) {
          this.R *= q;
        }
        if (this.D) {
          this.D *= q;
        }
      },
      combine: function(r, q, s) {
        r.X = q;
        r.Y = s;
        scale = r.rscale;
        if (q + scale * r.r > this.r) {
          this.r = q + scale * r.r;
        }
        if (q + scale * r.l < this.l) {
          this.l = q + scale * r.l;
        }
        if (q + scale * (r.w + (r.L || 0) + (r.R || 0)) > this.w) {
          this.w = q + scale * (r.w + (r.L || 0) + (r.R || 0));
        }
        if (s + scale * r.h > this.h) {
          this.h = s + scale * r.h;
        }
        if (r.D && (this.D == null || scale * r.D - s > this.D) && scale * r.D > this.d) {
          this.D = scale * r.D - s;
        } else {
          if (r.D == null && this.D) {
            delete this.D;
          }
        }
        if (scale * r.d - s > this.d) {
          this.d = scale * r.d - s;
        }
        if (s + scale * r.t > this.t) {
          this.t = s + scale * r.t;
        }
        if (scale * r.b - s > this.b) {
          this.b = scale * r.b - s;
        }
      },
      append: function(r) {
        scale = r.rscale;
        var q = this.w;
        if (q + scale * r.r > this.r) {
          this.r = q + scale * r.r;
        }
        if (q + scale * r.l < this.l) {
          this.l = q + scale * r.l;
        }
        this.w += scale * (r.w + (r.L || 0) + (r.R || 0));
        if (scale * r.h > this.h) {
          this.h = scale * r.h;
        }
        if (r.D && (this.D == null || scale * r.D > this.D) && scale * r.D > this.d) {
          this.D = scale * r.D;
        } else {
          if (r.D == null && this.D) {
            delete this.D;
          }
        }
        if (scale * r.d > this.d) {
          this.d = scale * r.d;
        }
        if (scale * r.t > this.t) {
          this.t = scale * r.t;
        }
        if (scale * r.b > this.b) {
          this.b = scale * r.b;
        }
      },
      updateFrom: function(q) {
        this.h = q.h;
        this.d = q.d;
        this.w = q.w;
        this.r = q.r;
        this.l = q.l;
        this.t = q.t;
        this.b = q.b;
        if (q.D) {
          this.D = q.D;
        } else {
          delete this.D;
        }
      },
      adjust: function(r, q, t, s) {
        this[q] += g.length2em(r, 1, this.scale);
        if (s == null) {
          if (this[q] > this[t]) {
            this[t] = this[q];
          }
        } else {
          if (this[t] < s) {
            this[t] = s;
          }
        }
      }
    }, {
      zero: function() {
        return g.BBOX({
          h: 0,
          d: 0,
          w: 0,
          l: 0,
          r: 0,
          t: 0,
          b: 0,
          scale: 1,
          rscale: 1
        });
      },
      empty: function(q) {
        if (!q) {
          q = g.BBOX.zero();
        }
        q.h = q.d = q.r = q.t = q.b = -m;
        q.w = 0;
        q.l = m;
        return q;
      },
      styleAdjust: [["borderTopWidth", "h", "t"], ["borderRightWidth", "w", "r"], ["borderBottomWidth", "d", "b"], ["borderLeftWidth", "w", "l", 0], ["paddingTop", "h", "t"], ["paddingRight", "w", "r"], ["paddingBottom", "d", "b"], ["paddingLeft", "w", "l", 0]]
    });
    MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
      h = MathJax.ElementJax.mml;
      h.mbase.Augment({
        toCommonHTML: function(r, q) {
          return this.CHTMLdefaultNode(r, q);
        },
        CHTMLmultiline: function() {
          h.mbase.CHTMLautoloadFile("multiline");
        },
        CHTMLdefaultNode: function(t, r) {
          if (!r) {
            r = {};
          }
          t = this.CHTMLcreateNode(t);
          this.CHTML = g.BBOX.empty();
          this.CHTMLhandleStyle(t);
          this.CHTMLhandleScale(t);
          if (this.isToken) {
            this.CHTMLgetVariant();
          }
          var q = Math.max((r.minChildren || 0), this.data.length);
          for (var s = 0; s < q; s++) {
            this.CHTMLaddChild(t, s, r);
          }
          if (!r.noBBox) {
            this.CHTML.clean();
          }
          this.CHTMLhandleSpace(t);
          this.CHTMLhandleBBox(t);
          this.CHTMLhandleColor(t);
          return t;
        },
        CHTMLaddChild: function(v, r, q) {
          var x = this.data[r],
              u;
          if (x) {
            var s = q.childNodes;
            if (s) {
              if (s instanceof Array) {
                s = s[r] || "span";
              }
              v = g.addElement(v, s);
            }
            u = x.toCommonHTML(v, q.childOptions);
            if (s && x.CHTML.rscale !== 1) {
              v.style.fontSize = v.firstChild.style.fontSize;
              v.firstChild.style.fontSize = "";
            }
            if (!q.noBBox) {
              var w = this.CHTML,
                  t = x.CHTML;
              w.append(t);
              if (t.ic) {
                w.ic = t.ic;
              } else {
                delete w.ic;
              }
              if (t.skew) {
                w.skew = t.skew;
              }
              if (t.pwidth) {
                w.pwidth = t.pwidth;
              }
            }
          } else {
            if (q.forceChild) {
              u = g.addElement(v, "mjx-box");
            }
          }
          return u;
        },
        CHTMLchildNode: function(r, q) {
          r = r.childNodes[q];
          if (r.nodeName.toLowerCase() === "a") {
            r = r.firstChild;
          }
          return r;
        },
        CHTMLcoreNode: function(q) {
          return this.CHTMLchildNode(q, this.CoreIndex());
        },
        CHTMLstretchChildV: function(t, s, v) {
          var u = this.data[t];
          if (u) {
            var x = this.CHTML,
                r = u.CHTML;
            if (r.stretch || (r.stretch == null && u.CHTMLcanStretch("Vertical", s, v))) {
              var q = r.w;
              r = u.CHTMLstretchV(s, v);
              x.w += r.w - q;
              if (x.w > x.r) {
                x.r = x.w;
              }
              if (r.h > x.h) {
                x.h = r.h;
              }
              if (r.d > x.d) {
                x.d = r.d;
              }
              if (r.t > x.t) {
                x.t = r.t;
              }
              if (r.b > x.b) {
                x.b = r.b;
              }
            }
          }
        },
        CHTMLstretchChildH: function(t, q, u) {
          var v = this.data[t];
          if (v) {
            var x = this.CHTML,
                s = v.CHTML;
            if (s.stretch || (s.stretch == null && v.CHTMLcanStretch("Horizontal", q))) {
              var r = s.w;
              s = v.CHTMLstretchH(this.CHTMLchildNode(u, t), q);
              x.w += s.w - r;
              if (x.w > x.r) {
                x.r = x.w;
              }
              if (s.h > x.h) {
                x.h = s.h;
              }
              if (s.d > x.d) {
                x.d = s.d;
              }
              if (s.t > x.t) {
                x.t = s.t;
              }
              if (s.b > x.b) {
                x.b = s.b;
              }
            }
          }
        },
        CHTMLcanStretch: function(u, s, t) {
          var r = false;
          if (this.isEmbellished()) {
            var q = this.Core();
            if (q && q !== this) {
              r = q.CHTMLcanStretch(u, s, t);
            }
          }
          this.CHTML.stretch = r;
          return r;
        },
        CHTMLstretchV: function(q, r) {
          this.CHTML.updateFrom(this.Core().CHTMLstretchV(q, r));
          return this.CHTML;
        },
        CHTMLstretchH: function(r, q) {
          this.CHTML.updateFrom(this.CHTMLstretchCoreH(r, q));
          return this.CHTML;
        },
        CHTMLstretchCoreH: function(r, q) {
          return this.Core().CHTMLstretchH(this.CHTMLcoreNode(r), q);
        },
        CHTMLcreateNode: function(q) {
          if (!this.CHTML) {
            this.CHTML = {};
          }
          this.CHTML = g.BBOX.zero();
          if (this.href) {
            q = g.addElement(q, "a", {
              href: this.href,
              isMathJax: true
            });
          }
          if (!this.CHTMLnodeID) {
            this.CHTMLnodeID = g.GetID();
          }
          var r = (this.id || "MJXc-Node-" + this.CHTMLnodeID) + g.idPostfix;
          return this.CHTMLhandleAttributes(g.addElement(q, "mjx-" + this.type, {id: r}));
        },
        CHTMLnodeElement: function() {
          if (!this.CHTMLnodeID) {
            return null;
          }
          return document.getElementById((this.id || "MJXc-Node-" + this.CHTMLnodeID) + g.idPostfix);
        },
        CHTMLlength2em: function(r, q) {
          return g.length2em(r, q, this.CHTML.scale);
        },
        CHTMLhandleAttributes: function(t) {
          if (this["class"]) {
            if (t.className) {
              t.className += " " + this["class"];
            } else {
              t.className = this["class"];
            }
          }
          if (this.attrNames) {
            var x = this.attrNames,
                s = h.nocopyAttributes,
                w = c.config.ignoreMMLattributes;
            var u = (this.type === "mstyle" ? h.math.prototype.defaults : this.defaults);
            for (var r = 0,
                q = x.length; r < q; r++) {
              var v = x[r];
              if (w[v] == false || (!s[v] && !w[v] && u[v] == null && typeof(t[v]) === "undefined")) {
                t.setAttribute(v, this.attr[v]);
              }
            }
          }
          return t;
        },
        CHTMLhandleScale: function(s) {
          var u = 1,
              r = this.parent,
              t = (r ? r.CHTML.scale : 1);
          var q = this.getValues("scriptlevel", "fontsize");
          q.mathsize = this.Get("mathsize", null, !this.isToken);
          if (q.scriptlevel !== 0) {
            if (q.scriptlevel > 2) {
              q.scriptlevel = 2;
            }
            u = Math.pow(this.Get("scriptsizemultiplier"), q.scriptlevel);
            q.scriptminsize = g.length2em(this.Get("scriptminsize"), 0.8, 1);
            if (u < q.scriptminsize) {
              u = q.scriptminsize;
            }
          }
          if (this.removedStyles && this.removedStyles.fontSize && !q.fontsize) {
            q.fontsize = this.removedStyles.fontSize;
          }
          if (q.fontsize && !this.mathsize) {
            q.mathsize = q.fontsize;
          }
          if (q.mathsize !== 1) {
            u *= g.length2em(q.mathsize, 1, 1);
          }
          this.CHTML.scale = u;
          t = this.CHTML.rscale = u / t;
          if (Math.abs(t - 1) < 0.001) {
            t = 1;
          }
          if (s && t !== 1) {
            s.style.fontSize = g.Percent(t);
          }
          return u;
        },
        CHTMLhandleStyle: function(t) {
          if (!this.style) {
            return;
          }
          var s = t.style;
          s.cssText = this.style;
          this.removedStyles = {};
          for (var r = 0,
              q = g.removeStyles.length; r < q; r++) {
            var u = g.removeStyles[r];
            if (s[u]) {
              this.removedStyles[u] = s[u];
              s[u] = "";
            }
          }
        },
        CHTMLhandleBBox: function(u) {
          var r = this.CHTML,
              t = u.style;
          if (this.data.length === 1 && (this.data[0].CHTML || {}).pwidth) {
            r.pwidth = this.data[0].CHTML.pwidth;
            r.mwidth = this.data[0].CHTML.mwidth;
            t.width = "100%";
          } else {
            if (r.pwidth) {
              r.mwidth = g.Em(r.w);
              t.width = "100%";
            } else {
              if (r.w < 0) {
                t.width = "0px";
                t.marginRight = g.Em(r.w);
              }
            }
          }
          if (!this.style) {
            return;
          }
          for (var s = 0,
              q = g.BBOX.styleAdjust.length; s < q; s++) {
            var v = g.BBOX.styleAdjust[s];
            if (v && t[v[0]]) {
              r.adjust(t[v[0]], v[1], v[2], v[3]);
            }
          }
        },
        CHTMLhandleColor: function(q) {
          if (this.mathcolor) {
            q.style.color = this.mathcolor;
          } else {
            if (this.color) {
              q.style.color = this.color;
            }
          }
          if (this.mathbackground) {
            q.style.backgroundColor = this.mathbackground;
          } else {
            if (this.background) {
              q.style.backgroundColor = this.background;
            }
          }
        },
        CHTMLhandleSpace: function(q) {
          if (!this.useMMLspacing) {
            var r = this.texSpacing();
            if (r !== "") {
              this.CHTML.L = this.CHTMLlength2em(r);
              q.className += " " + g.SPACECLASS[r];
            }
          }
        },
        CHTMLhandleText: function(r, s, q) {
          if (r.firstChild && !this.CHTML) {
            this.CHTML = g.BBOX.empty();
          }
          this.CHTML = g.handleText(r, s, q, this.CHTML);
        },
        CHTMLgetVariant: function() {
          var q = this.getValues("mathvariant", "fontfamily", "fontweight", "fontstyle"),
              s;
          q.hasVariant = this.Get("mathvariant", true);
          if (this.removedStyles) {
            s = this.removedStyles;
            if (s.fontFamily) {
              q.family = s.fontFamily;
            }
            if (s.fontWeight) {
              q.weight = s.fontWeight;
            }
            if (s.fontStyle) {
              q.style = s.fontStyle;
            }
          }
          if (!q.hasVariant) {
            if (q.fontfamily) {
              q.family = q.fontfamily;
            }
            if (q.fontweight) {
              q.weight = q.fontweight;
            }
            if (q.fontstyle) {
              q.style = q.fontstyle;
            }
          }
          if (q.weight && q.weight.match(/^\d+$/)) {
            q.weight = (parseInt(q.weight) > 600 ? "bold" : "normal");
          }
          var r = q.mathvariant;
          if (this.variantForm) {
            r = "-TeX-variant";
          }
          if (q.family && !q.hasVariant) {
            if (!q.weight && q.mathvariant.match(/bold/)) {
              q.weight = "bold";
            }
            if (!q.style && q.mathvariant.match(/italic/)) {
              q.style = "italic";
            }
            this.CHTMLvariant = {
              fonts: [],
              noRemap: true,
              cache: {},
              style: {
                "font-family": q.family,
                "font-weight": q.weight || "normal",
                "font-style": q.style || "normal"
              }
            };
            return;
          }
          if (q.weight === "bold") {
            r = {
              normal: h.VARIANT.BOLD,
              italic: h.VARIANT.BOLDITALIC,
              fraktur: h.VARIANT.BOLDFRAKTUR,
              script: h.VARIANT.BOLDSCRIPT,
              "sans-serif": h.VARIANT.BOLDSANSSERIF,
              "sans-serif-italic": h.VARIANT.SANSSERIFBOLDITALIC
            }[r] || r;
          } else {
            if (q.weight === "normal") {
              r = {
                bold: h.VARIANT.normal,
                "bold-italic": h.VARIANT.ITALIC,
                "bold-fraktur": h.VARIANT.FRAKTUR,
                "bold-script": h.VARIANT.SCRIPT,
                "bold-sans-serif": h.VARIANT.SANSSERIF,
                "sans-serif-bold-italic": h.VARIANT.SANSSERIFITALIC
              }[r] || r;
            }
          }
          if (q.style === "italic") {
            r = {
              normal: h.VARIANT.ITALIC,
              bold: h.VARIANT.BOLDITALIC,
              "sans-serif": h.VARIANT.SANSSERIFITALIC,
              "bold-sans-serif": h.VARIANT.SANSSERIFBOLDITALIC
            }[r] || r;
          } else {
            if (q.style === "normal") {
              r = {
                italic: h.VARIANT.NORMAL,
                "bold-italic": h.VARIANT.BOLD,
                "sans-serif-italic": h.VARIANT.SANSSERIF,
                "sans-serif-bold-italic": h.VARIANT.BOLDSANSSERIF
              }[r] || r;
            }
          }
          this.CHTMLvariant = g.FONTDATA.VARIANT[r] || g.FONTDATA.VARIANT[h.VARIANT.NORMAL];
        },
        CHTMLbboxFor: function(q) {
          if (this.data[q] && this.data[q].CHTML) {
            return this.data[q].CHTML;
          }
          return g.BBOX.zero();
        },
        CHTMLdrawBBox: function(r, s) {
          if (!s) {
            s = this.CHTML;
          }
          var q = g.Element("mjx-box", {style: {
              opacity: 0.25,
              "margin-left": g.Em(-(s.w + (s.R || 0)))
            }}, [["mjx-box", {style: {
              height: g.Em(s.h),
              width: g.Em(s.w),
              "background-color": "red"
            }}], ["mjx-box", {style: {
              height: g.Em(s.d),
              width: g.Em(s.w),
              "margin-left": g.Em(-s.w),
              "vertical-align": g.Em(-s.d),
              "background-color": "green"
            }}]]);
          if (r.nextSibling) {
            r.parentNode.insertBefore(q, r.nextSibling);
          } else {
            r.parentNode.appendChild(q);
          }
        },
        CHTMLnotEmpty: function(q) {
          while (q && q.data.length < 2 && (q.type === "mrow" || q.type === "texatom")) {
            q = q.data[0];
          }
          return !!q;
        }
      }, {
        CHTMLautoload: function() {
          var q = g.autoloadDir + "/" + this.type + ".js";
          c.RestartAfter(i.Require(q));
        },
        CHTMLautoloadFile: function(q) {
          var r = g.autoloadDir + "/" + q + ".js";
          c.RestartAfter(i.Require(r));
        },
        CHTMLstretchV: function(q, r) {
          this.Core().CHTMLstretchV(q, r);
          this.toCommonHTML(this.CHTMLnodeElement(), true);
          return this.CHTML;
        },
        CHTMLstretchH: function(r, q) {
          this.CHTMLstretchCoreH(r, q);
          this.toCommonHTML(r, true);
          return this.CHTML;
        }
      });
      h.chars.Augment({toCommonHTML: function(r, q) {
          if (q == null) {
            q = {};
          }
          var s = this.toString();
          if (q.remap) {
            s = q.remap(s, q.remapchars);
          }
          this.CHTMLhandleText(r, s, q.variant || this.parent.CHTMLvariant);
        }});
      h.entity.Augment({toCommonHTML: function(r, q) {
          if (q == null) {
            q = {};
          }
          var s = this.toString();
          if (q.remapchars) {
            s = q.remap(s, q.remapchars);
          }
          this.CHTMLhandleText(r, s, q.variant || this.parent.CHTMLvariant);
        }});
      h.math.Augment({toCommonHTML: function(v) {
          v = this.CHTMLdefaultNode(v);
          if (this.CHTML.w < 0) {
            v.parentNode.style.width = "0px";
            v.parentNode.style.marginRight = g.Em(this.CHTML.w);
          }
          var t = this.Get("alttext");
          if (t && !v.getAttribute("aria-label")) {
            v.setAttribute("aria-label", t);
          }
          if (!v.getAttribute("role")) {
            v.setAttribute("role", "math");
          }
          if (this.CHTML.pwidth) {
            v.parentNode.style.width = this.CHTML.pwidth;
            v.parentNode.style.minWidth = this.CHTML.mwidth || g.Em(this.CHTML.w);
          } else {
            if (!this.isMultiline && this.Get("display") === "block") {
              var s = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
              if (s.indentalignfirst !== h.INDENTALIGN.INDENTALIGN) {
                s.indentalign = s.indentalignfirst;
              }
              if (s.indentalign === h.INDENTALIGN.AUTO) {
                s.indentalign = n.displayAlign;
              }
              if (s.indentshiftfirst !== h.INDENTSHIFT.INDENTSHIFT) {
                s.indentshift = s.indentshiftfirst;
              }
              if (s.indentshift === "auto") {
                s.indentshift = "0";
              }
              var r = this.CHTMLlength2em(s.indentshift, g.cwidth);
              if (n.displayIndent !== "0") {
                var q = this.CHTMLlength2em(n.displayIndent, g.cwidth);
                r += (s.indentalign === h.INDENTALIGN.RIGHT ? -q : q);
              }
              var u = v.parentNode.parentNode.style;
              u.textAlign = s.indentalign;
              if (r) {
                r *= g.em / g.outerEm;
                c.Insert(u, ({
                  left: {marginLeft: g.Em(r)},
                  right: {marginRight: g.Em(-r)},
                  center: {
                    marginLeft: g.Em(r),
                    marginRight: g.Em(-r)
                  }
                })[s.indentalign]);
              }
            }
          }
          return v;
        }});
      h.mi.Augment({toCommonHTML: function(q) {
          q = this.CHTMLdefaultNode(q);
          var s = this.CHTML,
              r = this.data.join("");
          if (s.skew != null && r.length !== 1) {
            delete s.skew;
          }
          if (s.r > s.w && r.length === 1 && !this.CHTMLvariant.noIC) {
            s.ic = s.r - s.w;
            s.w = s.r;
            q.lastChild.style.paddingRight = g.Em(s.ic);
          }
          return q;
        }});
      h.mn.Augment({toCommonHTML: function(q) {
          q = this.CHTMLdefaultNode(q);
          var s = this.CHTML,
              r = this.data.join("");
          if (s.skew != null && r.length !== 1) {
            delete s.skew;
          }
          if (s.r > s.w && r.length === 1 && !this.CHTMLvariant.noIC) {
            s.ic = s.r - s.w;
            s.w = s.r;
            q.lastChild.style.paddingRight = g.Em(s.ic);
          }
          return q;
        }});
      h.mo.Augment({
        toCommonHTML: function(t) {
          t = this.CHTMLcreateNode(t);
          this.CHTMLhandleStyle(t);
          this.CHTMLhandleScale(t);
          this.CHTMLgetVariant();
          g.BBOX.empty(this.CHTML);
          var r = this.getValues("displaystyle", "largeop");
          r.variant = this.CHTMLvariant;
          r.text = this.data.join("");
          if (r.text == "") {
            if (this.fence) {
              t.style.width = g.Em(g.TEX.nulldelimiterspace);
            }
          } else {
            this.CHTMLadjustAccent(r);
            this.CHTMLadjustVariant(r);
            for (var s = 0,
                q = this.data.length; s < q; s++) {
              this.CHTMLaddChild(t, s, {childOptions: {
                  variant: r.mathvariant,
                  remap: this.remap,
                  remapchars: r.remapchars
                }});
            }
            if (r.text.length !== 1) {
              delete this.CHTML.skew;
            } else {
              if (this.CHTML.w === 0 && this.CHTML.l < 0) {
                this.CHTMLfixCombiningChar(t);
              }
            }
            if (r.largeop) {
              this.CHTMLcenterOp(t);
            }
          }
          this.CHTML.clean();
          this.CHTMLhandleBBox(t);
          this.CHTMLhandleSpace(t);
          this.CHTMLhandleColor(t);
          return t;
        },
        CHTMLhandleSpace: function(t) {
          if (this.useMMLspacing) {
            var r = this.getValues("scriptlevel", "lspace", "rspace");
            r.lspace = Math.max(0, this.CHTMLlength2em(r.lspace));
            r.rspace = Math.max(0, this.CHTMLlength2em(r.rspace));
            if (r.scriptlevel > 0) {
              if (!this.hasValue("lspace")) {
                r.lspace = 0.15;
              }
              if (!this.hasValue("rspace")) {
                r.rspace = 0.15;
              }
            }
            var q = this,
                s = this.Parent();
            while (s && s.isEmbellished() && s.Core() === q) {
              q = s;
              s = s.Parent();
              t = q.CHTMLnodeElement();
            }
            if (r.lspace) {
              t.style.paddingLeft = g.Em(r.lspace);
            }
            if (r.rspace) {
              t.style.paddingRight = g.Em(r.rspace);
            }
            this.CHTML.L = r.lspace;
            this.CHTML.R = r.rspace;
          } else {
            this.SUPER(arguments).CHTMLhandleSpace.apply(this, arguments);
          }
        },
        CHTMLadjustAccent: function(s) {
          var r = this.CoreParent();
          s.parent = r;
          if (s.text.length === 1 && r && r.isa(h.munderover) && this.CoreText(r.data[r.base]).length === 1) {
            var t = r.data[r.over],
                q = r.data[r.under];
            if (t && this === t.CoreMO() && r.Get("accent")) {
              s.remapchars = g.FONTDATA.REMAPACCENT;
            } else {
              if (q && this === q.CoreMO() && r.Get("accentunder")) {
                s.remapchars = g.FONTDATA.REMAPACCENTUNDER;
              }
            }
          }
        },
        CHTMLadjustVariant: function(r) {
          var q = r.parent,
              s = (q && q.isa(h.msubsup) && this !== q.data[q.base]);
          if (r.largeop) {
            r.mathvariant = (r.displaystyle ? "-largeOp" : "-smallOp");
          }
          if (s) {
            r.remapchars = this.remapChars;
            if (r.text.match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
              r.mathvariant = "-TeX-variant";
            }
          }
        },
        CHTMLfixCombiningChar: function(q) {
          q = q.firstChild;
          var r = g.Element("mjx-span", {style: {
              width: ".25em",
              "margin-left": "-.25em"
            }});
          q.insertBefore(r, q.firstChild);
        },
        CHTMLcenterOp: function(q) {
          var s = this.CHTML;
          var r = (s.h - s.d) / 2 - g.TEX.axis_height;
          if (Math.abs(r) > 0.001) {
            q.style.verticalAlign = g.Em(-r);
          }
          s.h -= r;
          s.d += r;
          if (s.r > s.w) {
            s.ic = s.r - s.w;
            s.w = s.r;
            q.style.paddingRight = g.Em(s.ic);
          }
        },
        CHTMLcanStretch: function(u, s, t) {
          if (!this.Get("stretchy")) {
            return false;
          }
          var v = this.data.join("");
          if (v.length !== 1) {
            return false;
          }
          var r = {text: v};
          this.CHTMLadjustAccent(r);
          if (r.remapchars) {
            v = r.remapchars[v] || v;
          }
          v = g.FONTDATA.DELIMITERS[v.charCodeAt(0)];
          var q = (v && v.dir === u.substr(0, 1));
          if (q) {
            q = (this.CHTML.h !== s || this.CHTML.d !== t || !!this.Get("minsize", true) || !!this.Get("maxsize", true));
            if (q) {
              this.CHTML.stretch = true;
            }
          }
          return q;
        },
        CHTMLstretchV: function(t, w) {
          var u = this.CHTMLnodeElement(),
              v = this.CHTML;
          var r = this.getValues("symmetric", "maxsize", "minsize");
          var s,
              q = g.TEX.axis_height;
          if (r.symmetric) {
            s = 2 * Math.max(t - q, w + q);
          } else {
            s = t + w;
          }
          r.maxsize = this.CHTMLlength2em(r.maxsize, v.h + v.d);
          r.minsize = this.CHTMLlength2em(r.minsize, v.h + v.d);
          s = Math.max(r.minsize, Math.min(r.maxsize, s));
          if (s !== v.sH) {
            if (s != r.minsize) {
              s = [Math.max(s * g.TEX.delimiterfactor / 1000, s - g.TEX.delimitershortfall), s];
            }
            while (u.firstChild) {
              u.removeChild(u.firstChild);
            }
            this.CHTML = v = g.createDelimiter(u, this.data.join("").charCodeAt(0), s, v);
            v.sH = (s instanceof Array ? s[1] : s);
            if (r.symmetric) {
              s = (v.h + v.d) / 2 + q;
            } else {
              s = (v.h + v.d) * t / (t + w);
            }
            s -= v.h;
            if (Math.abs(s) > 0.05) {
              u.style.verticalAlign = g.Em(s);
              v.h += s;
              v.d -= s;
              v.t += s;
              v.b -= s;
            }
          }
          return this.CHTML;
        },
        CHTMLstretchH: function(s, q) {
          var t = this.CHTML;
          var r = this.getValues("maxsize", "minsize", "mathvariant", "fontweight");
          if ((r.fontweight === "bold" || (this.removedStyles || {}).fontWeight === "bold" || parseInt(r.fontweight) >= 600) && !this.Get("mathvariant", true)) {
            r.mathvariant = h.VARIANT.BOLD;
          }
          r.maxsize = this.CHTMLlength2em(r.maxsize, t.w);
          r.minsize = this.CHTMLlength2em(r.minsize, t.w);
          q = Math.max(r.minsize, Math.min(r.maxsize, q));
          if (q !== t.sW) {
            while (s.firstChild) {
              s.removeChild(s.firstChild);
            }
            this.CHTML = t = g.createDelimiter(s, this.data.join("").charCodeAt(0), q, t, r.mathvariant);
            t.sW = q;
          }
          return this.CHTML;
        }
      });
      h.mtext.Augment({CHTMLgetVariant: function() {
          if (g.config.mtextFontInherit || this.Parent().type === "merror") {
            var s = (g.config.scale / 100) / g.scale;
            var r = {
              cache: {},
              fonts: [],
              className: "MJXc-font-inherit",
              rscale: s,
              style: {"font-size": g.Percent(s)}
            };
            var q = this.Get("mathvariant");
            if (q.match(/bold/)) {
              r.style["font-weight"] = "bold";
            }
            if (q.match(/italic|-tex-mathit/)) {
              r.style["font-style"] = "italic";
            }
            if (q === "monospace") {
              r.className += " MJXc-monospace-font";
            }
            if (q === "double-struck") {
              r.className += " MJXc-double-struck-font";
            }
            if (q.match(/fraktur/)) {
              r.className += " MJXc-fraktur-font";
            }
            if (q.match(/sans-serif/)) {
              r.className += " MJXc-sans-serif-font";
            }
            if (q.match(/script/)) {
              r.className += " MJXc-script-font";
            }
            this.CHTMLvariant = r;
          } else {
            this.SUPER(arguments).CHTMLgetVariant.call(this);
          }
        }});
      h.merror.Augment({toCommonHTML: function(q) {
          q = this.CHTMLdefaultNode(q);
          var r = this.CHTML;
          r.rescale(0.9);
          r.h += 3 / g.em;
          if (r.h > r.t) {
            r.t = r.h;
          }
          r.d += 3 / g.em;
          if (r.d > r.b) {
            r.b = r.d;
          }
          r.w += 8 / g.em;
          r.r = r.w;
          r.l = 0;
          return q;
        }});
      h.mspace.Augment({toCommonHTML: function(t) {
          t = this.CHTMLcreateNode(t);
          this.CHTMLhandleStyle(t);
          this.CHTMLhandleScale(t);
          var r = this.getValues("height", "depth", "width");
          var q = this.CHTMLlength2em(r.width),
              s = this.CHTMLlength2em(r.height),
              v = this.CHTMLlength2em(r.depth);
          var u = this.CHTML;
          u.w = u.r = q;
          u.h = u.t = s;
          u.d = u.b = v;
          u.l = 0;
          if (q < 0) {
            t.style.marginRight = g.Em(q);
            q = 0;
          }
          t.style.width = g.Em(q);
          t.style.height = g.Em(Math.max(0, s + v));
          if (v) {
            t.style.verticalAlign = g.Em(-v);
          }
          this.CHTMLhandleBBox(t);
          this.CHTMLhandleColor(t);
          return t;
        }});
      h.mpadded.Augment({
        toCommonHTML: function(s, q) {
          var r;
          if (q) {
            s = s.firstChild;
            r = s.firstChild;
          } else {
            s = this.CHTMLdefaultNode(s, {
              childNodes: "mjx-box",
              forceChild: true
            });
            r = s.firstChild;
            s = g.addElement(s, "mjx-block");
            s.appendChild(r);
            g.addElement(s, "mjx-strut");
          }
          var v = this.CHTMLbboxFor(0);
          var C = this.getValues("width", "height", "depth", "lspace", "voffset");
          var A = 0,
              z = 0,
              B = v.w,
              t = v.h,
              u = v.d;
          r.style.width = 0;
          r.style.margin = g.Em(-t) + " 0 " + g.Em(-u);
          if (C.width !== "") {
            B = this.CHTMLdimen(C.width, "w", B, 0);
          }
          if (C.height !== "") {
            t = this.CHTMLdimen(C.height, "h", t, 0);
          }
          if (C.depth !== "") {
            u = this.CHTMLdimen(C.depth, "d", u, 0);
          }
          if (C.voffset !== "") {
            z = this.CHTMLdimen(C.voffset);
            if (z) {
              r.style.position = "relative";
              r.style.top = g.Em(-z);
            }
          }
          if (C.lspace !== "") {
            A = this.CHTMLdimen(C.lspace);
            if (A) {
              r.style.position = "relative";
              r.style.left = g.Em(A);
            }
          }
          s.style.width = 0;
          s.style.marginTop = g.Em(t - e);
          s.style.padding = "0 " + g.Em(B) + " " + g.Em(u) + " 0";
          var D = g.BBOX({
            w: B,
            h: t,
            d: u,
            l: 0,
            r: B,
            t: t,
            b: u,
            scale: this.CHTML.scale,
            rscale: this.CHTML.rscale
          });
          D.combine(v, A, z);
          D.w = B;
          D.h = t;
          D.d = u;
          this.CHTML = D;
          return s.parentNode;
        },
        CHTMLstretchV: h.mbase.CHTMLstretchV,
        CHTMLstretchH: h.mbase.CHTMLstretchH,
        CHTMLdimen: function(u, w, v, q) {
          if (q == null) {
            q = -m;
          }
          u = String(u);
          var r = u.match(/width|height|depth/);
          var s = (r ? this.CHTML[r[0].charAt(0)] : (w ? this.CHTML[w] : 0));
          var t = (this.CHTMLlength2em(u, s) || 0);
          if (u.match(/^[-+]/) && v != null) {
            t += v;
          }
          if (q != null) {
            t = Math.max(q, t);
          }
          return t;
        }
      });
      h.munderover.Augment({
        toCommonHTML: function(u, q) {
          var C = this.getValues("displaystyle", "accent", "accentunder", "align");
          var s = this.data[this.base];
          if (!C.displaystyle && s != null && (s.movablelimits || s.CoreMO().Get("movablelimits"))) {
            return h.msubsup.prototype.toCommonHTML.call(this, u, q);
          }
          var z,
              x,
              r = [];
          if (q) {
            if (this.data[this.base]) {
              s = g.getNode(u, "mjx-op");
            }
            if (this.data[this.under]) {
              z = g.getNode(u, "mjx-under");
            }
            if (this.data[this.over]) {
              x = g.getNode(u, "mjx-over");
            }
            r[0] = s;
            r[1] = z || x;
            r[2] = x;
          } else {
            var w = ["mjx-op", "mjx-under", "mjx-over"];
            if (this.over === 1) {
              w[1] = w[2];
            }
            u = this.CHTMLdefaultNode(u, {
              childNodes: w,
              noBBox: true,
              forceChild: true,
              minChildren: 2
            });
            r[0] = s = u.removeChild(u.firstChild);
            r[1] = z = x = u.removeChild(u.firstChild);
            if (u.firstChild) {
              r[2] = x = u.removeChild(u.firstChild);
            }
          }
          var v = [],
              t = this.CHTMLgetBBoxes(v, r, C);
          var D = v[this.base],
              A = this.CHTML;
          A.w = t;
          A.h = D.h;
          A.d = D.d;
          var y = s,
              B = 0;
          if (D.ic) {
            B = 1.3 * D.ic + 0.05;
          }
          if (this.data[this.over]) {
            y = this.CHTMLaddOverscript(x, v, C, B, s, q);
          }
          if (this.data[this.under]) {
            this.CHTMLaddUnderscript(z, v, C, B, u, y, q);
          } else {
            if (!q) {
              u.appendChild(y);
            }
          }
          this.CHTMLplaceBoxes(s, z, x, C, v);
          return u;
        },
        CHTMLgetBBoxes: function(y, u, t) {
          var v,
              r = this.data.length,
              x,
              s = -m,
              q = s;
          for (v = 0; v < r; v++) {
            y[v] = this.CHTMLbboxFor(v);
            y[v].x = y[v].y = 0;
            if (this.data[v]) {
              y[v].stretch = this.data[v].CHTMLcanStretch("Horizontal");
            }
            x = (v === this.base ? 1 : y[v].rscale);
            if (v !== this.base) {
              delete y[v].L;
              delete y[v].R;
            }
            q = Math.max(q, x * (y[v].w + (y[v].L || 0) + (y[v].R || 0)));
            if (!y[v].stretch && q > s) {
              s = q;
            }
          }
          if (s === -m) {
            s = q;
          }
          for (v = 0; v < r; v++) {
            if (y[v].stretch) {
              x = (v === this.base ? 1 : y[v].rscale);
              y[v] = this.data[v].CHTMLstretchH(u[v].firstChild, s / x);
              y[v].x = y[v].y = 0;
              q = Math.max(q, x * (y[v].w + (y[v].L || 0) + (y[v].R || 0)));
            }
          }
          if (!y[this.base]) {
            y[this.base] = g.BBOX.empty();
          }
          return q;
        },
        CHTMLaddOverscript: function(z, x, D, C, r, q) {
          var B = this.CHTML;
          var w,
              v,
              u = g.TEX.big_op_spacing5,
              t;
          var y = x[this.over],
              E = x[this.base],
              s = y.rscale;
          if (!q) {
            var A = g.Element("mjx-stack");
            A.appendChild(z);
            A.appendChild(r);
          }
          if (y.D) {
            y.d = y.D;
          }
          if (y.d < 0) {
            z.firstChild.style.verticalAlign = "top";
            z.style.height = g.Em(y.h + y.d);
          }
          y.x = 0;
          if (D.accent) {
            if (y.w < 0.001) {
              y.x += (y.r - y.l) / 2;
            }
            t = g.TEX.rule_thickness;
            u = 0;
            if (E.skew) {
              y.x += s * E.skew;
              B.skew = s * E.skew;
              if (y.x + s * y.w > B.w) {
                B.skew += (B.w - (y.x + s * y.w)) / 2;
              }
            }
          } else {
            w = g.TEX.big_op_spacing1;
            v = g.TEX.big_op_spacing3;
            t = Math.max(w, v - Math.max(0, s * y.d));
          }
          y.x += C / 2;
          y.y = B.h + t + u + s * y.d;
          if (t) {
            z.style.paddingBottom = g.Em(t / s);
          }
          if (u) {
            z.style.paddingTop = g.Em(u / s);
          }
          return A;
        },
        CHTMLaddUnderscript: function(z, x, C, B, r, y, q) {
          var A = this.CHTML;
          var w,
              v,
              u = g.TEX.big_op_spacing5,
              t;
          var D = x[this.under],
              s = D.rscale;
          if (!q) {
            g.addElement(r, "mjx-itable", {}, [["mjx-row", {}, [["mjx-cell"]]], ["mjx-row"]]);
            r.firstChild.firstChild.firstChild.appendChild(y);
            r.firstChild.lastChild.appendChild(z);
          }
          if (D.D) {
            D.d = D.D;
          }
          if (D.d < 0) {
            z.firstChild.style.verticalAlign = "top";
            r.firstChild.style.marginBottom = g.Em(D.d);
          }
          if (C.accentunder) {
            t = 2 * g.TEX.rule_thickness;
            u = 0;
          } else {
            w = g.TEX.big_op_spacing2;
            v = g.TEX.big_op_spacing4;
            t = Math.max(w, v - s * D.h);
          }
          D.x = -B / 2;
          D.y = -(A.d + t + u + s * D.h);
          if (t) {
            z.style.paddingTop = g.Em(t / s);
          }
          if (u) {
            z.style.paddingBottom = g.Em(u / s);
          }
        },
        CHTMLplaceBoxes: function(q, z, y, C, x) {
          var r = this.CHTML.w,
              v,
              t = x.length,
              u;
          var B = g.BBOX.zero();
          B.scale = this.CHTML.scale;
          B.rscale = this.CHTML.rscale;
          x[this.base].x = x[this.base].y = 0;
          var D = m;
          for (v = 0; v < t; v++) {
            u = (v === this.base ? 1 : x[v].rscale);
            var A = u * (x[v].w + (x[v].L || 0) + (x[v].R || 0));
            x[v].x += {
              left: 0,
              center: (r - A) / 2,
              right: r - A
            }[C.align];
            if (x[v].x < D) {
              D = x[v].x;
            }
          }
          for (v = 0; v < t; v++) {
            if (this.data[v]) {
              u = (v === this.base ? 1 : x[v].rscale);
              if (x[v].x - D) {
                var s = (v === this.base ? q : v === this.over ? y : z);
                s.style.paddingLeft = g.Em((x[v].x - D) / u);
              }
              B.combine(x[v], x[v].x - D, x[v].y);
            }
          }
          this.CHTML = B;
        },
        CHTMLstretchV: h.mbase.CHTMLstretchV,
        CHTMLstretchH: h.mbase.CHTMLstretchH,
        CHTMLchildNode: function(s, r) {
          var q = ["mjx-op", "mjx-under", "mjx-over"];
          if (this.over === 1) {
            q[1] = q[2];
          }
          return g.getNode(s, q[r]);
        }
      });
      h.msubsup.Augment({
        toCommonHTML: function(R, X) {
          var A = this.getValues("displaystyle", "subscriptshift", "superscriptshift", "texprimestyle");
          var C,
              G,
              z;
          if (X) {
            if (this.data[this.base]) {
              C = g.getNode(R, "mjx-base");
            }
            if (this.data[this.sub]) {
              G = g.getNode(R, "mjx-sub");
            }
            if (this.data[this.sup]) {
              z = g.getNode(R, "mjx-sup");
            }
            D = g.getNode(R, "mjx-stack");
          } else {
            var J = ["mjx-base", "mjx-sub", "mjx-sup"];
            if (this.sup === 1) {
              J[1] = J[2];
            }
            R = this.CHTMLdefaultNode(R, {
              childNodes: J,
              noBBox: true,
              forceChild: true,
              minChildren: 3
            });
            C = R.childNodes[this.base];
            G = R.childNodes[this.sub];
            z = R.childNodes[this.sup];
            if (!this.CHTMLnotEmpty(this.data[this.sub])) {
              R.removeChild(G);
              G = null;
            }
            if (!this.CHTMLnotEmpty(this.data[this.sup])) {
              R.removeChild(z);
              z = null;
            }
            if (R.childNodes.length === 3) {
              var D = g.addElement(R, "mjx-stack");
              D.appendChild(z);
              D.appendChild(G);
            }
          }
          var E = [],
              F = g.BBOX.empty(this.CHTML);
          for (var U = 0,
              S = this.data.length; U < S; U++) {
            E[U] = this.CHTMLbboxFor(U);
          }
          var y = E[this.base] || g.BBOX.empty(),
              O = E[this.sub],
              V = E[this.sup];
          var B = (G ? O.rscale : 1),
              w = (z ? V.rscale : 1);
          F.combine(y, 0, 0);
          var W = g.TEX.x_height,
              M = g.TEX.scriptspace;
          var P = g.TEX.sup_drop * w,
              N = g.TEX.sub_drop * B;
          var K = y.h - P,
              I = y.d + N,
              Y = 0,
              Q;
          if (y.ic) {
            F.w -= y.ic;
            C.style.marginRight = g.Em(-y.ic);
            Y = 1.3 * y.ic + 0.05;
          }
          var T = this.data[this.base];
          if (T) {
            if ((T.type === "mrow" || T.type === "mstyle") && T.data.length === 1) {
              T = T.data[0];
            }
            if (T.type === "mi" || T.type === "mo") {
              if (T.data.join("").length === 1 && y.rscale === 1 && !y.sH && !T.Get("largeop")) {
                K = I = 0;
              }
            }
          }
          A.subscriptshift = (A.subscriptshift === "" ? 0 : this.CHTMLlength2em(A.subscriptshift));
          A.superscriptshift = (A.superscriptshift === "" ? 0 : this.CHTMLlength2em(A.superscriptshift));
          var H = F.w;
          if (G) {
            O.w += M;
          }
          if (z) {
            V.w += M;
          }
          if (!z) {
            if (G) {
              I = Math.max(I, g.TEX.sub1, B * O.h - (4 / 5) * W, A.subscriptshift);
              G.style.verticalAlign = g.Em(-I / B);
              G.style.paddingRight = g.Em(M / B);
              F.combine(O, H, -I);
            }
          } else {
            if (!G) {
              Q = g.TEX[(A.displaystyle ? "sup1" : (A.texprimestyle ? "sup3" : "sup2"))];
              K = Math.max(K, Q, w * V.d + (1 / 4) * W, A.superscriptshift);
              z.style.verticalAlign = g.Em(K / w);
              z.style.paddingLeft = g.Em(Y / w);
              z.style.paddingRight = g.Em(M / w);
              F.combine(V, H + Y, K);
            } else {
              I = Math.max(I, g.TEX.sub2);
              var L = g.TEX.rule_thickness;
              if ((K - w * V.d) - (B * O.h - I) < 3 * L) {
                I = 3 * L - K + w * V.d + B * O.h;
                P = (4 / 5) * W - (K - w * V.d);
                if (P > 0) {
                  K += P;
                  I -= P;
                }
              }
              K = Math.max(K, A.superscriptshift);
              I = Math.max(I, A.subscriptshift);
              G.style.paddingRight = g.Em(M / B);
              z.style.paddingBottom = g.Em(K / w + I / B - V.d - O.h / B * w);
              z.style.paddingLeft = g.Em(Y / w);
              z.style.paddingRight = g.Em(M / w);
              D.style.verticalAlign = g.Em(-I);
              F.combine(V, H + Y, K);
              F.combine(O, H, -I);
            }
          }
          F.clean();
          return R;
        },
        CHTMLstretchV: h.mbase.CHTMLstretchV,
        CHTMLstretchH: h.mbase.CHTMLstretchH,
        CHTMLchildNode: function(s, r) {
          var q = ["mjx-base", "mjx-sub", "mjx-sup"];
          if (this.over === 1) {
            q[1] = q[2];
          }
          return g.getNode(s, q[r]);
        }
      });
      h.mfrac.Augment({
        toCommonHTML: function(M) {
          M = this.CHTMLdefaultNode(M, {
            childNodes: ["mjx-numerator", "mjx-denominator"],
            forceChild: true,
            noBBox: true,
            minChildren: 2
          });
          var w = this.getValues("linethickness", "displaystyle", "numalign", "denomalign", "bevelled");
          var N = w.displaystyle;
          var C = M.firstChild,
              s = M.lastChild;
          var x = g.addElement(M, "mjx-box");
          x.appendChild(C);
          x.appendChild(s);
          M.appendChild(x);
          if (w.numalign !== "center") {
            C.style.textAlign = w.numalign;
          }
          if (w.denomalign !== "center") {
            s.style.textAlign = w.denomalign;
          }
          var O = this.CHTMLbboxFor(0),
              A = this.CHTMLbboxFor(1),
              B = g.BBOX.empty(this.CHTML),
              E = O.rscale,
              y = A.rscale;
          w.linethickness = Math.max(0, g.thickness2em(w.linethickness || "0", B.scale));
          var L = g.TEX.min_rule_thickness / g.em,
              S = g.TEX.axis_height;
          var I = w.linethickness,
              K,
              J,
              G,
              F;
          if (w.bevelled) {
            x.className += " MJXc-bevelled";
            var R = (N ? 0.4 : 0.15);
            var D = Math.max(E * (O.h + O.d), y * (A.h + A.d)) + 2 * R;
            var Q = g.Element("mjx-bevel");
            x.insertBefore(Q, s);
            var r = g.createDelimiter(Q, 47, D);
            G = E * (O.d - O.h) / 2 + S + R;
            F = y * (A.d - A.h) / 2 + S - R;
            if (G) {
              C.style.verticalAlign = g.Em(G / E);
            }
            if (F) {
              s.style.verticalAlign = g.Em(F / y);
            }
            Q.style.marginLeft = Q.style.marginRight = g.Em(-R / 2);
            B.combine(O, 0, G);
            B.combine(r, E * O.w - R / 2, 0);
            B.combine(A, E * O.w + r.w - R, F);
            B.clean();
          } else {
            x.className += " MJXc-stacked";
            if (N) {
              G = g.TEX.num1;
              F = g.TEX.denom1;
            } else {
              G = (I === 0 ? g.TEX.num3 : g.TEX.num2);
              F = g.TEX.denom2;
            }
            if (I === 0) {
              K = Math.max((N ? 7 : 3) * g.TEX.rule_thickness, 2 * L);
              J = (G - O.d * E) - (A.h * y - F);
              if (J < K) {
                G += (K - J) / 2;
                F += (K - J) / 2;
              }
            } else {
              K = Math.max((N ? 2 : 0) * L + I, I / 2 + 1.5 * L);
              I = Math.max(I, L);
              J = (G - O.d * E) - (S + I / 2);
              if (J < K) {
                G += (K - J);
              }
              J = (S - I / 2) - (A.h * y - F);
              if (J < K) {
                F += (K - J);
              }
              O.L = O.R = A.L = A.R = 0.1;
              var z = g.addElement(x, "mjx-line", {style: {
                  "border-bottom": g.Px(I * B.scale, 1) + " solid",
                  top: g.Em(-I / 2 - S)
                }});
            }
            B.combine(O, 0, G);
            B.combine(A, 0, -F);
            B.clean();
            x.style.width = g.Em(B.w);
            C.style.width = g.Em(B.w / E);
            s.style.width = g.Em(B.w / y);
            if (z) {
              z.style.width = x.style.width;
            }
            C.style.top = g.Em(-B.h / E);
            s.style.bottom = g.Em(-B.d / y);
            g.addElement(M, "mjx-vsize", {style: {
                height: g.Em(B.h + B.d),
                verticalAlign: g.Em(-B.d)
              }});
          }
          if (!this.texWithDelims && !this.useMMLspacing) {
            var P = g.TEX.nulldelimiterspace;
            x.style.padding = "0 " + g.Em(P);
            B.l += P;
            B.r += P;
            B.w += 2 * P;
          }
          return M;
        },
        CHTMLcanStretch: function(q) {
          return false;
        }
      });
      h.msqrt.Augment({
        toCommonHTML: function(v) {
          v = this.CHTMLdefaultNode(v, {
            childNodes: ["mjx-box", "mjx-root"],
            forceChild: true,
            noBBox: true
          });
          var u = v.firstChild || g.Element("mjx-box");
          var D = g.addElement(v, "mjx-box");
          D.appendChild(u);
          var E = this.CHTMLbboxFor(0),
              B = g.BBOX.empty(this.CHTML);
          var F = g.TEX.rule_thickness,
              w = g.TEX.surd_height,
              s = F,
              r,
              C;
          if (this.Get("displaystyle")) {
            s = g.TEX.x_height;
          }
          r = F + s / 4;
          C = E.h + E.d + r + F;
          var y = g.Element("mjx-surd");
          D.insertBefore(y, u);
          var z = g.createDelimiter(y, 8730, [C - 0.04, C]);
          if (z.h + z.d > C) {
            r = ((z.h + z.d) - (C - F)) / 2;
          }
          C = E.h + r + F;
          var A = this.CHTMLaddRoot(v, z, z.h + z.d - C);
          u.style.paddingTop = g.Em(r);
          u.style.borderTop = g.Px(w * E.scale, 1) + " solid";
          D.style.paddingTop = g.Em(2 * F - w);
          E.h += r + 2 * F;
          B.combine(z, A, C - z.h);
          B.combine(E, A + z.w, 0);
          B.clean();
          return v;
        },
        CHTMLaddRoot: function() {
          return 0;
        }
      });
      h.mroot.Augment({
        toCommonHTML: h.msqrt.prototype.toCommonHTML,
        CHTMLaddRoot: function(y, s, t) {
          if (!this.data[1]) {
            return;
          }
          var x = this.CHTML,
              z = this.data[1].CHTML,
              u = y.firstChild;
          var q = z.rscale;
          var r = this.CHTMLrootHeight(z, s, q) - t;
          var v = Math.min(z.w, z.r);
          var A = Math.max(v, s.offset / q);
          if (r) {
            u.style.verticalAlign = g.Em(r / q);
          }
          if (A > v) {
            u.firstChild.style.paddingLeft = g.Em(A - v);
          }
          A -= s.offset / q;
          u.style.width = g.Em(A);
          x.combine(z, 0, r);
          return A * q;
        },
        CHTMLrootHeight: function(s, q, r) {
          return 0.45 * (q.h + q.d - 0.9) + q.offset + Math.max(0, s.d - 0.075);
        }
      });
      h.mfenced.Augment({toCommonHTML: function(t) {
          t = this.CHTMLcreateNode(t);
          this.CHTMLhandleStyle(t);
          this.CHTMLhandleScale(t);
          this.CHTMLaddChild(t, "open", {});
          for (var s = 0,
              q = this.data.length; s < q; s++) {
            this.CHTMLaddChild(t, "sep" + s, {});
            this.CHTMLaddChild(t, s, {});
          }
          this.CHTMLaddChild(t, "close", {});
          var r = this.CHTML.h,
              u = this.CHTML.d;
          this.CHTMLstretchChildV("open", r, u);
          for (s = 0, q = this.data.length; s < q; s++) {
            this.CHTMLstretchChildV("sep" + s, r, u);
            this.CHTMLstretchChildV(s, r, u);
          }
          this.CHTMLstretchChildV("close", r, u);
          this.CHTMLhandleSpace(t);
          this.CHTMLhandleBBox(t);
          this.CHTMLhandleColor(t);
          return t;
        }});
      h.mrow.Augment({
        toCommonHTML: function(t) {
          t = this.CHTMLdefaultNode(t);
          var w = this.CHTML,
              s = w.h,
              u = w.d,
              v;
          for (var r = 0,
              q = this.data.length; r < q; r++) {
            this.CHTMLstretchChildV(r, s, u);
            if (this.data[r] && this.data[r].CHTML && this.data[r].CHTML.w < 0) {
              v = true;
            }
          }
          if (this.CHTMLlineBreaks()) {
            this.CHTMLmultiline(t);
          } else {
            if (v && w.w) {
              t.style.width = g.Em(Math.max(0, w.w));
            }
            if (w.w < 0) {
              t.style.marginRight = g.Em(w.w);
            }
          }
          return t;
        },
        CHTMLlineBreaks: function() {
          if (!this.parent.linebreakContainer) {
            return false;
          }
          return (k.automatic && this.CHTML.w > g.linebreakWidth) || this.hasNewline();
        },
        CHTMLstretchV: function(q, r) {
          this.CHTMLstretchChildV(this.CoreIndex(), q, r);
          return this.CHTML;
        },
        CHTMLstretchH: function(r, q) {
          this.CHTMLstretchChildH(this.CoreIndex(), q, r);
          return this.CHTML;
        }
      });
      h.mstyle.Augment({toCommonHTML: function(q) {
          q = this.CHTMLdefaultNode(q);
          if (this.scriptlevel && this.data[0]) {
            this.CHTML.rescale(this.data[0].CHTML.rscale);
          }
          return q;
        }});
      h.TeXAtom.Augment({
        toCommonHTML: function(u, s) {
          if (!s) {
            u = this.CHTMLdefaultNode(u);
          }
          if (this.texClass === h.TEXCLASS.VCENTER) {
            var q = g.TEX.axis_height,
                t = this.CHTML;
            var r = q - (t.h + t.d) / 2 + t.d;
            if (Math.abs(r) > 0.001) {
              u.style.verticalAlign = g.Em(r);
              t.h += r;
              t.t += r;
              t.d -= r;
              t.b -= r;
            }
          }
          return u;
        },
        CHTMLstretchV: function(q, r) {
          this.CHTML.updateFrom(this.Core().CHTMLstretchV(q, r));
          this.toCommonHTML(this.CHTMLnodeElement(), true);
          return this.CHTML;
        },
        CHTMLstretchH: function(r, q) {
          this.CHTML.updateFrom(this.CHTMLstretchCoreH(r, q));
          this.toCommonHTML(r, true);
          return this.CHTML;
        }
      });
      h.semantics.Augment({toCommonHTML: function(q) {
          q = this.CHTMLcreateNode(q);
          if (this.data[0]) {
            this.data[0].toCommonHTML(q);
            this.CHTML.updateFrom(this.data[0].CHTML);
          }
          return q;
        }});
      h.annotation.Augment({toCommonHTML: function(q) {
          return this.CHTMLcreateNode(q);
        }});
      h["annotation-xml"].Augment({toCommonHTML: h.mbase.CHTMLautoload});
      h.ms.Augment({toCommonHTML: h.mbase.CHTMLautoload});
      h.mglyph.Augment({toCommonHTML: h.mbase.CHTMLautoload});
      h.menclose.Augment({toCommonHTML: h.mbase.CHTMLautoload});
      h.maction.Augment({toCommonHTML: h.mbase.CHTMLautoload});
      h.mmultiscripts.Augment({toCommonHTML: h.mbase.CHTMLautoload});
      h.mtable.Augment({toCommonHTML: h.mbase.CHTMLautoload});
      MathJax.Hub.Register.StartupHook("onLoad", function() {
        setTimeout(MathJax.Callback(["loadComplete", g, "jax.js"]), 0);
      });
    });
    MathJax.Hub.Register.StartupHook("End Cookie", function() {
      if (c.config.menuSettings.zoom !== "None") {
        i.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
  })(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.CommonHTML);
})(require('process'));