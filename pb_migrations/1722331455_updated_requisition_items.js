/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("lnfmk6js9u3tnpu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "5r8lk1qu",
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
  const collection = dao.findCollectionByNameOrId("lnfmk6js9u3tnpu")

  // remove
  collection.schema.removeField("5r8lk1qu")

  return dao.saveCollection(collection)
})
