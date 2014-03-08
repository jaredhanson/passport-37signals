/**
 * `APIError` error.
 *
 * @constructor
 * @param {String} [message]
 * @api public
 */
function APIError(message) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'APIError';
  this.message = message;
  this.status = 500;
}

/**
 * Inherit from `Error`.
 */
APIError.prototype.__proto__ = Error.prototype;


/**
 * Expose `APIError`.
 */
module.exports = APIError;
