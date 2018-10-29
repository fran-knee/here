
var socket = io.connect();

socket.on('connect', function(data){
  console.log("we connected to the server as" + socket.id)
})


$('body').mousemove(function(event) {

  console.log(event.clientX, event.clientY)

  var dataToSend = {
    'x': event.clientX,
    'y': event.clientY
  }

  socket.emit('mouseMovement', dataToSend); // send the data up to the server

});

//wait for incoming message of weather people are close and act accordingly with the stuff between the {}
socket.on('peopleAreClose',function(areWeClose){

  console.log(areWeClose); //get the data which is a true or false boolean

  if(areWeClose ==true){ //if the areWeClose data is true, then do between {}



     $('body').addClass('triggerAnimation')

}

else {
     $('body').css('animation-iteration-count', 1)


   $('body').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
     $('body').removeClass('triggerAnimation')
     $('body').css('animation-iteration-count', 'infinite')

   		console.log('ended')
   });
}

})

// "animation-name": "animation",
// "animation-duration": "1s",
// "animation-direction": "alternate",
// "animation-timing-function": "linear",
// "animation-iteration-count": "1"

// else{ // else if not true, what should we do?
//   // $('body').css('background-color', '#fffbf9')
//   $('body').css({
//     'background-color' : 'white',
//     "animation": "none"
//
//   })
//       };
 //white!





// if(areWeClose ==true){ //if the areWeClose data is true, then do between {}
//   $('.box').html('together') //change background
//   $('.box').css('text-align','center')
//   $('.box').css('font-size','50pt')
// } else{ // else if not true, what should we do?
//   $('body').html('apart') //white!
//   $('.box').css('text-align','center')
//   $('.box').css('font-size','50pt') #f9f0ef

// if(areWeClose ==true){ //if the areWeClose data is true, then do between {}
//   $('body').css('background-color','green') //change background
// }else{ // else if not true, what should we do?
//   $('body').css('background-color','white') //white!
