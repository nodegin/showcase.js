((glob, factory) ->

  if typeof define == 'function' and define.amd
    define 'eve', -> factory
  else if typeof exports == 'object'
    module.exports = factory
  else
    glob.eve = factory

) window, new class ShowcaseView

  _product: null
  background: 'rgba(0,0,0,0)'
  accent: [200, 200, 200]
  radius: 0
  location: [0, 0]
  title: ''
  caption: ''
  action: 'Next'
  callback: no

  setBackground: (@background)-> @

  setAccentColor: (color)->
    shorthandRegex = ;
    color = color.replace /^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b)-> r + r + g + g + b + b
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec color
    @accent =
      if result then [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      else @accent JSON.parse '[' + color.match(/(\d{1,3}\,?){3}/)[0].replace(/\,$/, '') + ']'
    @

  setRadius: (@radius)-> @

  setLocation: (x, y)->
    @location = [x - @radius, y - @radius]
    @

  setTitle: (@title)-> @

  setCaption: (@caption)-> @

  setAction: (@action)-> @

  setCallback: (@callback)-> @

  dispose: -> @_product.fadeOut 150, -> @remove() if @_product?

  buildBlocks: ->
    i = 0
    blocks = []
    while ++i < 5
      block = $('<div/>').css
        background: @background
        bottom: 0
        left: 0
        position: 'absolute'
        right: 0
        top: 0
      .appendTo @_product
      blocks.push block
    blocks

  build: ->
    @_product = $('<div/>').css
      bottom: 0
      left: 0
      position: 'absolute'
      right: 0
      top: 0

    clipperContainer = @_product.clone().appendTo @_product

    @_product.appendTo('body').attr 'style', ->
      return $(this).attr('style') + """
        -webkit-align-items: center;
        align-items: center;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
      """
    .css
      color: '#fff'
      cursor: 'default'
      opacity: 0

    [blockLeft, blockTop, blockRight, blockBottom] = @buildBlocks()

    clipper = $('<div/>').appendTo(clipperContainer).css
      borderRadius: '50%'
      boxShadow: "0 0 0 #{@radius / 2}px #{@background}"
      height: @radius * 2
      position: 'absolute'
      width: @radius * 2

    cling = $('<div/>').appendTo(@_product).css
      border: "16px solid rgba(#{@accent.join(',')},.6)"
      borderRadius: '50%'
      boxShadow: "0 0 0 40px rgba(#{@accent.join(',')},.2)"
      height: @radius * 2
      position: 'absolute'
      width: @radius * 2

    [widthLoaded, heightLoaded] = [window.innerWidth, window.innerHeight]

    $(window).off('resize.showcase').on 'resize.showcase', =>
      x = @location[0] + window.innerWidth - widthLoaded
      y = @location[1] + window.innerHeight - heightLoaded

      blockLeft.css { right: window.innerWidth - x }
      blockRight.css { left: x + @radius * 2 }

      blockTop.add(blockBottom).css
        left: x
        right: window.innerWidth - x - @radius * 2

      blockTop.css { bottom: window.innerHeight - y }
      blockBottom.css { top: y + @radius * 2 }

      clipperContainer.css
        clip: "rect(#{y}px,#{x + @radius * 2}px,#{y + @radius * 2}px,#{x}px)"
      clipper.css { left: x, top: y }
      cling.css { left: x - 16, top: y - 16 }
    .trigger 'resize'

    textContent = $('<div/>').appendTo(@_product).css
      textAlign: 'left'
      width: 400
      zIndex: 2
    .append $('<span/>').text(@title).css
      color: "rgb(#{@accent.join(',')})"
      display: 'block'
      fontSize: '16pt'
      marginBottom: '2rem'
    .append $('<span/>').text(@caption).css
      lineHeight: '28px'

    buttonWrapper = $('<div/>').appendTo(textContent).css
      marginTop: '4rem'
      textAlign: 'right'

    button = $('<button/>').appendTo(buttonWrapper).text(@action).css
      background: "rgba(#{@accent.join(',')},.5)"
      border: 0
      borderRadius: 4
      outline: 0
      padding: '.75rem 1.5rem'
    .on 'mouseenter mouseup', => button.css { background: "rgba(#{@accent.join(',')},.65)" }
    .on 'mousedown', => button.css { background: "rgba(#{@accent.join(',')},.55)" }
    .on 'mouseleave', => button.css { background: "rgba(#{@accent.join(',')},.6)" }
    .on 'click', => @callback() if @callback

    @_product.animate { opacity: 1 }, 250
