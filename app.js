var express = require('express'); //make express available
var app = express(); //invoke express
var server = require('http').Server( app ) // start the express server instance
var io = require('socket.io')(server) // use socket.io for real time connections aka. wesockets

let port = 3000 || process.env.PORT

let closenessThreshold = 10; //How close can people be )should be apixel value)?

//serve out any static files in our public HTML folder
app.use(express.static('public'))

//do something when someone connects to our page.
io.on('connection', function(socket){
  console.log(socket.id); // log out the unique ID of each person who connects


  // this section is a bit of an information 'relay' it takes the incoming data, replicates it and sends it out to everyone who is connected.
  //look for an incoming addEmoji message from the client
  socket.on('mouseMovement', function(dataToSend){

    let closeness = false; //ever mouse movement by default we are not close, we will check and see and possibly reset this later if we are!

    //get in our data from the client which is named 'dataToSend'
    //& attach the incoming data (x&y) to this users specific socket connection as mouseX, and mouseY (just so it's something different so we can remember...)
    socket.mouseX = dataToSend.x
    socket.mouseY = dataToSend.y

    ///log this stuff out on the server so we can see it.
    // console.log(socket.id, socket.mouseX, socket.mouseY);

    //get all of the current connections to the server as a list
    let connections = io.sockets.sockets
    // console.log(connections);

    //run down the list of current connections one by one
    for (var socketID in connections) {
      //for each unique connection, look at the mouseX and mouseY values and set as the currentX and currentY  (this is really jsust for convienience and clarity)
      let currentX = connections[socketID].mouseX
      let currentY = connections[socketID].mouseY

      //run down the list for each time we're running down the list
      // this is called a nested for loop!
      // we need to do this to compare each mousemove to every other users mouse move, systematically.

      // imagine that the list is apple, banana, peach, kiwi. at the apple spot we need compare to the apple, banana, peach, kiwi. but if we cmpare apple, to apple. skip this one.
      for (var socketIDnest in connections) {
        if(socketIDnest == socketID ) continue; //in the event that the list is looking at ourself, skip and move on... aka, continue..

        // same as above, rename the mouseX & Y values for the sublist for convienience and clarity. (the sub list is the same as the list)
        let subListX = connections[socketIDnest].mouseX
        let subListY = connections[socketIDnest].mouseY

        //calculate the distance between every mouseX and MouseY when they move. see the dist function below for moe details on that.
        // if the distance between those 2 point is less than the treshold then, we are close, act accoringly and do the things inside of the {}
        if(dist(currentX, currentY, subListX, subListY ) < closenessThreshold){
          //we might need to sort out some dobouncing because w're checking for everyone else & they are checking for us.

          //were pretty close...
          console.log( "socket ", socketID, " & ",socketIDnest, " are close" );

          //reset our storage at the top to be true since we're close!
          closeness = true;

        }//close distance if
      } // close sub list check
    } // close main list check

    // if(closeness == true){
      //if we detected a mouse movement from anyone sed out weather people are close to everyone, true or false.
      io.emit('peopleAreClose', closeness)
    // }

  }) //close mouseMove
}) //close socket


// listen for connections to the server :)
var listener = server.listen(port, function() {
  console.log('Your app is listening on port ' + port );
});


// takes in 4 valuse of 2 points in 2d space and calcualtes the distance between them using tiganometry hypotonuse.

/* you can use this fuynction to RETURN a value in its place
eg.
let coolNumber = dis(100,300,200,300)
cool number will now become the distance between those points)
*/

function dist(x,y,x1,y1) {
    //subtract the x's from eachother and they's from eachother then calculat ethe hypotonuse
    return Math.hypot(x1 - x, y1 - y)
};
