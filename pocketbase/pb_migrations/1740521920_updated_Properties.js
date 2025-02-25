/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // remove field
  collection.fields.removeById("text_property_type")

  // add field
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
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_908984967")

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text_property_type",
    "max": 0,
    "min": 0,
    "name": "propertyType",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select2746987838")

  return app.save(collection)
})
