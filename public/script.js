// $(document).ready(function(){
//      $(document).on("click",'#smbt',function(){
          
//           var formdata = {
//            pname = document.getElementById('pname').value,
//            lname = document.getElementById('lname').value,
//            lemail = document.getElementById('lemail').value
//           };

//           alert(formdata);
//           $.ajax({
//                url:'/register',
//                contentType:'application/json',
//                method:'POST',
//                data:JSON.stringify(formdata),
//                success:function(result) {
//                     console.log("data saved")
//                }
//           })
//      })
// })

// $(document).ready(function(){
//      $("button1").click(function() {
//           $('html,body').animate({
//               scrollTop: $(".pjt").offset().top,'slow';
//           });
//               alert("hello");
//      });
// });


window.smoothScroll = function(target) {
     var scrollContainer = target;
     do { //find scroll container
         scrollContainer = scrollContainer.parentNode;
         if (!scrollContainer) return;
         scrollContainer.scrollTop += 1;
     } while (scrollContainer.scrollTop == 0);
 
     var targetY = 0;
     do { //find the top of target relatively to the container
         if (target == scrollContainer) break;
         targetY += target.offsetTop;
     } while (target = target.offsetParent);
 
     scroll = function(c, a, b, i) {
         i++; if (i > 30) return;
         c.scrollTop = a + (b - a) / 30 * i;
         setTimeout(function(){ scroll(c, a, b, i); }, 20);
     }
     // start scrolling
     scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
 }