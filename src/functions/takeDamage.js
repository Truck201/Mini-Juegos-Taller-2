import { criticalVisual } from "./criticalVisuals";
// Método para aplicar daño
export function takeDamage(
  scene,
  player1,
  player2,
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

  let damage = player1.getDamage();
  let critical = player1.getCritical();

  console.log("DAMAGE -->" + damage);
  console.log("CRITICAL -->" + critical);

  if (critical > 0) {
    const criticalChance = Phaser.Math.Between(0, 100);
    if (criticalChance < critical) {
      damage += damage;
      criticalVisual(scene);
    }
  }

  console.log("player -->" + player2);

  player2.removeAttributes({ hitPoints: damage });
  playerHp = player2.getHitPoints();
  console.log(`Jugador 2 HP después del daño: ${playerHp}`);

  return true;
}
