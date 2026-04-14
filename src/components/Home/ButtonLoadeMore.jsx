// Подгрузка данных ( кнопка "Загрузить ещё"):
 
import { useState, useEffect } from "react";
import { BASE_URL } from "../../config/api";


// // Количество загружаемых товаров по клику по кнопке "Загрузить ещё":
// const countLoadeMoreGoods = 6 ;

export const ButtonLoadeMore =(props)=>{

    console.log( "ButtonLoadeMore props -", props)

    const{ selected, loadeMoreData, lengthPreviewList, countLoadeMoreGoods, countCurrentGoods}=props ;
    // счётчик количества подгружаемых данных
    const [next , setNext] = useState(countLoadeMoreGoods);

    // // Данные для показа/скрытия кнопки "Загрузить ещё".
    // // Сохраняем  в состоянии длину массива подгружаемых данных - countCurrentGoods:
    // const [countCurrentGoods , setCountCurrentGoods]= useState(countLoadeMoreGoods);

    // Функция догрузки товаров для ВСЕГО списка (/api/items?offset=6):
    const addGoodsAll = async (nextOffset) => {
        const resp = await fetch(BASE_URL + `/api/items?offset=${nextOffset}`);
        const data = await resp.json();
        console.log( " data length - " , data.length)

        // Передаём загруженные данные в НomeCatalog для отрисовки
        loadeMoreData(data)
        
    }

    // Функция догрузки товаров ПО КАТЕГОРИЯМ : /api/items?categoryId=X&offset=6
    const addGoodsCaregory = async (categoryId, nextOffset) => {
        const url = BASE_URL + `/api/items?categoryId=${categoryId}&offset=${nextOffset}`;
        // console.log ('Url загрузки - ', url)
        const resp = await fetch(url);
        const data = await resp.json();
        
        console.log( " data length - " , data.length);

        // Передаём загруженные данные в НomeCatalog для отрисовки
        loadeMoreData(data)
        
    }

    // Обработчик клика по кнопке "Загрузить ещё"
    const handleButtonClick = (currentCategoryId)=>{
        // console.log("currentCategoryId - ", currentCategoryId);
        if(currentCategoryId === 1) {
            addGoodsAll(next);
        } else {
            addGoodsCaregory(currentCategoryId, next)
        };
       
        setNext( next + countLoadeMoreGoods)
    }

    return(
        <div className="text-center">
            <button     
                style={{ visibility: (countCurrentGoods < countLoadeMoreGoods) || 
                    (lengthPreviewList < countLoadeMoreGoods) ? 'hidden' :  'visible' }}
                className="button-more"
                onClick={()=> handleButtonClick(selected.id)}>
                    Загрузить ещё
                </button>   
        </div>  
    )
}