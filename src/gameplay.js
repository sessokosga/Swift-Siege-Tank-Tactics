class Gameplay extends Phaser.Scene {
  constructor() {
    super("gameplay");
    this.gameStarted = false;
    this.nearBy = 4;

    /** Bullet configs */
    this.listBullets = [];

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
    this.tankShootDelay = [1000, 1500, 2000];
    this.tankSpeed = [0.5, 2, 3];

    this.pathsY = [];
    this.pathsY[0] = [];
    this.pathsY[0][1] = [0, 5, 5, 2, 2, 8, 8];
    this.pathsY[0][2] = [11, 11, 9, 9, 10, 10, 9, 8, 8];

    this.tankObjectiveX = [19];
    this.tankObjectiveY = [8];
    this.tankSpawnDelay = 3000;

    /**  Tower configs */
    this.listTowers = [];

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

  /** Bullet functions */

  shoot(pX, pY, pVx, pVy, pAngle, pType, pTarget) {
    var bullet = new Bullet(this, pX, pY, pVx, pVy, pAngle, pType, pTarget);
    this.listBullets.push(bullet);
  }

  updateBullets() {
    for (var b = this.listBullets.length - 1; b >= 0; b--) {
      /**@type Bullet */
      var bullet = this.listBullets[b];

      if (bullet.target === "tower") {
        for (var t = 0; t < this.listTowers.length; t++) {
          /**@type Tower */
          var tower = this.listTowers[t];
          if (
            isOverlaping(
              tower.x,
              tower.y,
              tower.width / 2,
              tower.height / 2,
              bullet.x,
              bullet.y,
              bullet.width / 2,
              bullet.height / 2
            )
          ) {
            bullet.destroy();
            tower.hurt(1);
          }
        }
      } else if (bullet.target === "tank") {
        for (var t = 0; t < this.listTanks.length; t++) {
          /**@typ Tank */
          var tank = this.listTanks[t];
          if (
            isOverlaping(
              tank.x,
              tank.y,
              tank.width / 2,
              tank.height / 2,
              bullet.x,
              bullet.y,
              bullet.width / 2,
              bullet.height / 2
            )
          ) {
            bullet.destroy();
            tank.hurt(1);
          }
        }
      }

      bullet.update();

      if (bullet.isDestroyed) {
        this.listBullets.splice(b, 1);
      }
    }
  }

  /**Tower functions */

  spawnTower(pX, pY, pType, pPosID) {
    var tow = new Tower(this, pX, pY, pType);
    tow.posID = pPosID;
    this.listTowers.push(tow);
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

  updateTowers() {
    // Look for tanks to shoot at
    for (var t = this.listTowers.length - 1; t >= 0; t--) {
      var tower = this.listTowers[t];
      for (var i = 0; i < this.listTanks.length; i++) {
        var tank = this.listTanks[i];
        if (processDistance(tower.x, tower.y, tank.x, tank.y) < tower.range) {
          var angle = processAngle(tower.x, tower.y, tank.x, tank.y);
          var vx = 10 * Math.cos(angle);
          var vy = 10 * Math.sin(angle);
          var ang = angle * (180 / Math.PI);
          tower.angle = ang + 90;

          switch (tower.type) {
            case 0:
              this.shoot(
                tower.x + 15 * Math.cos(angle),
                tower.y + 15 * Math.sin(angle),
                vx,
                vy,
                ang + 90,
                2,
                "tank"
              );
              break;
            case 1:
              this.shoot(
                tower.x + 15 * Math.cos(angle),
                tower.y + 15 * Math.sin(angle),
                vx,
                vy,
                ang + 90,
                3,
                "tank"
              );
              break;
          }

          break;
        } else {
          tower.angle = 0;
        }
      }

      if (tower.isDestroyed) {
        this.listDefPositions[tower.posID].occupied = false;
        this.listTowers.splice(t, 1);
      }
    }
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

  updateTanks() {
    for (var i = this.listTanks.length - 1; i >= 0; i--) {
      /** @type  Tank */
      var tank = this.listTanks[i];
      var dist = config.width * 5;
      var targetX = -1;
      var targetY = -1;

      // Look for the nearest tower to shoot at
      for (var t = 0; t < this.listTowers.length; t++) {
        var tower = this.listTowers[t];
        var curDist = processDistance(tower.x, tower.y, tank.x, tank.y);
        if (curDist <= tank.range) {
          if (dist > curDist) {
            dist = curDist;
            targetX = tower.x;
            targetY = tower.y;
          }
        }
      }
      // Shoot at the nearest tower found
      if (targetX > 0 && targetY > 0) {
        var angle = processAngle(tank.x, tank.y, targetX, targetY);
        var vx = 10 * Math.cos(angle);
        var vy = 10 * Math.sin(angle);
        var ang = angle * (180 / Math.PI);
        tank.turret.angle = ang;
        this.shoot(
          tank.turret.x + 20 * Math.cos(angle),
          tank.turret.y + 20 * Math.sin(angle),
          vx,
          vy,
          ang + 90,
          0,
          "tower"
        );
      } else {
        tank.turret.angle = tank.angle;
      }

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

      // Remove destroyed tanks from the tank list
      if (tank.isDestroyed) {
        this.listTanks.splice(i, 1);
      }
    }
  }

  /** Functions to start level */

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
          ) &&
          pos.occupied === false
        ) {
          this.spawnTower(pos.x, pos.y, tow.type, j);
          tow.x = tow.initX;
          tow.y = tow.initY;
          pos.occupied = true;
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

  update() {
    if (this.gameStarted) {
      this.updateTanks();
      this.updateTowers();
      this.updateBullets();
    }
  }
}
