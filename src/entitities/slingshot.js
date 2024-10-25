export class SlingShot {
  constructor(scene, x, y, isPlayerOne) {
    this.scene = scene;
    this.x = x;
    this.y = y;
   
    this.nameSprite = isPlayerOne ? "TirachinasRoja" : "TirachinasAzul";

    // Crear el sprite del slingshot
    this.slingshot = this.scene.add.sprite(this.x, this.y, this.nameSprite);
    this.slingshot.setOrigin(0.5, 1); 
    this.slingshot.setDepth(10)
  }
}
