class Home extends Phaser.Scene {
  constructor() {
    super("home");
  }

  preload() {
    this.load.spritesheet(
      "tilesheet",
      "assets/images/spritesheet/towerDefense_tilesheet.png",
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet(
      "explosion1",
      "assets/images/animations/explosion1.png",
      { frameWidth: 32, frameHeight: 32 }
    );
    this.load.spritesheet(
      "explosion2",
      "assets/images/animations/explosion2.png",
      { frameWidth: 32, frameHeight: 32 }
    );

    this.load.spritesheet(
      "explosion3",
      "assets/images/animations/explosion3.png",
      { frameWidth: 64, frameHeight: 64 }
    );

    this.load.image("button02", "assets/images/ui/green_button02.png");
    this.load.image("button00", "assets/images/ui/green_button00.png");
    this.load.image("level1", "assets/images/map/level1.png");
    this.load.image("level2", "assets/images/map/level2.png");
    this.load.image("level3", "assets/images/map/level3.png");

    this.load.audio("click", "assets/sfx/click2.ogg");
    this.load.audio("explosion1", "assets/sfx/Explosion.mp3");
    this.load.audio("explosion2", "assets/sfx/ShipExplosion.mp3");
    this.load.audio("shoot", "assets/sfx/shoot.mp3");
    this.load.audio("victory", "assets/sfx/victory.mp3");
  }

  onClick(pointer, gameObject) {
    if (gameObject === this.startBtn) {
      this.sound.play("click");
      this.scene.start("gameplay");
    } else if (gameObject === this.creditsBtn) {
      this.sound.play("click");
      this.scene.start("credits");
    }
  }

  onPointerOver(pointer, gameObject) {
    if (
      isOverlaping(
        pointer.x,
        pointer.y,
        1,
        1,
        this.startBtn.x,
        this.startBtn.y,
        this.startBtn.width,
        this.startBtn.height
      )
    ) {
      this.startBtn.setTexture("button00");
    }
    if (
      isOverlaping(
        pointer.x,
        pointer.y,
        1,
        1,
        this.creditsBtn.x,
        this.creditsBtn.y,
        this.creditsBtn.width,
        this.creditsBtn.height
      )
    ) {
      this.creditsBtn.setTexture("button00");
    }
  }
  onPointerOut(pointer, gameObject) {
    this.startBtn.setTexture("button02");
    this.creditsBtn.setTexture("button02");
  }
  create() {
    startTime = getTime();
    this.add.text(0, 40, "Swift Siege: Tank Tactics", {
      fontSize: 35,
      fixedWidth: config.width,
      align: "center",
    });

    this.add.text(0, 80, "Swift Siege: Tank Tactics", {
      fontSize: 22,
      fixedWidth: config.width,
      align: "center",
    });

    this.startBtn = addButton(this, 7 * 32, 7 * 32, "Jouer", 25, "button02");
    this.creditsBtn = addButton(
      this,
      7 * 32,
      9 * 32,
      "Crédits",
      25,
      "button02"
    );

    // Mouse events
    this.input.on("gameobjectdown", this.onClick, this);
    this.input.on("pointerover", this.onPointerOver, this);
    this.input.on("pointerout", this.onPointerOut, this);

    // Animations
    this.anims.create({
      key: "explosion1",
      frames: this.anims.generateFrameNumbers("explosion1"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "explosion2",
      frames: this.anims.generateFrameNumbers("explosion2"),
      frameRate: 200,
      repeat: 0,
      hideOnComplete: true,
    });

    this.anims.create({
      key: "explosion3",
      frames: this.anims.generateFrameNumbers("explosion3"),
      frameRate: 60,
      repeat: 0,
      hideOnComplete: true,
    });
  }

  update() {}
}
