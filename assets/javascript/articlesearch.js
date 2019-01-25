$(".Search").click(function(){
// take in all info from form and save it in variables
    console.log("clicked");
    var keyWords = $("input[name=searchterms]");
    var queryURL =  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q="+keyWords+"&api-key=ef5156c9-019d-4e7f-9dc4-65a17d39f9af";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(response);
        })
});

$(".Clear").on("click", function(){
    console.log("fuck you cole");
});