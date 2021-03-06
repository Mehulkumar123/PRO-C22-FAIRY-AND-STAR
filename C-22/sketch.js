var starImg, fairyImg, bgImg;
var fairy, fairyVoice;
var star, starBody,starImageImg;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
    starImg = loadImage("images/star.png");
    fairyImg = loadAnimation("images/fairyImage1.png", "images/fairyImage2.png");
    bgImg = loadImage("images/starNight.png");
    fairyVoice = loadSound("sound/JoyMusic.mp3");
}

function setup() {
    createCanvas(800, 600);

    fairyVoice.play();

    fairy = createSprite(300, 490);
    fairy.addAnimation("fairyflying", fairyImg);
    fairy.scale = 0.2;

    star = createSprite(650, 30);
    star.addImage(starImg);
    star.scale = 0.2;

    engine = Engine.create();
    world = engine.world;

    starBody = Bodies.circle(650, 30, 5, { restitution: 0.5, isStatic: true });
    World.add(world, starBody);

    Engine.run(engine);
}

function draw() {
    fairy.debug = true;
    fairy.setCollider("rectangle", 500, -10, 100, 100);

    Engine.update(engine);

    background(bgImg);
    fairy.velocityX = 0;
    fairy.velocityY = 0;

    if (keyDown(RIGHT_ARROW)) {
    fairy.velocityX = 6;
    } else if (keyDown(LEFT_ARROW)) {
    fairy.velocityX = -6;
    } else if (keyDown(DOWN_ARROW)) {
    star.velocityY = 3;
    }

    if (star.isTouching(fairy)) {
    star.velocityY = 0;
    star.x = fairy.x + 100;
    star.y = fairy.y - 10;
    }

    drawSprites();
}
