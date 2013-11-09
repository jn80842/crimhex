var grammars = {"assocLeft": "<p class='bkgdSunflower'>%left '*'</p>", "assocRight": "<p>%right '*'</p>"};

$(document).ready(function() {
  $('#resolved').hide();
  $('.hasTooltip').tooltip();
  $('.hasTooltip').on("show.bs.tooltip", function() {
    var rule = $(this).get(0).dataset["rule"];
    console.log(rule)
    $("." + rule).removeClass('nohighlight');
  });
  $('.hasTooltip').on("hide.bs.tooltip", function(e) {
    $('#rules div').addClass('nohighlight');
  });
  $('#full-parse').hide();
  $('#show-full').click(function(e) {
    e.preventDefault();
    $('#show-full').parent().addClass('active');
    $('#show-simple').parent().removeClass('active');
    $('#full-parse').show();
    $('#simplest-parse').hide();
  });
  $('#show-simple').click(function(e) {
    e.preventDefault();
    $('#show-full').parent().removeClass('active');
    $('#show-simple').parent().addClass('active');
    $('#simplest-parse').show();
    $('#full-parse').hide();
  });
  $('#resolve').click(function(e) {
    e.preventDefault();
    var parseVal = $('input[name=parse]:checked').val();
    if (parseVal) {
    $('#ignore').append(grammars[parseVal]);
    $('#edit-parse').children().hide();
    $('#resolved').show();
    }
  });
});