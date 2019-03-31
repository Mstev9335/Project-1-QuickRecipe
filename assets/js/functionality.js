let email = "joe";
var dbName = "test";


// if (window.localStorage.getItem("email")) {
//   email = JSON.parse(window.localStorage.getItem("email"));
// }
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBDyLpzCS8pimBAzwnGwZa0WWoUlf3BQ2k",
  authDomain: "group-project-1-c2e2d.firebaseapp.com",
  databaseURL: "https://group-project-1-c2e2d.firebaseio.com",
  projectId: "group-project-1-c2e2d",
  storageBucket: "group-project-1-c2e2d.appspot.com",
  messagingSenderId: "355709778913"
};

firebase.initializeApp(config);

// store firebase in variable
var database = firebase.database();
let stringified;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log(user);
     
      window.localStorage.setItem("userEmail", JSON.stringify(user.email));
   
      
    } else {
      // No user is signed in.
    }
  });

//  function to get the ingredients to be searched for
function generateResults() {
  let searchVal = getIngredients();
  let YOUR_APP_ID = 'b39fa4a4';
  let YOUR_APP_KEY = '734bf2b0831c3cfb3c8fa44c770d523b';
  let queryURL = "https://api.edamam.com/search?q=" + searchVal + "&app_id=b39fa4a4&app_key=734bf2b0831c3cfb3c8fa44c770d523b"

  $("#results").empty();
  // ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    //users testing
    // ====================================
    // var usersRef = firebase.database().ref('users');
    // var adaRef = usersRef.child('ada');
    // var adaFirstNameRef = adaRef.child('name/first');
    // var path = adaFirstNameRef.toString();

    let userEmail = JSON.parse(window.localStorage.getItem("userEmail"));
    console.log("test2");
    console.log("user email from local storage: " +userEmail);
    var userEmail2   = userEmail.substring(0, userEmail.lastIndexOf("@"));
    console.log("email wihtout symbols: " +userEmail2);
    var usersRef = firebase.database().ref('users');
    var userRef = usersRef.child(userEmail2);
    var userFirstNameRef = userRef.child('name/first');
    var path = userFirstNameRef.toString();


    //  ======================================

    let selections = [];

    console.log(response.hits);

    console.log(selections);
    for (var i = 0; i < 10; i++) {
      let hit = response.hits[i];
      var recipe = hit.recipe.label;
      var ingredients = hit.recipe.ingredientLines;
      selections.push(recipe);
      var time = hit.recipe.totalTime;
      var image = hit.recipe.image;
      var contains = hit.recipe.healthLabels;
      var calories = hit.recipe.calories;

      var healthArray = hit.recipe.healthLabels;

      var ingredients = hit.recipe.ingredientLines;
      var health = "";

      for (var j = 0; j < healthArray.length; j++) {
        if (j + 1 === healthArray.length) {
          health += healthArray[j];
        }
        else {
          health += healthArray[j] + ", ";
        }
      }

      createRow(image, recipe, time, ingredients, health, calories);

    }

    $(".favorite-button").on("click", function () {

      let recipeName = $(this).attr("value");
      console.log(recipeName);
      console.log(selections);
      let favorite = selections.indexOf(recipeName);
      console.log("index of recipe: " + favorite);
      let recipe = response.hits[favorite];


      // change sugar.added in the api call to sugar-added so it will add to the database
      stringified = JSON.stringify(recipe);

      if (typeof (stringified) === "undefined") {
      }
      else if (stringified.includes("SUGAR.added")) {
        stringified = stringified.replace("SUGAR.added", "SUGAR-added");
      }



      database.ref(userRef).push({
        recipeName: JSON.parse(stringified)
      });

    });
    // end of favorite button


    // link to steps
    $(".link-button").on("click", function () {
      let recipeName = $(this).val();
      let index = selections.indexOf(recipeName);
      let recipe = response.hits[index];

      window.location = recipe.recipe.url;
    });



    // gets data from firebase database
    database.ref(userRef).on("child_added", function (childSnapshot) {
      var fireName = childSnapshot.val().recipeName.recipe.label;
      var fireTime = childSnapshot.val().recipeName.recipe.totalTime;
      var fireContains = childSnapshot.val().recipeName.recipe.healthLabels;
      var fireCalories = childSnapshot.val().recipeName.recipe.calories;
      var fireImage = childSnapshot.val().recipeName.recipe.image;
      console.log("recipe from database: " + fireName);
      console.log("time: " + fireTime);
      console.log("health: " + fireContains);
      console.log("calories: " + fireCalories);
      console.log("image: " + fireImage);

      createFav(fireImage, fireName, fireTime, ingredients, fireCalories, fireContains);

      
      // ====================================
      // favorites link button
      $(".linkFav-button").on("click", function () {
        let recipeN = $(this).val();
        let url;
        var fName = childSnapshot.val().recipeName.recipe.label;
        // console.log(fName);
        if (recipeN === fName) {
          url = childSnapshot.val().recipeName.recipe.url;
          console.log(url);
          window.location.href = url;
        }
      });

      $(document).on("click", ".linkFav-button", function (e) {
        e.preventDefault();
        e.stopPropagation();
      });

      // displays the search results
      function createFav(fImage, fName, fTime, desc, fCalories, fContains) {
        let favoriteResult = $("<div>");
        let favoriteImg = $("<img>");
        let favoritePreview = $("<div>");
        let favoriteTitle = $("<h1>");
        let favoritePreptime = $("<h2>");
        let favoriteWarnings = $("<h3>");
        let favoriteCalories = $("<h3>");
        let favoriteDetails = $("<div>");
        let favoriteContains = $("<div>");
        let favoriteDescription = $("<pre>");
        // let favButton = $("<button>");
        let linkButton = $("<button>");

        favoriteResult.addClass("favorite-result");
        favoriteImg.addClass("favorite-img");
        favoritePreview.addClass("favorite-preview");
        favoriteTitle.addClass("favorite-title");
        favoritePreptime.addClass("favorite-preptime");
        favoriteWarnings.addClass("favorite-warnings");
        favoriteCalories.addClass("favorite-calories");
        favoriteContains.addClass("favorite-contains");
        favoriteDetails.addClass("favorite-details");
        favoriteDescription.addClass("favorite-description");
        favoriteDescription.attr("white-space", "pre-wrap;")


        // add button to page
        linkButton.text("See Steps");
        linkButton.addClass("linkFav-button");
        linkButton.attr("value", fName);


        favoriteImg.attr("src", fImage);
        favoriteResult.append(favoriteImg);

        favoriteTitle.text(fName);
        favoritePreview.append(favoriteTitle);

        if (fTime === "0" || fTime === 0) {
          favoritePreptime.text("Preptime: Not available");
        }
        else {
          favoritePreptime.text("Preptime: " + fTime + " minutes");
        }
        favoritePreview.append(favoritePreptime);

        favoriteWarnings.text("Health Labels: " + fContains);
        favoritePreview.append(favoriteWarnings);

        favoriteCalories.text("Calories: " + fCalories);
        favoritePreview.append(favoriteCalories);

        for (var i = 0; i < desc.length; i++) {
          favoriteDescription.append(desc[i] + "\n");
        }
        favoriteDetails.append(favoriteDescription);

        favoritePreview.append(favoriteDetails);

        favoriteResult.append(favoritePreview);
        favoriteResult.append(linkButton);
        //  favoriteResult.append(favButton);
        $("#favorites").append(favoriteResult);
      }
    });

    $("#clear-btn").on("click", function () {
      database.ref().remove();
      window.location = "favorites.html";
    });

    $("#result-link-btn").on("click", function () {
      window.location = "results.html";
    });


    // ======================================


    // end of ajax call
  });
  // end of ajax call
}