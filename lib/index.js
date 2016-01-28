/**
* Module dependencies.
*/

var integration = require('analytics.js-integration');
var foldl = require('foldl');
var each = require('each');
var keys = require('keys');
var extend = require('extend');
var includes = require('includes');
var map = require('map');

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

RetentionScience.prototype.intialize = function() {
  console.log(window._rsq);
  window._rsq = window._rsq || [];
  console.log(window._rsq);
  this.load(this.ready);
};


/**
 * Has the Retention Science library been loaded yet?
 *
 * @return {Boolean}
 */

RetentionScience.prototype.loaded = function() {
  return !!(window._rsq);
};


RetentionScience.prototype.setDefaults = function(identify){
  window._rsq.push(['_setSiteId', this.options.siteId]);
  if (this.options.enableOnSite) {
    window._rsq.push(['_enableOnSite']);
  };
  window._rsq.push(['_setUserId', identify.userId()]);
  window._rsq.push(['_setUserEmail', identify.email()]);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

// RetentionScience.prototype.identify = function(identify) {
// };



/**
* Track a page view
* 
* @param {Facade} track
*/

RetentionScience.prototype.page = function(page) {
  this.setDefaults(page.track());
  window._rsq.push(['_track']);
};



// /**
//  * Add To Cart.
//  */

// RetentionScience.prototype.addToCart = function(track) {
//   var self = this;
//   var matches = this.events(track.event());
//   var props = track.properties();
//   each(function(track){}
// };





// /**
//  * Checkout Success.
//  */

// RetentionScience.prototype.checkoutSuccess = function(track) {
//   var self = this;
//   var matches = this.events(track.event());
// };


/**
 * Track event.
 */

RetentionScience.prototype.track = function(track) {
  this.setDefaults(track);
  window._rsq.push(['_setAction', track.event()]);
  window._rsq.push(['_setParams', track.properties()]);
  window._rsq.push(['_track']);
};


