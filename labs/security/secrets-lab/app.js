require('dotenv').config();

console.log('Database URL:');
console.log(process.env.DATABASE_URL);

console.log('\nAPI Key:');
console.log(process.env.API_KEY);

console.log('\nJWT Secret:');
console.log(process.env.JWT_SECRET);
