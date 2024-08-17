/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vbr7ze75k0p5vo5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "67p1xlha",
    "name": "date",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vbr7ze75k0p5vo5")

  // remove
  collection.schema.removeField("67p1xlha")

  return dao.saveCollection(collection)
})
