$(document).ready(function(){
     $(document).on("click",'#smbt',function(){
          
          var formdata = {
           pname = document.getElementById('pname').value,
           lname = document.getElementById('lname').value,
           lemail = document.getElementById('lemail').value
          };

          alert(formdata);
          $.ajax({
               url:'/register',
               contentType:'application/json',
               method:'POST',
               data:JSON.stringify(formdata),
               success:function(result) {
                    console.log("data saved")
               }
          })
     })
})