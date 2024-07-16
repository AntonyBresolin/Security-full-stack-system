import React from 'react';
import FeedItem from '../TableItem/FeedItem';

const TableTwitter = ({ data }) => {
  return (
    <table className='bg-blue-400 w-full md:mx-[20%]'>
      <tbody>
          {data.length && data.map((element, index) => (
            <FeedItem key={index} dataFeed={element} />
          ))}
      </tbody>
    </table>
  );
};

export default TableTwitter;
