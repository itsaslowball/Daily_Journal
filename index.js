$('.comments p').text(function(_, txt) {
    if(txt.length > 36){
      txt = txt.substr(0, 36) + "...";
      $(this).parent().append("<a href='#'>Read More</a>");
    }
    $(this).html(txt)
  });