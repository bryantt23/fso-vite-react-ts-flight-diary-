import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

const getAll = async (): Promise<DiaryEntry[]> => {
    const response = await axios
        .get<DiaryEntry[]>(baseUrl);
    return response.data;
}

const createDiary = (object: NewDiaryEntry) => {
    return axios
        .post<NewDiaryEntry>(baseUrl, object)
        .then(response => response.data)
}

export default {
    getAll,
    createDiary
};
