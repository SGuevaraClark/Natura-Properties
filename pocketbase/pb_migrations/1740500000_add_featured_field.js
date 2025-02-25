/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // add featured boolean field
  collection.fields.push(new Field({
    "hidden": false,
    "id": "featured_field",
    "name": "featured",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // remove field
  collection.fields = collection.fields.filter(f => f.id !== "featured_field")

  return app.save(collection)
}) 