/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "arb0l8az",
    "name": "adjustments",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3uglwxhfc70bvrb",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // remove
  collection.schema.removeField("arb0l8az")

  return dao.saveCollection(collection)
})
