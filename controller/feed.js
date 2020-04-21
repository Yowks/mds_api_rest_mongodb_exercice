const mongoose = require('../controller/db')

const PostModel = require('../model/post')
let Post = mongoose.model('Post', PostModel);

exports.getAllPosts = (req, res, next) => {
  try {
    Post.find({}, function(err, posts) {
          res.status(200).json(
              { 
                posts, 
              }
          )
      });
      
  } catch (err) {
      res.status(500).json({ error: { status: 500, message: "Internal Server Error",} })
  }
};

exports.getPost = (req, res, next) => {
  try {
    Post.findById(req.params.id).then(post => {
        if(post){
            res.status(200).json(
                { 
                  post,
                }
            )
        }else{
            res.status(400).json(
                { 
                    error: {
                        status: 400,
                        message: "invalid id",
                    } 
                }
            )
        }
    }).catch(err => {
        res.status(400).json(
            { 
                error: {
                    status: 400,
                    message: "invalid id",
                } 
            }
        ) 
    });
  } catch (err) {
      res.status(500).json({ error: { status: 500, message: "Internal Server Error",} })
  }
};

exports.createPost = (req, res, next) => {
  try {
    let post = new Post();
    post.name = req.body.name;
    post.status = req.body.status;

    post.save().then(post => {
        res.status(200).json(
            { 
              post, 
            }
        )
    }).catch(err => {
        res.status(400).json(
            { 
                error: {
                    status: 400,
                    message: "error",
                } 
            }
        ) 
    })
  } catch {
      res.status(500).json({ error: { status: 500, message: "Internal Server Error",} })
  }
};

exports.updatePost = (req, res, next) => {
  try {
    if(req.body.name && req.body.status){
      Post.findByIdAndUpdate(req.params.id, {name: req.body.name, status: req.body.status}, { "new": true}).then(post => {
        res.status(200).json(
            { 
              post 
            }
        )
      }).catch(err => {
          res.status(400).json(
              { 
                  error: {
                      status: 400,
                      message: "invalid id",
                  } 
              }
          ) 
      });
    }else{
      res.status(400).json(
        { 
            error: {
                status: 400,
                message: "invalid argument",
            } 
        }
    )
    }
    
  } catch {
      res.status(500).json({ error: { status: 500, message: "Internal Server Error",} })
  }
};

exports.deletePost = (req, res, next) => {
  try {
    Post.findByIdAndDelete(req.params.id).then(post => {
        res.status(200).json(
            { 
                success: {
                    status: 200,
                    message: "successfully deleted",
                }
            }
        )
    }).catch(err => {
        res.status(400).json(
            { 
                error: {
                    status: 400,
                    message: "invalid id",
                } 
            }
        ) 
    });
  } catch {
      res.status(500).json({ error: { status: 500, message: "Internal Server Error",} })
  }
};