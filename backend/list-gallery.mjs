import pg from 'pg';
const c = new pg.Client({ host: 'localhost', port: 5432, user: 'postgres', password: 'root', database: 'bykm_group' });
await c.connect();
const r = await c.query('SELECT id, title, "imageUrl" FROM gallery ORDER BY "createdAt" DESC');
console.log(JSON.stringify(r.rows, null, 2));
await c.end();
