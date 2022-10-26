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
    this.timer = 0;
    this.nextPoint = 1;
    this.reachedObjective = false;

    scene.add.existing(this);
    switch (pType) {
      case 0:
        this.setTexture("tilesheet", 268);
        this.turret = scene.add.sprite(pX, pY, "tilesheet", 291);
        this.range = 170;
        break;
      case 1:
        this.setTexture("tilesheet", 269);
        this.turret = scene.add.sprite(pX, pY, "tilesheet", 292);
        this.range = 100;
        break;
      case 2:
        this.setTexture("tilesheet", 270);
        this.turret = scene.add.sprite(pX + 10, pY + 30, "tilesheet", 293);
        this.range = 100;
        break;
      case 3:
        this.setTexture("tilesheet", 271);
        this.turret = scene.add.sprite(pX + 10, pY + 30, "tilesheet", 294);
        this.range = 100;
        break;
    }
    this.circle = scene.add.circle(this.x, this.y, this.range, 0xffffff, 0.2);

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
    this.circle.x = this.x;
    this.y += this.vy;
    this.turret.y = this.y;
    this.circle.y = this.y;

    if (this.x > config.width + 32 || this.y > config.height + 32) {
      this.delete();
    }
  }
}
