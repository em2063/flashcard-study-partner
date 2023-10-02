//Reveals form when user clicks on shape
function showForm(){
    var form = $(".square form");
    form.css("display", "flex");
}

//takes values from form to calculate area
function area(e){
    e.preventDefault();
    var length = form.querySelector("#length").value;
    var width = form.querySelector("#width").value;
    var areaLabel = document.getElementById("area-label");

    if(isNaN(length) || isNaN(width)){
        alert("Please enter valid number");
    }else{
        var area = length * width;
        areaLabel.innerHTML = area;
    }

    form.style.display = "none";
    var square = document.querySelector(".square");
    square.classList.add("square:hover");
}