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
            $("section.popup").css({"display": "none"});
        }, 300);
    }

    return;
};

$(document).ready(function() {
    picturefill();

    $("#open-popup").click(function(e) {
      e.preventDefault();

      popupBehavior('open')
    })

    $("#close-popup").click(function(e) {
      e.preventDefault();

      popupBehavior('close')
    })
});
