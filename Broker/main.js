const aedes = require("aedes")();
const server = require("net").createServer(aedes.handle);
const db = require("./database/config.js");
const Data_Sensor = require("./models/data_sensor");
const ConvertToDaily = require("./report/daily_report");
const ConvertToWeekly = require("./report/weekly_report");
const ConvertToMonthly = require("./report/monthly_report");
const ConvertToYearly = require("./report/yearly_report");
const schedule = require("node-schedule");

const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const portws = 8888;
const port = 13217;

async function insert(data) {
  await Data_Sensor.create(data);
}

server.listen(port, function () {
  console.log("server listening on port", port);
});

ws.createServer({ server: httpServer }, aedes.handle);

httpServer.listen(portws, function () {
  console.log("websocket server listening on port ", portws);
});

aedes.on("client", () => {
  console.log("Halo");
});

aedes.subscribe("test", function (packet, cb) {
  var temp = JSON.parse(packet.payload.toString());
  try {
    insert(temp);
  } catch (error) {
    console.log(error);
  }
});

const job_daily = schedule.scheduleJob("0 17 * * *", () => {
  ConvertToDaily();
});

const job_weekly = schedule.scheduleJob("10 17 * * *", () => {
  ConvertToWeekly();
});

const job_monthly = schedule.scheduleJob("20 17 * * *", () => {
  ConvertToMonthly();
});

const job_yearly = schedule.scheduleJob("30 17 * * *", () => {
  ConvertToYearly();
});

// ConvertToDaily();
