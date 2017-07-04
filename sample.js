var casper = require('casper').create({
    viewportSize: {
        width: 950,
        height: 950
    }
});

// casper.start('http://casperjs.org/', function() {
//     this.echo(this.getTitle());
// });

// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo(this.getTitle());
// });

// casper.run();

// casper.start('http://www.google.fr/', function() {
//     var url = 'http://www.google.fr/intl/fr/about/corporate/company/';
//     this.download(url, 'google_company.html');
// });

// casper.run(function() {
//     this.echo('Done.').exit();
// });
var _ = require('lodash');
var categories = ['ANNE KLEIN', 'APPLIANCES', 'MICHAEL KORS', 'LUGGAGE', 'BOOTS', 'BOOTS WOMEN', 'SOCKS', 'SHORTS', 'COMFORTERS', 'SKIRTS', 'POLO', 'MEN WATCHES', 'WOMEN WATCHES', 'NAUTICA',
        'BED SHEETS', 'UNDER ARMOR', 'PAJAMAS', 'HANDBAGS', 'PURSES', 'TOWELS'
    ]
    //home page
casper.start('http://belk.com', function() {
    this.echo(this.getCurrentUrl(), this.getTitle())
    this.captureSelector('belk.pdf', 'body');
    if (this.exists('.header-search input[type=text]')) {
        this.echo('found searchbox', 'INFO');
    }
    else {
        this.echo('searchbox not found', 'ERROR');
    }
    //enters a random category
    this.fillSelectors('.header-search form', {
        'input[name="q"]': _.sample(categories),
    }, true);
    this.captureSelector('belksearch.pdf', 'body');

    this.wait(5000, function() {
        this.echo("I've waited for 5 seconds.");
        this.captureSelector('selection.pdf', 'body');
        this.echo(this.getCurrentUrl())

    })
});

casper.then(function() {
    this.click('div.product-image a')
    this.wait(6000, function() {
        this.echo("I've waited for 3 seconds")
        this.captureSelector('item.pdf', 'body');
        this.echo(this.getCurrentUrl())

    })

})




casper.thenOpen('http://phantomjs.org', function() {
    this.echo(this.getTitle());
});

casper.run();
