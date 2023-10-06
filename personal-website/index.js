$(function() {
    function responsive(){
        var width = $(window).width(); //width of device
        var projectElement = $("#project-section"); //get project containers
        var aboutElement = $("#about");
        var projectContainers = $(".project-containers"); //get project elements

        if(width < 768) {
            aboutElement.css("flex-direction", "column");
            projectElement.css("flex-direction", "column"); //change it to column for easier view
            projectContainers.css("margin-top", "15px");
        }else {
            projectElement.css("flex-direction", "row");
        }
    }
    responsive(); //initailly call function
    $(window).resize(responsive);
})
