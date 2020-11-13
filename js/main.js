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
      heading: 'Success',
      text: 'Change to '+thisOne.attr("id")+' saved.',
      showHideTransition: 'slide',
      icon: 'success',
      hideAfter: 1000
    })
  });

  jQuery("#btn-clear-local-storage").click(function () {
    localStorage.clear();
    location.reload();
  });
});
