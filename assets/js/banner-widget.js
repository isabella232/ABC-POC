var bestBetWidget = {
    render: function (options) {
        $(".img-banner").remove();
        var userData = options.results._rawResults[0].userData;
        if (userData) {
            if (userData[0].canonicalURL) {
                var $link = $(`<a href=${userData[0].canonicalURL}></a>`);
                var $banner = $('<img class="img-banner" style="width:100%;">').attr('src', `./assets/img/${userData[0].imgSrc}`);
                $link.append($banner);
                $('.hitsContainer').prepend($link);

            }
        }
    }
}