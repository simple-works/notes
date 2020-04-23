//==============================================================================
// ■ Array (array.js)
//------------------------------------------------------------------------------
//     Array related utility functions.
//==============================================================================
module.exports = {
  alreadyInUse(array, query) {
    let expressions = [];
    for (const prop in query) {
      expressions.push(`item.${prop} === query.${prop}`);
    }
    const statement = `item => ${expressions.join(" || ")}`;
    return array.findIndex(eval(statement)) >= 0;
  },
  paginate(array = [], limit, page) {
    if (!limit && !page) {
      return array;
    }
    limit = Number(limit);
    page = Number(page);
    if (isNaN(limit)) {
      limit = 10;
    }
    if (isNaN(page)) {
      page = 1;
    }
    if (page <= 0) {
      page = 1;
    }
    if (limit <= 0) {
      limit = 1;
    }
    if (limit > array.length) {
      limit = array.length;
    }
    const start = (page - 1) * limit;
    const end = (page - 1) * limit + limit;
    return array.slice(start, end);
  },
  filterAndMap(array = [], filterFn, mapFn) {
    if (typeof filterFn !== "function") {
      throw new Error("filterFn must be a function");
    }
    if (typeof mapFn !== "function") {
      throw new Error("mapFn must be a function");
    }
    return array.reduce((stack, item) => {
      if (filterFn(item)) stack.push(mapFn(item));
      return stack;
    }, []);
  },
  expandField(arrayOrObject = [], query = {}) {
    const {
      localField = "someId",
      foreignField = "id",
      foreignArray = [],
      newField = `${localField}_expandation`
    } = query;
    if (Array.isArray(arrayOrObject)) {
      const items = [...arrayOrObject];
      for (const item of items) {
        item[newField] = foreignArray.find(
          foreignItem => foreignItem[foreignField] === item[localField]
        );
      }
      return items;
    } else {
      const item = { ...arrayOrObject };
      item[newField] = foreignArray.find(
        foreignItem => foreignItem[foreignField] === item[localField]
      );
      return item;
    }
  },
  embedField(arrayOrObject = [], query = {}) {
    const {
      localField = "id",
      foreignField = "someId",
      foreignArray = [],
      newField = "embedment",
      count = false
    } = query;
    if (Array.isArray(arrayOrObject)) {
      const items = [...arrayOrObject];
      for (const item of items) {
        const result = foreignArray.filter(
          foreignItem => foreignItem[foreignField] === item[localField]
        );
        item[newField] = count ? result.length : result;
      }
      return items;
    } else {
      const item = { ...arrayOrObject };
      const result = foreignArray.filter(
        foreignItem => foreignItem[foreignField] === item[localField]
      );
      item[newField] = count ? result.length : result;
      return item;
    }
  }
};
