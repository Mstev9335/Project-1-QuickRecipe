const ingredientsUp = "arrow_drop_up";
const ingredientsDown = "arrow_drop_down"
// declare array to store the ingredients
let ingredients = [];

// click logo to return to the main page
$("#header-logo").on("click", function () {
    window.location = "index.html";
});

$("#main-search-bar").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search-icon").click();
    }
});

$("#header-search-bar").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#header-search-icon").click();
    }
});

// results page search button
// $("#header-search-btn").on("click", function () {
$("#header-search-icon").on("click", function () {
    let content = $("#header-ingredients-area");
    let content2 = $("#results");

    content2.css("margin-top", (content.prop("scrollHeight") + 100) + "px");

    let search = $("#header-search-bar").val();
    search = search.trim();

    if (typeof (search) === "undefined" || search === "") {

    }
    else {
        let includes = false;
        for (var i = 0; i < ingredients.length; i++) {
            if (search === ingredients[i]) {
                includes = true;
                break;
            }
        }

        if (includes) {

        }
        else {
            ingredients.push(search);

            let btn = $("<button>");

            btn.addClass("ingredient");
            btn.text("X " + search);

            $("#header-search-bar").val("");

            $("#header-ingredients-area").append(btn);
        }
    }
    generateResults();
});

// results page add button
// $("#header-add-btn").on("click", function () {
$("#header-add-icon").on("click", function () {
    let search = $("#header-search-bar").val();
    search = search.trim();

    if (typeof (search) === "undefined" || search === "") {

    }
    else {
        let includes = false;
        for (var i = 0; i < ingredients.length; i++) {
            if (search === ingredients[i]) {
                includes = true;
                break;
            }
        }

        if (includes) {

        }
        else {
            ingredients.push(search);

            let btn = $("<button>");

            btn.addClass("ingredient");
            btn.text("X " + search);

            $("#header-search-bar").val("");

            $("#header-ingredients-area").append(btn);
        }
    }

    if ($("#header-dropdown-btn").text() === ingredientsUp) {
        let content = $("#header-ingredients-area");
        let content2 = $("#results");

        content.css("max-height", content.prop("scrollHeight") + "px");
        content2.css("margin-top", (content.prop("scrollHeight") + 100) + "px");
    }
});

$("#header-dropdown-btn").on("click", function () {
    let btn = $(this);
    let content = $("#header-ingredients-area");
    let content2 = $("#results");

    if (btn.text() === ingredientsDown) {
        btn.text(ingredientsUp);
        content.css("max-height", content.prop("scrollHeight") + "px");
        content2.css("margin-top", (content.prop("scrollHeight") + 100) + "px");
    }


    else {
        btn.text(ingredientsDown);
        content.css("max-height", "0px");
        content2.css("margin-top", "100px");

    }
})

$(document).on("click", ".search-result", function (e) {
    // $(".search-result").on("click", function () {
    if (!$(".favorite-button").is(e.target) || !$(".link-button").is(e.target)) {
        let content = $(this).find(".result-details");

        if (content.css("max-height") === "0px") {
            content.css("max-height", content.prop("scrollHeight") + "px");
        } else {
            content.css("max-height", "0px");
        }
    }
});



$(document).on("click", ".link-button", function(e) {
    e.preventDefault();
    e.stopPropagation();

    
});

$(document).on("click", ".favorite-button", function(e) {
    e.preventDefault();
    e.stopPropagation();
    let btn = $(this);

    if(btn.text() === "favorite_border") {
        btn.text("favorite");
    }
    else {
        btn.text("favorite_border");
    }
});

// main page search button
// $("#main-search-btn").on("click", function () {
$("#search-icon").on("click", function () {
    let search = $("#main-search-bar").val();
    search = search.trim();



    if (typeof (search) === "undefined" || search === "") {

    }
    else {
        let includes = false;
        for (var i = 0; i < ingredients.length; i++) {
            if (search === ingredients[i]) {
                includes = true;
                break;
            }
        }

        if (includes) {

        }
        else {
            ingredients.push(search);

            let btn = $("<button>");

            btn.addClass("ingredient");
            btn.text("X " + search);

            $("#main-search-bar").val("");

            $("#ingredients-list-area").append(btn);
        }
    }

    window.localStorage.setItem("cart", JSON.stringify(ingredients));
    window.location = "results.html";
});

