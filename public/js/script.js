var popupBehavior = function(action) {
    if(action == "open") {
        $("section.popup").css({"display": "block"});

        setTimeout(function() {
            $("section.popup").addClass("open");
            $("section.popup" + " .inner-content").addClass("open");

            $("html, body").addClass("overflowHidden");
        }, 10);
    }

    if(action == "close") {
        $("html, body").removeClass("overflowHidden");

        $("section.popup").removeClass("open");
        $("section.popup" + " .inner-content").removeClass("open");

        setTimeout(function() {
            $("html, body").removeClass("overflowHidden");
            $("sectiosn.popup").css({"display": "none"});
        }, 300);
    }

    return;
};

$(document).ready(function() {
    picturefill();
});
