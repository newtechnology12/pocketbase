/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("smo7bzsbqdp60kp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kthq56p5",
    "name": "quantity",
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "weswe0ig",
    "name": "price",
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
  const collection = dao.findCollectionByNameOrId("smo7bzsbqdp60kp")

  // remove
  collection.schema.removeField("kthq56p5")

  // remove
  collection.schema.removeField("weswe0ig")

  return dao.saveCollection(collection)
})
