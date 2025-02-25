/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // update field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select2746987838",
    "maxSelect": 1,
    "name": "propertyType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "house",
      "apartment",
      "lot",
      "hotel"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // update field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "select2746987838",
    "maxSelect": 1,
    "name": "propertyType",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "House",
      "Apartment",
      "Lot",
      "Hotel"
    ]
  }))

  return app.save(collection)
})
