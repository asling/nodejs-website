const db = require("../db");
const getPwd = require("./getPwd");
module.exports = {
	authenticate: function(username, password, done){
		console.log("username",username);
		console.log("password",password);
		db.query(' select "id","name","password_salt","password_hash" from si_user where "name" = $1',[escape(username)]).then(result => {
				const users = result.rows || [];
			console.log("users",users);
			if (!users || users.length !== 1) { return done(null, false); }
			const { password_salt, password_hash } = users[0];
			getPwd(password,password_salt).then( result => {
				console.log("password_hash",password_hash);
				console.log("result",result);

			    if(!result.hash) return done(null,false);
			    if(result.hash !== password_hash) return done(null,false);
			    return done(null, users[0]); 
			} );
		},(err) => {
			if (err) { return done(err); }
		});
	},

	serializeUser:function(user,done){
		done(null, user.id);
	},

	deserializeUser:function(id,cb){
		db.query(' select "name" from si_user where "id" = $1',[escape(id)]).then(result => {
			const users = result.rows || [];
			if (!users || users.length !== 1) { return cb(false); }
			cb(null, users[0]);
		},(err) => {
			if (err) { return cb(err); }
		});
	}
}

