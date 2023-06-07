module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "opale",
    DB: "ligabloprod",
    DIALECT: "mysql",

    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000
    }
}