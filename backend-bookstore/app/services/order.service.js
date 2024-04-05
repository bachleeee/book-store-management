const { ObjectId } = require("mongodb");

class OrderService {
  constructor(databaseServices) {
    this.databaseServices = databaseServices;
  }

  extractOrderData(order) {
    const _order = { ...order };

    Object.keys(_order).forEach(
      (key) => _order[key] === undefined && delete _order[key]
    );
    return _order;
  }

  async createOrder(data) {
    const order = this.extractOrderData(data);
    const result = await this.databaseServices.order.findOneAndUpdate(
      order,
      {
        $setOnInsert: {},
      },
      {
        upsert: true,
        returnDocument: "after",
      }
    );
    return result;
  }

  async findById(user_id) {
    try {
      const order = await this.databaseServices.order
        .find({ 
          orderby: new ObjectId(user_id)
        })
        .toArray();
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      const order = await this.databaseServices.order.find().toArray();
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteOneOrder(order_id) {
    try {
      const order = await this.databaseServices.order.findOneAndDelete({
        _id: new ObjectId(order_id),
      });
      return order;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, updateOrder) {
    const filter ={
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    }
    const update = this.extractOrderData(updateOrder);
    const options = {
      returnDocument: "after",
    };
    try {
      const order = await this.databaseServices.order.findOneAndUpdate(
        filter,
        {
          $set: update,
        },
        options
      );
      return order;
    } catch (error) {
      throw new Error(error);
    }
}

}
const databaseSetvices = require("../utils/mongodb.util");
const orderService = new OrderService(databaseSetvices);
module.exports = orderService;;