import Phaser from 'phaser';

export default class WebFontFile extends Phaser.Loader.File {
  constructor(loader, fontName) {
    super(loader, {
      type: 'webfont',
      key: fontName,
    });
    this.fontName = fontName;
  }

  load() {
    const font = new FontFace(this.fontName, `url(assets/fonts/${this.fontName}.ttf)`);
    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      this.loader.nextFile(this, true);
    }).catch((error) => {
      this.loader.nextFile(this, false);
    });
  }
}