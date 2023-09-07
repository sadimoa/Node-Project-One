// Initialize express app
import express from "express";
import { find, findById, insert, update, remove} from "./users/model.js";
import bodyParser from "body-parser";
const app = express();
app.use(bodyParser.json())


// GET ALL USERS5
app.get("/api/users", async (req, res) => {
  const users = await find();
  res.json(users);
});

// GET USER BY ID
app.get("/api/users/:id", async (req, res) => {
  const user = await findById(req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ status: 404, message: "User not found" });
  }
});

// CREATE A NEW USER
app.post("/api/users/add", async (req, res) => {
  const  newUser = await insert(req.body)

    if(newUser){
        res.json(newUser)
    }
    else{
        res.status(400).json({status: 400, message: 'user was not created'})
    }
})

// UPDATE A USER
app.put("/api/users/update/:id", async (req, res) => {
    const  updatedUser = await update(req.params.id, req.body)
  
      if(updatedUser){
          res.json(updatedUser)
      }
      else{
          res.status(400).json({status: 400, message: 'user was not found'})
      }
  })
  

// DELETE A USER
app.delete("/api/users/delete/:id", async (req, res) => {
const deletedUser = await remove(req.params.id)

if(deletedUser){
res.json({status: 200, message: `user  with id ${req.params.id} deleted succefully`})
}

else{
    res.status(404).json({status: 404, message: 'use was not deleted'})
}
})


// export default app
export default app;
