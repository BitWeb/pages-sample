import { create } from '@storybook/theming';

function getImageUrl() {
  const baseUrl = 'https://bitweb.github.io/pages-sample/';
  const branch = process.env.CURRENT_BRANCH;
  return `${baseUrl}${branch}/TEHIK_logo.svg`;
}

export default create({
  appBg: '#2a2a3c',
  base: 'dark',
  brandTitle: 'Tehik react components',
  brandUrl: 'https://disainipesa-react.tehik.ee/',
  brandImage: getImageUrl(),
  brandTarget: '_self',
});
