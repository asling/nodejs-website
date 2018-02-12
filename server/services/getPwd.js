var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();
var opts = {
  password: "",
  salt: "",
};

module.exports = function(pwd,salt){
	opts.password = pwd;
	opts.salt = salt;
	return new Promise(function(resolve,reject){
		hasher(opts, function(err, pass, salt, hash2) {
			resolve({
				status:1,
				hash: hash2,
			});
		  });
		});
}

