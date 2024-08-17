/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("7pw926dpq4kcntx")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m5rikml7",
    "name": "order_ticket",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3u4oe1mt6hgnrdu",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "m5rikml7",
    "name": "order_ticket",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "3u4oe1mt6hgnrdu",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
