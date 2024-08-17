/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qikworp96xublst")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vhbttpn6",
    "name": "department",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "v3wlcznvicjsfgj",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qikworp96xublst")

  // remove
  collection.schema.removeField("vhbttpn6")

  return dao.saveCollection(collection)
})
