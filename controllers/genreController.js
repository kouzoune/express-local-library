const Genre = require("../models/genre");
const asyncHandler = require("express-async-handler");
const {body, validationResult} = require("express-validator");
const genre = require("../models/genre");

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {

  const allGenres = await Genre.find().sort({}).exec();
  res.render("genre_List", { title : "Genre List", genre_list:allGenres,})
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
  res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
});

// Display Genre create form on GET.
exports.genre_create_get = asyncHandler(async (req, res, next) => {
    res.render("genre_form", {title:" Create Genre"});
});

// Handle Genre create on POST.
exports.genre_create_post = [
  //Validate and sanitize the name field

  body("name","Genre name must contain at leat 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),

    //Process request qfter vqlidqtion and sanitization 
    asyncHandler(async(req, res, next)=>{

      //Extract the validation  errors from th request

      const errors = validationResult(req);

      //create a genre object  with escaped and trimmed data

      const genre = new Genre({name: req.body.name});
      if(!errors.isEmpty()){
        //there ar errors. Render the form again wih sanitizes values/ errors

        res.render("genre_form", {
            title: "Create genre", 
            genre: genre,
            errors: errors.array(),
        });
        return ;
      }
      else{
        //Data form is valid 
        //Check if Genre with the same name already exists
        
        const genreExists = await Genre.findOne({name: req.body.name})
        .collation({locale: "en", strength:2})
        .exec();

        if(genreExists){
          //Genre exists, redirect to its detail page. 

          res.render(genreExists.url);
        }
        else{
          await genre.save();

          //New genre saved. Redirect to genre detail 
          res.redirect(genre.url)
        }
      }
    
    }),
  
];

// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete GET");
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre delete POST");
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update GET");
});

// Handle Genre update on POST.
exports.genre_update_post = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Genre update POST");
});