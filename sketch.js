//Create variables here
var dog,happyDog,database,foods,foodStock;
function preload(){
  //load images here
   dogImage = loadImage("Dog.png");
   happyDogImage = loadImage("happydog.png");
}
; 
function setup() {
  createCanvas(500, 500);
  database=firebase.database();

  dog = createSprite(250,300);
  dog.addImage(dogImage);
  dog.scale=0.15

  foodStock=database.ref('Food'); 
  foodStock.on("value",readStock);
}

function draw() {  
background(46,139,87);

drawSprites();
textSize(20);
fill(255,255,254); 
stroke("black");
text("Food remaining : "+foods,170,200);
text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

//add styles here
if(keyWentDown(UP_ARROW)){
writeStock(foods);
dog.addImage(happyDogImage);
 }
}
function readStock(data){
foods=data.val();
}

function writeStock(x){
if(x<=0){
x=0;
}else{
x=x-1
}
database.ref('/').update({
Food:x
  })
}