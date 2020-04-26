const envName = process.env.APP_ENV || "development";

let appConfig = {
};

let envConfig = {
  development: {
    url: "postgres://f1_stats_usr:f1_stats_pwd@localhost:5432/f1_stats",
    dialect: "postgres",
    operatorsAliases: "1"
  },
  staging: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    operatorsAliases: "1"
  }
}

module.exports = {
  ...appConfig,
  ...envConfig[envName]
};

