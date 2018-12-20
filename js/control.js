window.addEventListener ("keyup", keyUp, false);
window.addEventListener ("keydown", keyDown, false);

var   up      =  38,
      down    =  40,
      right   =  39,
      left    =  37,
      space   =  32,
      goRight =  false,
      goLeft  =  false,
      goDown  =  false,
      jump    =  false,
      fire    =  false;

function keyUp(evt) {
  switch (evt.keyCode) {
    case up:
      jump = false;
    break;

    case right:
      goRight = false;
    break;

    case left:
      goLeft = false;
    break;

    case down:
      goDown = false;
    break;

    case space:
      evt.preventDefault();
      fire = false;
    break;
  }
}

function keyDown(evt) {
  switch (evt.keyCode) {
    case up:
      jump = true;
    break;

    case right:
      goRight = true;
    break;

    case left:
      goLeft = true;
    break;

    case down:
      goDown = true;
    break;

    case space:
      //evt.preventDefault();
      fire = true;
    break;
  }
}
