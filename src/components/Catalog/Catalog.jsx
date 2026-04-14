import { useEffect, useState } from "react";
// import { CatalogData } from "../Home/CatalogData"
import { CatalogSearchData } from "./CatalogSearchData";

import { useCatalog } from "../../hook/useCatalog";
import { useGetFetch } from "../../hook/useGetFetch";
import { CatalogMenu } from "./CatalogMenu";
import { CatalogPreview } from "./CatalogPreview";
import { BASE_URL } from "../../config/api";

import "./style.scss";

// 1-й вариант:
export const Catalog = () => {
  // Загружаем список категорий:
  const [categories, loadingCategories, errorCategories] =
    useGetFetch("/api/categories");
    
// const [categoryId, setCategoryId] = useState(null);
// const [searchQuery, setSearchQuery] = useState('');
// const [items, setItems] = useState([]);
// const [offset, setOffset] = useState(0);
// const [hasMore, setHasMore] = useState(true);
// const [loading, setLoading] = useState(false);

  // Id dыбранной  категории:
  const [categoryId, setCategoryId] = useState(null);
  // Выбранная категория товаров (объект):
  const [selected, setSelected] = useState({ id: 1, title: "Все" });
  // Список товаров:
  const [items, setItems] = useState([]);
  // Текущий offset:
  const [offset, setOffset] = useState(0);
  // Флаг для возможности срабатывания кнопки "Загрузить ещё":
  const [hasMore, setHasMore] = useState(true);
  //  Индикатор загрузки данных:
  const [loading, setLoading] = useState(false);
  // Поисковая фраза:
  const [searchQuery, setSearchQuery] = useState("");
  // Данные в поле поиска формы
  const [search, setSearch] = useState({
    title: "",
  });

  const[limit]= useState(6);

  useEffect(() => {
    // При смене категории или поиска сбрасываем список и offset
    setItems([]);
    setOffset(0);
    setHasMore(true);
  }, [categoryId, searchQuery]);

//  Загрузка  данных при смене offset
  useEffect(() => {
    if (loading) return;
    setLoading(true);
    fetch(
      `${BASE_URL}/api/items?categoryId=${
        categoryId || ""
      }&q=${searchQuery}&offset=${offset}`
    )  
      .then((res) => res.json())
      .then((data) => {
        setItems((prev) => [...prev, ...data]);
        setHasMore(data.length === limit);
      })
      .finally(() => setLoading(false));
  }, [offset, categoryId, searchQuery]);

  //Обработчик клика на кнопку "Загрузить ещё"
  const loadMore = () => {
    if (!loading && hasMore) {
      setOffset((prev) => prev + limit);
    }
  };

  // oбработчик onChange для поля поиска формы:
  const onSearchChange = (e) => {
    const { name, value } = e.target;
    setSearch((prev) => ({ ...prev, [name]: value }));
  };

  //Обработчик события Submit на форме поиска
  const onSearchSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(search.title);
  };

  const onSelectFilter = (item) => {
    console.log("onSelectFilter item -", item);
    //  Фиксируем выбранный объект категории в константу selected:
    setSelected(item);
    if (item.id === 1) {
      setCategoryId(null);
    } else {
      setCategoryId(item.id);
    }
    // Обнуляем поисковую фразу:
    setSearchQuery("");
    // Обнуляем поле поиска:
    setSearch({ title: "" });
  };
  
  console.log("searchQuery -", searchQuery);
  console.log("offset-", offset);
  console.log("selected-", selected);
  console.log("categoryId-", categoryId, );
  console.log("items -", items);

  return (
    <>
      {loadingCategories && <div> Загрузка списка категорий...</div>}
      {errorCategories && <div> Ошибка загрузки списка категорий...</div>}
      {loading && <div> Загрузка списка товаров...</div>}
      
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
          {search.title && (
            <button type="submit" className="button-catalog-search-form">
              Найти
            </button>
          )}
        </form>

        <CatalogMenu
          categories={categories}
          selected={selected}
          onSelectFilter={onSelectFilter}
        />

        <CatalogPreview previewList={items} />

        {hasMore && (
          <div className="text-center">
            <button className="button-more" onClick={loadMore}>
              Загрузить ещё
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// // 2-й вариант - через хук useCatalog:
// export const Catalog = () => {
//   // Загружаем список категорий:
//   // 1.Получаем список категорий (кнопок) :
//   const [categories, loadingCategories, errorCategories] = useGetFetch("/api/categories");
//   //2. Добавляем категорию "Все" в массив категорий
//   //   useEffect(() => {
//   //     if(categories){
//   //         categories.unshift({ id: 1, title: "Все" });
//   //     }
//   //   }, []);

//   // Id dыбранной  категории:
//   const [categoryId, setCategoryId] = useState(null);

//   // Выбранная категория товаров (объект):
//   const [selected, setSelected] = useState({ id: 1, title: "Все" });

//   //   **************************
//   //   // БЕЗ useCatalog:
//   //   // Список товаров:
//   //   const [items, setItems] = useState([]);
//   //   // Текущий offset:
//   //   const [offset, setOffset] = useState(0);
//   //   // Флаг для возможности срабатывания кнопки "Загрузить ещё":
//   //   const [hasMore, setHasMore] = useState(true);
//   //   //  Индикатор загрузки данных:
//   //   const [loading, setLoading] = useState(false);
//   // *************************************

//   // Поисковая фраза:
//   const [searchQuery, setSearchQuery] = useState("");

//   // Данные в поле поиска формы
//   const [search, setSearch] = useState({
//     title: "",
//   });

//   // oбработчик onChange для поля поиска формы:
//   const onSearchChange = (e) => {
//     const { name, value } = e.target;
//     setSearch((prev) => ({ ...prev, [name]: value }));
//   };

//   //Обработчик события Submit на форме поиска
//   const onSearchSubmit = (e) => {
//     e.preventDefault();
//     setSearchQuery(search.title);
//   };

//   const onSelectFilter = (item) => {
//     console.log("onSelectFilter item -", item);
//     //  Фиксируем выбранный объект категории в константу selected:
//     setSelected(item);
//     if (item.id === 1) {
//       setCategoryId(null);
//     } else {
//       setCategoryId(item.id);
//     };
//     // Обнуляем поисковую фразу:
//     setSearchQuery('');
//     // Обнуляем поле поиска:
//     setSearch({title:''})
//   };

//   //Вызов useCatalog :
//   const { items, loadingItems, hasMore, loadMore } = useCatalog(
//     categoryId,
//     searchQuery
//   );

//   console.log("searchQuery -", searchQuery);
//   console.log("items -", items);
//   //   console.log("categories-", categories);

//   return (
//     <>
//       {loadingCategories && <div> Загрузка списка категорий...</div>}
//       {errorCategories && <div> Ошибка загрузки списка категорий...</div>}
//       <div className="catalog">
//         <h2 className="text-center title-block">Каталог</h2>
//         <form className="catalog-search-form" onSubmit={onSearchSubmit}>
//           <input
//             type="search"
//             className="form-control"
//             name="title"
//             value={search.title}
//             onChange={onSearchChange}
//             placeholder="Поиск"
//           />
//           {search.title && (
//             <button type="submit" className="button-catalog-search-form">
//               Найти
//             </button>
//           )}
//         </form>

//         <CatalogMenu
//           categories={categories}
//           selected={selected}
//           onSelectFilter={onSelectFilter}
//         />
//         <CatalogPreview previewList={items} />
//         {hasMore &&
//                 <div className="text-center">
//                     <button className="button-more" onClick={loadMore}>Загрузить ещё</button>
//                 </div>
//         }
//       </div>
//     </>
//   );
// };
