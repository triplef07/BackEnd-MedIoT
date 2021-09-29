import { UserController } from "./controller/UserController";
import { AlatPasienController } from "./controller/AlatController";
import { DataSensorController } from "./controller/DataSensorController";
import { ReportController } from "./controller/ReportController";

export const Routes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
  },
  {
    method: "get",
    route: "/users/cek",
    controller: UserController,
    action: "cek",
  },
  {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save",
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
  },
  {
    method: "patch",
    route: "/users",
    controller: UserController,
    action: "update",
  },
  {
    method: "get",
    route: "/alat/",
    controller: AlatPasienController,
    action: "displayall",
  },
  {
    method: "get",
    route: "/alat/now/:input",
    controller: AlatPasienController,
    action: "displaynow",
  },
  {
    method: "get",
    route: "/alat/report/:input",
    controller: AlatPasienController,
    action: "displayreport",
  },
  {
    method: "post",
    route: "/alat/inputalat",
    controller: AlatPasienController,
    action: "input",
  },
  {
    method: "delete",
    route: "/alat/:idalat",
    controller: AlatPasienController,
    action: "delete",
  },
  {
    method: "patch",
    route: "/alat/:idalat",
    controller: AlatPasienController,
    action: "update",
  },
  {
    method: "get",
    route: "/rawdata",
    controller: DataSensorController,
    action: "all",
  },
  {
    method: "post",
    route: "/rawdata",
    controller: DataSensorController,
    action: "input",
  },
  {
    method: "delete",
    route: "/rawdata/:id",
    controller: DataSensorController,
    action: "delete",
  },
  {
    method: "patch",
    route: "/rawdata/:id",
    controller: DataSensorController,
    action: "update",
  },
  {
    method: "get",
    route: "/report",
    controller: ReportController,
    action: "all",
  },
  {
    method: "get",
    route: "/report/:tag",
    controller: ReportController,
    action: "get_tag",
  },
  {
    method: "post",
    route: "/report",
    controller: ReportController,
    action: "input",
  },
  {
    method: "delete",
    route: "/report/:id",
    controller: ReportController,
    action: "delete",
  },
  {
    method: "patch",
    route: "/report/:id",
    controller: ReportController,
    action: "update",
  },
];
