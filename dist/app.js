"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./modules/product/product.route");
const order_route_1 = require("./modules/order/order.route");
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use('/api/products', product_route_1.ProductRoutes);
exports.app.use('/api/orders', order_route_1.OrderRoutes);
exports.app.get('/', (req, res) => {
    res.send('Hello World!');
});
