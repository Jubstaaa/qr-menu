import { Injectable, NotFoundException } from "@nestjs/common";

export interface PublicItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  categoryId?: string;
  isAvailable: boolean;
}

@Injectable()
export class ItemService {
  private items: PublicItem[] = [
    {
      id: "1",
      name: "Grilled Chicken",
      description: "Delicious grilled chicken with herbs",
      price: 25.99,
      categoryId: "1",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Caesar Salad",
      description: "Fresh Caesar salad with dressing",
      price: 15.99,
      categoryId: "2",
      isAvailable: true,
    },
  ];

  async findAll(): Promise<PublicItem[]> {
    return this.items.filter((item) => item.isAvailable);
  }

  async findOne(id: string): Promise<PublicItem> {
    const item = this.items.find((item) => item.id === id && item.isAvailable);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }
}
