/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("v1dcnzscinfp3dh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "3s9m9ezt",
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
  const collection = dao.findCollectionByNameOrId("v1dcnzscinfp3dh")

  // remove
  collection.schema.removeField("3s9m9ezt")

  return dao.saveCollection(collection)
})
