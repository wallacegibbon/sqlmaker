const { mkSelect, mkUpdate, mkDelete, mkInsert } = require(".");


var r;

console.log("\n\nTesting mkInsert...");
r = mkInsert("t1", { age: 27, time: new Date() }, { name: "wallace" });
console.log(r);



console.log("\n\nTesting mkDelete...");
r = mkDelete("t1", { name: "wallace", age: 26 });
console.log(r);

r = mkDelete("t1", `WHERE name="Wallace" AND age=26`);
console.log(r);



console.log("\n\nTesting mkUpdate...");
r = mkUpdate("t1", { age: 27, gender: 1 }, { name: "wallace" });
console.log(r);

r = mkUpdate("t1", { age: 27 }, `where name="wallace"`);
console.log(r);



console.log("\n\nTesting mkSelect...");
r = mkSelect("t1", [ "name", "gender", "age" ], { gender: 1 },
              "ORDER BY age DESC LIMIT 3 OFFSET 1");
console.log(r);

r = mkSelect("t1", "*", "WHERE gender=1");
console.log(r);

r = mkSelect("t1", "*", { gender: 1 });
console.log(r);



