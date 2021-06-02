function auth(req,res,next){
    console.log('authenticatin...');
    next();
}

module.exports = auth