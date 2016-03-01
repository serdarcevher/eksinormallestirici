(function($){

	// Araştır ve Sub-Etha Düğmelerini Geri Getir.
	var $searcherTab = $(document.getElementById("in-topic-search-options"));
	
	if ( $searcherTab.length )
	{
		var $titleValue = $("h1[id='title']").attr("data-title");
	
		$searcherTab.prepend("<li><a href='https://google.com/search?q="+$titleValue+"' target='_blank'>araştır</a></li>");
	}
	
	$(".dropdown-menu").prepend("<li><a href='/sub-etha' target='_blank'>sub-etha</a></li>");	
	
	// Entry Numaralarını Geri Getir.
	var $entryWrapper = $(document.getElementById("entry-list"));
	var $currentPage = parseInt($("div.pager").attr("data-currentpage")) || 1;
	
	if ( $entryWrapper.length )
	{
		var $children = $entryWrapper.children("li");
		var $childrenCount = $children.length;

		var $moreCount = 0;
		var $moreElement = $entryWrapper.prev("a.showall.more-data");
		
		if ( $moreElement.length )
		{
			$moreCount += parseInt($moreElement.html().match(/[0-9]+/)[0]);
		}
	
		$children.each(function(entryIndex, entry){
		
			var $entry = $(entry);
			var $entryId = $entry.attr("data-id");
			var $entryIndex = entryIndex + 1;
			
			$entry.attr("value", (($currentPage-1) * $childrenCount + $entryIndex + $moreCount ));
			
			$entry.find("a.entry-date.permalink").each(function(i, entryLink){

				var $entryLink = $(entryLink);
				var $entryIdElement = $("<a/>", { href : $entryLink.attr("href"), html: "#" + $entryId, class : "entry-entry-id" });
			
				$entryLink.parent().prepend($entryIdElement);

			});		
			
		});
	}
	
})(jQuery);
