import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  MEDIUM_SIZE_MARKER,
  SEARCH_DEBOUNCE_TIME,
} from "../../../../libs/utils";
import "./search.scss";
import { IoSearch } from "react-icons/io5";
import { useSearchMarks } from "../../../../libs/hooks";
import { MarkSearchDto } from "../../../../libs/dto";
import themeStore from "../../../../stores/theme.store";
import { IncidentCategoryLabel } from "../../../ui/incident-category-label/incident-category-label";
import { observer } from "mobx-react-lite";
import searchedMarkStore from "../../../../stores/searched-mark.store";
import selectedCategoriesStore from "../../../../stores/selected-categories.store";
import searchModeStore from "../../../../stores/search-mode.store";
import { Spinner } from "../../../ui/spinner/spinner";

export const Search: React.FC = observer(() => {
  const [value, setValue] = useState("");
  const [searchedMarks, setSearchedMarks] = useState<MarkSearchDto[]>([]);
  const { lightMode } = themeStore;
  const inputRef = useRef<HTMLInputElement>(null);
  const selectedCategories = selectedCategoriesStore.selectedCategories;
  const { searchMarks, dataSearchMarks, isPendingSearchMarks } =
    useSearchMarks();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value.trim()) searchMarks(value.trim());
      else setSearchedMarks([]);
    }, SEARCH_DEBOUNCE_TIME);

    return () => {
      clearTimeout(handler);
    };
  }, [value, searchMarks]);

  useEffect(() => {
    if (dataSearchMarks?.data) {
      setSearchedMarks(dataSearchMarks.data);
      searchModeStore.set(true);
    }
  }, [dataSearchMarks]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (searchModeStore.get()) searchModeStore.set(false);
  };

  const handleBackdropClick = () => {
    searchModeStore.set(false);
  };

  const handleFocusInput = () => {
    if (!searchModeStore.get() && value) searchModeStore.set(true);
  };

  const handleSelectMark = (mark: MarkSearchDto) => {
    searchModeStore.set(false);
    setValue("");
    setSearchedMarks([]);
    searchedMarkStore.setSearchedMark(mark);
  };
  return (
    <>
      <Spinner visible={isPendingSearchMarks} fixed lightMode={lightMode} />
      {searchModeStore.get() && (
        <div className="search-backdrop" onClick={handleBackdropClick}></div>
      )}
      <div className="search-wrapper">
        <input
          type="search"
          className="search"
          aria-label="Поиск"
          onChange={handleSearch}
          onFocus={handleFocusInput}
          value={value}
          ref={inputRef}
        />
        {searchModeStore.get() && (
          <span className="search-badge">{searchedMarks.length}</span>
        )}
        {!value.trim() && (
          <IoSearch className="search-icon" size={MEDIUM_SIZE_MARKER} />
        )}
      </div>
      {searchModeStore.get() && (
        <ul className="searched-list">
          {searchedMarks.map((mark) => {
            if (selectedCategories.includes(mark.category.id))
              return (
                <li className="searched-item" key={mark.id}>
                  <button
                    className="searched-item__button"
                    onClick={() => handleSelectMark(mark)}
                  >
                    <div className="searched-item__category">
                      <IncidentCategoryLabel
                        id={mark?.category.id as number}
                        name={mark?.category.name as string}
                        color={mark?.category.color as string}
                      />
                    </div>
                    <h5 className="searched-item__title">{mark.title}</h5>
                  </button>
                </li>
              );
          })}
        </ul>
      )}
    </>
  );
});
