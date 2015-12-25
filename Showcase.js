var ShowcaseView;

module.exports = new (ShowcaseView = (function() {
  function ShowcaseView() {}

  ShowcaseView.prototype._product = null;

  ShowcaseView.prototype.background = 'rgba(0,0,0,0)';

  ShowcaseView.prototype.accent = [200, 200, 200];

  ShowcaseView.prototype.radius = 0;

  ShowcaseView.prototype.location = [0, 0];

  ShowcaseView.prototype.title = '';

  ShowcaseView.prototype.caption = '';

  ShowcaseView.prototype.action = 'Next';

  ShowcaseView.prototype.callback = false;

  ShowcaseView.prototype.setBackground = function(background) {
    this.background = background;
    return this;
  };

  ShowcaseView.prototype.setAccentColor = function(color) {
    var result, shorthandRegex;
    shorthandRegex = color = color.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    this.accent = result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : this.accent(JSON.parse('[' + color.match(/(\d{1,3}\,?){3}/)[0].replace(/\,$/, '') + ']'));
    return this;
  };

  ShowcaseView.prototype.setRadius = function(radius) {
    this.radius = radius;
    return this;
  };

  ShowcaseView.prototype.setLocation = function(x, y) {
    this.location = [x - this.radius, y - this.radius];
    return this;
  };

  ShowcaseView.prototype.setTitle = function(title) {
    this.title = title;
    return this;
  };

  ShowcaseView.prototype.setCaption = function(caption) {
    this.caption = caption;
    return this;
  };

  ShowcaseView.prototype.setAction = function(action) {
    this.action = action;
    return this;
  };

  ShowcaseView.prototype.setCallback = function(callback) {
    this.callback = callback;
    return this;
  };

  ShowcaseView.prototype.dispose = function() {
    return this._product.fadeOut(150, function() {
      if (this._product !== null) {
        return this.remove();
      }
    });
  };

  ShowcaseView.prototype.buildBlocks = function() {
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

  ShowcaseView.prototype.build = function() {
    var blockBottom, blockLeft, blockRight, blockTop, button, buttonWrapper, cling, clipper, clipperContainer, heightLoaded, ref, ref1, textContent, widthLoaded;
    this._product = $('<div/>').css({
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    });
    clipperContainer = this._product.clone().appendTo(this._product);
    this._product.appendTo('body').css({
      alignItems: 'center',
      color: '#fff',
      cursor: 'default',
      display: 'flex',
      opacity: 0,
      justifyContent: 'center'
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
    textContent = $('<div/>').appendTo(this._product).css({
      textAlign: 'left',
      width: 400,
      zIndex: 2
    }).append($('<span/>').text(this.title).css({
      color: "rgb(" + (this.accent.join(',')) + ")",
      display: 'block',
      fontSize: '16pt',
      marginBottom: '2rem'
    })).append($('<span/>').text(this.caption).css({
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
        }
      };
    })(this));
    return this._product.animate({
      opacity: 1
    }, 250);
  };

  return ShowcaseView;

})());
