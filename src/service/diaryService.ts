import axios from 'axios';
import { DiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then((response: { data: any; }) => response.data)
}

// export const createDiary = (object: NewDiary) => {
//     return axios
//         .post<Diary>(baseUrl, object)
//         .then(response => response.data)
// }
export default {
    getAll,
};
