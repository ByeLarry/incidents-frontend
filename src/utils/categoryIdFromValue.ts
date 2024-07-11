import { CategoryDto } from "../dto/categories.dto";

export function categoryIdFromValue(
  value: string,
  categories: CategoryDto[]
): number | undefined {
  return categories.find((category) => category.name === value)?.id;
}
