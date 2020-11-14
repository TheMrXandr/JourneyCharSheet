$(document).ready(function () {
  jQuery("input").each(function () {
    var thisOne = $(this);
    console.log($(this).val() + " " + $(this).attr("id"));
    if (localStorage.getItem(thisOne.attr("id"))) {
      thisOne.val(localStorage.getItem(thisOne.attr("id")));
    }
  });

  jQuery("input").on("change", function () {
    var thisOne = $(this);
    console.log("change " + thisOne.attr("id"));
    localStorage.setItem(thisOne.attr("id"), thisOne.val());
    $.toast({
        text: "Updated", // Text that is to be shown in the toast
        showHideTransition: 'fade', // fade, slide or plain
        allowToastClose: false, // Boolean value true or false
        hideAfter: 1000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: false, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'bottom-left', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
        bgColor: '#444444',  // Background color of the toast
        textColor: '#eeeeee',  // Text color of the toast
        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600',  // Background color of the toast loader
        beforeShow: function () {}, // will be triggered before the toast is shown
        afterShown: function () {}, // will be triggered after the toat has been shown
        beforeHide: function () {}, // will be triggered before the toast gets hidden
        afterHidden: function () {}  // will be triggered after the toast has been hidden
    })
  });

  jQuery("#btn-clear-local-storage").click(function () {
    localStorage.clear();
    location.reload();
  });
});
