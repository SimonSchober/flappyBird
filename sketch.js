var flappy, flappy_fly
var background_img
var ground, ground_base
var p1, p2, p3, p4, p5, p6
var n0, n1, n2, n3, n4, n5, n6, n7, n8, n9
var base
var PLAY = 1
var END = 0
var gamestate = PLAY
var pipesGroup 
var gameOver, gameOver_Img
var reset, reset_Img


function preload() {
    flappy_fly = loadAnimation("sprites/yellowbird-downflap.png", "sprites/yellowbird-midflap.png", "sprites/yellowbird-upflap.png")
    background_img = loadImage("sprites/background-night.png")
    ground_base = loadImage("sprites/base.png")
    p1 = loadImage("sprites/pipe-green.png")
    p2 = loadImage("sprites/pipe-green1.png")
    p3 = loadImage("sprites/pipe-green1Up.png")
    p4 = loadImage("sprites/pipe-green2.png")
    p5 = loadImage("sprites/pipe-green2Up.png")
    p6 = loadImage("sprites/pipe-greenUp.png")

    n0 = loadImage("sprites/0.png")
    n1 = loadImage("sprites/1.png")
    n2 = loadImage("sprites/2.png")
    n3 = loadImage("sprites/3.png")
    n4 = loadImage("sprites/4.png")
    n5 = loadImage("sprites/5.png")
    n6 = loadImage("sprites/6.png")
    n7 = loadImage("sprites/7.png")
    n8 = loadImage("sprites/8.png")
    n9 = loadImage("sprites/9.png")

    gameOver_Img = loadImage("sprites/gameover.png")
    reset_Img = loadImage("sprites/restart.png")
}


function setup() {
    createCanvas(600, 800)
    flappy = createSprite(330, 400)
    flappy.addAnimation("flying", flappy_fly)
    flappy.scale = 1.5
    base = createSprite(-20, 800)
    base.addImage(ground_base)
    base.scale = 0.5
    base.velocityX = -8
    ground = createSprite(10, 800)
    ground.addImage(ground_base)
    //ground.x = ground.width / 2
    ground.scale = 0.5
    ground.velocityX = -8
    pipesGroup = new Group()
    reset = createSprite(400, 500)
    gameOver = createSprite(400, 400)
    gameOver.addImage(gameOver_Img)
    reset.addImage(reset_Img)
}

function draw() {
    background(background_img)
    if (gamestate === PLAY){
        if (ground.x < -300) {
            ground.x = ground.width / 2
        }

        reset.visible = false
        gameOver.visible = false

        //Flappy gravity
    flappy.velocityY = flappy.velocityY + 0.5
    
        if(base.x < -50) {
            base.x = base.width / 2
        }

        //Flappy flies in the Air
        if (keyDown("space")) {
            flappy.velocityY = -8
        }

        if(flappy.isTouching(pipesGroup)){
            gamestate = END
        }
      
        spawnPipes()
    }else if(gamestate === END) {
      base.velocityX = 0
      ground.velocityX = 0
      flappy.velocityY = 0
      pipesGroup.setVelocityXEach(0)
      gameOver.visible = true
      reset.visible = true
      pipesGroup.setDepthEach(0) 
       
    }

    
    


    drawSprites()
}

function spawnPipes() {
    if (frameCount % 120 === 0) {
        var pipeUp = createSprite(650, 150)
        var pipeDown = createSprite(650, 650)
        pipeDown.velocityX = -3
        pipeUp.velocityX = -3
        pipeUp.scale = 1.4
        pipeDown.scale = 1.3
        ground.depth = pipeDown.depth +1
        pipesGroup.add(pipeDown)
        pipesGroup.add(pipeUp)
        
        var rand = Math.round(random(1, 3))

        switch (rand) {
            case 1: pipeUp.addImage(p3)
            pipeDown.addImage(p4)
            break;
            case 2: pipeUp.addImage(p6)
            pipeDown.addImage(p2)
            break;
            case 3: pipeUp.addImage(p5)
            pipeDown.addImage(p1)
            break;

        }
    }
}




