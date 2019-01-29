$(document).ready(function(){
    $("#search").on("click", function(e){
        e.preventDefault();
    // take in all info from form and save it in variables
        console.log("clicked");
        var keyWords = $("input[name=searchterms]").val();
        // console.log(keyWords);
        var queryURL =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+keyWords+"&api-key=ZV6Pg8ej8AANKrKAXnwu4ciANpJdCPky";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response.response.docs[0]);
                console.log(response.response.docs);
    // ----------------write a function below------------------ //
                displayArticles(response.response.docs, 1);
            })
    });

    // $(".Clear").on("click", function(e){
    //     e.preventDefault();
    //     console.log("fuck you cole");
    // });  
    
//---------------------------------------------------//
// FUNCTION THAT DISPLAYS ARTICLES ON SCREEN
//---------------------------------------------------//
// this function takes in two parameters (arr, n)
// arr is the array of articles returned
// n is the number of articles user wishes to display. default is 10
    function displayArticles(arr, n){
        // clear any previously displayed articles

        // create new list and append it to our 'results' div (span?)
        var articleList = $("<ul>");
        $("#results").append(articleList);

        // for loop through the response.data array
        for (var a = 0; a < n; a++){
            // create new list item
            var newArt = $("<li>");

            // add headline
            var headline = "<h2>" + arr[a].headline.main + "</h2><br>";
            newArt.append(headline);

            // add author

            // add date/time

            // add link to article

            // add list item to list
            articleList.append(newArt);
        }
    }
});