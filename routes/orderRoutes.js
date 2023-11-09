import { checkout } from "../controllers/orderController.js";

export default (router) => {
  router.post("/order/checkout", checkout);
  return router;
};
