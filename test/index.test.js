var Analytics = require('analytics.js-core').constructor;
var sandbox = require('clear-env');
var tester = require('analytics.js-integration-tester');
var RetentionScience = require('../lib');

describe('RetentionScience', function() {
  var analytics;
  var retentionScience;
  var options = {
    siteId: '123'
  };

  beforeEach(function() {
    analytics = new Analytics();
    retentionScience = new RetentionScience(options);
    analytics.use(RetentionScience);
    analytics.use(tester);
    analytics.add(retentionScience);
  });

  afterEach(function() {
    analytics.restore();
    analytics.reset();
    retentionScience.reset();
    sandbox();
  });

  describe('after loading', function() {
    beforeEach(function(done) {
      analytics.once('ready', done);
      analytics.initialize();
    });

    describe('#initialize', function() {
    });

    describe('#track', function() {
      beforeEach(function() {
        analytics.stub(window._rsq, 'push');
      });

      // it('calls completed order', function() {
      //   analytics.stub(retentionScience, 'completedOrder');
      //   analytics.track('Completed Order', {});
      //   analytics.called(retentionScience.completedOrder);
      // });

      it('works', function() {
        analytics.track('Completed Order', {});
        console.log(window._rsq);
      });
    });
  });
});
