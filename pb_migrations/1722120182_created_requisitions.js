/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "v1dcnzscinfp3dh",
    "created": "2024-07-27 22:43:02.004Z",
    "updated": "2024-07-27 22:43:02.004Z",
    "name": "requisitions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qxqpdh5h",
        "name": "requested_by",
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
      },
      {
        "system": false,
        "id": "uqlvzkf8",
        "name": "department",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "v3wlcznvicjsfgj",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("v1dcnzscinfp3dh");

  return dao.deleteCollection(collection);
})
