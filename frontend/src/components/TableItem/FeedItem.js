import React from 'react';

const FeedItem = ({ dataFeed }) => {
  return (
    <tr className='py-4 bg-blue-600 hover:bg-blue-700 duration-150 ease-in-out'>
      <td>
        <div className='flex flex-col   '>
          <div className='text-white text-xl px-16 py-2 break-all'>{dataFeed ? dataFeed.content : ""}</div>
          <p className='text-white font-bold flex justify-end text-sm bg-blue-900 px-16 py-2'>{dataFeed ? dataFeed.username : ""}</p>
        </div>
      </td>
    </tr>
  );
};

export default FeedItem;