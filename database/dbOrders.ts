import { db } from ".";
import { Order } from "../models";
import { IOrder } from "../interfaces";
import { isValidObjectId } from "mongoose";

export const getOrderById = async (id: string): Promise<IOrder|null> => {
  if (!isValidObjectId) return null;
  await db.connect();
  const order = await Order.findById(id).lean();
  await db.disconnect();
  if (!order) return null;
  return JSON.parse(JSON.stringify(order));
};
