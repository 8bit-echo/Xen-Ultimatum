export default {
  bind(el, binding, vnode) {
    let start;
    let end;
    let isSwipe = false;
    let direction = false;

    el.addEventListener('touchstart', e => {
      if (e.changedTouches[0]) {
        start = { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
      }
    });

    el.addEventListener('touchmove', e => {
      e.preventDefault();
      isSwipe = true;
    });

    el.addEventListener('touchend', e => {
      if (isSwipe) {
        end = { x: e.changedTouches[0].screenX, y: e.changedTouches[0].screenY };
        const delta = {
          x: end.x - start.x,
          y: end.y - start.y,
        };

        if (Math.abs(delta.x) > Math.abs(delta.y)) {
          direction = delta.x >= 0 ? 'right' : 'left';
        } else {
          direction = delta.y >= 0 ? 'down' : 'up';
        }

        if (binding.modifiers && binding.modifiers[direction]) {
          binding.value(direction);
          // binding.expression();
        }
      }
    });
  },
  unbind: function(el, binding, vnode) {
    el.removeEventListener('touchstart');
    el.removeEventListener('touchmove');
    el.removeEventListener('touchend');
  },
};
