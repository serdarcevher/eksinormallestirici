jQuery(document).ready(function(){

  var list = $('ul#entry-list');
  var listItems = list.find('li[data-favorite-count]').sort(function(a,b){ return $(b).attr('data-favorite-count') - $(a).attr('data-favorite-count'); });
  list.find('li[data-favorite-count]').remove();
  list.append(listItems);


  var favorites_exists = 0;
  if ($('ul#entry-list li:first span.favorite-links').length) {
    favorites_exists = 1;
  }

  if (favorites_exists == 0) {

    $.each( $('ul#entry-list li'), function() {
      var favorite_count = $(this).attr('data-favorite-count');
      $(this).find('span.rate-options').after('<span class="favorite-links"><a class="icon icon-damla"></a> <a class="favorite-count toggles" style="display: inline;">' + favorite_count + '</a></span>');
    });

  }


  var topic_list = $('ul.topic-list');

  $.each( $( "ul.topic-list li" ), function() {
    var entry_count = parseInt($(this).find('a small').text());
    $(this).attr('data-entry-count', entry_count);
  });

  var topicListItems = topic_list.find('li[data-entry-count]').sort(function(a,b){ return $(b).attr('data-entry-count') - $(a).attr('data-entry-count'); });
  topic_list.find('li[data-entry-count]').remove();
  topic_list.append(topicListItems);


});
