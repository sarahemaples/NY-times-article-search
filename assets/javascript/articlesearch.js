$(document).ready(function(){
    $("#search").on("click", function(e){
        e.preventDefault();
    // take in all info from form and save it in variables
        console.log("clicked");
        var keyWords = $("input[name=searchterms]");
        console.log(keyWords);
        var queryURL =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=ef5156c9-019d-4e7f-9dc4-65a17d39f9af";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function(response) {
                console.log(response);
            })
    });

    // $(".Clear").on("click", function(e){
    //     e.preventDefault();
    //     console.log("fuck you cole");
    // });     

});