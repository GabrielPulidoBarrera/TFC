import { defineDb, defineTable, column } from 'astro:db';
const Tabla1 = defineTable({
  columns: {
    correo: column.text(),
    nombre: column.text(),
  }
})
// https://astro.build/db/config
export default defineDb({
  tables: {Tabla1}
});
