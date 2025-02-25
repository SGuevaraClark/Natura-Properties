/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "file83635035",
    "maxSelect": 1,
    "maxSize": 30000,
    "mimeTypes": [],
    "name": "Image",
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
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "file83635035",
    "maxSelect": 1,
    "maxSize": 30,
    "mimeTypes": [],
    "name": "Image",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
