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
        this.range = 80;
        break;
      case 1:
        this.setTexture("tilesheet", 250);
        this.range = 80;
        break;
      case 2:
        this.setTexture("tilesheet", 204);
        this.range = 80;
        break;
      case 3:
        this.setTexture("tilesheet", 205);
        this.range = 80;
        break;
    }
    scene.add.circle(this.x, this.y, this.range, 0xffff00, 0.2);
  }

  delete() {
    this.destroy();
    this.isDestroyed = true;
  }

  update() {}
}
