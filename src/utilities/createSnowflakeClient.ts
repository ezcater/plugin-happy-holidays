/*!
 * SnowFlakes Cursor.js
 * - 90's cursors collection
 * -- https://github.com/tholman/90s-cursor-effects
 * -- https://codepen.io/tholman/full/oYJQZx
 */

import Particle from './Particle';

function createSnowflakeClient() {
  let possibleEmoji = ['❄️'];
  let width;
  let height;
  let cursor;
  let particles: Particle[];

  const initializeStartingValues = () => {
    width = window.innerWidth;
    height = window.innerHeight;
    cursor = { x: width / 2, y: height / 2 };
    particles = [];
  };

  const onWindowResize = () => {
    width = window.innerWidth;
    height = window.innerHeight;
  };

  const onMouseMove = (event: MouseEvent) => {
    cursor.x = event.clientX;
    cursor.y = event.clientY;

    addParticle(
      cursor.x,
      cursor.y,
      possibleEmoji[Math.floor(Math.random() * possibleEmoji.length)]
    );
  };

  const addParticle = (x: number, y: number, character: string) => {
    const particle = new Particle(x, y, character);
    particles.push(particle);
  };

  const updateParticles = () => {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }

    // Remove dead particles when they have reached the end of
    // their life span
    for (let k = particles.length - 1; k >= 0; k--) {
      if (particles[k].lifeSpan < 0) {
        particles[k].die();
        particles.splice(k, 1);
      }
    }
  };

  const loop = () => {
    window.requestAnimationFrame(loop);
    updateParticles();
  };

  return {
    initialize: () => {
      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
      initializeStartingValues();
      loop();
    },
    destroy: () => {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);

      for (var i = particles.length - 1; i >= 0; i--) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
  };
}

export default createSnowflakeClient;
