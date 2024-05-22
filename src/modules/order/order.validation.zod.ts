import { z } from 'zod';

// Zod schema
const orderSchemaValidator = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative(),
});

export { orderSchemaValidator };
