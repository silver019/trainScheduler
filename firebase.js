var config = {
    apiKey: "AIzaSyBZsWZ4Zk7d3vJNABIAKGiAlOE3YmPyljY",
    authDomain: "trainscheduler-f7f89.firebaseapp.com",
    databaseURL: "https://trainscheduler-f7f89.firebaseio.com",
    projectId: "trainscheduler-f7f89",
    storageBucket: "trainscheduler-f7f89.appspot.com",
    messagingSenderId: "797920073355"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //initial values
  var name = "";
  var email = "";
  var age = 0;
  var comment= "";

  //capture button clicks
  $("#add-user").on("click", function(event){
  	event.preventDefault();

  	name = $("#name-input").val().trim();
  	email = $("#email-input").val().trim();
  	age = $("#age-input").val().trim();
  	comment = $("#comment-input").val().trim();

  	//code for pushing values in the database.
  	database.ref().push({
  		name: name,
  		email: email,
  		age: age,
  		comment: comment
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});
  });

  //firebase watcher plus initial loader
  dataRef.ref().on("child-added", function(childSnapshot){
  	//log everything that's coming out of snapshot
  	console.log(childSnapshot.val().name);
  	console.log(childSnapshot.val().email);
  	console.log(childSnapshot.val().age);
  	console.log(childSnapshot.val().comment);
  	console.log(childSnapshot.val().joinDate);
  	//full list of items to the well
  	$("#full-member-list").append("<div class'well'><span id'name'>" + childSnapshot.val().name +
  		"<span id'email'>" + childSnapshot.val().email +
  		"<span id'age'>" + childSnapshot.val().age +
  		"<span id'comment'>" + childSnapshot.val().comment + "</span></div>");
  	//handle the errors
  }, function(errorObject){
  	console.log("Errors handled: " + errorObject.code);
  });
  dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){
  	var cvn = snapshot.val();
  	//change the html to reflect
  	$("#name-display").html(cvn.name);
  	$("#email-display").html(cvn.email);
  	$("#age-display").html(cvn.age);
  	$("#comment-display").html(cvn.comment);
  })