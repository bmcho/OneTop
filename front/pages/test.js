import React, { useRef, useState } from 'react';

const Test = ({ posts }) => {
  const inputRef = useRef();
  const [list, setList] = useState([]);
  const [current, setCurrent] = useState('');
  const changeCurrent = (e) => {
    setCurrent(e.target.value);
  };
  const addItem = () => {
    setList((cur) => [...cur, current]);
    setCurrent('');
  };
  return (
    <div>
      <input value={current} type="text" onChange={changeCurrent} />
      <button onClick={addItem}>add</button>
      <ul>
        {list.map((e, i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
      <ul>
        {posts.map((e, i) => (
          <button key={i}>{e.title}</button>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_start=0&_end=10`
  );
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
};
export default Test;
