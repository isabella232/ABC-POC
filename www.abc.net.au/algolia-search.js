/* global instantsearch autocomplete */

var appID = 'Y63Q32NVDL',
apiKey = '45bce7c03e206c4f2618e69a9f6acfc1',
articlesIndexName = 'ABC_TEST_coremedia_article',
client = algoliasearch(appID, apiKey),
articlesIndex = client.initIndex(articlesIndexName);


var search = instantsearch({
    appId: appID,
    apiKey: apiKey, 
    indexName: articlesIndexName,
    urlSync: true
});

search.addWidget(
    instantsearch.widgets.hits({
        container: '#hits',
        templates: {
            item: getTemplate('hit')
          }
    })
);

search.start();


function getTemplate(templateName) {
    return document.querySelector(`#${templateName}-template`).innerHTML;
  }