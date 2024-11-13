import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  MEDIUM_SIZE_MARKER,
  SEARCH_DEBOUNCE_TIME,
} from "../../../../libs/utils";
import "./search.scss";
import { IoSearch } from "react-icons/io5";
import { useSearchMarks } from "../../../../libs/hooks";
import { MarkSearchDto } from "../../../../libs/dto";
import { Spiner } from "../../../ui/spiner/spiner";
import themeStore from "../../../../stores/theme.store";
import { IncidentCategoryLabel } from "../../../ui/incident-category-label/incident-category-label";
import { observer } from "mobx-react-lite";
import searchedMarkStore from "../../../../stores/searched-mark.store";
import selectedCategoriesStore from "../../../../stores/selected-categories.store";

export const Search: React.FC = observer(() => {
  const [value, setValue] = useState("");
  const [searchedMarks, setSearchedMarks] = useState<MarkSearchDto[]>([]);
  const [searchMode, setSearchMode] = useState(false);
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
      setSearchMode(true);
    }
  }, [dataSearchMarks]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (searchMode) setSearchMode(false);
  };

  const handleBackdropClick = () => {
    setSearchMode(false);
  };

  const handleFocusInput = () => {
    if (!searchMode && value) setSearchMode(true);
  };

  const handleSelectMark = (mark: MarkSearchDto) => {
    setSearchMode(false);
    setValue("");
    setSearchedMarks([]);
    searchedMarkStore.setSearchedMark(mark);
  };
  return (
    <>
      <Spiner visible={isPendingSearchMarks} fixed lightMode={lightMode} />
      {searchMode && (
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
        {searchMode && (
          <span className="search-badge">{searchedMarks.length}</span>
        )}
        {!value.trim() && (
          <IoSearch className="search-icon" size={MEDIUM_SIZE_MARKER} />
        )}
      </div>
      {searchMode && (
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
