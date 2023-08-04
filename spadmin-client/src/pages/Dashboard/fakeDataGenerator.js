export const fakeArrayGenrator = ({ length, digit }) => {
  const array = [];
  for (let index = 0; index < length; index++) {
    const element = Math.round(Math.random() * digit);
    array.push(element);
  }
  return array;
};

export const getRandomColor = (n) => {
  var letters = "0123456789ABCDEF".split("");
  var color = "#";
  var colors = [];
  for (var j = 0; j < n; j++) {
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    colors.push(color);
    color = "#";
  }
  return colors;
};
