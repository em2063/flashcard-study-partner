$(function() {
    function responsive(){
        var width = $(window).width(); //width of device
        var element = $("#project-section") //get project containers
        var projectContainers = $(".project-containers"); //get project elements

        if(width < 768) {
            element.css("flex-direction", "column") //change it to column for easier view
            projectContainers.css("margin-top", "15px")
        }else {
            element.css("flex-direction", "row")
        }
    }
    responsive(); //initailly call function
    $(window).resize(responsive);
})
