import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import { CategoryDto } from "../libs/dto/categories.dto";
import { MarksService } from "../libs/services/marks.service";

class selectedCategoriesStore {
  selectedCategories: number[] = [];

  constructor() {
    makeAutoObservable(this);

    MarksService.getCategories()
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
