const sum = require('./math');

if (sum(2, 3) !== 5) {
  throw new Error('❌ Test failed!');
}

console.log('✅ Test passed!');
