class Credits extends Phaser.Scene {
  constructor() {
    super("credits");
  }

  onClick(pointer, gameObject) {
    if (gameObject === this.backBtn) {
      this.scene.start("home");
      this.sound.play("click");
    }
  }

  create() {
    this.add.text(0, 50, "Crédits", {
      fontSize: 35,
      fixedWidth: config.width,
      align: "center",
    });

    this.backBtn = addButton(
      this,
      8 * 32,
      9 * 32,
      "Retour",
      18,
      "button02",
      0.7
    );
    this.input.on("gameobjectdown", this.onClick, this);
    var text =
      "Images : Kenney.nl" +
      "\n\nMusique d'arrière plan : Raphaël Marcon" +
      "\n\nSFX : Gamecodeur Pack";
    this.add.text(0, 150, text, { fixedWidth: config.width, align: "center" });
  }
}
