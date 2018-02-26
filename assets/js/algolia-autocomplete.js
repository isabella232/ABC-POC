/* global instantsearch autocomplete */

var appID = 'Y63Q32NVDL',
    apiKey = '45bce7c03e206c4f2618e69a9f6acfc1',
    // articlesIndexName = 'split-text_articles',
    articlesIndexName = 'ABC_TEST_coremedia_article',
    iviewIndexName = 'ABC_TEST_iview',
    radioIndexName = 'ABC_TEST_coremedia_audio',
    tvIndexName = 'ABC_TEST_coremedia_video',
    heywireIndexName = 'media_aggregate',
    aboutIndexName = 'about',

    client = algoliasearch(appID, apiKey),

    articlesIndex = client.initIndex(articlesIndexName),
    iviewIndex = client.initIndex(iviewIndexName),
    radioIndex = client.initIndex(radioIndexName),
    tvIndex = client.initIndex(tvIndexName),
    aboutIndex = client.initIndex(aboutIndexName),
    heywireIndex = client.initIndex(heywireIndexName);
// articleHitSource = autocomplete.sources.hits(articlesIndex, { hitsPerPage: 5 });

autocomplete('#aa-search-input', {
    debug: true,
    hint: true,
    templates: {
        dropdownMenu: '<div class="left-wrapper"><div id="left-promotional" class="promotional"></div><div class="aa-dataset-iview"></div><div class="aa-dataset-tv"></div></div>' +
            '<div class="right-wrapper"><div class="aa-dataset-news"></div><div class="aa-dataset-radio"></div></div>'
    }
}, [{
    source: function (query, callback) {
        articlesIndex.search(query, { hitsPerPage: 5 }).then(function (answer) {
            $('#left-promotional').empty();
            if (answer.userData) {
                if (answer.userData[0].canonicalURL) {
                    var $link = $(`<a href=${answer.userData[0].canonicalURL}></a>`);
                    var $banner = $('<img class="img-banner" style="width:100%;">').attr('src', `./assets/img/${answer.userData[0].imgSrc}`);
                    $link.append($banner);
                    $('#left-promotional').css("display", "inline")
                    $('#left-promotional').prepend($link);
                }
            }
            callback(answer.hits);
            $('.aa-dataset-news > .aa-stats').remove();
            $('.aa-dataset-news').append(`<div class="aa-stats">
          <span>First 5 of ${answer.nbHits} news articles</span>
          <span class="see-all"><a type="link" value="news" class="aa-link">See all news...</a></span>
          </div>`);
            clickHandler();
        }, function () {
            callback([]);
        });
    },
    displayKey: 'title_t',
    name: 'news',
    templates: {
        header: '<div id="aa-news-header" class="aa-suggestions-category"><img id="news" img src="homepage/2013/styles/img/news-logo.png" ></div>',
        //'suggestion' templating function used to render a single suggestion
        suggestion: function (suggestion) {
            return '<a href="' +
                suggestion.canonicalURL +
                '"><div class="aa-title-wrapper"><span>' + suggestion._highlightResult.title.value + '</span></div></a>'
        },
        empty: '<div class="aa-empty">No matching ABC articles.</div>',
    }
},
{
    source: function (query, callback) {
        radioIndex.search(query, { hitsPerPage: 1 }).then(function (answer) {
            callback(answer.hits);
            $('.aa-dataset-radio > .aa-stats').remove();
            $('.aa-dataset-radio').append(`<div class="aa-stats"><span>First of ${answer.nbHits} radio hits</span><span class="see-all"><a type="link" value="radio" class="aa-link">See all radio...</a></span></div>`);
            // $("a.aa-link").click(function (e) {
            //     var index = $(e.target).attr('value');
            //     var query = $('input.aa-input').val();
            //     app({
            //         appID,
            //         apiKey,
            //         lang,
            //         articlesIndexName: indices[index].name,
            //         settings: indices[index].settings,
            //         callFromAa: true,
            //         query
            //     });
            // });
            clickHandler();
        }, function () {
            callback([]);
        });
    },
    displayKey: 'title_t',
    name: 'radio',
    templates: {
        //'suggestion' templating function used to render a single suggestion
        header: '<div id="aa-radio-header" class="aa-suggestions-category"><img src="homepage/2013/styles/img/radio-logo.png" ></div>',
        suggestion: function (suggestion) {
            return '<a href="' +
                suggestion.canonicalURL +
                '"><div class="aa-radio-wrapper"><div id="audio-play"></div><span>' + suggestion._highlightResult.title.value + '</span></div></a>'
        },
        empty: '<div class="aa-empty">No matching ABC audio.</div>'
    }
},
{
    source: function (query, callback) {
        iviewIndex.search(query, { hitsPerPage: 3 }).then(function (answer) {
            callback(answer.hits);
            $('.aa-dataset-iview > .aa-stats').remove();
            $('.aa-dataset-iview').append(`<div class="aa-stats" ><span class="see-all">First 3 of ${answer.nbHits} iview hits...<a type="link" value="iview" class="aa-link">See all iview</a></span></div>`);
            // $("a.aa-link").click(function (e) {
            //     var index = $(e.target).attr('value');
            //     var query = $('input.aa-input').val();
            //     app({
            //         appID,
            //         apiKey,
            //         lang,
            //         articlesIndexName: indices[index].name,
            //         settings: indices[index].settings,
            //         callFromAa: true,
            //         query
            //     });
            // });
            clickHandler();
        }, function () {
            callback([]);
        });
    },
    displayKey: 'title_t',
    name: 'iview',
    templates: {
        //'suggestion' templating function used to render a single suggestion
        header: '<div class="aa-suggestions-category video-header"><img img src="homepage/2013/styles/img/iview-logo.png"></div>',
        suggestion: function (suggestion) {
            try {
                return '<div class="video-wrapper"><a class="dropdown" href="' + suggestion.canonicalURL + '">' +
                    '<img class="video-thumbnail" src="https://res.cloudinary.com/algolia-maria/image/fetch/' + suggestion.media.image.thumbnail.images['16x9'] + '">' +
                    '</a></div>' +
                    '<div class="video-text-wrapper"><div class="video-title iview-title">' + suggestion._highlightResult.series.title.value +
                    ':</div><div class="video-title">' + suggestion._highlightResult.title.value || '' + '</div></div>'
            } catch (e) {
                return '<div class="video-wrapper"><a class="dropdown" href="' + suggestion.canonicalURL + '">' +
                    '<img class="video-thumbnail" src="homepage/2013/styles/img/abc-default.png"">' +
                    '</a></div>' +
                    '<div class="video-text-wrapper"><div class="video-title iview-title">' + suggestion._highlightResult.series.title.value +
                    ':</div><div class="video-title">' + '' + '</div></div>'
            }
        },
        empty: '<div class="aa-empty">No matching iView media.</div>'
    }
},
{
    source: function (query, callback) {
        tvIndex.search(query, { hitsPerPage: 3 }).then(function (answer) {
            callback(answer.hits);
            $('.aa-dataset-tv > .aa-stats').remove();
            $('.aa-dataset-tv').append(`<div class="aa-stats" ><span class="see-all">First 3 of ${answer.nbHits} television hits...<a type="link" value="television"  class="aa-link">See all television</a></span></div>`);
            // $("a.aa-link").click(function (e) {
            //     var index = $(e.target).attr('value');
            //     var query = $('input.aa-input').val();
            //     app({
            //         appID,
            //         apiKey,
            //         lang,
            //         articlesIndexName: indices[index].name,
            //         settings: indices[index].settings,
            //         callFromAa: true,
            //         query
            //     });
            // });
            clickHandler();
        }, function () {
            callback([]);
        });
    },
    displayKey: 'title_t',
    name: 'tv',
    templates: {
        //'suggestion' templating function used to render a single suggestion
        header: '<div class="aa-suggestions-category video-header"><img img src="homepage/2013/styles/img/television-logo.jpeg"></div>',
        suggestion: function (suggestion) {
            try {
                return '<div class="video-wrapper"><a class="dropdown" href="' + suggestion.canonicalURL + '">' +
                    '<img class="video-thumbnail" src="https://res.cloudinary.com/algolia-maria/image/fetch/' + suggestion.media.image.poster.images['16x9'] + '">' +
                    '</a></div>' +
                    '<div class="video-title">' + suggestion._highlightResult.title.value +
                    '</div></div>'
            } catch (e) {
                return '<div class="video-wrapper"><a class="dropdown" href="' + suggestion.canonicalURL + '">' +
                    '<img class="video-thumbnail" src="homepage/2013/styles/img/abc-default.png">' +
                    '</a></div>' +
                    '<div class="video-title">' + suggestion._highlightResult.title.value +
                    '</div></div>'
            }

        },
        empty: '<div class="aa-empty">No matching ABC television shows.</div>'
    }
},

    ]);

function clickHandler() {
    $("a.aa-link").click(function (e) {
        var index = $(e.target).attr('value');
        var query = $('input.aa-input').val();
        app({
            appID,
            apiKey,
            lang,
            articlesIndexName: indices[index].name,
            settings: indices[index].settings,
            callFromAa: true,
            query
        });
    });
}