const path = require("path");
const shelljs = require("shelljs");

shelljs.rm(path.join(__dirname, "../docs/bundle-*"));
