type TVariants = {
  type: string
  value: string
}

type TInventory = {
  quantity: number
  inStock: boolean
}

export type TMovie = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: TVariants[]
  inventory: TInventory
}
