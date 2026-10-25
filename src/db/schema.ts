import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ProductColor = {
  name: string;
  hex: string;
};

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  price: integer("price").notNull(),
  compareAt: integer("compare_at"),
  description: text("description").notNull(),
  image: text("image").notNull(),
  gallery: jsonb("gallery").$type<string[]>().notNull().default([]),
  colors: jsonb("colors").$type<ProductColor[]>().notNull().default([]),
  specifications: jsonb("specifications")
    .$type<Record<string, string>>()
    .notNull()
    .default({}),
  careInstructions: text("care_instructions"),
  quantityUnit: text("quantity_unit").notNull().default("yard"),
  stock: integer("stock").notNull().default(0),
  isNew: boolean("is_new").notNull().default(false),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  reference: text("reference").notNull().unique(),
  email: text("email").notNull(),
  total: integer("total").notNull(),
  status: text("status").notNull().default("pending"),
  provider: text("provider").notNull().default("paystack"),
  authorizationUrl: text("authorization_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id),
  productName: text("product_name").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
