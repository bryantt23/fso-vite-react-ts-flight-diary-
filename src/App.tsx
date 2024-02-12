import { useState, useEffect } from 'react';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from './types';
import diaryService from './service/diaryService';

const App = () => {
  // State hooks for managing diary entries and form inputs
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility | ''>('');
  const [weather, setWeather] = useState<Weather | ''>('');
  const [comment, setComment] = useState(''); // State for managing the comment input

  // Fetch diary entries from the API on component mount
  useEffect(() => {
    const fetchDiaryList = async () => {
      const diariesApi = await diaryService.getAll();
      setDiaries(diariesApi);
    };
    fetchDiaryList();
  }, []);

  // Handles form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form inputs
    if (!date || !visibility || !weather) {
      console.error('All fields are required');
      return;
    }

    // Construct a new diary entry object
    const newDiary: NewDiaryEntry = {
      date,
      visibility, // Assuming validation is passed
      weather, // Assuming validation is passed
      comment // Include the comment in the new diary entry
    };

    try {
      const res = await diaryService.createDiary(newDiary);
      setDiaries(prev => [...prev, { ...res, id: Math.random() }]); // Mock ID generation, replace with actual response from createDiary if applicable
    } catch (error) {
      console.error('Failed to save the diary entry', error);
    }

    // Reset form fields after submission
    setDate('');
    setVisibility('');
    setWeather('');
    setComment(''); // Reset the comment field
  };

  return (
    <div className='App'>
      <h1>Diary entries</h1>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
          <p>Comment: {diary.comment}</p> {/* Display the comment */}
        </div>
      ))}
      {/* Form for adding new diary entries */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='date'>Date:</label>
          <input
            id='date'
            type='date'
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='visibility'>Visibility:</label>
          <select
            id='visibility'
            value={visibility}
            onChange={e => setVisibility(e.target.value)}
          >
            <option value=''>Select visibility</option>
            <option value='good'>Good</option>
            <option value='poor'>Poor</option>
          </select>
        </div>
        <div>
          <label htmlFor='weather'>Weather:</label>
          <select
            id='weather'
            value={weather}
            onChange={e => setWeather(e.target.value)}
          >
            {Object.entries(Weather).map(([key, value]) => (
              <option key={`${key}`} value={`${value}`}>{`${key}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='comment'>Comment:</label>{' '}
          {/* Label for the comment input */}
          <textarea
            id='comment'
            value={comment}
            onChange={e => setComment(e.target.value)} // Update the comment state on input change
          />
        </div>
        <button type='submit'>Add Entry</button>
      </form>
    </div>
  );
};

export default App;
