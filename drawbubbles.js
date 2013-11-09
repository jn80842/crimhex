//colors courtesy of http://flatuicolors.com/
var greensea = '#16a085';
var nephritis = '#27ae60';
var belizehole = '#2980b9';
var wisteria = '#8e44ad';
var midnightblue = '#2c3e50';
var sunflower = '#f1c40f';
var alizarin = '#e74c3c';
var silver = '#bdc3c7';
var asbestos = '#7f8c8d';
var colors = [greensea, nephritis, belizehole, wisteria, midnightblue, sunflower, alizarin, silver, asbestos];
 

var bubbleColors = ['bubbleGreensea', 'bubblePomegranate', 'bubbleNephritis', 'bubbleOrange', 'bubbleBelizehole', 'bubbleWisteria', 'bubbleSunflower'];
var bubbleIndex = 0;

function getNextBubble() {
  var colorArray = bubbleColors.length;
  if (bubbleIndex >= bubbleColors.length) {
    bubbleIndex = 0;
  }
  var nextBubble = bubbleColors[bubbleIndex];
  bubbleIndex++;
  return nextBubble;
}

//http://stackoverflow.com/questions/3217147/jquery-first-parent-containing-all-children
jQuery.fn.reverse = function() {
   return Array.prototype.reverse.call(this);
};

jQuery.fn.commonAncestor = function() {
   var i, l, current,
      compare = this.eq(0).parents().reverse(),
      pos = compare.length - 1;
   for (i = 1, l = this.length; i < l && pos > 0; i += 1) {
      current = this.eq(i).parents().reverse();
      pos = Math.min(pos, current.length - 1);
      while (compare[pos] !== current[pos]) {
         pos -= 1;
      }
   }
   return compare.eq(pos);
};
//end stackoverflow snippet

jQuery.fn.childRange = function(selector) {
  var startIndex = null;
  var endIndex = null;
  for (i = 0; i < this.children().length; i += 1) {
    if (this.children().eq(i).filter(selector).length != 0 || this.children().eq(i).find(selector).length != 0) {
      if (startIndex === null) {
        startIndex = i;
      } else {
        endIndex = i;
        break;
      }
    }
  }
  if (endIndex === null) { //only one token was highlighted
    endIndex = startIndex;
  }
  return this.children().slice(startIndex,endIndex+1);
};

var timesClicked = 0;
function allTokens() {
    if (timesClicked < 2) {
      showHighlightButtons();
      var i = $(this).index();
      $(this).addClass("highlighted");
      timesClicked++;
    }
}

function clearHighlights() {
    $('.token').removeClass('highlighted');
    hideHighlightButtons();
    timesClicked = 0;
}

function showHighlightButtons() {
  $('.highlightBtn').removeAttr("disabled");
}

function hideHighlightButtons() {
  $('.highlightBtn').attr("disabled", "disabled");
}

$(document).ready(function() {
  $('#edit-parse').children().hide();
  $('.alert').hide();
  $('#parse').click(function(e) {
    e.preventDefault();
    var token_str = $('#user-input').val();
    var tokens = token_str.split(" ");
    tokens = tokens.map(function(x) { return '<span class="token">' + x + '</span>'});
    $('.start_symbol').html(tokens.join(""));
    $('.token').bind("click.allTokens", allTokens);
    $('#edit-parse').children().show();
    hideHighlightButtons();

  });

  $('#failparse').click(function(e) {
    e.preventDefault();
    $('#not-parse-alert').html("The string " + $('#user-input').val() + " is not part of your language.");
    $('#user-input').val("");
    $('#not-parse-alert').show(); 
    $('#not-parse-alert').fadeOut(4000);
  });

  $('#add-bubble').click(function(e) {
    e.preventDefault();
    $('.highlighted').commonAncestor().childRange('.highlighted').wrapAll('<div class="' + getNextBubble() + ' bubble"></div>')
    clearHighlights();
  });
  $('#clear-highlights').click(function(e) {
    e.preventDefault();
    clearHighlights();
  });
  $('#remove-bubble').click(function(e) {
    e.preventDefault();
    $('.bubble').children('.highlighted').unwrap();
    clearHighlights();
  });
  $('#add-spec').click(function(e) {
    //e.preventDefault();
    $('#parse-done-alert').html("Your spec has been added");
    clearHighlights();
    $('#user-input').val("");
    $('#parse-done-alert').show();
    $('#parse-done-alert').fadeOut(4000);
    $('#edit-parse').children().hide();
  });
});