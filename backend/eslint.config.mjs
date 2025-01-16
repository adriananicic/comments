import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended', // Add this line
    ],
    plugins: ['prettier'], // Ensure Prettier is included as a plugin
    rules: {
      // Optional: Customize Prettier's rules (e.g., disable semicolons)
      'prettier/prettier': [
        'error',
        {
          semi: true,
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
    },
  },
];
