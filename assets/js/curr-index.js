var currIndex = $('ul#indices-ul > li > a.active').text().toLowerCase();

$("ul#indices-ul > li > a").click(function (e) {
    $("ul#indices-ul > li > a").removeClass("active");
    currIndex = e.target.text.toLowerCase();
    $(e.target).addClass("active");
})