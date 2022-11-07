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
    this.timerToDie = 0;
    this.timerToDieIsEnabled = false;
    this.nextPoint = 1;
    this.reachedObjective = false;
    scene.add.existing(this);
    switch (pType) {
      case 0:
        this.setTexture("tilesheet", 268);
        this.turret = scene.add.sprite(pX, pY, "tilesheet", 291);
        this.range = 90;
        this.life = 7;
        break;
      case 1:
        this.setTexture("tilesheet", 269);
        this.turret = scene.add.sprite(pX, pY, "tilesheet", 292);
        this.range = 100;
        this.life = 10;
        break;
    }
    this.text = scene.add.text(pX, pY + 32, this.life);
    this.circle = scene.add.circle(this.x, this.y, this.range, 0xffffff, 0.2);

    this.turret.vx = 0;
    this.turret.vy = 0;
  }

  delete(pAnimate = true) {
    this.turret.destroy();
    this.text.destroy();
    this.circle.destroy();
    this.isDestroyed = true;
    if (this.reachedObjective === false && pAnimate === true) {
      this.scene.sfxExplosion1.play();
      this.scene.addToResources(this.scene.resourceMap[this.type]);
      switch (this.type) {
        case 0:
          this.play("explosion3");
          break;
        case 1:
          this.play("explosion1");
          break;
      }
    } else {
      this.destroy();
    }
  }

  hurt(pX) {
    this.life -= pX;
    if (this.life >= 0) {
      this.text.text = this.life;
    }
    if (this.life <= 0) {
      this.delete();
    }
  }

  update() {
    this.x += this.vx;
    this.turret.x = this.x;
    this.text.x = this.x;
    this.circle.x = this.x;

    this.y += this.vy;
    this.text.y = this.y;
    this.turret.y = this.y;
    this.circle.y = this.y;

    if (
      this.x > config.width + config.tileSize ||
      this.y > config.height + +config.tileSize
    ) {
      this.delete();
    }
  }
}
