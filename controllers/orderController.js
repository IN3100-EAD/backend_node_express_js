import productModel from "../models/product.js";
import orderModel from "../models/order.js";
import stripePackage from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = stripePackage(process.env.STRIPE_PRIVATE_KEY);

// Function to find a product by its productId
const findProductById = async (productId) => {
  const productData = await productModel.findById(productId);
  return productData;
};

// Function to create an order
const createNewOrder = async (orderData) => {
  try {
    const products = orderData.products;

    let totalAmount = 0;
    for (const product of products) {
      let productData = await findProductById(product.productId);

      if (!productData) {
        return {
          success: false,
          error: `Product not found for ID: ${product.productId}`,
        };
      }

      totalAmount += productData.price * product.quantity;
    }

    const newOrder = new orderModel({
      userId: orderData.userId,
      products: orderData.products,
      totalAmount: totalAmount,
    });

    const savedOrder = await newOrder.save();

    return {
      success: true,
      message: "Order created successfully",
      order: savedOrder,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to create order" };
  }
};

// Function to create checkout session
const createCheckoutSession = async (items) => {
  try {
    const stockItems = await productModel.find({
      _id: { $in: items.items.map((item) => item.productId) },
    });

    const lineItems = stockItems.map((stockItem) => {
      const item = items.items.find(
        (item) => item.productId.toString() === stockItem._id.toString()
      );

      return {
        price_data: {
          currency: "lkr",
          product_data: {
            name: stockItem.name,
          },
          unit_amount: stockItem.price,
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    return { url: session.url };
  } catch (e) {
    throw new Error(e.message);
  }
};

export const checkout = async (req, res) => {
  const order = req.body;

  try {
    const createOrderResult = await createNewOrder(order);

    if (createOrderResult.success) {
      const sessionData = {
        items: order.products,
      };

      const sessionResponse = await createCheckoutSession(sessionData);

      res.status(200).json({
        message: "Checkout successful",
        checkoutURL: sessionResponse.url,
      });
    } else {
      res.status(500).json({ error: "Failed to process checkout" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to process checkout" });
  }
};
export const checkout2 = async (req, res) => {
  const order = req.body;

  try {
    const sessionData = {
      items: order.products,
    };

    const sessionResponse = await createCheckoutSession(sessionData);

    const createOrderResult = await createNewOrder(order);

    if (createOrderResult.success) {
      res.status(200).json({
        message: "Checkout successful",
        checkoutURL: sessionResponse.url,
      });
    } else {
      res.status(500).json({ error: "Failed to process checkout" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to process checkout" });
  }
};
