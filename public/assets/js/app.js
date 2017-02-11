$( document ).ready(function() {
//dynamic categories
var categories = ["music", "movies", "recipes"];

for (var i = 0; i < categories.length; i++) {
  var cat_btn = $("<button>");
  $(cat_btn).addClass(categories[i]);
  $(cat_btn).addClass("btn btn-primary");
  $(cat_btn).text(categories[i]);
  $(cat_btn).data("toogle", "collapse");
  $(cat_btn).data("target", "#collapseExample");
  $(cat_btn).appendTo(".categories");
  $(cat_btn).attr("aria-expanded","false");
  $(cat_btn).attr("aria-controls","collapseExample");
 };

$('.collapse').collapse();

// Get the modal
//var modal = $('#myModal');
var modal = document.getElementById('myModal');

// Get the button that opens the modal
//var modal_btn = $('#modal_btn');
var modal_btn = document.getElementById("modal_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 

modal_btn.onclick = function() {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
});

/*
$('.datepicker').pickadate({// Strings and translations
monthsFull: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
weekdaysFull: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
showMonthsShort: undefined,
showWeekdaysFull: undefined,

// Buttons
today: 'Today',
clear: 'Clear',
close: 'Close',

// Accessibility labels
labelMonthNext: 'Next month',
labelMonthPrev: 'Previous month',
labelMonthSelect: 'Select a month',
labelYearSelect: 'Select a year',

// Formats
format: 'd mmmm, yyyy',
formatSubmit: undefined,
hiddenPrefix: undefined,
hiddenSuffix: '_submit',
hiddenName: undefined,

// Editable input
editable: undefined,

// Dropdown selectors
selectYears: undefined,
selectMonths: undefined,

// First day of the week
firstDay: undefined,

// Date limits
min: undefined,
max: undefined,

// Disable dates
disable: undefined,

// Root picker container
container: undefined,

// Hidden input container
containerHidden: undefined,

// Close on a user action
closeOnSelect: true,
closeOnClear: true,

// Events
onStart: undefined,
onRender: undefined,
onOpen: undefined,
onClose: undefined,
onSet: undefined,
onStop: undefined,

// Classes
klass: {

  // The element states
  input: 'picker__input',
  active: 'picker__input--active',

  // The root picker and states *
  picker: 'picker',
  opened: 'picker--opened',
  focused: 'picker--focused',

  // The picker holder
  holder: 'picker__holder',

  // The picker frame, wrapper, and box
  frame: 'picker__frame',
  wrap: 'picker__wrap',
  box: 'picker__box',

  // The picker header
  header: 'picker__header',

  // Month navigation
  navPrev: 'picker__nav--prev',
  navNext: 'picker__nav--next',
  navDisabled: 'picker__nav--disabled',

  // Month & year labels
  month: 'picker__month',
  year: 'picker__year',

  // Month & year dropdowns
  selectMonth: 'picker__select--month',
  selectYear: 'picker__select--year',

  // Table of dates
  table: 'picker__table',

  // Weekday labels
  weekdays: 'picker__weekday',

  // Day states
  day: 'picker__day',
  disabled: 'picker__day--disabled',
  selected: 'picker__day--selected',
  highlighted: 'picker__day--highlighted',
  now: 'picker__day--today',
  infocus: 'picker__day--infocus',
  outfocus: 'picker__day--outfocus',

  // The picker footer
  footer: 'picker__footer',

  // Today, clear, & close buttons
  buttonClear: 'picker__button--clear',
  buttonClose: 'picker__button--close',
  buttonToday: 'picker__button--today'
}});*/