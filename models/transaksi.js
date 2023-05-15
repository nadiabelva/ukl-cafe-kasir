"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class transaksi extends Model {
    static associate(models) {
      
      // this.belongsTo(models.meja);
      // this.belongsTo(models.user);
      this.hasMany(models.detail_transaksi, {
        foreignKey: "id_transaksi",
        as: "detail_transaksi",
      });
    }
  }
  transaksi.init(
    {
      id_transaksi: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      tgl_transaksi: DataTypes.DATE,
      id_user: DataTypes.INTEGER,
      id_meja: DataTypes.INTEGER,
      nama_pelanggan: DataTypes.STRING,
      status: DataTypes.ENUM("belum_bayar", "lunas"),
    },
    {
      sequelize,
      modelName: "transaksi",
      tableName: "transaksi",
    }
  );
  return transaksi;
};
