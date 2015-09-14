function megamanscript(){

 var background=document.getElementById("ground");
 var id = setInterval(function(){
   background.style.left=""+(parseInt(window.getComputedStyle(background).getPropertyValue('left').replace("px", ""))-5)+"px";
     console.log("run");
 },100);   
    
    
};

//window.onload = megamanscript;

