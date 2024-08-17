/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3u4oe1mt6hgnrdu")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xpgjn6ee",
    "name": "completed_at",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "keskciwv",
    "name": "completed_by",
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
  const collection = dao.findCollectionByNameOrId("3u4oe1mt6hgnrdu")

  // remove
  collection.schema.removeField("xpgjn6ee")

  // remove
  collection.schema.removeField("keskciwv")

  return dao.saveCollection(collection)
})
