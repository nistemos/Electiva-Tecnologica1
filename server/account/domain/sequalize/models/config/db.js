/*Connection database*/
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('proyectoaula', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
});
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    sequelize.close();
    console.error('Unable to connect to the database:', error);
}
exports.sequelize = async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        sequelize.close();
        console.error('Unable to connect to the database:', error);
    }
}

