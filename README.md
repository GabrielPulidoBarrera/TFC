# InventoryFlow

InventoryFlow es mi proyecto de fin de ciclo. Es una aplicación web dedicada a la creación y distribución de colecciones. La versión oficial está hospedada en gabrielpulido.xyz. No garantizo que esta página siga operativa posterior a octubre de 2026.


Pasos para instalar en cliente (resumido)
```sh
git clone https://github.com/GabrielPulidoBarrera/TFC.git
cd TFC
npm install
```
Tras eso, tendrás que crear un archivo .env en la raíz y colocarle los atributos JWT_TOKEN y DATABASE_URL, que deberá de ir conectada a tu base de datos MySQL (puede que MariaDB también sea compatible, no lo he probado).

Inicia la pagina con
```
npm run dev
```

