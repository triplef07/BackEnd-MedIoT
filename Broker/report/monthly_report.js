const db = require("../database/config.js");
const Data_Sensor = require("../models/data_sensor");
const List_Alat = require("../models/list_alat");
const Report = require("../models/report");

List_Alat.hasMany(Data_Sensor, {
  as: "Data_Sensor1",
  foreignKey: "listAlatId",
});
Data_Sensor.belongsTo(List_Alat, {
  as: "List_Alat1",
  foreignKey: "listAlatId",
});

List_Alat.hasMany(Report, { as: "Report1", foreignKey: "listAlatId" });
Report.belongsTo(List_Alat, { as: "List_Alat1", foreignKey: "listAlatId" });

async function ConvertToMonthly() {
  const ID = await Report.findAll({
    attributes: [[db.fn("DISTINCT", db.col("listAlatId")), "id"]],
    raw: true,
  });
  for (let i = 0; i < ID.length; i++) {
    const data = await Report.findAll({
      where: {
        listAlatId: ID[i].id,
      },
      raw: true,
    });
    // console.log(data);
    let data_weekly = data.filter((x) => x.tag == "weekly");
    if (data_weekly.length == 4) {
      await Report.destroy({
        where: {
          tag: "weekly",
          listAlatId: ID[i].id,
        },
        raw: true,
      });
      let report_monthly = {
        temp_avg: avg(data_weekly, "temp_avg"),
        temp_min: min(data_weekly, "temp_min"),
        temp_max: max(data_weekly, "temp_max"),
        ppg_avg: avg(data_weekly, "ppg_avg"),
        ppg_min: min(data_weekly, "ppg_min"),
        ppg_max: max(data_weekly, "ppg_max"),
        ekg_avg: avg(data_weekly, "ekg_avg"),
        ekg_min: min(data_weekly, "ekg_min"),
        ekg_max: max(data_weekly, "ekg_max"),
        nivac_avg: avg(data_weekly, "nivac_avg"),
        nivac_min: min(data_weekly, "nivac_min"),
        nivac_max: max(data_weekly, "nivac_max"),
        tag: "monthly",
        listAlatId: ID[i].id,
      };
      await Report.create(report_monthly);
    }
    // console.log("data dengan tag daily:", data_daily);
  }
}

module.exports = ConvertToMonthly;

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
