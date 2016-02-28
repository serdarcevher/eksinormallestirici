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
