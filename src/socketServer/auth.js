var compose = require("composable-middleware");

function isUserAuthenticated() {
  return (
    compose()
      // Attach user to request
      .use(function (req, res, next) {
            if(req.headers['api-key'] == "38EgllNoNcE6I5fFIeCi"){
                next()
            }else{
                 res.status(404).send({
                   success: false,
                   message: "You are not authorized",
                 });
                
            }
      })
  );
}

exports.isUserAuthenticated = isUserAuthenticated;