/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pw926dpq4kcntx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "uq8ufg4c",
    "name": "cancelled_by",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pw926dpq4kcntx")

  // remove
  collection.schema.removeField("uq8ufg4c")

  return dao.saveCollection(collection)
})
