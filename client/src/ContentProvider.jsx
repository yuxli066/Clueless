import React, { useEffect, useState, useContext } from 'react';
const importAll = (imports) =>
  imports
    .keys()
    .map((item) => ({ [item.replace(/(\.\/)(.+)(\.jpe?g|\.png)/g, '$2')]: imports(item) }));
const ContentContext = React.createContext();

export const useContentContext = () => useContext(ContentContext);
export const ContentProvider = ({ children }) => {
  const [images, setImages] = useState([]);
  const [text, setText] = useState({});
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const loadImages = new Promise((resolve) =>
      resolve(require.context('./images', false, /\.(jpe?g|png)/)),
    );
    const loadText = new Promise((resolve) => resolve(require('./data/pageContent.json')));
    Promise.all([loadImages, loadText])
      .then((data) => {
        setImages(Object.assign({}, ...importAll(data[0])));
        setText(data[1]);
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
