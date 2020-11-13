var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const socketIo = require("socket.io");

var player = require("./player");

var player1 = new player.Player("Mustard");

console.log(player1.getName());
player1.setName("David");
console.log(player1.getName());
