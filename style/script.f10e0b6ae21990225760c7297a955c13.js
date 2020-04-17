(function($) {
	Array.prototype.min = function() {
		return Math.min.apply({}, this);
	};
	Array.prototype.max = function() {
		return Math.max.apply({}, this);
	};

	$.fn.masonry = function() {
		this.each(function() {

			var wall = $(this);

			if (wall.children().length > 0) {

				if (wall.children('.masonryWrap').length == 0) {
					wall.wrapInner('<div class="masonryWrap"></div>');
				}
				var mWrap = wall.children('.masonryWrap');

				var brick = mWrap.children();
				var brickW = brick.outerWidth(true);
				var colCount = Math.floor(mWrap.width() / brickW);

				var colH = new Array();
				for ( var i = 0; i < colCount; i++) {
					colH[i] = 0;
				}

				mWrap.css({
					'position' : 'relative'
				});

				brick.css({
					'float' : 'none',
					'position' : 'absolute',
					'display' : 'block'
				}).each(function() {
					for (i = colCount - 1; i > -1; i--) {
						if (colH[i] == colH.min()) {
							var thisCol = i;
						}
					}
					$(this).css({
						top : colH[thisCol],
						left : brickW * thisCol
					});
					colH[thisCol] += $(this).outerHeight(true);
				});

				mWrap.height(colH.max());
			}
			return this;
		});
	};
	$.fn.imagesLoaded = function(callback, context) {
	    var elems = this.filter('img'),
	        len = elems.length,
	        blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

	    context = context || elems;

	    function countdown() {
	        if (this.src != blank) {
	            if (--len <= 0)
	                callback.call(context, this);
	        }
	    }

	    elems.each(function() {
	        var src = this.src;
	        this.src = blank;
	        $(this).one('load error', countdown);
	        this.src = src;
	    });

	    if (!elems.length)
	        callback.call(context);

	    return this;
	};
})(jQuery);
$(document).ready(function() {
	$('.g-postlist img').imagesLoaded(function(){$('.g-postlist').masonry();});
});