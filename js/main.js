function getWindowHash(){
  $hash = window.location.hash;
  if($hash == ''){
    $hash = '1';
    window.location.hash = $hash;
  }
  console.warn($hash);
  return $hash.replace('#','');
}
function readFromLocalStorage(setid){
  $data = localStorage.getItem(setid);
  console.log('reading');
  console.log(setid);
  console.table(JSON.parse($data));
  return JSON.parse($data);
}
function writeToLocalStorage(setid,setdata){
  console.table(setdata);
  // setdata_json = {setdata}; //JSON.stringify(setdata);
  setdata_json = JSON.stringify(setdata);
  console.table(setdata_json);
  return localStorage.setItem(setid,setdata_json);
}
function readSetDataFromForm(){
  setid = getWindowHash();//jQuery('#main-content').data('setid');
  $elements = jQuery("[data-save-load=enabled]");
  $data = {};
  $elements.each(function () {
    var thisOne = $(this);
    $val = thisOne.val();
    $id = thisOne.attr("id");
    console.log($(this).val() + " " + $(this).attr("id"));
    $data[$id] = $val;
  });
  console.log($data);
  return $data;
}
function writeSetDataToForm(setid,setdata){
  // jQuery('#main-content').data('setid',setid);
  window.location.hash = setid;
  $elements = jQuery("[data-save-load=enabled]");
  $elements.each(function () {
    $data = setdata;
    var thisOne = $(this);
    $id = thisOne.attr("id");
    $val = $data[$id];
    thisOne.val($val);
    console.log($(this).val() + " " + $(this).attr("id"));
  });
  console.log($data);
  return $data;
}
function initSetsPanel(){
  // jQuery('button.set').remove();
  for (var i = 0; i < localStorage.length; i++){
  // for (var i = localStorage.length-1; i >= 0; i--){    
    // do something with localStorage.getItem(localStorage.key(i));
    setid = localStorage.key(i);
    console.log(setid);
    // jQuery('.sets-panel').prepend('<button class="set" data-setid="'+setid+'">'+setid+'</button>');
    // jQuery('.sets-panel').append(jQuery('#btn-hide-sets-panel'));
    jQuery('<button class="set" data-setid="'+setid+'">'+setid+'</button>').insertBefore('.new-set');
  }
}
$(document).ready(function () {
  initSetsPanel();
  $elements = jQuery("[data-save-load=enabled]");  
  // $elements.each(function () {
  //   var thisOne = $(this);
  //   console.log($(this).val() + " " + $(this).attr("id"));
  //   if (localStorage.getItem(thisOne.attr("id"))) {
  //     thisOne.val(localStorage.getItem(thisOne.attr("id")));
  //   }
  // });
  setid = getWindowHash();//jQuery('#main-content').data('setid');
  setdata = readFromLocalStorage(setid);
  console.log(setdata);
  if(setdata){
    $written = writeSetDataToForm(setid,setdata);
  }
  $elements.on("change", function () {
    var thisOne = $(this);
    console.log("change " + thisOne.attr("id"));
    // localStorage.setItem(thisOne.attr("id"), thisOne.val());
    setdata = readSetDataFromForm();
    $written = writeToLocalStorage(setid,setdata);
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

  jQuery("#btn-show-sets-panel").click(function () {
    sets_panel = jQuery('.sets-panel');
    sidebar_button = jQuery(this);
    if(sets_panel.hasClass('closed')){
      sets_panel.removeClass('closed');
      sidebar_button.text('Hide Sets Panel');  
    } else {
      sets_panel.addClass('closed');
      sidebar_button.text('Show Sets Panel');        
    }
  });
  jQuery('div.sets-panel').click(function(e){
    e.preventDefault();
      jQuery("#btn-show-sets-panel").trigger('click');
  });
  jQuery("#btn-hide-sets-panel").click(function () {
    jQuery("#btn-show-sets-panel").trigger('click');
  });
  jQuery('.sets-panel').click(function(e){
    // e.preventDefault();
    // e.stopPropagation();
    console.table(e.target);
    if(jQuery(e.target).hasClass('set')){
      console.log('setspanelbutton');

      setid = jQuery(e.target).data('setid');
      // jQuery('#main-content').data(setid,setid);
      window.location.hash = setid;
      console.log('setid: '+setid);
      setdata = readFromLocalStorage(setid);
      console.log(setdata);
      if(setdata){
        $written = writeSetDataToForm(setid,setdata);
      }
      window.setTimeout(function(){
        // jQuery("#btn-show-sets-panel").trigger('click');
      },100);
    // console.log(jQuery(this)).attr('class'));
    // console.log('button.set');
  }
  });
  jQuery('button.new-set').click(function(e){
    e.preventDefault();
    e.stopPropagation();
    // setid = alert('Enter Set ID');
    setid = jQuery('button.set').length + 1;
    jQuery('<button class="set" data-setid="'+setid+'">'+setid+'</button>').insertBefore('.new-set');
    window.location.hash = ''+setid;
    $elements = jQuery("[data-save-load=enabled]");
    $elements.each(function () {
      $data = setdata;
      var thisOne = $(this);
      $id = thisOne.attr("id");
      // $val = $data[$id];
      // thisOne.val($val);
      console.log($(this).val() + " " + $(this).attr("id"));
      thisOne.val('');
    });
    setdata = readSetDataFromForm();
    $written = writeToLocalStorage(setid,setdata);
  });
});
