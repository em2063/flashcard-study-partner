//Reveals form when user clicks on shape
function showForm(){
    var form = document.querySelector("#square form");
    form.style.display = "flex";
}

//takes values from form to calculate area
function area(form){
    var length = form.querySelector("#length").value;
    var width = form.querySelector("#width").value;

    if(isNaN(length) || isNaN(width)){
        alert("Please enter valid number");
    }else{
        var area = length * width;
        alert("The area is: " + area);
    }
}