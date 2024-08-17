/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p4oit50uvu6w5ok")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "u4nfezkk",
    "name": "ticket_watermark",
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p4oit50uvu6w5ok")

  // remove
  collection.schema.removeField("u4nfezkk")

  return dao.saveCollection(collection)
})
