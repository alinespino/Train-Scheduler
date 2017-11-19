

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
    trainName = $("#train").val().trim();
    destination = $("#destination").val().trim();
    freq = $("#freq").val().trim();
    firstTrain = moment($("#time").val().trim(),"hh:mm");

    // Calculate arrival and mins away // 

     // First Time (1 year back to make sure it comes before current time)
    var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
    console.log(firstTrainConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % freq;
    console.log(tRemainder);

    // Minute Until Train
    var minsAway = freq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minsAway);

    // Next Train
    var nextArr = moment().add(minsAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextArr).format("hh:mm"));

// hold temporary data // 

var newTrain = {
    train : trainName,
    dest : destination,
    freq : freq,
    arrival : nextArr,
    away : minsAway

};
 // Upload form data to firebase // 

 database.ref().push(newTrain);

 console.log(newTrain.train);
 console.log(newTrain.dest);
 console.log(newTrain.freq);
 console.log(newTrain.arrival);
 console.log(newTrain.away);


// clear form //
$("#train").val("");
$("#destination").val("");
$("#time").val("");
$("#freq").val("");


});

});

