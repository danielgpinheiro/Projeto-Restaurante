window.onload = function () {
    $("lazy-content").each(function(index, element) {
        var content = $(this);
        var route = content.attr("href");

        $.ajax({
            type: 'GET',
            url: route,
            success: function(data, status) {
                content.append(data);

                $("inline-svg").each(function(index, element) {
                    var content = $(this);
                    var route = content.attr("src");

                    $.ajax({
                        type: 'GET',
                        url: route,
                        dataType: 'text',
                        success: function(data, status) {
                            element.innerHTML = data;
                            element.style.display = 'inline-block';
                        }
                    });
                });

            }
        });
    });
};
