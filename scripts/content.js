$(document).ready(function () {

    var grid = $('#project-grid');
    var modalWork = $('#project-display');
    var modalWorkContent = $('#project-content');

    function WorksHomeWrapper(id, category, logo, title) {

        this.wHW = $('<li>').addClass('project-card').attr('w-id', id).attr('data-cat', category);
        this.wHWC = $('<div>').addClass('uk-card uk-card-default uk-card-body');
        this.wLogoImg = $('<img>').attr({
            src: logo,
            alt: title
        });

        this.build = build;

        function build() {
            this.wHWC.append(this.wLogoImg);
            this.wHW.append(this.wHWC);
        }

    }

    function WorksWrapper(logo, planche, title, url) {

        this.wW = $('<div>').attr({
            id: 'displayed-project'
        }).addClass('planche');

        if (url != null) {

        this.wLinkToProject = $('<div>').addClass('linkToMaquette');
        this.wLinkToProject.append($('<a>').attr({
            href: url,
            alt: title,
            class: "hvr-ripple-out"
        }).append('La maquette intégrée'));


        } else {

            this.wLinkToProject = null;
        }

        if (planche != null) {

            this.wPlanche = $('<img>').attr({
                src: planche,
                alt: title
            });

        } else {

            this.wPlanche = $('<img>').attr({
                src: logo,
                alt: title
            });
        }

        this.build = build;

        function build() {
            this.wW.append(this.wPlanche);
            if (this.wLinkToProject !== null) {
                this.wW.append(this.wLinkToProject);
            }
        }
    }

    // Works Display

    // AJAX Request (Production Version)
    var jqxhr = $.getJSON("./data/medias.json", function (data) {

    // AJAX Request (Dev Version)
    //var jqxhr = $.getJSON("https://api.myjson.com/bins/kuur2", function (data) {

        for (i = (data.works.length) - 1; i > -1; i--) {

            var wId = data.works[i].id;
            var wTitle = data.works[i].title;
            var wLogo = data.works[i].logo;
            var wCat = data.works[i].cat;

            var newWork = new WorksHomeWrapper(wId, wCat, wLogo, wTitle);

            newWork.build();

            grid.append(newWork.wHW);

        }

    }).done(function (data) {

        var oneWork = $('.project-card').click(function () {;

            voidWork();

            var wId = $(this).attr('w-id');

            var logo = data.works[wId].logo;
            var planche = data.works[wId].planche;
            var title = data.works[wId].title;
            var url = data.works[wId].url;

            var clickedWork = new WorksWrapper(logo, planche, title, url);
            clickedWork.build();
            modalWorkContent.append(clickedWork.wW);

            modalWork.toggleClass('project-mode');
        });
    });

    var closeWork = $('#close');

    closeWork.click(function () {
        modalWork.toggleClass('project-mode');
        voidWork();
    });

    function voidWork() {
        modalWorkContent.html('');
    }
});