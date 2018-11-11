$(document).ready(function () {
    //alert("Giphi api alert")

    buttonarray = ["Harry Portter", "Incredibles", "First Man", "Crazy Rich Asian", "Mission Imposibal", "Skyscraper", "Jurassic World"]

    //==== function display button =====================================
    function displaybutton() {
        $("#gifbutton").empty();
        for (var i = 0; i < buttonarray.length; i++) {
            var gifli = $("<li>")
            var gifbtn = $("<a href='#'></a>")
            gifbtn.text(buttonarray[i]);
           // gifbtn.addClass("sidebar-brand");
            gifbtn.addClass("action");
            gifbtn.attr("<a href='#'></a>")
            gifbtn.attr("data-name", buttonarray[i]);
            gifli.append(gifbtn);
            $("#gifbutton").append(gifli);
        }
    }
    //==== function display button =====================================

    //=====add button click =========================================
    $("#add-movie").on("click", function (event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        
        // This line will grab the text from the input box
        var movie = $("#movie-input").val().trim();
        // movie input is blank then return false
        if (movie == ""){
            return false;
        }
        // The movie from the textbox is then added to our array
        buttonarray.push(movie);

        // calling renderButtons which handles the processing of our movie array
        displaybutton();
        return false;
    });
//=====add button click =========================================

//=====add function gif =========================================
    function displaygif() {
        $("#gifimage").empty();
        var buttonname = $(this).attr("data-name");
        console.log(buttonname);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonname + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function (response) {
            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                //console.log(response.data[0].rating);
                //$("#gifimage").append("Ratting : " + response.data[i].rating)
                // <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
                // data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" 
                // data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" 
                // data-state="still" 
                // class="gif" />

                var gifimage = $("<img>");
                gifimage.attr("src", response.data[i].images.fixed_height_small_still.url);
                gifimage.attr("data-still", response.data[i].images.fixed_height_small_still.url);
                gifimage.attr("data-animate", response.data[i].images.fixed_height_small.url);
                gifimage.attr("data-state", "still")
                gifimage.addClass("image");
                $("#gifimage").append(gifimage)
                //$("#gifimage").append("<img src='" + response.data[i].images.fixed_height_small_still.url + "'/>")
            }
        })
    }
//=====add function gif =========================================

//===== click button and display gif =========================================
    $(document).on("click", ".action", displaygif);

    //==== click gif image for animation =====================================
    $(document).on("click", (".image"), function () {
        //console.log("Image Click")
        var still = $(this).attr("data-state");
        if (still == "still") {
            var getanimatedgif = $(this).attr("data-animate");
            //console.log(getanimatedgif)
            $(this).attr("src", getanimatedgif);
            $(this).attr('data-state', 'animate');
        } else {
            var getanimatedgif = $(this).attr("data-still");
            //console.log(getanimatedgif)
            $(this).attr("src", getanimatedgif);
            $(this).attr('data-state', 'still');
        }
    });
//==== click gif image for animation =====================================

//==== call the function display button =====================================
    displaybutton();

    


});