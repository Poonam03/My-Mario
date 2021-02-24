var mario,mario_standingImg,mario_runningImg,ground,groundImg,bg,bgImg,coin,coinImg
var enemy,enemyImg,mushroom,mushroomImg,obstacle,obstacleImg,enemyKill,brickImg
var totalCoins = 0
var enemyGroup,enemyKillGroup
var distance=0
function preload(){
  mario_standingImg=loadAnimation("mario00.png")
  mario_runningImg=loadAnimation("mario01.png","mario00.png","mario03.png")
  groundImg=loadImage("ground2.png")
  bg=loadImage("bg.png")
  finalbg=loadImage("bg1.png")

  enemyImg=loadImage("enemy.png")
  brickImg=loadImage("brick.png")
  coinImg=loadImage("coin.png")


}

function setup(){
  createCanvas(windowWidth,windowHeight)
  mario=createSprite(0,height-125,20,20)
  mario.addAnimation("standing",mario_standingImg)
  mario.addAnimation("running",mario_runningImg)
  ground=createSprite(0,height-125,width*4,20)
  ground.visible=false
  distance++
   // camera.position.x=0
 // brick1=createSprite()
 text(distance,200,200)

  enemyGroup=createGroup()
  enemyKillGroup=createGroup()
  for(var i=0;i<width*8;i=i+500){
    brick1=createSprite(i,height-200,20,20)
    brick1.addImage(brickImg)
    brickImg.scale=0.1
  }
  coin=new Coin(brick1.x,brick1.y,20,20)
}

function draw(){
  background(bg)
  brick1.display()
  camera.position.x=mario.x+890
  ground.x=mario.x
  text(mouseX,200,200)
  //mario.debug=true
  //enemy.debug=true
  
  if(keyDown(UP_ARROW)&&mario.y>=725){
    mario.velocityY=mario.velocityY-10
  }
  mario.velocityY=mario.velocityY+0.5
debugger;
  if(keyDown(RIGHT_ARROW)){
    mario.x=mario.x+5
    mario.changeAnimation("running",mario_runningImg)
    
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }

  if(keyDown(LEFT_ARROW)){
    mario.changeAnimation("running",mario_runningImg)
    mario.x=mario.x-5
  }else{
    mario.changeAnimation("standing",mario_standingImg)
  }

  if(enemyKillGroup.isTouching(mario)){
    
    enemyGroup.destroyEach()
  }
  if(enemyGroup.isTouching(mario))
    mario.visible=false
  }
  if(mario.y===brick1.y&&mario.x===brick1.x){
    coin.display();
    brick1.destroy()
  }
  if(mario.y===coin.y&&mario.x===coin.x){
    totalCoins=totalCoins+1
    coin.destroy()
  }
  
  mario.collide(ground)
  mario.collide(brick1)
  mario.setCollider("rectangle",0,3,20,25)
  
  drawSprites()
  text("Coins: "+totalCoins,camera.position.x-180,10)
  //console.log(mouseY)
  spawnEnemies()
  
}
function spawnEnemies(){
  if(frameCount%Math.round(random(400,600))===0){
  enemy=createSprite(width,height-135,20,20)
  //enemy.velocityX=-1
  enemy.addImage(enemyImg)
  enemy.scale=0.2
  enemyKill=createSprite(enemy.x,enemy.y-35,20,5)
  enemyKill.visible=false
  enemy.setCollider("rectangle",-10,-50,100,100)
  enemy.lifetime=width
  enemyKill.lifetime=width
  enemyKill.velocityX=-1
  enemyGroup.add(enemy)
  enemyKillGroup.add(enemyKill)

  }
}
