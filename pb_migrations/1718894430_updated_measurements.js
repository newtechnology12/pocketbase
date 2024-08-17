/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1viopevvytxg0z7")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ejmpw5wb",
    "name": "base_unit",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "urld8ikx",
    "name": "operator",
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
    "id": "9ohxo94h",
    "name": "operator_value",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("1viopevvytxg0z7")

  // remove
  collection.schema.removeField("ejmpw5wb")

  // remove
  collection.schema.removeField("urld8ikx")

  // remove
  collection.schema.removeField("9ohxo94h")

  return dao.saveCollection(collection)
})
