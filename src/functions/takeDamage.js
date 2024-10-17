// Método para aplicar daño
export function takeDamage(
  scene,
  atributosPlayer1,
  AtributosPlayer2,
  evadeChance,
  playerHp,
  isShelded
) {
  if (isShelded) {
    console.log("Damage prevented: Player is immune.");
    return false;
  }

  // Implementa la lógica de evadeChance
  const evadeRoll = Phaser.Math.Between(0, 100);
  if (evadeRoll < evadeChance) {
    console.log("Attack evaded!");
    return false;
  }

  let damage = atributosPlayer1.getDamage();
  let critical = atributosPlayer1.getCritical();

  console.log("DAMAGE -->" + damage);
  console.log("CRITICAL -->" + critical);

  if (critical > 0) {
    const criticalChance = Phaser.Math.Between(0, 100);
    if (criticalChance < critical) {
      damage += damage;
      scene.visualCritical()
    }
  }

  console.log("player -->" + AtributosPlayer2);
  AtributosPlayer2.removeAttributes({ hitPoints: damage });
  playerHp = AtributosPlayer2.getHitPoints();
  console.log(`Jugador 2 HP después del daño: ${playerHp}`);

  // Verificar si el jugador ha perdido
  if (playerHp < 1) {
    scene.gameOver(AtributosPlayer2);
  }
  return true;
}
