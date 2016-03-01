var moreDataCount = undefined;
var currentPage = $(".pager > select").val();

if(currentPage == undefined){
    currentPage = 1;
}

if($(".showall").html() != undefined){
    moreDataCount = $(".showall").html().split(" ")[0];
    currentPage = 1;
}

if(currentPage != undefined){

    //Arastir dugmesini geri getir
    var title = $("#title").text().replace(/'/g, "").trim();
    $("ul#in-topic-search-options").prepend("<li><a href='https://google.com/search?q="+title+"' target='_blank'>araştır</a></li>");

    //Sub-etha dugmesini geri getir
    $(".dropdown-menu").prepend("<li><a href='https://eksisozluk.com/sub-etha' target='_blank'>sub-etha</a></li>");

    var topicPageSize = 10;

    chrome.storage.sync.get("topicPageSize", function (result) {
        if($("#top-login-link").size() == 0){
            if(result.topicPageSize != undefined){
                topicPageSize = parseInt(result.topicPageSize);
            }
        }

        $.each($('#entry-list>li'), function( index, obj ) {
            var count = ( (topicPageSize * parseInt(currentPage - 1)) + parseInt(index + 1) );
            if(moreDataCount != undefined){
                count += parseInt(moreDataCount);
            }
            $(obj).attr("value", count);
        });
		
   });
}

$("a.entry-date.permalink").each(function(i, elem){

	var link = $(elem);
	
	var entryId = link.attr("href").replace(/[^0-9]+/i, "");
	
	var entryIdLink = $("<a/>", { href : link.attr("href"), html: "#" + entryId, class : "entry-entry-id" });
	
	link.parent().prepend(entryIdLink);
	
});	
