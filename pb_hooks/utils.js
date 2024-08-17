// pb_hooks/utils.js
module.exports = {
  adjustStockItem: ({ stock_item, quantity, type, reason, created_by }) => {
    const adjustment = {
      stock: stock_item.get("stock"),
      quantity_adjusted: quantity,
      type,
      reason,
      stock_item: stock_item.get("id"),
      created_by,
      notes: `Made ${reason}`,
      quantity_before: stock_item?.get("available_quantity"),
      quantity_after:
        type === "addition"
          ? stock_item?.get("available_quantity") + quantity
          : stock_item?.get("available_quantity") - quantity,
    };
    const adjustments_collection = $app
      .dao()
      .findCollectionByNameOrId("adjustments");
    const adjustment_record = new Record(adjustments_collection, adjustment);
    const stock_item_record = $app
      .dao()
      .findRecordById("stock_items", stock_item.get("id"));
    stock_item_record.set("available_quantity", adjustment.quantity_after);
    $app.dao().saveRecord(adjustment_record);
    $app.dao().saveRecord(stock_item_record);
    console.log("Adjusted stock --> " + stock_item.get("id"));
  },
  recordActivtyLog: ({ title, event_type, log_level, details, user }) => {
    console.log("Recording activity log --> " + title);
    const activity_logs_collection = $app
      .dao()
      .findCollectionByNameOrId("activity_logs");
    const activity_log = new Record(activity_logs_collection, {
      title,
      event_type,
      details: details,
      log_level: log_level,
      user,
    });
    $app.dao().saveRecord(activity_log);
  },
};
