import React, { useEffect, useState, useContext } from 'react';
const importAll = (imports) =>
  imports
    .keys()
    .map((item) => ({ [item.replace(/(\.\/)(.+)(\.jpe?g|\.png|\.PNG)/g, '$2')]: imports(item) }));
const ContentContext = React.createContext();

export const useContentContext = () => useContext(ContentContext);
export const ContentProvider = ({ children }) => {
  const [images, setImages] = useState({});
  const [text, setText] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const loadImages = new Promise((resolve) =>
      resolve(require.context('./images', false, /\.(jpe?g|png)/)),
    );
    const loadBoardImages = new Promise((resolve) =>
      resolve(require.context('./board-images', false, /\.(jpe?g|PNG)/)),
    );
    const loadText = new Promise((resolve) => resolve(require('./data/pageContent.json')));
    Promise.all([loadImages, loadBoardImages, loadText])
      .then((data) => {
        const images = Object.assign({}, ...importAll(data[0]));
        const board = Object.assign({}, ...importAll(data[1]));
        setImages({ ...images, ...board });
        setText(data[2]);
      })
      .finally(() => setLoading(false));
  }, []);
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <ContentContext.Provider value={{ images: images, text: text }}>
      {children}
    </ContentContext.Provider>
  );
};
