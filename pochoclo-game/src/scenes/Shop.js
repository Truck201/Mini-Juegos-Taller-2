import { Scene } from "phaser";
import { ItemsCase } from "../entitities/itemscase";

export class Shop extends Scene {
  constructor() {
    super("Shop");
    this.itemsCase = null;
  }

  init(data) {
    this.cameras.main.fadeIn(1400, 0, 0, 0);
  }

  create() {

    this.itemsCase = new ItemsCase(this, this.scale.width, this.scale.height);

    //this.add.rectangle(this.width / 2, this.height / 2, 840, 500, 0x272736)
  }

  update() {
    if (this.itemsCase) {
      this.itemsCase.update();
    }
  }
}
