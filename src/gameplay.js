class Gameplay extends Phaser.Scene {
  constructor() {
    super("gameplay");
    this.gameStarted = false;
    this.maxTank = [4, 8, 12];
    this.pathsX = [];
    this.pathsX[1] = [1, 1, 8, 8, 16, 16, 19];

    this.pathsY = [];
    this.pathsY[1] = [0, 5, 5, 2, 2, 8, 8];

    console.log(this.pathsX[1][0]);
    console.log(this.pathsY[1][0]);
  }

  spawnTank(pX, pY, pType) {
    var tank = new Tank(this, pX, pY, pType);
    this.listTanks.push(tank);
    return tank;
  }

  startLevel(pLevel) {
    this.clearLevelSelection();

    if (pLevel === 1) {
      this.currentLevel = 1;
      this.map = this.add.image(0, 0, "level1");
      this.map.setOrigin(0, 0);
      this.gameStarted = true;
      this.listTanks = [];
      /*for (var i = 0; i < this.maxTank[1]; i++) {
        var tankType = 1;
        if (Math.random() > 0.5) {
          tankType = 1;
        } else {
          tankType = 2;
        }
        this.spawnTank(50 * (i + 1), 100, tankType);
      }*/
      this.spawnTank(
        this.pathsX[1][0] * 32 + 16,
        this.pathsY[1][0] * 32 + 16,
        1
      );
    }
  }

  clearLevelSelection() {
    this.titleSelection.visible = false;
    this.level1Btn.visible = false;
    this.level1Btn.text.visible = false;
    this.level2Btn.visible = false;
    this.level2Btn.text.visible = false;
    this.level3Btn.visible = false;
    this.level3Btn.text.visible = false;
  }

  onClick(pointer, gameObject) {
    if (
      isOverlaping(
        pointer.x,
        pointer.y,
        1,
        1,
        this.level1Btn.x,
        this.level1Btn.y,
        this.level1Btn.width,
        this.level1Btn.height
      )
    ) {
      this.startLevel(1);
    }
  }

  create() {
    this.titleSelection = this.add.text(0, 20, "Level Selection", {
      fontSize: 25,
      fixedWidth: config.width,
      align: "center",
    });

    this.level1Btn = addButton(
      this,
      7 * 32,
      3 * 32,
      "Niveau 1",
      25,
      "button02"
    );

    this.level2Btn = addButton(
      this,
      7 * 32,
      5 * 32 + 10,
      "Niveau 2",
      25,
      "button02"
    );

    this.level3Btn = addButton(
      this,
      7 * 32,
      7 * 32 + 20,
      "Niveau 3",
      25,
      "button02"
    );

    this.input.on("gameobjectdown", this.onClick, this);
    this.startLevel(1);
  }

  update() {
    for (var i = 0; i < this.listTanks.length; i++) {
      var tank = this.listTanks[i];
      tank.update();
      if (tank.delete) {
        this.listTanks.splice(i, 1);
      }
    }
    console.log("Tanks " + this.listTanks.length);
  }
}
