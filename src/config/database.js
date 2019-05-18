module.exports = {
  dialect: 'mysql',
  host: 'localhost',
  port: '8889',
  username: 'root',
  password: 'root',
  database: 'gonodemodulo2',
  aperatorAliases: false,
  define: {
    // Criação de coluna de criacao e modificacao
    timestamps: true,
    // Utilizando como padrão _ e não camel case
    underscored: true,
    underscoredAll: true
  }
}
