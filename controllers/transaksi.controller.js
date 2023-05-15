const transaksiModel = require(`../models/index`).transaksi;
const detailtransaksiModel = require(`../models/index`).detail_transaksi;
const mejaModel = require(`../models/index`).meja;
const Op = require(`sequelize`).Op;
const { path } = require(`../models/transaksi`);
const fs = require(`fs`);
const md5 = require(`md5`);
const mysql = require(`mysql2`);

exports.getAllTransaksi = async (request, response) => {
  let data = await transaksiModel.findAll({
    include: [
      `user`,
      `meja`,
      {
        model: detailtransaksiModel,
        as: `detail_transaksi`,
        include: ["menu"],
      },
    ],
  });
  return response.json({
    success: true,
    data: data,
    message: `All transaksi have been loaded`,
  });
};

exports.findTransaksi = async (request, response) => {
  let keyword = request.body.keyword;

  let transaksi = await transaksiModel.findAll({
    where: {
      [Op.or]: [
        { id_transaksi: { [Op.substring]: keyword } },
        { id_user: { [Op.substring]: keyword } },
        { id_meja: { [Op.substring]: keyword } },
        { nama_pelanggan: { [Op.substring]: keyword } },
        { status: { [Op.substring]: keyword } },
      ],
    },
  });
  return response.json({
    success: true,
    data: transaksi,
    message: `All transaksi have been loaded`,
  });
};

exports.addTransaksi = async (request, response) => {
  // let check = await transaksiModel.findOne({
  //   where: {
  //     id_meja: request.body.id_meja,
  //   }
  // })

  // if (check != null ){
  //   return response.json({
  //     message: "Meja sudah dipesan"
  //   })
  // }

  let data = {
    tgl_transaksi: request.body.tgl_transaksi,
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    status: request.body.status,
  };

  transaksiModel
    .create(data)
    .then((result) => {
      let transaksiID = result.id_transaksi;
      let detailTransaksi = request.body.detail_transaksi;

      for (let i = 0; i < detailTransaksi.length; i++) {
        detailTransaksi[i].id_transaksi = transaksiID;
      }

      detailtransaksiModel
        .bulkCreate(detailTransaksi)
        .then((result) => {
          return response.json({
            success: true,
            message: `New Transaksi has been inserted`,
          });
        })
        .catch((error) => {
          return response.json({
            success: false,
            message: error.message,
          });
        });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};

exports.updateTransaksi = (request, response) => {
  let data = {
    tgl_transaksi: request.body.tgl_transaksi,
    id_user: request.body.id_user,
    id_meja: request.body.id_meja,
    nama_pelanggan: request.body.nama_pelanggan,
    id_menu: request.body.id_menu,
    harga: request.body.harga,
    status: request.body.status,
  };

  console.log(data);

  let id_transaksi = request.params.id;

  transaksiModel
    .update(data, { where: { id_transaksi: id_transaksi } })
    .then((result) => {
      response.json({
        success: true,
        message: "Data Berhasil Diganti",
      });
    })
    .catch((error) => {
      response.json({
        message: error.message,
      });
    });
};

exports.deleteTransaksi = (request, response) => {
  let id_transaksi = request.params.id;

  transaksiModel
    .destroy({ where: { id: id_transaksi } })
    .then((result) => {
      return response.json({
        success: true,
        message: `Data transaksi has been deleted`,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: error.message,
      });
    });
};
