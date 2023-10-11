    $(function() {
        $('.desc-container').hide(); //Hide all containers originally
        $('#skills-desc').show(); //originally show when page loads
    });
    
    function activeLink(linkElement){
        var tabs = $('.tab-links');

        tabs.removeClass('active-link'); //removes decoration from previous
        $(linkElement).addClass('active-link') //Adds decoration to active link

        $('.desc-container').hide();
        var id  = $(linkElement).text().toLowerCase() + '-desc'; //get container based off tab pressed
        $('#' + id).show(); //show requiered container
    }