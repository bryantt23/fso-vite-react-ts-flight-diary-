import { useState, useEffect } from 'react';
import { DiaryEntry } from './types';
import diaryService from './service/diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    const fetchDiaryList = async () => {
      const diariesApi = await diaryService.getAll();
      setDiaries(diariesApi);
    };
    void fetchDiaryList();
  }, []);

  return (
    <div className='App'>
      <h1>Diary entries</h1>
      {diaries.map(diary => (
        <div>
          <h2>{diary.date}</h2>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
