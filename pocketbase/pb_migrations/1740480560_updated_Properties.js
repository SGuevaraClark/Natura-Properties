/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // remove field
  collection.fields.removeById("featured_field")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "bool1007901140",
    "name": "featured",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // add field
  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "featured_field",
    "name": "featured",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // remove field
  collection.fields.removeById("bool1007901140")

  return app.save(collection)
})
