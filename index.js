(function (globals) {
  "use strict";

  const convention = require("./js/convention");
  const typeCheck = require("./js/typeCheck");
  const pathAndValue = require("./js/pathAndValue");
  const argsType = require("./js/argsType");
  const waterfall = require("./js/waterfall");

  const chsp = {
    convention,
    typeCheck,
    pathAndValue,
    argsType,
    waterfall,
  };

  // async-waterfall 참고
  if (typeof define !== "undefined" && define.amd) {
    define([], function () {
      return chsp;
    }); // RequireJS
  } else if (typeof module !== "undefined" && module.exports) {
    module.exports = chsp; // CommonJS
  } else {
    globals.chsp = chsp; // <script>
  }
})(this);
