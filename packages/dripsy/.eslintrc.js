module.exports = {
  extends: ['nando'],
  rules: {
    'react-hooks/exhaustive-deps': [
      'error',
      {
        additionalHooks: '(useStableMemo)',
      },
    ],
  },
}
