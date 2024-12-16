import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import selectedCategoriesStore from "../../../../stores/selected-categories.store";
import searchModeStore from "../../../../stores/search-mode.store";
import { IoSearch } from "react-icons/io5";
import { IncidentCategoryLabel } from "../../../../components/ui/incident-category-label/incident-category-label";
import { Spinner } from "../../../../components/ui/spinner/spinner";
import { MarkSearchDto } from "../../../../dto";
import { useSearchMarks } from "../../../../hooks";
import themeStore from "../../../../stores/theme.store";
import { SEARCH_DEBOUNCE_TIME, MEDIUM_SIZE_MARKER } from "../../../../utils";
import "./search.scss";
import {
  handleBackdropClick,
  handleFocusInput,
  handleSearch,
  handleSelectMarkOnSearchList,
} from "../../handlers";

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
          onChange={(e) => handleSearch(e, setValue)}
          onFocus={() => handleFocusInput(value)}
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
                    onClick={() =>
                      handleSelectMarkOnSearchList(
                        mark,
                        setValue,
                        setSearchedMarks
                      )
                    }
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
