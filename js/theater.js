// Code goes here


var closeModal = null;
  
  var opentheater=function(){closeModal = modal(); console.log("open theater");};    
  var closetheater=function(){
                              if (closeModal) {
                                closeModal();
                                closeModal = null;
                              }
                             }; 


function modal () {
    
 
  
  var $backdrop, $modal, $page, $body, $win,
      close;

 

  var open=function() {
    $win = window;
    //$body = document.getElementsByTagName('body');
    $modal = document.getElementById("pdfmodal");//$(DEFAULT.modal);
    oldmodalclassname=$modal.className;
    $page = document.getElementById("aboutmewrap");//$(DEFAULT.page);
      
    ///* make background black
      /*
      $backdrop = $('<div >').css({
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.7)'
      }).appendTo($body);
    */
      $backdrop  = document.createElement('div');
$backdrop.style.cssText = 'position:fixed;width:100%;height:100%;top:0px;left:0px;z-index:100;background:rgba(0, 0, 0, 0.7);';
$backdrop.onmousedown =  closetheater;    
document.body.appendChild($backdrop);
      
    //*/
    ///////set back fixed  
    var scrollTop = $win.scrollTop;
    /*
    $body.css({'overflow-y': 'scroll'});
    $page.css({
      position: 'fixed',
      top: -scrollTop,
      width: '100%'
    });
    */  
    
    $page.style.position = 'fixed';
    console.log("position"+ $page.style.position);  
    $page.style.top =  -scrollTop;
    $page.style.width = '100%';
    $page.style.height = '100%';  
    ///////////////////////////////  
    //$modal.addClass('theater');
    $modal.className = 'theater';
    
    /*  
    $modal.data('modal', {
      close: close,
      pageScrollTop: scrollTop
    });
    */  
      
    close = function () {
      
          $backdrop.remove();

      //var data = $modal.data('modal');
      $page.style.overflowY='';
      $page.style.position = '';
      $page.style.top =  '';
      $page.style.width = ''; 
      
      //$modal.removeClass('theater');
      $modal.className = oldmodalclassname;
        //$modal.removeData('modal');
      /*
      $modal = null;
      $page = null;
      $backdrop = null;
      $body = null;
      */
      //$win.scrollTop(data.pageScrollTop);
      $win.scrollTop=  scrollTop; 
      //reqAnimFrame(function () {
        //$win.scrollTop(data.pageScrollTop);
        //$win = null;
      //});
    };
    
    
    
  };

  open();    
  return close;
}


