import "whatwg-fetch";

require('dotenv').config({
    path: '.env.test'
})

jest.mock('./src/helpers/getEnviroments', () => ({
    // el nombre debe ser igual que el nombre de la funcion donde creamos el getEnviroment
    getEnviroment: () => ({ ...process.env })
}));