/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("t7e2x0rachef11i")

  // remove
  collection.schema.removeField("yvw1la8p")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "babcfcjh",
    "name": "unit",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "1viopevvytxg0z7",
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
    "id": "yvw1la8p",
    "name": "unit",
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

  // remove
  collection.schema.removeField("babcfcjh")

  return dao.saveCollection(collection)
})
