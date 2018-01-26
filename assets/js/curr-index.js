

var currIndex =  $('ul#indices-ul > li > a.active').text().toLowerCase();

$("ul#indices-ul > li > a").click(function (e) {
    console.log('test', e.target.value);
})
