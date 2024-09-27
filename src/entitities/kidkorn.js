export class KidKorn {
    constructor(scene) {
      this.scene = scene;
  
      this.y = (this.scene.scale.height * 4.3) / 5;
      this.x = this.scene.scale.width / 2;
  
      this.attackBar = this.scene.add.rectangle(this.x, this.y, 50, 90, 0xbbbbbb);
    }
  
    update() {
      
    }
  }