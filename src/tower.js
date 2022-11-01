class Tower extends Phaser.GameObjects.Sprite {
  /**
   *
   * @param {Phaser.Scene} scene
   * @param {Number} pX
   * @param {Number} pY
   * @param {String} pType
   */
  constructor(scene, pX, pY, pType) {
    super(scene, pX, pY, "tower");
    this.type = pType;

    scene.add.existing(this);
    switch (pType) {
      case 0:
        this.setTexture("tilesheet", 249);
        this.life = 10;
        this.range = 80;
        break;
      case 1:
        this.setTexture("tilesheet", 250);
        this.life = 10;
        this.range = 80;
        break;
      case 2:
        this.setTexture("tilesheet", 204);
        this.life = 10;
        this.range = 80;
        break;
      case 3:
        this.setTexture("tilesheet", 205);
        this.range = 80;
        this.life = 10;
        break;
    }
    this.text = scene.add.text(pX - 14, pY + 20, this.life);

    this.circle = scene.add.circle(this.x, this.y, this.range, 0xffff00, 0.2);
  }

  delete() {
    this.text.destroy();
    this.circle.destroy();
    this.isDestroyed = true;
    this.destroy();
  }

  hurt(pX) {
    this.life -= pX;

    if (this.life <= 0) {
      this.delete();
    }
  }

  update() {}
}
