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
    tvIndex = client.initIndex(tvIndexName),
    indices = {
        news: articlesIndex,
        iview: iviewIndex,
        radio: radioIndex,
        tv: tvIndex
    };


var search = instantsearch({
    appId: appID,
    apiKey: apiKey,
    indexName: articlesIndexName,
    urlSync: true
});

search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#search-box',
        placeholder: 'Search the ABC for news...'
        // poweredBy: [boolean|SearchBoxPoweredByOption], 
        // reset: [boolean|SearchBoxResetOption], 
        // magnifier: [boolean|SearchBoxMagnifierOption], 
        // loadingIndicator: [boolean|SearchBoxLoadingIndicatorOption], 
        // wrapInput: [boolean], 
        // autofocus: [boolean|string], 
        // searchOnEnterKeyPressOnly: [boolean], 
        // cssClasses: [SearchBoxCSSClasses], 
        // queryHook: [function], 
    })
);

search.addWidget(
    instantsearch.widgets.stats({
        container: '#search-stats',
        // templates: [StatsWidgetTemplates], 
        // transformData: [StatsWidgetTransforms], 
        // autoHideContainer: [boolean], 
        // cssClasses: [StatsWidgetCssClasses], 
    })
);

search.addWidget(
    instantsearch.widgets.sortBySelector({
        container: '#sort-by',
        indices: [
            {name: 'ABC_TEST_coremedia_article', label: 'Relevance'},
            {name: 'newest-article', label: 'Newest'},
            {name: 'oldest-article', label: 'Oldest'}
        ], 
            // autoHideContainer: [boolean], 
            // cssClasses: [SortByWidgetCssClasses], 
        })
);


search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            item: getTemplate('article')
        }
    })
);

search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#genre-facet',
      attributeName: 'genre',
      operator: 'or',
      limit: 5,
      showMore: true,
      templates: {
        header: 'Genre'
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#keyword-facet',
      attributeName: 'keywords',
      operator: 'or',
      limit: 5,
      searchForFacetValues: true,
      showMore: true,
      templates: {
        header: 'Keywords'
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#author-facet',
      attributeName: 'attribution',
      operator: 'or',
      limit: 5,
      searchForFacetValues: true,
      showMore: true,
      templates: {
        header: 'Author'
      }
    })
  );
  

search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination-container',
      maxPages: 20,
      // default is to scroll to 'body', here we disable this behavior
      scrollTo: false,
      showFirstLast: false,
    })
  );



search.start();


function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
}