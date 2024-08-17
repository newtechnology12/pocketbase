/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t7e2x0rachef11i")

  // remove
  collection.schema.removeField("qhviwags")

  // remove
  collection.schema.removeField("9nmlj2sn")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ewzbqoz9",
    "name": "menu",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vn362mb4h80kaly",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t7e2x0rachef11i")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qhviwags",
    "name": "cost",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "9nmlj2sn",
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

  // remove
  collection.schema.removeField("ewzbqoz9")

  return dao.saveCollection(collection)
})
