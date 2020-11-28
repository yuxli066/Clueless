// global typograph styles
// Note: h3 is actually bigger than h2, will change that later
export const textStyles = {
  textStyles: {
    h1: {
      fontFamily: 'Playfair Display',
      fontSize: ['120px'],
      fontWeight: '600',
      letterSpacing: '1px',
      lineHeight: '1',
    },
    h2: {
      fontSize: ['larger'],
      fontFamily: 'Playfair Display',
      fontWeight: 'semibold',
      lineHeight: '1.2',
    },
    h3: {
      fontSize: ['54px'],
      fontStyle: 'italic',
      fontFamily: 'Playfair Display',
      fontWeight: '700',
      lineHeight: '120%',
    },
    h4: {
      fontFamily: 'Modak',
      fontStyle: 'italic',
      fontSize: ['30px'],
    },
    paragraph: {
      fontFamily: 'EB Garamond',
      lineHeight: '1.75',
    },
    imageCaptions: {
      fontStyle: 'italic',
      fontWeight: '700',
      fontSize: '12px',
    },
    em: {
      fontWeight: '900',
      fontStyle: 'italic',
      fontFamily: 'EB Garamond',
      lineHeight: '1.75',
    },
  },
};

export const colorStyles = {
  colors: {
    black: {
      50: '#f2f2f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
    tan: {
      50: '#fff6e2',
      100: '#f8e4b9',
      200: '#f3d38e',
      300: '#eec161',
      400: '#eaaf35',
      500: '#d1961f',
      600: '#a27417',
      700: '#73530f',
      800: '#463207',
      900: '#191100',
    },
    blue: {
      50: '#e2ecff',
      100: '#b2c6ff',
      200: '#82a0fd',
      300: '#5279f9',
      400: '#2253f6',
      500: '#093add',
      600: '#032dad',
      700: '#00207d',
      800: '#00134e',
      900: '#000620',
    },
  },
};

export const Popover = {
  components: {
    Popover: {
      parts: ['popper'],
      baseStyle: {
        popper: ({ width }) => ({
          maxW: width ? width : 'xs',
        }),
      },
    },
  },
};
