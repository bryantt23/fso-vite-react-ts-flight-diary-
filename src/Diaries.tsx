import React from 'react';

interface DiariesProps {
  courseParts: any[];
}
const Diaries: React.FC<DiariesProps> = ({ courseParts }) => {
  console.log('🚀 ~ courseParts:', courseParts);
  return (
    <div>
      {courseParts.map(coursePart => (
        <div style={{ border: '1px solid black' }}>
          <p>
            <b>
              {coursePart.name} {coursePart.exerciseCount}
            </b>
          </p>
          {/* <Part coursePart={coursePart} /> */}
        </div>
      ))}
    </div>
  );
};

export default Diaries;
