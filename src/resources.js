const resources = db.getCollection("resources");

const result = resources.insertOne({
  imageUrl: "ImageUrl",
  title: "Title",
  description: "Description",
  resourceUrl: "ResourceUrl",
});

printjson(result);
