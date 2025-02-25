/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // update field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "file3887315804",
    "maxSelect": 99,
    "maxSize": 25,
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

  // update field
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
})
