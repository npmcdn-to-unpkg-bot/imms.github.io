/* */ 
(function(process) {
  MathJax.Localization.addTranslation("en", null, {
    menuTitle: "English",
    version: "2.6.0",
    isLoaded: true,
    domains: {
      _: {
        version: "2.6.0",
        isLoaded: true,
        strings: {
          CookieConfig: "MathJax has found a user-configuration cookie that includes code to be run. Do you want to run it?\n\n(You should press Cancel unless you set up the cookie yourself.)",
          MathProcessingError: "Math processing error",
          MathError: "Math error",
          LoadFile: "Loading %1",
          Loading: "Loading",
          LoadFailed: "File failed to load: %1",
          ProcessMath: "Processing math: %1%%",
          Processing: "Processing",
          TypesetMath: "Typesetting math: %1%%",
          Typesetting: "Typesetting",
          MathJaxNotSupported: "Your browser does not support MathJax"
        }
      },
      FontWarnings: {},
      "HTML-CSS": {},
      HelpDialog: {},
      MathML: {},
      MathMenu: {},
      TeX: {}
    },
    plural: function(a) {
      if (a === 1) {
        return 1;
      }
      return 2;
    },
    number: function(a) {
      return a;
    }
  });
  MathJax.Ajax.loadComplete("[MathJax]/localization/en/en.js");
})(require('process'));