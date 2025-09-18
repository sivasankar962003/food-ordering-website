import express, { response } from "express";
import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser";
import cors from "cors";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import session from "express-session";
import cloudinary from "./cloudinary.js";




const app = express();
env.config();
app.use(cors({
    origin:['http://localhost:3000'],
    methods:["POST","GET","DELETE"],
    credentials:true
    
}));





app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({limit:"10mb"}))
app.use(session({
secret:"secret",
resave:false,
saveUninitialized:false,
cookie:{
    maxAge:1000*60*60
}

}))
app.use(cookieParser());




const clients = new pg.Pool({
  
  connectionString: `postgresql://neondb_owner:${process.env.PASSWORD}@${process.env.HOST}/neondb?sslmode=require&channel_binding=require`,
  ssl:{
    require:true,
  },
});


 const db=await clients.connect();

app.post("/categories", async (req, res) => {
  try {
    var { limit } = req.body;
     
    var response = await db.query(
      "SELECT * FROM categories  WHERE active='Yes' and  feature='Yes' LIMIT $1",[limit]
   
    );
  res.json(response.rows);

   
  } catch (error) {
    res.json({ data: { error: "page cannot load" } });
  }
});


app.post("/food", async (req, res) => {
  try {
   console.log(req.session.username)
    var { limit } = req.body;
    
    var response = await db.query(
      "SELECT * FROM food WHERE active='Yes'  LIMIT $1",
      [limit]
    );

    res.json(response.rows);
  } catch (error) {
    res.json({ data: { error: "page cannot load" } });
  }
});


app.get("/order/:id", async (req, res) => {
  var id = req.params.id;
  if(req.session.username){

  try {
  
    var response = await db.query("SELECT * FROM food WHERE food_id=$1 ", [id]);

    res.json({valid:true,data:response.rows});
  } catch (error) {
    res.json({ data: { error: "page cannot load" } });
  }
}
else{
res.json({valid:false})
}
});


