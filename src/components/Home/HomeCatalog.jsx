
import { CatalogMenu } from "../Catalog/CatalogMenu";
import { CatalogPreview } from "../Catalog/CatalogPreview"
import { useState } from "react";
import { ButtonLoadeMore } from "./ButtonLoadeMore";

// Количество загружаемых товаров по клику по кнопке "Загрузить ещё":
const countLoadeMoreGoods = 6 ;

export const HomeCatalog = (props)=> {
   
    console.log('HomeCatalog props - ', props)

    // Получили массив категорий и массив данных о товарах для 
    // первой загрузки:
    const {categories , goodsAll}= props;
    
    // Добавляем категорию "Все" в массив категорий
    if(categories.length <= 4){
        categories.unshift({id:1 , title:"Все"}); 
    };

    // список товаров для отрисовки:
    const[ previewList , setPreviewList] = useState(goodsAll) 

    // выбранная категория товаров  
    const[ selected , setSelected] = useState({id:1, title:'Все'});

    // Данные для показа/скрытия кнопки "Загрузить ещё".
    // Сохраняем  в состоянии длину массива подгружаемых данных - countCurrentGoods:
    const [countCurrentGoods , setCountCurrentGoods]= useState(countLoadeMoreGoods);
   
    // Cвязь с кнопками выбора категории товара:
    // На вход получаем выбранную кнопку(объект selectButton) и массив данных (data)
    // для выбранной категории товаров:
    const onSelectFilter = ( selectButton , data )=> {
        // При нажатии на кнопку меню:       
        console.log ("HomeCatalog : получен фильтр - ", selectButton);      
        console.log ("HomeCatalog : получены данные :  ", data)
         // 1. Фиксируем выбранный объект категории в константу selected:
        setSelected(selectButton);
          // 2. Фиксируем объект со списком товаров по выбранной категории в previewList ;       
        setPreviewList(data) ; 

        // 3. Обновляем состояние для кнопки "Загрузить ещё"
        setCountCurrentGoods(countLoadeMoreGoods)
    }

    //  Выносим кнопку "Загрузить ещё" в отдельный модуль 
    const loadeMoreData = (data)=> {
        console.log( " Догрузка данных в функцию loadeMoreData -", data);
        setPreviewList([ ...previewList, ...data]);

        setCountCurrentGoods(data.length)
    }

    // список товаров на отрисовку:
    console.log ('HomeCatalog previewList -', previewList );

    return (

        <section className="catalog">            
            <div className="home-catalog">  
            
                <CatalogMenu  
                    categories={categories}
                    selected={selected}
                    onSelectFilter={onSelectFilter}
                    
                />            
                <CatalogPreview previewList ={previewList}/>  

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
        </section>
    )
}



