class Gameplay extends Phaser.Scene {
  constructor() {
    super("gameplay");
    this.gameStarted = false;
    this.nearBy = 4;

    /** Tanks configs */
    this.listTanks = [];
    this.maxTank = [4, 8, 12];
    this.maxWave = [2, 5, 8];
    this.currentWave = 1;
    this.tankDestroyed = 0;
    this.tankspawned = 0;
    this.pathsX = [];
    this.pathsX[0] = [];
    this.pathsX[0][1] = [1, 1, 8, 8, 16, 16, 19];
    this.pathsX[0][2] = [1, 3, 3, 7, 8, 15, 16, 17, 19];

    this.tankSpeed = [1, 2, 3];

    this.pathsY = [];
    this.pathsY[0] = [];
    this.pathsY[0][1] = [0, 5, 5, 2, 2, 8, 8];
    this.pathsY[0][2] = [11, 11, 9, 9, 10, 10, 9, 8, 8];

    this.tankObjectiveX = [19];
    this.tankObjectiveY = [8];
    this.tankSpawnDelay = 1000; //3000;

    /**  Tower configs */
    this.listTower = [];

    // Defensive positions
    this.defPositionsX = [];
    this.defPositionsX[0] = [1, 3, 4, 7, 10, 14, 14, 18, 18];
    this.defPositionsY = [];
    this.defPositionsY[0] = [7, 2, 7, 7, 4, 4, 8, 6, 10];

    this.listDefPositions = [];

    // Available towers
    this.listAvailableTowerTypes = [];
    this.totalTowerType = 2;
    this.towerSprites = [249, 250];
  }

  /**Tower functions */

  spawnTower(pX, pY, pType) {
    var tow = new Tower(this, pX, pY, pType);
    this.listTower.push(tow);
  }
  showAvailableTowerTypes() {
    var x = 200;
    var y = 400;
    for (var i = 0; i < this.totalTowerType; i++) {
      var tow = this.add.sprite(
        x + 64 * i,
        y,
        "tilesheet",
        this.towerSprites[i]
      );
      tow.clicked = false;
      tow.type = i;
      tow.initX = tow.x;
      tow.initY = tow.y;
      tow.setInteractive();
      this.listAvailableTowerTypes.push(tow);
    }
  }

  ShowDefPosition(pX, pY) {
    var pos = this.add.sprite(pX, pY, "tilesheet", 110);
    pos.occupied = false;
    this.listDefPositions.push(pos);
  }

  /** Tank functions */
  spawnTank(pX, pY, pType) {
    var tank = new Tank(this, pX, pY, pType);
    this.listTanks.push(tank);
    this.tankspawned++;
  }

  startNextWave() {
    if (this.tankspawned < this.maxTank[this.currentLevel - 1]) {
      this.spawnTank(
        this.pathsX[this.currentLevel - 1][this.currentWave][0] *
          config.tileSize +
          config.tileSize / 2,
        this.pathsY[this.currentLevel - 1][this.currentWave][0] *
          config.tileSize +
          config.tileSize / 2,
        1
      );
      // if (this.listTanks.length <= 1)
      // console.log("Wave ", this.currentWave, " started");
    } else {
      clearInterval(this.spawnTimerID);
      // console.log("Wave ", this.currentWave, " ended");
    }
  }

