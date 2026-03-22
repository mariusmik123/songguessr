const data = {
  albums: require("../public/data/albumOptions.json"),
  setAlbums: function (data) {
    this.albums = data;
  },
};

const getAllAlbums = (req, res) => {
  res.json(data.albums);
};

module.exports = { getAllAlbums };
