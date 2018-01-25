/* global instantsearch autocomplete */

var appID = 'Y63Q32NVDL',
    apiKey = '45bce7c03e206c4f2618e69a9f6acfc1',
    articlesIndexName = 'ABC_TEST_coremedia_article',
    iviewIndexName = 'ABC_TEST_iview',
    radioIndexName = 'ABC_TEST_coremedia_audio',
    tvIndexName = 'ABC_TEST_coremedia_video',

    client = algoliasearch(appID, apiKey),

    articlesIndex = client.initIndex(articlesIndexName),
    iviewIndex = client.initIndex(iviewIndexName),
    radioIndex = client.initIndex(radioIndexName),
    tvIndex = client.initIndex(tvIndexName);

autocomplete('#aa-search-input', {
    debug: true,
    hint: true,
    templates: {
        dropdownMenu: '<div class="left-wrapper"><div class="aa-dataset-news"></div><div class="aa-dataset-radio"></div></div>' +
            '<div class="right-wrapper"><div class="aa-dataset-iview"></div><div class="aa-dataset-tv"></div></div>'
           }
}, [{
        source: autocomplete.sources.hits(articlesIndex, {
            hitsPerPage: 5,
            //filter: "lang:en"
        }),
        displayKey: 'title_t',
        name: 'news',
        templates: {
            header: '<div class="aa-suggestions-category">News</div>',
            //'suggestion' templating function used to render a single suggestion
            suggestion: function (suggestion) {
                return '<span>' + suggestion._highlightResult.title.value + '</span>'
            },
            empty: '<div class="aa-empty">No matching ABC articles</div>'
        }
    },
    {
        source: autocomplete.sources.hits(radioIndex, {
            hitsPerPage: 1
        }),
        displayKey: 'title_t',
        name: 'radio',
        templates: {
            //'suggestion' templating function used to render a single suggestion
            header: '<div class="aa-suggestions-category">Radio</div>',
            suggestion: function (suggestion) {
                return '<span>' + suggestion._highlightResult.title.value + '</span>'
            }
        }
    },
    {
        source: autocomplete.sources.hits(iviewIndex, {
            hitsPerPage: 3
        }),
        displayKey: 'title_t',
        name: 'iview',
        templates: {
            //'suggestion' templating function used to render a single suggestion
            header: '<div class="aa-suggestions-category">iView</div>',
            suggestion: function (suggestion) {
                return '<span>' + suggestion._highlightResult.title.value + '</span>'
            }
        }
    },
    {
        source: autocomplete.sources.hits(tvIndex, {
            hitsPerPage: 3
        }),
        displayKey: 'title_t',
        name: 'tv',
        templates: {
            //'suggestion' templating function used to render a single suggestion
            header: '<div class="aa-suggestions-category">Television</div>',
            suggestion: function (suggestion) {
                console.log('tvsuggestion', suggestion)
                return '<span>' + suggestion._highlightResult.title.value + '</span>'
            }
        }
    },

]
);


function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
}
