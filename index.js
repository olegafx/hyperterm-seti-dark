const black = '#000000';
const red = '#cf3d41';
const green = '#9ecb4d';
const yellow = '#e7ce61';
const blue = '#4aa4c9';
const pink = '#f167a7';
const cyan = '#badfdd';
const lightGrey = '#d0d0d0';
const mediumGrey = '#808080';
const white = '#ffffff';

const backgroundColor = '#1c1f26';
const foregroundColor = white;
const cursorColor = '#d4d7d6';
const borderColor = '#2b303b';

const colors = [
  black,
  red,
  green,
  yellow,
  blue,
  pink,
  cyan,
  lightGrey,
  mediumGrey,
  red,
  green,
  yellow,
  blue,
  pink,
  cyan,
  white
];

exports.decorateConfig = (config) => {
  const themeOptions = config.themeOptions || {};

  return Object.assign({}, config, {
    backgroundColor: themeOptions.backgroundColor || backgroundColor,
    foregroundColor: themeOptions.foregroundColor || foregroundColor,
    borderColor: themeOptions.borderColor || borderColor,
    cursorColor: themeOptions.cursorColor || cursorColor,
    colors,
    css: `
      .tabs_list {
        border: none !important;
      }
      .tab_tab {
        color: ${foregroundColor} !important;
        background-color: ${backgroundColor} !important;
        border: none !important;
        border-right: 1px solid transparent !important;
        border-left: 1px solid transparent !important;
      }
      .tab_active {
        background-color: ${borderColor} !important;
        height: calc(100% + 1px);
        border-left: 1px solid ${borderColor} !important;
        border-right: 1px solid ${borderColor} !important;
      }
      .tab_tab:last-child {
        border-right: 1px solid transparent !important;
      }
      .tab_active:before {
        border-bottom: none !important;
      }
      ${config.css || ''}
    `
  });
};

exports.middleware = () => (next) => (action) => {
  console.log('config', action.config);
  switch (action.type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD':
      action.config.foregroundColor = foregroundColor;
      action.config.backgroundColor = backgroundColor;
      action.config.cursorColor = cursorColor;
      action.config.borderColor = borderColor;
      action.config.colors = colors;
  }
  next(action);
};
