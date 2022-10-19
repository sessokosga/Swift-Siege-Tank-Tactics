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
  }

  onClick(pointer, gameObject) {
    if (gameObject === this.startBtn) {
      this.scene.start("gameplay");
    } else if (gameObject === this.creditsBtn) {
      this.scene.start("credits");
    }
  }

  create() {
    this.add.text(0, 20, "Gamecodeur Gamejam #37", {
      fontSize: 35,
      fixedWidth: config.width,
      align: "center",
    });

    this.startBtn = addButton(this, 7 * 32, 7 * 32, "Jouer", 25, "button02");
    this.input.on("gameobjectdown", this.onClick, this);

    this.creditsBtn = addButton(
      this,
      7 * 32,
      9 * 32,
      "Crédits",
      25,
      "button02"
    );
  }
}
