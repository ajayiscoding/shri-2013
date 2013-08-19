$(document).ready(function(){
  $('#questionnaire').on('click', '.pseudo-link', function(event){
    var $pseudoLink = $(event.currentTarget),
        $questionBody = $('#' + $pseudoLink.data('container'));

    if($questionBody.is(':visible')){
      $questionBody.hide('fast');
    }
    else{
      $questionBody.show('fast');
    }
  });
});