/**
 * Gesture Recognizer for Vue.js as v-swipe directive.
 * modifiers: .left, .right, .down, .up
 * requires swipe to be more than 50px long to fire.
 */
export default {
  bind(el, binding) {
    let start;
    let end;
    let isSwipe = false;
    let direction = false;

    el.addEventListener('touchstart', e => {
      if (e.changedTouches[0]) {
        start = {
          x: e.changedTouches[0].screenX,
          y: e.changedTouches[0].screenY
        };
      }
    });

    el.addEventListener('touchmove', e => {
      e.preventDefault();
      isSwipe = true;
    });

    el.addEventListener('touchend', e => {
      if (isSwipe) {
        end = {
          x: e.changedTouches[0].screenX,
          y: e.changedTouches[0].screenY
        };
        const delta = {
          x: end.x - start.x,
          y: end.y - start.y
        };

        if (Math.abs(delta.x) > Math.abs(delta.y)) {
          direction = delta.x >= 0 ? 'right' : 'left';
        } else {
          direction = delta.y >= 0 ? 'down' : 'up';
        }

        if (
          (direction === 'left' || direction === 'right') &&
          Math.abs(delta.x) <= 50 &&
          (direction === 'up' || direction === 'down') &&
          Math.abs(delta.y) <= 50
        ) {
          return;
        }

        if (binding.modifiers && binding.modifiers[direction]) {
          binding.value(direction);
          // reset
          start = 0;
          end = 0;
          isSwipe = false;
          direction = false;
        }
      }
    });
  }
};
