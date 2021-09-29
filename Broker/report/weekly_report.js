const db = require("../database/config.js");
const Data_Sensor = require("../models/data_sensor");
const List_Alat = require("../models/list_alat");
const Report = require("../models/report");

List_Alat.hasMany(Data_Sensor, {
  as: "Data_Sensor2",
  foreignKey: "listAlatId",
});
Data_Sensor.belongsTo(List_Alat, {
  as: "List_Alat2",
  foreignKey: "listAlatId",
});

List_Alat.hasMany(Report, { as: "Report2", foreignKey: "listAlatId" });
Report.belongsTo(List_Alat, { as: "List_Alat2", foreignKey: "listAlatId" });

async function ConvertToWeekly() {
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
    let data_daily = data.filter((x) => x.tag == "daily");
    // console.log("Panjang data_daily:", data_daily.length);
    // console.log("data_daily:", data_daily);
    if (data_daily.length == 7) {
      console.log(data_daily);
      await Report.destroy({
        where: {
          tag: "daily",
          listAlatId: ID[i].id,
        },
        raw: true,
      });
      let report_weekly = {
        temp_avg: avg(data_daily, "temp_avg"),
        temp_min: min(data_daily, "temp_min"),
        temp_max: max(data_daily, "temp_max"),
        ppg_avg: avg(data_daily, "ppg_avg"),
        ppg_min: min(data_daily, "ppg_min"),
        ppg_max: max(data_daily, "ppg_max"),
        ekg_avg: avg(data_daily, "ekg_avg"),
        ekg_min: min(data_daily, "ekg_min"),
        ekg_max: max(data_daily, "ekg_max"),
        nivac_avg: avg(data_daily, "nivac_avg"),
        nivac_min: min(data_daily, "nivac_min"),
        nivac_max: max(data_daily, "nivac_max"),
        tag: "weekly",
        listAlatId: ID[i].id,
      };
      await Report.create(report_weekly);
    }
    // console.log("data dengan tag daily:", data_daily);
  }
}

module.exports = ConvertToWeekly;

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
