import { z } from "zod";

const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
});

const AisleSchema = z.object({
  id: z.string(),
  name: z.string(),
  products: z.array(ProductSchema),
});

const ShopSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
  description: z.string(),
  aisles: z.array(AisleSchema),
});

const ProductInListSchema = z.object({
  id: z.string(),
  isBought: z.boolean(),
  product: ProductSchema,
  quantity: z.string(),
  aisle: z.string(),
});

const ShoppingListSchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  shop: ShopSchema,
  products: z.array(ProductInListSchema),
});

export {
  AisleSchema,
  ProductInListSchema,
  ProductSchema,
  ShoppingListSchema,
  ShopSchema,
};
