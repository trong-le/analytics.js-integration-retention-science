/**
* Module dependencies.
*/

var integration = require('analytics.js-integration');
var each = require('each');
// var foldl = require('foldl');
// var keys = require('keys');
// var extend = require('extend');
// var includes = require('includes');
// var map = require('map');

/**
* Expose `Retention Science` integration
*/

var RetentionScience = module.exports = integration('Retention Science')
  .global('_rsq')
  .option('siteId', '')
  .option('enableOnSite', false)
  .tag('<script src="//d1stxfv94hrhia.cloudfront.net/waves/v2/w.js">');

/**
* Initialize Retention Science
*
* @param {Facade} page
*/

RetentionScience.prototype.initialize = function() {
  window._rsq = window._rsq || [];
  window._rsq.push(['_setSiteId', this.options.siteId]);
  if (this.options.enableOnSite) {
    window._rsq.push(['_enableOnSite']);
  }
  this.load(this.ready);
};


/**
 * Has the Retention Science library been loaded yet?
 *
 * @return {Boolean}
 */

RetentionScience.prototype.loaded = function() {
  return !!(window._rsq);
  // return !!(window._rsq && window._rsq._rsci_wave);
};


/**
 * Identify.
 *
 * @param {Identify} identify
 */

// RetentionScience.prototype.identify = function(identify) {
//   window._rsq.push(['_setUserId', identify.userId()]);
//   window._rsq.push(['_setUserEmail', identify.email()]);
// };


/**
* Track a page view
*
* @param {Facade} track
*/

RetentionScience.prototype.page = function() {
  this._addIdentity();
  window._rsq.push(['_track']);
};


/**
 * Track event.
 */

RetentionScience.prototype.track = function(track) {
  this._addIdentity();
  window._rsq.push(['_setAction', track.event()]);
  window._rsq.push(['_setParams', track.properties()]);
  window._rsq.push(['_track']);
};


/**
 * Viewed Product.
 */

RetentionScience.prototype.viewedProduct = function(track) {
  this._addIdentity();
  this._addRSProduct(track.id() || track.sku(), track.name(), track.price());
  window._rsq.push(['_track']);
};


/**
 * Completed Order.
 */

RetentionScience.prototype.completedOrder = function(track) {
  this._addIdentity();
  var self = this;
  window._rsq.push(['_addOrder', { id: track.orderId() || '', total: track.revenue() || '' }]);
  each(function(product) {
    self._addRSProduct(product.id || product.sku, product.name, product.price);
  }, track.products() || []);
  window._rsq.push(['_setAction', 'checkout_success']);
  window._rsq.push(['_track']);
};


/**
 * Add userId and email to queue
 */

RetentionScience.prototype._addIdentity = function() {
  var userId = this.analytics.user().id();
  var email = (this.analytics.user().traits() || {}).email;
  window._rsq.push(['_setUserId', userId]);
  window._rsq.push(['_setUserEmail', email]);
};


/**
 * Add a product to queue
 */

RetentionScience.prototype._addRSProduct = function(id, name, price) {
  window._rsq.push(['_addItem', {
    id: id || '',
    name: name || '',
    price: price || ''
  }]);
};

