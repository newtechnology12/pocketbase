/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vyegxqb5q93by3z")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xvptvezk",
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
  const collection = dao.findCollectionByNameOrId("vyegxqb5q93by3z")

  // remove
  collection.schema.removeField("xvptvezk")

  return dao.saveCollection(collection)
})
