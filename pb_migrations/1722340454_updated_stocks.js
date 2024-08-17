/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("82rtspvv1p4xtom")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "204f2lhf",
    "name": "users",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("82rtspvv1p4xtom")

  // remove
  collection.schema.removeField("204f2lhf")

  return dao.saveCollection(collection)
})
