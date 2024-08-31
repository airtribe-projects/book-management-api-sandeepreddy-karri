const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Book = require("../models/book");


const validateJWT = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, "MY_SECRET_KEY");
  console.log({ decodedToken });
  if (decodedToken.email) {
    req.user = decodedToken;
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

router.use(validateJWT);



router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const book = await Book.findById(id);
  res.send(book);
});

router.post("/", async (req, res) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).send("Forbidden");
  }
  const dbBook = await Book.create(req.body);
  res.send(dbBook);
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const dbBookUpdate = await Book.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(dbBookUpdate);
});

router.delete("/:id", async (req, res) => {
    const query = { id : req.params.id };
    const result = await Book.deleteOne(query);
    if (result.deletedCount === 1) {
        console.log("Successfully deleted one document.");
      } else {
        console.log("No documents matched the query. Deleted 0 documents.");
      }
  });


  router.get("/", async (req, res) => {
    const query = {name : req.query.name}
    if(req.query.name == undefined){
      const allbooks = await Book.find();
      res.send(allbooks);
    }
    else{
      const filterbook = await Book.find(query);
      res.send(filterbook);
    }
    
  });





module.exports = router;