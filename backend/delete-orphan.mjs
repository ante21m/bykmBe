import pg from 'pg';
const c = new pg.Client({ host: 'localhost', port: 5432, user: 'postgres', password: 'root', database: 'bykm_group' });
await c.connect();
const r = await c.query("DELETE FROM gallery WHERE \"imageUrl\" LIKE '%1780994012077%' RETURNING id, title");
console.log('Deleted', r.rowCount, 'row(s):', JSON.stringify(r.rows));
await c.end();
