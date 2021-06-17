const {rankingCont} = require('../controllers');
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
        );
        next();
    })
    
    app.post('/api/ranking/add',[rankingCont.addRanking]);
    app.get('/api/ranking/get/:format',[rankingCont.getRanking])
    
}