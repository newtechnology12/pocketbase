/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i9za1ioimn80lgs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c9wu3o1b",
    "name": "created_by",
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
  const collection = dao.findCollectionByNameOrId("i9za1ioimn80lgs")

  // remove
  collection.schema.removeField("c9wu3o1b")

  return dao.saveCollection(collection)
})