app.post("/addcart", async (req, res) => {
  try {
    var {food_id, title, image, price, value, total, status } = req.body;

    await db.query(
      "insert into cart (title,image_name,food_price,quantity,total_price,status,customer_id,food_id) values($1,$2,$3,$4,$5,$6,$7,$8)",
      [title, image, price, value, total, status,req.session.username, food_id]
    );
    res.json({ message: "Food added on cart" });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

app.get("/cart", async (req, res) => {
   try{
    if(req.session.username){
      
  var response = await db.query("select * from cart where customer_id=$1 ", [
    req.session.username
  ]);

  res.json({valid:true,data:response.rows});
}else{
  res.json({valid:false})  
}
  }
catch(error){
res.json({valid:false})
}
});

app.get("/history", async (req, res) => {
 try{
     if(req.session.username){
    
  var response = await db.query("select * from history where customer_id=$1 ", [
   req.session.username
  ]);

  res.json({valid:true,data:response.rows});}
  else{res.json({valid:false})}
}
catch(error){
res.json({valid:false})
}
});


app.post("/login", async (req, res) => {
  var { username, password } = req.body;
  
try{
   
  var response = await db.query("select * from register where customer_id=$1", [
    username,
  ]);
  if(response.rows.length>0){
    if(username==="admin@gmail.com"){

      var result = await bcrypt.compare(password, response.rows[0].customer_password);
    if(result){
   
  res.json({ valid:true,password:true,admin:true  });
  }
  else{
   res.json({ valid:true,password:false,admin:false  });
  }

    }
    else{
  var result = await bcrypt.compare(password, response.rows[0].customer_password);
  if(result){
    req.session.username=username;
    
  res.json({ valid:true,password:true,admin:false  });
  }
  else{
  res.json({ valid:true,password:false,admin:false });  
  }
  }}
  else{
      res.json({ valid:false,password:false,admin:false});
  }
}
catch(error){
    console.log(error);
    res.json({valid:false})
}


});


app.post("/register", async (req, res) => {
  var { name, email, phone, address, password } = req.body;
  var password = await bcrypt.hash(password, 2);
  try {
     
    var response = await db.query(
      "insert into register(customer_id,customer_name,phone,address,customer_password) values($1,$2,$3,$4,$5)",
      [email, name, phone, address, password]
    );

    res.json({ data: true });
  } catch (error) {
    console.log(error);
    res.json({ data: false });
  }
});

app.get("/existorder/:id", async (req, res) => {
  var id = req.params.id;

  var response = await db.query("SELECT * FROM cart WHERE food_id=$1 ", [id]);

  res.json(response.rows);
});

app.post("/confirm", async (req, res) => {
  var { food_id, title, image_name, price, value1, total_amount } = req.body;

  await db.query(
    "insert into history (title,image_name,food_price,quantity,total_price,status,customer_id,food_id) values($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      title,
      image_name,
      price,
      value1,
      total_amount,
      "delivered",
      req.session.username,
      food_id,
    ]
  );
  res.json({ message: "order booked successfully" });
});

app.delete("/cartdelete/:id", async (req, res) => {
  var id = req.params.id;
console.log(id)
  await db.query("delete from  cart  WHERE cart_id=$1 ", [id]);
  res.json({ message: "successfully" });
});

app.delete("/historydelete/:id", async (req, res) => {
  var id = req.params.id;

  await db.query("delete from  history     WHERE history_id=$1 ", [id]);
  res.json({ message: "successfully" });
});

app.get("/foodsearch/:id",async(req,res)=>{
   var id=req.params.id;
  try{
    
     var response = await db.query("SELECT * FROM food WHERE category_id=$1 ", [id]);
  res.json(response.rows);
  }
  catch(error){
    res.json({message:true})
  }

})


app.get("/searchfood/:name",async(req,res)=>{
   var name=req.params.name;
 
  try{
    
     var response = await db.query("SELECT * FROM food");
     var  filters=response.rows.filter((data)=>(data.title.includes(name)));
    
  res.json(filters);
  }
  catch(error){
    res.json({message:true})
  }

})

//admin

app.get("/category",async(req,res)=>{
  try{
     
var select=await db.query("select * from categories  ORDER BY category_id ASC")
res.json(select.rows)
  }
  catch(error){

    res.json({error:error})
  }

})
app.get("/food",async(req,res)=>{
  try{
 
var select=await db.query("select * from food ORDER BY food_id ASC")
res.json(select.rows)
  }
  catch(error){

    res.json({error:error})
  }

})
app.get("/order",async(req,res)=>{
  try{
    
var select=await db.query("select * from history join register on history.customer_id=register.customer_id")

res.json(select.rows)
  }
  catch(error){

    res.json({error:error})
  }

})
// app.post("/addcategory",upload.single("image"),async(req,res)=>{



  app.post("/addcategory",async(req,res)=>{
 var {title,active,featured,imageUrl}=req.body.data;
  const result = await cloudinary.uploader.upload(imageUrl, {
      resource_type: 'image',
    });

  try{
     
   await db.query("insert into categories(title,image_name,feature,active) values($1,$2,$3,$4)",[title,result.secure_url,featured,active])

   res.json({message:"data uploaded successfully"})  


  }
  catch(error){
  
    res.json({message:"data failed to upload"})
  }

})
app.post("/addfood",async(req,res)=>{
  var {title,active,price,category_id,description,calories,protein,fat,carbohydrate,imageUrl}=req.body.data;
   category_id=parseInt(category_id)
  //  calories=parseInt(calories)
  //  protein=parseInt(protein)
  //  fat=parseInt(fat)
  //  carbohydrate=parseInt(carbohydrate)
  const result = await cloudinary.uploader.upload(imageUrl, {
      resource_type: 'image',
    });
  try{
    
   await db.query("insert into food(title,description,price,category_id,image_name,feature,active,calories,protein,fat,carbohydrate) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",[title,description,price,category_id,result.secure_url,"yes",active,calories,protein,fat,carbohydrate])

   res.json({message:"data uploaded successfully"})  


  }
  catch(error){
    console.log(error)
  
    res.json({message:"data failed to upload"})
  }

})

app.get("/category/:id",async(req,res)=>{
  var id=req.params.id;
  try{
    
var select=await db.query("select * from categories where category_id=$1",[id])
 
res.json(select.rows[0])
  }
  catch(error){

    res.json({error:error})
  }

})
app.get("/food/:id",async(req,res)=>{
  var id=req.params.id;
  try{
  
var select=await db.query("select * from food where food_id=$1",[id])
 
res.json(select.rows[0])
  }
  catch(error){

    res.json({error:error})
  }

})
app.post("/updatefood",async(req,res)=>{

   var {title,active,price,category_id,description,calories,protein,fat,carbohydrate,food_id,imageUrl}=req.body.data;
 const isUrl = typeof imageUrl === 'string' && imageUrl.startsWith('https');

if(isUrl){
   try{
   await db.query(" update food set title=$1,description=$2,price=$3,category_id=$4,feature=$5,active=$6,calories=$7,protein=$8,fat=$9,carbohydrate=$10 where food_id=$11 ",[title,description,price,category_id,'Yes',active,calories,protein,fat,carbohydrate,food_id])

   res.json({message:"data uploaded successfully"})  


  }
  catch(error){
  
    res.json({message:"data failed to upload"})
  }
}else{


  try{
      const result = await cloudinary.uploader.upload(imageUrl, {
      resource_type: 'image',
    });
   await db.
   query(" update food set title=$1,description=$2,price=$3,category_id=$4,image_name=$5,feature=$6,active=$7,calories=$8,protein=$9,fat=$10,carbohydrate=$11 where id=$12 ",[title,description,price,category_id,result.secure_url,'Yes',active,calories,protein,fat,carbohydrate,id])

   res.json({message:"data uploaded successfully"})  


  }
  catch(error){
  
    res.json({message:"data failed to upload"})
  }}

})
app.post("/updatecategory",async(req,res)=>{
    var {title,active,feature,category_id,imageUrl}=req.body.data;

  const isUrl = typeof imageUrl === 'string' && imageUrl.startsWith('https');
 
if(isUrl){
   try{
   await db.query(" update categories set title=$1,feature=$2,active=$3 where category_id=$4",[title,feature,active,category_id])

   res.json({message:"data uploaded successfully"}) 
   }
   catch(error){
  
    res.json({message:"data failed to upload"})
  }
}else{
  const result = await cloudinary.uploader.upload(imageUrl, {
      resource_type: 'image',
    });
  try{
    
   await db.query(" update categories set title=$1,image_name=$2,feature=$3,active=$4 where category_id=$5",[title,result.secure_url,feature,active,id])

   res.json({message:"data uploaded successfully"})  


  }
  catch(error){
  
    res.json({message:"data failed to upload"})
  }
}

})
app.delete("/deletecategory/:id",async(req,res)=>{
  var id=req.params.id;
  try{
 
await db.query("DELETE FROM  categories WHERE category_id=$1 ",[id])
 
res.json({message:"deleted successfully"})
  }
  catch(error){

    res.json({message:"sorry this category gave some Food list"})
  }


})
app.delete("/deletefood/:id",async(req,res)=>{
  var id=req.params.id;
  try{
   
await db.query("delete  from food where food_id=$1",[id])
 
res.json({message:"deleted successfully"})
  }
  catch(error){

    res.json({message:error})
  }


})
app.delete("/deleteorder/:id",async(req,res)=>{
 var id=req.params.id;
  try{
    
await db.query("delete  from history where id=$1",[id])
 
res.json({message:"deleted successfully"})
  }
  catch(error){

    res.json({message:error})
  }


})

app.get("/dashboard1",async(req,res)=>{

var customer=await db.query("select count(customer_id) from register")
var category= await db.query("select count(category_id) from categories")
var revenue= await db.query("select sum(total_price) from history")
var orders= await db.query("select count(history_id) from history")

res.json({customer1:customer.rows[0].count,category1:category.rows[0].count,revenue1:revenue.rows[0].sum,orders1:orders.rows[0].count})

})


if(process.env.NODE_ENV!=="production")
{
app.listen(process.env.PORT1, () => {
  console.log("Server run on PORT " + process.env.PORT1);
});
}
export default server;