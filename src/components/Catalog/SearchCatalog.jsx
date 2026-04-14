import { useEffect, useState } from "react";
import { BASE_URL } from "../../config/api";
import { CatalogPreview } from "./CatalogPreview";
import { CatalogMenu } from "./CatalogMenu";
import { ButtonLoadeMore } from "../Home/ButtonLoadeMore";
import { useLocation } from "react-router";

import "./style.scss";

// Количество загружаемых товаров по клику по кнопке "Загрузить ещё":
const countLoadeMoreGoods = 6;

export const SearchCatalog = ({ categories, goodsAll }) => {
  // console.log( "SearchCatalog props - ",props)

  // Данные в поле поиска формы
  const [search, setSearch] = useState({
    title: "",
  });

  // ***************************************
  // Объект location из  useLocation()
  let location = useLocation();
  console.log("Catalog location - ", location);

  // Если получены данные из поля поиска главного меню,
  // запишем их в search.title:
  useEffect(() => {
    // console.log("SearchCatalog location.state - ", location.state);
    if (location.state?.valueSearch) {
      setSearch({ title: location.state.valueSearch });
    }
  }, [location]);
  // ********************************************

  // список товаров для отрисовки:
  const [previewList, setPreviewList] = useState(goodsAll);
  // выбранная категория товаров:
  const [selected, setSelected] = useState({ id: 1, title: "Все" });

  // Добавляем категорию "Все" в массив категорий
  useEffect(()=>{
    categories.unshift({ id: 1, title: "Все" });
  },[])

  // Данные для показа/скрытия кнопки "Загрузить ещё".
  // Сохраняем  в состоянии длину массива подгружаемых данных - countCurrentGoods:
  const [countCurrentGoods, setCountCurrentGoods] =
    useState(countLoadeMoreGoods);

  // Cвязь с кнопками выбора категории товара:
  // На вход получаем выбранную кнопку(объект selectButton) и массив данных (data)
  // для выбранной категории товаров:
  const onSelectFilter = (selectButton, data) => {
    // При нажатии на кнопку меню:
    console.log("HomeCatalog : получен фильтр - ", selectButton);
    console.log("HomeCatalog : получены данные :  ", data);
    // 1. Фиксируем выбранный объект категории в константу selected:
    setSelected(selectButton);
    // 2. Фиксируем объект со списком товаров по выбранной категории в previewList ;
    setPreviewList(data);

    // 3. Обновляем состояние для кнопки "Загрузить ещё"
    setCountCurrentGoods(countLoadeMoreGoods);
  };

  //  Загрузка данных по нажатию кнопки "Загрузить ещё" :
  const loadeMoreData = (data) => {
    console.log(" Догрузка данных в функцию loadeMoreData -", data);
    setPreviewList([...previewList, ...data]);
    // setPreviewList(data);

    setCountCurrentGoods(data.length);
  };

  // Функция загрузки данных по содержимому поля поиска search для полного списка:
  // http://localhost:7070/api/items?q=...
  const onFetchSearchAll = async () => {
    const resp = await fetch(`${BASE_URL}/api/items?q=${search.title} `);
    const data = await resp.json();
    setPreviewList(data);
  };

  // Функция загрузки данных по содержимому поля поиска search для категорий:
  // const url = BASE_URL + `/api/items?categoryId=${categoryId}&offset=${nextOffset}`;
  // http://localhost:7070/api/items?q=...
  const onFetchSearch = async (categoryId) => {
    const resp = await fetch(
      `${BASE_URL}/api/items?categoryId=${categoryId}&q=${search.title} `
    );
    const data = await resp.json();
    setPreviewList(data);
  };

  // oбработчик onChange для поля поиска :
  const onSearchChange = (e) => {
    const { name, value } = e.target;
    // console.log ("onSearchChange name -" , name , " value -", value );
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  /* Обработчик события onSubmit у формы с полем поиска  */
  const onSearchSubmit = (e) => {
    e.preventDefault();
    console.log("SearchCatalog form target -", e.target);

    if (selected.id === 1) {
      onFetchSearchAll();
    } else {
      onFetchSearch(selected.id);
    }
    // ???????????????? :
    if (location.state.valueSearch) {
      location.state.valueSearch = "";
    }
  };

  console.log("SearchCatalog search -", search.title);

  return (
    <div className="catalog">
      <h2 className="text-center title-block">Каталог</h2>
      <form className="catalog-search-form" onSubmit={onSearchSubmit}>
        <input
          type="search"
          className="form-control"
          name="title"
          value={search.title}
          onChange={onSearchChange}
          placeholder="Поиск"
        />
        {
          search.title &&   
            <button type="submit" className="button-catalog-search-form">
              Найти
            </button>
        }
      
      </form>

      <CatalogMenu
        categories={categories}
        selected={selected}
        onSelectFilter={onSelectFilter}
      />

      <CatalogPreview previewList={previewList} />

      <div className="text-center">
        <ButtonLoadeMore
          selected={selected}
          loadeMoreData={loadeMoreData}
          lengthPreviewList={previewList.length}
          countLoadeMoreGoods={countLoadeMoreGoods}
          countCurrentGoods={countCurrentGoods}
        />
      </div>
    </div>
  );
};
