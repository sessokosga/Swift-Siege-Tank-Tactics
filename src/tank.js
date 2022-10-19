class Tank extends Phaser.GameObjects.Sprite {
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
    this.vx = 0;
    this.vy = 0;
    this.nextPoint = 1;
    this.reachedObjective = false;

    scene.add.existing(this);
    switch (pType) {
      case 1:
        this.setTexture("tilesheet", 268);
        this.turret = scene.add.sprite(pX, pY, "tilesheet", 291);
        break;
      case 2:
        this.setTexture("tilesheet", 269);
        this.turret = scene.add.sprite(pX, pY, "tilesheet", 292);
        break;
      case 3:
        this.setTexture("tilesheet", 270);
        this.turret = scene.add.sprite(pX + 10, pY + 30, "tilesheet", 293);
        break;
      case 4:
        this.setTexture("tilesheet", 271);
        this.turret = scene.add.sprite(pX + 10, pY + 30, "tilesheet", 294);
        break;
    }

    this.turret.vx = 0;
    this.turret.vy = 0;
  }

  delete() {
    this.turret.destroy();
    this.destroy();
    this.isDestroyed = true;
  }

  update() {
    this.x += this.vx;
    this.turret.x = this.x;
    this.y += this.vy;
    this.turret.y = this.y;

    if (this.x > config.width + 32 || this.y > config.height + 32) {
      this.delete();
    }
  }
}
