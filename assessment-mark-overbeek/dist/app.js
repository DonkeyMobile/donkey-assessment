"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postRoutes_js_1 = __importDefault(require("./routes/postRoutes.js"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/users", userRoutes_js_1.default);
app.use("/posts", postRoutes_js_1.default);
exports.default = app;
