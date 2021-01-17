//Create variables here
var dog,happyDog,dogImg,happyDogImg;
var database;
var foodS,foodStock;

function preload()
{
  //load images here
  dogImg=loadImage("images/Dog.png");
  happyDogImg=loadImage("images/happydog.png");

}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  
  dog=createSprite(200,200,10,10);
  dog.addImage(dogImg);
  dog.scale=0.1;

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background("cyan");

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  //add styles here

  fill(255,255,254);
  stroke("black");
  text("Food remaining : "+foodS,170,200);
  textSize(13);
  text("Note: Press UP_ARROW Key To Feed Drago Milk!",130,10,300,20);

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 

  database.ref('/').update({
    Food:x
  })
}


