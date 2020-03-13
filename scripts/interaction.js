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
    });

    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    $age = $('#age');
    $age.text(getAge("1994/03/27"));

    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
    });

});