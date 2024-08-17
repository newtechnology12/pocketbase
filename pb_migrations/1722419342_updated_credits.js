/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("3gbwb0sqpio59sl")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ieap9cbo",
    "name": "monthly_deduction",
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
  const collection = dao.findCollectionByNameOrId("3gbwb0sqpio59sl")

  // remove
  collection.schema.removeField("ieap9cbo")

  return dao.saveCollection(collection)
})
