const db = require("../database/config.js");
const Data_Sensor = require("../models/data_sensor");
const List_Alat = require("../models/list_alat");
const Report = require("../models/report");

List_Alat.hasMany(Data_Sensor, {
  as: "Data_Sensor3",
  foreignKey: "listAlatId",
});
Data_Sensor.belongsTo(List_Alat, {
  as: "List_Alat3",
  foreignKey: "listAlatId",
});

List_Alat.hasMany(Report, { as: "Report3", foreignKey: "listAlatId" });
Report.belongsTo(List_Alat, { as: "List_Alat3", foreignKey: "listAlatId" });

async function ConvertToYearly() {
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
    let data_monthly = data.filter((x) => x.tag == "monthly");
    if (data_monthly.length == 12) {
      await Report.destroy({
        where: {
          tag: "monthly",
          listAlatId: ID[i].id,
        },
        raw: true,
      });
      let report_yearly = {
        temp_avg: avg(data_monthly, "temp_avg"),
        temp_min: min(data_monthly, "temp_min"),
        temp_max: max(data_monthly, "temp_max"),
        ppg_avg: avg(data_monthly, "ppg_avg"),
        ppg_min: min(data_monthly, "ppg_min"),
        ppg_max: max(data_monthly, "ppg_max"),
        ekg_avg: avg(data_monthly, "ekg_avg"),
        ekg_min: min(data_monthly, "ekg_min"),
        ekg_max: max(data_monthly, "ekg_max"),
        nivac_avg: avg(data_monthly, "nivac_avg"),
        nivac_min: min(data_monthly, "nivac_min"),
        nivac_max: max(data_monthly, "nivac_max"),
        tag: "yearly",
        listAlatId: ID[i].id,
      };
      await Report.create(report_yearly);
    }
    // console.log("data dengan tag daily:", data_daily);
  }
}

module.exports = ConvertToYearly;

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
