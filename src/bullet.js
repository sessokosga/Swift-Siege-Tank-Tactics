class Bullet extends Phaser.GameObjects.Sprite {
  /**
   *
   * @param {Phaser.scene} scene
   * @param {Number} pX
   * @param {Number} pY
   * @param {Number} pVx
   * @param {Number} pVy
   * @param {Number} pAngle
   * @param {String} pType
   * @param {String} pTarget
   */
  constructor(scene, pX, pY, pVx, pVy, pAngle, pType, pTarget) {
    super(scene, pX, pY, "bullet");
    this.type = pType;
    this.vx = pVx;
    this.vy = pVy;
    this.angle = pAngle;
    this.target = pTarget;
    scene.add.existing(this);
    this.isDestroyed = false;
    switch (pType) {
      // Tank bullets
      case 0:
        this.setTexture("tilesheet", 297);
        break;
      case 1:
        this.setTexture("tilesheet", 298);
        break;
      // Tower bullets
      case 2:
        this.setTexture("tilesheet", 295);
        break;
      case 3:
        this.setTexture("tilesheet", 296);
        break;
      // Special bullet
      case 4:
        this.setTexture("tilesheet", 252);
        break;
    }
  }

  delete() {
    this.destroy();
    this.isDestroyed = true;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x > config.width + 32 || this.y > config.height + 32) {
      this.delete();
    }
  }
}
