/**
 * Autocomplete wrapper.
 *
 * @author Htmlstream
 * @version 1.0
 *
 */
;(function ($) {
  'use strict';

  $.widget('custom.localcatcomplete', $.ui.autocomplete, {
    _create: function () {
      this._super();
      this.widget().menu('option', 'items', '> :not(.ui-autocomplete-category)');
    },
    _renderItem: function (ul, item) {
      var category = item.category ? '<span class="hd-doc-search-category">' + item.category + 'px' + </span>' : '',
        innerText = category + '<span class="hd-doc-search-label">' + item.label + '</span>';

      if (item.url) {
        return $('<li><a href="' + window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/' + item.url + '">' + innerText + '</a></li>')
          .appendTo(ul);
      } else {
        return $('<li>' + item.label + '</li>')
          .appendTo(ul);
      }
    }
  });

  $.HSCore.components.HSLocalSearchAutocomplete = {
    /**
     *
     *
     * @var Object _baseConfig
     */
    _baseConfig: {
      minLength: 2
    },

    /**
     *
     *
     * @var jQuery pageCollection
     */
    pageCollection: $(),

    /**
     * Initialization of Autocomplete wrapper.
     *
     * @param String selector (optional)
     * @param Object config (optional)
     *
     * @return jQuery pageCollection - collection of initialized items.
     */

    init: function (selector, config) {

      this.collection = selector && $(selector).length ? $(selector) : $();
      if (!$(selector).length) return;

      this.config = config && $.isPlainObject(config) ?
        $.extend({}, this._baseConfig, config) : this._baseConfig;

      this.config.itemSelector = selector;

      this.initAutocomplete();

      return this.pageCollection;

    },

    initAutocomplete: function () {
      //Variables
      var $self = this,
        config = $self.config,
        collection = $self.pageCollection;

      //Actions
      this.collection.each(function (i, el) {
        var $this = $(el),
          dataUrl = $this.data('url');

        $.getJSON(dataUrl, function (data) {
          $this.localcatcomplete({
            appendTo: $this.parent(),
            delay: 0,
            source: data,
            select: function (event, ui) {
              window.location = window.location.protocol + '//' + window.location.host + '/' + window.location.pathname.split('/')[1] + '/' + ui.item.url;
            }
          });
        });

        //Actions
        collection = collection.add($this);
      });
    }

  };

})(jQuery);

const  acc = document.getElementsByClassName('nested');
let i;
let len = acc.length;
for(i=0;i<len; i++)
{
  acc[i].addEventListener('click', function(){
    this.classList.toggle('active');
    let panel = this.nextElementSibling;
    if(panel.style.maxHeight){
      panel.style.maxHeight = null;
    }else {
      panel.style.maxHeight = panel.scrollHeight + 'px'
    }
  })
}
