import makeHttpResponse from '../utils/httpResponse';

export default function makeBaseController({ Model }) {
  return Object.freeze({
    insertItem,
    getItems,
    getItemById,
    updateItem,
    removeItem,
  });

  async function insertItem({ info }) {
    const item = new Model(info);
    const result = await item.save();

    return Object.freeze({
      headers: {
        'Last-Modified': result.modifiedOn,
      },
      ...makeHttpResponse({
        result,
        statusCode: 201,
      }),
    });
  }

  async function getItemById({ id }) {
    const result = await Model.findById(id);

    return makeHttpResponse({
      result,
      statusCode: 201,
    });
  }

  async function getItems({ query = {} }) {
    const result = await Model.find(query);

    return makeHttpResponse({
      result,
      statusCode: 201,
    });
  }

  async function updateItem({ id, updateObj }) {
    const result = await Model
      .findOneAndUpdate(id,
        { $set: updateObj },
        { returnOriginal: false });

    return Object.freeze({
      headers: {
        'Last-Modified': result.modifiedOn,
      },
      ...makeHttpResponse({
        result,
        statusCode: 201,
      }),
    });
  }

  async function removeItem({ id }) {
    const result = await Model.findOneAndDelete({ _id: id });

    return makeHttpResponse({
      result,
      statusCode: 200,
    });
  }
}
