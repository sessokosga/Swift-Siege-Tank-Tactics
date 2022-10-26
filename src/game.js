var config = {
  width: 640,
  height: 448,
  tileSize: 32,
  pixelArt: true,
  scene: [Home, Gameplay, Credits],
  backgroundColor: "#000",
};

var game = new Phaser.Game(config);

function addButton(pScene, pX, pY, pText, pTextSize, pTexture) {
  var btn = pScene.add.image(pX, pY, pTexture);

  btn.setOrigin(0, 0);
  btn.text = pScene.add.text(btn.x, btn.y + 10, pText, {
    fontSize: pTextSize,
    fixedWidth: btn.width,
    align: "center",
  });
  btn.setInteractive();
  return btn;
}

function isOverlaping(x1, y1, w1, h1, x2, y2, w2, h2) {
  return x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1;
}

function processAngle(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

function processDistance(x1, y1, x2, y2) {
  return ((x2 - x1) ** 2 + (y2 - y1) ** 2) ** 0.5;
}

function getCell(pX) {
  return Math.floor((pX - config.tileSize / 2) / config.tileSize);
}
