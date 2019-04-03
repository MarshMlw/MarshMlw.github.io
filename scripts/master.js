$(document).ready(function () {

    // Form Labels Interaction

    // IN
    $('.input').focusin(function () {
        var name = $(this).attr('id');
        var labels = $('label');
        for (i = 0; i < labels.length; i++) {
            if (labels.eq(i).attr('for') == name) {
                labels.eq(i).addClass('translate');
            }
        }
    });

    // OUT
    $('.input').focusout(function () {
        if ($(this).val() == '') {
            var name = $(this).attr('id');
            var labels = $('label');
            for (i = 0; i < labels.length; i++) {
                if (labels.eq(i).attr('for') == name) {
                    labels.eq(i).removeClass('translate');
                }
            }
        }
    });

    // Off Canevas

    var burger = $('#burger');
    var offCanevas = $('.off-canevas');
    var links = $('#mobile-nav a');
    burger.click(function () {
        offCanevas.toggleClass('visible');
    });
    links.click(function () {
        offCanevas.toggleClass('visible');
    })

    // Works Grid Creation And Work Display

    // Find the grid
    var grid = $('#project-grid');
    
    // AJAX Request (Production Version)
    var jqxhr = $.getJSON("./data/medias.json", function (data) {

    // AJAX Request (Dev Version)
    //var jqxhr = $.getJSON("https://api.myjson.com/bins/1ddjhe", function (data) {

        for (i = (data.works.length)-1 ; i > -1; i--) {

            var id = data.works[i].id;
            var cat = data.works[i].cat;
            var url = data.works[i].url;
            var title = data.works[i].title;

            grid.append("<li w-id='" + id + "' data-cat='" + cat + "' class='project-card'></li>");
            var currentLi = $("[w-id=" + i + "]");
            currentLi.append("<div class='uk-card uk-card-default uk-card-body'></div>");
            var currentDiv = currentLi.find($("div"));
            currentDiv.append("<img src='" + url + "' alt='" + title + "'>");
        }

    }).done(function () {
        
        var projects = $('.project-card');
        var projectWindow = $('#project-display');
        var content = $('#project-content');

        projects.click(function () {

            var request = $(this).attr('w-id');

            console.log(request);

            var jqxhr = $.getJSON("https://api.myjson.com/bins/t6vre", function (data) {

                for (i = 0; i < data.works.length; i++) {

                    var id = data.works[i].id;

                    if (request == id) {

                        var url = data.works[i].url;
                        var title = data.works[i].title;
                        var alt = data.works[i].alt;
                        var planche = data.works[i].planche;

                        
                        if (planche != 'none') {
                            content.append("<div id='displayed-project' class='planche'></div>");
                            var displayedProject = $('#displayed-project');
                            displayedProject.append("<img src='" + planche + "' title='" + title + "' alt='" + alt + "'>");
                        } else {
                            content.append("<div id='displayed-project'></div>");
                            var displayedProject = $('#displayed-project');
                            displayedProject.append("<img src='" + url + "' title='" + title + "' alt='" + alt + "'>");
                        }
                    }
                }

            }).done(function () {
                projectWindow.addClass('project-mode');
            });

            var close = $('#close');
            var wrapper1 = $('#project-display');
            var wrapper2 = $('.display-wrapper');

            close.click(function () {
                content.html('');
                projectWindow.removeClass('project-mode');
            });

            wrapper1.click(function () {
                content.html('');
                projectWindow.removeClass('project-mode');
            });
            
            wrapper2.click(function () {
                content.html('');
                projectWindow.removeClass('project-mode');
            });
        });
    });
});