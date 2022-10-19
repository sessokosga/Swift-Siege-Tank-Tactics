var config = {
  width: 640,
  height: 384,
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
