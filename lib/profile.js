/**
 * Parse profile.
 *
 * @param {Object|String} json
 * @return {Object}
 * @api private
 */
exports.parse = function(json) {
  if ('string' == typeof json) {
    json = JSON.parse(json);
  }
  
  var profile = {};
  profile.id = String(json.identity.id);
  profile.displayName = json.identity.first_name + ' ' + json.identity.last_name;
  profile.name = { familyName: json.identity.last_name,
                   givenName: json.identity.first_name };
  profile.emails = [{ value: json.identity.email_address }];
  
  return profile;
};
