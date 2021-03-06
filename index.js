// Generated by CoffeeScript 1.10.0
(function() {
  var Showcase;

  (function(glob, factory) {
    if (typeof define === 'function' && define.amd) {
      return define('eve', function() {
        return factory;
      });
    } else if (typeof exports === 'object') {
      return module.exports = factory;
    } else {
      return glob.eve = factory;
    }
  })(window, Showcase = (function() {
    function Showcase() {}

    Showcase.prototype._product = null;

    Showcase.prototype.background = 'rgba(0,0,0,0)';

    Showcase.prototype.accent = [200, 200, 200];

    Showcase.prototype.radius = 0;

    Showcase.prototype.location = null;

    Showcase.prototype.title = '';

    Showcase.prototype.caption = '';

    Showcase.prototype.action = 'Next';

    Showcase.prototype.callback = false;

    Showcase.prototype.setBackground = function(background) {
      this.background = background;
      return this;
    };

    Showcase.prototype.setAccentColor = function(color) {
      var result;
      color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });
      result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
      this.accent = result ? [+("0x" + result[1]), +("0x" + result[2]), +("0x" + result[3])] : this.accent(JSON.parse('[' + color.match(/(\d{1,3}\,?){3}/)[0].replace(/\,$/, '') + ']'));
      return this;
    };

    Showcase.prototype.setRadius = function(radius) {
      this.radius = radius;
      return this;
    };

    Showcase.prototype.setLocation = function(x, y) {
      this.location = [x - this.radius, y - this.radius];
      return this;
    };

    Showcase.prototype.setTitle = function(title) {
      this.title = title;
      return this;
    };

    Showcase.prototype.setCaption = function(caption) {
      this.caption = caption;
      return this;
    };

    Showcase.prototype.setAction = function(action) {
      this.action = action;
      return this;
    };

    Showcase.prototype.setCallback = function(callback) {
      this.callback = callback;
      return this;
    };

    Showcase.prototype.setDebug = function(debug) {
      this.debug = debug;
      return this;
    };

    Showcase.prototype.dispose = function() {
      var prod;
      prod = this._product;
      return prod.fadeOut(150, function() {
        return this.remove();
      });
    };

    Showcase.prototype.buildBlocks = function() {
      var block, blocks, i;
      i = 0;
      blocks = [];
      while (++i < 5) {
        block = $('<div/>').css({
          background: this.background,
          bottom: 0,
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0
        }).appendTo(this._product);
        blocks.push(block);
      }
      return blocks;
    };

    Showcase.prototype.build = function() {
      var blockBottom, blockLeft, blockRight, blockTop, button, buttonWrapper, cling, clipper, clipperContainer, heightLoaded, ref, ref1, textContent, widthLoaded;
      if (this.debug) {
        console.log('[Showcase]', 'building showcase');
        console.log('[Showcase]', '@background is', this.background);
        console.log('[Showcase]', '@accent is', this.accent);
        console.log('[Showcase]', '@location is', this.location);
        console.log('[Showcase]', '@radius is', this.radius);
        console.log('[Showcase]', '@title is', this.title);
        console.log('[Showcase]', '@caption is', this.caption);
        console.log('[Showcase]', '@action is', this.action);
        console.log('[Showcase]', '@callback was', (this.callback === false ? 'not ' : '') + 'set');
      }
      this._product = $('<div/>').css({
        bottom: 0,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0
      });
      clipperContainer = this._product.clone().appendTo(this._product);
      this._product.appendTo('body').attr('style', function() {
        return $(this).attr('style') + "-webkit-align-items: center;\nalign-items: center;\ndisplay: -webkit-flex;\ndisplay: flex;\n-webkit-justify-content: center;\njustify-content: center;";
      }).css({
        color: '#fff',
        cursor: 'default',
        opacity: 0,
        zIndex: 10000
      });
      ref = this.buildBlocks(), blockLeft = ref[0], blockTop = ref[1], blockRight = ref[2], blockBottom = ref[3];
      clipper = $('<div/>').appendTo(clipperContainer).css({
        borderRadius: '50%',
        boxShadow: "0 0 0 " + (this.radius / 2) + "px " + this.background,
        height: this.radius * 2,
        position: 'absolute',
        width: this.radius * 2
      });
      cling = $('<div/>').appendTo(this._product).css({
        border: "16px solid rgba(" + (this.accent.join(',')) + ",.6)",
        borderRadius: '50%',
        boxShadow: "0 0 0 40px rgba(" + (this.accent.join(',')) + ",.2)",
        height: this.radius * 2,
        position: 'absolute',
        width: this.radius * 2
      });
      ref1 = [window.innerWidth, window.innerHeight], widthLoaded = ref1[0], heightLoaded = ref1[1];
      if (this.location === null) {
        cling.add(blockTop).add(blockRight).add(blockBottom).hide();
      } else {
        $(window).off('resize.showcase').on('resize.showcase', (function(_this) {
          return function() {
            var x, y;
            x = _this.location[0] + window.innerWidth - widthLoaded;
            y = _this.location[1] + window.innerHeight - heightLoaded;
            blockLeft.css({
              right: window.innerWidth - x
            });
            blockRight.css({
              left: x + _this.radius * 2
            });
            blockTop.add(blockBottom).css({
              left: x,
              right: window.innerWidth - x - _this.radius * 2
            });
            blockTop.css({
              bottom: window.innerHeight - y
            });
            blockBottom.css({
              top: y + _this.radius * 2
            });
            clipperContainer.css({
              clip: "rect(" + y + "px," + (x + _this.radius * 2) + "px," + (y + _this.radius * 2) + "px," + x + "px)"
            });
            clipper.css({
              left: x,
              top: y
            });
            return cling.css({
              left: x - 16,
              top: y - 16
            });
          };
        })(this)).trigger('resize');
      }
      textContent = $('<div/>').appendTo(this._product).css({
        textAlign: 'left',
        width: 400,
        zIndex: 2
      }).append($('<span/>').html(this.title).css({
        color: "rgb(" + (this.accent.join(',')) + ")",
        display: 'block',
        fontSize: '16pt',
        marginBottom: '2rem'
      })).append($('<span/>').html(this.caption).css({
        lineHeight: '28px'
      }));
      buttonWrapper = $('<div/>').appendTo(textContent).css({
        marginTop: '4rem',
        textAlign: 'right'
      });
      button = $('<button/>').appendTo(buttonWrapper).text(this.action).css({
        background: "rgba(" + (this.accent.join(',')) + ",.5)",
        border: 0,
        borderRadius: 4,
        outline: 0,
        padding: '.75rem 1.5rem'
      }).on('mouseenter mouseup', (function(_this) {
        return function() {
          return button.css({
            background: "rgba(" + (_this.accent.join(',')) + ",.65)"
          });
        };
      })(this)).on('mousedown', (function(_this) {
        return function() {
          return button.css({
            background: "rgba(" + (_this.accent.join(',')) + ",.55)"
          });
        };
      })(this)).on('mouseleave', (function(_this) {
        return function() {
          return button.css({
            background: "rgba(" + (_this.accent.join(',')) + ",.6)"
          });
        };
      })(this)).on('click', (function(_this) {
        return function() {
          if (_this.callback) {
            return _this.callback();
          } else {
            return _this.dispose();
          }
        };
      })(this));
      return this._product.animate({
        opacity: 1
      }, 250);
    };

    return Showcase;

  })());

}).call(this);
