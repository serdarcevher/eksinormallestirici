(function($){

	// Araştır ve Sub-Etha Düğmelerini Geri Getir.
	var $searcherTab = $(document.getElementById("in-topic-search-menu"));

	if ( $searcherTab.length )
	{
		var $titleValue = $("h1[id='title']").attr("data-title");

		$searcherTab.before("<div><a href='https://google.com/search?q="+$titleValue+"' target='_blank'>araştır</a></div>");
	}

	$("#options-dropdown > ul").prepend("<li><a href='/sub-etha' target='_blank'>sub-etha</a></li>");
	$('#top-navigation > ul > li[class="dropdown mobile-only"] > ul').prepend("<li class='mobile-only'><a href='/sub-etha' target='_blank'>sub-etha</a></li>");

	// Kullanıcı Giriş Yapmış Mı?
	var $topNavigation = $(document.getElementById("top-navigation"));
	var $optionsLink = $topNavigation.find("a[href='/ayarlar/tercihler']");

	// Giriş Yapmışsa Session Storage'den Çek, Yapmamışsa 10 Olarak Ayarla.
	var $topicPageSize = $optionsLink.length ? sessionStorage.getItem("topicPageSize") : 10;

	// Giriş Yapmış Ama Session Storage'de Page Size Yok.
	if ( $optionsLink.length && $topicPageSize == null )
	{
		// Tercihler Sayfasından İlgili Değeri Alıp Session Storage'e Atalım.
		$.get($optionsLink.attr("href"), function(result){

			var $value = result.match(/<input\s+type="hidden"\s+id="TopicPageSize"\s+name="TopicPageSize"\s+value="([0-9]+)"\s*\/>/);

			var $topicSize = parseInt($value[1]);

			sessionStorage.setItem("topicPageSize", $topicSize);

			setEntryNumbers($topicSize);

		});
	}
	// Giriş Yapmamışsa Page Size Direkt 10 Olarak Kullanılsın.
	else
	{
		setEntryNumbers($topicPageSize);
	}

	// Entry Numaralarını Geri Getir.
	function setEntryNumbers($entryPerPage)
	{
		var $currentPage =  1;
		var $entryWrapper = $(document.getElementById("entry-list"));

		var $pageMatcher = location.href.match(/[&|\?]p=([0-9]+)&?/i);

		if ( $pageMatcher )
		{
			$currentPage = parseInt($pageMatcher[1]);
		}

		if ( $entryWrapper.length )
		{
			var $children = $entryWrapper.children("li");

			var $moreCount = 0;
			var $moreElement = $entryWrapper.prev("a.showall.more-data");

			if ( $moreElement.length )
			{
				$moreCount += parseInt($moreElement.html().match(/[0-9]+/)[0]);
			}

			$children.each(function($entryIndex, entryElement){

				var $entry = $(entryElement);

				var $entryNumber = $moreCount + $entryIndex + 1;

				if ( $moreCount == 0 )
				{
					$entryNumber += ($currentPage-1) * $entryPerPage;
				}

				$entry.attr("value", $entryNumber);

				$entry.find("a.entry-date.permalink").prepend("#" + $entry.attr("data-id") + " ");

			});
		}
	}

	/* yazarlara mesaj ikonunu geri getir */

	$('div.info a.entry-author').each(function(){
		$(this).after("<a class=\"icon icon-mail custom-message\" title=\"mesaj at\" aria-label=\"mesaj at\"></a>");
	});

	$(document).on('click', '.custom-message', function(){
		$(this).next('.other.dropdown').find('ul.dropdown-menu li a[title="mesaj at"]')[0].click();
	});


	/* ekşi şeyler'i sub etha'ya ekle */

	if ($('ul#sub-etha-sites').length) {
		var eksi_seyler_logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAAAfCAYAAABjyArgAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDQkE5RjdFQURBOTAxMUU1Qjg2MkM4NDBBQTg3QTY1RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDQkE5RjdFQkRBOTAxMUU1Qjg2MkM4NDBBQTg3QTY1RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI1MkU5RjZCREE2NjExRTVCODYyQzg0MEFBODdBNjVEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjI1MkU5RjZDREE2NjExRTVCODYyQzg0MEFBODdBNjVEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+YcXrJgAADRdJREFUeNrsWQlw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";
		$('ul#sub-etha-sites').append(
		"<li id=\"site-100\">"+
			"<article>"+
      "<h2>"+
        "<a href=\"https://seyler.eksisozluk.com\" target=\"_blank\">ekşi şeyler</a>"+
      "</h2>"+
      "<img src=\"" + eksi_seyler_logo + "\" alt=\"ekşi şeyler\" class=\"logo\">"+
      "<div class=\"details\">"+
        "<p>entrylere izinsiz editör dokunuşu</p>"+
        "<footer>"+
          "<address>"+
            "<a href=\"/biri/kanzuk\" rel=\"author\">kanzuk</a>"+
          "</address>"+
        "</footer>"+
      "</div>"+
    	"</article>"+
		"</li>"
		);
	}




})(jQuery);
