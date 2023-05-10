module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // 'React' must be in scope when using JSX 에러 해결 (Next.js)
    'react/react-in-jsx-scope': 'off',
    // ts파일에서 tsx구문 허용 (Next.js)
    'react/jsx-filename-extension': 0,
  },
};
