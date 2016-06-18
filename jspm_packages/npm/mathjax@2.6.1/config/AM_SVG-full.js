/* */ 
(function(process) {
  MathJax.Ajax.Preloading("[MathJax]/jax/input/AsciiMath/config.js", "[MathJax]/jax/output/SVG/config.js", "[MathJax]/jax/output/PreviewHTML/config.js", "[MathJax]/extensions/asciimath2jax.js", "[MathJax]/extensions/MathEvents.js", "[MathJax]/extensions/MathZoom.js", "[MathJax]/extensions/MathMenu.js", "[MathJax]/jax/element/mml/jax.js", "[MathJax]/extensions/toMathML.js", "[MathJax]/jax/input/AsciiMath/jax.js", "[MathJax]/jax/output/SVG/jax.js", "[MathJax]/jax/output/SVG/autoload/mtable.js", "[MathJax]/jax/output/PreviewHTML/jax.js", "[MathJax]/extensions/fast-preview.js", "[MathJax]/extensions/AssistiveMML.js");
  MathJax.Hub.Config({"v1.0-compatible": false});
  MathJax.InputJax.AsciiMath = MathJax.InputJax({
    id: "AsciiMath",
    version: "2.6.0",
    directory: MathJax.InputJax.directory + "/AsciiMath",
    extensionDir: MathJax.InputJax.extensionDir + "/AsciiMath",
    config: {
      fixphi: true,
      useMathMLspacing: true,
      displaystyle: true,
      decimalsign: "."
    }
  });
  MathJax.InputJax.AsciiMath.Register("math/asciimath");
  MathJax.InputJax.AsciiMath.loadComplete("config.js");
  MathJax.OutputJax.SVG = MathJax.OutputJax({
    id: "SVG",
    version: "2.6.1",
    directory: MathJax.OutputJax.directory + "/SVG",
    extensionDir: MathJax.OutputJax.extensionDir + "/SVG",
    autoloadDir: MathJax.OutputJax.directory + "/SVG/autoload",
    fontDir: MathJax.OutputJax.directory + "/SVG/fonts",
    config: {
      scale: 100,
      minScaleAdjust: 50,
      font: "TeX",
      blacker: 1,
      mtextFontInherit: false,
      undefinedFamily: "STIXGeneral,'Arial Unicode MS',serif",
      addMMLclasses: false,
      useFontCache: true,
      useGlobalCache: true,
      EqnChunk: (MathJax.Hub.Browser.isMobile ? 10 : 50),
      EqnChunkFactor: 1.5,
      EqnChunkDelay: 100,
      linebreaks: {
        automatic: false,
        width: "container"
      },
      merrorStyle: {
        fontSize: "90%",
        color: "#C00",
        background: "#FF8",
        border: "1px solid #C00",
        padding: "3px"
      },
      styles: {
        ".MathJax_SVG_Display": {
          "text-align": "center",
          margin: "1em 0em"
        },
        ".MathJax_SVG .MJX-monospace": {"font-family": "monospace"},
        ".MathJax_SVG .MJX-sans-serif": {"font-family": "sans-serif"},
        "#MathJax_SVG_Tooltip": {
          "background-color": "InfoBackground",
          color: "InfoText",
          border: "1px solid black",
          "box-shadow": "2px 2px 5px #AAAAAA",
          "-webkit-box-shadow": "2px 2px 5px #AAAAAA",
          "-moz-box-shadow": "2px 2px 5px #AAAAAA",
          "-khtml-box-shadow": "2px 2px 5px #AAAAAA",
          padding: "3px 4px",
          "z-index": 401
        }
      }
    }
  });
  if (!MathJax.Hub.config.delayJaxRegistration) {
    MathJax.OutputJax.SVG.Register("jax/mml");
  }
  MathJax.OutputJax.SVG.loadComplete("config.js");
  MathJax.OutputJax.PreviewHTML = MathJax.OutputJax({
    id: "PreviewHTML",
    version: "2.6.1",
    directory: MathJax.OutputJax.directory + "/PreviewHTML",
    extensionDir: MathJax.OutputJax.extensionDir + "/PreviewHTML",
    noFastPreview: true,
    config: {
      scale: 100,
      minScaleAdjust: 50,
      mtextFontInherit: false,
      linebreaks: {
        automatic: false,
        width: "container"
      }
    }
  });
  if (!MathJax.Hub.config.delayJaxRegistration) {
    MathJax.OutputJax.PreviewHTML.Register("jax/mml");
  }
  MathJax.OutputJax.PreviewHTML.loadComplete("config.js");
  MathJax.Extension.asciimath2jax = {
    version: "2.6.0",
    config: {
      delimiters: [["`", "`"]],
      skipTags: ["script", "noscript", "style", "textarea", "pre", "code", "annotation", "annotation-xml"],
      ignoreClass: "asciimath2jax_ignore",
      processClass: "asciimath2jax_process",
      preview: "AsciiMath"
    },
    PreProcess: function(a) {
      if (!this.configured) {
        this.config = MathJax.Hub.CombineConfig("asciimath2jax", this.config);
        if (this.config.Augment) {
          MathJax.Hub.Insert(this, this.config.Augment);
        }
        this.configured = true;
      }
      if (typeof(a) === "string") {
        a = document.getElementById(a);
      }
      if (!a) {
        a = document.body;
      }
      if (this.createPatterns()) {
        this.scanElement(a, a.nextSibling);
      }
    },
    createPatterns: function() {
      var d = [],
          c,
          a,
          b = this.config;
      this.match = {};
      if (b.delimiters.length === 0) {
        return false;
      }
      for (c = 0, a = b.delimiters.length; c < a; c++) {
        d.push(this.patternQuote(b.delimiters[c][0]));
        this.match[b.delimiters[c][0]] = {
          mode: "",
          end: b.delimiters[c][1],
          pattern: this.endPattern(b.delimiters[c][1])
        };
      }
      this.start = new RegExp(d.sort(this.sortLength).join("|"), "g");
      this.skipTags = new RegExp("^(" + b.skipTags.join("|") + ")$", "i");
      var e = [];
      if (MathJax.Hub.config.preRemoveClass) {
        e.push(MathJax.Hub.config.preRemoveClass);
      }
      if (b.ignoreClass) {
        e.push(b.ignoreClass);
      }
      this.ignoreClass = (e.length ? new RegExp("(^| )(" + e.join("|") + ")( |$)") : /^$/);
      this.processClass = new RegExp("(^| )(" + b.processClass + ")( |$)");
      return true;
    },
    patternQuote: function(a) {
      return a.replace(/([\^$(){}+*?\-|\[\]\:\\])/g, "\\$1");
    },
    endPattern: function(a) {
      return new RegExp(this.patternQuote(a) + "|\\\\.", "g");
    },
    sortLength: function(d, c) {
      if (d.length !== c.length) {
        return c.length - d.length;
      }
      return (d == c ? 0 : (d < c ? -1 : 1));
    },
    scanElement: function(c, b, g) {
      var a,
          e,
          d,
          f;
      while (c && c != b) {
        if (c.nodeName.toLowerCase() === "#text") {
          if (!g) {
            c = this.scanText(c);
          }
        } else {
          a = (typeof(c.className) === "undefined" ? "" : c.className);
          e = (typeof(c.tagName) === "undefined" ? "" : c.tagName);
          if (typeof(a) !== "string") {
            a = String(a);
          }
          f = this.processClass.exec(a);
          if (c.firstChild && !a.match(/(^| )MathJax/) && (f || !this.skipTags.exec(e))) {
            d = (g || this.ignoreClass.exec(a)) && !f;
            this.scanElement(c.firstChild, b, d);
          }
        }
        if (c) {
          c = c.nextSibling;
        }
      }
    },
    scanText: function(b) {
      if (b.nodeValue.replace(/\s+/, "") == "") {
        return b;
      }
      var a,
          c;
      this.search = {start: true};
      this.pattern = this.start;
      while (b) {
        this.pattern.lastIndex = 0;
        while (b && b.nodeName.toLowerCase() === "#text" && (a = this.pattern.exec(b.nodeValue))) {
          if (this.search.start) {
            b = this.startMatch(a, b);
          } else {
            b = this.endMatch(a, b);
          }
        }
        if (this.search.matched) {
          b = this.encloseMath(b);
        }
        if (b) {
          do {
            c = b;
            b = b.nextSibling;
          } while (b && (b.nodeName.toLowerCase() === "br" || b.nodeName.toLowerCase() === "#comment"));
          if (!b || b.nodeName !== "#text") {
            return c;
          }
        }
      }
      return b;
    },
    startMatch: function(a, b) {
      var c = this.match[a[0]];
      if (c != null) {
        this.search = {
          end: c.end,
          mode: c.mode,
          open: b,
          olen: a[0].length,
          opos: this.pattern.lastIndex - a[0].length
        };
        this.switchPattern(c.pattern);
      }
      return b;
    },
    endMatch: function(a, b) {
      if (a[0] == this.search.end) {
        this.search.close = b;
        this.search.cpos = this.pattern.lastIndex;
        this.search.clen = (this.search.isBeginEnd ? 0 : a[0].length);
        this.search.matched = true;
        b = this.encloseMath(b);
        this.switchPattern(this.start);
      }
      return b;
    },
    switchPattern: function(a) {
      a.lastIndex = this.pattern.lastIndex;
      this.pattern = a;
      this.search.start = (a === this.start);
    },
    encloseMath: function(b) {
      var a = this.search,
          f = a.close,
          e,
          c;
      if (a.cpos === f.length) {
        f = f.nextSibling;
      } else {
        f = f.splitText(a.cpos);
      }
      if (!f) {
        e = f = MathJax.HTML.addText(a.close.parentNode, "");
      }
      a.close = f;
      c = (a.opos ? a.open.splitText(a.opos) : a.open);
      while (c.nextSibling && c.nextSibling !== f) {
        if (c.nextSibling.nodeValue !== null) {
          if (c.nextSibling.nodeName === "#comment") {
            c.nodeValue += c.nextSibling.nodeValue.replace(/^\[CDATA\[((.|\n|\r)*)\]\]$/, "$1");
          } else {
            c.nodeValue += c.nextSibling.nodeValue;
          }
        } else {
          if (this.msieNewlineBug) {
            c.nodeValue += (c.nextSibling.nodeName.toLowerCase() === "br" ? "\n" : " ");
          } else {
            c.nodeValue += " ";
          }
        }
        c.parentNode.removeChild(c.nextSibling);
      }
      var d = c.nodeValue.substr(a.olen, c.nodeValue.length - a.olen - a.clen);
      c.parentNode.removeChild(c);
      if (this.config.preview !== "none") {
        this.createPreview(a.mode, d);
      }
      c = this.createMathTag(a.mode, d);
      this.search = {};
      this.pattern.lastIndex = 0;
      if (e) {
        e.parentNode.removeChild(e);
      }
      return c;
    },
    insertNode: function(b) {
      var a = this.search;
      a.close.parentNode.insertBefore(b, a.close);
    },
    createPreview: function(c, a) {
      var b = this.config.preview;
      if (b === "none") {
        return;
      }
      if (b === "AsciiMath") {
        b = [this.filterPreview(a)];
      }
      if (b) {
        b = MathJax.HTML.Element("span", {className: MathJax.Hub.config.preRemoveClass}, b);
        this.insertNode(b);
      }
    },
    createMathTag: function(c, a) {
      var b = document.createElement("script");
      b.type = "math/asciimath" + c;
      MathJax.HTML.setScript(b, a);
      this.insertNode(b);
      return b;
    },
    filterPreview: function(a) {
      return a;
    },
    msieNewlineBug: (MathJax.Hub.Browser.isMSIE && (document.documentMode || 0) < 9)
  };
  MathJax.Hub.Register.PreProcessor(["PreProcess", MathJax.Extension.asciimath2jax]);
  MathJax.Ajax.loadComplete("[MathJax]/extensions/asciimath2jax.js");
  (function(d, h, l, g, m, b, j) {
    var p = "2.6.0";
    var i = MathJax.Extension;
    var c = i.MathEvents = {version: p};
    var k = d.config.menuSettings;
    var o = {
      hover: 500,
      frame: {
        x: 3.5,
        y: 5,
        bwidth: 1,
        bcolor: "#A6D",
        hwidth: "15px",
        hcolor: "#83A"
      },
      button: {
        x: -6,
        y: -3,
        wx: -2
      },
      fadeinInc: 0.2,
      fadeoutInc: 0.05,
      fadeDelay: 50,
      fadeoutStart: 400,
      fadeoutDelay: 15 * 1000,
      styles: {
        ".MathJax_Hover_Frame": {
          "border-radius": ".25em",
          "-webkit-border-radius": ".25em",
          "-moz-border-radius": ".25em",
          "-khtml-border-radius": ".25em",
          "box-shadow": "0px 0px 15px #83A",
          "-webkit-box-shadow": "0px 0px 15px #83A",
          "-moz-box-shadow": "0px 0px 15px #83A",
          "-khtml-box-shadow": "0px 0px 15px #83A",
          border: "1px solid #A6D ! important",
          display: "inline-block",
          position: "absolute"
        },
        ".MathJax_Menu_Button .MathJax_Hover_Arrow": {
          position: "absolute",
          cursor: "pointer",
          display: "inline-block",
          border: "2px solid #AAA",
          "border-radius": "4px",
          "-webkit-border-radius": "4px",
          "-moz-border-radius": "4px",
          "-khtml-border-radius": "4px",
          "font-family": "'Courier New',Courier",
          "font-size": "9px",
          color: "#F0F0F0"
        },
        ".MathJax_Menu_Button .MathJax_Hover_Arrow span": {
          display: "block",
          "background-color": "#AAA",
          border: "1px solid",
          "border-radius": "3px",
          "line-height": 0,
          padding: "4px"
        },
        ".MathJax_Hover_Arrow:hover": {
          color: "white!important",
          border: "2px solid #CCC!important"
        },
        ".MathJax_Hover_Arrow:hover span": {"background-color": "#CCC!important"}
      }
    };
    var n = c.Event = {
      LEFTBUTTON: 0,
      RIGHTBUTTON: 2,
      MENUKEY: "altKey",
      KEY: {
        RETURN: 13,
        ESCAPE: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40
      },
      Mousedown: function(q) {
        return n.Handler(q, "Mousedown", this);
      },
      Mouseup: function(q) {
        return n.Handler(q, "Mouseup", this);
      },
      Mousemove: function(q) {
        return n.Handler(q, "Mousemove", this);
      },
      Mouseover: function(q) {
        return n.Handler(q, "Mouseover", this);
      },
      Mouseout: function(q) {
        return n.Handler(q, "Mouseout", this);
      },
      Click: function(q) {
        return n.Handler(q, "Click", this);
      },
      DblClick: function(q) {
        return n.Handler(q, "DblClick", this);
      },
      Menu: function(q) {
        return n.Handler(q, "ContextMenu", this);
      },
      Handler: function(t, r, s) {
        if (l.loadingMathMenu) {
          return n.False(t);
        }
        var q = b[s.jaxID];
        if (!t) {
          t = window.event;
        }
        t.isContextMenu = (r === "ContextMenu");
        if (q[r]) {
          return q[r](t, s);
        }
        if (i.MathZoom) {
          return i.MathZoom.HandleEvent(t, r, s);
        }
      },
      False: function(q) {
        if (!q) {
          q = window.event;
        }
        if (q) {
          if (q.preventDefault) {
            q.preventDefault();
          } else {
            q.returnValue = false;
          }
          if (q.stopPropagation) {
            q.stopPropagation();
          }
          q.cancelBubble = true;
        }
        return false;
      },
      Keydown: function(r, q) {
        if (!r) {
          r = window.event;
        }
        if (r.keyCode === n.KEY.SPACE) {
          n.ContextMenu(r, this);
        }
      },
      ContextMenu: function(t, E, w) {
        var B = b[E.jaxID],
            v = B.getJaxFromMath(E);
        var F = (B.config.showMathMenu != null ? B : d).config.showMathMenu;
        if (!F || (k.context !== "MathJax" && !w)) {
          return;
        }
        if (c.msieEventBug) {
          t = window.event || t;
        }
        n.ClearSelection();
        f.ClearHoverTimer();
        if (v.hover) {
          if (v.hover.remove) {
            clearTimeout(v.hover.remove);
            delete v.hover.remove;
          }
          v.hover.nofade = true;
        }
        var u = MathJax.Menu;
        var G,
            D;
        if (u) {
          if (u.loadingDomain) {
            return n.False(t);
          }
          G = m.loadDomain("MathMenu");
          if (!G) {
            u.jax = v;
            var r = u.menu.Find("Show Math As").submenu;
            r.items[0].name = v.sourceMenuTitle;
            r.items[0].format = (v.sourceMenuFormat || "MathML");
            r.items[1].name = j[v.inputJax].sourceMenuTitle;
            r.items[5].disabled = !j[v.inputJax].annotationEncoding;
            var A = r.items[2];
            A.disabled = true;
            var q = A.submenu.items;
            annotationList = MathJax.Hub.Config.semanticsAnnotations;
            for (var z = 0,
                y = q.length; z < y; z++) {
              var s = q[z].name[1];
              if (v.root && v.root.getAnnotation(s) !== null) {
                A.disabled = false;
                q[z].hidden = false;
              } else {
                q[z].hidden = true;
              }
            }
            var x = u.menu.Find("Math Settings", "MathPlayer");
            x.hidden = !(v.outputJax === "NativeMML" && d.Browser.hasMathPlayer);
            return u.menu.Post(t);
          }
          u.loadingDomain = true;
          D = function() {
            delete u.loadingDomain;
          };
        } else {
          if (l.loadingMathMenu) {
            return n.False(t);
          }
          l.loadingMathMenu = true;
          G = l.Require("[MathJax]/extensions/MathMenu.js");
          D = function() {
            delete l.loadingMathMenu;
            if (!MathJax.Menu) {
              MathJax.Menu = {};
            }
          };
        }
        var C = {
          pageX: t.pageX,
          pageY: t.pageY,
          clientX: t.clientX,
          clientY: t.clientY
        };
        g.Queue(G, D, ["ContextMenu", n, C, E, w]);
        return n.False(t);
      },
      AltContextMenu: function(s, r) {
        var t = b[r.jaxID];
        var q = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
        if (q) {
          q = (t.config.showMathMenuMSIE != null ? t : d).config.showMathMenuMSIE;
          if (k.context === "MathJax" && !k.mpContext && q) {
            if (!c.noContextMenuBug || s.button !== n.RIGHTBUTTON) {
              return;
            }
          } else {
            if (!s[n.MENUKEY] || s.button !== n.LEFTBUTTON) {
              return;
            }
          }
          return t.ContextMenu(s, r, true);
        }
      },
      ClearSelection: function() {
        if (c.safariContextMenuBug) {
          setTimeout("window.getSelection().empty()", 0);
        }
        if (document.selection) {
          setTimeout("document.selection.empty()", 0);
        }
      },
      getBBox: function(s) {
        s.appendChild(c.topImg);
        var r = c.topImg.offsetTop,
            t = s.offsetHeight - r,
            q = s.offsetWidth;
        s.removeChild(c.topImg);
        return {
          w: q,
          h: r,
          d: t
        };
      }
    };
    var f = c.Hover = {
      Mouseover: function(s, r) {
        if (k.discoverable || k.zoom === "Hover") {
          var u = s.fromElement || s.relatedTarget,
              t = s.toElement || s.target;
          if (u && t && (d.isMathJaxNode(u) !== d.isMathJaxNode(t) || d.getJaxFor(u) !== d.getJaxFor(t))) {
            var q = this.getJaxFromMath(r);
            if (q.hover) {
              f.ReHover(q);
            } else {
              f.HoverTimer(q, r);
            }
            return n.False(s);
          }
        }
      },
      Mouseout: function(s, r) {
        if (k.discoverable || k.zoom === "Hover") {
          var u = s.fromElement || s.relatedTarget,
              t = s.toElement || s.target;
          if (u && t && (d.isMathJaxNode(u) !== d.isMathJaxNode(t) || d.getJaxFor(u) !== d.getJaxFor(t))) {
            var q = this.getJaxFromMath(r);
            if (q.hover) {
              f.UnHover(q);
            } else {
              f.ClearHoverTimer();
            }
            return n.False(s);
          }
        }
      },
      Mousemove: function(s, r) {
        if (k.discoverable || k.zoom === "Hover") {
          var q = this.getJaxFromMath(r);
          if (q.hover) {
            return;
          }
          if (f.lastX == s.clientX && f.lastY == s.clientY) {
            return;
          }
          f.lastX = s.clientX;
          f.lastY = s.clientY;
          f.HoverTimer(q, r);
          return n.False(s);
        }
      },
      HoverTimer: function(q, r) {
        this.ClearHoverTimer();
        this.hoverTimer = setTimeout(g(["Hover", this, q, r]), o.hover);
      },
      ClearHoverTimer: function() {
        if (this.hoverTimer) {
          clearTimeout(this.hoverTimer);
          delete this.hoverTimer;
        }
      },
      Hover: function(q, u) {
        if (i.MathZoom && i.MathZoom.Hover({}, u)) {
          return;
        }
        var t = b[q.outputJax],
            v = t.getHoverSpan(q, u),
            y = t.getHoverBBox(q, v, u),
            w = (t.config.showMathMenu != null ? t : d).config.showMathMenu;
        var A = o.frame.x,
            z = o.frame.y,
            x = o.frame.bwidth;
        if (c.msieBorderWidthBug) {
          x = 0;
        }
        q.hover = {
          opacity: 0,
          id: q.inputID + "-Hover"
        };
        var r = h.Element("span", {
          id: q.hover.id,
          isMathJax: true,
          style: {
            display: "inline-block",
            width: 0,
            height: 0,
            position: "relative"
          }
        }, [["span", {
          className: "MathJax_Hover_Frame",
          isMathJax: true,
          style: {
            display: "inline-block",
            position: "absolute",
            top: this.Px(-y.h - z - x - (y.y || 0)),
            left: this.Px(-A - x + (y.x || 0)),
            width: this.Px(y.w + 2 * A),
            height: this.Px(y.h + y.d + 2 * z),
            opacity: 0,
            filter: "alpha(opacity=0)"
          }
        }]]);
        var s = h.Element("span", {
          isMathJax: true,
          id: q.hover.id + "Menu",
          className: "MathJax_Menu_Button",
          style: {
            display: "inline-block",
            "z-index": 1,
            width: 0,
            height: 0,
            position: "relative"
          }
        }, [["span", {
          className: "MathJax_Hover_Arrow",
          isMathJax: true,
          math: u,
          onclick: this.HoverMenu,
          jax: t.id,
          style: {
            left: this.Px(y.w + A + x + (y.x || 0) + o.button.x),
            top: this.Px(-y.h - z - x - (y.y || 0) - o.button.y),
            opacity: 0,
            filter: "alpha(opacity=0)"
          }
        }, [["span", {isMathJax: true}, "\u25BC"]]]]);
        if (y.width) {
          r.style.width = s.style.width = y.width;
          r.style.marginRight = s.style.marginRight = "-" + y.width;
          r.firstChild.style.width = y.width;
          s.firstChild.style.left = "";
          s.firstChild.style.right = this.Px(o.button.wx);
        }
        v.parentNode.insertBefore(r, v);
        if (w) {
          v.parentNode.insertBefore(s, v);
        }
        if (v.style) {
          v.style.position = "relative";
        }
        this.ReHover(q);
      },
      ReHover: function(q) {
        if (q.hover.remove) {
          clearTimeout(q.hover.remove);
        }
        q.hover.remove = setTimeout(g(["UnHover", this, q]), o.fadeoutDelay);
        this.HoverFadeTimer(q, o.fadeinInc);
      },
      UnHover: function(q) {
        if (!q.hover.nofade) {
          this.HoverFadeTimer(q, -o.fadeoutInc, o.fadeoutStart);
        }
      },
      HoverFade: function(q) {
        delete q.hover.timer;
        q.hover.opacity = Math.max(0, Math.min(1, q.hover.opacity + q.hover.inc));
        q.hover.opacity = Math.floor(1000 * q.hover.opacity) / 1000;
        var s = document.getElementById(q.hover.id),
            r = document.getElementById(q.hover.id + "Menu");
        s.firstChild.style.opacity = q.hover.opacity;
        s.firstChild.style.filter = "alpha(opacity=" + Math.floor(100 * q.hover.opacity) + ")";
        if (r) {
          r.firstChild.style.opacity = q.hover.opacity;
          r.firstChild.style.filter = s.style.filter;
        }
        if (q.hover.opacity === 1) {
          return;
        }
        if (q.hover.opacity > 0) {
          this.HoverFadeTimer(q, q.hover.inc);
          return;
        }
        s.parentNode.removeChild(s);
        if (r) {
          r.parentNode.removeChild(r);
        }
        if (q.hover.remove) {
          clearTimeout(q.hover.remove);
        }
        delete q.hover;
      },
      HoverFadeTimer: function(q, s, r) {
        q.hover.inc = s;
        if (!q.hover.timer) {
          q.hover.timer = setTimeout(g(["HoverFade", this, q]), (r || o.fadeDelay));
        }
      },
      HoverMenu: function(q) {
        if (!q) {
          q = window.event;
        }
        return b[this.jax].ContextMenu(q, this.math, true);
      },
      ClearHover: function(q) {
        if (q.hover.remove) {
          clearTimeout(q.hover.remove);
        }
        if (q.hover.timer) {
          clearTimeout(q.hover.timer);
        }
        f.ClearHoverTimer();
        delete q.hover;
      },
      Px: function(q) {
        if (Math.abs(q) < 0.006) {
          return "0px";
        }
        return q.toFixed(2).replace(/\.?0+$/, "") + "px";
      },
      getImages: function() {
        if (k.discoverable) {
          var q = new Image();
          q.src = o.button.src;
        }
      }
    };
    var a = c.Touch = {
      last: 0,
      delay: 500,
      start: function(r) {
        var q = new Date().getTime();
        var s = (q - a.last < a.delay && a.up);
        a.last = q;
        a.up = false;
        if (s) {
          a.timeout = setTimeout(a.menu, a.delay, r, this);
          r.preventDefault();
        }
      },
      end: function(r) {
        var q = new Date().getTime();
        a.up = (q - a.last < a.delay);
        if (a.timeout) {
          clearTimeout(a.timeout);
          delete a.timeout;
          a.last = 0;
          a.up = false;
          r.preventDefault();
          return n.Handler((r.touches[0] || r.touch), "DblClick", this);
        }
      },
      menu: function(r, q) {
        delete a.timeout;
        a.last = 0;
        a.up = false;
        return n.Handler((r.touches[0] || r.touch), "ContextMenu", q);
      }
    };
    d.Browser.Select({
      MSIE: function(q) {
        var s = (document.documentMode || 0);
        var r = q.versionAtLeast("8.0");
        c.msieBorderWidthBug = (document.compatMode === "BackCompat");
        c.msieEventBug = q.isIE9;
        c.msieAlignBug = (!r || s < 8);
        if (s < 9) {
          n.LEFTBUTTON = 1;
        }
      },
      Safari: function(q) {
        c.safariContextMenuBug = true;
      },
      Opera: function(q) {
        c.operaPositionBug = true;
      },
      Konqueror: function(q) {
        c.noContextMenuBug = true;
      }
    });
    c.topImg = (c.msieAlignBug ? h.Element("img", {
      style: {
        width: 0,
        height: 0,
        position: "relative"
      },
      src: "about:blank"
    }) : h.Element("span", {style: {
        width: 0,
        height: 0,
        display: "inline-block"
      }}));
    if (c.operaPositionBug) {
      c.topImg.style.border = "1px solid";
    }
    c.config = o = d.CombineConfig("MathEvents", o);
    var e = function() {
      var q = o.styles[".MathJax_Hover_Frame"];
      q.border = o.frame.bwidth + "px solid " + o.frame.bcolor + " ! important";
      q["box-shadow"] = q["-webkit-box-shadow"] = q["-moz-box-shadow"] = q["-khtml-box-shadow"] = "0px 0px " + o.frame.hwidth + " " + o.frame.hcolor;
    };
    g.Queue(d.Register.StartupHook("End Config", {}), [e], ["getImages", f], ["Styles", l, o.styles], ["Post", d.Startup.signal, "MathEvents Ready"], ["loadComplete", l, "[MathJax]/extensions/MathEvents.js"]);
  })(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.Callback, MathJax.Localization, MathJax.OutputJax, MathJax.InputJax);
  (function(a, d, f, c, j) {
    var k = "2.6.0";
    var i = a.CombineConfig("MathZoom", {styles: {
        "#MathJax_Zoom": {
          position: "absolute",
          "background-color": "#F0F0F0",
          overflow: "auto",
          display: "block",
          "z-index": 301,
          padding: ".5em",
          border: "1px solid black",
          margin: 0,
          "font-weight": "normal",
          "font-style": "normal",
          "text-align": "left",
          "text-indent": 0,
          "text-transform": "none",
          "line-height": "normal",
          "letter-spacing": "normal",
          "word-spacing": "normal",
          "word-wrap": "normal",
          "white-space": "nowrap",
          "float": "none",
          "-webkit-box-sizing": "content-box",
          "-moz-box-sizing": "content-box",
          "box-sizing": "content-box",
          "box-shadow": "5px 5px 15px #AAAAAA",
          "-webkit-box-shadow": "5px 5px 15px #AAAAAA",
          "-moz-box-shadow": "5px 5px 15px #AAAAAA",
          "-khtml-box-shadow": "5px 5px 15px #AAAAAA",
          filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
        },
        "#MathJax_ZoomOverlay": {
          position: "absolute",
          left: 0,
          top: 0,
          "z-index": 300,
          display: "inline-block",
          width: "100%",
          height: "100%",
          border: 0,
          padding: 0,
          margin: 0,
          "background-color": "white",
          opacity: 0,
          filter: "alpha(opacity=0)"
        },
        "#MathJax_ZoomFrame": {
          position: "relative",
          display: "inline-block",
          height: 0,
          width: 0
        },
        "#MathJax_ZoomEventTrap": {
          position: "absolute",
          left: 0,
          top: 0,
          "z-index": 302,
          display: "inline-block",
          border: 0,
          padding: 0,
          margin: 0,
          "background-color": "white",
          opacity: 0,
          filter: "alpha(opacity=0)"
        }
      }});
    var e,
        b,
        g;
    MathJax.Hub.Register.StartupHook("MathEvents Ready", function() {
      g = MathJax.Extension.MathEvents.Event;
      e = MathJax.Extension.MathEvents.Event.False;
      b = MathJax.Extension.MathEvents.Hover;
    });
    var h = MathJax.Extension.MathZoom = {
      version: k,
      settings: a.config.menuSettings,
      scrollSize: 18,
      HandleEvent: function(n, l, m) {
        if (h.settings.CTRL && !n.ctrlKey) {
          return true;
        }
        if (h.settings.ALT && !n.altKey) {
          return true;
        }
        if (h.settings.CMD && !n.metaKey) {
          return true;
        }
        if (h.settings.Shift && !n.shiftKey) {
          return true;
        }
        if (!h[l]) {
          return true;
        }
        return h[l](n, m);
      },
      Click: function(m, l) {
        if (this.settings.zoom === "Click") {
          return this.Zoom(m, l);
        }
      },
      DblClick: function(m, l) {
        if (this.settings.zoom === "Double-Click" || this.settings.zoom === "DoubleClick") {
          return this.Zoom(m, l);
        }
      },
      Hover: function(m, l) {
        if (this.settings.zoom === "Hover") {
          this.Zoom(m, l);
          return true;
        }
        return false;
      },
      Zoom: function(o, u) {
        this.Remove();
        b.ClearHoverTimer();
        g.ClearSelection();
        var s = MathJax.OutputJax[u.jaxID];
        var p = s.getJaxFromMath(u);
        if (p.hover) {
          b.UnHover(p);
        }
        var q = this.findContainer(u);
        var l = Math.floor(0.85 * q.clientWidth),
            t = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        if (this.getOverflow(q) !== "visible") {
          t = Math.min(q.clientHeight, t);
        }
        t = Math.floor(0.85 * t);
        var n = d.Element("span", {id: "MathJax_ZoomFrame"}, [["span", {
          id: "MathJax_ZoomOverlay",
          onmousedown: this.Remove
        }], ["span", {
          id: "MathJax_Zoom",
          onclick: this.Remove,
          style: {
            visibility: "hidden",
            fontSize: this.settings.zscale
          }
        }, [["span", {style: {
            display: "inline-block",
            "white-space": "nowrap"
          }}]]]]);
        var z = n.lastChild,
            w = z.firstChild,
            r = n.firstChild;
        u.parentNode.insertBefore(n, u);
        u.parentNode.insertBefore(u, n);
        if (w.addEventListener) {
          w.addEventListener("mousedown", this.Remove, true);
        }
        var m = z.offsetWidth || z.clientWidth;
        l -= m;
        t -= m;
        z.style.maxWidth = l + "px";
        z.style.maxHeight = t + "px";
        if (this.msieTrapEventBug) {
          var y = d.Element("span", {
            id: "MathJax_ZoomEventTrap",
            onmousedown: this.Remove
          });
          n.insertBefore(y, z);
        }
        if (this.msieZIndexBug) {
          var v = d.addElement(document.body, "img", {
            src: "about:blank",
            id: "MathJax_ZoomTracker",
            width: 0,
            height: 0,
            style: {
              width: 0,
              height: 0,
              position: "relative"
            }
          });
          n.style.position = "relative";
          n.style.zIndex = i.styles["#MathJax_ZoomOverlay"]["z-index"];
          n = v;
        }
        var x = s.Zoom(p, w, u, l, t);
        if (this.msiePositionBug) {
          if (this.msieSizeBug) {
            z.style.height = x.zH + "px";
            z.style.width = x.zW + "px";
          }
          if (z.offsetHeight > t) {
            z.style.height = t + "px";
            z.style.width = (x.zW + this.scrollSize) + "px";
          }
          if (z.offsetWidth > l) {
            z.style.width = l + "px";
            z.style.height = (x.zH + this.scrollSize) + "px";
          }
        }
        if (this.operaPositionBug) {
          z.style.width = Math.min(l, x.zW) + "px";
        }
        if (z.offsetWidth > m && z.offsetWidth - m < l && z.offsetHeight - m < t) {
          z.style.overflow = "visible";
        }
        this.Position(z, x);
        if (this.msieTrapEventBug) {
          y.style.height = z.clientHeight + "px";
          y.style.width = z.clientWidth + "px";
          y.style.left = (parseFloat(z.style.left) + z.clientLeft) + "px";
          y.style.top = (parseFloat(z.style.top) + z.clientTop) + "px";
        }
        z.style.visibility = "";
        if (this.settings.zoom === "Hover") {
          r.onmouseover = this.Remove;
        }
        if (window.addEventListener) {
          addEventListener("resize", this.Resize, false);
        } else {
          if (window.attachEvent) {
            attachEvent("onresize", this.Resize);
          } else {
            this.onresize = window.onresize;
            window.onresize = this.Resize;
          }
        }
        a.signal.Post(["math zoomed", p]);
        return e(o);
      },
      Position: function(p, r) {
        p.style.display = "none";
        var q = this.Resize(),
            m = q.x,
            s = q.y,
            l = r.mW;
        p.style.display = "";
        var o = -l - Math.floor((p.offsetWidth - l) / 2),
            n = r.Y;
        p.style.left = Math.max(o, 10 - m) + "px";
        p.style.top = Math.max(n, 10 - s) + "px";
        if (!h.msiePositionBug) {
          h.SetWH();
        }
      },
      Resize: function(m) {
        if (h.onresize) {
          h.onresize(m);
        }
        var q = document.getElementById("MathJax_ZoomFrame"),
            l = document.getElementById("MathJax_ZoomOverlay");
        var o = h.getXY(q),
            n = h.findContainer(q);
        if (h.getOverflow(n) !== "visible") {
          l.scroll_parent = n;
          var p = h.getXY(n);
          o.x -= p.x;
          o.y -= p.y;
          p = h.getBorder(n);
          o.x -= p.x;
          o.y -= p.y;
        }
        l.style.left = (-o.x) + "px";
        l.style.top = (-o.y) + "px";
        if (h.msiePositionBug) {
          setTimeout(h.SetWH, 0);
        } else {
          h.SetWH();
        }
        return o;
      },
      SetWH: function() {
        var l = document.getElementById("MathJax_ZoomOverlay");
        if (!l) {
          return;
        }
        l.style.display = "none";
        var m = l.scroll_parent || document.documentElement || document.body;
        l.style.width = m.scrollWidth + "px";
        l.style.height = Math.max(m.clientHeight, m.scrollHeight) + "px";
        l.style.display = "";
      },
      findContainer: function(l) {
        l = l.parentNode;
        while (l.parentNode && l !== document.body && h.getOverflow(l) === "visible") {
          l = l.parentNode;
        }
        return l;
      },
      getOverflow: (window.getComputedStyle ? function(l) {
        return getComputedStyle(l).overflow;
      } : function(l) {
        return (l.currentStyle || {overflow: "visible"}).overflow;
      }),
      getBorder: function(o) {
        var m = {
          thin: 1,
          medium: 2,
          thick: 3
        };
        var n = (window.getComputedStyle ? getComputedStyle(o) : (o.currentStyle || {
          borderLeftWidth: 0,
          borderTopWidth: 0
        }));
        var l = n.borderLeftWidth,
            p = n.borderTopWidth;
        if (m[l]) {
          l = m[l];
        } else {
          l = parseInt(l);
        }
        if (m[p]) {
          p = m[p];
        } else {
          p = parseInt(p);
        }
        return {
          x: l,
          y: p
        };
      },
      getXY: function(o) {
        var l = 0,
            n = 0,
            m;
        m = o;
        while (m.offsetParent) {
          l += m.offsetLeft;
          m = m.offsetParent;
        }
        if (h.operaPositionBug) {
          o.style.border = "1px solid";
        }
        m = o;
        while (m.offsetParent) {
          n += m.offsetTop;
          m = m.offsetParent;
        }
        if (h.operaPositionBug) {
          o.style.border = "";
        }
        return {
          x: l,
          y: n
        };
      },
      Remove: function(n) {
        var p = document.getElementById("MathJax_ZoomFrame");
        if (p) {
          var o = MathJax.OutputJax[p.previousSibling.jaxID];
          var l = o.getJaxFromMath(p.previousSibling);
          a.signal.Post(["math unzoomed", l]);
          p.parentNode.removeChild(p);
          p = document.getElementById("MathJax_ZoomTracker");
          if (p) {
            p.parentNode.removeChild(p);
          }
          if (h.operaRefreshBug) {
            var m = d.addElement(document.body, "div", {
              style: {
                position: "fixed",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                opacity: 0
              },
              id: "MathJax_OperaDiv"
            });
            document.body.removeChild(m);
          }
          if (window.removeEventListener) {
            removeEventListener("resize", h.Resize, false);
          } else {
            if (window.detachEvent) {
              detachEvent("onresize", h.Resize);
            } else {
              window.onresize = h.onresize;
              delete h.onresize;
            }
          }
        }
        return e(n);
      }
    };
    a.Browser.Select({
      MSIE: function(l) {
        var n = (document.documentMode || 0);
        var m = (n >= 9);
        h.msiePositionBug = !m;
        h.msieSizeBug = l.versionAtLeast("7.0") && (!document.documentMode || n === 7 || n === 8);
        h.msieZIndexBug = (n <= 7);
        h.msieInlineBlockAlignBug = (n <= 7);
        h.msieTrapEventBug = !window.addEventListener;
        if (document.compatMode === "BackCompat") {
          h.scrollSize = 52;
        }
        if (m) {
          delete i.styles["#MathJax_Zoom"].filter;
        }
      },
      Opera: function(l) {
        h.operaPositionBug = true;
        h.operaRefreshBug = true;
      }
    });
    h.topImg = (h.msieInlineBlockAlignBug ? d.Element("img", {
      style: {
        width: 0,
        height: 0,
        position: "relative"
      },
      src: "about:blank"
    }) : d.Element("span", {style: {
        width: 0,
        height: 0,
        display: "inline-block"
      }}));
    if (h.operaPositionBug || h.msieTopBug) {
      h.topImg.style.border = "1px solid";
    }
    MathJax.Callback.Queue(["StartupHook", MathJax.Hub.Register, "Begin Styles", {}], ["Styles", f, i.styles], ["Post", a.Startup.signal, "MathZoom Ready"], ["loadComplete", f, "[MathJax]/extensions/MathZoom.js"]);
  })(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.OutputJax["HTML-CSS"], MathJax.OutputJax.NativeMML);
  (function(f, n, p, e, q) {
    var o = "2.6.1";
    var d = MathJax.Callback.Signal("menu");
    MathJax.Extension.MathMenu = {
      version: o,
      signal: d
    };
    var s = function(t) {
      return MathJax.Localization._.apply(MathJax.Localization, [["MathMenu", t]].concat([].slice.call(arguments, 1)));
    };
    var a = f.Browser.isPC,
        k = f.Browser.isMSIE,
        l = ((document.documentMode || 0) > 8);
    var i = (a ? null : "5px");
    var r = f.CombineConfig("MathMenu", {
      delay: 150,
      showRenderer: true,
      showMathPlayer: true,
      showFontMenu: false,
      showContext: false,
      showDiscoverable: false,
      showLocale: true,
      showLocaleURL: false,
      semanticsAnnotations: {
        TeX: ["TeX", "LaTeX", "application/x-tex"],
        StarMath: ["StarMath 5.0"],
        Maple: ["Maple"],
        ContentMathML: ["MathML-Content", "application/mathml-content+xml"],
        OpenMath: ["OpenMath"]
      },
      windowSettings: {
        status: "no",
        toolbar: "no",
        locationbar: "no",
        menubar: "no",
        directories: "no",
        personalbar: "no",
        resizable: "yes",
        scrollbars: "yes",
        width: 400,
        height: 300,
        left: Math.round((screen.width - 400) / 2),
        top: Math.round((screen.height - 300) / 3)
      },
      styles: {
        "#MathJax_About": {
          position: "fixed",
          left: "50%",
          width: "auto",
          "text-align": "center",
          border: "3px outset",
          padding: "1em 2em",
          "background-color": "#DDDDDD",
          color: "black",
          cursor: "default",
          "font-family": "message-box",
          "font-size": "120%",
          "font-style": "normal",
          "text-indent": 0,
          "text-transform": "none",
          "line-height": "normal",
          "letter-spacing": "normal",
          "word-spacing": "normal",
          "word-wrap": "normal",
          "white-space": "nowrap",
          "float": "none",
          "z-index": 201,
          "border-radius": "15px",
          "-webkit-border-radius": "15px",
          "-moz-border-radius": "15px",
          "-khtml-border-radius": "15px",
          "box-shadow": "0px 10px 20px #808080",
          "-webkit-box-shadow": "0px 10px 20px #808080",
          "-moz-box-shadow": "0px 10px 20px #808080",
          "-khtml-box-shadow": "0px 10px 20px #808080",
          filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
        },
        "#MathJax_About.MathJax_MousePost": {outline: "none"},
        ".MathJax_Menu": {
          position: "absolute",
          "background-color": "white",
          color: "black",
          width: "auto",
          padding: (a ? "2px" : "5px 0px"),
          border: "1px solid #CCCCCC",
          margin: 0,
          cursor: "default",
          font: "menu",
          "text-align": "left",
          "text-indent": 0,
          "text-transform": "none",
          "line-height": "normal",
          "letter-spacing": "normal",
          "word-spacing": "normal",
          "word-wrap": "normal",
          "white-space": "nowrap",
          "float": "none",
          "z-index": 201,
          "border-radius": i,
          "-webkit-border-radius": i,
          "-moz-border-radius": i,
          "-khtml-border-radius": i,
          "box-shadow": "0px 10px 20px #808080",
          "-webkit-box-shadow": "0px 10px 20px #808080",
          "-moz-box-shadow": "0px 10px 20px #808080",
          "-khtml-box-shadow": "0px 10px 20px #808080",
          filter: "progid:DXImageTransform.Microsoft.dropshadow(OffX=2, OffY=2, Color='gray', Positive='true')"
        },
        ".MathJax_MenuItem": {
          padding: (a ? "2px 2em" : "1px 2em"),
          background: "transparent"
        },
        ".MathJax_MenuArrow": {
          position: "absolute",
          right: ".5em",
          "padding-top": ".25em",
          color: "#666666",
          "font-family": (k ? "'Arial unicode MS'" : null),
          "font-size": ".75em"
        },
        ".MathJax_MenuActive .MathJax_MenuArrow": {color: "white"},
        ".MathJax_MenuArrow.RTL": {
          left: ".5em",
          right: "auto"
        },
        ".MathJax_MenuCheck": {
          position: "absolute",
          left: ".7em",
          "font-family": (k ? "'Arial unicode MS'" : null)
        },
        ".MathJax_MenuCheck.RTL": {
          right: ".7em",
          left: "auto"
        },
        ".MathJax_MenuRadioCheck": {
          position: "absolute",
          left: (a ? "1em" : ".7em")
        },
        ".MathJax_MenuRadioCheck.RTL": {
          right: (a ? "1em" : ".7em"),
          left: "auto"
        },
        ".MathJax_MenuLabel": {
          padding: (a ? "2px 2em 4px 1.33em" : "1px 2em 3px 1.33em"),
          "font-style": "italic"
        },
        ".MathJax_MenuRule": {
          "border-top": (a ? "1px solid #CCCCCC" : "1px solid #DDDDDD"),
          margin: (a ? "4px 1px 0px" : "4px 3px")
        },
        ".MathJax_MenuDisabled": {color: "GrayText"},
        ".MathJax_MenuActive": {
          "background-color": (a ? "Highlight" : "#606872"),
          color: (a ? "HighlightText" : "white")
        },
        ".MathJax_MenuDisabled:focus, .MathJax_MenuLabel:focus": {"background-color": "#E8E8E8"},
        ".MathJax_ContextMenu:focus": {outline: "none"},
        ".MathJax_ContextMenu .MathJax_MenuItem:focus": {outline: "none"},
        "#MathJax_AboutClose": {
          top: ".2em",
          right: ".2em"
        },
        ".MathJax_Menu .MathJax_MenuClose": {
          top: "-10px",
          left: "-10px"
        },
        ".MathJax_MenuClose": {
          position: "absolute",
          cursor: "pointer",
          display: "inline-block",
          border: "2px solid #AAA",
          "border-radius": "18px",
          "-webkit-border-radius": "18px",
          "-moz-border-radius": "18px",
          "-khtml-border-radius": "18px",
          "font-family": "'Courier New',Courier",
          "font-size": "24px",
          color: "#F0F0F0"
        },
        ".MathJax_MenuClose span": {
          display: "block",
          "background-color": "#AAA",
          border: "1.5px solid",
          "border-radius": "18px",
          "-webkit-border-radius": "18px",
          "-moz-border-radius": "18px",
          "-khtml-border-radius": "18px",
          "line-height": 0,
          padding: "8px 0 6px"
        },
        ".MathJax_MenuClose:hover": {
          color: "white!important",
          border: "2px solid #CCC!important"
        },
        ".MathJax_MenuClose:hover span": {"background-color": "#CCC!important"},
        ".MathJax_MenuClose:hover:focus": {outline: "none"}
      }
    });
    var m,
        j,
        b;
    f.Register.StartupHook("MathEvents Ready", function() {
      m = MathJax.Extension.MathEvents.Event.False;
      j = MathJax.Extension.MathEvents.Hover;
      b = MathJax.Extension.MathEvents.Event.KEY;
    });
    var h = MathJax.Object.Subclass({
      Keydown: function(t, u) {
        switch (t.keyCode) {
          case b.ESCAPE:
            this.Remove(t, u);
            break;
          case b.RIGHT:
            this.Right(t, u);
            break;
          case b.LEFT:
            this.Left(t, u);
            break;
          case b.UP:
            this.Up(t, u);
            break;
          case b.DOWN:
            this.Down(t, u);
            break;
          case b.RETURN:
          case b.SPACE:
            this.Space(t, u);
            break;
          default:
            return;
            break;
        }
        return m(t);
      },
      Escape: function(t, u) {},
      Right: function(t, u) {},
      Left: function(t, u) {},
      Up: function(t, u) {},
      Down: function(t, u) {},
      Space: function(t, u) {}
    }, {});
    var g = MathJax.Menu = h.Subclass({
      version: o,
      items: [],
      posted: false,
      title: null,
      margin: 5,
      Init: function(t) {
        this.items = [].slice.call(arguments, 0);
      },
      With: function(t) {
        if (t) {
          f.Insert(this, t);
        }
        return this;
      },
      Post: function(u, I, G) {
        if (!u) {
          u = window.event || {};
        }
        var t = document.getElementById("MathJax_MenuFrame");
        if (!t) {
          t = g.Background(this);
          delete c.lastItem;
          delete c.lastMenu;
          delete g.skipUp;
          d.Post(["post", g.jax]);
          g.isRTL = (MathJax.Localization.fontDirection() === "rtl");
        }
        var v = n.Element("div", {
          onmouseup: g.Mouseup,
          ondblclick: m,
          ondragstart: m,
          onselectstart: m,
          oncontextmenu: m,
          menuItem: this,
          className: "MathJax_Menu",
          onkeydown: g.Keydown,
          role: "menu"
        });
        if (u.type === "contextmenu" || u.type === "mouseover") {
          v.className += " MathJax_ContextMenu";
        }
        if (!G) {
          MathJax.Localization.setCSS(v);
        }
        for (var B = 0,
            z = this.items.length; B < z; B++) {
          this.items[B].Create(v);
        }
        if (g.isMobile) {
          n.addElement(v, "span", {
            className: "MathJax_MenuClose",
            menu: I,
            ontouchstart: g.Close,
            ontouchend: m,
            onmousedown: g.Close,
            onmouseup: m
          }, [["span", {}, "\u00D7"]]);
        }
        t.appendChild(v);
        this.posted = true;
        if (v.offsetWidth) {
          v.style.width = (v.offsetWidth + 2) + "px";
        }
        var H = u.pageX,
            F = u.pageY;
        if (!H && !F && "clientX" in u) {
          H = u.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
          F = u.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        if (!I) {
          var w = g.CurrentNode() || u.target;
          if ((u.type === "keydown" || (!H && !F)) && w) {
            var C = window.pageXOffset || document.documentElement.scrollLeft;
            var A = window.pageYOffset || document.documentElement.scrollTop;
            var E = w.getBoundingClientRect();
            H = (E.right + E.left) / 2 + C;
            F = (E.bottom + E.top) / 2 + A;
          }
          if (H + v.offsetWidth > document.body.offsetWidth - this.margin) {
            H = document.body.offsetWidth - v.offsetWidth - this.margin;
          }
          if (g.isMobile) {
            H = Math.max(5, H - Math.floor(v.offsetWidth / 2));
            F -= 20;
          }
          g.skipUp = u.isContextMenu;
        } else {
          var D = "left",
              L = I.offsetWidth;
          H = (g.isMobile ? 30 : L - 2);
          F = 0;
          while (I && I !== t) {
            H += I.offsetLeft;
            F += I.offsetTop;
            I = I.parentNode;
          }
          if (!g.isMobile) {
            if ((g.isRTL && H - L - v.offsetWidth > this.margin) || (!g.isRTL && H + v.offsetWidth > document.body.offsetWidth - this.margin)) {
              D = "right";
              H = Math.max(this.margin, H - L - v.offsetWidth + 6);
            }
          }
          if (!a) {
            v.style["borderRadiusTop" + D] = 0;
            v.style["WebkitBorderRadiusTop" + D] = 0;
            v.style["MozBorderRadiusTop" + D] = 0;
            v.style["KhtmlBorderRadiusTop" + D] = 0;
          }
        }
        v.style.left = H + "px";
        v.style.top = F + "px";
        if (document.selection && document.selection.empty) {
          document.selection.empty();
        }
        var K = window.pageXOffset || document.documentElement.scrollLeft;
        var J = window.pageYOffset || document.documentElement.scrollTop;
        g.Focus(v);
        if (u.type === "keydown") {
          g.skipMouseoverFromKey = true;
          setTimeout(function() {
            delete g.skipMouseoverFromKey;
          }, r.delay);
        }
        window.scrollTo(K, J);
        return m(u);
      },
      Remove: function(t, u) {
        d.Post(["unpost", g.jax]);
        var v = document.getElementById("MathJax_MenuFrame");
        if (v) {
          v.parentNode.removeChild(v);
          if (this.msieFixedPositionBug) {
            detachEvent("onresize", g.Resize);
          }
        }
        if (g.jax.hover) {
          delete g.jax.hover.nofade;
          j.UnHover(g.jax);
        }
        g.Unfocus(u);
        if (t.type === "mousedown") {
          g.CurrentNode().blur();
        }
        return m(t);
      },
      Find: function(t) {
        return this.FindN(1, t, [].slice.call(arguments, 1));
      },
      FindId: function(t) {
        return this.FindN(0, t, [].slice.call(arguments, 1));
      },
      FindN: function(x, u, w) {
        for (var v = 0,
            t = this.items.length; v < t; v++) {
          if (this.items[v].name[x] === u) {
            if (w.length) {
              if (!this.items[v].submenu) {
                return null;
              }
              return this.items[v].submenu.FindN(x, w[0], w.slice(1));
            }
            return this.items[v];
          }
        }
        return null;
      },
      IndexOf: function(t) {
        return this.IndexOfN(1, t);
      },
      IndexOfId: function(t) {
        return this.IndexOfN(0, t);
      },
      IndexOfN: function(w, u) {
        for (var v = 0,
            t = this.items.length; v < t; v++) {
          if (this.items[v].name[w] === u) {
            return v;
          }
        }
        return null;
      },
      Right: function(t, u) {
        g.Right(t, u);
      },
      Left: function(t, u) {
        g.Left(t, u);
      },
      Up: function(u, v) {
        var t = v.lastChild;
        t.menuItem.Activate(u, t);
      },
      Down: function(u, v) {
        var t = v.firstChild;
        t.menuItem.Activate(u, t);
      },
      Space: function(t, u) {
        this.Remove(t, u);
      }
    }, {
      config: r,
      Remove: function(t) {
        return g.Event(t, this, "Remove");
      },
      Mouseover: function(t) {
        return g.Event(t, this, "Mouseover");
      },
      Mouseout: function(t) {
        return g.Event(t, this, "Mouseout");
      },
      Mousedown: function(t) {
        return g.Event(t, this, "Mousedown");
      },
      Mouseup: function(t) {
        return g.Event(t, this, "Mouseup");
      },
      Keydown: function(t) {
        return g.Event(t, this, "Keydown");
      },
      Touchstart: function(t) {
        return g.Event(t, this, "Touchstart");
      },
      Touchend: function(t) {
        return g.Event(t, this, "Touchend");
      },
      Close: function(t) {
        return g.Event(t, this.menu || this.parentNode, (this.menu ? "Touchend" : "Remove"));
      },
      Event: function(v, x, t, w) {
        if (g.skipMouseover && t === "Mouseover" && !w) {
          return m(v);
        }
        if (g.skipMouseoverFromKey && t === "Mouseover") {
          delete g.skipMouseoverFromKey;
          return m(v);
        }
        if (g.skipUp) {
          if (t.match(/Mouseup|Touchend/)) {
            delete g.skipUp;
            return m(v);
          }
          if (t === "Touchstart" || (t === "Mousedown" && !g.skipMousedown)) {
            delete g.skipUp;
          }
        }
        if (!v) {
          v = window.event;
        }
        var u = x.menuItem;
        if (u && u[t]) {
          return u[t](v, x);
        }
        return null;
      },
      BGSTYLE: {
        position: "absolute",
        left: 0,
        top: 0,
        "z-index": 200,
        width: "100%",
        height: "100%",
        border: 0,
        padding: 0,
        margin: 0
      },
      Background: function(u) {
        var v = n.addElement(document.body, "div", {
          style: this.BGSTYLE,
          id: "MathJax_MenuFrame"
        }, [["div", {
          style: this.BGSTYLE,
          menuItem: u,
          onmousedown: this.Remove
        }]]);
        var t = v.firstChild;
        if (g.msieBackgroundBug) {
          t.style.backgroundColor = "white";
          t.style.filter = "alpha(opacity=0)";
        }
        if (g.msieFixedPositionBug) {
          v.width = v.height = 0;
          this.Resize();
          attachEvent("onresize", this.Resize);
        } else {
          t.style.position = "fixed";
        }
        return v;
      },
      Resize: function() {
        setTimeout(g.SetWH, 0);
      },
      SetWH: function() {
        var t = document.getElementById("MathJax_MenuFrame");
        if (t) {
          t = t.firstChild;
          t.style.width = t.style.height = "1px";
          t.style.width = document.body.scrollWidth + "px";
          t.style.height = document.body.scrollHeight + "px";
        }
      },
      posted: false,
      active: null,
      GetNode: function(t) {
        var u = document.getElementById(t.inputID + "-Frame");
        return u.isMathJax ? u : u.firstChild;
      },
      CurrentNode: function() {
        return g.GetNode(g.jax);
      },
      AllNodes: function() {
        var u = MathJax.Hub.getAllJax();
        var v = [];
        for (var w = 0,
            t; t = u[w]; w++) {
          v.push(g.GetNode(t));
        }
        return v;
      },
      ActiveNode: function() {
        return g.active;
      },
      FocusNode: function(t) {
        g.active = t;
        t.focus();
      },
      Focus: function(t) {
        !g.posted ? g.Activate(t) : g.ActiveNode().tabIndex = -1;
        t.tabIndex = 0;
        g.FocusNode(t);
      },
      Activate: function(t, u) {
        g.UnsetTabIndex();
        g.posted = true;
      },
      Unfocus: function() {
        g.ActiveNode().tabIndex = -1;
        g.SetTabIndex();
        g.FocusNode(g.CurrentNode());
        g.posted = false;
      },
      MoveHorizontal: function(x, y, v) {
        if (!x.shiftKey) {
          return;
        }
        var u = g.AllNodes();
        var t = u.length;
        if (t === 0) {
          return;
        }
        var w = u[g.Mod(v(g.IndexOf(u, g.CurrentNode())), t)];
        if (w === g.CurrentNode()) {
          return;
        }
        g.menu.Remove(x, y);
        g.jax = MathJax.Hub.getJaxFor(w);
        g.FocusNode(w);
        g.menu.Post(null);
      },
      Right: function(t, u) {
        g.MoveHorizontal(t, u, function(v) {
          return v + 1;
        });
      },
      Left: function(t, u) {
        g.MoveHorizontal(t, u, function(v) {
          return v - 1;
        });
      },
      UnsetTabIndex: function() {
        var u = g.AllNodes();
        for (var v = 0,
            t; t = u[v]; v++) {
          if (t.tabIndex > 0) {
            t.oldTabIndex = t.tabIndex;
          }
          t.tabIndex = -1;
        }
      },
      SetTabIndex: function() {
        var u = g.AllNodes();
        for (var v = 0,
            t; t = u[v]; v++) {
          if (t.oldTabIndex !== undefined) {
            t.tabIndex = t.oldTabIndex;
            delete t.oldTabIndex;
          } else {
            t.tabIndex = f.getTabOrder(t);
          }
        }
      },
      Mod: function(t, u) {
        return ((t % u) + u) % u;
      },
      IndexOf: (Array.prototype.indexOf ? function(t, u, v) {
        return t.indexOf(u, v);
      } : function(t, w, x) {
        for (var v = (x || 0),
            u = t.length; v < u; v++) {
          if (w === t[v]) {
            return v;
          }
        }
        return -1;
      }),
      saveCookie: function() {
        n.Cookie.Set("menu", this.cookie);
      },
      getCookie: function() {
        this.cookie = n.Cookie.Get("menu");
      }
    });
    MathJax.Menu.NAV = h;
    var c = g.ITEM = h.Subclass({
      name: "",
      node: null,
      menu: null,
      Attributes: function(t) {
        return f.Insert({
          onmouseup: g.Mouseup,
          ondragstart: m,
          onselectstart: m,
          onselectend: m,
          ontouchstart: g.Touchstart,
          ontouchend: g.Touchend,
          className: "MathJax_MenuItem",
          role: this.role,
          menuItem: this
        }, t);
      },
      Create: function(v) {
        if (!this.hidden) {
          var u = this.Attributes();
          var t = this.Label(u, v);
          n.addElement(v, "div", u, t);
        }
      },
      Name: function() {
        return s(this.name[0], this.name[1]);
      },
      Mouseover: function(t, u) {
        if (u.parentNode === g.ActiveNode().parentNode) {
          this.Deactivate(g.ActiveNode());
        }
        this.Activate(t, u);
      },
      Mouseout: function(t, u) {
        this.Deactivate(u);
      },
      Mouseup: function(t, u) {
        return this.Remove(t, u);
      },
      DeactivateSubmenus: function(y) {
        var x = document.getElementById("MathJax_MenuFrame").childNodes,
            u = c.GetMenuNode(y).childNodes;
        for (var v = 0,
            t = u.length; v < t; v++) {
          var w = u[v].menuItem;
          if (w && w.submenu && w.submenu.posted && w !== y.menuItem) {
            w.Deactivate(u[v]);
          }
        }
        this.RemoveSubmenus(y, x);
      },
      RemoveSubmenus: function(v, u) {
        u = u || document.getElementById("MathJax_MenuFrame").childNodes;
        var t = u.length - 1;
        while (t >= 0 && c.GetMenuNode(v).menuItem !== u[t].menuItem) {
          u[t].menuItem.posted = false;
          u[t].parentNode.removeChild(u[t]);
          t--;
        }
      },
      Touchstart: function(t, u) {
        return this.TouchEvent(t, u, "Mousedown");
      },
      Touchend: function(t, u) {
        return this.TouchEvent(t, u, "Mouseup");
      },
      TouchEvent: function(u, v, t) {
        if (this !== c.lastItem) {
          if (c.lastMenu) {
            g.Event(u, c.lastMenu, "Mouseout");
          }
          g.Event(u, v, "Mouseover", true);
          c.lastItem = this;
          c.lastMenu = v;
        }
        if (this.nativeTouch) {
          return null;
        }
        g.Event(u, v, t);
        return false;
      },
      Remove: function(t, u) {
        u = u.parentNode.menuItem;
        return u.Remove(t, u);
      },
      With: function(t) {
        if (t) {
          f.Insert(this, t);
        }
        return this;
      },
      isRTL: function() {
        return g.isRTL;
      },
      rtlClass: function() {
        return (this.isRTL() ? " RTL" : "");
      }
    }, {GetMenuNode: function(t) {
        return t.parentNode;
      }});
    g.ENTRY = g.ITEM.Subclass({
      role: "menuitem",
      Attributes: function(t) {
        t = f.Insert({
          onmouseover: g.Mouseover,
          onmouseout: g.Mouseout,
          onmousedown: g.Mousedown,
          onkeydown: g.Keydown,
          "aria-disabled": !!this.disabled
        }, t);
        t = this.SUPER(arguments).Attributes.call(this, t);
        if (this.disabled) {
          t.className += " MathJax_MenuDisabled";
        }
        return t;
      },
      MoveVertical: function(t, D, v) {
        var w = c.GetMenuNode(D);
        var C = [];
        for (var y = 0,
            B = w.menuItem.items,
            x; x = B[y]; y++) {
          if (!x.hidden) {
            C.push(x);
          }
        }
        var A = g.IndexOf(C, this);
        if (A === -1) {
          return;
        }
        var z = C.length;
        var u = w.childNodes;
        do {
          A = g.Mod(v(A), z);
        } while (C[A].hidden || !u[A].role || u[A].role === "separator");
        this.Deactivate(D);
        C[A].Activate(t, u[A]);
      },
      Up: function(u, t) {
        this.MoveVertical(u, t, function(v) {
          return v - 1;
        });
      },
      Down: function(u, t) {
        this.MoveVertical(u, t, function(v) {
          return v + 1;
        });
      },
      Right: function(u, t) {
        this.MoveHorizontal(u, t, g.Right, !this.isRTL());
      },
      Left: function(u, t) {
        this.MoveHorizontal(u, t, g.Left, this.isRTL());
      },
      MoveHorizontal: function(z, y, t, A) {
        var w = c.GetMenuNode(y);
        if (w.menuItem === g.menu && z.shiftKey) {
          t(z, y);
        }
        if (A) {
          return;
        }
        if (w.menuItem !== g.menu) {
          this.Deactivate(y);
        }
        var u = w.previousSibling.childNodes;
        var x = u.length;
        while (x--) {
          var v = u[x];
          if (v.menuItem.submenu && v.menuItem.submenu === w.menuItem) {
            g.Focus(v);
            break;
          }
        }
        this.RemoveSubmenus(y);
      },
      Space: function(t, u) {
        this.Mouseup(t, u);
      },
      Activate: function(t, u) {
        this.Deactivate(u);
        if (!this.disabled) {
          u.className += " MathJax_MenuActive";
        }
        this.DeactivateSubmenus(u);
        g.Focus(u);
      },
      Deactivate: function(t) {
        t.className = t.className.replace(/ MathJax_MenuActive/, "");
      }
    });
    g.ITEM.COMMAND = g.ENTRY.Subclass({
      action: function() {},
      Init: function(t, v, u) {
        if (!(t instanceof Array)) {
          t = [t, t];
        }
        this.name = t;
        this.action = v;
        this.With(u);
      },
      Label: function(t, u) {
        return [this.Name()];
      },
      Mouseup: function(t, u) {
        if (!this.disabled) {
          this.Remove(t, u);
          d.Post(["command", this]);
          this.action.call(this, t);
        }
        return m(t);
      }
    });
    g.ITEM.SUBMENU = g.ENTRY.Subclass({
      submenu: null,
      marker: "\u25BA",
      markerRTL: "\u25C4",
      Attributes: function(t) {
        t = f.Insert({"aria-haspopup": "true"}, t);
        t = this.SUPER(arguments).Attributes.call(this, t);
        return t;
      },
      Init: function(t, v) {
        if (!(t instanceof Array)) {
          t = [t, t];
        }
        this.name = t;
        var u = 1;
        if (!(v instanceof g.ITEM)) {
          this.With(v), u++;
        }
        this.submenu = g.apply(g, [].slice.call(arguments, u));
      },
      Label: function(t, u) {
        this.submenu.posted = false;
        return [this.Name() + " ", ["span", {className: "MathJax_MenuArrow" + this.rtlClass()}, [this.isRTL() ? this.markerRTL : this.marker]]];
      },
      Timer: function(t, u) {
        this.ClearTimer();
        t = {
          type: t.type,
          clientX: t.clientX,
          clientY: t.clientY
        };
        this.timer = setTimeout(e(["Mouseup", this, t, u]), r.delay);
      },
      ClearTimer: function() {
        if (this.timer) {
          clearTimeout(this.timer);
        }
      },
      Touchend: function(u, w) {
        var v = this.submenu.posted;
        var t = this.SUPER(arguments).Touchend.apply(this, arguments);
        if (v) {
          this.Deactivate(w);
          delete c.lastItem;
          delete c.lastMenu;
        }
        return t;
      },
      Mouseout: function(t, u) {
        if (!this.submenu.posted) {
          this.Deactivate(u);
        }
        this.ClearTimer();
      },
      Mouseover: function(t, u) {
        this.Activate(t, u);
      },
      Mouseup: function(t, u) {
        if (!this.disabled) {
          if (!this.submenu.posted) {
            this.ClearTimer();
            this.submenu.Post(t, u, this.ltr);
            g.Focus(u);
          } else {
            this.DeactivateSubmenus(u);
          }
        }
        return m(t);
      },
      Activate: function(t, u) {
        if (!this.disabled) {
          this.Deactivate(u);
          u.className += " MathJax_MenuActive";
        }
        if (!this.submenu.posted) {
          this.DeactivateSubmenus(u);
          if (!g.isMobile) {
            this.Timer(t, u);
          }
        }
        g.Focus(u);
      },
      MoveVertical: function(v, u, t) {
        this.ClearTimer();
        this.SUPER(arguments).MoveVertical.apply(this, arguments);
      },
      MoveHorizontal: function(v, x, u, w) {
        if (!w) {
          this.SUPER(arguments).MoveHorizontal.apply(this, arguments);
          return;
        }
        if (this.disabled) {
          return;
        }
        if (!this.submenu.posted) {
          this.Activate(v, x);
          return;
        }
        var t = c.GetMenuNode(x).nextSibling.childNodes;
        if (t.length > 0) {
          this.submenu.items[0].Activate(v, t[0]);
        }
      }
    });
    g.ITEM.RADIO = g.ENTRY.Subclass({
      variable: null,
      marker: (a ? "\u25CF" : "\u2713"),
      role: "menuitemradio",
      Attributes: function(u) {
        var t = r.settings[this.variable] === this.value ? "true" : "false";
        u = f.Insert({"aria-checked": t}, u);
        u = this.SUPER(arguments).Attributes.call(this, u);
        return u;
      },
      Init: function(u, t, v) {
        if (!(u instanceof Array)) {
          u = [u, u];
        }
        this.name = u;
        this.variable = t;
        this.With(v);
        if (this.value == null) {
          this.value = this.name[0];
        }
      },
      Label: function(u, v) {
        var t = {className: "MathJax_MenuRadioCheck" + this.rtlClass()};
        if (r.settings[this.variable] !== this.value) {
          t = {style: {display: "none"}};
        }
        return [["span", t, [this.marker]], " " + this.Name()];
      },
      Mouseup: function(w, x) {
        if (!this.disabled) {
          var y = x.parentNode.childNodes;
          for (var u = 0,
              t = y.length; u < t; u++) {
            var v = y[u].menuItem;
            if (v && v.variable === this.variable) {
              y[u].firstChild.style.display = "none";
            }
          }
          x.firstChild.display = "";
          r.settings[this.variable] = this.value;
          g.cookie[this.variable] = r.settings[this.variable];
          g.saveCookie();
          d.Post(["radio button", this]);
        }
        this.Remove(w, x);
        if (this.action && !this.disabled) {
          this.action.call(g, this);
        }
        return m(w);
      }
    });
    g.ITEM.CHECKBOX = g.ENTRY.Subclass({
      variable: null,
      marker: "\u2713",
      role: "menuitemcheckbox",
      Attributes: function(u) {
        var t = r.settings[this.variable] ? "true" : "false";
        u = f.Insert({"aria-checked": t}, u);
        u = this.SUPER(arguments).Attributes.call(this, u);
        return u;
      },
      Init: function(u, t, v) {
        if (!(u instanceof Array)) {
          u = [u, u];
        }
        this.name = u;
        this.variable = t;
        this.With(v);
      },
      Label: function(u, v) {
        var t = {className: "MathJax_MenuCheck" + this.rtlClass()};
        if (!r.settings[this.variable]) {
          t = {style: {display: "none"}};
        }
        return [["span", t, [this.marker]], " " + this.Name()];
      },
      Mouseup: function(t, u) {
        if (!this.disabled) {
          u.firstChild.display = (r.settings[this.variable] ? "none" : "");
          r.settings[this.variable] = !r.settings[this.variable];
          g.cookie[this.variable] = r.settings[this.variable];
          g.saveCookie();
          d.Post(["checkbox", this]);
        }
        this.Remove(t, u);
        if (this.action && !this.disabled) {
          this.action.call(g, this);
        }
        return m(t);
      }
    });
    g.ITEM.LABEL = g.ENTRY.Subclass({
      role: "menuitem",
      Init: function(t, u) {
        if (!(t instanceof Array)) {
          t = [t, t];
        }
        this.name = t;
        this.With(u);
      },
      Label: function(t, u) {
        t.className += " MathJax_MenuLabel";
        return [this.Name()];
      },
      Activate: function(t, u) {
        this.Deactivate(u);
        g.Focus(u);
      },
      Mouseup: function(t, u) {}
    });
    g.ITEM.RULE = g.ITEM.Subclass({
      role: "separator",
      Attributes: function(t) {
        t = f.Insert({"aria-orientation": "vertical"}, t);
        t = this.SUPER(arguments).Attributes.call(this, t);
        return t;
      },
      Label: function(t, u) {
        t.className += " MathJax_MenuRule";
        return null;
      }
    });
    g.About = function(x) {
      var u = g.About.GetFont();
      var z = g.About.GetFormat();
      var t = ["MathJax.js v" + MathJax.fileversion, ["br"]];
      t.push(["div", {style: {
          "border-top": "groove 2px",
          margin: ".25em 0"
        }}]);
      g.About.GetJax(t, MathJax.InputJax, ["InputJax", "%1 Input Jax v%2"]);
      g.About.GetJax(t, MathJax.OutputJax, ["OutputJax", "%1 Output Jax v%2"]);
      g.About.GetJax(t, MathJax.ElementJax, ["ElementJax", "%1 Element Jax v%2"]);
      t.push(["div", {style: {
          "border-top": "groove 2px",
          margin: ".25em 0"
        }}]);
      g.About.GetJax(t, MathJax.Extension, ["Extension", "%1 Extension v%2"], true);
      t.push(["div", {style: {
          "border-top": "groove 2px",
          margin: ".25em 0"
        }}], ["center", {}, [f.Browser + " v" + f.Browser.version + (z ? " \u2014 " + s(z.replace(/ /g, ""), z) : "")]]);
      g.About.div = g.Background(g.About);
      var w = n.addElement(g.About.div, "div", {
        id: "MathJax_About",
        tabIndex: 0,
        onkeydown: g.About.Keydown
      }, [["b", {style: {fontSize: "120%"}}, ["MathJax"]], " v" + MathJax.version, ["br"], s(u.replace(/ /g, ""), "using " + u), ["br"], ["br"], ["span", {
        style: {
          display: "inline-block",
          "text-align": "left",
          "font-size": "80%",
          "max-height": "20em",
          overflow: "auto",
          "background-color": "#E4E4E4",
          padding: ".4em .6em",
          border: "1px inset"
        },
        tabIndex: 0
      }, t], ["br"], ["br"], ["a", {href: "http://www.mathjax.org/"}, ["www.mathjax.org"]], ["span", {
        className: "MathJax_MenuClose",
        id: "MathJax_AboutClose",
        onclick: g.About.Remove,
        onkeydown: g.About.Keydown,
        tabIndex: 0,
        role: "button",
        "aria-label": s("CloseAboutDialog", "Close about MathJax dialog")
      }, [["span", {}, "\u00D7"]]]]);
      if (x.type === "mouseup") {
        w.className += " MathJax_MousePost";
      }
      w.focus();
      MathJax.Localization.setCSS(w);
      var y = (document.documentElement || {});
      var v = window.innerHeight || y.clientHeight || y.scrollHeight || 0;
      if (g.prototype.msieAboutBug) {
        w.style.width = "20em";
        w.style.position = "absolute";
        w.style.left = Math.floor((document.documentElement.scrollWidth - w.offsetWidth) / 2) + "px";
        w.style.top = (Math.floor((v - w.offsetHeight) / 3) + document.body.scrollTop) + "px";
      } else {
        w.style.marginLeft = Math.floor(-w.offsetWidth / 2) + "px";
        w.style.top = Math.floor((v - w.offsetHeight) / 3) + "px";
      }
    };
    g.About.Remove = function(t) {
      if (g.About.div) {
        document.body.removeChild(g.About.div);
        delete g.About.div;
      }
    };
    g.About.Keydown = function(t) {
      if (t.keyCode === b.ESCAPE || (this.id === "MathJax_AboutClose" && (t.keyCode === b.SPACE || t.keyCode === b.RETURN))) {
        g.About.Remove(t);
        g.CurrentNode().focus();
        m(t);
      }
    }, g.About.GetJax = function(u, z, x, w) {
      var y = [];
      for (var A in z) {
        if (z.hasOwnProperty(A) && z[A]) {
          if ((w && z[A].version) || (z[A].isa && z[A].isa(z))) {
            y.push(s(x[0], x[1], (z[A].id || A), z[A].version));
          }
        }
      }
      y.sort();
      for (var v = 0,
          t = y.length; v < t; v++) {
        u.push(y[v], ["br"]);
      }
      return u;
    };
    g.About.GetFont = function() {
      var t = MathJax.Hub.outputJax["jax/mml"][0] || {};
      var u = {
        SVG: "web SVG",
        CommonHTML: "web TeX",
        "HTML-CSS": (t.imgFonts ? "image" : (t.webFonts ? "web" : "local") + " " + t.fontInUse)
      }[t.id] || "generic";
      return u + " fonts";
    };
    g.About.GetFormat = function() {
      var t = MathJax.Hub.outputJax["jax/mml"][0] || {};
      if (t.id !== "HTML-CSS" || !t.webFonts || t.imgFonts) {
        return;
      }
      return t.allowWebFonts.replace(/otf/, "woff or otf") + " fonts";
    };
    g.Help = function(t) {
      p.Require("[MathJax]/extensions/HelpDialog.js", function() {
        MathJax.Extension.Help.Dialog({type: t.type});
      });
    };
    g.ShowSource = function(x) {
      if (!x) {
        x = window.event;
      }
      var w = {
        screenX: x.screenX,
        screenY: x.screenY
      };
      if (!g.jax) {
        return;
      }
      if (this.format === "MathML") {
        var u = MathJax.ElementJax.mml;
        if (u && typeof(u.mbase.prototype.toMathML) !== "undefined") {
          try {
            g.ShowSource.Text(g.jax.root.toMathML("", g.jax), x);
          } catch (v) {
            if (!v.restart) {
              throw v;
            }
            e.After([this, g.ShowSource, w], v.restart);
          }
        } else {
          if (!p.loadingToMathML) {
            p.loadingToMathML = true;
            g.ShowSource.Window(x);
            e.Queue(p.Require("[MathJax]/extensions/toMathML.js"), function() {
              delete p.loadingToMathML;
              if (!u.mbase.prototype.toMathML) {
                u.mbase.prototype.toMathML = function() {};
              }
            }, [this, g.ShowSource, w]);
            return;
          }
        }
      } else {
        if (this.format === "Error") {
          g.ShowSource.Text(g.jax.errorText, x);
        } else {
          if (r.semanticsAnnotations[this.format]) {
            var t = g.jax.root.getAnnotation(this.format);
            if (t.data[0]) {
              g.ShowSource.Text(t.data[0].toString());
            }
          } else {
            if (g.jax.originalText == null) {
              alert(s("NoOriginalForm", "No original form available"));
              return;
            }
            g.ShowSource.Text(g.jax.originalText, x);
          }
        }
      }
    };
    g.ShowSource.Window = function(u) {
      if (!g.ShowSource.w) {
        var v = [],
            t = r.windowSettings;
        for (var w in t) {
          if (t.hasOwnProperty(w)) {
            v.push(w + "=" + t[w]);
          }
        }
        g.ShowSource.w = window.open("", "_blank", v.join(","));
      }
      return g.ShowSource.w;
    };
    g.ShowSource.Text = function(y, v) {
      var t = g.ShowSource.Window(v);
      delete g.ShowSource.w;
      y = y.replace(/^\s*/, "").replace(/\s*$/, "");
      y = y.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var x = s("EqSource", "MathJax Equation Source");
      if (g.isMobile) {
        t.document.open();
        t.document.write("<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0' /><title>" + x + "</title></head><body style='font-size:85%'>");
        t.document.write("<pre>" + y + "</pre>");
        t.document.write("<hr><input type='button' value='" + s("Close", "Close") + "' onclick='window.close()' />");
        t.document.write("</body></html>");
        t.document.close();
      } else {
        t.document.open();
        t.document.write("<html><head><title>" + x + "</title></head><body style='font-size:85%'>");
        t.document.write("<table><tr><td><pre>" + y + "</pre></td></tr></table>");
        t.document.write("</body></html>");
        t.document.close();
        var u = t.document.body.firstChild;
        setTimeout(function() {
          var A = (t.outerHeight - t.innerHeight) || 30,
              z = (t.outerWidth - t.innerWidth) || 30,
              w,
              D;
          z = Math.max(140, Math.min(Math.floor(0.5 * screen.width), u.offsetWidth + z + 25));
          A = Math.max(40, Math.min(Math.floor(0.5 * screen.height), u.offsetHeight + A + 25));
          if (g.prototype.msieHeightBug) {
            A += 35;
          }
          t.resizeTo(z, A);
          var C;
          try {
            C = v.screenX;
          } catch (B) {}
          if (v && C != null) {
            w = Math.max(0, Math.min(v.screenX - Math.floor(z / 2), screen.width - z - 20));
            D = Math.max(0, Math.min(v.screenY - Math.floor(A / 2), screen.height - A - 20));
            t.moveTo(w, D);
          }
        }, 50);
      }
    };
    g.Scale = function() {
      var y = ["CommonHTML", "HTML-CSS", "SVG", "NativeMML", "PreviewHTML"],
          t = y.length,
          x = 100,
          v,
          u;
      for (v = 0; v < t; v++) {
        u = q[y[v]];
        if (u) {
          x = u.config.scale;
          break;
        }
      }
      var w = prompt(s("ScaleMath", "Scale all mathematics (compared to surrounding text) by"), x + "%");
      if (w) {
        if (w.match(/^\s*\d+(\.\d*)?\s*%?\s*$/)) {
          w = parseFloat(w);
          if (w) {
            if (w !== x) {
              for (v = 0; v < t; v++) {
                u = q[y[v]];
                if (u) {
                  u.config.scale = w;
                }
              }
              g.cookie.scale = f.config.scale = w;
              g.saveCookie();
              f.Queue(["Rerender", f]);
            }
          } else {
            alert(s("NonZeroScale", "The scale should not be zero"));
          }
        } else {
          alert(s("PercentScale", "The scale should be a percentage (e.g., 120%%)"));
        }
      }
    };
    g.Zoom = function() {
      if (!MathJax.Extension.MathZoom) {
        p.Require("[MathJax]/extensions/MathZoom.js");
      }
    };
    g.Renderer = function() {
      var u = f.outputJax["jax/mml"];
      if (u[0] !== r.settings.renderer) {
        var x = f.Browser,
            w,
            t = g.Renderer.Messages,
            v;
        switch (r.settings.renderer) {
          case "NativeMML":
            if (!r.settings.warnedMML) {
              if (x.isChrome && x.version.substr(0, 3) !== "24.") {
                w = t.MML.WebKit;
              } else {
                if (x.isSafari && !x.versionAtLeast("5.0")) {
                  w = t.MML.WebKit;
                } else {
                  if (x.isMSIE) {
                    if (!x.hasMathPlayer) {
                      w = t.MML.MSIE;
                    }
                  } else {
                    if (x.isEdge) {
                      w = t.MML.WebKit;
                    } else {
                      w = t.MML[x];
                    }
                  }
                }
              }
              v = "warnedMML";
            }
            break;
          case "SVG":
            if (!r.settings.warnedSVG) {
              if (x.isMSIE && !l) {
                w = t.SVG.MSIE;
              }
            }
            break;
        }
        if (w) {
          w = s(w[0], w[1]);
          w += "\n\n";
          w += s("SwitchAnyway", "Switch the renderer anyway?\n\n(Press OK to switch, CANCEL to continue with the current renderer)");
          g.cookie.renderer = u[0].id;
          g.saveCookie();
          if (!confirm(w)) {
            g.cookie.renderer = r.settings.renderer = n.Cookie.Get("menu").renderer;
            g.saveCookie();
            return;
          }
          if (v) {
            g.cookie.warned = r.settings.warned = true;
          }
          g.cookie.renderer = r.settings.renderer;
          g.saveCookie();
        }
        f.Queue(["setRenderer", f, r.settings.renderer, "jax/mml"], ["Rerender", f]);
      }
    };
    g.Renderer.Messages = {
      MML: {
        WebKit: ["WebkitNativeMMLWarning", "Your browser doesn't seem to support MathML natively, so switching to MathML output may cause the mathematics on the page to become unreadable."],
        MSIE: ["MSIENativeMMLWarning", "Internet Explorer requires the MathPlayer plugin in order to process MathML output."],
        Opera: ["OperaNativeMMLWarning", "Opera's support for MathML is limited, so switching to MathML output may cause some expressions to render poorly."],
        Safari: ["SafariNativeMMLWarning", "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."],
        Firefox: ["FirefoxNativeMMLWarning", "Your browser's native MathML does not implement all the features used by MathJax, so some expressions may not render properly."]
      },
      SVG: {MSIE: ["MSIESVGWarning", "SVG is not implemented in Internet Explorer prior to IE9 or when it is emulating IE8 or below. Switching to SVG output will cause the mathematics to not display properly."]}
    };
    g.AssistiveMML = function(v, t) {
      var u = MathJax.Extension.AssistiveMML;
      if (!u) {
        if (!t) {
          p.Require("[MathJax]/extensions/AssistiveMML.js", ["AssistiveMML", g, v, true]);
        }
        return;
      }
      MathJax.Hub.Queue([(r.settings.assistiveMML ? "Add" : "Remove") + "AssistiveMathML", u]);
    };
    g.Font = function() {
      var t = q["HTML-CSS"];
      if (!t) {
        return;
      }
      document.location.reload();
    };
    g.Locale = function() {
      MathJax.Localization.setLocale(r.settings.locale);
      MathJax.Hub.Queue(["Reprocess", MathJax.Hub]);
    };
    g.LoadLocale = function() {
      var t = prompt(s("LoadURL", "Load translation data from this URL:"));
      if (t) {
        if (!t.match(/\.js$/)) {
          alert(s("BadURL", "The URL should be for a javascript file that defines MathJax translation data.  Javascript file names should end with '.js'"));
        }
        p.Require(t, function(u) {
          if (u != p.STATUS.OK) {
            alert(s("BadData", "Failed to load translation data from %1", t));
          }
        });
      }
    };
    g.MPEvents = function(v) {
      var u = r.settings.discoverable,
          t = g.MPEvents.Messages;
      if (!l) {
        if (r.settings.mpMouse && !confirm(s.apply(s, t.IE8warning))) {
          delete g.cookie.mpContext;
          delete r.settings.mpContext;
          delete g.cookie.mpMouse;
          delete r.settings.mpMouse;
          g.saveCookie();
          return;
        }
        r.settings.mpContext = r.settings.mpMouse;
        g.cookie.mpContext = g.cookie.mpMouse = r.settings.mpMouse;
        g.saveCookie();
        MathJax.Hub.Queue(["Rerender", MathJax.Hub]);
      } else {
        if (!u && v.name[1] === "Menu Events" && r.settings.mpContext) {
          alert(s.apply(s, t.IE9warning));
        }
      }
    };
    g.MPEvents.Messages = {
      IE8warning: ["IE8warning", "This will disable the MathJax menu and zoom features, but you can Alt-Click on an expression to obtain the MathJax menu instead.\n\nReally change the MathPlayer settings?"],
      IE9warning: ["IE9warning", "The MathJax contextual menu will be disabled, but you can Alt-Click on an expression to obtain the MathJax menu instead."]
    };
    f.Browser.Select({
      MSIE: function(t) {
        var u = (document.compatMode === "BackCompat");
        var v = t.versionAtLeast("8.0") && document.documentMode > 7;
        g.Augment({
          margin: 20,
          msieBackgroundBug: ((document.documentMode || 0) < 9),
          msieFixedPositionBug: (u || !v),
          msieAboutBug: u,
          msieHeightBug: ((document.documentMode || 0) < 9)
        });
        if (l) {
          delete r.styles["#MathJax_About"].filter;
          delete r.styles[".MathJax_Menu"].filter;
        }
      },
      Firefox: function(t) {
        g.skipMouseover = t.isMobile && t.versionAtLeast("6.0");
        g.skipMousedown = t.isMobile;
      }
    });
    g.isMobile = f.Browser.isMobile;
    g.noContextMenu = f.Browser.noContextMenu;
    g.CreateLocaleMenu = function() {
      if (!g.menu) {
        return;
      }
      var y = g.menu.Find("Language").submenu,
          v = y.items;
      var u = [],
          A = MathJax.Localization.strings;
      for (var z in A) {
        if (A.hasOwnProperty(z)) {
          u.push(z);
        }
      }
      u = u.sort();
      y.items = [];
      for (var w = 0,
          t = u.length; w < t; w++) {
        var x = A[u[w]].menuTitle;
        if (x) {
          x += " (" + u[w] + ")";
        } else {
          x = u[w];
        }
        y.items.push(c.RADIO([u[w], x], "locale", {action: g.Locale}));
      }
      y.items.push(v[v.length - 2], v[v.length - 1]);
    };
    g.CreateAnnotationMenu = function() {
      if (!g.menu) {
        return;
      }
      var v = g.menu.Find("Show Math As", "Annotation").submenu;
      var u = r.semanticsAnnotations;
      for (var t in u) {
        if (u.hasOwnProperty(t)) {
          v.items.push(c.COMMAND([t, t], g.ShowSource, {
            hidden: true,
            nativeTouch: true,
            format: t
          }));
        }
      }
    };
    f.Register.StartupHook("End Config", function() {
      r.settings = f.config.menuSettings;
      if (typeof(r.settings.showRenderer) !== "undefined") {
        r.showRenderer = r.settings.showRenderer;
      }
      if (typeof(r.settings.showFontMenu) !== "undefined") {
        r.showFontMenu = r.settings.showFontMenu;
      }
      if (typeof(r.settings.showContext) !== "undefined") {
        r.showContext = r.settings.showContext;
      }
      g.getCookie();
      g.menu = g(c.SUBMENU(["Show", "Show Math As"], c.COMMAND(["MathMLcode", "MathML Code"], g.ShowSource, {
        nativeTouch: true,
        format: "MathML"
      }), c.COMMAND(["Original", "Original Form"], g.ShowSource, {nativeTouch: true}), c.SUBMENU(["Annotation", "Annotation"], {disabled: true}), c.RULE(), c.CHECKBOX(["texHints", "Show TeX hints in MathML"], "texHints"), c.CHECKBOX(["semantics", "Add original form as annotation"], "semantics")), c.RULE(), c.SUBMENU(["Settings", "Math Settings"], c.SUBMENU(["ZoomTrigger", "Zoom Trigger"], c.RADIO(["Hover", "Hover"], "zoom", {action: g.Zoom}), c.RADIO(["Click", "Click"], "zoom", {action: g.Zoom}), c.RADIO(["DoubleClick", "Double-Click"], "zoom", {action: g.Zoom}), c.RADIO(["NoZoom", "No Zoom"], "zoom", {value: "None"}), c.RULE(), c.LABEL(["TriggerRequires", "Trigger Requires:"]), c.CHECKBOX((f.Browser.isMac ? ["Option", "Option"] : ["Alt", "Alt"]), "ALT"), c.CHECKBOX(["Command", "Command"], "CMD", {hidden: !f.Browser.isMac}), c.CHECKBOX(["Control", "Control"], "CTRL", {hidden: f.Browser.isMac}), c.CHECKBOX(["Shift", "Shift"], "Shift")), c.SUBMENU(["ZoomFactor", "Zoom Factor"], c.RADIO("125%", "zscale"), c.RADIO("133%", "zscale"), c.RADIO("150%", "zscale"), c.RADIO("175%", "zscale"), c.RADIO("200%", "zscale"), c.RADIO("250%", "zscale"), c.RADIO("300%", "zscale"), c.RADIO("400%", "zscale")), c.RULE(), c.SUBMENU(["Renderer", "Math Renderer"], {hidden: !r.showRenderer}, c.RADIO(["HTML-CSS", "HTML-CSS"], "renderer", {action: g.Renderer}), c.RADIO(["CommonHTML", "Common HTML"], "renderer", {
        action: g.Renderer,
        value: "CommonHTML"
      }), c.RADIO(["PreviewHTML", "Preview HTML"], "renderer", {
        action: g.Renderer,
        value: "PreviewHTML"
      }), c.RADIO(["MathML", "MathML"], "renderer", {
        action: g.Renderer,
        value: "NativeMML"
      }), c.RADIO(["SVG", "SVG"], "renderer", {action: g.Renderer}), c.RADIO(["PlainSource", "Plain Source"], "renderer", {
        action: g.Renderer,
        value: "PlainSource"
      }), c.RULE(), c.CHECKBOX(["FastPreview", "Fast Preview"], "FastPreview"), c.CHECKBOX(["AssistiveMML", "Assistive MathML"], "assistiveMML", {action: g.AssistiveMML}), c.CHECKBOX(["InTabOrder", "Include in Tab Order"], "inTabOrder")), c.SUBMENU("MathPlayer", {
        hidden: !f.Browser.isMSIE || !r.showMathPlayer,
        disabled: !f.Browser.hasMathPlayer
      }, c.LABEL(["MPHandles", "Let MathPlayer Handle:"]), c.CHECKBOX(["MenuEvents", "Menu Events"], "mpContext", {
        action: g.MPEvents,
        hidden: !l
      }), c.CHECKBOX(["MouseEvents", "Mouse Events"], "mpMouse", {
        action: g.MPEvents,
        hidden: !l
      }), c.CHECKBOX(["MenuAndMouse", "Mouse and Menu Events"], "mpMouse", {
        action: g.MPEvents,
        hidden: l
      })), c.SUBMENU(["FontPrefs", "Font Preference"], {hidden: !r.showFontMenu}, c.LABEL(["ForHTMLCSS", "For HTML-CSS:"]), c.RADIO(["Auto", "Auto"], "font", {action: g.Font}), c.RULE(), c.RADIO(["TeXLocal", "TeX (local)"], "font", {action: g.Font}), c.RADIO(["TeXWeb", "TeX (web)"], "font", {action: g.Font}), c.RADIO(["TeXImage", "TeX (image)"], "font", {action: g.Font}), c.RULE(), c.RADIO(["STIXLocal", "STIX (local)"], "font", {action: g.Font}), c.RADIO(["STIXWeb", "STIX (web)"], "font", {action: g.Font}), c.RULE(), c.RADIO(["AsanaMathWeb", "Asana Math (web)"], "font", {action: g.Font}), c.RADIO(["GyrePagellaWeb", "Gyre Pagella (web)"], "font", {action: g.Font}), c.RADIO(["GyreTermesWeb", "Gyre Termes (web)"], "font", {action: g.Font}), c.RADIO(["LatinModernWeb", "Latin Modern (web)"], "font", {action: g.Font}), c.RADIO(["NeoEulerWeb", "Neo Euler (web)"], "font", {action: g.Font})), c.SUBMENU(["ContextMenu", "Contextual Menu"], {hidden: !r.showContext}, c.RADIO(["MathJax", "MathJax"], "context"), c.RADIO(["Browser", "Browser"], "context")), c.COMMAND(["Scale", "Scale All Math ..."], g.Scale), c.RULE().With({
        hidden: !r.showDiscoverable,
        name: ["", "discover_rule"]
      }), c.CHECKBOX(["Discoverable", "Highlight on Hover"], "discoverable", {hidden: !r.showDiscoverable})), c.SUBMENU(["Locale", "Language"], {
        hidden: !r.showLocale,
        ltr: true
      }, c.RADIO("en", "locale", {action: g.Locale}), c.RULE().With({
        hidden: !r.showLocaleURL,
        name: ["", "localURL_rule"]
      }), c.COMMAND(["LoadLocale", "Load from URL ..."], g.LoadLocale, {hidden: !r.showLocaleURL})), c.RULE(), c.COMMAND(["About", "About MathJax"], g.About), c.COMMAND(["Help", "MathJax Help"], g.Help));
      if (g.isMobile) {
        (function() {
          var u = r.settings;
          var t = g.menu.Find("Math Settings", "Zoom Trigger").submenu;
          t.items[0].disabled = t.items[1].disabled = true;
          if (u.zoom === "Hover" || u.zoom == "Click") {
            u.zoom = "None";
          }
          t.items = t.items.slice(0, 4);
          if (navigator.appVersion.match(/[ (]Android[) ]/)) {
            g.ITEM.SUBMENU.Augment({marker: "\u00BB"});
          }
        })();
      }
      g.CreateLocaleMenu();
      g.CreateAnnotationMenu();
    });
    g.showRenderer = function(t) {
      g.cookie.showRenderer = r.showRenderer = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Math Renderer").hidden = !t;
    };
    g.showMathPlayer = function(t) {
      g.cookie.showMathPlayer = r.showMathPlayer = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "MathPlayer").hidden = !t;
    };
    g.showFontMenu = function(t) {
      g.cookie.showFontMenu = r.showFontMenu = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Font Preference").hidden = !t;
    };
    g.showContext = function(t) {
      g.cookie.showContext = r.showContext = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Contextual Menu").hidden = !t;
    };
    g.showDiscoverable = function(t) {
      g.cookie.showDiscoverable = r.showDiscoverable = t;
      g.saveCookie();
      g.menu.Find("Math Settings", "Highlight on Hover").hidden = !t;
      g.menu.Find("Math Settings", "discover_rule").hidden = !t;
    };
    g.showLocale = function(t) {
      g.cookie.showLocale = r.showLocale = t;
      g.saveCookie();
      g.menu.Find("Language").hidden = !t;
    };
    MathJax.Hub.Register.StartupHook("HTML-CSS Jax Ready", function() {
      if (!MathJax.OutputJax["HTML-CSS"].config.imageFont) {
        g.menu.Find("Math Settings", "Font Preference", "TeX (image)").disabled = true;
      }
    });
    e.Queue(f.Register.StartupHook("End Config", {}), ["Styles", p, r.styles], ["Post", f.Startup.signal, "MathMenu Ready"], ["loadComplete", p, "[MathJax]/extensions/MathMenu.js"]);
  })(MathJax.Hub, MathJax.HTML, MathJax.Ajax, MathJax.CallBack, MathJax.OutputJax);
  MathJax.ElementJax.mml = MathJax.ElementJax({mimeType: "jax/mml"}, {
    id: "mml",
    version: "2.6.0",
    directory: MathJax.ElementJax.directory + "/mml",
    extensionDir: MathJax.ElementJax.extensionDir + "/mml",
    optableDir: MathJax.ElementJax.directory + "/mml/optable"
  });
  MathJax.ElementJax.mml.Augment({Init: function() {
      if (arguments.length === 1 && arguments[0].type === "math") {
        this.root = arguments[0];
      } else {
        this.root = MathJax.ElementJax.mml.math.apply(this, arguments);
      }
      if (this.root.attr && this.root.attr.mode) {
        if (!this.root.display && this.root.attr.mode === "display") {
          this.root.display = "block";
          this.root.attrNames.push("display");
        }
        delete this.root.attr.mode;
        for (var b = 0,
            a = this.root.attrNames.length; b < a; b++) {
          if (this.root.attrNames[b] === "mode") {
            this.root.attrNames.splice(b, 1);
            break;
          }
        }
      }
    }}, {
    INHERIT: "_inherit_",
    AUTO: "_auto_",
    SIZE: {
      INFINITY: "infinity",
      SMALL: "small",
      NORMAL: "normal",
      BIG: "big"
    },
    COLOR: {TRANSPARENT: "transparent"},
    VARIANT: {
      NORMAL: "normal",
      BOLD: "bold",
      ITALIC: "italic",
      BOLDITALIC: "bold-italic",
      DOUBLESTRUCK: "double-struck",
      FRAKTUR: "fraktur",
      BOLDFRAKTUR: "bold-fraktur",
      SCRIPT: "script",
      BOLDSCRIPT: "bold-script",
      SANSSERIF: "sans-serif",
      BOLDSANSSERIF: "bold-sans-serif",
      SANSSERIFITALIC: "sans-serif-italic",
      SANSSERIFBOLDITALIC: "sans-serif-bold-italic",
      MONOSPACE: "monospace",
      INITIAL: "inital",
      TAILED: "tailed",
      LOOPED: "looped",
      STRETCHED: "stretched",
      CALIGRAPHIC: "-tex-caligraphic",
      OLDSTYLE: "-tex-oldstyle"
    },
    FORM: {
      PREFIX: "prefix",
      INFIX: "infix",
      POSTFIX: "postfix"
    },
    LINEBREAK: {
      AUTO: "auto",
      NEWLINE: "newline",
      NOBREAK: "nobreak",
      GOODBREAK: "goodbreak",
      BADBREAK: "badbreak"
    },
    LINEBREAKSTYLE: {
      BEFORE: "before",
      AFTER: "after",
      DUPLICATE: "duplicate",
      INFIXLINBREAKSTYLE: "infixlinebreakstyle"
    },
    INDENTALIGN: {
      LEFT: "left",
      CENTER: "center",
      RIGHT: "right",
      AUTO: "auto",
      ID: "id",
      INDENTALIGN: "indentalign"
    },
    INDENTSHIFT: {INDENTSHIFT: "indentshift"},
    LINETHICKNESS: {
      THIN: "thin",
      MEDIUM: "medium",
      THICK: "thick"
    },
    NOTATION: {
      LONGDIV: "longdiv",
      ACTUARIAL: "actuarial",
      RADICAL: "radical",
      BOX: "box",
      ROUNDEDBOX: "roundedbox",
      CIRCLE: "circle",
      LEFT: "left",
      RIGHT: "right",
      TOP: "top",
      BOTTOM: "bottom",
      UPDIAGONALSTRIKE: "updiagonalstrike",
      DOWNDIAGONALSTRIKE: "downdiagonalstrike",
      UPDIAGONALARROW: "updiagonalarrow",
      VERTICALSTRIKE: "verticalstrike",
      HORIZONTALSTRIKE: "horizontalstrike",
      PHASORANGLE: "phasorangle",
      MADRUWB: "madruwb"
    },
    ALIGN: {
      TOP: "top",
      BOTTOM: "bottom",
      CENTER: "center",
      BASELINE: "baseline",
      AXIS: "axis",
      LEFT: "left",
      RIGHT: "right"
    },
    LINES: {
      NONE: "none",
      SOLID: "solid",
      DASHED: "dashed"
    },
    SIDE: {
      LEFT: "left",
      RIGHT: "right",
      LEFTOVERLAP: "leftoverlap",
      RIGHTOVERLAP: "rightoverlap"
    },
    WIDTH: {
      AUTO: "auto",
      FIT: "fit"
    },
    ACTIONTYPE: {
      TOGGLE: "toggle",
      STATUSLINE: "statusline",
      TOOLTIP: "tooltip",
      INPUT: "input"
    },
    LENGTH: {
      VERYVERYTHINMATHSPACE: "veryverythinmathspace",
      VERYTHINMATHSPACE: "verythinmathspace",
      THINMATHSPACE: "thinmathspace",
      MEDIUMMATHSPACE: "mediummathspace",
      THICKMATHSPACE: "thickmathspace",
      VERYTHICKMATHSPACE: "verythickmathspace",
      VERYVERYTHICKMATHSPACE: "veryverythickmathspace",
      NEGATIVEVERYVERYTHINMATHSPACE: "negativeveryverythinmathspace",
      NEGATIVEVERYTHINMATHSPACE: "negativeverythinmathspace",
      NEGATIVETHINMATHSPACE: "negativethinmathspace",
      NEGATIVEMEDIUMMATHSPACE: "negativemediummathspace",
      NEGATIVETHICKMATHSPACE: "negativethickmathspace",
      NEGATIVEVERYTHICKMATHSPACE: "negativeverythickmathspace",
      NEGATIVEVERYVERYTHICKMATHSPACE: "negativeveryverythickmathspace"
    },
    OVERFLOW: {
      LINBREAK: "linebreak",
      SCROLL: "scroll",
      ELIDE: "elide",
      TRUNCATE: "truncate",
      SCALE: "scale"
    },
    UNIT: {
      EM: "em",
      EX: "ex",
      PX: "px",
      IN: "in",
      CM: "cm",
      MM: "mm",
      PT: "pt",
      PC: "pc"
    },
    TEXCLASS: {
      ORD: 0,
      OP: 1,
      BIN: 2,
      REL: 3,
      OPEN: 4,
      CLOSE: 5,
      PUNCT: 6,
      INNER: 7,
      VCENTER: 8,
      NONE: -1
    },
    TEXCLASSNAMES: ["ORD", "OP", "BIN", "REL", "OPEN", "CLOSE", "PUNCT", "INNER", "VCENTER"],
    skipAttributes: {
      texClass: true,
      useHeight: true,
      texprimestyle: true
    },
    copyAttributes: {
      displaystyle: 1,
      scriptlevel: 1,
      open: 1,
      close: 1,
      form: 1,
      actiontype: 1,
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      "class": 1,
      href: true,
      style: true
    },
    copyAttributeNames: ["displaystyle", "scriptlevel", "open", "close", "form", "actiontype", "fontfamily", "fontsize", "fontweight", "fontstyle", "color", "background", "id", "class", "href", "style"],
    nocopyAttributes: {
      fontfamily: true,
      fontsize: true,
      fontweight: true,
      fontstyle: true,
      color: true,
      background: true,
      id: true,
      "class": true,
      href: true,
      style: true,
      xmlns: true
    },
    Error: function(d, e) {
      var c = this.merror(d),
          b = MathJax.Localization.fontDirection(),
          a = MathJax.Localization.fontFamily();
      if (e) {
        c = c.With(e);
      }
      if (b || a) {
        c = this.mstyle(c);
        if (b) {
          c.dir = b;
        }
        if (a) {
          c.style.fontFamily = "font-family: " + a;
        }
      }
      return c;
    }
  });
  (function(a) {
    a.mbase = MathJax.Object.Subclass({
      type: "base",
      isToken: false,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      },
      noInherit: {},
      noInheritAttribute: {texClass: true},
      getRemoved: {},
      linebreakContainer: false,
      Init: function() {
        this.data = [];
        if (this.inferRow && !(arguments.length === 1 && arguments[0].inferred)) {
          this.Append(a.mrow().With({
            inferred: true,
            notParent: true
          }));
        }
        this.Append.apply(this, arguments);
      },
      With: function(e) {
        for (var f in e) {
          if (e.hasOwnProperty(f)) {
            this[f] = e[f];
          }
        }
        return this;
      },
      Append: function() {
        if (this.inferRow && this.data.length) {
          this.data[0].Append.apply(this.data[0], arguments);
        } else {
          for (var f = 0,
              e = arguments.length; f < e; f++) {
            this.SetData(this.data.length, arguments[f]);
          }
        }
      },
      SetData: function(e, f) {
        if (f != null) {
          if (!(f instanceof a.mbase)) {
            f = (this.isToken || this.isChars ? a.chars(f) : a.mtext(f));
          }
          f.parent = this;
          f.setInherit(this.inheritFromMe ? this : this.inherit);
        }
        this.data[e] = f;
      },
      Parent: function() {
        var e = this.parent;
        while (e && e.notParent) {
          e = e.parent;
        }
        return e;
      },
      Get: function(f, k, l) {
        if (!l) {
          if (this[f] != null) {
            return this[f];
          }
          if (this.attr && this.attr[f] != null) {
            return this.attr[f];
          }
        }
        var g = this.Parent();
        if (g && g["adjustChild_" + f] != null) {
          return (g["adjustChild_" + f])(this.childPosition(), k);
        }
        var j = this.inherit;
        var e = j;
        while (j) {
          var i = j[f];
          if (i == null && j.attr) {
            i = j.attr[f];
          }
          if (j.removedStyles && j.getRemoved[f] && i == null) {
            i = j.removedStyles[j.getRemoved[f]];
          }
          if (i != null && j.noInheritAttribute && !j.noInheritAttribute[f]) {
            var h = j.noInherit[this.type];
            if (!(h && h[f])) {
              return i;
            }
          }
          e = j;
          j = j.inherit;
        }
        if (!k) {
          if (this.defaults[f] === a.AUTO) {
            return this.autoDefault(f);
          }
          if (this.defaults[f] !== a.INHERIT && this.defaults[f] != null) {
            return this.defaults[f];
          }
          if (e) {
            return e.defaults[f];
          }
        }
        return null;
      },
      hasValue: function(e) {
        return (this.Get(e, true) != null);
      },
      getValues: function() {
        var f = {};
        for (var g = 0,
            e = arguments.length; g < e; g++) {
          f[arguments[g]] = this.Get(arguments[g]);
        }
        return f;
      },
      adjustChild_scriptlevel: function(f, e) {
        return this.Get("scriptlevel", e);
      },
      adjustChild_displaystyle: function(f, e) {
        return this.Get("displaystyle", e);
      },
      adjustChild_texprimestyle: function(f, e) {
        return this.Get("texprimestyle", e);
      },
      childPosition: function() {
        var h = this,
            g = h.parent;
        while (g.notParent) {
          h = g;
          g = h.parent;
        }
        for (var f = 0,
            e = g.data.length; f < e; f++) {
          if (g.data[f] === h) {
            return f;
          }
        }
        return null;
      },
      setInherit: function(g) {
        if (g !== this.inherit && this.inherit == null) {
          this.inherit = g;
          for (var f = 0,
              e = this.data.length; f < e; f++) {
            if (this.data[f] && this.data[f].setInherit) {
              this.data[f].setInherit(g);
            }
          }
        }
      },
      setTeXclass: function(e) {
        this.getPrevClass(e);
        return (typeof(this.texClass) !== "undefined" ? this : e);
      },
      getPrevClass: function(e) {
        if (e) {
          this.prevClass = e.Get("texClass");
          this.prevLevel = e.Get("scriptlevel");
        }
      },
      updateTeXclass: function(e) {
        if (e) {
          this.prevClass = e.prevClass;
          delete e.prevClass;
          this.prevLevel = e.prevLevel;
          delete e.prevLevel;
          this.texClass = e.Get("texClass");
        }
      },
      texSpacing: function() {
        var f = (this.prevClass != null ? this.prevClass : a.TEXCLASS.NONE);
        var e = (this.Get("texClass") || a.TEXCLASS.ORD);
        if (f === a.TEXCLASS.NONE || e === a.TEXCLASS.NONE) {
          return "";
        }
        if (f === a.TEXCLASS.VCENTER) {
          f = a.TEXCLASS.ORD;
        }
        if (e === a.TEXCLASS.VCENTER) {
          e = a.TEXCLASS.ORD;
        }
        var g = this.TEXSPACE[f][e];
        if (this.prevLevel > 0 && this.Get("scriptlevel") > 0 && g >= 0) {
          return "";
        }
        return this.TEXSPACELENGTH[Math.abs(g)];
      },
      TEXSPACELENGTH: ["", a.LENGTH.THINMATHSPACE, a.LENGTH.MEDIUMMATHSPACE, a.LENGTH.THICKMATHSPACE],
      TEXSPACE: [[0, -1, 2, 3, 0, 0, 0, 1], [-1, -1, 0, 3, 0, 0, 0, 1], [2, 2, 0, 0, 2, 0, 0, 2], [3, 3, 0, 0, 3, 0, 0, 3], [0, 0, 0, 0, 0, 0, 0, 0], [0, -1, 2, 3, 0, 0, 0, 1], [1, 1, 0, 1, 1, 1, 1, 1], [1, -1, 2, 3, 1, 0, 1, 1]],
      autoDefault: function(e) {
        return "";
      },
      isSpacelike: function() {
        return false;
      },
      isEmbellished: function() {
        return false;
      },
      Core: function() {
        return this;
      },
      CoreMO: function() {
        return this;
      },
      childIndex: function(g) {
        if (g == null) {
          return;
        }
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (g === this.data[f]) {
            return f;
          }
        }
      },
      CoreIndex: function() {
        return (this.inferRow ? this.data[0] || this : this).childIndex(this.Core());
      },
      hasNewline: function() {
        if (this.isEmbellished()) {
          return this.CoreMO().hasNewline();
        }
        if (this.isToken || this.linebreakContainer) {
          return false;
        }
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f] && this.data[f].hasNewline()) {
            return true;
          }
        }
        return false;
      },
      array: function() {
        if (this.inferred) {
          return this.data;
        } else {
          return [this];
        }
      },
      toString: function() {
        return this.type + "(" + this.data.join(",") + ")";
      },
      getAnnotation: function() {
        return null;
      }
    }, {
      childrenSpacelike: function() {
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (!this.data[f].isSpacelike()) {
            return false;
          }
        }
        return true;
      },
      childEmbellished: function() {
        return (this.data[0] && this.data[0].isEmbellished());
      },
      childCore: function() {
        return (this.inferRow && this.data[0] ? this.data[0].Core() : this.data[0]);
      },
      childCoreMO: function() {
        return (this.data[0] ? this.data[0].CoreMO() : null);
      },
      setChildTeXclass: function(e) {
        if (this.data[0]) {
          e = this.data[0].setTeXclass(e);
          this.updateTeXclass(this.data[0]);
        }
        return e;
      },
      setBaseTeXclasses: function(g) {
        this.getPrevClass(g);
        this.texClass = null;
        if (this.data[0]) {
          if (this.isEmbellished() || this.data[0].isa(a.mi)) {
            g = this.data[0].setTeXclass(g);
            this.updateTeXclass(this.Core());
          } else {
            this.data[0].setTeXclass();
            g = this;
          }
        } else {
          g = this;
        }
        for (var f = 1,
            e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        return g;
      },
      setSeparateTeXclasses: function(g) {
        this.getPrevClass(g);
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f]) {
            this.data[f].setTeXclass();
          }
        }
        if (this.isEmbellished()) {
          this.updateTeXclass(this.Core());
        }
        return this;
      }
    });
    a.mi = a.mbase.Subclass({
      type: "mi",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.AUTO,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      },
      autoDefault: function(f) {
        if (f === "mathvariant") {
          var e = (this.data[0] || "").toString();
          return (e.length === 1 || (e.length === 2 && e.charCodeAt(0) >= 55296 && e.charCodeAt(0) < 56320) ? a.VARIANT.ITALIC : a.VARIANT.NORMAL);
        }
        return "";
      },
      setTeXclass: function(f) {
        this.getPrevClass(f);
        var e = this.data.join("");
        if (e.length > 1 && e.match(/^[a-z][a-z0-9]*$/i) && this.texClass === a.TEXCLASS.ORD) {
          this.texClass = a.TEXCLASS.OP;
          this.autoOP = true;
        }
        return this;
      }
    });
    a.mn = a.mbase.Subclass({
      type: "mn",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      }
    });
    a.mo = a.mbase.Subclass({
      type: "mo",
      isToken: true,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT,
        form: a.AUTO,
        fence: a.AUTO,
        separator: a.AUTO,
        lspace: a.AUTO,
        rspace: a.AUTO,
        stretchy: a.AUTO,
        symmetric: a.AUTO,
        maxsize: a.AUTO,
        minsize: a.AUTO,
        largeop: a.AUTO,
        movablelimits: a.AUTO,
        accent: a.AUTO,
        linebreak: a.LINEBREAK.AUTO,
        lineleading: a.INHERIT,
        linebreakstyle: a.AUTO,
        linebreakmultchar: a.INHERIT,
        indentalign: a.INHERIT,
        indentshift: a.INHERIT,
        indenttarget: a.INHERIT,
        indentalignfirst: a.INHERIT,
        indentshiftfirst: a.INHERIT,
        indentalignlast: a.INHERIT,
        indentshiftlast: a.INHERIT,
        texClass: a.AUTO
      },
      defaultDef: {
        form: a.FORM.INFIX,
        fence: false,
        separator: false,
        lspace: a.LENGTH.THICKMATHSPACE,
        rspace: a.LENGTH.THICKMATHSPACE,
        stretchy: false,
        symmetric: false,
        maxsize: a.SIZE.INFINITY,
        minsize: "0em",
        largeop: false,
        movablelimits: false,
        accent: false,
        linebreak: a.LINEBREAK.AUTO,
        lineleading: "1ex",
        linebreakstyle: "before",
        indentalign: a.INDENTALIGN.AUTO,
        indentshift: "0",
        indenttarget: "",
        indentalignfirst: a.INDENTALIGN.INDENTALIGN,
        indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
        indentalignlast: a.INDENTALIGN.INDENTALIGN,
        indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
        texClass: a.TEXCLASS.REL
      },
      SPACE_ATTR: {
        lspace: 1,
        rspace: 2,
        form: 4
      },
      useMMLspacing: 7,
      autoDefault: function(g, n) {
        var l = this.def;
        if (!l) {
          if (g === "form") {
            this.useMMLspacing &= ~this.SPACE_ATTR.form;
            return this.getForm();
          }
          var k = this.data.join("");
          var f = [this.Get("form"), a.FORM.INFIX, a.FORM.POSTFIX, a.FORM.PREFIX];
          for (var h = 0,
              e = f.length; h < e; h++) {
            var j = this.OPTABLE[f[h]][k];
            if (j) {
              l = this.makeDef(j);
              break;
            }
          }
          if (!l) {
            l = this.CheckRange(k);
          }
          if (!l && n) {
            l = {};
          } else {
            if (!l) {
              l = MathJax.Hub.Insert({}, this.defaultDef);
            }
            if (this.parent) {
              this.def = l;
            } else {
              l = MathJax.Hub.Insert({}, l);
            }
            l.form = f[0];
          }
        }
        this.useMMLspacing &= ~(this.SPACE_ATTR[g] || 0);
        if (l[g] != null) {
          return l[g];
        } else {
          if (!n) {
            return this.defaultDef[g];
          }
        }
        return "";
      },
      CheckRange: function(j) {
        var k = j.charCodeAt(0);
        if (k >= 55296 && k < 56320) {
          k = (((k - 55296) << 10) + (j.charCodeAt(1) - 56320)) + 65536;
        }
        for (var g = 0,
            e = this.RANGES.length; g < e && this.RANGES[g][0] <= k; g++) {
          if (k <= this.RANGES[g][1]) {
            if (this.RANGES[g][3]) {
              var f = a.optableDir + "/" + this.RANGES[g][3] + ".js";
              this.RANGES[g][3] = null;
              MathJax.Hub.RestartAfter(MathJax.Ajax.Require(f));
            }
            var h = a.TEXCLASSNAMES[this.RANGES[g][2]];
            h = this.OPTABLE.infix[j] = a.mo.OPTYPES[h === "BIN" ? "BIN3" : h];
            return this.makeDef(h);
          }
        }
        return null;
      },
      makeDef: function(f) {
        if (f[2] == null) {
          f[2] = this.defaultDef.texClass;
        }
        if (!f[3]) {
          f[3] = {};
        }
        var e = MathJax.Hub.Insert({}, f[3]);
        e.lspace = this.SPACE[f[0]];
        e.rspace = this.SPACE[f[1]];
        e.texClass = f[2];
        if (e.texClass === a.TEXCLASS.REL && (this.movablelimits || this.data.join("").match(/^[a-z]+$/i))) {
          e.texClass = a.TEXCLASS.OP;
        }
        return e;
      },
      getForm: function() {
        var e = this,
            g = this.parent,
            f = this.Parent();
        while (f && f.isEmbellished()) {
          e = g;
          g = f.parent;
          f = f.Parent();
        }
        if (g && g.type === "mrow" && g.NonSpaceLength() !== 1) {
          if (g.FirstNonSpace() === e) {
            return a.FORM.PREFIX;
          }
          if (g.LastNonSpace() === e) {
            return a.FORM.POSTFIX;
          }
        }
        return a.FORM.INFIX;
      },
      isEmbellished: function() {
        return true;
      },
      hasNewline: function() {
        return (this.Get("linebreak") === a.LINEBREAK.NEWLINE);
      },
      CoreParent: function() {
        var e = this;
        while (e && e.isEmbellished() && e.CoreMO() === this && !e.isa(a.math)) {
          e = e.Parent();
        }
        return e;
      },
      CoreText: function(e) {
        if (!e) {
          return "";
        }
        if (e.isEmbellished()) {
          return e.CoreMO().data.join("");
        }
        while ((((e.isa(a.mrow) || e.isa(a.TeXAtom) || e.isa(a.mstyle) || e.isa(a.mphantom)) && e.data.length === 1) || e.isa(a.munderover)) && e.data[0]) {
          e = e.data[0];
        }
        if (!e.isToken) {
          return "";
        } else {
          return e.data.join("");
        }
      },
      remapChars: {
        "*": "\u2217",
        '"': "\u2033",
        "\u00B0": "\u2218",
        "\u00B2": "2",
        "\u00B3": "3",
        "\u00B4": "\u2032",
        "\u00B9": "1"
      },
      remap: function(f, e) {
        f = f.replace(/-/g, "\u2212");
        if (e) {
          f = f.replace(/'/g, "\u2032").replace(/`/g, "\u2035");
          if (f.length === 1) {
            f = e[f] || f;
          }
        }
        return f;
      },
      setTeXclass: function(f) {
        var e = this.getValues("form", "lspace", "rspace", "fence");
        if (this.useMMLspacing) {
          this.texClass = a.TEXCLASS.NONE;
          return this;
        }
        if (e.fence && !this.texClass) {
          if (e.form === a.FORM.PREFIX) {
            this.texClass = a.TEXCLASS.OPEN;
          }
          if (e.form === a.FORM.POSTFIX) {
            this.texClass = a.TEXCLASS.CLOSE;
          }
        }
        this.texClass = this.Get("texClass");
        if (this.data.join("") === "\u2061") {
          if (f) {
            f.texClass = a.TEXCLASS.OP;
            f.fnOP = true;
          }
          this.texClass = this.prevClass = a.TEXCLASS.NONE;
          return f;
        }
        return this.adjustTeXclass(f);
      },
      adjustTeXclass: function(f) {
        if (this.texClass === a.TEXCLASS.NONE) {
          return f;
        }
        if (f) {
          if (f.autoOP && (this.texClass === a.TEXCLASS.BIN || this.texClass === a.TEXCLASS.REL)) {
            f.texClass = a.TEXCLASS.ORD;
          }
          this.prevClass = f.texClass || a.TEXCLASS.ORD;
          this.prevLevel = f.Get("scriptlevel");
        } else {
          this.prevClass = a.TEXCLASS.NONE;
        }
        if (this.texClass === a.TEXCLASS.BIN && (this.prevClass === a.TEXCLASS.NONE || this.prevClass === a.TEXCLASS.BIN || this.prevClass === a.TEXCLASS.OP || this.prevClass === a.TEXCLASS.REL || this.prevClass === a.TEXCLASS.OPEN || this.prevClass === a.TEXCLASS.PUNCT)) {
          this.texClass = a.TEXCLASS.ORD;
        } else {
          if (this.prevClass === a.TEXCLASS.BIN && (this.texClass === a.TEXCLASS.REL || this.texClass === a.TEXCLASS.CLOSE || this.texClass === a.TEXCLASS.PUNCT)) {
            f.texClass = this.prevClass = a.TEXCLASS.ORD;
          } else {
            if (this.texClass === a.TEXCLASS.BIN) {
              var g = this,
                  e = this.parent;
              while (e && e.parent && e.isEmbellished() && (e.data.length === 1 || (e.type !== "mrow" && e.Core() === g))) {
                g = e;
                e = e.parent;
              }
              if (e.data[e.data.length - 1] === g) {
                this.texClass = a.TEXCLASS.ORD;
              }
            }
          }
        }
        return this;
      }
    });
    a.mtext = a.mbase.Subclass({
      type: "mtext",
      isToken: true,
      isSpacelike: function() {
        return true;
      },
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT
      }
    });
    a.mspace = a.mbase.Subclass({
      type: "mspace",
      isToken: true,
      isSpacelike: function() {
        return true;
      },
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        width: "0em",
        height: "0ex",
        depth: "0ex",
        linebreak: a.LINEBREAK.AUTO
      },
      hasDimAttr: function() {
        return (this.hasValue("width") || this.hasValue("height") || this.hasValue("depth"));
      },
      hasNewline: function() {
        return (!this.hasDimAttr() && this.Get("linebreak") === a.LINEBREAK.NEWLINE);
      }
    });
    a.ms = a.mbase.Subclass({
      type: "ms",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathvariant: a.INHERIT,
        mathsize: a.INHERIT,
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT,
        lquote: '"',
        rquote: '"'
      }
    });
    a.mglyph = a.mbase.Subclass({
      type: "mglyph",
      isToken: true,
      texClass: a.TEXCLASS.ORD,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        alt: "",
        src: "",
        width: a.AUTO,
        height: a.AUTO,
        valign: "0em"
      }
    });
    a.mrow = a.mbase.Subclass({
      type: "mrow",
      isSpacelike: a.mbase.childrenSpacelike,
      inferred: false,
      notParent: false,
      isEmbellished: function() {
        var f = false;
        for (var g = 0,
            e = this.data.length; g < e; g++) {
          if (this.data[g] == null) {
            continue;
          }
          if (this.data[g].isEmbellished()) {
            if (f) {
              return false;
            }
            f = true;
            this.core = g;
          } else {
            if (!this.data[g].isSpacelike()) {
              return false;
            }
          }
        }
        return f;
      },
      NonSpaceLength: function() {
        var g = 0;
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f] && !this.data[f].isSpacelike()) {
            g++;
          }
        }
        return g;
      },
      FirstNonSpace: function() {
        for (var f = 0,
            e = this.data.length; f < e; f++) {
          if (this.data[f] && !this.data[f].isSpacelike()) {
            return this.data[f];
          }
        }
        return null;
      },
      LastNonSpace: function() {
        for (var e = this.data.length - 1; e >= 0; e--) {
          if (this.data[0] && !this.data[e].isSpacelike()) {
            return this.data[e];
          }
        }
        return null;
      },
      Core: function() {
        if (!(this.isEmbellished()) || typeof(this.core) === "undefined") {
          return this;
        }
        return this.data[this.core];
      },
      CoreMO: function() {
        if (!(this.isEmbellished()) || typeof(this.core) === "undefined") {
          return this;
        }
        return this.data[this.core].CoreMO();
      },
      toString: function() {
        if (this.inferred) {
          return "[" + this.data.join(",") + "]";
        }
        return this.SUPER(arguments).toString.call(this);
      },
      setTeXclass: function(g) {
        var f,
            e = this.data.length;
        if ((this.open || this.close) && (!g || !g.fnOP)) {
          this.getPrevClass(g);
          g = null;
          for (f = 0; f < e; f++) {
            if (this.data[f]) {
              g = this.data[f].setTeXclass(g);
            }
          }
          if (!this.hasOwnProperty("texClass")) {
            this.texClass = a.TEXCLASS.INNER;
          }
          return this;
        } else {
          for (f = 0; f < e; f++) {
            if (this.data[f]) {
              g = this.data[f].setTeXclass(g);
            }
          }
          if (this.data[0]) {
            this.updateTeXclass(this.data[0]);
          }
          return g;
        }
      },
      getAnnotation: function(e) {
        if (this.data.length != 1) {
          return null;
        }
        return this.data[0].getAnnotation(e);
      }
    });
    a.mfrac = a.mbase.Subclass({
      type: "mfrac",
      num: 0,
      den: 1,
      linebreakContainer: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        linethickness: a.LINETHICKNESS.MEDIUM,
        numalign: a.ALIGN.CENTER,
        denomalign: a.ALIGN.CENTER,
        bevelled: false
      },
      adjustChild_displaystyle: function(e) {
        return false;
      },
      adjustChild_scriptlevel: function(f) {
        var e = this.Get("scriptlevel");
        if (!this.Get("displaystyle") || e > 0) {
          e++;
        }
        return e;
      },
      adjustChild_texprimestyle: function(e) {
        if (e == this.den) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.msqrt = a.mbase.Subclass({
      type: "msqrt",
      inferRow: true,
      linebreakContainer: true,
      texClass: a.TEXCLASS.ORD,
      setTeXclass: a.mbase.setSeparateTeXclasses,
      adjustChild_texprimestyle: function(e) {
        return true;
      }
    });
    a.mroot = a.mbase.Subclass({
      type: "mroot",
      linebreakContainer: true,
      texClass: a.TEXCLASS.ORD,
      adjustChild_displaystyle: function(e) {
        if (e === 1) {
          return false;
        }
        return this.Get("displaystyle");
      },
      adjustChild_scriptlevel: function(f) {
        var e = this.Get("scriptlevel");
        if (f === 1) {
          e += 2;
        }
        return e;
      },
      adjustChild_texprimestyle: function(e) {
        if (e === 0) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.mstyle = a.mbase.Subclass({
      type: "mstyle",
      isSpacelike: a.mbase.childrenSpacelike,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      inferRow: true,
      defaults: {
        scriptlevel: a.INHERIT,
        displaystyle: a.INHERIT,
        scriptsizemultiplier: Math.sqrt(1 / 2),
        scriptminsize: "8pt",
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        dir: a.INHERIT,
        infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
        decimalseparator: "."
      },
      adjustChild_scriptlevel: function(g) {
        var f = this.scriptlevel;
        if (f == null) {
          f = this.Get("scriptlevel");
        } else {
          if (String(f).match(/^ *[-+]/)) {
            var e = this.Get("scriptlevel", null, true);
            f = e + parseInt(f);
          }
        }
        return f;
      },
      inheritFromMe: true,
      noInherit: {
        mpadded: {
          width: true,
          height: true,
          depth: true,
          lspace: true,
          voffset: true
        },
        mtable: {
          width: true,
          height: true,
          depth: true,
          align: true
        }
      },
      getRemoved: {
        fontfamily: "fontFamily",
        fontweight: "fontWeight",
        fontstyle: "fontStyle",
        fontsize: "fontSize"
      },
      setTeXclass: a.mbase.setChildTeXclass
    });
    a.merror = a.mbase.Subclass({
      type: "merror",
      inferRow: true,
      linebreakContainer: true,
      texClass: a.TEXCLASS.ORD
    });
    a.mpadded = a.mbase.Subclass({
      type: "mpadded",
      inferRow: true,
      isSpacelike: a.mbase.childrenSpacelike,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        width: "",
        height: "",
        depth: "",
        lspace: 0,
        voffset: 0
      },
      setTeXclass: a.mbase.setChildTeXclass
    });
    a.mphantom = a.mbase.Subclass({
      type: "mphantom",
      texClass: a.TEXCLASS.ORD,
      inferRow: true,
      isSpacelike: a.mbase.childrenSpacelike,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      setTeXclass: a.mbase.setChildTeXclass
    });
    a.mfenced = a.mbase.Subclass({
      type: "mfenced",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        open: "(",
        close: ")",
        separators: ","
      },
      addFakeNodes: function() {
        var f = this.getValues("open", "close", "separators");
        f.open = f.open.replace(/[ \t\n\r]/g, "");
        f.close = f.close.replace(/[ \t\n\r]/g, "");
        f.separators = f.separators.replace(/[ \t\n\r]/g, "");
        if (f.open !== "") {
          this.SetData("open", a.mo(f.open).With({
            fence: true,
            form: a.FORM.PREFIX,
            texClass: a.TEXCLASS.OPEN
          }));
          this.data.open.useMMLspacing = 0;
        }
        if (f.separators !== "") {
          while (f.separators.length < this.data.length) {
            f.separators += f.separators.charAt(f.separators.length - 1);
          }
          for (var g = 1,
              e = this.data.length; g < e; g++) {
            if (this.data[g]) {
              this.SetData("sep" + g, a.mo(f.separators.charAt(g - 1)).With({separator: true}));
              this.data["sep" + g].useMMLspacing = 0;
            }
          }
        }
        if (f.close !== "") {
          this.SetData("close", a.mo(f.close).With({
            fence: true,
            form: a.FORM.POSTFIX,
            texClass: a.TEXCLASS.CLOSE
          }));
          this.data.close.useMMLspacing = 0;
        }
      },
      texClass: a.TEXCLASS.OPEN,
      setTeXclass: function(g) {
        this.addFakeNodes();
        this.getPrevClass(g);
        if (this.data.open) {
          g = this.data.open.setTeXclass(g);
        }
        if (this.data[0]) {
          g = this.data[0].setTeXclass(g);
        }
        for (var f = 1,
            e = this.data.length; f < e; f++) {
          if (this.data["sep" + f]) {
            g = this.data["sep" + f].setTeXclass(g);
          }
          if (this.data[f]) {
            g = this.data[f].setTeXclass(g);
          }
        }
        if (this.data.close) {
          g = this.data.close.setTeXclass(g);
        }
        this.updateTeXclass(this.data.open);
        this.texClass = a.TEXCLASS.INNER;
        return g;
      }
    });
    a.menclose = a.mbase.Subclass({
      type: "menclose",
      inferRow: true,
      linebreakContainer: true,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        notation: a.NOTATION.LONGDIV,
        texClass: a.TEXCLASS.ORD
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.msubsup = a.mbase.Subclass({
      type: "msubsup",
      base: 0,
      sub: 1,
      sup: 2,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        subscriptshift: "",
        superscriptshift: "",
        texClass: a.AUTO
      },
      autoDefault: function(e) {
        if (e === "texClass") {
          return (this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD);
        }
        return 0;
      },
      adjustChild_displaystyle: function(e) {
        if (e > 0) {
          return false;
        }
        return this.Get("displaystyle");
      },
      adjustChild_scriptlevel: function(f) {
        var e = this.Get("scriptlevel");
        if (f > 0) {
          e++;
        }
        return e;
      },
      adjustChild_texprimestyle: function(e) {
        if (e === this.sub) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setBaseTeXclasses
    });
    a.msub = a.msubsup.Subclass({type: "msub"});
    a.msup = a.msubsup.Subclass({
      type: "msup",
      sub: 2,
      sup: 1
    });
    a.mmultiscripts = a.msubsup.Subclass({
      type: "mmultiscripts",
      adjustChild_texprimestyle: function(e) {
        if (e % 2 === 1) {
          return true;
        }
        return this.Get("texprimestyle");
      }
    });
    a.mprescripts = a.mbase.Subclass({type: "mprescripts"});
    a.none = a.mbase.Subclass({type: "none"});
    a.munderover = a.mbase.Subclass({
      type: "munderover",
      base: 0,
      under: 1,
      over: 2,
      sub: 1,
      sup: 2,
      ACCENTS: ["", "accentunder", "accent"],
      linebreakContainer: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        accent: a.AUTO,
        accentunder: a.AUTO,
        align: a.ALIGN.CENTER,
        texClass: a.AUTO,
        subscriptshift: "",
        superscriptshift: ""
      },
      autoDefault: function(e) {
        if (e === "texClass") {
          return (this.isEmbellished() ? this.CoreMO().Get(e) : a.TEXCLASS.ORD);
        }
        if (e === "accent" && this.data[this.over]) {
          return this.data[this.over].CoreMO().Get("accent");
        }
        if (e === "accentunder" && this.data[this.under]) {
          return this.data[this.under].CoreMO().Get("accent");
        }
        return false;
      },
      adjustChild_displaystyle: function(e) {
        if (e > 0) {
          return false;
        }
        return this.Get("displaystyle");
      },
      adjustChild_scriptlevel: function(g) {
        var f = this.Get("scriptlevel");
        var e = (this.data[this.base] && !this.Get("displaystyle") && this.data[this.base].CoreMO().Get("movablelimits"));
        if (g == this.under && (e || !this.Get("accentunder"))) {
          f++;
        }
        if (g == this.over && (e || !this.Get("accent"))) {
          f++;
        }
        return f;
      },
      adjustChild_texprimestyle: function(e) {
        if (e === this.base && this.data[this.over]) {
          return true;
        }
        return this.Get("texprimestyle");
      },
      setTeXclass: a.mbase.setBaseTeXclasses
    });
    a.munder = a.munderover.Subclass({type: "munder"});
    a.mover = a.munderover.Subclass({
      type: "mover",
      over: 1,
      under: 2,
      sup: 1,
      sub: 2,
      ACCENTS: ["", "accent", "accentunder"]
    });
    a.mtable = a.mbase.Subclass({
      type: "mtable",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        align: a.ALIGN.AXIS,
        rowalign: a.ALIGN.BASELINE,
        columnalign: a.ALIGN.CENTER,
        groupalign: "{left}",
        alignmentscope: true,
        columnwidth: a.WIDTH.AUTO,
        width: a.WIDTH.AUTO,
        rowspacing: "1ex",
        columnspacing: ".8em",
        rowlines: a.LINES.NONE,
        columnlines: a.LINES.NONE,
        frame: a.LINES.NONE,
        framespacing: "0.4em 0.5ex",
        equalrows: false,
        equalcolumns: false,
        displaystyle: false,
        side: a.SIDE.RIGHT,
        minlabelspacing: "0.8em",
        texClass: a.TEXCLASS.ORD,
        useHeight: 1
      },
      adjustChild_displaystyle: function() {
        return (this.displaystyle != null ? this.displaystyle : this.defaults.displaystyle);
      },
      inheritFromMe: true,
      noInherit: {
        mover: {align: true},
        munder: {align: true},
        munderover: {align: true},
        mtable: {
          align: true,
          rowalign: true,
          columnalign: true,
          groupalign: true,
          alignmentscope: true,
          columnwidth: true,
          width: true,
          rowspacing: true,
          columnspacing: true,
          rowlines: true,
          columnlines: true,
          frame: true,
          framespacing: true,
          equalrows: true,
          equalcolumns: true,
          displaystyle: true,
          side: true,
          minlabelspacing: true,
          texClass: true,
          useHeight: 1
        }
      },
      linebreakContainer: true,
      Append: function() {
        for (var f = 0,
            e = arguments.length; f < e; f++) {
          if (!((arguments[f] instanceof a.mtr) || (arguments[f] instanceof a.mlabeledtr))) {
            arguments[f] = a.mtr(arguments[f]);
          }
        }
        this.SUPER(arguments).Append.apply(this, arguments);
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.mtr = a.mbase.Subclass({
      type: "mtr",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        rowalign: a.INHERIT,
        columnalign: a.INHERIT,
        groupalign: a.INHERIT
      },
      inheritFromMe: true,
      noInherit: {
        mrow: {
          rowalign: true,
          columnalign: true,
          groupalign: true
        },
        mtable: {
          rowalign: true,
          columnalign: true,
          groupalign: true
        }
      },
      linebreakContainer: true,
      Append: function() {
        for (var f = 0,
            e = arguments.length; f < e; f++) {
          if (!(arguments[f] instanceof a.mtd)) {
            arguments[f] = a.mtd(arguments[f]);
          }
        }
        this.SUPER(arguments).Append.apply(this, arguments);
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.mtd = a.mbase.Subclass({
      type: "mtd",
      inferRow: true,
      linebreakContainer: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        rowspan: 1,
        columnspan: 1,
        rowalign: a.INHERIT,
        columnalign: a.INHERIT,
        groupalign: a.INHERIT
      },
      setTeXclass: a.mbase.setSeparateTeXclasses
    });
    a.maligngroup = a.mbase.Subclass({
      type: "maligngroup",
      isSpacelike: function() {
        return true;
      },
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        groupalign: a.INHERIT
      },
      inheritFromMe: true,
      noInherit: {
        mrow: {groupalign: true},
        mtable: {groupalign: true}
      }
    });
    a.malignmark = a.mbase.Subclass({
      type: "malignmark",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        edge: a.SIDE.LEFT
      },
      isSpacelike: function() {
        return true;
      }
    });
    a.mlabeledtr = a.mtr.Subclass({type: "mlabeledtr"});
    a.maction = a.mbase.Subclass({
      type: "maction",
      defaults: {
        mathbackground: a.INHERIT,
        mathcolor: a.INHERIT,
        actiontype: a.ACTIONTYPE.TOGGLE,
        selection: 1
      },
      selected: function() {
        return this.data[this.Get("selection") - 1] || a.NULL;
      },
      isEmbellished: function() {
        return this.selected().isEmbellished();
      },
      isSpacelike: function() {
        return this.selected().isSpacelike();
      },
      Core: function() {
        return this.selected().Core();
      },
      CoreMO: function() {
        return this.selected().CoreMO();
      },
      setTeXclass: function(f) {
        if (this.Get("actiontype") === a.ACTIONTYPE.TOOLTIP && this.data[1]) {
          this.data[1].setTeXclass();
        }
        var e = this.selected();
        f = e.setTeXclass(f);
        this.updateTeXclass(e);
        return f;
      }
    });
    a.semantics = a.mbase.Subclass({
      type: "semantics",
      notParent: true,
      isEmbellished: a.mbase.childEmbellished,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      defaults: {
        definitionURL: null,
        encoding: null
      },
      setTeXclass: a.mbase.setChildTeXclass,
      getAnnotation: function(g) {
        var l = MathJax.Hub.config.MathMenu.semanticsAnnotations[g];
        if (l) {
          for (var h = 0,
              e = this.data.length; h < e; h++) {
            var k = this.data[h].Get("encoding");
            if (k) {
              for (var f = 0,
                  o = l.length; f < o; f++) {
                if (l[f] === k) {
                  return this.data[h];
                }
              }
            }
          }
        }
        return null;
      }
    });
    a.annotation = a.mbase.Subclass({
      type: "annotation",
      isChars: true,
      linebreakContainer: true,
      defaults: {
        definitionURL: null,
        encoding: null,
        cd: "mathmlkeys",
        name: "",
        src: null
      }
    });
    a["annotation-xml"] = a.mbase.Subclass({
      type: "annotation-xml",
      linebreakContainer: true,
      defaults: {
        definitionURL: null,
        encoding: null,
        cd: "mathmlkeys",
        name: "",
        src: null
      }
    });
    a.math = a.mstyle.Subclass({
      type: "math",
      defaults: {
        mathvariant: a.VARIANT.NORMAL,
        mathsize: a.SIZE.NORMAL,
        mathcolor: "",
        mathbackground: a.COLOR.TRANSPARENT,
        dir: "ltr",
        scriptlevel: 0,
        displaystyle: a.AUTO,
        display: "inline",
        maxwidth: "",
        overflow: a.OVERFLOW.LINEBREAK,
        altimg: "",
        "altimg-width": "",
        "altimg-height": "",
        "altimg-valign": "",
        alttext: "",
        cdgroup: "",
        scriptsizemultiplier: Math.sqrt(1 / 2),
        scriptminsize: "8px",
        infixlinebreakstyle: a.LINEBREAKSTYLE.BEFORE,
        lineleading: "1ex",
        indentshift: "auto",
        indentalign: a.INDENTALIGN.AUTO,
        indentalignfirst: a.INDENTALIGN.INDENTALIGN,
        indentshiftfirst: a.INDENTSHIFT.INDENTSHIFT,
        indentalignlast: a.INDENTALIGN.INDENTALIGN,
        indentshiftlast: a.INDENTSHIFT.INDENTSHIFT,
        decimalseparator: ".",
        texprimestyle: false
      },
      autoDefault: function(e) {
        if (e === "displaystyle") {
          return this.Get("display") === "block";
        }
        return "";
      },
      linebreakContainer: true,
      setTeXclass: a.mbase.setChildTeXclass,
      getAnnotation: function(e) {
        if (this.data.length != 1) {
          return null;
        }
        return this.data[0].getAnnotation(e);
      }
    });
    a.chars = a.mbase.Subclass({
      type: "chars",
      Append: function() {
        this.data.push.apply(this.data, arguments);
      },
      value: function() {
        return this.data.join("");
      },
      toString: function() {
        return this.data.join("");
      }
    });
    a.entity = a.mbase.Subclass({
      type: "entity",
      Append: function() {
        this.data.push.apply(this.data, arguments);
      },
      value: function() {
        if (this.data[0].substr(0, 2) === "#x") {
          return parseInt(this.data[0].substr(2), 16);
        } else {
          if (this.data[0].substr(0, 1) === "#") {
            return parseInt(this.data[0].substr(1));
          } else {
            return 0;
          }
        }
      },
      toString: function() {
        var e = this.value();
        if (e <= 65535) {
          return String.fromCharCode(e);
        }
        e -= 65536;
        return String.fromCharCode((e >> 10) + 55296) + String.fromCharCode((e & 1023) + 56320);
      }
    });
    a.xml = a.mbase.Subclass({
      type: "xml",
      Init: function() {
        this.div = document.createElement("div");
        return this.SUPER(arguments).Init.apply(this, arguments);
      },
      Append: function() {
        for (var f = 0,
            e = arguments.length; f < e; f++) {
          var g = this.Import(arguments[f]);
          this.data.push(g);
          this.div.appendChild(g);
        }
      },
      Import: function(j) {
        if (document.importNode) {
          return document.importNode(j, true);
        }
        var f,
            g,
            e;
        if (j.nodeType === 1) {
          f = document.createElement(j.nodeName);
          for (g = 0, e = j.attributes.length; g < e; g++) {
            var h = j.attributes[g];
            if (h.specified && h.nodeValue != null && h.nodeValue != "") {
              f.setAttribute(h.nodeName, h.nodeValue);
            }
            if (h.nodeName === "style") {
              f.style.cssText = h.nodeValue;
            }
          }
          if (j.className) {
            f.className = j.className;
          }
        } else {
          if (j.nodeType === 3 || j.nodeType === 4) {
            f = document.createTextNode(j.nodeValue);
          } else {
            if (j.nodeType === 8) {
              f = document.createComment(j.nodeValue);
            } else {
              return document.createTextNode("");
            }
          }
        }
        for (g = 0, e = j.childNodes.length; g < e; g++) {
          f.appendChild(this.Import(j.childNodes[g]));
        }
        return f;
      },
      value: function() {
        return this.div;
      },
      toString: function() {
        return this.div.innerHTML;
      }
    });
    a.TeXAtom = a.mbase.Subclass({
      type: "texatom",
      inferRow: true,
      notParent: true,
      texClass: a.TEXCLASS.ORD,
      Core: a.mbase.childCore,
      CoreMO: a.mbase.childCoreMO,
      isEmbellished: a.mbase.childEmbellished,
      setTeXclass: function(e) {
        this.data[0].setTeXclass();
        return this.adjustTeXclass(e);
      },
      adjustTeXclass: a.mo.prototype.adjustTeXclass
    });
    a.NULL = a.mbase().With({type: "null"});
    var b = a.TEXCLASS;
    var d = {
      ORD: [0, 0, b.ORD],
      ORD11: [1, 1, b.ORD],
      ORD21: [2, 1, b.ORD],
      ORD02: [0, 2, b.ORD],
      ORD55: [5, 5, b.ORD],
      OP: [1, 2, b.OP, {
        largeop: true,
        movablelimits: true,
        symmetric: true
      }],
      OPFIXED: [1, 2, b.OP, {
        largeop: true,
        movablelimits: true
      }],
      INTEGRAL: [0, 1, b.OP, {
        largeop: true,
        symmetric: true
      }],
      INTEGRAL2: [1, 2, b.OP, {
        largeop: true,
        symmetric: true
      }],
      BIN3: [3, 3, b.BIN],
      BIN4: [4, 4, b.BIN],
      BIN01: [0, 1, b.BIN],
      BIN5: [5, 5, b.BIN],
      TALLBIN: [4, 4, b.BIN, {stretchy: true}],
      BINOP: [4, 4, b.BIN, {
        largeop: true,
        movablelimits: true
      }],
      REL: [5, 5, b.REL],
      REL1: [1, 1, b.REL, {stretchy: true}],
      REL4: [4, 4, b.REL],
      RELSTRETCH: [5, 5, b.REL, {stretchy: true}],
      RELACCENT: [5, 5, b.REL, {accent: true}],
      WIDEREL: [5, 5, b.REL, {
        accent: true,
        stretchy: true
      }],
      OPEN: [0, 0, b.OPEN, {
        fence: true,
        stretchy: true,
        symmetric: true
      }],
      CLOSE: [0, 0, b.CLOSE, {
        fence: true,
        stretchy: true,
        symmetric: true
      }],
      INNER: [0, 0, b.INNER],
      PUNCT: [0, 3, b.PUNCT],
      ACCENT: [0, 0, b.ORD, {accent: true}],
      WIDEACCENT: [0, 0, b.ORD, {
        accent: true,
        stretchy: true
      }]
    };
    a.mo.Augment({
      SPACE: ["0em", "0.1111em", "0.1667em", "0.2222em", "0.2667em", "0.3333em"],
      RANGES: [[32, 127, b.REL, "BasicLatin"], [160, 255, b.ORD, "Latin1Supplement"], [256, 383, b.ORD], [384, 591, b.ORD], [688, 767, b.ORD, "SpacingModLetters"], [768, 879, b.ORD, "CombDiacritMarks"], [880, 1023, b.ORD, "GreekAndCoptic"], [7680, 7935, b.ORD], [8192, 8303, b.PUNCT, "GeneralPunctuation"], [8304, 8351, b.ORD], [8352, 8399, b.ORD], [8400, 8447, b.ORD, "CombDiactForSymbols"], [8448, 8527, b.ORD, "LetterlikeSymbols"], [8528, 8591, b.ORD], [8592, 8703, b.REL, "Arrows"], [8704, 8959, b.BIN, "MathOperators"], [8960, 9215, b.ORD, "MiscTechnical"], [9312, 9471, b.ORD], [9472, 9631, b.ORD], [9632, 9727, b.ORD, "GeometricShapes"], [9984, 10175, b.ORD, "Dingbats"], [10176, 10223, b.ORD, "MiscMathSymbolsA"], [10224, 10239, b.REL, "SupplementalArrowsA"], [10496, 10623, b.REL, "SupplementalArrowsB"], [10624, 10751, b.ORD, "MiscMathSymbolsB"], [10752, 11007, b.BIN, "SuppMathOperators"], [11008, 11263, b.ORD, "MiscSymbolsAndArrows"], [119808, 120831, b.ORD]],
      OPTABLE: {
        prefix: {
          "\u2200": d.ORD21,
          "\u2202": d.ORD21,
          "\u2203": d.ORD21,
          "\u2207": d.ORD21,
          "\u220F": d.OP,
          "\u2210": d.OP,
          "\u2211": d.OP,
          "\u2212": d.BIN01,
          "\u2213": d.BIN01,
          "\u221A": [1, 1, b.ORD, {stretchy: true}],
          "\u2220": d.ORD,
          "\u222B": d.INTEGRAL,
          "\u222E": d.INTEGRAL,
          "\u22C0": d.OP,
          "\u22C1": d.OP,
          "\u22C2": d.OP,
          "\u22C3": d.OP,
          "\u2308": d.OPEN,
          "\u230A": d.OPEN,
          "\u27E8": d.OPEN,
          "\u27EE": d.OPEN,
          "\u2A00": d.OP,
          "\u2A01": d.OP,
          "\u2A02": d.OP,
          "\u2A04": d.OP,
          "\u2A06": d.OP,
          "\u00AC": d.ORD21,
          "\u00B1": d.BIN01,
          "(": d.OPEN,
          "+": d.BIN01,
          "-": d.BIN01,
          "[": d.OPEN,
          "{": d.OPEN,
          "|": d.OPEN
        },
        postfix: {
          "!": [1, 0, b.CLOSE],
          "&": d.ORD,
          "\u2032": d.ORD02,
          "\u203E": d.WIDEACCENT,
          "\u2309": d.CLOSE,
          "\u230B": d.CLOSE,
          "\u23DE": d.WIDEACCENT,
          "\u23DF": d.WIDEACCENT,
          "\u266D": d.ORD02,
          "\u266E": d.ORD02,
          "\u266F": d.ORD02,
          "\u27E9": d.CLOSE,
          "\u27EF": d.CLOSE,
          "\u02C6": d.WIDEACCENT,
          "\u02C7": d.WIDEACCENT,
          "\u02C9": d.WIDEACCENT,
          "\u02CA": d.ACCENT,
          "\u02CB": d.ACCENT,
          "\u02D8": d.ACCENT,
          "\u02D9": d.ACCENT,
          "\u02DC": d.WIDEACCENT,
          "\u0302": d.WIDEACCENT,
          "\u00A8": d.ACCENT,
          "\u00AF": d.WIDEACCENT,
          ")": d.CLOSE,
          "]": d.CLOSE,
          "^": d.WIDEACCENT,
          _: d.WIDEACCENT,
          "`": d.ACCENT,
          "|": d.CLOSE,
          "}": d.CLOSE,
          "~": d.WIDEACCENT
        },
        infix: {
          "": d.ORD,
          "%": [3, 3, b.ORD],
          "\u2022": d.BIN4,
          "\u2026": d.INNER,
          "\u2044": d.TALLBIN,
          "\u2061": d.ORD,
          "\u2062": d.ORD,
          "\u2063": [0, 0, b.ORD, {
            linebreakstyle: "after",
            separator: true
          }],
          "\u2064": d.ORD,
          "\u2190": d.WIDEREL,
          "\u2191": d.RELSTRETCH,
          "\u2192": d.WIDEREL,
          "\u2193": d.RELSTRETCH,
          "\u2194": d.WIDEREL,
          "\u2195": d.RELSTRETCH,
          "\u2196": d.RELSTRETCH,
          "\u2197": d.RELSTRETCH,
          "\u2198": d.RELSTRETCH,
          "\u2199": d.RELSTRETCH,
          "\u21A6": d.WIDEREL,
          "\u21A9": d.WIDEREL,
          "\u21AA": d.WIDEREL,
          "\u21BC": d.WIDEREL,
          "\u21BD": d.WIDEREL,
          "\u21C0": d.WIDEREL,
          "\u21C1": d.WIDEREL,
          "\u21CC": d.WIDEREL,
          "\u21D0": d.WIDEREL,
          "\u21D1": d.RELSTRETCH,
          "\u21D2": d.WIDEREL,
          "\u21D3": d.RELSTRETCH,
          "\u21D4": d.WIDEREL,
          "\u21D5": d.RELSTRETCH,
          "\u2208": d.REL,
          "\u2209": d.REL,
          "\u220B": d.REL,
          "\u2212": d.BIN4,
          "\u2213": d.BIN4,
          "\u2215": d.TALLBIN,
          "\u2216": d.BIN4,
          "\u2217": d.BIN4,
          "\u2218": d.BIN4,
          "\u2219": d.BIN4,
          "\u221D": d.REL,
          "\u2223": d.REL,
          "\u2225": d.REL,
          "\u2227": d.BIN4,
          "\u2228": d.BIN4,
          "\u2229": d.BIN4,
          "\u222A": d.BIN4,
          "\u223C": d.REL,
          "\u2240": d.BIN4,
          "\u2243": d.REL,
          "\u2245": d.REL,
          "\u2248": d.REL,
          "\u224D": d.REL,
          "\u2250": d.REL,
          "\u2260": d.REL,
          "\u2261": d.REL,
          "\u2264": d.REL,
          "\u2265": d.REL,
          "\u226A": d.REL,
          "\u226B": d.REL,
          "\u227A": d.REL,
          "\u227B": d.REL,
          "\u2282": d.REL,
          "\u2283": d.REL,
          "\u2286": d.REL,
          "\u2287": d.REL,
          "\u228E": d.BIN4,
          "\u2291": d.REL,
          "\u2292": d.REL,
          "\u2293": d.BIN4,
          "\u2294": d.BIN4,
          "\u2295": d.BIN4,
          "\u2296": d.BIN4,
          "\u2297": d.BIN4,
          "\u2298": d.BIN4,
          "\u2299": d.BIN4,
          "\u22A2": d.REL,
          "\u22A3": d.REL,
          "\u22A4": d.ORD55,
          "\u22A5": d.REL,
          "\u22A8": d.REL,
          "\u22C4": d.BIN4,
          "\u22C5": d.BIN4,
          "\u22C6": d.BIN4,
          "\u22C8": d.REL,
          "\u22EE": d.ORD55,
          "\u22EF": d.INNER,
          "\u22F1": [5, 5, b.INNER],
          "\u25B3": d.BIN4,
          "\u25B5": d.BIN4,
          "\u25B9": d.BIN4,
          "\u25BD": d.BIN4,
          "\u25BF": d.BIN4,
          "\u25C3": d.BIN4,
          "\u2758": d.REL,
          "\u27F5": d.WIDEREL,
          "\u27F6": d.WIDEREL,
          "\u27F7": d.WIDEREL,
          "\u27F8": d.WIDEREL,
          "\u27F9": d.WIDEREL,
          "\u27FA": d.WIDEREL,
          "\u27FC": d.WIDEREL,
          "\u2A2F": d.BIN4,
          "\u2A3F": d.BIN4,
          "\u2AAF": d.REL,
          "\u2AB0": d.REL,
          "\u00B1": d.BIN4,
          "\u00B7": d.BIN4,
          "\u00D7": d.BIN4,
          "\u00F7": d.BIN4,
          "*": d.BIN3,
          "+": d.BIN4,
          ",": [0, 3, b.PUNCT, {
            linebreakstyle: "after",
            separator: true
          }],
          "-": d.BIN4,
          ".": [3, 3, b.ORD],
          "/": d.ORD11,
          ":": [1, 2, b.REL],
          ";": [0, 3, b.PUNCT, {
            linebreakstyle: "after",
            separator: true
          }],
          "<": d.REL,
          "=": d.REL,
          ">": d.REL,
          "?": [1, 1, b.CLOSE],
          "\\": d.ORD,
          "^": d.ORD11,
          _: d.ORD11,
          "|": [2, 2, b.ORD, {
            fence: true,
            stretchy: true,
            symmetric: true
          }],
          "#": d.ORD,
          "$": d.ORD,
          "\u002E": [0, 3, b.PUNCT, {separator: true}],
          "\u02B9": d.ORD,
          "\u0300": d.ACCENT,
          "\u0301": d.ACCENT,
          "\u0303": d.WIDEACCENT,
          "\u0304": d.ACCENT,
          "\u0306": d.ACCENT,
          "\u0307": d.ACCENT,
          "\u0308": d.ACCENT,
          "\u030C": d.ACCENT,
          "\u0332": d.WIDEACCENT,
          "\u0338": d.REL4,
          "\u2015": [0, 0, b.ORD, {stretchy: true}],
          "\u2017": [0, 0, b.ORD, {stretchy: true}],
          "\u2020": d.BIN3,
          "\u2021": d.BIN3,
          "\u20D7": d.ACCENT,
          "\u2111": d.ORD,
          "\u2113": d.ORD,
          "\u2118": d.ORD,
          "\u211C": d.ORD,
          "\u2205": d.ORD,
          "\u221E": d.ORD,
          "\u2305": d.BIN3,
          "\u2306": d.BIN3,
          "\u2322": d.REL4,
          "\u2323": d.REL4,
          "\u2329": d.OPEN,
          "\u232A": d.CLOSE,
          "\u23AA": d.ORD,
          "\u23AF": [0, 0, b.ORD, {stretchy: true}],
          "\u23B0": d.OPEN,
          "\u23B1": d.CLOSE,
          "\u2500": d.ORD,
          "\u25EF": d.BIN3,
          "\u2660": d.ORD,
          "\u2661": d.ORD,
          "\u2662": d.ORD,
          "\u2663": d.ORD,
          "\u3008": d.OPEN,
          "\u3009": d.CLOSE,
          "\uFE37": d.WIDEACCENT,
          "\uFE38": d.WIDEACCENT
        }
      }
    }, {OPTYPES: d});
    var c = a.mo.prototype.OPTABLE;
    c.infix["^"] = d.WIDEREL;
    c.infix._ = d.WIDEREL;
    c.prefix["\u2223"] = d.OPEN;
    c.prefix["\u2225"] = d.OPEN;
    c.postfix["\u2223"] = d.CLOSE;
    c.postfix["\u2225"] = d.CLOSE;
  })(MathJax.ElementJax.mml);
  MathJax.ElementJax.mml.loadComplete("jax.js");
  MathJax.Hub.Register.LoadHook("[MathJax]/jax/element/mml/jax.js", function() {
    var c = "2.6.1";
    var a = MathJax.ElementJax.mml,
        b = MathJax.Hub.config.menuSettings;
    a.mbase.Augment({
      toMathML: function(l) {
        var h = (this.inferred && this.parent.inferRow);
        if (l == null) {
          l = "";
        }
        var f = this.type,
            e = this.toMathMLattributes();
        if (f === "mspace") {
          return l + "<" + f + e + " />";
        }
        var k = [],
            j = (this.isToken ? "" : l + (h ? "" : "  "));
        for (var g = 0,
            d = this.data.length; g < d; g++) {
          if (this.data[g]) {
            k.push(this.data[g].toMathML(j));
          } else {
            if (!this.isToken && !this.isChars) {
              k.push(j + "<mrow />");
            }
          }
        }
        if (this.isToken || this.isChars) {
          return l + "<" + f + e + ">" + k.join("") + "</" + f + ">";
        }
        if (h) {
          return k.join("\n");
        }
        if (k.length === 0 || (k.length === 1 && k[0] === "")) {
          return l + "<" + f + e + " />";
        }
        return l + "<" + f + e + ">\n" + k.join("\n") + "\n" + l + "</" + f + ">";
      },
      toMathMLattributes: function() {
        var j = (this.type === "mstyle" ? a.math.prototype.defaults : this.defaults);
        var h = (this.attrNames || a.copyAttributeNames),
            g = a.skipAttributes,
            l = a.copyAttributes;
        var e = [];
        if (this.type === "math" && (!this.attr || !this.attr.xmlns)) {
          e.push('xmlns="http://www.w3.org/1998/Math/MathML"');
        }
        if (!this.attrNames) {
          for (var k in j) {
            if (!g[k] && !l[k] && j.hasOwnProperty(k)) {
              if (this[k] != null && this[k] !== j[k]) {
                if (this.Get(k, null, 1) !== this[k]) {
                  e.push(k + '="' + this.toMathMLattribute(this[k]) + '"');
                }
              }
            }
          }
        }
        for (var f = 0,
            d = h.length; f < d; f++) {
          if (l[h[f]] === 1 && !j.hasOwnProperty(h[f])) {
            continue;
          }
          value = (this.attr || {})[h[f]];
          if (value == null) {
            value = this[h[f]];
          }
          if (value != null) {
            e.push(h[f] + '="' + this.toMathMLquote(value) + '"');
          }
        }
        this.toMathMLclass(e);
        if (e.length) {
          return " " + e.join(" ");
        } else {
          return "";
        }
      },
      toMathMLclass: function(d) {
        var f = [];
        if (this["class"]) {
          f.push(this["class"]);
        }
        if (this.isa(a.TeXAtom) && b.texHints) {
          var e = ["ORD", "OP", "BIN", "REL", "OPEN", "CLOSE", "PUNCT", "INNER", "VCENTER"][this.texClass];
          if (e) {
            f.push("MJX-TeXAtom-" + e);
            if (e === "OP" && !this.movablelimits) {
              f.push("MJX-fixedlimits");
            }
          }
        }
        if (this.mathvariant && this.toMathMLvariants[this.mathvariant]) {
          f.push("MJX" + this.mathvariant);
        }
        if (this.variantForm) {
          f.push("MJX-variant");
        }
        if (f.length) {
          d.unshift('class="' + f.join(" ") + '"');
        }
      },
      toMathMLattribute: function(d) {
        if (typeof(d) === "string" && d.replace(/ /g, "").match(/^(([-+])?(\d+(\.\d*)?|\.\d+))mu$/)) {
          return (RegExp.$2 || "") + ((1 / 18) * RegExp.$3).toFixed(3).replace(/\.?0+$/, "") + "em";
        } else {
          if (this.toMathMLvariants[d]) {
            return this.toMathMLvariants[d];
          }
        }
        return this.toMathMLquote(d);
      },
      toMathMLvariants: {
        "-tex-caligraphic": a.VARIANT.SCRIPT,
        "-tex-caligraphic-bold": a.VARIANT.BOLDSCRIPT,
        "-tex-oldstyle": a.VARIANT.NORMAL,
        "-tex-oldstyle-bold": a.VARIANT.BOLD,
        "-tex-mathit": a.VARIANT.ITALIC
      },
      toMathMLquote: function(f) {
        f = String(f).split("");
        for (var g = 0,
            d = f.length; g < d; g++) {
          var k = f[g].charCodeAt(0);
          if (k <= 55295 || 57344 <= k) {
            if (k > 126 || (k < 32 && k !== 10 && k !== 13 && k !== 9)) {
              f[g] = "&#x" + k.toString(16).toUpperCase() + ";";
            } else {
              var j = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;"
              }[f[g]];
              if (j) {
                f[g] = j;
              }
            }
          } else {
            if (g + 1 < d) {
              var h = f[g + 1].charCodeAt(0);
              var e = (((k - 55296) << 10) + (h - 56320) + 65536);
              f[g] = "&#x" + e.toString(16).toUpperCase() + ";";
              f[g + 1] = "";
              g++;
            } else {
              f[g] = "";
            }
          }
        }
        return f.join("");
      }
    });
    a.math.Augment({toMathML: function(d, e) {
        var g;
        if (d == null) {
          d = "";
        }
        if (e && e.originalText && b.semantics) {
          g = MathJax.InputJax[e.inputJax].annotationEncoding;
        }
        var n = (this.data[0] && this.data[0].data.length > 1);
        var p = this.type,
            k = this.toMathMLattributes();
        var j = [],
            o = d + (g ? "  " + (n ? "  " : "") : "") + "  ";
        for (var h = 0,
            f = this.data.length; h < f; h++) {
          if (this.data[h]) {
            j.push(this.data[h].toMathML(o));
          } else {
            j.push(o + "<mrow />");
          }
        }
        if (j.length === 0 || (j.length === 1 && j[0] === "")) {
          if (!g) {
            return "<" + p + k + " />";
          }
          j.push(o + "<mrow />");
        }
        if (g) {
          if (n) {
            j.unshift(d + "    <mrow>");
            j.push(d + "    </mrow>");
          }
          j.unshift(d + "  <semantics>");
          var l = e.originalText.replace(/[&<>]/g, function(i) {
            return {
              ">": "&gt;",
              "<": "&lt;",
              "&": "&amp;"
            }[i];
          });
          j.push(d + '    <annotation encoding="' + g + '">' + l + "</annotation>");
          j.push(d + "  </semantics>");
        }
        return d + "<" + p + k + ">\n" + j.join("\n") + "\n" + d + "</" + p + ">";
      }});
    a.msubsup.Augment({toMathML: function(j) {
        var f = this.type;
        if (this.data[this.sup] == null) {
          f = "msub";
        }
        if (this.data[this.sub] == null) {
          f = "msup";
        }
        var e = this.toMathMLattributes();
        delete this.data[0].inferred;
        var h = [];
        for (var g = 0,
            d = this.data.length; g < d; g++) {
          if (this.data[g]) {
            h.push(this.data[g].toMathML(j + "  "));
          }
        }
        return j + "<" + f + e + ">\n" + h.join("\n") + "\n" + j + "</" + f + ">";
      }});
    a.munderover.Augment({toMathML: function(k) {
        var f = this.type;
        var j = this.data[this.base];
        if (j && j.isa(a.TeXAtom) && j.movablelimits && !j.Get("displaystyle")) {
          type = "msubsup";
          if (this.data[this.under] == null) {
            f = "msup";
          }
          if (this.data[this.over] == null) {
            f = "msub";
          }
        } else {
          if (this.data[this.under] == null) {
            f = "mover";
          }
          if (this.data[this.over] == null) {
            f = "munder";
          }
        }
        var e = this.toMathMLattributes();
        delete this.data[0].inferred;
        var h = [];
        for (var g = 0,
            d = this.data.length; g < d; g++) {
          if (this.data[g]) {
            h.push(this.data[g].toMathML(k + "  "));
          }
        }
        return k + "<" + f + e + ">\n" + h.join("\n") + "\n" + k + "</" + f + ">";
      }});
    a.TeXAtom.Augment({toMathML: function(e) {
        var d = this.toMathMLattributes();
        if (!d && this.data[0].data.length === 1) {
          return e.substr(2) + this.data[0].toMathML(e);
        }
        return e + "<mrow" + d + ">\n" + this.data[0].toMathML(e + "  ") + "\n" + e + "</mrow>";
      }});
    a.chars.Augment({toMathML: function(d) {
        return (d || "") + this.toMathMLquote(this.toString());
      }});
    a.entity.Augment({toMathML: function(d) {
        return (d || "") + "&" + this.data[0] + ";<!-- " + this.toString() + " -->";
      }});
    a.xml.Augment({toMathML: function(d) {
        return (d || "") + this.toString();
      }});
    MathJax.Hub.Register.StartupHook("TeX mathchoice Ready", function() {
      a.TeXmathchoice.Augment({toMathML: function(d) {
          return this.Core().toMathML(d);
        }});
    });
    MathJax.Hub.Startup.signal.Post("toMathML Ready");
  });
  MathJax.Ajax.loadComplete("[MathJax]/extensions/toMathML.js");
  (function(ac) {
    var g;
    var X = MathJax.Object.Subclass({
      firstChild: null,
      lastChild: null,
      Init: function() {
        this.childNodes = [];
      },
      appendChild: function(i) {
        if (i.parent) {
          i.parent.removeChild(i);
        }
        if (this.lastChild) {
          this.lastChild.nextSibling = i;
        }
        if (!this.firstChild) {
          this.firstChild = i;
        }
        this.childNodes.push(i);
        i.parent = this;
        this.lastChild = i;
        return i;
      },
      removeChild: function(af) {
        for (var ae = 0,
            ad = this.childNodes.length; ae < ad; ae++) {
          if (this.childNodes[ae] === af) {
            break;
          }
        }
        if (ae === ad) {
          return;
        }
        this.childNodes.splice(ae, 1);
        if (af === this.firstChild) {
          this.firstChild = af.nextSibling;
        }
        if (af === this.lastChild) {
          if (!this.childNodes.length) {
            this.lastChild = null;
          } else {
            this.lastChild = this.childNodes[this.childNodes.length - 1];
          }
        }
        if (ae) {
          this.childNodes[ae - 1].nextSibling = af.nextSibling;
        }
        af.nextSibling = af.parent = null;
        return af;
      },
      replaceChild: function(ag, ae) {
        for (var af = 0,
            ad = this.childNodes.length; af < ad; af++) {
          if (this.childNodes[af] === ae) {
            break;
          }
        }
        if (af) {
          this.childNodes[af - 1].nextSibling = ag;
        } else {
          this.firstChild = ag;
        }
        if (af >= ad - 1) {
          this.lastChild = ag;
        }
        this.childNodes[af] = ag;
        ag.nextSibling = ae.nextSibling;
        ae.nextSibling = ae.parent = null;
        return ae;
      },
      hasChildNodes: function(i) {
        return (this.childNodes.length > 0);
      },
      toString: function() {
        return "{" + this.childNodes.join("") + "}";
      }
    });
    var x = function() {
      g = MathJax.ElementJax.mml;
      var i = g.mbase.prototype.Init;
      g.mbase.Augment({
        firstChild: null,
        lastChild: null,
        nodeValue: null,
        nextSibling: null,
        Init: function() {
          var ad = i.apply(this, arguments) || this;
          ad.childNodes = ad.data;
          ad.nodeName = ad.type;
          return ad;
        },
        appendChild: function(ag) {
          if (ag.parent) {
            ag.parent.removeChild(ag);
          }
          var ae = arguments;
          if (ag.isa(X)) {
            ae = ag.childNodes;
            ag.data = ag.childNodes = [];
            ag.firstChild = ag.lastChild = null;
          }
          for (var af = 0,
              ad = ae.length; af < ad; af++) {
            ag = ae[af];
            if (this.lastChild) {
              this.lastChild.nextSibling = ag;
            }
            if (!this.firstChild) {
              this.firstChild = ag;
            }
            this.Append(ag);
            this.lastChild = ag;
          }
          return ag;
        },
        removeChild: function(af) {
          for (var ae = 0,
              ad = this.childNodes.length; ae < ad; ae++) {
            if (this.childNodes[ae] === af) {
              break;
            }
          }
          if (ae === ad) {
            return;
          }
          this.childNodes.splice(ae, 1);
          if (af === this.firstChild) {
            this.firstChild = af.nextSibling;
          }
          if (af === this.lastChild) {
            if (!this.childNodes.length) {
              this.lastChild = null;
            } else {
              this.lastChild = this.childNodes[this.childNodes.length - 1];
            }
          }
          if (ae) {
            this.childNodes[ae - 1].nextSibling = af.nextSibling;
          }
          af.nextSibling = af.parent = null;
          return af;
        },
        replaceChild: function(ag, ae) {
          for (var af = 0,
              ad = this.childNodes.length; af < ad; af++) {
            if (this.childNodes[af] === ae) {
              break;
            }
          }
          if (af) {
            this.childNodes[af - 1].nextSibling = ag;
          } else {
            this.firstChild = ag;
          }
          if (af >= ad - 1) {
            this.lastChild = ag;
          }
          this.SetData(af, ag);
          ag.nextSibling = ae.nextSibling;
          ae.nextSibling = ae.parent = null;
          return ae;
        },
        hasChildNodes: function(ad) {
          return (this.childNodes.length > 0);
        },
        setAttribute: function(ad, ae) {
          this[ad] = ae;
        }
      });
    };
    var Q = {};
    var e = {
      getElementById: true,
      createElementNS: function(ad, i) {
        var ae = g[i]();
        if (i === "mo" && ac.config.useMathMLspacing) {
          ae.useMMLspacing = 128;
        }
        return ae;
      },
      createTextNode: function(i) {
        return g.chars(i).With({nodeValue: i});
      },
      createDocumentFragment: function() {
        return X();
      }
    };
    var J = {appName: "MathJax"};
    var Z;
    var C = "blue";
    var aa = "serif";
    var p = true;
    var v = true;
    var d = ".";
    var f = true;
    var m = (J.appName.slice(0, 9) == "Microsoft");
    function E(i) {
      if (m) {
        return e.createElement(i);
      } else {
        return e.createElementNS("http://www.w3.org/1999/xhtml", i);
      }
    }
    var W = "http://www.w3.org/1998/Math/MathML";
    function P(i) {
      if (m) {
        return e.createElement("m:" + i);
      } else {
        return e.createElementNS(W, i);
      }
    }
    function O(i, ae) {
      var ad;
      if (m) {
        ad = e.createElement("m:" + i);
      } else {
        ad = e.createElementNS(W, i);
      }
      if (ae) {
        ad.appendChild(ae);
      }
      return ad;
    }
    function u(i, ad) {
      z = z.concat([{
        input: i,
        tag: "mo",
        output: ad,
        tex: null,
        ttype: V
      }]);
      z.sort(T);
      for (Z = 0; Z < z.length; Z++) {
        S[Z] = z[Z].input;
      }
    }
    var D = ["\uD835\uDC9C", "\u212C", "\uD835\uDC9E", "\uD835\uDC9F", "\u2130", "\u2131", "\uD835\uDCA2", "\u210B", "\u2110", "\uD835\uDCA5", "\uD835\uDCA6", "\u2112", "\u2133", "\uD835\uDCA9", "\uD835\uDCAA", "\uD835\uDCAB", "\uD835\uDCAC", "\u211B", "\uD835\uDCAE", "\uD835\uDCAF", "\uD835\uDCB0", "\uD835\uDCB1", "\uD835\uDCB2", "\uD835\uDCB3", "\uD835\uDCB4", "\uD835\uDCB5", "\uD835\uDCB6", "\uD835\uDCB7", "\uD835\uDCB8", "\uD835\uDCB9", "\u212F", "\uD835\uDCBB", "\u210A", "\uD835\uDCBD", "\uD835\uDCBE", "\uD835\uDCBF", "\uD835\uDCC0", "\uD835\uDCC1", "\uD835\uDCC2", "\uD835\uDCC3", "\u2134", "\uD835\uDCC5", "\uD835\uDCC6", "\uD835\uDCC7", "\uD835\uDCC8", "\uD835\uDCC9", "\uD835\uDCCA", "\uD835\uDCCB", "\uD835\uDCCC", "\uD835\uDCCD", "\uD835\uDCCE", "\uD835\uDCCF"];
    var H = ["\uD835\uDD04", "\uD835\uDD05", "\u212D", "\uD835\uDD07", "\uD835\uDD08", "\uD835\uDD09", "\uD835\uDD0A", "\u210C", "\u2111", "\uD835\uDD0D", "\uD835\uDD0E", "\uD835\uDD0F", "\uD835\uDD10", "\uD835\uDD11", "\uD835\uDD12", "\uD835\uDD13", "\uD835\uDD14", "\u211C", "\uD835\uDD16", "\uD835\uDD17", "\uD835\uDD18", "\uD835\uDD19", "\uD835\uDD1A", "\uD835\uDD1B", "\uD835\uDD1C", "\u2128", "\uD835\uDD1E", "\uD835\uDD1F", "\uD835\uDD20", "\uD835\uDD21", "\uD835\uDD22", "\uD835\uDD23", "\uD835\uDD24", "\uD835\uDD25", "\uD835\uDD26", "\uD835\uDD27", "\uD835\uDD28", "\uD835\uDD29", "\uD835\uDD2A", "\uD835\uDD2B", "\uD835\uDD2C", "\uD835\uDD2D", "\uD835\uDD2E", "\uD835\uDD2F", "\uD835\uDD30", "\uD835\uDD31", "\uD835\uDD32", "\uD835\uDD33", "\uD835\uDD34", "\uD835\uDD35", "\uD835\uDD36", "\uD835\uDD37"];
    var w = ["\uD835\uDD38", "\uD835\uDD39", "\u2102", "\uD835\uDD3B", "\uD835\uDD3C", "\uD835\uDD3D", "\uD835\uDD3E", "\u210D", "\uD835\uDD40", "\uD835\uDD41", "\uD835\uDD42", "\uD835\uDD43", "\uD835\uDD44", "\u2115", "\uD835\uDD46", "\u2119", "\u211A", "\u211D", "\uD835\uDD4A", "\uD835\uDD4B", "\uD835\uDD4C", "\uD835\uDD4D", "\uD835\uDD4E", "\uD835\uDD4F", "\uD835\uDD50", "\u2124", "\uD835\uDD52", "\uD835\uDD53", "\uD835\uDD54", "\uD835\uDD55", "\uD835\uDD56", "\uD835\uDD57", "\uD835\uDD58", "\uD835\uDD59", "\uD835\uDD5A", "\uD835\uDD5B", "\uD835\uDD5C", "\uD835\uDD5D", "\uD835\uDD5E", "\uD835\uDD5F", "\uD835\uDD60", "\uD835\uDD61", "\uD835\uDD62", "\uD835\uDD63", "\uD835\uDD64", "\uD835\uDD65", "\uD835\uDD66", "\uD835\uDD67", "\uD835\uDD68", "\uD835\uDD69", "\uD835\uDD6A", "\uD835\uDD6B"];
    var c = 0,
        A = 1,
        U = 2,
        j = 3,
        b = 4,
        h = 5,
        a = 6,
        L = 7,
        V = 8,
        n = 9,
        Y = 10,
        K = 15;
    var l = {
      input: '"',
      tag: "mtext",
      output: "mbox",
      tex: null,
      ttype: Y
    };
    var z = [{
      input: "alpha",
      tag: "mi",
      output: "\u03B1",
      tex: null,
      ttype: c
    }, {
      input: "beta",
      tag: "mi",
      output: "\u03B2",
      tex: null,
      ttype: c
    }, {
      input: "chi",
      tag: "mi",
      output: "\u03C7",
      tex: null,
      ttype: c
    }, {
      input: "delta",
      tag: "mi",
      output: "\u03B4",
      tex: null,
      ttype: c
    }, {
      input: "Delta",
      tag: "mo",
      output: "\u0394",
      tex: null,
      ttype: c
    }, {
      input: "epsi",
      tag: "mi",
      output: "\u03B5",
      tex: "epsilon",
      ttype: c
    }, {
      input: "varepsilon",
      tag: "mi",
      output: "\u025B",
      tex: null,
      ttype: c
    }, {
      input: "eta",
      tag: "mi",
      output: "\u03B7",
      tex: null,
      ttype: c
    }, {
      input: "gamma",
      tag: "mi",
      output: "\u03B3",
      tex: null,
      ttype: c
    }, {
      input: "Gamma",
      tag: "mo",
      output: "\u0393",
      tex: null,
      ttype: c
    }, {
      input: "iota",
      tag: "mi",
      output: "\u03B9",
      tex: null,
      ttype: c
    }, {
      input: "kappa",
      tag: "mi",
      output: "\u03BA",
      tex: null,
      ttype: c
    }, {
      input: "lambda",
      tag: "mi",
      output: "\u03BB",
      tex: null,
      ttype: c
    }, {
      input: "Lambda",
      tag: "mo",
      output: "\u039B",
      tex: null,
      ttype: c
    }, {
      input: "lamda",
      tag: "mi",
      output: "\u03BB",
      tex: null,
      ttype: c
    }, {
      input: "Lamda",
      tag: "mo",
      output: "\u039B",
      tex: null,
      ttype: c
    }, {
      input: "mu",
      tag: "mi",
      output: "\u03BC",
      tex: null,
      ttype: c
    }, {
      input: "nu",
      tag: "mi",
      output: "\u03BD",
      tex: null,
      ttype: c
    }, {
      input: "omega",
      tag: "mi",
      output: "\u03C9",
      tex: null,
      ttype: c
    }, {
      input: "Omega",
      tag: "mo",
      output: "\u03A9",
      tex: null,
      ttype: c
    }, {
      input: "phi",
      tag: "mi",
      output: f ? "\u03D5" : "\u03C6",
      tex: null,
      ttype: c
    }, {
      input: "varphi",
      tag: "mi",
      output: f ? "\u03C6" : "\u03D5",
      tex: null,
      ttype: c
    }, {
      input: "Phi",
      tag: "mo",
      output: "\u03A6",
      tex: null,
      ttype: c
    }, {
      input: "pi",
      tag: "mi",
      output: "\u03C0",
      tex: null,
      ttype: c
    }, {
      input: "Pi",
      tag: "mo",
      output: "\u03A0",
      tex: null,
      ttype: c
    }, {
      input: "psi",
      tag: "mi",
      output: "\u03C8",
      tex: null,
      ttype: c
    }, {
      input: "Psi",
      tag: "mi",
      output: "\u03A8",
      tex: null,
      ttype: c
    }, {
      input: "rho",
      tag: "mi",
      output: "\u03C1",
      tex: null,
      ttype: c
    }, {
      input: "sigma",
      tag: "mi",
      output: "\u03C3",
      tex: null,
      ttype: c
    }, {
      input: "Sigma",
      tag: "mo",
      output: "\u03A3",
      tex: null,
      ttype: c
    }, {
      input: "tau",
      tag: "mi",
      output: "\u03C4",
      tex: null,
      ttype: c
    }, {
      input: "theta",
      tag: "mi",
      output: "\u03B8",
      tex: null,
      ttype: c
    }, {
      input: "vartheta",
      tag: "mi",
      output: "\u03D1",
      tex: null,
      ttype: c
    }, {
      input: "Theta",
      tag: "mo",
      output: "\u0398",
      tex: null,
      ttype: c
    }, {
      input: "upsilon",
      tag: "mi",
      output: "\u03C5",
      tex: null,
      ttype: c
    }, {
      input: "xi",
      tag: "mi",
      output: "\u03BE",
      tex: null,
      ttype: c
    }, {
      input: "Xi",
      tag: "mo",
      output: "\u039E",
      tex: null,
      ttype: c
    }, {
      input: "zeta",
      tag: "mi",
      output: "\u03B6",
      tex: null,
      ttype: c
    }, {
      input: "*",
      tag: "mo",
      output: "\u22C5",
      tex: "cdot",
      ttype: c
    }, {
      input: "**",
      tag: "mo",
      output: "\u2217",
      tex: "ast",
      ttype: c
    }, {
      input: "***",
      tag: "mo",
      output: "\u22C6",
      tex: "star",
      ttype: c
    }, {
      input: "//",
      tag: "mo",
      output: "/",
      tex: null,
      ttype: c
    }, {
      input: "\\\\",
      tag: "mo",
      output: "\\",
      tex: "backslash",
      ttype: c
    }, {
      input: "setminus",
      tag: "mo",
      output: "\\",
      tex: null,
      ttype: c
    }, {
      input: "xx",
      tag: "mo",
      output: "\u00D7",
      tex: "times",
      ttype: c
    }, {
      input: "|><",
      tag: "mo",
      output: "\u22C9",
      tex: "ltimes",
      ttype: c
    }, {
      input: "><|",
      tag: "mo",
      output: "\u22CA",
      tex: "rtimes",
      ttype: c
    }, {
      input: "|><|",
      tag: "mo",
      output: "\u22C8",
      tex: "bowtie",
      ttype: c
    }, {
      input: "-:",
      tag: "mo",
      output: "\u00F7",
      tex: "div",
      ttype: c
    }, {
      input: "divide",
      tag: "mo",
      output: "-:",
      tex: null,
      ttype: V
    }, {
      input: "@",
      tag: "mo",
      output: "\u2218",
      tex: "circ",
      ttype: c
    }, {
      input: "o+",
      tag: "mo",
      output: "\u2295",
      tex: "oplus",
      ttype: c
    }, {
      input: "ox",
      tag: "mo",
      output: "\u2297",
      tex: "otimes",
      ttype: c
    }, {
      input: "o.",
      tag: "mo",
      output: "\u2299",
      tex: "odot",
      ttype: c
    }, {
      input: "sum",
      tag: "mo",
      output: "\u2211",
      tex: null,
      ttype: L
    }, {
      input: "prod",
      tag: "mo",
      output: "\u220F",
      tex: null,
      ttype: L
    }, {
      input: "^^",
      tag: "mo",
      output: "\u2227",
      tex: "wedge",
      ttype: c
    }, {
      input: "^^^",
      tag: "mo",
      output: "\u22C0",
      tex: "bigwedge",
      ttype: L
    }, {
      input: "vv",
      tag: "mo",
      output: "\u2228",
      tex: "vee",
      ttype: c
    }, {
      input: "vvv",
      tag: "mo",
      output: "\u22C1",
      tex: "bigvee",
      ttype: L
    }, {
      input: "nn",
      tag: "mo",
      output: "\u2229",
      tex: "cap",
      ttype: c
    }, {
      input: "nnn",
      tag: "mo",
      output: "\u22C2",
      tex: "bigcap",
      ttype: L
    }, {
      input: "uu",
      tag: "mo",
      output: "\u222A",
      tex: "cup",
      ttype: c
    }, {
      input: "uuu",
      tag: "mo",
      output: "\u22C3",
      tex: "bigcup",
      ttype: L
    }, {
      input: "!=",
      tag: "mo",
      output: "\u2260",
      tex: "ne",
      ttype: c
    }, {
      input: ":=",
      tag: "mo",
      output: ":=",
      tex: null,
      ttype: c
    }, {
      input: "lt",
      tag: "mo",
      output: "<",
      tex: null,
      ttype: c
    }, {
      input: "<=",
      tag: "mo",
      output: "\u2264",
      tex: "le",
      ttype: c
    }, {
      input: "lt=",
      tag: "mo",
      output: "\u2264",
      tex: "leq",
      ttype: c
    }, {
      input: "gt",
      tag: "mo",
      output: ">",
      tex: null,
      ttype: c
    }, {
      input: ">=",
      tag: "mo",
      output: "\u2265",
      tex: "ge",
      ttype: c
    }, {
      input: "gt=",
      tag: "mo",
      output: "\u2265",
      tex: "geq",
      ttype: c
    }, {
      input: "-<",
      tag: "mo",
      output: "\u227A",
      tex: "prec",
      ttype: c
    }, {
      input: "-lt",
      tag: "mo",
      output: "\u227A",
      tex: null,
      ttype: c
    }, {
      input: ">-",
      tag: "mo",
      output: "\u227B",
      tex: "succ",
      ttype: c
    }, {
      input: "-<=",
      tag: "mo",
      output: "\u2AAF",
      tex: "preceq",
      ttype: c
    }, {
      input: ">-=",
      tag: "mo",
      output: "\u2AB0",
      tex: "succeq",
      ttype: c
    }, {
      input: "in",
      tag: "mo",
      output: "\u2208",
      tex: null,
      ttype: c
    }, {
      input: "!in",
      tag: "mo",
      output: "\u2209",
      tex: "notin",
      ttype: c
    }, {
      input: "sub",
      tag: "mo",
      output: "\u2282",
      tex: "subset",
      ttype: c
    }, {
      input: "sup",
      tag: "mo",
      output: "\u2283",
      tex: "supset",
      ttype: c
    }, {
      input: "sube",
      tag: "mo",
      output: "\u2286",
      tex: "subseteq",
      ttype: c
    }, {
      input: "supe",
      tag: "mo",
      output: "\u2287",
      tex: "supseteq",
      ttype: c
    }, {
      input: "-=",
      tag: "mo",
      output: "\u2261",
      tex: "equiv",
      ttype: c
    }, {
      input: "~=",
      tag: "mo",
      output: "\u2245",
      tex: "cong",
      ttype: c
    }, {
      input: "~~",
      tag: "mo",
      output: "\u2248",
      tex: "approx",
      ttype: c
    }, {
      input: "prop",
      tag: "mo",
      output: "\u221D",
      tex: "propto",
      ttype: c
    }, {
      input: "and",
      tag: "mtext",
      output: "and",
      tex: null,
      ttype: a
    }, {
      input: "or",
      tag: "mtext",
      output: "or",
      tex: null,
      ttype: a
    }, {
      input: "not",
      tag: "mo",
      output: "\u00AC",
      tex: "neg",
      ttype: c
    }, {
      input: "=>",
      tag: "mo",
      output: "\u21D2",
      tex: "implies",
      ttype: c
    }, {
      input: "if",
      tag: "mo",
      output: "if",
      tex: null,
      ttype: a
    }, {
      input: "<=>",
      tag: "mo",
      output: "\u21D4",
      tex: "iff",
      ttype: c
    }, {
      input: "AA",
      tag: "mo",
      output: "\u2200",
      tex: "forall",
      ttype: c
    }, {
      input: "EE",
      tag: "mo",
      output: "\u2203",
      tex: "exists",
      ttype: c
    }, {
      input: "_|_",
      tag: "mo",
      output: "\u22A5",
      tex: "bot",
      ttype: c
    }, {
      input: "TT",
      tag: "mo",
      output: "\u22A4",
      tex: "top",
      ttype: c
    }, {
      input: "|--",
      tag: "mo",
      output: "\u22A2",
      tex: "vdash",
      ttype: c
    }, {
      input: "|==",
      tag: "mo",
      output: "\u22A8",
      tex: "models",
      ttype: c
    }, {
      input: "(",
      tag: "mo",
      output: "(",
      tex: null,
      ttype: b
    }, {
      input: ")",
      tag: "mo",
      output: ")",
      tex: null,
      ttype: h
    }, {
      input: "[",
      tag: "mo",
      output: "[",
      tex: null,
      ttype: b
    }, {
      input: "]",
      tag: "mo",
      output: "]",
      tex: null,
      ttype: h
    }, {
      input: "{",
      tag: "mo",
      output: "{",
      tex: null,
      ttype: b
    }, {
      input: "}",
      tag: "mo",
      output: "}",
      tex: null,
      ttype: h
    }, {
      input: "|",
      tag: "mo",
      output: "|",
      tex: null,
      ttype: n
    }, {
      input: "(:",
      tag: "mo",
      output: "\u2329",
      tex: "langle",
      ttype: b
    }, {
      input: ":)",
      tag: "mo",
      output: "\u232A",
      tex: "rangle",
      ttype: h
    }, {
      input: "<<",
      tag: "mo",
      output: "\u2329",
      tex: null,
      ttype: b
    }, {
      input: ">>",
      tag: "mo",
      output: "\u232A",
      tex: null,
      ttype: h
    }, {
      input: "{:",
      tag: "mo",
      output: "{:",
      tex: null,
      ttype: b,
      invisible: true
    }, {
      input: ":}",
      tag: "mo",
      output: ":}",
      tex: null,
      ttype: h,
      invisible: true
    }, {
      input: "int",
      tag: "mo",
      output: "\u222B",
      tex: null,
      ttype: c
    }, {
      input: "dx",
      tag: "mi",
      output: "{:d x:}",
      tex: null,
      ttype: V
    }, {
      input: "dy",
      tag: "mi",
      output: "{:d y:}",
      tex: null,
      ttype: V
    }, {
      input: "dz",
      tag: "mi",
      output: "{:d z:}",
      tex: null,
      ttype: V
    }, {
      input: "dt",
      tag: "mi",
      output: "{:d t:}",
      tex: null,
      ttype: V
    }, {
      input: "oint",
      tag: "mo",
      output: "\u222E",
      tex: null,
      ttype: c
    }, {
      input: "del",
      tag: "mo",
      output: "\u2202",
      tex: "partial",
      ttype: c
    }, {
      input: "grad",
      tag: "mo",
      output: "\u2207",
      tex: "nabla",
      ttype: c
    }, {
      input: "+-",
      tag: "mo",
      output: "\u00B1",
      tex: "pm",
      ttype: c
    }, {
      input: "O/",
      tag: "mo",
      output: "\u2205",
      tex: "emptyset",
      ttype: c
    }, {
      input: "oo",
      tag: "mo",
      output: "\u221E",
      tex: "infty",
      ttype: c
    }, {
      input: "aleph",
      tag: "mo",
      output: "\u2135",
      tex: null,
      ttype: c
    }, {
      input: "...",
      tag: "mo",
      output: "...",
      tex: "ldots",
      ttype: c
    }, {
      input: ":.",
      tag: "mo",
      output: "\u2234",
      tex: "therefore",
      ttype: c
    }, {
      input: "/_",
      tag: "mo",
      output: "\u2220",
      tex: "angle",
      ttype: c
    }, {
      input: "/_\\",
      tag: "mo",
      output: "\u25B3",
      tex: "triangle",
      ttype: c
    }, {
      input: "'",
      tag: "mo",
      output: "\u2032",
      tex: "prime",
      ttype: c
    }, {
      input: "tilde",
      tag: "mover",
      output: "~",
      tex: null,
      ttype: A,
      acc: true
    }, {
      input: "\\ ",
      tag: "mo",
      output: "\u00A0",
      tex: null,
      ttype: c
    }, {
      input: "frown",
      tag: "mo",
      output: "\u2322",
      tex: null,
      ttype: c
    }, {
      input: "quad",
      tag: "mo",
      output: "\u00A0\u00A0",
      tex: null,
      ttype: c
    }, {
      input: "qquad",
      tag: "mo",
      output: "\u00A0\u00A0\u00A0\u00A0",
      tex: null,
      ttype: c
    }, {
      input: "cdots",
      tag: "mo",
      output: "\u22EF",
      tex: null,
      ttype: c
    }, {
      input: "vdots",
      tag: "mo",
      output: "\u22EE",
      tex: null,
      ttype: c
    }, {
      input: "ddots",
      tag: "mo",
      output: "\u22F1",
      tex: null,
      ttype: c
    }, {
      input: "diamond",
      tag: "mo",
      output: "\u22C4",
      tex: null,
      ttype: c
    }, {
      input: "square",
      tag: "mo",
      output: "\u25A1",
      tex: null,
      ttype: c
    }, {
      input: "|__",
      tag: "mo",
      output: "\u230A",
      tex: "lfloor",
      ttype: c
    }, {
      input: "__|",
      tag: "mo",
      output: "\u230B",
      tex: "rfloor",
      ttype: c
    }, {
      input: "|~",
      tag: "mo",
      output: "\u2308",
      tex: "lceiling",
      ttype: c
    }, {
      input: "~|",
      tag: "mo",
      output: "\u2309",
      tex: "rceiling",
      ttype: c
    }, {
      input: "CC",
      tag: "mo",
      output: "\u2102",
      tex: null,
      ttype: c
    }, {
      input: "NN",
      tag: "mo",
      output: "\u2115",
      tex: null,
      ttype: c
    }, {
      input: "QQ",
      tag: "mo",
      output: "\u211A",
      tex: null,
      ttype: c
    }, {
      input: "RR",
      tag: "mo",
      output: "\u211D",
      tex: null,
      ttype: c
    }, {
      input: "ZZ",
      tag: "mo",
      output: "\u2124",
      tex: null,
      ttype: c
    }, {
      input: "f",
      tag: "mi",
      output: "f",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "g",
      tag: "mi",
      output: "g",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "lim",
      tag: "mo",
      output: "lim",
      tex: null,
      ttype: L
    }, {
      input: "Lim",
      tag: "mo",
      output: "Lim",
      tex: null,
      ttype: L
    }, {
      input: "sin",
      tag: "mo",
      output: "sin",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "cos",
      tag: "mo",
      output: "cos",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "tan",
      tag: "mo",
      output: "tan",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "sinh",
      tag: "mo",
      output: "sinh",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "cosh",
      tag: "mo",
      output: "cosh",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "tanh",
      tag: "mo",
      output: "tanh",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "cot",
      tag: "mo",
      output: "cot",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "sec",
      tag: "mo",
      output: "sec",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "csc",
      tag: "mo",
      output: "csc",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "arcsin",
      tag: "mo",
      output: "arcsin",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "arccos",
      tag: "mo",
      output: "arccos",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "arctan",
      tag: "mo",
      output: "arctan",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "coth",
      tag: "mo",
      output: "coth",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "sech",
      tag: "mo",
      output: "sech",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "csch",
      tag: "mo",
      output: "csch",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "exp",
      tag: "mo",
      output: "exp",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "abs",
      tag: "mo",
      output: "abs",
      tex: null,
      ttype: A,
      rewriteleftright: ["|", "|"]
    }, {
      input: "norm",
      tag: "mo",
      output: "norm",
      tex: null,
      ttype: A,
      rewriteleftright: ["\u2225", "\u2225"]
    }, {
      input: "floor",
      tag: "mo",
      output: "floor",
      tex: null,
      ttype: A,
      rewriteleftright: ["\u230A", "\u230B"]
    }, {
      input: "ceil",
      tag: "mo",
      output: "ceil",
      tex: null,
      ttype: A,
      rewriteleftright: ["\u2308", "\u2309"]
    }, {
      input: "log",
      tag: "mo",
      output: "log",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "ln",
      tag: "mo",
      output: "ln",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "det",
      tag: "mo",
      output: "det",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "dim",
      tag: "mo",
      output: "dim",
      tex: null,
      ttype: c
    }, {
      input: "mod",
      tag: "mo",
      output: "mod",
      tex: null,
      ttype: c
    }, {
      input: "gcd",
      tag: "mo",
      output: "gcd",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "lcm",
      tag: "mo",
      output: "lcm",
      tex: null,
      ttype: A,
      func: true
    }, {
      input: "lub",
      tag: "mo",
      output: "lub",
      tex: null,
      ttype: c
    }, {
      input: "glb",
      tag: "mo",
      output: "glb",
      tex: null,
      ttype: c
    }, {
      input: "min",
      tag: "mo",
      output: "min",
      tex: null,
      ttype: L
    }, {
      input: "max",
      tag: "mo",
      output: "max",
      tex: null,
      ttype: L
    }, {
      input: "uarr",
      tag: "mo",
      output: "\u2191",
      tex: "uparrow",
      ttype: c
    }, {
      input: "darr",
      tag: "mo",
      output: "\u2193",
      tex: "downarrow",
      ttype: c
    }, {
      input: "rarr",
      tag: "mo",
      output: "\u2192",
      tex: "rightarrow",
      ttype: c
    }, {
      input: "->",
      tag: "mo",
      output: "\u2192",
      tex: "to",
      ttype: c
    }, {
      input: ">->",
      tag: "mo",
      output: "\u21A3",
      tex: "rightarrowtail",
      ttype: c
    }, {
      input: "->>",
      tag: "mo",
      output: "\u21A0",
      tex: "twoheadrightarrow",
      ttype: c
    }, {
      input: ">->>",
      tag: "mo",
      output: "\u2916",
      tex: "twoheadrightarrowtail",
      ttype: c
    }, {
      input: "|->",
      tag: "mo",
      output: "\u21A6",
      tex: "mapsto",
      ttype: c
    }, {
      input: "larr",
      tag: "mo",
      output: "\u2190",
      tex: "leftarrow",
      ttype: c
    }, {
      input: "harr",
      tag: "mo",
      output: "\u2194",
      tex: "leftrightarrow",
      ttype: c
    }, {
      input: "rArr",
      tag: "mo",
      output: "\u21D2",
      tex: "Rightarrow",
      ttype: c
    }, {
      input: "lArr",
      tag: "mo",
      output: "\u21D0",
      tex: "Leftarrow",
      ttype: c
    }, {
      input: "hArr",
      tag: "mo",
      output: "\u21D4",
      tex: "Leftrightarrow",
      ttype: c
    }, {
      input: "sqrt",
      tag: "msqrt",
      output: "sqrt",
      tex: null,
      ttype: A
    }, {
      input: "root",
      tag: "mroot",
      output: "root",
      tex: null,
      ttype: U
    }, {
      input: "frac",
      tag: "mfrac",
      output: "/",
      tex: null,
      ttype: U
    }, {
      input: "/",
      tag: "mfrac",
      output: "/",
      tex: null,
      ttype: j
    }, {
      input: "stackrel",
      tag: "mover",
      output: "stackrel",
      tex: null,
      ttype: U
    }, {
      input: "overset",
      tag: "mover",
      output: "stackrel",
      tex: null,
      ttype: U
    }, {
      input: "underset",
      tag: "munder",
      output: "stackrel",
      tex: null,
      ttype: U
    }, {
      input: "_",
      tag: "msub",
      output: "_",
      tex: null,
      ttype: j
    }, {
      input: "^",
      tag: "msup",
      output: "^",
      tex: null,
      ttype: j
    }, {
      input: "hat",
      tag: "mover",
      output: "\u005E",
      tex: null,
      ttype: A,
      acc: true
    }, {
      input: "bar",
      tag: "mover",
      output: "\u00AF",
      tex: "overline",
      ttype: A,
      acc: true
    }, {
      input: "vec",
      tag: "mover",
      output: "\u2192",
      tex: null,
      ttype: A,
      acc: true
    }, {
      input: "dot",
      tag: "mover",
      output: ".",
      tex: null,
      ttype: A,
      acc: true
    }, {
      input: "ddot",
      tag: "mover",
      output: "..",
      tex: null,
      ttype: A,
      acc: true
    }, {
      input: "ul",
      tag: "munder",
      output: "\u0332",
      tex: "underline",
      ttype: A,
      acc: true
    }, {
      input: "ubrace",
      tag: "munder",
      output: "\u23DF",
      tex: "underbrace",
      ttype: K,
      acc: true
    }, {
      input: "obrace",
      tag: "mover",
      output: "\u23DE",
      tex: "overbrace",
      ttype: K,
      acc: true
    }, {
      input: "text",
      tag: "mtext",
      output: "text",
      tex: null,
      ttype: Y
    }, {
      input: "mbox",
      tag: "mtext",
      output: "mbox",
      tex: null,
      ttype: Y
    }, {
      input: "color",
      tag: "mstyle",
      ttype: U
    }, {
      input: "cancel",
      tag: "menclose",
      output: "cancel",
      tex: null,
      ttype: A
    }, l, {
      input: "bb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "bold",
      output: "bb",
      tex: null,
      ttype: A
    }, {
      input: "mathbf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "bold",
      output: "mathbf",
      tex: null,
      ttype: A
    }, {
      input: "sf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "sans-serif",
      output: "sf",
      tex: null,
      ttype: A
    }, {
      input: "mathsf",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "sans-serif",
      output: "mathsf",
      tex: null,
      ttype: A
    }, {
      input: "bbb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "double-struck",
      output: "bbb",
      tex: null,
      ttype: A,
      codes: w
    }, {
      input: "mathbb",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "double-struck",
      output: "mathbb",
      tex: null,
      ttype: A,
      codes: w
    }, {
      input: "cc",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "script",
      output: "cc",
      tex: null,
      ttype: A,
      codes: D
    }, {
      input: "mathcal",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "script",
      output: "mathcal",
      tex: null,
      ttype: A,
      codes: D
    }, {
      input: "tt",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "monospace",
      output: "tt",
      tex: null,
      ttype: A
    }, {
      input: "mathtt",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "monospace",
      output: "mathtt",
      tex: null,
      ttype: A
    }, {
      input: "fr",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "fraktur",
      output: "fr",
      tex: null,
      ttype: A,
      codes: H
    }, {
      input: "mathfrak",
      tag: "mstyle",
      atname: "mathvariant",
      atval: "fraktur",
      output: "mathfrak",
      tex: null,
      ttype: A,
      codes: H
    }];
    function T(ad, i) {
      if (ad.input > i.input) {
        return 1;
      } else {
        return -1;
      }
    }
    var S = [];
    function o() {
      var ae = [],
          ad;
      for (ad = 0; ad < z.length; ad++) {
        if (z[ad].tex) {
          ae[ae.length] = {
            input: z[ad].tex,
            tag: z[ad].tag,
            output: z[ad].output,
            ttype: z[ad].ttype,
            acc: (z[ad].acc || false)
          };
        }
      }
      z = z.concat(ae);
      B();
    }
    function B() {
      var ad;
      z.sort(T);
      for (ad = 0; ad < z.length; ad++) {
        S[ad] = z[ad].input;
      }
    }
    function I(i, ad) {
      z = z.concat([{
        input: i,
        tag: "mo",
        output: ad,
        tex: null,
        ttype: V
      }]);
      B();
    }
    function q(af, ag) {
      var ad;
      if (af.charAt(ag) == "\\" && af.charAt(ag + 1) != "\\" && af.charAt(ag + 1) != " ") {
        ad = af.slice(ag + 1);
      } else {
        ad = af.slice(ag);
      }
      for (var ae = 0; ae < ad.length && ad.charCodeAt(ae) <= 32; ae = ae + 1) {}
      return ad.slice(ae);
    }
    function N(ae, ah, ai) {
      if (ai == 0) {
        var ag,
            ad;
        ai = -1;
        ag = ae.length;
        while (ai + 1 < ag) {
          ad = (ai + ag) >> 1;
          if (ae[ad] < ah) {
            ai = ad;
          } else {
            ag = ad;
          }
        }
        return ag;
      } else {
        for (var af = ai; af < ae.length && ae[af] < ah; af++) {}
      }
      return af;
    }
    function k(aj) {
      var ad = 0;
      var ae = 0;
      var ag;
      var am;
      var al;
      var ah = "";
      var ai = true;
      for (var af = 1; af <= aj.length && ai; af++) {
        am = aj.slice(0, af);
        ae = ad;
        ad = N(S, am, ae);
        if (ad < S.length && aj.slice(0, S[ad].length) == S[ad]) {
          ah = S[ad];
          ag = ad;
          af = ah.length;
        }
        ai = ad < S.length && aj.slice(0, S[ad].length) >= S[ad];
      }
      s = y;
      if (ah != "") {
        y = z[ag].ttype;
        return z[ag];
      }
      y = c;
      ad = 1;
      am = aj.slice(0, 1);
      var ak = true;
      while ("0" <= am && am <= "9" && ad <= aj.length) {
        am = aj.slice(ad, ad + 1);
        ad++;
      }
      if (am == d) {
        am = aj.slice(ad, ad + 1);
        if ("0" <= am && am <= "9") {
          ak = false;
          ad++;
          while ("0" <= am && am <= "9" && ad <= aj.length) {
            am = aj.slice(ad, ad + 1);
            ad++;
          }
        }
      }
      if ((ak && ad > 1) || ad > 2) {
        am = aj.slice(0, ad - 1);
        al = "mn";
      } else {
        ad = 2;
        am = aj.slice(0, 1);
        al = (("A" > am || am > "Z") && ("a" > am || am > "z") ? "mo" : "mi");
      }
      if (am == "-" && s == j) {
        y = j;
        return {
          input: am,
          tag: al,
          output: am,
          ttype: A,
          func: true
        };
      }
      return {
        input: am,
        tag: al,
        output: am,
        ttype: c
      };
    }
    function R(ad) {
      var i;
      if (!ad.hasChildNodes()) {
        return;
      }
      if (ad.firstChild.hasChildNodes() && (ad.nodeName == "mrow" || ad.nodeName == "M:MROW")) {
        i = ad.firstChild.firstChild.nodeValue;
        if (i == "(" || i == "[" || i == "{") {
          ad.removeChild(ad.firstChild);
        }
      }
      if (ad.lastChild.hasChildNodes() && (ad.nodeName == "mrow" || ad.nodeName == "M:MROW")) {
        i = ad.lastChild.firstChild.nodeValue;
        if (i == ")" || i == "]" || i == "}") {
          ad.removeChild(ad.lastChild);
        }
      }
    }
    var F,
        s,
        y;
    function G(aj) {
      var af,
          ae,
          am,
          ah,
          al,
          ai = e.createDocumentFragment();
      aj = q(aj, 0);
      af = k(aj);
      if (af == null || af.ttype == h && F > 0) {
        return [null, aj];
      }
      if (af.ttype == V) {
        aj = af.output + q(aj, af.input.length);
        af = k(aj);
      }
      switch (af.ttype) {
        case L:
        case c:
          aj = q(aj, af.input.length);
          return [O(af.tag, e.createTextNode(af.output)), aj];
        case b:
          F++;
          aj = q(aj, af.input.length);
          am = r(aj, true);
          F--;
          if (typeof af.invisible == "boolean" && af.invisible) {
            ae = O("mrow", am[0]);
          } else {
            ae = O("mo", e.createTextNode(af.output));
            ae = O("mrow", ae);
            ae.appendChild(am[0]);
          }
          return [ae, am[1]];
        case Y:
          if (af != l) {
            aj = q(aj, af.input.length);
          }
          if (aj.charAt(0) == "{") {
            ah = aj.indexOf("}");
          } else {
            if (aj.charAt(0) == "(") {
              ah = aj.indexOf(")");
            } else {
              if (aj.charAt(0) == "[") {
                ah = aj.indexOf("]");
              } else {
                if (af == l) {
                  ah = aj.slice(1).indexOf('"') + 1;
                } else {
                  ah = 0;
                }
              }
            }
          }
          if (ah == -1) {
            ah = aj.length;
          }
          al = aj.slice(1, ah);
          if (al.charAt(0) == " ") {
            ae = O("mspace");
            ae.setAttribute("width", "1ex");
            ai.appendChild(ae);
          }
          ai.appendChild(O(af.tag, e.createTextNode(al)));
          if (al.charAt(al.length - 1) == " ") {
            ae = O("mspace");
            ae.setAttribute("width", "1ex");
            ai.appendChild(ae);
          }
          aj = q(aj, ah + 1);
          return [O("mrow", ai), aj];
        case K:
        case A:
          aj = q(aj, af.input.length);
          am = G(aj);
          if (am[0] == null) {
            return [O(af.tag, e.createTextNode(af.output)), aj];
          }
          if (typeof af.func == "boolean" && af.func) {
            al = aj.charAt(0);
            if (al == "^" || al == "_" || al == "/" || al == "|" || al == "," || (af.input.length == 1 && af.input.match(/\w/) && al != "(")) {
              return [O(af.tag, e.createTextNode(af.output)), aj];
            } else {
              ae = O("mrow", O(af.tag, e.createTextNode(af.output)));
              ae.appendChild(am[0]);
              return [ae, am[1]];
            }
          }
          R(am[0]);
          if (af.input == "sqrt") {
            return [O(af.tag, am[0]), am[1]];
          } else {
            if (typeof af.rewriteleftright != "undefined") {
              ae = O("mrow", O("mo", e.createTextNode(af.rewriteleftright[0])));
              ae.appendChild(am[0]);
              ae.appendChild(O("mo", e.createTextNode(af.rewriteleftright[1])));
              return [ae, am[1]];
            } else {
              if (af.input == "cancel") {
                ae = O(af.tag, am[0]);
                ae.setAttribute("notation", "updiagonalstrike");
                return [ae, am[1]];
              } else {
                if (typeof af.acc == "boolean" && af.acc) {
                  ae = O(af.tag, am[0]);
                  ae.appendChild(O("mo", e.createTextNode(af.output)));
                  return [ae, am[1]];
                } else {
                  if (!m && typeof af.codes != "undefined") {
                    for (ah = 0; ah < am[0].childNodes.length; ah++) {
                      if (am[0].childNodes[ah].nodeName == "mi" || am[0].nodeName == "mi") {
                        al = (am[0].nodeName == "mi" ? am[0].firstChild.nodeValue : am[0].childNodes[ah].firstChild.nodeValue);
                        var ak = [];
                        for (var ag = 0; ag < al.length; ag++) {
                          if (al.charCodeAt(ag) > 64 && al.charCodeAt(ag) < 91) {
                            ak = ak + af.codes[al.charCodeAt(ag) - 65];
                          } else {
                            if (al.charCodeAt(ag) > 96 && al.charCodeAt(ag) < 123) {
                              ak = ak + af.codes[al.charCodeAt(ag) - 71];
                            } else {
                              ak = ak + al.charAt(ag);
                            }
                          }
                        }
                        if (am[0].nodeName == "mi") {
                          am[0] = O("mo").appendChild(e.createTextNode(ak));
                        } else {
                          am[0].replaceChild(O("mo").appendChild(e.createTextNode(ak)), am[0].childNodes[ah]);
                        }
                      }
                    }
                  }
                  ae = O(af.tag, am[0]);
                  ae.setAttribute(af.atname, af.atval);
                  return [ae, am[1]];
                }
              }
            }
          }
        case U:
          aj = q(aj, af.input.length);
          am = G(aj);
          if (am[0] == null) {
            return [O("mo", e.createTextNode(af.input)), aj];
          }
          R(am[0]);
          var ad = G(am[1]);
          if (ad[0] == null) {
            return [O("mo", e.createTextNode(af.input)), aj];
          }
          R(ad[0]);
          if (af.input == "color") {
            if (aj.charAt(0) == "{") {
              ah = aj.indexOf("}");
            } else {
              if (aj.charAt(0) == "(") {
                ah = aj.indexOf(")");
              } else {
                if (aj.charAt(0) == "[") {
                  ah = aj.indexOf("]");
                }
              }
            }
            al = aj.slice(1, ah);
            ae = O(af.tag, ad[0]);
            ae.setAttribute("mathcolor", al);
            return [ae, ad[1]];
          }
          if (af.input == "root" || af.output == "stackrel") {
            ai.appendChild(ad[0]);
          }
          ai.appendChild(am[0]);
          if (af.input == "frac") {
            ai.appendChild(ad[0]);
          }
          return [O(af.tag, ai), ad[1]];
        case j:
          aj = q(aj, af.input.length);
          return [O("mo", e.createTextNode(af.output)), aj];
        case a:
          aj = q(aj, af.input.length);
          ae = O("mspace");
          ae.setAttribute("width", "1ex");
          ai.appendChild(ae);
          ai.appendChild(O(af.tag, e.createTextNode(af.output)));
          ae = O("mspace");
          ae.setAttribute("width", "1ex");
          ai.appendChild(ae);
          return [O("mrow", ai), aj];
        case n:
          F++;
          aj = q(aj, af.input.length);
          am = r(aj, false);
          F--;
          al = "";
          if (am[0].lastChild != null) {
            al = am[0].lastChild.firstChild.nodeValue;
          }
          if (al == "|") {
            ae = O("mo", e.createTextNode(af.output));
            ae = O("mrow", ae);
            ae.appendChild(am[0]);
            return [ae, am[1]];
          } else {
            ae = O("mo", e.createTextNode("\u2223"));
            ae = O("mrow", ae);
            return [ae, aj];
          }
        default:
          aj = q(aj, af.input.length);
          return [O(af.tag, e.createTextNode(af.output)), aj];
      }
    }
    function t(ai) {
      var ag,
          aj,
          ah,
          af,
          i,
          ae;
      ai = q(ai, 0);
      aj = k(ai);
      i = G(ai);
      af = i[0];
      ai = i[1];
      ag = k(ai);
      if (ag.ttype == j && ag.input != "/") {
        ai = q(ai, ag.input.length);
        i = G(ai);
        if (i[0] == null) {
          i[0] = O("mo", e.createTextNode("\u25A1"));
        } else {
          R(i[0]);
        }
        ai = i[1];
        ae = (aj.ttype == L || aj.ttype == K);
        if (ag.input == "_") {
          ah = k(ai);
          if (ah.input == "^") {
            ai = q(ai, ah.input.length);
            var ad = G(ai);
            R(ad[0]);
            ai = ad[1];
            af = O((ae ? "munderover" : "msubsup"), af);
            af.appendChild(i[0]);
            af.appendChild(ad[0]);
            af = O("mrow", af);
          } else {
            af = O((ae ? "munder" : "msub"), af);
            af.appendChild(i[0]);
          }
        } else {
          if (ag.input == "^" && ae) {
            af = O("mover", af);
            af.appendChild(i[0]);
          } else {
            af = O(ag.tag, af);
            af.appendChild(i[0]);
          }
        }
        if (typeof aj.func != "undefined" && aj.func) {
          ah = k(ai);
          if (ah.ttype != j && ah.ttype != h) {
            i = t(ai);
            af = O("mrow", af);
            af.appendChild(i[0]);
            ai = i[1];
          }
        }
      }
      return [af, ai];
    }
    function r(al, ak) {
      var ap,
          am,
          ah,
          at,
          ai = e.createDocumentFragment();
      do {
        al = q(al, 0);
        ah = t(al);
        am = ah[0];
        al = ah[1];
        ap = k(al);
        if (ap.ttype == j && ap.input == "/") {
          al = q(al, ap.input.length);
          ah = t(al);
          if (ah[0] == null) {
            ah[0] = O("mo", e.createTextNode("\u25A1"));
          } else {
            R(ah[0]);
          }
          al = ah[1];
          R(am);
          am = O(ap.tag, am);
          am.appendChild(ah[0]);
          ai.appendChild(am);
          ap = k(al);
        } else {
          if (am != undefined) {
            ai.appendChild(am);
          }
        }
      } while ((ap.ttype != h && (ap.ttype != n || ak) || F == 0) && ap != null && ap.output != "");
      if (ap.ttype == h || ap.ttype == n) {
        var au = ai.childNodes.length;
        if (au > 0 && ai.childNodes[au - 1].nodeName == "mrow" && ai.childNodes[au - 1].lastChild && ai.childNodes[au - 1].lastChild.firstChild) {
          var aw = ai.childNodes[au - 1].lastChild.firstChild.nodeValue;
          if (aw == ")" || aw == "]") {
            var ae = ai.childNodes[au - 1].firstChild.firstChild.nodeValue;
            if (ae == "(" && aw == ")" && ap.output != "}" || ae == "[" && aw == "]") {
              var af = [];
              var aq = true;
              var an = ai.childNodes.length;
              for (at = 0; aq && at < an; at = at + 2) {
                af[at] = [];
                am = ai.childNodes[at];
                if (aq) {
                  aq = am.nodeName == "mrow" && (at == an - 1 || am.nextSibling.nodeName == "mo" && am.nextSibling.firstChild.nodeValue == ",") && am.firstChild.firstChild.nodeValue == ae && am.lastChild.firstChild.nodeValue == aw;
                }
                if (aq) {
                  for (var ar = 0; ar < am.childNodes.length; ar++) {
                    if (am.childNodes[ar].firstChild.nodeValue == ",") {
                      af[at][af[at].length] = ar;
                    }
                  }
                }
                if (aq && at > 1) {
                  aq = af[at].length == af[at - 2].length;
                }
              }
              aq = aq && (af.length > 1 || af[0].length > 0);
              if (aq) {
                var ag,
                    ad,
                    aj,
                    ao,
                    av = e.createDocumentFragment();
                for (at = 0; at < an; at = at + 2) {
                  ag = e.createDocumentFragment();
                  ad = e.createDocumentFragment();
                  am = ai.firstChild;
                  aj = am.childNodes.length;
                  ao = 0;
                  am.removeChild(am.firstChild);
                  for (ar = 1; ar < aj - 1; ar++) {
                    if (typeof af[at][ao] != "undefined" && ar == af[at][ao]) {
                      am.removeChild(am.firstChild);
                      ag.appendChild(O("mtd", ad));
                      ao++;
                    } else {
                      ad.appendChild(am.firstChild);
                    }
                  }
                  ag.appendChild(O("mtd", ad));
                  if (ai.childNodes.length > 2) {
                    ai.removeChild(ai.firstChild);
                    ai.removeChild(ai.firstChild);
                  }
                  av.appendChild(O("mtr", ag));
                }
                am = O("mtable", av);
                if (typeof ap.invisible == "boolean" && ap.invisible) {
                  am.setAttribute("columnalign", "left");
                }
                ai.replaceChild(am, ai.firstChild);
              }
            }
          }
        }
        al = q(al, ap.input.length);
        if (typeof ap.invisible != "boolean" || !ap.invisible) {
          am = O("mo", e.createTextNode(ap.output));
          ai.appendChild(am);
        }
      }
      return [ai, al];
    }
    function M(ae, ad) {
      var af,
          i;
      F = 0;
      ae = ae.replace(/&nbsp;/g, "");
      ae = ae.replace(/&gt;/g, ">");
      ae = ae.replace(/&lt;/g, "<");
      ae = ae.replace(/(Sin|Cos|Tan|Arcsin|Arccos|Arctan|Sinh|Cosh|Tanh|Cot|Sec|Csc|Log|Ln|Abs)/g, function(ag) {
        return ag.toLowerCase();
      });
      af = r(ae.replace(/^\s+/g, ""), false)[0];
      i = O("mstyle", af);
      if (C != "") {
        i.setAttribute("mathcolor", C);
      }
      if (aa != "") {
        i.setAttribute("fontfamily", aa);
      }
      if (p) {
        i.setAttribute("displaystyle", "true");
      }
      i = O("math", i);
      if (v) {
        i.setAttribute("title", ae.replace(/\s+/g, " "));
      }
      return i;
    }
    v = false;
    aa = "";
    C = "";
    (function() {
      for (var ae = 0,
          ad = z.length; ae < ad; ae++) {
        if (z[ae].codes) {
          delete z[ae].codes;
        }
        if (z[ae].func) {
          z[ae].tag = "mi";
        }
      }
    })();
    ac.Augment({AM: {
        Init: function() {
          p = ac.config.displaystyle;
          d = (ac.config.decimal || ac.config.decimalsign);
          if (!ac.config.fixphi) {
            for (var ae = 0,
                ad = z.length; ae < ad; ae++) {
              if (z[ae].input === "phi") {
                z[ae].output = "\u03C6";
              }
              if (z[ae].input === "varphi") {
                z[ae].output = "\u03D5";
                ae = ad;
              }
            }
          }
          x();
          o();
        },
        Augment: function(i) {
          for (var ad in i) {
            if (i.hasOwnProperty(ad)) {
              switch (ad) {
                case "displaystyle":
                  p = i[ad];
                  break;
                case "decimal":
                  decimal = i[ad];
                  break;
                case "parseMath":
                  M = i[ad];
                  break;
                case "parseExpr":
                  r = i[ad];
                  break;
                case "parseIexpr":
                  t = i[ad];
                  break;
                case "parseSexpr":
                  G = i[ad];
                  break;
                case "removeBrackets":
                  R = i[ad];
                  break;
                case "getSymbol":
                  k = i[ad];
                  break;
                case "position":
                  N = i[ad];
                  break;
                case "removeCharsAndBlanks":
                  q = i[ad];
                  break;
                case "createMmlNode":
                  O = i[ad];
                  break;
                case "createElementMathML":
                  P = i[ad];
                  break;
                case "createElementXHTML":
                  E = i[ad];
                  break;
                case "initSymbols":
                  o = i[ad];
                  break;
                case "refreshSymbols":
                  B = i[ad];
                  break;
                case "compareNames":
                  T = i[ad];
                  break;
              }
              this[ad] = i[ad];
            }
          }
        },
        parseMath: M,
        parseExpr: r,
        parseIexpr: t,
        parseSexr: G,
        removeBrackets: R,
        getSymbol: k,
        position: N,
        removeCharsAndBlanks: q,
        createMmlNode: O,
        createElementMathML: P,
        createElementXHTML: E,
        initSymbols: o,
        refreshSymbols: B,
        compareNames: T,
        createDocumentFragment: X,
        document: e,
        define: I,
        newcommand: u,
        symbols: z,
        names: S,
        TOKEN: {
          CONST: c,
          UNARY: A,
          BINARY: U,
          INFIX: j,
          LEFTBRACKET: b,
          RIGHTBRACKET: h,
          SPACE: a,
          UNDEROVER: L,
          DEFINITION: V,
          LEFTRIGHT: n,
          TEXT: Y,
          UNARYUNDEROVER: K
        }
      }});
    var ab = [Q, J];
    ab = null;
  })(MathJax.InputJax.AsciiMath);
  (function(b) {
    var a;
    b.Augment({
      sourceMenuTitle: ["AsciiMathInput", "AsciiMath Input"],
      annotationEncoding: "text/x-asciimath",
      prefilterHooks: MathJax.Callback.Hooks(true),
      postfilterHooks: MathJax.Callback.Hooks(true),
      Translate: function(c) {
        var d,
            f = MathJax.HTML.getScript(c);
        var g = {
          math: f,
          script: c
        };
        var h = this.prefilterHooks.Execute(g);
        if (h) {
          return h;
        }
        f = g.math;
        try {
          d = this.AM.parseMath(f);
        } catch (e) {
          if (!e.asciimathError) {
            throw e;
          }
          d = this.formatError(e, f);
        }
        g.math = a(d);
        this.postfilterHooks.Execute(g);
        return this.postfilterHooks.Execute(g) || g.math;
      },
      formatError: function(f, e, c) {
        var d = f.message.replace(/\n.*/, "");
        MathJax.Hub.signal.Post(["AsciiMath Jax - parse error", d, e, c]);
        return a.Error(d);
      },
      Error: function(c) {
        throw MathJax.Hub.Insert(Error(c), {asciimathError: true});
      },
      Startup: function() {
        a = MathJax.ElementJax.mml;
        this.AM.Init();
      }
    });
    b.loadComplete("jax.js");
  })(MathJax.InputJax.AsciiMath);
  (function(b, c, g, h) {
    var a;
    var e = "http://www.w3.org/2000/svg";
    var f = "http://www.w3.org/1999/xlink";
    h.Augment({
      HFUZZ: 2,
      DFUZZ: 2,
      config: {styles: {
          ".MathJax_SVG": {
            display: "inline",
            "font-style": "normal",
            "font-weight": "normal",
            "line-height": "normal",
            "font-size": "100%",
            "font-size-adjust": "none",
            "text-indent": 0,
            "text-align": "left",
            "text-transform": "none",
            "letter-spacing": "normal",
            "word-spacing": "normal",
            "word-wrap": "normal",
            "white-space": "nowrap",
            "float": "none",
            direction: "ltr",
            "max-width": "none",
            "max-height": "none",
            "min-width": 0,
            "min-height": 0,
            border: 0,
            padding: 0,
            margin: 0
          },
          ".MathJax_SVG_Display": {
            position: "relative",
            display: "block!important",
            "text-indent": 0,
            "max-width": "none",
            "max-height": "none",
            "min-width": 0,
            "min-height": 0,
            width: "100%"
          },
          ".MathJax_SVG *": {
            transition: "none",
            "-webkit-transition": "none",
            "-moz-transition": "none",
            "-ms-transition": "none",
            "-o-transition": "none"
          },
          ".mjx-svg-href": {
            fill: "blue",
            stroke: "blue"
          },
          ".MathJax_SVG_Processing": {
            visibility: "hidden",
            position: "absolute",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            overflow: "hidden",
            display: "block!important"
          },
          ".MathJax_SVG_Processed": {display: "none!important"},
          ".MathJax_SVG_ExBox": {
            display: "block!important",
            overflow: "hidden",
            width: "1px",
            height: "60ex",
            "min-height": 0,
            "max-height": "none",
            padding: 0,
            border: 0,
            margin: 0
          },
          "#MathJax_SVG_Tooltip": {
            position: "absolute",
            left: 0,
            top: 0,
            width: "auto",
            height: "auto",
            display: "none"
          }
        }},
      hideProcessedMath: true,
      fontNames: ["TeX", "STIX", "STIX-Web", "Asana-Math", "Gyre-Termes", "Gyre-Pagella", "Latin-Modern", "Neo-Euler"],
      Config: function() {
        this.SUPER(arguments).Config.apply(this, arguments);
        var k = c.config.menuSettings,
            j = this.config,
            i = k.font;
        if (k.scale) {
          j.scale = k.scale;
        }
        if (i && i !== "Auto") {
          i = i.replace(/(Local|Web|Image)$/i, "");
          i = i.replace(/([a-z])([A-Z])/, "$1-$2");
          this.fontInUse = i;
        } else {
          this.fontInUse = j.font || "TeX";
        }
        if (this.fontNames.indexOf(this.fontInUse) < 0) {
          this.fontInUse = "TeX";
        }
        this.fontDir += "/" + this.fontInUse;
        if (!this.require) {
          this.require = [];
        }
        this.require.push(this.fontDir + "/fontdata.js");
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
      },
      Startup: function() {
        EVENT = MathJax.Extension.MathEvents.Event;
        TOUCH = MathJax.Extension.MathEvents.Touch;
        HOVER = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = EVENT.ContextMenu;
        this.Mousedown = EVENT.AltContextMenu;
        this.Mouseover = HOVER.Mouseover;
        this.Mouseout = HOVER.Mouseout;
        this.Mousemove = HOVER.Mousemove;
        this.hiddenDiv = g.Element("div", {style: {
            visibility: "hidden",
            overflow: "hidden",
            position: "absolute",
            top: 0,
            height: "1px",
            width: "auto",
            padding: 0,
            border: 0,
            margin: 0,
            textAlign: "left",
            textIndent: 0,
            textTransform: "none",
            lineHeight: "normal",
            letterSpacing: "normal",
            wordSpacing: "normal"
          }});
        if (!document.body.firstChild) {
          document.body.appendChild(this.hiddenDiv);
        } else {
          document.body.insertBefore(this.hiddenDiv, document.body.firstChild);
        }
        this.hiddenDiv = g.addElement(this.hiddenDiv, "div", {id: "MathJax_SVG_Hidden"});
        var i = g.addElement(this.hiddenDiv, "div", {style: {width: "5in"}});
        this.pxPerInch = i.offsetWidth / 5;
        this.hiddenDiv.removeChild(i);
        this.textSVG = this.Element("svg");
        d.GLYPH.defs = this.addElement(this.addElement(this.hiddenDiv.parentNode, "svg"), "defs", {id: "MathJax_SVG_glyphs"});
        this.ExSpan = g.Element("span", {style: {
            position: "absolute",
            "font-size-adjust": "none"
          }}, [["span", {className: "MathJax_SVG_ExBox"}]]);
        this.linebreakSpan = g.Element("span", null, [["hr", {style: {
            width: "auto",
            size: 1,
            padding: 0,
            border: 0,
            margin: 0
          }}]]);
        return b.Styles(this.config.styles, ["InitializeSVG", this]);
      },
      InitializeSVG: function() {
        document.body.appendChild(this.ExSpan);
        document.body.appendChild(this.linebreakSpan);
        this.defaultEx = this.ExSpan.firstChild.offsetHeight / 60;
        this.defaultWidth = this.linebreakSpan.firstChild.offsetWidth;
        document.body.removeChild(this.linebreakSpan);
        document.body.removeChild(this.ExSpan);
      },
      preTranslate: function(n) {
        var s = n.jax[this.id],
            t,
            q = s.length,
            y,
            r,
            z,
            l,
            x,
            k,
            w,
            p,
            j,
            v = false,
            u,
            A = this.config.linebreaks.automatic,
            o = this.config.linebreaks.width;
        if (A) {
          v = (o.match(/^\s*(\d+(\.\d*)?%\s*)?container\s*$/) != null);
          if (v) {
            o = o.replace(/\s*container\s*/, "");
          } else {
            j = this.defaultWidth;
          }
          if (o === "") {
            o = "100%";
          }
        } else {
          j = 100000;
        }
        for (t = 0; t < q; t++) {
          y = s[t];
          if (!y.parentNode) {
            continue;
          }
          r = y.previousSibling;
          if (r && String(r.className).match(/^MathJax(_SVG)?(_Display)?( MathJax(_SVG)?_Processing)?$/)) {
            r.parentNode.removeChild(r);
          }
          k = y.MathJax.elementJax;
          if (!k) {
            continue;
          }
          k.SVG = {display: (k.root.Get("display") === "block")};
          z = l = g.Element("span", {
            style: {
              "font-size": this.config.scale + "%",
              display: "inline-block"
            },
            className: "MathJax_SVG",
            id: k.inputID + "-Frame",
            isMathJax: true,
            jaxID: this.id,
            oncontextmenu: EVENT.Menu,
            onmousedown: EVENT.Mousedown,
            onmouseover: EVENT.Mouseover,
            onmouseout: EVENT.Mouseout,
            onmousemove: EVENT.Mousemove,
            onclick: EVENT.Click,
            ondblclick: EVENT.DblClick,
            onkeydown: EVENT.Keydown,
            tabIndex: c.getTabOrder(k)
          });
          if (c.Browser.noContextMenu) {
            z.ontouchstart = TOUCH.start;
            z.ontouchend = TOUCH.end;
          }
          if (k.SVG.display) {
            l = g.Element("div", {className: "MathJax_SVG_Display"});
            l.appendChild(z);
          }
          l.className += " MathJax_SVG_Processing";
          y.parentNode.insertBefore(l, y);
          y.parentNode.insertBefore(this.ExSpan.cloneNode(true), y);
          l.parentNode.insertBefore(this.linebreakSpan.cloneNode(true), l);
        }
        for (t = 0; t < q; t++) {
          y = s[t];
          if (!y.parentNode) {
            continue;
          }
          x = y.previousSibling;
          l = x.previousSibling;
          k = y.MathJax.elementJax;
          if (!k) {
            continue;
          }
          w = x.firstChild.offsetHeight / 60;
          u = l.previousSibling.firstChild.offsetWidth;
          if (v) {
            j = u;
          }
          if (w === 0 || w === "NaN") {
            this.hiddenDiv.appendChild(l);
            k.SVG.isHidden = true;
            w = this.defaultEx;
            u = this.defaultWidth;
            if (v) {
              j = u;
            }
          }
          k.SVG.ex = w;
          k.SVG.em = p = w / h.TeX.x_height * 1000;
          k.SVG.cwidth = u / p * 1000;
          k.SVG.lineWidth = (A ? this.length2em(o, 1, j / p * 1000) : h.BIGDIMEN);
        }
        for (t = 0; t < q; t++) {
          y = s[t];
          if (!y.parentNode) {
            continue;
          }
          x = s[t].previousSibling;
          z = x.previousSibling;
          k = s[t].MathJax.elementJax;
          if (!k) {
            continue;
          }
          if (!k.SVG.isHidden) {
            z = z.previousSibling;
          }
          z.parentNode.removeChild(z);
          x.parentNode.removeChild(x);
        }
        n.SVGeqn = n.SVGlast = 0;
        n.SVGi = -1;
        n.SVGchunk = this.config.EqnChunk;
        n.SVGdelay = false;
      },
      Translate: function(j, n) {
        if (!j.parentNode) {
          return;
        }
        if (n.SVGdelay) {
          n.SVGdelay = false;
          c.RestartAfter(MathJax.Callback.Delay(this.config.EqnChunkDelay));
        }
        var i = j.MathJax.elementJax,
            m = i.root,
            k = document.getElementById(i.inputID + "-Frame"),
            p = (i.SVG.display ? (k || {}).parentNode : k),
            o = (h.config.useFontCache && !h.config.useGlobalCache);
        if (!p) {
          return;
        }
        this.em = a.mbase.prototype.em = i.SVG.em;
        this.ex = i.SVG.ex;
        this.linebreakWidth = i.SVG.lineWidth;
        this.cwidth = i.SVG.cwidth;
        this.mathDiv = p;
        k.appendChild(this.textSVG);
        if (o) {
          h.resetGlyphs();
        }
        this.initSVG(m, k);
        m.setTeXclass();
        try {
          m.toSVG(k, p);
        } catch (l) {
          if (l.restart) {
            while (k.firstChild) {
              k.removeChild(k.firstChild);
            }
          }
          if (o) {
            d.GLYPH.n--;
          }
          throw l;
        }
        k.removeChild(this.textSVG);
        if (i.SVG.isHidden) {
          j.parentNode.insertBefore(p, j);
        }
        p.className = p.className.split(/ /)[0];
        if (this.hideProcessedMath) {
          p.className += " MathJax_SVG_Processed";
          if (j.MathJax.preview) {
            i.SVG.preview = j.MathJax.preview;
            delete j.MathJax.preview;
          }
          n.SVGeqn += (n.i - n.SVGi);
          n.SVGi = n.i;
          if (n.SVGeqn >= n.SVGlast + n.SVGchunk) {
            this.postTranslate(n, true);
            n.SVGchunk = Math.floor(n.SVGchunk * this.config.EqnChunkFactor);
            n.SVGdelay = true;
          }
        }
      },
      postTranslate: function(q, n) {
        var k = q.jax[this.id];
        if (!this.hideProcessedMath) {
          return;
        }
        for (var o = q.SVGlast,
            j = q.SVGeqn; o < j; o++) {
          var l = k[o];
          if (l && l.MathJax.elementJax) {
            l.previousSibling.className = l.previousSibling.className.split(/ /)[0];
            var p = l.MathJax.elementJax.SVG;
            if (p.preview) {
              p.preview.innerHTML = "";
              l.MathJax.preview = p.preview;
              delete p.preview;
            }
          }
        }
        q.SVGlast = q.SVGeqn;
      },
      resetGlyphs: function(j) {
        if (this.config.useFontCache) {
          var i = d.GLYPH;
          if (this.config.useGlobalCache) {
            i.defs = document.getElementById("MathJax_SVG_glyphs");
            i.defs.innerHTML = "";
          } else {
            i.defs = this.Element("defs");
            i.n++;
          }
          i.glyphs = {};
          if (j) {
            i.n = 0;
          }
        }
      },
      hashCheck: function(i) {
        if (i && i.nodeName.toLowerCase() === "g") {
          do {
            i = i.parentNode;
          } while (i && i.firstChild.nodeName !== "svg");
        }
        return i;
      },
      getJaxFromMath: function(i) {
        if (i.parentNode.className === "MathJax_SVG_Display") {
          i = i.parentNode;
        }
        do {
          i = i.nextSibling;
        } while (i && i.nodeName.toLowerCase() !== "script");
        return c.getJaxFor(i);
      },
      getHoverSpan: function(i, j) {
        j.style.position = "relative";
        return j.firstChild;
      },
      getHoverBBox: function(i, j, k) {
        var l = EVENT.getBBox(j.parentNode);
        l.h += 2;
        l.d -= 2;
        return l;
      },
      Zoom: function(j, s, r, i, p) {
        s.className = "MathJax_SVG";
        var u = s.appendChild(this.ExSpan.cloneNode(true));
        var o = u.firstChild.offsetHeight / 60;
        this.em = a.mbase.prototype.em = o / h.TeX.x_height * 1000;
        this.ex = o;
        this.linebreakWidth = j.SVG.lineWidth;
        this.cwidth = j.SVG.cwidth;
        u.parentNode.removeChild(u);
        s.appendChild(this.textSVG);
        this.mathDIV = s;
        this.zoomScale = parseInt(c.config.menuSettings.zscale) / 100;
        var n = j.root.data[0].SVGdata.tw;
        if (n && n < this.cwidth) {
          this.cwidth = n;
        }
        this.idPostfix = "-zoom";
        j.root.toSVG(s, s);
        this.idPostfix = "";
        this.zoomScale = 1;
        s.removeChild(this.textSVG);
        var m = s.getElementsByTagName("svg")[0].style;
        m.marginTop = m.marginRight = m.marginLeft = 0;
        if (m.marginBottom.charAt(0) === "-") {
          s.style.marginBottom = m.marginBottom.substr(1);
        }
        if (this.operaZoomRefresh) {
          setTimeout(function() {
            s.firstChild.style.border = "1px solid transparent";
          }, 1);
        }
        if (s.offsetWidth < s.firstChild.offsetWidth) {
          s.style.minWidth = s.firstChild.offsetWidth + "px";
          r.style.minWidth = r.firstChild.offsetWidth + "px";
        }
        s.style.position = r.style.position = "absolute";
        var q = s.offsetWidth,
            l = s.offsetHeight,
            t = r.offsetHeight,
            k = r.offsetWidth;
        s.style.position = r.style.position = "";
        return {
          Y: -EVENT.getBBox(s).h,
          mW: k,
          mH: t,
          zW: q,
          zH: l
        };
      },
      initSVG: function(j, i) {},
      Remove: function(i) {
        var j = document.getElementById(i.inputID + "-Frame");
        if (j) {
          if (i.SVG.display) {
            j = j.parentNode;
          }
          j.parentNode.removeChild(j);
        }
        delete i.SVG;
      },
      Em: function(i) {
        if (Math.abs(i) < 0.0006) {
          return "0";
        }
        return i.toFixed(3).replace(/\.?0+$/, "") + "em";
      },
      Ex: function(i) {
        i = i / this.TeX.x_height;
        if (Math.abs(i) < 0.0006) {
          return "0";
        }
        return i.toFixed(3).replace(/\.?0+$/, "") + "ex";
      },
      Percent: function(i) {
        return (100 * i).toFixed(1).replace(/\.?0+$/, "") + "%";
      },
      Fixed: function(i, j) {
        if (Math.abs(i) < 0.0006) {
          return "0";
        }
        return i.toFixed(j || 3).replace(/\.?0+$/, "");
      },
      length2em: function(o, j, l) {
        if (typeof(o) !== "string") {
          o = o.toString();
        }
        if (o === "") {
          return "";
        }
        if (o === a.SIZE.NORMAL) {
          return 1000;
        }
        if (o === a.SIZE.BIG) {
          return 2000;
        }
        if (o === a.SIZE.SMALL) {
          return 710;
        }
        if (o === "infinity") {
          return h.BIGDIMEN;
        }
        if (o.match(/mathspace$/)) {
          return 1000 * h.MATHSPACE[o];
        }
        var p = (this.zoomScale || 1) / h.em;
        var k = o.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        var i = parseFloat(k[1] || "1") * 1000,
            n = k[2];
        if (l == null) {
          l = 1000;
        }
        if (j == null) {
          j = 1;
        }
        if (n === "em") {
          return i;
        }
        if (n === "ex") {
          return i * h.TeX.x_height / 1000;
        }
        if (n === "%") {
          return i / 100 * l / 1000;
        }
        if (n === "px") {
          return i * p;
        }
        if (n === "pt") {
          return i / 10;
        }
        if (n === "pc") {
          return i * 1.2;
        }
        if (n === "in") {
          return i * this.pxPerInch * p;
        }
        if (n === "cm") {
          return i * this.pxPerInch * p / 2.54;
        }
        if (n === "mm") {
          return i * this.pxPerInch * p / 25.4;
        }
        if (n === "mu") {
          return i / 18 * j;
        }
        return i * l / 1000;
      },
      thickness2em: function(j, i) {
        var k = h.TeX.rule_thickness;
        if (j === a.LINETHICKNESS.MEDIUM) {
          return k;
        }
        if (j === a.LINETHICKNESS.THIN) {
          return 0.67 * k;
        }
        if (j === a.LINETHICKNESS.THICK) {
          return 1.67 * k;
        }
        return this.length2em(j, i, k);
      },
      getPadding: function(j) {
        var l = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
            i = false;
        for (var m in l) {
          if (l.hasOwnProperty(m)) {
            var k = j["padding" + m.charAt(0).toUpperCase() + m.substr(1)];
            if (k) {
              l[m] = this.length2em(k);
              i = true;
            }
          }
        }
        return (i ? l : false);
      },
      getBorders: function(m) {
        var k = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
            j = false;
        for (var n in k) {
          if (k.hasOwnProperty(n)) {
            var i = "border" + n.charAt(0).toUpperCase() + n.substr(1);
            var l = m[i + "Style"];
            if (l && l !== "none") {
              j = true;
              k[n] = this.length2em(m[i + "Width"]);
              k[n + "Style"] = m[i + "Style"];
              k[n + "Color"] = m[i + "Color"];
              if (k[n + "Color"] === "initial") {
                k[n + "Color"] = "";
              }
            } else {
              delete k[n];
            }
          }
        }
        return (j ? k : false);
      },
      Element: function(i, j) {
        var k = (typeof(i) === "string" ? document.createElementNS(e, i) : i);
        k.isMathJax = true;
        if (j) {
          for (var l in j) {
            if (j.hasOwnProperty(l)) {
              k.setAttribute(l, j[l].toString());
            }
          }
        }
        return k;
      },
      addElement: function(j, i, k) {
        return j.appendChild(this.Element(i, k));
      },
      TextNode: g.TextNode,
      addText: g.addText,
      ucMatch: g.ucMatch,
      HandleVariant: function(r, q, A) {
        var u = d.G();
        var l,
            w,
            y,
            o,
            z,
            s,
            p,
            k,
            x,
            j;
        if (!r) {
          r = this.FONTDATA.VARIANT[a.VARIANT.NORMAL];
        }
        if (r.forceFamily) {
          A = d.TEXT(q, A, r.font);
          if (r.h != null) {
            A.h = r.h;
          }
          if (r.d != null) {
            A.d = r.d;
          }
          u.Add(A);
          A = "";
        }
        z = r;
        for (s = 0, p = A.length; s < p; s++) {
          r = z;
          l = A.charCodeAt(s);
          y = A.charAt(s);
          if (l >= 55296 && l < 56319) {
            s++;
            l = (((l - 55296) << 10) + (A.charCodeAt(s) - 56320)) + 65536;
            if (this.FONTDATA.RemapPlane1) {
              var v = this.FONTDATA.RemapPlane1(l, r);
              l = v.n;
              r = v.variant;
            }
          } else {
            j = this.FONTDATA.RANGES;
            for (k = 0, x = j.length; k < x; k++) {
              if (j[k].name === "alpha" && r.noLowerCase) {
                continue;
              }
              w = r["offset" + j[k].offset];
              if (w && l >= j[k].low && l <= j[k].high) {
                if (j[k].remap && j[k].remap[l]) {
                  l = w + j[k].remap[l];
                } else {
                  l = l - j[k].low + w;
                  if (j[k].add) {
                    l += j[k].add;
                  }
                }
                if (r["variant" + j[k].offset]) {
                  r = this.FONTDATA.VARIANT[r["variant" + j[k].offset]];
                }
                break;
              }
            }
          }
          if (r.remap && r.remap[l]) {
            l = r.remap[l];
            if (r.remap.variant) {
              r = this.FONTDATA.VARIANT[r.remap.variant];
            }
          } else {
            if (this.FONTDATA.REMAP[l] && !r.noRemap) {
              l = this.FONTDATA.REMAP[l];
            }
          }
          if (l instanceof Array) {
            r = this.FONTDATA.VARIANT[l[1]];
            l = l[0];
          }
          if (typeof(l) === "string") {
            A = l + A.substr(s + 1);
            p = A.length;
            s = -1;
            continue;
          }
          o = this.lookupChar(r, l);
          y = o[l];
          if (y) {
            if ((y[5] && y[5].space) || (y[5] === "" && y[0] + y[1] === 0)) {
              u.w += y[2];
            } else {
              y = [q, o.id + "-" + l.toString(16).toUpperCase()].concat(y);
              u.Add(d.GLYPH.apply(d, y), u.w, 0);
            }
          } else {
            if (this.FONTDATA.DELIMITERS[l]) {
              y = this.createDelimiter(l, 0, 1, o);
              u.Add(y, u.w, (this.FONTDATA.DELIMITERS[l].dir === "V" ? y.d : 0));
            } else {
              if (l <= 65535) {
                y = String.fromCharCode(l);
              } else {
                w = l - 65536;
                y = String.fromCharCode((w >> 10) + 55296) + String.fromCharCode((w & 1023) + 56320);
              }
              var t = d.TEXT(q * 100 / h.config.scale, y, {
                "font-family": r.defaultFamily || h.config.undefinedFamily,
                "font-style": (r.italic ? "italic" : ""),
                "font-weight": (r.bold ? "bold" : "")
              });
              if (r.h != null) {
                t.h = r.h;
              }
              if (r.d != null) {
                t.d = r.d;
              }
              y = d.G();
              y.Add(t);
              u.Add(y, u.w, 0);
              c.signal.Post(["SVG Jax - unknown char", l, r]);
            }
          }
        }
        if (A.length == 1 && o.skew && o.skew[l]) {
          u.skew = o.skew[l] * 1000;
        }
        if (u.element.childNodes.length === 1 && !u.element.firstChild.getAttribute("x")) {
          u.element = u.element.firstChild;
          u.removeable = false;
          u.scale = q;
        }
        return u;
      },
      lookupChar: function(o, r) {
        var l,
            j;
        if (!o.FONTS) {
          var q = this.FONTDATA.FONTS;
          var p = (o.fonts || this.FONTDATA.VARIANT.normal.fonts);
          if (!(p instanceof Array)) {
            p = [p];
          }
          if (o.fonts != p) {
            o.fonts = p;
          }
          o.FONTS = [];
          for (l = 0, j = p.length; l < j; l++) {
            if (q[p[l]]) {
              o.FONTS.push(q[p[l]]);
            }
          }
        }
        for (l = 0, j = o.FONTS.length; l < j; l++) {
          var k = o.FONTS[l];
          if (typeof(k) === "string") {
            delete o.FONTS;
            this.loadFont(k);
          }
          if (k[r]) {
            return k;
          } else {
            this.findBlock(k, r);
          }
        }
        return {id: "unknown"};
      },
      findBlock: function(l, q) {
        if (l.Ranges) {
          for (var p = 0,
              k = l.Ranges.length; p < k; p++) {
            if (q < l.Ranges[p][0]) {
              return;
            }
            if (q <= l.Ranges[p][1]) {
              var o = l.Ranges[p][2];
              for (var n = l.Ranges.length - 1; n >= 0; n--) {
                if (l.Ranges[n][2] == o) {
                  l.Ranges.splice(n, 1);
                }
              }
              this.loadFont(l.directory + "/" + o + ".js");
            }
          }
        }
      },
      loadFont: function(i) {
        c.RestartAfter(b.Require(this.fontDir + "/" + i));
      },
      createDelimiter: function(j, l, p, n) {
        if (!p) {
          p = 1;
        }
        var r = d.G();
        if (!j) {
          r.Clean();
          delete r.element;
          r.w = r.r = this.TeX.nulldelimiterspace * p;
          return r;
        }
        if (!(l instanceof Array)) {
          l = [l, l];
        }
        var s = l[1];
        l = l[0];
        var k = {alias: j};
        while (k.alias) {
          j = k.alias;
          k = this.FONTDATA.DELIMITERS[j];
          if (!k) {
            k = {HW: [0, this.FONTDATA.VARIANT[a.VARIANT.NORMAL]]};
          }
        }
        if (k.load) {
          c.RestartAfter(b.Require(this.fontDir + "/fontdata-" + k.load + ".js"));
        }
        for (var q = 0,
            o = k.HW.length; q < o; q++) {
          if (k.HW[q][0] * p >= l - 10 - h.config.blacker || (q == o - 1 && !k.stretch)) {
            if (k.HW[q][2]) {
              p *= k.HW[q][2];
            }
            if (k.HW[q][3]) {
              j = k.HW[q][3];
            }
            return this.createChar(p, [j, k.HW[q][1]], n).With({stretched: true});
          }
        }
        if (k.stretch) {
          this["extendDelimiter" + k.dir](r, s, k.stretch, p, n);
        }
        return r;
      },
      createChar: function(r, p, l) {
        var q = "",
            o = {
              fonts: [p[1]],
              noRemap: true
            };
        if (l && l === a.VARIANT.BOLD) {
          o.fonts = [p[1] + "-bold", p[1]];
        }
        if (typeof(p[1]) !== "string") {
          o = p[1];
        }
        if (p[0] instanceof Array) {
          for (var n = 0,
              j = p[0].length; n < j; n++) {
            q += String.fromCharCode(p[0][n]);
          }
        } else {
          q = String.fromCharCode(p[0]);
        }
        if (p[4]) {
          r = r * p[4];
        }
        var k = this.HandleVariant(o, r, q);
        if (p[2]) {
          k.x = p[2] * 1000;
        }
        if (p[3]) {
          k.y = p[3] * 1000;
        }
        if (p[5]) {
          k.h += p[5] * 1000;
        }
        if (p[6]) {
          k.d += p[6] * 1000;
        }
        return k;
      },
      extendDelimiterV: function(p, x, j, m, l) {
        var v = this.createChar(m, (j.top || j.ext), l);
        var r = this.createChar(m, (j.bot || j.ext), l);
        var o = v.h + v.d + r.h + r.d;
        var u = -v.h;
        p.Add(v, 0, u);
        u -= v.d;
        if (j.mid) {
          var w = this.createChar(m, j.mid, l);
          o += w.h + w.d;
        }
        if (j.min && x < o * j.min) {
          x = o * j.min;
        }
        if (x > o) {
          var i = this.createChar(m, j.ext, l);
          var n = (j.mid ? 2 : 1),
              t = (x - o) / n,
              z = (t + 100) / (i.h + i.d);
          while (n-- > 0) {
            var q = h.Element("g", {transform: "translate(" + i.y + "," + (u - z * i.h + 50 + i.y) + ") scale(1," + z + ")"});
            q.appendChild(i.element.cloneNode(false));
            p.element.appendChild(q);
            u -= t;
            if (j.mid && n) {
              p.Add(w, 0, u - w.h);
              u -= (w.h + w.d);
            }
          }
        } else {
          if (j.mid) {
            u += (o - x) / 2;
            p.Add(w, 0, u - w.h);
            u += -(w.h + w.d) + (o - x) / 2;
          } else {
            u += (o - x);
          }
        }
        p.Add(r, 0, u - r.h);
        p.Clean();
        p.scale = m;
        p.isMultiChar = true;
      },
      extendDelimiterH: function(q, m, j, o, l) {
        var n = this.createChar(o, (j.left || j.rep), l);
        var A = this.createChar(o, (j.right || j.rep), l);
        q.Add(n, -n.l, 0);
        var z = (n.r - n.l) + (A.r - A.l),
            v = n.r - n.l;
        if (j.mid) {
          var y = this.createChar(o, j.mid, l);
          z += y.w;
        }
        if (j.min && m < z * j.min) {
          m = z * j.min;
        }
        if (m > z) {
          var u = this.createChar(o, j.rep, l),
              i = j.fuzz || 0;
          var p = (j.mid ? 2 : 1),
              t = (m - z) / p,
              B = (t + i) / (u.r - u.l);
          while (p-- > 0) {
            var r = h.Element("g", {transform: "translate(" + (v - i / 2 - B * u.l + u.x) + "," + u.y + ") scale(" + B + ",1)"});
            r.appendChild(u.element.cloneNode(false));
            q.element.appendChild(r);
            v += t;
            if (j.mid && p) {
              q.Add(y, v, 0);
              v += y.w;
            }
          }
        } else {
          if (j.mid) {
            v -= (z - m) / 2;
            q.Add(y, v, 0);
            v += y.w - (z - m) / 2;
          } else {
            v -= (z - m);
          }
        }
        q.Add(A, v - A.l, 0);
        q.Clean();
        q.scale = o;
        q.isMultiChar = true;
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
        negativeveryverythickmathspace: -7 / 18
      },
      TeX: {
        x_height: 430.554,
        quad: 1000,
        num1: 676.508,
        num2: 393.732,
        num3: 443.73,
        denom1: 685.951,
        denom2: 344.841,
        sup1: 412.892,
        sup2: 362.892,
        sup3: 288.888,
        sub1: 150,
        sub2: 247.217,
        sup_drop: 386.108,
        sub_drop: 50,
        delim1: 2390,
        delim2: 1000,
        axis_height: 250,
        rule_thickness: 60,
        big_op_spacing1: 111.111,
        big_op_spacing2: 166.666,
        big_op_spacing3: 200,
        big_op_spacing4: 600,
        big_op_spacing5: 100,
        scriptspace: 100,
        nulldelimiterspace: 120,
        delimiterfactor: 901,
        delimitershortfall: 300,
        min_rule_thickness: 1.25,
        min_root_space: 1.5
      },
      BIGDIMEN: 10000000,
      NBSP: "\u00A0"
    });
    var d = h.BBOX = MathJax.Object.Subclass({
      type: "g",
      removeable: true,
      Init: function(i) {
        this.h = this.d = -h.BIGDIMEN;
        this.H = this.D = 0;
        this.w = this.r = 0;
        this.l = h.BIGDIMEN;
        this.x = this.y = 0;
        this.scale = 1;
        this.n = 0;
        if (this.type) {
          this.element = h.Element(this.type, i);
        }
      },
      With: function(i) {
        return c.Insert(this, i);
      },
      Add: function(l, r, q, i, p) {
        if (r) {
          l.x += r;
        }
        if (q) {
          l.y += q;
        }
        if (l.element) {
          if (l.removeable && l.element.childNodes.length === 1 && l.n === 1) {
            var j = l.element.firstChild,
                n = j.nodeName.toLowerCase();
            if (n === "use" || n === "rect") {
              l.element = j;
              l.scale = l.childScale;
              var o = l.childX,
                  m = l.childY;
              l.x += o;
              l.y += m;
              l.h -= m;
              l.d += m;
              l.H -= m;
              l.D += m;
              l.w -= o;
              l.r -= o;
              l.l += o;
              l.removeable = false;
              j.setAttribute("x", Math.floor(l.x / l.scale));
              j.setAttribute("y", Math.floor(l.y / l.scale));
            }
          }
          if (Math.abs(l.x) < 1 && Math.abs(l.y) < 1) {
            l.remove = l.removeable;
          } else {
            n = l.element.nodeName.toLowerCase();
            if (n === "g") {
              if (!l.element.firstChild) {
                l.remove = l.removeable;
              } else {
                l.element.setAttribute("transform", "translate(" + Math.floor(l.x) + "," + Math.floor(l.y) + ")");
              }
            } else {
              if (n === "line" || n === "polygon" || n === "path" || n === "a") {
                var k = l.element.getAttribute("transform") || "";
                if (k) {
                  k = " " + k;
                }
                k = "translate(" + Math.floor(l.x) + "," + Math.floor(l.y) + ")" + k;
                l.element.setAttribute("transform", k);
              } else {
                l.element.setAttribute("x", Math.floor(l.x / l.scale));
                l.element.setAttribute("y", Math.floor(l.y / l.scale));
              }
            }
          }
          if (l.remove) {
            this.n += l.n;
            while (l.element.firstChild) {
              if (p && this.element.firstChild) {
                this.element.insertBefore(l.element.firstChild, this.element.firstChild);
              } else {
                this.element.appendChild(l.element.firstChild);
              }
            }
          } else {
            if (p) {
              this.element.insertBefore(l.element, this.element.firstChild);
            } else {
              this.element.appendChild(l.element);
            }
          }
          delete l.element;
        }
        if (l.hasIndent) {
          this.hasIndent = l.hasIndent;
        }
        if (l.tw != null) {
          this.tw = l.tw;
        }
        if (l.d - l.y > this.d) {
          this.d = l.d - l.y;
          if (this.d > this.D) {
            this.D = this.d;
          }
        }
        if (l.y + l.h > this.h) {
          this.h = l.y + l.h;
          if (this.h > this.H) {
            this.H = this.h;
          }
        }
        if (l.D - l.y > this.D) {
          this.D = l.D - l.y;
        }
        if (l.y + l.H > this.H) {
          this.H = l.y + l.H;
        }
        if (l.x + l.l < this.l) {
          this.l = l.x + l.l;
        }
        if (l.x + l.r > this.r) {
          this.r = l.x + l.r;
        }
        if (i || l.x + l.w + (l.X || 0) > this.w) {
          this.w = l.x + l.w + (l.X || 0);
        }
        this.childScale = l.scale;
        this.childX = l.x;
        this.childY = l.y;
        this.n++;
        return l;
      },
      Align: function(m, n, l, k, j) {
        l = ({
          left: l,
          center: (this.w - m.w) / 2,
          right: this.w - m.w - l
        })[n] || 0;
        var i = this.w;
        this.Add(m, l + (j || 0), k);
        this.w = i;
      },
      Clean: function() {
        if (this.h === -h.BIGDIMEN) {
          this.h = this.d = this.l = 0;
        }
        return this;
      }
    });
    d.ROW = d.Subclass({
      Init: function() {
        this.SUPER(arguments).Init.call(this);
        this.svg = [];
        this.sh = this.sd = 0;
      },
      Check: function(j) {
        var i = j.toSVG();
        this.svg.push(i);
        if (j.SVGcanStretch("Vertical")) {
          i.mml = j;
        }
        if (i.h > this.sh) {
          this.sh = i.h;
        }
        if (i.d > this.sd) {
          this.sd = i.d;
        }
      },
      Stretch: function() {
        for (var n = 0,
            j = this.svg.length; n < j; n++) {
          var k = this.svg[n],
              l = k.mml;
          if (l) {
            if (l.forceStretch || l.SVGdata.h !== this.sh || l.SVGdata.d !== this.sd) {
              k = l.SVGstretchV(this.sh, this.sd);
            }
            l.SVGdata.HW = this.sh;
            l.SVGdata.D = this.sd;
          }
          if (k.ic) {
            this.ic = k.ic;
          } else {
            delete this.ic;
          }
          this.Add(k, this.w, 0, true);
        }
        delete this.svg;
      }
    });
    d.RECT = d.Subclass({
      type: "rect",
      removeable: false,
      Init: function(j, l, i, k) {
        if (k == null) {
          k = {stroke: "none"};
        }
        k.width = Math.floor(i);
        k.height = Math.floor(j + l);
        this.SUPER(arguments).Init.call(this, k);
        this.w = this.r = i;
        this.h = this.H = j + l;
        this.d = this.D = this.l = 0;
        this.y = -l;
      }
    });
    d.FRAME = d.Subclass({
      type: "rect",
      removeable: false,
      Init: function(l, o, i, k, n, j, m) {
        if (m == null) {
          m = {};
        }
        m.fill = "none";
        m["stroke-width"] = h.Fixed(k, 2);
        m.width = Math.floor(i - k);
        m.height = Math.floor(l + o - k);
        m.transform = "translate(" + Math.floor(k / 2) + "," + Math.floor(-o + k / 2) + ")";
        if (n === "dashed") {
          m["stroke-dasharray"] = [Math.floor(6 * h.em), Math.floor(6 * h.em)].join(" ");
        }
        this.SUPER(arguments).Init.call(this, m);
        this.w = this.r = i;
        this.h = this.H = l;
        this.d = this.D = o;
        this.l = 0;
      }
    });
    d.HLINE = d.Subclass({
      type: "line",
      removeable: false,
      Init: function(j, l, p, k, o) {
        if (o == null) {
          o = {"stroke-linecap": "square"};
        }
        if (k && k !== "") {
          o.stroke = k;
        }
        o["stroke-width"] = h.Fixed(l, 2);
        o.x1 = o.y1 = o.y2 = Math.floor(l / 2);
        o.x2 = Math.floor(j - l / 2);
        if (p === "dashed") {
          var q = Math.floor(Math.max(0, j - l) / (6 * l)),
              i = Math.floor(Math.max(0, j - l) / (2 * q + 1));
          o["stroke-dasharray"] = i + " " + i;
        }
        if (p === "dotted") {
          o["stroke-dasharray"] = [1, Math.max(150, Math.floor(2 * l))].join(" ");
          o["stroke-linecap"] = "round";
        }
        this.SUPER(arguments).Init.call(this, o);
        this.w = this.r = j;
        this.l = 0;
        this.h = this.H = l;
        this.d = this.D = 0;
      }
    });
    d.VLINE = d.Subclass({
      type: "line",
      removeable: false,
      Init: function(l, k, p, j, o) {
        if (o == null) {
          o = {"stroke-linecap": "square"};
        }
        if (j && j !== "") {
          o.stroke = j;
        }
        o["stroke-width"] = h.Fixed(k, 2);
        o.x1 = o.x2 = o.y1 = Math.floor(k / 2);
        o.y2 = Math.floor(l - k / 2);
        if (p === "dashed") {
          var q = Math.floor(Math.max(0, l - k) / (6 * k)),
              i = Math.floor(Math.max(0, l - k) / (2 * q + 1));
          o["stroke-dasharray"] = i + " " + i;
        }
        if (p === "dotted") {
          o["stroke-dasharray"] = [1, Math.max(150, Math.floor(2 * k))].join(" ");
          o["stroke-linecap"] = "round";
        }
        this.SUPER(arguments).Init.call(this, o);
        this.w = this.r = k;
        this.l = 0;
        this.h = this.H = l;
        this.d = this.D = 0;
      }
    });
    d.TEXT = d.Subclass({
      type: "text",
      removeable: false,
      Init: function(l, k, i) {
        if (!i) {
          i = {};
        }
        i.stroke = "none";
        if (i["font-style"] === "") {
          delete i["font-style"];
        }
        if (i["font-weight"] === "") {
          delete i["font-weight"];
        }
        this.SUPER(arguments).Init.call(this, i);
        h.addText(this.element, k);
        h.textSVG.appendChild(this.element);
        var j = this.element.getBBox();
        h.textSVG.removeChild(this.element);
        l *= 1000 / h.em;
        this.element.setAttribute("transform", "scale(" + h.Fixed(l) + ") matrix(1 0 0 -1 0 0)");
        this.w = this.r = j.width * l;
        this.l = 0;
        this.h = this.H = -j.y * l;
        this.d = this.D = (j.height + j.y) * l;
      }
    });
    d.G = d;
    d.NULL = d.Subclass({Init: function() {
        this.SUPER(arguments).Init.apply(this, arguments);
        this.Clean();
      }});
    d.GLYPH = d.Subclass({
      type: "path",
      removeable: false,
      Init: function(q, k, v, x, y, s, j, m) {
        var n,
            z = h.config.blacker,
            u = d.GLYPH;
        var i = h.config.useFontCache;
        var o = (q === 1 ? null : "scale(" + h.Fixed(q) + ")");
        if (i && !h.config.useGlobalCache) {
          k = "E" + u.n + "-" + k;
        }
        if (!i || !u.glyphs[k]) {
          n = {"stroke-width": z};
          if (i) {
            n.id = k;
          } else {
            if (o) {
              n.transform = o;
            }
          }
          n.d = (m ? "M" + m + "Z" : "");
          this.SUPER(arguments).Init.call(this, n);
          if (i) {
            u.defs.appendChild(this.element);
            u.glyphs[k] = true;
          }
        }
        if (i) {
          n = {};
          if (o) {
            n.transform = o;
          }
          this.element = h.Element("use", n);
          this.element.setAttributeNS(f, "href", "#" + k);
        }
        this.h = (v + z) * q;
        this.d = (x + z) * q;
        this.w = (y + z / 2) * q;
        this.l = (s + z / 2) * q;
        this.r = (j + z / 2) * q;
        this.H = Math.max(0, this.h);
        this.D = Math.max(0, this.d);
        this.x = this.y = 0;
        this.scale = q;
      }
    }, {
      glyphs: {},
      defs: null,
      n: 0
    });
    c.Register.StartupHook("mml Jax Ready", function() {
      a = MathJax.ElementJax.mml;
      a.mbase.Augment({
        SVG: d,
        toSVG: function() {
          this.SVGgetStyles();
          var n = this.SVGgetVariant();
          var k = this.SVG();
          this.SVGgetScale(k);
          this.SVGhandleSpace(k);
          for (var l = 0,
              j = this.data.length; l < j; l++) {
            if (this.data[l]) {
              var p = k.Add(this.data[l].toSVG(n, k.scale), k.w, 0, true);
              if (p.skew) {
                k.skew = p.skew;
              }
            }
          }
          k.Clean();
          var o = this.data.join("");
          if (k.skew && o.length !== 1) {
            delete k.skew;
          }
          if (k.r > k.w && o.length === 1 && !n.noIC) {
            k.ic = k.r - k.w;
            k.w = k.r;
          }
          this.SVGhandleColor(k);
          this.SVGsaveData(k);
          return k;
        },
        SVGchildSVG: function(j) {
          return (this.data[j] ? this.data[j].toSVG() : d());
        },
        SVGdataStretched: function(k, j, l) {
          this.SVGdata = {
            HW: j,
            D: l
          };
          if (!this.data[k]) {
            return d();
          }
          if (l != null) {
            return this.data[k].SVGstretchV(j, l);
          }
          if (j != null) {
            return this.data[k].SVGstretchH(j);
          }
          return this.data[k].toSVG();
        },
        SVGsaveData: function(j) {
          if (!this.SVGdata) {
            this.SVGdata = {};
          }
          this.SVGdata.w = j.w, this.SVGdata.x = j.x;
          this.SVGdata.h = j.h, this.SVGdata.d = j.d;
          if (j.y) {
            this.SVGdata.h += j.y;
            this.SVGdata.d -= j.y;
          }
          if (j.X != null) {
            this.SVGdata.X = j.X;
          }
          if (j.tw != null) {
            this.SVGdata.tw = j.tw;
          }
          if (j.skew) {
            this.SVGdata.skew = j.skew;
          }
          if (j.ic) {
            this.SVGdata.ic = j.ic;
          }
          if (this["class"]) {
            j.removeable = false;
            h.Element(j.element, {"class": this["class"]});
          }
          if (this.id) {
            j.removeable = false;
            h.Element(j.element, {id: this.id});
          }
          if (this.href) {
            var i = h.Element("a", {"class": "mjx-svg-href"});
            i.setAttributeNS(f, "href", this.href);
            i.onclick = this.SVGlink;
            h.addElement(i, "rect", {
              width: j.w,
              height: j.h + j.d,
              y: -j.d,
              fill: "none",
              stroke: "none",
              "pointer-events": "all"
            });
            if (j.type === "svg") {
              var l = j.element.firstChild;
              while (l.firstChild) {
                i.appendChild(l.firstChild);
              }
              l.appendChild(i);
            } else {
              i.appendChild(j.element);
              j.element = i;
            }
            j.removeable = false;
          }
          if (h.config.addMMLclasses) {
            this.SVGaddClass(j.element, "mjx-svg-" + this.type);
            j.removeable = false;
          }
          var k = this.style;
          if (k && j.element) {
            j.element.style.cssText = k;
            if (j.element.style.fontSize) {
              j.element.style.fontSize = "";
            }
            j.element.style.border = j.element.style.padding = "";
            if (j.removeable) {
              j.removeable = (j.element.style.cssText === "");
            }
          }
          this.SVGaddAttributes(j);
        },
        SVGaddClass: function(k, i) {
          var j = k.getAttribute("class");
          k.setAttribute("class", (j ? j + " " : "") + i);
        },
        SVGaddAttributes: function(k) {
          if (this.attrNames) {
            var r = this.attrNames,
                n = a.nocopyAttributes,
                q = c.config.ignoreMMLattributes;
            var o = (this.type === "mstyle" ? a.math.prototype.defaults : this.defaults);
            for (var l = 0,
                j = r.length; l < j; l++) {
              var p = r[l];
              if (q[p] == false || (!n[p] && !q[p] && o[p] == null && typeof(k.element[p]) === "undefined")) {
                k.element.setAttribute(p, this.attr[p]);
                k.removeable = false;
              }
            }
          }
        },
        SVGlink: function() {
          var i = this.href.animVal;
          if (i.charAt(0) === "#") {
            var j = h.hashCheck(document.getElementById(i.substr(1)));
            if (j && j.scrollIntoView) {
              setTimeout(function() {
                j.parentNode.scrollIntoView(true);
              }, 1);
            }
          }
          document.location = i;
        },
        SVGgetStyles: function() {
          if (this.style) {
            var i = g.Element("span");
            i.style.cssText = this.style;
            this.styles = this.SVGprocessStyles(i.style);
          }
        },
        SVGprocessStyles: function(i) {
          var j = {
            border: h.getBorders(i),
            padding: h.getPadding(i)
          };
          if (!j.border) {
            delete j.border;
          }
          if (!j.padding) {
            delete j.padding;
          }
          if (i.fontSize) {
            j.fontSize = i.fontSize;
          }
          if (i.color) {
            j.color = i.color;
          }
          if (i.backgroundColor) {
            j.background = i.backgroundColor;
          }
          if (i.fontStyle) {
            j.fontStyle = i.fontStyle;
          }
          if (i.fontWeight) {
            j.fontWeight = i.fontWeight;
          }
          if (i.fontFamily) {
            j.fontFamily = i.fontFamily;
          }
          if (j.fontWeight && j.fontWeight.match(/^\d+$/)) {
            j.fontWeight = (parseInt(j.fontWeight) > 600 ? "bold" : "normal");
          }
          return j;
        },
        SVGhandleSpace: function(l) {
          if (this.useMMLspacing) {
            if (this.type !== "mo") {
              return;
            }
            var k = this.getValues("scriptlevel", "lspace", "rspace");
            if (k.scriptlevel <= 0 || this.hasValue("lspace") || this.hasValue("rspace")) {
              var j = this.SVGgetMu(l);
              k.lspace = Math.max(0, h.length2em(k.lspace, j));
              k.rspace = Math.max(0, h.length2em(k.rspace, j));
              var i = this,
                  m = this.Parent();
              while (m && m.isEmbellished() && m.Core() === i) {
                i = m;
                m = m.Parent();
              }
              if (k.lspace) {
                l.x += k.lspace;
              }
              if (k.rspace) {
                l.X = k.rspace;
              }
            }
          } else {
            var n = this.texSpacing();
            this.SVGgetScale();
            if (n !== "") {
              l.x += h.length2em(n, this.scale) * this.mscale;
            }
          }
        },
        SVGhandleColor: function(m) {
          var v = this.getValues("mathcolor", "color");
          if (this.styles && this.styles.color && !v.color) {
            v.color = this.styles.color;
          }
          if (v.color && !this.mathcolor) {
            v.mathcolor = v.color;
          }
          if (v.mathcolor) {
            h.Element(m.element, {
              fill: v.mathcolor,
              stroke: v.mathcolor
            });
            m.removeable = false;
          }
          var q = (this.styles || {}).border,
              t = (this.styles || {}).padding,
              r = ((q || {}).left || 0),
              o = ((t || {}).left || 0),
              i;
          v.background = (this.mathbackground || this.background || (this.styles || {}).background || a.COLOR.TRANSPARENT);
          if (r + o) {
            var j = d();
            for (i in m) {
              if (m.hasOwnProperty(i)) {
                j[i] = m[i];
              }
            }
            j.x = 0;
            j.y = 0;
            m.element = h.Element("g");
            m.removeable = true;
            m.Add(j, r + o, 0);
          }
          if (t) {
            m.w += t.right || 0;
            m.h += t.top || 0;
            m.d += t.bottom || 0;
          }
          if (q) {
            m.w += q.right || 0;
            m.h += q.top || 0;
            m.d += q.bottom || 0;
          }
          if (v.background !== a.COLOR.TRANSPARENT) {
            var s = m.element.nodeName.toLowerCase();
            if (s !== "g" && s !== "svg") {
              var n = h.Element("g");
              n.appendChild(m.element);
              m.element = n;
              m.removeable = true;
            }
            m.Add(d.RECT(m.h, m.d, m.w, {
              fill: v.background,
              stroke: "none"
            }), 0, 0, false, true);
          }
          if (q) {
            var u = 5;
            var k = {
              left: ["V", m.h + m.d, -u, -m.d],
              right: ["V", m.h + m.d, m.w - q.right + u, -m.d],
              top: ["H", m.w, 0, m.h - q.top + u],
              bottom: ["H", m.w, 0, -m.d - u]
            };
            for (i in k) {
              if (k.hasOwnProperty(i)) {
                if (q[i]) {
                  var p = k[i],
                      l = d[p[0] + "LINE"];
                  m.Add(l(p[1], q[i], q[i + "Style"], q[i + "Color"]), p[2], p[3]);
                }
              }
            }
          }
        },
        SVGhandleVariant: function(i, k, j) {
          return h.HandleVariant(i, k, j);
        },
        SVGgetVariant: function() {
          var i = this.getValues("mathvariant", "fontfamily", "fontweight", "fontstyle");
          var j = i.mathvariant;
          if (this.variantForm) {
            j = "-" + h.fontInUse + "-variant";
          }
          i.hasVariant = this.Get("mathvariant", true);
          if (!i.hasVariant) {
            i.family = i.fontfamily;
            i.weight = i.fontweight;
            i.style = i.fontstyle;
          }
          if (this.styles) {
            if (!i.style && this.styles.fontStyle) {
              i.style = this.styles.fontStyle;
            }
            if (!i.weight && this.styles.fontWeight) {
              i.weight = this.styles.fontWeight;
            }
            if (!i.family && this.styles.fontFamily) {
              i.family = this.styles.fontFamily;
            }
          }
          if (i.family && !i.hasVariant) {
            if (!i.weight && i.mathvariant.match(/bold/)) {
              i.weight = "bold";
            }
            if (!i.style && i.mathvariant.match(/italic/)) {
              i.style = "italic";
            }
            j = {
              forceFamily: true,
              font: {"font-family": i.family}
            };
            if (i.style) {
              j.font["font-style"] = i.style;
            }
            if (i.weight) {
              j.font["font-weight"] = i.weight;
            }
            return j;
          }
          if (i.weight === "bold") {
            j = {
              normal: a.VARIANT.BOLD,
              italic: a.VARIANT.BOLDITALIC,
              fraktur: a.VARIANT.BOLDFRAKTUR,
              script: a.VARIANT.BOLDSCRIPT,
              "sans-serif": a.VARIANT.BOLDSANSSERIF,
              "sans-serif-italic": a.VARIANT.SANSSERIFBOLDITALIC
            }[j] || j;
          } else {
            if (i.weight === "normal") {
              j = {
                bold: a.VARIANT.normal,
                "bold-italic": a.VARIANT.ITALIC,
                "bold-fraktur": a.VARIANT.FRAKTUR,
                "bold-script": a.VARIANT.SCRIPT,
                "bold-sans-serif": a.VARIANT.SANSSERIF,
                "sans-serif-bold-italic": a.VARIANT.SANSSERIFITALIC
              }[j] || j;
            }
          }
          if (i.style === "italic") {
            j = {
              normal: a.VARIANT.ITALIC,
              bold: a.VARIANT.BOLDITALIC,
              "sans-serif": a.VARIANT.SANSSERIFITALIC,
              "bold-sans-serif": a.VARIANT.SANSSERIFBOLDITALIC
            }[j] || j;
          } else {
            if (i.style === "normal") {
              j = {
                italic: a.VARIANT.NORMAL,
                "bold-italic": a.VARIANT.BOLD,
                "sans-serif-italic": a.VARIANT.SANSSERIF,
                "sans-serif-bold-italic": a.VARIANT.BOLDSANSSERIF
              }[j] || j;
            }
          }
          if (!(j in h.FONTDATA.VARIANT)) {
            j = "normal";
          }
          return h.FONTDATA.VARIANT[j];
        },
        SVGgetScale: function(j) {
          var k = 1;
          if (this.mscale) {
            k = this.scale;
          } else {
            var i = this.getValues("scriptlevel", "fontsize");
            i.mathsize = (this.isToken ? this : this.Parent()).Get("mathsize");
            if ((this.styles || {}).fontSize && !i.fontsize) {
              i.fontsize = this.styles.fontSize;
            }
            if (i.fontsize && !this.mathsize) {
              i.mathsize = i.fontsize;
            }
            if (i.scriptlevel !== 0) {
              if (i.scriptlevel > 2) {
                i.scriptlevel = 2;
              }
              k = Math.pow(this.Get("scriptsizemultiplier"), i.scriptlevel);
              i.scriptminsize = h.length2em(this.Get("scriptminsize")) / 1000;
              if (k < i.scriptminsize) {
                k = i.scriptminsize;
              }
            }
            this.scale = k;
            this.mscale = h.length2em(i.mathsize) / 1000;
          }
          if (j) {
            j.scale = k;
            if (this.isToken) {
              j.scale *= this.mscale;
            }
          }
          return k * this.mscale;
        },
        SVGgetMu: function(k) {
          var i = 1,
              j = this.getValues("scriptlevel", "scriptsizemultiplier");
          if (k.scale && k.scale !== 1) {
            i = 1 / k.scale;
          }
          if (j.scriptlevel !== 0) {
            if (j.scriptlevel > 2) {
              j.scriptlevel = 2;
            }
            i = Math.sqrt(Math.pow(j.scriptsizemultiplier, j.scriptlevel));
          }
          return i;
        },
        SVGnotEmpty: function(i) {
          while (i) {
            if ((i.type !== "mrow" && i.type !== "texatom") || i.data.length > 1) {
              return true;
            }
            i = i.data[0];
          }
          return false;
        },
        SVGcanStretch: function(k) {
          var j = false;
          if (this.isEmbellished()) {
            var i = this.Core();
            if (i && i !== this) {
              j = i.SVGcanStretch(k);
              if (j && i.forceStretch) {
                this.forceStretch = true;
              }
            }
          }
          return j;
        },
        SVGstretchV: function(i, j) {
          return this.toSVG(i, j);
        },
        SVGstretchH: function(i) {
          return this.toSVG(i);
        },
        SVGlineBreaks: function() {
          return false;
        }
      }, {
        SVGemptySVG: function() {
          var i = this.SVG();
          i.Clean();
          this.SVGsaveData(i);
          return i;
        },
        SVGautoload: function() {
          var i = h.autoloadDir + "/" + this.type + ".js";
          c.RestartAfter(b.Require(i));
        },
        SVGautoloadFile: function(i) {
          var j = h.autoloadDir + "/" + i + ".js";
          c.RestartAfter(b.Require(j));
        }
      });
      a.chars.Augment({toSVG: function(j, m, i, k) {
          var l = this.data.join("").replace(/[\u2061-\u2064]/g, "");
          if (i) {
            l = i(l, k);
          }
          return this.SVGhandleVariant(j, m, l);
        }});
      a.entity.Augment({toSVG: function(j, m, i, k) {
          var l = this.toString().replace(/[\u2061-\u2064]/g, "");
          if (i) {
            l = i(l, k);
          }
          return this.SVGhandleVariant(j, m, l);
        }});
      a.mo.Augment({
        toSVG: function(k, j) {
          this.SVGgetStyles();
          var s = this.svg = this.SVG();
          var o = this.SVGgetScale(s);
          this.SVGhandleSpace(s);
          if (this.data.length == 0) {
            s.Clean();
            this.SVGsaveData(s);
            return s;
          }
          if (j != null) {
            return this.SVGstretchV(k, j);
          } else {
            if (k != null) {
              return this.SVG.strechH(k);
            }
          }
          var q = this.SVGgetVariant();
          var y = this.getValues("largeop", "displaystyle");
          if (y.largeop) {
            q = h.FONTDATA.VARIANT[y.displaystyle ? "-largeOp" : "-smallOp"];
          }
          var w = this.CoreParent(),
              p = (w && w.isa(a.msubsup) && this !== w.data[0]),
              l = (p ? this.remapChars : null);
          if (this.data.join("").length === 1 && w && w.isa(a.munderover) && this.CoreText(w.data[w.base]).length === 1) {
            var t = w.data[w.over],
                v = w.data[w.under];
            if (t && this === t.CoreMO() && w.Get("accent")) {
              l = h.FONTDATA.REMAPACCENT;
            } else {
              if (v && this === v.CoreMO() && w.Get("accentunder")) {
                l = h.FONTDATA.REMAPACCENTUNDER;
              }
            }
          }
          if (p && this.data.join("").match(/['`"\u00B4\u2032-\u2037\u2057]/)) {
            q = h.FONTDATA.VARIANT["-" + h.fontInUse + "-variant"];
          }
          for (var r = 0,
              n = this.data.length; r < n; r++) {
            if (this.data[r]) {
              var z = this.data[r].toSVG(q, o, this.remap, l),
                  u = s.w;
              if (u === 0 && -z.l > 10 * z.w) {
                u += -z.l;
              }
              s.Add(z, u, 0, true);
              if (z.skew) {
                s.skew = z.skew;
              }
            }
          }
          s.Clean();
          if (this.data.join("").length !== 1) {
            delete s.skew;
          }
          if (y.largeop) {
            s.y = h.TeX.axis_height - (s.h - s.d) / 2 / o;
            if (s.r > s.w) {
              s.ic = s.r - s.w;
              s.w = s.r;
            }
          }
          this.SVGhandleColor(s);
          this.SVGsaveData(s);
          return s;
        },
        SVGcanStretch: function(m) {
          if (!this.Get("stretchy")) {
            return false;
          }
          var n = this.data.join("");
          if (n.length > 1) {
            return false;
          }
          var j = this.CoreParent();
          if (j && j.isa(a.munderover) && this.CoreText(j.data[j.base]).length === 1) {
            var l = j.data[j.over],
                i = j.data[j.under];
            if (l && this === l.CoreMO() && j.Get("accent")) {
              n = h.FONTDATA.REMAPACCENT[n] || n;
            } else {
              if (i && this === i.CoreMO() && j.Get("accentunder")) {
                n = h.FONTDATA.REMAPACCENTUNDER[n] || n;
              }
            }
          }
          n = h.FONTDATA.DELIMITERS[n.charCodeAt(0)];
          var k = (n && n.dir == m.substr(0, 1));
          if (!k) {
            delete this.svg;
          }
          this.forceStretch = k && (this.Get("minsize", true) || this.Get("maxsize", true));
          return k;
        },
        SVGstretchV: function(n, o) {
          var k = this.svg || this.toSVG();
          var j = this.getValues("symmetric", "maxsize", "minsize");
          var m = h.TeX.axis_height * k.scale,
              i = this.SVGgetMu(k),
              l;
          if (j.symmetric) {
            l = 2 * Math.max(n - m, o + m);
          } else {
            l = n + o;
          }
          j.maxsize = h.length2em(j.maxsize, i, k.h + k.d);
          j.minsize = h.length2em(j.minsize, i, k.h + k.d);
          l = Math.max(j.minsize, Math.min(j.maxsize, l));
          if (l != j.minsize) {
            l = [Math.max(l * h.TeX.delimiterfactor / 1000, l - h.TeX.delimitershortfall), l];
          }
          k = h.createDelimiter(this.data.join("").charCodeAt(0), l, k.scale);
          if (j.symmetric) {
            l = (k.h + k.d) / 2 + m;
          } else {
            l = (k.h + k.d) * n / (n + o);
          }
          k.y = l - k.h;
          this.SVGhandleSpace(k);
          this.SVGhandleColor(k);
          delete this.svg.element;
          this.SVGsaveData(k);
          k.stretched = true;
          return k;
        },
        SVGstretchH: function(j) {
          var l = this.svg || this.toSVG(),
              i = this.SVGgetMu(l);
          var k = this.getValues("maxsize", "minsize", "mathvariant", "fontweight");
          if ((k.fontweight === "bold" || parseInt(k.fontweight) >= 600) && !this.Get("mathvariant", true)) {
            k.mathvariant = a.VARIANT.BOLD;
          }
          k.maxsize = h.length2em(k.maxsize, i, l.w);
          k.minsize = h.length2em(k.minsize, i, l.w);
          j = Math.max(k.minsize, Math.min(k.maxsize, j));
          l = h.createDelimiter(this.data.join("").charCodeAt(0), j, l.scale, k.mathvariant);
          this.SVGhandleSpace(l);
          this.SVGhandleColor(l);
          delete this.svg.element;
          this.SVGsaveData(l);
          l.stretched = true;
          return l;
        }
      });
      a.mtext.Augment({toSVG: function() {
          if (h.config.mtextFontInherit || this.Parent().type === "merror") {
            this.SVGgetStyles();
            var i = this.SVG(),
                l = this.SVGgetScale(i);
            this.SVGhandleSpace(i);
            var j = this.SVGgetVariant(),
                k = {direction: this.Get("dir")};
            if (j.bold) {
              k["font-weight"] = "bold";
            }
            if (j.italic) {
              k["font-style"] = "italic";
            }
            j = this.Get("mathvariant");
            if (j === "monospace") {
              k["class"] = "MJX-monospace";
            } else {
              if (j.match(/sans-serif/)) {
                k["class"] = "MJX-sans-serif";
              }
            }
            i.Add(d.TEXT(l * 100 / h.config.scale, this.data.join(""), k));
            i.Clean();
            this.SVGhandleColor(i);
            this.SVGsaveData(i);
            return i;
          } else {
            return this.SUPER(arguments).toSVG.call(this);
          }
        }});
      a.merror.Augment({
        toSVG: function(l, j) {
          this.SVGgetStyles();
          var q = this.SVG(),
              o = h.length2em(this.styles.fontSize || 1) / 1000;
          this.SVGhandleSpace(q);
          var k = (o !== 1 ? {transform: "scale(" + h.Fixed(o) + ")"} : {});
          var s = d(k);
          s.Add(this.SVGchildSVG(0));
          s.Clean();
          if (o !== 1) {
            s.removeable = false;
            var r = ["w", "h", "d", "l", "r", "D", "H"];
            for (var p = 0,
                n = r.length; p < n; p++) {
              s[r[p]] *= o;
            }
          }
          q.Add(s);
          q.Clean();
          this.SVGhandleColor(q);
          this.SVGsaveData(q);
          return q;
        },
        SVGgetStyles: function() {
          var i = g.Element("span", {style: h.config.merrorStyle});
          this.styles = this.SVGprocessStyles(i.style);
          if (this.style) {
            i.style.cssText = this.style;
            c.Insert(this.styles, this.SVGprocessStyles(i.style));
          }
        }
      });
      a.ms.Augment({toSVG: a.mbase.SVGautoload});
      a.mglyph.Augment({toSVG: a.mbase.SVGautoload});
      a.mspace.Augment({toSVG: function() {
          this.SVGgetStyles();
          var k = this.getValues("height", "depth", "width");
          k.mathbackground = this.mathbackground;
          if (this.background && !this.mathbackground) {
            k.mathbackground = this.background;
          }
          var j = this.SVG();
          this.SVGgetScale(j);
          var l = this.mscale,
              i = this.SVGgetMu(j);
          j.h = h.length2em(k.height, i) * l;
          j.d = h.length2em(k.depth, i) * l;
          j.w = j.r = h.length2em(k.width, i) * l;
          if (j.w < 0) {
            j.x = j.w;
            j.w = j.r = 0;
          }
          if (j.h < -j.d) {
            j.d = -j.h;
          }
          j.l = 0;
          j.Clean();
          this.SVGhandleColor(j);
          this.SVGsaveData(j);
          return j;
        }});
      a.mphantom.Augment({toSVG: function(i, k) {
          this.SVGgetStyles();
          var j = this.SVG();
          this.SVGgetScale(j);
          if (this.data[0] != null) {
            this.SVGhandleSpace(j);
            j.Add(this.SVGdataStretched(0, i, k));
            j.Clean();
            while (j.element.firstChild) {
              j.element.removeChild(j.element.firstChild);
            }
          }
          this.SVGhandleColor(j);
          this.SVGsaveData(j);
          if (j.removeable && !j.element.firstChild) {
            delete j.element;
          }
          return j;
        }});
      a.mpadded.Augment({
        toSVG: function(l, i) {
          this.SVGgetStyles();
          var o = this.SVG();
          if (this.data[0] != null) {
            this.SVGgetScale(o);
            this.SVGhandleSpace(o);
            var m = this.SVGdataStretched(0, l, i),
                t = this.SVGgetMu(o);
            var s = this.getValues("height", "depth", "width", "lspace", "voffset"),
                k = 0,
                j = 0;
            if (s.lspace) {
              k = this.SVGlength2em(m, s.lspace, t);
            }
            if (s.voffset) {
              j = this.SVGlength2em(m, s.voffset, t);
            }
            var n = m.h,
                p = m.d,
                r = m.w,
                q = m.y;
            o.Add(m, k, j);
            o.Clean();
            o.h = n + q;
            o.d = p - q;
            o.w = r;
            o.removeable = false;
            if (s.height !== "") {
              o.h = this.SVGlength2em(o, s.height, t, "h", 0);
            }
            if (s.depth !== "") {
              o.d = this.SVGlength2em(o, s.depth, t, "d", 0);
            }
            if (s.width !== "") {
              o.w = this.SVGlength2em(o, s.width, t, "w", 0);
            }
            if (o.h > o.H) {
              o.H = o.h;
            }
            if (o.d > o.D) {
              o.D = o.d;
            }
          }
          this.SVGhandleColor(o);
          this.SVGsaveData(o);
          return o;
        },
        SVGlength2em: function(l, p, j, q, i) {
          if (i == null) {
            i = -h.BIGDIMEN;
          }
          var n = String(p).match(/width|height|depth/);
          var o = (n ? l[n[0].charAt(0)] : (q ? l[q] : 0));
          var k = h.length2em(p, j, o / this.mscale) * this.mscale;
          if (q && String(p).match(/^\s*[-+]/)) {
            return Math.max(i, l[q] + k);
          } else {
            return k;
          }
        }
      });
      a.mrow.Augment({
        SVG: d.ROW,
        toSVG: function(n, p) {
          this.SVGgetStyles();
          var k = this.SVG();
          this.SVGhandleSpace(k);
          if (p != null) {
            k.sh = n;
            k.sd = p;
          }
          for (var l = 0,
              j = this.data.length; l < j; l++) {
            if (this.data[l]) {
              k.Check(this.data[l]);
            }
          }
          k.Stretch();
          k.Clean();
          if (this.data.length === 1 && this.data[0]) {
            var o = this.data[0].SVGdata;
            if (o.skew) {
              k.skew = o.skew;
            }
          }
          if (this.SVGlineBreaks(k)) {
            k = this.SVGmultiline(k);
          }
          this.SVGhandleColor(k);
          this.SVGsaveData(k);
          return k;
        },
        SVGlineBreaks: function(i) {
          if (!this.parent.linebreakContainer) {
            return false;
          }
          return (h.config.linebreaks.automatic && i.w > h.linebreakWidth) || this.hasNewline();
        },
        SVGmultiline: function(i) {
          a.mbase.SVGautoloadFile("multiline");
        },
        SVGstretchH: function(k) {
          var l = this.SVG();
          this.SVGhandleSpace(l);
          for (var n = 0,
              j = this.data.length; n < j; n++) {
            l.Add(this.SVGdataStretched(n, k), l.w, 0);
          }
          l.Clean();
          this.SVGhandleColor(l);
          this.SVGsaveData(l);
          return l;
        }
      });
      a.mstyle.Augment({
        toSVG: function() {
          this.SVGgetStyles();
          var i = this.SVG();
          if (this.data[0] != null) {
            this.SVGhandleSpace(i);
            var j = i.Add(this.data[0].toSVG());
            i.Clean();
            if (j.ic) {
              i.ic = j.ic;
            }
            this.SVGhandleColor(i);
          }
          this.SVGsaveData(i);
          return i;
        },
        SVGstretchH: function(i) {
          return (this.data[0] != null ? this.data[0].SVGstretchH(i) : d.NULL());
        },
        SVGstretchV: function(i, j) {
          return (this.data[0] != null ? this.data[0].SVGstretchV(i, j) : d.NULL());
        }
      });
      a.mfrac.Augment({
        toSVG: function() {
          this.SVGgetStyles();
          var w = this.SVG(),
              E = this.SVGgetScale(w);
          var k = d();
          k.scale = w.scale;
          this.SVGhandleSpace(k);
          var m = this.SVGchildSVG(0),
              l = this.SVGchildSVG(1);
          var i = this.getValues("displaystyle", "linethickness", "numalign", "denomalign", "bevelled");
          var A = i.displaystyle;
          var D = h.TeX.axis_height * E;
          if (i.bevelled) {
            var C = (A ? 400 : 150);
            var n = Math.max(m.h + m.d, l.h + l.d) + 2 * C;
            var B = h.createDelimiter(47, n);
            k.Add(m, 0, (m.d - m.h) / 2 + D + C);
            k.Add(B, m.w - C / 2, (B.d - B.h) / 2 + D);
            k.Add(l, m.w + B.w - C, (l.d - l.h) / 2 + D - C);
          } else {
            var j = Math.max(m.w, l.w);
            var s = h.thickness2em(i.linethickness, this.scale) * this.mscale,
                y,
                x,
                r,
                o;
            var z = h.TeX.min_rule_thickness / h.em * 1000;
            if (A) {
              r = h.TeX.num1;
              o = h.TeX.denom1;
            } else {
              r = (s === 0 ? h.TeX.num3 : h.TeX.num2);
              o = h.TeX.denom2;
            }
            r *= E;
            o *= E;
            if (s === 0) {
              y = Math.max((A ? 7 : 3) * h.TeX.rule_thickness, 2 * z);
              x = (r - m.d) - (l.h - o);
              if (x < y) {
                r += (y - x) / 2;
                o += (y - x) / 2;
              }
              k.w = j;
              s = 0;
            } else {
              y = Math.max((A ? 2 : 0) * z + s, s / 2 + 1.5 * z);
              x = (r - m.d) - (D + s / 2);
              if (x < y) {
                r += y - x;
              }
              x = (D - s / 2) - (l.h - o);
              if (x < y) {
                o += y - x;
              }
              k.Add(d.RECT(s / 2, s / 2, j + 2 * s), 0, D);
            }
            k.Align(m, i.numalign, s, r);
            k.Align(l, i.denomalign, s, -o);
          }
          k.Clean();
          w.Add(k, 0, 0);
          w.Clean();
          this.SVGhandleColor(w);
          this.SVGsaveData(w);
          return w;
        },
        SVGcanStretch: function(i) {
          return false;
        },
        SVGhandleSpace: function(i) {
          if (!this.texWithDelims && !this.useMMLspacing) {
            i.x = i.X = h.TeX.nulldelimiterspace * this.mscale;
          }
          this.SUPER(arguments).SVGhandleSpace.call(this, i);
        }
      });
      a.msqrt.Augment({
        toSVG: function() {
          this.SVGgetStyles();
          var n = this.SVG(),
              l = this.SVGgetScale(n);
          this.SVGhandleSpace(n);
          var k = this.SVGchildSVG(0),
              o,
              m;
          var u = h.TeX.rule_thickness * l,
              j,
              i,
              s,
              r = 0;
          if (this.Get("displaystyle")) {
            j = h.TeX.x_height * l;
          } else {
            j = u;
          }
          i = Math.max(u + j / 4, 1000 * h.TeX.min_root_space / h.em);
          s = k.h + k.d + i + u;
          m = h.createDelimiter(8730, s, l);
          if (m.h + m.d > s) {
            i = ((m.h + m.d) - (s - u)) / 2;
          }
          o = d.RECT(u, 0, k.w);
          s = k.h + i + u;
          r = this.SVGaddRoot(n, m, r, m.h + m.d - s, l);
          n.Add(m, r, s - m.h);
          n.Add(o, r + m.w, s - o.h);
          n.Add(k, r + m.w, 0);
          n.Clean();
          n.h += u;
          n.H += u;
          this.SVGhandleColor(n);
          this.SVGsaveData(n);
          return n;
        },
        SVGaddRoot: function(j, k, i, m, l) {
          return i;
        }
      });
      a.mroot.Augment({
        toSVG: a.msqrt.prototype.toSVG,
        SVGaddRoot: function(l, j, o, m, i) {
          var q = (j.isMultiChar ? 0.55 : 0.65) * j.w;
          if (this.data[1]) {
            var n = this.data[1].toSVG();
            n.x = 0;
            var k = this.SVGrootHeight(j.h + j.d, i, n) - m;
            var p = Math.min(n.w, n.r);
            o = Math.max(p, q);
            l.Add(n, o - p, k);
          } else {
            q = o;
          }
          return o - q;
        },
        SVGrootHeight: function(k, j, i) {
          return 0.45 * (k - 900 * j) + 600 * j + Math.max(0, i.d - 75);
        }
      });
      a.mfenced.Augment({
        SVG: d.ROW,
        toSVG: function() {
          this.SVGgetStyles();
          var k = this.SVG();
          this.SVGhandleSpace(k);
          if (this.data.open) {
            k.Check(this.data.open);
          }
          if (this.data[0] != null) {
            k.Check(this.data[0]);
          }
          for (var l = 1,
              j = this.data.length; l < j; l++) {
            if (this.data[l]) {
              if (this.data["sep" + l]) {
                k.Check(this.data["sep" + l]);
              }
              k.Check(this.data[l]);
            }
          }
          if (this.data.close) {
            k.Check(this.data.close);
          }
          k.Stretch();
          k.Clean();
          this.SVGhandleColor(k);
          this.SVGsaveData(k);
          return k;
        }
      });
      a.menclose.Augment({toSVG: a.mbase.SVGautoload});
      a.maction.Augment({toSVG: a.mbase.SVGautoload});
      a.semantics.Augment({
        toSVG: function() {
          this.SVGgetStyles();
          var i = this.SVG();
          if (this.data[0] != null) {
            this.SVGhandleSpace(i);
            i.Add(this.data[0].toSVG());
            i.Clean();
          } else {
            i.Clean();
          }
          this.SVGsaveData(i);
          return i;
        },
        SVGstretchH: function(i) {
          return (this.data[0] != null ? this.data[0].SVGstretchH(i) : d.NULL());
        },
        SVGstretchV: function(i, j) {
          return (this.data[0] != null ? this.data[0].SVGstretchV(i, j) : d.NULL());
        }
      });
      a.munderover.Augment({toSVG: function(E, B) {
          this.SVGgetStyles();
          var j = this.getValues("displaystyle", "accent", "accentunder", "align");
          var n = this.data[this.base];
          if (!j.displaystyle && n != null && (n.movablelimits || n.CoreMO().Get("movablelimits"))) {
            return a.msubsup.prototype.toSVG.call(this);
          }
          var C = this.SVG(),
              L = this.SVGgetScale(C);
          this.SVGhandleSpace(C);
          var o = [],
              J = [],
              s,
              I,
              F,
              l = -h.BIGDIMEN,
              H = l;
          for (I = 0, F = this.data.length; I < F; I++) {
            if (this.data[I] != null) {
              if (I == this.base) {
                o[I] = this.SVGdataStretched(I, E, B);
                J[I] = (B != null || E == null) && this.data[I].SVGcanStretch("Horizontal");
              } else {
                o[I] = this.data[I].toSVG();
                o[I].x = 0;
                delete o[I].X;
                J[I] = this.data[I].SVGcanStretch("Horizontal");
              }
              if (o[I].w > H) {
                H = o[I].w;
              }
              if (!J[I] && H > l) {
                l = H;
              }
            }
          }
          if (B == null && E != null) {
            l = E;
          } else {
            if (l == -h.BIGDIMEN) {
              l = H;
            }
          }
          for (I = H = 0, F = this.data.length; I < F; I++) {
            if (this.data[I]) {
              if (J[I]) {
                o[I] = this.data[I].SVGstretchH(l);
                if (I !== this.base) {
                  o[I].x = 0;
                  delete o[I].X;
                }
              }
              if (o[I].w > H) {
                H = o[I].w;
              }
            }
          }
          var A = h.TeX.rule_thickness * this.mscale;
          var r,
              p,
              v,
              u,
              q,
              z,
              G,
              K = 0;
          n = o[this.base] || {
            w: 0,
            h: 0,
            d: 0,
            H: 0,
            D: 0,
            l: 0,
            r: 0,
            y: 0,
            scale: L
          };
          if (n.ic) {
            K = 1.3 * n.ic + 0.05;
          }
          for (I = 0, F = this.data.length; I < F; I++) {
            if (this.data[I] != null) {
              s = o[I];
              q = h.TeX.big_op_spacing5 * L;
              var w = (I != this.base && j[this.ACCENTS[I]]);
              if (w && s.w <= 1) {
                s.x = -s.l;
                o[I] = d.G().With({removeable: false});
                o[I].Add(s);
                o[I].Clean();
                o[I].w = -s.l;
                s = o[I];
              }
              z = {
                left: 0,
                center: (H - s.w) / 2,
                right: H - s.w
              }[j.align];
              r = z;
              p = 0;
              if (I == this.over) {
                if (w) {
                  G = A * L;
                  q = 0;
                  if (n.skew) {
                    r += n.skew;
                    C.skew = n.skew;
                    if (r + s.w > H) {
                      C.skew += (H - s.w - r) / 2;
                    }
                  }
                } else {
                  v = h.TeX.big_op_spacing1 * L;
                  u = h.TeX.big_op_spacing3 * L;
                  G = Math.max(v, u - Math.max(0, s.d));
                }
                G = Math.max(G, 1500 / h.em);
                r += K / 2;
                p = n.y + n.h + s.d + G;
                s.h += q;
                if (s.h > s.H) {
                  s.H = s.h;
                }
              } else {
                if (I == this.under) {
                  if (w) {
                    G = 3 * A * L;
                    q = 0;
                  } else {
                    v = h.TeX.big_op_spacing2 * L;
                    u = h.TeX.big_op_spacing4 * L;
                    G = Math.max(v, u - s.h);
                  }
                  G = Math.max(G, 1500 / h.em);
                  r -= K / 2;
                  p = n.y - (n.d + s.h + G);
                  s.d += q;
                  if (s.d > s.D) {
                    s.D = s.d;
                  }
                }
              }
              C.Add(s, r, p);
            }
          }
          C.Clean();
          this.SVGhandleColor(C);
          this.SVGsaveData(C);
          return C;
        }});
      a.msubsup.Augment({toSVG: function(G, z) {
          this.SVGgetStyles();
          var B = this.SVG(),
              K = this.SVGgetScale(B);
          this.SVGhandleSpace(B);
          var E = this.SVGgetMu(B);
          var k = B.Add(this.SVGdataStretched(this.base, G, z));
          var j = (this.data[this.sup] || this.data[this.sub] || this).SVGgetScale();
          var I = h.TeX.x_height * K,
              y = h.TeX.scriptspace * K;
          var i,
              l;
          if (this.SVGnotEmpty(this.data[this.sup])) {
            i = this.data[this.sup].toSVG();
            i.w += y;
            i.r = Math.max(i.w, i.r);
          }
          if (this.SVGnotEmpty(this.data[this.sub])) {
            l = this.data[this.sub].toSVG();
            l.w += y;
            l.r = Math.max(l.w, l.r);
          }
          var C = h.TeX.sup_drop * j,
              A = h.TeX.sub_drop * j;
          var o = k.h + (k.y || 0) - C,
              n = k.d - (k.y || 0) + A,
              J = 0,
              F;
          if (k.ic) {
            k.w -= k.ic;
            J = 1.3 * k.ic + 0.05;
          }
          if (this.data[this.base] && (this.data[this.base].type === "mi" || this.data[this.base].type === "mo")) {
            if (this.data[this.base].data.join("").length === 1 && k.scale === 1 && !k.stretched && !this.data[this.base].Get("largeop")) {
              o = n = 0;
            }
          }
          var H = this.getValues("subscriptshift", "superscriptshift");
          H.subscriptshift = (H.subscriptshift === "" ? 0 : h.length2em(H.subscriptshift, E));
          H.superscriptshift = (H.superscriptshift === "" ? 0 : h.length2em(H.superscriptshift, E));
          var m = k.w + k.x;
          if (!i) {
            if (l) {
              n = Math.max(n, h.TeX.sub1 * K, l.h - (4 / 5) * I, H.subscriptshift);
              B.Add(l, m, -n);
              this.data[this.sub].SVGdata.dy = -n;
            }
          } else {
            if (!l) {
              values = this.getValues("displaystyle", "texprimestyle");
              F = h.TeX[(values.displaystyle ? "sup1" : (values.texprimestyle ? "sup3" : "sup2"))];
              o = Math.max(o, F * K, i.d + (1 / 4) * I, H.superscriptshift);
              B.Add(i, m + J, o);
              this.data[this.sup].SVGdata.dx = J;
              this.data[this.sup].SVGdata.dy = o;
            } else {
              n = Math.max(n, h.TeX.sub2 * K);
              var w = h.TeX.rule_thickness * K;
              if ((o - i.d) - (l.h - n) < 3 * w) {
                n = 3 * w - o + i.d + l.h;
                C = (4 / 5) * I - (o - i.d);
                if (C > 0) {
                  o += C;
                  n -= C;
                }
              }
              B.Add(i, m + J, Math.max(o, H.superscriptshift));
              B.Add(l, m, -Math.max(n, H.subscriptshift));
              this.data[this.sup].SVGdata.dx = J;
              this.data[this.sup].SVGdata.dy = Math.max(o, H.superscriptshift);
              this.data[this.sub].SVGdata.dy = -Math.max(n, H.subscriptshift);
            }
          }
          B.Clean();
          this.SVGhandleColor(B);
          this.SVGsaveData(B);
          return B;
        }});
      a.mmultiscripts.Augment({toSVG: a.mbase.SVGautoload});
      a.mtable.Augment({toSVG: a.mbase.SVGautoload});
      a["annotation-xml"].Augment({toSVG: a.mbase.SVGautoload});
      a.math.Augment({
        SVG: d.Subclass({
          type: "svg",
          removeable: false
        }),
        toSVG: function(v, k) {
          var y = h.config;
          if (this.data[0]) {
            this.SVGgetStyles();
            a.mbase.prototype.displayAlign = c.config.displayAlign;
            a.mbase.prototype.displayIndent = c.config.displayIndent;
            if (String(c.config.displayIndent).match(/^0($|[a-z%])/i)) {
              a.mbase.prototype.displayIndent = "0";
            }
            var q = d.G();
            q.Add(this.data[0].toSVG(), 0, 0, true);
            q.Clean();
            this.SVGhandleColor(q);
            h.Element(q.element, {
              stroke: "currentColor",
              fill: "currentColor",
              "stroke-width": 0,
              transform: "matrix(1 0 0 -1 0 0)"
            });
            q.removeable = false;
            var s = this.SVG();
            s.element.setAttribute("xmlns:xlink", f);
            if (y.useFontCache && !y.useGlobalCache) {
              s.element.appendChild(d.GLYPH.defs);
            }
            s.Add(q);
            s.Clean();
            this.SVGsaveData(s);
            if (!v) {
              s.element = s.element.firstChild;
              s.element.removeAttribute("transform");
              s.removable = true;
              return s;
            }
            var p = Math.max(-s.l, 0),
                j = Math.max(s.r - s.w, 0);
            var m = s.element.style,
                u = h.TeX.x_height / h.ex;
            var x = (Math.ceil(s.H / u) + 1) * u + h.HFUZZ,
                i = (Math.ceil(s.D / u) + 1) * u + h.DFUZZ;
            s.element.setAttribute("width", h.Ex(p + s.w + j));
            s.element.setAttribute("height", h.Ex(x + i));
            m.verticalAlign = h.Ex(-i);
            if (p) {
              m.marginLeft = h.Ex(-p);
            }
            if (j) {
              m.marginRight = h.Ex(-j);
            }
            s.element.setAttribute("viewBox", h.Fixed(-p, 1) + " " + h.Fixed(-x, 1) + " " + h.Fixed(p + s.w + j, 1) + " " + h.Fixed(x + i, 1));
            if (s.H > s.h) {
              m.marginTop = h.Ex(s.h - x);
            }
            if (s.D > s.d) {
              m.marginBottom = h.Ex(s.d - i);
              m.verticalAlign = h.Ex(-s.d);
            }
            var t = this.Get("alttext");
            if (t && !s.element.getAttribute("aria-label")) {
              s.element.setAttribute("aria-label", t);
            }
            if (!s.element.getAttribute("role")) {
              s.element.setAttribute("role", "img");
            }
            s.element.setAttribute("focusable", "false");
            v.appendChild(s.element);
            s.element = null;
            if (!this.isMultiline && this.Get("display") === "block" && !s.hasIndent) {
              var w = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
              if (w.indentalignfirst !== a.INDENTALIGN.INDENTALIGN) {
                w.indentalign = w.indentalignfirst;
              }
              if (w.indentalign === a.INDENTALIGN.AUTO) {
                w.indentalign = this.displayAlign;
              }
              if (w.indentshiftfirst !== a.INDENTSHIFT.INDENTSHIFT) {
                w.indentshift = w.indentshiftfirst;
              }
              if (w.indentshift === "auto") {
                w.indentshift = "0";
              }
              var n = h.length2em(w.indentshift, 1, h.cwidth);
              if (this.displayIndent !== "0") {
                var o = h.length2em(this.displayIndent, 1, h.cwidth);
                n += (w.indentalign === a.INDENTALIGN.RIGHT ? -o : o);
              }
              k.style.textAlign = w.indentalign;
              if (n) {
                c.Insert(m, ({
                  left: {marginLeft: h.Ex(n)},
                  right: {
                    marginRight: h.Ex(-n),
                    marginLeft: h.Ex(Math.max(0, n - (p + s.w + j)))
                  },
                  center: {
                    marginLeft: h.Ex(n),
                    marginRight: h.Ex(-n)
                  }
                })[w.indentalign]);
              }
            }
          }
          return v;
        }
      });
      a.TeXAtom.Augment({toSVG: function(i, l) {
          this.SVGgetStyles();
          var j = this.SVG();
          this.SVGhandleSpace(j);
          if (this.data[0] != null) {
            var k = this.SVGdataStretched(0, i, l),
                m = 0;
            if (this.texClass === a.TEXCLASS.VCENTER) {
              m = h.TeX.axis_height - (k.h + k.d) / 2 + k.d;
            }
            j.Add(k, 0, m);
            j.ic = k.ic;
            j.skew = k.skew;
          }
          this.SVGhandleColor(j);
          this.SVGsaveData(j);
          return j;
        }});
      a.maligngroup.Augment({toSVG: a.mbase.SVGemptySVG});
      a.malignmark.Augment({toSVG: a.mbase.SVGemptySVG});
      a.mprescripts.Augment({toSVG: a.mbase.SVGemptySVG});
      a.none.Augment({toSVG: a.mbase.SVGemptySVG});
      c.Register.StartupHook("onLoad", function() {
        setTimeout(MathJax.Callback(["loadComplete", h, "jax.js"]), 0);
      });
    });
    c.Browser.Select({Opera: function(i) {
        h.Augment({operaZoomRefresh: true});
      }});
    c.Register.StartupHook("End Cookie", function() {
      if (c.config.menuSettings.zoom !== "None") {
        b.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
    if (!document.createElementNS) {
      if (!document.namespaces.svg) {
        document.namespaces.add("svg", e);
      }
      h.Augment({Element: function(i, j) {
          var k = (typeof(i) === "string" ? document.createElement("svg:" + i) : i);
          k.isMathJax = true;
          if (j) {
            for (var l in j) {
              if (j.hasOwnProperty(l)) {
                k.setAttribute(l, j[l].toString());
              }
            }
          }
          return k;
        }});
    }
  })(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.SVG);
  MathJax.Hub.Register.StartupHook("SVG Jax Ready", function() {
    var c = "2.6.0";
    var a = MathJax.ElementJax.mml,
        d = MathJax.OutputJax.SVG,
        b = d.BBOX;
    a.mtable.Augment({
      toSVG: function(aa) {
        this.SVGgetStyles();
        var o = this.SVG(),
            ap = this.SVGgetScale(o);
        if (this.data.length === 0) {
          this.SVGsaveData(o);
          return o;
        }
        var aN = this.getValues("columnalign", "rowalign", "columnspacing", "rowspacing", "columnwidth", "equalcolumns", "equalrows", "columnlines", "rowlines", "frame", "framespacing", "align", "useHeight", "width", "side", "minlabelspacing");
        if (aN.width.match(/%$/)) {
          o.width = aN.width = d.Em((d.cwidth / 1000) * (parseFloat(aN.width) / 100));
        }
        var v = this.SVGgetMu(o);
        var aK = -1;
        var z = [],
            I = [],
            k = [],
            O = [],
            K = [],
            aI,
            aG,
            w = -1,
            aE,
            u,
            az,
            S,
            an,
            E,
            aA;
        var ac = d.FONTDATA.lineH * ap * aN.useHeight,
            ag = d.FONTDATA.lineD * ap * aN.useHeight;
        for (aI = 0, aE = this.data.length; aI < aE; aI++) {
          S = this.data[aI];
          az = (S.type === "mlabeledtr" ? aK : 0);
          O[aI] = [];
          z[aI] = ac;
          I[aI] = ag;
          for (aG = az, u = S.data.length + az; aG < u; aG++) {
            if (k[aG] == null) {
              if (aG > w) {
                w = aG;
              }
              K[aG] = b.G();
              k[aG] = -d.BIGDIMEN;
            }
            an = S.data[aG - az];
            O[aI][aG] = an.toSVG();
            if (an.isEmbellished()) {
              E = an.CoreMO();
              var aM = E.Get("minsize", true);
              if (aM) {
                if (E.SVGcanStretch("Vertical")) {
                  aA = E.SVGdata.h + E.SVGdata.d;
                  if (aA) {
                    aM = d.length2em(aM, v, aA);
                    if (aM * E.SVGdata.h / aA > z[aI]) {
                      z[aI] = aM * E.SVGdata.h / aA;
                    }
                    if (aM * E.SVGdata.d / aA > I[aI]) {
                      I[aI] = aM * E.SVGdata.d / aA;
                    }
                  }
                } else {
                  if (E.SVGcanStretch("Horizontal")) {
                    aM = d.length2em(aM, v, E.SVGdata.w);
                    if (aM > k[aG]) {
                      k[aG] = aM;
                    }
                  }
                }
              }
            }
            if (O[aI][aG].h > z[aI]) {
              z[aI] = O[aI][aG].h;
            }
            if (O[aI][aG].d > I[aI]) {
              I[aI] = O[aI][aG].d;
            }
            if (O[aI][aG].w > k[aG]) {
              k[aG] = O[aI][aG].w;
            }
          }
        }
        var ao = MathJax.Hub.SplitList;
        var am = ao(aN.columnspacing),
            T = ao(aN.rowspacing),
            ai = ao(aN.columnalign),
            L = ao(aN.rowalign),
            N = ao(aN.columnlines),
            h = ao(aN.rowlines),
            ar = ao(aN.columnwidth),
            aw = [];
        for (aI = 0, aE = am.length; aI < aE; aI++) {
          am[aI] = d.length2em(am[aI], v);
        }
        for (aI = 0, aE = T.length; aI < aE; aI++) {
          T[aI] = d.length2em(T[aI], v);
        }
        while (am.length < w) {
          am.push(am[am.length - 1]);
        }
        while (ai.length <= w) {
          ai.push(ai[ai.length - 1]);
        }
        while (N.length < w) {
          N.push(N[N.length - 1]);
        }
        while (ar.length <= w) {
          ar.push(ar[ar.length - 1]);
        }
        while (T.length < O.length) {
          T.push(T[T.length - 1]);
        }
        while (L.length <= O.length) {
          L.push(L[L.length - 1]);
        }
        while (h.length < O.length) {
          h.push(h[h.length - 1]);
        }
        if (K[aK]) {
          ai[aK] = (aN.side.substr(0, 1) === "l" ? "left" : "right");
          am[aK] = -k[aK];
        }
        for (aI = 0, aE = O.length; aI < aE; aI++) {
          S = this.data[aI];
          aw[aI] = [];
          if (S.rowalign) {
            L[aI] = S.rowalign;
          }
          if (S.columnalign) {
            aw[aI] = ao(S.columnalign);
            while (aw[aI].length <= w) {
              aw[aI].push(aw[aI][aw[aI].length - 1]);
            }
          }
        }
        if (aN.equalrows) {
          var U = Math.max.apply(Math, z),
              aq = Math.max.apply(Math, I);
          for (aI = 0, aE = O.length; aI < aE; aI++) {
            az = ((U + aq) - (z[aI] + I[aI])) / 2;
            z[aI] += az;
            I[aI] += az;
          }
        }
        aA = z[0] + I[O.length - 1];
        for (aI = 0, aE = O.length - 1; aI < aE; aI++) {
          aA += Math.max(0, I[aI] + z[aI + 1] + T[aI]);
        }
        var ae = 0,
            ab = 0,
            aB,
            aL = aA;
        if (aN.frame !== "none" || (aN.columnlines + aN.rowlines).match(/solid|dashed/)) {
          var t = ao(aN.framespacing);
          if (t.length != 2) {
            t = ao(this.defaults.framespacing);
          }
          ae = d.length2em(t[0], v);
          ab = d.length2em(t[1], v);
          aL = aA + 2 * ab;
        }
        var g,
            ay,
            aD = "";
        if (typeof(aN.align) !== "string") {
          aN.align = String(aN.align);
        }
        if (aN.align.match(/(top|bottom|center|baseline|axis)( +(-?\d+))?/)) {
          aD = RegExp.$3 || "";
          aN.align = RegExp.$1;
        } else {
          aN.align = this.defaults.align;
        }
        if (aD !== "") {
          aD = parseInt(aD);
          if (aD < 0) {
            aD = O.length + 1 + aD;
          }
          if (aD < 1) {
            aD = 1;
          } else {
            if (aD > O.length) {
              aD = O.length;
            }
          }
          g = 0;
          ay = -(aA + ab) + z[0];
          for (aI = 0, aE = aD - 1; aI < aE; aI++) {
            var Z = Math.max(0, I[aI] + z[aI + 1] + T[aI]);
            g += Z;
            ay += Z;
          }
        } else {
          g = ({
            top: -(z[0] + ab),
            bottom: aA + ab - z[0],
            center: aA / 2 - z[0],
            baseline: aA / 2 - z[0],
            axis: aA / 2 + d.TeX.axis_height * ap - z[0]
          })[aN.align];
          ay = ({
            top: -(aA + 2 * ab),
            bottom: 0,
            center: -(aA / 2 + ab),
            baseline: -(aA / 2 + ab),
            axis: d.TeX.axis_height * ap - aA / 2 - ab
          })[aN.align];
        }
        var at,
            ax = 0,
            V = 0,
            X = 0,
            aC = 0,
            aJ = 0,
            r = [],
            B = [],
            aj = 1;
        if (aN.equalcolumns && aN.width !== "auto") {
          at = d.length2em(aN.width, v);
          for (aI = 0, aE = Math.min(w, am.length); aI < aE; aI++) {
            at -= am[aI];
          }
          at /= w;
          for (aI = 0, aE = Math.min(w + 1, ar.length); aI < aE; aI++) {
            k[aI] = at;
          }
        } else {
          for (aI = 0, aE = Math.min(w + 1, ar.length); aI < aE; aI++) {
            if (ar[aI] === "auto") {
              V += k[aI];
            } else {
              if (ar[aI] === "fit") {
                B[aJ] = aI;
                aJ++;
                V += k[aI];
              } else {
                if (ar[aI].match(/%$/)) {
                  r[aC] = aI;
                  aC++;
                  X += k[aI];
                  ax += d.length2em(ar[aI], v, 1);
                } else {
                  k[aI] = d.length2em(ar[aI], v);
                  V += k[aI];
                }
              }
            }
          }
          if (aN.width === "auto") {
            if (ax > 0.98) {
              aj = X / (V + X);
              at = V + X;
            } else {
              at = V / (1 - ax);
            }
          } else {
            at = d.length2em(aN.width, v);
            for (aI = 0, aE = Math.min(w, am.length); aI < aE; aI++) {
              at -= am[aI];
            }
          }
          for (aI = 0, aE = r.length; aI < aE; aI++) {
            k[r[aI]] = d.length2em(ar[r[aI]], v, at * aj);
            V += k[r[aI]];
          }
          if (Math.abs(at - V) > 0.01) {
            if (aJ && at > V) {
              at = (at - V) / aJ;
              for (aI = 0, aE = B.length; aI < aE; aI++) {
                k[B[aI]] += at;
              }
            } else {
              at = at / V;
              for (aG = 0; aG <= w; aG++) {
                k[aG] *= at;
              }
            }
          }
          if (aN.equalcolumns) {
            var af = Math.max.apply(Math, k);
            for (aG = 0; aG <= w; aG++) {
              k[aG] = af;
            }
          }
        }
        var au = g,
            l,
            aF;
        az = (K[aK] ? aK : 0);
        for (aG = az; aG <= w; aG++) {
          K[aG].w = k[aG];
          for (aI = 0, aE = O.length; aI < aE; aI++) {
            if (O[aI][aG]) {
              az = (this.data[aI].type === "mlabeledtr" ? aK : 0);
              an = this.data[aI].data[aG - az];
              if (an.SVGcanStretch("Horizontal")) {
                O[aI][aG] = an.SVGstretchH(k[aG]);
              } else {
                if (an.SVGcanStretch("Vertical")) {
                  E = an.CoreMO();
                  var ad = E.symmetric;
                  E.symmetric = false;
                  O[aI][aG] = an.SVGstretchV(z[aI], I[aI]);
                  E.symmetric = ad;
                }
              }
              aF = an.rowalign || this.data[aI].rowalign || L[aI];
              l = ({
                top: z[aI] - O[aI][aG].h,
                bottom: O[aI][aG].d - I[aI],
                center: ((z[aI] - I[aI]) - (O[aI][aG].h - O[aI][aG].d)) / 2,
                baseline: 0,
                axis: 0
              })[aF] || 0;
              aF = (an.columnalign || aw[aI][aG] || ai[aG]);
              K[aG].Align(O[aI][aG], aF, 0, au + l);
            }
            if (aI < O.length - 1) {
              au -= Math.max(0, I[aI] + z[aI + 1] + T[aI]);
            }
          }
          au = g;
        }
        var ah = 1.5 * d.em;
        var av = ae - ah / 2;
        for (aG = 0; aG <= w; aG++) {
          o.Add(K[aG], av, 0);
          av += k[aG] + am[aG];
          if (N[aG] !== "none" && aG < w && aG !== aK) {
            o.Add(b.VLINE(aL, ah, N[aG]), av - am[aG] / 2, ay);
          }
        }
        o.w += ae;
        o.d = -ay;
        o.h = aL + ay;
        aB = o.w;
        if (aN.frame !== "none") {
          o.Add(b.HLINE(aB, ah, aN.frame), 0, ay + aL - ah);
          o.Add(b.HLINE(aB, ah, aN.frame), 0, ay);
          o.Add(b.VLINE(aL, ah, aN.frame), 0, ay);
          o.Add(b.VLINE(aL, ah, aN.frame), aB - ah, ay);
        }
        au = g - ah / 2;
        for (aI = 0, aE = O.length - 1; aI < aE; aI++) {
          l = Math.max(0, I[aI] + z[aI + 1] + T[aI]);
          if (h[aI] !== "none") {
            o.Add(b.HLINE(aB, ah, h[aI]), 0, au - I[aI] - (l - I[aI] - z[aI + 1]) / 2);
          }
          au -= l;
        }
        o.Clean();
        this.SVGhandleSpace(o);
        this.SVGhandleColor(o);
        if (K[aK]) {
          o.tw = Math.max(o.w, o.r) - Math.min(0, o.l);
          var R = this.getValues("indentalignfirst", "indentshiftfirst", "indentalign", "indentshift");
          if (R.indentalignfirst !== a.INDENTALIGN.INDENTALIGN) {
            R.indentalign = R.indentalignfirst;
          }
          if (R.indentalign === a.INDENTALIGN.AUTO) {
            R.indentalign = this.displayAlign;
          }
          if (R.indentshiftfirst !== a.INDENTSHIFT.INDENTSHIFT) {
            R.indentshift = R.indentshiftfirst;
          }
          if (R.indentshift === "auto" || R.indentshift === "") {
            R.indentshift = "0";
          }
          var ak = d.length2em(R.indentshift, v, d.cwidth);
          var Q = d.length2em(aN.minlabelspacing, v, d.cwidth);
          var al = Q + K[aK].w,
              aO = 0,
              aH = o.w;
          var e = d.length2em(this.displayIndent, v, d.cwidth);
          az = (ai[aK] === a.INDENTALIGN.RIGHT ? -1 : 1);
          if (R.indentalign === a.INDENTALIGN.CENTER) {
            var q = (d.cwidth - aH) / 2;
            ak += e;
            if (al + az * aO > q + az * ak) {
              R.indentalign = ai[aK];
              ak = az * (al + az * aO);
              aH += al + Math.max(0, ak);
            }
          } else {
            if (ai[aK] === R.indentalign) {
              if (e < 0) {
                aO = az * e;
                e = 0;
              }
              ak += az * e;
              if (al > az * ak) {
                ak = az * al;
              }
              ak += aO;
              aH += az * ak;
            } else {
              ak -= az * e;
              if (aH - az * ak + al > d.cwidth) {
                ak = az * (aH + al - d.cwidth);
                if (az * ak > 0) {
                  aH = d.cwidth + az * ak;
                  ak = 0;
                }
              }
            }
          }
          var G = o;
          o = this.SVG();
          o.hasIndent = true;
          o.w = o.r = Math.max(aH, d.cwidth);
          o.Align(K[aK], ai[aK], 0, 0, aO);
          o.Align(G, R.indentalign, 0, 0, ak);
          o.tw = aH;
        }
        this.SVGsaveData(o);
        return o;
      },
      SVGhandleSpace: function(e) {
        if (!this.hasFrame && !e.width) {
          e.x = e.X = 167;
        }
        this.SUPER(arguments).SVGhandleSpace.call(this, e);
      }
    });
    a.mtd.Augment({toSVG: function(e, g) {
        var f = this.svg = this.SVG();
        if (this.data[0]) {
          f.Add(this.SVGdataStretched(0, e, g));
          f.Clean();
        }
        this.SVGhandleColor(f);
        this.SVGsaveData(f);
        return f;
      }});
    MathJax.Hub.Startup.signal.Post("SVG mtable Ready");
    MathJax.Ajax.loadComplete(d.autoloadDir + "/mtable.js");
  });
  (function(i, b, e, g) {
    var h;
    var j,
        a,
        d;
    var f = "'Times New Roman',Times,STIXGeneral,serif";
    var m = {
      ".MJXp-script": {"font-size": ".8em"},
      ".MJXp-right": {
        "-webkit-transform-origin": "right",
        "-moz-transform-origin": "right",
        "-ms-transform-origin": "right",
        "-o-transform-origin": "right",
        "transform-origin": "right"
      },
      ".MJXp-bold": {"font-weight": "bold"},
      ".MJXp-italic": {"font-style": "italic"},
      ".MJXp-scr": {"font-family": "MathJax_Script," + f},
      ".MJXp-frak": {"font-family": "MathJax_Fraktur," + f},
      ".MJXp-sf": {"font-family": "MathJax_SansSerif," + f},
      ".MJXp-cal": {"font-family": "MathJax_Caligraphic," + f},
      ".MJXp-mono": {"font-family": "MathJax_Typewriter," + f},
      ".MJXp-largeop": {"font-size": "150%"},
      ".MJXp-largeop.MJXp-int": {"vertical-align": "-.2em"},
      ".MJXp-math": {
        display: "inline-block",
        "line-height": "1.2",
        "text-indent": "0",
        "font-family": f,
        "white-space": "nowrap",
        "border-collapse": "collapse"
      },
      ".MJXp-display": {
        display: "block",
        "text-align": "center",
        margin: "1em 0"
      },
      ".MJXp-math span": {display: "inline-block"},
      ".MJXp-box": {
        display: "block!important",
        "text-align": "center"
      },
      ".MJXp-box:after": {content: '" "'},
      ".MJXp-rule": {
        display: "block!important",
        "margin-top": ".1em"
      },
      ".MJXp-char": {display: "block!important"},
      ".MJXp-mo": {margin: "0 .15em"},
      ".MJXp-mfrac": {
        margin: "0 .125em",
        "vertical-align": ".25em"
      },
      ".MJXp-denom": {
        display: "inline-table!important",
        width: "100%"
      },
      ".MJXp-denom > *": {display: "table-row!important"},
      ".MJXp-surd": {"vertical-align": "top"},
      ".MJXp-surd > *": {display: "block!important"},
      ".MJXp-script-box > * ": {
        display: "table!important",
        height: "50%"
      },
      ".MJXp-script-box > * > *": {
        display: "table-cell!important",
        "vertical-align": "top"
      },
      ".MJXp-script-box > *:last-child > *": {"vertical-align": "bottom"},
      ".MJXp-script-box > * > * > *": {display: "block!important"},
      ".MJXp-mphantom": {visibility: "hidden"},
      ".MJXp-munderover": {display: "inline-table!important"},
      ".MJXp-over": {
        display: "inline-block!important",
        "text-align": "center"
      },
      ".MJXp-over > *": {display: "block!important"},
      ".MJXp-munderover > *": {display: "table-row!important"},
      ".MJXp-mtable": {
        "vertical-align": ".25em",
        margin: "0 .125em"
      },
      ".MJXp-mtable > *": {
        display: "inline-table!important",
        "vertical-align": "middle"
      },
      ".MJXp-mtr": {display: "table-row!important"},
      ".MJXp-mtd": {
        display: "table-cell!important",
        "text-align": "center",
        padding: ".5em 0 0 .5em"
      },
      ".MJXp-mtr > .MJXp-mtd:first-child": {"padding-left": 0},
      ".MJXp-mtr:first-child > .MJXp-mtd": {"padding-top": 0},
      ".MJXp-mlabeledtr": {display: "table-row!important"},
      ".MJXp-mlabeledtr > .MJXp-mtd:first-child": {"padding-left": 0},
      ".MJXp-mlabeledtr:first-child > .MJXp-mtd": {"padding-top": 0},
      ".MJXp-merror": {
        "background-color": "#FFFF88",
        color: "#CC0000",
        border: "1px solid #CC0000",
        padding: "1px 3px",
        "font-style": "normal",
        "font-size": "90%"
      }
    };
    (function() {
      for (var n = 0; n < 10; n++) {
        var o = "scaleX(." + n + ")";
        m[".MJXp-scale" + n] = {
          "-webkit-transform": o,
          "-moz-transform": o,
          "-ms-transform": o,
          "-o-transform": o,
          transform: o
        };
      }
    })();
    var k = 1000000;
    var c = "V",
        l = "H";
    g.Augment({
      settings: b.config.menuSettings,
      config: {styles: m},
      hideProcessedMath: false,
      maxStretchyParts: 1000,
      Config: function() {
        if (!this.require) {
          this.require = [];
        }
        this.SUPER(arguments).Config.call(this);
        var n = this.settings;
        if (n.scale) {
          this.config.scale = n.scale;
        }
        this.require.push(MathJax.OutputJax.extensionDir + "/MathEvents.js");
      },
      Startup: function() {
        j = MathJax.Extension.MathEvents.Event;
        a = MathJax.Extension.MathEvents.Touch;
        d = MathJax.Extension.MathEvents.Hover;
        this.ContextMenu = j.ContextMenu;
        this.Mousedown = j.AltContextMenu;
        this.Mouseover = d.Mouseover;
        this.Mouseout = d.Mouseout;
        this.Mousemove = d.Mousemove;
        var n = e.addElement(document.body, "div", {style: {width: "5in"}});
        this.pxPerInch = n.offsetWidth / 5;
        n.parentNode.removeChild(n);
        return i.Styles(this.config.styles, ["InitializePHTML", this]);
      },
      InitializePHTML: function() {},
      preTranslate: function(p) {
        var s = p.jax[this.id],
            t,
            q = s.length,
            u,
            r,
            v,
            o,
            n;
        for (t = 0; t < q; t++) {
          u = s[t];
          if (!u.parentNode) {
            continue;
          }
          r = u.previousSibling;
          if (r && String(r.className).match(/^MathJax_PHTML(_Display)?( MathJax_Processing)?$/)) {
            r.parentNode.removeChild(r);
          }
          n = u.MathJax.elementJax;
          if (!n) {
            continue;
          }
          n.PHTML = {display: (n.root.Get("display") === "block")};
          v = o = e.Element("span", {
            className: "MathJax_PHTML",
            id: n.inputID + "-Frame",
            isMathJax: true,
            jaxID: this.id,
            oncontextmenu: j.Menu,
            onmousedown: j.Mousedown,
            onmouseover: j.Mouseover,
            onmouseout: j.Mouseout,
            onmousemove: j.Mousemove,
            onclick: j.Click,
            ondblclick: j.DblClick,
            onkeydown: j.Keydown,
            tabIndex: b.getTabOrder(n)
          });
          if (b.Browser.noContextMenu) {
            v.ontouchstart = a.start;
            v.ontouchend = a.end;
          }
          if (n.PHTML.display) {
            o = e.Element("div", {className: "MathJax_PHTML_Display"});
            o.appendChild(v);
          }
          o.className += " MathJax_Processing";
          u.parentNode.insertBefore(o, u);
        }
      },
      Translate: function(o, s) {
        if (!o.parentNode) {
          return;
        }
        var n = o.MathJax.elementJax,
            r = n.root,
            p = document.getElementById(n.inputID + "-Frame"),
            t = (n.PHTML.display ? p.parentNode : p);
        this.initPHTML(r, p);
        try {
          r.toPreviewHTML(p);
        } catch (q) {
          if (q.restart) {
            while (p.firstChild) {
              p.removeChild(p.firstChild);
            }
          }
          throw q;
        }
        t.className = t.className.split(/ /)[0];
        if (this.hideProcessedMath) {
          t.className += " MathJax_Processed";
          if (o.MathJax.preview) {
            n.PHTML.preview = o.MathJax.preview;
            delete o.MathJax.preview;
          }
        }
      },
      postTranslate: function(s) {
        var o = s.jax[this.id];
        if (!this.hideProcessedMath) {
          return;
        }
        for (var q = 0,
            n = o.length; q < n; q++) {
          var p = o[q];
          if (p && p.MathJax.elementJax) {
            p.previousSibling.className = p.previousSibling.className.split(/ /)[0];
            var r = p.MathJax.elementJax.PHTML;
            if (r.preview) {
              r.preview.innerHTML = "";
              p.MathJax.preview = r.preview;
              delete r.preview;
            }
          }
        }
      },
      getJaxFromMath: function(n) {
        if (n.parentNode.className === "MathJax_PHTML_Display") {
          n = n.parentNode;
        }
        do {
          n = n.nextSibling;
        } while (n && n.nodeName.toLowerCase() !== "script");
        return b.getJaxFor(n);
      },
      getHoverSpan: function(n, o) {
        return n.root.PHTMLspanElement();
      },
      getHoverBBox: function(n, q, r) {
        var s = n.root.PHTML,
            p = n.PHTML.outerEm;
        var o = {
          w: s.w * p,
          h: s.h * p,
          d: s.d * p
        };
        if (s.width) {
          o.width = s.width;
        }
        return o;
      },
      Zoom: function(o, u, s, n, r) {
        u.className = "MathJax";
        this.idPostfix = "-zoom";
        o.root.toPHTML(u, u);
        this.idPostfix = "";
        u.style.position = "absolute";
        if (!width) {
          s.style.position = "absolute";
        }
        var t = u.offsetWidth,
            q = u.offsetHeight,
            v = s.offsetHeight,
            p = s.offsetWidth;
        if (p === 0) {
          p = s.parentNode.offsetWidth;
        }
        u.style.position = s.style.position = "";
        return {
          Y: -j.getBBox(u).h,
          mW: p,
          mH: v,
          zW: t,
          zH: q
        };
      },
      initPHTML: function(o, n) {},
      Remove: function(n) {
        var o = document.getElementById(n.inputID + "-Frame");
        if (o) {
          if (n.PHTML.display) {
            o = o.parentNode;
          }
          o.parentNode.removeChild(o);
        }
        delete n.PHTML;
      },
      ID: 0,
      idPostfix: "",
      GetID: function() {
        this.ID++;
        return this.ID;
      },
      VARIANT: {
        bold: "MJXp-bold",
        italic: "MJXp-italic",
        "bold-italic": "MJXp-bold MJXp-italic",
        script: "MJXp-scr",
        "bold-script": "MJXp-scr MJXp-bold",
        fraktur: "MJXp-frak",
        "bold-fraktur": "MJXp-frak MJXp-bold",
        monospace: "MJXp-mono",
        "sans-serif": "MJXp-sf",
        "-tex-caligraphic": "MJXp-cal"
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
        thin: 0.08,
        medium: 0.1,
        thick: 0.15,
        infinity: k
      },
      TeX: {x_height: 0.430554},
      pxPerInch: 72,
      em: 16,
      DELIMITERS: {
        "(": {dir: c},
        "{": {
          dir: c,
          w: 0.58
        },
        "[": {dir: c},
        "|": {
          dir: c,
          w: 0.275
        },
        ")": {dir: c},
        "}": {
          dir: c,
          w: 0.58
        },
        "]": {dir: c},
        "/": {dir: c},
        "\\": {dir: c},
        "\u2223": {
          dir: c,
          w: 0.275
        },
        "\u2225": {
          dir: c,
          w: 0.55
        },
        "\u230A": {
          dir: c,
          w: 0.5
        },
        "\u230B": {
          dir: c,
          w: 0.5
        },
        "\u2308": {
          dir: c,
          w: 0.5
        },
        "\u2309": {
          dir: c,
          w: 0.5
        },
        "\u27E8": {
          dir: c,
          w: 0.5
        },
        "\u27E9": {
          dir: c,
          w: 0.5
        },
        "\u2191": {
          dir: c,
          w: 0.65
        },
        "\u2193": {
          dir: c,
          w: 0.65
        },
        "\u21D1": {
          dir: c,
          w: 0.75
        },
        "\u21D3": {
          dir: c,
          w: 0.75
        },
        "\u2195": {
          dir: c,
          w: 0.65
        },
        "\u21D5": {
          dir: c,
          w: 0.75
        },
        "\u27EE": {
          dir: c,
          w: 0.275
        },
        "\u27EF": {
          dir: c,
          w: 0.275
        },
        "\u23B0": {
          dir: c,
          w: 0.6
        },
        "\u23B1": {
          dir: c,
          w: 0.6
        }
      },
      REMAPACCENT: {
        "\u20D7": "\u2192",
        "'": "\u02CB",
        "`": "\u02CA",
        ".": "\u02D9",
        "^": "\u02C6",
        "-": "\u02C9",
        "~": "\u02DC",
        "\u00AF": "\u02C9",
        "\u00B0": "\u02DA",
        "\u00B4": "\u02CA",
        "\u0300": "\u02CB",
        "\u0301": "\u02CA",
        "\u0302": "\u02C6",
        "\u0303": "\u02DC",
        "\u0304": "\u02C9",
        "\u0305": "\u02C9",
        "\u0306": "\u02D8",
        "\u0307": "\u02D9",
        "\u0308": "\u00A8",
        "\u030C": "\u02C7"
      },
      REMAPACCENTUNDER: {},
      length2em: function(r, p) {
        if (typeof(r) !== "string") {
          r = r.toString();
        }
        if (r === "") {
          return "";
        }
        if (r === h.SIZE.NORMAL) {
          return 1;
        }
        if (r === h.SIZE.BIG) {
          return 2;
        }
        if (r === h.SIZE.SMALL) {
          return 0.71;
        }
        if (this.MATHSPACE[r]) {
          return this.MATHSPACE[r];
        }
        var o = r.match(/^\s*([-+]?(?:\.\d+|\d+(?:\.\d*)?))?(pt|em|ex|mu|px|pc|in|mm|cm|%)?/);
        var n = parseFloat(o[1] || "1"),
            q = o[2];
        if (p == null) {
          p = 1;
        }
        if (q === "em") {
          return n;
        }
        if (q === "ex") {
          return n * this.TeX.x_height;
        }
        if (q === "%") {
          return n / 100 * p;
        }
        if (q === "px") {
          return n / this.em;
        }
        if (q === "pt") {
          return n / 10;
        }
        if (q === "pc") {
          return n * 1.2;
        }
        if (q === "in") {
          return n * this.pxPerInch / this.em;
        }
        if (q === "cm") {
          return n * this.pxPerInch / this.em / 2.54;
        }
        if (q === "mm") {
          return n * this.pxPerInch / this.em / 25.4;
        }
        if (q === "mu") {
          return n / 18;
        }
        return n * p;
      },
      Em: function(n) {
        if (Math.abs(n) < 0.001) {
          return "0em";
        }
        return (n.toFixed(3).replace(/\.?0+$/, "")) + "em";
      },
      arrayEntry: function(n, o) {
        return n[Math.max(0, Math.min(o, n.length - 1))];
      }
    });
    MathJax.Hub.Register.StartupHook("mml Jax Ready", function() {
      h = MathJax.ElementJax.mml;
      h.mbase.Augment({
        toPreviewHTML: function(o, n) {
          return this.PHTMLdefaultSpan(o, n);
        },
        PHTMLdefaultSpan: function(q, o) {
          if (!o) {
            o = {};
          }
          q = this.PHTMLcreateSpan(q);
          this.PHTMLhandleStyle(q);
          this.PHTMLhandleColor(q);
          if (this.isToken) {
            this.PHTMLhandleToken(q);
          }
          for (var p = 0,
              n = this.data.length; p < n; p++) {
            this.PHTMLaddChild(q, p, o);
          }
          return q;
        },
        PHTMLaddChild: function(p, o, n) {
          var q = this.data[o];
          if (q) {
            if (n.childSpans) {
              p = e.addElement(p, "span", {className: n.className});
            }
            q.toPreviewHTML(p);
            if (!n.noBBox) {
              this.PHTML.w += q.PHTML.w + q.PHTML.l + q.PHTML.r;
              if (q.PHTML.h > this.PHTML.h) {
                this.PHTML.h = q.PHTML.h;
              }
              if (q.PHTML.d > this.PHTML.d) {
                this.PHTML.d = q.PHTML.d;
              }
              if (q.PHTML.t > this.PHTML.t) {
                this.PHTML.t = q.PHTML.t;
              }
              if (q.PHTML.b > this.PHTML.b) {
                this.PHTML.b = q.PHTML.b;
              }
            }
          } else {
            if (n.forceChild) {
              e.addElement(p, "span");
            }
          }
        },
        PHTMLstretchChild: function(q, p, s) {
          var r = this.data[q];
          if (r && r.PHTMLcanStretch("Vertical", p, s)) {
            var t = this.PHTML,
                o = r.PHTML,
                n = o.w;
            r.PHTMLstretchV(p, s);
            t.w += o.w - n;
            if (o.h > t.h) {
              t.h = o.h;
            }
            if (o.d > t.d) {
              t.d = o.d;
            }
          }
        },
        PHTMLcreateSpan: function(n) {
          if (!this.PHTML) {
            this.PHTML = {};
          }
          this.PHTML = {
            w: 0,
            h: 0,
            d: 0,
            l: 0,
            r: 0,
            t: 0,
            b: 0
          };
          if (this.inferred) {
            return n;
          }
          if (this.type === "mo" && this.data.join("") === "\u222B") {
            g.lastIsInt = true;
          } else {
            if (this.type !== "mspace" || this.width !== "negativethinmathspace") {
              g.lastIsInt = false;
            }
          }
          if (!this.PHTMLspanID) {
            this.PHTMLspanID = g.GetID();
          }
          var o = (this.id || "MJXp-Span-" + this.PHTMLspanID);
          return e.addElement(n, "span", {
            className: "MJXp-" + this.type,
            id: o
          });
        },
        PHTMLspanElement: function() {
          if (!this.PHTMLspanID) {
            return null;
          }
          return document.getElementById(this.id || "MJXp-Span-" + this.PHTMLspanID);
        },
        PHTMLhandleToken: function(o) {
          var n = this.getValues("mathvariant");
          if (n.mathvariant !== h.VARIANT.NORMAL) {
            o.className += " " + g.VARIANT[n.mathvariant];
          }
        },
        PHTMLhandleStyle: function(n) {
          if (this.style) {
            n.style.cssText = this.style;
          }
        },
        PHTMLhandleColor: function(n) {
          if (this.mathcolor) {
            n.style.color = this.mathcolor;
          }
          if (this.mathbackground) {
            n.style.backgroundColor = this.mathbackground;
          }
        },
        PHTMLhandleScriptlevel: function(n) {
          var o = this.Get("scriptlevel");
          if (o) {
            n.className += " MJXp-script";
          }
        },
        PHTMLhandleText: function(y, A) {
          var v,
              p;
          var z = 0,
              o = 0,
              q = 0;
          for (var s = 0,
              r = A.length; s < r; s++) {
            p = A.charCodeAt(s);
            v = A.charAt(s);
            if (p >= 55296 && p < 56319) {
              s++;
              p = (((p - 55296) << 10) + (A.charCodeAt(s) - 56320)) + 65536;
            }
            var t = 0.7,
                u = 0.22,
                x = 0.5;
            if (p < 127) {
              if (v.match(/[A-Za-ehik-or-xz0-9]/)) {
                u = 0;
              }
              if (v.match(/[A-HK-Z]/)) {
                x = 0.67;
              } else {
                if (v.match(/[IJ]/)) {
                  x = 0.36;
                }
              }
              if (v.match(/[acegm-su-z]/)) {
                t = 0.45;
              } else {
                if (v.match(/[ij]/)) {
                  t = 0.75;
                }
              }
              if (v.match(/[ijlt]/)) {
                x = 0.28;
              }
            }
            if (g.DELIMITERS[v]) {
              x = g.DELIMITERS[v].w || 0.4;
            }
            if (t > z) {
              z = t;
            }
            if (u > o) {
              o = u;
            }
            q += x;
          }
          if (!this.CHML) {
            this.PHTML = {};
          }
          this.PHTML = {
            h: 0.9,
            d: 0.3,
            w: q,
            l: 0,
            r: 0,
            t: z,
            b: o
          };
          e.addText(y, A);
        },
        PHTMLbboxFor: function(o) {
          if (this.data[o] && this.data[o].PHTML) {
            return this.data[o].PHTML;
          }
          return {
            w: 0,
            h: 0,
            d: 0,
            l: 0,
            r: 0,
            t: 0,
            b: 0
          };
        },
        PHTMLcanStretch: function(q, o, p) {
          if (this.isEmbellished()) {
            var n = this.Core();
            if (n && n !== this) {
              return n.PHTMLcanStretch(q, o, p);
            }
          }
          return false;
        },
        PHTMLstretchV: function(n, o) {},
        PHTMLstretchH: function(n) {},
        CoreParent: function() {
          var n = this;
          while (n && n.isEmbellished() && n.CoreMO() === this && !n.isa(h.math)) {
            n = n.Parent();
          }
          return n;
        },
        CoreText: function(n) {
          if (!n) {
            return "";
          }
          if (n.isEmbellished()) {
            return n.CoreMO().data.join("");
          }
          while ((n.isa(h.mrow) || n.isa(h.TeXAtom) || n.isa(h.mstyle) || n.isa(h.mphantom)) && n.data.length === 1 && n.data[0]) {
            n = n.data[0];
          }
          if (!n.isToken) {
            return "";
          } else {
            return n.data.join("");
          }
        }
      });
      h.chars.Augment({toPreviewHTML: function(n) {
          var o = this.toString().replace(/[\u2061-\u2064]/g, "");
          this.PHTMLhandleText(n, o);
        }});
      h.entity.Augment({toPreviewHTML: function(n) {
          var o = this.toString().replace(/[\u2061-\u2064]/g, "");
          this.PHTMLhandleText(n, o);
        }});
      h.math.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n);
          if (this.Get("display") === "block") {
            n.className += " MJXp-display";
          }
          return n;
        }});
      h.mo.Augment({
        toPreviewHTML: function(o) {
          o = this.PHTMLdefaultSpan(o);
          this.PHTMLadjustAccent(o);
          var n = this.getValues("lspace", "rspace", "scriptlevel", "displaystyle", "largeop");
          if (n.scriptlevel === 0) {
            this.PHTML.l = g.length2em(n.lspace);
            this.PHTML.r = g.length2em(n.rspace);
            o.style.marginLeft = g.Em(this.PHTML.l);
            o.style.marginRight = g.Em(this.PHTML.r);
          } else {
            this.PHTML.l = 0.15;
            this.PHTML.r = 0.1;
          }
          if (n.displaystyle && n.largeop) {
            var p = e.Element("span", {className: "MJXp-largeop"});
            p.appendChild(o.firstChild);
            o.appendChild(p);
            this.PHTML.h *= 1.2;
            this.PHTML.d *= 1.2;
            if (this.data.join("") === "\u222B") {
              p.className += " MJXp-int";
            }
          }
          return o;
        },
        PHTMLadjustAccent: function(p) {
          var o = this.CoreParent();
          if (o && o.isa(h.munderover) && this.CoreText(o.data[o.base]).length === 1) {
            var q = o.data[o.over],
                n = o.data[o.under];
            var s = this.data.join(""),
                r;
            if (q && this === q.CoreMO() && o.Get("accent")) {
              r = g.REMAPACCENT[s];
            } else {
              if (n && this === n.CoreMO() && o.Get("accentunder")) {
                r = g.REMAPACCENTUNDER[s];
              }
            }
            if (r) {
              s = p.innerHTML = r;
            }
            if (s.match(/[\u02C6-\u02DC\u00A8]/)) {
              this.PHTML.acc = -0.52;
            } else {
              if (s === "\u2192") {
                this.PHTML.acc = -0.15;
                this.PHTML.vec = true;
              }
            }
          }
        },
        PHTMLcanStretch: function(q, o, p) {
          if (!this.Get("stretchy")) {
            return false;
          }
          var r = this.data.join("");
          if (r.length > 1) {
            return false;
          }
          r = g.DELIMITERS[r];
          var n = (r && r.dir === q.substr(0, 1));
          if (n) {
            n = (this.PHTML.h !== o || this.PHTML.d !== p || (this.Get("minsize", true) || this.Get("maxsize", true)));
          }
          return n;
        },
        PHTMLstretchV: function(p, u) {
          var o = this.PHTMLspanElement(),
              t = this.PHTML;
          var n = this.getValues("symmetric", "maxsize", "minsize");
          if (n.symmetric) {
            l = 2 * Math.max(p - 0.25, u + 0.25);
          } else {
            l = p + u;
          }
          n.maxsize = g.length2em(n.maxsize, t.h + t.d);
          n.minsize = g.length2em(n.minsize, t.h + t.d);
          l = Math.max(n.minsize, Math.min(n.maxsize, l));
          var s = l / (t.h + t.d - 0.3);
          var q = e.Element("span", {style: {"font-size": g.Em(s)}});
          if (s > 1.25) {
            var r = Math.ceil(1.25 / s * 10);
            q.className = "MJXp-right MJXp-scale" + r;
            q.style.marginLeft = g.Em(t.w * (r / 10 - 1) + 0.07);
            t.w *= s * r / 10;
          }
          q.appendChild(o.firstChild);
          o.appendChild(q);
          if (n.symmetric) {
            o.style.verticalAlign = g.Em(0.25 * (1 - s));
          }
        }
      });
      h.mspace.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q);
          var o = this.getValues("height", "depth", "width");
          var n = g.length2em(o.width),
              p = g.length2em(o.height),
              s = g.length2em(o.depth);
          var r = this.PHTML;
          r.w = n;
          r.h = p;
          r.d = s;
          if (n < 0) {
            if (!g.lastIsInt) {
              q.style.marginLeft = g.Em(n);
            }
            n = 0;
          }
          q.style.width = g.Em(n);
          q.style.height = g.Em(p + s);
          if (s) {
            q.style.verticalAlign = g.Em(-s);
          }
          return q;
        }});
      h.mpadded.Augment({
        toPreviewHTML: function(u) {
          u = this.PHTMLdefaultSpan(u, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true
          });
          var o = u.firstChild;
          var v = this.getValues("width", "height", "depth", "lspace", "voffset");
          var s = this.PHTMLdimen(v.lspace);
          var q = 0,
              n = 0,
              t = s.len,
              r = -s.len,
              p = 0;
          if (v.width !== "") {
            s = this.PHTMLdimen(v.width, "w", 0);
            if (s.pm) {
              r += s.len;
            } else {
              u.style.width = g.Em(s.len);
            }
          }
          if (v.height !== "") {
            s = this.PHTMLdimen(v.height, "h", 0);
            if (!s.pm) {
              q += -this.PHTMLbboxFor(0).h;
            }
            q += s.len;
          }
          if (v.depth !== "") {
            s = this.PHTMLdimen(v.depth, "d", 0);
            if (!s.pm) {
              n += -this.PHTMLbboxFor(0).d;
              p += -s.len;
            }
            n += s.len;
          }
          if (v.voffset !== "") {
            s = this.PHTMLdimen(v.voffset);
            q -= s.len;
            n += s.len;
            p += s.len;
          }
          if (q) {
            o.style.marginTop = g.Em(q);
          }
          if (n) {
            o.style.marginBottom = g.Em(n);
          }
          if (t) {
            o.style.marginLeft = g.Em(t);
          }
          if (r) {
            o.style.marginRight = g.Em(r);
          }
          if (p) {
            u.style.verticalAlign = g.Em(p);
          }
          return u;
        },
        PHTMLdimen: function(q, r, n) {
          if (n == null) {
            n = -k;
          }
          q = String(q);
          var o = q.match(/width|height|depth/);
          var p = (o ? this.PHTML[o[0].charAt(0)] : (r ? this.PHTML[r] : 0));
          return {
            len: g.length2em(q, p) || 0,
            pm: !!q.match(/^[-+]/)
          };
        }
      });
      h.munderover.Augment({toPreviewHTML: function(r) {
          var t = this.getValues("displaystyle", "accent", "accentunder", "align");
          var n = this.data[this.base];
          if (!t.displaystyle && n != null && (n.movablelimits || n.CoreMO().Get("movablelimits"))) {
            r = h.msubsup.prototype.toPreviewHTML.call(this, r);
            r.className = r.className.replace(/munderover/, "msubsup");
            return r;
          }
          r = this.PHTMLdefaultSpan(r, {
            childSpans: true,
            className: "",
            noBBox: true
          });
          var p = this.PHTMLbboxFor(this.over),
              v = this.PHTMLbboxFor(this.under),
              u = this.PHTMLbboxFor(this.base),
              s = this.PHTML,
              o = p.acc;
          if (this.data[this.over]) {
            r.lastChild.firstChild.style.marginLeft = p.l = r.lastChild.firstChild.style.marginRight = p.r = 0;
            var q = e.Element("span", {}, [["span", {className: "MJXp-over"}]]);
            q.firstChild.appendChild(r.lastChild);
            if (r.childNodes.length > (this.data[this.under] ? 1 : 0)) {
              q.firstChild.appendChild(r.firstChild);
            }
            this.data[this.over].PHTMLhandleScriptlevel(q.firstChild.firstChild);
            if (o != null) {
              if (p.vec) {
                q.firstChild.firstChild.firstChild.style.fontSize = "60%";
                p.h *= 0.6;
                p.d *= 0.6;
                p.w *= 0.6;
              }
              o = o - p.d + 0.1;
              if (u.t != null) {
                o += u.t - u.h;
              }
              q.firstChild.firstChild.style.marginBottom = g.Em(o);
            }
            if (r.firstChild) {
              r.insertBefore(q, r.firstChild);
            } else {
              r.appendChild(q);
            }
          }
          if (this.data[this.under]) {
            r.lastChild.firstChild.style.marginLeft = v.l = r.lastChild.firstChild.marginRight = v.r = 0;
            this.data[this.under].PHTMLhandleScriptlevel(r.lastChild);
          }
          s.w = Math.max(0.8 * p.w, 0.8 * v.w, u.w);
          s.h = 0.8 * (p.h + p.d + (o || 0)) + u.h;
          s.d = u.d + 0.8 * (v.h + v.d);
          return r;
        }});
      h.msubsup.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q, {noBBox: true});
          if (!this.data[this.base]) {
            if (q.firstChild) {
              q.insertBefore(e.Element("span"), q.firstChild);
            } else {
              q.appendChild(e.Element("span"));
            }
          }
          var s = this.data[this.base],
              p = this.data[this.sub],
              n = this.data[this.sup];
          if (!s) {
            s = {bbox: {
                h: 0.8,
                d: 0.2
              }};
          }
          q.firstChild.style.marginRight = ".05em";
          var o = Math.max(0.4, s.PHTML.h - 0.4),
              u = Math.max(0.2, s.PHTML.d + 0.1);
          var t = this.PHTML;
          if (n && p) {
            var r = e.Element("span", {
              className: "MJXp-script-box",
              style: {
                height: g.Em(o + n.PHTML.h * 0.8 + u + p.PHTML.d * 0.8),
                "vertical-align": g.Em(-u - p.PHTML.d * 0.8)
              }
            }, [["span", {}, [["span", {}, [["span", {style: {"margin-bottom": g.Em(-(n.PHTML.d - 0.05))}}]]]]], ["span", {}, [["span", {}, [["span", {style: {"margin-top": g.Em(-(n.PHTML.h - 0.05))}}]]]]]]);
            p.PHTMLhandleScriptlevel(r.firstChild);
            n.PHTMLhandleScriptlevel(r.lastChild);
            r.firstChild.firstChild.firstChild.appendChild(q.lastChild);
            r.lastChild.firstChild.firstChild.appendChild(q.lastChild);
            q.appendChild(r);
            t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
            t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
            t.w = s.PHTML.w + Math.max(n.PHTML.w, p.PHTML.w) + 0.07;
          } else {
            if (n) {
              q.lastChild.style.verticalAlign = g.Em(o);
              n.PHTMLhandleScriptlevel(q.lastChild);
              t.h = Math.max(s.PHTML.h, n.PHTML.h * 0.8 + o);
              t.d = Math.max(s.PHTML.d, n.PHTML.d * 0.8 - o);
              t.w = s.PHTML.w + n.PHTML.w + 0.07;
            } else {
              if (p) {
                q.lastChild.style.verticalAlign = g.Em(-u);
                p.PHTMLhandleScriptlevel(q.lastChild);
                t.h = Math.max(s.PHTML.h, p.PHTML.h * 0.8 - u);
                t.d = Math.max(s.PHTML.d, p.PHTML.d * 0.8 + u);
                t.w = s.PHTML.w + p.PHTML.w + 0.07;
              }
            }
          }
          return q;
        }});
      h.mfrac.Augment({toPreviewHTML: function(r) {
          r = this.PHTMLdefaultSpan(r, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true,
            noBBox: true
          });
          var o = this.getValues("linethickness", "displaystyle");
          if (!o.displaystyle) {
            if (this.data[0]) {
              this.data[0].PHTMLhandleScriptlevel(r.firstChild);
            }
            if (this.data[1]) {
              this.data[1].PHTMLhandleScriptlevel(r.lastChild);
            }
          }
          var n = e.Element("span", {className: "MJXp-box"}, [["span", {className: "MJXp-denom"}, [["span", {}, [["span", {
            className: "MJXp-rule",
            style: {height: "1em"}
          }]]], ["span"]]]]);
          n.firstChild.lastChild.appendChild(r.lastChild);
          r.appendChild(n);
          var s = this.PHTMLbboxFor(0),
              p = this.PHTMLbboxFor(1),
              v = this.PHTML;
          v.w = Math.max(s.w, p.w) * 0.8;
          v.h = s.h + s.d + 0.1 + 0.25;
          v.d = p.h + p.d - 0.25;
          v.l = v.r = 0.125;
          o.linethickness = Math.max(0, g.length2em(o.linethickness || "0", 0));
          if (o.linethickness) {
            var u = n.firstChild.firstChild.firstChild;
            var q = g.Em(o.linethickness);
            u.style.borderTop = "none";
            u.style.borderBottom = (o.linethickness < 0.15 ? "1px" : q) + " solid";
            u.style.margin = q + " 0";
            q = o.linethickness;
            n.style.marginTop = g.Em(3 * q - 1.2);
            r.style.verticalAlign = g.Em(1.5 * q + 0.1);
            v.h += 1.5 * q - 0.1;
            v.d += 1.5 * q;
          } else {
            n.style.marginTop = "-.7em";
          }
          return r;
        }});
      h.msqrt.Augment({
        toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true,
            noBBox: true
          });
          this.PHTMLlayoutRoot(n, n.firstChild);
          return n;
        },
        PHTMLlayoutRoot: function(u, n) {
          var v = this.PHTMLbboxFor(0);
          var q = Math.ceil((v.h + v.d + 0.14) * 100),
              w = g.Em(14 / q);
          var r = e.Element("span", {className: "MJXp-surd"}, [["span", {style: {
              "font-size": q + "%",
              "margin-top": w
            }}, ["\u221A"]]]);
          var s = e.Element("span", {className: "MJXp-root"}, [["span", {
            className: "MJXp-rule",
            style: {"border-top": ".08em solid"}
          }]]);
          var p = (1.2 / 2.2) * q / 100;
          if (q > 150) {
            var o = Math.ceil(150 / q * 10);
            r.firstChild.className = "MJXp-right MJXp-scale" + o;
            r.firstChild.style.marginLeft = g.Em(p * (o / 10 - 1) / q * 100);
            p = p * o / 10;
            s.firstChild.style.borderTopWidth = g.Em(0.08 / Math.sqrt(o / 10));
          }
          s.appendChild(n);
          u.appendChild(r);
          u.appendChild(s);
          this.PHTML.h = v.h + 0.18;
          this.PHTML.d = v.d;
          this.PHTML.w = v.w + p;
          return u;
        }
      });
      h.mroot.Augment({
        toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q, {
            childSpans: true,
            className: "MJXp-box",
            forceChild: true,
            noBBox: true
          });
          var p = this.PHTMLbboxFor(1),
              n = q.removeChild(q.lastChild);
          var t = this.PHTMLlayoutRoot(e.Element("span"), q.firstChild);
          n.className = "MJXp-script";
          var u = parseInt(t.firstChild.firstChild.style.fontSize);
          var o = 0.55 * (u / 120) + p.d * 0.8,
              s = -0.6 * (u / 120);
          if (u > 150) {
            s *= 0.95 * Math.ceil(150 / u * 10) / 10;
          }
          n.style.marginRight = g.Em(s);
          n.style.verticalAlign = g.Em(o);
          if (-s > p.w * 0.8) {
            n.style.marginLeft = g.Em(-s - p.w * 0.8);
          }
          q.appendChild(n);
          q.appendChild(t);
          this.PHTML.w += Math.max(0, p.w * 0.8 + s);
          this.PHTML.h = Math.max(this.PHTML.h, p.h * 0.8 + o);
          return q;
        },
        PHTMLlayoutRoot: h.msqrt.prototype.PHTMLlayoutRoot
      });
      h.mfenced.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLcreateSpan(q);
          this.PHTMLhandleStyle(q);
          this.PHTMLhandleColor(q);
          this.addFakeNodes();
          this.PHTMLaddChild(q, "open", {});
          for (var p = 0,
              n = this.data.length; p < n; p++) {
            this.PHTMLaddChild(q, "sep" + p, {});
            this.PHTMLaddChild(q, p, {});
          }
          this.PHTMLaddChild(q, "close", {});
          var o = this.PHTML.h,
              r = this.PHTML.d;
          this.PHTMLstretchChild("open", o, r);
          for (p = 0, n = this.data.length; p < n; p++) {
            this.PHTMLstretchChild("sep" + p, o, r);
            this.PHTMLstretchChild(p, o, r);
          }
          this.PHTMLstretchChild("close", o, r);
          return q;
        }});
      h.mrow.Augment({toPreviewHTML: function(q) {
          q = this.PHTMLdefaultSpan(q);
          var p = this.PHTML.h,
              r = this.PHTML.d;
          for (var o = 0,
              n = this.data.length; o < n; o++) {
            this.PHTMLstretchChild(o, p, r);
          }
          return q;
        }});
      h.mstyle.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n);
          this.PHTMLhandleScriptlevel(n);
          return n;
        }});
      h.TeXAtom.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLdefaultSpan(n);
          n.className = "MJXp-mrow";
          return n;
        }});
      h.mtable.Augment({toPreviewHTML: function(E) {
          E = this.PHTMLdefaultSpan(E, {noBBox: true});
          var r = this.getValues("columnalign", "rowalign", "columnspacing", "rowspacing", "columnwidth", "equalcolumns", "equalrows", "columnlines", "rowlines", "frame", "framespacing", "align", "width");
          var u = MathJax.Hub.SplitList,
              F,
              A,
              D,
              z;
          var N = u(r.columnspacing),
              w = u(r.rowspacing),
              L = u(r.columnalign),
              t = u(r.rowalign);
          for (F = 0, A = N.length; F < A; F++) {
            N[F] = g.length2em(N[F]);
          }
          for (F = 0, A = w.length; F < A; F++) {
            w[F] = g.length2em(w[F]);
          }
          var K = e.Element("span");
          while (E.firstChild) {
            K.appendChild(E.firstChild);
          }
          E.appendChild(K);
          var y = 0,
              s = 0;
          for (F = 0, A = this.data.length; F < A; F++) {
            var v = this.data[F];
            if (v) {
              var J = g.arrayEntry(w, F - 1),
                  C = g.arrayEntry(t, F);
              var x = v.PHTML,
                  q = v.PHTMLspanElement();
              q.style.verticalAlign = C;
              var B = (v.type === "mlabeledtr" ? 1 : 0);
              for (D = 0, z = v.data.length; D < z - B; D++) {
                var p = v.data[D + B];
                if (p) {
                  var M = g.arrayEntry(N, D - 1),
                      G = g.arrayEntry(L, D);
                  var I = p.PHTMLspanElement();
                  if (D) {
                    x.w += M;
                    I.style.paddingLeft = g.Em(M);
                  }
                  if (F) {
                    I.style.paddingTop = g.Em(J);
                  }
                  I.style.textAlign = G;
                }
              }
              y += x.h + x.d;
              if (F) {
                y += J;
              }
              if (x.w > s) {
                s = x.w;
              }
            }
          }
          var o = this.PHTML;
          o.w = s;
          o.h = y / 2 + 0.25;
          o.d = y / 2 - 0.25;
          o.l = o.r = 0.125;
          return E;
        }});
      h.mlabeledtr.Augment({PHTMLdefaultSpan: function(q, o) {
          if (!o) {
            o = {};
          }
          q = this.PHTMLcreateSpan(q);
          this.PHTMLhandleStyle(q);
          this.PHTMLhandleColor(q);
          if (this.isToken) {
            this.PHTMLhandleToken(q);
          }
          for (var p = 1,
              n = this.data.length; p < n; p++) {
            this.PHTMLaddChild(q, p, o);
          }
          return q;
        }});
      h.semantics.Augment({toPreviewHTML: function(n) {
          n = this.PHTMLcreateSpan(n);
          if (this.data[0]) {
            this.data[0].toPreviewHTML(n);
            MathJax.Hub.Insert(this.data[0].PHTML || {}, this.PHTML);
          }
          return n;
        }});
      h.annotation.Augment({toPreviewHTML: function(n) {}});
      h["annotation-xml"].Augment({toPreviewHTML: function(n) {}});
      MathJax.Hub.Register.StartupHook("onLoad", function() {
        setTimeout(MathJax.Callback(["loadComplete", g, "jax.js"]), 0);
      });
    });
    MathJax.Hub.Register.StartupHook("End Cookie", function() {
      if (b.config.menuSettings.zoom !== "None") {
        i.Require("[MathJax]/extensions/MathZoom.js");
      }
    });
  })(MathJax.Ajax, MathJax.Hub, MathJax.HTML, MathJax.OutputJax.PreviewHTML);
  (function(b, g, f) {
    var c = b.config.menuSettings;
    var e = MathJax.OutputJax;
    var a = f.isMSIE && (document.documentMode || 0) < 8;
    var d = MathJax.Extension["fast-preview"] = {
      version: "2.6.0",
      enabled: true,
      config: b.CombineConfig("fast-preview", {
        Chunks: {
          EqnChunk: 10000,
          EqnChunkFactor: 1,
          EqnChunkDelay: 0
        },
        color: "inherit!important",
        updateTime: 30,
        updateDelay: 6,
        messageStyle: "none",
        disabled: f.isMSIE && !f.versionAtLeast("8.0")
      }),
      Config: function() {
        if (b.config["CHTML-preview"]) {
          MathJax.Hub.Config({"fast-preview": b.config["CHTML-preview"]});
        }
        var m,
            j,
            k,
            h,
            l;
        var i = this.config;
        if (!i.disabled && c.FastPreview == null) {
          b.Config({menuSettings: {FastPreview: true}});
        }
        if (c.FastPreview) {
          MathJax.Ajax.Styles({".MathJax_Preview .MJXf-math": {color: i.color}});
          b.Config({
            "HTML-CSS": i.Chunks,
            CommonHTML: i.Chunks,
            SVG: i.Chunks
          });
        }
        b.Register.MessageHook("Begin Math Output", function() {
          if (!h && d.Active()) {
            m = b.processUpdateTime;
            j = b.processUpdateDelay;
            k = b.config.messageStyle;
            b.processUpdateTime = i.updateTime;
            b.processUpdateDelay = i.updateDelay;
            b.Config({messageStyle: i.messageStyle});
            MathJax.Message.Clear(0, 0);
            l = true;
          }
        });
        b.Register.MessageHook("End Math Output", function() {
          if (!h && l) {
            b.processUpdateTime = m;
            b.processUpdateDelay = j;
            b.Config({messageStyle: k});
            h = true;
          }
        });
      },
      Disable: function() {
        this.enabled = false;
      },
      Enable: function() {
        this.enabled = true;
      },
      Active: function() {
        return c.FastPreview && this.enabled && !(e[c.renderer] || {}).noFastPreview;
      },
      Preview: function(h) {
        if (!this.Active()) {
          return;
        }
        var i = h.script.MathJax.preview || h.script.previousSibling;
        if (!i || i.className !== MathJax.Hub.config.preRemoveClass) {
          i = g.Element("span", {className: MathJax.Hub.config.preRemoveClass});
          h.script.parentNode.insertBefore(i, h.script);
          h.script.MathJax.preview = i;
        }
        i.innerHTML = "";
        i.style.color = (a ? "black" : "inherit");
        return this.postFilter(i, h);
      },
      postFilter: function(j, i) {
        if (!i.math.root.toPreviewHTML) {
          var h = MathJax.Callback.Queue();
          h.Push(["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/config.js"], ["Require", MathJax.Ajax, "[MathJax]/jax/output/PreviewHTML/jax.js"]);
          b.RestartAfter(h.Push({}));
        }
        i.math.root.toPreviewHTML(j);
      },
      Register: function(h) {
        b.Register.StartupHook(h + " Jax Require", function() {
          var i = MathJax.InputJax[h];
          i.postfilterHooks.Add(["Preview", MathJax.Extension["fast-preview"]], 50);
        });
      }
    };
    d.Register("TeX");
    d.Register("MathML");
    d.Register("AsciiMath");
    b.Register.StartupHook("End Config", ["Config", d]);
    b.Startup.signal.Post("fast-preview Ready");
  })(MathJax.Hub, MathJax.HTML, MathJax.Hub.Browser);
  MathJax.Ajax.loadComplete("[MathJax]/extensions/fast-preview.js");
  (function(a, e, b, f) {
    var c = b.config.menuSettings;
    var d = MathJax.Extension.AssistiveMML = {
      version: "2.6.1",
      config: b.CombineConfig("AssistiveMML", {
        disabled: false,
        styles: {
          ".MJX_Assistive_MathML": {
            position: "absolute!important",
            top: 0,
            left: 0,
            clip: (b.Browser.isMSIE && (document.documentMode || 0) < 8 ? "rect(1px 1px 1px 1px)" : "rect(1px, 1px, 1px, 1px)"),
            padding: "1px 0 0 0!important",
            border: "0!important",
            height: "1px!important",
            width: "1px!important",
            overflow: "hidden!important",
            display: "block!important",
            "-webkit-touch-callout": "none",
            "-webkit-user-select": "none",
            "-khtml-user-select": "none",
            "-moz-user-select": "none",
            "-ms-user-select": "none",
            "user-select": "none"
          },
          ".MJX_Assistive_MathML.MJX_Assistive_MathML_Block": {width: "100%!important"}
        }
      }),
      Config: function() {
        if (!this.config.disabled && c.assistiveMML == null) {
          b.Config({menuSettings: {assistiveMML: true}});
        }
        a.Styles(this.config.styles);
        b.Register.MessageHook("End Math", function(g) {
          if (c.assistiveMML) {
            return d.AddAssistiveMathML(g[1]);
          }
        });
      },
      AddAssistiveMathML: function(g) {
        var h = {
          jax: b.getAllJax(g),
          i: 0,
          callback: MathJax.Callback({})
        };
        this.HandleMML(h);
        return h.callback;
      },
      RemoveAssistiveMathML: function(k) {
        var h = b.getAllJax(k),
            l;
        for (var j = 0,
            g = h.length; j < g; j++) {
          l = document.getElementById(h[j].inputID + "-Frame");
          if (l && l.getAttribute("data-mathml")) {
            l.removeAttribute("data-mathml");
            if (l.lastChild && l.lastChild.className.match(/MJX_Assistive_MathML/)) {
              l.removeChild(l.lastChild);
            }
          }
        }
      },
      HandleMML: function(l) {
        var g = l.jax.length,
            h,
            i,
            n,
            j;
        while (l.i < g) {
          h = l.jax[l.i];
          n = document.getElementById(h.inputID + "-Frame");
          if (h.outputJax !== "NativeMML" && n && !n.getAttribute("data-mathml")) {
            try {
              i = h.root.toMathML("").replace(/\n */g, "").replace(/<!--.*?-->/g, "");
            } catch (k) {
              if (!k.restart) {
                throw k;
              }
              return MathJax.Callback.After(["HandleMML", this, l], k.restart);
            }
            n.setAttribute("data-mathml", i);
            j = f.addElement(n, "span", {
              isMathJax: true,
              unselectable: "on",
              className: "MJX_Assistive_MathML" + (h.root.Get("display") === "block" ? " MJX_Assistive_MathML_Block" : "")
            });
            j.innerHTML = i;
            n.style.position = "relative";
            n.setAttribute("role", "presentation");
            n.firstChild.setAttribute("aria-hidden", "true");
            j.setAttribute("role", "presentation");
          }
          l.i++;
        }
        l.callback();
      }
    };
    b.Startup.signal.Post("AssistiveMML Ready");
  })(MathJax.Ajax, MathJax.Callback, MathJax.Hub, MathJax.HTML);
  MathJax.Callback.Queue(["Require", MathJax.Ajax, "[MathJax]/extensions/toMathML.js"], ["loadComplete", MathJax.Ajax, "[MathJax]/extensions/AssistiveMML.js"], function() {
    MathJax.Hub.Register.StartupHook("End Config", ["Config", MathJax.Extension.AssistiveMML]);
  });
  MathJax.Ajax.loadComplete("[MathJax]/config/AM_SVG-full.js");
})(require('process'));