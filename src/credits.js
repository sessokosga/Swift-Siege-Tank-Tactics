class Credits extends Phaser.Scene {
  constructor() {
    super("credits");
  }

  onClick(pointer, gameObject) {
    if (gameObject === this.backBtn) {
      this.scene.start("home");
    }
  }

  create() {
    this.add.text(0, 20, "Crédits", {
      fontSize: 35,
      fixedWidth: config.width,
      align: "center",
    });

    this.backBtn = addButton(this, 7 * 32, 9 * 32, "Retour", 25, "button02");
    this.input.on("gameobjectdown", this.onClick, this);
    var text = "Images, Polices, Audio : " + "\n\nKenney.nl";
    this.add.text(0, 100, text, { fixedWidth: config.width, align: "center" });
  }
}
