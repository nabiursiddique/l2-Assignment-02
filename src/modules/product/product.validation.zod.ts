import { z } from 'zod';

// Define the Zod schema for TVariants
const variantsSchemaValidator = z.object({
  type: z.string().min(1, { message: 'Type is required' }),
  value: z.string().min(1, { message: 'Value is required' }),
});

// Define the Zod schema for TInventory
const inventorySchemaValidator = z.object({
  quantity: z
    .number()
    .min(0, { message: 'Quantity must be a non-negative number' }),
  inStock: z.boolean(),
});

// Define the Zod schema for TProduct
const productSchemaValidator = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string().min(1, { message: 'Category is required' }),
  tags: z.array(
    z.string().min(1, { message: 'Tag must be a non-empty string' }),
  ),
  variants: z.array(variantsSchemaValidator),
  inventory: inventorySchemaValidator,
});

export default productSchemaValidator;
