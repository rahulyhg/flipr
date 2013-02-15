
/*
Flipr v1.0.0
Copyright (c) 2012 Mayank B. Patel
Released under the MIT License
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Flipr = {};

  Flipr.Effect = (function() {

    function _Class(opts) {
      if (opts == null) {
        opts = {};
      }
      this.applyFlipOnHover = __bind(this.applyFlipOnHover, this);

      this.applyFlipOnClick = __bind(this.applyFlipOnClick, this);

      this.applyActions = __bind(this.applyActions, this);

      this.applyStyles = __bind(this.applyStyles, this);

      this.applyTo = __bind(this.applyTo, this);

      this.css_prefix = this.canonicalizePrefix(opts['css_prefix']);
      this.container_class = "" + this.css_prefix + "flipr-container";
      this.anon_container_class = "" + this.css_prefix + "flipr-anon-container";
      this.card_class = "" + this.css_prefix + "flipr-card";
      this.front_class = "" + this.css_prefix + "flipr-front";
      this.back_class = "" + this.css_prefix + "flipr-back";
      this.flipped_class = "" + this.css_prefix + "flipr-flipped";
    }

    _Class.prototype.applyTo = function(selector) {
      this.applyStyles(selector);
      return this.applyActions(selector);
    };

    _Class.prototype.applyStyles = function(selector) {
      var containers,
        _this = this;
      containers = $('[data-flipr-container]', $(selector));
      containers.addClass(this.container_class);
      return containers.each(function(index, container) {
        var anon_contents, back, contents, front;
        if ($(container).find("." + _this.anon_container_class).length === 0) {
          front = $(container).children('[data-flipr-front]');
          front.addClass(_this.card_class);
          front.addClass(_this.front_class);
          back = $(container).children('[data-flipr-back]');
          $(back).addClass(_this.card_class);
          $(back).addClass(_this.back_class);
          contents = $(container).html();
          anon_contents = "<div class=\"" + _this.anon_container_class + "\">" + contents + "</div>";
          return $(container).html(anon_contents);
        }
      });
    };

    _Class.prototype.applyActions = function(selector) {
      this.applyFlipOnClick(selector);
      return this.applyFlipOnHover(selector);
    };

    _Class.prototype.applyFlipOnClick = function(selector) {
      var _this = this;
      return $('[data-flip-on-click]', $(selector)).each(function(index, element) {
        var flipr_card_to_toggle;
        flipr_card_to_toggle = $(element).data('flip-on-click');
        if (!_this.clickHandlerAlreadyDefined(element)) {
          return $(element).click(function(event) {
            event.preventDefault();
            $('.flipr-anon-container', $(flipr_card_to_toggle)).toggleClass(_this.flipped_class);
            return false;
          });
        }
      });
    };

    _Class.prototype.applyFlipOnHover = function(selector) {
      var _this = this;
      return $('[data-flip-on-hover]', $(selector)).each(function(index, element) {
        var flipr_card_to_toggle;
        flipr_card_to_toggle = $(element);
        if (!_this.hoverHandlerAlreadyDefined(element, 'hover')) {
          return $(element).hover(function(event) {
            event.preventDefault();
            $('.flipr-anon-container', $(flipr_card_to_toggle)).toggleClass(_this.flipped_class);
            return false;
          });
        }
      });
    };

    _Class.prototype.clickHandlerAlreadyDefined = function(element) {
      var events;
      events = $(element).data('events');
      if (events === null || events === void 0) {
        return false;
      }
      if (events.click != null) {
        return true;
      } else {
        return false;
      }
    };

    _Class.prototype.hoverHandlerAlreadyDefined = function(element, event_type) {
      var events;
      events = $(element).data('events');
      if (events === null || events === void 0) {
        return false;
      }
      if ((events.mouseover != null) && (events.mouseout != null)) {
        return true;
      } else {
        return false;
      }
    };

    _Class.prototype.canonicalizePrefix = function(prefix) {
      if (prefix === null || prefix === void 0 || prefix === "") {
        return "";
      }
      if (prefix.charAt(prefix.length - 1) === '-') {
        return prefix;
      } else {
        return "" + prefix + "-";
      }
    };

    return _Class;

  })();

}).call(this);
