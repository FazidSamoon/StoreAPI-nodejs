import Model from "../models/product.js";

export const getAllproducts = async (req, res) => {
  const result = await Model.find({}).sort("-name");
  res.json({ result });
};

export const getAllproductsStatic = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
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

  //filter by numbers
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "<": "$lt",
      "<=": "$lte",
      "=": "$eq",
    };
    //regular expression
    const regEx = /\b(<|>|>=|<=|=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    const options = ["price", "rating"]; //option which works only for numericFilters
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-"); //since filters are devided by - in '-${operatorMap[match]}-' can split it using -
      //field is name and operators are > < >= .... and value is the given value to be sort

      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
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

  //pagination functions
  const page = Number(req.query.page) || 1; //page number
  const limit = Number(req.query.limit) || 10; //number of items to be dispalyed in the page
  const skip = (page - 1) * limit; //skip contentes in the previous pages

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, length: products.length });
};
