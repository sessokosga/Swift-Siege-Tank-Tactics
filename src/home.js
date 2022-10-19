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

    this.load.image("button02", "assets/images/ui/green_button02.png");
    this.load.image("button00", "assets/images/ui/green_button00.png");
  }

  onClick(pointer, gameObject) {
    if (gameObject === this.startBtn) {
      this.scene.start("gameplay");
    } else if (gameObject === this.creditsBtn) {
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
    this.scene.start("gameplay");
    this.add.text(0, 20, "Gamecodeur Gamejam #37", {
      fontSize: 35,
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
  }

  update() {}
}
