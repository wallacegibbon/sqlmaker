# Introduction


These examples will show you how this package works.


```js
mkInsert("t1", { age: 27, time: new Date() }, { name: "wallace" });
//=> INSERT INTO `t1`(`age`,`time`) VALUES(27,'2017-11-27 07:51:06')
```

```js
mkDelete("t1", { name: "wallace", age: 26 });
//=> DELETE FROM `t1` WHERE `name`='wallace' AND `age`=26
```

```js
mkDelete("t1", `WHERE name="Wallace" AND age=26`);
//=> DELETE FROM `t1` WHERE name="Wallace" AND age=26
```

```js
mkUpdate("t1", { age: 27 }, { name: "wallace" });
//=> UPDATE `t1` SET `age`=27 WHERE `name`='wallace'
```

```js
mkUpdate("t1", { age: 27 }, `where name="wallace"`);
//=> UPDATE `t1` SET `age`=27 where name="wallace"
```

```js
mkSelect("t1", [ "name", "gender", "age" ], { gender: 1 },
          "ORDER BY age DESC LIMIT 3 OFFSET 1");
//=> SELECT `name`,`gender`,`age` FROM `t1` WHERE `gender`=1 ORDER BY age DESC LIMIT 3 OFFSET 1
```

```js
mkSelect("t1", "*", "WHERE gender=1");
//=> SELECT * FROM `t1` WHERE gender=1 
```

```js
mkSelect("t1", "*", { gender: 1 });
//=> SELECT * FROM `t1` WHERE `gender`=1 
```

