/* ===================================================
 * bootstrap-transition.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#transitions
 * ===================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


  /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
   * ======================================================= */

  $(function () {

    $.support.transition = (function () {

      var transitionEnd = (function () {

        var el = document.createElement('bootstrap')
          , transEndEventNames = {
               'WebkitTransition' : 'webkitTransitionEnd'
            ,  'MozTransition'    : 'transitionend'
            ,  'OTransition'      : 'oTransitionEnd otransitionend'
            ,  'transition'       : 'transitionend'
            }
          , name

        for (name in transEndEventNames){
          if (el.style[name] !== undefined) {
            return transEndEventNames[name]
          }
        }

      }())

      return transitionEnd && {
        end: transitionEnd
      }

    })()

  })

}(window.jQuery);/* ==========================================================
 * bootstrap-alert.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* ALERT CLASS DEFINITION
  * ====================== */

  var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
      }

  Alert.prototype.close = function (e) {
    var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = $(selector)

    e && e.preventDefault()

    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

    $parent.trigger(e = $.Event('close'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent
        .trigger('closed')
        .remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
  }


 /* ALERT PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('alert')
      if (!data) $this.data('alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


 /* ALERT NO CONFLICT
  * ================= */

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


 /* ALERT DATA-API
  * ============== */

  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);/* ============================================================
 * bootstrap-button.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* BUTTON PUBLIC CLASS DEFINITION
  * ============================== */

  var Button = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.button.defaults, options)
  }

  Button.prototype.setState = function (state) {
    var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

    state = state + 'Text'
    data.resetText || $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]')

    $parent && $parent
      .find('.active')
      .removeClass('active')

    this.$element.toggleClass('active')
  }


 /* BUTTON PLUGIN DEFINITION
  * ======================== */

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
      if (!data) $this.data('button', (data = new Button(this, options)))
      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.defaults = {
    loadingText: 'loading...'
  }

  $.fn.button.Constructor = Button


 /* BUTTON NO CONFLICT
  * ================== */

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


 /* BUTTON DATA-API
  * =============== */

  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
  })

}(window.jQuery);/* ==========================================================
 * bootstrap-carousel.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* CAROUSEL CLASS DEFINITION
  * ========================= */

  var Carousel = function (element, options) {
    this.$element = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options = options
    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.prototype = {

    cycle: function (e) {
      if (!e) this.paused = false
      if (this.interval) clearInterval(this.interval);
      this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
      return this
    }

  , getActiveIndex: function () {
      this.$active = this.$element.find('.item.active')
      this.$items = this.$active.parent().children()
      return this.$items.index(this.$active)
    }

  , to: function (pos) {
      var activeIndex = this.getActiveIndex()
        , that = this

      if (pos > (this.$items.length - 1) || pos < 0) return

      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos)
        })
      }

      if (activeIndex == pos) {
        return this.pause().cycle()
      }

      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }

  , pause: function (e) {
      if (!e) this.paused = true
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end)
        this.cycle(true)
      }
      clearInterval(this.interval)
      this.interval = null
      return this
    }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
    }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
    }

  , slide: function (type, next) {
      var $active = this.$element.find('.item.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback  = type == 'next' ? 'first' : 'last'
        , that = this
        , e

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      e = $.Event('slide', {
        relatedTarget: $next[0]
      , direction: direction
      })

      if ($next.hasClass('active')) return

      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active')
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
          $nextIndicator && $nextIndicator.addClass('active')
        })
      }

      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $next.addClass(type)
        $next[0].offsetWidth // force reflow
        $active.addClass(direction)
        $next.addClass(direction)
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
      } else {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $active.removeClass('active')
        $next.addClass('active')
        this.sliding = false
        this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
    }

  }


 /* CAROUSEL PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
        , action = typeof option == 'string' ? option : options.slide
      if (!data) $this.data('carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.defaults = {
    interval: 5000
  , pause: 'hover'
  }

  $.fn.carousel.Constructor = Carousel


 /* CAROUSEL NO CONFLICT
  * ==================== */

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }

 /* CAROUSEL DATA-API
  * ================= */

  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href
      , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      , options = $.extend({}, $target.data(), $this.data())
      , slideIndex

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle()
    }

    e.preventDefault()
  })

}(window.jQuery);/* =============================================================
 * bootstrap-collapse.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* COLLAPSE PUBLIC CLASS DEFINITION
  * ================================ */

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.collapse.defaults, options)

    if (this.options.parent) {
      this.$parent = $(this.options.parent)
    }

    this.options.toggle && this.toggle()
  }

  Collapse.prototype = {

    constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
    }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning || this.$element.hasClass('in')) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      $.support.transition && this.$element[dimension](this.$element[0][scroll])
    }

  , hide: function () {
      var dimension
      if (this.transitioning || !this.$element.hasClass('in')) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
    }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
    }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
          }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
    }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* COLLAPSE PLUGIN DEFINITION
  * ========================== */

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('collapse')
        , options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.defaults = {
    toggle: true
  }

  $.fn.collapse.Constructor = Collapse


 /* COLLAPSE NO CONFLICT
  * ==================== */

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


 /* COLLAPSE DATA-API
  * ================= */

  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href
      , target = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
      , option = $(target).data('collapse') ? 'toggle' : $this.data()
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    $(target).collapse(option)
  })

}(window.jQuery);/* ============================================================
 * bootstrap-dropdown.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

  "use strict"; // jshint ;_;


 /* DROPDOWN CLASS DEFINITION
  * ========================= */

  var toggle = '[data-toggle=dropdown]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
          $el.parent().removeClass('open')
        })
      }

  Dropdown.prototype = {

    constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , isActive

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) {
        $parent.toggleClass('open')
      }

      $this.focus()

      return false
    }

  , keydown: function (e) {
      var $this
        , $items
        , $active
        , $parent
        , isActive
        , index

      if (!/(38|40|27)/.test(e.keyCode)) return

      $this = $(this)

      e.preventDefault()
      e.stopPropagation()

      if ($this.is('.disabled, :disabled')) return

      $parent = getParent($this)

      isActive = $parent.hasClass('open')

      if (!isActive || (isActive && e.keyCode == 27)) {
        if (e.which == 27) $parent.find(toggle).focus()
        return $this.click()
      }

      $items = $('[role=menu] li:not(.divider):visible a', $parent)

      if (!$items.length) return

      index = $items.index($items.filter(':focus'))

      if (e.keyCode == 38 && index > 0) index--                                        // up
      if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
      if (!~index) index = 0

      $items
        .eq(index)
        .focus()
    }

  }

  function clearMenus() {
    $(toggle).each(function () {
      getParent($(this)).removeClass('open')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')
      , $parent

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $parent = selector && $(selector)

    if (!$parent || !$parent.length) $parent = $this.parent()

    return $parent
  }


  /* DROPDOWN PLUGIN DEFINITION
   * ========================== */

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('dropdown')
      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


 /* DROPDOWN NO CONFLICT
  * ==================== */

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  /* APPLY TO STANDARD DROPDOWN ELEMENTS
   * =================================== */

  $(document)
    .on('click.dropdown.data-api', clearMenus)
    .on('click.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.dropdown-menu', function (e) { e.stopPropagation() })
    .on('click.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);
/* =========================================================
 * bootstrap-modal.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict"; // jshint ;_;


 /* MODAL CLASS DEFINITION
  * ====================== */

  var Modal = function (element, options) {
    this.options = options
    this.$element = $(element)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote)
  }

  Modal.prototype = {

      constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
      }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        this.isShown = true

        this.escape()

        this.backdrop(function () {
          var transition = $.support.transition && that.$element.hasClass('fade')

          if (!that.$element.parent().length) {
            that.$element.appendTo(document.body) //don't move modals dom position
          }

          that.$element.show()

          if (transition) {
            that.$element[0].offsetWidth // force reflow
          }

          that.$element
            .addClass('in')
            .attr('aria-hidden', false)

          that.enforceFocus()

          transition ?
            that.$element.one($.support.transition.end, function () { that.$element.focus().trigger('shown') }) :
            that.$element.focus().trigger('shown')

        })
      }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        this.escape()

        $(document).off('focusin.modal')

        this.$element
          .removeClass('in')
          .attr('aria-hidden', true)

        $.support.transition && this.$element.hasClass('fade') ?
          this.hideWithTransition() :
          this.hideModal()
      }

    , enforceFocus: function () {
        var that = this
        $(document).on('focusin.modal', function (e) {
          if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
            that.$element.focus()
          }
        })
      }

    , escape: function () {
        var that = this
        if (this.isShown && this.options.keyboard) {
          this.$element.on('keyup.dismiss.modal', function ( e ) {
            e.which == 27 && that.hide()
          })
        } else if (!this.isShown) {
          this.$element.off('keyup.dismiss.modal')
        }
      }

    , hideWithTransition: function () {
        var that = this
          , timeout = setTimeout(function () {
              that.$element.off($.support.transition.end)
              that.hideModal()
            }, 500)

        this.$element.one($.support.transition.end, function () {
          clearTimeout(timeout)
          that.hideModal()
        })
      }

    , hideModal: function () {
        var that = this
        this.$element.hide()
        this.backdrop(function () {
          that.removeBackdrop()
          that.$element.trigger('hidden')
        })
      }

    , removeBackdrop: function () {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
      }

    , backdrop: function (callback) {
        var that = this
          , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
          var doAnimate = $.support.transition && animate

          this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)

          this.$backdrop.click(
            this.options.backdrop == 'static' ?
              $.proxy(this.$element[0].focus, this.$element[0])
            : $.proxy(this.hide, this)
          )

          if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

          this.$backdrop.addClass('in')

          if (!callback) return

          doAnimate ?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (!this.isShown && this.$backdrop) {
          this.$backdrop.removeClass('in')

          $.support.transition && this.$element.hasClass('fade')?
            this.$backdrop.one($.support.transition.end, callback) :
            callback()

        } else if (callback) {
          callback()
        }
      }
  }


 /* MODAL PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.modal

  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
      if (!data) $this.data('modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option]()
      else if (options.show) data.show()
    })
  }

  $.fn.modal.defaults = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  $.fn.modal.Constructor = Modal


 /* MODAL NO CONFLICT
  * ================= */

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


 /* MODAL DATA-API
  * ============== */

  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
      , href = $this.attr('href')
      , $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
      , option = $target.data('modal') ? 'toggle' : $.extend({ remote:!/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option)
      .one('hide', function () {
        $this.focus()
      })
  })

}(window.jQuery);
/* ===========================================================
 * bootstrap-tooltip.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut
        , triggers
        , trigger
        , i

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      triggers = this.options.trigger.split(' ')

      for (i = triggers.length; i--;) {
        trigger = triggers[i]
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
        }
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options)

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var defaults = $.fn[this.type].defaults
        , options = {}
        , self

      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value
      }, this)

      self = $(e.currentTarget)[this.type](options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp
        , e = $.Event('show')

      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e)
        if (e.isDefaultPrevented()) return
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        $tip
          .detach()
          .css({ top: 0, left: 0, display: 'block' })

        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

        pos = this.getPosition()

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        this.applyPlacement(tp, placement)
        this.$element.trigger('shown')
      }
    }

  , applyPlacement: function(offset, placement){
      var $tip = this.tip()
        , width = $tip[0].offsetWidth
        , height = $tip[0].offsetHeight
        , actualWidth
        , actualHeight
        , delta
        , replace

      $tip
        .offset(offset)
        .addClass(placement)
        .addClass('in')

      actualWidth = $tip[0].offsetWidth
      actualHeight = $tip[0].offsetHeight

      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight
        replace = true
      }

      if (placement == 'bottom' || placement == 'top') {
        delta = 0

        if (offset.left < 0){
          delta = offset.left * -2
          offset.left = 0
          $tip.offset(offset)
          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight
        }

        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top')
      }

      if (replace) $tip.offset(offset)
    }

  , replaceArrow: function(delta, dimension, position){
      this
        .arrow()
        .css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()
        , e = $.Event('hide')

      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).detach()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.detach()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.detach()

      this.$element.trigger('hidden')

      return this
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function () {
      var el = this.$element[0]
      return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {
        width: el.offsetWidth
      , height: el.offsetHeight
      }, this.$element.offset())
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , arrow: function(){
      return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this
      self.tip().hasClass('in') ? self.hide() : self.show()
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  var old = $.fn.tooltip

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }


 /* TOOLTIP NO CONFLICT
  * =================== */

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(window.jQuery);
/* ===========================================================
 * bootstrap-popover.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#popovers
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* POPOVER PUBLIC CLASS DEFINITION
  * =============================== */

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }


  /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
     ========================================== */

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

    constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
    }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
    }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = (typeof o.content == 'function' ? o.content.call($e[0]) :  o.content)
        || $e.attr('data-content')

      return content
    }

  , tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template)
      }
      return this.$tip
    }

  , destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type)
    }

  })


 /* POPOVER PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.popover

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
      if (!data) $this.data('popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.popover.Constructor = Popover

  $.fn.popover.defaults = $.extend({} , $.fn.tooltip.defaults, {
    placement: 'right'
  , trigger: 'click'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


 /* POPOVER NO CONFLICT
  * =================== */

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(window.jQuery);
/* =============================================================
 * bootstrap-scrollspy.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* SCROLLSPY CLASS DEFINITION
  * ========================== */

  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
    this.options = $.extend({}, $.fn.scrollspy.defaults, options)
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process)
    this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
    this.$body = $('body')
    this.refresh()
    this.process()
  }

  ScrollSpy.prototype = {

      constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
            var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
            return ( $href
              && $href.length
              && [[ $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href ]] ) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
            self.offsets.push(this[0])
            self.targets.push(this[1])
          })
      }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
          return activeTarget != (i = targets.last()[0])
            && this.activate ( i )
        }

        for (i = offsets.length; i--;) {
          activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate( targets[i] )
        }
      }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu').length)  {
          active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
      }

  }


 /* SCROLLSPY PLUGIN DEFINITION
  * =========================== */

  var old = $.fn.scrollspy

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
      if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.scrollspy.Constructor = ScrollSpy

  $.fn.scrollspy.defaults = {
    offset: 10
  }


 /* SCROLLSPY NO CONFLICT
  * ===================== */

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


 /* SCROLLSPY DATA-API
  * ================== */

  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      $spy.scrollspy($spy.data())
    })
  })

}(window.jQuery);/* ========================================================
 * bootstrap-tab.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active:last a')[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  var old = $.fn.tab

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB NO CONFLICT
  * =============== */

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


 /* TAB DATA-API
  * ============ */

  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

}(window.jQuery);/* =============================================================
 * bootstrap-typeahead.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function($){

  "use strict"; // jshint ;_;


 /* TYPEAHEAD PUBLIC CLASS DEFINITION
  * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, $.fn.typeahead.defaults, options)
    this.matcher = this.options.matcher || this.matcher
    this.sorter = this.options.sorter || this.sorter
    this.highlighter = this.options.highlighter || this.highlighter
    this.updater = this.options.updater || this.updater
    this.source = this.options.source
    this.$menu = $(this.options.menu)
    this.shown = false
    this.listen()
  }

  Typeahead.prototype = {

    constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
    }

  , updater: function (item) {
      return item
    }

  , show: function () {
      var pos = $.extend({}, this.$element.position(), {
        height: this.$element[0].offsetHeight
      })

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height
        , left: pos.left
        })
        .show()

      this.shown = true
      return this
    }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
    }

  , lookup: function (event) {
      var items

      this.query = this.$element.val()

      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this
      }

      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source

      return items ? this.process(items) : this
    }

  , process: function (items) {
      var that = this

      items = $.grep(items, function (item) {
        return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
        return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
    }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
    }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
        else if (~item.indexOf(this.query)) caseSensitive.push(item)
        else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
    }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>'
      })
    }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item)
        i.find('a').html(that.highlighter(item))
        return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
    }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
        next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
    }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
        prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
    }

  , listen: function () {
      this.$element
        .on('focus',    $.proxy(this.focus, this))
        .on('blur',     $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup',    $.proxy(this.keyup, this))

      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
        .on('mouseleave', 'li', $.proxy(this.mouseleave, this))
    }

  , eventSupported: function(eventName) {
      var isSupported = eventName in this.$element
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;')
        isSupported = typeof this.$element[eventName] === 'function'
      }
      return isSupported
    }

  , move: function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault()
          break

        case 38: // up arrow
          e.preventDefault()
          this.prev()
          break

        case 40: // down arrow
          e.preventDefault()
          this.next()
          break
      }

      e.stopPropagation()
    }

  , keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40,38,9,13,27])
      this.move(e)
    }

  , keypress: function (e) {
      if (this.suppressKeyPressRepeat) return
      this.move(e)
    }

  , keyup: function (e) {
      switch(e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break

        case 9: // tab
        case 13: // enter
          if (!this.shown) return
          this.select()
          break

        case 27: // escape
          if (!this.shown) return
          this.hide()
          break

        default:
          this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , focus: function (e) {
      this.focused = true
    }

  , blur: function (e) {
      this.focused = false
      if (!this.mousedover && this.shown) this.hide()
    }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
      this.$element.focus()
    }

  , mouseenter: function (e) {
      this.mousedover = true
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
    }

  , mouseleave: function (e) {
      this.mousedover = false
      if (!this.focused && this.shown) this.hide()
    }

  }


  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead

  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
      if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.typeahead.defaults = {
    source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
  , minLength: 1
  }

  $.fn.typeahead.Constructor = Typeahead


 /* TYPEAHEAD NO CONFLICT
  * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old
    return this
  }


 /* TYPEAHEAD DATA-API
  * ================== */

  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this)
    if ($this.data('typeahead')) return
    $this.typeahead($this.data())
  })

}(window.jQuery);
/* ==========================================================
 * bootstrap-affix.js v2.3.1
 * http://twitter.github.com/bootstrap/javascript.html#affix
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* AFFIX CLASS DEFINITION
  * ====================== */

  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options)
    this.$window = $(window)
      .on('scroll.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.affix.data-api',  $.proxy(function () { setTimeout($.proxy(this.checkPosition, this), 1) }, this))
    this.$element = $(element)
    this.checkPosition()
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
      , scrollTop = this.$window.scrollTop()
      , position = this.$element.offset()
      , offset = this.options.offset
      , offsetBottom = offset.bottom
      , offsetTop = offset.top
      , reset = 'affix affix-top affix-bottom'
      , affix

    if (typeof offset != 'object') offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function') offsetTop = offset.top()
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom()

    affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ?
      false    : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ?
      'bottom' : offsetTop != null && scrollTop <= offsetTop ?
      'top'    : false

    if (this.affixed === affix) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null

    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''))
  }


 /* AFFIX PLUGIN DEFINITION
  * ======================= */

  var old = $.fn.affix

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('affix')
        , options = typeof option == 'object' && option
      if (!data) $this.data('affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.affix.Constructor = Affix

  $.fn.affix.defaults = {
    offset: 0
  }


 /* AFFIX NO CONFLICT
  * ================= */

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


 /* AFFIX DATA-API
  * ============== */

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
        , data = $spy.data()

      data.offset = data.offset || {}

      data.offsetBottom && (data.offset.bottom = data.offsetBottom)
      data.offsetTop && (data.offset.top = data.offsetTop)

      $spy.affix(data)
    })
  })


}(window.jQuery);



