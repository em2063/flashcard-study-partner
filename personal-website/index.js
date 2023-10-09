    function activeLink(linkElement){
        var tabs = $('.tab-links');
        var tabDesc = $('.skills-list')

        tabs.removeClass('active-link'); //removes decoration from previous
        $(linkElement).addClass('active-link') //Adds decorstion to active link
        tabDesc.removeClass('activeList'); //Hide last description

    }