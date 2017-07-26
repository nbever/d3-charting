
const testsContext = require.context('.', true, /.spec$/);
// all spec files or individual
// const testsContext = require.context('.', true, /axis_nature.spec.tsx$/);
// const testsContext = require.context('.', true, /base_chart.spec.tsx$/);

testsContext.keys().forEach(testsContext);