  startLevel(pLevel) {
    this.clearLevelSelection();

    if (pLevel === 1) {
      this.currentLevel = 1;
      this.map = this.add.image(0, 0, "level1");
      this.map.setOrigin(0, 0);
      this.gameStarted = true;

      // Init tanks
      this.listTanks = [];
      this.tankspawned = 0;
      this.tankDestroyed = 0;
      this.spawnTimerID = setInterval(() => {
        this.startNextWave();
      }, this.tankSpawnDelay);

      // Init towers
      for (var i = 0; i < this.defPositionsX[pLevel - 1].length; i++) {
        var x =
          this.defPositionsX[pLevel - 1][i] * config.tileSize +
          config.tileSize / 2;
        var y =
          this.defPositionsY[pLevel - 1][i] * config.tileSize +
          config.tileSize / 2;
        this.ShowDefPosition(x, y);
      }
      this.showAvailableTowerTypes();
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

  onPointerDown(pointer, gameObject) {
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

    // Collision with tower icons selection
    for (var i = 0; i < this.listAvailableTowerTypes.length; i++) {
      var tow = this.listAvailableTowerTypes[i];
      if (
        isOverlaping(
          pointer.x,
          pointer.y,
          1,
          1,
          tow.x - config.tileSize / 2,
          tow.y - config.tileSize / 2,
          tow.width,
          tow.height
        )
      ) {
        tow.clicked = true;
      }
    }
  }

  onPointerMove(pointer, gameObject) {
    // Collision with tower icons selection
    for (var i = 0; i < this.listAvailableTowerTypes.length; i++) {
      var tow = this.listAvailableTowerTypes[i];
      if (tow.clicked) {
        tow.x = pointer.x;
        tow.y = pointer.y;
      }
    }
  }

  onPointerUp(pointer, gameObject) {
    // Collision with tower icons selection
    for (var i = 0; i < this.listAvailableTowerTypes.length; i++) {
      var tow = this.listAvailableTowerTypes[i];
      tow.clicked = false;
      // console.log(tow.def);
      for (var j = 0; j < this.listDefPositions.length; j++) {
        var pos = this.listDefPositions[j];
        if (
          isOverlaping(
            pos.x - config.tileSize / 2,
            pos.y - config.tileSize / 2,
            pos.width,
            pos.height,
            tow.x - config.tileSize / 2,
            tow.y - config.tileSize / 2,
            tow.width,
            tow.height
          )
        ) {
          console.log("Over there");
          this.spawnTower(pos.x, pos.y, tow.type);
          tow.x = tow.initX;
          tow.y = tow.initY;
        } else {
          setTimeout(() => {
            for (var i = 0; i < this.listAvailableTowerTypes.length; i++) {
              var tow = this.listAvailableTowerTypes[i];
              tow.x = tow.initX;
              tow.y = tow.initY;
            }
          }, 0);
        }
      }
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

    this.input.on(Phaser.Input.Events.POINTER_DOWN, this.onPointerDown, this);
    this.input.on(Phaser.Input.Events.POINTER_MOVE, this.onPointerMove, this);
    this.input.on(Phaser.Input.Events.POINTER_UP, this.onPointerUp, this);

    this.startLevel(1);
  }

  updateTanks() {
    for (var i = 0; i < this.listTanks.length; i++) {
      /** @type  Tank */
      var tank = this.listTanks[i];
      // Got the next waypoint
      var nextX =
        this.pathsX[this.currentLevel - 1][this.currentWave][tank.nextPoint] *
          config.tileSize +
        config.tileSize / 2;
      var nextY =
        this.pathsY[this.currentLevel - 1][this.currentWave][tank.nextPoint] *
          config.tileSize +
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
        tank.vx = this.tankSpeed[this.currentLevel - 1] * Math.cos(angle);
        tank.vy = this.tankSpeed[this.currentLevel - 1] * Math.sin(angle);
      } else {
        // Stop the tank when it reached a waypoint
        tank.vx = 0;
        tank.vy = 0;

        if (isNaN(nextX) === false && isNaN(nextX) === false) {
          tank.x = nextX;
          tank.y = nextY;
        }

        // Update the next waypoint
        if (
          tank.nextPoint <
          this.pathsX[this.currentLevel - 1][this.currentWave].length
        )
          tank.nextPoint++;

        // Check if the tank reached the objective
        if (
          getCell(tank.x) === this.tankObjectiveX[this.currentLevel - 1] &&
          getCell(tank.y) === this.tankObjectiveY[this.currentLevel - 1]
        ) {
          //console.log("Objective reached");
          tank.reachedObjective = true;
          tank.delete();
          this.tankDestroyed++;
          // console.log(
          //   "Destroyed ",
          //   this.tankDestroyed,
          //   " Max tanks ",
          //   this.maxTank[this.currentLevel - 1]
          // );
        }
        // Remove destroyed tanks from the tank list
        if (tank.isDestroyed) {
          this.listTanks.splice(i, 1);
        }

        // Check if the current wave have ended
        if (this.tankDestroyed === this.maxTank[this.currentLevel - 1]) {
          //console.log("Checking possibility to start next wave");
          // Start the next wave
          if (this.currentWave < this.maxWave[this.currentLevel - 1]) {
            this.currentWave++;
            //console.log("Preparing to start wave ", this.currentWave);
            setTimeout(() => {
              this.tankspawned = 0;
              this.tankDestroyed = 0;
              this.spawnTimerID = setInterval(
                () => this.startNextWave(),
                this.tankSpawnDelay
              );
            }, 1000);
          }
        }
      }
      tank.update();
    }
  }

  update() {
    if (this.gameStarted) {
      this.updateTanks();
      /*  for (var i = 0; i < this.listAvailableTowerTypes.length; i++) {
        var tow = this.listAvailableTowerTypes[i];
        console.log("Tow ", i, ": ", tow.def);
      } */
    }
  }
}
