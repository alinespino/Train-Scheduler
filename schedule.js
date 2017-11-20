

$(document).ready(function () {

//Variables //

var database = firebase.database();

var trainName = "";
var destination = "";
var freq = "";
var nextArr = 0;
var minsAway = 0;


// on click Submit button // 

$("#sub-btn").on("click", function(event) {
    event.preventDefault();

    // form input // 
   var trainName = $("#train").val().trim();
   var destination = $("#destination").val().trim();
   var freq = $("#freq").val().trim();
   var firstTrain = $("#time").val().trim();
    console.log("What time is the first train:"+ firstTrain);
    

// hold temporary data // 

var newTrain = {
    train: trainName,
    dest: destination,
    freq: freq,
    first: firstTrain
    // arrival: nextArr,
    // away: minsAway
};
 // Upload form data to firebase // 

 database.ref().push(newTrain);

 //console.log // 

 console.log(newTrain.train);
 console.log(newTrain.dest);
 console.log(newTrain.freq);
 console.log(firstTrain);



// clear form //
$("#train").val("");
$("#destination").val("");
$("#time").val("");
$("#freq").val("");

});

// Add train schedules //

database.ref().on("child_added", function (childSnapshot, prevChildKey){
    console.log(childSnapshot.val());


// Store into a temp variable // 

var trainName = childSnapshot.val().train;
var destination = childSnapshot.val().dest;
var freq = childSnapshot.val().freq;
var firstTrain = childSnapshot.val().first;
// var nextArr = nextArr;
// var minsAway = minsAway;


//console.log // 

console.log(trainName);
console.log(destination);
console.log(freq);
console.log(firstTrain);
// console.log("Tell me" + nextArr);
// console.log("Mins away" + minsAway);


    // Calculate next arrival and mins away // 

    //  First Train (1 year back to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log("REMAINDER:" + tRemainder);

    // // Minute Until Train
    var minsAway = freq - tRemainder;
    console.log("MINUTES TIL NEXT TRAIN: " + minsAway);

    // Next Train
    var nextArr = moment().add(minsAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArr).format("hh:mm"));

    var newNextArr = moment(nextArr).format("hh:mm");


//Display data //


$("#train-table > tbody").append("<tr> <td>" + trainName + 
"</td><td>" + destination +
"</td><td>" + freq +
"</td><td>" + newNextArr +
"</td><td>" + minsAway +
"</td></tr>");


})

});

