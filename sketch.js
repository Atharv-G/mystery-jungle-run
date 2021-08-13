var pillar1,pillar1Img,pillarGroup
var runboy,runboyImg,runboydie,runboydieImg
var background1,backgroundImg
var invisibleGround
var arrows,arrowsImg,arrowGroup
var zombie1,zombie2,zombie3,zombie1Group,zombie2Group,zombie3Group
var zombie1Img,zombie2Img,zombie3Img
var score
var backgroundSound
var gameState = "PLAY"

function preload(){
    pillar1Img = loadImage("pillar_1.png");
    backgroundImg = loadImage("bg.png");
    arrowsImg = loadImage("arrow0.png");
    zombie1Group = new Group();
    zombie2Group = new Group();
    zombie3Group = new Group();
    pillarGroup = new Group();
    arrowGroup = new Group();
    zombie3Img = loadAnimation("cloneclone01.png","cloneclone02.png","cloneclone03.png","cloneclone04.png","cloneclone05.png","cloneclone06.png","cloneclone07.png","cloneclone08.png","cloneclone09.png","cloneclone10.png","cloneclone11.png","cloneclone12.png","cloneclone13.png","cloneclone14.png","cloneclone15.png","cloneclone16.png")
    zombie1Img = loadAnimation("sprite_10.png","sprite_01.png","sprite_02.png","sprite_03.png","sprite_04.png","sprite_05.png","sprite_06.png")
    zombie2Img = loadAnimation("zom1.png","zom2.png","zom3.png","zom4.png","zom5.png","zom6.png")
    runboyImg = loadAnimation("sprite_11.png","sprite_12.png","sprite_13.png","sprite_14.png","sprite_15.png","sprite_16.png","sprite_17.png")
}
function setup(){
    createCanvas(windowWidth,windowHeight);

    score = 0

    background1 = createSprite(0,400);
    background1.addImage(backgroundImg)
    background1.scale = 2
    background1.velocityX = -5

    runboy = createSprite(65,height-150)
    runboy.addAnimation("running",runboyImg)
    runboy.scale=0.5
    runboy.setCollider("circle",0,0,50)

    invisibleGround = createSprite(height,width/2,width,300)
    invisibleGround.visible = false

    runboy.debug = true;

}

function draw() {
    background("brown")
    
    fill("white")
    textSize(30)
    text("Score "+score,150,30)
    textSize(20)
    text("press space to jump infinitly and right arrow to shoot arrows to kill zombies",300,20)

    if (gameState == "PLAY") {
        if (runboy.isTouching(pillarGroup) || runboy.isTouching(zombie1Group) || runboy.isTouching(zombie2Group) || runboy.isTouching(zombie3Group)) {
            gameState = "END"
        }
    
        if (frameCount % 35 === 0) {
            score = score + 1
        }
    
        if (background1.x < 0) {
            background1.x = background1.width/1.5
        }
    
        if(keyDown("SPACE")) {
            runboy.velocityY = -10;
        }
    
        arrowGroup.collide(pillarGroup);
    
        if (arrowGroup.isTouching(zombie1Group)) {
            arrowGroup.destroyEach();
            zombie1Group.destroyEach();
            score = score + 10
        }
    
        if (arrowGroup.isTouching(zombie2Group)) {
            arrowGroup.destroyEach();
            zombie2Group.destroyEach();
            score = score + 10
        }

        if (arrowGroup.isTouching(zombie3Group)) {
            arrowGroup.destroyEach();
            zombie3Group.destroyEach();
            score = score + 10
        }

        runboy.velocityY = runboy.velocityY + 0.8
    
        runboy.collide(invisibleGround);
    
        spawnZombie1();
        spawnZombie2();
        spawnZombie3();
        spawnArrows();
        spawnPillars();
    }
    else if (gameState == "END") {
        end();
    }

    
    drawSprites();
}

function spawnPillars() {
    var rand = Math.round(random(height-200,height-110))
    if (frameCount % 307 === 0) {
        pillar1 = createSprite(1500,rand)  
        pillar1.addAnimation("pillar",pillar1Img)
        pillar1.scale = 3
        pillar1.velocityX = -10
        pillar1.lifetime = 150
        pillarGroup.add(pillar1);
        pillar1.setCollider("rectangle",10,15)
    }
}

function spawnArrows() {
    if (keyDown("right_arrow")) {
        arrows = createSprite(runboy.x,runboy.y)
        arrows.addImage(arrowsImg)
        arrows.velocityX = 15
        arrows.scale=0.5
        arrows.lifetime = 100
        arrowGroup.add(arrows);
        arrows.setCollider("circle",0,0,40)
    }
}

function spawnZombie1() {
    var rand1 = Math.round(random(400,150))
    if (frameCount % 400 === 0) {   
        zombie1 = createSprite(1500,rand1)
        zombie1.addAnimation("zomzom",zombie1Img)
        zombie1.scale = 0.5
        zombie1.velocityX = -15
        zombie1.lifetime = 100
        zombie1Group.add(zombie1);
        zombie1.setCollider("circle",0,0,100)
    }
}

function spawnZombie2() {
    if (frameCount % 600 === 0) {   
        zombie2 = createSprite(1500,height-150)
        zombie2.addAnimation("zomzom1",zombie2Img);
        zombie2.velocityX = -15
        zombie2.scale = 2
        zombie2.lifetime = 100
        zombie2Group.add(zombie2);
        zombie2.setCollider("circle",0,0,100)
    }
}

function spawnZombie3() {
    var rand2 = Math.round(random(400,65))
    if (frameCount % 1000 === 0) {   
        zombie3 = createSprite(1500,rand2)
        zombie3.addAnimation("zomzom2",zombie3Img)
        zombie3.scale = 0.5
        zombie3.velocityX = -15
        zombie3.lifetime = 100
        zombie3Group.add(zombie3);
        zombie3.setCollider("circle",0,0,100)
    }
}

function end() {
    score += 0
    runboy.destroy();
    background1.velocityX=0
    pillarGroup.setVelocityXEach(0);
    zombie1Group.setVelocityXEach(0);
    zombie2Group.setVelocityXEach(0);
    arrowGroup.setVelocityXEach(0);
    pillarGroup.setLifetimeEach(-1);
    zombie1Group.setLifetimeEach(-1);
    zombie2Group.setLifetimeEach(-1);
    zombie3Group.setLifetimeEach(-1);
    arrowGroup.setLifetimeEach(-1);
    fill("blue")
    text("GAME_OVER",width/2,40)

}

