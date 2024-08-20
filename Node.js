Promise.all([fetchNodeData(), fetchOtherData()]).then(([nodeData, otherData]) => {
  // Process data here
});

let cache = {};

function fetchData(url) {
  if (cache[url]) {
    return Promise.resolve(cache[url]);
  }
  return fetch(url).then(response => response.json()).then(data => {
    cache[url] = data;
    return data;
  });
}