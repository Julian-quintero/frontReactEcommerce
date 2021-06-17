import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../constants/productsConstants";

export const listProducts = () => {
    return (dispatch) => {

        try {

            dispatch({
                type: PRODUCT_LIST_REQUEST
               })
        
               const res =  await fetch(`/api/products`)
               const data = await res.json()
        
               dispatch({
                type: PRODUCT_LIST_SUCCESS,
                payload:data
               })
            
        } catch (error) {

            dispatch({
                type: PRODUCT_LIST_FAIL,
                payload: error.response && error.response.data.message ? error.response.data.message : error.message
               })
            
        }



      


    }

}