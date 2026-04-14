import { SearchCatalog } from "./SearchCatalog";
import { useGetFetch } from "../../hook/useGetFetch";



export const CatalogSearchData =()=> {

            // 1.Получаем список кнопок :
            const[categories, loadingCategories, errorCategories ]= useGetFetch('/api/categories');
            // console.log ('HomeCatalogData categories-',categories )
            // console.log ('HomeCatalogData categories.length-',categories.length )
    
            // 2.Получаем список товаров ("Все");
            const[ goodsAll , loadingGoodsAll, errorGoodsAll] = useGetFetch('/api/items');
            // console.log ('HomeCatalogData goodsAll -',goodsAll );
    
            return(
                <>
                    {loadingCategories && <div> Загрузка списка категорий...</div>}
                    { errorCategories && <div> Ошибка загрузки списка категорий...</div>}
                    {loadingGoodsAll && <div> Загрузка массива товаров...</div>}
                    { errorGoodsAll && <div> Ошибка загрузки массива товаров ...</div>}
                    {categories && goodsAll &&  <SearchCatalog categories={categories} goodsAll={goodsAll} /> }
                </>
            )

}