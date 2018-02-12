const genSalt = require("./genSalt");
genSalt("admin").then(opts => {
	console.log("opts",opts);
})