// main page add button
// $("#main-add-btn").on("click", function () {
$("#add-icon").on("click", function () {
    let search = $("#main-search-bar").val();
    search = search.trim();

    if (typeof (search) === "undefined" || search === "") {

    }
    else {
        let includes = false;
        for (var i = 0; i < ingredients.length; i++) {
            if (search === ingredients[i]) {
                includes = true;
                break;
            }
        }

        if (includes) {

        }
        else {
            ingredients.push(search);

            let btn = $("<button>");

            btn.addClass("ingredient");
            btn.text("X " + search);

            $("#main-search-bar").val("");

            $("#ingredients-list-area").append(btn);
        }
    }
});

$("#login-btn").on("click", function () {
    window.location = "account.html";
});

$("#results-link-btn").on("click", function() {
    window.location = "results.html";
});

// goes from results page to favorites page
$("#favorites-btn").on("click", function () {
    window.location = "favorites.html";
});


$("#account-btn").on("click", function() {
    let div = $("#account-div");
    let logBtn = $("#login-btn");
    let favBtn = $("#favorites-btn");

    if(div.css("max-height") === "40px") {
        div.css("max-height", "100px");
        div.css("max-width", "100px");
        div.css("height", "100px");
        div.css("width", "100px");
        logBtn.css("border-top", "1px lightgray solid");
        logBtn.css("border-bottom", "1px lightgray solid");
        logBtn.css("display", "block");
        favBtn.css("display", "block");
        div.css("background", "rgb(87,87,87)");
        div.css("border", "1px lightgray solid")
    }
    else {
        div.css("max-height", "40px");
        div.css("max-width", "50px");
        logBtn.css("display", "none");
        logBtn.css("border", "none");
        favBtn.css("display", "none");
        div.css("background", "none");
        div.css("border", "none");
    }
});



// goes from favorite page to results page
$("#recipes-btn").on("click", function () {
    window.location = "results.html";
});

// clicks to remove ingredient from search area
$(document).on("click", ".ingredient", function () {
    ingredients.splice(ingredients.indexOf($(this).text().substr(2)), 1);

    $(this).remove();
});

function populateIngredients() {
    ingredients = JSON.parse(window.localStorage.getItem("cart"));
    let field = $("#header-ingredients-area");
    let btns = [];

    $.each(ingredients, function (index, value) {
        $("#header-ingredients-area").append($("<button>").addClass("ingredient").text("X " + value));
    });
}

// displays the search results
function createRow(img, title, preptime, desc, health, cals, contains) {
    let searchResult = $("<div>");
    let resultImg = $("<img>");
    let resultPreview = $("<div>");
    let resultTitle = $("<h1>");
    let resultPreptime = $("<h2>");
    let resultWarnings = $("<h3>");
    let resultCalories = $("<h3>");
    let resultDetails = $("<div>");
    let resultContains = $("<div>");
    let resultDescription = $("<pre>");
    let favButton = $("<button>");
    let linkButton = $("<button>");

    searchResult.addClass("search-result");
    resultImg.addClass("result-img");
    resultPreview.addClass("result-preview");
    resultTitle.addClass("result-title");
    resultPreptime.addClass("result-preptime");
    resultWarnings.addClass("result-warnings");
    resultCalories.addClass("result-calories");
    resultContains.addClass("result-contains");
    resultDetails.addClass("result-details");
    resultDescription.addClass("result-description");
    resultDescription.attr("white-space", "pre-wrap;")

    // add class to button
    favButton.text("favorite_border");
    favButton.addClass("favorite-button material-icons");
    favButton.attr("value", title);
    // add button to page
    linkButton.text("See Steps");
    linkButton.addClass("link-button");
    linkButton.attr("value", title);


    resultImg.attr("src", img);
    searchResult.append(resultImg);

    resultTitle.text(title);
    resultPreview.append(resultTitle);

    if (preptime === "0" || preptime === 0) {
        resultPreptime.text("Preptime: Not available");
    }
    else {
        resultPreptime.text("Preptime: " + preptime + " minutes");
    }
    resultPreview.append(resultPreptime);

    resultWarnings.text("Contains: " + health);
    resultPreview.append(resultWarnings);

    resultCalories.text("Calories: " + cals);
    resultPreview.append(resultCalories);

    for (var i = 0; i < desc.length; i++) {
        resultDescription.append(desc[i] + "\n");
    }
    resultDetails.append(resultDescription);

    resultPreview.append(resultDetails);

    searchResult.append(resultPreview);
    searchResult.append(linkButton);
    searchResult.append(favButton);
    $("#results").append(searchResult);
}

function getIngredients() {
    let ret = "";
    for (var i = 0; i < ingredients.length; i++) {
        ret += " " + ingredients[i];
    }

    ret = ret.trim();
    return ret;
}
