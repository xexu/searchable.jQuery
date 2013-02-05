(function($) {
	$.fn.searchable = function(options) {

		var settings = $.extend({
			'search_target': this.data('searchable-target'),
			'timeout_time': 100
		}, options);

		var list = [];
		$.each($(settings.search_target).find('li[class~="searchable"]'), function(key, value) {
			var t = $(this);
			list.push([t.attr('id'), t.text()]);
		});

		var timeout = null;
		this.keyup(function() {
			var t = $(this);
			if(!timeout) {
				timeout = setTimeout(function() {
					var re = new RegExp(t.val(), "i");
					$.each(list, function(key, value) {
						if(re.test(value[1])) {
							$("#" + value[0]).show();
						} else {
							$("#" + value[0]).hide();
						}
						timeout = null;
					});
				},settings.timeout_time);
			}
		});
	};
})(jQuery);