//Define the global Chart Variable as a class.
var Chart = function(context){

  var chart = this;
  
  
  //Easing functions adapted from Robert Penner's easing equations
  //http://www.robertpenner.com/easing/
  
  var animationOptions = {
    linear : function (t){
      return t;
    },
    easeInQuad: function (t) {
      return t*t;
    },
    easeOutQuad: function (t) {
      return -1 *t*(t-2);
    },
    easeInOutQuad: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t;
      return -1/2 * ((--t)*(t-2) - 1);
    },
    easeInCubic: function (t) {
      return t*t*t;
    },
    easeOutCubic: function (t) {
      return 1*((t=t/1-1)*t*t + 1);
    },
    easeInOutCubic: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t*t;
      return 1/2*((t-=2)*t*t + 2);
    },
    easeInQuart: function (t) {
      return t*t*t*t;
    },
    easeOutQuart: function (t) {
      return -1 * ((t=t/1-1)*t*t*t - 1);
    },
    easeInOutQuart: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t*t*t;
      return -1/2 * ((t-=2)*t*t*t - 2);
    },
    easeInQuint: function (t) {
      return 1*(t/=1)*t*t*t*t;
    },
    easeOutQuint: function (t) {
      return 1*((t=t/1-1)*t*t*t*t + 1);
    },
    easeInOutQuint: function (t) {
      if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
      return 1/2*((t-=2)*t*t*t*t + 2);
    },
    easeInSine: function (t) {
      return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
    },
    easeOutSine: function (t) {
      return 1 * Math.sin(t/1 * (Math.PI/2));
    },
    easeInOutSine: function (t) {
      return -1/2 * (Math.cos(Math.PI*t/1) - 1);
    },
    easeInExpo: function (t) {
      return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
    },
    easeOutExpo: function (t) {
      return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
    },
    easeInOutExpo: function (t) {
      if (t==0) return 0;
      if (t==1) return 1;
      if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
      return 1/2 * (-Math.pow(2, -10 * --t) + 2);
      },
    easeInCirc: function (t) {
      if (t>=1) return t;
      return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
    },
    easeOutCirc: function (t) {
      return 1 * Math.sqrt(1 - (t=t/1-1)*t);
    },
    easeInOutCirc: function (t) {
      if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
      return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
    },
    easeInElastic: function (t) {
      var s=1.70158;var p=0;var a=1;
      if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
      if (a < Math.abs(1)) { a=1; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (1/a);
      return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
    },
    easeOutElastic: function (t) {
      var s=1.70158;var p=0;var a=1;
      if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
      if (a < Math.abs(1)) { a=1; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (1/a);
      return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
    },
    easeInOutElastic: function (t) {
      var s=1.70158;var p=0;var a=1;
      if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
      if (a < Math.abs(1)) { a=1; var s=p/4; }
      else var s = p/(2*Math.PI) * Math.asin (1/a);
      if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
      return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
    },
    easeInBack: function (t) {
      var s = 1.70158;
      return 1*(t/=1)*t*((s+1)*t - s);
    },
    easeOutBack: function (t) {
      var s = 1.70158;
      return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
    },
    easeInOutBack: function (t) {
      var s = 1.70158; 
      if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
      return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
    },
    easeInBounce: function (t) {
      return 1 - animationOptions.easeOutBounce (1-t);
    },
    easeOutBounce: function (t) {
      if ((t/=1) < (1/2.75)) {
        return 1*(7.5625*t*t);
      } else if (t < (2/2.75)) {
        return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
      } else if (t < (2.5/2.75)) {
        return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
      } else {
        return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
      }
    },
    easeInOutBounce: function (t) {
      if (t < 1/2) return animationOptions.easeInBounce (t*2) * .5;
      return animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
    }
  };

  //Variables global to the chart
  var width = context.canvas.width;
  var height = context.canvas.height;


  //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
  if (window.devicePixelRatio) {
    context.canvas.style.width = width + "px";
    context.canvas.style.height = height + "px";
    context.canvas.height = height * window.devicePixelRatio;
    context.canvas.width = width * window.devicePixelRatio;
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  this.PolarArea = function(data,options){
  
    chart.PolarArea.defaults = {
      scaleOverlay : true,
      scaleOverride : false,
      scaleSteps : null,
      scaleStepWidth : null,
      scaleStartValue : null,
      scaleShowLine : true,
      scaleLineColor : "rgba(0,0,0,.1)",
      scaleLineWidth : 1,
      scaleShowLabels : true,
      scaleLabel : "<%=value%>",
      scaleFontFamily : "'Arial'",
      scaleFontSize : 12,
      scaleFontStyle : "normal",
      scaleFontColor : "#666",
      scaleShowLabelBackdrop : true,
      scaleBackdropColor : "rgba(255,255,255,0.75)",
      scaleBackdropPaddingY : 2,
      scaleBackdropPaddingX : 2,
      segmentShowStroke : true,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      animation : true,
      animationSteps : 100,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : false,
      onAnimationComplete : null
    };
    
    var config = (options)? mergeChartConfig(chart.PolarArea.defaults,options) : chart.PolarArea.defaults;
    
    return new PolarArea(data,config,context);
  };

  this.Radar = function(data,options){
  
    chart.Radar.defaults = {
      scaleOverlay : false,
      scaleOverride : false,
      scaleSteps : null,
      scaleStepWidth : null,
      scaleStartValue : null,
      scaleShowLine : true,
      scaleLineColor : "rgba(0,0,0,.1)",
      scaleLineWidth : 1,
      scaleShowLabels : false,
      scaleLabel : "<%=value%>",
      scaleFontFamily : "'Arial'",
      scaleFontSize : 12,
      scaleFontStyle : "normal",
      scaleFontColor : "#666",
      scaleShowLabelBackdrop : true,
      scaleBackdropColor : "rgba(255,255,255,0.75)",
      scaleBackdropPaddingY : 2,
      scaleBackdropPaddingX : 2,
      angleShowLineOut : true,
      angleLineColor : "rgba(0,0,0,.1)",
      angleLineWidth : 1,     
      pointLabelFontFamily : "'Arial'",
      pointLabelFontStyle : "normal",
      pointLabelFontSize : 12,
      pointLabelFontColor : "#666",
      pointDot : true,
      pointDotRadius : 3,
      pointDotStrokeWidth : 1,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true,
      animation : true,
      animationSteps : 60,
      animationEasing : "easeOutQuart",
      onAnimationComplete : null
    };
    
    var config = (options)? mergeChartConfig(chart.Radar.defaults,options) : chart.Radar.defaults;

    return new Radar(data,config,context);
  };
  
  this.Pie = function(data,options){
    chart.Pie.defaults = {
      segmentShowStroke : true,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      animation : true,
      animationSteps : 100,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : false,
      onAnimationComplete : null
    };    

    var config = (options)? mergeChartConfig(chart.Pie.defaults,options) : chart.Pie.defaults;
    
    return new Pie(data,config,context);        
  };
  
  this.Doughnut = function(data,options){
  
    chart.Doughnut.defaults = {
      segmentShowStroke : true,
      segmentStrokeColor : "#fff",
      segmentStrokeWidth : 2,
      percentageInnerCutout : 50,
      animation : true,
      animationSteps : 100,
      animationEasing : "easeOutBounce",
      animateRotate : true,
      animateScale : false,
      onAnimationComplete : null
    };    

    var config = (options)? mergeChartConfig(chart.Doughnut.defaults,options) : chart.Doughnut.defaults;
    
    return new Doughnut(data,config,context);     
    
  };

  this.Line = function(data,options){
  
    chart.Line.defaults = {
      scaleOverlay : false,
      scaleOverride : false,
      scaleSteps : null,
      scaleStepWidth : null,
      scaleStartValue : null,
      scaleLineColor : "rgba(0,0,0,.1)",
      scaleLineWidth : 1,
      scaleShowLabels : true,
      scaleLabel : "<%=value%>",
      scaleFontFamily : "'Arial'",
      scaleFontSize : 12,
      scaleFontStyle : "normal",
      scaleFontColor : "#666",
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      bezierCurve : true,
      pointDot : true,
      pointDotRadius : 4,
      pointDotStrokeWidth : 2,
      datasetStroke : true,
      datasetStrokeWidth : 2,
      datasetFill : true,
      animation : true,
      animationSteps : 60,
      animationEasing : "easeOutQuart",
      onAnimationComplete : null
    };    
    var config = (options) ? mergeChartConfig(chart.Line.defaults,options) : chart.Line.defaults;
    
    return new Line(data,config,context);
  }
  
  this.Bar = function(data,options){
    chart.Bar.defaults = {
      scaleOverlay : false,
      scaleOverride : false,
      scaleSteps : null,
      scaleStepWidth : null,
      scaleStartValue : null,
      scaleLineColor : "rgba(0,0,0,.1)",
      scaleLineWidth : 1,
      scaleShowLabels : true,
      scaleLabel : "<%=value%>",
      scaleFontFamily : "'Arial'",
      scaleFontSize : 12,
      scaleFontStyle : "normal",
      scaleFontColor : "#666",
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      barShowStroke : true,
      barStrokeWidth : 2,
      barValueSpacing : 5,
      barDatasetSpacing : 1,
      animation : true,
      animationSteps : 60,
      animationEasing : "easeOutQuart",
      onAnimationComplete : null
    };    
    var config = (options) ? mergeChartConfig(chart.Bar.defaults,options) : chart.Bar.defaults;
    
    return new Bar(data,config,context);    
  }
  
  var clear = function(c){
    c.clearRect(0, 0, width, height);
  };

  var PolarArea = function(data,config,ctx){
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString;   
    
    
    calculateDrawingSizes();
    
    valueBounds = getValueBounds();

    labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

    //Check and set the scale
    if (!config.scaleOverride){
      
      calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
    }
    else {
      calculatedScale = {
        steps : config.scaleSteps,
        stepValue : config.scaleStepWidth,
        graphMin : config.scaleStartValue,
        labels : []
      }
      for (var i=0; i<calculatedScale.steps; i++){
        if(labelTemplateString){
        calculatedScale.labels.push(tmpl(labelTemplateString,{value:(config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces (config.scaleStepWidth))}));
        }
      }
    }
    
    scaleHop = maxSize/(calculatedScale.steps);

    //Wrap in an animation loop wrapper
    animationLoop(config,drawScale,drawAllSegments,ctx);

    function calculateDrawingSizes(){
      maxSize = (Min([width,height])/2);
      //Remove whatever is larger - the font size or line width.
      
      maxSize -= Max([config.scaleFontSize*0.5,config.scaleLineWidth*0.5]);
      
      labelHeight = config.scaleFontSize*2;
      //If we're drawing the backdrop - add the Y padding to the label height and remove from drawing region.
      if (config.scaleShowLabelBackdrop){
        labelHeight += (2 * config.scaleBackdropPaddingY);
        maxSize -= config.scaleBackdropPaddingY*1.5;
      }
      
      scaleHeight = maxSize;
      //If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
      labelHeight = Default(labelHeight,5);
    }
    function drawScale(){
      for (var i=0; i<calculatedScale.steps; i++){
        //If the line object is there
        if (config.scaleShowLine){
          ctx.beginPath();
          ctx.arc(width/2, height/2, scaleHop * (i + 1), 0, (Math.PI * 2), true);
          ctx.strokeStyle = config.scaleLineColor;
          ctx.lineWidth = config.scaleLineWidth;
          ctx.stroke();
        }

        if (config.scaleShowLabels){
          ctx.textAlign = "center";
          ctx.font = config.scaleFontStyle + " " + config.scaleFontSize + "px " + config.scaleFontFamily;
          var label =  calculatedScale.labels[i];
          //If the backdrop object is within the font object
          if (config.scaleShowLabelBackdrop){
            var textWidth = ctx.measureText(label).width;
            ctx.fillStyle = config.scaleBackdropColor;
            ctx.beginPath();
            ctx.rect(
              Math.round(width/2 - textWidth/2 - config.scaleBackdropPaddingX),     //X
              Math.round(height/2 - (scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
              Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
              Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
            );
            ctx.fill();
          }
          ctx.textBaseline = "middle";
          ctx.fillStyle = config.scaleFontColor;
          ctx.fillText(label,width/2,height/2 - (scaleHop * (i + 1)));
        }
      }
    }
    function drawAllSegments(animationDecimal){
      var startAngle = -Math.PI/2,
      angleStep = (Math.PI*2)/data.length,
      scaleAnimation = 1,
      rotateAnimation = 1;
      if (config.animation) {
        if (config.animateScale) {
          scaleAnimation = animationDecimal;
        }
        if (config.animateRotate){
          rotateAnimation = animationDecimal;
        }
      }

      for (var i=0; i<data.length; i++){

        ctx.beginPath();
        ctx.arc(width/2,height/2,scaleAnimation * calculateOffset(data[i].value,calculatedScale,scaleHop),startAngle, startAngle + rotateAnimation*angleStep, false);
        ctx.lineTo(width/2,height/2);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();

        if(config.segmentShowStroke){
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.stroke();
        }
        startAngle += rotateAnimation*angleStep;
      }
    }
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for (var i=0; i<data.length; i++){
        if (data[i].value > upperValue) {upperValue = data[i].value;}
        if (data[i].value < lowerValue) {lowerValue = data[i].value;}
      };

      var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
      
      return {
        maxValue : upperValue,
        minValue : lowerValue,
        maxSteps : maxSteps,
        minSteps : minSteps
      };
      

    }
  }

  var Radar = function (data,config,ctx) {
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString; 
      
    //If no labels are defined set to an empty array, so referencing length for looping doesn't blow up.
    if (!data.labels) data.labels = [];
    
    calculateDrawingSizes();

    var valueBounds = getValueBounds();

    labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : null;

    //Check and set the scale
    if (!config.scaleOverride){
      
      calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
    }
    else {
      calculatedScale = {
        steps : config.scaleSteps,
        stepValue : config.scaleStepWidth,
        graphMin : config.scaleStartValue,
        labels : []
      }
      for (var i=0; i<calculatedScale.steps; i++){
        if(labelTemplateString){
        calculatedScale.labels.push(tmpl(labelTemplateString,{value:(config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces (config.scaleStepWidth))}));
        }
      }
    }
    
    scaleHop = maxSize/(calculatedScale.steps);
    
    animationLoop(config,drawScale,drawAllDataPoints,ctx);
    
    //Radar specific functions.
    function drawAllDataPoints(animationDecimal){
      var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;

      ctx.save();
      //translate to the centre of the canvas.
      ctx.translate(width/2,height/2);
      ctx.rotate(rotationDegree);       
      //We accept multiple data sets for radar charts, so show loop through each set
      for (var i=0; i<data.datasets.length; i++){
        ctx.beginPath();

        ctx.moveTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)));
        for (var j=1; j<data.datasets[i].data.length; j++){
          ctx.rotate(rotationDegree); 
          ctx.lineTo(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)));
      
        }
        ctx.closePath();
        
        
        ctx.fillStyle = data.datasets[i].fillColor;
        ctx.strokeStyle = data.datasets[i].strokeColor;
        ctx.lineWidth = config.datasetStrokeWidth;
        ctx.fill();
        ctx.stroke();
        
                
        if (config.pointDot){
          ctx.fillStyle = data.datasets[i].pointColor;
          ctx.strokeStyle = data.datasets[i].pointStrokeColor;
          ctx.lineWidth = config.pointDotStrokeWidth;
          for (var k=0; k<data.datasets[i].data.length; k++){
            ctx.rotate(rotationDegree);
            ctx.beginPath();
            ctx.arc(0,animationDecimal*(-1*calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,2*Math.PI,false);
            ctx.fill();
            ctx.stroke();
          }         
          
        }
        
      }
      ctx.restore();
      
      
    }
    function drawScale(){
      var rotationDegree = (2*Math.PI)/data.datasets[0].data.length;
      ctx.save();
        ctx.translate(width / 2, height / 2); 
      
      if (config.angleShowLineOut){
        ctx.strokeStyle = config.angleLineColor;              
        ctx.lineWidth = config.angleLineWidth;
        for (var h=0; h<data.datasets[0].data.length; h++){
          
            ctx.rotate(rotationDegree);
          ctx.beginPath();
          ctx.moveTo(0,0);
          ctx.lineTo(0,-maxSize);
          ctx.stroke();
        }
      }

      for (var i=0; i<calculatedScale.steps; i++){
        ctx.beginPath();
        
        if(config.scaleShowLine){
          ctx.strokeStyle = config.scaleLineColor;
          ctx.lineWidth = config.scaleLineWidth;
          ctx.moveTo(0,-scaleHop * (i+1));          
          for (var j=0; j<data.datasets[0].data.length; j++){
              ctx.rotate(rotationDegree);
            ctx.lineTo(0,-scaleHop * (i+1));
          }
          ctx.closePath();
          ctx.stroke();     
              
        }
        
        if (config.scaleShowLabels){        
          ctx.textAlign = 'center';
          ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily; 
          ctx.textBaseline = "middle";
          
          if (config.scaleShowLabelBackdrop){
            var textWidth = ctx.measureText(calculatedScale.labels[i]).width;
            ctx.fillStyle = config.scaleBackdropColor;
            ctx.beginPath();
            ctx.rect(
              Math.round(- textWidth/2 - config.scaleBackdropPaddingX),     //X
              Math.round((-scaleHop * (i + 1)) - config.scaleFontSize*0.5 - config.scaleBackdropPaddingY),//Y
              Math.round(textWidth + (config.scaleBackdropPaddingX*2)), //Width
              Math.round(config.scaleFontSize + (config.scaleBackdropPaddingY*2)) //Height
            );
            ctx.fill();
          }           
          ctx.fillStyle = config.scaleFontColor;
          ctx.fillText(calculatedScale.labels[i],0,-scaleHop*(i+1));
        }

      }
      for (var k=0; k<data.labels.length; k++){       
      ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
      ctx.fillStyle = config.pointLabelFontColor;
        var opposite = Math.sin(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
        var adjacent = Math.cos(rotationDegree*k) * (maxSize + config.pointLabelFontSize);
        
        if(rotationDegree*k == Math.PI || rotationDegree*k == 0){
          ctx.textAlign = "center";
        }
        else if(rotationDegree*k > Math.PI){
          ctx.textAlign = "right";
        }
        else{
          ctx.textAlign = "left";
        }
        
        ctx.textBaseline = "middle";
        
        ctx.fillText(data.labels[k],opposite,-adjacent);
        
      }
      ctx.restore();
    };
    function calculateDrawingSizes(){
      maxSize = (Min([width,height])/2);

      labelHeight = config.scaleFontSize*2;
      
      var labelLength = 0;
      for (var i=0; i<data.labels.length; i++){
        ctx.font = config.pointLabelFontStyle + " " + config.pointLabelFontSize+"px " + config.pointLabelFontFamily;
        var textMeasurement = ctx.measureText(data.labels[i]).width;
        if(textMeasurement>labelLength) labelLength = textMeasurement;
      }
      
      //Figure out whats the largest - the height of the text or the width of what's there, and minus it from the maximum usable size.
      maxSize -= Max([labelLength,((config.pointLabelFontSize/2)*1.5)]);        
      
      maxSize -= config.pointLabelFontSize;
      maxSize = CapValue(maxSize, null, 0);
      scaleHeight = maxSize;
      //If the label height is less than 5, set it to 5 so we don't have lines on top of each other.
      labelHeight = Default(labelHeight,5);
    };
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      
      for (var i=0; i<data.datasets.length; i++){
        for (var j=0; j<data.datasets[i].data.length; j++){
          if (data.datasets[i].data[j] > upperValue){upperValue = data.datasets[i].data[j]}
          if (data.datasets[i].data[j] < lowerValue){lowerValue = data.datasets[i].data[j]}
        }
      }

      var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
      
      return {
        maxValue : upperValue,
        minValue : lowerValue,
        maxSteps : maxSteps,
        minSteps : minSteps
      };
      

    }
  }

  var Pie = function(data,config,ctx){
    var segmentTotal = 0;
    
    //In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
    var pieRadius = Min([height/2,width/2]) - 5;
    
    for (var i=0; i<data.length; i++){
      segmentTotal += data[i].value;
    }
    
    
    animationLoop(config,null,drawPieSegments,ctx);
        
    function drawPieSegments (animationDecimal){
      var cumulativeAngle = -Math.PI/2,
      scaleAnimation = 1,
      rotateAnimation = 1;
      if (config.animation) {
        if (config.animateScale) {
          scaleAnimation = animationDecimal;
        }
        if (config.animateRotate){
          rotateAnimation = animationDecimal;
        }
      }
      for (var i=0; i<data.length; i++){
        var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
        ctx.beginPath();
        ctx.arc(width/2,height/2,scaleAnimation * pieRadius,cumulativeAngle,cumulativeAngle + segmentAngle);
        ctx.lineTo(width/2,height/2);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        
        if(config.segmentShowStroke){
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.stroke();
        }
        cumulativeAngle += segmentAngle;
      }     
    }   
  }

  var Doughnut = function(data,config,ctx){
    var segmentTotal = 0;
    
    //In case we have a canvas that is not a square. Minus 5 pixels as padding round the edge.
    var doughnutRadius = Min([height/2,width/2]) - 5;
    
    var cutoutRadius = doughnutRadius * (config.percentageInnerCutout/100);
    
    for (var i=0; i<data.length; i++){
      segmentTotal += data[i].value;
    }
    
    
    animationLoop(config,null,drawPieSegments,ctx);
    
    
    function drawPieSegments (animationDecimal){
      var cumulativeAngle = -Math.PI/2,
      scaleAnimation = 1,
      rotateAnimation = 1;
      if (config.animation) {
        if (config.animateScale) {
          scaleAnimation = animationDecimal;
        }
        if (config.animateRotate){
          rotateAnimation = animationDecimal;
        }
      }
      for (var i=0; i<data.length; i++){
        var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (Math.PI*2));
        ctx.beginPath();
        ctx.arc(width/2,height/2,scaleAnimation * doughnutRadius,cumulativeAngle,cumulativeAngle + segmentAngle,false);
        ctx.arc(width/2,height/2,scaleAnimation * cutoutRadius,cumulativeAngle + segmentAngle,cumulativeAngle,true);
        ctx.closePath();
        ctx.fillStyle = data[i].color;
        ctx.fill();
        
        if(config.segmentShowStroke){
          ctx.lineWidth = config.segmentStrokeWidth;
          ctx.strokeStyle = config.segmentStrokeColor;
          ctx.stroke();
        }
        cumulativeAngle += segmentAngle;
      }     
    }     
    
    
    
  }

  var Line = function(data,config,ctx){
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY, rotateLabels = 0;
      
    calculateDrawingSizes();
    
    valueBounds = getValueBounds();
    //Check and set the scale
    labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
    if (!config.scaleOverride){
      
      calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
    }
    else {
      calculatedScale = {
        steps : config.scaleSteps,
        stepValue : config.scaleStepWidth,
        graphMin : config.scaleStartValue,
        labels : []
      }
      for (var i=0; i<calculatedScale.steps; i++){
        if(labelTemplateString){
        calculatedScale.labels.push(tmpl(labelTemplateString,{value:(config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces (config.scaleStepWidth))}));
        }
      }
    }
    
    scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
    calculateXAxisSize();
    animationLoop(config,drawScale,drawLines,ctx);    
    
    function drawLines(animPc){
      for (var i=0; i<data.datasets.length; i++){
        ctx.strokeStyle = data.datasets[i].strokeColor;
        ctx.lineWidth = config.datasetStrokeWidth;
        ctx.beginPath();
        ctx.moveTo(yAxisPosX, xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[0],calculatedScale,scaleHop)))

        for (var j=1; j<data.datasets[i].data.length; j++){
          if (config.bezierCurve){
            ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),yPos(i,j),xPos(j),yPos(i,j));
          }
          else{
            ctx.lineTo(xPos(j),yPos(i,j));
          }
        }
        ctx.stroke();
        if (config.datasetFill){
          ctx.lineTo(yAxisPosX + (valueHop*(data.datasets[i].data.length-1)),xAxisPosY);
          ctx.lineTo(yAxisPosX,xAxisPosY);
          ctx.closePath();
          ctx.fillStyle = data.datasets[i].fillColor;
          ctx.fill();
        }
        else{
          ctx.closePath();
        }
        if(config.pointDot){
          ctx.fillStyle = data.datasets[i].pointColor;
          ctx.strokeStyle = data.datasets[i].pointStrokeColor;
          ctx.lineWidth = config.pointDotStrokeWidth;
          for (var k=0; k<data.datasets[i].data.length; k++){
            ctx.beginPath();
            ctx.arc(yAxisPosX + (valueHop *k),xAxisPosY - animPc*(calculateOffset(data.datasets[i].data[k],calculatedScale,scaleHop)),config.pointDotRadius,0,Math.PI*2,true);
            ctx.fill();
            ctx.stroke();
          }
        }
      }
      
      function yPos(dataSet,iteration){
        return xAxisPosY - animPc*(calculateOffset(data.datasets[dataSet].data[iteration],calculatedScale,scaleHop));     
      }
      function xPos(iteration){
        return yAxisPosX + (valueHop * iteration);
      }
    }
    function drawScale(){
      //X axis line
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
      ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
      ctx.stroke();
      
      
      if (rotateLabels > 0){
        ctx.save();
        ctx.textAlign = "right";
      }
      else{
        ctx.textAlign = "center";
      }
      ctx.fillStyle = config.scaleFontColor;
      for (var i=0; i<data.labels.length; i++){
        ctx.save();
        if (rotateLabels > 0){
          ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
          ctx.rotate(-(rotateLabels * (Math.PI/180)));
          ctx.fillText(data.labels[i], 0,0);
          ctx.restore();
        }
        
        else{
          ctx.fillText(data.labels[i], yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize+3);          
        }

        ctx.beginPath();
        ctx.moveTo(yAxisPosX + i * valueHop, xAxisPosY+3);
        
        //Check i isnt 0, so we dont go over the Y axis twice.
        if(config.scaleShowGridLines && i>0){
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;          
          ctx.lineTo(yAxisPosX + i * valueHop, 5);
        }
        else{
          ctx.lineTo(yAxisPosX + i * valueHop, xAxisPosY+3);        
        }
        ctx.stroke();
      }
      
      //Y axis
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(yAxisPosX,xAxisPosY+5);
      ctx.lineTo(yAxisPosX,5);
      ctx.stroke();
      
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (var j=0; j<calculatedScale.steps; j++){
        ctx.beginPath();
        ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
        if (config.scaleShowGridLines){
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;
          ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));         
        }
        else{
          ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
        }
        
        ctx.stroke();
        
        if (config.scaleShowLabels){
          ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
        }
      }
      
      
    }
    function calculateXAxisSize(){
      var longestText = 1;
      //if we are showing the labels
      if (config.scaleShowLabels){
        ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
        for (var i=0; i<calculatedScale.labels.length; i++){
          var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
          longestText = (measuredText > longestText)? measuredText : longestText;
        }
        //Add a little extra padding from the y axis
        longestText +=10;
      }
      xAxisLength = width - longestText - widestXLabel;
      valueHop = Math.floor(xAxisLength/(data.labels.length-1));  
        
      yAxisPosX = width-widestXLabel/2-xAxisLength;
      xAxisPosY = scaleHeight + config.scaleFontSize/2;       
    }   
    function calculateDrawingSizes(){
      maxSize = height;

      //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
      ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
      widestXLabel = 1;
      for (var i=0; i<data.labels.length; i++){
        var textLength = ctx.measureText(data.labels[i]).width;
        //If the text length is longer - make that equal to longest text!
        widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
      }
      if (width/data.labels.length < widestXLabel){
        rotateLabels = 45;
        if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
          rotateLabels = 90;
          maxSize -= widestXLabel; 
        }
        else{
          maxSize -= Math.sin(rotateLabels) * widestXLabel;
        }
      }
      else{
        maxSize -= config.scaleFontSize;
      }
      
      //Add a little padding between the x line and the text
      maxSize -= 5;
      
      
      labelHeight = config.scaleFontSize;
      
      maxSize -= labelHeight;
      //Set 5 pixels greater than the font size to allow for a little padding from the X axis.
      
      scaleHeight = maxSize;
      
      //Then get the area above we can safely draw on.
      
    }   
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for (var i=0; i<data.datasets.length; i++){
        for (var j=0; j<data.datasets[i].data.length; j++){
          if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
          if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
        }
      };
  
      var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
      
      return {
        maxValue : upperValue,
        minValue : lowerValue,
        maxSteps : maxSteps,
        minSteps : minSteps
      };
      
  
    }

    
  }
  
  var Bar = function(data,config,ctx){
    var maxSize, scaleHop, calculatedScale, labelHeight, scaleHeight, valueBounds, labelTemplateString, valueHop,widestXLabel, xAxisLength,yAxisPosX,xAxisPosY,barWidth, rotateLabels = 0;
      
    calculateDrawingSizes();
    
    valueBounds = getValueBounds();
    //Check and set the scale
    labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
    if (!config.scaleOverride){
      
      calculatedScale = calculateScale(scaleHeight,valueBounds.maxSteps,valueBounds.minSteps,valueBounds.maxValue,valueBounds.minValue,labelTemplateString);
    }
    else {
      calculatedScale = {
        steps : config.scaleSteps,
        stepValue : config.scaleStepWidth,
        graphMin : config.scaleStartValue,
        labels : []
      }
      for (var i=0; i<calculatedScale.steps; i++){
        if(labelTemplateString){
        calculatedScale.labels.push(tmpl(labelTemplateString,{value:(config.scaleStartValue + (config.scaleStepWidth * i)).toFixed(getDecimalPlaces (config.scaleStepWidth))}));
        }
      }
    }
    
    scaleHop = Math.floor(scaleHeight/calculatedScale.steps);
    calculateXAxisSize();
    animationLoop(config,drawScale,drawBars,ctx);   
    
    function drawBars(animPc){
      ctx.lineWidth = config.barStrokeWidth;
      for (var i=0; i<data.datasets.length; i++){
          ctx.fillStyle = data.datasets[i].fillColor;
          ctx.strokeStyle = data.datasets[i].strokeColor;
        for (var j=0; j<data.datasets[i].data.length; j++){
          var barOffset = yAxisPosX + config.barValueSpacing + valueHop*j + barWidth*i + config.barDatasetSpacing*i + config.barStrokeWidth*i;
          
          ctx.beginPath();
          ctx.moveTo(barOffset, xAxisPosY);
          ctx.lineTo(barOffset, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
          ctx.lineTo(barOffset + barWidth, xAxisPosY - animPc*calculateOffset(data.datasets[i].data[j],calculatedScale,scaleHop)+(config.barStrokeWidth/2));
          ctx.lineTo(barOffset + barWidth, xAxisPosY);
          if(config.barShowStroke){
            ctx.stroke();
          }
          ctx.closePath();
          ctx.fill();
        }
      }
      
    }
    function drawScale(){
      //X axis line
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(width-widestXLabel/2+5,xAxisPosY);
      ctx.lineTo(width-(widestXLabel/2)-xAxisLength-5,xAxisPosY);
      ctx.stroke();
      
      
      if (rotateLabels > 0){
        ctx.save();
        ctx.textAlign = "right";
      }
      else{
        ctx.textAlign = "center";
      }
      ctx.fillStyle = config.scaleFontColor;
      for (var i=0; i<data.labels.length; i++){
        ctx.save();
        if (rotateLabels > 0){
          ctx.translate(yAxisPosX + i*valueHop,xAxisPosY + config.scaleFontSize);
          ctx.rotate(-(rotateLabels * (Math.PI/180)));
          ctx.fillText(data.labels[i], 0,0);
          ctx.restore();
        }
        
        else{
          ctx.fillText(data.labels[i], yAxisPosX + i*valueHop + valueHop/2,xAxisPosY + config.scaleFontSize+3);         
        }

        ctx.beginPath();
        ctx.moveTo(yAxisPosX + (i+1) * valueHop, xAxisPosY+3);
        
        //Check i isnt 0, so we dont go over the Y axis twice.
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;          
          ctx.lineTo(yAxisPosX + (i+1) * valueHop, 5);
        ctx.stroke();
      }
      
      //Y axis
      ctx.lineWidth = config.scaleLineWidth;
      ctx.strokeStyle = config.scaleLineColor;
      ctx.beginPath();
      ctx.moveTo(yAxisPosX,xAxisPosY+5);
      ctx.lineTo(yAxisPosX,5);
      ctx.stroke();
      
      ctx.textAlign = "right";
      ctx.textBaseline = "middle";
      for (var j=0; j<calculatedScale.steps; j++){
        ctx.beginPath();
        ctx.moveTo(yAxisPosX-3,xAxisPosY - ((j+1) * scaleHop));
        if (config.scaleShowGridLines){
          ctx.lineWidth = config.scaleGridLineWidth;
          ctx.strokeStyle = config.scaleGridLineColor;
          ctx.lineTo(yAxisPosX + xAxisLength + 5,xAxisPosY - ((j+1) * scaleHop));         
        }
        else{
          ctx.lineTo(yAxisPosX-0.5,xAxisPosY - ((j+1) * scaleHop));
        }
        
        ctx.stroke();
        if (config.scaleShowLabels){
          ctx.fillText(calculatedScale.labels[j],yAxisPosX-8,xAxisPosY - ((j+1) * scaleHop));
        }
      }
      
      
    }
    function calculateXAxisSize(){
      var longestText = 1;
      //if we are showing the labels
      if (config.scaleShowLabels){
        ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
        for (var i=0; i<calculatedScale.labels.length; i++){
          var measuredText = ctx.measureText(calculatedScale.labels[i]).width;
          longestText = (measuredText > longestText)? measuredText : longestText;
        }
        //Add a little extra padding from the y axis
        longestText +=10;
      }
      xAxisLength = width - longestText - widestXLabel;
      valueHop = Math.floor(xAxisLength/(data.labels.length));  
      
      barWidth = (valueHop - config.scaleGridLineWidth*2 - (config.barValueSpacing*2) - (config.barDatasetSpacing*data.datasets.length-1) - ((config.barStrokeWidth/2)*data.datasets.length-1))/data.datasets.length;
      
      yAxisPosX = width-widestXLabel/2-xAxisLength;
      xAxisPosY = scaleHeight + config.scaleFontSize/2;       
    }   
    function calculateDrawingSizes(){
      maxSize = height;

      //Need to check the X axis first - measure the length of each text metric, and figure out if we need to rotate by 45 degrees.
      ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
      widestXLabel = 1;
      for (var i=0; i<data.labels.length; i++){
        var textLength = ctx.measureText(data.labels[i]).width;
        //If the text length is longer - make that equal to longest text!
        widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
      }
      if (width/data.labels.length < widestXLabel){
        rotateLabels = 45;
        if (width/data.labels.length < Math.cos(rotateLabels) * widestXLabel){
          rotateLabels = 90;
          maxSize -= widestXLabel; 
        }
        else{
          maxSize -= Math.sin(rotateLabels) * widestXLabel;
        }
      }
      else{
        maxSize -= config.scaleFontSize;
      }
      
      //Add a little padding between the x line and the text
      maxSize -= 5;
      
      
      labelHeight = config.scaleFontSize;
      
      maxSize -= labelHeight;
      //Set 5 pixels greater than the font size to allow for a little padding from the X axis.
      
      scaleHeight = maxSize;
      
      //Then get the area above we can safely draw on.
      
    }   
    function getValueBounds() {
      var upperValue = Number.MIN_VALUE;
      var lowerValue = Number.MAX_VALUE;
      for (var i=0; i<data.datasets.length; i++){
        for (var j=0; j<data.datasets[i].data.length; j++){
          if ( data.datasets[i].data[j] > upperValue) { upperValue = data.datasets[i].data[j] };
          if ( data.datasets[i].data[j] < lowerValue) { lowerValue = data.datasets[i].data[j] };
        }
      };
  
      var maxSteps = Math.floor((scaleHeight / (labelHeight*0.66)));
      var minSteps = Math.floor((scaleHeight / labelHeight*0.5));
      
      return {
        maxValue : upperValue,
        minValue : lowerValue,
        maxSteps : maxSteps,
        minSteps : minSteps
      };
      
  
    }
  }
  
  function calculateOffset(val,calculatedScale,scaleHop){
    var outerValue = calculatedScale.steps * calculatedScale.stepValue;
    var adjustedValue = val - calculatedScale.graphMin;
    var scalingFactor = CapValue(adjustedValue/outerValue,1,0);
    return (scaleHop*calculatedScale.steps) * scalingFactor;
  }
  
  function animationLoop(config,drawScale,drawData,ctx){
    var animFrameAmount = (config.animation)? 1/CapValue(config.animationSteps,Number.MAX_VALUE,1) : 1,
      easingFunction = animationOptions[config.animationEasing],
      percentAnimComplete =(config.animation)? 0 : 1;
    
  
    
    if (typeof drawScale !== "function") drawScale = function(){};
    
    requestAnimFrame(animLoop);
    
    function animateFrame(){
      var easeAdjustedAnimationPercent =(config.animation)? CapValue(easingFunction(percentAnimComplete),null,0) : 1;
      clear(ctx);
      if(config.scaleOverlay){
        drawData(easeAdjustedAnimationPercent);
        drawScale();
      } else {
        drawScale();
        drawData(easeAdjustedAnimationPercent);
      }       
    }
    function animLoop(){
      //We need to check if the animation is incomplete (less than 1), or complete (1).
        percentAnimComplete += animFrameAmount;
        animateFrame(); 
        //Stop the loop continuing forever
        if (percentAnimComplete <= 1){
          requestAnimFrame(animLoop);
        }
        else{
          if (typeof config.onAnimationComplete == "function") config.onAnimationComplete();
        }
      
    }   
    
  }

  //Declare global functions to be called within this namespace here.
  
  
  // shim layer with setTimeout fallback
  var requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  function calculateScale(drawingHeight,maxSteps,minSteps,maxValue,minValue,labelTemplateString){
      var graphMin,graphMax,graphRange,stepValue,numberOfSteps,valueRange,rangeOrderOfMagnitude,decimalNum;
      
      valueRange = maxValue - minValue;
      
      rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

          graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            
            graphRange = graphMax - graphMin;
            
            stepValue = Math.pow(10, rangeOrderOfMagnitude);
            
          numberOfSteps = Math.round(graphRange / stepValue);
          
          //Compare number of steps to the max and min for that size graph, and add in half steps if need be.         
          while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
            if (numberOfSteps < minSteps){
              stepValue /= 2;
              numberOfSteps = Math.round(graphRange/stepValue);
            }
            else{
              stepValue *=2;
              numberOfSteps = Math.round(graphRange/stepValue);
            }
          };
          

          
          //Create an array of all the labels by interpolating the string.
          
          var labels = [];
          
          if(labelTemplateString){
            //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
            for (var i=1; i<numberOfSteps+1; i++){
              labels.push(tmpl(labelTemplateString,{value:(graphMin + (stepValue*i)).toFixed(getDecimalPlaces (stepValue))}));
            }
          }
    
          return {
            steps : numberOfSteps,
        stepValue : stepValue,
        graphMin : graphMin,
        labels : labels           
            
          }
    
      function calculateOrderOfMagnitude(val){
        return Math.floor(Math.log(val) / Math.LN10);
      }   


  }
  
  //Max value from array
  function Max( array ){
    return Math.max.apply( Math, array );
  };
  //Min value from array
  function Min( array ){
    return Math.min.apply( Math, array );
  };
  //Default if undefined
  function Default(userDeclared,valueIfFalse){
    if(!userDeclared){
      return valueIfFalse;
    } else {
      return userDeclared;
    }
  };
  //Is a number function
  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  //Apply cap a value at a high or low number
  function CapValue(valueToCap, maxValue, minValue){
    if(isNumber(maxValue)) {
      if( valueToCap > maxValue ) {
        return maxValue;
      }
    }
    if(isNumber(minValue)){
      if ( valueToCap < minValue ){
        return minValue;
      }
    }
    return valueToCap;
  }
  function getDecimalPlaces (num){
    var numberOfDecimalPlaces;
    if (num%1!=0){
      return num.toString().split(".")[1].length
    }
    else{
      return 0;
    }
    
  } 
  
  function mergeChartConfig(defaults,userDefined){
    var returnObj = {};
      for (var attrname in defaults) { returnObj[attrname] = defaults[attrname]; }
      for (var attrname in userDefined) { returnObj[attrname] = userDefined[attrname]; }
      return returnObj;
  }
  
  //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
    var cache = {};
   
    function tmpl(str, data){
      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
          tmpl(document.getElementById(str).innerHTML) :
       
        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
         
          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +
         
          // Convert the template into pure JavaScript
          str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'")
        + "');}return p.join('');");
     
      // Provide some basic currying to the user
      return data ? fn( data ) : fn;
    };
}


