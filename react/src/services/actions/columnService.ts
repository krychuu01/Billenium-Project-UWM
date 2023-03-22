import axios from "axios";
import {transformColumns, transformColumn} from "@/services/utils/transfromData/transromData";
import {urlDomain} from "@/services/actions/boardService";

export async function addColumnToBackend(boardId:string, title:string){
        const response = await axios.post(urlDomain+'/api/columns', {boardId, title})
        return response.data
}

export async function removeColumnToBackend(id:string){
    const columnId = parseInt(id)
    try{
        await axios.delete(urlDomain+`/api/columns/${columnId}`)
    }catch(error){
        console.error(error)
    }
}

export async function getColumnsFromBackend(boardId:string){
        const response = await axios.get(urlDomain+`/api/columns/${boardId}/all`)
        if(response.data.error)
        {
            return response.data.error
        }else{
            return response.data
        }
}

export async function updateColumnToBackend(columnId:string,title:string, cardsLimit:number, isUnlimited:boolean){
    try{
        const response = await axios.put(urlDomain+`/api/columns`, {columnId,title, cardsLimit, isUnlimited})
        return response.data
    }catch(error:any) {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error;
        }
    }

}

export async function getColumnById(columnId:string){
    const apiUrl = urlDomain+`/api/columns/${columnId}`;
    try {
        const response = await axios.get(apiUrl);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

