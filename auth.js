const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secretKey = 'belvalucu'; // Kunci rahasia untuk JWT

// Middleware untuk memverifikasi token
function auth(req, res, next) {
  // Ambil token dari header Authorization
  const header = req.headers.authorization;
  let token = header && header.split(" ")[1]

  let jwtHeader = {
    algorithm: "HS256"
}

  // Periksa apakah token ada
  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan.' });
  } else {
    jwt.verify(token, secretKey, jwtHeader, (error, user) => {
        if (error) {
            res
                .status(401)
                .json({
                    message: "Invalid token"
                })
        } else {
            console.log(user);
            // Lanjut ke handler berikutnya
            next();
        }
    })
  }
}

module.exports = auth