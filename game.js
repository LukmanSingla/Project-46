class Game {
  constructor() {}
  getState() {
    database.ref("gamestate").on("value", (data) => {
      gameState = data.val();
    });
  }
  updateState() {
    database.ref("/").update({
      gamestate: gameState,
    });
  }
  start() {
    if (gameState == 0 || gameState == null) {
      form = new Form();
      form.display();
    }
    s1 = createSprite(100, 50, 100, 100);
    s1.addImage("s1", sa1);
    s1.scale = 0.3;
    s1.rotation = 135;

    s2 = createSprite(width - 60, 50, 100, 100);
    s2.addImage("s2", sa2);
    s2.scale = 0.3;
    s2.rotation = -135;

    s3 = createSprite(width - 60, height - 180, 100, 100);
    s3.addImage("s3", sa3);
    s3.scale = 0.3;
    s3.rotation = -45;

    s4 = createSprite(50, height - 180, 100, 100);
    s4.addImage("s4", sa4);
    s4.scale = 0.3;
    s4.rotation = 45;
    h1 = createSprite(width - 150, 50, 200, 25);
    h2 = createSprite(width - 150, 100, 200, 25);
    h3 = createSprite(width - 150, 150, 200, 25);
    h4 = createSprite(width - 150, 200, 200, 25);
    ha = [h1, h2, h3, h4];
    background(bgImg1);
    sa = [s1, s2, s3, s4];
  }
  wait() {
    if (gameState == 1) {
      if (playerCount == 4) {
        gameState = 2;
      }
      background(bgImg1);
    }
  }
  play() {
    if (gameState == 2) {
      background(bgImg2);
      Player.playerInfo();
      drawSprites();
      form.wait.hide();
      form.load.hide();
      form.shoot.position(200, 30);
      slider.style.visibility = "visible";
      // fill("transparent");
      // rect(width - 200, 20, 150, 20);
      var index = 0;
      for (var i in allPlayers) {
        index++;
        sa[index - 1].x = x[index - 1];
        sa[index - 1].y = y[index - 1];
        fill("none");
        text(allPlayers[i].name, width - 330, index * 50);
        ha[index - 1].width = allPlayers[i].hp;
        ha[index - 1].x = width - 50 - ha[index - 1].width / 2;
        if (player.index == index) {
          if (ha[index - 1].width <= 0) {
            // code for game completion
          }
          if (keyDown("UP_ARROW")) {
            y[index - 1] -= 10;
          }
          if (keyDown("LEFT_ARROW")) {
            x[index - 1] -= 10;
          }
          if (keyDown("DOWN_ARROW")) {
            y[index - 1] += 10;
          }
          if (keyDown("RIGHT_ARROW")) {
            x[index - 1] += 10;
          }
          player.x = x[index - 1];
          player.y = y[index - 1];

          //to rotate the spacecraft
          var angle =
            (Math.atan2(player.y - mouseY, player.x - mouseX) * 180) / Math.PI -
            90;
          push();
          translate(player.x, player.y);
          rotate(angle);
          pop();
          player.rotation = angle;

          //bullet creation
          var direction = createVector(
            player.x - mouseX,
            player.y - mouseY
          ).normalize();
          if (mouseWentDown("left")) {
            bullet = createSprite(player.x, player.y, 5, 5);
            bullet.velocityX = -direction.x * 10;
            bullet.velocityY = -direction.y * 10;
            bullet.addImage(bulletImg);
            bullet.scale = 0.1;
            player.updateBullets();
          }

          player.newPlayer();
        }
        if (bullet != undefined) {
          if (bullet.isTouching(sa[index - 1]) && player.index != index) {
            ha[index - 1].width -= 20;
            player.hp = ha[index - 1].width;
            player.newPlayer();
          }
        }
        x[index - 1] = allPlayers[i].x;
        y[index - 1] = allPlayers[i].y;
        sa[index - 1].rotation = allPlayers[i].rotation;
      }
      drawSprites();
    }
  }
}
