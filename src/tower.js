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
    this.isDestroyed = false;
    this.timer = 0;
    this.mode = "normal";
    this.base = scene.add.sprite(this.x, this.y, "tilesheet", 181);
    this.base.setScale(1.3, 1.3);
    scene.add.existing(this);
    switch (pType) {
      case 0:
        this.setTexture("tilesheet", 249);
        this.life = 10; //0;
        this.range = 90;
        break;
      case 1:
        this.setTexture("tilesheet", 250);
        this.life = 15;
        this.range = 120;
        break;
    }
    this.text = scene.add.text(pX - 14, pY + 20, this.life);
    // this.circle = scene.add.circle(this.x, this.y, this.range, 0xffff00, 0.2);
  }

  delete(pAnimate = true) {
    if (pAnimate == true) {
      this.scene.sfxExplosion2.play();
      this.scene.costHealth(this.scene.healthCostOnTowerDestroyed);
      switch (this.type) {
        case 0:
          this.play("explosion3");
          break;
        case 1:
          this.play("explosion1");
          break;
      }
    }
    this.text.destroy();
    this.base.destroy();
    // this.circle.destroy();
    this.isDestroyed = true;
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

  update() {}
}
