var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var assert = require("assert");
var opts = {
  password: ""
};

module.exports = function(pwd){
	opts.password = pwd;
	return new Promise(function(resolve,reject){
		hasher(opts, function(err, pass, salt, hash) {
			  // opts.salt = salt;
			  // opts.hash = hash;
			  console.log(opts);
			  resolve({
			  	status: 1,
			  	password:pass,
			  	password_salt: salt,
			  	password_hash: hash,
			  });
		});
	});
}