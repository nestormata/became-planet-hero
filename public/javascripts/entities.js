$(function(){
  $('.entity-add-button').click(function(e){
    $('.entity-form').toggle();
		e.stopPropagation();
		return false;
  });
});
