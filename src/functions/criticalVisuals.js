export function criticalVisual(scene) {
  this.scene = scene
  const { width, height } = this.scene.game.scale;
  const criticalText = this.scene.add
    .text(width * 0.5, height * 0.5, "¡¡CRITIAL!!", {
      fontSize: "32px",
      color: "#fff",
      fontFamily: "'Press Start 2P'",
      fontWeight: "bold",
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 3,
        offsetY: 3,
      },
    })
    .setOrigin(0.5)
    .setDepth(15);

  this.scene.tweens.add({
    targets: criticalText,
    scale: { from: 2.1, to: 4.2 }, // Agrandar el texto
    alpha: { from: 1, to: 0 }, // Desaparecer el texto
    duration: 1500, // Duración de la animación (1 segundo)
    ease: "Power2",
    onComplete: () => {
      criticalText.destroy(); // Eliminar el texto después de la animación
    },
  });
}
