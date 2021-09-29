const db = require("../database/config.js");
const Data_Sensor = require("../models/data_sensor");
const List_Alat = require("../models/list_alat");
const Report = require("../models/report");

List_Alat.hasMany(Data_Sensor, { as: "Data_Sensor", foreignKey: "listAlatId" });
Data_Sensor.belongsTo(List_Alat, { as: "List_Alat", foreignKey: "listAlatId" });

List_Alat.hasMany(Report, { as: "Report", foreignKey: "listAlatId" });
Report.belongsTo(List_Alat, { as: "List_Alat", foreignKey: "listAlatId" });

async function ConvertToDaily() {
  const ID = await Data_Sensor.findAll({
    attributes: [[db.fn("DISTINCT", db.col("listAlatId")), "id"]],
    raw: true,
  });
  // console.log(typeof ID);
  for (let i = 0; i < ID.length; i++) {
    const data = await Data_Sensor.findAll({
      where: {
        listAlatId: ID[i].id,
      },
      raw: true,
    });
    await Data_Sensor.destroy({
      where: {
        listAlatId: ID[i].id,
      },
      raw: true,
    });
    // console.log(data);
    // console.log(ID[i].id);
    // console.log(`Jumlah data dengan ID ${ID[i].id}: ${hitung}`);
    let report = {
      temp_avg: avg(data, "temp"),
      temp_min: min(data, "temp"),
      temp_max: max(data, "temp"),
      ppg_avg: avg(data, "ppg"),
      ppg_min: min(data, "ppg"),
      ppg_max: max(data, "ppg"),
      ekg_avg: avg(data, "ekg"),
      ekg_min: min(data, "ekg"),
      ekg_max: max(data, "ekg"),
      nivac_avg: avg(data, "nivac"),
      nivac_min: min(data, "nivac"),
      nivac_max: max(data, "nivac"),
      tag: "daily",
      listAlatId: ID[i].id,
    };
    console.log(report);
    await Report.create(report);
  }
  // formatted_id = JSON.parse(JSON.stringify(ID));
  // console.log(formatted_id);
}

module.exports = ConvertToDaily;

function min(object, property) {
  let baru = object.map((x) => {
    // console.log(x[property]);
    let temp = {
      [property]: x[property],
    };
    return temp[property];
  });
  //   console.log(baru);
  let min = Math.min.apply(Math, baru);
  return min;
}

function max(object, property) {
  let baru = object.map((x) => {
    // console.log(x[property]);
    let temp = {
      [property]: x[property],
    };
    return temp[property];
  });
  //   console.log(baru);
  let max = Math.max.apply(Math, baru);
  return max;
}

function avg(object, property) {
  let baru = object.map((x) => {
    // console.log(x[property]);
    let temp = {
      [property]: x[property],
    };
    return temp[property];
  });
  let sum = baru.reduce((total, value) => {
    return total + value;
  });
  const count = baru.length;
  let result = sum / count;
  return Number(result.toFixed(2));
}
