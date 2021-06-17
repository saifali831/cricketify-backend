const {postCont} = require('../controllers');
const {signupHelpers} = require('../middlewares');
const parser = require('../config/cloudinary.config');
module.exports = function(app){
    app.use(function(res,req,next){
        res.header(
            "Access-Control-Allow-Headers",
        );
        next();
    })
    
    app.post('/api/post/create',[postCont.createPost]);
    app.get('/api/post/get',[postCont.getAllPosts])
    app.post('/api/post/comment/create',[postCont.createComment])
    app.get('/api/post/get/:id',[postCont.getPostsByUser])
    app.get('/api/post/search',[postCont.getSearchedPosts])
}