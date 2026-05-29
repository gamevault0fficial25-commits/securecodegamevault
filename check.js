const bcrypt = require('bcrypt');
const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8');
const match = env.match(/ADMIN_PASSWORD_HASH=(.+)/);
const hash = match ? match[1] : null;
console.log('Hash from .env:', hash);
const password = 'Gv#8kL9$mQ2!xR7@pW4';
bcrypt.compare(password, hash, (err, res) => {
    console.log('Match:', res);
});