const object = {
  a: "",
  b: "1",
  a1: {},
  b1: {
    a: "1",
  },
  a2: {
    a: "",
  },
  b2: {
    a: [],
  },
  c1: {
    a: ["1"],
  },
  c3: {
    a: ["1", []],
  },
  a3: [],
  h: [[]],
};
/**
 * @author Idan Gigi
 * @param {array} array
 * @return {array}
 * @description clear the array from falsy values
 */
const clearArray = (array) => {
  if (!array.length) {
    return array;
  }
  if (
    array.every(
      (element) =>
        typeof element === "boolean" ||
        typeof element === "string" ||
        typeof element === "number" ||
        typeof element === "undefined",
    )
  ) {
    array.forEach((element, elementIndex) => {
      if (!Boolean(element)) {
        array.splice(elementIndex, 1);
      }
    });
  } else {
    array.forEach((element, elementIndex) => {
      if (typeof element === "string" || typeof element === "undefined") {
        if (!element) {
          array.splice(elementIndex, 1);
        }
      }
      if (typeof element === "object") {
        if (Array.isArray(element)) {
          // Array
          if (!element.length) {
            array.splice(elementIndex, 1);
          } else {
            const subArray = clearArray(array[elementIndex]);
            if (typeof subArray === "object") {
              if (Array.isArray(subArray)) {
                // Array
                array.splice(elementIndex, 1);
              }
            }
          }
        } else {
          // Object
          if (!Object.getOwnPropertyNames(element).length) {
            array.splice(elementIndex, 1);
          } else {
            const subObject = clearObject(array[elementIndex]);
            if (typeof subObject === "object") {
              if (!Array.isArray(subObject)) {
                // Object
                if (!Object.getOwnPropertyNames(element).length) {
                  array.splice(elementIndex, 1);
                }
              }
            }
          }
        }
      }
    });
  }
  return array;
};
/**
 * @author Idan Gigi
 * @param {object} object
 * @return {object}
 * @description clear the object from falsy values
 */
const clearObject = (object) => {
  if (!Object.getOwnPropertyNames(object).length) {
    return object;
  }
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const element = object[key];
      if (typeof element === "string" || typeof element === "undefined") {
        if (!element) {
          delete object[key];
        }
      }
      if (typeof element === "object") {
        if (Array.isArray(element)) {
          // Array
          if (!element.length) {
            delete object[key];
          } else {
            const subArray = clearArray(object[key]);
            if (typeof subArray === "object") {
              if (Array.isArray(subArray)) {
                // Array
                if (!subArray.length) {
                  delete object[key];
                }
              }
            }
          }
        } else {
          // object
          if (!Object.getOwnPropertyNames(element).length) {
            delete object[key];
          } else {
            const subObject = clearObject(object[key]);
            if (typeof subObject === "object") {
              if (!Array.isArray(subObject)) {
                // Object
                if (!Object.getOwnPropertyNames(subObject).length) {
                  delete object[key];
                }
              }
            }
          }
        }
      }
    }
  }
  return object;
};

clearObject(object);
