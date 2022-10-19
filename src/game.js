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
