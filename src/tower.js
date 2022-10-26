class Tower extends Phaser.GameObjects.Sprite {
  /**
   *
   * @param {Phaser.Scene} scene
   * @param {Number} pX
   * @param {Number} pY
   * @param {String} pType
   */
  constructor(scene, pX, pY, pType) {
    super(scene, pX, pY, "tank");
    this.type = pType;

    scene.add.existing(this);
    switch (pType) {
      case 0:
        this.setTexture("tilesheet", 249);
        break;
      case 1:
        this.setTexture("tilesheet", 250);
        break;
      case 2:
        this.setTexture("tilesheet", 204);
        break;
      case 3:
        this.setTexture("tilesheet", 205);
        break;
    }
  }

  delete() {
    this.destroy();
    this.isDestroyed = true;
  }

  update() {}
}
