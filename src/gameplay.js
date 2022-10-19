class Gameplay extends Phaser.Scene {
  constructor() {
    super("gameplay");
    this.gameStarted = false;
    this.maxTank = [4, 8, 12];
    this.nearBy = 4;
    this.pathsX = [];
    this.pathsX[1] = [1, 1, 8, 8, 16, 16, 19];

    this.pathsY = [];
    this.pathsY[1] = [0, 5, 5, 2, 2, 8, 8];

    this.tankObjectiveX = [19];
    this.tankObjectiveY = [8];
    this.tankSpawnDelay = 3000;
  }

  spawnTank(pX, pY, pType) {
    var tank = new Tank(this, pX, pY, pType);
    this.listTanks.push(tank);
    return tank;
  }

  startNextWave() {
    if (this.listTanks.length < this.maxTank[this.currentLevel - 1]) {
      this.spawnTank(
        this.pathsX[1][0] * config.tileSize + config.tileSize / 2,
        this.pathsY[1][0] * config.tileSize + config.tileSize / 2,
        1
      );
    } else {
      clearInterval(this.spawnTimerID);
    }
  }

  startLevel(pLevel) {
    this.clearLevelSelection();

    if (pLevel === 1) {
      this.currentLevel = 1;
      this.map = this.add.image(0, 0, "level1");
      this.map.setOrigin(0, 0);
      this.gameStarted = true;
      this.listTanks = [];

      this.spawnTimerID = setInterval(
        () => this.startNextWave(),
        this.tankSpawnDelay
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
      7 * config.tileSize,
      3 * config.tileSize,
      "Niveau 1",
      25,
      "button02"
    );

    this.level2Btn = addButton(
      this,
      7 * config.tileSize,
      5 * config.tileSize + 10,
      "Niveau 2",
      25,
      "button02"
    );

    this.level3Btn = addButton(
      this,
      7 * config.tileSize,
      7 * config.tileSize + 20,
      "Niveau 3",
      25,
      "button02"
    );

    this.input.on("gameobjectdown", this.onClick, this);
    this.startLevel(1);
  }

  updateTanks() {
    for (var i = 0; i < this.listTanks.length; i++) {
      /** @type  Tank */
      var tank = this.listTanks[i];
      // Got the next waypoint
      var nextX =
        this.pathsX[this.currentLevel][tank.nextPoint] * config.tileSize +
        config.tileSize / 2;
      var nextY =
        this.pathsY[this.currentLevel][tank.nextPoint] * config.tileSize +
        config.tileSize / 2;
      var dist = processDistance(tank.x, tank.y, nextX, nextY);
      var angle = processAngle(tank.x, tank.y, nextX, nextY);

      // Check if the next waypoint is far enought for the tank to move to it
      if (dist > this.nearBy) {
        // Set the tank rotation angle if its the very first waypoint
        var targetDeg = angle * (180 / Math.PI);
        if (tank.nextPoint === 1) tank.angle = targetDeg;
        else {
          if (tank.angle < targetDeg) tank.angle += 3;
          else if (tank.angle > targetDeg) tank.angle -= 3;
          if (Math.abs(tank.angle - targetDeg) < 5) tank.angle = targetDeg;
        }

        // Set the tank velocity in order to reach the waypoint
        // if (Math.abs(tank.angle - targetDeg) < 20) {
        tank.vx = 1 * Math.cos(angle);
        tank.vy = 1 * Math.sin(angle);
        // }
      } else {
        // Stop the tank when it reached a waypoint
        tank.vx = 0;
        tank.vy = 0;

        if (isNaN(nextX) === false && isNaN(nextX) === false) {
          tank.x = nextX;
          tank.y = nextY;
        }

        // Update the next waypoint
        if (tank.nextPoint < this.pathsX[this.currentLevel].length)
          tank.nextPoint++;

        // Check if the tank reached the objective
        if (
          getCell(tank.x) === this.tankObjectiveX[this.currentLevel - 1] &&
          getCell(tank.y) === this.tankObjectiveY[this.currentLevel - 1]
        ) {
          console.log("Objective reached");
          tank.reachedObjective = true;
          tank.delete();
        }

        if (tank.isDestroyed) {
          this.listTanks.splice(i, 1);
        }
      }

      tank.update();
    }
    //console.log("Tanks " + this.listTanks.length);
  }

  update() {
    this.updateTanks();

    console.log(this.listTanks.length);
  }
}
