# Pochoclo Games

We are **Pochoclo Games**, and we are studying at the University of Rafaela in Argentina. Our team consists of four members:

- **Gandini, Joaquín**: Programmer & Designer
- **Rosso, Carolina**: Artist & Designer
- **Moreira, Sebastian**: Sound Designer
- **Andereggen, Lucas**: Orchestra & Designer

## Game Proposals

We propose two games: one 1vs1 and one Co-Op.

### 1vs1 Game

In this game, both players compete in three different phases:

1. Gathering
2. Shopping
3. Combat

### Co-Op Game

In cooperative play, players will deliver a certain number of popcorn orders.

Both games are set in a small cinema, featuring a futuristic style with retro elements, all depicted in pixel art.

## Team Philosophy

We are dedicated to:

- Implementing an architecture of Entities and Components in our code.
- Including SOLID principles in our programming.
- Programming sounds and FX, creating documents (GDD, PPTX).

## Scenes

### Preloader

- LanguageChoose
- MainMenu
- PauseMenu
- Versus Scenes
  - PreloaderVersus
  - Game1v1
  - RecolectScene
  - HUD1v1
  - Shop
  - HudShop
  - PreloaderBattle
  - BattleScene
  - GameOver

### Cooperative Scenes

- PreloaderCoop
- GameCoOp
- CoopStarter
- GameCoOp
- HudCoop
- GameOverCoop

## Entities

### Global Entities

- character
- television

### Versus Entities

- attack
- heart
- kidKorn
- monsters
- movebar
- shield
- popcorn

### Coop Entities

- brick
- wall
- bullets
- slingshot

## Color Palette

| Color Code | Color Name |
|------------|------------|
| `#b0305c`  | Crimson    |
| `#ff004d`  | Red        |
| `#4b5bab`  | Skyblue    |
| `#272736`  | Black      |
| `#3ca370`  | Green      |
| `#ffe478`  | Yellow     |
| `#ffffeb`  | White      |
| `#000000`  | Black      |
| `#065ab5`  | Blue       |

## API

### Language Translations
- "TraduciLa" by **Federico Deggiovanni** @fdegiovanni: [TraduciLa API](https://example.com)

### Available Language Codes
- **English**: `en-US`
- **Spanish**: `es-AR`
    
## Installation
```bash 
    git clone https://github.com/Truck201/Mini-Juegos-Taller-2.git
    cd Mini-Juegos-Taller-2
    npm install latest
    npm install vite@latest
    npm run dev