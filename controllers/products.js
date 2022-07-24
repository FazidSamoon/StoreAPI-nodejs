import Model from "../models/product.js";

export const getAllproducts = async (req, res) => {
  const result = await Model.find({}).sort("-name");
  res.json({ result });
};

export const getAllproductsStatic = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  let queryObject = {};

  //find by
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (company) {
    queryObject.company = company;
  }
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  let result = Model.find(queryObject);

  //sort items
  if (sort) {
    let sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //querying only required items
  if (fields) {
    let fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const products = await result;
  res.status(200).json({ products, length: products.length });
};
