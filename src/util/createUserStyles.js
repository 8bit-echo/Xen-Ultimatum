const createUserStyleNode = () => {
  const style = document.createElement('style');
  style.id = 'userConfig';
  style.innerHTML = `
    a.router-link-exact-active {
      color: ${window.config.accentColor} !important;}

    .calendar-cell.--selected::after {
      background-color: ${window.config.accentColor} !important;
    }
    `;
  document.head.appendChild(style);
};

export { createUserStyleNode as default };
