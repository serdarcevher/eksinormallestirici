(function($){

	// Araştır ve Sub-Etha Düğmelerini Geri Getir.
	var $searcherTab = $(document.getElementById("in-topic-search-options"));
	
	if ( $searcherTab.length )
	{
		var $titleValue = $("h1[id='title']").attr("data-title");
	
		$searcherTab.prepend("<li><a href='https://google.com/search?q="+$titleValue+"' target='_blank'>araştır</a></li>");
	}
	
	$(".dropdown-menu").prepend("<li><a href='/sub-etha' target='_blank'>sub-etha</a></li>");	
	
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
		var $entryWrapper = $(document.getElementById("entry-list"));
		var $currentPage = parseInt($("div.pager-container > div.pager").attr("data-currentpage")) || 1;
		
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
	
})(jQuery);
