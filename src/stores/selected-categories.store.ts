import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { CategoryDto } from "../dto";
import { CategoriesService } from "../services/categories.service";


class selectedCategoriesStore {
  selectedCategories: number[] = [];

  constructor() {
    makeAutoObservable(this);

    CategoriesService.getCategories()
      .then((response: AxiosResponse<CategoryDto[]>) => {
        this.selectedCategories = response.data.map((category) => category.id);
      })
      .catch((error) => {
        console.error("Axios error:", error);
      });
  }

  setSelectedCategories = (data: number[]) => {
    this.selectedCategories = data;
  };
}

export default new selectedCategoriesStore();
