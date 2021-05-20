$(document).ready(function(){
 
     $("#contactForm").validate({

          rules:{
              name:{
                  required:true,
                  minlength:3,
                  maxlength:30
                  
              },
              email:{
                  required:true,
                  email:true
              },
              subject:{
                  required:true,
                  minlength:3,
                  maxlength:40
              },
              message:{
                  required:true,
                  minlength:10,
                  maxlength:100
              }
          },
          highlight:function(element){
             $(element).removeClass("c2");
             $(element).addClass("c1");

          },
          unhighlight:function(element){

              $(element).removeClass("c1");
              $(element).addClass("c2");
          },
          messages:{
              name:{
                  required:"Name is Mandatory",
                  minlength:"3 Characters Must"
                
              },
             email:{
                 required:"Email is Mandatory" 
                 
              },
              subject:{
                 required:"Subject is Mandatory"
              },
              message:{
                  required:"Message is Mandatory"
              }
          }

     });


});