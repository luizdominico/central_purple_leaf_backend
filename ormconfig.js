const root = process.env.NODE_ENV === 'development' ? 'src/' : 'dist/'

module.exports = {
   "type": "postgres",
   "host": "localhost",
   "port": 5432,
   "username": "purpleleaf",
   "password": "purpleleaf",
   "database": "purpleleaf",

   "entities": [
      root + "app/entities/*.{ts,js}"
   ],
   "migrations": [
      root + "database/migrations/*.{ts,js}"
   ],
   "cli": {
      "migrationsDir": root + "database/migrations"
   }
}