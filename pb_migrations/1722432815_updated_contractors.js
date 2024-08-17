/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uqy169r1y4r0mmy")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezauyvfk",
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
  const collection = dao.findCollectionByNameOrId("uqy169r1y4r0mmy")

  // remove
  collection.schema.removeField("ezauyvfk")

  return dao.saveCollection(collection)
})
