"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiveOsGetWorker = exports.HiveOsGetFlightSheet = exports.HiveOsSetFlightSheet = void 0;
const axios_1 = __importDefault(require("axios"));
const config_json_1 = require("../config.json");
const { farmId, workerId, token } = config_json_1.hiveos;
const instance = axios_1.default.create({
    baseURL: `https://api2.hiveos.farm/api/v2/farms/${farmId}`
});
instance.defaults.headers.common['content-type'] = 'application/json';
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
function HiveOsSetFlightSheet(fsName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!fsName)
                throw new Error('Need to insert the Flight Sheet');
            const HiveOsFs = yield HiveOsGetFlightSheet();
            const _fs = HiveOsFs.find((el) => el.name === fsName);
            console.log;
            const result = yield instance.patch(`/workers/${workerId}`, { fs_id: _fs.id });
            return result.data;
        }
        catch (error) {
            throw new Error((error.message).toString());
        }
    });
}
exports.HiveOsSetFlightSheet = HiveOsSetFlightSheet;
function HiveOsGetFlightSheet() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield instance.get('/fs');
            return result.data.data;
        }
        catch (error) {
            throw new Error((error.message).toString());
        }
    });
}
exports.HiveOsGetFlightSheet = HiveOsGetFlightSheet;
function HiveOsGetWorker() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield instance.get(`/workers/${workerId}`);
            return result.data;
        }
        catch (error) {
            throw new Error((error.message).toString());
        }
    });
}
exports.HiveOsGetWorker = HiveOsGetWorker;
