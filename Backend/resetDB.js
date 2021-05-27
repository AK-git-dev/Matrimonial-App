const sequelize = require('sequelize');

const db = new sequelize.Sequelize("matrimonialDB", "root", "root", {
    dialect: "mysql",
    pool: {
        min: 5,
        max: 10,
    },
});


db.authenticate().then((r) => r).catch(e => console.log(e));
db.sync({force: true}).then((d) => console.log(`Database has been reset successfully!`)).catch((e) => console.error(e))

setTimeout(() => {
    db.close().then(r => console.log(`You are now good to go with fresh configurations`));
}, 2000)
