/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gf4ucggd",
    "name": "supplier",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5vfl7l1y5s28vny",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("06hray7z6x1yk5t")

  // remove
  collection.schema.removeField("gf4ucggd")

  return dao.saveCollection(collection)
})
