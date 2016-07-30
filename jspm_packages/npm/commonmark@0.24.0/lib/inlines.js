/* */ 
(function(process) {
  "use strict";
  var Node = require('./node');
  var common = require('./common');
  var normalizeReference = require('./normalize-reference');
  var normalizeURI = common.normalizeURI;
  var unescapeString = common.unescapeString;
  var fromCodePoint = require('./from-code-point');
  var decodeHTML = require('entities').decodeHTML;
  require('string.prototype.repeat');
  var C_NEWLINE = 10;
  var C_ASTERISK = 42;
  var C_UNDERSCORE = 95;
  var C_BACKTICK = 96;
  var C_OPEN_BRACKET = 91;
  var C_CLOSE_BRACKET = 93;
  var C_LESSTHAN = 60;
  var C_BANG = 33;
  var C_BACKSLASH = 92;
  var C_AMPERSAND = 38;
  var C_OPEN_PAREN = 40;
  var C_CLOSE_PAREN = 41;
  var C_COLON = 58;
  var C_SINGLEQUOTE = 39;
  var C_DOUBLEQUOTE = 34;
  var ESCAPABLE = common.ESCAPABLE;
  var ESCAPED_CHAR = '\\\\' + ESCAPABLE;
  var REG_CHAR = '[^\\\\()\\x00-\\x20]';
  var IN_PARENS_NOSP = '\\((' + REG_CHAR + '|' + ESCAPED_CHAR + '|\\\\)*\\)';
  var ENTITY = common.ENTITY;
  var reHtmlTag = common.reHtmlTag;
  var rePunctuation = new RegExp(/^[\u2000-\u206F\u2E00-\u2E7F\\'!"#\$%&\(\)\*\+,\-\.\/:;<=>\?@\[\]\^_`\{\|\}~]/);
  var reLinkTitle = new RegExp('^(?:"(' + ESCAPED_CHAR + '|[^"\\x00])*"' + '|' + '\'(' + ESCAPED_CHAR + '|[^\'\\x00])*\'' + '|' + '\\((' + ESCAPED_CHAR + '|[^)\\x00])*\\))');
  var reLinkDestinationBraces = new RegExp('^(?:[<](?:[^ <>\\t\\n\\\\\\x00]' + '|' + ESCAPED_CHAR + '|' + '\\\\)*[>])');
  var reLinkDestination = new RegExp('^(?:' + REG_CHAR + '+|' + ESCAPED_CHAR + '|\\\\|' + IN_PARENS_NOSP + ')*');
  var reEscapable = new RegExp('^' + ESCAPABLE);
  var reEntityHere = new RegExp('^' + ENTITY, 'i');
  var reTicks = /`+/;
  var reTicksHere = /^`+/;
  var reEllipses = /\.\.\./g;
  var reDash = /--+/g;
  var reEmailAutolink = /^<([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)>/;
  var reAutolink = /^<[A-Za-z][A-Za-z0-9.+-]{1,31}:[^<>\x00-\x20]*>/i;
  var reSpnl = /^ *(?:\n *)?/;
  var reWhitespaceChar = /^\s/;
  var reWhitespace = /\s+/g;
  var reFinalSpace = / *$/;
  var reInitialSpace = /^ */;
  var reSpaceAtEndOfLine = /^ *(?:\n|$)/;
  var reLinkLabel = new RegExp('^\\[(?:[^\\\\\\[\\]]|' + ESCAPED_CHAR + '|\\\\){0,1000}\\]');
  var reMain = /^[^\n`\[\]\\!<&*_'"]+/m;
  var text = function(s) {
    var node = new Node('Text');
    node._literal = s;
    return node;
  };
  var match = function(re) {
    var m = re.exec(this.subject.slice(this.pos));
    if (m === null) {
      return null;
    } else {
      this.pos += m.index + m[0].length;
      return m[0];
    }
  };
  var peek = function() {
    if (this.pos < this.subject.length) {
      return this.subject.charCodeAt(this.pos);
    } else {
      return -1;
    }
  };
  var spnl = function() {
    this.match(reSpnl);
    return true;
  };
  var parseBackticks = function(block) {
    var ticks = this.match(reTicksHere);
    if (ticks === null) {
      return false;
    }
    var afterOpenTicks = this.pos;
    var matched;
    var node;
    while ((matched = this.match(reTicks)) !== null) {
      if (matched === ticks) {
        node = new Node('Code');
        node._literal = this.subject.slice(afterOpenTicks, this.pos - ticks.length).trim().replace(reWhitespace, ' ');
        block.appendChild(node);
        return true;
      }
    }
    this.pos = afterOpenTicks;
    block.appendChild(text(ticks));
    return true;
  };
  var parseBackslash = function(block) {
    var subj = this.subject;
    var node;
    this.pos += 1;
    if (this.peek() === C_NEWLINE) {
      this.pos += 1;
      node = new Node('Hardbreak');
      block.appendChild(node);
    } else if (reEscapable.test(subj.charAt(this.pos))) {
      block.appendChild(text(subj.charAt(this.pos)));
      this.pos += 1;
    } else {
      block.appendChild(text('\\'));
    }
    return true;
  };
  var parseAutolink = function(block) {
    var m;
    var dest;
    var node;
    if ((m = this.match(reEmailAutolink))) {
      dest = m.slice(1, m.length - 1);
      node = new Node('Link');
      node._destination = normalizeURI('mailto:' + dest);
      node._title = '';
      node.appendChild(text(dest));
      block.appendChild(node);
      return true;
    } else if ((m = this.match(reAutolink))) {
      dest = m.slice(1, m.length - 1);
      node = new Node('Link');
      node._destination = normalizeURI(dest);
      node._title = '';
      node.appendChild(text(dest));
      block.appendChild(node);
      return true;
    } else {
      return false;
    }
  };
  var parseHtmlTag = function(block) {
    var m = this.match(reHtmlTag);
    if (m === null) {
      return false;
    } else {
      var node = new Node('HtmlInline');
      node._literal = m;
      block.appendChild(node);
      return true;
    }
  };
  var scanDelims = function(cc) {
    var numdelims = 0;
    var char_before,
        char_after,
        cc_after;
    var startpos = this.pos;
    var left_flanking,
        right_flanking,
        can_open,
        can_close;
    var after_is_whitespace,
        after_is_punctuation,
        before_is_whitespace,
        before_is_punctuation;
    if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
      numdelims++;
      this.pos++;
    } else {
      while (this.peek() === cc) {
        numdelims++;
        this.pos++;
      }
    }
    if (numdelims === 0) {
      return null;
    }
    char_before = startpos === 0 ? '\n' : this.subject.charAt(startpos - 1);
    cc_after = this.peek();
    if (cc_after === -1) {
      char_after = '\n';
    } else {
      char_after = fromCodePoint(cc_after);
    }
    after_is_whitespace = reWhitespaceChar.test(char_after);
    after_is_punctuation = rePunctuation.test(char_after);
    before_is_whitespace = reWhitespaceChar.test(char_before);
    before_is_punctuation = rePunctuation.test(char_before);
    left_flanking = !after_is_whitespace && !(after_is_punctuation && !before_is_whitespace && !before_is_punctuation);
    right_flanking = !before_is_whitespace && !(before_is_punctuation && !after_is_whitespace && !after_is_punctuation);
    if (cc === C_UNDERSCORE) {
      can_open = left_flanking && (!right_flanking || before_is_punctuation);
      can_close = right_flanking && (!left_flanking || after_is_punctuation);
    } else if (cc === C_SINGLEQUOTE || cc === C_DOUBLEQUOTE) {
      can_open = left_flanking && !right_flanking;
      can_close = right_flanking;
    } else {
      can_open = left_flanking;
      can_close = right_flanking;
    }
    this.pos = startpos;
    return {
      numdelims: numdelims,
      can_open: can_open,
      can_close: can_close
    };
  };
  var handleDelim = function(cc, block) {
    var res = this.scanDelims(cc);
    if (!res) {
      return false;
    }
    var numdelims = res.numdelims;
    var startpos = this.pos;
    var contents;
    this.pos += numdelims;
    if (cc === C_SINGLEQUOTE) {
      contents = "\u2019";
    } else if (cc === C_DOUBLEQUOTE) {
      contents = "\u201C";
    } else {
      contents = this.subject.slice(startpos, this.pos);
    }
    var node = text(contents);
    block.appendChild(node);
    this.delimiters = {
      cc: cc,
      numdelims: numdelims,
      node: node,
      previous: this.delimiters,
      next: null,
      can_open: res.can_open,
      can_close: res.can_close,
      active: true
    };
    if (this.delimiters.previous !== null) {
      this.delimiters.previous.next = this.delimiters;
    }
    return true;
  };
  var removeDelimiter = function(delim) {
    if (delim.previous !== null) {
      delim.previous.next = delim.next;
    }
    if (delim.next === null) {
      this.delimiters = delim.previous;
    } else {
      delim.next.previous = delim.previous;
    }
  };
  var removeDelimitersBetween = function(bottom, top) {
    if (bottom.next !== top) {
      bottom.next = top;
      top.previous = bottom;
    }
  };
  var processEmphasis = function(stack_bottom) {
    var opener,
        closer,
        old_closer;
    var opener_inl,
        closer_inl;
    var tempstack;
    var use_delims;
    var tmp,
        next;
    var opener_found;
    var openers_bottom = [];
    openers_bottom[C_UNDERSCORE] = stack_bottom;
    openers_bottom[C_ASTERISK] = stack_bottom;
    openers_bottom[C_SINGLEQUOTE] = stack_bottom;
    openers_bottom[C_DOUBLEQUOTE] = stack_bottom;
    closer = this.delimiters;
    while (closer !== null && closer.previous !== stack_bottom) {
      closer = closer.previous;
    }
    while (closer !== null) {
      var closercc = closer.cc;
      if (!(closer.can_close && (closercc === C_UNDERSCORE || closercc === C_ASTERISK || closercc === C_SINGLEQUOTE || closercc === C_DOUBLEQUOTE))) {
        closer = closer.next;
      } else {
        opener = closer.previous;
        opener_found = false;
        while (opener !== null && opener !== stack_bottom && opener !== openers_bottom[closercc]) {
          if (opener.cc === closer.cc && opener.can_open) {
            opener_found = true;
            break;
          }
          opener = opener.previous;
        }
        old_closer = closer;
        if (closercc === C_ASTERISK || closercc === C_UNDERSCORE) {
          if (!opener_found) {
            closer = closer.next;
          } else {
            if (closer.numdelims < 3 || opener.numdelims < 3) {
              use_delims = closer.numdelims <= opener.numdelims ? closer.numdelims : opener.numdelims;
            } else {
              use_delims = closer.numdelims % 2 === 0 ? 2 : 1;
            }
            opener_inl = opener.node;
            closer_inl = closer.node;
            opener.numdelims -= use_delims;
            closer.numdelims -= use_delims;
            opener_inl._literal = opener_inl._literal.slice(0, opener_inl._literal.length - use_delims);
            closer_inl._literal = closer_inl._literal.slice(0, closer_inl._literal.length - use_delims);
            var emph = new Node(use_delims === 1 ? 'Emph' : 'Strong');
            tmp = opener_inl._next;
            while (tmp && tmp !== closer_inl) {
              next = tmp._next;
              tmp.unlink();
              emph.appendChild(tmp);
              tmp = next;
            }
            opener_inl.insertAfter(emph);
            removeDelimitersBetween(opener, closer);
            if (opener.numdelims === 0) {
              opener_inl.unlink();
              this.removeDelimiter(opener);
            }
            if (closer.numdelims === 0) {
              closer_inl.unlink();
              tempstack = closer.next;
              this.removeDelimiter(closer);
              closer = tempstack;
            }
          }
        } else if (closercc === C_SINGLEQUOTE) {
          closer.node._literal = "\u2019";
          if (opener_found) {
            opener.node._literal = "\u2018";
          }
          closer = closer.next;
        } else if (closercc === C_DOUBLEQUOTE) {
          closer.node._literal = "\u201D";
          if (opener_found) {
            opener.node.literal = "\u201C";
          }
          closer = closer.next;
        }
        if (!opener_found) {
          openers_bottom[closercc] = old_closer.previous;
          if (!old_closer.can_open) {
            this.removeDelimiter(old_closer);
          }
        }
      }
    }
    while (this.delimiters !== null && this.delimiters !== stack_bottom) {
      this.removeDelimiter(this.delimiters);
    }
  };
  var parseLinkTitle = function() {
    var title = this.match(reLinkTitle);
    if (title === null) {
      return null;
    } else {
      return unescapeString(title.substr(1, title.length - 2));
    }
  };
  var parseLinkDestination = function() {
    var res = this.match(reLinkDestinationBraces);
    if (res === null) {
      res = this.match(reLinkDestination);
      if (res === null) {
        return null;
      } else {
        return normalizeURI(unescapeString(res));
      }
    } else {
      return normalizeURI(unescapeString(res.substr(1, res.length - 2)));
    }
  };
  var parseLinkLabel = function() {
    var m = this.match(reLinkLabel);
    if (m === null || m.length > 1001) {
      return 0;
    } else {
      return m.length;
    }
  };
  var parseOpenBracket = function(block) {
    var startpos = this.pos;
    this.pos += 1;
    var node = text('[');
    block.appendChild(node);
    this.delimiters = {
      cc: C_OPEN_BRACKET,
      numdelims: 1,
      node: node,
      previous: this.delimiters,
      next: null,
      can_open: true,
      can_close: false,
      index: startpos,
      active: true
    };
    if (this.delimiters.previous !== null) {
      this.delimiters.previous.next = this.delimiters;
    }
    return true;
  };
  var parseBang = function(block) {
    var startpos = this.pos;
    this.pos += 1;
    if (this.peek() === C_OPEN_BRACKET) {
      this.pos += 1;
      var node = text('![');
      block.appendChild(node);
      this.delimiters = {
        cc: C_BANG,
        numdelims: 1,
        node: node,
        previous: this.delimiters,
        next: null,
        can_open: true,
        can_close: false,
        index: startpos + 1,
        active: true
      };
      if (this.delimiters.previous !== null) {
        this.delimiters.previous.next = this.delimiters;
      }
    } else {
      block.appendChild(text('!'));
    }
    return true;
  };
  var parseCloseBracket = function(block) {
    var startpos;
    var is_image;
    var dest;
    var title;
    var matched = false;
    var reflabel;
    var opener;
    this.pos += 1;
    startpos = this.pos;
    opener = this.delimiters;
    while (opener !== null) {
      if (opener.cc === C_OPEN_BRACKET || opener.cc === C_BANG) {
        break;
      }
      opener = opener.previous;
    }
    if (opener === null) {
      block.appendChild(text(']'));
      return true;
    }
    if (!opener.active) {
      block.appendChild(text(']'));
      this.removeDelimiter(opener);
      return true;
    }
    is_image = opener.cc === C_BANG;
    if (this.peek() === C_OPEN_PAREN) {
      this.pos++;
      if (this.spnl() && ((dest = this.parseLinkDestination()) !== null) && this.spnl() && (reWhitespaceChar.test(this.subject.charAt(this.pos - 1)) && (title = this.parseLinkTitle()) || true) && this.spnl() && this.peek() === C_CLOSE_PAREN) {
        this.pos += 1;
        matched = true;
      }
    } else {
      var savepos = this.pos;
      var beforelabel = this.pos;
      var n = this.parseLinkLabel();
      if (n === 0 || n === 2) {
        reflabel = this.subject.slice(opener.index, startpos);
      } else {
        reflabel = this.subject.slice(beforelabel, beforelabel + n);
      }
      if (n === 0) {
        this.pos = savepos;
      }
      var link = this.refmap[normalizeReference(reflabel)];
      if (link) {
        dest = link.destination;
        title = link.title;
        matched = true;
      }
    }
    if (matched) {
      var node = new Node(is_image ? 'Image' : 'Link');
      node._destination = dest;
      node._title = title || '';
      var tmp,
          next;
      tmp = opener.node._next;
      while (tmp) {
        next = tmp._next;
        tmp.unlink();
        node.appendChild(tmp);
        tmp = next;
      }
      block.appendChild(node);
      this.processEmphasis(opener.previous);
      opener.node.unlink();
      if (!is_image) {
        opener = this.delimiters;
        while (opener !== null) {
          if (opener.cc === C_OPEN_BRACKET) {
            opener.active = false;
          }
          opener = opener.previous;
        }
      }
      return true;
    } else {
      this.removeDelimiter(opener);
      this.pos = startpos;
      block.appendChild(text(']'));
      return true;
    }
  };
  var parseEntity = function(block) {
    var m;
    if ((m = this.match(reEntityHere))) {
      block.appendChild(text(decodeHTML(m)));
      return true;
    } else {
      return false;
    }
  };
  var parseString = function(block) {
    var m;
    if ((m = this.match(reMain))) {
      if (this.options.smart) {
        block.appendChild(text(m.replace(reEllipses, "\u2026").replace(reDash, function(chars) {
          var enCount = 0;
          var emCount = 0;
          if (chars.length % 3 === 0) {
            emCount = chars.length / 3;
          } else if (chars.length % 2 === 0) {
            enCount = chars.length / 2;
          } else if (chars.length % 3 === 2) {
            enCount = 1;
            emCount = (chars.length - 2) / 3;
          } else {
            enCount = 2;
            emCount = (chars.length - 4) / 3;
          }
          return "\u2014".repeat(emCount) + "\u2013".repeat(enCount);
        })));
      } else {
        block.appendChild(text(m));
      }
      return true;
    } else {
      return false;
    }
  };
  var parseNewline = function(block) {
    this.pos += 1;
    var lastc = block._lastChild;
    if (lastc && lastc.type === 'Text' && lastc._literal[lastc._literal.length - 1] === ' ') {
      var hardbreak = lastc._literal[lastc._literal.length - 2] === ' ';
      lastc._literal = lastc._literal.replace(reFinalSpace, '');
      block.appendChild(new Node(hardbreak ? 'Hardbreak' : 'Softbreak'));
    } else {
      block.appendChild(new Node('Softbreak'));
    }
    this.match(reInitialSpace);
    return true;
  };
  var parseReference = function(s, refmap) {
    this.subject = s;
    this.pos = 0;
    var rawlabel;
    var dest;
    var title;
    var matchChars;
    var startpos = this.pos;
    matchChars = this.parseLinkLabel();
    if (matchChars === 0) {
      return 0;
    } else {
      rawlabel = this.subject.substr(0, matchChars);
    }
    if (this.peek() === C_COLON) {
      this.pos++;
    } else {
      this.pos = startpos;
      return 0;
    }
    this.spnl();
    dest = this.parseLinkDestination();
    if (dest === null || dest.length === 0) {
      this.pos = startpos;
      return 0;
    }
    var beforetitle = this.pos;
    this.spnl();
    title = this.parseLinkTitle();
    if (title === null) {
      title = '';
      this.pos = beforetitle;
    }
    var atLineEnd = true;
    if (this.match(reSpaceAtEndOfLine) === null) {
      if (title === '') {
        atLineEnd = false;
      } else {
        title = '';
        this.pos = beforetitle;
        atLineEnd = this.match(reSpaceAtEndOfLine) !== null;
      }
    }
    if (!atLineEnd) {
      this.pos = startpos;
      return 0;
    }
    var normlabel = normalizeReference(rawlabel);
    if (normlabel === '') {
      this.pos = startpos;
      return 0;
    }
    if (!refmap[normlabel]) {
      refmap[normlabel] = {
        destination: dest,
        title: title
      };
    }
    return this.pos - startpos;
  };
  var parseInline = function(block) {
    var res = false;
    var c = this.peek();
    if (c === -1) {
      return false;
    }
    switch (c) {
      case C_NEWLINE:
        res = this.parseNewline(block);
        break;
      case C_BACKSLASH:
        res = this.parseBackslash(block);
        break;
      case C_BACKTICK:
        res = this.parseBackticks(block);
        break;
      case C_ASTERISK:
      case C_UNDERSCORE:
        res = this.handleDelim(c, block);
        break;
      case C_SINGLEQUOTE:
      case C_DOUBLEQUOTE:
        res = this.options.smart && this.handleDelim(c, block);
        break;
      case C_OPEN_BRACKET:
        res = this.parseOpenBracket(block);
        break;
      case C_BANG:
        res = this.parseBang(block);
        break;
      case C_CLOSE_BRACKET:
        res = this.parseCloseBracket(block);
        break;
      case C_LESSTHAN:
        res = this.parseAutolink(block) || this.parseHtmlTag(block);
        break;
      case C_AMPERSAND:
        res = this.parseEntity(block);
        break;
      default:
        res = this.parseString(block);
        break;
    }
    if (!res) {
      this.pos += 1;
      block.appendChild(text(fromCodePoint(c)));
    }
    return true;
  };
  var parseInlines = function(block) {
    this.subject = block._string_content.trim();
    this.pos = 0;
    this.delimiters = null;
    while (this.parseInline(block)) {}
    block._string_content = null;
    this.processEmphasis(null);
  };
  function InlineParser(options) {
    return {
      subject: '',
      delimiters: null,
      pos: 0,
      refmap: {},
      match: match,
      peek: peek,
      spnl: spnl,
      parseBackticks: parseBackticks,
      parseBackslash: parseBackslash,
      parseAutolink: parseAutolink,
      parseHtmlTag: parseHtmlTag,
      scanDelims: scanDelims,
      handleDelim: handleDelim,
      parseLinkTitle: parseLinkTitle,
      parseLinkDestination: parseLinkDestination,
      parseLinkLabel: parseLinkLabel,
      parseOpenBracket: parseOpenBracket,
      parseCloseBracket: parseCloseBracket,
      parseBang: parseBang,
      parseEntity: parseEntity,
      parseString: parseString,
      parseNewline: parseNewline,
      parseReference: parseReference,
      parseInline: parseInline,
      processEmphasis: processEmphasis,
      removeDelimiter: removeDelimiter,
      options: options || {},
      parse: parseInlines
    };
  }
  module.exports = InlineParser;
})(require('process'));
