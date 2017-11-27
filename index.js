/**
 * @param {string[]|string} fields - Array like [ "age", "gender" ] or "*".
 * @param {Object|string} whereCond
 * @param {string} extra - "ORDER BY", "LIMIT", "OFFSET", etc.
 * @returns {string} - e.g. "SELECT age,gender FROM X WHERE name='ww'"
 */
function mkSelect(table, fields, whereCond, extra) {
  const f = Array.isArray(fields) ? fields.map(x => `\`${x}\``) : fields;
  const w = constructWhere(whereCond);

  return `SELECT ${f} FROM \`${table}\` ${w} ${extra || ""}`;
}



/**
 * INSERT is the simplest operation, because there is no WHERE part in it.
 * @param {Object} obj - Object like { name: "Abc", age: 15 }.
 * @returns {string} - e.g. "INSERT INTO X(name, age) VALUES('Abc', 15)"
 */
function mkInsert(table, obj) {
  const ks = Object.keys(obj).map(x => `\`${x}\``);
  const vs = Object.values(obj).map(toMysqlObj);

  return `INSERT INTO \`${table}\`(${ks}) VALUES(${vs})`;
}



/**
 * @param {Object|string} whereCond
 * @returns {string} - e.g. "DELETE FROM X WHERE name='Abc' AND age=15"
 */
function mkDelete(table, whereCond) {
  return `DELETE FROM \`${table}\` ${constructWhere(whereCond)}`;
}



/**
 * @param {Object} newData - Object like { age: 20, gender: 2 }.
 * @param {Object|string} whereCond
 * @returns {string} - e.g. "UPDATE X SET age=20,gender=2 WHERE name='A'"
 */
function mkUpdate(table, newData, whereCond) {
  const s = constructPairs(newData).join(",");
  const w = constructWhere(whereCond);

  return `UPDATE \`${table}\` SET ${s} ${w}`;
}



/**
 * Since the "where" part could be complex, user may just pass string here.
 * e.g. { a: 1, b: 2, c: 3} ==> "`a`=1 AND `b`=2 AND `c`=3"
 * e.g. "a=1 AND b=2"       ==> "a=1 AND b=2"
 */
function constructWhere(whereObj) {
  if (!whereObj)
    return "";

  if (typeof whereObj === "string")
    return whereObj;

  return `WHERE ${constructPairs(whereObj).join(" AND ")}`;
}



/**
 * { a:1, b: 2, c: 3 } ==> [ "`a`=1","`b`=2","`c`=3" ]
 */
function constructPairs(obj) {
  return Object.entries(obj).map(([k, v]) => `\`${k}\`=${toMysqlObj(v)}`);
}



/**
 * Transform normal Javascript object to Mysql object. Only String, Number,
 * Date are supported.
 */
function toMysqlObj(obj) {
  if (obj === undefined || obj === null)
    return "NULL";

  switch (obj.constructor) {
  case Date:
    return `'${formatDate(obj)}'`;

  case String:
    return `'${obj.replace(/'/g, "''")}'`;

  case Number:
    return obj;

  default:
    throw new TypeError(`${util.inspect(obj)}`);
  }
}



/**
 * Transform a Date object to a string like "2017-10-14 13:33:21".
 */
function formatDate(dateObj) {
  return dateObj.toISOString().slice(0, 19).replace("T", " ");
}



module.exports = {
  mkInsert,
  mkSelect,
  mkDelete,
  mkUpdate,
};

