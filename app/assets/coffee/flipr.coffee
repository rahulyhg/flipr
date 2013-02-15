###
Flipr v1.0.0
Copyright (c) 2012 Mayank B. Patel
Released under the MIT License
###

window.Flipr = {}

Flipr.Effect = class
  constructor: (opts = {})->
    @css_prefix = @canonicalizePrefix(opts['css_prefix'])

    @container_class      = "#{@css_prefix}flipr-container"
    @anon_container_class = "#{@css_prefix}flipr-anon-container"
    @card_class           = "#{@css_prefix}flipr-card"
    @front_class          = "#{@css_prefix}flipr-front"
    @back_class           = "#{@css_prefix}flipr-back"
    @flipped_class        = "#{@css_prefix}flipr-flipped"

  applyTo: (selector) =>
    @applyStyles(selector)
    @applyActions(selector)

  applyStyles: (selector) =>
    containers = $('[data-flipr-container]', $(selector))
    containers.addClass(@container_class)

    # Add anonymous inner container and apply styles
    containers.each (index,container) =>

      # Only add anonymous container if it's not already there
      if $(container).find(".#{@anon_container_class}").length is 0
        front = $(container).children('[data-flipr-front]')
        front.addClass(@card_class)
        front.addClass(@front_class)

        back  = $(container).children('[data-flipr-back]')
        $(back).addClass(@card_class)
        $(back).addClass(@back_class)

        contents      = $(container).html()
        anon_contents = "<div class=\"#{@anon_container_class}\">#{contents}</div>"
        $(container).html(anon_contents)

  applyActions: (selector) =>
    @applyFlipOnClick(selector)
    @applyFlipOnHover(selector)

  applyFlipOnClick: (selector) =>
    $('[data-flip-on-click]', $(selector)).each (index, element) =>
      flipr_card_to_toggle = $(element).data('flip-on-click')

      unless @clickHandlerAlreadyDefined(element)
        $(element).click (event) =>
          event.preventDefault()
          $('.flipr-anon-container', $(flipr_card_to_toggle)).toggleClass(@flipped_class)
          false

  applyFlipOnHover: (selector) =>
    $('[data-flip-on-hover]', $(selector)).each (index, element) =>
      flipr_card_to_toggle = $(element)

      unless @hoverHandlerAlreadyDefined(element, 'hover')
        $(element).hover (event) =>
          event.preventDefault()
          $('.flipr-anon-container', $(flipr_card_to_toggle)).toggleClass(@flipped_class)
          false

  clickHandlerAlreadyDefined: (element) ->
    events = $(element).data('events')
    return false if events is null or events is undefined
    if events.click? then true else false

  hoverHandlerAlreadyDefined: (element, event_type) ->
    events = $(element).data('events')
    return false if events is null or events is undefined
    if events.mouseover? and events.mouseout? then true else false

  # Make sure the suggested css prefix ends in a hypen: '-' if it is specified and non-empty
  canonicalizePrefix: (prefix) ->
    return "" if prefix is null or prefix is undefined or prefix is ""
    if prefix.charAt(prefix.length-1) is '-' then prefix else "#{prefix}-"
