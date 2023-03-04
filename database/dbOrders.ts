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

export const getOrderByUserId = async (userId: string): Promise<IOrder[]> => {
  if (!isValidObjectId) return [];
  await db.connect();
  const orders = await Order.find({ user: userId }).lean();
  await db.disconnect();
  return JSON.parse(JSON.stringify(orders));
};
