const { ObjectId } = require("mongodb");

class ProductService {
  constructor(databaseSetvices) {
    this.databaseSetvices = databaseSetvices;
  }
  extractProductData(product) {
    const _product = { ...product };

    // Remove undifined fileds
    Object.keys(_product).forEach(
      (key) => _product[key] === undefined && delete _product[key]
    );
    return _product;
  }
  async create(data) {
    const product = this.extractProductData(data);
    const result = await this.databaseSetvices.products.findOneAndUpdate(
      product,
      {
        $set: { },
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async findAll() {
    try {
      const products = await this.databaseSetvices.products.find().toArray();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByNamePaged(name, page, limit) {
    try {
      const skip = (page - 1) * limit;
      const products = await this.databaseSetvices.products
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
        })
        .skip(skip)
        .limit(limit)
        .toArray();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByCategoryPaged(category, page, limit) {
    try {
      const skip = (page - 1) * limit;
      const products = await this.databaseSetvices.products
        .find({
          category: category,
        })
        .skip(skip)
        .limit(limit)
        .toArray();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  async findByNameAndCategoryPaged(name, category, page, limit) {
    try {
      const skip = (page - 1) * limit;
      const products = await this.databaseSetvices.products
        .find({
          name: {
            $regex: new RegExp(name),
            $options: "i",
          },
          category: category,
        })
        .skip(skip)
        .limit(limit)
        .toArray();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async findBySlug(slug) {
    try {
      const product = await this.databaseSetvices.products.findOne({
        slug: slug,
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
  
  
  async findById(id) {
    try {
      const product = await this.databaseSetvices.products.findOne({
        _id: new ObjectId(id),
      });
      if (!product) {
        return null;
      }
      return product; 
    } catch (error) {
      throw new Error(error);
    }
  }
  

  async update(id, updateProduct) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractProductData(updateProduct);
    const options = {
      returnDocument: "after",
    };

    try {
      const product = await this.databaseSetvices.products.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteOne(id) {
    try {
      const product = await this.databaseSetvices.products.findOneAndDelete({
        _id: new ObjectId(id),
      });
      return product;
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteAll() {
    try {
      const products = await this.databaseSetvices.products.deleteMany();
      return products;
    } catch (error) {
      throw new Error(error);
    }
  }

}
const databaseSetvices = require("../utils/mongodb.util");
const productService = new ProductService(databaseSetvices);
module.exports = productService;