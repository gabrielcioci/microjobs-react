// tailwind.config.js

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    theme: {
        screens: {
            sm: '375px',
            md: '768px',
            lg: '1024px',
            xl: '1366px',
        },
        borderWidth: {
            default: '1px',
            '0': '0',
            '2': '2px',
            '4': '4px',
        },
        extend: {
            fontFamily: {
                sans: [
                    'Lato',
                    ...defaultTheme.fontFamily.sans,
                ]
            },
            width: {
                'mxc': 'max-content'
            },
            minWidth: {
                'mxc': 'max-content'
            }
        }
    }
}