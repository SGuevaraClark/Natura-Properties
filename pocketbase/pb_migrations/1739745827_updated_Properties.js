/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // add field
  collection.fields.addAt(2, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text185142749",
    "max": 0,
    "min": 0,
    "name": "Price",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2817059741",
    "max": 0,
    "min": 0,
    "name": "Location",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3950563313",
    "max": 0,
    "min": 0,
    "name": "Description",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number4149042626",
    "max": null,
    "min": null,
    "name": "Sq",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number2530789444",
    "max": null,
    "min": null,
    "name": "Beds",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number1348169207",
    "max": null,
    "min": null,
    "name": "Baths",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "file83635035",
    "maxSelect": 1,
    "maxSize": 5,
    "mimeTypes": [],
    "name": "Image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "file3887315804",
    "maxSelect": 99,
    "maxSize": 5,
    "mimeTypes": [],
    "name": "Images",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // remove field
  collection.fields.removeById("text185142749")

  // remove field
  collection.fields.removeById("text2817059741")

  // remove field
  collection.fields.removeById("text3950563313")

  // remove field
  collection.fields.removeById("number4149042626")

  // remove field
  collection.fields.removeById("number2530789444")

  // remove field
  collection.fields.removeById("number1348169207")

  // remove field
  collection.fields.removeById("file83635035")

  // remove field
  collection.fields.removeById("file3887315804")

  return app.save(collection)
})
