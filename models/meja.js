'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meja extends Model {
    static associate(models) {
      this.hasMany(models.transaksi,{
        foreignKey:'id_meja',as:'meja'
      })
    }
  }
  meja.init({
    id_meja:{
      autoIncrement:true,
      primaryKey:true,
      type:DataTypes.INTEGER
    },
    nomor_meja: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'meja',
    tableName: 'meja'
  });
  return meja;
};