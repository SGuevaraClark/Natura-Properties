/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number4149042626",
    "max": null,
    "min": null,
    "name": "m2",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number4149042626",
    "max": null,
    "min": null,
    "name": "sqft",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
