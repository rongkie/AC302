var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});
var score = 0;
var life = 3;

function preload(){
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}


function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	
	// Create the sky
	game.add.sprite(0, 0, 'sky');
	// Create group of platforms
	platforms = game.add.physicsGroup();
	platforms.enableBody = true;
	// Create the ground
	var ground = platforms.create(0, 550, 'ground');
	//scales the platform width x2 and height x2
	ground.scale.setTo(2, 2);
	ground.body.immovable = true;
	// Create the ledges
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	// width of the ledge will be smaller.
	// image in assets is 400 pixels wide (width)
	ledge = platforms.create(-100, 250, 'ground');
	ledge.body.immovable = true;

	//set text style
	var style = {font: "bold 32px Arial", fill: "#fff"}
	//positioning the score
	scorelabel = game.add.text(300,560, "Score: ", style);
	scoretext = game.add.text(420, 560, score,style);
	scorelabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
	scoretext.setShadow(3,3,'rgba(0,0,0,0.5)',2);

	//positioning the lives
	lifelabel = game.add.text(10,5, "Lives: ", style);
	lifetext = game.add.text(120,5, life,style);
	lifelabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
	lifetext.setShadow(3,3,'rgba(0,0,0,0.5)',2);

	// Lesson 8

	// Creating the player sprite
	// starting coordinates x, ys
	// game.add.sprite(x, y, image asset key)
	player = game.add.sprite(32, 400, 'dude');
	// animations for moving the player left and right
	// animations.add(name of animation, [frames for animation], frames per sec, loop)
	player.animations.add('left', [0, 1, 2, 3], 10, true);
	player.animations.add('right', [5, 6, 7, 8], 10, true);
	// enable physics
	game.physics.arcade.enable(player);
	// now that physics is enabled, add, verticle bounce, vertical gravity and bounded within the screen
	// only y as we focus on vertical movement
	player.body.bounce.y = 0.2;
	player.body.gravity.y = 300;
	// this allows the player to collide with other sprites
	player.body.collideWorldBounds = true;

	// Create enemy sprite
	// add sprite
	enemyOne = game.add.sprite(760, 20, 'baddie');
	// add the animations (frames of animations start from 0)
	enemyOne.animations.add('left', [0,1], 10, true);
	enemyOne.animations.add('right', [2,3], 10, true);
	// enable physics
	game.physics.arcade.enable(enemyOne);
	enemyOne.body.bounce.y = 0.2;
	enemyOne.body.gravity.y = 500;

	// Create stars
	stars = game.add.physicsGroup();
	// enables interactions with other objects (e.g. player)
	stars.enableBody = true;
	// We shall create 12 stars evenly spaced
	for(var i = 0; i < 12; i++) {
		// even spaced, 70 pixels apart
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y = 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	}

	// Create keyboard entries (movement)
	cursors = game.input.keyboard.createCursorKeys();

}

function update(){
	// using the physics property, we set the collision between the platform and the sprites
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(stars, platforms);
	game.physics.arcade.collide(enemyOne, platforms);
}
