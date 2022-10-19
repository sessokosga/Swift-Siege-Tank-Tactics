class Tank extends Phaser.GameObjects.Sprite {
  constructor(scene, pX, pY, pType) {
    super(scene, pX, pY, "tank");
    this.type = pType;

    scene.add.existing(this);
    switch (pType) {
      case 1:
        this.turret = scene.add.sprite(pX, pY, "tilesheet", 291);
        this.setTexture("tilesheet", 268);
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }

  update() {
    this.x += 1;
    this.turret.x += 1;

    if (this.x > config.width + 32 || this.y > config.height + 32) {
      this.delete = true;
    }
  }
}
