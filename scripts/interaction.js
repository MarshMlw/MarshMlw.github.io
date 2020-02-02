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
});