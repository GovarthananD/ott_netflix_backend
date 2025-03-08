import express from "express";
import { Movies } from "../models/moviesModel.js";
import {isAuthenticated} from "./authorization.js";



const router = express.Router();

router.post("/addMovie", async (req, res) => {
    try{
        let newMovie = new Movies(req.body);
        newMovie.save()
        .then((data) => {res.status(200).send({ message: "Movie Added Successfully", data });})
        .catch((error) => {
            res
              .status(400)
              .send({ message: "Something error while adding Movies", error});
          });
    }catch(error){
        res.status(400).send({message:"Internal Server Error"});
    }
});

router.get("/allMovies",  (req, res) => {
    try{
        Movies.find()
        .then((data) => {
            res
            .status(200)
            .send({ message: "Movies has been retrieved", data });
        })
        .catch((error) => {
          res.status(400).send({ message: "Something Error while retrieving",error });
        });
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

router.get("/top10",  (req, res) => {
    try{
        Movies.find({top:"top10"})
        .then((topMovies) => {
            res
            .status(200)
            .send({ message: "Movies has been retrieved", data:topMovies });
        })
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

router.get("/tvShow", (req, res) => {
    try{
        Movies.find({tv:"tvshow"})
        .then((tvdata) => {
            res.status(200).send({ message: "Movies has been retrieved", tvdata });
        })
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

router.get("/usMovies", (req, res) => {
    try{
        Movies.find({movies:"US"})
        .then((usMovies) => {
            res.status(200).send({ message: "Movies has been retrieved", usMovies });
        })
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

router.get("/romance", (req, res) => {
    try{
        Movies.find({movies:"romance"})
        .then((romance) => {
            res.status(200).send({ message: "Movies has been retrieved", romance });
        })
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

router.get("/europe", (req, res) => {
    try{
        Movies.find({industry:"Europe"})
        .then((europe) => {
            res.status(200).send({ message: "Movies has been retrieved", europe });
        })
    }catch(error){
        res.status(500).send({message:"Internal Server Error"});
    }
});

router.get("/search", async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
          return res.status(400).json({ message: "Search query is required" });
        }

        const movies = await Movies.find({
            title: { $regex: query, $options: "i" }, // Case-insensitive search
          });      
          res.json(movies);
    } catch (error) {
      res.status(500).json({ message: "Server Error", error });
    }
  });

router.get("/:id", async (req, res) => {
    try{
        const movie = await Movies.findById(req.params.id);
        if(!movie){
            return res.status(404).send({ message: "Movie not found" });
        }
        res.status(200).send({message:""})
    }catch(error){
        res.status(500).send({ message: "Server error" });
    }
})





export const moviesRoute = router;