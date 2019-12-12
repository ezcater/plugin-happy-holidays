class Particle {
  velocity: { x: number; y: number };
  lifeSpan: number;
  element: HTMLElement;
  position: { x: number; y: number };

  initialStyles = {
    position: 'absolute',
    display: 'block',
    pointerEvents: 'none',
    'z-index': '10000000',
    fontSize: '16px',
    'will-change': 'transform'
  };

  constructor(x: number, y: number, character: string) {
    this.velocity = {
      x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2),
      y: 1 + Math.random()
    };

    this.lifeSpan = 120 + Math.floor(Math.random() * 60); //ms

    this.position = { x: x - 20, y: y - 20 };

    this.element = document.createElement('span');
    this.element.innerHTML = character;
    this.applyProperties(this.element, this.initialStyles);
    this.update();

    document.body.appendChild(this.element);
  }

  update() {
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    this.velocity.x += ((Math.random() < 0.5 ? -1 : 1) * 2) / 75;
    this.velocity.y -= Math.random() / 400;

    this.lifeSpan--;

    this.element.style.transform =
      'translate3d(' +
      this.position.x +
      'px,' +
      this.position.y +
      'px,0) scale(' +
      this.lifeSpan / 180 +
      ') rotate(' +
      2 * this.lifeSpan +
      'deg)';
  }

  applyProperties(
    target: HTMLElement,
    properties: { [property: string]: string | number }
  ) {
    for (var key in properties) {
      target.style[key] = properties[key];
    }
  }

  die() {
    this.element.parentNode.removeChild(this.element);
  }
}

export default Particle;
